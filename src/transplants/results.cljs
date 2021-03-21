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

#_(defn survival [outcome baseline-cifs sum-x-betas oct-bundle day]
  (let [s-outcome-day (js/Math.pow (bun/cif-0 oct-bundle day) (js/Math.exp sum-x-betas))]))

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
  (def env [oct-names oct-bundle inputs])
  (def  sum-betas (map #(fac/sum-beta-xs env %) beta-outcome-keys))
  0)

(def waiting-fill "#0088EE" #_"#7C91D8")
(def transplant-fill "#66CC88" #_"#44dd99")
(def death-fill "#002244")
(def survival-fill "#927AAA")
(def graft-fill "#0099DD")

(defn results-panel
  "Display results.
   TODO: REMOVE HARD_CODED TOOL KEYWORDS AND TEXTS"
  [organ centre tool]
  (let [day @(rf/subscribe [::subs/test-day])
        inputs (get @(rf/subscribe [::subs/inputs]) organ)
        bundle (bun/get-bundle organ centre tool)
        env {:organ organ 
             :centre centre 
             :tool tool
             :bundle bundle
             :inputs inputs
             :path-params {:organ organ
                           :centre centre
                           :tool tool}}
        {:keys [fmaps baseline-cifs baseline-vars outcome-keys timed-outcome-keys beta-keys outcomes S0 all-S0]} bundle
        {:keys [from-year to-year]} @(rf/subscribe [::subs/cohort-dates])
        selected-vis @(rf/subscribe [::subs/selected-vis])
        sum-betas (map #(fac/sum-beta-xs env %) beta-keys)

        ;; use all of S0 till it gets to be too slow. May need to query tool and vis here.
        ;; Switching s0 is enough
        s0 all-S0
        s0-for-day (model/S0-for-day s0 day)

        cox? (model/use-cox-adjusted? tool)
        F (if (= selected-vis "test")
            (model/cox s0-for-day sum-betas)
            (model/cox-adjusted s0 sum-betas))

        venv {:organ organ
              :centre centre
              :tool tool
              :selected-vis selected-vis
              :inputs inputs
              :fmaps fmaps
              :bundle bundle
              :sum-betas sum-betas
              :from-year from-year
              :to-year to-year
              :day day
              :s0 s0
              :s0-for-day s0-for-day
              :cox? cox?
              :F F
              :outcomes outcomes
              :outcome-keys outcome-keys
              :timed-outcome-keys timed-outcome-keys}]
    (locals)
    #_[:div "not yet"]
    [:<>
     [:p "These are the outcomes we would expect for people who entered the same information as you, based
        on patients who joined the waiting list between " from-year " and " to-year "."]
     [ui/tabs {:variant "pills" :default-active-key selected-vis
               :active-key selected-vis
               :on-select #(rf/dispatch [::events/selected-vis %])}
      [ui/tab {:event-key "bars" :title "Bar Chart"}
       (condp = tool
         :waiting
         [:<>
          [vis/bar-chart {:organ organ
                          :centre centre
                          :tool tool
                          :inputs inputs
                          :bundle bundle
                          :rubric [:<>
                                   [:h4 "Proportions of people waiting, transplanted, died or removed"]
                                   [:p "As time goes by, people on the waiting list either receive a transplant or leave the list due to death or some other reason."]]
                          :bar-info [{:key "transplant"
                                      :stack-id "a"
                                      :bar-label :none
                                      :label "Transplanted" 
                                      :fill transplant-fill 
                                      :ciff nth 
                                      :hide false}
                                     {:key "waiting"
                                      :stack-id "a"
                                      :bar-label {:fill "#fff" :at :centre}
                                      :title "How long do people stay on the list?"
                                      :label "Still waiting"
                                      :fill waiting-fill
                                      :ciff (fn [cifs i]
                                              (- 200
                                                 (+ (nth cifs 0)
                                                    (- 100 (nth cifs 2))))) 
                                      :hide false}
                                     {:key "death"
                                      :stack-id "a"
                                      :bar-label :none
                                      :label "Died or Removed" 
                                      :fill death-fill 
                                      :ciff (fn [cifs i] (- 100 (nth cifs 2))) 
                                      :hide false}]
                          :y-range [0 200]}]]
         :post-transplant
         [vis/bar-chart {:organ organ
                         :centre centre
                         :tool tool
                         :inputs inputs
                         :bundle bundle
                         :rubric [:h4 "About how long do people survive after a transplant?"]
                         :bar-info [{:key "post-transplant" :label "Survival post-transplant" :fill survival-fill :ciff nth :hide false}]}]

         :survival
         [vis/bar-chart {:organ organ
                         :centre centre
                         :tool tool
                         :inputs inputs
                         :bundle bundle
                         :rubric [:h4 "About how long do people survive after a transplant?"]
                         :bar-info [{:key "survival" :label "Patient survival post-transplant" :fill survival-fill :ciff nth :hide false}]}]

         :graft
         [vis/bar-chart {:organ organ
                         :centre centre
                         :tool tool
                         :inputs inputs
                         :bundle bundle
                         :rubric [:h4 "About how long does the graft survive?"]
                         :bar-info [{:key "graft" :label "Graft survival" :fill graft-fill :ciff nth :hide false}]}]
         :ldsurvival
         [vis/bar-chart {:organ organ
                         :centre centre
                         :tool tool
                         :inputs inputs
                         :bundle bundle
                         :rubric [:h4 "About how long do people survive after a transplant from a living donor?"]
                         :bar-info [{:key "ldsurvival" :label "Patient survival post-transplant" :fill survival-fill :ciff nth :hide false}]}]

         :ldgraft
         [vis/bar-chart {:organ organ
                         :centre centre
                         :tool tool
                         :inputs inputs
                         :bundle bundle
                         :rubric [:h4 "About how long does the graft from a living donor survive?"]
                         :bar-info [{:key "ldgraft" :label "Graft survival" :fill graft-fill :ciff nth :hide false}]}])]


      [ui/tab {:event-key "area" :title "Area Chart"}
       #_(condp = tool
           :waiting
           [vis/area-chart {:organ organ
                            :centre centre
                            :tool tool
                            :inputs inputs
                            :bundle bundle
                            :rubric [:<>
                                     [:h4 "Proportions of people waiting, transplanted, died or removed"]
                                     [:p "As time goes by, people on the waiting list either receive a transplant or leave the list due to death or some other reason."]]
                            :bar-info [{:key "transplant"
                                        :stack-id "a"
                                        :bar-label :none
                                        :label "Transplanted" :fill transplant-fill :ciff nth :hide false}
                                       {:key "waiting"
                                        :stack-id "a"
                                        :bar-label {:fill "#fff" :at :centre}
                                        :title "How long are these people stay on the list?"
                                        :label "Still waiting" :fill waiting-fill :ciff (fn [cifs i]
                                                                                          (- 200
                                                                                             (+ (nth cifs 0)
                                                                                                (- 100 (nth cifs 2))))) :hide false}
                                       {:key "death"
                                        :stack-id "a"
                                        :bar-label :none
                                        :label "Died" :fill death-fill :ciff (fn [cifs i] (- 100 (nth cifs 2))) :hide false}]
                            :y-range [0 200]}]

           :post-transplant
           [vis/area-chart {:organ organ
                            :centre centre
                            :tool tool
                            :inputs inputs
                            :bundle bundle
                            :rubric [:h4 "About how long do these people survive after a transplant?"]
                            :bar-info [{:key "post-transplant" :label "Survival post-transplant" :fill survival-fill :ciff nth :hide false}]}]

           :from-listing
           [vis/area-chart {:organ organ
                            :centre centre
                            :tool tool
                            :inputs inputs
                            :bundle bundle
                            :rubric [:h4 "About how long do these people survive after being listed?"]
                            :bar-info [{:key "from-listing" :label "Survival from listing" :fill "#7A79C2" :ciff nth :hide false}]}]

           :survival
           [vis/area-chart {:organ organ
                            :centre centre
                            :tool tool
                            :inputs inputs
                            :bundle bundle
                            :rubric [:h4 "About how long do these people survive after a transplant?"]
                            :bar-info [{:key "survival" :label "Patient survival post-transplant" :fill survival-fill :ciff nth :hide false}]}]

           :graft
           [vis/area-chart {:organ organ
                            :centre centre
                            :tool tool
                            :inputs inputs
                            :bundle bundle
                            :rubric [:h4 "About how long does the graft survive?"]
                            :bar-info [{:key "graft" :label "Graft survival" :fill graft-fill :ciff nth :hide false}]}]
           :ldsurvival
           [vis/area-chart {:organ organ
                            :centre centre
                            :tool tool
                            :inputs inputs
                            :bundle bundle
                            :rubric [:h4 "About how long do these people survive after a transplant from a living donor?"]
                            :bar-info [{:key "ldsurvival" :label "Patient survival post-transplant" :fill survival-fill :ciff nth :hide false}]}]

           :ldgraft
           [vis/area-chart {:organ organ
                            :centre centre
                            :tool tool
                            :inputs inputs
                            :bundle bundle
                            :rubric [:h4 "About how long does the graft survive?"]
                            :bar-info [{:key "ldgraft" :label "Graft survival" :fill graft-fill :ciff nth :hide false}]}])]
      [ui/tab {:event-key "icons" :title "Icon Array"}
       #_(condp = tool
           :waiting
           [:<>
            [vis/icon-array {:organ organ
                             :centre centre
                             :tool tool
                             :inputs inputs
                             :bundle bundle
                             :rubric [:<>
                                      [:h4 "About how long do these people stay on the list?"]
                                      [:p "People will leave the list if they get a transplant, die,
                                       or are removed for some other reason."]]
                             :bar-info [{:key "waiting"
                                         :title "How long do these people stay on the list?"
                                         :label "Still waiting" :fill waiting-fill :ciff nth :hide false}
                                        {:key "transplant" :label "Transplanted" :fill transplant-fill :ciff nth :hide true}
                                        {:key "death" :label "Died" :fill death-fill :ciff nth :hide true}]}]
            [vis/icon-array {:organ organ
                             :centre centre
                             :tool tool
                             :inputs inputs
                             :bundle bundle
                             :rubric [:<>
                                      [:h4 "When are these people likely to receive a transplant?"]
                                      [:p "By way of example, the 'Year 2' value tells you how many people are likely to get a transplant  in year 2 after already having waited one year."]]

                             :bar-info [{:key "waiting" :label "Waiting" :fill waiting-fill :ciff nth :hide true}
                                        {:key "transplant" :label "Transplanted" :fill transplant-fill :ciff nth}
                                        {:key "death" :label "Died" :fill death-fill :ciff nth :hide true}]}]

            [vis/icon-array {:organ organ
                             :centre centre
                             :tool tool
                             :inputs inputs
                             :bundle bundle
                             :rubric [:<>
                                      [:h4 "Some of these people may die or be removed from the list"]]
                             :bar-info [{:key "waiting" :label "Waiting" :fill waiting-fill :ciff nth :hide true}
                                        {:key "transplant" :label "Transplanted" :fill transplant-fill :ciff nth :hide true}
                                        {:key "death" :label "Died" :fill death-fill :ciff nth :stack-id "b"}
                                        #_{:key "died or removed" :label "Died or removed" :fill "#666" :stroke death-fill :hide true
                                           :ciff (fn [cifs i] (apply + (map #(nth cifs %) [2 3])))}]}]

            [vis/icon-array {:organ organ
                             :centre centre
                             :tool tool
                             :inputs inputs
                             :bundle bundle
                             :rubric [:<>
                                      [:h4 "Sanity check on model"]
                                      [:p "The top of each stacked bar should always be close to 100%. 
                                        However, each bar shows the combined result of 4 independent 
                                        statistical models, each with its own error."]]
                             :bar-info [{:key "waiting"
                                         :stack-id "a"
                                         :bar-label {:fill "#fff" :at :centre}
                                         :title "How long are these people stay on the list?"
                                         :label "Still waiting" :fill waiting-fill :ciff nth :hide false}
                                        {:key "transplant"
                                         :stack-id "a"
                                         :bar-label :none
                                         :label "Transplanted" :fill transplant-fill :ciff nth :hide false}
                                        {:key "death"
                                         :stack-id "a"
                                         :bar-label :none
                                         :label "Died" :fill death-fill :ciff nth :hide false}]}]]
           :post-transplant
           [vis/icon-array {:organ organ
                            :centre centre
                            :tool tool
                            :inputs inputs
                            :bundle bundle
                            :rubric [:h4 "About how long do these people survive after a transplant?"]
                            :bar-info [{:key "post-transplant" :label "Survival post-transplant" :fill survival-fill :ciff nth :hide false}]}]

           :from-listing
           [vis/icon-array {:organ organ
                            :centre centre
                            :tool tool
                            :inputs inputs
                            :bundle bundle
                            :rubric [:h4 "About how long do these people survive after being listed?"]
                            :bar-info [{:key "from-listing" :label "Survival from listing" :fill "#7A79C2" :ciff nth :hide false}]}]

           :survival
           [vis/icon-array {:organ organ
                            :centre centre
                            :tool tool
                            :inputs inputs
                            :bundle bundle
                            :rubric [:h4 "About how long do these people survive after a transplant?"]
                            :bar-info [{:key "survival" :label "Patient survival post-transplant" :fill survival-fill :ciff nth :hide false}]}]

           :graft
           [vis/icon-array {:organ organ
                            :centre centre
                            :tool tool
                            :inputs inputs
                            :bundle bundle
                            :rubric [:h4 "About how long does the graft survive?"]
                            :bar-info [{:key "graft" :label "Graft survival" :fill graft-fill :ciff nth :hide false}]}]
           :ldsurvival
           [vis/icon-array {:organ organ
                            :centre centre
                            :tool tool
                            :inputs inputs
                            :bundle bundle
                            :rubric [:h4 "About how long do these people survive after a transplant from a living donor?"]
                            :bar-info [{:key "ldsurvival" :label "Patient survival post-transplant" :fill survival-fill :ciff nth :hide false}]}]

           :ldgraft
           [vis/icon-array {:organ organ
                            :centre centre
                            :tool tool
                            :inputs inputs
                            :bundle bundle
                            :rubric [:h4 "About how long does the graft from a living donor survive?"]
                            :bar-info [{:key "ldgraft" :label "Graft survival" :fill graft-fill :ciff nth :hide false}]}])]
      [ui/tab {:event-key "table" :title "Table"}
       [:div "not yet"]]

      [ui/tab {:variant "secondary"
               :event-key "test" :title "[Test]"}
       [:div "not-yet"]
       #_
       [vis/test-rig {:organ organ
                      :centre centre
                      :tool tool
                      :day day
                      :inputs inputs
                      :bundle bundle
                      :rubric [[:h4 "Test Rig"]]
                      :bar-info nil}]]]]))
