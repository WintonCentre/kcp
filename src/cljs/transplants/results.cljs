(ns transplants.results
  (:require [transplants.model :as model]
            [re-frame.core :as rf]
            [transplants.subs :as subs]))

(defn results-panel
  "Display results"
  [organ tool]
  (let [inputs (get @(rf/subscribe [::subs/inputs]) organ)
        master-f-maps @(rf/subscribe [::subs/master-f-maps])
        factors (keys master-f-maps) ]
    [:<> 
     [:h3 "Results"]
     (when factors
       [:p "Factors are: " (pr-str factors)])
     (when (every? #(get inputs %) factors)
       "All inputs present")
    
     [:p "Age = " (:age inputs)]]))