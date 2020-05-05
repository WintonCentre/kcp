(ns transplants.ui
  "This should become the high level ui interface and should have all ns references factored out into 
the low level ui."
  (:require [reagent.core :as rc]
            [reitit.core :as r]
            [reitit.frontend.easy :as rfe]
            ["react-bootstrap" :as bs]))

(def themes
  "Very provisional colour palette. "
  {:lung {:name "Lung Transplants"
          :organ-logo nil
          :primary "#608"}
   :kidney {:name "Kidney Transplants"
            :organ-logo nil
            :primary "#080"}})

(defn href
  "Return relative url for given route. Url can be used in HTML links. Note that k is a route name defined 
in the routes table."
  ([k]
   (href k nil nil))
  ([k params]
   (href k params nil))
  ([k params query]
   (rfe/href k params query)))

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

(defn navbar
  "Straight out of the react-bootstrap example with reitit routing patched in.
It works but application and generic navbar code need to be separated."
  [{:keys [home-url logo router current-route theme]
    :or {theme (:lung themes)}}]
  [:> bs/Navbar {:bg "light" :expand "md" :fixed "top"
                 :style {:border-bottom "1px solid black"}}
   [:> bs/Navbar.Brand  {:href home-url}
    [:img {:src logo 
           :style {:height 40} :alt "NHS"}]]
   [:> bs/Navbar.Text [:span {:style {:margin-left 20 :font-size "120%" :color (:primary theme)}} 
                       (:name theme)]]
   [:> bs/Navbar.Toggle {:aria-controls "basic-navbar-nav"}]
   [:> bs/Navbar.Collapse {:id "basic-navbar-nav" :style {:margin-left 70}}
    (into [:> bs/Nav {:class "mr-auto" :style {:height "100%" :vertical-align "middle"}}]
          (for [route-name (r/route-names router)
                :let       [route (r/match-by-name router route-name)
                            text (-> route :data :link-text)]]
            [:> bs/Nav.Link
             {:class (if (= route-name (-> current-route :data :name)) "active" "")
              :href (href route-name)
              :key  route-name}
             text]))]])

(defn footer []
  [:div {:style {:width "100%" :height "60px" :background-color "black" :color "white"
                 :display "flex" :align-items "center" :justify-content "center"}}
   [:div {:flex 1 :style {:margin "20px"}} "Footer"]])

(defn root-component
  "The root of the component tree which is mounted on the main app html element"
  [{:keys [router subscribe-current-route]}]
  (let [current-route @(subscribe-current-route)]
    [:div
     [navbar {:router router
              :current-route current-route
              :home-url "https://www.nhsbt.nhs.uk/"
              :logo "/assets/nhsbt-left-align_scaled.svg"
              :tool-name "Lung Transplants"}]

     (if current-route
       [:div {:style {:margin-top "100px"}}
        [(-> current-route :data :view)]
        [footer]]
       [:div
        [:h2 "The current route is invalid"]])]))

(def container (rc/adapt-react-class bs/Container))
(def col (rc/adapt-react-class bs/Col))
(def row (rc/adapt-react-class bs/Row))
(def button (rc/adapt-react-class bs/Button))

(defn page
  [children]
  [container {:style {:min-height "calc(100vh - 160px"}}           ;todo: There's probably a flexbox way to do this
   children])

(defn two-panels
  [col1 col2]
  [row
   [col1]
   [col2]])

(defn inputs-panel
  []
  [col
   [:h2 "Inputs"]])

(defn results-panel
  []
  [col
   [:h2 "Results"]])

