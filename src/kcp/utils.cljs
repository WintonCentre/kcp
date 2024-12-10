(ns kcp.utils
  (:require [clojure.string :as str]
            ))

(defn merge-vectors [vec1 vec2]
  (mapv (fn [[k v1] [_ v2]]
          [k (concat v1 v2)])
        vec1 vec2))

(defn filter-by-timestamps
  [timestamps data]
  (filter #(contains? timestamps (first %)) data))

(defn filter-parallel-data [data query]
  "Requires all query parameters to match for a row to be returned. E.g.
  query { 'Age' 25, 'sex' 'M' } requires both 25 and male. Assumes data is a collection of parallel arrays, like:
  { 'Age' [25, 26, ...], 'SomeParameter' [v1, v2, ...] }"
  (if (or (nil? data) (nil? query))
    {}
    (let [keys (keys data)
          n (count (get data (first keys)))
          indices (filter
                    (fn [idx]
                      (every? (fn [[k v]]
                                (= v (nth (get data k) idx)))
                              query))
                    (range n))]
      (into {}
            (map (fn [k]
                   (let [filtered-values (mapv #(nth (get data k) %) indices)]
                     [k filtered-values]))
                 keys)))))

(defn reformat-mortality-data [dict]
  (vec (for [year (range 11)]
         [(* 12 year) (get dict (str "Year" year) [0])])))

(defn calculate-overall-risk [values]
  (- 1 (reduce * (map (fn [v] (- 1 v)) values))))

(defn re-weight-values [overall-risk values]
  (let [sum (reduce + values)]
    (mapv #(* overall-risk (/ % sum)) values)))

(defn normalize-vectors [vectors]
  "Given a vector of [timestamp [risk1, risk2, ...]] returns re-weighted vectors"
  (mapv (fn [[timestamp values]]
          (let [overall-risk (calculate-overall-risk values)]
            ; avoid divide by 0
            (if (zero? overall-risk)
              [timestamp values]
              [timestamp (re-weight-values overall-risk values)])))
        vectors))

(defn to-iso-date-str
  "E.g. 2024-08-28, works with date picker"
  [date]
  (-> (.getTime date)
      (- (* (.getTimezoneOffset date) 60000))
      (js/Date.)
      (.toISOString)
      (.split "T")
      (first)))

(defn reorder-map [initial reference]
  "Given an `initial` map, recreate it according to the key order of the `reference` map"
  (into (array-map)
        (for [k (keys reference)]
          [k (get initial k)])))

(defn to-locale-date-str [date]
  (if (nil? date)
    ""
    (let [options (clj->js {:day "numeric" :month "long" :year "numeric"})
          formatted-date (.toLocaleDateString (js/Date. date) "en-GB" options)]
      formatted-date)))

(defn filled-in?
  "Does a field contain something?"
  [field]
  (and (some? field) (not (str/blank? field))))

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

(def year 12)
(def quarter (/ year 4))
(def month 1)
(def week (/ 12 (/ 365.25 7)))

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

;;
;; days are now really months !!!
;;

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
  (js/Math.round (/ d 12)))

(defn year->day
  "Convert a year count to the nearest whole day"
  [y]
  (js/Math.round (* y 12)))

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
       (map #(subs % 4))
       ))

(defn baseline-cif-outcome-keys
  "extract the outcome-keys used in a raw baseline-cifs table, eliminating the cif- prefix"
  [baseline-cifs]
  (->> baseline-cifs
       (baseline-outcome-names)
       (map #(keyword (str "cif-" (name %))))
       ))

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
    (str/join [(keys enc1) (keys enc2) (keys enc3) (keys enc4)])))


(defn encode-rgb [r g b]
  (str/join [(encode-triplet 0 r g) (encode-triplet b 255 255)]))

(defn generate-pixel [encoded-color]
  (str/join ["data:image/gif;base64,R0lGODlhAQABAPAA" encoded-color "/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="]))

(defn fill-data-url [r g b]
  (generate-pixel (encode-rgb r g b)))

(comment
  (fill-data-url 255 128 50)
  )


(defn localize-plural
  "Returns the localized string for pluralization.
  Takes as arguments the count, a map of plural forms (or just a string), and optional substitutions."
  [count plural-forms & substitutions]
  (if (nil? plural-forms)
    ""
    (let [form (if (string? plural-forms)
                 plural-forms
                 (cond
                   (and (nil? count) (:0 plural-forms)) (:nil plural-forms)
                   (and (= count 0) (:0 plural-forms)) (:0 plural-forms)
                   (and (= count 1) (:1 plural-forms)) (:1 plural-forms)
                   :else (:n plural-forms)))
          form-with-count (if (nil? count) form (str/replace form #"\$1" (str count)))
          offset (if (nil? count) 1 2)]
      (reduce (fn [acc [idx placeholder]]
                (str/replace acc (re-pattern (str "\\$" (+ offset idx))) placeholder))
              form-with-count
              (map-indexed vector substitutions)))))

(defn string-split
  "Splits the input string by newline characters. Returns a vector of substrings."
  [maybe-string]
  (if (string? maybe-string)
    (str/split maybe-string #"\n")
    []))