(ns kcp.results
  (:require [clojure.string :as str]
            [kcp.bundles :as bun]
            ["react-bootstrap" :as bs]
            [kcp.events :as events]
            [kcp.factors :as fac]
            [kcp.fullscreen :as fs]
            [kcp.model :as model]
            [kcp.pkm-model :as pkm]
            [kcp.rgb :as rgb]
            [kcp.shortener :as shorts]
            [kcp.subs :as subs]
            [kcp.ui :as ui]
            [kcp.utils :as utils]
            [kcp.vis2 :as vis]
            [re-frame.core :as rf]
            [reagent.core :as r]
            [shadow.debug :refer [?-> ?> locals]]
            ))

(defn full-screen-overlay-button
  "add full screen overlay button"
  [options]
  [:div {:style {:z-index          500
                 :background-color "#fec2"
                 :padding          0
                 :position         "absolute"
                 :right            10
                 :bottom           -14}}
   [fs/full-screen-wrapper options]])

(defn create-pkm-context
  "PREDICT Kidney competing-risks model"
  [{:keys [plot-order bundle inputs]}]
  (let [sample-days pkm/sample-days
        base-outcome-keys (vec (remove #{:residual} plot-order))
        {:keys [F risk-group]} (pkm/compute-F inputs
                                              (:pkm-baseline-hazards-rcc bundle)
                                              (:pkm-baseline-hazards-mort bundle))
        fs-by-year (model/S0-for-days F sample-days)
        fs-by-year-in-plot-order (vis/fs-time-series base-outcome-keys plot-order fs-by-year)]
    {:risk-group               risk-group
     :base-outcome-keys        base-outcome-keys
     :sample-days              sample-days
     :F                        F
     :fs-by-year-in-plot-order fs-by-year-in-plot-order}))

(defn create-ld-survival-context
  [{:keys [base-outcome-keys bundle inputs outcomes outcome-keys total-score] :as context}]
  (let [sample-days (range 0 121 12)
        baseline-cifs (:baseline-cifs bundle)
        mortality-data (utils/reformat-mortality-data (utils/filter-parallel-data
                                                        (:ldsurvival-competing-mortality bundle)
                                                        {"Age" (js/parseInt (get-in inputs [:age-at-surgery])),
                                                         "Sex" (if (= (get-in inputs [:sex]) :Male) "M" "F")}))
        beta-keys (fac/prefix-outcomes-keys "beta" outcomes)
        s0 (map (fn [bc] [(:days bc)
                          ((apply juxt outcome-keys) bc)]) baseline-cifs)
        s0 (utils/filter-by-timestamps (set sample-days) s0)
        sum-betas (map #(fac/sum-beta-xs context %) beta-keys)
        F (utils/normalize-vectors (utils/merge-vectors (model/cox-only s0 sum-betas) mortality-data))
        fs-by-year (map (fn [day] (model/S0-for-day F day)) sample-days)
        fs-by-year-in-plot-order (vis/fs-time-series base-outcome-keys (:plot-order context) fs-by-year)]
    {:inline-score             true
     :risk-group               (cond
                                 (<= total-score 2) :low
                                 (>= total-score 6) :high
                                 :else :intermediate)
     :sample-days              sample-days
     :F                        F
     :fs-by-year-in-plot-order fs-by-year-in-plot-order
     }))

(defn create-visualization-context
  "Creates a bundle of context used in all visualizations"
  [{:keys [organ centre tool selected-vis]}]
  (let [day @(rf/subscribe [::subs/test-day])
        {:keys [fmaps outcome-keys base-outcome-keys outcomes] :as bundle}
        (bun/get-bundle organ centre tool)
        inputs @(rf/subscribe [::subs/inputs])
        mdata @(rf/subscribe [::subs/mdata])
        tool-mdata (get-in mdata [organ :tools tool])
        show-results @(rf/subscribe [::subs/show-results])


        total-score (+
                      (get-in fmaps [:t-stage :levels (get-in inputs [:t-stage]) :score])
                      (get-in fmaps [:n-stage :levels (get-in inputs [:n-stage]) :score])
                      (get-in fmaps [:tumor-size :levels (get-in inputs [:tumor-size]) :score])
                      (get-in fmaps [:nuclear-grade :levels (get-in inputs [:nuclear-grade]) :score])
                      (get-in fmaps [:histologic-tumor-necrosis :levels (get-in inputs [:histologic-tumor-necrosis]) :score]))

        context {:organ             organ
                 :centre            centre
                 :tool              tool
                 :mdata             mdata
                 :tool-mdata        tool-mdata
                 :data-styles       (get tool-mdata :outcomes)
                 :day               day
                 :bundle            bundle
                 :fmaps             fmaps
                 :outcomes          outcomes
                 :outcome-keys      outcome-keys
                 :base-outcome-keys base-outcome-keys
                 :cohort-dates      @(rf/subscribe [::subs/cohort-dates])
                 :inputs            inputs
                 :selected-vis      selected-vis
                 :total-score       total-score
                 :leibovich-score   (str "Leibovich Score " total-score " out of 11")
                 :plot-order        (:plot-order tool-mdata)
                 :label-order       (:label-order tool-mdata)
                 :hidden-labels     #{}}

        inputs (:inputs context)
        required-inputs (keys (:fmaps context))
        fulfilled-inputs (select-keys inputs required-inputs)
        missing (< (count fulfilled-inputs) (count required-inputs))
        unknowns (some #(= (get inputs %) :unknown) required-inputs)
        overlay (if missing :missing (if unknowns :unknowns (if show-results nil :hide-results)))
        context (assoc context :input-state
                               {:inputs           inputs
                                :required-inputs  required-inputs
                                :fulfilled-inputs fulfilled-inputs
                                :missing          missing
                                :unknowns         unknowns
                                :overlay          overlay})

        context-extension (case tool
                            :pkm (create-pkm-context context)
                            :ldsurvival (create-ld-survival-context context)
                            {})]
    (merge context context-extension)))


(defn results-panel
  "Display results.
   TODO: REMOVE HARD_CODED TOOL KEYWORDS AND TEXTS"
  [{:keys [vis-context bare centre-info]} {:keys [print-only]}]
  (let [
        mdata @(rf/subscribe [::subs/mdata])
        {:keys [inputs fulfilled-inputs missing overlay]} (:input-state vis-context)
        is-full-screen @(rf/subscribe [::subs/is-full-screen])]

    (when (:F vis-context)
      [:<>
       (rf/dispatch [::events/missing-inputs missing])

       (if bare
         [:<>
          [:p
           "Run model from URI and return result as EDN"]
          [:div [vis/test-gen (assoc vis-context
                                :fulfilled-inputs fulfilled-inputs
                                :centre-info centre-info)]]]
         [:<>
          [:div {:style {:background-color "#fff"
                         :border           (str "3px solid " (condp = overlay
                                                               :missing "rgb(255,0,0)"
                                                               :unknowns "teal"
                                                               :hide-results "#CCC"
                                                               nil "#CCC"))
                         :border-radius    5
                         :margin-top       30
                         :margin-bottom    20
                         :padding          "20px 5px 5px 15px"
                         :position         "relative"}}
           (condp = overlay
             :hide-results [:div {:style {:z-index          500
                                          :background-color rgb/theme
                                          :padding          0
                                          :position         "absolute"
                                          :top              0
                                          :right            0
                                          :bottom           0
                                          :left             0
                                          :display          "flex"
                                          :align-items      "center"
                                          :justify-content  "center"}}

                            [:> bs/Button {:size     "lg"
                                           :variant  "secondary"
                                           :on-click #(rf/dispatch [::events/show-results])}
                             "Show results"]]
             :missing [:<>
                       [:div {:style {:z-index          1000
                                      :color            "rgb(255,0,0)"
                                      :border           "3px solid rgb(255,0,0)"
                                      :border-radius    5
                                      :background-color "#fff"
                                      :padding          "2px 5px"
                                      :position         "absolute"
                                      :top              "-20px"
                                      :right            "20px"}}
                        "Warning: some inputs are missing"]
                       [:div {:style {:z-index          500
                                      :background-color rgb/theme
                                      :padding          0
                                      :position         "absolute"
                                      :top              0
                                      :right            0
                                      :bottom           0
                                      :left             0
                                      :display          "flex"
                                      :align-items      "center"
                                      :justify-content  "center"}}
                        [:h2 {:flex  "auto"
                              :style {:color      "#fff"
                                      :text-align "center"
                                      :width      400}}
                         "Results will appear here once all inputs have been entered."]]]
             :unknowns [:<>
                        [:div.no-printed-border.to-left {:style {:z-index          1000
                                                                 :color            "teal"
                                                                 :border           "3px solid teal"
                                                                 :border-radius    5
                                                                 :background-color "#fec"
                                                                 :padding          "2px 5px"
                                                                 :position         "absolute"
                                                                 :top              "-20px"
                                                                 :right            "20px"}}
                         "Average values were used for some inputs"]
                        [:div {:style {:z-index          500
                                       :background-color "#fec2"
                                       :padding          0
                                       :position         "relative" #_"absolute"
                                       :pointer-events   "none" ; to allow click through
                                       :top              0
                                       :right            0
                                       :bottom           0
                                       :left             0}}]
                        [full-screen-overlay-button vis-context]]
             nil [full-screen-overlay-button vis-context])

           ;; Place test-data near top for etaoin bababshka-pod


           [:section {:style {:margin    (if is-full-screen "10%" "0")
                              :max-width (if is-full-screen "80%" "100%")
                              :display   "flex"
                              :flex-direction "column"}}
            (let [risk-group (:risk-group vis-context)
                  score (:leibovich-score vis-context)
                  risk-text (cond
                              (= risk-group :low) "Low Risk"
                              (= risk-group :high) "High Risk"
                              :default "Intermediate Risk")
                  color (cond
                          (= risk-group :low) "#ff9933"
                          (= risk-group :high) "#ff4000"
                          :default "#ff751a")
                  score-text score]
              [:<>
               [:h5 {:style {:color color}} risk-text]
               [:h5 {:style {:color color :order (if (= (:tool vis-context) :pkm) 5 "")}} score-text]])

            [ui/tabs {:variant    "pills" :default-active-key (:selected-vis vis-context)
                      :active-key (:selected-vis vis-context)
                      :on-select  #(rf/dispatch [::events/navigate :kcp.views/organ-centre-tool-tab-inputs
                                                 (assoc vis-context
                                                   :tab %
                                                   :inputs (shorts/db-to-URI (:lookups mdata) inputs))])}

             [ui/tab {:event-key "icons" :title "Icon Array"}
              [vis/icon-array vis-context]]

             [ui/tab {:event-key "bars" :title "Bar Chart"}
              [vis/bar-chart vis-context]]

             [ui/tab {:event-key "area" :title "Area Chart"}
              [vis/area-chart vis-context {:slimline false}]]

             [ui/tab {:event-key "table" :title "Table"}
              [:div {:style {:font-size (if is-full-screen "300%" "100%")}}
               [vis/table vis-context]]]

             [ui/tab {:event-key "text" :title "Text"}
              [:div {:style {:font-size (if is-full-screen "200%" "100%")}}
               [vis/text vis-context]]]

             ;; we normally don't want the test tab to be displayed
             #_[ui/tab {:event-key "test" :title "Test"}
                [:div {:style {:font-size (if is-full-screen "200%" "100%")}}
                 [vis/test-gen vis-context]]]]]]])])))
