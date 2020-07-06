(ns transplants.results
  (:require [transplants.model :as model]
            [re-frame.core :as rf]
            [transplants.subs :as subs]
            [clojure.pprint :refer [pprint]]))

#_(rf/reg-event-fx
 ::store-bundle-inputs
 (fn-traced
  [{:keys [_ db]} [_ data-path response]]
  (let [;route (:current-route db)
        path-params (get-in db [:current-route :path-params])
        [organ centre tool] (utils/path-keys path-params)
        raw (edn/read-string response)

        bundle-name (name tool)
        inputs-key (bundle-sheet bundle-name "-inputs")
        fmaps (fac/master-f-maps organ (inputs-key raw))
        processed (assoc-in raw [inputs-key] fmaps)

        baseline-vars (->> "-baseline-vars"
                           (bundle-sheet bundle-name)
                           (get raw)
                           (group-by :factor)
                           (remove (comp nil? first))
                           (map (fn [[k [{:keys [level]}]]] [k level]))
                           (into {}))]

    ;(into {} (map (fn [[k [{:keys [level]}]]] [k level]) (group-by :factor (get raw (bundle-sheet bundle-name "-baseline-vars")))))
    (println "data path " data-path " baseline-vars" baseline-vars)

    {:db (-> db
             (assoc-in data-path processed)
             (assoc :master-f-maps (group-by :factor (inputs-key processed))
                    :baseline-cifs (get raw (bundle-sheet bundle-name "-baseline-cifs"))
                    :baseline-vars baseline-vars))
     :reg-factors [organ fmaps]})))


(defn results-panel
  "Display results"
  [bundles organ centre tool]
  (let [inputs (get @(rf/subscribe [::subs/inputs]) organ)
        master-f-maps @(rf/subscribe [::subs/master-f-maps])
        baseline-cifs @(rf/subscribe [::subs/baseline-cifs])
        baseline-vars @(rf/subscribe [::subs/baseline-vars])
        factors (keys master-f-maps) ]
    [:<> 
     [:h3 "Results"]
     (when factors
       [:p "Factors are: " (pr-str factors)])
     (if (every? #(get inputs %) factors)
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
           :master-f-maps master-f-maps
           }))
        ]
       [:h4 "Results will appear here when all inputs are present"])
     
     #_[:p "Age = " (:age inputs)]]))