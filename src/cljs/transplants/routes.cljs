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


(def routes
  ["/"
   [""
    {:name      ::views/home
     :view      views/home-page
     :link-text "Trac tools"
     :controllers [{;; Do whatever initialization needed for home page
       ;; I.e (re-frame/dispatch [::events/load-something-with-ajax])
                    :start (fn [& params] (js/console.log "Entering Home"))
       ;; Teardown can be done here.
                    :stop  (fn [& params] (js/console.log "Leaving Home"))}]}]

   ["lung"
    {:name      ::views/lung
     :view      views/lung-home
     :link-text "Lung"
     :controllers [{;; Do whatever initialization needed for home page
       ;; I.e (re-frame/dispatch [::events/load-something-with-ajax])
                    :start (fn [& params] (js/console.log "Entering Lung Home"))
       ;; Teardown can be done here.
                    :stop  (fn [& params] (js/console.log "Leaving Lung Home"))}]}]
   
   ["kidney"
    {:name      ::views/kidney
     :view      views/kidney-home
     :link-text "Kidney"
     :controllers [{;; Do whatever initialization needed for home page
       ;; I.e (re-frame/dispatch [::events/load-something-with-ajax])
                    :start (fn [& params] (js/console.log "Entering Lung Home"))
       ;; Teardown can be done here.
                    :stop  (fn [& params] (js/console.log "Leaving Lung Home"))}]}]
   ["About"
    {:name ::views/about
     :view      views/about
     :link-text "About"
     :controllers [{:start (fn [& params] (js/console.log "Entering About"))
                    :stop  (fn [& params] (js/console.log "Leaving About"))}]}]

   ["Waiting"
    {:name      ::views/waiting
     :view      views/waiting
     :link-text "Competing Risks"
     :controllers [{:start (fn [& params]
                             (js/console.log "Start Waiting")
                             #_(rf/dispatch [::events/load-waiting-data :tool-key]))
                    :stop  (fn [& params] (js/console.log "Leaving Waiting"))}]}]
   
   ["Surviving" {:name      ::views/surviving
                 :view      views/surviving
                 :link-text "Survival"
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