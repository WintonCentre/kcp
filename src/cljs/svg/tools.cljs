(ns lung.components.tools
  (:require [rum.core :as rum]
            [citrus.core :as citrus]
            [cljs-css-modules.macro :refer-macros [defstyle]]
            [lung.styles :refer [styles outcome-styles fills]]
            [clojure.string :refer [lower-case upper-case index-of]]
            [winton-utils.data-frame
             :refer
             [cell-apply cell-update cell-binary cell-binary-seq cell-sums cell-diffs map-of-vs->v-of-maps]]
            [xl.rec :refer [map->Overall
                            map->Survival
                            map->Level
                            map->Coeffs]]
            [lung.data.utils :refer [max-by-key]]
            [lung.constants :refer [fills]]
    ;[lung.components.sfl-inputs :as sfl]
    ;        [lung.components.spt-inputs :as spt]
            [svg.space :refer [space]]
            [svg.scales :refer [->Identity nice-linear i->o o->i in out ticks tick-format-specifier]]
            [svg.chart-area :refer [chart-area]]
            [svg.time-series :refer [line-plot area-plot]]
            [svg.placed-labels :refer [placed-label]]
            [lung.components.inputs :refer [centre-select level-selector numeric-input]]
            [lung.model.age-at-tt-spline :refer [spline*]]
            [cljs.pprint :refer [pprint]]
            ))



(defn loaded
  "current load state"
  [r]
  (citrus/subscription r [:pull-data :loaded]))

