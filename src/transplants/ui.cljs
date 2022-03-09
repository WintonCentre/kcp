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
  (href :transplants.views/organ {:organ "kidney"}))

(defn loading
  "The page is loading"
  []
  [:div {:style {:display "flex" :flex-direction "column" :justify-content "space-around"}}
   [:h1 "Loading"]])

(defn get-single-organ
  "extract the single organ or if not single then nil from metadata"
  [mdata]
  (let [organ-order (:organ-order mdata)]
    (if (= (count organ-order) 1)
      (first organ-order)
      ; todo - redefine a UI to select an organ if we offer more than one at a url
      :lung ; till we do that, select lung
      )))

(def oset goog.object.set)

(defn load-favicon
  "Trying to generate <link href=\"/assets/logo_kidney_192.png\" rel=\"icon\"> in header,
  but favicon should match the organ."
  [logo]
  (let [link (js/document.querySelector "link[rel~='icon']")]
    (if link
      (oset link "href" logo)
      (let [head (.item (js/document.getElementsByTagName "head") 0) ;; Must use .item to index into an HTMLCollection
            link (js/document.createElement "link")]
        (oset link "rel" "icon")
        (oset link "href" logo)
        (.appendChild head link)))))


(comment
  (def link (js/document.querySelector "link[rel~='icon']"))
  (def logo "/assets/logo_kidney_192.png"))

