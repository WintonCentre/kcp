(ns ^:figwheel-hooks kcp.core
  (:require
   [reagent.dom :as rd]
   [re-frame.core :as rf]
   [kcp.routes :as routes]
   [kcp.events :as events]
   [kcp.subs :as subs]
   [kcp.paths :as paths]
   [kcp.ui :as ui]
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
  (routes/init-routes!) 
  (rd/render [err-boundary
              [ui/root-component {:router routes/router
                                  :subscribe-current-route #(rf/subscribe [::subs/current-route])}]]
             (.getElementById js/document "app")))

(defn on-window-resize
  "Handle window-size change by dispatching new width to db"
  [_evt]
  ; TODO: debounce this to avoid stupidly small and frequent resizing
  ; e.g. record time of last update and only change width after 100ms have elapsed.
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
  ;(enable-console-print!)

  ;; service worker
  #_(try
    (-> (. js/navigator.serviceWorker (register "/sw_cache_update.js"))
        (.then (fn [] (js/console.log "service worker registered"))))
    (catch js/Object err (js/console.error "Failed to register service worker" err)))

  (rf/dispatch-sync [::events/initialize-db])
  (rf/dispatch-sync [::events/load-metadata [paths/metadata-path [:metadata]]])

  ;;; Removing the following two lines as they hard-coded lung and kidney organs into the tool
  ;;; Instead, we obtain the organ list by reading in the metadata file above.
  ;;(rf/dispatch [::events/load-and-transpose [(paths/centres-path :lung) [:organ-centres :lung]]])
  ;;(rf/dispatch [::events/load-and-transpose [(paths/centres-path :kidney) [:organ-centres :kidney]]])

  (.addEventListener js/window "resize" on-window-resize)
  (dev-setup)
  (mount-root)) 

; Not needed for shadow-cljs where init is declared as a module entry point
;(defonce start-up (do (init) true))

(defn ^:export lung-init
  "Entry point for the lung app"
  []
  ;(js/console.log "LUNG")
  (init)
  )

(defn ^:export kidney_init
  "Entry point for the kidney app"
  []
  ;(js/console.log "KIDNEY")
  (init)
  )