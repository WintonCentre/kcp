(ns kcp.results
  (:require [re-frame.core :as rf]
            [reagent.core :as r]
            [kcp.events :as events]
            [kcp.subs :as subs]
            [kcp.factors :as fac]
            [kcp.bundles :as bun]
            [kcp.model :as model]
            [kcp.vis2 :as vis]
            [kcp.ui :as ui]
            [kcp.rgb :as rgb]
            [kcp.fullscreen :as fs]
            [kcp.shortener :as shorts]
            [shadow.debug :refer [locals ?> ?->]]
            ))

(defn full-screen-overlay-button
  "add full screen overlay button"
  [path]
  [:div {:style {:z-index 500
                 :background-color "#fec2"
                 :padding 0
                 :position "absolute"
                 :right 10
                 :bottom -14}}
   [fs/full-screen-wrapper path]])

(defn results-panel
  "Display results.
   TODO: REMOVE HARD_CODED TOOL KEYWORDS AND TEXTS"
  [{:keys [organ centre tool bare centre-info] :as path}]
  (let [day @(rf/subscribe [::subs/test-day])
        mdata @(rf/subscribe [::subs/mdata])
        {:keys [fmaps outcome-keys
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
             :inputs @(rf/subscribe [::subs/inputs])
             :selected-vis @(rf/subscribe [::subs/selected-vis])}
        total-score (+
                     (get-in env [:fmaps :t-stage :levels (get-in env [:inputs :t-stage]) :score])
                     (get-in env [:fmaps :n-stage :levels (get-in env [:inputs :n-stage]) :score])
                     (get-in env [:fmaps :tumor-size :levels (get-in env [:inputs :tumor-size]) :score])
                     (get-in env [:fmaps :nuclear-grade :levels (get-in env [:inputs :nuclear-grade]) :score])
                     (get-in env [:fmaps :histologic-tumor-necrosis :levels (get-in env [:inputs :histologic-tumor-necrosis]) :score]))

        ;; We use all of S0 till it gets to be too slow. May need to query tool and vis here.
        ;; Switching s0 is enough
        s0 all-S0
        s0-for-day (model/S0-for-day s0 day)
        sum-betas (map #(fac/sum-beta-xs env %) beta-keys)
        cox? (model/use-cox-adjusted? tool)
        F (if cox?
            (model/cox-adjusted s0 sum-betas)
            (model/cox-only s0 sum-betas))

        env (conj env
                  [:sum-betas sum-betas]
                  [:s0 s0]
                  [:s0-for-day s0-for-day]
                  [:cox? cox?]
                  [:F F])

        inputs (:inputs env)
        required-inputs (keys fmaps)
        fulfilled-inputs (select-keys inputs required-inputs)
        missing #_false (< (count fulfilled-inputs) (count required-inputs))
        unknowns (some #(= (get inputs %) :unknown) required-inputs)
        overlay (if missing :missing (if unknowns :unknowns nil))
        is-full-screen @(rf/subscribe [::subs/is-full-screen])]

    (when (:S0 env)
      [:<>
       (rf/dispatch [::events/missing-inputs missing])

       (if bare
         [:<>
          [:p
           "Run model from URI and return result as EDN"]
          [:div [vis/test-gen (assoc env
                                     :fulfilled-inputs fulfilled-inputs
                                     :centre-info centre-info)]]]
         [:<>
          [:div.no-printed-border {:style {:background-color "#fff"
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
                                      :background-color "#fff"
                                      :padding "2px 5px"
                                      :position "absolute"
                                      :top "-20px"
                                      :right "20px"}}
                        "Warning: some inputs are missing"]
                       [:div {:style {:z-index 500
                                      :background-color rgb/theme
                                      :padding 0
                                      :position "absolute"
                                      :top 0
                                      :right 0
                                      :bottom 0
                                      :left 0
                                      :display "flex"
                                      :align-items "center"
                                      :justify-content "center"}}
                        [:h2 {:flex "auto"
                              :style {:color "#fff"
                                      :text-align "center"
                                      :width 400}}
                         "Results will appear here once all inputs have been entered."]]]
             :unknowns [:<>
                        [:div.no-printed-border.to-left {:style {:z-index 1000
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
                                       :position "relative" #_"absolute"
                                       :pointer-events "none" ; to allow click through
                                       :top 0
                                       :right 0
                                       :bottom 0
                                       :left 0}}]
                        [full-screen-overlay-button path]]
             nil     [full-screen-overlay-button path])

           ;; Place test-data near top for etaoin bababshka-pod


           [:section {:style {:margin (if is-full-screen "10%" "0")
                              :max-width (if is-full-screen "80%" "100%")
                              :display (when (=  (:selected-vis env) "test") "none")}}
            [:h1 (cond
                   (<= total-score 2) [:div {:style {:color "#ff9933"}}
                                       [:h2 "Low Risk"]
                                       [:h6 (str "Leibovich Score: " total-score)]]
                   (>= total-score 6) [:div {:style {:color "#ff4000"}}
                                       [:h2 "High Risk"]
                                       [:h6 (str "Leibovich Score: " total-score)]]
                   :default [:div {:style {:color "#ff751a"}}
                             [:h2 "Intermediate Risk"]
                             [:h6 (str "Leibovich Score: " total-score)]])]

            [ui/tabs {:variant "pills" :default-active-key (:selected-vis env)
                      :active-key (:selected-vis env)
                      :on-select #(rf/dispatch [::events/navigate :kcp.views/organ-centre-tool-tab-inputs
                                                (assoc path
                                                       :tab %
                                                       :inputs (shorts/db-to-URI (:lookups mdata) inputs))])}
             [ui/tab {:event-key "bars" :title "Bar Chart"}
              [vis/bar-chart env]]

             [ui/tab {:event-key "area" :title "Area Chart"}
              [vis/area-chart env]]

             [ui/tab {:event-key "icons" :title "Icon Array"}
              [vis/icon-array env]]

             [ui/tab {:event-key "table" :title "Table"}
              [:div {:style {:font-size (if is-full-screen "300%" "100%")}}
               [vis/table env]]]

             [ui/tab {:event-key "text" :title "Text"}
              [:div {:style {:font-size (if is-full-screen "200%" "100%")}}
               [vis/text env]]]

             ;; we normally don't want the test tab to be displayed
             #_[ui/tab {:event-key "test" :title "Test"}
                [:div {:style {:font-size (if is-full-screen "200%" "100%")}}
                 [vis/test-gen env]]]]]]])])))