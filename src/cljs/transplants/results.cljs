(ns transplants.results
  (:require [re-frame.core :as rf]
            [transplants.events :as events]
            [transplants.subs :as subs]
            [transplants.bundles :as bun]
            [transplants.vis :as vis]
            ["recharts" :as rech]
            [transplants.ui :as ui]))

  (def bundles @(rf/subscribe [::subs/bundles]))
(comment
  (def bundle (get-in bundles [:lung :birm :waiting]))
  (def day 100)
  (:-baseline-cifs bundle)
  (def baseline-cifs-for-day (bun/cif-0 bundle day))
  (def outcome-keys [:cif-all-reasons :cif-transplant :cif-removal :cif-death])
  (bun/cif-0 bundle day)
  )

(def test-data #js [#js {"name" "Page A" "uv" 4000 "pv" 2400 "amt" 2400}
                    #js {"name" "Page B" "uv" 3000 "pv" 1398 "amt" 2210}
                    #js {"name" "Page C" "uv" 2000 "pv" 9800 "amt" 2290}
                    #js {"name" "Page D" "uv" 2780 "pv" 3908 "amt" 2000}
                    #js {"name" "Page E" "uv" 1890 "pv" 4800 "amt" 2181}
                    #js {"name" "Page F" "uv" 2390 "pv" 3800 "amt" 2500}
                    #js {"name" "Page G" "uv" 3490 "pv" 4300 "amt" 2100}])

(def waiting-fill "#0088EE" #_"#7C91D8")
(def transplant-fill "#66CC88" #_"#44dd99")
(def death-fill "#002244")
(def removal-fill "#FF4455" #_"#777777")
(def survival-fill "#927AAA")
(def graft-fill "#0099DD")

(defn results-panel
  "Display results.
   TODO: REMOVE HARD_CODED TOOL KEYWORDS AND TEXTS"
  [bundles organ centre tool]
  ;(println ::results-panel "render")
  (let [day @(rf/subscribe [::subs/test-day])
        inputs (get @(rf/subscribe [::subs/inputs]) organ)
        bundle (bun/get-bundle organ centre tool)
        {:keys [from-year to-year]} @(rf/subscribe [::subs/cohort-dates])
        selected-vis @(rf/subscribe [::subs/selected-vis])]

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
                                   [:h4 "About how long do these people stay on the list?"]
                                   [:p "People will leave the list if they get a transplant, die,
                                       or are removed for some other reason."]]
                          :bar-info [{:key "waiting"
                                      :title "How long do these people stay on the list?"
                                      :label "Still waiting" :fill waiting-fill :ciff nth :hide false}
                                     {:key "transplant" :label "Transplanted" :fill transplant-fill :ciff nth :hide true}
                                     {:key "removal" :label "Removed" :fill removal-fill :ciff nth :hide true}
                                     {:key "death" :label "Died" :fill death-fill :ciff nth :hide true}]}]
          [vis/bar-chart {:organ organ
                          :centre centre
                          :tool tool
                          :inputs inputs
                          :bundle bundle
                          :rubric [:<>
                                   [:h4 "When are these people likely to receive a transplant?"]
                                   [:p "By way of example, the 'Year 2' value tells you how many people are likely to get a transplant  in year 2 after already having waited one year."]]

                          :bar-info [{:key "waiting" :label "Waiting" :fill waiting-fill :ciff nth :hide true}
                                     {:key "transplant" :label "Transplanted" :fill transplant-fill :ciff nth}
                                     {:key "removal" :label "Removed" :fill removal-fill :ciff nth :hide true}
                                     {:key "death" :label "Died" :fill death-fill :ciff nth :hide true}]}]

          [vis/bar-chart {:organ organ
                          :centre centre
                          :tool tool
                          :inputs inputs
                          :bundle bundle
                          :rubric [:<>
                                   [:h4 "Some of these people may die or be removed from the list"]]
                          :bar-info [{:key "waiting" :label "Waiting" :fill waiting-fill :ciff nth :hide true}
                                     {:key "transplant" :label "Transplanted" :fill transplant-fill :ciff nth :hide true}
                                     {:key "removal" :label "Removed" :fill removal-fill :ciff nth :stack-id "a"}
                                     {:key "death" :label "Died" :fill death-fill :ciff nth :stack-id "b"}
                                     #_{:key "died or removed" :label "Died or removed" :fill "#666" :stroke death-fill :hide true
                                        :ciff (fn [cifs i] (apply + (map #(nth cifs %) [2 3])))}]}]

          [vis/bar-chart {:organ organ
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
                                     {:key "removal"
                                      :stack-id "a"
                                      :bar-label :none
                                      :label "Removed" :fill removal-fill :ciff nth :hide false}
                                     {:key "death"
                                      :stack-id "a"
                                      :bar-label :none
                                      :label "Died" :fill death-fill :ciff nth :hide false}]}]]
         :post-transplant
         [vis/bar-chart {:organ organ
                         :centre centre
                         :tool tool
                         :inputs inputs
                         :bundle bundle
                         :rubric [:h4 "About how long do these people survive after a transplant?"]                     
                         :bar-info [{:key "post-transplant" :label "Survival post-transplant" :fill survival-fill :ciff nth :hide false}]}]

         :from-listing
         [vis/bar-chart {:organ organ
                         :centre centre
                         :tool tool
                         :inputs inputs
                         :bundle bundle
                         :rubric [:h4 "About how long do these people survive after being listed?"]
                         :bar-info [{:key "from-listing" :label "Survival from listing" :fill "#7A79C2" :ciff nth :hide false}]}]

         :survival
         [vis/bar-chart {:organ organ
                         :centre centre
                         :tool tool
                         :inputs inputs
                         :bundle bundle
                         :rubric [:h4 "About how long do these people survive after a transplant?"]
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
                         :rubric [:h4 "About how long do these people survive after a transplant from a living donor?"]
                         :bar-info [{:key "ldsurvival" :label "Patient survival post-transplant" :fill survival-fill :ciff nth :hide false}]}]

         :ldgraft
         [vis/bar-chart {:organ organ
                         :centre centre
                         :tool tool
                         :inputs inputs
                         :bundle bundle
                         :rubric [:h4 "About how long does the graft from a living donor survive?"]
                         :bar-info [{:key "ldgraft" :label "Graft survival" :fill graft-fill :ciff nth :hide false}]}])
       ]
      

      [ui/tab {:event-key "area" :title "Area Chart"}
       (do
         ;(rf/dispatch [::events/selected-vis "area"])
         (condp = tool
           :waiting
           [:<>
            [vis/area-chart {:organ organ
                             :centre centre
                             :tool tool
                             :inputs inputs
                             :bundle bundle
                             :rubric [:<>
                                      [:h4 "About how long do these people stay on the list?"]
                                      [:p "People will leave the list if they get a transplant, die,
                                       or are removed for some other reason."]]
                             :bar-info [{:key "waiting"
                                         :title "How long are these people stay on the list?"
                                         :label "Still waiting" :fill waiting-fill :ciff nth :hide false}
                                        {:key "transplant" :label "Transplanted" :fill transplant-fill :ciff nth :hide true}
                                        {:key "removal" :label "Removed" :fill removal-fill :ciff nth :hide true}
                                        {:key "death" :label "Died" :fill death-fill :ciff nth :hide true}]}]
            [vis/area-chart {:organ organ
                             :centre centre
                             :tool tool
                             :inputs inputs
                             :bundle bundle
                             :rubric [:<>
                                      [:h4 "When are these people likely to receive a transplant?"]
                                      [:p "By way of example, the 'Year 2' value tells you how many people are likely to get a transplant  in year 2 after already having waited one year."]]

                             :bar-info [{:key "waiting" :label "Waiting" :fill waiting-fill :ciff nth :hide true}
                                        {:key "transplant" :label "Transplanted" :fill transplant-fill :ciff nth}
                                        {:key "removal" :label "Removed" :fill removal-fill :ciff nth :hide true}
                                        {:key "death" :label "Died" :fill death-fill :ciff nth :hide true}]}]

            [vis/area-chart {:organ organ
                             :centre centre
                             :tool tool
                             :inputs inputs
                             :bundle bundle
                             :rubric [:<>
                                      [:h4 "Some of these people may die or be removed from the list"]]
                             :bar-info [{:key "waiting" :label "Waiting" :fill waiting-fill :ciff nth :hide true}
                                        {:key "transplant" :label "Transplanted" :fill transplant-fill :ciff nth :hide true}
                                        {:key "removal" :label "Removed" :stroke-width 2 :stroke removal-fill :fill "none" :ciff nth}
                                        {:key "death" :label "Died" :stroke-width 2 :stroke death-fill :fill "none" :ciff nth}
                                        {:key "died or removed" :label "Died or removed" :fill "#666" :stroke death-fill :hide true
                                         :ciff (fn [cifs i] (apply + (map #(nth cifs %) [2 3])))}]}]

            [vis/area-chart {:organ organ
                             :centre centre
                             :tool tool
                             :inputs inputs
                             :bundle bundle
                             :rubric [:<>
                                      [:h4 "Sanity check on model"]
                                      [:p "The height of this stacked chart should always be close to 100%. 
                                          However, as we are summing the results of 4 independent 
                                        statistical models, each with its own error, this is not always the case."]]
                             :bar-info [{:key "waiting"
                                         :stack-id "a"
                                        ;:bar-label {:fill "#fff" :at :centre}
                                        ;;:title "How long are these people stay on the list?"
                                         :label "Still waiting" :fill waiting-fill :ciff nth :hide false}
                                        {:key "transplant"
                                         :stack-id "a"
                                        ;:bar-label :none
                                         :label "Transplanted" :fill transplant-fill :ciff nth :hide false}
                                        {:key "removal"
                                         :stack-id "a"
                                        ;:bar-label :none
                                         :label "Removed" :fill removal-fill :ciff nth :hide false}
                                        {:key "death"
                                         :stack-id "a"
                                        ;:bar-label :none
                                         :label "Died" :fill death-fill :ciff nth :hide false}]}]]
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
                            :bar-info [{:key "ldgraft" :label "Graft survival" :fill graft-fill :ciff nth :hide false}]}]))]
      [ui/tab {:event-key "icons" :title "Icon Array"}       
       (condp = tool
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
                                      {:key "removal" :label "Removed" :fill removal-fill :ciff nth :hide true}
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
                                      {:key "removal" :label "Removed" :fill removal-fill :ciff nth :hide true}
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
                                      {:key "removal" :label "Removed" :fill removal-fill :ciff nth :stack-id "a"}
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
                                      {:key "removal"
                                       :stack-id "a"
                                       :bar-label :none
                                       :label "Removed" :fill removal-fill :ciff nth :hide false}
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
                          :bar-info [{:key "ldgraft" :label "Graft survival" :fill graft-fill :ciff nth :hide false}]}])
       ]
      [ui/tab {:event-key "table" :title "Table"}
       (do
         ;(rf/dispatch [::events/selected-vis "table"])
         [:div "not yet"])]
      [ui/tab {:variant "secondary"
               :event-key "test" :title "Test"}
       (do
         ;(rf/dispatch [::events/selected-vis "test"])
         [vis/test-rig {:organ organ
                        :centre centre
                        :tool tool
                        :day day
                        :inputs inputs
                        :bundle bundle}])]]]))
