(ns transplants.views
  (:require
   [clojure.string :as string]
   [re-frame.core :as rf]
   [reitit.frontend.easy :as rfe]
   ["react-bootstrap" :as bs]
   [transplants.utils :as utils]
   [transplants.subs :as subs]
   [transplants.events :as events]
   [transplants.ui :as ui]
   [transplants.paths :as paths]
   [transplants.widgets :as widg]
   [transplants.results :as results]))

(comment
  (rf/dispatch [::events/initialize-db]))

;;; Views ;;;
(defn home-page
  "Display a generic home page. 
   Minimally, navigation from here to an organ home page."
  []
  (let [metadata (rf/subscribe [::subs/metadata])]
    [ui/page "Trac tools"
     [ui/row
      [ui/col
       (into [:div {:style {:margin-bottom 20}}
              (map (fn [organ]
                     [:div {:key (:text organ)
                            :style {:margin-bottom 20}}
                      [ui/button {:id (str (name (:organ organ)) "-button")
                                  :variant "primary"
                               :on-click #(rf/dispatch [::events/navigate ::organ {:organ (:organ organ)}])}
                       (:label organ)]])
                   (:organ-meta @metadata))])]]]))

(defn organ-home
  "The organ home pages need organ centres data to render. And it's handy to detect small screens.
   Minimally, navigate to an organ centre home page."
  []
  (let [window-width (rf/subscribe [::subs/window-width])
        tools (rf/subscribe [:transplants.subs/tools])
        organ (get-in @(rf/subscribe [::subs/current-route]) [:path-params :organ])
        centres (rf/subscribe [:transplants.subs/organ-centres])]

    [ui/card-page "Choose your transplant centre"
     (if-not @centres
       [:div "loading " organ "centres"]
       (if-not @tools
         [:div "loading " organ "/edn/tools.txt"]
         (let [centres (sort-by :description ((keyword organ) @centres))
               tools @tools
               centre-card (fn [centre] [(if (> @window-width ui/mobile-break)
                                           ui/nav-card
                                           ui/phone-card)
                                         {:img-src (:image centre)
                                          :organ organ
                                          :link [::organ-centre {:organ organ :centre (name (:key centre))}]
                                          :centre (:key centre)
                                          :hospital (:description centre)
                                          :width 200
                                          :tools tools}])]

           (into [:> bs/CardDeck] (map centre-card centres)))))]))

(def background-infos
  {:visits "Visits to hospital after transplant"
   :donors "Donor Decisions"
   :medications "Medications after Transplant Surgery"
   :window "The Window"
   :percent "What does a percent look like?"}
  )

(defmulti show-background-info 
  "Render the selected background info"
  :info-key)

(defmethod show-background-info :visits [options]
  [:<>
   [:h3 (:visits background-infos)]
   [:ul
    [:li "1st  month 	-  once a week, every week"]
    [:li "2nd month 	- once a week, every other week"]
    [:li "3rd month 	- once a week, every other week"]
    [:li "4th month 	- once a week, every 4 weeks"]
    [:li "Once a week every 4 weeks for 1 more year"]
    [:li "Then every 3 months for life"]]])

(defmethod show-background-info :donors [options]
  [:<>
   [:h3 (:donors background-infos)]
   [:ul
    [:li "Recent or ex smoker"]
    [:li "Older donor (>60 years)"]
    [:li "Donor with a malignancy that has very low risk of transmission to me"]
    [:li "Bacterial or viral infection considered to be low risk to me"]
    [:li "High risk sexual behaviour or intravenous drug use"]]])

(defmethod show-background-info :medications [options]
  [:<>
   [ui/row
    [ui/col
     [:h3 (:medications background-infos)]]]
   [ui/row
    [ui/col {:md 5}
     [:ul
      [:li "Cyclosporines"]
      [:li "Tacrolimus"]
      [:li "Mycophenolate Mofetil"]
      [:li "Prednisolone"]
      [:li "Azathuiprine"]
      [:li "Sirolimus"]
      [:li "Dacllizumab and Basilecmab"]
      [:li "OKT3"]
      [:li "Anti-Fungal Medications"]
      [:li "Antiviral Medications"]
      [:li "Diuretics"]
      [:li "Antibiotics"]
      [:li "Anti-ulcer medications"]]]
    [ui/col {:md 6}
     [:> bs/Image {:fluid true
                 :src "assets/Post Transplant Medications.png"}]]]])
  

(defmethod show-background-info :window [options]
  [:<>
   [:h3 (:window background-infos)]
   [:> bs/Image {:fluid true
                 :src "assets/The Window.png"}]])

(defmethod show-background-info :percent [options]
  [:<> 
   [:h3 (:percent background-infos)]
   (into
    [:<>
     (map
      (fn [j]
        [ui/row
         [ui/col
          (into [:<> 
                 (map (fn [i]
                        [ui/open-icon {:color (if (< (+ (* i 10) j) 22) "#488" "#CCC")
                                       :padding "0px 5px"} "person"]) (range 10))])]])
      (range 10))])])



(defn organ-centre
  "A home page for an organ at a centre. It should offer links to the available tools, pre-configured
   for that organ and centre.
   Minimally, navigate to an organ-centre-tool home page."
  []
  (let [route @(rf/subscribe [::subs/current-route])
        centres @(rf/subscribe [::subs/organ-centres])
        tools @(rf/subscribe [::subs/tools])
        ; organ (get-in route [:path-params :organ])
        ; centre (get-in route [:path-params :centre])
        [organ-name centre-name tool-name :as p-names] (utils/path-names (:path-params route))
        [organ centre tool] (map keyword p-names)]
    (when (and organ centre centres tools)
      
      ;;; TODO: Tidy organ centre tool up here
      
      (let [centre-info (utils/get-centre-info centres organ centre) #_(first (get (group-by :key centres) (name centre)))]
        [ui/page [:span (:description centre-info) 
                  (str " " (string/capitalize (name organ)) " transplant centre")]
         [ui/row
          #_[ui/col
           [:h2 (str (string/capitalize (name organ)) " transplant centre")]]
          [ui/col
           [:h2  "Available trac tools"]
           (->> tools
                (map #(conj % [:organ organ-name]))
                (map #(conj % [:centre centre-name]))
                (map #(conj % [:tool (name (:key %))]))
                (map ui/tool-buttons)
                (into [:> bs/ButtonGroup {:vertical false}]))]]
         [ui/row
          [ui/col {:md 4}
           [:h3 {:style {:margin-top 40}} "Background guidance"]
           [:> bs/ListGroup
            [:> bs/ListGroup.Item {:action true
                                   :on-click #(rf/dispatch [::events/background-info :visits])}
             (:visits background-infos)
             ]
            [:> bs/ListGroup.Item {:action true
                                   :on-click #(rf/dispatch [::events/background-info :donors])}
             "Donor Decisions"]
            [:> bs/ListGroup.Item {:action true
                                   :on-click #(rf/dispatch [::events/background-info :medications])}
             "Medications after transplant surgery"]
            [:> bs/ListGroup.Item {:action true
                                   :on-click #(rf/dispatch [::events/background-info :window])}
             "The Window"]
            [:> bs/ListGroup.Item {:action true
                                   :on-click #(rf/dispatch [::events/background-info :percent])}
             "What does a percent look like?"]]
           
           ]
          [ui/col {:md 8}
           [:div {:style {:margin-top 40}}
            (show-background-info {:info-key @(rf/subscribe [::subs/background-info])})]
           ]
          
          #_[:div
           [:h4 "Examples of:"]
           [:ul
            [:li "Donor decisions"]
            [:li "Matching criteria"]
            [:li "What happens if you're called in"]
            [:li "What happens after transplant"]
            [:ul
             [:li "Visit schedule"]
             [:li "Drug regime"]]]
           [ui/col
            [:h3 {:style {:margin-top 40}} "What does " [:i "x"] "% look like?"]
            [:p "WHAT DOES % LOOK LIKE (eg to demonstrate cancer risk of meds)"]]
           [ui/col
            [:h3 {:style {:margin-top 40}} "The Window"]
            [:p "ILL ENOUGH / WELL ENOUGH?"]
            [:p "Graph of ‘the window’?"]
            [:p "Graph of disease trajectory?"]]]]]))))

(defn get-tool-meta
  [tools tool-key]
  @(rf/subscribe [::subs/tools])
  (first (filter (fn [{:keys [key level-name description]}]
                   (= tool-key key))
                 tools)))

(comment
  (def organ "kidney")
  (def centre-info {:key :belf, :name "Belfast", :link "http://www.belfasttrust.hscni.net/", :image "assets/kidney/bel.png", :description "Belfast City Hospital"})
  (paths/organ-centre-name-tool organ
                                "Belfast"
                                "waiting"))


(defn organ-centre-tool
  "A home page for an organ at a centre. It should offer links to the available tools, pre-configured
   for that organ and centre."
  []
  (let [route @(rf/subscribe [::subs/current-route])
        tools @(rf/subscribe [::subs/tools])
        organ-centres @(rf/subscribe [::subs/organ-centres])
        bundles @(rf/subscribe [::subs/bundles])
        [organ-name centre-name tool-name :as p-names] (utils/path-names (:path-params route))
        [organ centre tool] (map keyword p-names)
        ]
    (when (and organ centre ((keyword organ) organ-centres) tool)
      (let [centre-info (utils/get-centre-info organ-centres organ centre)
            tool-meta (get-tool-meta tools tool)]
        [ui/page    
         (:description centre-info)
         (if-let [tool-centre-bundle (get-in bundles [organ centre tool])]
           (let [inputs-key (utils/make-sheet-key tool-name "-inputs")]
             [ui/row 
              [ui/col {:xs 12 :md 5}
               [:p "For more information that will be helpful to patients, follow the link to "
                [:a {:href  (rfe/href ::organ-centre {:organ organ :centre centre})}
                 "background guidance"] "."
                #_(str (string/capitalize organ-name) " transplant centre")]
               (->> tools
                    (map #(conj % [:organ organ-name]))
                    (map #(conj % [:centre centre-name]))
                    (map #(conj % [:tool (name (:key %))]))
                    (map ui/tool-buttons)
                    (into [:> bs/ButtonGroup {:vertical false}]))
               [:h4 {:style {:margin-top 10}}
                (:label tool-meta) " – " (:description tool-meta)]
               (widg/widget {:type :reset})
               (into [:<>]
                     (map
                      (fn [[k w]] ^{:key (:factor w)}
                        [:div {:style {:margin-bottom 15}}
                         (widg/widget (assoc w :model tool))])
                      (get tool-centre-bundle :-inputs)))]
              [ui/col
               [results/results-panel bundles organ centre tool]]])
           (let [path (paths/organ-centre-name-tool organ-name
                                                    (:name centre-info)
                                                    tool-name)]

             (rf/dispatch [::events/load-bundles [path
                                                  [:bundles organ centre tool]]])
             [:div "Loading " path]))
         [ui/row
          [ui/col {:class-name "d-none d-md-block"}]]
         
         ]))))

(comment
  (+ 1 1)
  (paths/organ-centre-name-tool :kidney
                                "The Royal Free"
                                :waiting)
  )

;-------------- Text views below --------------
;
; Needs replacing with a text system that supports editable rich text somewhere
;
;(defn lung-home [] (organ-home :lung))
;(defn kidney-home [] (organ-home :kidney))

(defn sub-page1 []
  [:h1 "This is sub-page 1"])

(defn about []
  [ui/page "About"])

(defn about-technical
  "Technical stuff - in Predict we scroll to this rather than making it a separate page. 
In reagent, maybe use https://github.com/PEZ/clerk if we need to do this."
  []
  [ui/page "Technical"])
