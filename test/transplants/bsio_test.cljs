(ns transplants.bsio-test
  (:require [cljs.test :refer [deftest testing is]]
            [clojure.string :as s]
            [transplants.bsio :refer [radio-button-group]]))

(deftest radio-button-decorations
  (testing "Radio Button Group should be highlighted if nil"
    (is (= (:border (:style (nth (second (radio-button-group {:value-k :sex
                                                              :value-f (fn [] :male)
                                                              :event-f identity
                                                              :buttons-f (fn [] [{:key :male :value :male :level-name "Male"}
                                                                                 {:key :female :value :female :level-name "Female"}])}))
                                 2)))
           "3px solid #CCCCCC") "expect white border")

    ; no border when there isn't
    (let [[_ _ border-color] (clojure.string/split (:border (:style (nth (second (radio-button-group {:value-k :sex
                                                                                                :value-f (fn [] nil)
                                                                                                :event-f identity
                                                                                                :buttons-f (fn [] [{:key :male :value :male :level-name "Male"}
                                                                                                                   {:key :female :value :female :level-name "Female"}])}))
                                                                   2)))
                                             #"\s+")]
      (is (not= border-color "#CCCCCC") "expect highlighted border"))))