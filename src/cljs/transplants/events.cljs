(ns transplants.events
  (:require
   (winton-utils.data-frame :refer [map-of-vs->v-of-maps v-of-maps->map-of-vs])
   [re-frame.core :as rf]
   [day8.re-frame.http-fx]
   [transplants.fx :as fx]
   [transplants.utils :as utils]
   [transplants.db :as init-db]
   [transplants.factors :as fac]
   [transplants.paths :as paths]
   [ajax.core :as ajax]
   [cljs.reader :as  edn]
   [day8.re-frame.tracing :refer-macros [fn-traced]]
   [clojure.string :as string]
   [clojure.set :as rel]))

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

  #_(index-by {:factor '(":age" ":sex" ":ethnicity" ":dialysis" ":diabetes" ":sensitised" ":blood-group" ":matchability" ":graft" ":centre"), :level '(":50+" ":male" ":white" ":yes" ":no" ":no" ":O" ":easy" ":first-graft" ":unused")}
              [:factor]))

#_(defn get-sheet-indexes
    "Look up the indexing keys for a spreadsheet. These are the column keys for columns coloured in orange."
    [db sheet-name]
    (get-in db [:metadata :sheet-meta sheet-name]))

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

(defn sample-from
  "returns a selection of data from H0."
  [H0]
  (let [day-in-first? (partial utils/day-in? first)

        W1H0 (->> H0
                  (take-while (day-in-first? utils/week)))
        M1H0 (->> H0
                  (drop-while (day-in-first? utils/week))
                  (take-while (day-in-first? utils/month)))
        Q1H0 (->> H0
                  (drop-while (day-in-first? utils/month))
                  (take-while (day-in-first? utils/quarter)))
        Qs (->> H0
                (drop-while (day-in-first? utils/quarter)))]

    ;; Selected days are: 
    ;;     weekly for first month; 
    ;;     then monthly for 1st quarter; 
    ;;     then by quarter
    (concat W1H0
            (mapv last (partition-by (fn [[day H]] (utils/day->week day)) M1H0))
            (mapv last (partition-by (fn [[day H]] (utils/day->month day)) Q1H0))
            (mapv last (partition-by (fn [[day H]] (utils/day->quarter day)) Qs)))))

  ;; for (i in 1:(dim(smoothed_cent)[1]-1)){
  ;;   h_tx[i] <- smoothed_cent$capHtx[i+1] - smoothed_cent$capHtx[i]
  ;;   p_tx[i] <- h_tx[i] * capS[i]
  ;;   capF_tx[i+1] <- capF_tx[i] + p_tx[i]

  ;;   h_rem[i] <- smoothed_cent$capHrem[i+1] - smoothed_cent$capHrem[i]
  ;;   p_rem[i] <- h_rem[i] * capS[i]
  ;;   capF_rem[i+1] <- capF_rem[i] + p_rem[i]

  ;;   capS[i+1] <- capS[i] - p_tx[i] - p_rem[i]

  ;;   sumall[i] <- capS[i] + capF_rem[i] + capF_tx[i]

  ;; }

  ;; out <- cbind(smoothed_cent, capS, capF_rem, capF_tx, sumall)


