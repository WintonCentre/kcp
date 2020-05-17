(ns transplants.events
  (:require
   [re-frame.core :as rf]
   [day8.re-frame.http-fx]
   [transplants.fx :as fx]
   [transplants.db :as db]
   [ajax.core :refer [GET] :as ajax]
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
  (js/console.log (:loading-data-path db))
  (-> db
      (assoc :lung-centres-loaded? true)
      (assoc-in (:loading-data-path db) (edn/read-string response)))))

(rf/reg-event-db
 ::bad-response
 (fn-traced
  [db [_ response]]
  (js/alert "bad-response loading while loading " (:loading-data-path db) "response = "response)
  (-> db
      (assoc :lung-centres-loaded? false))))

(rf/reg-event-db
 ::load-data
 (fn-traced [db [evt [path data-path]]]
            (println "event =" evt "path =" path "data-path =" data-path)
            (GET path
              {:handler #(rf/dispatch [::process-response %1])
               :error-handler #(rf/dispatch [::bad-response %1])})
            db))

(rf/reg-event-fx
 ::load-data-xhrio
 (fn-traced [{:keys [db]} [evt [path data-path]]]
            (println "event =" evt "path =" path "data-path =" data-path)
            {:db (assoc db :loading-data-path data-path)
             :http-xhrio {:method :get
                          :uri path
                          :timeout 8000
                          :format          (ajax/text-request-format)
                          :response-format (ajax/text-response-format)
                          :on-success [::process-response]
                          :on-failure [::bad-response]}}))




