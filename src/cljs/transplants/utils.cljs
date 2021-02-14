(ns transplants.utils
  (:require [clojure.string :refer [starts-with?]]))

(defn get-centre-info
  "Locate the info for an organ & centre from organ-centres"
  [organ-centres organ centre]
  (first (get (group-by (comp keyword :key) (organ organ-centres)) centre)))

(defn get-centre-info*
  "Locate the info for an organ & centre from organ-centres"
  [organ-centres organ centre]
  (first (get (group-by :key ((keyword organ) organ-centres)) (name centre))))

(defn path-names
  "Given reitit path-params, return the organ/centre/tool path keys"
  [path-params]
  ((juxt :organ :centre :tool) path-params))

(defn path-keys
  "Given reitit path-params, return the organ/centre/tool path keys"
  [path-params]
  (->> path-params
       (path-names)
       (map keyword)))

(comment
  (path-keys {:organ "k" :centre "c" :tool "t"})
  ;=> (:k :c :t)
  )


(defn make-sheet-key
  "Reconsruct a sheet key from a tool key and the sheet type suffix
   e.g. :waiting '-inputs' -> :waiting-inputs"
  [tool suffix]
  (keyword (str (name tool) suffix)))

(defn day->year
  "Convert a day count to the nearest whole year"
  [d]
  (js/Math.round (/ d 365.25)))

(defn year->day
  "Convert a year count to the nearest whole day"
  [y]
  (js/Math.round (* y 365.25)))

(def transpose
  "transpose  matrix"
  (partial apply map vector))

(defn baseline-cif-outcome-keys
  "extract the outcome-keys used in a raw baseline-cifs table, eliminating the cif- prefix"
  [baseline-cifs]
  (->> baseline-cifs
       first
       keys
       (map name)
       (filter #(starts-with? % "cif"))
       ;(map #(subs % 4))
       (map keyword)))

