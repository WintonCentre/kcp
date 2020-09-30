(ns transplants.spline)

(defn spline
   "Perform spline calculation to transform x using knots and betas. See Jenny Murray doc.
   x0 is the base var, x is the entered var, and the betas and knots are configured in the
   spreadsheet."
   [[k1 k2 k3 k4 :as knots]
    [beta1 beta2 beta3 :as betas]
    x0 x]
   (let [cube+ (fn [x] (if (pos? x) (* x x x) 0))
         d3+ (fn [x n] (cube+ (- x n)))
         term (fn [n x] (/ (- (d3+ x n) (d3+ x k4)) (- k4 n)))
         f1 (fn [x] (- (term k1 x) (term k3 x)))
         f2 (fn [x] (- (term k2 x) (term k3 x)))
         xs (fn [x x0] [(- x x0) (- (f1 x) (f1 x0)) (- (f2 x) (f2 x0))])
         term1 (fn [n x] (/ (- (d3+ x n) (d3+ x k4)) (- k4 n)))
         term2 (fn [x] (/ (- (d3+ x k3) (d3+ x k4)) (- k4 k3)))]
     (apply + (map * betas (xs x x0)))))

 (comment
   ; setup test cases
   ; knots
   (def k1 21)
   (def k2 44)
   (def k3 56)
   (def k4 63)
   (defn cube+ [x] (if (pos? x) (* x x x) 0))
   (defn d3+ [x n] (cube+ (- x n)))
   (defn term1 [n x] (/ (- (d3+ x n) (d3+ x k4)) (- k4 n)))
   (defn term2 [x] (/ (- (d3+ x k3) (d3+ x k4)) (- k4 k3)))


   ; numeric betas taken from "Calculated adjusted CIFs - example.xlsx"
   (def tx-age-spline (partial spline [k1 k2 k3 k4] [0.00432 -0.0003983 0.00181] 51))
   (def rem-age-spline (partial spline [k1 k2 k3 k4] [0.04418 -0.00120 0.00360] 51))
   (def dth-age-spline (partial spline [k1 k2 k3 k4] [-0.02226 0.00162 -0.00588] 51))

   ; tests
   (tx-age-spline 30)                                        ;0.12574138684210526
   (tx-age-spline 51)                                        ;0
   (tx-age-spline 60)                                        ;0.07700381015037594

   (rem-age-spline 30)                                       ;-0.24216947368421055
   (rem-age-spline 51)                                       ;0
   (rem-age-spline 60)                                       ;0.16337187969924816

   (dth-age-spline 30)                                       ;-0.43970052631578943
   (dth-age-spline 51)                                       ;0
   (dth-age-spline 60)                                       ;-0.07625616541353364
   )
