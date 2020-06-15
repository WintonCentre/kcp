(ns transplants.karma-test
  (:require [cljs.test :refer [deftest testing is]]))

(deftest karma
  (testing "karma"
    (is (= 1 1) "should pass")))