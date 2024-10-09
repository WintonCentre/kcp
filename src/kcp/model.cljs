(ns kcp.model
  "Functions which assist in the model calculations."
  (:require [kcp.utils :as utils]
            #_[shadow.debug :refer [locals ?-> ?->>]]))

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

;; TODO: DELETE THIS EVENTUALLY
(defn sample-from
  "returns a selection of data from S0. Could be optimised so it only needs one pass through S0,
   This is a once only call per centre so keeping it simple for now. It's called when centre data is stored on
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

    (concat W1S0
            (mapv last (partition-by (fn [[day _H]] (utils/day->week day)) M1S0))
            (mapv last (partition-by (fn [[day _H]] (utils/day->month day)) Q1S0))
            (mapv last (partition-by (fn [[day _H]] (utils/day->quarter day)) Qs)))))

(defn cox-adjusted
  "survival-data is a a vector of [day survival-by-outcomes].
   survival-by-outcome is a vector of survivals for each outcome.
   exp-sum-beta-xs is a vector of exponentials of sum-beta-xs for each outcome.

   Run the cox-adustment over survival-data, returning a vector of [day leaving-proportion-by-outcome] having taken
   account of the input contributions to exp-sum-beta-xs, and having ensured the sum of all outcomes is 1.
   Formally it has the same form as the input survival-data vector."
  [survival-data sum-beta-xs]
  (let [exp-sum-beta-xs (map js/Math.exp sum-beta-xs)]
    (loop [SD survival-data
           s 1
           f (map (constantly 0) sum-beta-xs)
           result [[0 f]]]
      (let [[_days S] (first SD)
            SD+ (rest SD)]
        (if (seq SD+)
          (let [[days+ S+] (first SD+)
                H (map * (map #(- (js/Math.log %)) S) exp-sum-beta-xs)
                H+ (map * (map #(- (js/Math.log %)) S+) exp-sum-beta-xs)
                delta-h (map - H+ H)
                p (map #(* s %) delta-h)
                f+ (map + f p)
                s+ (- s (apply + p))
                ]
            (recur SD+
                   s+
                   f+
                   (conj result [days+ f+])))
          result)))))

(defn cox
  "For a single cox calculation we should use the formula based on all-S0 rather than S0"
  [s0-for-day sum-x-betas]
  (mapv #(- 1 (js/Math.pow s0-for-day (js/Math.exp %))) sum-x-betas))

(defn cox-only
  [survival-data sum-x-betas]
  (mapv (fn [[day [survival]]]
         [day (cox survival sum-x-betas)]
         ) survival-data))


;; #todo
;; Optimise this - we should not be doing multiple searches through S0 when we want to plot S0 over multiple days.
;;
(defn S0-for-day
  "Returns a vector of [day outcome-baselines] for the given day from S0.

   Since S0 may not collect all days, but S0-for-day will return the last known value
   at or before the given day, the day used may therefore be earlier or equal to the
   input day.
   "
  [S0 day]
  (let [rv (->> S0
                (filter #(<= (first %) day))
                (last))]
    (if (and rv (pos? (first rv)))
      rv
      (first S0))))

(defn S0-for-days
  "Returns a vector of [day outcome-baselines] for each given day from S0. This is the
   equivalent of `map #(S0-for-day S0 %) days` but avoids doing a pass through S0 for
   each day."
  [S0 days]
  (loop [ds days
         ss S0
         result []]
    ;; (if-not (and (seq ds) (seq ss))
    ;;   result
    (if-let [d (first ds)]
      (if (seq ss)
        (let [[accept reject] (split-with #(<= (first %) d) ss)]
          (recur (rest ds) reject (conj result (if (seq accept)
                                                 (last accept)
                                                 (last result)))))
        (conj result (last result)))
      result)))

;; => #'kcp.model/S0-for-days
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
            [1095 [0.080756853 0.5165745583]]]
        days [0 5 30 100 1000 2000 10000]]
    (S0-for-days S0  days)
    ;(S0-for-days S0 [365 1096 1826])
    )
  ;; => [[0 [1 1]] [4 [0.9774623833 0.9949805958]] [30 [0.9336213532 0.9874262621]] [91 [0.8060717379 0.9521491681]] [954 [0.0991815473 0.5659942916]] [1095 [0.080756853 0.5165745583]] [1095 [0.080756853 0.5165745583]]]

  0)


(comment
  (cox 0.9 [0.9 0.7])
  ;; => (0.22828892339131668 0.1911728338852633)
  ;;
  (map #(- 1 (js/Math.pow 0.9 (js/Math.exp %))) [0.9 0.7]))

(comment
  ;; cox-adjusted gives exactly the same results as the R adjcox on the original data.
  ;; adjcox uses the same data, but inserts values at every day by copying the previous day if there is no data.
  ;; cox-adjusted does a reasonable job if further days are deleted from the input set, but there may be a second order improvement to be made.
  (let [surv-data [[0, [1, 1]]
                   [1, [0.9857067]]
                   [2, [0.9815928]]
                   [4, [0.9774624]]
                   [6, [0.9753883]]
                   [7, [0.9733049]]
                   [8, [0.9712219]]
                   [10,[0.9670563]]]
        surv-data2 [[0, [1, 1]]
                    [1, [0.9857067 1]]
                    [2, [0.9815928 1]]
                    [4, [0.9774624 1]]
                    [6, [0.9753883 1]]
                    [7, [0.9733049 1]]
                    [8, [0.9712219 1]]
                    [10,[0.9670563 1]]]
        sum-beta-xs (map js/Math.exp [-0.162124472180451])
        sum-beta-xs2 (map js/Math.exp [-0.162124472180451 0.682324669172932])]

    ;; OK - so a single outcome cox-adjusted (i.e. no cox adjustment really), gives the same results as a 2 outcome where the second outcome
    ;; never happens.
    (cox-adjusted surv-data2 sum-beta-xs2)
  ;; => [[0 (0 0)] [1 (0.03369386696815227 0)] [2 (0.043152417016920755 0)] [4 (0.05259552149110424 0)] [6 (0.05730553545262912 0)] [7 (0.06202319135041203 0)] [8 (0.06672639248186334 0)] [10 (0.07611491072482963 0)]]
    (cox-adjusted surv-data2 sum-beta-xs2)
  ;; => [[0 (0)] [1 (0.03369386696815227)] [2 (0.043152417016920755)] [4 (0.05259552149110424)] [6 (0.05730553545262912)] [7 (0.06202319135041203)] [8 (0.06672639248186334)] [10 (0.07611491072482963)]]
    )

  (time
   (doseq [_x (range 10000)]
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

       (cox-adjusted surv-data sum-beta-xs))
     ;; => [[0 [0 0]]
     ;;     [1 (0.01224177520106726 0.003931380790330616)]
     ;;     [2 (0.015740602763125524 0.007861997425231353)]
     ;;     [4 (0.019241645870730743 0.009843247444593597)]
     ;;     [6 (0.020995372988407125 0.01186623739090344)]
     ;;     [7 (0.02275382109643579 0.01186623739090344)]
     ;;     [13 (0.033379225275438434 0.01186623739090344)]
     ;;     [21 (0.04401672215277627 0.013909780322551722)]
     ;;     [28 (0.05289400387003364 0.02207198480707156)]
     ;;     [30 (0.05643251324663601 0.02409844543507091)]
     ;;     [60 (0.11411861674289629 0.054190907371262725)]
     ;;     [91 (0.16582834519531353 0.0868338714150549)]
     ;;     [182 (0.3294450785025679 0.16029853338007288)]
     ;;     [270 (0.41620046620357787 0.21030764237865213)]
     ;;     [363 (0.46699210437328914 0.24158472992018698)]
     ;;     [452 (0.5104806307064491 0.2689456479761832)]
     ;;     [547 (0.547017400528714 0.29133592367285693)]
     ;;     [638 (0.5902581775974212 0.3079423740957695)]
     ;;     [730 (0.6157149646541598 0.3247657763897166)]
     ;;     [821 (0.623141087363417 0.3310186105188627)]
     ;;     [883 (0.631799078315709 0.33603018168848203)]
     ;;     [954 (0.635357471759502 0.33832246315208453)]
     ;;     [1095 (0.6399569479176096 0.34308012554925876)]]
     ))

  0)

(comment
  (let [S0 [[0 [1 1]]
            [1 [0.9857067242 0.9980148933]]
            ;; [2 [0.9815928264 0.9960015827]]
            ;; [4 [0.9774623833 0.9949805958]]
            ;; [6 [0.9753882847 0.9939333019]]
            ;; [7 [0.9733049262 0.9939333019]]
            ;; [13 [0.9607879846 0.9939333019]]
            ;; [21 [0.9482812782 0.9928586086]]
            ;; [28 [0.9378307552 0.9885202078]]
            ;; [30 [0.9336213532 0.9874262621]]
            ;; [60 [0.8672177235 0.9712265117]]
            ;; [91 [0.8060717379 0.9521491681]]
            ;; [182 [0.6230995857 0.9059969849]]
            ;; [270 [0.5101771563 0.8622099907]]
            ;; [363 [0.4347761901 0.8264769796]]
            ;; [452 [0.3647959502 0.7881730203]]
            ;; [547 [0.3002271687 0.7487541769]]
            ;; [638 [0.2191936376 0.7108669536]]
            ;; [730 [0.1633465271 0.6539010494]]
            ;; [821 [0.1410543693 0.6200850504]]
            ;; [883 [0.112959532 0.5867497829]]
            ;; [954 [0.0991815473 0.5659942916]]
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
  ;;
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
    (S0-for-days S0 [-1 0 5 30 100 1000 2000 10000]))
  ;; => [nil [0 [1 1]] [4 [0.9774623833 0.9949805958]] [30 [0.9336213532 0.9874262621]] [91 [0.8060717379 0.9521491681]] [954 [0.0991815473 0.5659942916]] [1095 [0.080756853 0.5165745583]]]

  ;; => [[1095 [0.080756853 0.5165745583]] [954 [0.0991815473 0.5659942916]] [883 [0.112959532 0.5867497829]]]


  0)