(defn navbar
  "Straight out of the react-bootstrap example with reitit routing patched in."
  [{:keys [router current-route]}]
  (let [route @(rf/subscribe [::subs/current-route])
        organ (get-in route [:path-params :organ]) ; this is nil until it has been selected
        home-url "/"
        mdata  @(rf/subscribe [::subs/mdata])

        ; organ-order gives us the list of configured organ tools, in-order. In development we may have more than one organ,
        ; but in production each site will have only a single organ. 
        single-organ (get-single-organ mdata)
        organ-centres @(rf/subscribe [::subs/organ-centres])]

    (if-let [organ (or single-organ organ)] ; guard in case mdata has not been loaded. If it isn't yet the navbar will rerender.
      (let [logo (str "/assets/crest.png")
            favicon (str "/assets/favicon_" (name single-organ) ".png")]
        (load-favicon favicon)

        [:> bs/Navbar {#_#_:bg "dark" :expand "lg" #_#_:fixed "top"
                       :variant "dark"
                       :style {:border-bottom "1px solid white" :opacity "1" :background-color "#336677"}}
         [:> bs/Navbar.Brand  {:href home-url} [:img {:src logo :style {:height 40 :width 40} :alt "Organ logo"}]]
     ; Site name below 
         [:> bs/Nav.Link {:style {:font-size "1em" :color "white"}
                          :organ (name organ)
                          :href (href :transplants.views/organ {:organ (name organ)})}
          [:div {:style {:font-size "1.5em"}}
           (if single-organ
             (str (get-in mdata [single-organ :label]) " Transplant Tool")
             "Development Site")]]
         [:> bs/Navbar.Toggle {:aria-controls "basic-navbar-nav"}]
         [:> bs/Navbar.Collapse {:id "basic-navbar-nav"}

          [:> bs/Nav {:active-key (if organ (name organ) "home")
                 ;:class "mr-auto" :style {:height "100%" :vertical-align "middle"}
                      }
           [:> bs/Nav.Link {:style {:font-size "1.2em"}
                            :event-key :home
                            :href (href :transplants.views/home)
                            :class-name (when (= :transplants.views/home (get-in route [:data :name])) "active")} "Home"]
           [:> bs/Nav.Link {:style {:font-size "1.2em"}
                            :event-key :about
                            :href (href :transplants.views/about)
                            :class-name (when (= :transplants.views/about (get-in route [:data :name])) "active")} "About"]

           [:> bs/Nav.Link {:style {:font-size "1.2em"}
                            :event-key :legal
                            :href (href :transplants.views/legal)
                            :class-name (when (= :transplants.views/legal (get-in route [:data :name])) "active")} "Legal"]
           [:> bs/Nav.Link {:style {:font-size "1.2em"}
                            :event-key :pubs
                            :href (href :transplants.views/pubs)
                            :class-name (when (= :transplants.views/pubs (get-in route [:data :name])) "active")} "Publications"]
           [:> bs/Nav.Link {:style {:font-size "1.2em"}
                            :event-key :tech
                            :href (href :transplants.views/tech)
                            :class-name (when (= :transplants.views/tech (get-in route [:data :name])) "active")} "Technical"]
           (when organ-centres
             (when-let [centres (organ organ-centres)]
               (let [path-params (:path-params @(rf/subscribe [::subs/current-route]))
                     tool (path-params :tool)
                     tab (path-params :tab)
                     inputs (path-params :inputs)]
                 (into [:> bs/NavDropdown {:style {:font-size "1.2em"}
                                           :title "Transplant Centres" :id "basic-nav-dropdown"}]
                       (map (fn [centre]
                              [:> bs/NavDropdown.Item
                               {:href (href :transplants.views/organ-centre-tool-tab-inputs
                                            {:organ (name single-organ)
                                             :centre (name (:key centre))
                                             :tool (if tool (name tool) "waiting")
                                             :tab (if tab tab "bars")
                                             :inputs (if inputs inputs {})})
                                :key (name (:key centre))}

                               (:name centre)])
                            (filter #(not= (:name %) "UK") centres))))))]
          [:> bs/Nav {:class "ml-auto" 
                      :style {:height "100%" :vertical-align "middle"}
                      }
           [:> bs/Button {:href (clojure.string/replace (str "mailto:"
                                                             (name single-organ)
                                                             "transplants@statslab.cam.ac.uk"
                                                             "?subject="
                                                             (name single-organ) " transplants tool"
                                                             "&body=Please give us your feedback here. "
                                                             "If you would like a reply please say so. "
                                                             "If you are reporting a technical issue then it’s always useful to tell us "
                                                             "the browser (e.g. Edge, Safari, Chrome, Firefox) and operating system "
                                                             "(e.g. Windows, MacOS, Android, IOS) and if possible include a screen shot "
                                                             "of the problem.")
                                                        " " "%20")
                          :variant "info"
                          #_#_:class "ml-auto"
                          } " ✉️ Feedback"]]]])
      [loading])))

(comment
  (keys @(rf/subscribe [::subs/organ-centres]))
  @(rf/subscribe [::subs/organ-centre])
  (transplants.ui/href :transplants.views/organ-centres {:organ (name :kidney)
                                                         :centre "card"}))

(defn footer
  "Site footer
   todo: Needs to be made configurable."
  []
  [:> bs/Container {:fluid "fluid"
                    :style {:width "100%"  :background-color "#1A4554" #_"black" :color "white"
                            :align-items "center" :justify-content "center" #_#_:flex-wrap "wrap"}}
   [:> bs/Row
    [:div {:style {:margin "10px 20px 10px 10px" :display "flex" :flex-direction "row" :align-items "top"}}
     [:img {:src "/assets/crest.png" :async true :style {:height 40 :width 37 :margin-right 20} :alt "University of Cambridge Crest"}]
     [:p {:style {:margin "0"}} [:b "This"] " tool was developed by the Winton Centre for Risk and Evidence Communication.  
                     It currently displays models disclosed by NHSBT under a data sharing agreement.  
                     It was developed with transplant patients and their partners and clinical teams  
                     at transplant and referral centres in England. "]]]
   [:> bs/Row {:style {:background-color "black"}}
    [:div {:style {:font-size "12px" :color "#9E9E9E" :font-family "Helvetica Neue"
                   :margin "10px auto" :display "flex" :flex-direction "row"}}
     [:p {:style {:margin "0"}}
      (str "Copyright Ⓒ " (.getFullYear (js/Date.)) " University of Cambridge. All Rights Reserved | ")
      [:a {:style {:color "inherit"} :on-click #(rf/dispatch [::events/navigate :transplants.views/legal]) :href "javascript:void(0)"} "Privacy & Data Protection"]
      " | "
      [:a {:style {:color "inherit"} :on-click #(rf/dispatch [::events/navigate :transplants.views/legal]) :href "javascript:void(0)"} "Disclaimer"]]]]
   [:> bs/Row {:style {:background-color "black"}}
    [:div {:style {:font-size "12px" :color "#9E9E9E" :font-family "Helvetica Neue"
                   :margin "auto" :padding "0" :display "flex" :flex-direction "row" :align-items "top"}}
     [:p "v-0.0-0.00-0-hash"]]]])

(defn root-component
  "The root of the component tree which is mounted on the main app html element"
  [{:keys [router subscribe-current-route]}]
  (let [current-route @(subscribe-current-route)
        is-full-screen @(rf/subscribe [::subs/is-full-screen])]
    [:div {:style {:display :flex :flex-direction "column-reverse"}}
     (when current-route
       [:div {:style {:margin-top "0px" :padding-top 0}}
        [(-> current-route :data :view)]
        (when-not is-full-screen [footer])])
     (when-not is-full-screen [navbar {:router router
                                       :current-route current-route}])
     (bsio/modal #(rf/subscribe [::subs/modal-data]))]))



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
             :on-click #(rf/dispatch [::events/navigate :transplants.views/organ-centre-tool-tab-inputs
                                      {:organ organ
                                       :centre centre
                                       :tool tool
                                       :tab @(rf/subscribe [::subs/selected-vis])
                                       :inputs ((keyword organ) @(rf/subscribe [::subs/inputs]))}])}
     label]))

(comment
  (rf/dispatch [::events/navigate :transplants.views/organ-centre-tool-tab-inputs
                {:organ :kidney
                 :centre "birm"
                 :tool :survival
                 :tab "bars"
                 :inputs {}}])

  )

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
                    (if include-guidance? tools (remove #(= :guidance %) tools)))]
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
       [:p "Things you might discuss during a consultation"]
       [background-link organ-name centre-name active-tool]]]]))



(defn nav-card
  "Render a desktop compatible card containing hospital-local links to tools"
  [{:keys [#_img-src organ centre hospital _link width tools]}]
  (let [tab (if-let [selected-vis @(rf/subscribe [::subs/selected-vis])]
              selected-vis
              "bars")
        inputs (if-let [stored-inputs @(rf/subscribe [::subs/inputs])]
                 stored-inputs
                 {(keyword organ) {}})]
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
            :on-click #(rf/dispatch [::events/navigate :transplants.views/organ-centre-tool-tab-inputs
                                     {:organ organ
                                      :centre centre
                                      :tool (first tools)
                                      :tab tab
                                      :inputs inputs}])}
        hospital]]
      [tools-menu tools false organ centre {:vertical true}]]]))

(defn phone-card
  "Render a mobile compatible card - actually a list item - containing hospital-local links to tools"
  [{:keys [hospital _link organ centre tools]}]
  (let [tab (if-let [selected-vis @(rf/subscribe [::subs/selected-vis])]
              selected-vis
              "bars")
        inputs (if-let [stored-inputs @(rf/subscribe [::subs/inputs])]
                 stored-inputs
                 {(keyword organ) {}})]
  ;(println ::phone "PHONE!!!")
    [:> bs/ListGroup.Item {:action true
                         ;:href (apply rfe/href link)
                           :on-click #(rf/dispatch [::events/navigate :transplants.views/organ-centre-tool-tab-inputs
                                                    {:organ organ
                                                     :centre centre
                                                     :tool (first tools)
                                                     :tab tab
                                                     :inputs inputs #_path-inputs}])}
     hospital]))

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
     [:> bs/Col {:md {:span 8 :offset 2}}
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

(def open-icon bsio/open-icon)

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

