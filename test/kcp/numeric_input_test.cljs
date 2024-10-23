(ns kcp.numeric-input-test
  (:require [cljs.test :refer [deftest testing is]]
            [kcp.numeric-input :as numeric]))

(deftest num-to-str-tests
  (testing "num-to-str functionality"
    (is (nil? (numeric/num-to-str nil)) "Should return nil for nil input")
    (is (= "4" (numeric/num-to-str 4.4 0)) "Should convert 4.4 to 4 with 0 decimal places")
    (is (= "4.4" (numeric/num-to-str 4.4 1)) "Should convert 4.4 to 4.4 with 1 decimal place")
    (is (= "4.40" (numeric/num-to-str 4.4 2)) "Should convert 4.4 to 4.40 with 2 decimal places")
    (is (= "" (numeric/num-to-str js/NaN)) "Should return an empty string for NaN")
    ))

(deftest get-validated-input-tests
  (testing "get-validated-input functionality"
    (is (nil? (numeric/get-validated-input nil 0 100 0.1)) "Should return nil for nil input")
    (is (= 0 (numeric/get-validated-input "I am an invalid input..." 0 100 0.1)) "Should return minimum for invalid input")
    (is (= 4.1 (numeric/get-validated-input "4." 0 100 0.1)) "Should handle incrementing a float string ending with dot correctly")
    (is (= 4.55 (numeric/get-validated-input "4.45" 0 100 0.1)) "Should increment float string correctly")
    (is (= 0 (numeric/get-validated-input "0" 0 100 -1)) "Should clamp to minimum on increment")
    (is (= 100 (numeric/get-validated-input "100" 0 100 1)) "Should clamp to maximum on decrement")
    ))