(ns kcp.pkm-model-test
  (:require [cljs.test :refer [deftest testing is]]
            [kcp.pkm-model :as pkm]
            [same :refer [ish?]]))

(deftest compute-F
  (testing "Returns zeroed F for invalid inputs"
    (let [{:keys [F risk-group]} (pkm/compute-F {} {} {})]
      (is (= 16 (count F)))
      (is (= [0 [0.0 0.0]] (first F)))
      (is (= [180 [0.0 0.0]] (last F)))
      (is (= "" risk-group))))

  (testing "Happy-path calculation for valid inputs"
    (let [inputs {:age-at-surgery "65"
                  :sex :Male
                  :nuclear-grade :2
                  :t-stage :pT1a
                  :n-stage :pN0
                  :charlson-comorbidity-score "2"
                  :smoking-history :Never}
          rcc-hazards {"Time" (map double (range 1 16))
                       "H0" (map (fn [t] (* t 0.01)) (range 1 16))}
          mort-hazards {"Time" (map double (range 1 16))
                        "H0" (map (fn [t] (* t 0.02)) (range 1 16))}
          {:keys [F risk-group]} (pkm/compute-F inputs rcc-hazards mort-hazards)
          month-60-val (second (first (filter (fn [[m _]] (= m 60)) F)))
          month-120-val (second (first (filter (fn [[m _]] (= m 120)) F)))]
      (is (= 16 (count F)))
      (is (= [0 [0.0 0.0]] (first F)))
      (is (ish? 0.11718721883631984 (first month-60-val)))
      (is (ish? 0.057059513211194776 (second month-60-val)))
      (is (ish? 0.21164352649272625 (first month-120-val)))
      (is (ish? 0.10648801397306458 (second month-120-val)))
      (is (= :low risk-group)))))

(deftest model->F
  (testing "Adds origin and converts years to months"
    (let [data [{:year 1 :rcc-death 0.1 :oc-death 0.05}
                {:year 5 :rcc-death 0.2 :oc-death 0.1}]
          F (pkm/model->F data)]
      (is (= [[0 [0.0 0.0]]
              [12 [0.05 0.1]]
              [60 [0.1 0.2]]]
             F))))

  (testing "Empty result handling"
    (is (= [[0 [0.0 0.0]]] (pkm/model->F [])))))

(deftest index-hazards
  (testing "Filters only integer timepoints and correlates H0"
    (let [raw-data {"Time" [0.5 1.0 1.5 2.0 2.5]
                    "H0"   [0.05 0.1 0.15 0.2 0.25]}
          indexed (pkm/index-hazards raw-data)]
      (is (= {1.0 0.1, 2.0 0.2} indexed))))
  (testing "Empty input"
    (is (= {} (pkm/index-hazards {"Time" [] "H0" []}))))

  (testing "Double lookup consistency"
    (let [raw-data {"Time" [1 2 3]
                    "H0" [0.1 0.2 0.3]}
          indexed (pkm/index-hazards raw-data)]
      ; Verify keys in returned map are doubles
      (is (= (double 1) (first (keys indexed))))
      ; Verify we can retrieve values using double keys
      (is (= 0.1 (get indexed 1.0)))
      (is (= 0.2 (get indexed (double 2)))))))

(deftest normalize-inputs
  (testing "Normalizes valid inputs correctly"
    (let [inputs {:age-at-surgery "65"
                  :sex :Male
                  :nuclear-grade :2
                  :t-stage :pT1a
                  :n-stage :pN0
                  :charlson-comorbidity-score "2"
                  :smoking-history :Never}
          expected {:age 65 :sex "M" :grade 2 :tstage 1 :ln 0 :cci 2 :smoking "never"}]
      (is (= expected (pkm/normalize-inputs inputs)))))

  (testing "Caps CCI at 12"
    (let [inputs-over {:age-at-surgery "65"
                       :sex :Male
                       :nuclear-grade :2
                       :t-stage :pT1a
                       :n-stage :pN0
                       :charlson-comorbidity-score "15"
                       :smoking-history :Never}
          inputs-at   {:age-at-surgery "65"
                       :sex :Male
                       :nuclear-grade :2
                       :t-stage :pT1a
                       :n-stage :pN0
                       :charlson-comorbidity-score "12"
                       :smoking-history :Never}]
      (is (= 12 (:cci (pkm/normalize-inputs inputs-over))))
      (is (= 12 (:cci (pkm/normalize-inputs inputs-at))))))

  (testing "Returns nil for incomplete inputs"
    (is (nil? (pkm/normalize-inputs {})))
    (is (nil? (pkm/normalize-inputs {:age-at-surgery "65"}))))

  (testing "Returns nil for unrecognized keys or invalid value types"
    (let [base {:age-at-surgery "65"
                :sex :Male
                :nuclear-grade :2
                :t-stage :pT1a
                :n-stage :pN0
                :charlson-comorbidity-score "2"
                :smoking-history :Never}]
      (is (nil? (pkm/normalize-inputs (assoc base :sex :Other))))
      (is (nil? (pkm/normalize-inputs (assoc base :nuclear-grade :5))))
      (is (nil? (pkm/normalize-inputs (assoc base :t-stage :pT5))))
      (is (nil? (pkm/normalize-inputs (assoc base :n-stage :pN3))))
      (is (nil? (pkm/normalize-inputs (assoc base :smoking-history :Occasional)))))))

(deftest risk-group
  (testing "Classifies 10-year RCC cumulative incidence into risk groups correctly"
    (is (= :low (pkm/risk-group 0.19)))
    (is (= :low (pkm/risk-group 0.1934)))
    (is (= :intermediate (pkm/risk-group 0.1935)))
    (is (= :intermediate (pkm/risk-group 0.30)))
    (is (= :intermediate (pkm/risk-group 0.3889)))
    (is (= :high (pkm/risk-group 0.389)))
    (is (= :high (pkm/risk-group 0.50)))))

(deftest compute-pi
  (testing "Standard male patient"
    (let [inputs {:age 65 :sex "M" :grade 2 :tstage 1 :ln 0 :cci 2 :smoking "never"}
          pi (pkm/compute-pi inputs)]
      (is (ish? 0.203346 (:rcc-pi pi)))
      (is (ish? 0.263782 (:mort-pi pi)))))
  (testing "High-risk former smoker female patient"
    (let [inputs {:age 70 :sex "F" :grade 4 :tstage 3 :ln 1 :cci 5 :smoking "former"}
          pi (pkm/compute-pi inputs)]
      (is (ish? 2.572346 (:rcc-pi pi)))
      (is (ish? 1.359782 (:mort-pi pi))))))

(deftest compute-at-year
  (testing "Competing risk probability calculations at year 5"
    (let [pi {:rcc-pi 0.203346 :mort-pi 0.263782}
          rcc-idx {5.0 0.05}
          mort-idx {5.0 0.10}
          res (pkm/compute-at-year pi 5 rcc-idx mort-idx)]
      (is (ish? 0.057059513211194776 (:rcc-death res)))
      (is (ish? 0.11718721883631984 (:oc-death res)))))
  (testing "Zero hazard/denominator edge case"
    (let [pi {:rcc-pi 0.203346 :mort-pi 0.263782}
          rcc-idx {5.0 0.0}
          mort-idx {5.0 0.0}
          res (pkm/compute-at-year pi 5 rcc-idx mort-idx)]
      (is (= 0.0 (:rcc-death res)))
      (is (= 0.0 (:oc-death res))))))