(ns transplants.configure-test
  (:require  [transplants.configure :as c]
             [transplants.utils :as utils]
             [transplants.config :as cfg]
             [clojure.test :as t :refer [deftest is testing]]))

(deftest success
  (is (= 1 1)))

(deftest utils
  (testing "utilities"
    (is (= (utils/maybe-key ":a") :a))
    (is (= (utils/maybe-key "A") "A"))
    (is (= (utils/maybe-key 1) 1))
    (is (= (utils/transpose [[1 2 3] [4 5 6]]) [[1 4] [2 5] [3 6]] ))))

(deftest config-file
  (testing "config-edn makes sense"
    (is (= (cfg/get-sheet-spec :kidney :waiting-inputs) {:beta-transplant {:column :E, :match "transplant"}, :beta-death {:column :G, :match "death"}, :info-box? {:column :K, :match "info"}, :beta-removal {:column :F, :match "remov"}, :beta-all-reasons {:column :H, :match "all"}, :type {:column :I, :match "type"}, :sub-text {:column :J, :match "sub"}, :level {:column :D, :match "level"}, :button-labels {:column :B, :match "(level)|(button)"}, :factor {:column :C, :match "factor"}, :label {:column :A, :match "(Factor)|(label)"}}))
    (is (= (cfg/get-columns :kidney :waiting-inputs) '(:label :button-labels :factor :level :beta-transplant :beta-removal :beta-death :beta-all-reasons :type :sub-text :info-box?)))
    (is (= (cfg/get-variable-keys :kidney :waiting-inputs) '(:label :button-labels :factor :level :beta-transplant :beta-removal :beta-death :beta-all-reasons :type :sub-text :info-box?)) )
    (is (= (cfg/get-column-selection :kidney :waiting-inputs) {:I :type, :A :label, :F :beta-removal, :D :level, :B :button-labels, :J :sub-text, :C :factor, :E :beta-transplant, :G :beta-death, :H :beta-all-reasons, :K :info-box?}))
    ))

(deftest bundles
  (testing "bundles exist in config"
    (is (= (cfg/get-bundles :kidney :graft) [:graft-baseline-cifs :graft-baseline-vars :graft-inputs :bmi-calculator]))))


(defn rectangular [organ sheet]
  (let [variables (c/get-variables :kidney :waiting-baseline-cifs)
        lengths (map count (vals variables))]
    (is (= (count (distinct lengths)) 1))
    (is (pos? (first (distinct lengths))))))

;--- KIDNEY
(deftest kidney-data-frames
  (testing "kidney data-frames are rectangular and not empty"
    (rectangular :kidney :waiting-baseline-cifs)
    (rectangular :kidney :waiting-baseline-vars)
    (rectangular :kidney :waiting-inputs)
    (rectangular :kidney :graft-baseline-cifs)
    (rectangular :kidney :graft-baseline-vars)
    (rectangular :kidney :graft-inputs)
    (rectangular :kidney :survival-baseline-cifs)
    (rectangular :kidney :survival-baseline-vars)
    (rectangular :kidney :survival-inputs)
    (rectangular :kidney :bmi-calculator)
    ))

(def kidney-variables (partial cfg/get-variable-keys :kidney))

(defn configured-headers
  "Runs a configuration check on a spreadsheet, ensuring that actual headers
  match configured headers. Note that we are currently looking for exact matches. 
  
  We could use a re match instead if we wanted to
  be less fussy. This would be the place to implement re matching."
  [organ sheet]
  (is (= (cfg/get-variable-keys organ sheet) 
         (c/get-header organ sheet)) sheet))

(deftest kidney-variables-check
  (testing "configured variables are spreadsheet headers"
    (configured-headers :kidney :waiting-baseline-cifs)
    (configured-headers :kidney :waiting-baseline-vars)
    (configured-headers :kidney :waiting-inputs)
    (configured-headers :kidney :graft-baseline-cifs)
    (configured-headers :kidney :graft-baseline-vars)
    (configured-headers :kidney :graft-inputs)
    (configured-headers :kidney :survival-baseline-cifs) 
    (configured-headers :kidney :survival-baseline-vars)
    (configured-headers :kidney :survival-inputs)))

(defn check-factors
  [organ sheet-prefix] 
  (let [sheet1 (keyword (str (name sheet-prefix) "-baseline-vars"))
        sheet2 (keyword (str (name sheet-prefix) "-inputs"))
        b-factors (:baseline-factor  (c/get-variables organ sheet1))
        i-factors (distinct (:factor (c/get-variables organ sheet2)))]
    (is (=  (into #{} (remove nil? b-factors)) 
            (into #{} (remove nil? i-factors)))
        [:check-factors organ sheet-prefix])))

(deftest check-kidney-factors
  (testing "apart from :centre, factors in baseline-vars should agree with those in inputs"
    (check-factors :kidney :waiting)
    (check-factors :kidney :graft)
    (check-factors :kidney :survival)))


(defn check-type-label
  [organ sheet row]
  (is (= (nil? (:type row)) (nil? (:label row)))
      [:in organ sheet (:factor row) (:level row)]))

(defn check-widget-labels
  [organ sheet-prefix]
  (let [sheet (keyword (str (name sheet-prefix) "-inputs"))
        rows (c/get-row-maps organ sheet)]
    (mapv (partial check-type-label organ sheet) rows)))

(deftest kidney-widgets-have-a-label
  (testing "All kidney widget types have a Label"
    (check-widget-labels :kidney :waiting)
    (check-widget-labels :kidney :graft)
    (check-widget-labels :kidney :survival)))

;---- LUNG

(deftest lung-data-frames
  (testing "lung data-frames are rectangular and not empty"
    (rectangular :lung :waiting-baseline-cifs)
    (rectangular :lung :waiting-baseline-vars)
    (rectangular :lung :waiting-inputs)
    (rectangular :lung :post-transplant-baseline-cifs)
    (rectangular :lung :post-transplant-baseline-vars)
    (rectangular :lung :post-transplant-inputs)
    (rectangular :lung :from-listing-baseline-cifs)
    (rectangular :lung :from-listing-baseline-vars)
    (rectangular :lung :from-listing-inputs)
    (rectangular :lung :numerics)))

(lung-data-frames)

(def lung-headers (partial cfg/get-variable-keys :lung))

(deftest lung-variables-check
  (testing "lung headers"
    (configured-headers :lung :waiting-baseline-cifs)
    (configured-headers :lung :waiting-baseline-vars)
    (configured-headers :lung :waiting-inputs)
    (configured-headers :lung :numerics)
    (configured-headers :lung :post-transplant-baseline-cifs)
    (configured-headers :lung :post-transplant-baseline-vars)
    (configured-headers :lung :post-transplant-inputs)
    (configured-headers :lung :from-listing-baseline-cifs)
    (configured-headers :lung :from-listing-baseline-vars)
    (configured-headers :lung :from-listing-inputs)))

(deftest check-lung-factors
  (testing "apart from :centre, lung factors in baseline-vars should agree with those in inputs"
    (check-factors :lung :waiting)
    (check-factors :lung :post-transplant)
    (check-factors :lung :from-listing)))

(deftest lung-widgets-have-a-label
  (testing "All lung widget types have a Label"
    (check-widget-labels :lung :waiting)
    (check-widget-labels :lung :post-transplant)
    (check-widget-labels :lung :from-listing)))
