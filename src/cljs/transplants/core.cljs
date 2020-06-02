(ns transplants.core
  (:require
   [reagent.dom :as rd]
   [re-frame.core :as rf]
   [transplants.routes :as routes]
   [transplants.events :as events]
   [transplants.subs :as subs]
   [transplants.ui :as ui]
   [error-boundary.error-boundary :refer [err-boundary]]
   ))

;;; Setup ;;;
(def debug? ^boolean goog.DEBUG)

(defn dev-setup []
  (when debug?
    (enable-console-print!)
    (println "dev mode")))

(defn mount-root
  "Mount components and start the reitit router"
  []
  (rf/clear-subscription-cache!)
  (routes/init-routes!) ;; Reset routes on figwheel reload
  (rd/render [err-boundary
              [ui/root-component {:router routes/router
                                  :subscribe-current-route #(rf/subscribe [::subs/current-route])}]]
             (.getElementById js/document "app")))

(comment
  routes/router
  )

(defn on-window-resize
  "Handle window-size change by dispatching new width to db"
  [evt]
  (rf/dispatch [::events/update-window-width (.-innerWidth js/window)]))

(defn ^:export init
  "Initialise the database, sense window-width, and mount root of component tree"
  []
  (rf/dispatch-sync [::events/initialize-db])
  (.addEventListener js/window "resize" on-window-resize)
  (dev-setup)
  (mount-root)) 