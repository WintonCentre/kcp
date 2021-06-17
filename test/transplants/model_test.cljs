(ns transplants.model-test
  (:require [cljs.test :refer [deftest testing is]]
            [transplants.model :as m]))


(deftest fixed-precision
  (testing "fixed point and sig figs"
    (is (= (m/to-percent 0.066) "7"))
    (is (= (m/to-percent 0.01)  "1"))
    (is (= (m/to-precision 123.456789 6) "123.457")))
  )

(def S0 [[0 [1 1]]
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
           [1095 [0.080756853 0.5165745583]]])
(def  days [0 5 30 100 1000 2000 10000])

(deftest S0-for-days
  (testing "S0-for-days filter"
    (is (= (m/S0-for-days S0 days)
           [[0 [1 1]] [4 [0.9774623833 0.9949805958]] [30 [0.9336213532 0.9874262621]] [91 [0.8060717379 0.9521491681]] [954 [0.0991815473 0.5659942916]] [1095 [0.080756853 0.5165745583]] [1095 [0.080756853 0.5165745583]]]))))