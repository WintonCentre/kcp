(ns kcp.widgets
  (:require [re-frame.core :as rf]
            [clojure.edn :as edn]
            ["react-bootstrap" :as bs]
            [kcp.utils :as utils]
            [kcp.bsio :as bsio]
            [kcp.subs :as subs]
            [kcp.events :as events]
            [kcp.numeric-input :as num]
            [kcp.copy-image :as snap]
            [clojure.string :as str]
            ))

(defn key->id
  "Convert a namespaced factor key to an id"
  [k]
  (if k (str (namespace k) "-" (name k)) nil))

(defn bad-widget-type [msg]
  (js/console.log "Bad widget type" msg))

(defmulti widget
          "Create a widget component of a given type.
           The first argument is the widget map, and the value of its :type slot determines the
           widget type. If it's a keyword, dispatch on that. If it's a string, read it into a map and dispatch on that map's :type.
           This allows us to add parameters to the widget inside the type column in the spreadsheet."
          ;:type
          (fn [m]
            (if (keyword? (:type m))
              (:type m)
              (try
                (let [ms (edn/read-string (:type m))]
                  (if (and (map? ms) (= (:type ms) :numeric))
                    :numeric
                    (do
                      (bad-widget-type ":type :numeric should be like {:type :numeric :dps 0 :min 0 :max 100}")
                      (js/console.log "culprit is: " (pr-str m))
                      :unsupported)))
                (catch :default _e
                  (bad-widget-type "Invalid type")
                  :unsupported))))
          :default :unsupported)

(comment
  (map? nil)
  (edn/read-string "{:a 1}")
  (nil? (edn/read-string "{:a}"))
  )

; Create a radio-button-group widget given a widget inputs map - for example:
(comment
  (def widget-inputs-map
    "Example of a widget-inputs-map"
    {:factor-key :kidney/sex
     :levels     [{:level      :male
                   :level-name "Male"}
                  {:level      :female
                   :level-name "Female"}]
     :default    :male
     :optional   :no
     :type       :radio}))

; factors with a nil type field have no widget
(defmethod widget nil [_]
  nil)

(def mb 0)
(def label-width "label column grid-size" 6)
(def widget-width "Widget column grid-size" 6)

(defn hide-handler
  "Hide a modal"
  [_e]
  (rf/dispatch [::events/modal-data nil]))

(defn close-modal-and-print
  "delay the print dialog so it doesn't screen capture this modal when printing.
  todo: Is there a better event we can hang the js/print on? "
  [_e]
  (hide-handler _e)
  (js/setTimeout js/print, 200))

(defn show-canvas-modal
  "Pop up a large modal ready to display the canvas on it"
  [canvas]
  ;(.getContext canvas "2d")
  (goog.object.set canvas "style" "max-width: 90%; margin-left: 5%")

  (rf/dispatch [::events/modal-data
                {:show    true
                 :title   nil
                 :content [:div {:id    "snap"
                                 :style {:margin-bottom 15
                                         :text-align    "center"
                                         :font-size     "120%"}}
                           [:b [:i "Use the context menu (try right-click or control-click on the image below) to copy or save"]]]
                 :paste   (partial snap/show-screen-shot canvas)
                 :cancel  hide-handler
                 :on-hide hide-handler
                 :ok      hide-handler}]))

(defn close-modal-and-copy
  "Close the print dialog and throw ip a screenshot."
  [_e]
  (hide-handler _e)
  (js/setTimeout (fn [_e]
                   (snap/take-screen-shot
                     {:from-element (js/document.querySelector "#capture")
                      :done         show-canvas-modal})) 200))

