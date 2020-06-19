(ns transplants.subs
  (:require
   [re-frame.core :as rf]
   [day8.re-frame.tracing :refer-macros [fn-traced]]))

;;; 
;; Note that subscription keys are fully qualified in transplants.subs ns, but...
;; db keys are global and named similarly
;; 
;; subscripton keys are used in views (usually) to READ db values
;; db keys are used in event handlers (always) to WRITE to the db
;;; 
(rf/reg-sub ::window-width (fn [db] (:window-width db)))

(rf/reg-sub ::current-route (fn [db] (:current-route db)))

(rf/reg-sub ::metadata (fn [db] (:metadata db)))

(rf/reg-sub ::organ (fn [db] (:organ db)))

(rf/reg-sub ::organ-centres (fn [db] (get-in db [:organ-centres])))

(rf/reg-sub ::tools (fn [db] (get-in db [:tools])))

(rf/reg-sub ::tool (fn [db] (get-in db [:tool])))

(rf/reg-sub ::centre (fn [db] (get-in db [:centre])))

(rf/reg-sub ::bundles (fn [db] (get-in db [:bundles])))

(defn reg-factor-sub
  "Register both input factor"
  [organ-k factor-k]
  (let [ref-k (keyword (name organ-k) (name factor-k))]
    (println "ref-k " ref-k)
    (rf/reg-sub ref-k (fn [db] (get-in db [:inputs organ-k factor-k])))))

(defn reg-factor-event [organ-k factor-k]
  (let [ref-k (keyword (name organ-k) (name factor-k))]
    (rf/reg-event-db
     ref-k
     (fn-traced [db [_ v]] (assoc-in db [:inputs organ-k factor-k] v)))))

(defn reg-factor 
  "Register simple db subscription and event on a factor. Duplicate registrations are possible and will cause aconsole warning
   on startup. The final registration overwrites any previous ones. This function can be used to register db keys at run-time.
   Both subscription and event are registered on the organ-namespaced factor-key."
  [organ-k factor-k]
  (let [ref-k (keyword (name organ-k) (name factor-k))]
    (rf/reg-sub ref-k (fn [db] (get-in db [:inputs organ-k factor-k])))
    (rf/reg-event-db ref-k (fn [db [_ v]] (assoc-in db [:inputs organ-k factor-k] v))))
  #_(reg-factor-sub organ-k factor-k)
  #_(reg-factor-event organ-k factor-k))

(comment
  (keyword (name :kidney) (name :sex))
  ;=> :kidney/sex
  )

;:kidney input factors
(reg-factor :kidney :sex)
(reg-factor :kidney :age)
(reg-factor :kidney :ethnicity)
(reg-factor :kidney :blood-group)
(reg-factor :kidney :matchability)
(reg-factor :kidney :graft)
(reg-factor :kidney :dialysis)
(reg-factor :kidney :sensitised)
(reg-factor :kidney :diabetes)
(reg-factor :kidney :wait)
(reg-factor :kidney :graft)
(reg-factor :kidney :diabetes)
(reg-factor :kidney :donor-age)
(reg-factor :kidney :donor-bmi)
(reg-factor :kidney :donor-hibp)
(reg-factor :kidney :hla-mismatch)

;:lung waiting-inputs and from-listing
(reg-factor :lung :sex)
(reg-factor :lung :thoracotomy)
(reg-factor :lung :thoracotomy)
(reg-factor :lung :d-gp)
(reg-factor :lung :dd-pred)
(reg-factor :lung :in-hosp)
(reg-factor :lung :nyha-class)
(reg-factor :lung :ethnicity)
(reg-factor :lung :fvc)
(reg-factor :lung :age)
(reg-factor :lung :bmi)
(reg-factor :lung :bilirubin)
(reg-factor :lung :blood-group)
(reg-factor :lung :centre-d-gp)
(reg-factor :lung :donor-cmv)
(reg-factor :lung :donor-smokes)
(reg-factor :lung :dd-pred)
(reg-factor :lung :type)
(reg-factor :lung :d-gp)
(reg-factor :lung :age)
(reg-factor :lung :tlc-mismatch)
(reg-factor :lung :fvc)
(reg-factor :lung :bilirubin)
(reg-factor :lung :cholesterol)
(reg-factor :lung :type-d-gp)
