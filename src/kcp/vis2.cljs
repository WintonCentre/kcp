(ns kcp.vis2
  (:require ["react-bootstrap" :as bs]
            [cljs-css-modules.macro :refer-macros [defstyle]]
            [clojure.string :as str :refer [replace]]
            [goog.color :as col]
            [kcp.factors :as fac]
            [kcp.model :as model]
            [kcp.rgb :as rgb]
            [kcp.subs :as subs]
            [kcp.ui :as ui]
            [kcp.utils :as utils]
            [medley.core :as medl]
            [re-frame.core :as rf]
            [shadow.debug :refer [?-> ?->> ?> locals]]
            [shadow.debug :refer [?->]]
            [svg.container :as svgc]
            [svg.space :refer [space]]))

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
              (apply map vector)
              (into {}))
    :residual (residual fs)))

(defn fs-in-order
  "order by outcome is a map of outcome-key to plot order.
   fsk are a seq of [outcome-key fs] key-values like '([:residual 0.30000000000000004] [:transplant 0.3] [:death 0.4]).
   plot-order is like [:transplant :residual :death]
   Result would be (0.3 0.30000000000000004 0.4)"
  [plot-order fsm]
  (map
    (fn [data-key]
      (fsm data-key))
    plot-order))

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
      [t (->> fs
              (fs-mapped outcomes)
              (fs-in-order plot-order)
              (int-fs-series))])
    t-fs))

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
                (let [styles (data-styles data-key)
                      label-texts (if (string? (:label styles)) [(:label styles)] (:label styles))]
                  [:g {:transform (position-f i)
                       :key (str data-key "-" i)}
                   [:rect (merge {:x 0 :y 0 :width width :height height}
                                 (ui/svg-styles styles)
                                 #_(dissoc styles :label-fill))]
                   (into [:<>]
                         (map-indexed
                           (fn [line label-text]
                             [:text {:x 10 :y (+ 40 (* 25 line) (- (* 14 (dec (count label-texts)))))
                                     :fill (:label-fill styles)
                                     :font-size 25}
                              (str label-text (string-value-f i))])
                           label-texts))]))
              (range)
              plot-order))))

;; test-rig

(defn outcome-tr
  "Render an outcomes row header for the test-rig"
  [k outcomes]
  [:tr {:key k :style {:background-color rgb/secondary :color "#fff"}}
   [:th]
   (map-indexed (fn [k b] [:th {:key k} (replace b #"-reasons" "")]) outcomes)])

(defn test-rig
  "expose calcluation in test"
  [{:keys [day beta-keys outcomes fmaps s0 sum-betas F] :as env}]
  (let [factors (keys fmaps)]
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
                     (second (model/S0-for-day s0 day)))]   ;;  Show Baseline S0s for selected day
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
          [".inner" {:fill "none"
                     :stroke-opacity 1
                     :stroke-width 0
                     :stroke "#fa0"}]
          [".outer" {:fill "#CCC"
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
          [".arrow" {:stroke "#000"
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
  (reduce (pairwise-stagger threshold)
          []
          (zipmap (range) (partition-all 2 1 fs))))

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
  [{:keys [bin-labels spacing offset font-size X]}]

  (into [:g {:key 1}]
        (map-indexed (fn [bar-index bin-label]
                       (let [x0 (- (X (+ (* spacing #_(:time-index bin-label) (inc bar-index)))) (X offset))]
                         (multiline-bin-label bin-label x0 font-size)))
                     bin-labels)))

(defn draw-bars
  [{:keys [bin-labels spacing offset time-series bar-width data-keys data-styles X Y]}]

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
                                                             (ui/svg-styles styles))]])))
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
                     staggers (label-staggers 0.12 (map #(if (nil? %) 0 %) fs))]
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
                                  (when true                ;(> cif 0.005)
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
                                                   (ui/svg-styles styles))]
                                     [:text {:x x-mid :y y-mid :font-size 30 :fill (:label-fill styles)}
                                      (str int-fs "%")]])))
                              (range)
                              data-keys
                              fs
                              cum-fs
                              int-fs)))))
             (range)
             bin-labels)))