(defn print-modal-content
  "What to say in the print modal"
  []
  (let [URI (.-href js/document.location)]
    [:<>
     [:section {:class-name "print-modal"}

      [:h1 "Print"]
      [:p {:style {:margin-bottom 0}} "Press " [:> bs/Button {:variant "primary" :on-click close-modal-and-print
                                                              :style   {:margin-right 5}}
                                                "Print"] #_[:b "Print"] "and the browser print dialogue box will appear. For best results, "
       [:b "do not"] " enable"]
      [:ul
       [:li "the print background graphics option"]
       [:li "the print headers and footers option (Safari)."]]
      [:h1 "Copy"]
      [:p "The " [:> bs/Button {:variant "primary" :on-click close-modal-and-copy
                                :style   {:margin-right 5}}
                  "Copy"] #_[:b "Copy"] " button displays a small screenshot which can be
         saved, copied to the clipboard, or printed using the usual browser controls. The copied image will be full browser window size so you may wish to adjust this for
         best results."]
      [:p "The copy feature does not work well in Internet Explorer."]
      [:h1 "Save to PDF"]
      [:p "If you prefer a PDF, press " [:> bs/Button {:variant "primary" :on-click close-modal-and-print
                                                       :style   {:margin-right 5}}
                                         "Print"] " and select \"Save to PDF\" in the browser print dialogue."]]]))





(defn print-or-save-modal
  "Main Print, Copy or Save modal popup"
  [_e]
  (rf/dispatch [::events/modal-data
                {:show    true
                 :width   "700px"
                 :title   "Print, Copy or Save to PDF"
                 :content (print-modal-content)
                 ; :ok hide-handler
                 :print   close-modal-and-print
                 #_(fn [_e]
                     (hide-handler _e)
                     ; delay the print dialog so it doesn't screen capture this modal.
                     ; todo: Is there a better event we can hang the js/print on?
                     (js/setTimeout js/print, 200))
                 :copy    close-modal-and-copy
                 #_(fn [_e]
                     ; Add screen capture logic here
                     (hide-handler _e)
                     (js/setTimeout (fn [_e]
                                      (snap/take-screen-shot
                                        {:from-element (js/document.querySelector "#capture")
                                         :done         show-canvas-modal})) 200))
                 :on-hide hide-handler}]))



(defn additional-details-form
  "A form for collecting additional information which can be used in the printout."
  []
  (let [additional-details @(rf/subscribe [::subs/additional-details])]
    [:<>
     [:section {:class-name "additional-info-modal"}

      [:h3 "Additional Information"]
      [:p "All of the following inputs are optional."]
      [:p "Your personal data will not be stored by this website."]

      [:h4 "Patient Details"]
      [:div {:class-name "form-group"}
       [:label {:for "patient-name"} "Name"]
       [:input {:type          "text"
                :class-name    "form-control"
                :id            "patient-name"
                :auto-complete "off"
                :value         (get additional-details :patient-name "")
                :on-change     #(rf/dispatch [:kcp.events/update-additional-details
                                              {:patient-name (-> % .-target .-value)}])}]]

      [:div {:class-name "form-group"}
       [:label {:for "nhs-number"} "NHS Number"]
       [:input {:type         "text" :class-name "form-control"
                :id           "nhs-number"
                :autoComplete "off"
                :value        (get additional-details :nhs-number "")
                :on-change    #(rf/dispatch [:kcp.events/update-additional-details
                                             {:nhs-number (-> % .-target .-value)}])}]]

      [:div {:class-name "form-group"}
       [:label {:for "dob"} "Date of Birth"]
       [:input {:type         "date"
                :class-name   "form-control"
                :id           "dob"
                :autoComplete "off"
                :value        (get additional-details :dob "")
                :on-change    #(rf/dispatch [:kcp.events/update-additional-details
                                             {:dob (-> % .-target .-value)}])}]]

      [:h4 "Clinician Details"]

      [:div {:class-name "form-group"}
       [:label {:for "clinician-name"} "Name"]
       [:input {:type         "text"
                :class-name   "form-control"
                :id           "clinician-name"
                :autoComplete "off"
                :value        (get additional-details :clinician-name "")
                :on-change    #(rf/dispatch [:kcp.events/update-additional-details
                                             {:clinician-name (-> % .-target .-value)}])}]]

      [:div {:class-name "form-group"}
       [:label {:for "date-of-consultation"} "Date of consultation"]
       [:input {:type         "date"
                :class-name   "form-control"
                :id           "date-of-consultation"
                :autoComplete "off"
                :value        (get additional-details :consultation-date "")
                :on-change    #(rf/dispatch [:kcp.events/update-additional-details
                                             {:consultation-date (-> % .-target .-value)}])}]]
      ]]))



