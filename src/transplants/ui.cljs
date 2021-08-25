(ns transplants.ui
  "This should become the high level ui interface and should have all ns references factored out into 
the low level ui."
  (:require [clojure.string :refer [capitalize]]
            [reagent.core :as rc]
            [reitit.frontend.easy :as rfe]
            ["react-bootstrap" :as bs]
            [re-frame.core :as rf]
            [transplants.events :as events]
            [transplants.utils :as utils]
            [transplants.subs :as subs]
            [transplants.numeric-input :as ni]
            [shadow.debug :refer [?-> ?->> locals]]
            ))

(enable-console-print!)

(def container "a react/bootstrap component adapter" (rc/adapt-react-class bs/Container))
(def col "a react/bootstrap component adapter" (rc/adapt-react-class bs/Col))
(def row "a react/bootstrap component adapter" (rc/adapt-react-class bs/Row))
(def button "a react/bootstrap component adapter" (rc/adapt-react-class bs/Button))
(def tabs "a react/bootstrap component adapter" (rc/adapt-react-class bs/Tabs))
(def tab "a react/bootstrap component adapter" (rc/adapt-react-class bs/Tab))

(defn svg-styles
  "Remove information that should not appear on a DOM element
   from a styles map."
  [styles]
  (-> styles
      (dissoc :label-fill)
      (dissoc :background-color)
      (dissoc :color)
      (dissoc :long-label)))

(defn href
  "Return relative url for given route. Url can be used in HTML links. Note that k is a route name defined 
in the routes table."
  ([k]
   (href k nil nil))
  ([k params]
   (href k params nil))
  ([k params query]
   (rfe/href k params query)))

#_(defn get-client-rect
  "return the bounding rectangle of a node"
  [node]
  (let [r (.getBoundingClientRect node)]
    {:left (.-left r), :top (.-top r) :right (.-right r) :bottom (.-bottom r) :width (.-width r) :height (.-height r)}))


#_(defn link-text
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

#_(comment
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


#_(defn active-key
  "Return the active href key given the current-route"
  [route]
  (let [ak  (cond
              (= {} (:path-params route)) (href :transplants.views/home)
              :else (get-in route [:path-params :organ]))]
    ak)
  )

(defn loading
  "The page is loading"
  []
  [:div {:style {:display "flex" :flex-direction "column" :justify-content "space-around"}}
   [:h1 "Loading"]]
  )

(defn navbar
  "Straight out of the react-bootstrap example with reitit routing patched in."
  [{:keys [home-url logo]}]
  (let [route @(rf/subscribe [::subs/current-route])
        organ (get-in route [:path-params :organ])]
    [:> bs/Navbar {:bg "light" :expand "md" #_#_:fixed "top"
                   :style {:border-bottom "1px solid black" :opacity "1"}}
     [:> bs/Navbar.Brand  {:href home-url} [:img {:src logo :style {:height 40} :alt "NHS"}]]
     [:> bs/Navbar.Toggle {:aria-controls "basic-navbar-nav"}]
     [:> bs/Navbar.Collapse {:id "basic-navbar-nav" :style {:margin-left 70}}

      [:> bs/Nav {:active-key (if organ (name organ) "home")
                 ;:class "mr-auto" :style {:height "100%" :vertical-align "middle"}
                  }
       [:> bs/Nav.Link {:event-key :home
                        :href (href :transplants.views/home)} "Home"]
       (into 
        [:> bs/NavDropdown {:title (if organ (capitalize organ) "Organs") :id "basic-nav-dropdown"}]
        (map (fn [organ]
               [:> bs/NavDropdown.Item
                {:href (href :transplants.views/organ {:organ (name organ)})
                 :key organ}
                (name organ)])
              (keys @(rf/subscribe [::subs/organ-centres]))))
       
       (when-let [centres (and organ ((keyword organ) @(rf/subscribe [::subs/organ-centres])))]
         #_(when (and organ centres))
         (let [tool (get-in @(rf/subscribe [::subs/current-route]) [:path-params :tool])]
           (into [:> bs/NavDropdown {:title "Centres" :id "basic-nav-dropdown"}]
                 (map (fn [centre]
                        [:> bs/NavDropdown.Item
                         {:href (if tool
                                  (href :transplants.views/organ-centre-tool
                                        {:organ (name organ)
                                         :centre (name (:key centre))
                                         :tool (name tool)})
                                  (href :transplants.views/organ-centre-tool
                                        {:organ (name organ)
                                         :centre (name (:key centre))
                                         :tool "waiting"}))
                          :key (name (:key centre))}

                          (:name centre)])
                      centres))))]]]))

