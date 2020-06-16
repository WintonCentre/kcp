(ns transplants.views
  (:require
;   [reagent.dom :as rd]
   [clojure.string :as string]
   [reagent.core :as rc]
   [re-frame.core :as rf]
   ["react-bootstrap" :as bs]
;   [transplants.dev-utils :as dev-utils]
   [transplants.utils :as utils]
   [transplants.subs :as subs]
   [transplants.events :as events]
   [transplants.bsio :as bsio :refer [radio-button-group]]
   [transplants.ui :as ui :refer [page
                                  row
                                  col
                                  button]]
   [transplants.paths :as paths]
   [transplants.widgets :as widg]
   [transplants.transforms :as xf]
   (winton-utils.data-frame :refer [map-of-vs->v-of-maps])))

(comment
  (rf/dispatch [::events/initialize-db]))

;;; Views ;;;
(defn home-page
  "Display a generic home page. 
   Minimally, navigation from here to an organ home page."
  []
  (let [metadata (rf/subscribe [::subs/metadata])]
    [page "Trac tools"
     [row
      [col
       (into [:div {:style {:margin-bottom 20}}
              (map (fn [organ]
                     [:div {:key (:text organ)
                            :style {:margin-bottom 20}}
                      [button {:variant "primary"
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

(defn organ-centre
  "A home page for an organ at a centre. It should offer links to the available tools, pre-configured
   for that organ and centre.
   Minimally, navigate to an organ-centre-tool home page."
  []
  (let [route @(rf/subscribe [::subs/current-route])
        centres @(rf/subscribe [::subs/organ-centres])
        tools @(rf/subscribe [::subs/tools])
        organ (get-in route [:path-params :organ])
        centre (get-in route [:path-params :centre])]
    (when (and organ centre centres tools)
      
      ;;; TODO: Tidy organ centre tool up here
      
      (let [centre-info (utils/get-centre-info centres organ (keyword centre)) #_(first (get (group-by :key centres) (name centre)))]
        [page (:description centre-info)
         [row
          [col
           [:h2 (str (string/capitalize (name organ)) " transplant centre")]
           [:h3 {:style {:margin-top 40}} "Available trac tools"]
           (->> tools
                (map #(conj % [:organ organ]))
                (map #(conj % [:centre centre]))
                (map #(conj % [:tool (:key %)]))
                (map ui/tool-buttons)
                (into [:> bs/ButtonGroup {:vertical false}]))
           [row
            [col
             [:h3 {:style {:margin-top 40}} "Background guidance"]
             [:h4 "Examples of:"]
             [:ul
              [:li "Donor decisions"]
              [:li "Matching criteria"]
              [:li "What happens if you're called in"]
              [:li "What happens after transplant"]
              [:ul
               [:li "Visit schedule"]
               [:li "Drug regime"]]]]
            [col
             [:h3 {:style {:margin-top 40}} "What does " [:i "x"] "% look like?"]
             [:p "WHAT DOES % LOOK LIKE (eg to demonstrate cancer risk of meds)"]]
            [col
             [:h3 {:style {:margin-top 40}} "The Window"]
             [:p "ILL ENOUGH / WELL ENOUGH?"]
             [:p "Graph of ‘the window’?"]
             [:p "Graph of disease trajectory?"]]]]]]))))

(defn get-tool-meta
  [tools tool-key]
  @(rf/subscribe [::subs/tools])
  (first (filter (fn [{:keys [key label description]}]
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
        ;organ (get-in route [:path-params :organ])
        ;centre (get-in route [:path-params :centre])
        ;tool (get-in route [:path-params :tool])
        [organ-name centre tool-name] ((juxt :organ :centre :tool) (:path-params route))
        organ (keyword organ-name)
        tool (keyword tool-name)
        ]
    (when (and organ centre ((keyword organ) organ-centres) tool)
      (let [centre-info (utils/get-centre-info organ-centres organ centre)
            tool-meta (get-tool-meta tools tool)]
        ;(println "organ centre-info: " centre-info)
        ;(println "centre-name: " (:name centre-info))
        [page  
         (:description centre-info)
         [row {:style {:margin-bottom 20}}
          [col
           [:h2 (str (string/capitalize organ-name) " transplant centre")]
           [:h4 (:label tool-meta)]
           [:p  (:description tool-meta)]
           (->> tools
                (map #(conj % [:organ organ-name]))
                (map #(conj % [:centre centre]))
                (map #(conj % [:tool (:key %)]))
                (map ui/tool-buttons)
                (into [:> bs/ButtonGroup {:vertical false}]))]]
         [row 
          [col 
           ;[:div (pr-str "organ " organ)]
           (if-let [tool-bundle (get-in bundles [organ tool])]
             (let [tool-inputs-key (keyword (str tool-name "-inputs"))]

               (into [:<>]
                     (map
                      (fn [w] ^{:key (:factor w)}
                          (widg/widget w))
                      (get tool-bundle tool-inputs-key)
                      )))
             (let [path (paths/organ-centre-name-tool organ-name
                                                      (:name centre-info)
                                                      tool-name)]
               (rf/dispatch [::events/load-bundles [path
                                                    [:bundles organ tool]]])
               [:div "Loading " path]))]
          [col]]
          [col]]))))

;-------------- Text views below --------------
;
; Needs replacing with a text system that supports editable rich text somewhere
;
;(defn lung-home [] (organ-home :lung))
;(defn kidney-home [] (organ-home :kidney))

(defn sub-page1 []
  [:h1 "This is sub-page 1"])

(defn about []
  [page "About"])

(defn about-technical
  "Technical stuff - in Predict we scroll to this rather than making it a separate page. 
In reagent, maybe use https://github.com/PEZ/clerk if we need to do this."
  []
  [page "Technical"])
