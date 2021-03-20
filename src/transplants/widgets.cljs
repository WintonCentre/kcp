(ns transplants.widgets
  (:require [re-frame.core :as rf]
            [clojure.edn :as edn]
            ["react-bootstrap" :as bs]
            [transplants.bsio :as bsio]
            [transplants.events :as events]
            [transplants.numeric-input :as num]
            ))

(defn key->id
  "Convert a namespaced factor key to an id"
  [k]
  (if k (str (namespace k) "-" (name k)) nil))

(defn bad-widget-type [msg]
  (js/alert msg))

(defmulti widget
  "Create a widget component of a given type.
   The first argument is the widget map, and the value of its :type slot determines the 
   widget type. If it's a keyword, dispatch on that. If it's a string, read it into a map and dispatch on that map's :type.
   This allows us to add parameters to the widget inside the type column in the spreadsheet."
  ;:type
  (fn [m]
    ;(println "widget-map " m)
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
        (catch :default e
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
     :type :radio}))

; factors with a nil type field have no widget
(defmethod widget nil [_]
  nil)

(def mb 5)
(def mt 0)

(defmethod widget :reset
  [w]
  [:> bs/Row {:style {:display "flex" :align-items  "center" :margin-bottom mb}}
   [:> bs/Col]
   [:> bs/Col
    (bsio/reset-button {:on-click #(rf/dispatch [::events/reset-inputs])})]])

(defn radio
  [{:keys [factor-name factor-key levels default type vertical] :as w}]
  (let [value-f (fn [] @(rf/subscribe [factor-key]))

        #_#_value-f (if (and default (nil? value))
                      (fn [] default)
                      value)]
    [:> bs/Row {:style {:display "flex" :align-items  "center" :margin-bottom mb}}
     [:> bs/Col {:style {:display "flex" :justify-content "flex-end"}}
      [:> bs/Form.Label {:style {:font-weight "bold" :text-align "right" :margin-bottom mb :line-height 1.2}}
       (:factor-name w)]]
     [:> bs/Col
      (bsio/radio-button-group {:id (key->id factor-key)
                                :vertical vertical
                                :value-f value-f
                                :on-change #(rf/dispatch [factor-key
                                                          (keyword %)])
                                :buttons-f (fn [] (vals levels))})]]))

; radio buttons allow fast selection between options
(defmethod widget :radio
  [w]
  (radio (assoc w :vertical false)))

; radio buttons allow fast selection between options
(defmethod widget :v-radio
  [w]
  (radio (assoc w :vertical true)))


; dropdowns are similar to radio buttons but are useful when a radio-button-group
; would is too wide
(defmethod widget :dropdown
  [{:keys [factor-name factor-key levels default type] :as w}]
  (let [value-f (fn [] @(rf/subscribe [factor-key]))]
    
    [:> bs/Row {:style {:display "flex" :align-items  "center" :margin-bottom mb}}
     [:> bs/Col {:style {:display "flex" :justify-content "flex-end"}}
      [:> bs/Form.Label {:style {:font-weight "bold"  :text-align "right" :line-height 1.2}}
       (:factor-name w)]]
     [:> bs/Col
      (bsio/dropdown {:id (key->id factor-key)
                      :value-f value-f
                      :on-change #(rf/dispatch [factor-key
                                                (keyword %)])
                      :buttons-f (fn [] (vals levels))})]]))

; Note that the numeric-input arguments min, mapx, dps etc. come from the map encoded as a string inside the type column
(defmethod widget :numeric
  [{:keys [factor-name factor-key factor levels default type model] :as w}]
  (let [value-f (fn [] @(rf/subscribe [factor-key]))
        numerics (edn/read-string (:type w))]
    [:> bs/Row {:style {:display "flex" :align-items  "center" :margin-bottom 3}}
     [:> bs/Col {:style {:display "flex" :justify-content "flex-end"}}
      [:> bs/Form.Label {:style {:font-weight "bold"  :text-align "right" :line-height 1.2}}
       (:factor-name w)]]
     [:> bs/Col
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
  [{:keys [type :as m]}]
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

