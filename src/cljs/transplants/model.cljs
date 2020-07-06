(ns transplants.model
  "Implements the model calculation.")
;;;
;; Splines
;;;
(defn cube+ [x] (if (pos? x) (* x x x) 0))

(defn d3+ [x n] (cube+ (- x n)))

(defn spline
  "Calculates a spline value given 4 knots and 3 betas according to the method given by "
  [{:keys [knots betas x0]} x]
  (let [[knot1 knot2 knot3 knot4] knots
        term (fn [n x] (/ (- (d3+ x n) (d3+ x knot4)) (- knot4 n)))

        f1 (fn [x] (- (term knot1 x) (term knot3 x)))

        f2 (fn [x] (- (term knot2 x) (term knot3 x)))

        xs (fn [x x0] [(- x x0) (- (f1 x) (f1 x0)) (- (f2 x) (f2 x0))])

        term1 (fn [n x] (/ (- (d3+ x n) (d3+ x knot4)) (- knot4 n)))

        term2 (fn [x] (/ (- (d3+ x knot3) (d3+ x knot4)) (- knot4 knot3)))

        sp (fn [n x] (- (term1 n x) (term2 x)))]

    (apply + (map * betas (xs x x0)))))



(comment
  ; This is code from previously verified apline

  ; Age knots
  (def k1 22)
  (def k2 46)
  (def k3 56)
  (def k4 63)

  (defn term [n x]
    (/ (- (d3+ x n) (d3+ x k4)) (- k4 n)))


  (defn f1 [x]
    (- (term k1 x) (term 56 x)))

  (defn f2 [x]
    (- (term k2 x) (term 56 x)))

  (defn xs [x x0]
    [(- x x0) (- (f1 x) (f1 x0)) (- (f2 x) (f2 x0))])

  (defn spline**
    [beta1 beta2 beta3 x0 x]
    (apply + (map * [beta1 beta2 beta3] (xs x x0))))

  (def p-spline (partial spline {:knots [22 46 56 63]
                                 :betas [-0.04681 0.00152 -0.00342]
                                 :x0 51}))
  (def p-spline** (partial spline** -0.04681 0.00152 -0.00342 51))

  ;;;
  ;; Checkout current against previously verified here
  ;;;
  (p-spline 21)
  (p-spline** 21)
  ;=> 0.5252694978479194
  (p-spline 22)
  (p-spline** 22)
  ;=> 0.4784594978479194
  (p-spline 23)
  (p-spline** 23)
  ;=> 0.43168657101865104
  (p-spline 35)
  (p-spline** 35)
  ;=> -0.04862074605451938
  (p-spline 43)
  (p-spline** 43)
  ;=> -0.161215868005739
  (p-spline 44)
  (p-spline** 44)
  ;=> -0.15660538020086096
  (p-spline 56)
  (p-spline** 56)
  ;=> 0.14286692969870873
  (p-spline 63)
  (p-spline** 63)
  ;=> 0.21908949784791965
  )

;;;
;; cifs
;;;

(def cif-0 nth)

(defn cif
  "Calculates the cif(t) from a baseline cif-0(t), and the sum of the x_i.beta_i"
  [cif-0 sum-x-betas]
  (- 1 (js/Math.pow (- 1 cif-0) (js/Math.exp sum-x-betas))))

(defn x-beta
  "NOT FINISHED"
  [beta-key x t]
  nil
  )

(defn scale-factor
  "Calculate the factor we must use to scale each cif so their total yields cif-all-reasons"
  [cif-transplant cif-removal cif-death cif-all-reasons]
  (/ cif-all-reasons (+ cif-transplant cif-removal cif-death)))

(defn CIF-transplant
  [cif-transplant scale-factor]
  (* cif-transplant (scale-factor)))

(defn categorical-beta
  "Access a beta for a categorical variable"
  [{:keys [inputs factor level beta-key]}]
  ; YOU ARE HERE:
  ; Need to patch store-bundle-data so betas are stored with levels
  (filter #(and (= factor (:factor %)) (= level (get-in % [:levels :level]))) inputs)
  )

(defn continuous-beta
  "Access a beta for a continuous variable"
  ; Need to read and use spline data somewhere
  [{:keys [inputs factor level baseline-level beta-key]}]
  666)

(defn beta-x
  "Select or calculate the contribution of a factor at a given level"
  [{:keys [inputs factor level baseline-level beta-key] :as data}]
  (if (keyword? level)
    (categorical-beta data)
    (* (- level baseline-level) (continuous-beta data))
    )
  )

(defn sum-x-betas
  "Given a "
  [xs baseline-vars]
  999)

(defn calculate-cif
  "Calculate the cif for an outcome. The outcome is indicated by a suffix that selects the appropriate
   baseline and betas to use in the calculaion"
  [days inputs outcome baseline-cifs baseline-vars master-f-maps]
  
  ; Todo: Numeric vars must take baselines into consideration
  (sum-x-betas inputs master-f-maps))

(defn calculate
  "Calculate a predicted outcome. "
  [{:keys [organ
           centre
           tool
           outcome
           sample-period
           inputs
           baseline-cifs
           baseline-vars
           master-f-maps 
           :as params]}]
  nil
  #_(for [day (range 0 (:days (last baseline-cifs)))]
    day)
  )