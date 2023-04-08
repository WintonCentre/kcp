(ns kcp.subs
  (:require
   [re-frame.core :as rf]))

;;;
;; Note that subscription keys are fully qualified in kcp.subs ns, but...
;; db keys are global and named similarly
;;
;; subscripton keys are used in views (usually) to READ db values
;; db keys are used in event handlers (always) to WRITE to the db
;;;

(rf/reg-sub ::window-width (fn [db] (:window-width db)))

(rf/reg-sub ::current-route (fn [db] (:current-route db)))

(rf/reg-sub ::mdata (fn [db] (:mdata db)))

(rf/reg-sub ::organ-centres (fn [db] (get-in db [:organ-centres])))

(rf/reg-sub ::guidance (fn [db] (get-in db [:guidance])))

(rf/reg-sub ::guidance-percent (fn [db] (get-in db [:guidance-percent])))

(rf/reg-sub ::randomise-icons (fn [db] (get-in db [:randomise-icons])))

(rf/reg-sub ::tools (fn [db] (get-in db [:tools])))

(rf/reg-sub ::bundles (fn [db] (get-in db [:bundles])))

(rf/reg-sub ::inputs (fn [db] (get-in db [:inputs])))

(rf/reg-sub ::test-day (fn [db] (get-in db [:test-day])))

(rf/reg-sub ::cohort-dates (fn [db] (get-in db [:cohort-dates])))

(rf/reg-sub ::selected-vis (fn [db] (get-in db [:selected-vis])))

(rf/reg-sub ::mdata (fn [db] (get-in db [:mdata])))

(rf/reg-sub ::modal-data (fn [db] (get-in db [:modal-data])))

(rf/reg-sub ::is-full-screen (fn [db] (:is-full-screen db)))

(rf/reg-sub ::missing-inputs (fn [db] (:missing-inputs db)))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

                                        ; related to the test programe.

(rf/reg-sub ::standard-error-range (fn [db] (get-in db [:standard-error-range])))

(rf/reg-sub ::wrong-labels-all-scors (fn [db] (get-in db [:wrong-labels-all-scors])))

(rf/reg-sub ::correct-labels-all-scors (fn [db] (get-in db [:correct-labels-all-scors])))

(rf/reg-sub ::collection-of-all-scors (fn [db] (get-in db [:collection-of-all-scors])))

(rf/reg-sub ::count-of-collection-zero-and-one (fn [db] (get-in db [:coll-zero-and-one])))
(rf/reg-sub ::count-of-collection-two (fn [db] (get-in db [:coll-two])))
(rf/reg-sub ::count-of-collection-three (fn [db] (get-in db [:coll-three])))
(rf/reg-sub ::count-of-collection-four (fn [db] (get-in db [:coll-four])))
(rf/reg-sub ::count-of-collection-five (fn [db] (get-in db [:coll-five])))
(rf/reg-sub ::count-of-collection-six (fn [db] (get-in db [:coll-six])))
(rf/reg-sub ::count-of-collection-seven (fn [db] (get-in db [:coll-seven])))
(rf/reg-sub ::count-of-collection-eight-and-more (fn [db] (get-in db [:coll-eight-and-more])))
