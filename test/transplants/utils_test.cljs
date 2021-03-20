(ns transplants.utils-test
  (:require [cljs.test :refer [deftest testing is]]
            [transplants.utils :as utils]))

(deftest transpose
  (testing "transpose swaps rows and columms"
    (is (= (utils/transpose [[1 2 3 4] [-1 -2 -3 -4]])
           '([1 -1] [2 -2] [3 -3] [4 -4])))

    (is  (= (utils/transpose '([1 -1] [2 -2] [3 -3] [4 -4]))
            '([1 2 3 4] [-1 -2 -3 -4])))))
