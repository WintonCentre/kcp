(ns transplants.views
  (:require
   [clojure.string :as string]
   [re-frame.core :as rf]
   ["react-bootstrap" :as bs]
   ;["core-js/es"]
   [transplants.bundles :as bun]
   [transplants.utils :as utils]
   [transplants.subs :as subs]
   [transplants.events :as events]
   [transplants.ui :as ui]
   [transplants.paths :as paths]
   [transplants.widgets :as widg]
   [transplants.results :as results]
   [shadow.debug :refer [locals ?->]]))

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
        centres (rf/subscribe [:transplants.subs/organ-centres])
        mobile (<= @window-width ui/mobile-break)]
    [ui/card-page "Choose your transplant centre"
     (if-not @centres
       [:div "loading " organ "centres"]
       (if-not @tools
         [:div "loading " organ "/edn/tools.txt"]
         (let [centres (sort-by :description ((keyword organ) @centres))
               tools @tools
               centre-card (fn [centre]
                             [ui/centre-card mobile
                              {:img-src (:image centre)
                               :organ organ
                               :link [::organ-centre {:organ organ :centre (name (:key centre))}]
                               :centre (:key centre)
                               :hospital (:description centre)
                               :width 200
                               :tools tools}])]
           (into (ui/centre-card-deck mobile)
                 (map centre-card centres)))))]))

(def background-infos
  {:visits "Visits to hospital after transplant"
   :donors "Donor Decisions"
   :medications "Medications after Transplant Surgery"
   :window "The Window"
   :percent "What does a percentage look like?"}
  )

(defmulti show-background-info 
  "Render the selected background info"
  :info-key)

(defmethod show-background-info :visits [options]
  [:<>
   [:h3 (:visits background-infos)]
   [:p "A typical patient might revisit"]
   [:ul
    [:li "in the first month 	-  once a week,"]
    [:li "in the second month - every other week,"]
    [:li "in the third month 	- every other week,"]
    [:li "in the first year	- every 4 weeks,"]
    [:li "then every 3 months for life"]]])

