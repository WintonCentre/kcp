(ns transplants.model
  "Functions which assist in the model calculations.")

(defn to-precision
  "js number to sig figs"
  [d sigs]
  (.toPrecision (js/Number. d) sigs))

(defn to-fixed
  "Wrap javascript toFixed"
  [d dps]
  (.toFixed (js/Number. d) dps))

(defn to-percent
  "Convert a decimal number to a fixed point string percentage"
  ([d] (to-percent d 0))
  ([d dps]
   (to-fixed (* d 100) dps)
   #_(.toFixed (js/Number. (* d 100)) dps)))

(comment
  (.toFixed (js/Number. 1) 0)
  (to-percent 0.066) ; => "7"
  (to-percent 0.01) ; => "1"
  (to-precision 123.456789 6)
  ; => "123.457"
  )


(defn scaled-cifs
  "Scale a seq of cifs so the rest sum to the first - which should be the cif for
   leaving the list for all reasons.
   Return the cifs in the original order including the all-reasons cif.
   If there is only one cif, there is no need to scale, so just return the seq"
  [all & the-rest]
  (if (seq the-rest)
    (let [scale (/ all (apply + the-rest))]
      (conj (map #(* % scale) the-rest) all))
    [all]))

(defn competing-risk?
  "Competing risk tools demand the (1-CIF) formula"
  [tool]
  ;(println ::waiting tool)
  (= tool :waiting)
)

(defn cif
  "Calculates the cif(t) from a baseline cif-0(t) and the sum of the x_i.beta_i.
   The competing risk tool needs the direct cumulative incidence frequency.
   
   Rule of thumb: 
     When cif_0(0) is 0, and cif_0 increases with t, use the (1 -cif_0) formula.
     When cif_0(0) is 1, and cif_0 decreases with t, use the other one.
   "
  [tool cif-0 sum-x-betas]
  #_(when (number? tool) 
    (js/console.error "number?" tool))
  (if (competing-risk? tool)
      (- 1 (js/Math.pow (- 1 cif-0) (js/Math.exp sum-x-betas)))
      (js/Math.pow cif-0 (js/Math.exp sum-x-betas)))
  )

(comment
  ;test lung, Birmingham, day 3, Cystic Fibrosis with:
  (def cif_0 0.008235)
  
  (def sum-x-betas -0.6827) ;(== -0.1121 + -0.5706) 
  
  (cif :waiting cif_0 sum-x-betas)
  )

(defn with-all-reasons-first
  "Outcomes with the all reasons outcome in the first slot. 
   
   We should probably plan to replace the hard coded 'all-reasons' constant with a
   value read in from a configuration file.
   
   At the moment this function is most closely tied to the model, since it is that which
   is forcing us to scale to the special 'all-reasons' cif column."
  [outcomes]
  (if (> (count outcomes) 1)
    (let [all-reasons "all-reasons"]
      (conj (remove #(= % all-reasons) outcomes) all-reasons))
    outcomes))
