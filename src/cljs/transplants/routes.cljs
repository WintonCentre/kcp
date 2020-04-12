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
       (js/console.log "navigate "(.-token event))
       (secretary/dispatch! (.-token event))))
    (.setEnabled true)))


(defn app-routes []
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
     {:nav-handler   (fn [path] (secretary/dispatch! path))
      :path-exists?  (fn [path] (contains? #{"" "/" "/about"} path))}))