(defmethod show-background-info :donors [options]
  [:<>
   [:h3 (:donors background-infos)]
   [:p "A checklist of donor factors that may affect a decision."]
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
   [:p "This is a diagram drawn by a clinician. As the health of a transplant candidate
        decreases, there comes a point where a transplant could be recommended. This opens
        a window of opportunity which persists until the patient receives a transplant or
        their health deteriorates to the point where it would no longer be recommended." ]
   [:> bs/Image {:fluid true
                 :src "assets/The Window.png"}]])

(defn a-percentage
  "Replace 'a percentage ' in s with 'v% '"
  [s v]
  (string/replace s
                  "a percentage "
                  (str v "% "))
  )
(comment
  (def random true)
  (def sample-set (atom #{}))
  (defn resample [n percent]
    (when (zero? n) 
      (reset! sample-set #{}))
    (if (< (count sample-set) percent)
      (let [x (rand-int 100)] 
        (while (sample-set x))))
    ))

(defmethod show-background-info :percent [options]
  (let [percent @(rf/subscribe [::subs/guidance-percent])
        randomise-icons @(rf/subscribe [::subs/randomise-icons])]
    [:<>
     [:h3 (a-percentage (:percent background-infos) percent)]
     [ui/row {;:margin-bottom 5
             :display :flex
             :justify-content "start"
             :flex-wrap "wrap"}
      [ui/col
       [:div {:sm 3 :style {;:margin-bottom 5
                            :display :flex
                            :justify-content "flex-start"
                            :flex-wrap "wrap"}
               ;:flex-direction "column"
              }
        [:div {:style {:display :flex
                       :flex-direction "row"
                       :width 115
                       :justify-content "space-between"
                       :margin-bottom 5
                       :margin-right 5}}
         [:> bs/Button {:style {:width 55 :height 50
                                :margin-right 5}
                        :disabled (zero? percent)
                        :on-click #(rf/dispatch [::events/inc-guidance-percent -1])} "- 1"]
         [:> bs/Button {:style {:width 55   :height 50}
                        :disabled (= 100 percent)
                        :on-click #(rf/dispatch [::events/inc-guidance-percent 1])} "+ 1"]]
        [:div {:style {:display :flex
                       :width 115
                       :justify-content "space-between"
                       :margin-bottom 5
                       :margin-right 5}}
         [:> bs/Button {:style {:width 55
                                :height 50
                                :margin-right 5}
                        :disabled (zero? percent)
                        :on-click #(rf/dispatch [::events/inc-guidance-percent -10])} "-10"]
         [:> bs/Button {:style {:width 55 :height 50}
                        :disabled (= 100 percent)
                        :on-click #(rf/dispatch [::events/inc-guidance-percent 10])} "+10"]]]
       [:> bs/Form
        [:> bs/Form.Group {:on-click #(rf/dispatch [::events/randomise-icons])
                           #_#_:controlId "randomise-icons"}
         [:> bs/Form.Check {:inline true
                            :type "checkbox"
                            :checked randomise-icons
                            }]
         [:> bs/Form.Label "Randomised? "]
         ]]]
      [ui/col {:sm 9}
       (let [order (shuffle (concat (range percent) (range -1 (- percent 101) -1)))]
         (into
          [:<>
           (map
            (fn [j]
              [ui/row {:key (str "icon-row-" j)}
               [ui/col
                (into [:<>
                       (map (fn [i]
                              [ui/open-icon
                               {:key (str "icon-col-" i)
                              ;:border "1px solid red"
                              ;:border-radius 15
                                :color (if (neg? (if randomise-icons
                                                   (order (- 100 (+ 10 (* j 10) (- i))))
                                                   (- percent (- 101 (+ 10 (* j 10) (- i)))))) 
                                         "#CCC" 
                                         "#488") 
                                #_(if (< (- 100 (+ 10 (* j 10) (- i))) percent) "#488" "#CCC")
                                :padding "4px 5px"} "person"]) (range 10))])]])
            (range 10))]))]]]))
(comment
  (def i 5)
  (- i)
  )

(defn background-info
  "Organ specific background-info.
   TODO: Pull from a file somehow. We need an EDN/Hiccup template mechanism for that. Somebody must
   have written one?"
  [organ]
  (if (= organ :kidney)
    [ui/row
     [ui/col
      [:h3 "Kidney info TBD"]]]
    [ui/row
     [ui/col {:md 4}
      [:h3 {:style {:margin-top 40}} "Background guidance"]

      [:> bs/ListGroup
       [:> bs/ListGroup.Item {:action true
                              :on-click #(rf/dispatch [::events/background-info :visits])}
        (:visits background-infos)]
       [:> bs/ListGroup.Item {:action true
                              :on-click #(rf/dispatch [::events/background-info :donors])}
        (:donors background-infos)]
       [:> bs/ListGroup.Item {:action true
                              :on-click #(rf/dispatch [::events/background-info :medications])}
        (:medications background-infos)]
       [:> bs/ListGroup.Item {:action true
                              :on-click #(rf/dispatch [::events/background-info :window])}
        (:window background-infos)]
       [:> bs/ListGroup.Item {:action true
                              :on-click #(rf/dispatch [::events/background-info :percent])}
        (a-percentage (:percent background-infos) @(rf/subscribe [::subs/guidance-percent]))]]]
     [ui/col {:md 8}
      [:div {:style {:margin-top 40}}
       (show-background-info {:info-key @(rf/subscribe [::subs/background-info])})]]]))

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
      
      (let [centre-info (utils/get-centre-info centres organ centre)]
        [ui/page [:span (:description centre-info) 
                  (str " " (string/capitalize (name organ)) " transplant centre")]
         [ui/row
          [ui/col
           ;[:p  "Available trac tools"]
           [ui/background-link organ centre]
           [ui/tools-menu tools organ-name centre-name {:vertical false}]
           #_(->> tools
                  (map #(conj % [:organ organ-name]))
                  (map #(conj % [:centre centre-name]))
                  (map #(conj % [:tool (name (:key %))]))
                  (map ui/tool-buttons)
                  (into [:> bs/ButtonGroup {:vertical false}]))]]
         [background-info organ]
         ]))))

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


(defn tool-page-content
  []
  )

(comment
  (def tools @(rf/subscribe [::subs/tools]))
  (def tool :waiting)
  (get-tool-meta tools tool)
  ,)

(defn organ-centre-tool
  "A home page for an organ at a centre. It should offer links to the available tools, pre-configured
   for that organ and centre."
  ([]
   (organ-centre-tool nil))
  ([tab]
   (let [route @(rf/subscribe [::subs/current-route])
         tools @(rf/subscribe [::subs/tools])
         organ-centres @(rf/subscribe [::subs/organ-centres])
         [organ-name centre-name tool-name :as p-names] (utils/path-names (:path-params route))
         [organ centre tool] (map keyword p-names)]
     (when (and organ centre ((keyword organ) organ-centres) tool)
       (let [centre-info (utils/get-centre-info organ-centres organ centre)
             tool-meta (get-tool-meta tools tool)]
         [ui/page (:description centre-info)
          (if-let [tool-centre-bundle (bun/get-bundle organ centre tool)]
            [ui/row
             [ui/col {:xs 12 :md 5}
              [ui/background-link organ centre]
              [ui/tools-menu tools organ-name centre-name {:vertical false}]
              [:h4 {:style {:margin-top 10}}
               (:label tool-meta) " – " (:description tool-meta)]
              (widg/widget {:type :reset})
              (into [:<>]
                    (map
                     (fn [[k w]] ^{:key (:factor w)}
                       [:div {:style {:margin-bottom 15}}
                        (widg/widget (assoc w :model tool))])
                     (get tool-centre-bundle :fmaps)))]
             [ui/col
              [results/results-panel organ centre tool]]]
            (if (= tool :guidance)
              [:<>

               [ui/tools-menu tools organ-name centre-name {:vertical false}]
               [background-info organ]]
              (let [path (paths/organ-centre-name-tool organ-name
                                                       (:name centre-info)
                                                       tool-name)]
                #_(?-> [path
                      [:bundles organ centre tool]] ::view-dispatch)
                (rf/dispatch [::events/load-bundles [path
                                                     [:bundles organ centre tool]]])
                #_[:div "Loading " path])))
          [ui/row
           [ui/col {:class-name "d-none d-md-block"}]]])))))

(comment
  (+ 1 1)
  (paths/organ-centre-name-tool :kidney
                                "The Royal Free"
                                :waiting)
    (paths/organ-centre-name-tool :kidney
                                  "The Royal Free"
                                  "waiting")
  (paths/organ-centre-name-tool :kidney
                                "The Royal Free"
                                :guidance)
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
