(ns transplants.copy-image
  "Screen capture related code."
  (:require ["html2canvas" :as h2c]
            ["promise-polyfill" :refer [Promise]]))

;; This uses js promises, so for IE11 we need also
;; https://www.npmjs.com/package/promise-polyfill
;;

;; See Also
;; html2canvas.js
;; FileSave.js


(defn take-screen-shot
  "Take a screen-shot of from-element into a canvas.
   When taken, call done, passing the canvas as a parameter"
  [{:keys [from-element done]}]
  (-> (h2c from-element)
      (.then done)))

(defn show-screen-shot
  "Display a canvas by appending it to to-element"
  [canvas to-element]
  (.appendChild to-element canvas)) 



(comment
  (defn take-screen-shot
  [{:keys [from-element to-element]}]
  (.then (h2c from-element)
         (fn [canvas]
           (.append to-element canvas))))

  (let [capture (js/document.querySelector "#screen-shot")]
    (.then (h2c (js/document.querySelector "#app"))
           (fn [canvas]
             (.append capture canvas))))

  )


