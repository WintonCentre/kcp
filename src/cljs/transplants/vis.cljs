(ns transplants.vis
  (:require ["react-bootstrap" :as bs]
            [transplants.model :as model]
            [transplants.subs :as subs]
            [re-frame.core :as rf]
            [transplants.factors :as fac]
            [transplants.bundles :as bun]
            [transplants.ui :as ui]
            [transplants.rgb :as rgb]
            [clojure.string :refer [replace]]
            [clojure.pprint :refer [pprint]]
            [svg.margin-convention :as convention]
            [svg.scales :refer [->Identity nice-linear i->o o->i in out ticks tick-format-specifier]]
            [svg.space :refer [space]]
            [svg.container :as svgc]
            [cljs-css-modules.macro :refer-macros [defstyle]]))


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


;;;
;; svg styles
;;;
(defstyle styles
  [".inner" {:fill   "none"
             :stroke-opacity 1
             :stroke-width 1
             :stroke "#fa0"}]
  [".outer" {:fill   "none"
             :stroke-opacity 1
             :stroke "#f00"}]

  #_[".transplanted" {:fill "#41af6b"
                    :stroke "#fff"
                    :opacity 0.8
                    :stroke-width 2}]
  #_[".waiting" {:fill "#4866cb"
               :stroke "#fff"
               :opacity 1
               :stroke-width 2}]
  #_[".removed" {:fill "#4b4d48"
               :stroke "#fff"
               :stroke-width 2}]
  #_[".died" {:fill "#000000"
            :stroke "#fff"
            :stroke-width 2}]

  [".transplanted" {:fill "#6eb7b0"
                    :stroke "#fff"
                    :opacity 1
                    :stroke-width 2}]
  [".waiting" {:fill "#3072af"
               :stroke "#fff"
               :opacity 1
               :stroke-width 2}]
  [".removed" {:fill "#4b4d48"
               :stroke "#fff"
               :stroke-width 2}]
  [".died" {:fill "#000000"
            :stroke "#fff"
            :stroke-width 2}]
  

  [".annotation" {:font-size "13pt"}]
  [".arrow" {:stroke       "#000"
             :stroke-width "1.5px"}])

(defn bar-chart*
  [X Y]
  [:g {:key 1}
   [:rect {:key        1
           :class-name (:inner styles)
           :x 0
           :y 0
           :width      1000
           :height     600}]
   [:g {:key 2}
    [:rect {:key        2
            :class-name (:waiting styles)
            :x 300
            :y 0
            :width      100
            :height     600}]]
   (into [:g {:key 3}
          [:rect {:key        1
                  :class-name (:waiting styles)
                  :x 500
                  :y 0
                  :width      100
                  :height     402}]]
         (map-indexed (fn [i m] [:rect (assoc m :key i)])
                      [{:class-name (:transplanted styles)
                        :x 500
                        :y 402
                        :width      100
                        :height     186}
                       {:class-name (:removed styles)
                        :x 500
                        :y 564
                        :width      100
                        :height     24}
                       {:class-name (:died styles)
                        :x 500
                        :y 588
                        :width      100
                        :height     12}]))])
      
(defn bar-chart
  "Draw the bar chart"
  [bundles organ centre tool inputs bundle]
  (let [{:keys [from-year to-year]} @(rf/subscribe [::subs/cohort-dates])
        env [{:organ organ :centre centre :tool tool}
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
        ;baseline-cifs-for-day (map (bun/cif-0 bundle day) outcome-keys)
        ;cifs  (map model/cif baseline-cifs-for-day sum-betas)
        ]
    
    [:> bs/Row {:style {:position "fixed"}}
     [:> bs/Col {:md 8}
      [:h4 {:style {:margin-top 80 }}
       "What might happen after you join the waiting list for a " (name organ) " transplant?"]
      [:p "These are the outcomes we would expect for people who entered the same information as you, based
        on patients who joined the waiting list between " from-year " and " to-year "."]
      [svgc/svg-container {:outer {:width 1060 :height 660}
                           :margin {:top 10 :right 10 :bottom 10 :left 10}
                           :padding {:top 20 :right 20 :bottom 20 :left 20}
                           :inner  nil ;{:width 100 :height 100}
                           :x-title "Hello"
                           :y-title "There"
                           :styles styles}
       bar-chart*
       ]]]))
;;;
;; 
;;;
(defn svg-starter
  "Layout starter for svg plot"
  []
   [convention/margins (space {:outer    {:width 650, :height 550}
                               :margin   {:top 200, :right 30, :bottom 30, :left 0}
                               :padding  {:top 0, :right 120, :bottom 50, :left 120}
                               :y-domain [0 100] :x-title "People", :x-ticks 10
                               :x-domain [0 5] :y-title "Years", :y-ticks 10
                               :data     []})])