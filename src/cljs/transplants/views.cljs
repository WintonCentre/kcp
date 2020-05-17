(ns transplants.views
  (:require
   
   [reagent.core :as rc]
   [re-frame.core :as rf]
   ["react-bootstrap" :as bs]
   [transplants.dev-utils :as dev-utils]
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
  "The organ home page needs organ centres data to render"
  [organ]
  (let [ready? (rf/subscribe [::subs/loaded?])]
    [ui/card-page "Choose your transplant centre"
     (if-not @ready?
       [:div "loading " (name organ) "/edn/centres.txt"]
       (let [centres (sort-by :name (map-of-vs->v-of-maps
                                     @(rf/subscribe [(keyword "transplants.subs" (str (name organ) "-centres"))])))]
         (->> centres
              (map (fn [centre]
                     [ui/nav-card {:img-src (:image centre)
                                   :organ :lung
                                   :centre (:name centre)
                                   :hospital (:description centre)}]))
              (into [:> bs/CardDeck]))))]
    #_[ui/card-page "Choose your transplant centre"
     (if-not @ready?
       (let [centres (sort-by :name (map-of-vs->v-of-maps @(rf/subscribe [(keyword "transplants.subs" (str (name organ) "-centres"))])))]
         (->> centres
              (map (fn [centre]
                     [ui/nav-card {:img-src (:image centre)
                                   :organ organ
                                   :centre (:name centre)
                                   :hospital (:description centre)}]))
              (into [:> bs/CardDeck]))))]))

(defn lung-home [] (organ-home :lung))
(defn kidney-home [] (organ-home :kidney))

#_(defn lung-home
  "The lung home page needs lung centres data to render"
  []
  (let [organ :lung
        ready? (rf/subscribe [::subs/loaded?])]
    [ui/card-page "Choose your transplant centre"
     (if-not @ready?
       [:div "loading lung/edn/centres.txt"]
       (let [centres (sort-by :name (map-of-vs->v-of-maps
                                     @(rf/subscribe [(keyword "transplants.subs" (str (name organ) "-centres"))])))]
         (->> centres
              (map (fn [centre]
                     [ui/nav-card {:img-src (:image centre)
                                   :organ :lung
                                   :centre (:name centre)
                                   :hospital (:description centre)}]))
              (into [:> bs/CardDeck]))))]))


#_(defn kidney-home
  "The lung home page needs lung centres data to render"
  []
  (let [ready? (rf/subscribe [::subs/loaded?])]
    [ui/card-page "Choose your transplant centre"
     (if-not @ready?
       [:div "loading kidney/edn/centres.txt"]
       (let [centres (sort-by :name (map-of-vs->v-of-maps @(rf/subscribe [::subs/kidney-centres])))]
         (->> centres
              (map (fn [centre]
                     [ui/nav-card {:img-src (:image centre)
                                   :organ :lung
                                   :centre (:name centre)
                                   :hospital (:description centre)}]))
              (into [:> bs/CardDeck]))))]))

#_(defn kidney-home
    "The kidney home page needs kidney centres data to render"
  []
  [ui/card-page "Choose your transplant centre"

   [:> bs/CardDeck
    [ui/nav-card {:img-src "https://srmrc.nihr.ac.uk/wp-content/uploads/o-BIRMINGHAM-HOSPITAL-facebook-1024x576.jpg"
                  :organ :lung
                  :centre "Birmingham"
                  :hospital "Queen Elizabeth's Hospital"}]
    [ui/nav-card {:img-src "https://royalpapworth.nhs.uk/application/files/cache/thumbnails/bc01df4e4f94ceb3d51f4f5d4a307160.jpg"
                  :organ :lung
                  :centre "Papworth"
                  :hospital "Royal Papworth Hospital"}]
    [ui/nav-card {:img-src "https://www.rbht.nhs.uk/sites/nhs/files/styles/teaser_image_16_9/public/Teasers/khp-1.jpg?h=88299694&itok=AzFNmBQH"
                  :organ :lung
                  :centre "Harefield"
                  :hospital "Harefield Hospital"}]
    [ui/nav-card {:img-src "http://www.newcastle-hospitals.org.uk/Freeman_External_1.jpg"
                  :organ :lung
                  :centre "Newcastle"
                  :hospital "Institute of Transplantation"}]
    [ui/nav-card {:img-src "https://upload.wikimedia.org/wikipedia/commons/2/2d/UHSMentrance.jpg"
                  :organ :lung
                  :centre "Manchester"
                  :hospital "University Hospital"}]]])

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

