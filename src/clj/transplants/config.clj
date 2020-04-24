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
  (if-let [sheet (get-in (memo-config organ) [:sheets sheet-key])]
    sheet
    (throw (ex-info "Unable to read sheet"
                    {:cause "sheet name missing?"
                     :organ organ
                     :sheet sheet-key}))))

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
