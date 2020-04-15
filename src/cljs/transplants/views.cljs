(ns transplants.views
  (:require
   [re-frame.core :as rf]
   [transplants.subs :as subs]
   [transplants.events :as events]
   ["react-bootstrap" :as bs :refer [Button]
    :rename  {Container container
              Row row
              Col col}]
   ))

;;; Views ;;;
(defn home-page []
  [:> container
   [:> row
    [:> col
     [:h1 ""]
     [:> Button {:variant "primary"
    ;; Dispatch navigate event that triggers a (side)effect.
                 :key 1
                 :on-click #(rf/dispatch [::events/navigate ::sub-page1])}
      "Waiting Time Tool"]
     [:> Button {:variant "secondary"
    ;; Dispatch navigate event that triggers a (side)effect.
                 :key 2
                 :on-click #(rf/dispatch [::events/navigate ::sub-page2])}
      "Survival Time Tool"]]]
   ])

(defn sub-page1 []
  [:div
   [:h1 "This is sub-page 1"]])

(defn sub-page2 []
  [:div
   [:h1 "This is sub-page 2"]])

