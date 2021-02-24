(ns transplants.vis2
  (:require ["react-bootstrap" :as bs]
            [reagent.core :as r]
            [re-frame.core :as rf]
            [transplants.model :as model]
            [transplants.subs :as subs]
            [transplants.events :as events]
            [transplants.factors :as fac]
            [transplants.bundles :as bun]
            [transplants.ui :as ui]
            [transplants.utils :as utils]
            [transplants.rgb :as rgb]
            [clojure.string :as str :refer [replace]]
            [clojure.pprint :as pp]
            ["recharts" :as rech]
            [svg.scales :refer [->Identity nice-linear i->o o->i in out ticks tick-format-specifier]]
            [svg.space :refer [space]]
            [svg.container :as svgc]
            [cljs-css-modules.macro :refer-macros [defstyle]]
            [cljs.pprint :refer [pprint]]))

(defn short-outcomes
  "Shorter outcome names. Possibly used in barchart. Replace wth something else as needed."
  [outcomes]
  outcomes)

(defn outcome-tr
  "Render an outcomes row header for the test-rig"
  [k outcomes]
  [:tr {:key k :style {:background-color rgb/secondary :color "#fff"}}
   [:th]
   (map-indexed (fn [k b] [:th {:key k} (replace b #"-reasons" "")]) outcomes)])

(comment
  (def organ :lung)
  (def centre :new)
  (def tool :waiting)
  (def day 100)
  (def inputs {})
  (def bundle
  
 @(rf/subscribe [::subs/bundles]))

  0)

(defn test-rig
  [{:keys [organ centre tool day inputs bundle rubric bar-info]}]
  (let [env [{:organ organ :centre centre :tool tool}
             bundle
             {organ inputs}]
        {:keys [fmaps baseline-cifs baseline-vars outcome-keys timed-outcome-keys beta-keys outcomes S0]} bundle

        factors (keys fmaps)
        sum-betas (map #(fac/sum-beta-xs env %) beta-keys)
        cox? (model/use-cox-adjusted? tool)

        ;; baseline-cifs-for-day is a seq of cif-0s - one for each outcome on the selected day
        s0 (:all-S0 bundle)
        baseline-cifs-for-day (map (bun/cif-0 bundle day) outcome-keys)
        [_ all-s0-for-day] (model/S0-for-day s0 day)


        ;;
        ;; The following code assumes we have the "all-reasons" outcome in a well known slot
        ;; in the outcomes vector (currently first). 
        ;;
        cifs  (map (partial model/cif tool) baseline-cifs-for-day sum-betas)


        F (model/cox-adjusted s0 sum-betas)
        #_(if cox?
            (model/cox-adjusted s0 exp-sum-betas)
            (map model/cox all-s0-for-day sum-betas))]


    [:> bs/Row {:style {:margin-top 20}}
     [:p (count s0)]
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

                    ;;  Show Baseline S0s for selected day
                  [:tr {:key 1002}
                   [:td [:b "S" [:sub "0"]]]
                   #_(pr-str (model/S0-for-day s0 day))
                   (map-indexed
                    (fn [i S0_i]
                      [:td {:key i} (model/to-precision (- 1 S0_i) 4)])
                    (second (model/S0-for-day s0 day)))]                    ;;  Show Baseline S0s for selected day
                  [:tr {:key 1002}
                   [:td [:b "F"]]
                   (map-indexed
                    (fn [i F_i]
                      [:td {:key i} (model/to-precision F_i 4)])
                    (second (model/S0-for-day F day)))]

                    ;; Show sum-beta-xs for selected inputs
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
                    fmaps))])]]]])]))

(comment

  (model/to-precision (last (fac/selected-beta-x env factor fmap b)) 4)
  (fac/selected-beta-x env factor fmap :beta-transplant)
  )