(defn tool-metadata
  [env organ tool]
  (get-in env [:mdata organ :tools tool])                   ;; provisional

  ;; Bear in mind that we will want to provide a default configuration template somehow.
  ;; It's not entirely clear to me what is the best way to do this, but a deep-merge between the
  ;; default configuration and the custom metadata is one possibility.
  ;;
  ;; The default configuration could be hard-coded into the initial database, or it could be read in
  ;; from an external edn first.
  (medl/deep-merge (get-in env [:mdata organ :tools :default])
                   (get-in env [:mdata organ :tools tool]))

  ;; TODO: One other issue to sort out here is that we've used organ names and tool names as keys into the
  ;; configuration. It would be better if the configuration were free to specify the domains (like :lung) and the
  ;; particular tools (like :waiting). Keys like :lung and :waiting should be configured too.
  )

(defn stacked-bar-chart
  "Draw a stacked bar chart.
   x is a Linear scale defined in svg.scales.Linear containing
    :in - an input range of numbers to plot on the x-axis.
    :out - an equivalent x coordinate in he SVG window.
   X is a function mapping between the two
   y and Y are similar for the Y axis
   sample-days are indices into the cif data-series at which bars should be drawn.
   outcomes are the cif data-series"
  [{:keys [data-keys tool-mdata] :as params}]

  (let [params (assoc params
                 :bin-labels (get-in tool-mdata [:bars :labels])
                 :spacing (get-in tool-mdata [:bars :spacing])
                 :offset (if-let [offset (get-in tool-mdata [:bars :offset])]
                           offset
                           1.5)
                 :data-count (count data-keys)
                 :bar-width (get-in tool-mdata [:bars :width])
                 :font-size (get-in tool-mdata [:bars :font-size]))]
    [:g {:key 1}
     [:rect {:key 1
             :class-name (:inner styles)
             :x 0
             :y 0
             :width 1000
             :height 600}]

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
        tool-mdata (tool-metadata env organ tool)
        data-styles (get tool-mdata :outcomes)
        plot-order (:plot-order tool-mdata)]

    [:> bs/Row
     [:> bs/Col {:style {:margin-top 10 :margin-right 10 :margin-bottom 10}}
      [svgc/svg-container (-> (space {:outer {:width (get-in tool-mdata [:bars :svg-width])
                                              :height (get-in tool-mdata [:bars :svg-height])}
                                      :margin (get-in tool-mdata [:bars :svg-margin])
                                      :padding (get-in tool-mdata [:bars :svg-padding])
                                      :x-domain [0 14]
                                      :x-ticks 10
                                      :y-domain [1 0]
                                      :y-ticks 10})
                              (assoc :styles styles)
                              (#(assoc % :aspect-ratio (aspect-ratio (:width (:inner %)) (:height (:inner %))))))

       (fn [_ _ X Y]
         (let [fs-by-year-in-plot-order (fs-time-series base-outcome-keys plot-order fs-by-year)]

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
  [{:keys [X Y year-series quarter-series data-keys tool-mdata data-styles]} {:keys [slimline]}]

  (let [data-count (count data-keys)
        ;;
        ;; for 3 years
        bar-width (get-in tool-mdata [:area :width])
        spacing (get-in tool-mdata [:area :spacing])
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
                                                     :styles (ui/svg-styles styles)}))
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
                                                         :styles (ui/svg-styles styles) #_(dissoc styles :label-fill)}))
                                                    data-keys
                                                    fs
                                                    cum-fs))))
                                     quarter-series))

        q-polygon-data (into {} (for [dk data-keys]
                                  [dk (let [tops (for [bp-dks quarter-positions
                                                       bp-dk bp-dks
                                                       :when (= dk (:key bp-dk))]
                                                   (select-keys bp-dk [:x :y0 :y1]))]
                                        (concat (map (juxt :x :y0) tops)
                                                (map (juxt :x :y1) (reverse tops))))]))]
    [:g {:key 1
         :transform "translate(100 0)"}
     [:rect {:key 1
             :class-name (:inner styles)
             :x 0
             :y 0
             :width (- 1000 (if slimline 280 0))
             :height 600}]
     ;;
     ;; Plot areas
     ;;
     [:g {:transform "translate(-10,0)"}
      (into [:g {:opacity 1
                 :transform "translate(2,0)"}]
            (for [dk data-keys]
              [:polygon {:key dk
                         :points (for [[x y] (dk q-polygon-data)]
                                   (str x "," y " "))
                         :style (ui/svg-styles (data-styles dk))}]))

      ; draw labels at yearly intervals
      (into [:g {:key 2}]
            (map (fn [bin-label]
                   (let [bar-index (:time-index bin-label)
                         x0 (- (X (+ (* spacing (inc bar-index)))) (X offset))]
                     [:g
                      (multiline-bin-label bin-label x0 font-size)]))
                 bin-labels))
      ;;
      ;; Plot label lines
      ;;
      (into [:g]
            (map
              (fn [bp]
                (let [x (:x (first bp))]
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
                        staggers (label-staggers 0.12 (map #(if (nil? %) 0 %) fs))]

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
                                     (when true             ;(> cif 0.005)
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
                                                      (ui/svg-styles styles)
                                                      #_(dissoc styles :label-fill))]
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
  [{:keys [organ tool base-outcome-keys s0 F] :as env} {:keys [slimline] :as display-options}]
  ;(?-> s0 ::s0)
  (?-> env ::env)
  (let [year-days (map
                    utils/year->day
                    (range (inc (utils/day->year (first (last s0))))))

        fs-by-year (map (fn [day] (model/S0-for-day F day)) year-days)
        quarter-days (range 120)
        _ (?-> quarter-days ::quarter-days)
        fs-by-quarter (map (fn [day] (model/S0-for-day F day)) quarter-days)
        tool-mdata (tool-metadata env organ tool)
        data-styles (get tool-mdata :outcomes)
        plot-order (:plot-order tool-mdata)
        svg-width (if slimline 780 1060)
        svg-height 660]

    [:> bs/Row
     [:> bs/Col {:style {:margin-top 10 :margin-right 10}}
      [svgc/svg-container
       (-> (space {:outer {:width (let [width (get-in tool-mdata [:area :svg-width])]
                                    (if slimline
                                      (- width 280)
                                      width))
                           :height (get-in tool-mdata [:area :svg-height])}
                   :aspect-ratio (aspect-ratio svg-width svg-height)
                   :margin {:top 0 :right 10 :bottom 0 :left 0}
                   :padding {:top 40, :right 20, :bottom 100, :left 20}
                   :x-domain [0 15]
                   :x-ticks 10
                   :y-domain [1 0]
                   :y-ticks 10})
           (assoc :styles styles)
           (#(assoc % :aspect-ratio (aspect-ratio (:width (:inner %)) (:height (:inner %))))))

       (fn [_ _ X Y]
         (let [fs-by-year-in-plot-order (fs-time-series base-outcome-keys plot-order fs-by-year)
               fs-by-quarter-in-plot-order (fs-time-series base-outcome-keys plot-order fs-by-quarter)]
           [:g
            (if slimline nil (svg-outcome-legend plot-order data-styles))
            [:g {:transform (if slimline "" "translate(280 0)")}

             (stacked-area-chart {:X X
                                  :Y Y
                                  :year-series fs-by-year-in-plot-order
                                  :quarter-series fs-by-quarter-in-plot-order
                                  :data-keys plot-order
                                  :tool-mdata tool-mdata
                                  :data-styles data-styles} display-options)]]))]
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

(defn side-by-side-icon-array
  "Render stacked icon arrays - one for each timeperiod of interest - called a year at the moment."
  [_plot-order year-series tool-mdata _data-styles]
  (let [plot-order (:plot-order tool-mdata)
        labels (get-in tool-mdata [:icons :labels])
        icon-order (into [] (range 100))]

    [:div
     [svgc/svg-container (-> (space {:outer {:width (get-in tool-mdata [:icons :svg-width])
                                             :height (+ 90 (get-in tool-mdata [:icons :svg-height]))}
                                     :margin (get-in tool-mdata [:icons :svg-margin])
                                     :padding (get-in tool-mdata [:icons :svg-padding])
                                     :x-ticks 10
                                     :y-domain [300 0]
                                     :y-ticks 10})
                             (assoc :styles styles)
                             (#(assoc % :aspect-ratio (aspect-ratio (:width (:inner %)) (:height (:inner %))))))

      (fn [_x _y _X _Y]
        (into [:g {:transform "translate(20,40),scale(1.42)"}]
              (for [label-index (range (count labels))
                    :let [label (nth labels label-index)
                          time-index (:time-index label)
                          [_ {:keys [int-fs cum-int-fs]}] (nth year-series time-index)]]

                [:g {:key (str "lab-" label-index)
                     :transform "translate (0, 10)"}
                 [:g {:key 1}
                  (for [k (range (count plot-order))
                        :let [outcome-key (plot-order k)
                              outcome (get-in tool-mdata [:outcomes outcome-key])]]
                    [:g {:key (str "outk-" k)
                         :transform (str "translate (" (* label-index 250) ", " (- (* k 36) 20) ")")}
                     [h-and-s {:scale 2 :fill (:fill outcome)}]
                     (let [s (:label outcome)
                           outcome-labels (if (vector? s) s [s])]
                       (into [:<>]
                             (map-indexed
                               (fn [i outcome-label]
                                 [:text {:transform (str "translate (40," (+ (* 15 i) 15) ")")}
                                  (str (if (zero? i) (int-fs k)) " " outcome-label)])
                               outcome-labels)))])]

                 [:g {:key 2 :transform (str "translate(" (* label-index 250) ", 120)")}
                  (for [i (range 10)
                        j (range 10)
                        :let [ordinal (icon-order (+ j (* 10 i)))]]
                    [:g {:key (str "i-" j "-" i)
                         :transform (str "translate(" (* j 22) " " (* i 22) ")")}
                     [h-and-s
                      {:scale 2 :fill (:fill (ordinal-mdata ordinal cum-int-fs tool-mdata))}]])]

                 [:g {:key 3 :transform (str "translate(" (* label-index 250) ", 370)")}
                  [:text {:font-size "1.2em"
                          :x 20} (get-in label [:line 0])]]])))]]))
;
(defn stacked-icon-array
  "Render stacked icon arrays - one for each timeperiod of interest - called a year at the moment."
  [year-series tool-mdata _]
  (let [svg-width (get-in tool-mdata [:icons :svg-width])
        svg-height (get-in tool-mdata [:icons :svg-height])
        plot-order (:plot-order tool-mdata)
        labels (get-in tool-mdata [:icons :labels])
        icon-order (into [] (range 100))]

    [ui/col {:sm 12
             :style {:padding 0}}
     (for [i (range (count labels))
           :let [label (nth labels i)
                 time-index (:time-index label)
                 [_ {:keys [int-fs cum-int-fs]}] (nth year-series time-index)]]
       [ui/row {:style {:padding "0px 0px"}
                :key (str "year-" time-index)}
        [ui/col {:key 1}

         [:h4 {:style {:margin-top 20}}
          (let [line (:line label)]
            (if (sequential? line) (map str line) line))]

         [svgc/svg-container (-> (space {:outer {:width (get-in tool-mdata [:icons :svg-width])
                                                 :height (get-in tool-mdata [:icons :svg-height])}
                                         :aspect-ratio (aspect-ratio svg-width svg-height)
                                         :margin (get-in tool-mdata [:icons :svg-margin])
                                         :padding (get-in tool-mdata [:icons :svg-padding])
                                         :x-domain [0 300]
                                         :x-ticks 10
                                         :y-domain [300 0]
                                         :y-ticks 10})
                                 (assoc :styles styles)
                                 (#(assoc % :aspect-ratio (aspect-ratio (:width (:inner %)) (:height (:inner %))))))

          (fn [_ _ _ _]
            [:g {:transform "translate(10,15),scale(1.9)"}
             [:g {:key 1}
              (for [k (range (count plot-order))
                    :let [outcome-key (plot-order k)
                          outcome (get-in tool-mdata [:outcomes outcome-key])]]
                [:g {:key (str "outk-" k)
                     :transform (str "translate (" 10 ", " (+ (* k 45) 20) ")")}
                 [h-and-s {:scale 2 :fill (:fill outcome)}]
                 (let [s (:label outcome)
                       outcome-labels (if (vector? s) s [s])]
                   (into [:<>]
                         (map-indexed
                           (fn [i outcome-label]
                             [:text {:transform (str "translate(30," (+ 15 (* i 18)) ")")}
                              (str (if (zero? i) (str (int-fs k) " ") "") outcome-label)])
                           outcome-labels)))])]

             (for [i (range 10)
                   j (range 10)
                   :let [ordinal (icon-order (+ j (* 10 i)))]]
               [:g {:key (str "i-" j "-" i)
                    :transform (str "translate(" (+ 300 (* j 22)) " " (+ 20 (* i 22)) ")")}
                [h-and-s
                 {:scale 2
                  :fill (:fill (ordinal-mdata ordinal cum-int-fs tool-mdata))}]])])]]])]))

(defn move-item
  "Returns a-vector with all items (if any) moved to the start or the end depending on whether
     a < b or b < a"
  [a-vector item a b]
  (if (not-any? #(= item %) a-vector)
    a-vector
    (into [] (sort-by (fn [el]
                        (if (= item el) a b)) a-vector))))
(defn move-to-start
  "Move item to start of vector"
  [a-vector item]
  (move-item a-vector item -1 1))

(defn move-to-end
  "Move item to end of vector."
  [a-vector item]
  (move-item a-vector item 1 -1))

(defn icon-array
  "render an icon array results view"
  [{:keys [organ tool base-outcome-keys s0 F] :as env} {:keys [disable-mobile]}]

  (let [sample-days (map
                      utils/year->day
                      (range (inc (utils/day->year (first (last s0))))))
        fs-by-year (map (fn [day] (model/S0-for-day F day)) sample-days)
        tool-mdata (tool-metadata env organ tool)
        data-styles (get tool-mdata :outcomes)
        plot-order (:plot-order tool-mdata)
        plot-order* (as-> (:plot-order tool-mdata) x
                          (move-to-end x :removal)
                          (move-to-end x :death))
        fs-by-year-in-plot-order (fs-time-series base-outcome-keys plot-order fs-by-year)
        window-width (rf/subscribe [::subs/window-width])
        mobile? (<= @window-width ui/mobile-break)]
    [:> bs/Row
     [:> bs/Col {:style {:margin-top 10 :margin-right 10 :margin-bottom 25}}
      (if (and mobile? (not disable-mobile))
        (stacked-icon-array fs-by-year-in-plot-order tool-mdata data-styles)
        (side-by-side-icon-array plot-order* fs-by-year-in-plot-order tool-mdata data-styles))]]))


(defn table-render
  [year-series tool-mdata plot-order data-styles]
  (let [labels (get-in tool-mdata [:table :labels])
        years (range (count labels))]
    [:> bs/Table {:style {:margin-top 20
                          :border "3px solid #666"}
                  :responsive "xl"
                  :bordered true}
     [:thead
      [:tr
       (for [i years
             :let [label (nth labels i)
                   line (:line label)
                   line (if (sequential? line) (map str line) line)]]
         [:th {:style {:border-bottom "3px solid #666"}
               :key (str "y-" i)} line])]]
     [:tbody#result-table
      (for [j (range (count plot-order))
            :let [style ((nth plot-order j) data-styles)
                  long-label (:long-label style)
                  fill (col/hexToRgb (:fill style))]]
        [:tr.tborder {:key (str "c-" j) :style (assoc style :border-color (if (or (= (:fill style) "#ffffff")
                                                                                  (= (:fill style) "#fff")) "#000" (:fill style)))}

         (for [i years
               :let [label (nth labels i)
                     time-index (:time-index label)
                     [_ {:keys [int-fs]}] (nth year-series time-index)]]
           [:td {:key (str "r-" i)
                 :style {:margin 0 :padding 0}}
            [:div {:style {:position "relative"
                           :width "100%"
                           :height "100%"}}
             [:div.lblprint {:id (str (name (plot-order j)) "-" i)
                             :data-year time-index
                             :data-value (nth int-fs j)
                             :style {:margin 0 :padding 15
                                     #_#_:background-image #_(apply utils/fill-data-url #_fill [30 144 245]) (str "url(" (apply utils/fill-data-url fill) ")")
                                     :height "100%"
                                     :position "relative"}}
              (str (nth int-fs j) "%") " of " long-label]]])])]]))

(defn text-render
  "If we took an example of 100 transplant patients, who input the same information as you into the tool, we would expect:
  After 1 year	31  of them to have received a transplant
		67  of them to still be waiting for a transplant
		  2  of them to have died or been removed from the list
  After 2 years 	67  of them to have received a transplant
		23  of them to still be waiting for a transplant
		10  of them to have died or been removed from the list
  After 3 years	75  of them to have received a transplant
		  3  of them to still be waiting for a transplant
		22  of them to have died or been removed from the list"
  [year-series tool-mdata plot-order data-styles]
  (let [labels (get-in tool-mdata [:table :labels])
        years (range (count labels))]
    [:div {:style {:margin-top 20}}
     [:div
      (for [i years
            :let [label (nth labels i)
                  line (:line label)
                  line (if (sequential? line) (map str line) line)]]
        [:div {:key (str "y-" i) :style {:margin-bottom 20}} [:div {:style {:font-weight "bold" :font-size "1.5em"}} line]
         (for [j (range (count plot-order))
               :let [style ((nth plot-order j) data-styles)
                     long-label (:long-label style)]]
           [:div {:key (str "c-" j)}
            (let [label (nth labels i)
                  time-index (:time-index label)
                  [_ {:keys [int-fs]}] (nth year-series time-index)]
              [:div {:key (str "r-" i)} (str (nth int-fs j)) " out of 100 " long-label])])])]]))

(defn table
  "render a table results view"
  [{:keys [organ tool base-outcome-keys s0 F plot-order] :as env}]

  (let [sample-days (map
                      utils/year->day
                      (range (inc (utils/day->year (first (last s0))))))
        fs-by-year (map (fn [day] (model/S0-for-day F day)) sample-days)
        tool-mdata (tool-metadata env organ tool)
        data-styles (get tool-mdata :outcomes)
        fs-by-year-in-plot-order (fs-time-series base-outcome-keys plot-order fs-by-year)]

    [:section {:style {:margin-right 10 :margin-bottom 20}}
     (table-render fs-by-year-in-plot-order tool-mdata plot-order data-styles)]))

(defn test-render
  [year-series tool-mdata plot-order fulfilled-inputs r-params centre-info organ tool]
  (let [labels (get-in tool-mdata [:table :labels])
        years (range (count labels))]

    [:section {:id "uri-result"}
     (pr-str
       {:organ (name organ)
        :tool (name tool)
        :clj-inputs fulfilled-inputs
        :r-inputs (into {}
                        (map #(str/split % "_") (conj r-params (str "cent_" (:name centre-info)))))
        :result (mapv
                  (fn [i]
                    (let [label (nth labels i)
                          time-index (:time-index label)]
                      (assoc (into {}
                                   (map
                                     (fn [j]
                                       (let [[_ {:keys [int-fs fs]}] (nth year-series time-index)]
                                         [(nth plot-order j) (* 100 (nth fs #_int-fs j))]))
                                     (range (count plot-order))))
                        :year time-index)))
                  (range (count years)))})]))

(defn text
  "a text results view"
  [{:keys [organ tool base-outcome-keys s0 F plot-order] :as env}]

  (let [sample-days (map
                      utils/year->day
                      (range (inc (utils/day->year (first (last s0))))))
        fs-by-year (map (fn [day] (model/S0-for-day F day)) sample-days)
        tool-mdata (tool-metadata env organ tool)
        data-styles (get tool-mdata :outcomes)
        fs-by-year-in-plot-order (fs-time-series base-outcome-keys plot-order fs-by-year)]

    [:section
     (text-render fs-by-year-in-plot-order tool-mdata plot-order data-styles)]))

(defn test-gen
  "send a test data structure for comparison against an R structure"
  [{:keys [organ tool base-outcome-keys s0 F fulfilled-inputs fmaps centre-info] :as env}]
  (let [sample-days (map
                      utils/year->day
                      (range (inc (utils/day->year (first (last s0))))))
        fs-by-year (map (fn [day] (model/S0-for-day F day)) sample-days)
        tool-mdata (tool-metadata env organ tool)
        plot-order (:plot-order tool-mdata)
        fs-by-year-in-plot-order (fs-time-series base-outcome-keys plot-order fs-by-year)
        r-params (map (fn [[k v]]
                        (-> fmaps k :levels v :r-name)) fulfilled-inputs)]

    (when tool-mdata
      [test-render fs-by-year-in-plot-order tool-mdata plot-order fulfilled-inputs r-params
       centre-info organ tool])))
