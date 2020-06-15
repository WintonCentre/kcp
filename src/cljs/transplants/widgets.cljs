(ns transplants.widgets
  (:require [re-frame.core :as rf]
            [transplants.bsio :as bsio]))

(defmulti widget
  "Create a widget component - dispatching on type. The default type is a radio-button-group"
  :type
  :default :unsupported
  )

; Create a radio-button-group widget given a widget inputs map - for example:
(comment  (def widget-inputs-map
            "Example of a widget-inputs-map"
            {:factor-path :kidney/sex
             :levels [{:level :male
                       :label "Male"}
                      {:level :female
                       :label "Female"}]
             :default :male
             :type :radio}))

#_(defn factor-path->db-key
  "A factor path is a vector [organ-key factor-key], which must be concatenated into a single db access key both for
   writing and reading purposes. It is necessary to qualify factor keys by organ as some factors will have different levels
   in the differing organ contexts."
  [factor-path]
  (apply keyword factor-path)
  )

#_(comment
  (factor-path->organ-factor [:foo :bar])
  ;=> :foo/bar
  )

(defmethod widget :radio
  [{:keys [factor-path levels default :as w-inputs-m]}]
  (println "widget-type: " (:type w-inputs-m))
  (let [value #(rf/subscribe [factor-path])
        value-f (if (and default (nil? value))
                  (fn [] default)
                  value)]
    (bsio/radio-button-group {:id (pr-str factor-path)
                              :value-f value-f
                              :on-change #(rf/dispatch [:set-factor-level [factor-path %]])
                              :buttons-f (fn [] levels)})))
(comment
  (widget {:type :radio})
  (widget {:type :foo}))

(defmethod widget :unsupported
  [{:keys [type]}]
   (println "widget-type: "  type)
  [:div  type " not yet implemented"])

;------------------------
;
(comment
  (widget {:factor-path "foo" :type :radio})
  
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
    {:factor-path :kidney/sex
     :levels [{:level :male
               :label "Male"}
              {:level :female
               :label "Female"}]
     :type :radio})
)

