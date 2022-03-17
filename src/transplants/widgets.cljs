(ns transplants.widgets
  (:require [re-frame.core :as rf]
            [clojure.edn :as edn]
            ["react-bootstrap" :as bs]
            [transplants.bsio :as bsio]
            [transplants.subs :as subs]
            [transplants.events :as events]
            [transplants.numeric-input :as num]
            [transplants.copy-image :as snap]
            ;[shadow.debug :refer [locals ?> ?-> ?->>]]
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
              (bad-widget-type ":type :numeric should be like {:type :numeric :dps 0 :min 0 :max 100}" )
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
     :levels [{:level :male
               :level-name "Male"}
              {:level :female
               :level-name "Female"}]
     :default :male
     :optional :no
     :type :radio}))

; factors with a nil type field have no widget
(defmethod widget nil [_]
  nil)

(def mb 0)
(def label-width "label column grid-size" 6)
(def widget-width "Widget column grid-size" 6)

(def print-modal-content
  "What to say in the print modal"
  (let [URI (.-href js/document.location)]
    [:<>
     [:section {:class-name "print-modal"}
      [:i "Unfortunately we are unable to support these features in Internet Explorer. We recommend
         using another browser if these features are important to you."]
      [:h1 "Print"]
      [:p "Press " [:b "Print"] " and the browser print dialogue box will appear. For best results, "
       [:b "enable the option which prints background graphics. "] "This option is not available in Internet Explorer."]
      [:h1 "Copy"]
      [:p "The " [:b "Copy"] " button displays a small screenshot which can be
         saved, copied to the clipboard, or printed using the usual browser controls. The copied image will be full browser window size so you may wish to adjust this for
         best results."]
      [:p "The copy feature does not work well in Internet Explorer."]
      [:h1 "Save to PDF"]
      [:p "If you prefer a PDF, press " [:b "Print"] " and select \"Save to PDF\" in the browser print dialogue. Again, be sure to "
       [:b "enable the option which prints background graphics."]]
      [:h1 "QRCode"]
      [:p {:style {:font-size "12px"}} URI]
      [:div#qrcode {:style {:display "flex" :flex-direction "column" :justify-content "top" :align-items "center" :margin-bottom 10}}]
      [:p "Use a QRCode reader on your mobile to view your inputs there."]
      ]]))

(defn hide-handler
  "Hide a modal"
  [_e]
  (rf/dispatch [::events/modal-data nil]))

(defn show-canvas-modal
  "Pop up a large modal ready to display the canvas on it"
  [canvas]
  ;(.getContext canvas "2d")
  (goog.object.set canvas "style" "max-width: 90%; margin-left: 5%")

  (rf/dispatch [::events/modal-data
                {:show true
                 :title nil
                 :content [:div {:id "snap"
                                 :style {:margin-bottom 15
                                         :text-align "center"
                                         :font-size "120%"}}
                           [:b [:i "Use the context menu (try right-click or control-click on the image below) to copy or save"]]]
                 :paste (partial snap/show-screen-shot canvas)
                 :cancel hide-handler
                 :on-hide hide-handler
                 :ok hide-handler
                 }]))
  

(defn print-or-save-modal
  "Main Print, Copy or Save modal popup"
  [_e]
  (rf/dispatch [::events/modal-data
                {:show true
                 :width "700px"
                 :on-show #(js/setTimeout
                            (fn [_e]
                              (js/QRCode.
                               (js/document.getElementById "qrcode")
                               #js {:text (.-href js/document.location)
                                    :width 128
                                    :height 128}))
                            500)
                 :title "Print, Copy or Save to PDF"
                 :content print-modal-content
                ; :ok hide-handler
                 :print (fn [_e]
                          (hide-handler _e)
                       ; delay the print dialog so it doesn't screen capture this modal.
                       ; todo: Is there a better event we can hang the js/print on? 
                          (js/setTimeout js/print, 200))
                 :copy (fn [_e]
                        ; Add screen capture logic here 
                         (hide-handler _e)
                         (js/setTimeout (fn [_e]
                                          (snap/take-screen-shot
                                           {:from-element (js/document.querySelector "#capture")
                                            :done show-canvas-modal})) 200))
                 :on-hide hide-handler}]))


(defmethod widget :reset
  [_w]
  [:> bs/Row {:style {:display "flex" :align-items  "" :margin-top 5}}
   [:> bs/Col {:xs label-width}]
   [:> bs/Col {:xs widget-width}
    [:span
     (bsio/reset-button {:on-click #(rf/dispatch [::events/reset-inputs])})
     (when-not @(rf/subscribe [::subs/missing-inputs])
       (bsio/print-button {:on-click print-or-save-modal}))]]])

(defn print-or-save
  []
  (when-not @(rf/subscribe [::subs/missing-inputs])
    (bsio/print-button {:on-click print-or-save-modal})))

(defn radio
  [{:keys [factor-name factor-key levels _default _type vertical optional _boxed info-box?] :as w}]
  (let [value-f (fn [] @(rf/subscribe [factor-key]))
        optional? (some? optional)
        info-box (try (edn/read-string info-box?)
                      (catch :default e
                        {:title [:span {:style {:color "red"}} "Info-box syntax error"]
                         :content [:p "see " factor-name [:br] e]}))]
;    (locals)
    [:> bs/Row {:style {:display "flex" :align-items  "center" :margin-bottom mb}}
     [:> bs/Col {:xs label-width
                 :style {:display "flex" :justify-content "flex-end"}}
      [:> bs/Form.Label {:style {:font-weight "bold" :text-align "right" :margin-bottom mb :line-height 1.2}}
       (:factor-name w)]
      (when info-box?
        ;(?-> (:info-box? w) ::info-box)
        [:> bs/Button {:size "sm"
                       :variant "outline"
                       :class-name "more"
                       :title "click for more info"
                     ;:style {:cursor "pointer"}
                       :on-click (fn [_e]
                                   (rf/dispatch [::events/modal-data
                                                 {:show true
                                                  :title (get info-box :title (:factor-name w))
                                                  :content (get info-box :content info-box)
                                                  ;:content (edn/read-string (:info-box? w))
                                                  :on-hide hide-handler
                                                  :ok hide-handler}])
                                   #_(?-> {:show true
                                         :title (get info-box :title (:factor-name w))
                                         :content (get info-box :content info-box)
                                         #_(str "Some text for " (:factor-name w))
                                         :on-hide hide-handler
                                         :ok hide-handler}
                                        ::radio))}
         [:span "?"]])]

     [:> bs/Col {:xs widget-width}

      (bsio/radio-button-group {:id (key->id factor-key)
                                :vertical vertical
                                :value-f value-f
                                :optional optional?
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
    
    [:> bs/Row {:style {:display "flex" :align-items  "center" :margin-bottom mb}}
     [:> bs/Col {:xs label-width
                 :style {:display "flex" :justify-content "flex-end"}}
      [:> bs/Form.Label {:style {:font-weight "bold"  :text-align "right" :line-height 1.2}}
       (:factor-name w)]]
     [:> bs/Col {:xs widget-width}
      (bsio/dropdown {:id (key->id factor-key)
                      :value-f value-f
                      :on-change #(rf/dispatch [factor-key
                                                (keyword %)])
                      :buttons-f (fn [] (vals levels))})]]))

; Note that the numeric-input arguments min, mapx, dps etc. come from the map encoded as a string inside the type column
(defmethod widget :numeric
  [{:keys [_factor-name factor-key _factor _levels _default _type _model] :as w}]
  (let [value-f (fn [] @(rf/subscribe [factor-key]))
        numerics (edn/read-string (:type w))]
    [:> bs/Row {:style {:display "flex" :align-items  "center" :margin-bottom 3}}
     [:> bs/Col {:xs label-width
                 :style {:display "flex" :justify-content "flex-end"}}
      [:> bs/Form.Label {:style {:font-weight "bold"  :text-align "right" :line-height 1.2}}
       (:factor-name w)]]
     [:> bs/Col {:xs widget-width
                 :style {:display "flex"}}
      (if (and (map? numerics)
               (every? identity (map numerics [:min :max :dps])))
        [num/numeric-input {:key factor-key
                            :value-f value-f
                            :on-change #(rf/dispatch [factor-key %])
                            :min (:min numerics) :max (:max numerics) :dps (:dps numerics)
                            :units (:sub-text w)}]
        
        [:div "Check that " (:factor w) " has min, max, and dps parameters"])]]))

(comment
  (def value-f (fn [] @(rf/subscribe [:lung/bmi])))
  (#(rf/dispatch [:lung/bmi %]) 60)
  (value-f)
  
  (widget {:type :radio})
  (widget {:type :foo}))

(defmethod widget :unsupported
  [{:keys [type] :as m}]
   (js/console.log "unsupported widget-type: "  m)
  [:div  type " widget badly configured"])

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

  (bsio/radio-button-group {:id "Sex"
                            :value-k :sex
                            :value-f (fn [] :male)
                            :on-change identity
                            :buttons-f (fn [] [{:key :male :value :male :level-namel "Male"}
                                               {:key :female :value :female :level-name "Female"}])})


  (bsio/radio-button-group {:id "Sex"
                            :value-k :sex          ; factor
                            :value-f (fn [] :male) ; default value? 
                            :on-change identity    ; e.g. #(rf/dispatch [:set-factor-level %])
                            :buttons-f (fn [] [{:key :male
                                                :level :male
                                                :level-name "Male"}
                                               {:key :female
                                                :level :female
                                                :level-name "Female"}])})
  )

