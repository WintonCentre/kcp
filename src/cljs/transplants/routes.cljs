(ns transplants.routes
  (:require
   [clojure.string :refer [capitalize]]
   [re-frame.core :as rf]
   [reitit.core :as r]
   [reitit.coercion.spec :as rss]
   [reitit.frontend :as rfr]
   [reitit.frontend.controllers :as rfc]
   [reitit.frontend.easy :as rfe]
   #_[transplants.ui :as ui]
   [transplants.events :as events]
   [transplants.views :as views]
   [transplants.subs :as subs]
   [transplants.paths :as paths]
   #_["react-bootstrap" :as bs :refer [Navbar Navbar.Brand Navbar.Toggle Navbar.Collapse Navbar.Text
                                     Nav Nav.Link]])) 


(defn routes 
  "Reitit nested route syntax can be tricky. Only the leaves are valid.
   This example is helpful:
   (def route
     (r/router
      [\"/api\"
       [\"\" ::api] ; <-- necessary to make \"/api\" a valid leaf route
       [\"/ping\" ::ping]
       [\"/user/:id\" ::user]]))
                   
   as it defines valid routes for /api, /ping, and /user/fred"
  [organs]
  (into 
   ["/"
    [""
     {:name      ::views/home
      :view      views/home-page
      :link-text "Trac tools"
      :controllers [{;; Do whatever initialization needed for home page
       ;; I.e (re-frame/dispatch [::events/load-something-with-ajax])
                     :start (fn [& params] (js/console.log "Entering Home"))
       ;; Teardown can be done here.
                     :stop  (fn [& params] (js/console.log "Leaving Home"))}]}]]

   (mapv 
    (fn [organ]
      (let [name-organ (name organ)]
        [name-organ
         ["" {:name      (keyword "transplants.views" name-organ)
              :view      #(views/organ-home organ)
              :link-text (capitalize name-organ)
              :controllers [{:start (fn [& params]
                                      (rf/dispatch [::events/load-data-xhrio [(paths/centres-path organ) [organ :centres]]])
                                      (rf/dispatch [::events/load-data-xhrio [(paths/tools-path organ) [organ :tools]]])
                                      (js/console.log (str "Entering " name-organ " Home")))
                             :stop  (fn [& params] (js/console.log (str "Leaving " name-organ " Home")))}]}]
         ["/centre" {:name (keyword "transplants.views" (str name-organ "-centre"))
                     :view views/organ-centre #_#_organ 2
                     :link-text (str (name organ) "-centre")
                     :controllers [{:start (fn [& params] (js/console.log "Entering " organ "-centre"))
                                    :stop (fn [& params] (js/console.log "Leaving " organ "-centre"))}]}]]))
    organs)))
  
  
  #_["kidney"
     {:name      ::views/kidney
      :view      views/kidney-home
      :link-text "Kidney"
      :controllers [{;; Do whatever initialization needed for home page
       ;; I.e (rf/dispatch [::events/load-something-with-ajax])
                     :start (fn [& params] 
                              (rf/dispatch [::events/load-data-xhrio [(paths/centres-path :kidney) [:kidney :centres]]])
                              (rf/dispatch [::events/load-data-xhrio [(paths/tools-path :kidney) [:kidney :tools]]])
                              (js/console.log "Entering Kidney Home"))
       ;; Teardown can be done here.
                     :stop  (fn [& params] (js/console.log "Leaving Kidney Home"))}]}]
  #_["About"
     {:name ::views/about
      :view      views/about
      :link-text "About"
      :controllers [{:start (fn [& params] (js/console.log "Entering About"))
                     :stop  (fn [& params] (js/console.log "Leaving About"))}]}]

  #_["Waiting"
     {:name      ::views/waiting
      :view      views/waiting
      :link-text "Competing Risks"
      :controllers [{:start (fn [& params]
                              (js/console.log "Start Waiting")
                              #_(rf/dispatch [::events/load-waiting-data :tool-key]))
                     :stop  (fn [& params] (js/console.log "Leaving Waiting"))}]}]
  
  #_["Surviving" {:name      ::views/surviving
                  :view      views/surviving
                  :link-text "Survival"
                  :controllers
                  [{:start (fn [& params] (js/console.log "Start Surviving"))
                    :stop  (fn [& params] (js/console.log "Leaving Surving"))}]}]

(comment
  (def rts (r/router (routes [:lung :kidney])))
  (get-in (r/match-by-path rts "/lung") [:data :link-text])
  (get-in (r/match-by-path rts "/kidney") [:data :result])
  (get-in (r/match-by-path rts "/lung/centre") [:data :name])
  (get-in (r/match-by-name rts :transplants.views/lung-centre) [:data :link-text])


  
  )

(defn on-navigate [new-match]
  (let [old-match (rf/subscribe [::subs/current-route])]
    (when new-match
      (let [cs (rfc/apply-controllers (:controllers @old-match) new-match)
            m  (assoc new-match :controllers cs)]
        (rf/dispatch [::events/navigated m])))))

(def router
  (rfr/router
   (routes [:lung :kidney])
   {:data {:coercion rss/coercion}}))

(defn init-routes! []
  (js/console.log "initializing routes")
  (rfe/start!
   router
   on-navigate
   {:use-fragment true}))

(comment 
  (routes [:lung :kidney])
  )