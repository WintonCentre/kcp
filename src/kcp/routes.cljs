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
   ))

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
     :link-text "Transplant Risks"}]
   ["standard-error-test" {:name      ::views/standard-error-test
                           :view      views/standard-error-test
                           :link-text "Standard Error Test"
                           :conflicting true
                           :controllers [{:parameters {:path [:organ]}}]}]
   ["about" {:name      ::views/about
             :view      views/about-page
             :link-text "About"
             :conflicting true
             :controllers [{:parameters {:path [:organ]}}]}]
   ["legal" {:name      ::views/legal
             :view      views/legal-page
             :link-text "Legal"
             :conflicting true
             :controllers [{:parameters {:path [:organ]}}]}]
   ["pubs" {:name      ::views/pubs
            :view      views/pubs-page
            :link-text "Publications"
            :conflicting true
            :controllers [{:parameters {:path [:organ]}}]}]
   ["tech" {:name      ::views/tech
            :view      views/tech-page
            :link-text "Technical"
            :conflicting true
            :controllers [{:parameters {:path [:organ]}}]}]
   [":organ" {:name      ::views/organ
              :view      views/organ-home
              :link-text "organ"
              :conflicting true
              :controllers [{:parameters {:path [:organ]}
                             :start (fn [params]
                                      (let [organ (keyword (get-in params [:path :organ]))]
                                        (rf/dispatch [::events/load-and-transpose-always [(paths/tools-path organ) [:tools]]])))}]}
    [""] ; required to make [":organ"] a leaf route
    ["/:centre" {:name ::views/organ-centre
                 :view views/organ-centre
                 :link-text "organ-centre"
                 :controllers [{:parameters {:path [:organ :centre]}}]}
     [""] ; required to make [":organ/:centre"] a leaf route
     ["/:tool" {:name ::views/organ-centre-tool
                :view views/organ-centre-tool
                :link-text "organ-centre-tool"
                :controllers [{:parameters {:path [:organ :centre :tool]}}]}
      [""] ; required to make [":organ/:centre/:tool"] a leaf route
      ["/:tab" ;
       {:name ::views/organ-centre-tool-tab
        :view views/organ-centre-tool-tab
        :link-text "organ-centre-tool-tab"
        :controllers [{:parameters {:path [:organ :centre :tool :tab]}
                       :start (fn [params]
                                (let [tab (keyword (get-in params [:path :tab]))
                                      path-inputs (get-in params [:path :inputs] "-")]
                                  (rf/dispatch [::events/selected-inputs-vis path-inputs tab])))}]}
       [""]
       ["/:inputs"
        {:name ::views/organ-centre-tool-tab-inputs
         :view views/organ-centre-tool-tab-inputs
         :link-text "organ-centre-tool-tab-inputs"
         :controllers [{:parameters {:path [:organ :centre :tool :tab :inputs]}
                        :start  (fn [params]
                                  (let [tab (keyword (get-in params [:path :tab]))
                                        path-inputs (get-in params [:path :inputs] "-")]

                                    (rf/dispatch [::events/selected-inputs-vis path-inputs tab])))}]}]]]]]])

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
  (rfe/start!
   router
   on-navigate
   {:use-fragment frag?}))
