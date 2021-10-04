(ns transplants.print-fills
  (:require [clojure.string :as string]
            [goog.color :as col :refer [hexToRgb]]))

;;;
;; Most browsers do not print background colours without the user setting a preference to do so.
;; We can paint divs with a background image, but we need to generate them algorithimcally.
;; Let's have a go at making dataURLs to paint backgrounds...
;;
;; See http://jsfiddle.net/LPxrT/
;;
(defn encode-triplet [e1 e2 e3]
  (let [keys (into [] "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=")
        enc1 (bit-shift-right e1 2)
        enc2 (bit-or (bit-shift-left (bit-and e1 3) 4) (bit-shift-right e2 4))
        enc3 (bit-or (bit-shift-left (bit-and e2 15) 2) (bit-shift-right e3 6))
        enc4 (bit-and e3 63)]
    (string/join [(keys enc1) (keys enc2) (keys enc3) (keys enc4)])))

(defn encode-rgb [r g b]
  (string/join [(encode-triplet 0 r g) (encode-triplet b 255 255)]))

(defn generate-pixel [encoded-color]
  (string/join ["data:image/gif;base64,R0lGODlhAQABAPAA" encoded-color "/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="]))

(defn fill-data-url [r g b]
  (generate-pixel (encode-rgb r g b)))

(defn rgb-url [rgb]
  (apply fill-data-url rgb))

(defn hex-url [hex] 
  (apply fill-data-url (js->clj (hexToRgb hex))))

;;
;; generate data-urls for the colours we use which should appear in printable background fills
;;
(def data-urls

  {:vis-background (hex-url "#cccccc")
   :waiting (hex-url "#4866CB")
   :graft (hex-url "#0491d8")
   :survival (rgb-url [0, 151, 156])
   :usefulinfo (rgb-url [12, 40, 44])
   :white (hex-url "#ffffff")
   :info (hex-url "#9C9CFF")
   :selected (hex-url "#889988")
   :boxed (hex-url "#dfe4df")}
  ;; => {:vis-background "data:image/gif;base64,R0lGODlhAQABAPAAAMzMzP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
  ;;     :waiting "data:image/gif;base64,R0lGODlhAQABAPAAAEhmy////yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
  ;;     :graft "data:image/gif;base64,R0lGODlhAQABAPAAAASR2P///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
  ;;     :survival "data:image/gif;base64,R0lGODlhAQABAPAAAACXnP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
  ;;     :usefulinfo "data:image/gif;base64,R0lGODlhAQABAPAAAAwoLP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
  ;;     :white "data:image/gif;base64,R0lGODlhAQABAPAAAP///////yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
  ;;     :info "data:image/gif;base64,R0lGODlhAQABAPAAAJyc/////yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
  ;;     :selected "data:image/gif;base64,R0lGODlhAQABAPAAAIiZiP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="}

  )

