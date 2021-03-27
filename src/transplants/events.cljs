(ns transplants.events
  (:require
   (winton-utils.data-frame :refer [map-of-vs->v-of-maps])
   [re-frame.core :as rf]
   [day8.re-frame.http-fx]
   [transplants.fx :as fx]
   [transplants.utils :as utils]
   [transplants.db :as init-db]
   [transplants.factors :as fac]
   [transplants.paths :as paths]
   [transplants.model :as model]
   [ajax.core :as ajax]
   [cljs.reader :as  edn]
   [clojure.string :as string]
   [clojure.set :as rel]
   [shadow.debug :refer [locals ?> ?-> ?->>]]))

;;; Events ;;;

(rf/reg-event-db
 ::initialize-db
 (fn ;-traced 
   [_ _]
   (merge init-db/default-db
          {:current-route nil
           :inputs {}
           :selected-vis "bars"
           :window-width (.-innerWidth js/window)
           :test-day 100})))

(rf/reg-event-db
 ::update-window-width
 (fn [db [_ new-width]]
   (assoc db :window-width new-width)))

(rf/reg-event-fx
 ::navigate
 (fn ;-traced 
   [{:keys [db]} [_ route params query]]
   ;; See `navigate` effect in routes.cljs
   {::fx/navigate! [route params query]}))

(rf/reg-event-db
 ::navigated
 (fn ;-traced 
   [db [_ new-match]]
   (assoc db :current-route new-match)))

(rf/reg-event-db
 ; active organ
 ::organ
 (fn ;-traced 
   [db [_ organ]]
   (assoc db :organ organ)))

(rf/reg-event-db
 ; active centre
 ::centre
 (fn ;-traced 
   [db [_ c]]
   (assoc db :centre c)))

(rf/reg-event-db
 ; organ centres
 ::organ-centres
 (fn ;-traced 
   [db [_ ocs]]
   (assoc db :organ-centres ocs)))

(rf/reg-event-db
 ; reset inputs
 ::reset-inputs
 (fn ;-traced 
   [db [_ _]]
   (assoc db :inputs {})))

(rf/reg-event-db
 ; background-info
 ::background-info
 (fn ;-traced 
   [db [_ b-info]]
   (assoc db :background-info b-info)))

(rf/reg-event-db
 ; randomise-icons
 ::randomise-icons
 (fn ;-traced 
   [db [_ _]]
   (update db :randomise-icons not)))

(rf/reg-event-db
 ; guidance-percent
 ::inc-guidance-percent
 (fn ;-traced 
   [db [_ increment]]
   (update db :guidance-percent
           (fn [old]
             (let [new (+ old increment)]
               (max (min new 100) 0))))))
#_(comment
    (rf/reg-event-db
 ; flag that tool-data is required after centres have been loaded
     ::require-tool-data
     (fn [db [_ td]]
       (assoc db :require-tool-data td))))

;;;
;; Input values: These are both stored and registered on the same namespaced key
;;;
(defn reg-input [nsk]
  (rf/reg-event-db
   nsk
   (fn [db [_ v]] (assoc db nsk v))))



