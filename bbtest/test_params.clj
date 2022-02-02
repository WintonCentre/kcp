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
  (:r-value (s/info-by-outcome (get-in rnf [:r-link :info]) r-outcome))
  )

(defn get-edn-value
  [rnf edn-outcome]
  (get rnf edn-outcome))

(defn values-match
  [rnf r-outcome edn-outcome]
  (println (get-r-value rnf "tx") " == " (get-edn-value rnf :beta-transplant)
           ": " (not (s/different? (get-r-value rnf r-outcome) (get-edn-value rnf edn-outcome))))
  (not (s/different? (get-r-value rnf r-outcome) (get-edn-value rnf edn-outcome)))
 )

(deftest kidney-tx-params1
  (is (values-match (nth s/r-named-factors 1) "tx" "beta-transplant")))

(deftest kidney-tx-params2
  (is (values-match (nth s/r-named-factors 2) "tx" "beta-transplant")))

(deftest kidney-tx-params3
  (is (values-match (nth s/r-named-factors 3) "tx" "beta-transplant")))

(deftest test-all-kidney-tx
  (doseq [rnf s/r-named-factors]
    (is (values-match rnf (get-r-value rnf "tx") (get-edn-value rnf :beta-transplant)) (:r-factor rnf))))
