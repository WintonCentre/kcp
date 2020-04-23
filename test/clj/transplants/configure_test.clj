(ns transplants.configure-test
  (:require  [transplants.configure :as c]
             [clojure.test :as t :refer [deftest is testing]]))

(deftest success
  (is (= 1 1)))

(deftest utils
  (testing "utilities"
    (is (= (c/maybe-key ":a") :a))
    (is (= (c/maybe-key "A") "A"))
    (is (= (c/maybe-key 1) 1))
    (is (= (c/transpose [[1 2 3] [4 5 6]]) [[1 4] [2 5] [3 6]] ))))

(deftest config-file
  (testing "config-edn makes sense"
    (is (= (c/get-sheet-spec :kidney :waiting-inputs) {:beta-transplant {:column :E, :match "transplant"}, :beta-death {:column :G, :match "death"}, :info-box? {:column :K, :match "info"}, :beta-removal {:column :F, :match "remov"}, :beta-all-reasons {:column :H, :match "all"}, :type {:column :I, :match "type"}, :sub-text {:column :J, :match "sub"}, :level {:column :D, :match "level"}, :button-labels {:column :B, :match "(level)|(button)"}, :factor {:column :C, :match "factor"}, :label {:column :A, :match "(Factor)|(label)"}}))
    (is (= (c/get-columns :kidney :waiting-inputs) '(:label :button-labels :factor :level :beta-transplant :beta-removal :beta-death :beta-all-reasons :type :sub-text :info-box?)))
    (is (= (c/get-variable-keys :kidney :waiting-inputs) '(:label :button-labels :factor :level :beta-transplant :beta-removal :beta-death :beta-all-reasons :type :sub-text :info-box?)) )
    (is (= (c/get-column-selection :kidney :waiting-inputs) {:I :type, :A :label, :F :beta-removal, :D :level, :B :button-labels, :J :sub-text, :C :factor, :E :beta-transplant, :G :beta-death, :H :beta-all-reasons, :K :info-box?}))
    ))

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

(def kidney-variables (partial c/get-variable-keys :kidney))

(defn configured-headers
  [organ sheet]
  (is (= (c/get-variable-keys organ sheet) (c/get-header organ sheet)) sheet))

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

(def lung-headers (partial c/get-variable-keys :lung))

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