(comment 
  (keys @(rf/subscribe [::subs/organ-centres]))
  @(rf/subscribe [::subs/organ-centre])
  (transplants.ui/href :transplants.views/organ-centres {:organ (name :kidney)
                                         :centre "card"})
  )

(defn footer
  "Site footer. 
   todo: Needs to be made configurable."
  []
  [:div {:style {:width "100%" :height "60px" :background-color "black" :color "white"
                 :display "flex" :align-items "center" :justify-content "center"}}
   [:div {:style {:margin "20px"}} "Footer"]])

(defn root-component
  "The root of the component tree which is mounted on the main app html element"
  [{:keys [router subscribe-current-route]}]
  (let [current-route @(subscribe-current-route)]
    [:div {:style {:display :flex :flex-direction "column-reverse"}}
     (when current-route
       [:div {:style {:margin-top "0px" :padding-top 0 }}
        [(-> current-route :data :view)]
        [footer]])
     [navbar {:router router
              :current-route current-route
              :home-url "https://www.nhsbt.nhs.uk/"
              :logo "/assets/nhsbt-left-align_scaled.svg"
              :tool-name "Lung Transplants"}]

     ]))

(defn card-page
  "Render an array of cards"
  [title & children]
  [container {:key 1 :style {:min-height "calc(100vh - 144px"}}  
   [row
    [col
     (if (> @(rf/subscribe [:transplants.subs/window-width]) 441)
       [:h2 {:style {:color "#355" :margin-bottom 30}} title]
       [:h5 {:style {:color "#355" :margin-bottom 20}} title])
     (into [:<>] (map-indexed (fn [k c] ^{:key k} c) children))]]])

(defn tool-buttons
  "Create buttons for each transplant tool"
  [{:keys [key label organ centre tool active-tool button-type] :as tb-params}]
  ;(?-> tb-params ::tool-buttons)
  ;(?-> tool ::tool-buttons)
  ;(?-> button-colour ::tool-buttons)
  ;(?-> button-type ::button-type)
  (let [active (= (name tool) active-tool)]
    [button {:id (str (name organ) "-" (name centre) "-" (name key))
             :variant (if active button-type (str "outline-" button-type))
             :style {:margin-bottom 2
                     :margin-right 0}
             :active active
             :key key
             :on-click #(rf/dispatch [::events/navigate :transplants.views/organ-centre-tool
                                      {:organ organ
                                       :centre centre
                                       :tool tool}])}
     label]))

(defn background-link
  "Tool menu prefix rubric."
  [organ centre tool]
  [:p
   (when (not= tool "guidance")
     [:span
      "For more information that will be helpful to patients, follow the link to "
      [:a.centre-header-link {:on-click #(rf/dispatch [::events/navigate :transplants.views/organ-centre-tool
                                                       {:organ organ
                                                        :centre centre
                                                        :tool :guidance}])} "useful information"]
      "."])
   " There is also a " [:a.centre-header-link {:target "_blank" :href (str (name organ) ".pdf")} "PDF download"]
   " which explains the tool in depth."])

