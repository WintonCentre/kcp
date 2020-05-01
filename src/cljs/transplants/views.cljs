(ns transplants.views
  (:require
   [re-frame.core :as rf]
   [transplants.dev-utils :as dev-utils]
   [transplants.subs :as subs]
   [transplants.events :as events]
   (transplants.ui :as ui :refer [page
                                  row
                                  col
                                  button])
   ))

;;; Views ;;;
(defn home-page []
  [page
   [row
    [col
     [:h1 "Home"]
     [button {:variant "primary"
    ;; Dispatch navigate event that triggers a (side)effect.
              :key 1
              :on-click #(rf/dispatch [::events/navigate ::sub-page1])}
      "Waiting Time Tool"]
     [button {:variant "secondary"
    ;; Dispatch navigate event that triggers a (side)effect.
              :key 2
              :on-click #(rf/dispatch [::events/navigate ::sub-page2])}
      "Survival Time Tool"]
     (dev-utils/lorem-many 20)
     ]]])

(defn sub-page1 []
  [:h1 "This is sub-page 1"])

(defn about []
  [page
   [:h1 "About"]])

(defn about-technical
  "Technical stuff - in Predict we scroll to this rather than making it a separate page. 
In reagent, maybe use https://github.com/PEZ/clerk if we need to do this."
  []
  [page
   [:h1 "Technical"]])

(defn waiting []
  [page
   [:h1 "Waiting for a transplant"]
   [ui/two-panels
    ui/inputs-panel
    ui/results-panel]]
  )

(defn surviving []
  [page
   [:h1 "Survival Post Transplant"]
   [ui/two-panels
    ui/inputs-panel
    ui/results-panel]]
  )

