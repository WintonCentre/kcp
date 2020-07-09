(ns transplants.results
  (:require ["react-bootstrap" :as bs] 
            [transplants.model :as model]
            [re-frame.core :as rf]
            [transplants.subs :as subs]
            [transplants.events :as events]
            [transplants.factors :as fac]
            [clojure.pprint :refer [pprint]]))


(comment
  ; There is a bundle for each organ, centre, tool context that has ever
  ; been loaded in the UI. If a bundle has never been loaded it will return
  ; a nil cif-0.
  (def bundles @(rf/subscribe [::subs/bundles]))

  ; Note that we only have values at days 0, 5, 25, ..., 99 for Belfast
  (model/cif-0 (get-in bundles [:kidney :belf :waiting]) 0)
  (model/cif-0 (get-in bundles [:kidney :belf :waiting]) 5)
  (model/cif-0 (get-in bundles [:kidney :belf :waiting]) 10)
  (model/cif-0 (get-in bundles [:kidney :belf :waiting]) 24)
  (model/cif-0 (get-in bundles [:kidney :belf :waiting]) 25)
  (model/cif-0 (get-in bundles [:kidney :belf :waiting]) 100)

  (model/cif-0 (get-in bundles [:kidney :bris :waiting]) 100))

(defn day-selector
  "A test-only widget to select a test day at a given sampling period.
   "
  [period]
  [:> bs/Row {:style {:margin-bottom 10 :align-items "center"}}
   [:> bs/Col  {:md "auto"} "for test day: "]
   [:> bs/Col  {:md "auto"} @(rf/subscribe [::subs/test-day])]
   [:> bs/Col  {:md "auto"} [:> bs/Button {:variant :outline-secondary
                                           :style {:flex "1"}
                                           :on-click #(rf/dispatch [::events/inc-test-day (- period)])} 
                             (str "- " period)]]
   [:> bs/Col  {:md "auto"} [:> bs/Button {:variant :outline-secondary
                                           :style {:flex "1"}
                                           :on-click #(rf/dispatch [::events/inc-test-day period])} 
                             (str "+ " period)]]])

(defn results-panel
  "Display results"
  [bundles organ centre tool]
  (let [inputs (get @(rf/subscribe [::subs/inputs]) organ)
        bundles @(rf/subscribe [::subs/bundles])
        bundle (get-in bundles [organ centre tool])
        [master-fmaps baseline-cifs baseline-vars] ((juxt
                                                     :-inputs :-baseline-cifs :-baseline-vars)
                                                    bundle)
        factors (keys master-fmaps)
        selected-level-maps (fac/selected-level-maps master-fmaps inputs)
        [beta-keys outcome-keys] (fac/get-beta-keys (first (vals master-fmaps)))]
    [:> bs/Container
     [:> bs/Row
      (when factors
        [:> bs/Col
         [day-selector 10]
         [:> bs/Row
          [:> bs/Col
           [:> bs/Table {:striped true
                         :bordered true
                         :hover true}
            [:thead
             [:tr
              [:th "Factor"]
              [:th "Level"]
              [:th "Beta(s)"]]]
            (into [:tbody]
                  (conj
                   (mapv
                    (fn [fmap]
                      [:tr ;{:key (:factor fmap)}
                       [:td {:key 1} (:factor fmap)]
                       [:td {:key  2} (if fmap (:level fmap) "-")]
                       [:td {:key 3} (if fmap (pr-str (select-keys fmap beta-keys)) "-")]])
                    selected-level-maps)
                   [:tr {:key :beta-transplant}
                    [:td {:key 1} "Sum betas"]
                    [:td {:key 2} "transplant"]
                    [:td {:key 3} (apply + (map :beta-transplant selected-level-maps))]]
                   [:tr {:key :beta-removal}
                    [:td {:key 1} "Sum betas"]
                    [:td {:key 2} "removal"]
                    [:td {:key 3} (apply + (map :beta-removal selected-level-maps))]]
                   [:tr {:key :beta-death}
                    [:td {:key 1} "Sum betas"]
                    [:td {:key 2} "death"]
                    [:td {:key 3} (apply + (map :beta-death selected-level-maps))]]
                   [:tr {:key :beta-all-reasons}
                    [:td {:key 1} "Sum betas"]
                    [:td {:key 2} "all reasons"]
                    [:td {:key 3} (apply + (map :beta-all-reasons selected-level-maps))]]))]]]])]]))

(comment
  (def fmaps (repeat 2 {:a 1 :b 2 :c 3}))
  )