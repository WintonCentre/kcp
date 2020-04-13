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

;;; Views ;;;
(defn home-page []
  [:div
   [:h1 "This is home page"]
   [:button
    ;; Dispatch navigate event that triggers a (side)effect.
    {:on-click #(rf/dispatch [::events/navigate ::sub-page2])}
    "Go to sub-page 2"]])

(defn sub-page1 []
  [:div
   [:h1 "This is sub-page 1"]])

(defn sub-page2 []
  [:div
   [:h1 "This is sub-page 2"]])

