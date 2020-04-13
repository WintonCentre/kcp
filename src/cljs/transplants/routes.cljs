(ns transplants.routes
  (:require-macros [secretary.core :refer [defroute]])
  (:import [goog History]
           [goog.history EventType])
  (:require
   [secretary.core :as secretary]
   [accountant.core :as accountant]
   [goog.events :as gevents]
   [re-frame.core :as re-frame] 
   [transplants.events :as events]
   ))

(defn hook-browser-navigation! []
  (doto (History.)
    (gevents/listen
     EventType/NAVIGATE
     (fn [event]
       (js/console.log "navigate to:" event)
       (secretary/dispatch! (.-token event))))
    (.setEnabled true)))

(comment
  (secretary/dispatch! "/about")
  (re-frame/dispatch [::events/set-active-panel :home-panel])
  (re-frame/dispatch [::events/set-active-panel :about-panel])
  )

(defn app-routes []
  ; No need for hashtag routing if we use the shadow-cljs server in dev 
  #_(secretary/set-config! :prefix "#")
  
  ;; --------------------
  ;; define routes here
  (defroute "/" []
    (re-frame/dispatch [::events/set-active-panel :home-panel])
    )
  
  (defroute "" []
    (re-frame/dispatch [::events/set-active-panel :home-panel]))

  (defroute "/about" []
    (re-frame/dispatch [::events/set-active-panel :about-panel]))


  ;; --------------------
  (hook-browser-navigation!)

  (accountant/configure-navigation!
   {:nav-handler   (fn [path] 
                     (js/console.log ["nav-path " path])
                     (secretary/dispatch! path))
    :path-exists?  (fn [path] 
                     (js/console.log "path-exists? " path) 
                     (contains? #{"" "/" "/about"} path))})
  )
