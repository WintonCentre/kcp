(ns transplants.ui
  "This should become the high level ui interface and should have all ns references factored out into 
the low level ui."
  (:require [clojure.string :refer [ends-with? split capitalize]]
            [reagent.core :as rc]
            [reitit.core :as r]
            [reitit.frontend.easy :as rfe]
            [reitit.frontend :as rfr]
            ["react-bootstrap" :as bs]
            [re-frame.core :as rf]
            [transplants.events :as events]))

(enable-console-print!)


(def container (rc/adapt-react-class bs/Container))
(def col (rc/adapt-react-class bs/Col))
(def col-sm (rc/adapt-react-class bs/Col))
(def row (rc/adapt-react-class bs/Row))
(def button (rc/adapt-react-class bs/Button))
(def card-header (rc/adapt-react-class bs/Card.Header))

(def mobile-break 
  "Screens of this size or smaller are rendered with mobile orientedt views"
  414)


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

(defn get-client-rect
  "return the bounding rectangle of a node"
  [node]
  (let [r (.getBoundingClientRect node)]
    {:left (.-left r), :top (.-top r) :right (.-right r) :bottom (.-bottom r) :width (.-width r) :height (.-height r)}))


#_(defn nav [{:keys [router current-route]}]
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

(defn link-text
  "The route :data :link-text gives an indication of link text for this route, which must be adjusted
   according to its path-params"
  [route]

  (let [path (-> route :path-params)
        _ (js/console.log route)
        organ (:organ path)
        centre (:centre path)]
    (if organ
      organ
      "Home")))
