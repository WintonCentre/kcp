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


(def scaled-cifs
  "Scale a seq of cifs so the rest sum to the first - which should be the cif for
   leaving the list for all reasons.
   Return the cifs in the original order including the all-reasons cif.
   If there is only one cif, there is no need to scale, so just return the seq
   
   Delete once references are purged."
  
  identity
)


;; TODO: DELETE THIS EVENTUALLY
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

(defn sample-from
  "returns a selection of data from S0. Could be optimised so it only needs one pass through S0, 
   This is a once only call per centre so keeping it simple for now. It's called when centre data data is stored on
   :events/store-bundle-inputs"
  [S0]
  (let [day-in-first? (partial utils/day-in? first)

        W1S0 (->> S0
                  (take-while (day-in-first? utils/week)))
        M1S0 (->> S0
                  (drop-while (day-in-first? utils/week))
                  (take-while (day-in-first? utils/month)))
        Q1S0 (->> S0
                  (drop-while (day-in-first? utils/month))
                  (take-while (day-in-first? utils/quarter)))
        Qs (->> S0
                (drop-while (day-in-first? utils/quarter)))]

    ;; Selected days are: 
    ;;     weekly for first month; 
    ;;     then monthly for 1st quarter; 
    ;;     then by quarter
    (concat W1S0
            (mapv last (partition-by (fn [[day H]] (utils/day->week day)) M1S0))
            (mapv last (partition-by (fn [[day H]] (utils/day->month day)) Q1S0))
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
         s 1
         f [0 0]
         sumall 1
         result [{:days 0 :waiting s :left f :sum 1}]]
    (let [[days S] (first SD)
          SD+ (rest SD)]
      (if (seq SD+)
        (let [[days+ S+] (first SD+)
              H (map * (map #(- (js/Math.log %)) S) exp-sum-beta-xs)
              H+ (map * (map #(- (js/Math.log %)) S+) exp-sum-beta-xs)
              delta-h (map - H+ H)
              p (map #(* s %) delta-h)
              f+ (map + f p)
              s+ (- s (apply + p))
              sumall+ (+ s (apply + f))]
          (recur SD+
                 s+
                 f+
                 sumall+
                 (conj result {:days+ days+ :waiting s+ :left f+ :sum sumall+})))
        result))))

(comment
  ;; cox-adjusted gives exactly the same results as the R adjcox on the original data.
  ;; adjcox uses the same data, but inserts values at every day by copying the previous day if there is no data.
  ;; cox-adjusted does a reasonable job if further days are deleted from the input set, but there may be a secod order improvement to be made.
  (let [surv-data [[0, [1, 1]]
                   [1, [0.9857067 0.9980149]]
                   [2, [0.9815928 0.9960016]]
                   [4, [0.9774624 0.9949806]]
                   [6, [0.9753883 0.9939333]]
                   [7, [0.9733049 0.9939333]]
                   [8, [0.9712219 0.9939333]]
                   [10,[0.9670563 0.9939333]]]
        sum-beta-xs (map js/Math.exp [-0.162124472180451 0.682324669172932])]

    (cox-adjusted surv-data sum-beta-xs))
  (time
   (doseq [x (range 10000)]
     (let [surv-data [[0 [1 1]]
                      [1 [0.9857067242 0.9980148933]]
                      [2 [0.9815928264 0.9960015827]]
                      [4 [0.9774623833 0.9949805958]]
                      [6 [0.9753882847 0.9939333019]]
                      [7 [0.9733049262 0.9939333019]]
                      [13 [0.9607879846 0.9939333019]]
                      [21 [0.9482812782 0.9928586086]]
                      [28 [0.9378307552 0.9885202078]]
                      [30 [0.9336213532 0.9874262621]]
                      [60 [0.8672177235 0.9712265117]]
                      [91 [0.8060717379 0.9521491681]]
                      [182 [0.6230995857 0.9059969849]]
                      [270 [0.5101771563 0.8622099907]]
                      [363 [0.4347761901 0.8264769796]]
                      [452 [0.3647959502 0.7881730203]]
                      [547 [0.3002271687 0.7487541769]]
                      [638 [0.2191936376 0.7108669536]]
                      [730 [0.1633465271 0.6539010494]]
                      [821 [0.1410543693 0.6200850504]]
                      [883 [0.112959532 0.5867497829]]
                      [954 [0.0991815473 0.5659942916]]
                      [1095 [0.080756853 0.5165745583]]]
           sum-beta-xs (map js/Math.exp [-0.162124472180451 0.682324669172932])]

       (cox-adjusted surv-data sum-beta-xs))))
  ;; => [{:days 0, :waiting 1, :left [0 0], :sum 1}
  ;;     {:days+ 1,
  ;;      :waiting 0.9838268440086021,
  ;;      :left (0.01224177520106726 0.003931380790330616),
  ;;      :sum 1}
  ;;     {:days+ 2,
  ;;      :waiting 0.9763973998116431,
  ;;      :left (0.015740602763125524 0.007861997425231353),
  ;;      :sum 1}
  ;;     {:days+ 4,
  ;;      :waiting 0.9709151066846756,
  ;;      :left (0.019241645870730743 0.009843247444593597),
  ;;      :sum 1}
  ;;     {:days+ 6,
  ;;      :waiting 0.9671383896206894,
  ;;      :left (0.020995372988407125 0.01186623739090344),
  ;;      :sum 1}
  ;;     {:days+ 7,
  ;;      :waiting 0.9653799415126608,
  ;;      :left (0.02275382109643579 0.01186623739090344),
  ;;      :sum 1}
  ;;     {:days+ 13,
  ;;      :waiting 0.9547545373336582,
  ;;      :left (0.033379225275438434 0.01186623739090344),
  ;;      :sum 1}
  ;;     {:days+ 21,
  ;;      :waiting 0.9420734975246721,
  ;;      :left (0.04401672215277627 0.013909780322551722),
  ;;      :sum 1}
  ;;     {:days+ 28,
  ;;      :waiting 0.9250340113228949,
  ;;      :left (0.05289400387003364 0.02207198480707156),
  ;;      :sum 1}
  ;;     {:days+ 30,
  ;;      :waiting 0.9194690413182931,
  ;;      :left (0.05643251324663601 0.02409844543507091),
  ;;      :sum 1}
  ;;     {:days+ 60,
  ;;      :waiting 0.831690475885841,
  ;;      :left (0.11411861674289629 0.054190907371262725),
  ;;      :sum 1}
  ;;     {:days+ 91,
  ;;      :waiting 0.7473377833896315,
  ;;      :left (0.16582834519531353 0.0868338714150549),
  ;;      :sum 1}
  ;;     {:days+ 182,
  ;;      :waiting 0.5102563881173592,
  ;;      :left (0.3294450785025679 0.16029853338007288),
  ;;      :sum 1}
  ;;     {:days+ 270,
  ;;      :waiting 0.37349189141776995,
  ;;      :left (0.41620046620357787 0.21030764237865213),
  ;;      :sum 1}
  ;;     {:days+ 363,
  ;;      :waiting 0.2914231657065238,
  ;;      :left (0.46699210437328914 0.24158472992018698),
  ;;      :sum 0.9999999999999999}
  ;;     {:days+ 452,
  ;;      :waiting 0.22057372131736763,
  ;;      :left (0.5104806307064491 0.2689456479761832),
  ;;      :sum 1}
  ;;     {:days+ 547,
  ;;      :waiting 0.16164667579842912,
  ;;      :left (0.547017400528714 0.29133592367285693),
  ;;      :sum 0.9999999999999999}
  ;;     {:days+ 638,
  ;;      :waiting 0.10179944830680927,
  ;;      :left (0.5902581775974212 0.3079423740957695),
  ;;      :sum 1}
  ;;     {:days+ 730,
  ;;      :waiting 0.059519258956123616,
  ;;      :left (0.6157149646541598 0.3247657763897166),
  ;;      :sum 1}
  ;;     {:days+ 821,
  ;;      :waiting 0.045840302117720264,
  ;;      :left (0.623141087363417 0.3310186105188627),
  ;;      :sum 1}
  ;;     {:days+ 883,
  ;;      :waiting 0.03217073999580891,
  ;;      :left (0.631799078315709 0.33603018168848203),
  ;;      :sum 1}
  ;;     {:days+ 954,
  ;;      :waiting 0.026320065088413527,
  ;;      :left (0.635357471759502 0.33832246315208453),
  ;;      :sum 1}
  ;;     {:days+ 1095,
  ;;      :waiting 0.016962926533131608,
  ;;      :left (0.6399569479176096 0.34308012554925876), 
  ;;      :sum 1}]

  0)

;;
;; 
;;
(defn S0-for-day
  "Returns a vector of [day outcome-baselines] for the given day from S0.
   
   Since S0 may not collect all days, but S0-for-day will return the last known value 
   at or before the given day. The returned day may therefore be earlier or equal to the
   input day.
   "
  [S0 day]
  (let [rv (->> S0
                (filter #(<= (first %) day))
                (last))]
    (if (and rv (pos? (first rv)))
      rv
      (first S0))))

(comment
  (let [S0 [[0 [1 1]]
            [1 [0.9857067242 0.9980148933]]
            [2 [0.9815928264 0.9960015827]]
            [4 [0.9774623833 0.9949805958]]
            [6 [0.9753882847 0.9939333019]]
            [7 [0.9733049262 0.9939333019]]
            [13 [0.9607879846 0.9939333019]]
            [21 [0.9482812782 0.9928586086]]
            [28 [0.9378307552 0.9885202078]]
            [30 [0.9336213532 0.9874262621]]
            [60 [0.8672177235 0.9712265117]]
            [91 [0.8060717379 0.9521491681]]
            [182 [0.6230995857 0.9059969849]]
            [270 [0.5101771563 0.8622099907]]
            [363 [0.4347761901 0.8264769796]]
            [452 [0.3647959502 0.7881730203]]
            [547 [0.3002271687 0.7487541769]]
            [638 [0.2191936376 0.7108669536]]
            [730 [0.1633465271 0.6539010494]]
            [821 [0.1410543693 0.6200850504]]
            [883 [0.112959532 0.5867497829]]
            [954 [0.0991815473 0.5659942916]]
            [1095 [0.080756853 0.5165745583]]]]

    (map #(S0-for-day S0 %) [-1 0 5 30 100 1000 2000 10000]))
  ;; => ([0 [1 1]]
  ;;     [0 [1 1]]
  ;;     [4 [0.9774623833 0.9949805958]]
  ;;     [30 [0.9336213532 0.9874262621]]
  ;;     [91 [0.8060717379 0.9521491681]]
  ;;     [954 [0.0991815473 0.5659942916]]
  ;;     [1095 [0.080756853 0.5165745583]] 
  ;;     [1095 [0.080756853 0.5165745583]])
  0)

(defn use-cox-adjusted?
  "Competing risk tools demand the cox-adjusted model"
  [tool]
  ;(println ::waiting tool)
  (= tool :waiting))

(defn cox
  "For a single cox calculation we should use the formula based on all available data points rather than a filtered set"
  [S0 day sum-x-betas]
  (- 1 (js/Math.pow (S0-for-day S0 day) (js/Math.exp sum-x-betas))))

(defn cif
  "Calculates the cif(t) from a baseline cif-0(t) and the sum of the x_i.beta_i.
   The competing risk tool needs the direct cumulative incidence frequency.
   "
  [tool cif-0 sum-x-betas]
  #_(when (number? tool)
      (js/console.error "number?" tool))
  (if (use-cox-adjusted? tool)
    (- 1 (js/Math.pow (- 1 cif-0) (js/Math.exp sum-x-betas)))
    (js/Math.pow cif-0 (js/Math.exp sum-x-betas))))

(comment
  (js/Math.pow 0 0)
  ;test lung, Birmingham, day 3, Cystic Fibrosis with:
  (def cif_0 0.008235)

  (def sum-x-betas -0.6827) ;(== -0.1121 + -0.5706) 

  (cif :waiting cif_0 sum-x-betas))