(defn open-collect-additional-details-modal
  "Opens a dialog for collecting additional details, ready for printing."
  [_e]
  (let [cancel-modal (fn []
                       (rf/dispatch [::events/reset-additional-details])
                       (hide-handler nil))
        current-details @(rf/subscribe [::subs/additional-details])]
    (when (nil? (:consultation-date current-details))
      (rf/dispatch [::events/update-additional-details
                    {:consultation-date (utils/to-iso-date-str (js/Date.))}]))
    (rf/dispatch [::events/modal-data
                  {:show     true
                   :width    "700px"
                   :title    "Print, Copy or Save to PDF"
                   :content  [additional-details-form]
                   :continue print-or-save-modal
                   :cancel   cancel-modal
                   :on-hide  cancel-modal}])))



(defmethod widget :reset
  [_w]
  [:> bs/Row {:style {:display "flex" :align-items "" :margin-top 5}}
   [:> bs/Col {:xs label-width}]
   [:> bs/Col {:xs widget-width}
    [:span
     (bsio/reset-button {:on-click #(rf/dispatch [::events/reset-inputs])})
     (when-not @(rf/subscribe [::subs/missing-inputs])
       (bsio/print-button {:on-click open-collect-additional-details-modal}))]]])

(defn print-or-save
  []
  (when-not @(rf/subscribe [::subs/missing-inputs])
    (bsio/print-button {:on-click open-collect-additional-details-modal})))

(defn radio
  [{:keys [factor-name factor-key levels _default _type vertical optional _boxed info-box?] :as w}]
  (let [value-f (fn [] @(rf/subscribe [factor-key]))
        optional? (some? optional)
        info-box (try (edn/read-string info-box?)
                      (catch :default e
                        {:title   [:span {:style {:color "red"}} "Info-box syntax error"]
                         :content [:p "see " factor-name [:br] e]}))]
    [:> bs/Row {:style {:display "flex" :align-items "center" :margin-bottom mb}}
     [:> bs/Col {:xs    label-width
                 :style {:display "flex" :justify-content "flex-end"}}
      [:> bs/Form.Label {:style {:font-weight "bold" :text-align "right" :margin-bottom mb :line-height 1.2}}
       (:factor-name w)]
      (when info-box?
        [:> bs/Button {:size       "sm"
                       :variant    "outline"
                       :class-name "more"
                       :title      "click for more info"
                       :on-click   (fn [_e]
                                     (rf/dispatch [::events/modal-data
                                                   {:show    true
                                                    :title   (get info-box :title (:factor-name w))
                                                    :content (get info-box :content info-box)
                                                    :on-hide hide-handler
                                                    :ok      hide-handler}])
                                     )}
         [:span "?"]])]

     [:> bs/Col {:xs widget-width}

      (bsio/radio-button-group {:id        (key->id factor-key)
                                :vertical  vertical
                                :value-f   value-f
                                :optional  optional?
                                :on-change #(rf/dispatch [factor-key
                                                          (keyword %)])
                                :buttons-f (fn [] (vals levels))
                                })
      ]]))



; radio buttons allow fast selection between options
(defmethod widget :radio
  [w]
  [radio (assoc w :vertical false)])

; radio buttons allow fast selection between options
(defmethod widget :v-radio
  [w]
  [radio (assoc w :vertical true)])


; dropdowns are similar to radio buttons but are useful when a radio-button-group
; would is too wide
(defmethod widget :dropdown
  [{:keys [_factor-name factor-key levels _default _type] :as w}]
  (let [value-f (fn [] @(rf/subscribe [factor-key]))]

    [:> bs/Row {:style {:display "flex" :align-items "center" :margin-bottom mb}}
     [:> bs/Col {:xs    label-width
                 :style {:display "flex" :justify-content "flex-end"}}
      [:> bs/Form.Label {:style {:font-weight "bold" :text-align "right" :line-height 1.2}}
       (:factor-name w)]]
     [:> bs/Col {:xs widget-width}
      (bsio/dropdown {:id        (key->id factor-key)
                      :value-f   value-f
                      :on-change #(rf/dispatch [factor-key
                                                (keyword %)])
                      :buttons-f (fn [] (vals levels))})]]))

