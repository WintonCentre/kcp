(ns kcp.utils-test
  (:require [cljs.test :refer [deftest testing is]]
            [kcp.utils :as utils]))

(deftest transpose
  (testing "transpose swaps rows and columms"
    (is (= (utils/transpose [[1 2 3 4] [-1 -2 -3 -4]])
           '([1 -1] [2 -2] [3 -3] [4 -4])))

    (is (= (utils/transpose '([1 -1] [2 -2] [3 -3] [4 -4]))
           '([1 2 3 4] [-1 -2 -3 -4])))))

(deftest test-filter-parallel-data
  (let [data {"Age"  [25 26 27 25]
              "Sex"  ["M" "F" "M" "M"]
              "Name" ["John" "Jane" "Doe" "Smith"]}
        ]

    (testing "matched query"
      (is (= (utils/filter-parallel-data data {"Age" 25, "Sex" "M"})
             {"Age"  [25 25]
              "Sex"  ["M" "M"]
              "Name" ["John" "Smith"]})))

    (testing "partial matches query"
      (is (= (utils/filter-parallel-data data {"Age" 30, "Sex" "M"})
             {"Age"  []
              "Sex"  []
              "Name" []})))
    ))