;;;
;; svg styles
;;;
(defn bar-style
  [styles]
  (let [{:keys [fill stroke opacity stroke-width]
         :or {fill "#41af6b"
              stroke "#fff"
              stroke-width 1
              opacity 0.7}} styles]
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



(defn vis-data-map
  "Collect into one map all configuration and inputs that are necessary to calculate a data series for the given organ, centre,
   and tool."
  [organ centre tool inputs bundle]
  (let [env [{:organ organ :centre centre :tool tool}
             bundle
             {organ inputs}]
        baseline-cifs (:baseline-cifs bundle)

        ;todo: The following slavishly follows the input. We may need to calculate an outcome too (e.g. waiting = 100 - (transplants + removal))
        outcomes (fac/get-outcomes* (first baseline-cifs))
        beta-keys (fac/prefix-outcomes-keys "beta" outcomes)
        outcome-keys (fac/prefix-outcomes-keys "cif" outcomes)
        sum-betas (map #(fac/sum-beta-xs env %) beta-keys)
        sample-days (map
                     utils/year->day
                     (range (inc (utils/day->year (:days (last baseline-cifs))))))]

    ;(println ::outcomes (conj outcomes "waiting"))
    ;(println ::outcome-keys (conj outcome-keys :cif-waiting))

    {:baseline-cifs baseline-cifs

     :outcome-keys (if (= tool :waiting)
                     [:cif-transplant :cif-waiting :cif-death]   ;; FIXME: DO NOT HARD CODE 
                     outcome-keys)
     :outcomes (if (= tool :waiting)
                 ["transplant" "waiting" "death"] ;; FIXME: DO NOT HARD CODE 
                 outcomes)
     :sum-betas [(nth sum-betas 0) 0 (nth sum-betas 1)]
     :sample-days sample-days}))




(defn data-series
  "Creates a plot series from tool and data context"
  [{:keys [organ centre tool inputs bundle title rubric bar-info] :as params}]
  (let [{:keys [outcome-keys outcomes sum-betas sample-days]} (vis-data-map organ centre tool inputs bundle)]
    (mapv
     (fn [day year]

       (let [cifs (as-> (vec (apply model/scaled-cifs
                                    (map (partial model/cif tool)
                                         (map (bun/cif-0 bundle day)
                                              outcome-keys)
                                         sum-betas))) x

                    ; for simple survival - leave as is, else invert
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
                  [(:label bi) ((:ciff bi) cifs i)])
                bar-info (range)))))
     sample-days
     (range (count sample-days)))))

#_(defn simple-bar-label
    "Custom y-axis labels"
    [payload]
    (pp/pprint (js->clj payload))
    (let [{x "x" y "y" width "width" value "value"} (js->clj payload)]
      (r/as-element
       [:g
        (if (and (> width 50) (> value 15))
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
                  :font-size (if (> width 50) "1.3em" "1em")
                  :font-weight "bold"
              ;:font-size "0.7em"
                  :fill "grey"}
           (str (Math/round value) "%")])])))

#_(defn label-stack-top
    "Custom y-axis labels"
    [payload]
  ;(pprint (js->clj payload))
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
  [area]
  (fn [payload]
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
                                :flex 1}}
                    name ": " (Math/round (if area (second value) value)) "%"])
                 pload))])))))

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
        baseline-cifs (:baseline-cifs bundle)
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
                                       (update 0 (if (> (count outcomes) 1)
                                                   #(- 1 %)
                                                   identity)))]
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

#_(defn bar-chart
    "Draw the bar chart"
    [{:keys [organ centre tool inputs bundle title rubric bar-info y-range] :as params}]
    #_[:div "Not yet"]
    (println ::bar-info bar-info)
    (let [{:keys [outcome-keys outcomes sum-betas sample-days] :as data-map} (vis-data-map organ centre tool inputs bundle)
          cifs-by-year (clj->js (data-series params))]
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
                               :domain (if (vector? y-range)
                                         (clj->js y-range)
                                         #js [0 100])}]

               [:> rech/Tooltip {:content (custom-tool-tip nil)}]

     ; The legend height has to be zero or it will cause a jump reduction of chart height
     ; on roll over if tooltips are enabled
               [:> rech/Legend {:width 100
                                :iconType "square"
                                :iconSize 20
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
                                 :label simple-bar-label}]))
               bar-info))]]))

