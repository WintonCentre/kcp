(ns transplants.vis2-test
  (:require [cljs.test :refer [deftest testing is]]
            #_[clojure.data :as data]
            [transplants.vis2 :as vis]
            [same :refer [ish? zeroish?]]))

(def outcomes [:transplant :death])
(def fs [0.3 0.4])
(def plot-order {:transplant 1 :residual 2 :death 3})
(def data-keys [:death :residual :transplant])
(def fsk [[:transplant 0.3] [:residual 0.30000000000000004] [:death 0.4]])

;;
;; The fs are presented in spreadsheet column order which is often different from plot order. 
;; They are also missing the residuals.
;; 
(def t-fs [[1 [0.2 0.1]]
           [3 [0.3 0.15]]
           [4 [0.4 0.2]]])

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

    (is (ish? (vis/fs-series '(0.4 0.30000000000000004 0.3))
              {:fs '(0.4 0.30000000000000004 0.3), :cum-fs '(0.4 0.7000000000000001 1)}))

    (is (ish? (vis/fs-time-series [:transplant :death]
                                   [:death, :residual, :transplant]
                                   [[1 [0.2 0.1]]
                                    [3 [0.3 0.15]]
                                    [4 [0.4 0.2]]])
              '([1 {:fs (0.1 0.7 0.2), :cum-fs (0.1 0.7999999999999999 1)}]
                [3 {:fs (0.15 0.55 0.3), :cum-fs (0.15 0.7000000000000001 1)}]
                [4 {:fs (0.2 0.3999999999999999 0.4), :cum-fs (0.2 0.5999999999999999 0.9999999999999999)}])))))
