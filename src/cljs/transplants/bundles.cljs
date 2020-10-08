(ns transplants.bundles
  "Bundles are collections of data indexed by the current organ, centre and tool selection.
   They gather together and provide access to some constant data necessary to render a tool.
   
   They provide the constants needed by a calculation environment."
  (:require [re-frame.core :as rf]
            [transplants.subs :as subs]))

(defn get-all-bundles
  "Subscribe to the collection of bundles"
  []
  @(rf/subscribe [::subs/bundles]))

(defn get-bundle
  "Subscribe to the collection of bundles, and return one indexed by the given 
   organ, centre and tool"
  [organ centre tool]
  (-> (get-all-bundles)
      (get-in [organ centre tool]))
  )

(defn cif-0
  "Samples a bundle's baseline-cifs for the required day. 
   Select the last baseline-cif which occurs on or before the target day.
   
   Returns the whole map for the selected day which will contain baseline-cifs
   under keys prefixed with :cif-.
   
   If the selected day is less than the day of the first baseline, return the first baseline.
   If it's more than the last, return the last baseline.
   "
  [bundle day]
  (if-let [rv (->> bundle
                   (:-baseline-cifs)
                   (filter #(<= (:days %) day))
                   (last))]
    rv (first (:-baseline-cifs bundle))))

(comment
  (get-bundle :kidney :belf :waiting)
  (cif-0 {:-baseline-cifs [{:days 0 :cif 23}
                           {:days 3 :cif 23}
                           {:days 10 :cif 23}
                           {:days 20 :cif 23}
                           {:days 100 :cif 23}]} 3)
  
    (cif-0 {:-baseline-cifs [{:days 0 :cif 23}
                             {:days 3 :cif 23}
                             {:days 10 :cif 23}
                             {:days 20 :cif 23}
                             {:days 100 :cif 23}]} -1)
  
    (cif-0 {:-baseline-cifs [{:days 0 :cif 23}
                             {:days 3 :cif 23}
                             {:days 10 :cif 23}
                             {:days 20 :cif 23}
                             {:days 100 :cif 23}]} 200)

  )