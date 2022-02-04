(ns test-params
  (:require
   [clojure.test :as t :refer [is deftest testing]]
   [clojure.string :as str]
   [prepare-test-data :as s]))

(def organ "lung")
(def organ-key (s/get-organ))

(def test-options [#_{:organ "kidney", :tool "waiting", :centre "Belfast"}
                   #_{:organ "kidney", :tool "survival", :centre "Belfast"}
                   #_{:organ "kidney", :tool "ldsurvival", :centre "UK"}
                   #_{:organ "kidney", :tool "graft", :centre "Belfast"}
                   #_{:organ "kidney", :tool "ldgraft", :centre "UK"}
                   {:organ "lung", :tool "waiting", :centre "Newcastle"}
                   {:organ "lung", :tool "post-transplant", :centre "Newcastle"}])
(def outcomes {:kidney [[:beta-transplant "tx"]
                        [:beta-death "dth"]
                        [:beta-removal "rem"]]
               :lung [[:beta-translant "tx"]
                      [:beta-death "rem"]]
               #_#_:beta-removal "rem"})

(def rnfs (s/r-named-factors (first test-options)))

(defn str-options
  [options]
  (str/join " " (vals options)))

(defn get-r-value
  [rnf r-outcome]
  (:r-value (s/info-by-outcome (get-in rnf [:r-link :info]) r-outcome)))

(defn get-r-name
  [rnf r-outcome]
  (:r-name (s/info-by-outcome (get-in rnf [:r-link :info]) r-outcome)))

(defn get-edn-value
  [rnf edn-outcome]
  (get rnf edn-outcome))

(defn values-match
  [rnf r-outcome edn-outcome]
  (s/near? (get-r-value rnf r-outcome) (get-edn-value rnf edn-outcome)))

(deftest all-parameters
  (doseq [options test-options]
    ;(println options)
    (let [organ (:organ options)
          outcome (get outcomes (keyword organ))]
      (doseq [[clj-outcome r-outcome] outcome]
        ;(println r-outcome)
        (testing r-outcome
          (doseq [rnf (s/r-named-factors options)]
            (testing (pr-str (get rnf :factor) (get rnf :level) r-outcome)
              (let [a (get-r-value rnf r-outcome)
                    b (get-edn-value rnf clj-outcome)]

                (when (and a b (number? a) (number? b))
                  ;(println (class a) (class b))
                  (is (s/near? a b) (str (:r-factor rnf) " " (:r-level rnf) ": " a " and " b " differ")))))))))


      #_(doseq [rnf (s/r-named-factors options)]
          (let [a (get-r-value rnf "tx")
                b (get-edn-value rnf :beta-transplant)]
            (is (near? a b) (str a " and " b " are different"))))
      #_(is map? options)))  ;;; placeholder


(deftest test-all-lung-tx
    (doseq [rnf (s/r-named-factors (first test-options))]
      (testing (pr-str (get rnf :factor) (get rnf :level) "tx")
        (let [a (get-r-value rnf "tx")
              b (get-edn-value rnf :beta-transplant)]
          (when (and a b)
            (is (s/near? a b) (str a " and " b " differ")))))))
(comment
  (def rnfs (s/r-named-factors (first test-options)))
  (def rnf (nth rnfs 1))
  (get rnf :factor)
  (get rnf :level)
  (get-r-value rnf "tx")

  (test-all-lung-tx)
  )
  
#_(deftest test-all-kidney-tx
  (doseq [rnf (s/r-named-factors (first test-options))]
    (testing (pr-str (get rnf :factor) (get rnf :level) "tx")
      (let [a (get-r-value rnf "tx")
            b (get-edn-value rnf :beta-transplant)]
        (when (and a b)
          (is (s/near? a b) (str a " and " b " differ")))))))


#_(deftest test-all-kidney-rem
    (doseq [rnf s/r-named-factors]
      (let [a (get-r-value rnf "tx")
            b (get-edn-value rnf :beta-removal)]
        (is (values-match rnf a b) (str a " and " b " are different")))))


#_(deftest test-all-kidney-dth
    (doseq [rnf s/r-named-factors]
      (let [a (get-r-value rnf "dth")
            b (get-edn-value rnf :beta-removal)]
        (is (values-match rnf a b) (str a " and " b " are different")))))

