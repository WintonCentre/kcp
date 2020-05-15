(ns transplants.config
  (:require [aero.core :as aero]
            [clojure.java.io :as io]
            [transplants.utils :as utils]))

;--- EDN configuation

(defn read-config
  "read configuration file from the classpath using aero"
  [path profile]
  (aero/read-config (io/resource path) {:profile profile}))

(defn get-config
  "Read the configuration file, profiled by organ - either :lung or :kidney"
  [profile]
  (aero/read-config "data/config.edn" {:profile profile}))

(def memo-config 
  (if utils/MEMO (memoize get-config) get-config))


(defn get-sheet-spec
  "get sheet spec given sheet-key"
  [organ sheet-key]
  ;(println "sheet-key" sheet-key)
  (if-let [sheet (get-in (memo-config organ) [:sheets sheet-key])]
    sheet
    (throw (ex-info (str "Unable to read sheet " sheet-key)
                    {:cause "sheet name missing?"
                     :organ organ
                     :sheet sheet-key}))))

(comment
  (get-in (memo-config :lung) [:sheets nil])
  )

(defn get-bundle
  "Return the bundles of sheet-keys associated with a tool, or if no tool is given, returns a map of
   tool-key bundles"
  ([organ]
   (get-bundle organ nil))
  ([organ tool-key]
   (let [bs (get (memo-config organ) :bundles)]
     (if tool-key
       (into {} [(find bs tool-key)])
       bs #_(flatten (vals bs)))
     #_(get-in (memo-config organ) 
               [:bundles tool-key]))))

(comment
  (get-bundle :kidney)
  (get-bundle :kidney :waiting)
  )

(defn get-column-selection
  "Return a map of columns suitable for docjure select-columns. Column order may not be preserved in the map."
  [organ sheet-key]
  (into {} (map (fn [[k {:keys [column]}]] [column k]) (get-sheet-spec organ sheet-key))))

(defn get-columns
  "Return a seq of configured columns in spreadsheet order"
  [organ sheet-key]
  (->> (get-sheet-spec organ sheet-key)
       (into [])
       (sort-by (comp :column second))
       (map first)))

(def get-variable-keys
  "Treating the spreadsheet as a data frame, return a list of keys identifying the variables in the header row"
  get-columns)

