(ns transplants.core
  (:require
   [reagent.dom :as rd]
   [re-frame.core :as rf]
   [transplants.routes :as routes]
   [transplants.events :as events]
   [transplants.subs :as subs]
   [transplants.paths :as paths]
   [transplants.ui :as ui]
   [error-boundary.error-boundary :refer [err-boundary]]
   ))

;;; Setup ;;;
(def debug? ^boolean goog.DEBUG)

(defn dev-setup []
  (when debug?
    (enable-console-print!)
    #_(println "dev mode")))

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
  "Initialise the database, sense window-width, and mount root of component tree. 
   
   We're breaking the rules slightly as this is an :afer-load function, which shadow-cljs docs 
   say it must be synchronous. However the parts that need to be synchronous here are, and we 
   let the UI display a 'loading' state till the async dispatches complete. 
   
   If we coded this up as an :after-load-async function we'd need to provide a `done` function 
   to call on completion. Meanwhile, the UI would be dead.
   "
  []
  (rf/dispatch-sync [::events/initialize-db])
  (rf/dispatch-sync [::events/load-edn [paths/metadata-path [:metadata]]])
  (rf/dispatch [::events/load-and-transpose [(paths/centres-path :lung) [:organ-centres :lung]]])
  (rf/dispatch [::events/load-and-transpose [(paths/centres-path :kidney) [:organ-centres :kidney]]])

  (.addEventListener js/window "resize" on-window-resize)
  (dev-setup)
  (mount-root)) 