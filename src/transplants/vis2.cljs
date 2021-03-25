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
            ;["recharts" :as rech]
            [svg.scales :refer [->Identity nice-linear i->o o->i in out ticks tick-format-specifier]]
            [svg.space :refer [space]]
            [svg.container :as svgc]
            [cljs-css-modules.macro :refer-macros [defstyle]]
            ;[reagent.format :as ruf]
            [shadow.debug :refer [locals ?->]]))

;;
;; Plot data prep utilities
;; 
(defn residual
  "The Fs are the probabilities of leavig the list due to the various outcomes - see David's 
   paper at doc/David/transplant-non-simulation.pdf for detail.

   In Cox results we can always calculate a residual amount to make the Fs total to 100% on each day.
   As we may need to plot this residual and decorate it, we should calculate it and make it explicit.

   Given a seq of Fs for one day, return the residual for that day"
  [fs]
  (- 1 (apply + fs)))

(defn fs-keyed
  "We will be plotting outcomes including residuals in some order specified in the metadata.
   Both outcomes and fs are assumed to be in spreadsheet baseline-cif column order.
   We attach an outcome key and augment the fs with the residual."
  [outcomes fs]
  (conj (apply map vector [outcomes fs])
        [:residual (residual fs)]))

(defn fs-keyed-in-plot-order
  "order by outcome is a map of outcome-key to plot order.
   fsk are a seq of [outcome-key fs] key-values like '([:residual 0.30000000000000004] [:transplant 0.3] [:death 0.4]).
   plot-order is like {:transplant 1 :residual 2 :death 3}
   Result would be ([:transplant 0.3] [:residual 0.30000000000000004] [:death 0.4])"
  [plot-order fsk]
  (sort-by (comp plot-order first) fsk))

(defn fs-series
  "Given a sequence of fs in plot order, return a seq 
   containing the fs and the cumulative fs in plot order"
  [fsk]
  (let [fs (map second fsk)]
    {:fs fs :cum-fs (reductions + fs)}))

(defn fs-time-series
  [{:keys [outcomes fs mdata] :as env}]
  
  )

(comment
  (residual [0.1])
  ;; => 0.9
  (residual [0.1 0.2 0.2])
  ;; => 0.5

  (def outcomes [:transplant :death])
  (def fs [0.3 0.4])
  (def plot-order {:transplant 1 :residual 2 :death 3})
  (def fsk [[:transplant 0.3] [:residual 0.30000000000000004] [:death 0.4]])

  (fs-keyed outcomes fs)
  ;; => ([:residual 0.30000000000000004] [:transplant 0.3] [:death 0.4])

  (fs-keyed-in-plot-order
   plot-order
   (fs-keyed outcomes fs))
  ;; => ([:transplant 0.3] [:residual 0.30000000000000004] [:death 0.4])

  (fs-series fsk)
    ;; => {:fs (0.3 0.30000000000000004 0.4), :cum-fs (0.3 0.6000000000000001 1)}

  0)

(defn fs-cum-map
  "When creating a stacked chart, it's useful to sum all previous values"
  [outcome-keys fs]
  (map (fn [[day f]] [day (assoc (zipmap outcome-keys f) :residual (- 1 (apply + f)))]) fs))

(defn insert-at
  "Given 2 seqs of outcomes by day, insert the second into the first at position n"
  [fs rems n]
  (map (fn [[days f] [_ r]]
         [days (flatten (interpose r (split-at n f)))]) fs rems))

(defn fs-cum-fs
  [fs]
  (map (fn [[_ f-i]]
         {:cifs f-i :cum-cifs (reductions + f-i)})
       fs))

;; unused?
(defn residuals
  "In Cox results we always have a residual amount to make the totals up to 100% on each day
   As we may need to plot this and decorate it, we should calculate it and make it explicit.
   
   Given a seq of Fs by day [[day f]], return the complement of the sum of the outcomes by day"
  [day-fs]
  (map (fn [[day fs]] [day (residual fs)]) day-fs))

