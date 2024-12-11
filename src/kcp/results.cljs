(ns kcp.results
  (:require [kcp.bundles :as bun]
            [kcp.events :as events]
            [kcp.factors :as fac]
            [kcp.fullscreen :as fs]
            [kcp.model :as model]
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

(defn create-visualization-context
  "Creates a bundle of context used in all visualizations"
  [{:keys [organ centre tool selected-vis]}]
  (let [day @(rf/subscribe [::subs/test-day])
        {:keys [fmaps outcome-keys
                base-outcome-keys timed-outcome-keys beta-keys outcomes S0 all-S0]
         :as   bundle} (bun/get-bundle organ centre tool)
        inputs @(rf/subscribe [::subs/inputs])
        mdata @(rf/subscribe [::subs/mdata])
        tool-mdata (get-in mdata [organ :tools tool])
        mortality-data (utils/reformat-mortality-data (utils/filter-parallel-data
                                                        (:ldsurvival-competing-mortality bundle)
                                                        {"Age" (js/parseInt (get-in inputs [:age-at-surgery])),
                                                         "Sex" (if (= (get-in inputs [:sex]) :Male) "M" "F")}))

        sample-days (range 0 121 12)
        S0 (utils/filter-by-timestamps (set sample-days) S0)
        all-S0 (utils/filter-by-timestamps (set sample-days) all-S0)

        context {:organ              organ
                 :centre             centre
                 :tool               tool
                 :mdata              mdata
                 :tool-mdata         tool-mdata
                 :data-styles        (get tool-mdata :outcomes)
                 :day                day
                 :bundle             bundle
                 :fmaps              fmaps
                 :S0                 S0
                 :all-S0             all-S0
                 :outcomes           outcomes
                 :outcome-keys       outcome-keys
                 :base-outcome-keys  base-outcome-keys
                 :timed-outcome-keys timed-outcome-keys
                 :beta-keys          beta-keys
                 :cohort-dates       @(rf/subscribe [::subs/cohort-dates])
                 :inputs             inputs
                 :selected-vis       selected-vis
                 :total-score        (+
                                       (get-in fmaps [:t-stage :levels (get-in inputs [:t-stage]) :score])
                                       (get-in fmaps [:n-stage :levels (get-in inputs [:n-stage]) :score])
                                       (get-in fmaps [:tumor-size :levels (get-in inputs [:tumor-size]) :score])
                                       (get-in fmaps [:nuclear-grade :levels (get-in inputs [:nuclear-grade]) :score])
                                       (get-in fmaps [:histologic-tumor-necrosis :levels (get-in inputs [:histologic-tumor-necrosis]) :score]))
                 :plot-order         (:plot-order (get-in mdata [organ :tools tool]))
                 :label-order        (:label-order (get-in mdata [organ :tools tool]))
                 }


        inputs (:inputs context)
        required-inputs (keys (:fmaps context))
        fulfilled-inputs (select-keys inputs required-inputs)
        missing (< (count fulfilled-inputs) (count required-inputs))
        unknowns (some #(= (get inputs %) :unknown) required-inputs)
        overlay (if missing :missing (if unknowns :unknowns nil))
        context (assoc context :input-state
                               {:inputs           inputs
                                :required-inputs  required-inputs
                                :fulfilled-inputs fulfilled-inputs
                                :missing          missing
                                :unknowns         unknowns
                                :overlay          overlay})

        ;; We use all of S0 till it gets to be too slow. May need to query tool and vis here.
        ;; Switching s0 is enough
        s0 all-S0
        s0-for-day (model/S0-for-day s0 day)
        sum-betas (map #(fac/sum-beta-xs context %) beta-keys)
        F (utils/normalize-vectors (utils/merge-vectors (model/cox-only s0 sum-betas) mortality-data))
        sample-days sample-days
        fs-by-year (map (fn [day] (model/S0-for-day F day)) sample-days)
        fs-by-year-in-plot-order (vis/fs-time-series base-outcome-keys (:plot-order context) fs-by-year)

        context (conj context
                      [:sum-betas sum-betas]
                      [:s0 s0]
                      [:s0-for-day s0-for-day]
                      [:F F]
                      [:fs-by-year-in-plot-order fs-by-year-in-plot-order])]
    context))




(defn results-panel
  "Display results.
   TODO: REMOVE HARD_CODED TOOL KEYWORDS AND TEXTS"
  [{:keys [vis-context bare centre-info]} {:keys [print-only]}]
  (let [
        mdata @(rf/subscribe [::subs/mdata])
        {:keys [inputs fulfilled-inputs missing overlay]} (:input-state vis-context)
        total-score (:total-score vis-context)
        is-full-screen @(rf/subscribe [::subs/is-full-screen])]

    (when (:S0 vis-context)
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
                                                               nil "#CCC"))
                         :border-radius    5
                         :margin-top       30
                         :margin-bottom    20
                         :padding          "20px 5px 5px 15px"
                         :position         "relative"}}
           (condp = overlay
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
                              :display   (when (= (:selected-vis vis-context) "test") "none")}}
            [:h1 (cond
                   (<= total-score 2) [:div {:style {:color "#ff9933"}}
                                       [:h5 "Low Risk"]
                                       [:h5 (str "Leibovich Score: " total-score " out of 11")]]
                   (>= total-score 6) [:div {:style {:color "#ff4000"}}
                                       [:h5 "High Risk"]
                                       [:h5 (str "Leibovich Score: " total-score " out of 11")]]
                   :default [:div {:style {:color "#ff751a"}}
                             [:h5 "Intermediate Risk"]
                             [:h5 (str "Leibovich Score: " total-score " out of 11")]])]

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
