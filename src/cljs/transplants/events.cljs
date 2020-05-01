(ns transplants.events
  (:require
   [re-frame.core :as rf]
   [transplants.fx :as fx]
   [transplants.db :as db]))

;;; Events ;;;

(rf/reg-event-db
 ::initialize-db
 (fn [_ _]
   {:current-route nil}))

(rf/reg-event-fx
 ::navigate
 (fn [{:keys [db]} [_ route]]
   ;; See `navigate` effect in routes.cljs
   {::fx/navigate! route}))

(rf/reg-event-db
 ::navigated
 (fn [db [_ new-match]]
   (assoc db :current-route new-match)))

;;; Waiting tool ;;;
(rf/reg-event-fx
 ::load-waiting-data
 (fn [{:keys [db]} [_ [tool-key route]] ]
            (if (nil? (get db tool-key))
                {:dispatch [::load tool-key route]}
                {::fx/navigate! route})))




