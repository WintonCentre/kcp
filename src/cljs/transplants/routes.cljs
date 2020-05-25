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

   
   ;; Try a route path ["/:organ"] 
   ;; ""
   ;;   [:/:centre]]
  
   
   (mapv
    (fn [organ]
      (let [name-organ (name organ)]
        [name-organ
         ["" {:name      (keyword "transplants.views" name-organ)
              :view      #(views/organ-home organ)
              :link-text (capitalize name-organ)
              :controllers [{#_#_:identity (fn [id] (println "Identity " id)
                                         (rf/dispatch [::events/centre "birm"]))
                             :start (fn [& params]
                                      (rf/dispatch [::events/organ organ])
                                      (rf/dispatch [::events/load-data-xhrio [(paths/centres-path organ) [:centres]]])
                                      (rf/dispatch [::events/load-data-xhrio [(paths/tools-path organ) [:tools]]])
                                      (js/console.log (str "Entering " name-organ " Home")))
                             :stop  (fn [& params] (js/console.log (str "Leaving " name-organ " Home")))}]}]
         ["/centre/:centre" {:name (keyword "transplants.views" (str name-organ "-centre"))
                             :view views/organ-centre
                             :link-text (str (name organ) "-centre")
                             :controllers [{:parameters {:path [:centre]}
                                            :start (fn [& params]
                                                     (js/console.log "Entering " organ "-centre")
                                                     (println "params" params)
                                                     (rf/dispatch [::events/organ organ])
                                          (rf/dispatch [::events/centre (get-in (first params) [:path :centre])])
                                                     (rf/dispatch [::events/load-data-xhrio [(paths/centres-path organ) [:centres]]])
                                                     (rf/dispatch [::events/load-data-xhrio [(paths/tools-path organ) [:tools]]]))
                                            :stop (fn [& params] (js/console.log "Leaving " organ "-centre"))}]}]]))
    organs)))


(def routes*
  "Reitit nested route syntax can be tricky. Only the leaves are valid.
   This example is helpful:
   (def route
     (r/router
      [\"/api\"
       [\"\" ::api] ; <-- necessary to make \"/api\" a valid leaf route
       [\"/ping\" ::ping]
       [\"/user/:id\" ::user]]))
   as it defines valid routes for /api, /ping, and /user/fred"
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

   
   ;; Try a route path ["/:organ"] 
   ;; ""
   ;;   [:/:centre]]
   
   
   [":organ" {:name      ::views/organ
              :view      views/organ-home*
              :link-text "organ"
              :controllers [{:parameters {:path [:organ]}
                             :start (fn [& [params]]
                                      (println "Entering organ:" params) ; assume {:organ "lung"}
                                      (rf/dispatch [::events/organ (get-in params [:path :organ])]))
                                      ;
                                      ;(rf/dispatch [::events/load-data-xhrio [(paths/centres-path organ) [:centres]]])
                                      ;(rf/dispatch [::events/load-data-xhrio [(paths/tools-path organ) [:tools]]])
                                      ;(js/console.log (str "Entering " name-organ " Home")))
                             :stop  (fn [& params] (js/console.log (str "Leaving " :organ " Home")))}]}]
   #_["/centre/:centre" {:name (keyword "transplants.views" (str name-organ "-centre"))
                       :view views/organ-centre
                       :link-text (str (name organ) "-centre")
                       :controllers [{:parameters {:path [:centre]}
                                      :start (fn [& params]
                                               (js/console.log "Entering " organ "-centre")
                                               (println "params" params)
                                               (rf/dispatch [::events/organ organ])
                                               (rf/dispatch [::events/centre (get-in (first params) [:path :centre])])
                                               (rf/dispatch [::events/load-data-xhrio [(paths/centres-path organ) [:centres]]])
                                               (rf/dispatch [::events/load-data-xhrio [(paths/tools-path organ) [:tools]]]))
                                      :stop (fn [& params] (js/console.log "Leaving " organ "-centre"))}]}]]
)

(comment
  (def rts* (r/router routes*))
  (r/match-by-path rts* "/lung")
  (r/route-names rts*)
  (def rts (r/router (routes [:lung :kidney])))
  (get-in (r/match-by-path rts "/lung") [:data :link-text])
  (get-in (r/match-by-path rts "/kidney") [:data :result])
  (get-in (r/match-by-path rts "/lung/centre") [:data :name])
  (get-in (r/match-by-name rts :transplants.views/lung-centre) [:data :link-text]))

(defn on-navigate [new-match]
  (let [old-match (rf/subscribe [::subs/current-route])]
    (when new-match
      (let [cs (rfc/apply-controllers (:controllers @old-match) new-match)
            m  (assoc new-match :controllers cs)]
        (rf/dispatch [::events/navigated m])))))

(def router
  (rfr/router
  ; (routes [:lung :kidney])
   routes*
   {:data {:coercion rss/coercion}}))

(defn init-routes! []
  (js/console.log "initializing routes")
  (rfe/start!
   router
   on-navigate
   {:use-fragment true}))

(comment
  (routes [:lung :kidney]))