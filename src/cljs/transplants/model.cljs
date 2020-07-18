(ns transplants.model
  "Implements the model calculation.")
;;;
;; Splines
;;;


;;;
;; cifs
;;;

(defn cif-0
  "Samples a bundle's baseline-cifs for the required day. 
   If there is no baseline-cif entry for that day, the last baseline-cif
   which occurs before the target day is returned.
   
   There is a bundle for each [organ, centre, tool] that has ever
   been loaded in the UI. If a bundle has never been loaded it will return
   a nil cif-0."
  [bundle day]
  (->> bundle
       (:-baseline-cifs)
       (filter #(<= (:days %) day))
       (last)))

(defn cif
  "Calculates the cif(t) from a baseline cif-0 evaluated at a certain day, 
   and the sum of the x-betas"
  [cif-0 sum-x-betas]
  (- 1 (js/Math.pow (- 1 cif-0) (js/Math.exp sum-x-betas))))

(defn scale-cifs
  "Scale a seq of cifs so it sums to cif-all-reasons."
  [cifs cif-all-reasons]
  (let [scale (/ cif-all-reasons (apply + cifs))]
    (map #(* % scale) cifs)))

(comment
  (* [2 3 4] 2)
  )

(defn calculate
  "Calculate a predicted outcome. "
  [{:keys [day outcome-key outcomes baseline-cifs sum-of-beta-xs] :as params}]
  day)
