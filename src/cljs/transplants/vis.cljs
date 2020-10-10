(ns transplants.vis
  (:require ["react-bootstrap" :as bs]
            [reagent.core :as r]
            [transplants.model :as model]
            [transplants.subs :as subs]
            [transplants.factors :as fac]
            [transplants.bundles :as bun]
            [transplants.ui :as ui]
            [transplants.utils :as utils]
            [transplants.rgb :as rgb]
            [clojure.string :refer [replace]]
            #_[clojure.pprint :refer [pprint]]
            ["recharts" :as rech]
            #_[svg.scales :refer [->Identity nice-linear i->o o->i in out ticks tick-format-specifier]]
            [cljs-css-modules.macro :refer-macros [defstyle]]
            [cljs.pprint :refer [pprint]]))

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
 
    [:> bs/Row {:style {:margin-top 20}}
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
                    master-fmaps))])]]]])]))


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
  "Draw a stacked bar chart.
   x is a Liner scale deined in svg.scales.Linear containing
    :in - an input range of numbers to plot on the x-axis.
    :out - an equivalent x coordinate in he SVG window.
   X is a function mapping between the two
   y and Y are similar for the Y axis
   sample-days are indices into the cif data-series at which bars should be drawn.
   outcomes are the cif data-series"
  [x y X Y cifs-by-year sample-days outcomes]
  
  ;(println ::cifs-by-year cifs-by-year)
  ;(println ::sample-days sample-days)
  ;(println ::xX x X)
  ;(println ::X14 (X 14))


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




#_(defn bar-chart-graphic
  "Draw a stacked bar chart.
   x is a Liner scale deined in svg.scales.Linear containing
    :in - an input range of numbers to plot on the x-axis.
    :out - an equivalent x coordinate in he SVG window.
   X is a function mapping between the two
   y and Y are similar for the Y axis
   sample-days are indices into the cif data-series at which bars should be drawn.
   outcomes are the cif data-series"
  [x y X Y cifs-by-year sample-days outcomes]
  (println ::cifs-by-year cifs-by-year)
  (println ::sample-days sample-days)
  (println ::xX x X)
  (println ::X14 (X 14))


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
  

