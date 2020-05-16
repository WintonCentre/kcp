(ns transplants.events
  (:require
   [re-frame.core :as rf]
   [transplants.fx :as fx]
   [transplants.db :as db]
   [ajax.core :refer [GET]]
   [cljs.reader :as  edn]
   [day8.re-frame.tracing :refer-macros [fn-traced]]))

;;; Events ;;;

(rf/reg-event-db
 ::initialize-db
 (fn-traced [_ _]
   {:current-route nil}))

(rf/reg-event-fx
 ::navigate
 (fn-traced [{:keys [db]} [_ route]]
   ;; See `navigate` effect in routes.cljs
   {::fx/navigate! route}))

(rf/reg-event-db
 ::navigated
 (fn-traced [db [_ new-match]]
   (assoc db :current-route new-match)))

;;
;; Load data sequences
;;
(rf/reg-event-db
 ::process-response
 (fn-traced
  [db [_ response]]
  (js/console.log  (:key (edn/read-string response)))
  (-> db
      (assoc :lung-centres-loaded? true))))

(rf/reg-event-db
 ::load-data
 (fn-traced [db [evt [path data-path]]]
            (println "event =" evt "path =" path "data-path =" data-path)
            (GET path
              {:handler #(rf/dispatch [::process-response %1])
               :error-handler #(rf/dispatch [::bad-response %1])})
            db))




