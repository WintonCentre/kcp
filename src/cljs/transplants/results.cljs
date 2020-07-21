(ns transplants.results
  (:require [re-frame.core :as rf]
            [transplants.subs :as subs]
            [transplants.bundles :as bun]
            [transplants.test-rig :as rig]))


(comment
  (def bundles @(rf/subscribe [::subs/bundles]))
  (def bundle (get-in bundles [:lung :birm :waiting]))
  (def day 100)
  (:-baseline-cifs bundle)
  (def baseline-cifs-for-day (bun/cif-0 bundle day))
  (def outcome-keys [:cif-all-reasons :cif-transplant :cif-death :cif-removal ])
  (bun/cif-0 bundle day)
  )

(defn results-panel
  "Display results"
  [bundles organ centre tool]
  (let [day @(rf/subscribe [::subs/test-day])
        inputs (get @(rf/subscribe [::subs/inputs]) organ)
        bundle (bun/get-bundle organ centre tool)
        ]
    (rig/test-rig {:organ organ 
               :centre centre 
               :tool tool 
               :day day 
               :inputs inputs 
               :bundle bundle})
    ))