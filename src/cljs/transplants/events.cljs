(ns transplants.events
  (:require
   [re-frame.core :as rf]
   [day8.re-frame.tracing :refer-macros [fn-traced]]
   [transplants.fx :as fx]
   ))

;;; Events ;;;

(rf/reg-event-db
 ::initialize-db
 (fn-traced [_ _]
   {:current-route nil}))

(rf/reg-event-fx
 ::navigate
 (fn-traced [db [_ route]]
   ;; See `navigate` effect in routes.cljs
   {::fx/navigate! route}))

(rf/reg-event-db
 ::navigated
 (fn-traced [db [_ new-match]]
   (assoc db :current-route new-match)))