(comment
  (enable-console-print!)
  (def raw {:min '(0 16 10 0 16 -2.2 0.35 1 1.3 16 14 nil nil nil nil nil nil nil nil nil nil nil nil nil nil)
            :knot3 '(2.22 56 nil nil 56 nil nil nil nil nil nil nil nil nil nil nil nil nil nil nil nil nil nil nil nil)
            :knot2 '(1.63 44 nil nil 46 nil nil nil nil nil nil nil nil nil nil nil nil nil nil nil nil nil nil nil nil)
            :knot4 '(3.55 63 nil nil 63 nil nil nil nil nil nil nil nil nil nil nil nil nil nil nil nil nil nil nil nil)
            :max '(5 70 100 100 70 4.5 6.8 77 9 70 35.7 nil nil nil nil nil nil nil nil nil nil nil nil nil nil)
            :factor '(:fvc :age :bmi :bilirubin :age :tlc-mismatch :fvc :bilirubin :cholesterol :age :bmi nil nil nil nil nil nil nil nil nil nil nil nil nil nil)
            :dps '(2 0 0 0 0 1 1 0 1 0 1 nil nil nil nil nil nil nil nil nil nil nil nil nil nil)
            :knot1 '(0.94 21 nil nil 22 nil nil nil nil nil nil nil nil nil nil nil nil nil nil nil nil nil nil nil nil)
            :model '(:waiting :waiting :waiting :waiting
                              :post-transplant :post-transplant :post-transplant :post-transplant :post-transplant
                              :from-listing :from-listing nil nil nil nil nil nil nil nil nil nil nil nil nil nil)})
  #_(defn index-by
      "Take a raw data table in map of vectors form.
   Convert it a vector of maps.
   Remove any maps where the primary index is nil.
   Then index by the (orange) index columns which are specified in metadata.edn
   Finally, convert those indexes to keywords."
      [raw indexes]
      (as-> raw x
        (map-of-vs->v-of-maps x)
        (filter (comp some? (first indexes)) x)
        (into #{} x)
        (rel/index x indexes)
        (map (fn [[k v]] [(xf/map-vals xf/unstring-key k) (into {} v)]) x)
    ;(into {} x)
        ))

  #_(index-by raw
              [:factor :model])
  ; => Note that the resulting keys are maps containing distinct values of the original keys (:factor and :model in this case).
  #_{{:model :waiting, :factor :bmi} {:min 10, :knot3 nil, :knot2 nil, :knot4 nil, :max 100, :factor ":bmi", :dps 0, :knot1 nil, :model ":waiting"}
     {:model :waiting, :factor :bilirubin} {:min 0, :knot3 nil, :knot2 nil, :knot4 nil, :max 100, :factor ":bilirubin", :dps 0, :knot1 nil, :model ":waiting"}
     {:model :from-listing, :factor :age} {:min 16, :knot3 nil, :knot2 nil, :knot4 nil, :max 70, :factor ":age", :dps 0, :knot1 nil, :model ":from-listing"}
     {:model :post-transplant, :factor :cholesterol} {:min 1.3, :knot3 nil, :knot2 nil, :knot4 nil, :max 9, :factor ":cholesterol", :dps 1, :knot1 nil, :model ":post-transplant"}
     {:model :post-transplant, :factor :bilirubin} {:min 1, :knot3 nil, :knot2 nil, :knot4 nil, :max 77, :factor ":bilirubin", :dps 0, :knot1 nil, :model ":post-transplant"}
     {:model :post-transplant, :factor :tlc-mismatch} {:min -2.2, :knot3 nil, :knot2 nil, :knot4 nil, :max 4.5, :factor ":tlc-mismatch", :dps 1, :knot1 nil, :model ":post-transplant"}
     {:model :waiting, :factor :age} {:min 16, :knot3 56, :knot2 44, :knot4 63, :max 70, :factor ":age", :dps 0, :knot1 21, :model ":waiting"}, {:model :post-transplant, :factor :age}
     {:min 16, :knot3 56, :knot2 46, :knot4 63, :max 70, :factor ":age", :dps 0, :knot1 22, :model ":post-transplant"}
     {:model :waiting, :factor :fvc} {:min 0, :knot3 2.22, :knot2 1.63, :knot4 3.55, :max 5, :factor ":fvc", :dps 2, :knot1 0.94, :model ":waiting"}
     {:model :from-listing, :factor :bmi} {:min 14, :knot3 nil, :knot2 nil, :knot4 nil, :max 35.7, :factor ":bmi", :dps 1, :knot1 nil, :model ":from-listing"}
     {:model :post-transplant, :factor :fvc} {:min 0.35, :knot3 nil, :knot2 nil, :knot4 nil, :max 6.8, :factor ":fvc", :dps 1, :knot1 nil, :model ":post-transplant"}}

  )

