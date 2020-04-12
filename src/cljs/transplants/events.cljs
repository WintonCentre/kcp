(ns transplants.events
  (:require
   [re-frame.core :as rf]
   [transplants.db :as db]
   [day8.re-frame.tracing :refer-macros [fn-traced]]
   ))

(rf/reg-event-db
 ::initialize-db
 (fn-traced [_ _]
   db/default-db))

(rf/reg-event-db
 ::set-active-panel
 (fn-traced [db [_ active-panel]]
   (assoc db :active-panel active-panel)))

