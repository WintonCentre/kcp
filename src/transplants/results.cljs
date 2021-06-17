(ns transplants.results
  (:require [re-frame.core :as rf]
            [transplants.events :as events]
            [transplants.subs :as subs]
            [transplants.factors :as fac]
            [transplants.bundles :as bun]
            [transplants.model :as model]
            [transplants.vis2 :as vis]
            [transplants.ui :as ui]
            [transplants.utils :as utils]
            [shadow.debug :refer [locals ?> ?->]]))

(comment
  (def day 100)
  (def route @(rf/subscribe [::subs/current-route]))
  (def tools @(rf/subscribe [::subs/tools]))
  (def organ-centres @(rf/subscribe [::subs/organ-centres]))
  (def bundles @(rf/subscribe [::subs/bundles]))
  (def oct-names (utils/path-names (:path-params route)))
  (def oct-keys (map keyword oct-names))
  (def oct-bundle (apply bun/get-bundle oct-keys))
  (def baseline-cifs  (:baseline-cifs oct-bundle))
  (tap> oct-bundle)
  ;(def baseline-cifs-for-day (bun/cif-0 oct-bundle day))
  (def outcome-names (fac/get-outcomes* (bun/cif-0 oct-bundle day)))
  (def outcome-keys (map keyword outcome-names))

  (def beta-outcome-keys (map #(keyword (str "beta-" %)) outcome-names))
  (def cif-outcome-keys (map #(keyword (str "cif-" %)) outcome-names))
  (def inputs @(rf/subscribe [::subs/inputs]))
  (tap> [::inputs inputs])
  (count (keys (:lung @(rf/subscribe [::subs/inputs]))))
  (count @(rf/subscribe [::subs/bundles]))
  (def env [oct-names oct-bundle inputs])
  (def  sum-betas (map #(fac/sum-beta-xs env %) beta-outcome-keys))
  0)

(def waiting-fill "#0088EE" #_"#7C91D8")
(def transplant-fill "#66CC88" #_"#44dd99")
(def death-fill "#002244")
(def survival-fill "#927AAA")
(def graft-fill "#0099DD")

(comment 
  (def sum-betas '(0 0)))

(defn results-panel
  "Display results.
   TODO: REMOVE HARD_CODED TOOL KEYWORDS AND TEXTS"
  [organ centre tool]
  (let [day @(rf/subscribe [::subs/test-day])
        {:keys [fmaps baseline-cifs baseline-vars outcome-keys
                base-outcome-keys timed-outcome-keys beta-keys outcomes S0 all-S0]
         :as bundle} (bun/get-bundle organ centre tool)
        env {:organ organ
             :centre centre
             :tool tool
             :mdata @(rf/subscribe [::subs/mdata])
             :day day
             :bundle bundle
             :fmaps fmaps
             :S0 S0
             :all-S0 all-S0
             :outcomes outcomes
             :outcome-keys outcome-keys
             :base-outcome-keys base-outcome-keys
             :timed-outcome-keys timed-outcome-keys
             :beta-keys beta-keys
             :cohort-dates @(rf/subscribe [::subs/cohort-dates])
             :inputs (get @(rf/subscribe [::subs/inputs]) organ)
             :selected-vis @(rf/subscribe [::subs/selected-vis])}

        ;selected-vis @(rf/subscribe [::subs/selected-vis])
        sum-betas (map #(fac/sum-beta-xs env %) beta-keys)

        ;; use all of S0 till it gets to be too slow. May need to query tool and vis here.
        ;; Switching s0 is enough
        s0 all-S0
        s0-for-day (model/S0-for-day s0 day)

        cox? (model/use-cox-adjusted? tool)
        F (model/cox-adjusted s0 sum-betas)
        #_(if cox? ;false #_(= (:selected-vis env) "test")
              (model/cox s0-for-day sum-betas)
              (model/cox-adjusted s0 sum-betas)
              )

        env (conj env
                  [:sum-betas sum-betas]
                  [:s0 s0]
                  [:s0-for-day s0-for-day]
                  [:cox? cox?]
                  [:F F] ;; is this needed ?
                  )]

  ; (locals)
    (let [inputs (:inputs env)
          required-inputs (keys fmaps)
          fulfilled-inputs (select-keys inputs required-inputs)
          missing #_false (< (count fulfilled-inputs) (count required-inputs))
          unknowns (some #(= (get inputs %) :unknown) required-inputs)
          overlay (if missing :missing (if unknowns :unknowns nil))]
      [:div {:style {:background-color "#fff"
                     :border (str "3px solid " (condp = overlay 
                                                 :missing "rgb(255,0,0)" 
                                                 :unknowns "teal"
                                                 nil "#CCC"))
                     :border-radius 5
                     :margin-top 30
                     :margin-bottom 20
                     :padding "20px 5px 5px 15px"
                     :position "relative"}}
       (condp = overlay
         :missing [:<>
                   [:div {:style {:z-index 1000
                                  :color "rgb(255,0,0)"
                                  :border "3px solid rgb(255,0,0)"
                                  :border-radius 5
                                  :background-color "#fec"
                                  :padding "2px 5px"
                                  :position "absolute"
                                  :top "-20px"
                                  :right "20px"}}
                    "Warning: some inputs are missing"]
                   [:div {:style {:z-index 500
                                  :background-color "#AAA"
                                  :padding 0
                                  :position "absolute"
                                  :top 0
                                  :right 0
                                  :bottom 0
                                  :left 0
                                  :display "flex"
                                  :align-items "center"
                                  :justify-content "center"
                                  }}
                    [:h2 {:flex "auto"
                          :style {:color "#fff"
                                  :text-align "center"
                                  :width 400}}
                     "Results will appear here once all inputs have been entered."]
                    ]]
         :unknowns [:<>
                   [:div {:style {:z-index 1000
                                  :color "teal"
                                  :border "3px solid teal"
                                  :border-radius 5
                                  :background-color "#fec"
                                  :padding "2px 5px"
                                  :position "absolute"
                                  :top "-20px"
                                  :right "20px"}}
                    "Average values were used for some inputs"]
                   [:div {:style {:z-index 500
                                  :background-color "#fec2"
                                  :padding 0
                                  :position "absolute"
                                  :pointer-events "none" ; to allow click through
                                  :top 0
                                  :right 0
                                  :bottom 0
                                  :left 0}}]]
         nil nil)
       #_[:p "These are the outcomes we would expect for people who entered the same information as you, based
        on patients who joined the waiting list between "
          (get-in env [:cohort-dates :from-year]) " and " (get-in env [:cohort-dates :to-year]) "."]
       [:section
        [ui/tabs {:variant "pills" :default-active-key (:selected-vis env)
                  :active-key (:selected-vis env)
                  :on-select #(rf/dispatch [::events/selected-vis %])}
         [ui/tab {:event-key "bars" :title "Bar Chart"}
          [vis/bar-chart env]]

         [ui/tab {:event-key "area" :title "Area Chart"}
          [vis/area-chart env]]

         [ui/tab {:event-key "icons" :title "Icon Array"}
          [vis/icon-array env]]

         [ui/tab {:event-key "table" :title "Table"}
          [vis/table env]]

         [ui/tab {:variant "secondary"
                  :event-key "test" :title "[Test]"}
          [vis/test-rig (conj env
                              [:rubric [[:h4 "Test Rig"]]]
                              [:bar-info nil])]]]

        #_(let [tool-mdata (get-in @(rf/subscribe [::subs/mdata])
                                 [organ :tools tool])]
          (:rest-of-page tool-mdata))]
       ])))