(comment
  
  (residuals [[0 [0.3 0.4]]
              [1 [0.2 0.3]]
              [2 [0.1 0.2]]])
  ;; => ([0 0.30000000000000004] [1 0.5] [2 0.7])

  (fs-cum-fs [[0 [0.3 0.4]]
              [1 [0.2 0.3]]
              [2 [0.1 0.2]]])
  ;; => ({:cifs [0.3 0.4], :cum-cifs (0.3 0.7)}
  ;;     {:cifs [0.2 0.3], :cum-cifs (0.2 0.5)}
  ;;     {:cifs [0.1 0.2], :cum-cifs (0.1 0.30000000000000004)})


  (insert-at [[0 [0.3 0.4]]
              [1 [0.2 0.3]]
              [2 [0.1 0.2]]]
             (residuals [[0 [0.3 0.4]]
                         [1 [0.2 0.3]]
                         [2 [0.1 0.2]]])
             1)
  ;; => ([0 (0.3 0.30000000000000004 0.4)] [1 (0.2 0.5 0.3)] [2 (0.1 0.7 0.2)])


  0)

;; delete?

(defn short-outcomes
  "Shorter outcome names. Possibly used in barchart. Replace wth something else as needed."
  [outcomes]
  outcomes)

;; test-rig

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
  [{:keys [organ centre tool day inputs bundle
           outcome-keys timed-outcome-keys beta-keys outcomes S0 fmaps all-S0 S0 s0 s0-for-day cox? sum-betas F
           rubric bar-info] :as env}]
  (let [factors (keys fmaps)]
    #_(?-> env ::test-rig)
    #_[:div "Not yet"]
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

                  ;;  Show Baseline S0s for selected day
                  [:tr {:key 1001}
                   [:td [:b "S" [:sub "0"]]]
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
  [".waiting" (bar-style {:fill "#4866cb" #_"#007BFF"})]
  [".death" (bar-style {:fill "#000000"})]
  [".post-transplant" (bar-style {:fill "#008888"})]
  [".from-listing" (bar-style {:fill "#4444AA"})]
  [".survival" (bar-style {:fill "#664488"})]
  [".graft" (bar-style {:fill "#00AA44"})]
  [".annotation" {:font-size "13pt"}]
  [".arrow" {:stroke       "#000"
             :stroke-width "1.5px"}])

(defn pairwise-stagger
  [threshold]
  (fn
    [staggers [i [f1 f2]]]
    ;(tap> [staggers [i [f1 f2]]])
    (if (and f2 (< (+ f1 f2) threshold))
      (-> staggers
          (assoc i true)
          (assoc (inc i) true))
      (update staggers i #(or % nil)))))

(defn label-staggers
  "Take a sequence of values (the fs) to be plotted in a stacked bar chart. We want to label the bars with its
   f-value which indicates the height of its bar. Bar heights can be smaller than the height of readable text, 
   and as it's possible for 2 adjacent bars to be next to each other, their labels can overlap unless we staagger
   them left to right. 

   This function returns a vector indicating which of the f labels should be staggered. 
"
  [threshold fs]
  ;(tap> fs)
  (reduce (pairwise-stagger threshold)
          []
          (zipmap (range) (partition-all 2 1 fs))))

(comment
  (label-staggers 7 [5 3 3 5])
  ;; => [nil true true nil]

  (label-staggers 7 [5 3 3 5 8 1])
  ;; => [nil true true nil nil nil]

  (label-staggers 10 [5 3 3 5 8 1])
  ;; => [true true true true true true]

  (label-staggers 7 [5 3 3 5 8 1 1])
  ;; => [nil true true nil nil true true]
  ;;   
  (label-staggers 7 [5 3 3 5 8])
  ;; => [nil true true nil nil]

  (label-staggers 7 [1 1 1 1]) ;this never happens but if it did it would need a 4 position horizontal stagger
  ;; => [true true true true]

  ((pairwise-stagger 7) [] [0 [5 3]])
  ;; => [nil]

  ((pairwise-stagger 7) [nil] [1 [3 3]])
  ;; => [nil true true]

  ((pairwise-stagger 7) [nil true true] [2 [3 5]])
  ;; => [nil nil true]
  ((pairwise-stagger 7) [nil true true] [3 [5 nil]])
  0)
;; => nil


(defn bar-chart-graphic
  "Draw a stacked bar chart.
   x is a Linear scale defined in svg.scales.Linear containing
    :in - an input range of numbers to plot on the x-axis.
    :out - an equivalent x coordinate in he SVG window.
   X is a function mapping between the two
   y and Y are similar for the Y axis
   sample-days are indices into the cif data-series at which bars should be drawn.
   outcomes are the cif data-series"
  [x y X Y fs-by-year sample-days outcomes]
  (let [rems (residuals fs-by-year)
        fs-with-rems (insert-at fs-by-year rems 1)
        fs-with-rem-by-year (fs-cum-fs fs-with-rems)
        pairwise #(partition-all 2 1 %)]
    (locals)
    [:g {:key 1}
     [:rect {:key        1
             :class-name (:inner styles)
             :x 0
             :y 0
             :width      1000
             :height     600}]

  ; draw bars
     (into [:g {:key 2}]
           (map (fn [j {:keys [cifs cum-cifs]}]
                  (let [cifs (second cifs)
                        cum-cifs (second cum-cifs)])
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
                fs-with-rem-by-year))

   ; draw labels
     (into [:g {:key 3 :style {:opacity 1}}]
           (map (fn [j {:keys [cifs cum-cifs]}]
                ;draw single bar and label
                  (let [x0 (- (X (+ (* 2.4 j) 0)) 150)
                        w 100
                        x-mid (+ x0 (/ w 2) -10)
                        staggers (label-staggers 0.1 cifs)]

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
                                    (when true ;(> cif 0.005)
                                      [:g
                                       {:transform (str "translate("
                                                        (if (staggers i)
                                                          (if (odd? i) 40 -60)
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
                            (if (= j 1)
                              [:text {:x (- x-mid 58) :y 660 :font-size 30}  "At Listing"]
                              [:text {:x (- x-mid 32) :y 660 :font-size 30}  (str "Year " (dec j))])]))))
                (range 1 (inc (count sample-days)))
                fs-with-rem-by-year))]))

(def relabel
  {"waiting" "Waiting"
   "transplant" "Transplanted"
   "removal" "Removed"
   "death" "Died"
   "survival" "Survived"
   "post-transplant" "Survived"
   "from-listing" "Survived"
   "graft" "Graft intact"})


(defn bar-chart
  "Draw the bar chart"
  [{:keys [organ centre tool day inputs cohort-dates bundle
           outcome-keys timed-outcome-keys beta-keys outcomes S0 fmaps all-S0 S0 s0 s0-for-day cox? sum-betas F
           rubric bar-info] :as env}]
  (let [factors (keys fmaps)
        {:keys [from-year to-year]} cohort-dates
        sample-days (map
                     utils/year->day
                     (range (inc (utils/day->year (first (last s0))))))
        F-for-year (map (fn [day] (model/S0-for-day F day)) sample-days)
        #_#_outcomes ["transplant" "waiting"  "death"]]
    (?-> outcomes ::bar-chart)
    [:> bs/Row
     [:> bs/Col {:style {:margin-top 10}}
      (get-in env [:mdata organ :tools tool :pre-section])

      #_(case tool

          :waiting
          (get-in env [:mdata :organ :tools :pre-section])

          :post-transplant
          (get-in env [:mdata :organ :tools :pre-section])

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

      [svgc/svg-container (assoc (space {:outer {:width 1060 :height 660}
                                         :margin {:top 0 :right 10 :bottom 10 :left 0}
                                         :padding {:top 20 :right 20 :bottom 20 :left 20}
                                         :x-domain [0 14]
                                         :x-ticks 10
                                         :y-domain [1 0]
                                         :y-ticks 10})
                                 :styles styles)
       (fn [x y X Y] (conj (into [:<>]
                                 (map (fn [i outcome]
                                        [:g {:transform (str "translate(0 " (+ 30 (* 80 i)) ")")}
                                         [:rect {:x 0 :y 0 :width 200 :height 60
                                                 :class-name ((keyword outcome) styles)}]
                                         [:text {:x 10 :y 40
                                                 :fill "#fff" :font-size 30}
                                          (relabel outcome)]])
                                      (range) outcomes))
                           [:g {:transform "translate(300 0)"}
                            [:g {:transform "scale(0.9)"}
                             [bar-chart-graphic x y X Y F-for-year sample-days outcomes]]]))]]]))



(defn area-chart
  "Draw the bar chart"
  [{:keys [organ centre tool inputs bundle title rubric bar-info y-range] :as params}]
  #_[:div "Not yet"]
  #_(let [{:keys [outcome-keys outcomes sum-betas sample-days]} (vis-data-map organ centre tool inputs bundle)
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