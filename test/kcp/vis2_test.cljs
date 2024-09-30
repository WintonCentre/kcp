(ns kcp.vis2-test
  (:require [cljs.test :refer [deftest testing is]]
            [kcp.vis2 :as vis]
            [same :refer [ish?]]
            [clojure.test.check :as tc]
            [clojure.test.check.generators :as gen]
            [clojure.test.check.properties :as prop :include-macros true]
            ))

(def outcomes "fixture" [:transplant :death])
(def fs "fixture" [0.3 0.4])
(def data-keys "fixture" [:death :residual :transplant])

(deftest data-prep-utils
  (testing "data preparation utilities"
    (is (ish? (vis/residual [0.1])
              0.9))

    (is (ish? (vis/residual [0.1 0.2 0.2])
              0.5))

    (is (ish? (vis/fs-mapped outcomes fs)
              {:transplant 0.3, :death 0.4, :residual 0.30000000000000004}))

    (is (ish? (vis/fs-in-order
                data-keys
                (vis/fs-mapped outcomes fs))
              '(0.4 0.30000000000000004 0.3)))

    (is (ish? (vis/fs-time-series [:transplant :death]
                                  [:death, :residual, :transplant]
                                  [[1 [0.2 0.1]]
                                   [3 [0.3 0.15]]
                                   [4 [0.4 0.2]]])
              '([1 {:fs (0.1 0.7 0.2), :cum-fs (0.1 0.7999999999999999 1), :int-fs [10 70 20], :cum-int-fs (10 80 100)}]
                [3 {:fs (0.15 0.55 0.3), :cum-fs (0.15 0.7000000000000001 1), :int-fs [15 55 30], :cum-int-fs (15 70 100)}]
                [4
                 {:fs         (0.2 0.3999999999999999 0.4)
                  :cum-fs     (0.2 0.5999999999999999 0.9999999999999999)
                  :int-fs     [20 40 40]
                  :cum-int-fs (20 60 100)}])))))

;;
;; Generate some ordered Fs for testing.
;;  
(defn generate-fs
  "Generate random fs that sum to 1"
  [{:keys [length] :or {length 3}}]
  (gen/fmap (fn [v]
              (let [sum (apply + v)]
                (mapv #(/ % sum) v)))
            (gen/not-empty (gen/vector (gen/choose 1 10000) length length)))
  )

(def int-fs-series-sums-to-100
  (prop/for-all [v (generate-fs {:length 7})]
                (let [ifs (vis/int-fs-series v)
                      sum (apply + (:int-fs ifs))]
                  (= sum 100))))

(deftest int-fs-sum-is-ok
  (testing "int-fs-series sums to 100"
    (is (:pass? (tc/quick-check 100 int-fs-series-sums-to-100)))))


(deftest int-fs-series
  (testing "rounding on sum to 100" (is (= (vis/int-fs-series [0.2 0.3 0.5])
                                           {:fs [0.2 0.3 0.5], :cum-fs [0.2 0.5 1], :int-fs [20 30 50], :cum-int-fs [20 50 100]})))

  ; for both of these, the value with the largest difference should be adjusted
  (testing "rounding on sum to 99" (is (= (vis/int-fs-series [0.507 0.266 0.227])
                                          {:fs [0.507 0.266 0.227], :cum-fs [0.507 0.773 1], :int-fs [51 26 23], :cum-int-fs [51 77 100]})))

  (testing "rounding on sum to 101" (is (= (vis/int-fs-series [0.5031 0.2625 0.2344])
                                           {:fs [0.5031 0.2625 0.2344], :cum-fs [0.5031 0.7656000000000001 1], :int-fs [50 26 24], :cum-int-fs [50 76 100]})))
  )
