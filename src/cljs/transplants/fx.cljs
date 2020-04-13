(ns transplants.fx
  (:require [re-frame.core :as rf])
  (:require [reitit.frontend.easy :as rfe])
  )

;;; Effects ;;;

;; Triggering navigation from events.
(rf/reg-fx
 ::navigate!
 (fn [k params query]
   (println "NAVIGATE!" k params query)
   (rfe/push-state k params query)))
