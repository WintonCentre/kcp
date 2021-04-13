(ns transplants.vis2-test
  (:require [cljs.test :refer [deftest testing is]]
            #_[clojure.data :as data]
            [transplants.vis2 :as vis]
            [same :refer [ish? zeroish?]]
            [clojure.test.check :as tc]
            [clojure.test.check.generators :as gen]
            [clojure.test.check.properties :as prop :include-macros true]
            [shadow.debug :refer [?-> ?->> locals]]))

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
              '([1 {:fs (0.1 0.7 0.2), :cum-fs (0.1 0.7999999999999999 1), :int-fs [10 70 20], :cum-int-fs (10 80 100)}]
                [3 {:fs (0.15 0.55 0.3), :cum-fs (0.15 0.7000000000000001 1), :int-fs [15 55 30], :cum-int-fs (15 70 100)}]
                [4
                 {:fs (0.2 0.3999999999999999 0.4)
                  :cum-fs (0.2 0.5999999999999999 0.9999999999999999)
                  :int-fs [20 40 40]
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

(defn close-to?
  [i n]
  (< (js/Math.abs (- i n) 1e-6)))

(def int-fs-series-sums-to-100
  (prop/for-all [v (generate-fs {:length 7})]
                (let [ifs (vis/int-fs-series v)
                      sum (apply + (map :int-fs ifs))]
                  (close-to? sum 100))))

(deftest int-fs-sum-is-ok
  (testing "int-fs-series sums to 100"
    (is (:pass? (tc/quick-check 100 int-fs-series-sums-to-100))))) 

(comment
  (gen/sample (generate-fs {:length 3}) 100)
  (gen/sample (generate-ifs {:length 3}) 100)
  (map #(apply + %) (gen/sample (generate-ifs {:length 3}) 100))

  (->> (gen/sample (generate-fs {:length 3}) 100)
       (map vis/int-fs-series)
       (map :int-fs)
       (map #(apply + %)))
  
  (map vis/int-fs-series
       (gen/sample (generate-fs {:length 3}) 100))

  (gen/vector gen/small-integer)

  (def property
    (prop/for-all [v (gen/vector gen/small-integer)]
                  (let [s (sort v)]
                    (and (not= (count v) (count s))
                         (or (empty? s)
                             (apply <= s))))))

  
  (gen/sample gen/small-integer)
  (take 100 (gen/sample-seq gen/small-integer))

  (gen/sample (gen/vector (gen/double* {:min 0, :max 1, :infinite? false, :NaN? false}) 100))

  (gen/sample (gen/vector (gen/choose 0 10000) 4 4))

  (gen/sample (gen/fmap (fn [v]
                          (let [sum (apply + v)]
                            (mapv #(/ % sum) v)))
                        (gen/vector (gen/choose 0 10000) 3 4)) 100)
  
  0)

