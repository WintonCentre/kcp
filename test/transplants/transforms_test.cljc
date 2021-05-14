(ns transplants.transforms-test
  (:require #?(:cljs [cljs.test :refer [deftest testing is]])
            #?(:clj [clojure.test :refer [deftest testing is]])
            [transplants.transforms :as t]))

(deftest unstring-key
  []
  (testing "unstrung-key")
  (is (t/unstring-key ":hello") :hello)
  (is (t/unstring-key ":foo/bar") :foo/bar)
  (is (t/unstring-key " :foo/bar ") :foo/bar)
  (is (t/unstring-key " foo " " bar ") :foo/bar)
  (is (t/unstring-key " foo " " :bar ") :foo/bar)
  (is (t/unstring-key " 6 ") "6")
  (is (t/unstring-key 8) 8)
  )