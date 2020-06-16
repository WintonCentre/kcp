(ns transplants.subs
  (:require
   [re-frame.core :as rf]))

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

;:kidney input factors
(rf/reg-sub :kidney/sex (fn [db] (get-in db [:kidney/sex])))
(rf/reg-sub :kidney/age (fn [db] (get-in db [:kidney/age])))
(rf/reg-sub :kidney/ethnicity (fn [db] (get-in db [:kidney/ethnicity])))
(rf/reg-sub :kidney/blood-group (fn [db] (get-in db [:kidney/blood-group])))
(rf/reg-sub :kidney/matchability (fn [db] (get-in db [:kidney/matchability])))
(rf/reg-sub :kidney/graft (fn [db] (get-in db [:kidney/graft])))
(rf/reg-sub :kidney/dialysis (fn [db] (get-in db [:kidney/dialysis])))
(rf/reg-sub :kidney/sensitised (fn [db] (get-in db [:kidney/sensitised])))
(rf/reg-sub :kidney/diabetes (fn [db] (get-in db [:kidney/diabetes])))
(rf/reg-sub :kidney/wait (fn [db] (get-in db [:kidney/wait])))
(rf/reg-sub :kidney/graft (fn [db] (get-in db [:kidney/graft])))
(rf/reg-sub :kidney/diabetes (fn [db] (get-in db [:kidney/diabetes])))
(rf/reg-sub :kidney/donor-age (fn [db] (get-in db [:kidney/donor-age])))
(rf/reg-sub :kidney/donor-bmi (fn [db] (get-in db [:kidney/donor-bmi])))
(rf/reg-sub :kidney/donor-hibp (fn [db] (get-in db [:kidney/donor-hibp])))
(rf/reg-sub :kidney/hla-mismatch (fn [db] (get-in db [:kidney/hla-mismatch])))

;:lung waiting-inputs and from-listing
(rf/reg-sub :lung/sex (fn [db] (get-in db [:lung/sex])))
(rf/reg-sub :lung/thoracotomy (fn [db] (get-in db [:lung/sex])))
(rf/reg-sub :lung/thoracotomy (fn [db] (get-in db [:lung/thoracotomy])))
(rf/reg-sub :lung/d-gp (fn [db] (get-in db [:lung/d-gp])))
(rf/reg-sub :lung/dd-pred (fn [db] (get-in db [:lung/dd-pred])))
(rf/reg-sub :lung/in-hosp (fn [db] (get-in db [:lung/in-hosp])))
(rf/reg-sub :lung/nyha-class (fn [db] (get-in db [:lung/nyha-class])))
(rf/reg-sub :lung/ethnicity (fn [db] (get-in db [:lung/ethnicity])))
(rf/reg-sub :lung/fvc (fn [db] (get-in db [:lung/fvc])))
(rf/reg-sub :lung/age (fn [db] (get-in db [:lung/age])))
(rf/reg-sub :lung/bmi (fn [db] (get-in db [:lung/bmi])))
(rf/reg-sub :lung/bilirubin (fn [db] (get-in db [:lung/bilirubin])))
(rf/reg-sub :lung/blood-group (fn [db] (get-in db [:lung/blood-group])))
(rf/reg-sub :lung/centre-d-gp (fn [db] (get-in db [:lung :centre-d-gp])))

;:lung post-transplant inputs
;:donor-cmv
(rf/reg-sub :lung/donor-cmv (fn [db] (get-in db [:lung/donor-cmv])))
(rf/reg-sub :lung/donor-smokes (fn [db] (get-in db [:lung/donor-smokes])))
(rf/reg-sub :lung/dd-pred (fn [db] (get-in db [:lung/dd-pred])))
(rf/reg-sub :lung/type (fn [db] (get-in db [:lung/type])))
(rf/reg-sub :lung/d-gp (fn [db] (get-in db [:lung/d-gp])))
(rf/reg-sub :lung/age (fn [db] (get-in db [:lung/age])))
(rf/reg-sub :lung/tlc-mismatch (fn [db] (get-in db [:lung/tlc-mismatch])))
(rf/reg-sub :lung/fvc (fn [db] (get-in db [:lung/fvc])))
(rf/reg-sub :lung/bilirubin (fn [db] (get-in db [:lung/bilirubin])))
(rf/reg-sub :lung/cholesterol (fn [db] (get-in db [:lung/cholesterol])))
(rf/reg-sub :lung:type-d-gp (fn [db] (get-in db [:lung:type-d-gp])))
