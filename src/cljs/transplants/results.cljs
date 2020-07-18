(ns transplants.results
  (:require ["react-bootstrap" :as bs] 
            [transplants.model :as model]
            [re-frame.core :as rf]
            [transplants.subs :as subs]
            [transplants.events :as events]
            [transplants.factors :as fac]
            [clojure.pprint :refer [pprint]]))


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


(defn cif-0
  "Samples a bundle's baseline-cifs for the required day. 
   If there is no baseline-cif entry for that day, the last baseline-cif
   which occurs before the target day is returned.
   
   Returns the whole map for the selected day which will contain baseline-cifs
   under keys prefixed with :cif-.
"
  [bundle day]
  (->> bundle
       (:-baseline-cifs)
       (filter #(<= (:days %) day))
       (last)))

(comment
  (def bundles @(rf/subscribe [::subs/bundles]))
  (def bundle (get-in bundles [:lung :birm :waiting]))
  (def day 100)
  (:-baseline-cifs bundle)
  (def baseline-cifs-for-day (cif-0 bundle day))
  (def outcome-keys [:cif-transplant :cif-death :cif-removal :cif-all-reasons])
  (cif-0 bundle day)
  ; => {:centre "Birmingham", :days 97, :cif-transplant 0.1421165101, :cif-removal 0.0111618086, :cif-death 0.084056709, :cif-all-reasons 0.4479003938}
  ;
  ; Note that :cif-all-reasons is the 'well-known' (i.e. hard-coded keyword which selecys the cif used to scale the sum of the other 3.)
  )

(defn scaled-cifs
  "Scale a seq of cifs so the rest sum to the first - which should be the cif for
   leaving the list for all reasons.
   Return the cifs in the original order including the all-reasons cif.
   If there is only one cif, there is no need to scale, so just return the seq"
  [all & the-rest]
  ;all
  ;the-rest
  (if (seq the-rest)
    (let [scale (/ all (apply + the-rest))]
      (conj (map #(* % scale) the-rest) all))
    [all]))

(comment
  (apply scaled-cifs  [2 3 4 3])
  )

(defn cif
  "Calculates the cif(t) from a baseline cif-0(t), and the sum of the x_i.beta_i"
  [cif-0 sum-x-betas]
  #_(println "cif-0 " cif-0
           " sum-x-beta " sum-x-betas)
  (- 1 (js/Math.pow (- 1 cif-0) (js/Math.exp sum-x-betas))))

(defn calculate-cifs
  "Show the outcomes for given day"
  [{:keys [day outcome-key] :as params}]
  [:div
   "cif-" outcome-key   ])

(defn with-all-reasons-last
  "Outcomes with the all reasons outcome in the first slot."
  [outcomes]
  (if (> (count outcomes) 1)
    (let [all-reasons "all-reasons"]
      (conj (remove #(= % all-reasons) outcomes) all-reasons))
    outcomes))

(defn results-panel
  "Display results"
  [bundles organ centre tool]
  (let [day @(rf/subscribe [::subs/test-day])
        inputs (get @(rf/subscribe [::subs/inputs]) organ)
        bundles @(rf/subscribe [::subs/bundles])
        bundle (get-in bundles [organ centre tool])
        env [{:organ organ :centre centre :tool tool}
             bundle
             {organ inputs}]
        [master-fmaps baseline-cifs baseline-vars] ((juxt
                                                     :-inputs :-baseline-cifs :-baseline-vars)
                                                    bundle)
        factors (keys master-fmaps)
        selected-level-maps (fac/selected-level-maps master-fmaps inputs)
        outcomes (with-all-reasons-last 
                   (fac/get-outcomes (first (vals master-fmaps))))
        beta-keys (fac/prefix-outcomes-keys outcomes "beta")
        outcome-keys (fac/prefix-outcomes-keys outcomes "cif")
        all-reasons-key :cif-all-reasons
        cif-outcomes (remove #(= all-reasons-key %) outcome-keys)
        sum-betas (map #(fac/sum-beta-xs env %) beta-keys)
        baseline-cifs-for-day (map (cif-0 bundle day) outcome-keys)
        
        ;;
        ;; todo: generalise following lines. 
        ;; We need to treat all-reasons separately without
        ;; appealing to its last position.
        ;;
        cifs  (map cif baseline-cifs-for-day sum-betas)
        #_#_scaled-cifs (if (> (count outcome-keys) 1)
                      (scaled-cifs cifs)
                      baseline-cifs-for-day)
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
                      [:th]
                      (map-indexed (fn [k b] [:th {:key k} b]) outcomes)]]
                    (into [:tbody

                           ; Scaled cifs
                           [:tr {:key 1000 :style {:background-color "#666" :color "#fff"}}
                            [:td [:b "Scaled CIF"]]
                            (map-indexed
                             (fn [i cif]
                               [:td {:key i} (to-precision cif 4)])
                             (apply scaled-cifs cifs))]

                           ; Individualised raw cifs
                           [:tr {:key 1001 :style {:background-color "#666" :color "#fff"}}
                            [:td [:b "Unscaled CIF"]]
                            (map-indexed
                             (fn [i cif]
                               [:td {:key i} (to-precision cif 4)])
                             cifs)]

                           ; Show Baseline CIFS for selected day
                           [:tr {:key 1002 :style {:background-color "#666" :color "#fff"}}
                            [:td [:b "CIF_0"]]
                            (map-indexed
                             (fn [i cif-0-day]
                               [:td {:key i} (to-precision cif-0-day 4)])
                             baseline-cifs-for-day)]

                           ; Show sum-beta-xs for selected inputs
                           [:tr {:key 1003 :style {:background-color "#666" :color "#fff"}}
                            [:td [:b "Sums"]]
                            (map-indexed
                             (fn [i sb]
                               [:td {:key i} (to-precision sb 4)])
                             sum-betas)]

                           [:tr
                            [:th "Factor"]
                            [:th {:col-span (str (count outcomes))}
                             [:i "Beta * x"] " Contribution (independent of day)"]]]
                          (conj
                           (map-indexed
                            (fn [i [factor fmap]]
                              ; Show individual beta-x contribution
                              [:tr
                               [:td {:key i} factor]
                               (when fmap
                                 (map-indexed
                                  (fn [j b]
                                    [:td {:key j} (to-precision (last (fac/selected-beta-x env factor fmap b)) 4)])
                                  beta-keys))])
                            master-fmaps)))]]]])]]))