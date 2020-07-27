(ns transplants.results
  (:require [re-frame.core :as rf]
            [transplants.subs :as subs]
            [transplants.bundles :as bun]
            [transplants.vis :as vis]
            ["react-bootstrap" :as bs]
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

(defn results-panel
  "Display results"
  [bundles organ centre tool]
  (let [day @(rf/subscribe [::subs/test-day])
        inputs (get @(rf/subscribe [::subs/inputs]) organ)
        bundle (bun/get-bundle organ centre tool)]


    [ui/tabs {:variant "pills" :default-active-key "bars"}
     [ui/tab {:event-key "starter" :title "SVG Starter"}
      [vis/svg-starter]]
     [ui/tab {:event-key "line" :title "Line Chart"}
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


     [ui/tab {:event-key "table" :title "Table"}
      [:div "hello"]]]))