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

(comment
  (devu/lorem-1 2)
  (devulorem-many 2)
  )

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
  [:h1 "About"])

(defn about-technical []
  [:h1 "Technical"])

(defn waiting []
  [:<>
   [:h1 "Waiting"]
   [ui/two-panels
    ui/inputs-panel
    ui/results-panel]]
  )

