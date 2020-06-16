(ns transplants.widgets
  (:require [re-frame.core :as rf]
            ["react-bootstrap" :as bs]
            [transplants.bsio :as bsio]
            [transplants.utils :as utils]))

(defmulti widget
  "Create a widget component - dispatching on type. The default type is a radio-button-group"
  :type
  :default :unsupported
  )

; Create a radio-button-group widget given a widget inputs map - for example:
(comment  (def widget-inputs-map
            "Example of a widget-inputs-map"
            {:factor-key :kidney/sex
             :levels [{:level :male
                       :label "Male"}
                      {:level :female
                       :label "Female"}]
             :default :male
             :type :radio})
          
(rf/dispatch [:kidney/diabetes :group-a])
          
          
          )

#_(defn factor-key->db-key
  "A factor path is a vector [organ-key factor-key], which must be concatenated into a single db access key both for
   writing and reading purposes. It is necessary to qualify factor keys by organ as some factors will have different levels
   in the differing organ contexts."
  [factor-key]
  (apply keyword factor-key)
  )

#_(comment
  (factor-key->organ-factor [:foo :bar])
  ;=> :foo/bar
  )

; factors with a nil type field have no widget
(defmethod widget nil [_]
  nil)

; radio buttons allow fast selection between options
(defmethod widget :radio
  [{:keys [factor-name factor-key levels default type] :as w}]
  ;(println "keys w " (keys w))
  ;(println "factor-name: " factor-name)
  ;(println "factor-key: " factor-key)
  ;(println "default: " default)
  ;(println "widget-type: " type)
  ;(println "levels " levels)
  ;(println "value " @(rf/subscribe [factor-key]))
  (let [value-f (fn [] @(rf/subscribe [factor-key]))

        #_#_value-f (if (and default (nil? value))
                      (fn [] default)
                      value)]
    [:> bs/Row {:style {:display "flex" :align-items  "flex-end"}}
     [:> bs/Col {:style {:display "flex" :justify-content "flex-end"}}
      [:> bs/Form.Label {:style {:font-weight "bold"}}
       (:factor-name w)]]
     [:> bs/Col
  ;(widg/widget w)
      (bsio/radio-button-group {:id (pr-str factor-key)
                                :value-f value-f
                                :on-change #(do
                                              (println "store" [factor-key
                                                                (keyword %)])
                                              (rf/dispatch [factor-key
                                                            (keyword %)]))
                                :buttons-f (fn [] levels)})]]))


; dropdowns are similar to radio buttons but are useful when a radio-button-group
; would is too wide
(defmethod widget :dropdown
  [{:keys [factor-name factor-key levels default type] :as w}]
  ;(println "keys w "(keys w))
  ;(println "factor-name: " factor-name)
  ;(println "factor-key: " factor-key)
  ;(println "default: " default)
  ;(println "widget-type: " type)
  ;(println "levels " levels)
  ;(println "value " @(rf/subscribe [factor-key]))
  (let [value-f (fn [] @(rf/subscribe [factor-key]))]
    (println "factor-key" factor-key)
    (println "caller v "(value-f))
    
    [:> bs/Row {:style {:display "flex" :align-items  "flex-end"}}
     [:> bs/Col {:style {:display "flex" :justify-content "flex-end"}}
      [:> bs/Form.Label {:style {:font-weight "bold"}}
       (:factor-name w)]]
     [:> bs/Col
      ;(widg/widget w)
      
      (bsio/dropdown {:id (pr-str factor-key)
                      :value-f value-f
                      :on-change #(do
                                    (println "store" [factor-key
                                                      (keyword %)])
                                    (rf/dispatch [factor-key
                                                  (keyword %)]))
                      :buttons-f (fn [] levels)})]]))


(comment
  (widget {:type :radio})
  (widget {:type :foo}))

(defmethod widget :unsupported
  [{:keys [type]}]
   (println "unsupported widget-type: "  type)
  [:div  type " not yet implemented"])

;------------------------
;
(comment
  (widget {:factor-key "foo" :type :radio})
  
  (bsio/radio-button-group {:id "Sex"
                            :value-k :sex
                            :value-f (fn [] :male)
                            :on-change identity
                            :buttons-f (fn [] [{:key :male :value :male :label "Male"}
                                               {:key :female :value :female :label "Female"}])})


  (bsio/radio-button-group {:id "Sex"
                            :value-k :sex          ; factor
                            :value-f (fn [] :male) ; default value? 
                            :on-change identity    ; e.g. #(rf/dispatch [:set-factor-level %])
                            :buttons-f (fn [] [{:key :male
                                                :level :male
                                                :label "Male"}
                                               {:key :female
                                                :level :female
                                                :label "Female"}])})

  (def widget-inputs-map
    "Example of a widget-inputs-map"
    {:factor-key :kidney/sex
     :levels [{:level :male
               :label "Male"}
              {:level :female
               :label "Female"}]
     :type :radio})
)