(defn area-chart
  "Draw the bar chart"
  [{:keys [organ centre tool inputs bundle title rubric bar-info y-range] :as params}]
  #_[:div "Not yet"]
  (let [{:keys [outcome-keys outcomes sum-betas sample-days]} (vis-data-map organ centre tool inputs bundle)
        cifs-by-year (clj->js (data-series params))]

    ;(println ::area-chart cifs-by-year)
    [:> bs/Row
     [:> bs/Col
      [:div {:style {:margin-top 20}} rubric]

      (into [:> rech/AreaChart {:width 600
                                :height 400
                                :data cifs-by-year
                                :margin {:top 30
                                         :right 50
                                         :left 50
                                         :bottom 50}}

             [:> rech/CartesianGrid {:stroke "#ccc"
                                     :strokeDasharray "5 5"}]

             [:> rech/XAxis {:dataKey "year"}]

       ; better without?
             [:> rech/YAxis {:dataKey "transplants"
                             :type "number"
                             :domain (if (vector? y-range)
                                       (clj->js y-range)
                                       #js [0 100])}]

             [:> rech/Tooltip {:content (custom-tool-tip (:stack-id "1" #_(first bar-info)))}]

     ; The legend height has to be zero or it will cause a jump reduction of chart height
     ; on roll over if tooltips are enabled
             [:> rech/Legend {:width 100
                              :iconType "square"
                              :iconSize 20
                              :wrapperStyle  {:width 600
                                              :height 0
                                              :bottom 50
                                              :left 0
                                              :line-height 0}}]]
            (mapv
             (fn [{:keys [label fill hide stroke stroke-width]}]
               (when-not hide
                 [:> rech/Area {:type "monotone"
                                :dataKey label
                                :stroke stroke
                                :stroke-width (if stroke-width
                                                stroke-width
                                                "none")
                                :stack-id "1"
                                :fill fill
                                #_#_:stack-id stack-id
                                #_#_:strokeDasharray "5 5"
                                #_#_:label (when (nil? stack-id)
                                             simple-bar-label)}]))
             bar-info))]]))

(defn icon-array
  [{:keys [organ centre tool inputs bundle title rubric bar-info] :as params}]
  [:div "Not yet"]
  #_(let [{:keys [outcome-keys
                  outcomes
                  sum-betas
                  sample-days]} (vis-data-map organ centre tool inputs bundle)
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

      [:<>
       [:h4 "not yet"]
       (let [percent 20
             fill "red"
             no-fill "#bbb"
             caption "Placeholder: Add a year selector with text"]
         [ui/row {:style {:margin-bottom 5
                          :margin-top 20}}
          [ui/col {:md 7}
           caption]
          [ui/col {:md 5}
           (let [order (shuffle (concat (range percent) (range -1 (- percent 101) -1)))]
             (into
              [:<>
               (map
                (fn [j]
                  [ui/row {:key (str "icon-row-" j)}
                   [ui/col {:style {:line-height "17px"}}
                    (into [:<>
                           (map (fn [i]
                                  [ui/open-icon
                                   {:key (str "icon-col-" i)
                                    :font-size "10px"

                                    :color (if (neg? (if false #_randomise-icons
                                                         (order (- 100 (+ 10 (* j 10) (- i))))
                                                         (- percent (- 101 (+ 10 (* j 10) (- i))))))
                                             no-fill
                                             fill)
                                    :padding "4px 4px"} "person"]) (range 10))])]])
                (range 10))]))]])]))
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