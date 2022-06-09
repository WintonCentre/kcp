(ns kcp.routes
  (:require
   [clojure.edn :as edn]
   [re-frame.core :as rf]
   [reitit.core :as r]
   [reitit.coercion.spec :as rss]
   [reitit.frontend :as rfr]
   [reitit.frontend.controllers :as rfc]
   [reitit.frontend.easy :as rfe]
   #_[kcp.ui :as ui]
   [kcp.events :as events]
   [kcp.views :as views]
   [kcp.subs :as subs]
   [kcp.paths :as paths]
   [kcp.shortener :as shorts]
   ;[shadow.debug :refer [locals ?> ?-> ?->>]]
   #_["react-bootstrap" :as bs :refer [Navbar Navbar.Brand Navbar.Toggle Navbar.Collapse Navbar.Text
                                       Nav Nav.Link]]))
(comment
  (paths/centres-path :kidney)
  (def mdata @(rf/subscribe [::subs/mdata]))
  (def lookups (:lookups mdata))
  (def ilookups (:ilookups mdata))
  (shorts/db-to-URI lookups {:kidney {}})
  (shorts/URI-to-db ilookups "")
  (js/encodeURI {:kidney {}})
  )

(def routes
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
     :link-text "Transplant Risks"
     #_#_:controllers [{;; Do whatever initialization needed for home page
       ;; I.e (re-frame/dispatch [::events/load-something-with-ajax])
                    :start (fn [& params] (println ::routes "Entering Home " params))
       ;; Teardown can be done here.
                    :stop   (fn [& params] (println ::routes "Leaving Home " params))}]}]
   ["about" {:name      ::views/about
             :view      views/about-page
             :link-text "About"
             :conflicting true
             :controllers [{:parameters {:path [:organ]}
                            #_#_:start (fn [params]
                                     (js/console.log "Entering About:" params))
                            #_#_:stop  (fn [_params] (js/console.log (str "Leaving About")))}]}]
   ["legal" {:name      ::views/legal
             :view      views/legal-page
             :link-text "Legal"
             :conflicting true
             :controllers [{:parameters {:path [:organ]}
                            #_#_:start (fn [params]
                                     (js/console.log "Entering Legal:" params))
                            #_#_:stop  (fn [_params] (js/console.log (str "Leaving Legal")))}]}]
   ["pubs" {:name      ::views/pubs
             :view      views/pubs-page
             :link-text "Publications"
             :conflicting true
             :controllers [{:parameters {:path [:organ]}
                            #_#_:start (fn [params]
                                     (js/console.log "Entering Pubs:" params))
                            #_#_:stop  (fn [_params] (js/console.log (str "Leaving Pubs")))}]}]
   ["tech" {:name      ::views/tech
             :view      views/tech-page
             :link-text "Technical"
             :conflicting true
             :controllers [{:parameters {:path [:organ]}
                            #_#_:start (fn [params]
                                     (js/console.log "Entering Tech:" params))
                            #_#_:stop  (fn [_params] (js/console.log (str "Leaving Tech")))}]}]
   [":organ" {:name      ::views/organ
              :view      views/organ-home
              :link-text "organ"
              :conflicting true
              :controllers [{:parameters {:path [:organ]}
                             :start (fn [params]
                                      #_(js/console.log "Entering organ:" params)
                                      (let [organ (keyword (get-in params [:path :organ]))]
                                        (rf/dispatch [::events/load-and-transpose-always [(paths/tools-path organ) [:tools]]])))
                             #_#_:stop  (fn [_params] (js/console.log (str "Leaving " :organ " Home")))}]}
    [""] ; required to make [":organ"] a leaf route
    ["/:centre" {:name ::views/organ-centre
                 :view views/organ-centre
                 :link-text "organ-centre"
                 :controllers [{:parameters {:path [:organ :centre]}
                                #_#_:start (fn [params]
                                         (let [_centre (keyword (get-in params [:path :centre]))]))
                                #_#_:stop (fn [params] (js/console.log "Leaving " (get-in params [:path :centre])))}]}
     [""] ; required to make [":organ/:centre"] a leaf route
     ["/:tool" {:name ::views/organ-centre-tool
                :view views/organ-centre-tool
                :link-text "organ-centre-tool"
                :controllers [{:parameters {:path [:organ :centre :tool]}
                               #_#_:start (fn [params]
                                        (let [_tool (keyword (get-in params [:path :tool]))]
                                          (js/console.log "Entering organ-centre-tool: " params)))
                               #_#_:stop (fn [params] (js/console.log "Leaving " (get-in params [:path :tool])))}]}
      [""] ; required to make [":organ/:centre/:tool"] a leaf route
      ["/:tab" ; 
       {:name ::views/organ-centre-tool-tab
        :view views/organ-centre-tool-tab
        :link-text "organ-centre-tool-tab"
        :controllers [{:parameters {:path [:organ :centre :tool :tab]}
                       :start (fn [params]
                                (let [#_#__tool (keyword (get-in params [:path :tool]))
                                      tab (keyword (get-in params [:path :tab]))
                                      path-inputs (get-in params [:path :inputs] "-")]
                                  #_(js/console.log "Entering organ-centre-tool-tab: " params)
                                  (rf/dispatch [::events/selected-inputs-vis path-inputs tab])))
                       #_#_:stop (fn [params] (js/console.log "Leaving " (pr-str (:path params))))}]}
       [""]
       ["/:inputs"
        {:name ::views/organ-centre-tool-tab-inputs
         :view views/organ-centre-tool-tab-inputs
         :link-text "organ-centre-tool-tab-inputs"
         :controllers [{:parameters {:path [:organ :centre :tool :tab :inputs]}
                        :start  (fn [params]
 ;                                 (?-> "path-inputs"  ::path-inputs)
                                  #_(js/console.log "Entering organ-centre-tool-tab-inputs: " params)
                                  (let [tab (keyword (get-in params [:path :tab]))
                                        ;; organ (keyword (get-in params [:path :organ]))
                                        path-inputs (get-in params [:path :inputs] "-")]

                                        ;; ilookups (:ilookups @(rf/subscribe [::subs/mdata]))
                                        ;; inputs (if ilookups 
                                        ;;          (shorts/URI-to-db ilookups (get-in params [:path :inputs]))
                                        ;;          {})

                                    ;(?-> ilookups ::ilookups)
                                    ;(?-> (get-in params [:path :inputs]) ::path-inputs)
                                    ;(?-> inputs ::inputs)
                                    ;(if (map? inputs)
                                    (rf/dispatch [::events/selected-inputs-vis path-inputs tab])
                                       #_(if (not= path-inputs "-")
                                         (rf/dispatch [::events/selected-inputs-vis organ path-inputs tab])
                                         (rf/dispatch [::events/selected-vis tab]))))
                        #_#_:stop (fn [params] (js/console.log "Leaving " (pr-str (:path params))))}]}]]]]]])


(comment
  (paths/tools-path :lung)
  

  (def m [[[:a 1] [:b 2]] [[:a 3] [:b 4]]])
  m
  (map (partial into {}) m)
  (+ 1 1)
  (def rts (r/router routes))
  (r/match-by-path rts "/lung")
  (r/route-names rts)

  (get-in (r/match-by-path rts "/lung") [:data :link-text])
  (get-in (r/match-by-path rts "/kidney") [:data :result])
  (get-in (r/match-by-path rts "/lung/centre") [:data :name])
  (get-in (r/match-by-name rts :kcp.views/lung-centre) [:data :link-text]))

(defn on-navigate [new-match]
  (let [old-match (rf/subscribe [::subs/current-route])]
;    (locals)
    (when new-match
      (let [cs (rfc/apply-controllers (:controllers @old-match) new-match)
            m  (assoc new-match :controllers cs)]
        (rf/dispatch [::events/navigated m])))))

(def router
  (rfr/router
   routes
   {:data {:coercion rss/coercion}}))

;;to control the use of fragments at compile stage
(goog-define frag? false)

(defn init-routes! []
  (rfe/start!
   router
   on-navigate
   {:use-fragment frag?}))

(comment
  (routes [:lung :kidney]))