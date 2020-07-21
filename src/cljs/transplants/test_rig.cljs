(ns transplants.test-rig
  (:require ["react-bootstrap" :as bs]
            [transplants.model :as model]
            [re-frame.core :as rf]
            [transplants.subs :as subs]
            [transplants.events :as events]
            [transplants.factors :as fac]
            [transplants.bundles :as bun]
            [transplants.ui :as ui]
            [transplants.rgb :as rgb]
            [transplants.model :as model]
            [clojure.string :refer [replace]]
            [clojure.pprint :refer [pprint]]))


(defn outcome-tr
  "Render an outcomes row header"
  [k outcomes]
  [:tr {:key k :style {:background-color rgb/secondary :color "#fff"}}
   [:th]
   (map-indexed (fn [k b] [:th {:key k} (replace b #"-reasons" "")]) outcomes)])

(defn test-rig
  [{:keys [organ centre tool day inputs bundle]}]
  (let [env [{:organ organ :centre centre :tool tool}
             bundle
             {organ inputs}]
        [master-fmaps baseline-cifs baseline-vars] ((juxt
                                                     :-inputs :-baseline-cifs :-baseline-vars)
                                                    bundle)
        factors (keys master-fmaps)
        outcomes (model/with-all-reasons-first
                   (fac/get-outcomes (first (vals master-fmaps))))
        beta-keys (fac/prefix-outcomes-keys outcomes "beta")
        outcome-keys (fac/prefix-outcomes-keys outcomes "cif")
        sum-betas (map #(fac/sum-beta-xs env %) beta-keys)
        baseline-cifs-for-day (map (bun/cif-0 bundle day) outcome-keys)
        ;;
        ;; The following code assumes we have the "all-reasons" outcome in a well known slot
        ;; in the outcomes vector (currently first). 
        ;;
        cifs  (map model/cif baseline-cifs-for-day sum-betas)]

    [:> bs/Container
     [:> bs/Row
      (when factors
        [:> bs/Col
         [ui/test-day-selector 10]
         [:> bs/Row
          [:> bs/Col
           [:> bs/Table {:striped true
                         :bordered true
                         :hover true}
            [:thead [outcome-tr 1005 outcomes]]
            (into [:tbody

                           ; Scaled cifs
                   [:tr {:key 1000}
                    [:td [:b "Scaled CIF"]]
                    (map-indexed
                     (fn [i cif]
                       [:td {:key i} (model/to-precision cif 4)])
                     (apply model/scaled-cifs cifs))]

                           ; Individualised raw cifs
                   [:tr {:key 1001}
                    [:td [:b "Unscaled CIF"]]
                    (map-indexed
                     (fn [i cif]
                       [:td {:key i} (model/to-precision cif 4)])
                     cifs)]

                           ; Show Baseline CIFS for selected day
                   [:tr {:key 1002}
                    [:td [:b "CIF" [:sub "0"]]]
                    (map-indexed
                     (fn [i cif-0-day]
                       [:td {:key i} (model/to-precision cif-0-day 4)])
                     baseline-cifs-for-day)]

                           ; Show sum-beta-xs for selected inputs
                   [:tr {:key 1003}
                    [:td [:b {:style {:font-size 20}} "𝜮 𝛽" [:sub [:i "𝒌"]] "𝓍" [:sub [:i "𝒌"]]]]
                    (map-indexed
                     (fn [i sb]
                       [:td {:key i} (model/to-precision sb 4)])
                     sum-betas)]

                   [:tr {:key 1004 :style {:background-color rgb/secondary :color "#fff"}}
                    [:th "Factor" [:sub [:i "𝒌"]]]
                    [:th {:col-span (str (count outcomes))}
                     [:b {:style {:font-size 20}} "𝛽" [:sub [:i "𝒌"]] "𝓍" [:sub [:i "𝒌"]]]
                     #_[:i "Beta * x"]]]

                   (outcome-tr 1006 outcomes)
                   (conj
                    (map-indexed
                     (fn [i [factor fmap]]
                              ; Show individual beta-x contribution
                       [:tr {:key i}
                        [:td {:key i} factor]
                        (when fmap
                          (map-indexed
                           (fn [j b]
                             [:td {:key j} (model/to-precision (last (fac/selected-beta-x env factor fmap b)) 4)])
                           beta-keys))])
                     master-fmaps))])]]]])]]))
