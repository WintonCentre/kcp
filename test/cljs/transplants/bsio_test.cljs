(ns transplants.bsio-test
  (:require [cljs.test :refer [deftest testing is]]
            [transplants.bsio :refer [radio-button-group]]))

(deftest radio-button-decorations
  (testing "Radio Button Group should be highlighted if nil"
    (is (= (:border (:style (nth (second (radio-button-group {:value-k :sex
                                                              :value-f (fn [] :male)
                                                              :event-f identity
                                                              :buttons-f (fn [] [{:key :male :value :male :level-name "Male"}
                                                                                 {:key :female :value :female :level-name "Female"}])}))
                                 2)))
           "3px solid #ffffff") "expect white border")

    ; no border when there isn't
    (is (= (:border (:style (nth (second (radio-button-group {:value-k :sex
                                                              :value-f (fn [] nil)
                                                              :event-f identity
                                                              :buttons-f (fn [] [{:key :male :value :male :level-name "Male"}
                                                                                 {:key :female :value :female :level-name "Female"}])}))
                                 2)))
           "3px solid #ff8888") "expect pink border")))