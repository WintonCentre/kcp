(ns transplants.views
  (:require
   [re-frame.core :as rf]
   [transplants.subs :as subs]
   [transplants.events :as events]
   ["react-bootstrap" :as bs 
    :rename  {Container container
              Row row
              Col col}]
   ))


;; home
(defn home-panel []
  (let [name (rf/subscribe [::subs/name])]
    [:> container
     [:> row
      [:> col
       [:h1 (str "Hello from " @name ". This is the Home Page.")]]

      [:> col
       [:a {:href "/about"}
        "go to About Page"]]]
     ]))


;; about
(defn about-panel []
  [:> container
   [:> row
    [:> col
     [:h1 "This is the About Page."]

     [:div
      [:a {:href "/"}
       "go to Home Page"]]]]])


;; main
(defn- panels [panel-name]
  (case panel-name
    :home-panel [home-panel]
    :about-panel [about-panel]
    ))

(defn show-panel [panel-name]
  [panels panel-name])

(defn main-panel []
  (let [active-panel (rf/subscribe [::subs/active-panel])]
    [show-panel @active-panel]))
