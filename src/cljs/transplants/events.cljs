(ns transplants.events
  (:require
   (winton-utils.data-frame :refer [map-of-vs->v-of-maps])
   [re-frame.core :as rf]
   [day8.re-frame.http-fx]
   [transplants.fx :as fx]
   [transplants.utils :as utils]
   [transplants.transforms :as xf]
   ;[transplants.db :as db]
   [ajax.core :as ajax]
   [cljs.reader :as  edn]
   [day8.re-frame.tracing :refer-macros [fn-traced]]
   [clojure.string :as string]
   [clojure.set :as rel]))

;;; Events ;;;

(rf/reg-event-db
 ::initialize-db
 (fn-traced [_ _]
            {:current-route nil
             :inputs {}
             ;:lung/bmi 30
             ;:lung/age 50
             :window-width (.-innerWidth js/window)}))

(rf/reg-event-db
 ::update-window-width
 (fn [db [_ new-width]]
   (assoc db :window-width new-width)))

(rf/reg-event-fx
 ::navigate
 (fn-traced [{:keys [db]} [_ route params query]]
   ;; See `navigate` effect in routes.cljs
            {::fx/navigate! [route params query]}))

(rf/reg-event-db
 ::navigated
 (fn-traced [db [_ new-match]]

            (assoc db
                   :current-route new-match)))

(rf/reg-event-db
 ; active organ
 ::organ
 (fn-traced [db [_ organ]]
            (assoc db :organ organ)))

(rf/reg-event-db
 ; active centre
 ::centre
 (fn-traced [db [_ c]]
            (assoc db :centre c)))


(rf/reg-event-db
 ; organ centres
 ::organ-centres
 (fn-traced [db [_ ocs]]
            (assoc db :organ-centres ocs)))

#_(comment
    (rf/reg-event-db
 ; flag that tool-data is required after centres have been loaded
     ::require-tool-data
     (fn-traced [db [_ td]]
                (assoc db :require-tool-data td))))

