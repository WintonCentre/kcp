(ns transplants.vis
  (:require ["react-bootstrap" :as bs]
            [transplants.model :as model]
            [transplants.subs :as subs]
            [re-frame.core :as rf]
            [transplants.factors :as fac]
            [transplants.bundles :as bun]
            [transplants.ui :as ui]
            [transplants.utils :as utils]
            [transplants.rgb :as rgb]
            [clojure.string :refer [replace]]
            #_[clojure.pprint :refer [pprint]]
            [svg.margin-convention :as convention]
            #_[svg.scales :refer [->Identity nice-linear i->o o->i in out ticks tick-format-specifier]]
            [svg.space :refer [space]]
            [svg.container :as svgc]
            [cljs-css-modules.macro :refer-macros [defstyle]]))

(defn short-outcomes
  "Shorter outcome names. Used in ... ; todo"
  [outcomes]
  (map (fn [v] (replace v #"-reasons" "")) outcomes)
  )

(defn outcome-tr
  "Render an outcomes row header"
  [k outcomes]
  ;(println ::outcomes (short-outcomes outcomes))
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
                   (fac/get-outcomes* (first baseline-cifs)))
        #_(model/with-all-reasons-first
                   (fac/get-outcomes (first (vals master-fmaps))))
        beta-keys (fac/prefix-outcomes-keys outcomes "beta")
        outcome-keys (fac/prefix-outcomes-keys outcomes "cif")
        sum-betas (map #(fac/sum-beta-xs env %) beta-keys)
        baseline-cifs-for-day (map (bun/cif-0 bundle day) outcome-keys)
        ;;
        ;; The following code assumes we have the "all-reasons" outcome in a well known slot
        ;; in the outcomes vector (currently first). 
        ;;
        cifs  (map (partial model/cif tool) baseline-cifs-for-day sum-betas)]

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
                    (map
                     (fn [outcome cif]
                       [:td {:key outcome :id outcome} (model/to-precision cif 4)])
                     (short-outcomes outcomes) cifs)] 
                   
                   #_[:tr {:key 1001}
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
(defn bar-style
  [styles]
  (let [{:keys [fill stroke opacity stroke-width]
         :or {fill "#41af6b"
              stroke "#fff"
              stroke-width 1
              opacity 0.7
              }
         }styles]
    {:fill fill :stroke stroke :stroke-width stroke-width :opacity opacity}))


(defstyle styles
  [".inner" {:fill   "none"
             :stroke-opacity 1
             :stroke-width 0
             :stroke "#fa0"}]
  [".outer" {:fill   "none"
             :stroke-opacity 1
             :stroke "#ccc"}]

  [".transplant" (bar-style {:fill "#41af6b"})]
  [".all-reasons" (bar-style {:fill "#4866cb"})]
  [".removal" (bar-style {:fill "#4b4d48"})]
  [".death" (bar-style {:fill "#000000"})]
  [".post-transplant" (bar-style {:fill "#008888"})]
  [".from-listing" (bar-style {:fill "#4444AA"})]
  [".survival" (bar-style {:fill "#664488"})]
  [".graft" (bar-style {:fill "#00AA44"})]



  [".annotation" {:font-size "13pt"}]
  [".arrow" {:stroke       "#000"
             :stroke-width "1.5px"}])

(defn bar-chart-graphic
  [x y X Y cifs-by-year sample-days outcomes]
  [:g {:key 1}
   [:rect {:key        1
           :class-name (:inner styles)
           :x 0
           :y 0
           :width      1000
           :height     600}]
  ; draw legend
   (into [:g {:key 2}]
         (map (fn [j {:keys [cifs cum-cifs]}]
                (into [:g {:key j}]
                      (map (fn [i cif cum-cif outcome]
                             (let [x0 (- (X (+ (* 2.4 j) 0)) (X 2.1))
                                   w 100
                                   x-mid (+ x0 (/ w 2) (- (X 0.2)))
                                   y0 (if (> (count outcomes) 1)
                                        (- (Y cum-cif) (Y cif)) (Y cif))
                                   h (if (> (count outcomes) 1)
                                       (- (Y cum-cif) (Y (- cum-cif cif)))
                                       (- (Y 0) (Y cif)))
                                   y-mid (+ y0 (/ h 2))]
                             ;(println i ":" cif " " cum-cif " " (count sample-days) (Y 0) (Y cif) (Y 1))
                               ;(println i cif x0 y0 w h)
                               (when (not (js/isNaN y0))
                                 [:g
                                  [:rect {:key i
                                          :x x0
                                          :y y0
                                          :width w
                                          :height h
                                          :data-title cif
                                          :class-name ((keyword outcome) styles)}]])))
                           (range 4)
                           cifs
                           cum-cifs
                           outcomes)))
              (range 1 (inc (count sample-days)))
              cifs-by-year))

   ; draw stacked bars with on-bar labels
   (into [:g {:key 3}]
         (map (fn [j {:keys [cifs cum-cifs]}]
                ;draw single bar and label
                (let [x0 (- (X (+ (* 2.4 j) 0)) 150)
                      w 100
                      x-mid (+ x0 (/ w 2) -10)]
                  (into [:g {:key j}]
                        (conj
                         (map (fn [i cif cum-cif outcome]
                                (let [x0 (- (X (+ (* 2.4 j) 0)) 150)
                                      w 100
                                      x-mid (+ x0 (/ w 2) -10)
                                      y0 (if (> (count outcomes) 1)
                                           (- (Y cum-cif) (Y cif)) (Y cif))
                                      h (if (> (count outcomes) 1)
                                          (- (Y cum-cif) (Y (- cum-cif cif)))
                                          (- (Y 0) (Y cif)))
                                      y-mid (+ y0 (/ h 2))]
                             ;(println i ":" cif " " cum-cif " " (count sample-days) (Y 0) (Y cif) (Y 1))
                                  
                                  (when (> cif 0.005)
                                    [:g
                                     {:transform (str "translate("
                                                      (if (and (> i 1) (< cif 0.07))
                                                        (if (odd? i) 20 -60)
                                                        (if (< cif 1) -20 -30))
                                                      " 10)")}
                                     [:rect {:x (- x-mid 5)
                                             :width (if (>= cif 1)
                                                      90
                                                      (if (< cif 0.10) 50 70))
                                             :y (- y-mid 30)
                                             :height 40
                                             :rx 10
                                             :style {:border "0px"}
                                             :class-name ((keyword outcome) styles)}]
                                     [:text {:x x-mid :y y-mid :fill "#fff" :font-size 30}
                                      (str (model/to-percent cif) "%")]])))
                              (range)
                              cifs
                              cum-cifs
                              outcomes)
                         [:<>
                          [:text {:x (- x-mid 35) :y 650 :font-size 30}  (if (= j 1) "Day 1" (str "Year " (dec j)))]
                          #_[:text {:x (- x-mid 2) :y 690 :font-size 30}  (if (= j 1) "" (dec j))]]))))
              (range 1 (inc (count sample-days)))
              cifs-by-year))])
      
(def relabel
  {"all-reasons" "Waiting"
   "transplant" "Transplanted"
   "removal" "Removed"
   "death" "Died"
   "survival" "Survived"
   "post-transplant" "Survived"
   "from-listing" "Survived"
   "graft" "Graft intact"})

(defn bar-chart
  "Draw the bar chart"
  [bundles organ centre tool inputs bundle]
  (let [{:keys [from-year to-year]} @(rf/subscribe [::subs/cohort-dates])
        env [{:organ organ :centre centre :tool tool}
             bundle
             {organ inputs}]
        baseline-cifs (:-baseline-cifs bundle) 
        outcomes (model/with-all-reasons-first
                   (fac/get-outcomes* (first baseline-cifs)))
        beta-keys (fac/prefix-outcomes-keys outcomes "beta")
        outcome-keys (fac/prefix-outcomes-keys outcomes "cif")

        sum-betas (map #(fac/sum-beta-xs env %) beta-keys)
        sample-days (map
                     utils/year->day
                     (range (inc (utils/day->year (:days (last baseline-cifs))))))
        cifs-by-year (map
                      (fn [day]
                        (let [cifs (-> (vec (apply model/scaled-cifs (map (partial model/cif tool)
                                                                          (map (bun/cif-0 bundle day) outcome-keys)
                                                                          sum-betas)))
                                       (update 0 (if (>(count outcomes) 1)
                                                   #(- 1 %)
                                                   identity))) ]
                          {:cifs cifs 
                           :cum-cifs (reductions + cifs)}))
                      sample-days)]
    
    [:> bs/Row 
     [:> bs/Col
      (case tool

        :waiting
        [:<>
         [:h4 {:style {:margin-top 80}}
          "What might happen after I join the waiting list for a " (name organ) " transplant?"]
         [:p "These are the outcomes we would expect for people who entered the same information as you, based
        on patients who joined the waiting list between " from-year " and " to-year "."]]

        :post-transplant
        [:<>
         [:h4 {:style {:margin-top 80}}
          "How long might I survive after a " (name organ) " transplant?"]
         [:p "These are the outcomes we would expect for people who entered the same information as you, based
        on patients who joined the waiting list between " from-year " and " to-year "."]]

        :from-listing
        [:<>
         [:h4 {:style {:margin-top 80}}
          "How long might I survive from the time I join the " (name organ) " transplant list?"]
         [:p "These are the outcomes we would expect for people who entered the same information as you, based
        on patients who joined the waiting list between " from-year " and " to-year "."]]

        :survival
        [:<>
         [:h4 {:style {:margin-top 80}}
          "How long might I survive after a " (name organ) " transplant?"]
         [:p "These are the outcomes we would expect for people who entered the same information as you, based
        on patients who joined the waiting list between " from-year " and " to-year "."]]

        :graft
        [:<>
         [:h4 {:style {:margin-top 80}}
          "How long might the graft survive after the " (name organ) " transplant?"]
         [:p "These are the outcomes we would expect for people who entered the same information as you, based
        on patients who joined the waiting list between " from-year " and " to-year "."]]

        [:<> "Title TBD" "[" (pr-str tool) "]"])

      #_[:p "Sample days:" (pr-str sample-days)]
      #_[:p "Outcomes:" (pr-str outcomes)]

      [svgc/svg-container (assoc (space {:outer {:width 1060 :height 660}
                                         :margin {:top 10 :right 10 :bottom 10 :left 10}
                                         :padding {:top 20 :right 20 :bottom 20 :left 20}
                                         :x-domain [0 14]
                                         :x-ticks 10
                                         :y-domain (if (> (count outcomes) 1)
                                                     [1 0] [0 1])
                                         :y-ticks 10})
                                 :styles styles)
       (fn [x y X Y] (conj (into [:g]
                                 (map (fn [i outcome]
                                        [:g {:transform (str "translate(0 " (+ 30 (* 80 i)) ")")}
                                         [:rect {:x 0 :y 0 :width 200 :height 60
                                                 :class-name ((keyword outcome) styles)}]
                                         [:text {:x 10 :y 40
                                                 :fill "#fff" :font-size 30}
                                          (relabel outcome)]]) 
                                      (range) outcomes))
                           [:g {:transform "translate(200 0)"}
                            [:g {:transform "scale(0.8)"}
                             [bar-chart-graphic x y X Y cifs-by-year sample-days outcomes]]]))]]]))
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