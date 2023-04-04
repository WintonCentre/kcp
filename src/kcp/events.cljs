(ns kcp.events
  (:require
   [winton-utils.data-frame :refer [map-of-vs->v-of-maps]]
   [re-frame.core :as rf]
   [day8.re-frame.http-fx]
   [kcp.fx :as fx]
   [kcp.utils :as utils]
   [kcp.db :as init-db]
   [kcp.factors :as fac]
   [kcp.shortener :as shorts]
   [kcp.model :as model]
   [ajax.core :as ajax]
   [cljs.reader :as  edn]
   [clojure.string :as string]
   [clojure.set :as rel]
                                        ;[shadow.debug :refer [locals ?> ?-> ?->>]]
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
   (let [path-params (-> (get-in db [:current-route :path-params])
                         (assoc :inputs "-"))]
     {::fx/navigate! [:kcp.views/organ-centre-tool-tab-inputs path-params]})))

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
     {::fx/navigate! [:kcp.views/organ-centre-tool-tab-inputs path-params]})))

(rf/reg-event-fx
 ; switch centre
 ::switch-centre
 (fn
   [{:keys [db]} [_ centre]]
   (let [path-params (-> (get-in db [:current-route :path-params])
                         (assoc :centre (name centre)))]
     {::fx/navigate! [:kcp.views/organ-centre-tool-tab-inputs path-params]})))

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

;;
;; Process raw tool bundles into db.
;;
;; It may be more efficient to do this processing at configuration time
;;

