(ns transplants.core
  (:require
   [reagent.core :as reagent]
   [re-frame.core :as rf]
   [transplants.routes :as routes]
   [transplants.events :as events]
   [transplants.subs :as subs]
   [transplants.ui :as ui]
   ))

;;; Setup ;;;
(def debug? ^boolean goog.DEBUG)

(defn dev-setup []
  (when debug?
    (enable-console-print!)
    (println "dev mode")))

(defn mount-root []
  (rf/clear-subscription-cache!)
  (routes/init-routes!) ;; Reset routes on figwheel reload
  (reagent/render [ui/root-component {:router routes/router
                                      :subscribe-current-route #(rf/subscribe [::subs/current-route])}]
                  (.getElementById js/document "app")))

(defn ^:export init []
  (rf/dispatch-sync [::events/initialize-db])
  (dev-setup)
  (mount-root)) 