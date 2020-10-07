(ns transplants.results
  (:require [re-frame.core :as rf]
            [transplants.subs :as subs]
            [transplants.bundles :as bun]
            [transplants.vis :as vis]
            ["react-bootstrap" :as bs]
            ["recharts" :as rech]
            [transplants.ui :as ui]
            [transplants.bsio :as bsio]))

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
                     :margin {:top 55
                              :right 10
                              :left 20
                              :bottom 0}}
   [:> rech/CartesianGrid {:stroke "#ccc"
                           :strokeDasharray "5 5"}]
   [:> rech/XAxis {:dataKey "name"}]
   [:> rech/YAxis {:dataKey "pv"}]
   [:> rech/Tooltip]
   
   #_[:> rech/Bar {:type "monotone"
                   :dataKey "uv"
                   :stroke-width 5
                   :stroke "#82ca9d"
                   :fill "blue"}]
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
        bundle (bun/get-bundle organ centre tool)]

    [ui/tabs {:variant "pills" :default-active-key "bars"}
     #_[ui/tab {:event-key "starter" :title "SVG Starter"}
        [vis/svg-starter]]
     [ui/tab {:event-key "bars" :title "Bar Chart"}
      [vis/bar-chart bundles organ centre tool inputs bundle]]
     [ui/tab {:variant "secondary"
              :event-key "test" :title "Test"}
      [vis/test-rig {:organ organ
                     :centre centre
                     :tool tool
                     :day day
                     :inputs inputs
                     :bundle bundle}]]
     [ui/tab {:event-key "icons" :title "Icon Array"}
      [:div "not yet"]]
     [ui/tab {:event-key "line" :title "Line Chart"}
      #_[vis/line-chart bundles organ centre tool inputs bundle]
      #_[line-chart test-data]
      [:div "not yet"]]
     [ui/tab {:event-key "table" :title "Table"}
      [:div "not yet"]]]))
