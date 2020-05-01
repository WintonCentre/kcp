(ns transplants.ui
  (:require [reagent.core :as rc]
            ["react-bootstrap" :as bs]))

(def container (rc/adapt-react-class bs/Container))
(def col (rc/adapt-react-class bs/Col))
(def row (rc/adapt-react-class bs/Row))
(def button (rc/adapt-react-class bs/Button))

(defn page
  [children]
  [container 
   children])

(defn two-panels
  [col1 col2]
  [row
   [col1]
   [col2]])

(defn inputs-panel
  []
  [col
   [:h2 "Inputs"]])

(defn results-panel
  []
  [col
   [:h2 "Results"]])