(def day->years #(/ % 365.25))
(def years->days #(* % 365.25))

(defn factor
  "current value of the factor k"
  [r k]
  (citrus/subscription r [:factor k]))

(defn overall-competing
  [r]
  (citrus/subscription r [:pull-data :data :oc]))

(defn overall-competing-export
  [r]
  (citrus/subscription r [:pull-data :data :oc-export]))

(rum/defc overall-competing-plots
  [scaling data]
  [:g
   (area-plot (assoc scaling :point-series (:cum-death data)
                             :class-name (:cum-death styles)))

   (area-plot (assoc scaling :point-series (:cum-removal data)
                             :class-name (:cum-removal styles)))

   (area-plot (assoc scaling :point-series (:alive-on-list data)
                             :class-name (:alive-on-list styles)))

   (area-plot (assoc scaling :point-series (:cum-transplant data)
                             :class-name (:cum-transplant styles)))
   ])

(rum/defc waiting-label [scaling]
  (placed-label (merge scaling {:k 1 :u 0.25 :v 10 :text "Waiting on list" :class-name (:light-label styles)})))

(rum/defc transplanted-label [scaling]
  (placed-label (merge scaling {:k 2 :u 2.5 :v 30 :text "Transplanted" :class-name (:light-label styles)})))

(rum/defc removed-label [scaling]
  (placed-label (merge scaling {:k 4 :u 3 :v 65 :text "Removed from list" :class-name (:light-label styles)})))

(rum/defc died-label [scaling]
  (placed-label (merge scaling {:k 7 :u 3.5 :v 85 :text "Died" :class-name (:light-label styles)})))

(rum/defc labels1 [scaling]
  (waiting-label scaling))

(rum/defc labels2 [scaling]
  (transplanted-label scaling))

(rum/defc labels3 [scaling]
  [:g
   (transplanted-label scaling)
   (removed-label scaling)])

(rum/defc labels4 [scaling]
  [:g
   (transplanted-label scaling)
   (removed-label scaling)
   (died-label scaling)]
  )

(rum/defc overall-competing-labels
  [scaling labels]
  [:g (labels scaling)])


(defn extract-points [data k]
  (map #((juxt :years k) %) data))

(rum/defc plot-competing < rum/reactive
  [r]
  (when (rum/react (loaded r))
    (let [pre-oc (rum/react (overall-competing-export r))
          aol-points (extract-points pre-oc :alive-on-list)
          transplant-points (extract-points pre-oc :cum-transplant)
          rem+transplant-points (extract-points pre-oc #(+ (:cum-removal %)
                                                           (:cum-transplant %)))
          death-points (extract-points pre-oc #(+ (:cum-death %)
                                                  (:cum-removal %)
                                                  (:cum-transplant %)))
          oc1 {:alive-on-list aol-points}
          oc2 {:cum-transplant transplant-points}
          oc3 {:cum-removal    rem+transplant-points
               :cum-transplant transplant-points}
          oc4 {:cum-death      death-points
               :cum-removal    rem+transplant-points
               :cum-transplant transplant-points}

          x-max (:years (last pre-oc))                      ;1825

          ;; Define graph scaling
          scaling (space {:outer    {:width 1000 :height 800}
                          :margin   {:top 30 :right 30 :bottom 30 :left 30}
                          :padding  {:top 100 :right 100 :bottom 100 :left 100}
                          :x-domain [0 x-max]
                          :y-domain [0 100]
                          :x-ticks  5
                          :y-ticks  10})]

      [:.row
       [:.col-sm-offset-1.col-sm-10.col-md-offset-1.col-md-8.col-lg-offset-1.col-lg-6

        [:h2 "What may happen and when"]
        [:p "Let's look at the overall picture of what happens to 100 people who have been accepted onto the lung transplant waiting list over the course of 5 years."]
        [:p "The waiting list is a pool of people ready and accepted for transplant. As time goes by the need for
            a transplant may become more urgent, but all must wait until a matching lung becomes available."]
        [:p "People leave the waiting list for various reasons. They may receive a transplant,
                or they may be removed from the list, or they may die."]
        [:p "After reading this section, move along to the other tabs on this site to get a better picture of what has happened in the past to people described by the data you enter."]


        #_[:ul
           [:li "Over 20 people leave the list in the first three months."]
           [:li "About half have left by six months."]
           [:li "After 1 year about 35 are still on the list."]
           [:li "After 5 years very few remain."]]
        #_(chart-area (assoc scaling :x-title "Years from listing"
                                     :y-title "People"
                                     :plots #(overall-competing-plots scaling oc1)
                                     :placed-labels #(overall-competing-labels scaling labels1)))

        [:h3 "When do people receive a transplant?"]
        [:p "On average for all centres, over the course of these 5 years:"]
        [:ul
         [:li "about 65 people eventually receive a transplant,"]
         [:li "about half of these 65 receive a transplant within 6 months of joining the list,"]]
        [:p "See " [:a {:href (str "/" (rum/react (citrus/subscription r [:navigate :hashtag])) "/tools/2")}
                    "Survival Post Transplant"] " to find out what happens after a transplant."]
        (chart-area (assoc scaling :x-title "Years from listing"
                                   :y-title "People"
                                   :plots #(overall-competing-plots scaling oc2)
                                   :placed-labels #(overall-competing-labels scaling labels2)))


        [:h3 "What else can happen?"]
        [:p "A further 10 people or so are removed from the list for one reason or another. They may become
                 too sick for a transplant, or they may move out of the area and so off the list."]
        (chart-area (assoc scaling :x-title "Years from listing"
                                   :y-title "People"
                                   :plots #(overall-competing-plots scaling oc3)
                                   :placed-labels #(overall-competing-labels scaling labels3)))


        [:p "And about 25 people die."]
        (chart-area (assoc scaling :x-title "Years from listing"
                                   :y-title "People"
                                   :plots #(overall-competing-plots scaling oc4)
                                   :placed-labels #(overall-competing-labels scaling labels4)))


        [:a.btn.btn-primary.pull-right
         {:style {:margin-bottom 20}
          :href  (str "/" (rum/react (citrus/subscription r [:navigate :hashtag])) "/tools/1")}
         "Can you be more specific?"]

        ]])))

;;;
;; Survival plots
;;;

(defn beta-for-level [fkey lkey levels]

  (reduce (fn [beta level]
            ;(println "beta-for-level " fkey " " lkey "(" (:lkey level) ") in " levels)
            (if (= (:lkey level) lkey)
              (:beta level)
              beta)) 0 levels))

(comment
  {:factor "Interaction between transplant type and disease group",
   :fkey   :tt.d-gp,
   :levels
           [{:level "Single lung and Other",
             :beta  -0.27878,
             :lkey  :single*other}
            {:level "Single lung and PF", :beta 0.34847, :lkey :single*pf}
            {:level "Single lung and CF", :beta 0.0, :lkey :single*cf}
            {:level "Single lung and COPD", :beta 0.0, :lkey :single*copd}
            {:level "Bilateral lung and Other",
             :beta  0.0,
             :lkey  :bilateral*other}
            {:level "Bilateral lung and PF", :beta 0.0, :lkey :bilateral*pf}
            {:level "Bilateral lung and CF", :beta 0.0, :lkey :bilateral*cf}
            {:level "Bilateral lung and COPD",
             :beta  0.0,
             :lkey  :bilateral*copd}],
   :min    nil,
   :max    nil,
   :step   nil}
  )

(defn tt-and-dgp
  "return the beta for a given disease group and centre interaction"
  [fmap fkey levels tt]
  (let [interaction (keyword (str (:tt fmap) "*" (lower-case (:d-gp fmap))))]
    ;(println "search for " interaction)
    ;(println levels)
    ;(println "found " (filter #(= (:lkey %) interaction) levels))
    [fkey (:beta (first (filter #(= (:lkey %) interaction) levels)))]))

(defn dgp-and-centre
  "return the beta for a given disease group and centre interaction"
  [fmap fkey levels centre]
  (let [interaction (str (upper-case (:d-gp fmap)) " and " centre)]
    ;(println "(dgp-and-centre interaction=" interaction ")=" (:beta (first (filter #(= (:level %) interaction) levels))))
    [fkey (:beta (first (filter #(= (:level %) interaction) levels)))]))


(defn beta-x-inspect
  [fmap fkey levels base-vars result ref]
  (let [x-x0 (- (fkey fmap) (fkey base-vars))]
    (reset! ref {:x         (js/parseFloat (fkey fmap))
                 :x0        (fkey base-vars)
                 :x-x0      x-x0
                 :beta      (when (not (zero? x-x0)) (/ (second result) x-x0))
                 :beta-x-x0 (second result)})))


(defn numeric-beta-x
  "Calculate beta * (x - x0). Can also populate an inspector ref for debug purposes."
  [fmap fkey levels base-vars & [ref]]
  (let [result [fkey (* (- (fkey fmap) (fkey base-vars)) (:beta (first levels)))]]
    (when ref
      (reset! ref (beta-x-inspect fmap fkey levels base-vars result nil)))
    result))

(comment
  (def levels (group-by :lkey [{:level "β1", :beta -0.04681, :lkey :beta1}
                               {:level "β2", :beta 0.00152, :lkey :beta2}
                               {:level "β3", :beta -0.00342, :lkey :beta3}]))


  (map (comp :beta first) ((juxt :beta1 :beta2 :beta3) levels))
  (map (comp :beta first) [(:beta1 levels) (:beta2 levels) (:beta3 levels)]))



(defn splined-beta-x
  [fmap fkey levels base-vars & [ref]]
  (let [betas (mapv (comp :beta first) ((juxt :beta1 :beta2 :beta3) (group-by :lkey levels)))
        ;_ (println fkey "betas" betas)
        result [fkey (spline* (betas 0) (betas 1) (betas 2) (fkey base-vars) (fkey fmap))]] ;; corrected 24/10
    (when ref
      (reset! ref (beta-x-inspect fmap fkey levels base-vars result ref)))
    result))


(defn collect-beta-xs
  ([tool-key fmap coefficients base-vars centre & [inspect-ref]]
   (let [bxs (into {} (mapv
                        (fn [cmap]
                          (let [fkey (:fkey cmap)
                                ref (when inspect-ref
                                      (rum/cursor-in inspect-ref [:factor fkey]))]
                            (cond
                              (= fkey :c.d-gp)
                              (dgp-and-centre fmap fkey (:levels cmap) centre)

                              (= fkey :tt.d-gp)
                              (tt-and-dgp fmap fkey (:levels cmap) (:tt fmap))

                              (= fkey :Re-spline)
                              (splined-beta-x fmap fkey (:levels cmap) base-vars nil)

                              (= fkey :fvc-reg)
                              (splined-beta-x fmap fkey (:levels cmap) base-vars nil)

                              ; ensure we don't trigger splines for sfl plots where it's not wanted
                              (and (#{:occ :occt :occr :occd} tool-key) (= fkey :age-at-R))
                              (splined-beta-x fmap fkey (:levels cmap) base-vars nil)

                              (> (count (:levels cmap)) 1)
                              [fkey (beta-for-level fkey (keyword (fkey fmap)) (:levels cmap))]

                              :else                         ; numeric value
                              (numeric-beta-x fmap fkey (:levels cmap) base-vars nil)
                              )))
                        (vals coefficients)))]
     (when inspect-ref
       (swap! inspect-ref assoc :bxs bxs))
     (apply + (vals bxs))
     )))


(defn survival
  "Survival(t) = Survival_0(t) ^ exp(Sum of the (beta_i * x_i))"
  [{:keys [survival_0 sum-betas t]}]
  (js/Math.pow (survival_0 t) (js/Math.exp sum-betas)))


(defn personalised-s
  "Adjust the time series s0 for personal factors and their coefficients and the treatment centre"
  [tool-key s0 fmap coefficients base-vars centre]
  (let [sum-betas (collect-beta-xs tool-key fmap coefficients base-vars centre)]
    ;(println "personalised-s fmap" fmap)
    ;(pprint fmap)
    ;(println "personalised-s" coefficients)
    ;(println "sum-betas" sum-betas)
    (map (fn [[t s0_t]] [t (* 100 (js/Math.pow s0_t (js/Math.exp sum-betas)))]) ; possible -beta * x here
         s0)
    )
  )

(defn personalised-s*
  "Adjust the time series s0 for personal factors and their coefficients and the treatment centre"
  [tool-key s0 fmap coefficients base-vars centre]
  (let [sum-betas (collect-beta-xs tool-key fmap coefficients base-vars centre)]
    (map (fn [[t s0_t]]
           [t (* 100 (js/Math.exp (* (- s0_t) (js/Math.exp sum-betas))))])
         s0)
    )
  )


(defn personalised-cifs
  "Adjust the time series s0 for personal factors and their coefficients and the treatment centre"
  ([tool-key h0 fmap coefficients base-vars centre]
   (let [sum-betas (collect-beta-xs tool-key fmap coefficients base-vars centre)]
     (map (fn [[t cif0-t]]
            [t (* 100 (- 1 (js/Math.pow (- 1 cif0-t) (js/Math.exp sum-betas))))])
          h0)))
  ([tool-key h0 fmap coefficients base-vars centre ref]

   ; collect intermediate results in ref
   (let [sum-betas (collect-beta-xs tool-key fmap coefficients base-vars centre (rum/cursor-in ref [:beta-xs]))
         [t cif0-t] (last h0)]
     (swap! ref assoc
            :sum-betas sum-betas
            :t {:yrs t :days (js/Math.round (* t 365.25))}
            :cif0 cif0-t
            :cif (- 1 (js/Math.pow (- 1 cif0-t) (js/Math.exp sum-betas)))
            ))

   (personalised-cifs tool-key h0 fmap coefficients base-vars centre)
   ))


(def tool-sub-key-map
  "Returns a key into the data table given the tool key and whether to look up base vars or coefficients"
  {:occt {:coefficients :occt-coefficients
          :base-vars    :occ-base-vars}
   :occr {:coefficients :occr-coefficients
          :base-vars    :occ-base-vars}
   :occd {:coefficients :occd-coefficients
          :base-vars    :occ-base-vars}
   :spt  {:coefficients :spt-coefficients
          :base-vars    :spt-base-vars}
   :sfl  {:coefficients :sfl-coefficients
          :base-vars    :sfl-base-vars}
   :occ  {:coefficients :occ-coefficients
          :base-vars    :occ-base-vars}
   })

(defn tool-sub-key [tool-key sub-key]
  (get-in tool-sub-key-map [tool-key sub-key]))

(comment
  (tool-sub-key :occd :coefficients)                        ;=> :occd-coefficients
  (tool-sub-key :spt :coefficients)                         ;=> :spt-coefficients
  (tool-sub-key :occ :coefficients)                         ;=> :occ-coefficients
  (tool-sub-key :occd :base-vars)                           ;=> :occ-base-vars
  (tool-sub-key :spt :base-vars)                            ;=> :spt-base-vars
  (tool-sub-key :occ :base-vars)                            ;=> :occ-base-vars
  )

(defn personalised-data
  [r tool-key data centre y-key]
  (let [fmap @(citrus/subscription r [:factor])
        coefficients @(citrus/subscription r [:pull-data :data (tool-sub-key tool-key :coefficients)])
        base-vars @(citrus/subscription r [:pull-data :data (tool-sub-key tool-key :base-vars)])]
    (personalised-s tool-key (map (juxt :years y-key) data)
                    fmap coefficients base-vars centre)))

(rum/defc survival-plots < rum/reactive
  ([r scaling data tool-key centre]
   survival-plots r scaling data tool-key centre :survival)
  ([r scaling data tool-key centre y-key]
   (let [fmap (rum/react (citrus/subscription r [:factor]))
         coefficients (rum/react (citrus/subscription r [:pull-data :data (tool-sub-key tool-key :coefficients)]))
         base-vars (rum/react (citrus/subscription r [:pull-data :data (tool-sub-key tool-key :base-vars)]))
         tool-style-key (fn [tool-key]
                          (condp = tool-key
                            :occt :cum-transplant
                            :occr :cum-removal
                            :occd :cum-death
                            tool-key))]
     [:g.area

      (area-plot (assoc scaling :point-series (personalised-s tool-key (map (juxt :years y-key) data)
                                                              fmap coefficients base-vars centre)
                                :class-name ((tool-style-key tool-key) styles)))

      ])))

(rum/defc cif-survival-plots < rum/reactive
  ([r scaling data tool-key centre]
   survival-plots r scaling data tool-key centre :survival)
  ([r scaling data tool-key centre y-key]
   (let [fmap (rum/react (citrus/subscription r [:factor]))
         coefficients (rum/react (citrus/subscription r [:pull-data :data (tool-sub-key tool-key :coefficients)]))
         base-vars (rum/react (citrus/subscription r [:pull-data :data (tool-sub-key :occ :base-vars)]))
         tool-style-key (fn [tool-key]
                          (condp = tool-key
                            :occt :cum-transplant
                            :occr :cum-removal
                            :occd :cum-death
                            tool-key))
         inspector (atom {})
         series (assoc scaling :point-series (personalised-cifs tool-key (map (juxt :years y-key) data)
                                               fmap coefficients base-vars centre (rum/cursor-in inspector [y-key]))
                               :class-name ((tool-style-key tool-key) styles))
         ;_ (do (println "single plot inspector" tool-key) (pprint @inspector))
         ]
     [:g.area

      (area-plot series)

      ])))


(defn s [n] (map (fn [t] [t (* n t)]) (range 10)))
(def ss (map (fn [k] (s k)) (range 4)))
(defn +s [s1 s2]
  (partition 2 (interleave (map first s1) (map + (map second s1) (map second s2)))))

(defn add-series [ss]
  (reduce +s ss))

(defn add-series* [series]
  (apply map (fn [i j] [i j])
         [(map first (nth series 0))
          (apply map (comp + second) (rest series))]))


(rum/defc cif-plots < rum/reactive
  ([r scaling data centre]
   (let [fmap (rum/react (citrus/subscription r [:factor]))
         base-vars (rum/react (citrus/subscription r [:pull-data :data (tool-sub-key :occ :base-vars)]))
         ;_ (do (println "data") (pprint (last data)))
         inspector (atom {})
         point-series (fn [tool-key y-key] (personalised-cifs
                                             :occ
                                             (map (juxt :years y-key) data)
                                             fmap
                                             (rum/react (citrus/subscription r [:pull-data :data (tool-sub-key tool-key :coefficients)]))
                                             base-vars
                                             centre
                                             (rum/cursor-in inspector [y-key])
                                             ))
         ; Calculate stacked series

         transplant-series (point-series :occt :cif-transplant)
         ;_ (println "transplants" (last transplant-series))

         removal-series (add-series [transplant-series (point-series :occr :cif-removal)])
         ;_ (println "removals" (last removal-series))

         death-series (add-series [removal-series (point-series :occd :cif-death)])
         ;_ (println "deaths" (last death-series))

         ;_ (do (println "calculation inspector") (pprint @inspector))
         ]

     [:g

      (area-plot (assoc scaling :point-series death-series
                                :class-name (:cum-death styles)))

      (area-plot (assoc scaling :point-series removal-series
                                :class-name (:cum-removal styles)))

      (area-plot (assoc scaling :point-series transplant-series
                                :class-name (:cum-transplant styles)))

      ])))



(defn get-label-from-svg-element
  [el i]
  (if (or (> i 4) (string? el))
    el
    (get-label-from-svg-element (-.innerHTML el) (inc i))))

(rum/defc centre-label < rum/reactive
  [r {:keys [text index]}]
  (let [centre (rum/react (citrus/subscription r [:factor :centre]))]
    (when (#{text "All"} centre)
      (let [index (if (= centre "All") index 0)]
        [:g {:class-name (str (:city-label styles) " " ((keyword (str (lower-case text) "-l")) styles))
             :transform  (str "translate (0," (* -45 index) ")")
             }
         [:rect {:width 165 :height 38}]
         [:text {:transform "translate(10, 11) scale (1, -1)"} text]])))
  )

(rum/defc survival-labels
  "Add overlays here"
  [r {:keys [x y]} tool-key]
  (let [X (i->o x)
        Y (i->o y)]
    [:g {:transform (str "translate(" (X 1400) "," (Y 90) ") scale (1,-1)")
         :opacity   0.6}
     (map-indexed
       #(rum/with-key (centre-label r {:text %2 :index %1}) %1)
       ["Birmingham"
        "Harefield"
        "Manchester"
        "Newcastle"
        "Papworth"])]))

;;;
;; Tool panels for :survival-from-listing and :post-transplant-baseline
;;;

(rum/defc factor-selects < rum/reactive
  "Insert factor widgets "
  [r coefficients-key path]
  (println "coefficients path" path)
  (let [m (rum/react (citrus/subscription r path))]
    ;(println "m" m)
    [:form.form-horizontal
     (map
       (fn [[fkey fmap]]

         (println "fmap" fmap (count (:levels fmap)))
         (cond
           ; these betas are derived from a combination of two other fkeys, so we don't ask for the factor
           (#{:c.d-gp :tt.d-gp} fkey)
           nil

           (= fkey :Re-spline)
           (rum/with-key (numeric-input r fmap) fkey)

           (= fkey :fvc-reg)
           (rum/with-key (numeric-input r (assoc fmap :step 0.1)) fkey)

           (= fkey :age-at-R)
           (rum/with-key (numeric-input r fmap) fkey)

           (and
             (> (count (:levels fmap)) 1)
             (not= fkey :c.d-gp))
           (rum/with-key (level-selector r fmap) fkey)

           :else
           (rum/with-key (numeric-input r fmap) fkey))
         )
       m)]))


(defn input-panel
  ([r tool-key]
   (input-panel r tool-key true))
  ([r tool-key factors?]
   [:section
    [:h2 "Factors"]
    (centre-select r)
    (when factors?
      (let [coefficients-key (tool-sub-key tool-key :coefficients)]
        (println "coefficients key" coefficients-key)
        (factor-selects r coefficients-key [:pull-data :data coefficients-key])))]))

(comment

  @(citrus/subscription r [:pull-data :data :occt-coefficients])
  {:sex {:factor "Sex",
         :fkey   :sex,
         :levels [{:level "Male", :beta 0, :lkey :m}
                  {:level "Female", :beta -0.05676, :lkey :f}],
         :min    nil, :max nil, :step nil},
   :age {:factor "Age (years)", :fkey :age, :levels [{:level "18 - 29 ", :beta 0.60291, :lkey :u-30} {:level "30 - 39", :beta 0.46933, :lkey :u-40} {:level "40 - 49", :beta 0.25032, :lkey :u-50} {:level "50-59", :beta 0, :lkey :u-60} {:level "60 - 69", :beta -0.29638, :lkey :u-70} {:level "70 +", :beta -0.77987, :lkey :over-70}], :min nil, :max nil, :step nil}, :eth-gp {:factor "Ethnicity", :fkey :eth-gp, :levels [{:level "White", :beta 0, :lkey :w} {:level "Black", :beta 0.48635, :lkey :black} {:level "Asian", :beta -0.01578, :lkey :asian} {:level "Other", :beta 1.1245, :lkey :other}], :min nil, :max nil, :step nil}, :bl-gp {:factor "Blood group", :fkey :bl-gp, :levels [{:level "O", :beta 0, :lkey :o} {:level "A", :beta 0.48635, :lkey :a} {:level "B", :beta -0.01578, :lkey :b} {:level "AB", :beta 1.1245, :lkey :ab} {:level "Easy (match score 1-3)", :beta 0, :lkey :easy} {:level "Moderate (match score 4-6)", :beta -0.20778, :lkey :moderate} {:level "Difficult (match score 7-10)", :beta -0.73632, :lkey :difficult} {:level "First kidney transplant", :beta 0, :lkey :first-transplant} {:level "Re-graft", :beta -0.33265, :lkey :re-graft} {:level "Yes", :beta 0, :lkey :yes} {:level "No", :beta 0.27211, :lkey :no} {:level "No", :beta 0, :lkey :no} {:level "Yes", :beta -0.67073, :lkey :yes} {:level "No", :beta 0, :lkey :no} {:level "Yes", :beta -0.33396, :lkey :yes}], :min nil, :max nil, :step nil}}


  [{:level "O", :beta 0, :lkey :o}
   {:level "A", :beta 0.48635, :lkey :a}
   {:level "B", :beta -0.01578, :lkey :b}
   {:level "AB", :beta 1.1245, :lkey :ab}
   {:level "Easy (match score 1-3)", :beta 0, :lkey :easy}
   {:level "Moderate (match score 4-6)", :beta -0.20778, :lkey :moderate}
   {:level "Difficult (match score 7-10)", :beta -0.73632, :lkey :difficult}
   {:level "First kidney transplant", :beta 0, :lkey :first-transplant}
   {:level "Re-graft", :beta -0.33265, :lkey :re-graft}
   {:level "Yes", :beta 0, :lkey :yes}
   {:level "No", :beta 0.27211, :lkey :no}
   {:level "No", :beta 0, :lkey :no}
   {:level "Yes", :beta -0.67073, :lkey :yes}
   {:level "No", :beta 0, :lkey :no}
   {:level "Yes", :beta -0.33396, :lkey :yes}]),

(defn tool-panel-cursor
  [r path]
  (citrus/subscription r path))

(rum/defc tool-panel < rum/reactive
  ([r path]
   (tool-panel r path {:y-key :survival}))
  ([r path {:keys [y-key styles factors]}]
   (let [tool-key (last path)]
     ;(println "tool-key" tool-key "path" path)
     (when (rum/react (loaded r))
       (let [centre (rum/react (factor r :centre))
             data (->> (rum/react (tool-panel-cursor r path))
                       (filter #(= centre (:centre %))))
             x-max (:days (last data))

             ;; Define graph scaling
             scaling (space {:outer    {:width 1000 :height 800}
                             :margin   {:top 30 :right 30 :bottom 30 :left 30}
                             :padding  {:top 100 :right 100 :bottom 100 :left 100}
                             :x-domain [0 (day->years x-max)]
                             :y-domain [0 100]
                             :x-ticks  5
                             :y-ticks  10})

             plots #(survival-plots r scaling data tool-key centre y-key)

             labels #(survival-labels r scaling tool-key)

             ;_ (println "y-key" y-key)

             labelled-plot (assoc (condp = tool-key
                                    :sfl
                                    {:title       "Survival from listing"
                                     :x-title     "Years from listing"
                                     :y-title     "People surviving"
                                     :input-panel (input-panel r :sfl)}

                                    :spt
                                    {:title       "Survival post transplant"
                                     :x-title     "Years from transplant"
                                     :y-title     "People surviving a transplant"
                                     :input-panel (input-panel r :spt)}

                                    :occ (assoc (condp = y-key
                                                  :cif-transplant {:title   "Time to transplant"
                                                                   :x-title "Years from listing"
                                                                   :y-title "People receiving a transplant"
                                                                   }
                                                  :cif-removal {:title   "Removed from list"
                                                                :x-title "Years from listing"
                                                                :y-title "Removed from list"}
                                                  :cif-death {:title   "People who died"
                                                              :x-title "Years from listing"
                                                              :y-title "Died"})
                                           :input-panel (input-panel r :occ))
                                    )
                             :plots plots
                             :placed-labels labels)

             ]
         [:.row
          [:.col-sm-offset-0.col-sm-12.col-md-offset-1.col-md-10.col-lg-offset-1.col-lg-9
           [:.row
            [:.col-sm-7.col-md-7.col-lg-8
             [:h2 (:title labelled-plot)]
             (chart-area (merge (assoc scaling :styles styles) labelled-plot))]

            [:.col-sm-5.col-md-5.col-lg-4
             (:input-panel labelled-plot)]]]]

         )))))

(rum/defc style-calculated
  [mm]
  [:span {:class-name (:number-in-text styles)} mm])



(rum/defc plot-cifs < rum/reactive
                      "Can you be more specific - the CIF model"
  [r path]
  ;(println "path = " path)
  (let [;; Define graph scaling
        centre (rum/react (factor r :centre))
        data (->> (rum/react (citrus/subscription r path))
                  (filter #(= centre (:centre %))))
        x-max (:years (last data))
        transplant-max (:cif-transplant (last data))
        scaling (space {:outer    {:width 1000 :height 800}
                        :margin   {:top 30 :right 30 :bottom 30 :left 30}
                        :padding  {:top 100 :right 100 :bottom 100 :left 100}
                        :x-domain [0 x-max]
                        :y-domain [0 100]
                        :x-ticks  5
                        :y-ticks  10})
        cifs (assoc scaling :x-title "Years from listing"
                            :y-title "People"
                            :plots #(cif-plots r scaling data centre))
        ;_ (println "cif plots" ((:plots cifs)))

        cif-transplants (assoc scaling :x-title "Years from listing"
                                       :y-title "People"
                                       :plots #(cif-survival-plots r scaling data :occt centre :cif-transplant)
                                       :placed-labels nil)

        transplants-data (personalised-data r :occt data centre :cif-transplant)
        ;_ (println "cif-transplants " transplants-data)

        max-transplants (last (last transplants-data))
        half-transplants (/ max-transplants 2)
        median (first (filter (fn [[t v]] (>= v half-transplants)) transplants-data))
        median-month (js/Math.round (* 12 (first median)))
        ;_ (println "median point" median)


        cif-removals (assoc scaling :x-title "Years from listing"
                                    :y-title "People"
                                    :plots #(cif-survival-plots r scaling data :occr centre :cif-removal)
                                    :placed-labels nil)

        cif-deaths (assoc scaling :x-title "Years from listing"
                                  :y-title "People"
                                  :plots #(cif-survival-plots r scaling data :occd centre :cif-death)
                                  :placed-labels nil)

        ]
    [:.row
     [:.col-sm-offset-1.col-sm-10.col-md-offset-1.col-md-10.col-lg-offset-1.col-lg-6
      [:h2 "Can you be more specific?"]

      [:p "We can be more specific. The tool asks for some factors that are likely to affect
      outcomes, and then adjusts for them. It does this by calculating the likely transplant outcomes for patients who
      had similar characteristics using data collected by NHSBT."]
      [:p "The model can not know everything that may be relevant about an individual patient. It asks only for details
      that have been found to affect the outcomes significantly and for which good data is available."]


      #_(println "cif data" (map (juxt :years
                                       (comp
                                         #(* % 100)
                                         :cif-transplant)) data))]

     [:.col-xs-12
      ;(println "(:class-name cif-transplants)" (:class-name cif-transplants))

      [:.row
       [:.col-sm-offset-0.col-sm-12.col-md-offset-1.col-md-10.col-lg-offset-1.col-lg-8
        [:.row
         [:.col-sm-7.col-md-7.col-lg-8
          [:h2 (:title "Cifs")]
          (chart-area cifs)

          [:.row
           [:.col-xs-4
            [:h6 "Time to transplant"]
            (chart-area cif-transplants)]

           [:.col-xs-4
            [:h6 "Removals"]
            (chart-area cif-removals)]

           [:.col-xs-4
            [:h6 "Deaths"]
            (chart-area cif-deaths)]]
          ]

         [:.col-sm-5.col-md-5.col-lg-4
          (input-panel r :occt)]]

        ]]]




     [:.col-sm-offset-1.col-sm-10.col-md-offset-1.col-md-10.col-lg-offset-1.col-lg-6
      [:h3 "How many people like me eventually receive a transplant?"]
      [:.alert.alert-danger
       [:p "Well it's about " (style-calculated (js/Math.round max-transplants)) " people out of a notional 100, but I'm really not sure how
       we should interpret the vertical axis yet."]
       ]

      [:h3 "When might I receive a transplant?"]
      [:.alert.alert-danger [:p "This is also tricky. We could say something like 'About half the people with these factors who eventually get a transplant, receive it after waiting " (style-calculated median-month) " months or less. "]
       [:p "The only factor that affects this time is the choice of transplant centre."]]]]
    )
  )


;;;
;; Tool sections
;;;

(defmulti render-tool (comp int js/parseInt))


(defmethod render-tool 0 [_ r]
  (plot-competing r))

(defmethod render-tool 1 [_ r]
  (plot-cifs r [:pull-data :data :occ]))

(defmethod render-tool 2 [_ r]
  (tool-panel r [:pull-data :data :spt]))

(defmethod render-tool 3 [_ r]
  (tool-panel r [:pull-data :data :sfl]))


(defmethod render-tool :default [id]
  [:h2 "No match" (pr-str id)])


(rum/defc tool-menu < rum/reactive [id r]
  (let [lung? (= "lung" (rum/react (citrus/subscription r [:pull-data :organ-cfg :name])))]
    [:ul.nav.nav-pills {:style {:margin-top 15}}
     (when lung? [:li {:class-name (when (nil? id) "active")} [:a {:href "#/tools"} "What may happen and when?"]])
     [:li {:class-name (when (= id "1") "active")} [:a {:href "#/tools/1"} "Can you be more specific?"]]
     (when lung? [:li {:class-name (when (= id "2") "active")} [:a {:href "#/tools/2"} "Survival post transplant"]])
     (when lung? [:li {:class-name (when (= id "3") "active")} [:a {:href "#/tools/3"} "Survival from listing"]])
     ]))


(rum/defc Tools < rum/reactive
  [r route {id :id}]
  (if (rum/react (loaded r))
    [:div
     (tool-menu id r)
     (render-tool id r)]
    [:div "Loading"]))

