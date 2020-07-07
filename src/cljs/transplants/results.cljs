(ns transplants.results
  (:require ["react-bootstrap" :as bs] 
            [transplants.model :as model]
            [re-frame.core :as rf]
            [transplants.subs :as subs]
            [clojure.pprint :refer [pprint]]))


(defn results-panel
  "Display results"
  [bundles organ centre tool]
  (let [inputs (get @(rf/subscribe [::subs/inputs]) organ)
        bundles @(rf/subscribe [::subs/bundles])
        bundle (get-in bundles [organ centre tool])
        [master-fmaps baseline-cifs baseline-vars] ((juxt
                                                     :-inputs :-baseline-cifs :-baseline-vars)
                                                    bundle)
        factors (keys master-fmaps)]
    [:<> 
     [:h3 "Results"]
     (when factors
       [:<>
        [:p "Factors are: "]
        [:> bs/Table {:striped true
                      :bordered true
                      :hover true}
         [:thead
          [:tr
           [:th "Factor"]
           [:th "Level"]
           [:th "Beta"]]]
         (into [:tbody]
               (map
                (fn [f]
                  (let [fmap (f master-fmaps)]
                    [:tr
                     [:td (:factor fmap)]
                     [:td (if (f inputs) (f inputs) "nil")]
                     [:td "not yet"]]))
                factors))]])
     #_(if (every? #(get inputs %) factors)
       [:<>
        [:h4 "All inputs are present"]
        [:p
         (pr-str
          {:organ organ
           :centre centre
           :tool tool
           :inputs inputs
                 ;:master-f-maps master-f-maps
                 ;:baseline-vars baseline-vars
                 ;:baseline-cifs (take 10 baseline-cifs)
           })]
        (pr-str
         (model/calculate
          {:organ organ
           :centre centre
           :tool tool
           :inputs inputs
           :baseline-cifs baseline-cifs
           :baseline-vars baseline-vars
           :master-fmaps master-fmaps
           }))
        ]
       [:h4 "Results will appear here when all inputs are present"])
     
     #_[:p "Age = " (:age inputs)]]))