(ns kcp.spline-test
  (:require [cljs.test :refer [deftest testing is]]
            [kcp.spline :as spl]))

(deftest age-69
  (testing "Age spline at year 69"
    (let [knots [21 44 56 63]
          betas [0.00507 -0.0004272 0.00192]
          tx-age-spline (partial spl/spline knots betas 51)
          cif_0 0.3122]
      (is (= (tx-age-spline 69) 
             0.3432035187969925) 
          "spline on age 69")
      (is (= (- 1 (js/Math.pow (- 1 cif_0) (js/Math.exp (tx-age-spline 69))))
             0.4099210121796981)
          "cif on age 69 changed"))))

(comment
  ;; set up a test case to chase age discrepancy)
  (def k1 21)
  (def k2 44)
  (def k3 56)
  (def k4 63)
  (def knots [k1 k2 k3 k4])
  (def beta1 0.00507)
  (def beta2 -0.0004272)
  (def beta3 0.00192)
  (def betas [beta1 beta2 beta3])

  ; create a transplant age spline function with these knots and betas 
  ; and a baseline age of 51 partially applied.
  (def tx-age-spline (partial spl/spline knots betas 51))

  ; apply to age 69
  (def beta-age-69 (tx-age-spline 69))
  ; => 0.3432035187969925
  ; 
  ; This result agrees with cell B11 of age69-day317-eaxmple.cljs which is a 
  ; copy of "Calculated adjusted CIFs - example.xlsx" with the newer betas inserted
  ; It also agrees with the age beta-x figure on the test page for Birmingham.

  ; completing the calculation for scenario 25
  (def cif_0 0.3122)
  (def cif (- 1 (js/Math.pow (- 1 cif_0) (js/Math.exp beta-age-69))))
  ; => 0.4099210121796981
  ; which agrees with the test page.
  ; However scenario 25 of "Birmingham test case estimates.xlsx" for day 317 is
  ; 0.4092188 in cell C109.
  )
