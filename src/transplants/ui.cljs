(ns transplants.ui
  "This should become the high level ui interface and should have all ns references factored out into 
the low level ui."
  (:require   [reagent.core :as rc]
              [reitit.frontend.easy :as rfe]
              ["react-bootstrap" :as bs]
              [re-frame.core :as rf]
              [transplants.events :as events]
              [transplants.utils :as utils]
              [transplants.subs :as subs]
              [transplants.numeric-input :as ni]
              [transplants.bsio :as bsio]
            ;[shadow.debug :refer [?-> ?->> locals]]
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

(comment
  (href :transplants.views/organ {:organ "kidney"})
  )

(defn loading
  "The page is loading"
  []
  [:div {:style {:display "flex" :flex-direction "column" :justify-content "space-around"}}
   [:h1 "Loading"]]
  )

(defn get-single-organ
  "extract the single organ or if not single then nil from metadata"
  [mdata]
  (let [organ-order (:organ-order mdata)]
    (if (= (count organ-order) 1)
      (first organ-order)
      ; todo - redefine a UI to select an organ if we offer more than one at a url
      :lung ; till we do that, select lung
      )))

(defn navbar
  "Straight out of the react-bootstrap example with reitit routing patched in."
  [{:keys [home-url logo]}]
  (let [route @(rf/subscribe [::subs/current-route])
        organ (get-in route [:path-params :organ]) ; this is nil until it has been selected
        mdata  @(rf/subscribe [::subs/mdata])

        ; organ-order gives us the list of configured organ tools, in-order. In development we may have more than one organ,
        ; but in production each site will have only a single organ. 
        single-organ (get-single-organ mdata)
        organ-centres @(rf/subscribe [::subs/organ-centres])
        ]
    (if-let [organ (or single-organ organ)] ; guard in case mdata has not been loaded
      [:> bs/Navbar {:bg "light" :expand "md" #_#_:fixed "top"
                     :style {:border-bottom "1px solid black" :opacity "1"}}
       [:> bs/Navbar.Brand  {:href home-url} [:img {:src logo :style {:height 40 :width 37} :alt "Winton Centre"}]]
     ; Site name below 
       [:> bs/Nav.Link {:style {:font-size "1em"}
                        :organ (name organ)
                        :href (href :transplants.views/organ {:organ (name organ)})}
        [:div {:style {:font-size "2em"}}
         (if single-organ
           (str (get-in mdata [single-organ :label]) " Tool")
           "Development Site")]]
       [:> bs/Navbar.Toggle {:aria-controls "basic-navbar-nav"}]
       [:> bs/Navbar.Collapse {:id "basic-navbar-nav" :style {:margin-left 70}}

        [:> bs/Nav {:active-key (if organ (name organ) "home")
                 ;:class "mr-auto" :style {:height "100%" :vertical-align "middle"}
                    }
         [:> bs/Nav.Link {:style {:font-size "1.4em"}
                          :event-key :home
                          :href (href :transplants.views/home)} "Home"]
         [:> bs/Nav.Link {:style {:font-size "1.4em"}
                          :event-key :about
                          :href (href :transplants.views/about)} "About"]
         [:> bs/Nav.Link {:style {:font-size "1.4em"}
                          :event-key :legal
                          :href (href :transplants.views/legal)} "Legal"]
         [:> bs/Nav.Link {:style {:font-size "1.4em"}
                          :event-key :pubs
                          :href (href :transplants.views/pubs)} "Publications"]
         [:> bs/Nav.Link {:style {:font-size "1.4em"}
                          :event-key :tech
                          :href (href :transplants.views/tech)} "Technical"]
         (when organ-centres
           (when-let [centres (organ organ-centres)]
             (let [tool (get-in @(rf/subscribe [::subs/current-route]) [:path-params :tool])]
               (into [:> bs/NavDropdown {:style {:font-size "1.4em"}
                                         :title "Transplant Centres" :id "basic-nav-dropdown"}]
                     (map (fn [centre]
                            [:> bs/NavDropdown.Item
                             {:href (if tool
                                      (href :transplants.views/organ-centre-tool
                                            {:organ (name single-organ)
                                             :centre (name (:key centre))
                                             :tool (name tool)})
                                      (href :transplants.views/organ-centre-tool
                                            {:organ (name single-organ)
                                             :centre (name (:key centre))
                                             :tool "waiting"}))
                              :key (name (:key centre))}

                             (:name centre)])
                          centres)))))]]]
      [loading])))

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
  [:div.footer {:style {:width "100%" :height "80px" :background-color "black" :color "white"
                :align-items "center" :justify-content "center"}}
   [:div {:style {:margin "20px" :display "flex" :flex-direction "row" :align-items "center"}}
    [:img {:src "assets/crest.png" :async true :style {:height 40 :width 37 :margin-right 20} :alt "University of Cambridge Crest"}] 
    "Winton Centre"]])

(defn root-component
  "The root of the component tree which is mounted on the main app html element"
  [{:keys [router subscribe-current-route]}]
  (let [current-route @(subscribe-current-route)]
    [:div {:style {:display :flex :flex-direction "column-reverse"}}
     (when current-route
       [:div {:style {:margin-top "0px" :padding-top 0}}
        [(-> current-route :data :view)]
        [footer]])
     [navbar {:router router
              :current-route current-route
              :home-url "/" ;"https://lung-transplants.wintoncentre.uk"
              :logo "/assets/crest.png"
              :tool-name "Lung Transplants"}]
     (bsio/modal #(rf/subscribe [::subs/modal-data]))
     ]))

(defn card-page
  "Render an array of cards"
  [title & children]
  [container {:key 1 :style {:margin-top 40;
                             :min-height "calc(100vh - 144px"}}  
   [row
    [col
     (if (> @(rf/subscribe [:transplants.subs/window-width]) 441)
       [:h2 {:style {:color "#355" :margin-bottom 30}} title]
       [:h5 {:style {:color "#355" :margin-bottom 20}} title])
     (into [:<>] (map-indexed (fn [k c] ^{:key k} c) children))]]])

(defn tool-buttons
  "Create buttons for each transplant tool"
  [{:keys [key label organ centre tool active-tool button-type]}]
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
  [_organ _centre tool]
  [:p
   (when (not= tool "guidance")
     [:span
      "For more information that will be helpful to patients, follow the link to useful information."])])



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
     [row
      [col {:xs 12 :sm 8}
       [:h3 {:style {:padding-right 20}} "Choose a tool:"]

    ;; :todo; There'll be a better CSS solution to keeping this on screen for both desktop and mobile
    ;; Even better would be to configure the break points as what makes sense will be very application
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
       ]]])
       )



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
      [:h1 {:style {:margin-top 20 :font-size "2em"}} title]
      (into [:<>] (map-indexed (fn [k c] ^{:key k} c) children))]]]))

(defn decorated-page
  "A generic page component, rendering a title and the page's children"
  ([decoration title & children]
   [container {:key 1
               :fluid "xl"
               :style {:min-height "calc(100vh - 165px"
                       :background-color "#ffffffbb"
                       :max-width 2000 ;todo: adjust for side margins
                       :margin-bottom 20}}
    [row
     [col
      decoration
      [:h1 {:style {:margin-top 20 :font-size "2em"}} title]
      (into [:<>] (map-indexed (fn [k c] ^{:key k} c) children))]]]))
(def mobile-break
  "Screens of this size or smaller are rendered with mobile oriented views."
  1200 ;800
  )

(defn centre-card
  "A single card describing a centre"
  [_mobile params]
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

