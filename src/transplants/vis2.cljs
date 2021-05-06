(ns transplants.vis2
  (:require ["react-bootstrap" :as bs]
            [re-frame.core :as rf]
            [transplants.model :as model]
            [transplants.subs :as subs]
            [transplants.factors :as fac]
            [transplants.ui :as ui]
            [transplants.utils :as utils]
            [transplants.rgb :as rgb]
            [clojure.string :as str :refer [replace]]
            [svg.space :refer [space]]
            [svg.container :as svgc]
            [cljs-css-modules.macro :refer-macros [defstyle]]
            [cljstache.core :as mus]
            [shadow.debug :refer [locals ?> ?-> ?->>]]))

;;
;; Plot data prep utilities
;; 
(defn residual
  "The Fs are the probabilities of leaving the list due to the various outcomes - see David's 
   paper at doc/David/transplant-non-simulation.pdf for detail.

   In Cox results we can always calculate a residual amount to make the Fs total to 100% on each day.
   As we may need to plot this residual and decorate it, we should calculate it and make it explicit.

   Given a seq of Fs for one day, return the residual for that day"
  [fs]
  (- 1 (apply + fs)))

(defn fs-mapped
  "We will be plotting outcomes including residuals in some plot order specified in the metadata.
   `outcomes` is a seq of baseline-cif outcome headers (less any cif- prefix, and as keywords)
   `fs` are initially in that same order.
   Both outcomes and fs are assumed to be in spreadsheet baseline-cif column order.
   Return fs converted to a map keyed by outcome and with an additional residual outcome."
  [outcomes fs]
  (assoc (->> [outcomes fs]
              ;;(?->> ::outcomes-fs)
              (apply map vector)
              ;;(?->> ::apply-map-vector)
              (into {})
              ;;(?->> ::into)
              )
         :residual (residual fs)))

(defn fs-in-order
  "order by outcome is a map of outcome-key to plot order.
   fsk are a seq of [outcome-key fs] key-values like '([:residual 0.30000000000000004] [:transplant 0.3] [:death 0.4]).
   plot-order is like {:transplant 1 :residual 2 :death 3}
   Result would be (0.3 0.30000000000000004 0.4)"
  [plot-order fsm]
  #_(locals)
  (map
   (fn [data-key]
     (fsm data-key))
   plot-order))

#_(defn fs-series
    "convert an ordered fs to a map containing the original ordered-fs and its partial sums"
    [ordered-fs]
    {:fs ordered-fs :cum-fs (reductions + ordered-fs)})

