(ns transplants.results
  (:require [re-frame.core :as rf]
            [transplants.subs :as subs]
            [transplants.bundles :as bun]
            [transplants.vis :as vis]
            ["recharts" :as rech]
            [transplants.ui :as ui]))

(comment
  (def bundles @(rf/subscribe [::subs/bundles]))
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

(defn line-chart
  [data]
  
  [:> rech/BarChart {:width 600
                     :height 400
                     :data data
                       ;:padding
                     :margin {:top 0
                              :right 10
                              :left 20
                              :bottom 0}}
   [:> rech/CartesianGrid {:stroke "#ccc"
                           :strokeDasharray "5 5"}]
   [:> rech/XAxis {:dataKey "name"}]
   [:> rech/YAxis {:dataKey "pv"}]
   [:> rech/Tooltip]

     ; The legend height has to be zero or it will cause a jump reduction of chart height
     ; on roll over if tooltips are enabled
   [:> rech/Legend {:width 100
                    :wrapperStyle  {:width 600
                                    :height 0
                                    :bottom 0
                                      ;:left 300
                                      ;:background-color "#fff"
                                      ;:border "20px solid #d5d5d5"
                                      ;:border-radius 20
                                    :line-height 0}}]
   [:> rech/Bar {:type "monotone"
                 :dataKey "pv"
                 :stroke "red"
                 :fill "orange"
                 :strokeDasharray "5 5"}]])
      ;[:> rech/Legend]


(defn results-panel
  "Display results"
  [bundles organ centre tool]
  (let [day @(rf/subscribe [::subs/test-day])
        inputs (get @(rf/subscribe [::subs/inputs]) organ)
        bundle (bun/get-bundle organ centre tool)
        {:keys [from-year to-year]} @(rf/subscribe [::subs/cohort-dates])]

    [:<>
     [:p "These are the outcomes we would expect for people who entered the same information as you, based
        on patients who joined the waiting list between " from-year " and " to-year "."]
     [ui/tabs {:variant "pills" :default-active-key "bars"}
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
                                      :title "How long are these people stay on the list?"
                                      :label "Still waiting" :fill "#7C91D8" :ciff nth :hide false}
                                     {:key "transplant" :label "Transplanted" :fill "#5BC17B" :ciff nth :hide true}
                                     {:key "removal" :label "Removed" :fill "#7F807C" :ciff nth :hide true}
                                     {:key "death" :label "Died" :fill "#000" :ciff nth :hide true}]}]
          [vis/bar-chart {:organ organ
                          :centre centre
                          :tool tool
                          :inputs inputs
                          :bundle bundle
                          :rubric [:<>
                                   [:h4 "When are these people likely to receive a transplant?"]
                                   [:p "The Year 2 value tells you how many people are likely to get a transplant 
                                        in year 2 after already having waited one year."]]

                          :bar-info [{:key "waiting" :label "Waiting" :fill "#7C91D8" :ciff nth :hide true}
                                     {:key "transplant" :label "Transplanted" :fill "#5BC17B" :ciff nth}
                                     {:key "removal" :label "Removed" :fill "#7F807C" :ciff nth :hide true}
                                     {:key "death" :label "Died" :fill "#000" :ciff nth :hide true}]}]

          [vis/bar-chart {:organ organ
                          :centre centre
                          :tool tool
                          :inputs inputs
                          :bundle bundle
                          :rubric [:<>
                                   [:h4 "Some of these people may die or be removed from the list"]]
                          :bar-info [{:key "waiting" :label "Waiting" :fill "#7C91D8" :ciff nth :hide true}
                                     {:key "transplant" :label "Transplanted" :fill "#5BC17B" :ciff nth :hide true}
                                     {:key "removal" :label "Removed" :fill "#7F807C" :ciff nth :stack-id "a"}
                                     {:key "death" :label "Died" :fill "#000" :ciff nth :stack-id "b"}
                                     {:key "died or removed" :label "Died or removed" :fill "#666" :stroke "#000" :hide true
                                      :ciff (fn [cifs i] (apply + (map #(nth cifs %) [2 3])))}]}]

          [vis/bar-chart {:organ organ
                          :centre centre
                          :tool tool
                          :inputs inputs
                          :bundle bundle
                          :rubric [:<>
                                   [:h4 "Sanity check on model"]
                                   [:p "Top of stacked bars should be close to 100%"]]
                          :bar-info [{:key "waiting"
                                      :stack-id "a"
                                      :bar-label {:fill "#fff" :at :centre}
                                      :title "How long are these people stay on the list?"
                                      :label "Still waiting" :fill "#7C91D8" :ciff nth :hide false}
                                     {:key "transplant"
                                      :stack-id "a"
                                      :bar-label :none
                                      :label "Transplanted" :fill "#5BC17B" :ciff nth :hide false}
                                     {:key "removal"
                                      :stack-id "a"
                                      :bar-label :none
                                      :label "Removed" :fill "#7F807C" :ciff nth :hide false}
                                     {:key "death"
                                      :stack-id "a"
                                      :bar-label :none
                                      :label "Died" :fill "#000" :ciff nth :hide false}]}]]
         :post-transplant
         [vis/bar-chart {:organ organ
                         :centre centre
                         :tool tool
                         :inputs inputs
                         :bundle bundle
                         :rubric [:h4 "About how long do these people survive after a transplant?"]                     
                         :bar-info [{:key "post-transplant" :label "Survival post-transplant" :fill "#927AAA" :ciff nth :hide false}]}]

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
                         :bar-info [{:key "survival" :label "Patient survival post-transplant" :fill "#927AAA" :ciff nth :hide false}]}]

         :graft
         [vis/bar-chart {:organ organ
                         :centre centre
                         :tool tool
                         :inputs inputs
                         :bundle bundle
                         :rubric [:h4 "About how long does the graft survive?"]
                        :bar-info [{:key "graft" :label "Graft survival" :fill "#5BC17B" :ciff nth :hide false}]}])

       ]
      
      [ui/tab {:event-key "line" :title "Line Chart"}
       #_[vis/line-chart organ centre tool inputs bundle]
       #_[line-chart test-data]
       [:div "not yet"]]
      [ui/tab {:event-key "icons" :title "Icon Array"}
       [:div "not yet"]]
      [ui/tab {:event-key "table" :title "Table"}
       [:div "not yet"]]
      [ui/tab {:variant "secondary"
               :event-key "test" :title "Test"}
       [vis/test-rig {:organ organ
                      :centre centre
                      :tool tool
                      :day day
                      :inputs inputs
                      :bundle bundle}]]]]))
