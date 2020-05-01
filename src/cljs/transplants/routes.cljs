(ns transplants.routes
  (:require
   [re-frame.core :as rf]
   [reitit.core :as r]
   [reitit.coercion.spec :as rss]
   [reitit.frontend :as rfr]
   [reitit.frontend.controllers :as rfc]
   [reitit.frontend.easy :as rfe]
   [transplants.events :as events]
   [transplants.views :as views]
   [transplants.subs :as subs]
   ["react-bootstrap" :as bs :refer [Navbar Navbar.Brand Navbar.Toggle Navbar.Collapse Navbar.Text
                                     Nav Nav.Link]]))

;;; Routes ;;;

(defn href
  "Return relative url for given route. Url can be used in HTML links."
  ([k]
   (href k nil nil))
  ([k params]
   (href k params nil))
  ([k params query]
   (rfe/href k params query)))

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
    {:view      views/sub-page1
     :link-text "About"
     :controllers [{:start (fn [& params] (js/console.log "Entering About"))
                    :stop  (fn [& params] (js/console.log "Leaving About"))}]}
    ["" {:name ::views/about}]
    ["Technical"
     {:name      ::views/about-technical
      :view      views/about-technical
      :link-text "Technical"
      :controllers
      [{:start (fn [& params] (js/console.log "Entering About/Technical"))
        :stop  (fn [& params] (js/console.log "Leaving About/Technical"))}]}]]
   ["Waiting"
    {:name      ::views/waiting
     :view      views/waiting
     :link-text "Waiting"
     :controllers [{:start (fn [& params]
                             (js/console.log "Start Waiting")
                             (rf/dispatch [::events/load-waiting-data]))
                    :stop  (fn [& params] (js/console.log "Leaving Waiting"))}]}]
   ["Surviving" {:name      ::views/sub-page3
                 :view      views/waiting
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

(defn nav [{:keys [router current-route]}]
  (into
   [:ul]
   (for [route-name (r/route-names router)
         :let       [route (r/match-by-name router route-name)
                     text (-> route :data :link-text)]]
     [:li
      (when (= route-name (-> current-route :data :name))
        "> ")
      ;; Create a normal link that user can click
      [:a {:href (href route-name)} text]])))

(def themes {:lung {:name "Lung Transplants"
                    :primary "#608"}
             :kidney {:name "Kidney Transplants"
                      :primary "#080"}})

(defn navbar
  [{:keys [router current-route theme] 
    :or {theme (:lung themes)}}]
  [:> Navbar {:bg "light" :expand "md" :fixed "top"
              :style {:border-bottom "1px solid black"}}
   [:> Navbar.Brand {:href "https://www.nhsbt.nhs.uk/"} 
    [:img {:src "/assets/nhsbt-left-align_scaled.svg" :style {:height 40} :alt "NHS"}]]
   [:> Navbar.Text [:span {:style {:margin-left 20 :font-size "120%" :color (:primary theme)}} (:name theme)]]
   [:> Navbar.Toggle {:aria-controls "basic-navbar-nav"}]
   [:> Navbar.Collapse {:id "basic-navbar-nav" :style {:margin-left 70}}
    (into [:> Nav {:class "mr-auto" :style {:height "100%" :vertical-align "middle"}}]
          (for [route-name (r/route-names router)
                :let       [route (r/match-by-name router route-name)
                            text (-> route :data :link-text)]]
            [:> Nav.Link
             {:class (if (= route-name (-> current-route :data :name)) "active" "")
              :href (href route-name)
              :key  route-name}
             text]))]])

(defn footer []
  [:div {:style {:width "100%" :height "60px" :background-color "black"}}])

(defn router-component [{:keys [router]}]
  (let [current-route @(rf/subscribe [::subs/current-route])]
    (println "current-route: " current-route)
    [:div 
     [navbar {:router router
              :current-route current-route
              :tool-name "Lung Transplants"}]
     
     (when current-route
       [:div {:style {:margin-top "100px"}}
        [(-> current-route :data :view)]
        [footer]])]))