#_(defn tools-menu*
  "Render a group of tool selection buttons.
   tools is a vector of tool keys offered for this organ"
  [tools include-guidance? organ-name centre-name orientation]
  (let [active-tool (get-in @(rf/subscribe [::subs/current-route]) [:path-params :tool])
        mdata @(rf/subscribe [::subs/mdata])
        menu-data  (map
                    (fn [tool]
                      (assoc
                       (if (= tool :guidance)
                         {:label "Useful information"
                          :button-type "usefulinfo"}
                         (select-keys (utils/get-tool-meta mdata organ-name tool)
                                      [:label :button-type]))
                       :organ organ-name
                       :tool tool
                       :centre centre-name
                       :active-tool active-tool
                       :key tool
                       :mdata mdata))
                    (if include-guidance? tools (remove #(= :guidance %) tools)))]
    ;(?-> active-tool ::active-tool)
    ;(?-> tools ::tools-menu)
    ;(?-> menu-data ::menu-data)
    ;TODO: configure this filter!
    [:<>

     [#_#_#_:> bs/ButtonToolbar {:style {:background-color "#ffffff66"
                                         :padding 15
                                         :border-radius 10}}
      row
      [col {:xs 12 :sm 8}
       [:h3 {:style {:padding-right 20}} "Choose a tool:"]

    ;; :todo; There'll be a better CSS solution to keeping this on screen for both desktop and mobile
    ;; Even better would be to configure the break points as what makes sense will be ver application
    ;; specific.
       (for [group (partition-by :button-type (butlast menu-data))]
         [:div #_{:style {:display "flex" :flex-direction "row" :align-items "stretch"
                          :justify-content "space-between"}}

          (->> group
               (map tool-buttons)
               (into [:> bs/ButtonGroup (merge {:style {:width "auto"}} orientation)]))])]
      [col {:xs 12 :sm 4}
       (tool-buttons (last menu-data))
       [background-link organ-name centre-name active-tool]]]]))

(defn tools-menu
  "Render a group of tool selection buttons.
   tools is a vector of tool keys offered for this organ"
  [tools include-guidance? organ centre-name orientation]
  (let [active-tool (get-in @(rf/subscribe [::subs/current-route]) [:path-params :tool])
        organ-name (name organ)
        mdata @(rf/subscribe [::subs/mdata])
        menu-data  (map
                    (fn [tool]
                      (assoc
                       (if (= tool :guidance)
                         {:label "Useful information"
                          :button-type "usefulinfo"}
                         (select-keys (utils/get-tool-meta mdata organ-name tool)
                                      [:label :button-type]))
                       :organ organ-name
                       :tool tool
                       :centre centre-name
                       :active-tool active-tool
                       :key (str organ-name "-" tool)
                       :mdata mdata))
                    (if include-guidance? tools (remove #(= :guidance %) tools)))
        ]
    ;(?-> active-tool ::active-tool)
    ;(?-> tools ::tools-menu)
    ;(?-> menu-data ::menu-data)
    ;TODO: configure this filter!
    [:<>
     
     [#_#_#_:> bs/ButtonToolbar {:style {:background-color "#ffffff66"
                                   :padding 15
                                   :border-radius 10}}
      row
      [col {:xs 12 :sm 8}
       [:h3 {:style {:padding-right 20}} "Choose a tool:"]

    ;; :todo; There'll be a better CSS solution to keeping this on screen for both desktop and mobile
    ;; Even better would be to configure the break points as what makes sense will be ver application
    ;; specific.
       (map-indexed
        (fn [i group]
          [:div {:key i}
           (->> group
                (map tool-buttons)
                (into [:> bs/ButtonGroup (merge {:style {:width "auto"}} orientation)]))])
        (partition-by :button-type (butlast menu-data)))]
      [col {:xs 12 :sm 4}
       (tool-buttons (last menu-data))
       [background-link organ-name centre-name active-tool]
       ]]]))



(defn nav-card
  "Render a desktop compatible card containing hospital-local links to tools"
  [{:keys [#_img-src organ centre hospital _link width tools]}]
  [:> bs/Card {:style {:max-width width :min-width width :margin-bottom 10 :box-shadow "1px 1px #888888"}}
   [:> bs/Card.Body {:style {:display "flex"
                             :flex-direction "column"
                             :justify-content "space-around"
                             :padding-top 20}}
    [:> bs/Card.Title {:style {:font-size "1.2 rem"}}
     ;;
     ;; Note that clicking on a title now routes you to the first tool rather than to an
     ;; organ/centre home page.
     ;;
     [:a {:href "#" #_(apply rfe/href link) ; Disable link to an organ/centre home page
          :on-click #(rf/dispatch [::events/navigate :transplants.views/organ-centre-tool
                         {:organ organ
                          :centre centre
                          :tool (first tools)}])} 
      hospital]]
    [tools-menu tools false organ centre {:vertical true}]
    ]])

(defn phone-card
  "Render a mobile compatible card - actually a list item - containing hospital-local links to tools"
  [{:keys [hospital _link organ centre tools]}]
  
  ;(println ::phone "PHONE!!!")
  [:> bs/ListGroup.Item {:action true
                         ;:href (apply rfe/href link)
                         :on-click #(rf/dispatch [::events/navigate :transplants.views/organ-centre-tool
                                                  {:organ organ
                                                   :centre centre
                                                   :tool (first tools)}])}
   hospital])