(defn bundle-sheet
  "Concat a sheet type suffix onto the bundle name to generate a specific sheet key 
   e.g.
   ['waiting' '-inputs'] -> :waiting-inputs
   ['graft' '-baseline-vars'] -> :graft-baseline-vars"
  [bundle-name tool-suffix]
  (keyword (str bundle-name tool-suffix)))

(comment

  (def fmaps {:a {:order 10} :b {:order -6} :c {:order nil} :d {:order nil}})
  (get-in fmaps [:a :order])
  (into (sorted-map-by (fn [k1 k2]
                         (compare (get-in fmaps [k1 :order])
                                  (get-in fmaps [k2 :order]))))
        fmaps))




;;;
;; Process raw tool bundles into db. 
;; 
;; It may be more efficient to do this processing at configuration time
;;;
(rf/reg-event-fx
 ::store-bundle-inputs
 (fn ;;-traced
  [{:keys [_ db]} [_ data-path response]]
  (let [path-params (get-in db [:current-route :path-params])
        [organ centre tool tab] (utils/path-keys path-params)
        raw (edn/read-string response)

        bundle-name (name tool)
        inputs-key (bundle-sheet bundle-name "-inputs")
        fmaps (fac/master-f-maps organ (inputs-key raw))
        fmaps* (->> fmaps
                    (group-by :factor)
                    (map (fn [[k [v]]] [k v]))
                    (into {}))
        ; tool-inputs* fmaps* ;(map (fn [[k [v]]] [k v]) (group-by :factor fmaps))
        ; tool-inputs must be sorted by spreadsheet factor order   
        tool-inputs (into (sorted-map-by (fn [k1 k2]
                                           (compare (get-in fmaps* [k1 :order])
                                                    (get-in fmaps* [k2 :order]))))
                          fmaps*)

        baseline-vars-key (bundle-sheet bundle-name "-baseline-vars")
        baseline-vars (->> baseline-vars-key
                           (get raw)
                           (group-by :factor)
                           (remove (comp nil? first))
                           (map (fn [[k [{:keys [level]}]]] [k level]))
                           (into {}))

        baseline-cifs-key (bundle-sheet bundle-name "-baseline-cifs")
        baseline-cifs (map #(dissoc % :centre) (get raw baseline-cifs-key))

         ;; Convert legacy cifs to survivals keyed by outcome
        timed-outcome-keys (keys (first baseline-cifs))
        outcome-keys (remove #(= :days %) timed-outcome-keys)

        _ (?->> ::outcome-keys outcome-keys)

        outcomes (fac/get-outcomes* (first baseline-cifs))
        beta-keys (fac/prefix-outcomes-keys "beta" outcomes)
        base-outcome-keys (map keyword outcomes)
        ;outcome-keys (fac/prefix-outcomes-keys "cif" outcomes)

        ;; Use SO+ if calculating with ALL data points
        S0+ (map (fn [bc] [(:days bc)
                           ((apply juxt outcome-keys) bc)]) baseline-cifs)
        #_#_S0+ (map (fn [bc] [(:days bc)
                               (map (comp - js/Math.log)
                                    ((apply juxt outcome-keys) bc))]) baseline-cifs)

        ;; Otherwise, use SO for a reduced data optimised calculation
        S0 (keep-indexed #(when-not (and (= %1 1) (zero? (first %2)))
                            %2) (model/sample-from S0+))]

    {:db ;(assoc db :oct-bundle tool-centre-bundle)
     (assoc-in db data-path
               (-> raw
                   (assoc :fmaps tool-inputs
                          :baseline-cifs baseline-cifs
                          :baseline-vars baseline-vars
                          :outcomes outcomes
                          :outcome-keys outcome-keys
                          :base-outcome-keys base-outcome-keys
                          :timed-outcome-keys timed-outcome-keys
                          :beta-keys beta-keys
                          :all-S0 S0+
                          :S0 S0
                          )
                   (dissoc inputs-key)
                   (dissoc baseline-cifs-key)
                   (dissoc baseline-vars-key)))
     :reg-factors [organ fmaps]})))

