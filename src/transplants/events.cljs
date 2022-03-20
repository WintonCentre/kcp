(ns transplants.events
  (:require
   [winton-utils.data-frame :refer [map-of-vs->v-of-maps]]
   [re-frame.core :as rf]
   [day8.re-frame.http-fx]
   [transplants.fx :as fx]
   [transplants.utils :as utils]
   [transplants.db :as init-db]
   [transplants.factors :as fac]
   ;[transplants.paths :as paths]
   [transplants.shortener :as shorts]
   [transplants.model :as model]
   [ajax.core :as ajax]
   [cljs.reader :as  edn]
   [clojure.string :as string]
   [clojure.set :as rel]
   [shadow.debug :refer [locals ?> ?-> ?->>]]
   ))

;;; Events ;;;

(rf/reg-event-db
 ::initialize-db
 (fn  
   [_ _]
   (merge init-db/default-db
          {:current-route nil
           :randomise-icons false
           :inputs {}
           :selected-vis "bars"
           :window-width (.-innerWidth js/window)
           :test-day 100
           :modal-data nil
           :is-full-screen nil})))

(rf/reg-event-db
 ::update-window-width
 (fn [db [_ new-width]]
   (assoc db :window-width new-width)))

(rf/reg-event-fx
 ::navigate
 (fn
   [{:keys [_ db]} [_ route params query]]
   ;; See `navigate` effect in routes.cljs
   {::fx/navigate! [route params query]}))

(rf/reg-event-db
 ::navigated
 (fn  
   [db [_ new-match]]
   (assoc db :current-route new-match)))


(rf/reg-event-db
 ; active organ
 ::organ
 (fn  
   [db [_ organ]]
   (assoc db :organ organ)))

(rf/reg-event-db
 ; active centre
 ::centre
 (fn  
   [db [_ c]]
   (assoc db :centre c)))

(rf/reg-event-db
 ; organ centres
 ::organ-centres
 (fn  
   [db [_ ocs]]
   (assoc db :organ-centres ocs)))

(rf/reg-event-fx
 ; reset inputs
 ::reset-inputs
 (fn
   [{:keys [db]} [_ _]]
   ;(?-> (:current-route db) ::current-route )
   (let [path-params (-> (get-in db [:current-route :path-params])
                         (assoc :inputs "-"))]
     ;(?-> path-params ::path-params)
     {::fx/navigate! [:transplants.views/organ-centre-tool-tab-inputs path-params]})))
#_(comment
   (assoc path
          :tab %
          :inputs (shorts/db-to-URI (:lookups mdata) inputs)))

#_(rf/reg-event-db
 ; reset inputs
 ::reset-inputs
 (fn  
   [db [_ _]]
   (assoc db :inputs {})))

(rf/reg-event-db
 ; switch to or from full screen mode 
 ::set-full-screen
 (fn
   [db [_ full]]
   (assoc db :is-full-screen full)))

(rf/reg-event-fx
 ; switch tool
 ::switch-tool
 (fn
   [{:keys [db]} [_ tool]]
   (let [path-params (-> (get-in db [:current-route :path-params])
                         (assoc :tool (name tool)))]
     {::fx/navigate! [:transplants.views/organ-centre-tool-tab-inputs path-params]})))

(rf/reg-event-fx
 ; switch centre
 ::switch-centre
 (fn
   [{:keys [db]} [_ centre]]
   (let [path-params (-> (get-in db [:current-route :path-params])
                         (assoc :centre (name centre)))]
     {::fx/navigate! [:transplants.views/organ-centre-tool-tab-inputs path-params]})))

(rf/reg-event-db
 ; guidance
 ::guidance
 (fn  
   [db [_ b-info]]
   (assoc db :guidance b-info)))

(rf/reg-event-db
 ; randomise-icons
 ::randomise-icons
 (fn  
   [db [_ _]]
   (update db :randomise-icons not)))

(rf/reg-event-db
 ; guidance-percent
 ::inc-guidance-percent
 (fn  
   [db [_ increment]]
   (update db :guidance-percent
           (fn [old]
             (let [new (+ old increment)]
               (max (min new 100) 0))))))

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
;;
;; 
;;;
(rf/reg-event-fx
 ::store-bundle-inputs
 (fn 
  [{:keys [_ db]} [_ data-path response]]
  (let [path-params (get-in db [:current-route :path-params])
        [organ _centre tool _tab] (utils/path-keys path-params)
        tool (if (nil? tool) :waiting tool)
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
    ;(?-> tool-inputs ::tool-inputs)
    ;(locals)
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
                          :S0 S0)
                   (dissoc inputs-key)
                   (dissoc baseline-cifs-key)
                   (dissoc baseline-vars-key)))
     :reg-factors [organ fmaps]})))

