(ns transplants.spline)

(defn spline
  "Perform spline calculation to transform x using knots and betas. See Jenny Murray doc"
  [[k1 k2 k3 k4 :as knots]
   [beta1 beta2 beta3 :as betas]
   x]
  
  (let [cube+ (fn [x] (if (pos? x) (* x x x) 0))
        d3+ (fn [x n] (cube+ (- x n)))
        term (fn [n x] (/ (- (d3+ x n) (d3+ x k4)) (- k4 n)))
        f1 (fn [x] (- (term k1 x) (term k3 x)))
        f2 (fn [x] (- (term k2 x) (term k3 x)))
        xs (fn [x x0] [(- x x0) (- (f1 x) (f1 x0)) (- (f2 x) (f2 x0))])
        term1 (fn [n x] (/ (- (d3+ x n) (d3+ x k4)) (- k4 n)))
        term2 (fn [x] (/ (- (d3+ x k3) (d3+ x k4)) (- k4 k3)))
        sp (fn [n x] (- (term1 n x) (term2 x)))]
    (+
     (* beta1 x)
     (* beta2 (sp k1 x))
     (* beta3 (sp k2 x)))
    
    #_(cube+ x)
    ))



(comment

; Age knots
  (def knots [21 44 56 63])

; Age betas 
  (def betas [-0.04681 0.00152 -0.00342])

  (def splin (partial spline knots betas))
  ;(cube+ -1)
  (splin knots betas -1)
  ;=> 0

  ;(cube+ 2)
  ;=> 8

  ;(d3+ 8 2)
  ; => 216

  ;(d3+ 2 8)
  ; => 0

  ;(term1 21 21)
  ; => 0

  ;(term1 21 30)

  ;(term1 21 63)
  ; => 1764

  ;(term2 60)
  ;=> 9.142857142857142

  ;(* 42 42)
  ; => 1764

  ;(term1 21 30)
  ;=> 17.357142857142858

  ;(term2 30)
  ; => 0

  ;(sp 21 30)
  ; => 17.357142857142858

  ;(term1 44 30)
  ;=> 0

  ;(term2 30)

  ;(sp 44 30)
  ;(sp 44 50)

  (spline knots betas 21)
  ;=> -0.9830099999999999
  (spline knots betas 22)
  ;=> -1.0297838095238094
  (spline knots betas 23)
  ;=> -1.0763404761904762
  (spline knots betas 35)
  ;=> -1.7624833333333334
  (spline knots betas 43)
  ;=> -2.4945252380952376
  (spline knots betas 44)
  ;=> -2.6100519047619044
  (spline knots betas 56)
  ;=> -4.5609433333333325
  (spline knots betas 63)
  ;=> -6.207529999999999

  ;
  ; Checks P1 and P2 on age spline
  ;

  ; transplant age 30/60
  (spline knots [0.00432 -0.0003983 0.00181] -21)
  ; -0.09072
  (spline knots [0.00432 -0.0003983 0.00181] 9)
  ; 0.03888

  ; removal age 30 & 60
  (spline knots [0.04418 -0.00120 0.00360] -21)
  ; -0.9277799999999999
  (spline knots [0.04418 -0.00120 0.00360] 9)
  ; 0.39762

  ; death age 30 & 60
  (spline knots [-0.02226 0.00162 -0.00588] -21)
  ; 0.46746
  (spline knots [-0.02226 0.00162 -0.00588] 9)
  ; -0.20034

  ; transplant age 30/60
  (spline knots [0.00432 -0.0003983 0.00181] 30)
  ; 0.12268665
  (spline knots [0.00432 -0.0003983 0.00181] 60)
  ; 0.07394907330827066

  ; removal age 30 & 60
  (spline knots [0.04418 -0.00120 0.00360] 30)
  ; 1.3045714285714285
  (spline knots [0.04418 -0.00120 0.00360] 60)
  ; 1.7101127819548871

  ; death age 30 & 60
  (spline knots [-0.02226 0.00162 -0.00588] 30)
  ; -0.6396814285714285
  (spline knots [-0.02226 0.00162 -0.00588] 60)
  ; -0.2762370676691728
  )

