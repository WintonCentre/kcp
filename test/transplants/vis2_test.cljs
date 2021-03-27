(ns transplants.vis2-test
  (:require [cljs.test :refer [deftest testing is]]
            #_[clojure.data :as data]
            [transplants.vis2 :as vis]
            [same :refer [ish? zeroish?]]))

(def outcomes [:transplant :death])
(def fs [0.3 0.4])
(def plot-order {:transplant 1 :residual 2 :death 3})
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

    (is (ish? (vis/fs-keyed outcomes fs)
           '([:residual 0.30000000000000004] [:transplant 0.3] [:death 0.4])))

    (is (ish? (vis/fs-keyed-in-plot-order
            plot-order
            (vis/fs-keyed outcomes fs))
           '([:transplant 0.3] [:residual 0.30000000000000004] [:death 0.4])))
    
    (is (ish? (vis/fs-series fsk)
           {:fs '(0.3 0.30000000000000004 0.4), :cum-fs '(0.3 0.6000000000000001 1)}))
    
    (is (ish? (vis/fs-time-series outcomes plot-order t-fs)
           [[1 {:fs '(0.2 0.7 0.1), :cum-fs '(0.2 0.8999999999999999 0.9999999999999999)}]
            [3 {:fs '(0.3 0.55 0.15), :cum-fs '(0.3 0.8500000000000001 1)}]
            [4 {:fs '(0.4 0.3999999999999999 0.2), :cum-fs '(0.4 0.7999999999999999 1)}]]))))