(defn page
  "A generic page component, rendering a title and the page's children"
  ([title & children]
   [container {:key 1
               :fluid "xl"
               :style {:min-height "calc(100vh - 165px"
                       :background-color "#ffffffbb"
                       :max-width 2000 ;todo: adjust for side margins
                       :margin-bottom 20}}
    [row
     [col
      [:h1 {:style {:margin-top 20}} title]
      (into [:<>] (map-indexed (fn [k c] ^{:key k} c) children))]]]))

(def mobile-break
  "Screens of this size or smaller are rendered with mobile oriented views."
  1200 ;800
  )

(defn centre-card
  "A single card describing a centre"
  [mobile params]
  #_(if mobile
    [phone-card params]
    [nav-card params])
  ; Always use phone format
  [phone-card params])

(defn centre-card-deck
  "A card deck where the cards are simple list items in mobile view, but true cards in desktop view."
  [mobile]
  (if mobile
    [:> bs/ListGroup]
    [:> bs/CardDeck]))

(defn open-icon
  "wrapper for access open-icon access"
  ([name]
   (open-icon nil name))
  ([style name]
   [:span (assoc {:class (str "oi oi-" name)
                  :title name
                  :aria-hidden "true"}
                 :style style)]))

; radio buttons allow fast selection between options
(defn test-day-selector
  "Used to select a test day to display"
  [label]
  [:> bs/Row {:style {:display "flex" :align-items  "center" :margin-bottom 20}}
   [:> bs/Col {:style {:display "flex" :justify-content "flex-end"}}
    [:> bs/Form.Label {:style {:font-weight "bold" :text-align "right" :margin-bottom 20 :line-height 1.2}}
     label]]
   [:> bs/Col
    (ni/numeric-input {:key :test/day-input ; creates id="test-day-input" on input element
                       :value-f (fn [] @(rf/subscribe [::subs/test-day]))
                       :min (constantly 0)
                       :max (constantly (* 365 5))
                       :dps -1
                       :on-change #(rf/dispatch [::events/test-day %])})]])

(defn randomise-query-panel
  "A simple checkbox asking whether an icon array should be randomised or ordered."
  [label]
  [:> bs/Form {:style {:margin "0px 0px 0px 0px"
                       :padding "0px 0px 0px 0px"}}
   [:> bs/Form.Group {:on-click #(rf/dispatch [::events/randomise-icons])
                      :style {:margin "0px 0px 0px 0px"
                              :padding "10px 0px 0px 10px"
                              :color "#000"
                              :background-color "#CCC"}}
    [:> bs/Form.Check {:inline true
                       :type "checkbox"
                       ;:on-change identity
                       :read-only true
                       :checked @(rf/subscribe [::subs/randomise-icons])}]
    [:> bs/Form.Label 
     label]]])

