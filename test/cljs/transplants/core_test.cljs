(ns transplants.core-test
  (:require [cljs.test :refer-macros [deftest testing is]]
            [transplants.core :as core]))

(deftest fake-test
  (testing "fake description"
    (is (= 1 2))))
