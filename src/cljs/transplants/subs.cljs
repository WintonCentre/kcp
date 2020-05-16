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
(rf/reg-sub ::current-route (fn [db] (:current-route db)))

(rf/reg-sub ::lung-centres-loaded? (fn [db] (:lung-centres-loaded? db)))
