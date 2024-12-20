(ns kcp.ui
  "This should become the high level ui interface and should have all ns references factored out into
the low level ui."
  (:require [clojure.string :as str]
            [clojure.walk :as walk]
            [kcp.bsio :as bsio]
            [kcp.events :as events]
            ["react-bootstrap" :as bs]
            [kcp.numeric-input :as ni]
            [kcp.shortener :as shorts]
            [kcp.subs :as subs]
            [kcp.utils :as utils]
            [re-frame.core :as rf]
            [reagent.core :as rc]
            [reitit.frontend.easy :as rfe]
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
   (href k nil nil rfe/href))
  ([k params]
   (href k params nil rfe/href))
  ([k params query parse-url]
   (parse-url k params query)))

(defn fixup-markup
  "Fixes up markup (from e.g. edn files) to work better with the UI.
  It does NOT perform sanitization, i.e. not safe for user inputs..."
  ([markup]
   (fixup-markup markup {:parse-url href}))

  ([markup {:keys [parse-url]}]
   (if-not (vector? markup)
     (throw (ex-info "Markup should be a vector" {}))
     (walk/postwalk
       (fn [elem]
         ; look for link elements
         (if (and (vector? elem)
                  (map? (second elem))
                  (:href (second elem)))
           (let [[tag attrs & content] elem
                 updated-attrs (update attrs :href parse-url)]
             ; replace them with an updated link address
             (into [tag updated-attrs] content))
           elem))
       markup))))

(comment
  (href :kcp.views/organ {:organ "kidney"}))

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
      :lung                                                 ; till we do that, select lung
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
  (def logo "assets/logo_kidney_192.png"))

(comment
  (def mdata @(rf/subscribe [::subs/mdata]))
  )

