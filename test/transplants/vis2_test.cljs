(ns transplants.vis2-test
  (:require [cljs.test :refer [deftest testing is]]
            [transplants.vis2 :as vis]
            ))

(def outcomes [:transplant :death])
(def fs [0.3 0.4])
(def plot-order {:transplant 1 :residual 2 :death 3})
(def fsk [[:transplant 0.3] [:residual 0.30000000000000004] [:death 0.4]])

(deftest data-prep-utils
  (testing "data preparation utilities"
    (is (= (vis/residual [0.1])
           0.9))

    (is (= (vis/residual [0.1 0.2 0.2])
           0.5))

    (is (= (vis/fs-keyed outcomes fs)
           '([:residual 0.30000000000000004] [:transplant 0.3] [:death 0.4])))

    (is (= (vis/fs-keyed-in-plot-order
            plot-order
            (vis/fs-keyed outcomes fs))
           '([:transplant 0.3] [:residual 0.30000000000000004] [:death 0.4])))
    
    (is (= (vis/fs-series fsk)
           {:fs '(0.3 0.30000000000000004 0.4), :cum-fs '(0.3 0.6000000000000001 1)}))))
