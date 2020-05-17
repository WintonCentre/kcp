(ns transplants.ui
  "This should become the high level ui interface and should have all ns references factored out into 
the low level ui."
  (:require [reagent.core :as rc]
            [reitit.core :as r]
            [reitit.frontend.easy :as rfe]
            ["react-bootstrap" :as bs]
            [re-frame.core :as rf]
            [transplants.events :as events]))

(def themes
  "Very provisional colour palette. "
  {:lung {:name "Lung Transplants"
          :organ-logo nil
          :primary "black"}
   :kidney {:name "Kidney Transplants"
            :organ-logo nil
            :primary "black"}})

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
   #_[:> bs/Navbar.Text [:span {:style {:font-size "120%" :color (:primary theme)}} 
                       "Trac Tool"#_(:name theme)]]
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
       [:div {:style {:margin-top "0px" :padding-top 100}}
        [(-> current-route :data :view)]
        [footer]]
       [:div
        [:h2 "The current route is invalid"]])]))

(def container (rc/adapt-react-class bs/Container))
(def col (rc/adapt-react-class bs/Col))
(def row (rc/adapt-react-class bs/Row))
(def button (rc/adapt-react-class bs/Button))

(defn card-page
  [title & children]
  [container {:key 1 :style {:min-height "calc(100vh - 160px"}}  
   [row
    [col
     [:h2 {:style {:color "#fff" :margin-bottom 30}} title]
     (into [:<>] (map-indexed (fn [k c] ^{:key k} c) children))]]])

(defn nav-card
  [{:keys [img-src organ centre hospital]}]
  [:> bs/Card {:style {:max-width 300 :min-width 300 :margin-bottom 20}}
   [:> bs/Card.Img {:variant "top" :src img-src :height 160 :filter "brightness(50%)"}]
   [:> bs/Card.ImgOverlay 
    [:> bs/Card.Title {:style {:color "white";"lightblue"
                               ;:text-shadow "2px 2px #000"
                               :font-size "2.5rem"
                               :font-weight "bold"
                               }} centre]]
   [:> bs/Card.Body
    [:> bs/Card.Title hospital]
    [:> bs/ButtonGroup {:vertical true}
     [button {:variant "primary"
              :style {:margin-bottom 2}
              :key 1
              :on-click #(rf/dispatch [::events/navigate :transplants.views/about])}
      "Consultation Aid"]
     [button {:variant "primary"
              :style {:margin-bottom 2}
              :key 2
              :on-click #(rf/dispatch [::events/navigate :transplants.views/waiting])}
      "Competing Risks"]
     [button {:variant "primary"
              :key 3
              :on-click #(rf/dispatch [::events/navigate :transplants.views/surviving])}
      "Survival"]]]])

(defn page
  [title & children]
  [container {:key 1 :style {:min-height "calc(100vh - 180px"
                             :background-color "#ffffffbb"
                             :margin-bottom 20}}  
   [row
    [col
     [:h1 title]
     (into [:<>] (map-indexed (fn [k c] ^{:key k} c) children))]]])


(defn titled-panel
  [title & children]
  [:<>
   [:h2 title]
   (into [:<>] (map-indexed (fn [k c] ^{:key k} c) children))])



