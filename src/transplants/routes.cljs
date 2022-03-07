(ns transplants.routes
  (:require
   [clojure.edn :as edn]
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
   ;[shadow.debug :refer [locals ?> ?-> ?->>]]
   #_["react-bootstrap" :as bs :refer [Navbar Navbar.Brand Navbar.Toggle Navbar.Collapse Navbar.Text
                                       Nav Nav.Link]]))
(comment
  (paths/centres-path :lung))

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
     :controllers [{;; Do whatever initialization needed for home page
       ;; I.e (re-frame/dispatch [::events/load-something-with-ajax])
                    :start (fn [& params] (println ::routes "Entering Home " params))
       ;; Teardown can be done here.
                    :stop   (fn [& params] (println ::routes "Leaving Home " params))}]}]
   ["about" {:name      ::views/about
             :view      views/about-page
             :link-text "About"
             :conflicting true
             :controllers [{:parameters {:path [:organ]}
                            :start (fn [params]
                                     (js/console.log "Entering About:" params))
                            :stop  (fn [_params] (js/console.log (str "Leaving About")))}]}]
   ["legal" {:name      ::views/legal
             :view      views/legal-page
             :link-text "Legal"
             :conflicting true
             :controllers [{:parameters {:path [:organ]}
                            :start (fn [params]
                                     (js/console.log "Entering Legal:" params))
                            :stop  (fn [_params] (js/console.log (str "Leaving Legal")))}]}]
   ["pubs" {:name      ::views/pubs
             :view      views/pubs-page
             :link-text "Publications"
             :conflicting true
             :controllers [{:parameters {:path [:organ]}
                            :start (fn [params]
                                     (js/console.log "Entering Pubs:" params))
                            :stop  (fn [_params] (js/console.log (str "Leaving Pubs")))}]}]
   ["tech" {:name      ::views/tech
             :view      views/tech-page
             :link-text "Technical"
             :conflicting true
             :controllers [{:parameters {:path [:organ]}
                            :start (fn [params]
                                     (js/console.log "Entering Tech:" params))
                            :stop  (fn [_params] (js/console.log (str "Leaving Tech")))}]}]
   [":organ" {:name      ::views/organ
              :view      views/organ-home
              :link-text "organ"
              :conflicting true
              :controllers [{:parameters {:path [:organ]}
                             :start (fn [params]
                                      (js/console.log "Entering organ:" params)
                                      (let [organ (keyword (get-in params [:path :organ]))]
                                        (rf/dispatch [::events/load-and-transpose-always [(paths/tools-path organ) [:tools]]])))
                             :stop  (fn [_params] (js/console.log (str "Leaving " :organ " Home")))}]}
    [""] ; required to make [":organ"] a leaf route
    ["/:centre" {:name ::views/organ-centre
                 :view views/organ-centre-tool-tab-inputs
                 :link-text "organ-centre"
                 :controllers [{:parameters {:path [:organ :centre]}
                                :start (fn [params]
                                         (let [_centre (keyword (get-in params [:path :centre]))]))
                                :stop (fn [params] (js/console.log "Leaving " (get-in params [:path :centre])))}]}
     [""] ; required to make [":organ/:centre"] a leaf route
     ["/:tool" {:name ::views/organ-centre-tool
                :view views/organ-centre-tool-tab-inputs
                :link-text "organ-centre-tool"
                :controllers [{:parameters {:path [:organ :centre :tool]}
                               :start (fn [params]
                                        (let [_tool (keyword (get-in params [:path :tool]))]
                                          (js/console.log "Entering organ-centre-tool: " params)))
                               :stop (fn [params] (js/console.log "Leaving " (get-in params [:path :tool])))}]}
      [""] ; required to make [":organ/:centre/:tool"] a leaf route
      ["/:tab" ; 
       {:name ::views/organ-centre-tool-tab
        :view views/organ-centre-tool-tab-inputs
        :link-text "organ-centre-tool-tab"
        :controllers [{:parameters {:path [:organ :centre :tool :tab]}
                       :start (fn [params]
                                (let [_tool (keyword (get-in params [:path :tool]))
                                      tab (keyword (get-in params [:path :tab]))]
                                  (js/console.log "Entering organ-centre-tool-tab: " params)
                                  (rf/dispatch [::events/selected-vis tab])))
                       :stop (fn [params] (js/console.log "Leaving " (pr-str (:path params))))}]}
       [""]
       ["/:inputs"
        {:name ::views/organ-centre-tool-tab-inputs
         :view views/organ-centre-tool-tab-inputs
         :link-text "organ-centre-tool-tab-inputs"
         :controllers [{:parameters {:path [:organ :centre :tool :tab :inputs]}
                        :start  (fn [params]
                                 (let [tab (keyword (get-in params [:path :tab]))
                                       organ (keyword (get-in params [:path :organ]))
                                       ;;todo move and validate the following
                                       inputs (-> (get-in params [:path :inputs])
                                                  (js/decodeURI)
                                                  (edn/read-string))]
                                   (js/console.log "Entering organ-centre-tool-tab-inputs: " params)
                                   ;(js/console.log "tab" tab)()
                                   ;(js/console.log "organ" organ)
                                   ;(js/console.log "inputs" inputs)
                                   (if (map? inputs)
                                     (rf/dispatch [::events/selected-inputs-vis organ inputs tab])
                                     (rf/dispatch [::events/selected-vis tab])
                                     )))
                        :stop (fn [params] (js/console.log "Leaving " (pr-str (:path params))))}]}]]]]]])


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
  (get-in (r/match-by-name rts :transplants.views/lung-centre) [:data :link-text]))

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

;;to control the use of fragments at compile stage
(goog-define frag? false)

(defn init-routes! []
  (js/console.log "initializing routes")
  (rfe/start!
   router
   on-navigate
   {:use-fragment frag?}))

(comment
  (routes [:lung :kidney]))