(comment
;;;;;
;;
;;
  (defn- resolve-href
    [to path-params query-params]
    (if (keyword? to)
      (rfe/href to path-params query-params)
      (let [match  (rfr/match-by-path rfr/router to)
            route  (-> match :data :name)
            params (or path-params (:path-params match))
            query  (or query-params (:query-params match))]
        (if match
          (rfe/href route params query)
          to))))
  

  (defn Link
    [{:keys [to path-params query-params active]} & children]
    (let [href (resolve-href to path-params query-params)]
      (into
       [:a {:href href} (when active "> ")] ;; Apply styles or whatever
       children)))

  (defn- name-matches?
    [name path-params match]
    (and (= name (-> match :data :name))
         (= (not-empty path-params)
            (-> match :parameters :path not-empty))))

  (defn- url-matches?
    [url match]
    (= (-> url (split #"\?") first)
       (:path match)))

  (defn NavLink
    [{:keys [to path-params current-route] :as props} & children]
    [Link {:to to
           :path-params path-params
           :query-params (when current-route 
                           (get-in current-route [:data :query-params]))
           :active (when current-route
                     (or (name-matches? to path-params current-route)
                         (url-matches? to current-route)))}])

  (defn NavLink-
    [{:keys [to path-params current-route] :as props} & children]
    (let [active (or (name-matches? to path-params current-route)
                     (url-matches? to current-route))]
      [Link (assoc props :active active) children])))
;;
;;;;;


(defn active-key
  "Return the active href key given the current-route"
  [route]
  (let [ak  (cond
              (= {} (:path-params route)) (href :transplants.views/home)
              :else (get-in route [:path-params :organ]))]
    (js/console.log "ak " ak)
    ak)
  )

(comment 
  
  
  )

(defn navbar
  "Straight out of the react-bootstrap example with reitit routing patched in."
  [{:keys [home-url logo router current-route theme]
    :or {theme (:lung themes)}}]
  (let [navbar-routes (remove (comp #(ends-with? % "centre") name) (r/route-names router))
        organ @(rf/subscribe [:transplants.subs/organ])
        centres @(rf/subscribe [:transplants.subs/centres])]
    [:> bs/Navbar {:bg "light" :expand "md" #_#_:fixed "top"
                   :style {:border-bottom "1px solid black" :opacity "0.8"}}
     [:> bs/Navbar.Brand  {:href home-url} [:img {:src logo :style {:height 40} :alt "NHS"}]]
     [:> bs/Navbar.Toggle "basic-navbar-nav"]
     [:> bs/Navbar.Collapse {:id "basic-navbar-nav" :style {:margin-left 70}}

     [:> bs/Nav {:active-key (if organ (name organ) "home")
                 ;:class "mr-auto" :style {:height "100%" :vertical-align "middle"}
                 }
      [:> bs/Nav.Link {:event-key :home
                       :href (href :transplants.views/home)} "Home"]
      (if organ
        [:> bs/Nav.Link  {:event-key (name organ)
                          :href (href :transplants.views/organ)} (capitalize (name organ))]
        [:<>
         [:> bs/Nav.Link {:event-key "lung"
                          :href (href :transplants.views/organ {:organ "lung"})} "Lung"]
         [:> bs/Nav.Link  {:event-key "kidney"
                           :href (href :transplants.views/organ {:organ "kidney"})} "Kidney"]])
      (when centres
        (into [:> bs/NavDropdown {:title "Centres" :id "basic-nav-dropdown"}]
              (map (fn [centre]
                     [:> bs/NavDropdown.Item {:href (href :transplants.views/organ-centre {:organ (name organ)
                                                                                           :centre (name (:key centre))})
                                              :key (name (:key centre))} (:name centre)])
                   centres)))]
      

      #_(into [:> bs/Nav {:class "mr-auto" :style {:height "100%" :vertical-align "middle"}}]
              
              (if centres
                (into [[:> bs/NavDropdown {:title "Centres" :id "basic-nav-dropdown"}]
                       (map (fn [centre]
                              [:> bs/NavDropdown.Item {:href (href :transplants.views/organ-centre {:organ (name organ)
                                                                                                    :centre (name (:key centre))})
                                                       :key (name (:key centre))} (:name centre)])
                            centres)])
                [[:> bs/Nav.Link  {:href "#"} "Foo"]]
                )
              
              #_(conj
                 nil
                 #_(mapv (fn [route-name]
                           (let [route (r/match-by-name router route-name)
                                 text (link-text current-route) #_(-> route :data :link-text)]
                             [:> bs/Nav.Link
                              {:class (if (= route-name (-> current-route :data :name)) "active" "")
                               :href (href route-name)
                               :key  route-name}
                              text]))
                         navbar-routes)
                 ))
      ]]))

(defn footer []
  [:div {:style {:width "100%" :height "60px" :background-color "black" :color "white"
                 :display "flex" :align-items "center" :justify-content "center"}}
   [:div {:style {:margin "20px"}} "Footer"]])

(defn root-component
  "The root of the component tree which is mounted on the main app html element"
  [{:keys [router subscribe-current-route]}]
  (let [current-route @(subscribe-current-route)]
    [:div {:style {:display :flex :flex-direction "column-reverse"}}
     (when current-route
       [:div {:style {:margin-top "0px" :padding-top 20 }}
        [(-> current-route :data :view)]
        [footer]])
     [navbar {:router router
              :current-route current-route
              :home-url "https://www.nhsbt.nhs.uk/"
              :logo "/assets/nhsbt-left-align_scaled.svg"
              :tool-name "Lung Transplants"}]

     ]))

(defn breadcrumb
  [route]
  [:> bs/Breadcrumb
    [:> bs/Breadcrumb.Item {:href "#"} "Home"]]
  )

(defn card-page
  [title & children]
  [container {:key 1 :style {:min-height "calc(100vh - 144px"}}  
   [row
    [col
     (if (> @(rf/subscribe [:transplants.subs/window-width]) 441)
       [:h2 {:style {:color "#fff" :margin-bottom 30}} title]
       [:h5 {:style {:color "#fff" :margin-bottom 20}} title])
     (into [:<>] (map-indexed (fn [k c] ^{:key k} c) children))]]])

(defn nav-card
  [{:keys [img-src organ centre hospital link width tools]}]
  [:> bs/Card {:style {:max-width width :min-width width :margin-bottom 20}}
   [:> bs/Card.Img {:variant "top" :src img-src :height 110 :filter "brightness(50%)"}]
   [:> bs/Card.ImgOverlay {:style {:pointer-events "none"}}
    [:> bs/Card.Title {:style {:color "white";
                               :font-size "1.6rem"
                               :font-weight "bold"
                               }} centre]]
   [:> bs/Card.Body {:style {:display "flex"
                             :flex-direction "column"
                             :justify-content "flex-end"
                             :padding-top 10}}
    [:> bs/Card.Title {:style {:font-size "1.2 rem"}}[:a {:href (apply rfe/href link)} hospital]]
    (->> tools
         (map (fn [{:keys [key label description]}]
                (let [view (keyword "transplants.views" (name key))]
                  [button {:variant "primary"
                           :style {:margin-bottom 2}
                           :key key
                           :on-click #(rf/dispatch [::events/navigate view])}
                   label])))
         (into [:> bs/ButtonGroup {:vertical true}]))]])

(defn phone-card
  [{:keys [img-src organ centre hospital link width tools]}]
  [:> bs/Accordion {:defaultActiveKey nil}
   [:> bs/Card
    (->> tools
         (map (fn [{:keys [key label description]}]
                [:> bs/Accordion.Collapse {:eventKey 0}
                 [:> bs/Card.Body {:style {:background-color "white"
                                           :margin-bottom 2
                                           :border "1px solid white"
                                           :border-radius 5
                                           :opacity 0.5
                                           :color "black"}} label]]))
         (into [:> bs/Accordion.Toggle {:as bs/Card.Header
                                        :eventKey 0
                                        :style {:background-color "#007bff"
                                                :color "white"}}
                hospital]))]])

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



