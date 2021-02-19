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
  "Samples an oct-bundle's baseline-cifs for the required day. 
   Select the last baseline-cif which occurs on or before the target day.
   
   Returns the whole map for the selected day which will contain baseline-cifs
   under keys prefixed with :cif-.
   
   If the selected day is less than the day of the first baseline, return the first baseline.
   If it's more than the last, return the last baseline.
   "
  [oct-bundle day]
  (let [rv (->> oct-bundle
                (:-baseline-cifs)
                (filter #(<= (:days %) day))
                (last))]
    (if (and rv (pos? (:days rv)))
      rv
      (first (:-baseline-cifs oct-bundle)))))

(defn baseline-H
  [oct-bundle day]
  (let [H0 (:H0 oct-bundle)
        days (keys H0)]
    (loop [d day
           data (H0 d)]
      (if data
        data
        (recur (dec d) (H0 (dec d)))))))

(comment
  (get-bundle :kidney :belf :waiting)
  (cif-0 {:-baseline-cifs [{:days 0 :cif 23}
                           {:days 3 :cif 23}
                           {:days 10 :cif 23}
                           {:days 20 :cif 23}
                           {:days 100 :cif 23}]} 3)
   ;; => {:days 3, :cif 23}


  (cif-0 {:-baseline-cifs [{:days 0 :cif 23}
                           {:days 0 :cif 25}
                           {:days 3 :cif 23}
                           {:days 10 :cif 23}
                           {:days 20 :cif 23}
                           {:days 100 :cif 23}]} 0)
    ;; => {:days 0, :cif 23}


  (cif-0 {:-baseline-cifs [{:days 0 :cif 23}
                           {:days 3 :cif 23}
                           {:days 10 :cif 23}
                           {:days 20 :cif 23}
                           {:days 100 :cif 23}]} 10)
    ;; => {:days 10, :cif 23}


  (cif-0 {:-baseline-cifs [{:days 0 :cif 23}
                           {:days 3 :cif 23}
                           {:days 10 :cif 23}
                           {:days 20 :cif 23}
                           {:days 100 :cif 23}]} 15)
    ;; => {:days 10, :cif 23}


  (cif-0 {:-baseline-cifs [{:days 0 :cif 23}
                           {:days 3 :cif 23}
                           {:days 10 :cif 23}
                           {:days 20 :cif 23}
                           {:days 100 :cif 23}]} 200)
    ;; => {:days 100, :cif 23}
  )