(rf/reg-event-db
 ::inc-test-day
 (fn 
   [db [_ step]]
   (update db :test-day #(+ step %))))

(rf/reg-event-db
 ::test-day
 (fn 
   [db [_ day]]
   (assoc db :test-day day)))

(rf/reg-event-db
 ::selected-vis
 (fn 
   [db [_ selection]]
   (assoc db :selected-vis selection)))


(rf/reg-event-db
 ;; Takes inputs and the view selection from the route, and enters them in the db
 ::selected-inputs-vis
 (fn
   [db [_ path-inputs selection]]
   (let [ilookups (get-in db [:mdata :ilookups])
         inputs (if ilookups
                  (shorts/URI-to-db ilookups path-inputs)
                  {})]
     (assoc db
            :selected-vis selection
            :inputs inputs))))

#_(rf/reg-event-db
 ;; Takes inputs and the view seection from the route, and enters them in the db
 ::selected-inputs-vis
 (fn
   [db [_ organ inputs selection]]
   (assoc db
          :selected-vis selection
          :inputs inputs)))


(rf/reg-event-db
 ::missing-inputs
 (fn
   [db [_ missing-inputs]]
   (assoc db :missing-inputs missing-inputs)))

;;;
;; Load data sequences
;;;
(rf/reg-event-db
 ::store-response
 (fn
  [db [_ data-path response]]
  (-> db
      (assoc-in data-path (edn/read-string response)))))

(rf/reg-event-db
 ::modal-data
 (fn [db [_ data]]
   (assoc db :modal-data data)))

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
  (filter (fn [[m _s]] (= 1 (:a m))) (clojure.set/index relation [:a :b])))

(defn transpose-response
  "store and transpose labelled column data to row maps format.
   :todo - perhaps we should store the column format too to avoid regenerating it. I think we use column format for baselines?"
  [db [_ data-path response]]
  (-> db
      (assoc-in data-path (map-of-vs->v-of-maps (edn/read-string response)))))

(rf/reg-event-db
 ::transpose-response
 transpose-response
 )

(rf/reg-event-db
 ::transpose-response-centres
 transpose-response)


(rf/reg-event-db
 ::bad-response
 (fn
  [db [_ _data-path _response]]
   (js/console.error)
  db))

(rf/reg-event-fx
 ::store-metadata-response
 (fn
   [{:keys [db]} [_ _data-path response]]
   (let [mdata (edn/read-string response)
         organs (mdata :organ-order)
         ]

     ; todo: VALIDATE mdata once we know what it should look like!
       {:db (-> db
                (assoc :mdata mdata))
        ::fx/load-organ-centres organs})))

(rf/reg-event-fx
 ::load-metadata
 (fn
  [{:keys [db]} [_evt [path data-path]]]
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
  [{:keys [db]} [_evt [path data-path]]]
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
  [{:keys [db]} [_evt [path data-path]]]
  (when (nil? (get-in db data-path))
    {:http-xhrio {:method :get
                  :uri path
                  :timeout 8000
                  :format          (ajax/text-request-format)
                  :response-format (ajax/text-response-format)
                  :on-success [::store-bundle-inputs data-path]
                  :on-failure [::bad-response data-path]}})))

(defn load-and-transpose
  [{:keys [db]} [_evt [path data-path]]]
  (when (nil? (get-in db data-path))
    {:http-xhrio {:method :get
                  :uri path
                  :timeout 8000
                  :format          (ajax/text-request-format)
                  :response-format (ajax/text-response-format)
                  :on-success [::transpose-response-centres data-path]
                  :on-failure [::bad-response data-path]}}))

(rf/reg-event-fx
 ::load-and-transpose
 load-and-transpose
 #_(fn
  [{:keys [db]} [_evt [path data-path]]]
  (when (nil? (get-in db data-path))
    {:http-xhrio {:method :get
                  :uri path
                  :timeout 8000
                  :format          (ajax/text-request-format)
                  :response-format (ajax/text-response-format)
                  :on-success [::transpose-response data-path]
                  :on-failure [::bad-response data-path]}})))

(rf/reg-event-fx
 ::load-and-transpose-centres
 load-and-transpose)

(rf/reg-event-fx
 ::load-and-transpose-always
 (fn
  [{:keys [_db]} [_evt [path data-path]]]
  {:http-xhrio {:method :get
                :uri path
                :timeout 8000
                :format          (ajax/text-request-format)
                :response-format (ajax/text-response-format)
                :on-success [::transpose-response data-path]
                :on-failure [::bad-response data-path]}}))
