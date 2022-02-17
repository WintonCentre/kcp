(ns transplants.utils
  (:require [clojure.string :as string]
            ;[shadow.debug :refer [?->]]
            ))

(defn filled-in?
  "Does a field contain something?"
  [field]
  (and (some? field) (not (string/blank? field))))

(defn get-centre-info
  "Locate the info for an organ & centre from organ-centres"
  [organ-centres organ centre]
  ;(?-> centre ::centre)
  (first (get (group-by (comp keyword :key) (organ organ-centres)) centre)))

(defn get-centre-info*
  "Locate the info for an organ & centre from organ-centres"
  [organ-centres organ centre]
  (first (get (group-by :key ((keyword organ) organ-centres)) (name centre))))

(defn path-names
  "Given reitit path-params, return the organ/centre/tool path keys"
  [path-params]
  ((juxt :organ :centre :tool :tab) path-params))

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

(defn get-tools
  "Returns a vector of tool keywords for an organ, read from mdata (data from /metadata.edn).
  If mdata has not yet arrived, or organ is invalid, will return nil."
  [mdata organ]
  (get-in mdata [(keyword organ) :tool-order]))

(defn get-tool-meta
  "returns tool metadata for an organ. Returns nil if called before mdata is available (i.e. if it's nil)"
  [mdata organ tool]
  (get-in mdata [(keyword organ) :tools tool]))

(defn make-sheet-key
  "Reconsruct a sheet key from a tool key and the sheet type suffix
   e.g. :waiting '-inputs' -> :waiting-inputs"
  [tool suffix]
  (keyword (str (name tool) suffix)))

(def year 365.25)
(def quarter (/ year 4))
(def month (/ year 12))
(def week 7)

(defn day->week
  [d] (js/Math.ceil (/ d week)))
(defn day->month
  [d] (js/Math.ceil (/ d month)))
(defn day->quarter
  [d] (js/Math.ceil (/ d quarter)))


(defn day-in?
  "Given an x and an accessor function for day in x, discover whether the day is within given period of days"
  [get-day period]
  (fn [x] (<= (get-day x) period)))

(comment
  (day->week 0)
  ;; => 0
  (day->week 1)
  ;; => 1
  (day->week 7)
  ;; => 1
  (day->week 8)
  ;; => 2
  (day->week 364)
  ;; => 52
  (day->week 365)
  ;; => 53

  (day->month 0)
  ;; => 0
  (day->month 30.4375)
  ;; => 1
  (day->month 30.4376)
  ;; => 2
  (day->month 365)
  ;; => 12
  (day->month 366)
  ;; => 13

  (day->quarter 1)
  ;; => 1
  (day->quarter 91)
  ;; => 1
  (day->quarter 92)
  ;; => 2
  (day->quarter 365)
  ;; => 4
  (day->quarter 366)
  ;; => 5
  )


(defn week->day
  [w]
  (js/Math.round (* w week)))

(defn quarter->day
  [q]
  (js/Math.round (* q quarter)))

(comment
  (quarter->day 1)
  ;; => 91
  )

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


(defn baseline-outcome-names
  "extract the outcome-keys used in a raw baseline-cifs table, eliminating the cif- prefix"
  [baseline-cifs]
  (->> baseline-cifs
       first
       keys
       (map name)
       (remove #{"centre" "days"})
       ;(filter #(string/starts-with? % "cif"))
       (map #(subs % 4))
       ;(map keyword)
       ))

(defn baseline-cif-outcome-keys
  "extract the outcome-keys used in a raw baseline-cifs table, eliminating the cif- prefix"
  [baseline-cifs]
  (->> baseline-cifs
       (baseline-outcome-names)
       (map #(keyword (str "cif-" (name %))))
       ;(filter #(string/starts-with? % "cif"))
       ;(map #(subs % 4))
       ;(map keyword)
       ))

#_(defn baseline-cif-outcome-keys
    "extract the outcome-keys used in a raw baseline-cifs table, eliminating the cif- prefix"
    [baseline-cifs]
    (->> baseline-cifs
         first
         keys
         (map name)
         (filter #(string/starts-with? % "cif"))
       ;(map #(subs % 4))
         (map keyword)))