;;;
;; Input values: These are both stored and registered on the same namespaced key
;;;
(defn reg-input [nsk]
  (rf/reg-event-db
   nsk
   (fn [db [_ v]] (assoc db nsk v))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Process tool bundles into db
;;;
(rf/reg-event-fx
 ::store-bundle-inputs
 (fn-traced
  [{:keys [_ db]} [_ data-path response]]
  (let [;route (:current-route db)
        path-params (get-in db [:current-route :path-params])
        [organ-name centre-name tool-name] (utils/path-names path-params)
        organ (keyword organ-name)
        raw (edn/read-string response)
       ; waiting-inputs (:waiting-inputs raw)
       ; waiting-baseline-cifs (:waiting-baseline-cifs raw)
       ; waiting-baseline-vars (:waiting-baseline-vars raw)
        inputs-key (keyword (str tool-name "-inputs")) ;:e.g. waiting-inputs
        fmaps (xf/inputs->factor-maps (keyword organ-name) (inputs-key raw))
        processed (assoc-in raw [inputs-key] fmaps)]

    ;; side-effecting - make an fx!
    ;(doseq [fmap fmaps]
    ;  (js/console.log "boo " (:factor fmap)))


    {:db (assoc-in db data-path processed)
     :reg-factors [organ fmaps]}
    )))

#_(rf/reg-event-db
 ::store-bundle-inputs
 (fn-traced
  [db [_ data-path response]]
  (let [;route (:current-route db)
        path-params (get-in db [:current-route :path-params])
        [organ-name centre-name tool-name] (utils/path-names path-params)
        raw (edn/read-string response)
       ; waiting-inputs (:waiting-inputs raw)
       ; waiting-baseline-cifs (:waiting-baseline-cifs raw)
       ; waiting-baseline-vars (:waiting-baseline-vars raw)
        inputs-key (keyword (str tool-name "-inputs")) ;:e.g. waiting-inputs
        fmaps (xf/inputs->factor-maps (keyword organ-name) (inputs-key raw))
        processed (assoc-in raw [inputs-key] fmaps)]

    ;; side-effecting - make an fx!
    (doseq [fmap fmaps]
      (js/console.log "boo " (:factor fmap)))


    (-> db
        (assoc-in data-path processed)))))


(comment
  (enable-console-print!)
  )

;
;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;


;;
;; Load data sequences
;;
(rf/reg-event-db
 ::store-response
 (fn-traced
  [db [_ data-path response]]
  (-> db
      (assoc-in data-path (edn/read-string response)))))



(defn get-sheet-keys
  [sheet-metas sheet-name]
  (-> (filter (fn [meta]
                (as-> meta x
                  (:sheet x)
                  (clojure.string/replace x #"\*" "")
                  (clojure.string/ends-with? (name sheet-name) x)))

                #_(clojure.string/ends-with? (name sheet-name)))
              sheet-metas)
      first
      :keys)



#_(rf/reg-event-db
 ::store-indexed-response
 (fn-traced
  [db [_ data-path response]]
  (let [sheet-metas (get-in db [:metadata :sheet-meta])
        sheet-name (name (first data-path))
        indexes (get-sheet-keys sheet-metas (first data-path))]
    (comment "Use the sheet metadata to discover which columns can be used as indexes, then index the
              response by those keys in order. The indexes are themselves maps of {key1 val1} or if there
              are two keys, {key1 val1 key2 val2}."

             "It's not yet clear whether it's optimal to index this way, or by using nested group-by, or not
              at all at this stage - in which case simply use store-response")
    ;(println "INDEXES " indexes)
    (-> db
        ;(assoc-in data-path (edn/read-string response))
        (assoc-in data-path
                  (as-> (edn/read-string response) x
                    (map-of-vs->v-of-maps x)
                    (into #{} x)
                    (rel/index x indexes)
                    ;(group-by (first indexes) x)
                    ;(into {} x)
                    ))))))

(comment
  (def tool-meta-match string/ends-with?)
  (clojure.string/ends-with? "abcd" "d")

  (def sheet-key-name :tools)
  (def sheet-meta [{:sheet "centres", :keys [:key :name]}
                   {:sheet "tools", :keys [:key]}
                   {:sheet "*-baseline-cifs", :keys [:centre :days]}
                   {:sheet "*-baseline-vars", :keys [:baseline-factor]}
                   {:sheet "*-inputs", :keys [:factor :level]}
                   {:sheet "bmi-calculator", :keys [:factor :level]}])
  (filter (fn [meta] (clojure.string/ends-with? (:sheet meta) "waiting-baseline-cifs"))
          sheet-meta)

  (get-sheet-keys sheet-meta :waiting-baseline-cifs)
  ;=> [:centre :days]

  (get-sheet-keys sheet-meta :tools)
  ;=> [:key]
  ;

  (def relation #{{:a 1 :b 2 :c 3}
                  {:a 1 :b 3 :c 3}
                  {:a 2 :b 1 :c 4}
                  {:a 2 :b 2 :c 4}})
  (def v [{:a 1 :b 2 :c 3}
          {:a 1 :b 3 :c 3}
          {:a 2 :b 1 :c 4}
          {:a 2 :b 2 :c 4}])
  (group-by :a v)
  (require 'clojure.set)
  (clojure.set/index relation [:a :b])
  (clojure.set/index relation [:a])
  (filter (fn [[m s]] (= 1 (:a m))) (clojure.set/index relation [:a :b])))

(rf/reg-event-db
 ::transpose-response
 (fn-traced
  [db [_ data-path response]]
  (-> db
      (assoc-in data-path (map-of-vs->v-of-maps (edn/read-string response))))))

(rf/reg-event-db
 ::bad-response
 (fn-traced
  [db [_ data-path response]]
  (when (or data-path response)
    (js/alert (str "bad-response while loading " data-path "response = " response)))
  db))

(rf/reg-event-fx
 ::load-edn
 (fn-traced [{:keys [db]} [evt [path data-path]]]
            (when (nil? (get-in db data-path))
              {:http-xhrio {:method :get
                            :uri path
                            :timeout 8000
                            :format          (ajax/text-request-format)
                            :response-format (ajax/text-response-format)
                            :on-success [::store-response data-path]
                            :on-failure [::bad-response data-path]}})))

#_(rf/reg-event-fx
 ::load-sheet-and-index
 (fn-traced [{:keys [db]} [evt [path data-path]]]
            (when (nil? (get-in db data-path))
              {:http-xhrio {:method :get
                            :uri path
                            :timeout 8000
                            :format          (ajax/text-request-format)
                            :response-format (ajax/text-response-format)
                            :on-success [::store-indexed-response data-path]
                            :on-failure [::bad-response data-path]}})))

(rf/reg-event-fx
 ::load-sheet-always
 (fn-traced [{:keys [db]} [evt [path data-path]]]
            {:http-xhrio {:method :get
                          :uri path
                          :timeout 8000
                          :format          (ajax/text-request-format)
                          :response-format (ajax/text-response-format)
                          :on-success [::store-response data-path]
                          :on-failure [::bad-response data-path]}}))

(rf/reg-event-fx
 ::load-sheet
 (fn-traced [{:keys [db]} [evt [path data-path]]]
            (when (nil? (get-in db data-path))
              {:http-xhrio {:method :get
                            :uri path
                            :timeout 8000
                            :format          (ajax/text-request-format)
                            :response-format (ajax/text-response-format)
                            :on-success [::store-response data-path]
                            :on-failure [::bad-response data-path]}})))

(rf/reg-event-fx
 ::load-bundles
 (fn-traced [{:keys [db]} [evt [path data-path]]]
            (when (nil? (get-in db data-path))
              {:http-xhrio {:method :get
                            :uri path
                            :timeout 8000
                            :format          (ajax/text-request-format)
                            :response-format (ajax/text-response-format)
                            :on-success [::store-bundle-inputs data-path]
                            :on-failure [::bad-response data-path]}})))

(rf/reg-event-fx
 ::load-and-transpose
 (fn-traced [{:keys [db]} [evt [path data-path]]]
            {:http-xhrio {:method :get
                          :uri path
                          :timeout 8000
                          :format          (ajax/text-request-format)
                          :response-format (ajax/text-response-format)
                          :on-success [::transpose-response data-path]
                          :on-failure [::bad-response data-path]}}))

(rf/reg-event-fx
 ::load-and-transpose-once
 (fn-traced [{:keys [db]} [evt [path data-path]]]
            ; do not load config data twice!
            (when (nil? (get-in db data-path))
              {:http-xhrio {:method :get
                            :uri path
                            :timeout 8000
                            :format          (ajax/text-request-format)
                            :response-format (ajax/text-response-format)
                            :on-success [::transpose-response data-path]
                            :on-failure [::bad-response data-path]}})))





