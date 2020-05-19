(ns transplants.events
  (:require
   [re-frame.core :as rf]
   [day8.re-frame.http-fx]
   [transplants.fx :as fx]
   ;[transplants.db :as db]
   [ajax.core :as ajax]
   [cljs.reader :as  edn]
   [day8.re-frame.tracing :refer-macros [fn-traced]]))

;;; Events ;;;

(rf/reg-event-db
 ::initialize-db
 (fn-traced [_ _]
   {:current-route nil
    :window-width (.-innerWidth js/window)}))

(rf/reg-event-db
 ::update-window-width
 (fn [db [_ new-width]]
   (assoc db :window-width new-width)))

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
  [db [_ data-path response]]
  (-> db
      (assoc-in data-path (edn/read-string response))
      (assoc :loading-data-path nil))))

(rf/reg-event-db
 ::bad-response
 (fn-traced
  [db [_ data-path response]]
  (js/alert "bad-response loading while loading " data-path "response = "response)
  (-> db
      (assoc :loading-data-path nil))))

#_(rf/reg-event-db
 ::load-data
 (fn-traced [db [evt [path data-path]]]
            ;(println "event =" evt "path =" path "data-path =" data-path)
            (GET path
              {:handler #(rf/dispatch [::process-response %1])
               :error-handler #(rf/dispatch [::bad-response %1])})
            db))

(rf/reg-event-fx
 ::load-data-xhrio
 (fn-traced [{:keys [db]} [evt [path data-path]]]
            (println "event =" evt "path =" path "data-path =" data-path)
            {:http-xhrio {:method :get
                          :uri path
                          :timeout 8000
                          :format          (ajax/text-request-format)
                          :response-format (ajax/text-response-format)
                          :on-success [::process-response data-path]
                          :on-failure [::bad-response data-path]}}))




