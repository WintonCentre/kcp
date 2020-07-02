(ns transplants.spline)

; Age knots
(def k1 21)
(def k2 44)
(def k3 56)
(def k4 63)

(defn cube+ [x] (if (pos? x) (* x x x) 0))
;(defn cube+ [x] (max (js/Math.pow x 3) 0))

(defn d3+ [x n] (cube+ (- x n)))

(defn term [n x]
  (/ (- (d3+ x n) (d3+ x k4)) (- k4 n)))


(defn f1 [x]
  (- (term 21 x) (term 56 x)))

(defn f2 [x]
  (- (term 44 x) (term 56 x)))

(defn xs [x x0]
  [(- x x0) (- (f1 x) (f1 x0)) (- (f2 x) (f2 x0))])

(defn spline*
  [beta1 beta2 beta3 x0 x]
  (apply + (map * [beta1 beta2 beta3] (xs x x0))))

; numeric betas taken from "Calculated adjusted CIFs - example.xlsx"
(def tx-age-spline (partial spline* 0.00432 -0.0003983 0.00181 51))
(def rem-age-spline (partial spline* 0.04418 -0.00120 0.00360 51))
(def dth-age-spline (partial spline* -0.02226 0.00162 -0.00588 51))






(defn term1 [n x]
  (/ (- (d3+ x n) (d3+ x k4)) (- k4 n)))


(defn term2 [x]
  (/ (- (d3+ x k3) (d3+ x k4)) (- k4 k3)))



(defn sp
  [n x]
  (- (term1 n x) (term2 x)))


(comment
  (tx-age-spline 30)                                        ;0.12574138684210526
  (tx-age-spline 51)                                        ;0
  (tx-age-spline 60)                                        ;0.07700381015037594

  (rem-age-spline 30)                                       ;-0.24216947368421055
  (rem-age-spline 51)                                       ;0
  (rem-age-spline 60)                                       ;0.16337187969924816

  (dth-age-spline 30)                                       ;-0.43970052631578943
  (dth-age-spline 51)                                       ;0
  (dth-age-spline 60)                                       ;-0.07625616541353364



  (/ (- (cube+ (- 51 21)) (cube+ (- 51 63))) (- 63 21))
  (/ (- (d3+ 51 21) (d3+ 51 63)) (- 63 21))

  (term1 21 51)                                             ;(F1 51)
  (f1 51)

  (term1 44 51)                                             ;(F2 51)
  (f2 51)

  (term1 21 30)                                             ;(F1 30)
  (f1 30)
  (term1 44 30)                                             ;(F2 30)
  (f2 30)

  (term1 21 60)                                             ;(F1 60)
  (f1 60)
  (term1 44 60)                                             ;(F2 60)
  (f2 60)

  ;=((MAX((J3-21)^3,0)-MAX((J3-63)^3,0))/(63-21)) - ((MAX((J3-56)^3,0)-MAX((J3-63)^3,0))/(63-56))
  (f1 51)

  ;=((MAX((N3-21)^3,0)-MAX((N3-63)^3,0))/(63-21)) - ((MAX((N3-56)^3,0)-MAX((N3-63)^3,0))/(63-56))
  (f1 30)

  ;=((MAX((R3-21)^3,0)-MAX((R3-63)^3,0))/(63-21)) - ((MAX((R3-56)^3,0)-MAX((R3-63)^3,0))/(63-56))
  (f1 60))



(defn spline
  [beta1 beta2 beta3 x]
  (+
   (* beta1 x)
   (* beta2 (sp k1 x))
   (* beta3 (sp k2 x))))

;(def spline (partial spline* -0.04681 0.00152 -0.00342))

(comment
  (def beta1 -0.04681)
  (def beta2 0.00152)
  (def beta3 -0.00342)


  (cube+ -1)
  ;=> 0

  (cube+ 2)
  ;=> 8

  (d3+ 8 2)
  ; => 216

  (d3+ 2 8)
  ; => 0

  (term1 21 21)
  ; => 0

  (term1 21 30)

  (term1 21 63)
  ; => 1764

  (term2 60)
  ;=> 9.142857142857142

  (* 42 42)
  ; => 1764

  (term1 21 30)
  ;=> 17.357142857142858

  (term2 30)
  ; => 0

  (sp 21 30)
  ; => 17.357142857142858

  (term1 44 30)
  ;=> 0

  (term2 30)

  (sp 44 30)
  (sp 44 50)

  (* beta1 30)

  (/ (d3+ 63 21) (- 63 21))

  (spline -0.04681 0.00152 -0.00342 21)
  ;=> -0.9830099999999999
  (spline -0.04681 0.00152 -0.00342 22)
  ;=> -1.0297838095238094
  (spline -0.04681 0.00152 -0.00342 23)
  ;=> -1.0763404761904762
  (spline -0.04681 0.00152 -0.00342 35)
  ;=> -1.7624833333333334
  (spline -0.04681 0.00152 -0.00342 43)
  ;=> -2.4945252380952376
  (spline -0.04681 0.00152 -0.00342 44)
  ;=> -2.6100519047619044
  (spline -0.04681 0.00152 -0.00342 56)
  ;=> -4.5609433333333325
  (spline -0.04681 0.00152 -0.00342 63)
  ;=> -6.207529999999999

  ;
  ; Checks P1 and P2 on age spline
  ;

  ; transplant age 30/60
  (spline 0.00432 -0.0003983 0.00181 -21)
  ; -0.09072
  (spline 0.00432 -0.0003983 0.00181 9)
  ; 0.03888

  ; removal age 30 & 60
  (spline 0.04418 -0.00120 0.00360 -21)
  ; -0.9277799999999999
  (spline 0.04418 -0.00120 0.00360 9)
  ; 0.39762

  ; death age 30 & 60
  (spline -0.02226 0.00162 -0.00588 -21)
  ; 0.46746
  (spline -0.02226 0.00162 -0.00588 9)
  ; -0.20034

  ; transplant age 30/60
  (spline 0.00432 -0.0003983 0.00181 30)
  ; 0.12268665
  (spline 0.00432 -0.0003983 0.00181 60)
  ; 0.07394907330827066

  ; removal age 30 & 60
  (spline 0.04418 -0.00120 0.00360 30)
  ; 1.3045714285714285
  (spline 0.04418 -0.00120 0.00360 60)
  ; 1.7101127819548871

  ; death age 30 & 60
  (spline -0.02226 0.00162 -0.00588 30)
  ; -0.6396814285714285
  (spline -0.02226 0.00162 -0.00588 60)
  ; -0.2762370676691728
  )

