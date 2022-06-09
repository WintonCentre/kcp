(ns kcp.bundles-test
  (:require [cljs.test :refer [deftest testing is]]
            [kcp.bundles :as t]))

(deftest cif-0-test
  (testing "day selection selects the correct baseline cif"
    (is (= (t/cif-0 {:baseline-cifs [{:days 0 :cif 23}
                                      {:days 3 :cif 23}
                                      {:days 10 :cif 23}
                                      {:days 20 :cif 23}
                                      {:days 100 :cif 23}]} 5)
           {:days 3 :cif 23}) "in range selects last record before")

    (is (=  (t/cif-0 {:baseline-cifs [{:days 0 :cif 23}
                                       {:days 3 :cif 23}
                                       {:days 10 :cif 23}
                                       {:days 20 :cif 23}
                                       {:days 100 :cif 23}]} -1)
            {:days 0 :cif 23}) "before first day, selects first day")

    (is (= (t/cif-0 {:baseline-cifs [{:days 0 :cif 23}
                                      {:days 3 :cif 23}
                                      {:days 10 :cif 23}
                                      {:days 20 :cif 23}
                                      {:days 100 :cif 23}]} 200)
           {:days 100 :cif 23}) "beyond end of range, selects last")))