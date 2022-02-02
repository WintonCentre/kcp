(ns test-params
  (:require
   [clojure.test :as t :refer [is deftest testing]]
   [prepare-test-data :as s]))

(defn parameter-values
  "Move this to a proper test framework?"
  [r-outcome edn-outcome]
  (testing (str (:organ s/options) ":" (:tool s/options) ": " edn-outcome "/" r-outcome)
    (map
     (fn [rnf]
       (let [a (get rnf edn-outcome)
             b (:r-value (s/info-by-outcome (get-in rnf [:r-link :info]) r-outcome))]
         [a b]))
     s/r-named-factors)))

(defn test-parameter-values
  "Move this to a proper test framework?"
  [r-outcome edn-outcome]
  (testing (str (:organ s/options) ":" (:tool s/options) ": " edn-outcome "/" r-outcome)
    (map
     (fn [rnf]
       (let [a (get rnf edn-outcome)
             b (:r-value (s/info-by-outcome (get-in rnf [:r-link :info]) r-outcome))]
         (is (not (s/different? a b)) (str "Mismatch for " (:factor rnf) " " (:level rnf) " " r-outcome " " a " /= " b))))
     s/r-named-factors)))

(defn get-r-value
  [rnf r-outcome]
  (:r-value (s/info-by-outcome (get-in rnf [:r-link :info]) r-outcome)))

(defn get-edn-value
  [rnf edn-outcome]
  (get rnf edn-outcome))

(defn values-match
  [rnf r-outcome edn-outcome]
  (s/near? (get-r-value rnf r-outcome) (get-edn-value rnf edn-outcome)))

(deftest test-all-kidney-tx
  (doseq [rnf s/r-named-factors]
    (let [a (get-r-value rnf "tx")
          b (get-edn-value rnf :beta-transplant)]
      (is (values-match rnf a b) (str a " and " b " are different")))))

(deftest test-all-kidney-rem
  (doseq [rnf s/r-named-factors]
    (let [a (get-r-value rnf "tx")
          b (get-edn-value rnf :beta-removal)]
      (is (values-match rnf a b) (str a " and " b " are different")))))


(deftest test-all-kidney-dth
  (doseq [rnf s/r-named-factors]
    (let [a (get-r-value rnf "dth")
          b (get-edn-value rnf :beta-removal)]
      (is (values-match rnf a b) (str a " and " b " are different")))))
