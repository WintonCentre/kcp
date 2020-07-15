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

(defn to-precision
  "js number to sig figs"
  [d sigs]
  (.toPrecision (js/Number. d) sigs))

(defn to-fixed
  "Wrap javascript toFixed"
  [d dps]
  (.toFixed (js/Number. d) dps))

(defn to-percent
  "Convert a decimal number to a fixed point string percentage"
  ([d] (to-percent d 0))
  ([d dps]
   (to-fixed (* d 100) dps)
   #_(.toFixed (js/Number. (* d 100)) dps)))

(comment
  (.toFixed (js/Number. 1) 0)
  (to-percent 0.066) ; => "7"
  (to-percent 0.01) ; => "1"
  (to-precision 123.456789 6)
  "123.457"
  )

(defn calculate-outcome
  "Show the outcome for given day"
  [{:keys [day outcome-key master-fmaps baseline-cifs baseline-vars inputs] :as params}]
  [:div
   "cif-" outcome-key " " (to-percent (model/calculate params)) "%"
   ])

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
        outcomes (fac/get-outcomes (first (vals master-fmaps)))
        beta-keys (fac/prefix-outcomes-keys outcomes "beta")
        env [{:organ organ :centre centre :tool tool}
             bundle
             {organ inputs}]
        sum-betas (into {} (map (fn [b] [b (fac/sum-beta-xs env b)]) beta-keys))
        ]
    [:> bs/Container
     [:> bs/Row
      (when factors
        [:> bs/Col
         [day-selector 10]
         #_(into [:<>]
               (map (fn [outcome]
                      [:p outcome]
                      [calculate-outcome {:day @(rf/subscribe [::subs/test-day])
                                          :outcome-key outcome
                                          }])
                    outcomes
                    ))
         [:> bs/Row
          [:> bs/Col
           [:> bs/Table {:striped true
                         :bordered true
                         :hover true}
                    [:thead
                     [:tr
                      [:th "Factor"]
                      [:th {:col-span (str (count outcomes))}
                       [:i "Beta * x"] " Contribution"]]
                     [:tr 
                      [:th]
                      (map-indexed (fn [k b] [:th {:key k} b]) outcomes)]]
                    (into [:tbody
                           [:tr {:key 1000 :style {:background-color "#666" :color "#fff"}}
                            [:td [:b "Sums"]]
                            (map-indexed
                             (fn [i b]
                               [:td {:key i} (str (to-precision (sum-betas b) 4))])
                             beta-keys)]]
                          (conj
                           (map-indexed
                            (fn [i [factor fmap]]
                              [:tr
                               [:td {:key i} factor]
                               (when fmap
                                 (map-indexed
                                  (fn [j b]
                                    [:td {:key j} (to-precision (last (fac/selected-beta-x env factor fmap b)) 4)])
                                  beta-keys))])
                            master-fmaps)
                           ))]]]])]]))