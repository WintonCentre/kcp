(ns ^:figwheel-hooks transplants.core
  (:require
   [reagent.dom :as rd]
   [re-frame.core :as rf]
   [transplants.routes :as routes]
   [transplants.events :as events]
   [transplants.subs :as subs]
   [transplants.paths :as paths]
   [transplants.ui :as ui]
   [error-boundary.error-boundary :refer [err-boundary]]
   ;[shadow.debug :refer [locals ?> ?-> ?->>]]
   ))

(enable-console-print!)

;;; Setup ;;;
(def debug? ^boolean goog.DEBUG)

(defn dev-setup []
  (when debug?
    (enable-console-print!)
    #_(println "dev mode")))

(defn ^:dev/after-load mount-root
  "Mount components and start the reitit router. The :dev/after-load meta-data causes
   shadow-cljs to call mount-root after a hot-reload and clear the subsciption cache so
   everything gets updated nicely."
  []
  (rf/clear-subscription-cache!)
  (routes/init-routes!) ;; Reset routes on figwheel reload
  (rd/render [err-boundary
              [ui/root-component {:router routes/router
                                  :subscribe-current-route #(rf/subscribe [::subs/current-route])}]]
             (.getElementById js/document "app")))

(defn on-window-resize
  "Handle window-size change by dispatching new width to db"
  [_evt]
  (rf/dispatch [::events/update-window-width (.-innerWidth js/window)]))

(comment
  (mount-root)
  )

(defn ^:export init
  "Initialise the database, sense window-width, and mount root of component tree. 
   
   We're breaking the rules slightly as this is an :afer-load function, which shadow-cljs docs 
   say must be synchronous. However the parts that need to be synchronous here are, and we 
   let the UI display a 'loading' state till the async dispatches complete. 
   
   If we coded this up as an :after-load-async function we'd need to provide a `done` function 
   to call on completion. Meanwhile, the UI would be dead.
   "
  []
  (enable-console-print!)

  (rf/dispatch-sync [::events/initialize-db])

  (rf/dispatch-sync [::events/load-metadata [paths/metadata-path [:metadata]]])

  ;;; Removing the following two lines as they hard-coded lung and kidney organs into the tool
  ;;; Instead, we obtain the organ list by reading in the metadata file above.
  ;(rf/dispatch [::events/load-and-transpose [(paths/centres-path :lung) [:organ-centres :lung]]])
  ;(rf/dispatch [::events/load-and-transpose [(paths/centres-path :kidney) [:organ-centres :kidney]]])

  (.addEventListener js/window "resize" on-window-resize)
  (dev-setup)

  (mount-root)) 

(defonce start-up (do (init) true))