(defn navbar
  "Straight out of the react-bootstrap example with reitit routing patched in."
  [{:keys [router current-route]}]
  (let [route @(rf/subscribe [::subs/current-route])
        organ (get-in route [:path-params :organ])          ; this is nil until it has been selected
        home-url "/"
        mdata @(rf/subscribe [::subs/mdata])

        ; organ-order gives us the list of configured organ tools, in-order. In development we may have more than one organ,
        ; but in production each site will have only a single organ.
        single-organ (get-single-organ mdata)
        organ-centres @(rf/subscribe [::subs/organ-centres])]

    (if-let [organ (or single-organ organ)]                 ; guard in case mdata has not been loaded. If it isn't yet the navbar will rerender.
      (let [logo (str "assets/crest.png")
            favicon (str "assets/favicon_" (name single-organ) ".png")]
        (load-favicon favicon)

        [:> bs/Navbar {#_#_:bg "dark" :expand "lg"
                       :variant "dark"
                       :collapse-on-select true
                       :style {:border-bottom "1px solid white" :opacity "1" :background-color "#336677"}}
         [:> bs/Navbar.Brand {:href home-url} [:img {:src logo :style {:height 40 :width 40} :alt "Organ logo"}]]
         ; Site name below
         [:> bs/Nav.Link {:style {:font-size "1em" :color "white"}
                          :on-click #(rf/dispatch [::events/reset-edit-state])
                          :href (str (href :kcp.views/organ-centre-tool {:organ (name organ) :centre "uk" :tool "ldsurvival"}) "/bars/-")}
          [:div {:style {:font-size "1.5em"}}
           (if single-organ
             (str "PREDICT Kidney")
             "Development Site")]]
         [:> bs/Navbar.Toggle {:aria-controls "basic-navbar-nav"}]
         [:> bs/Navbar.Collapse {:id "basic-navbar-nav"}

          [:> bs/Nav {:active-key (if organ (name organ) "home")}
           [:> bs/Nav.Link {:style {:font-size "1.2em"}
                            :event-key :home
                            :href (href :kcp.views/home)
                            :class-name (when (= :kcp.views/home (get-in route [:data :name])) "active")} "Home"]
           [:> bs/Nav.Link {:style {:font-size "1.2em"}
                            :event-key :about
                            :href (href :kcp.views/about)
                            :class-name (when (= :kcp.views/about (get-in route [:data :name])) "active")} "About"]

           [:> bs/Nav.Link {:style {:font-size "1.2em"}
                            :event-key :legal
                            :href (href :kcp.views/legal)
                            :class-name (when (= :kcp.views/legal (get-in route [:data :name])) "active")} "Legal"]
           [:> bs/Nav.Link {:style {:font-size "1.2em"}
                            :event-key :pubs
                            :href (href :kcp.views/pubs)
                            :class-name (when (= :kcp.views/pubs (get-in route [:data :name])) "active")} "Publications"]
           [:> bs/Nav.Link {:style {:font-size "1.2em"}
                            :event-key :tech
                            :href (href :kcp.views/tech)
                            :class-name (when (= :kcp.views/tech (get-in route [:data :name])) "active")} "Technical"]
           (when organ-centres
             (when-let [centres (organ organ-centres)]
               (let [path-params (:path-params @(rf/subscribe [::subs/current-route]))
                     tool (path-params :tool)
                     tab (if-let [t (path-params :tab)] t "bars")
                     inputs (if-let [i (path-params :inputs)] i "-")]

                 (comment
                   (into [:> bs/NavDropdown {:style {:font-size "1.2em"}}
                          :title "Transplant Centres" :id "basic-nav-dropdown"]
                         (map (fn [centre]
                                [:> bs/NavDropdown.Item
                                 {:href (href :kcp.views/organ-centre-tool-tab-inputs ;-tab-inputs
                                              {:organ (name single-organ)
                                               :centre (name (:key centre))
                                               :tool (if tool (name tool) "waiting")
                                               :tab tab
                                               :inputs inputs})
                                  :key (name (:key centre))}

                                 (:name centre)])
                              (filter #(not= (:name %) "UK") centres)))))))]
          [:> bs/Nav {:class "ml-auto"
                      :style {:height "100%" :vertical-align "middle"}}]]])
      [loading])))

(comment
  (keys @(rf/subscribe [::subs/organ-centres]))
  @(rf/subscribe [::subs/organ-centre])
  (kcp.ui/href :kcp.views/organ-centres {:organ (name :kidney)
                                         :centre "card"}))

(defn footer
  "Site footer
   todo: Needs to be made configurable."
  []
  (let [mdata @(rf/subscribe [::subs/mdata])
        single-organ (get-single-organ mdata)]
    #_[:div "footer"]
    ;[:> bs/Container {:fluid "fluid"
    ;                  :style {:width "100%"  :background-color "#1A4554" #_"black" :color "white"
    ;                          :align-items "center" :justify-content "center" #_#_:flex-wrap "wrap"}}
    [:div.footer
     [:div {:style {:padding "20px 20px 5px 15px" :display "flex" :background-color "#1A4554" :color "#DDD" :flex-direction "column" :align-items "center"}}
      [:div {:style {:display "flex" :flex-direction "column" :justify-content "center" :align-items "center" :max-width 900}}
       [:div {:style {:padding 0 :display "flex" :flex-direction "row" :align-items "top" :justify-content "center"}}
        [:img {:src "assets/crest.png" :async true :style {:height 40 :width 37 :margin-right 30} :alt "University of Cambridge Crest"}]
        [:p {:style {:text-align "center"}} "The tool was developed by the Winton Centre for Risk and Evidence Communication
        and researchers at the University of Cambridge (Department of Public Health and Primary Care, and Department of Surgery).
        Patients, members of the public, doctors and nurses have been involved in the design of this tool."]]]]
     [:div {:style {:padding 10 :font-size "12px" :color "#9E9E9E" :background-color "black"
                    :display "flex" :flex-direction "column" :justify-content "center" :align-items "center"}}
      ;;
      ;; todo: We do not have any mechanism as yet to scroll to a position within a page so these two links
      ;; both go to Legal at the current scroll point.
      ;;
      ;; See Predict for a Rum solution of this problem - it would have to be ported to a reagent type 3
      ;; component.
      ;;
      [:div {:style {:text-align "center"}}
       "Copyright Ⓒ " (.getFullYear (js/Date.)) " University of Cambridge. All Rights Reserved."]
      ;; Can't use javascript hrefs in react - if they worked they would reload the page and lose state.
      ;; Use reitit generated hrefs instead.
      [:div {:style {:text-align "center"}}
       [:a {:style {:color "inherit"}
            :href (href :kcp.views/legal)} "Privacy & Data Protection"]
       ]
      [:div "v-0.0-0.00-0-hash"]]]))

(defn root-component
  "The root of the component tree which is mounted on the main app html element"
  [{:keys [router subscribe-current-route]}]
  (let [current-route @(subscribe-current-route)
        path (:path current-route)
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
  [container {:key 1 :style {:margin-top 40                 ;
                             :min-height "calc(100vh - 144px"}}
   [row
    [col
     (if (> @(rf/subscribe [:kcp.subs/window-width]) 441)
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
    ;    (locals)
    [button {:id (str (name organ) "-" (name centre) "-" (name key))
             :variant (if active button-type (str "outline-" button-type))
             :style {:margin-bottom 2
                     :margin-right 0}
             :active active
             :key key
             :on-click #(rf/dispatch [::events/switch-tool tool])}
     label]))

(comment
  (rf/dispatch [::events/navigate :kcp.views/organ-centre-tool-tab-inputs
                {:organ :kidney
                 :centre "uk"
                 :tool :ldsurvival
                 :tab "bars"
                 :inputs ""}])

  )

(defn background-link
  "Tool menu prefix rubric."
  [_organ _centre tool]
  [:p
   (when (not= tool "guidance")
     [:span.d-print-none
      "For more information that will be helpful to patients, follow the link to useful information."])])



(defn tools-menu
  "Render a group of tool selection buttons.
   tools is a vector of tool keys offered for this organ"
  [tools include-guidance? organ centre-name orientation]
  (let [active-tool (get-in @(rf/subscribe [::subs/current-route]) [:path-params :tool])
        organ-name (name organ)
        mdata @(rf/subscribe [::subs/mdata])
        menu-data (map
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
                    (if include-guidance? tools (remove #(= :guidance %) tools)))]))
;(?-> active-tool ::active-tool)
;(?-> tools ::tools-menu)
;(?-> menu-data ::menu-data)
;TODO: configure this filter!

;    (locals)
;[:<>
;[row
;[col {:xs 12 :sm 8}
;[:h3.d-print-none {:style {:padding-right 20}} "Choose a tool:"]

;; :todo; There'll be a better CSS solution to keeping this on screen for both desktop and mobile
;; Even better would be to configure the break points as what makes sense will be very application
;; specific.
;(doall
;(map-indexed
;(fn [i group]
; [:div {:key i}
; (->> group
;     (map tool-buttons)
;    (into [:> bs/ButtonGroup (merge {:style {:width "auto"}} orientation)])
;(partition-by :button-type (butlast menu-data))]
;[col {:xs 12 :sm 4}
;(tool-buttons (last menu-data))
;[:p.d-print-none "Things you might discuss during a consultation"]
;[background-link organ-name centre-name active-tool]))


(defn phone-card
  "Render a mobile compatible card - actually a list item - containing hospital-local links to tools"
  [{:keys [hospital _link organ centre tools mdata] :as params}]
  #_(?-> params ::phone-card-params)
  (let [tab (if-let [selected-vis @(rf/subscribe [::subs/selected-vis])]
              selected-vis
              "bars")
        lookups (:lookups mdata)
        inputs (shorts/db-to-URI lookups @(rf/subscribe [::subs/inputs]))]
    #_(?-> inputs ::phone-card-inputs)
    (when (and mdata lookups)
      [:> bs/ListGroup.Item {:action true
                             ;:href (apply rfe/href link)
                             :on-click #(rf/dispatch [::events/navigate :kcp.views/organ-centre-tool-tab-inputs
                                                      {:organ organ
                                                       :centre centre
                                                       :tool (first tools)
                                                       :tab tab
                                                       :inputs inputs #_path-inputs}])}
       hospital])))

(defn page
  "A generic page component, rendering a title and the page's children"
  ([title & children]
   [container {:key 1
               :fluid "xl"
               :style {:min-height "calc(100vh - 165px"
                       :background-color "#ffffffbb"
                       :max-width 2000                      ;todo: adjust for side margins
                       :margin-bottom 20}}
    [row
     [:> bs/Col {:md {:span 8 :offset 2}}
      [:h1 {:style {:margin-top 0 :font-size "2em"}} title]
      (into [:<>] (map-indexed (fn [k c] ^{:key k} c) children))]]]))

(defn decorated-page
  "A generic page component, rendering a title and the page's children"
  ([decoration title subtitle & children]
   [container {:key 1
               :fluid "xl"
               :style {:min-height "calc(100vh - 165px"
                       :background-color "#ffffffbb"
                       :max-width 2000                      ;todo: adjust for side margins
                       :margin-bottom 20}}
    [row
     [col
      decoration
      [:h1 {:style {:margin-top 20 :font-size "2em"}} title]
      [:p [:b subtitle]]
      (into [:<>] (map-indexed (fn [k c] ^{:key k} c) children))]]]))
(def mobile-break
  "Screens of this size or smaller are rendered with mobile oriented views."
  1200                                                      ;800
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
  [:> bs/Row {:style {:display "flex" :align-items "center" :margin-bottom 20}}
   [:> bs/Col {:style {:display "flex" :justify-content "flex-end"}}
    [:> bs/Form.Label {:style {:font-weight "bold" :text-align "right" :margin-bottom 20 :line-height 1.2}}
     label]]
   [:> bs/Col
    (ni/numeric-input {:key :test/day-input                 ; creates id="test-day-input" on input element
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
