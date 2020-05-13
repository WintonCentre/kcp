(ns transplants.routes
  (:require
   [re-frame.core :as rf]
   [reitit.core :as r]
   [reitit.coercion.spec :as rss]
   [reitit.frontend :as rfr]
   [reitit.frontend.controllers :as rfc]
   [reitit.frontend.easy :as rfe]
   [transplants.ui :as ui]
   [transplants.events :as events]
   [transplants.views :as views]
   [transplants.subs :as subs]
   ["react-bootstrap" :as bs :refer [Navbar Navbar.Brand Navbar.Toggle Navbar.Collapse Navbar.Text
                                     Nav Nav.Link]])) 

;;; Routes ;;;


(def routes
  ["/"
   [""
    {:name      ::views/home
     :view      views/home-page
     :link-text "Home"
     :controllers [{;; Do whatever initialization needed for home page
       ;; I.e (re-frame/dispatch [::events/load-something-with-ajax])
                    :start (fn [& params] (js/console.log "Entering Home"))
       ;; Teardown can be done here.
                    :stop  (fn [& params] (js/console.log "Leaving Home"))}]}]

   ["About"
    {:name ::views/about
     :view      views/about
     :link-text "About"
     :controllers [{:start (fn [& params] (js/console.log "Entering About"))
                    :stop  (fn [& params] (js/console.log "Leaving About"))}]}]

   ["Technical"
    {:name      ::views/about-technical
     :view      views/about-technical
     :link-text "Technical"
     :controllers
     [{:start (fn [& params] (js/console.log "Entering About/Technical"))
       :stop  (fn [& params] (js/console.log "Leaving About/Technical"))}]}]
   
   ["Waiting"
    {:name      ::views/waiting
     :view      views/waiting
     :link-text "Waiting"
     :controllers [{:start (fn [& params]
                             (js/console.log "Start Waiting")
                             #_(rf/dispatch [::events/load-waiting-data :tool-key]))
                    :stop  (fn [& params] (js/console.log "Leaving Waiting"))}]}]
   
   ["Surviving" {:name      ::views/surviving
                 :view      views/surviving
                 :link-text "Surviving"
                 :controllers
                 [{:start (fn [& params] (js/console.log "Start Surviving"))
                   :stop  (fn [& params] (js/console.log "Leaving Surving"))}]}]])


(defn on-navigate [new-match]
  (let [old-match (rf/subscribe [::subs/current-route])]
    (when new-match
      (let [cs (rfc/apply-controllers (:controllers @old-match) new-match)
            m  (assoc new-match :controllers cs)]
        (rf/dispatch [::events/navigated m])))))

(def router
  (rfr/router
   routes
   {:data {:coercion rss/coercion}}))

(defn init-routes! []
  (js/console.log "initializing routes")
  (rfe/start!
   router
   on-navigate
   {:use-fragment false}))

(comment 
  routes
  )