#_(defn tool-rubric
  [organ tool]
  (let [{:keys [from-year to-year]} @(rf/subscribe [::subs/cohort-dates])]
    (case tool
      :waiting
      [:<>
       [:h4 #_{:style {:margin-top 80}}
        "What might happen after I join the waiting list for a " (name organ) " transplant?"]]

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
        on patients who joined the waiting list between " from-year " and " to-year "."]])))

(defn vis-data-map
  "Collect into one map all configuration and inputs that are necessary to calculate a data series for the given organ, centre,
   and tool."
  [organ centre tool inputs bundle]
  (let [env [{:organ organ :centre centre :tool tool}
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
                     (range (inc (utils/day->year (:days (last baseline-cifs))))))]

    {:baseline-cifs baseline-cifs
     :outcome-keys outcome-keys
     :outcomes outcomes
     :sum-betas sum-betas
     :sample-days sample-days}))


(defn simple-bar-label
  "Custom y-axis labels"
  [payload]
  (pprint (js->clj payload))
  (let [{x "x" y "y" width "width" value "value"} (js->clj payload)]
    (r/as-element
     [:g
      (if (and (> width 30) (> value 15))
        [:text {:x (+ x (/ width 2))
                :y (+ y 25)
                :text-anchor "middle"
                :font-size (if (> width 30) "1.3em" "0.8em")
                :font-weight "bold"
                :fill "white"}
         (str (Math/round value) "%")]
        [:text {:x (+ x (/ width 2))
                :y (- y 5)
                :text-anchor "middle"
                :font-size (if (> width 30) "1.3em" "1em")
                :font-weight "bold"
              ;:font-size "0.7em"
                :fill "grey"}
         (str (Math/round value) "%")])])))

(defn label-stack-top
  "Custom y-axis labels"
  [payload]
  (pprint (js->clj payload))
  (let [{x "x" y "y" width "width" value "value" index "index"} (js->clj payload)]
    (r/as-element
     [:g
      (when (> value 99)
        [:text {:x (+ x (/ width 2))
                :y (+ y 25)
                :text-anchor "middle"
                :font-size (if (> width 30) "1.3em" "0.8em")
                :font-weight "bold"
                :fill "white"}
         (str (Math/round value) "%")])])))

(defn custom-tool-tip
  "bar chart custom tool tips"
  [payload]
  (let [{active "active"
         label "label"
         pload "payload"} (js->clj payload)]
    (when active
      (r/as-element
       [:div {:style {:background-color "#fff"
                      :display "flex"
                      :flex-direction "column"
                      :padding "10px 20px 0px 20px"
                      :border-radius 5
                      :box-shadow "1px 1px"}}
        [:h5 label]
        (into [:div {:style {:display "flex"
                             :flex-direction "column"
                             :align-items "flex-end"}}]
              (mapv
               (fn [{name "name" value "value"} d]
                 [:p {:style {:line-height 0.5
                              :flex 1
                              }}
                  name ": " (Math/round value) "%"])
               pload))]))))
    

(defn bar-chart
  "Draw the bar chart"
  [{:keys [organ centre tool inputs bundle title rubric bar-info]}]
  (let [{:keys [outcome-keys outcomes sum-betas sample-days]} (vis-data-map organ centre tool inputs bundle)
        
        cifs-by-year (clj->js (mapv
                               (fn [day year]

                                 (let [cifs (as-> (vec (apply model/scaled-cifs
                                                              (map (partial model/cif tool)
                                                                   (map (bun/cif-0 bundle day)
                                                                        outcome-keys)
                                                                   sum-betas))) x
                                              (update x 0 (if (> (count outcomes) 1)
                                                            #(- 1 %)
                                                            identity))
                                              (map #(* % 100) x))]
                                   (into {"days" day
                                          "year" (if (zero? year)
                                                   "Day 1"
                                                   (str "Year " year))}
                                         (mapv
                                          (fn [bi i]
                                            ;(println (:ciff bi))
                                            [(:label bi) ((:ciff bi) cifs i) #_(nth cifs i)])
                                          bar-info (range)))))
                               sample-days
                               (range (count sample-days))))]
    
    [:> bs/Row 
     [:> bs/Col
      [:div {:style {:margin-top 20}} rubric]

      (into [:> rech/BarChart {:width 600
                               :height 400
                               :data cifs-by-year
                               :margin {:top 30
                                        :right 50
                                        :left 50
                                        :bottom 50}}

             (when (some? (:stack-id bar-info))
               [:> rech/CartesianGrid {:stroke "#ccc"
                                       :strokeDasharray "5 5"}])

             [:> rech/XAxis {:dataKey "year"}]

       ; better without?
             [:> rech/YAxis {:dataKey "transplants"
                             :type "number"
                             :domain #js [0 100]}]

             [:> rech/Tooltip {:content custom-tool-tip}]

     ; The legend height has to be zero or it will cause a jump reduction of chart height
     ; on roll over if tooltips are enabled
             [:> rech/Legend {:width 100
                              :wrapperStyle  {:width 600
                                              :height 0
                                              :bottom 50
                                              :left 0
                                              :line-height 0}}]]
            (mapv
             (fn [{:keys [label fill hide stroke stack-id]}]
               (when-not hide
                 [:> rech/Bar {:type "monotone"
                               :dataKey label
                               :stroke stroke
                               :fill fill
                               :stack-id stack-id
                               #_#_:strokeDasharray "5 5"
                               :label (when (nil? stack-id)
                                        simple-bar-label)}]))
             bar-info))]]))
;;;
;; 
;;;
#_(defn svg-starter
  "Layout starter for svg plot"
  []
   [convention/margins (space {:outer    {:width 650, :height 550}
                               :margin   {:top 200, :right 30, :bottom 30, :left 0}
                               :padding  {:top 0, :right 120, :bottom 50, :left 120}
                               :y-domain [0 100] :x-title "People", :x-ticks 10
                               :x-domain [0 5] :y-title "Years", :y-ticks 10
                               :data     []})])