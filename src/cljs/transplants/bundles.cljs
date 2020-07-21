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
   If there is no baseline-cif entry for that day, the last baseline-cif
   which occurs before the target day is returned.
   
   Returns the whole map for the selected day which will contain baseline-cifs
   under keys prefixed with :cif-."
  [bundle day]
  (->> bundle
       (:-baseline-cifs)
       (filter #(<= (:days %) day))
       (last)))