(rf/reg-event-fx
 ::store-bundle-inputs
 (fn
   [{:keys [_ db]} [_ data-path response]]
   (let [path-params (get-in db [:current-route :path-params])
         [organ _centre tool _tab] (utils/path-keys path-params)
         tool (if (nil? tool) :ldsurvival tool)
         raw (edn/read-string response)

         bundle-name (name tool)
         inputs-key (bundle-sheet bundle-name "-inputs")
         fmaps (fac/master-f-maps organ (inputs-key raw))
         fmaps* (->> fmaps
                     (group-by :factor)
                     (map (fn [[k [v]]] [k v]))
                     (into {}))
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

         ;; Use SO+ if calculating with ALL data points
         S0+ (map (fn [bc] [(:days bc)
                           ((apply juxt outcome-keys) bc)]) baseline-cifs)

         ;; Otherwise, use SO for a reduced data optimised calculation
         S0 (keep-indexed #(when-not (and (= %1 1) (zero? (first %2)))
                             %2) (model/sample-from S0+))]

     {:db
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

(defn transpose-response
  "store and transpose labelled column data to row maps format.
   :todo - perhaps we should store the column format too to avoid regenerating it. I think we use column format for baselines?"
  [db [_ data-path response]]
  (-> db
      (assoc-in data-path (map-of-vs->v-of-maps (edn/read-string response)))))

(rf/reg-event-db
 ::transpose-response
 transpose-response)

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


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

                                        ; related to the test programe.

(rf/reg-event-db
 ::my-collection
 (fn
   [db [_ collection-score-zero-and-one collection-score-two collection-score-three collection-score-four collection-score-five collection-score-six collection-score-seven
        collection-score-eight-and-more]]

   (assoc db
          :collection-score-zero-and-one collection-score-zero-and-one :collection-score-two collection-score-two :collection-score-three collection-score-three
          :collection-score-four collection-score-four :collection-score-five collection-score-five :collection-score-six collection-score-six
          :collection-score-seven collection-score-seven :collection-score-eight-and-more collection-score-eight-and-more)))


(rf/reg-event-db
 ::standard-error-range
 (fn
   [db]
   (assoc db :standard-error-range
          [[0 {:year-one {:min 99.4 :max 100} :year-five {:min 98 :max 99.4} :year-ten {:min 94.8 :max 97.4}}]
           [1 {:year-one {:min 99.4 :max 100} :year-five {:min 98 :max 99.4} :year-ten {:min 94.8 :max 97.4}}]
           [2 {:year-one {:min 98.8 :max 99.8} :year-five {:min 94 :max 96.6} :year-ten {:min 86.1 :max 90.9}}]
           [3 {:year-one {:min 94.5 :max 97.7} :year-five {:min 81 :max 87.4} :year-ten {:min 74.5 :max 82.7}}]
           [4 {:year-one {:min 88.3 :max 92.1} :year-five {:min 72.9 :max 78.9} :year-ten {:min 59.4 :max 67}}]
           [5 {:year-one {:min 83.6 :max 88.6} :year-five {:min 59.2 :max 66.8} :year-ten {:min 50.6 :max 59}}]
           [6 {:year-one {:min 63.3 :max 70.5} :year-five {:min 36.3 :max 44.1} :year-ten {:min 25.7 :max 33.9}}]
           [7 {:year-one {:min 53.9 :max 64.7} :year-five {:min 26 :max 37.2} :year-ten {:min 19.1 :max 30.3}}]
           [8 {:year-one {:min 34.7 :max 44.7} :year-five {:min 8.6 :max 16.8} :year-ten {:min 6.2 :max 14.2}}]])))

(rf/reg-event-db
 ::fine-score-zero-and-one
 (fn
   [db [_ fine-score-zero-and-one]]

   (assoc db :fine-score-zero-and-one fine-score-zero-and-one)))

(rf/reg-event-db
 ::not-fine-score-zero-and-one
 (fn
   [db [_ not-fine-score-zero-and-one]]

   (assoc db :not-fine-score-zero-and-one not-fine-score-zero-and-one)))


(rf/reg-event-db
 ::fine-score-two
 (fn
   [db [_ fine-score-two]]

   (assoc db :fine-score-two fine-score-two)))

(rf/reg-event-db
 ::not-fine-score-two
 (fn
   [db [_ not-fine-score-two]]

   (assoc db :not-fine-score-two not-fine-score-two)))


(rf/reg-event-db
 ::fine-score-three
 (fn
   [db [_ fine-score-three]]

   (assoc db :fine-score-three fine-score-three)))

(rf/reg-event-db
 ::not-fine-score-three
 (fn
   [db [_ not-fine-score-three]]

   (assoc db :not-fine-score-three not-fine-score-three)))


(rf/reg-event-db
 ::fine-score-four
 (fn
   [db [_ fine-score-four]]

   (assoc db :fine-score-four fine-score-four)))

(rf/reg-event-db
 ::not-fine-score-four
 (fn
   [db [_ not-fine-score-four]]

   (assoc db :not-fine-score-four not-fine-score-four)))


(rf/reg-event-db
 ::fine-score-five
 (fn
   [db [_ fine-score-five]]

   (assoc db :fine-score-five fine-score-five)))

(rf/reg-event-db
 ::not-fine-score-five
 (fn
   [db [_ not-fine-score-five]]

   (assoc db :not-fine-score-five not-fine-score-five)))


(rf/reg-event-db
 ::fine-score-six
 (fn
   [db [_ fine-score-six]]

   (assoc db :fine-score-six fine-score-six)))

(rf/reg-event-db
 ::not-fine-score-six
 (fn
   [db [_ not-fine-score-six]]

   (assoc db :not-fine-score-six not-fine-score-six)))


(rf/reg-event-db
 ::fine-score-seven
 (fn
   [db [_ fine-score-seven]]

   (assoc db :fine-score-seven fine-score-seven)))

(rf/reg-event-db
 ::not-fine-score-seven
 (fn
   [db [_ not-fine-score-seven]]

   (assoc db :not-fine-score-seven not-fine-score-seven)))


(rf/reg-event-db
 ::fine-score-eight-and-more
 (fn
   [db [_ fine-score-eight-and-more]]

   (assoc db :fine-score-eight-and-more fine-score-eight-and-more)))

(rf/reg-event-db
 ::not-fine-score-eight-and-more
 (fn
   [db [_ not-fine-score-eight-and-more]]

   (assoc db :not-fine-score-eight-and-more not-fine-score-eight-and-more)))


(rf/reg-event-db
 ::count-of-collections
 (fn
   [db [_ coll-zero-and-one coll-two coll-three coll-four coll-five coll-six coll-seven coll-eight-and-more]]

   (assoc db :coll-zero-and-one coll-zero-and-one :coll-two coll-two :coll-three coll-three :coll-four coll-four :coll-five coll-five :coll-six coll-six :coll-seven coll-seven
          :coll-eight-and-more coll-eight-and-more)))