; Note that the numeric-input arguments min, mapx, dps etc. come from the map encoded as a string inside the type column
(defmethod widget :numeric
  [{:keys [factor-name factor-key info-box?] :as w}]
  (let [
        user-edit (get @(rf/subscribe [::subs/edit-state]) factor-name "")
        value-f (fn []
                  (if (not-empty user-edit)
                    (str user-edit ":" user-edit)
                    @(rf/subscribe [factor-key])))
        numerics (edn/read-string (:type w))]
    [:> bs/Row {:style {:display "flex" :align-items "flex-start"}}
     [:> bs/Col {:xs    label-width
                 :style {:display "flex" :justify-content "flex-end" :margin-top 10}}
      [:> bs/Form.Label {:style {:font-weight "bold" :text-align "right" :line-height 1.2}}
       factor-name]
      (when info-box?
        [:> bs/Button {:size       "sm"
                       :variant    "outline"
                       :class-name "more"
                       :title      "click for more info"
                       :on-click   (fn [_e]
                                     (rf/dispatch [::events/modal-data
                                                   {:show    true
                                                    :title   (get info-box? :title (:factor-name w))
                                                    :content (edn/read-string (get info-box? :content info-box?))
                                                    :on-hide hide-handler
                                                    :ok      hide-handler}])
                                     )}
         [:span "?"]])]
     [:> bs/Col {:xs    widget-width
                 :style {:display "flex" :flex-direction "column"}}
      (if (and (map? numerics)
               (every? identity (map numerics [:min :max :dps])))
        [num/numeric-input {:key       factor-key
                            :value-f   value-f
                            :on-change #(cond
                                          (or (nil? %) (str/includes? % ":") (empty? %))
                                          (do
                                            (rf/dispatch [::events/update-edit-state {factor-name (if (nil? %) "" %)}])
                                            (rf/dispatch [factor-key nil]))

                                          (= % (value-f)) nil ; nothing changed

                                          :else (do
                                                  (rf/dispatch [::events/update-edit-state {factor-name ""}])
                                                  (rf/dispatch [factor-key %]))
                                          )
                            :min       (:min numerics) :max (:max numerics) :dps (:dps numerics)
                            :units     (:sub-text w)}]

        [:div "Check that " (:factor w) " has min, max, and dps parameters"])
      ; HACK - duplicated rules, the color should be from config
      [:div {:style {:border          "3px solid rgb(204, 204, 204)"
                     :margin-top      "5px"
                     :border-radius   "5px"
                     :padding         "1px"}
                     :class "d-none d-print-block"}
       [:label {
                :class "toggler btn active btn-outline-secondary"
                :style {
                        :display          "block"
                        :border-radius    "0px"
                        :margin           "0px"
                        :background-color "rgb(51, 119, 119)"}}
        (str (value-f))]]
      ; HACK - this should come from config
      [:i {:class-name "d-print-none" :style {:margin "4px 0 0 0" :display "block" :font-size "0.8rem"}} "Age must be between 25 and 85 years"]
      ]]))

(comment
  (def value-f (fn [] @(rf/subscribe [:lung/bmi])))
  (#(rf/dispatch [:lung/bmi %]) 60)
  (value-f)

  (widget {:type :radio})
  (widget {:type :foo}))

(defmethod widget :unsupported
  [{:keys [type] :as m}]
  (js/console.log "unsupported widget-type: " m)
  [:div type " widget badly configured"])

(defmethod widget :param
  [_]
  nil)

(defmethod widget :none
  [_]
  nil)
;------------------------
;
(comment
  (widget {:factor-key "foo" :type :radio})

  (bsio/radio-button-group {:id        "Sex"
                            :value-k   :sex
                            :value-f   (fn [] :male)
                            :on-change identity
                            :buttons-f (fn [] [{:key :male :value :male :level-namel "Male"}
                                               {:key :female :value :female :level-name "Female"}])})


  (bsio/radio-button-group {:id        "Sex"
                            :value-k   :sex                 ; factor
                            :value-f   (fn [] :male)        ; default value?
                            :on-change identity             ; e.g. #(rf/dispatch [:set-factor-level %])
                            :buttons-f (fn [] [{:key        :male
                                                :level      :male
                                                :level-name "Male"}
                                               {:key        :female
                                                :level      :female
                                                :level-name "Female"}])})
  )

