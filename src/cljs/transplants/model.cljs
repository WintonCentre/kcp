(ns transplants.model
  "Functions which assist in the model calculations."
  (:require [transplants.utils :as utils]))

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
    (let [scale 1 #_(/ all (apply + the-rest))]
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
  (js/Math.pow 0 0)
  ;test lung, Birmingham, day 3, Cystic Fibrosis with:
  (def cif_0 0.008235)
  
  (def sum-x-betas -0.6827) ;(== -0.1121 + -0.5706) 
  
  (cif :waiting cif_0 sum-x-betas)
  )

#_(defn with-all-reasons-first
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

(defn sample-from
  "returns a selection of data from H0."
  [H0]
  (let [day-in-first? (partial utils/day-in? first)

        W1H0 (->> H0
                  (take-while (day-in-first? utils/week)))
        M1H0 (->> H0
                  (drop-while (day-in-first? utils/week))
                  (take-while (day-in-first? utils/month)))
        Q1H0 (->> H0
                  (drop-while (day-in-first? utils/month))
                  (take-while (day-in-first? utils/quarter)))
        Qs (->> H0
                (drop-while (day-in-first? utils/quarter)))]

    ;; Selected days are: 
    ;;     weekly for first month; 
    ;;     then monthly for 1st quarter; 
    ;;     then by quarter
    (concat W1H0
            (mapv last (partition-by (fn [[day H]] (utils/day->week day)) M1H0))
            (mapv last (partition-by (fn [[day H]] (utils/day->month day)) Q1H0))
            (mapv last (partition-by (fn [[day H]] (utils/day->quarter day)) Qs)))))

  ;; for (i in 1:(dim(smoothed_cent)[1]-1)){
  ;;   h_tx[i] <- smoothed_cent$capHtx[i+1] - smoothed_cent$capHtx[i]
  ;;   p_tx[i] <- h_tx[i] * capS[i]
  ;;   capF_tx[i+1] <- capF_tx[i] + p_tx[i]

  ;;   h_rem[i] <- smoothed_cent$capHrem[i+1] - smoothed_cent$capHrem[i]
  ;;   p_rem[i] <- h_rem[i] * capS[i]
  ;;   capF_rem[i+1] <- capF_rem[i] + p_rem[i]

  ;;   capS[i+1] <- capS[i] - p_tx[i] - p_rem[i]

  ;;   sumall[i] <- capS[i] + capF_rem[i] + capF_tx[i]

  ;; }

  ;; out <- cbind(smoothed_cent, capS, capF_rem, capF_tx, sumall)


(defn cox-adjusted
  "survival-data is a a vector of [day survival-by-outcomes].
   survival-by-outcome is a vector of survivals for each outcome.
   exp-sum-beta-xs is a vector of exponentials of sum-beta-xs for each outcome"
  [survival-data exp-sum-beta-xs]
  (loop [SD survival-data
         h [0 0]
         s 1
         f [0 0]
         sumall 1
         result [{:days 0 :waiting s :left f :sum 1}]]
    (let [[days S] (first SD)
          SD+ (rest SD)]
      (if (seq SD+)
        (let [[days+ S+] (first SD+)
              H (map * (map identity #_#(- (js/Math.log %)) S) exp-sum-beta-xs)
              H+ (map * (map identity #_#(- (js/Math.log %)) S+) exp-sum-beta-xs)
              h+ (mapv #(/ (- %2 %1) (- days+ days)) H H+)
              ps+ (mapv #(* s %) h+)
              f+ (mapv + f ps+)
              s+ (- s (apply + ps+))
              sumall+ (+ s (apply + f))]
          (recur SD+
                 h+
                 s+
                 f+
                 sumall+
                 (conj result {:days days+ :waiting s+ :left f+ :sum sumall+})))
        result))))

(comment
  (let [surv-data [[0, [0, 0]]
                   [1, [0.01224178 0.003931381]]
                   [2, [0.01579812 0.007926612]]
                   [3, [0.01579812 0.007926612]]
                   [4, [0.01938379 0.009955756]]
                   [5, [0.01938379 0.009955756]]]
        sum-beta-xs [1 1]]

    (cox-adjusted surv-data sum-beta-xs))
  ;; => [{:days 0, :waiting 1, :left [0 0], :sum 1}
  ;;     {:days 1,
  ;;      :waiting 0.983826839,
  ;;      :left [0.01224178 0.003931381],
  ;;      :sum 1}
  ;;     {:days 2,
  ;;      :waiting 0.9763974007735859,
  ;;      :left [0.01574060274060926 0.00786199648580481],
  ;;      :sum 1}
  ;;     {:days 3,
  ;;      :waiting 0.9763974007735859,
  ;;      :left [0.01574060274060926 0.00786199648580481],
  ;;      :sum 1}
  ;;     {:days 4,
  ;;      :waiting 0.9709151109781587,
  ;;      :left [0.019241641608641086 0.009843247413200126],
  ;;      :sum 1}
  ;;     {:days 5,
  ;;      :waiting 0.9709151109781587,
  ;;      :left [0.019241641608641086 0.009843247413200126], 
  ;;      :sum 1}]



  0)