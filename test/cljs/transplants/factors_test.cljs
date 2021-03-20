(ns transplants.factors-test
  (:require [cljs.test :refer [deftest testing is use-fixtures]]
            [transplants.bundles :as bun]
            [transplants.factors :as fac]
            [shadow.resource :as sc]))

(def bundle {:fmaps "foo"})
(def master-fmaps (:fmaps bundle))
(def master-fmap (get-in bundle [:fmaps :d-gp*centre]))
(def master-fmap-level (get-in bundle [:fmaps :d-gp*centre :levels :pf*birm]))

(def env
  (let [inputs {:lung {:age "30", :sex :male, :blood-group :B, :in-hosp :no
                       :ethnicity :white, :fvc "3", :bmi "30", :dd-pred :pred-1-14
                       :thoracotomy :no, :bilirubin "3", :nyha-class :nyha-2, :d-gp :pf}}
        path-params {:organ :lung, :centre :new, :tool :waiting}
        bundle {}]
    [path-params bundle inputs]))


(defn with-env
  "define a fixture to test functions that use the path, bundle, inputs environment."
  [f])

(comment
  (fac/lookup-cross-over-factor-level env :dgp*centre)
  (:centre (first env))

  (fac/lookup-simple-factor-level env :age)
  (fac/lookup-simple-factor-level env :centre)
  (fac/lookup-simple-factor-level env :d-gp)

  (fac/is-spline? env :bmi)
  (fac/is-spline? env :age)
  (fac/is-spline? env :fvc)

  (fac/is-categorical? env :bmi)
  (fac/is-numeric? env :bmi)
  (fac/lookup-simple-factor-level env :bmi)
  (fac/lookup-simple-factor-level env :dd-pred)

  ; FAIL! but then :d-gp*centre is NOT a simple factor, it's a crossover. So actually OK!
  (fac/lookup-simple-factor-level env :d-gp*centre)

  ; So we need to call this instead...

  #_(lookup-cross-over-factor-level env :d-gp*centre)

  (fac/selected-beta-x env :d-gp*centre master-fmap :beta-transplant)
  (fac/selected-beta-x env :dd-pred master-fmap :beta-transplant)
  (fac/selected-beta-x env :ethnicity master-fmap :beta-transplant)

   ;(selected-beta-xs env :beta-transplant)
  (fac/sum-beta-xs env :beta-transplant)
  ;=>
  #_([:d-gp*centre :pf*birm -0.10624]
     [:age [:spline '(21 44 56 63) '(0.00507 -0.0004272 0.00192)]]
     [:dd-pred :pred-1-14 0.15256]
     [:nyha-class :nyha-2 0.52044]
     [:fvc [:spline '(0.94 1.63 2.22 3.55) '(0.28376 0.23757 -0.69056)]]
     [:in-hosp :no 0.25921] [:sex :male 0.24638] [:d-gp :pf -0.23764]
     [:blood-group :B -0.73794] [:ethnicity :white -0.03768]
     [:bmi 0.01457 23.0224 0.10166363199999998]
     [:bilirubin -0.0004091 9 0.0024546000000000004]
     [:thoracotomy :no 0.44664]))