(defn cox-adjusted
  "survival-data is a a vector of [day survival-by-outcomes].
   survival-by-outcome is a vector of survivals for each outcome.
   sum-beta-xs is a vector of sum-beta-xs for each outcome"
  [survival-data sum-beta-xs]
  (loop [SD survival-data
         h [0 0]
         s 1
         f [0 0]
         sumall 1
         result []]
    (let [[days S] (first SD)
          SDs (rest SD)]
      (if (seq SDs)
        (let [[days+ S+] (first SDs)
              H (map * (map identity #_#(- (js/Math.log %)) S) sum-beta-xs)
              H+ (map * (map identity #_#(- (js/Math.log %)) S+) sum-beta-xs)
              h+ (mapv #(/ (- %2 %1) (- days+ days)) H H+)
              ps+ (mapv #(* s %) h+)
              f+ (mapv + f ps+)
              s+ (- s (apply + ps+))
              sumall+ (+ s (apply + f))]
          (recur SDs
                 h+
                 s+
                 f+
                 sumall+
                 (conj result {:days days+ :H H+ :h h+ :s s+ :f f+ :sumall sumall})))
        result))))

(comment
  (let [surv-data [[0, [0, 0]]
           [1, [0.01224178 0.003931381]]
           [2, [0.01579812 0.007926612]]
           [3, [0.01579812 0.007926612]]
           [4, [0.01938379 0.009955756]]
           [5, [0.01938379 0.009955756]]]
        sum-beta-xs [1 1]]

       (cox-adjusted surv-data sum-beta-xs))
  ;; => [{:days 0, :h [0 0], :s 1, :f [0 0]}
  ;;     {:days 1,
  ;;      :h [0.01224178 0.003931381],
  ;;      :s 0.983826839,
  ;;      :f [0.01224178 0.003931381],
  ;;      :sumall 1}
  ;;     {:days 2,
  ;;      :h [0.003556339999999998 0.003995230999999999],
  ;;      :s 0.9763974007735859,
  ;;      :f [0.01574060274060926 0.00786199648580481],
  ;;      :sumall 1}
  ;;     {:days 3,
  ;;      :h [0 0],
  ;;      :s 0.9763974007735859,
  ;;      :f [0.01574060274060926 0.00786199648580481],
  ;;      :sumall 1}
  ;;     {:days 4,
  ;;      :h [0.0035856700000000026 0.002029144],
  ;;      :s 0.9709151109781587,
  ;;      :f [0.019241641608641086 0.009843247413200126],
  ;;      :sumall 1}
  ;;     {:days 5,
  ;;      :h [0 0],
  ;;      :s 0.9709151109781587,
  ;;      :f [0.019241641608641086 0.009843247413200126], 
  ;;      :sumall 1}]

  
  ;; PREVIOUSLY
  ;; => [{:h [0 0], :s 1, :f [0 0], :ps [0 0]}
  ;;     {:h [0.01224178 0.003931381],
  ;;      :s 0.983826839,
  ;;      :f [0.01224178 0.003931381],
  ;;      :ps [0.01224178 0.003931381],
  ;;      :sumall 1}
  ;;     {:h [0.003556339999999998 0.003995230999999999],
  ;;      :s 0.9763974007735859,
  ;;      :f [0.01574060274060926 0.00786199648580481],
  ;;      :ps [0.0034988227406092583 0.003930615485804808],
  ;;      :sumall 1}
  ;;     {:h [0 0],
  ;;      :s 0.9763974007735859,
  ;;      :f [0.01574060274060926 0.00786199648580481],
  ;;      :ps [0 0],
  ;;      :sumall 1}
  ;;     {:h [0.0035856700000000026 0.002029144],
  ;;      :s 0.9709151109781587,
  ;;      :f [0.019241641608641086 0.009843247413200126],
  ;;      :ps [0.0035010388680318263 0.001981250927395317],
  ;;      :sumall 1}
  ;;     {:h [0 0],
  ;;      :s 0.9709151109781587,
  ;;      :f [0.019241641608641086 0.009843247413200126], 
  ;;      :ps [0 0], 
  ;;      :sumall 1}]

  ;; => 
  0)
;;;
;; Process raw tool bundles into db. 
;; 
;; It will be more efficient to do this processing at configuration time
;;;
(rf/reg-event-fx
 ::store-bundle-inputs
 (fn ;;-traced
  [{:keys [_ db]} [_ data-path response]]
  (let [path-params (get-in db [:current-route :path-params])
        [organ centre tool] (utils/path-keys path-params)
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




        H0+ (map (fn [bc] [(:days bc)
                           (map (comp - js/Math.log)
                                ((apply juxt outcome-keys) bc))]) baseline-cifs)

        H0 (keep-indexed #(when-not (and (= %1 1) (zero? (first %2)))
                            %2) (sample-from H0+))

        delta-t [0];(map #(- (first %2) (first %1)) H0 (rest H0))
        delta-H [0];(map #((partial map -) (second %2) (second %1)) H0 (rest H0))
        h (map (fn [dH-i dt] (map #(/ % dt) dH-i)) delta-H delta-t)

        ;;dH-i-by-dt (fn [dH-i dt] (map #(/ % dt) dH-i))
        ;h 7
        tool-centre-bundle {:fmaps tool-inputs
                            :baseline-vars baseline-vars
                            :outcome-keys outcome-keys
                            :timed-outcome-keys timed-outcome-keys
                            :H0 H0
                            :h h



                            ;;:delta-h delta-h
                             ;;:H0+ H0+
                            }]

    {:db (-> (assoc db :oct-bundle tool-centre-bundle)
             (assoc-in data-path
                       (-> raw
                           (assoc :-inputs tool-inputs
                                  :-baseline-cifs baseline-cifs
                                  :-baseline-vars baseline-vars
                                  :outcome-keys outcome-keys
                                   ;;:H0 H0*
                                  :H0 H0
                                  :cH (count delta-H)
                                  :ct (count delta-t)
                                  :delta-t delta-t
                                  :delta-H delta-H
                                  :h h)
                           (dissoc inputs-key)
                           (dissoc baseline-cifs-key)
                           (dissoc baseline-vars-key))))
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
 (fn-traced
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
 (fn-traced
  [db [_ data-path response]]
  (-> db
      (assoc-in data-path (map-of-vs->v-of-maps (edn/read-string response))))))

(rf/reg-event-db
 ::bad-response
 (fn-traced
  [db [_ data-path response]]
  #_(when (or data-path response)
      (js/alert (str "bad-response while loading " data-path "response = " response)))
  db))

(rf/reg-event-fx
 ::store-metadata-response
 (fn-traced
  [{:keys [db]} [_ data-path response]]
  (let [mdata (edn/read-string response)
        organs (map :organ (:organ-meta mdata))]

     ; Todo: remove this side-effecting code!! (though it does work)
     ; We need a load and transpose effect for multiple organs
    (doseq [organ organs]
      (rf/dispatch [::load-and-transpose [(paths/centres-path organ) [:organ-centres organ]]]))

    {:db (-> db
             (assoc-in data-path mdata))})))

(rf/reg-event-fx
 ::load-metadata
 (fn-traced
  [{:keys [db]} [evt [path data-path]]]
  (println ::meta3 path)
  (println ::meta4 data-path)
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
 (fn-traced
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
 (fn-traced
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
 (fn-traced
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
 (fn-traced
  [{:keys [db]} [evt [path data-path]]]
  {:http-xhrio {:method :get
                :uri path
                :timeout 8000
                :format          (ajax/text-request-format)
                :response-format (ajax/text-response-format)
                :on-success [::transpose-response data-path]
                :on-failure [::bad-response data-path]}}))
