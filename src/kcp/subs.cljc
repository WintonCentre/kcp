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

;(rf/reg-sub ::organ (fn [db] (:organ db)))

(rf/reg-sub ::organ-centres (fn [db] (get-in db [:organ-centres])))

(rf/reg-sub ::guidance (fn [db] (get-in db [:guidance])))

(rf/reg-sub ::guidance-percent (fn [db] (get-in db [:guidance-percent])))

(rf/reg-sub ::randomise-icons (fn [db] (get-in db [:randomise-icons])))

(rf/reg-sub ::tools (fn [db] (get-in db [:tools])))

;(rf/reg-sub ::tool (fn [db] (get-in db [:tool]))) ; unused

;(rf/reg-sub ::centre (fn [db] (get-in db [:centre]))) ; unused

(rf/reg-sub ::bundles (fn [db] (get-in db [:bundles])))

;(rf/reg-sub ::numerics (fn [db] (get-in db [:numerics]))) ; unused

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

(rf/reg-sub ::my-collection-score-zero-and-one (fn [db] (get-in db [:collection-score-zero-and-one])))
(rf/reg-sub ::my-collection-score-two (fn [db] (get-in db [:collection-score-two])))
(rf/reg-sub ::my-collection-score-three (fn [db] (get-in db [:collection-score-three])))
(rf/reg-sub ::my-collection-score-four (fn [db] (get-in db [:collection-score-four])))
(rf/reg-sub ::my-collection-score-five (fn [db] (get-in db [:collection-score-five])))
(rf/reg-sub ::my-collection-score-six (fn [db] (get-in db [:collection-score-six])))
(rf/reg-sub ::my-collection-score-seven (fn [db] (get-in db [:collection-score-seven])))
(rf/reg-sub ::my-collection-score-eight-and-more (fn [db] (get-in db [:collection-score-eight-and-more])))

(rf/reg-sub ::standard-error-range (fn [db] (get-in db [:standard-error-range])))

(rf/reg-sub ::fine-score-zero-and-one (fn [db] (get-in db [:fine-score-zero-and-one])))
(rf/reg-sub ::not-fine-score-zero-and-one (fn [db] (get-in db [:not-fine-score-zero-and-one])))

(rf/reg-sub ::fine-score-two (fn [db] (get-in db [:fine-score-two])))
(rf/reg-sub ::not-fine-score-two (fn [db] (get-in db [:not-fine-score-two])))

(rf/reg-sub ::fine-score-three (fn [db] (get-in db [:fine-score-three])))
(rf/reg-sub ::not-fine-score-three (fn [db] (get-in db [:not-fine-score-three])))

(rf/reg-sub ::fine-score-four (fn [db] (get-in db [:fine-score-four])))
(rf/reg-sub ::not-fine-score-four (fn [db] (get-in db [:not-fine-score-four])))

(rf/reg-sub ::fine-score-five (fn [db] (get-in db [:fine-score-five])))
(rf/reg-sub ::not-fine-score-five (fn [db] (get-in db [:not-fine-score-five])))

(rf/reg-sub ::fine-score-six (fn [db] (get-in db [:fine-score-six])))
(rf/reg-sub ::not-fine-score-six (fn [db] (get-in db [:not-fine-score-six])))

(rf/reg-sub ::fine-score-seven (fn [db] (get-in db [:fine-score-seven])))
(rf/reg-sub ::not-fine-score-seven (fn [db] (get-in db [:not-fine-score-seven])))

(rf/reg-sub ::fine-score-eight-and-more (fn [db] (get-in db [:fine-score-eight-and-more])))
(rf/reg-sub ::not-fine-score-eight-and-more (fn [db] (get-in db [:not-fine-score-eight-and-more])))


(rf/reg-sub ::count-of-collection-one-and-zero (fn [db] (get-in db [:coll-one-and-zero])))
(rf/reg-sub ::count-of-collection-two (fn [db] (get-in db [:coll-two])))
(rf/reg-sub ::count-of-collection-three (fn [db] (get-in db [:coll-three])))
(rf/reg-sub ::count-of-collection-four (fn [db] (get-in db [:coll-four])))
(rf/reg-sub ::count-of-collection-five (fn [db] (get-in db [:coll-five])))
(rf/reg-sub ::count-of-collection-six (fn [db] (get-in db [:coll-six])))
(rf/reg-sub ::count-of-collection-seven (fn [db] (get-in db [:coll-seven])))
(rf/reg-sub ::count-of-collection-eight-and-more (fn [db] (get-in db [:coll-eight-and-more])))
