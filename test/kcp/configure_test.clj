(ns kcp.configure-test
  (:require [kcp.configure :as c]
            [kcp.config-utils :as utils]
            [clojure.test :as t :refer [deftest is testing]]
            [clojure.string :refer [starts-with?]]
            [clojure.spec.alpha :as s]))


(deftest utils
  (testing "utilities"
    (is (= (utils/maybe-key ":a") :a))
    (is (= (utils/maybe-key "A") "A"))
    (is (= (utils/maybe-key 1) 1))
    (is (= (utils/transpose [[1 2 3] [4 5 6]]) [[1 4] [2 5] [3 6]]))))

;;
; Define the structure of config.edn
;;
(def organs [:kidney])

(s/def ::config-edn (s/keys :req-un [::workbook ::export ::bundles]
                            :opt-un [::sheets]))

(def bundle-specs {:kidney (s/keys :req-un [::centres
                                            ::tools
                                            ::ldsurvival]
                                   :opt-un [::sheets])})

; A bundle is a sequence of spreadsheets represented by keywords
(s/def ::bundle (s/+ keyword?))
(s/def ::seq-of-bundles (s/coll-of ::bundle))


;;
; Test the structure of config.edn
;;
(deftest config-edn
  (testing "config.edn structure")
  (doseq [organ organs]
    (is (s/valid? ::config-edn (c/get-config organ)))))

(deftest top-level-bundles
  (testing "top-level bundles structure"
    (doseq [organ organs]
      (is (s/valid? (bundle-specs organ) (c/get-bundle organ))))))

(deftest bundles
  (testing "all bundles are sequences of keyworded sheet names"
    (doseq [organ organs]
      (is (s/valid? ::seq-of-bundles (vals (c/get-bundle organ))) (name organ)))))


#_(bundles)
(def organ :kidney)
(def sheet :waiting-inputs)

(defn rectangular [organ sheet]
  (let [variables (c/get-col-maps organ sheet)
        lengths (map count (vals variables))]
    (is (= (count (distinct lengths)) 1) (str "rectangular?:" organ sheet))
    (is (pos? (first (distinct lengths))) (str "rectangular?:" organ sheet))))

(deftest rectangular-data-frames
  (testing "all data-frames are rectangular and not empty"
    (doseq [organ organs
            sheet (reduce concat [] (vals (c/get-bundle organ)))]
      (rectangular organ sheet))))

(defn check-factors
  "Baseline var keywords should agree with input factor keywords"
  [organ sheet-prefix]
  (let [sheet1 (keyword (str (name sheet-prefix) "-baseline-vars"))
        sheet2 (keyword (str (name sheet-prefix) "-inputs"))
        b-factors (:factor (c/get-col-maps organ sheet1))
        i-factors (distinct (:factor (c/get-col-maps organ sheet2)))]
    (is (= (into #{} (remove #(or (nil? %) (starts-with? % ":centre")) b-factors))
           (into #{} (remove #(or (nil? %) (starts-with? % ":centre")) i-factors)))
        [:check-factors organ sheet-prefix])))

(deftest check-organ-factors
  (testing "apart from :centre, factors in baseline-vars should agree with those in inputs"
    (doseq [organ organs
            tool (c/get-tools organ)]
      (check-factors organ tool))))

(defn check-levels-are-named
  [organ sheet row]
  (if (#{":numeric" ":param"} (:type row))
    (is true)
    (is (= (nil? (:level row)) (nil? (:level-name row)))
        [:in organ sheet (:factor row) (:level row)])))

(defn check-widget-labels
  [organ sheet-prefix]
  (let [sheet (keyword (str (name sheet-prefix) "-inputs"))
        rows (c/get-row-maps organ sheet)]
    (mapv (partial check-levels-are-named organ sheet) rows)))


(deftest widgets-have-a-level-name
  (testing "All widget types have a Label"
    (doseq [organ organs
            tool (c/get-tools organ)]
      (check-widget-labels organ tool))))

(defn is-sheet-complete
  "Given a sheet, ensure that there are no 'holes', i.e. for each row there are values for each column."
  [organ sheet centre]
  (let [col-data (mapv (comp vec rest) (c/centre-columns organ sheet centre))]
    (is (every? seq col-data) (str "There should be some data in every column in " sheet " for " centre))
    (is (apply = (map count col-data)) (str "Column counts differ in " sheet " for " centre))))

(deftest baseline-cifs-should-not-be-empty
  (testing "kidney baseline-cifs should be consistent"
    (doseq [organ organs
            centre (c/get-centres organ)
            tool (c/get-tools organ)]
      (is-sheet-complete organ (keyword (str (name tool) "-baseline-cifs")) centre))))

(deftest baseline-cifs-should-not-be-empty
  (testing "kidney competing-mortality should be consistent"
    (doseq [organ organs
            centre (c/get-centres organ)
            tool (c/get-tools organ)]
      (is-sheet-complete organ (keyword (str (name tool) "-competing-mortality")) centre))))

(comment
  (c/get-bundle :kidney)
  (c/get-col-maps :kidney :tools)

  (def organ :kidney)
  (def sheet :survival-baseline-cifs)
  )