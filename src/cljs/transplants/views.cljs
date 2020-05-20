(ns transplants.views
  (:require
;   [reagent.dom :as rd]
   [reagent.core :as rc]
   [re-frame.core :as rf]
   ["react-bootstrap" :as bs]
;   [transplants.dev-utils :as dev-utils]
   [transplants.subs :as subs]
   [transplants.events :as events]
   [transplants.bsio :as bsio :refer [radio-button-group]]
   [transplants.ui :as ui :refer [page
                                  row
                                  col
                                  button]]
   [winton-utils.data-frame :refer [map-of-vs->v-of-maps]]
   ))

(comment
(rf/dispatch [::events/initialize-db])
  )

;;; Views ;;;
(defn home-page
  []
  [page ""
   [row
    [col
     [:div {:style {:margin-bottom 20}}
      [button {:variant "primary"
    ;; Dispatch navigate event that triggers a (side)effect.
               :key 1
               :on-click #(rf/dispatch [::events/navigate ::lung])}
       "Lung transplant centres"]]
     [:div
      [button {:variant "primary"
    ;; Dispatch navigate event that triggers a (side)effect.
               :key 1
               :on-click #(rf/dispatch [::events/navigate ::kidney])}
       "Kidney transplant centres"]]]]])

(defn organ-home
  "The organ home pages need organ centres data to render. And it's handy to detect small screens"
  [organ]

  #_[:div "Organ " organ]
  (let [window-width (rf/subscribe [::subs/window-width])
        tools (rf/subscribe [(keyword "transplants.subs" (str (name organ) "-tools"))])
        centres (rf/subscribe [(keyword "transplants.subs" (str (name organ) "-centres"))])]
    
    [ui/card-page "Choose your transplant centre"
     (if-not @centres
       [:div "loading " (name organ) "/edn/centres.txt"]
       (if-not @tools 
         [:div "loading " (name organ) "/edn/tools.txt"]
         (let [centres (sort-by :description (map-of-vs->v-of-maps @centres))
               tools (map-of-vs->v-of-maps @tools)
               centre-card (fn [centre] [(if (> @window-width ui/mobile-break)
                                           ui/nav-card
                                           ui/phone-card)
                                         {:img-src (:image centre)
                                          :organ organ
                                          :link (:link centre)
                                          :centre (:name centre)
                                          :hospital (:description centre)
                                          :width 200
                                          :tools tools}])]

           (into [:> bs/CardDeck] (map centre-card centres)))))]))

(defn organ-centre
  "A home page for an organ at a centre. It should offer links to the available tools, pre-configured
   for that organ and centre."
  []
  [:h1 "Organ Centre"]
  #_[page (pr-str [organ centre])])

;(defn lung-home [] (organ-home :lung))
;(defn kidney-home [] (organ-home :kidney))

(defn sub-page1 []
  [:h1 "This is sub-page 1"])

(defn about []
  [page "About"]
)

(defn about-technical
  "Technical stuff - in Predict we scroll to this rather than making it a separate page. 
In reagent, maybe use https://github.com/PEZ/clerk if we need to do this."
  []
  [page "Technical"])


(defonce sex (rc/atom nil))

(defn event-handler [k v]
  (if (= v "male") (reset! sex :male) (reset! sex :female))
  )

(comment
  (reset! sex :female)
  @sex)


(defn waiting []

  [page "Waiting for a transplant"
   [col
    [ui/titled-panel "Inputs"
     [row {:key 1}
      [col {:style {:justify-content :flex-end}}
       [:label  "Sex"]]
      [col
       [:div {:style {:margin-bottom 5}}
        [radio-button-group {:value-k "Sex"
                             :value-f (fn [] @sex)
                             :event-f event-handler
                             :buttons-f (fn [] [{:label "Male"
                                                 :level :male}
                                                {:label "Female"
                                                 :level :female}])}]]
       [:div
        [radio-button-group {:value-k "Sex"
                             :value-f (fn [] @sex)
                             :event-f event-handler
                             :buttons-f (fn [] [{:label "Male"
                                                 :level :male}
                                                {:label "Female"
                                                 :level :female}])}]]


       #_[radio-button-group* {:value-k "Sex"
                               :value-f (fn [] @sex)
                               :event-f identity
                               :buttons-f (fn [] [{:label "Male"
                                                   :level :male}
                                                  {:label "Female"
                                                   :level :female}])}]]]]]
   [col {:xs 7}
    [ui/titled-panel "Results"
     [:div {:key 1} "waiting results"]]]])

(defn surviving []
  [page "Survival Post Transplant"
   [row
    [col
     [ui/titled-panel "Inputs"
      [:div {:key 1} "survival inputs"]]]
    [col
     [ui/titled-panel "Results"
      [:div {:key 1} "survival results"]]]]]
  )

