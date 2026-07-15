(ns kcp.charlson-test
  (:require [cljs.test :refer [deftest testing is]]
            [kcp.charlson :as charlson]))

(deftest calculate-capped-charlson-score
         (testing "Calculates Charlson score with cancer baseline"
                  (let [inputs {:MI true
                                :CHF false
                                :PVD false
                                :CBD false
                                :DEM false
                                :CPD true
                                :CTD false
                                :UD false
                                :LIVmild false
                                :DIB true
                                :HMP false
                                :RENAL true
                                :DIBend false
                                :LEUK false
                                :LYMPH false
                                :LIVsev false
                                :AIDS false}]
                       (is (= 7 (charlson/calculate-charlson-score inputs)))))

         (testing "Caps Charlson score at 12"
                  (let [inputs {:MI true
                                :CHF true
                                :PVD true
                                :CBD true
                                :DEM true
                                :CPD true
                                :CTD true
                                :UD true
                                :LIVmild true
                                :DIB true
                                :HMP true
                                :RENAL true
                                :DIBend true
                                :LEUK true
                                :LYMPH true
                                :LIVsev true
                                :AIDS true}]
                       (is (= 12 (charlson/calculate-capped-charlson-score inputs))))))