(ns kcp.shortener-test
  (:require [cljs.test :refer [deftest testing is use-fixtures]]
            [kcp.shortener :as shortener]
            ))
(deftest test-db-to-URI
  (testing "db-to-URI"
    (is (= (shortener/db-to-URI nil nil)
           "-"))
    (is (= (shortener/db-to-URI nil {})
           "-"))
    (is (= (shortener/db-to-URI nil {:key "value"})
           "-"))
    (is (= (shortener/db-to-URI {:key1 "va1", :key2 "va2", :key3 "va3"} [:key1, :key2])
           "va1va2"))))

(deftest test-URI-to-db
  (testing "URI-to-db"
    (is (= (shortener/URI-to-db nil nil)
           {}))
    (is (= (shortener/URI-to-db nil "-")
           {}))
    (is (= (shortener/URI-to-db nil "")
           {}))
    (is (= (shortener/URI-to-db {"va1" [:key1 "k1"], "va2" [:key2 "k2"], "va3" [:key3 "k3"]}
                                "va1va2")
           {:key1 "k1" :key2 "k2"}))
    ))