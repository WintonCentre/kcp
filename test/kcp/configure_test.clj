(ns kcp.configure-test
  (:require [kcp.configure :as c]
            [kcp.config-utils :as utils]
            [clojure.test :as t :refer [deftest is testing]]
            [clojure.string :as string :refer [starts-with?]]
            [clojure.spec.alpha :as s]
            [clojure.set :as st]
            [aero.core :as aero]
            [clojure.java.io :as io]))


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
                                            ::ldsurvival
                                            ::pkm]
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
  [organ tool]
  (let [bundle (get (c/get-bundle organ) tool)
        sheet1 (first (filter #(string/ends-with? (name %) "-baseline-vars") bundle))
        sheet2 (first (filter #(string/ends-with? (name %) "-inputs") bundle))]
    (when (and sheet1 sheet2)
      (let [b-factors (:factor (c/get-col-maps organ sheet1))
            i-factors (distinct (:factor (c/get-col-maps organ sheet2)))]
        (is (= (into #{} (remove #(or (nil? %) (starts-with? % ":centre")) b-factors))
               (into #{} (remove #(or (nil? %) (starts-with? % ":centre")) i-factors)))
            [:check-factors organ tool])))))

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
  [organ tool]
  (let [bundle (get (c/get-bundle organ) tool)
        sheet (first (filter #(string/ends-with? (name %) "-inputs") bundle))]
    (when sheet
      (let [rows (c/get-row-maps organ sheet)]
        (mapv (partial check-levels-are-named organ sheet) rows)))))


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

(deftest baseline-data-should-not-be-empty
  (testing "baseline data should be consistent"
    (doseq [organ organs
            centre (c/get-centres organ)
            tool-key (c/get-tools organ)
            sheet (get (c/get-bundle organ) tool-key)]
      (is-sheet-complete organ sheet centre))))

(deftest tools-match-metadata
  (testing "All tools in config.edn should be defined in metadata_template.edn"
    (let [metadata (aero/read-config (io/resource "metadata_template.edn"))]
      (doseq [organ organs]
        (let [bundle (c/get-bundle organ)
              config-tools (disj (into #{} (keys bundle)) :centres :tools :sheets)
              metadata-tools (into #{} (keys (get-in metadata [organ :tools])))]
          (is (st/subset? config-tools metadata-tools)
              (str "Tools in config.edn bundles for " organ " should be defined in metadata_template.edn. Missing: " (st/difference config-tools metadata-tools))))))))

(comment
  (c/get-bundle :kidney)
  (c/get-col-maps :kidney :tools)

  (def organ :kidney)
  (def sheet :survival-baseline-cifs)
  )