(defn int-fs-series
  "convert an ordered fs to a map containing the original ordered-fs and its partial sums.
   Include integer valued percentage approximations for fs and cum-fs adjusted so the sum of the 
   int-fs is 100. The alogithm seeks to minimise the error introduced by the adjustment."
  [ordered-fs]
  (let [pc-fs (map #(* 100 %) ordered-fs)
        int-fs (loop [int-pc-fs (mapv #(js/Math.round %) pc-fs)]
                 (let [err-pc-fs (map #(- %1 %2) int-pc-fs pc-fs)
                       sum-int-pc-fs (apply + int-pc-fs)
                       sum-err-pc-fs (- sum-int-pc-fs 100)]
                   (if (zero? sum-err-pc-fs)
                     int-pc-fs
                     (let [cmp (if (pos? sum-err-pc-fs) > <)
                           adjust (reduce (fn [[i me] [j e]]
                                            (if (cmp e me)
                                              [j e]
                                              [i me]))
                                          [0 0]
                                          (zipmap (range) err-pc-fs))]
                       (recur (update int-pc-fs (first adjust) (if (pos? sum-err-pc-fs) dec inc)))))))]
    ;(locals)
    {:fs ordered-fs
     :cum-fs (reductions + ordered-fs)
     :int-fs int-fs
     :cum-int-fs (reductions + int-fs)}))

(defn fs-time-series
  "Take a time series of Fs with Fs in spreadsheet column order.
   Add residuals, and reorder them into a plot data series, adding cumulative values to facilitate
   a stacked plot."
  [outcomes plot-order t-fs]
  (map
   (fn [[t fs]]
     #_(locals)
     [t (->> fs
             ;(?->> :fs)
             (fs-mapped outcomes)
             ;(?->> :fs-mapped-outcomes)
             (fs-in-order plot-order)
             ;(?->> :fs-in-order)
             (int-fs-series))])
   t-fs))

(comment
  (residual [0.1])
  ;; => 0.9
  (residual [0.1 0.2 0.2])
  ;; => 0.5

  ;; (def outcomes '(:transplant :death))
  ;; (def fs [0.3 0.4])
  ;; (def plot-order {:death 1, :residual 2, :transplant 3})
  ;; (def data-keys [:death, :residual, :transplant])
  ;; (def fsk [[:transplant 0.3] [:residual 0.30000000000000004] [:death 0.4]])
  ;; (def t-fs [[1 [0.2 0.1]]
  ;;            [3 [0.3 0.15]]
  ;;            [4 [0.4 0.2]]])

  (fs-mapped '(:transplant :death) [0.3 0.4])
  ;; => {:transplant 0.3, :death 0.4, :residual 0.30000000000000004}


  (fs-in-order
   [:death, :residual, :transplant]
   (fs-mapped '(:transplant :death) [0.3 0.4]))
  ;; => (0.4 0.30000000000000004 0.3)

  ;(fs-series '(0.4 0.30000000000000004 0.3))
  ;; => {:fs (0.4 0.30000000000000004 0.3), :cum-fs (0.4 0.7000000000000001 1)}

  (fs-time-series [:transplant :death]
                  [:death, :residual, :transplant]
                  [[1 [0.2 0.1]]
                   [3 [0.3 0.15]]
                   [4 [0.4 0.2]]])
  ;; => ([1 {:fs (0.1 0.7 0.2), :cum-fs (0.1 0.7999999999999999 1)}] 
  ;;     [3 {:fs (0.15 0.55 0.3), :cum-fs (0.15 0.7000000000000001 1)}] 
  ;;     [4 {:fs (0.2 0.3999999999999999 0.4), :cum-fs (0.2 0.5999999999999999 0.9999999999999999)}])

  (int-fs-series (repeat 3 (/ 1 3)))
  ;; => {:fs (0.3333333333333333 0.3333333333333333 0.3333333333333333),
  ;;     :cum-fs (0.3333333333333333 0.6666666666666666 1),
  ;;     :int-fs [34 33 33],
  ;;     :cum-int-fs (34 67 100)}

  (int-fs-series (repeat 7 (/ 1 7)))
    ;; => {:fs
    ;;     (0.14285714285714285
    ;;      0.14285714285714285
    ;;      0.14285714285714285
    ;;      0.14285714285714285
    ;;      0.14285714285714285
    ;;      0.14285714285714285
    ;;      0.14285714285714285),
    ;;     :cum-fs
    ;;     (0.14285714285714285
    ;;      0.2857142857142857
    ;;      0.42857142857142855
    ;;      0.5714285714285714
    ;;      0.7142857142857142
    ;;      0.857142857142857
    ;;      0.9999999999999998),
    ;;     :int-fs [15 14 14 14 14 14 14],
    ;;     :cum-int-fs (15 29 43 57 71 85 99)}

  0)

;; visualisation commons
(defn aspect-ratio
  "Calculate an aspect ratio as a padding CSS %. 
   See https://www.w3schools.com/howto/howto_css_aspect_ratio.asp"
  [width height]
  (str (js/Math.floor (* 100 (/ height width))) "%"))

(defn svg-outcome-legend
  "Take a seq of outcome keys in plot order and render a styled legend.
   The 3-arity version allows an option map where a value and a custom position can be
   specified - both are functions of the integer plot-order of the series."
  ([plot-order data-styles]
   (svg-outcome-legend plot-order data-styles
                       {:string-value-f (constantly "")
                        :position-f #(str "translate(0 " (+ 30 (* 80 %)) ")")}))

  ([plot-order data-styles {:keys [width height string-value-f position-f]
                            :or {width 255 height 60}}]
   (into [:<>]
         (map (fn [i data-key]
                (let [styles (data-styles data-key)]
                  [:g {:transform (position-f i)
                       :key (str data-key "-" i)}
                   [:rect (merge  {:x 0 :y 0 :width width :height height}
                                  (dissoc styles :label-fill))]
                   [:text {:x 10 :y 40
                           :fill (:label-fill styles)
                           :font-size 30}
                    (str (:label styles) (string-value-f i))]]))
              (range)
              plot-order))))

(comment
  (def plot-order "fixture" [:arthur :brian :charlie])
  (def data-styles "fixture" {:width 200 :height 50 :string-value-f (constantly "Hello") :position-f (constantly [10 20])})
  (svg-outcome-legend plot-order data-styles)
;; => [:<>
;;     [:g
;;      {:transform "translate(0 30)", :key ":arthur-0"}
;;      [:rect {:x 0, :y 0, :width 275, :height 60}]
;;      [:text {:x 10, :y 40, :fill nil, :font-size 30} ""]]
;;     [:g
;;      {:transform "translate(0 110)", :key ":brian-1"}
;;      [:rect {:x 0, :y 0, :width 275, :height 60}]
;;      [:text {:x 10, :y 40, :fill nil, :font-size 30} ""]]
;;     [:g
;;      {:transform "translate(0 190)", :key ":charlie-2"}
;;      [:rect {:x 0, :y 0, :width 275, :height 60}]
;;      [:text {:x 10, :y 40, :fill nil, :font-size 30} ""]]]

  (svg-outcome-legend plot-order data-styles #(str "translate(0 " (+ -35 (* 50 %)) "),scale(0.7)")))

;; test-rig

(defn outcome-tr
  "Render an outcomes row header for the test-rig"
  [k outcomes]
  [:tr {:key k :style {:background-color rgb/secondary :color "#fff"}}
   [:th]
   (map-indexed (fn [k b] [:th {:key k} (replace b #"-reasons" "")]) outcomes)])

#_(comment
    (def organ :lung)
    (def centre :new)
    (def tool :waiting)
    (def day 100)
    (def inputs {})
    (def bundle

      @(rf/subscribe [::subs/bundles]))
    0)

(defn test-rig
  "expose calcluation in test"
  [{:keys [day beta-keys outcomes fmaps s0 sum-betas F] :as env}]
  (?-> F ::test-rig)
  (let [factors (keys fmaps)]
    #_(?-> env ::test-rig)
    #_[:div "Not yet"]
    [:> bs/Row {:style {:margin-top 20}}
     (when factors
       [:> bs/Col
        ;; todo: add text configuration
        [ui/test-day-selector "Results for test day:"]
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
  "Add default values to outcome styles"
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
  [".outer" {:fill   "#CCC"
             :stroke-opacity 1
             :stroke "#ccc"}]

  [".transplant" (bar-style {:fill "#41af6b"})]
  [".all-reasons" (bar-style {:fill "#4866cb"})]
  [".removal" (bar-style {:fill "#4b4d48"})]
  [".residual" (bar-style {:fill "#4866cb" #_"#007BFF"})]
  [".death" (bar-style {:fill "#000000"})]
  [".post-transplant" (bar-style {:fill "#008888"})]
  [".from-listing" (bar-style {:fill "#4444AA"})]
  [".Survived" (bar-style {:fill "#664488"})]
  [".graft" (bar-style {:fill "#00AA44"})]
  [".annotation" {:font-size "13pt"}]
  [".arrow" {:stroke       "#000"
             :stroke-width "1.5px"}])

(defn pairwise-stagger
  "returns a monoid for a given stagger threshold. The monoid calculates an array of booleans which indicates
   whether labels should be staggered by looking at heights of labels in adjacent pairs."
  [threshold]
  (fn
    [staggers [i [f1 f2]]]
    (if (and f2 (< (+ f1 f2) threshold))
      (-> staggers
          (assoc i true)
          (assoc (inc i) true))
      (update staggers i #(or % nil)))))

(defn label-staggers
  "Take a sequence of values (the fs) to be plotted in a stacked bar chart. We want to label the bars with its
   f-value which indicates the height of its bar. Bar heights can be smaller than the height of readable text, 
   and as it's possible for 2 adjacent bars to be next to each other, their labels can overlap unless we stagger
   them left to right. 

   This function returns a vector indicating which of the f labels should be staggered. 
"
  [threshold fs]
  ;(tap> fs)
  (reduce (pairwise-stagger threshold)
          []
          (zipmap (range) (partition-all 2 1 fs))))

(comment
  (label-staggers 4 [7 23 0 3])



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
;; 

(defn get-mustache
  "Lookup x in a form that may be a mustached template or a simple vector or a combination of both. 
   If the form is a string, return it
   If the form is a vector, then return the xth element.
   If the form is a map then it should have a :template and :data. Optionally also an :indexed value.
   If get on the indexed value x returns non-nil, then return that value. This allows special values to be returned by index
   even when other values require a template.
   If the mdata map has no indexed field or x yields nil, then the :data value is assumed to be a mustached field name
   in the :template. Render the template with that fied replaced by x"
  [mdata x]
  (cond
    (string? mdata)
    mdata

    (vector? mdata)
    (mdata x)

    (map? mdata)
    (let [{:keys [indexed template data]} mdata]
      (cond
        (and indexed (get indexed x))
        (get indexed x)

        (and template data)
        (mus/render template {data x})

        :else (locals)))
    :else mdata))

(defn right-arrow
  "Render a right-arrow"
  [{:keys [x y fill scale stroke stroke-width]}]
  [:path {:fill fill
          :stroke stroke
          :stroke-width stroke-width
          :d "M5 0v2h-5v1h5v2l3-2.53-3-2.47z"
          :transform (when (and x y scale)
                       (str "translate(" x " " y ")scale(" scale ")"))}])

(defn arrow
  "render an svg component that draws a white right arrow."
  [{:keys [index count x-offset y-offset spacing]}]
  ;(locals)
  (when (< 0 index count)
    (right-arrow {:x (+ x-offset (* index spacing))
                  :y y-offset
                  :fill "#fff"
                  :scale "3.5,6"
                  :stroke "#fff"
                  :stroke-width 2})))

(defn multiline-bin-label
  "render a multiline bin label"
  [bin-label x0 font-size]
  (:into [:g]
         (map-indexed
          (fn [row line]
            [:text {:key line
                    :x (+ x0 (:x-offset bin-label))
                    :y (+ (:y-offset bin-label) (* 35 row)) :font-size font-size}
             line])
          (:line bin-label))))

(defn draw-bin-labels
  [{:keys [bin-labels spacing offset font-size X Y]}]
  (locals)
  (into [:g {:key 1}]
        (map-indexed (fn [bar-index bin-label]
               (let [x0 (- (X (+ (* spacing #_(:time-index bin-label) (inc bar-index)))) (X offset))]
                 (multiline-bin-label bin-label x0 font-size)
                 ))
             bin-labels)))

(defn draw-bars
  [{:keys [bin-labels spacing offset time-series bar-width data-keys data-styles font-size X Y]}]
  (locals)
  (into [:g {:key 2}]
        (map-indexed (fn [bar-index bin-label]
               (let [;bar-index (:time-index bin-label)
                     x0 (- (X (+ (* spacing (inc bar-index)))) (X offset))
                     [_ {:keys [fs cum-fs]}] (nth time-series (:time-index bin-label))]
                 [:g (into [:<> {:key (str "bar-" bar-index)}]
                           (map (fn [data-key cif cum-cif]
                                  (let [styles (data-styles data-key)
                                        y0 (- (Y cum-cif) (Y cif))
                                        h (- (Y cum-cif) (Y (- cum-cif cif)))]
                                    (when (not (js/isNaN y0))
                                      [:g
                                       [:rect (merge {:key data-key
                                                      :x x0
                                                      :y y0
                                                      :width bar-width
                                                      :height h
                                                      :data-title cif}
                                                     (dissoc styles :label-fill))]])))
                                data-keys
                                fs
                                cum-fs))]))
             bin-labels)))

(defn draw-percents
  [{:keys [bin-labels spacing offset time-series data-count bar-width data-keys data-styles X Y]}]
  (into [:g {:key 3 :style {:opacity 1}}]
        (map (fn [bar-index bin-label]

                ;draw single bar and label
               (let [[_ {:keys [fs cum-fs int-fs]}]
                     (nth time-series (:time-index bin-label))
                     x0 (- (X (+ (* spacing (inc bar-index)))) (X offset) 10)
                     x-mid (+ x0 (/ bar-width 2) -0)
                     staggers (label-staggers 0.1 (map #(if (nil? %) 0 %) fs))]
                 (into [:g {:key bar-index}]
                       (conj
                        (map (fn [i data-key cif cum-cif int-fs]
                               (let [styles (data-styles data-key)

                                     y0 (if (> data-count 1)
                                          (- (Y cum-cif) (Y cif)) (Y cif))
                                     h (if (> data-count 1)
                                         (- (Y cum-cif) (Y (- cum-cif cif)))
                                         (- (Y 0) (Y cif)))
                                     y-mid (+ y0 (/ h 2))]
                                 (when true ;(> cif 0.005)
                                   [:g
                                    {:transform (str "translate("
                                                     (if (staggers i)
                                                       (if (odd? i) 18 -54)
                                                       (if (< cif 1) -20 -30))
                                                     " 10)")}
                                    [:rect (merge {:x (- x-mid 5)
                                                   :width (cond
                                                            (>= cif 1) 90
                                                            (< cif 0.10) 70
                                                            :else 70)
                                                   :y (- y-mid 30)
                                                   :height 40
                                                   :rx 10}
                                                  (dissoc styles :label-fill))]
                                    [:text {:x x-mid :y y-mid :font-size 30 :fill (:label-fill styles)}
                                     (str int-fs "%")]])))
                             (range)
                             data-keys
                             fs
                             cum-fs
                             int-fs)))))
             (range)
             bin-labels)))

(defn stacked-bar-chart
  "Draw a stacked bar chart.
   x is a Linear scale defined in svg.scales.Linear containing
    :in - an input range of numbers to plot on the x-axis.
    :out - an equivalent x coordinate in he SVG window.
   X is a function mapping between the two
   y and Y are similar for the Y axis
   sample-days are indices into the cif data-series at which bars should be drawn.
   outcomes are the cif data-series"
  #_[X Y time-series data-keys tool-mdata data-styles]
  [{:keys [data-keys tool-mdata] :as params}]
  ;(locals)
  (let [params (assoc params
                      :bin-labels (get-in tool-mdata [:bars :labels])
                      :spacing (get-in tool-mdata [:bars :spacing])
                      :offset 1.69
                      :data-count (count data-keys)
                      :bar-width (get-in tool-mdata [:bars :width])
                      :font-size (get-in tool-mdata [:bars :font-size]))
        ]
    [:g {:key 1}
     [:rect {:key        1
             :class-name (:inner styles)
             :x 0
             :y 0
             :width      1000
             :height     600}]

     [:g {:key "bin-labels"}
      [draw-bin-labels params]]
     [:g {:key "bars"}
      [draw-bars params]]
     [:g {:key "percents"}
      [draw-percents params]]]))

(defn bar-chart
  "Draw the bar chart"
  [{:keys [organ tool base-outcome-keys s0 F] :as env}]
  (let [sample-days (map
                     utils/year->day
                     (range (inc (utils/day->year (first (last s0))))))
        fs-by-year (map (fn [day] (model/S0-for-day F day)) sample-days)
        tool-mdata (get-in env [:mdata organ :tools tool])
        data-styles (get tool-mdata :outcomes)
        plot-order (:plot-order tool-mdata)
        svg-width 1060
        svg-height 700]
    [:> bs/Row
     [:> bs/Col {:style {:margin-top 10}}
      ;(:pre-section tool-mdata)

      [svgc/svg-container (assoc (space {:outer {:width (get-in tool-mdata [:bars :svg-width])
                                                 :height (get-in tool-mdata [:bars :svg-height])}
                                         :aspect-ratio (aspect-ratio svg-width svg-height)
                                         :margin (get-in tool-mdata [:bars :svg-margin]) 
                                         :padding (get-in tool-mdata [:bars :svg-padding])
                                         :x-domain [0 14]
                                         :x-ticks 10
                                         :y-domain [1 0]
                                         :y-ticks 10})
                                 :styles styles)

       (fn [x y X Y]
         (let [fs-by-year-in-plot-order (fs-time-series base-outcome-keys plot-order fs-by-year)]
           (locals)
           [:g
            (svg-outcome-legend plot-order data-styles)
            [:g {:transform "translate(280 0)"}
             [stacked-bar-chart (assoc env
                                       :X X
                                       :Y Y
                                       :data-keys plot-order
                                       :time-series fs-by-year-in-plot-order
                                       :tool-mdata tool-mdata
                                       :data-styles data-styles)]]]))]
      [:section {:style {:margin-top 10}}
       (:post-section tool-mdata)]]]))

(defn stacked-area-chart
  "Draw a stacked bar chart.
   x is a Linear scale defined in svg.scales.Linear containing
    :in - an input range of numbers to plot on the x-axis.
    :out - an equivalent x coordinate in he SVG window.
   X is a function mapping between the two
   y and Y are similar for the Y axis
   sample-days are indices into the cif data-series at which bars should be drawn.
   outcomes are the cif data-series"
  [{:keys [X Y year-series quarter-series data-keys tool-mdata data-styles] :as params}]
  (let [params (assoc params
                      :bins (get-in tool-mdata [:area :bins])
                      :bin-labels (get-in tool-mdata [:area :labels])
                      :spacing (get-in tool-mdata [:area :spacing])
                      :offset 1.85
                      :q-offset 1.86
                      :data-count (count data-keys)
                      :bar-width (get-in tool-mdata [:area :width])
                      :font-size (get-in tool-mdata [:bars :font-size]))])


  (let [data-count (count data-keys)
        ;; 
        ;; for 3 years
        bar-width (get-in tool-mdata [:area :width])
        spacing (get-in tool-mdata [:area :spacing])
        bins (get-in tool-mdata [:area :bins])
        bin-labels (get-in tool-mdata [:area :labels])
        font-size (get-in tool-mdata [:area :font-size])
        offset 1.85
        q-offset 1.86
        bar-positions (into []
                             (map (fn [bin-label]
                                    (let [bar-index (:time-index bin-label)
                                          [time {:keys [fs cum-fs]}] (nth year-series bar-index)]
                                      (into []
                                            (map (fn [data-key cif cum-cif]
                                                   (let [styles (data-styles data-key)
                                                         x0 (- (X (+ (* spacing (inc bar-index)))) (X offset))
                                                         x-mid (+ x0 (/ bar-width 2) (- (X 0.2)))
                                                         y0 (- (Y cum-cif) (Y cif))]
                                                     {:key data-key
                                                      :time time
                                                      :x (+ x-mid 15)
                                                      :y0 y0
                                                      :y1 (Y cum-cif)
                                                      :styles (dissoc styles :label-fill)}))
                                                 data-keys
                                                 fs
                                                 cum-fs))))
                                  bin-labels))

           ;;todo: these are no longer quarter year intervals. Rename
        quarter-positions (into []
                                (map (fn [[time {:keys [fs cum-fs]}]]
                                       (let [quarter (utils/day->week time)]
                                         (into []
                                               (map (fn [data-key cif cum-cif]
                                                      (let [styles (data-styles data-key)
                                                            x0 (- (X (+ (* spacing (inc (/ quarter 52))))) (X q-offset))
                                                            x-mid (+ x0 (/ bar-width 2) (- (X 0.2)))
                                                            y0 (- (Y cum-cif) (Y cif))]
                                                        {:key data-key
                                                         :time time
                                                         :x (+ x-mid 15)
                                                         :y0 y0
                                                         :y1 (Y cum-cif)
                                                         :styles (dissoc styles :label-fill)}))
                                                    data-keys
                                                    fs
                                                    cum-fs))))
                                     quarter-series))

        q-polygon-data (into {} (for [dk data-keys]
                                  [dk  (let [tops (for [bp-dks quarter-positions
                                                        bp-dk bp-dks
                                                        :when (= dk (:key bp-dk))]
                                                    (select-keys bp-dk [:x :y0 :y1]))]
                                         (concat (map (juxt :x :y0) tops)
                                                 (map (juxt :x :y1) (reverse tops))))]))]
    [:g {:key 1}
     [:rect {:key        1
             :class-name (:inner styles)
             :x 0
             :y 0
             :width      1000
             :height     600}]
     ;;
     ;; Plot areas
     ;;
     [:g
      (into [:g {:opacity 0.7}]
            (for [dk data-keys]
              [:polygon {:key dk
                         :points (for [[x y] (dk q-polygon-data)]
                                   (str x "," y " "))
                         :style (dissoc  (data-styles dk) :label-fill)}]))

        ; draw labels at yearly intervals
      (into [:g {:key 2}]
            (map (fn [bin-label]
                   (let [bar-index (:time-index bin-label)
                         x0 (- (X (+ (* spacing (inc bar-index)))) (X offset))
                         #_#_[time {:keys [fs cum-fs]}] (nth year-series bar-index)]
                     [:g
                      (multiline-bin-label bin-label x0 font-size)
                      #_(into [:g {:key (str "area-chart-" bar-index)}]
                            (map (fn [cif cum-cif]
                                   (let [x-mid (+ x0 (/ bar-width 2) (- (X 0.2)))
                                         y0 (- (Y cum-cif) (Y cif))]

                                     #_(when (not (js/isNaN y0))
                                         (multiline-bin-label bin-label x0 font-size))))
                                 fs
                                 cum-fs))]))
                 bin-labels))

       ;;
       ;; Plot label lines
       ;;
      (into [:g]
            (map
             (fn [bp]
               (let [x (:x (first bp))]
                 #_(?->> ::bp bp)
                 #_(?->> ::lines {:x0 x :x1 x :y0 0 :y1 600
                                  :style {:stroke "#000" :stroke-width 3}})

                 [:line {:x1 x :x2 x :y1 (Y 0) :y2 (Y 1)
                         :style {:stroke "#fff" :stroke-width 3}}])))
            bar-positions)]

   ; draw labels
     (into [:g {:key 3 :style {:opacity 1}}]
           (map (fn [bin-label]
                ;draw single bar and label
                  (let [bar-index (:time-index bin-label)
                        x0 (- (X (+ (* spacing (inc bar-index)))) (X offset) 10)
                        x-mid (+ x0 (/ bar-width 2) -0)
                        [time {:keys [fs cum-fs int-fs]}] (nth year-series bar-index)
                        staggers (label-staggers 0.1 (map #(if (nil? %) 0 %) fs))]
                    ;(locals)
                    (into [:g {:key time}]
                          (conj
                           (map (fn [i data-key cif cum-cif int-fs]
                                  (let [styles (data-styles data-key)

                                        y0 (if (> data-count 1)
                                             (- (Y cum-cif) (Y cif)) (Y cif))
                                        h (if (> data-count 1)
                                            (- (Y cum-cif) (Y (- cum-cif cif)))
                                            (- (Y 0) (Y cif)))
                                        y-mid (+ y0 (/ h 2))]
                                    (when true ;(> cif 0.005)
                                      [:g
                                       {:transform (str "translate("
                                                        (if (staggers i)
                                                          (if (odd? i) 18 -54)
                                                          (if (< cif 1) -20 -30))
                                                        " 10)")}
                                       [:rect (merge {:x (- x-mid 5)
                                                      :width (cond
                                                               (>= cif 1) 90
                                                               (< cif 0.10) 70
                                                               :else 70)
                                                      :y (- y-mid 30)
                                                      :height 40
                                                      :rx 10}
                                                     (dissoc styles :label-fill))]
                                       [:text {:x x-mid :y y-mid :font-size 30 :fill (:label-fill styles)}
                                        (str int-fs "%")]])))
                                (range)
                                data-keys
                                fs
                                cum-fs
                                int-fs)))))
                bin-labels))]))

(defn area-chart
  "Draw the area chart"
  [{:keys [organ tool base-outcome-keys s0 F] :as env}]
  (let [year-days (map
                   utils/year->day
                   (range (inc (utils/day->year (first (last s0))))))
        fs-by-year (map (fn [day] (model/S0-for-day F day)) year-days)
        quarter-days (map
                      utils/week->day
                      (range (inc (utils/day->week (first (last s0))))))
        fs-by-quarter (map (fn [day] (model/S0-for-day F day)) quarter-days)
        tool-mdata (get-in env [:mdata organ :tools tool])
        data-styles (get tool-mdata :outcomes)
        plot-order (:plot-order tool-mdata)
        svg-width 1060
        svg-height 660]
      ;(locals)
    [:> bs/Row
     [:> bs/Col {:style {:margin-top 10}}
      [svgc/svg-container (assoc (space {:outer {:width (get-in tool-mdata [:area :svg-width]) 
                                                 :height (get-in tool-mdata [:area :svg-height])}
                                         :aspect-ratio (aspect-ratio svg-width svg-height)
                                         :margin (get-in tool-mdata [:bars :svg-margin]) #_{:top 0 :right 10 :bottom 0 :left 0}
                                         :padding (get-in tool-mdata [:bars :svg-padding]) #_{:top 40 :right 20 :bottom 60 :left 20}
                                         :x-domain [0 14]
                                         :x-ticks 10
                                         :y-domain [1 0]
                                         :y-ticks 10})
                                 :styles styles)

       (fn [x y X Y]
         (let [fs-by-year-in-plot-order (fs-time-series base-outcome-keys plot-order fs-by-year)
               fs-by-quarter-in-plot-order (fs-time-series base-outcome-keys plot-order fs-by-quarter)]
           [:g
            (svg-outcome-legend plot-order data-styles)
            [:g {:transform "translate(280 0)"}
             #_[:rect {:x 0 :y 0 :width (X 10) :height (Y 1)
                       :style {:fill "#EEF8" :border "3px solid #CCC"}}]
             (stacked-area-chart {:X X
                                  :Y Y
                                  :year-series fs-by-year-in-plot-order
                                  :quarter-series fs-by-quarter-in-plot-order
                                  :data-keys plot-order
                                  :tool-mdata tool-mdata
                                  :data-styles data-styles})]]))]
      [:section {:style {:margin-top 25}}
       (:post-section tool-mdata)]]]))

(defn h-and-s
  "render a head and shoulders icon"
  [{:keys [key fill scale]
    :or {fill "red" scale "0.2"}}]
  [:g {:key key
       :transform (str "scale(" scale ")") :style {:fill fill}}
   [:path {:d (str "M4 0c-1.1 0-2 1.12-2 2.5s.9 2.5 2 2.5 2-1.12 2-2.5-.9-2.5-2-2.5z"
                   "m-2.09 5c-1.06.05-1.91.92-1.91 2v1h8v-1c0-1.08-.84-1.95-1.91-2-.54.61-1.28 1-2.09 1-.81 0-1.55-.39-2.09-1z")}]])

(defn ordinal->outcome
  "Deternine the outcome from the icon position"
  [ordinal cum-int-fs]
  (reduce
   (fn [i cum]
     (if (>= ordinal cum) (inc i) i))
   0
   cum-int-fs))

(defn ordinal-mdata
  "Determines an icon style based on the icon ordinal position in the array"
  [ordinal cum-int-fs tool-mdata]
  (let [index (ordinal->outcome ordinal cum-int-fs)
        plot-order (:plot-order tool-mdata)
        outcome-key (if plot-order
                      (plot-order index)
                      nil)]
    (get-in tool-mdata [:outcomes outcome-key])))

(comment

  (ordinal->outcome 0 [10 20 30 40 50])
  ;; => 0
  (ordinal->outcome 9 [10 20 30 40 50])
  ;; => 0

  (ordinal->outcome 10 [10 20 30 40 50])
  ;; => 0

  (ordinal->outcome 11 [10 20 30 40 50])

  (ordinal->outcome 50 [10 20 30 40 50])
  ;; => 4

  (ordinal->outcome 51 [10 20 30 40 50])
  ;; => 5
  )


;
(defn stacked-icon-array
  "Render stacked icon arrays - one for each timeperiod of interest - called a year at the moment."
  [year-series tool-mdata data-styles]
  (let [svg-width (get-in tool-mdata [:icons :svg-width])
        svg-height (get-in tool-mdata [:icons :svg-height])
        plot-order (:plot-order tool-mdata)
        labels (get-in tool-mdata [:icons :labels])
        randomise-icons @(rf/subscribe [::subs/randomise-icons])
        icon-order (if randomise-icons (shuffle (range 100)) (into [] (range 100)))]
    (locals)
    [:div "Hi"]
    [ui/col {:sm 12
             :style {:padding 0
                     #_#_:background-color "#CCC"}}
     (for [[i label] [(range ) ]
           #_#_time-index (:time-index label) ;(range (count year-series))
           #_#_:let [[days {:keys [int-fs cum-int-fs]}] (nth year-series time-index)]]
       [:p {:key i} label #_(pr-str i #_time-index "::" label)]
       #_[:p (pr-str [days {:keys [int-fs cum-int-fs]}])]
       #_[ui/row {:style {:padding "0px 0px"}
                :key (str "year-" time-index)}
        [ui/col {:key 1}
         
         [:h5 {:style {:margin-top 20}} (get-in
                                         label
                                         [:line 1])]
         [ui/randomise-query-panel "Randomise order?"]
         [svgc/svg-container (assoc (space {:outer {:width svg-width
                                                    :height svg-height}
                                            :aspect-ratio (aspect-ratio svg-width svg-height)
                                            :margin (get-in tool-mdata [:icons :svg-margin])
                                            :padding (get-in tool-mdata [:icons :svg-padding])
                                            :x-domain [0 300]
                                            :x-ticks 10
                                            :y-domain [0 300]
                                            :y-ticks 10})
                                    :styles styles)

          (fn [x y X Y]
            [:g
             (svg-outcome-legend plot-order data-styles
                                 {:width 300
                                  :string-value-f (fn [i] (str ": " (int-fs i) "%"))
                                  :position-f #(str "translate(0 " (+ -35 (* 60 %)) "),scale(0.7)")})
             (for [i (range 10)
                   j (range 10)
                   :let [ordinal (icon-order (+ j (* 10 i)))]]
               [:g {:key (str "i-" j "-" i)
                    :transform (str "translate(" (+ 300 (* j 22)) " " (+ -35 (* i 22)) ")")}
                [h-and-s
                 {:scale 2
                  :fill (:fill (ordinal-mdata ordinal cum-int-fs tool-mdata))}]])])]]])]))


(defn icon-array
  "render an icon array results view"
  [{:keys [organ tool base-outcome-keys s0 F] :as env}]

  (let [sample-days (map
                     utils/year->day
                     (range (inc (utils/day->year (first (last s0))))))
        fs-by-year (map (fn [day] (model/S0-for-day F day)) sample-days)
        tool-mdata (get-in env [:mdata organ :tools tool])
        data-styles (get tool-mdata :outcomes)
        plot-order (:plot-order tool-mdata)
        fs-by-year-in-plot-order (fs-time-series base-outcome-keys plot-order fs-by-year)]
    [:> bs/Row {:style {:max-width 600}}
     [:> bs/Col {:style {:margin "10px 0px"
                         :height "calc(100vh - 35ex)"
                         :overflow-y "scroll"}}
      #_"Hello"
      (stacked-icon-array fs-by-year-in-plot-order tool-mdata data-styles)]]))