(rf/reg-event-db
 ::inc-test-day
 (fn ;-traced
   [db [_ step]]
   (update db :test-day #(+ step %))))

(rf/reg-event-db
 ::test-day
 (fn ;-traced
   [db [_ day]]
   (assoc db :test-day day)))

(rf/reg-event-db
 ::selected-vis
 (fn ;-traced
   [db [_ selection]]
   (assoc db :selected-vis selection)))


;;;
;; Load data sequences
;;;
(rf/reg-event-db
 ::store-response
 (fn
  [db [_ data-path response]]
  (-> db
      (assoc-in data-path (edn/read-string response)))))

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


  (def relation #{{:a 1 :b 2 :c 3}
                  {:a 1 :b 3 :c 3}
                  {:a 2 :b 1 :c 4}
                  {:a 2 :b 2 :c 4}})
  (def v [{:a 1 :b 2 :c 3}
          {:a 1 :b 3 :c 3}
          {:a 2 :b 1 :c 4}
          {:a 2 :b 2 :c 4}])
  (group-by :a v)

  (clojure.set/index relation [:a :b])
  (clojure.set/index relation [:a])
  (filter (fn [[m s]] (= 1 (:a m))) (clojure.set/index relation [:a :b])))

(rf/reg-event-db
 ::transpose-response
 (fn
  [db [_ data-path response]]
  (-> db
      (assoc-in data-path (map-of-vs->v-of-maps (edn/read-string response))))))

(rf/reg-event-db
 ::bad-response
 (fn
  [db [_ data-path response]]
  #_(when (or data-path response)
      (js/alert (str "bad-response while loading " data-path "response = " response)))
  db))

(rf/reg-event-fx
 ::store-metadata-response
 (fn
  [{:keys [db]} [_ data-path response]]
  (let [mdata (edn/read-string response)
        organs (keys mdata)]

     ; Todo: VALIDATE mdata
    (doseq [organ organs]
      (rf/dispatch [::load-and-transpose [(paths/centres-path organ) [:organ-centres organ]]]))

    {:db (-> db
             (assoc :mdata mdata))})))

(rf/reg-event-fx
 ::load-metadata
 (fn
  [{:keys [db]} [evt [path data-path]]]
  (when (nil? (get-in db data-path))
    {:http-xhrio {:method :get
                  :uri path
                  :timeout 8000
                  :format          (ajax/text-request-format)
                  :response-format (ajax/text-response-format)
                  :on-success [::store-metadata-response data-path]
                  :on-failure [::bad-response data-path]}})))

;;;;;;;;;;;;

(rf/reg-event-fx
 ::load-edn
 (fn
  [{:keys [db]} [evt [path data-path]]]
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
 (fn
  [{:keys [db]} [evt [path data-path]]]
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
 (fn
  [{:keys [db]} [evt [path data-path]]]
  (when (nil? (get-in db data-path))
    {:http-xhrio {:method :get
                  :uri path
                  :timeout 8000
                  :format          (ajax/text-request-format)
                  :response-format (ajax/text-response-format)
                  :on-success [::transpose-response data-path]
                  :on-failure [::bad-response data-path]}})))

(rf/reg-event-fx
 ::load-and-transpose-always
 (fn
  [{:keys [db]} [evt [path data-path]]]
  {:http-xhrio {:method :get
                :uri path
                :timeout 8000
                :format          (ajax/text-request-format)
                :response-format (ajax/text-response-format)
                :on-success [::transpose-response data-path]
                :on-failure [::bad-response data-path]}}))
