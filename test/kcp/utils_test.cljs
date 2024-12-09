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

(deftest test-localize-plural
  (let [plural-map {:0 "0 kidney cancer recurrences"
                    :1 "1 kidney cancer recurrence"
                    :n "$1 kidney cancer recurrences"}
        with-substitutions {:0 "There are no $1 kidney cancer recurrences affecting $2"
                            :1 "There is $1 kidney cancer recurrence affecting $2"
                            :n "There are $1 kidney cancer recurrences affecting $2"}
        fallback {:n "$1 kidney cancer recurrences"}]

    (testing "Basic pluralization without additional arguments"
      (is (= (utils/localize-plural 0 plural-map) "0 kidney cancer recurrences"))
      (is (= (utils/localize-plural 1 plural-map) "1 kidney cancer recurrence"))
      (is (= (utils/localize-plural 5 plural-map) "5 kidney cancer recurrences")))

    (testing "Pluralization with additional substitutions"
      (is (= (utils/localize-plural 0 with-substitutions "hospital A")
             "There are no 0 kidney cancer recurrences affecting hospital A"))
      (is (= (utils/localize-plural 0 with-substitutions)
             "There are no 0 kidney cancer recurrences affecting $2")))

    (testing "fallback"
      (is (= (utils/localize-plural 0 fallback "hospital A")
             "0 kidney cancer recurrences")))

    (testing "simple string"
      (is (= (utils/localize-plural 0 "$1 some string")
             "0 some string")))

    (testing "invalid input"
      (is (= (utils/localize-plural 0 "some string")
             "some string"))
      (is (= (utils/localize-plural 0 nil)
             ""))
      (is (= (utils/localize-plural nil "")
             ""))))

  (deftest test-string-split
    (testing "normalizations"
      (is (= (utils/string-split nil) []))
      (is (= (utils/string-split "a") ["a"]))
      (is (= (utils/string-split "a\nb") ["a" "b"])))
    ))