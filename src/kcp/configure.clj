(ns kcp.configure
  "Spreadsheet reader, checker, and csv or edn export according to config.edn configuration.
 There are 2 sources of data for the kcp apps
 1) The app configuration file `config.edn` which specifies the format of the spreadsheet
 2) The workbook containing the model for that organ

 Clearly, the spreadsheet format must agree with that in the app configuration file. We provided a large number of
 tests to check this, but these can be extended at will. 
 
 The configuration edn readers are in a separate workspace (alias cfg) to those that read the spreadsheet."

  (:require
    [aero.core :as aero]
    [dk.ative.docjure.spreadsheet :as xls]                  ;; This dependency prevents us from using babashka
    [clojure.java.io :as io]
    [clojure.string :as string]
    [clojure.stacktrace :as stack]
    [clojure.core.memoize :as memo]
    [clojure.set :as st]
    [kcp.config-utils :as utils]
    [kcp.transforms :as xf]
    [kcp.shared :refer [underscore]])
  (:gen-class))

(def slash "OS independent file path separator" java.io.File/separator)

;--- EDN configuation

(defn read-config
  "read configuration file from the classpath using aero.
   Folder 'resource' is the usual place for data that is on the classpath"
  [path profile]
  (aero/read-config (io/resource path) {:profile profile}))

;**
(defn get-config
  "Read the configuration file, profiled by organ - either :lung or :kidney"
  [profile]
  (read-config "config.edn" profile))

;**
(def memo-config
  "A function that memoizes a call to get-config.
  Things run faster when utils/MEMO is true. 
  Debugging can be easier when it's false."
  (if utils/MEMO (memo/ttl get-config {} :ttl/threshold 1000) get-config))

;**
(defn get-bundle
  "Return the bundles of sheet-keys associated with a tool, or if no tool is given, returns a map of
   tool-key bundles"
  ([organ]
   (get-bundle organ nil))
  ([organ tool-key]
   (let [bs (get (memo-config organ) :bundles)]
     (if tool-key
       (into {} [(find bs tool-key)])
       bs))))



(defn get-workbook
  "Read in xlsx workbook for an organ"
  [organ]
  (with-open [input (io/input-stream (io/resource (:workbook (memo-config organ))))]
    (xls/load-workbook input)))

(def memo-workbook
  "memoize get-workbook because it reads in a load of data"
  ;(if utils/MEMO (memoize get-workbook) get-workbook)
  (if utils/MEMO (memo/ttl get-workbook {} :ttl/threshold 1000) get-workbook))

(defn get-column-keys
  "Read the first row of a spreadsheet"
  [organ sheet]
  (println "sheet: " sheet)
  (->> (memo-workbook organ)
       (xls/select-sheet (name sheet))
       (xls/row-seq)
       (first)
       (xls/cell-seq)
       (map xls/read-cell)
       (remove nil?)
       (map #(keyword (subs % 1)))))

(def column-keys
  "A seq of :A to :Z keywords"
  (map (comp keyword str char) (range (int \A) (+ (int \A) 26))))

(defn get-column-selection
  "A map of column keys to column headers"
  [organ sheet]
  (zipmap column-keys (get-column-keys organ sheet)))

(defn get-row-maps
  "Get maps of rows of a spreadsheet where each key is one of the specified data columns. 
  The result is the 'vector of maps' representation of a data frame.
  Empty rows are not removed to preserve indexes. 
  However it is often better to filter the result on some variable value"
  [organ sheet-key]
  (->> (memo-workbook organ)
       (xls/select-sheet (name sheet-key))
       (xls/select-columns (get-column-selection organ sheet-key))))

(defn get-centres
  "Retrieve a list of distinct centres from a spreadsheet"
  [organ]
  ["UK"])

(get-centres :kidney)


(defn get-col-maps
  "gets a map of columns"
  [organ sheet-key & [exclude-nil-rows]]
  (->> (get-row-maps organ sheet-key)
       (map (apply juxt (vals (get-column-selection organ sheet-key))))
       ((fn [r] (if exclude-nil-rows (remove #(every? nil? %) r) r)))
       (utils/transpose)
       (map (fn [v] [(utils/maybe-key (first v)) (map utils/maybe-key (rest v))]))
       (into {})))

(defn get-tools
  "get a list of tools attached to sheets. Used by configuration tests"
  [organ]
  (st/intersection
    (into #{} (:key (get-col-maps organ :tools)))
    (into #{} (keys (get-bundle organ)))))

(comment
  (def organ "test fixture" :lung)
  (get-col-maps organ :lung)
  (get-tools :lung)
  (keys (get-bundle :lung))
  (get-tools :kidney)
  (st/intersection #{:tools :post-transplant :centres :waiting} #{:post-transplant :guidance :waiting}))

(defn centre-row-maps
  "Return row-maps, filtered by centre. If centre is nil, return all"
  [organ sheet-key centre]
  (let [;centre (string/trim centre)
        row-maps (->> (get-row-maps organ sheet-key)
                      (map (fn [ms]
                             (into {} (map
                                        (fn [[k v]] [k (xf/unstring-key v)])
                                        ms)))))
        header-map (first row-maps)
        header-set (into #{} (keys header-map))
        f #(do (tap> %)
               (if (contains? header-set :centre)
                 (or (nil? centre) (= (:centre %) centre))
                 true))]
    (cons header-map (filter f (rest row-maps)))))

(comment
  (count (xf/unstring-key "Bristol "))
  (count (xf/unstring-key "St George's"))
  (centre-row-maps :kidney :survival-baseline-cifs (xf/unstring-key "Bristol "))
  (centre-row-maps :kidney :survival-baseline-cifs (xf/unstring-key "St. George's"))
  (centre-row-maps :kidney :waiting-baseline-cifs (xf/unstring-key "St George's"))
  0)

(defn centre-columns
  "Convert from row-map form to column variable form"
  [organ sheet-key centre]
  (let [rows (centre-row-maps organ sheet-key centre)
        headers (keys (first rows))]
    (utils/transpose (map (apply juxt headers) rows))))

(defn sheet-type
  "Return a string that indicates the type of a sheet. This is the common suffix given to all sheet names where the sheet has the same type.
   For example, :waiting-inputs :survival-inputs, :graft-inputs are all examples of the '-inputs' type. 
   We use filter laziness to stop testing once we have a match"
  [sheet-key]
  (let [matches? (fn [suffix]
                   (string/ends-with? (name sheet-key) suffix))
        types '("centres" "tools" "-inputs" "-baseline-cifs" "-baseline-vars" "bmi-calculator")]
    (first (filter matches? types))))


(defn- -bundle-path
  "Builds a resource path -- see comment below source"
  [suffix organ centre tool-key]
  (let [suf (name suffix)
        ; In case the server barfs at serving .edn, make them .txt instead
        suffix (if (= suf "edn") "txt" suf)]
    (str (get-in (memo-config organ) [:export (keyword (str suf "-path"))])
         (if centre
           (str slash (underscore centre)) "")
         (if tool-key (str slash (underscore (name tool-key))) "")
         (if (or centre tool-key) (str "." suffix) (str "/all." suffix)))))

(defn bundle-path
  "Generates an export pathname for a tool. 
   Rename to 'tool-path'?"
  [organ centre tool-key]
  (-bundle-path "edn" organ centre tool-key))

(comment
  (bundle-path :kidney "UK" :ldsurvival)

  (bundle-path :kidney "Bristol" :survival))

(defn headed-vectors-to-map
  "Given a sequence of vectors where the first element of each is a header, convert this to a map keyed by those headers"
  [hvs]
  (into {} (map (fn [[h & vs]] [(if (and (string? h) (string/starts-with? h ":"))
                                  (keyword (subs h 1))
                                  h)
                                vs]) hvs)))

(defn collect-mapped-tool-bundle
  "Reads the bundle configured for a given TRAC tool-key. 
   (for :lung these are :waiting, :post-transplant, :from-listing, 
   for :kidney they are :waiting, :survival, and :graft).
   
   For each speadsheet referenced in the bundle, determine the sheet type (given by its suffix) and 
   hence whether it should be returned in a row or column order map.
   
   Either way the returned format is a map of [sheet-key sheet-content] pairs"
  [organ centre tool-key]
  (->> (for [sheet-key (first (vals (get-bundle organ tool-key)))]
         (if (#{"-baseline-vars" "-baseline-cifs"} (sheet-type sheet-key))
           [sheet-key (drop 1 (centre-row-maps organ sheet-key centre))]
           [sheet-key (headed-vectors-to-map (centre-columns organ sheet-key centre))]))
       (into {})))

(comment
  (centre-row-maps :kidney "ldsurvival-baseline-cifs" :UK)

  (collect-mapped-tool-bundle :kidney :UK :ldsurvival)

  (collect-mapped-tool-bundle :kidney nil nil)
  )

(defn write-edn-bundle
  "Write out a bundle containing sufficient data for one tool. If centre is not given, then enough for all centres.
   To create the PWA cache, we'll also append a log with the list of files"
  ([organ]
   (write-edn-bundle organ nil nil))

  ([organ centre]
   (write-edn-bundle organ centre nil))

  ([organ centre tool-key]

   (let [path (bundle-path organ centre tool-key)
         file (io/file path)]
     (io/make-parents file)
     (spit file (collect-mapped-tool-bundle organ centre tool-key)))))

(comment
  (bundle-path :kidney "UK" :ldsurvival)
  )

(defn write-sheet
  "writes a generic sheet out in edn format. Used for tools and centres"
  [organ key]
  (let [sheet (get-col-maps organ key)
        sheet-path (str (get-in (memo-config organ) [:export :edn-path])
                        slash (str (name key)) ".txt")]
    (io/make-parents sheet-path)
    (spit sheet-path sheet)))

(defn export-all-edn-bundles
  "Exports the set of EDN files needed by the app that are derived from the spreadsheets configured in config.edn"
  []

  (doseq [organ [:kidney]                                   ;[:lung :kidney]
          sheet [:tools :centres]]

    (write-sheet organ sheet)

    (let [centres (get-centres organ)]
      (doseq [centre centres]

        (write-edn-bundle organ centre)
        (doseq [tool-key (keys (get-bundle organ))]

          (write-edn-bundle organ
                            ;; todo - this isn't a generalised test for the special case handling for all-centre models
                            (if (contains? #{:ldsurvival} tool-key) "UK" centre)
                            tool-key))))))




(comment
  (get-centres :kidney)
  0)


;-------- MAIN -----------
(defn main
  "Main entry point. This function reads config.edn and the spreadsheets and writes out edn files.
When processing a new version of the xlsx spreadsheets, run `lein check` first to validate them."
  [& _args]
  (try
    (export-all-edn-bundles)
    (catch Exception e
      (println (str ">>-configuration error - see stack trace:" (.getMessage e) " -<<"))
      (stack/print-stack-trace e)
      #_(System/exit 1))))

;----------------------------------------------
;
(comment
  (main)

  )                                                         ; Run this

(comment


  (get-bundle :kidney)
  (get-bundle :lung)
  (get-bundle :kidney :waiting)
  (get-bundle :kidney :survival)
  (get-bundle :kidney :ldsurvival)
  (get-bundle :lung :waiting)

  ;
  (-> (centre-columns :lung :waiting-baseline-cifs "Papworth") first first)
  (drop 1 (centre-row-maps :kidney :waiting-baseline-vars "Oxford"))
  (centre-columns :lung :waiting-baseline-cifs nil)
  (get-bundle :lung :waiting)
  (flatten (vals (get-bundle :lung nil)))
  ;
  (bundle-path :lung nil nil)
  (bundle-path :lung "Papworth" nil)
  (bundle-path :lung "Papworth" :waiting)
  ;
  (collect-mapped-tool-bundle :lung "Birmingham" :waiting)
  (:survival-baseline-cifs (collect-mapped-tool-bundle :kidney "Belfast" :survival))
  (collect-mapped-tool-bundle :kidney "St George's" :survival)
  (collect-mapped-tool-bundle :kidney "Guy's" :survival)
  (:waiting-baseline-vars (collect-mapped-tool-bundle :kidney "Oxford" :waiting))
  (string/starts-with? ":centre" ":")
  (keyword (subs ":centre" 1))
  (get-in (memo-config :lung) [:export :edn-path])
  (collect-mapped-tool-bundle :lung "Birmingham" :waiting)
  ;
  (get-centres :lung)
  (get-centres :kidney)
  (bundle-path :lung "Birmingham" nil)
  (bundle-path :kidney "Guy's" nil)
  (bundle-path nil nil nil)
  (collect-mapped-tool-bundle :kidney "Belfast" :survival)
  ;
  )

(comment


  (get-config :kidney)
  (memo-config :kidney)
  (get-config :lung)

  ;; configured loading test
  (get-workbook :kidney)
  (get-workbook :lung)
  (memo-workbook :kidney)

  (get-row-maps :kidney :waiting-baseline-cifs)
  (get-row-maps :kidney :waiting-baseline-vars)

  (get-centres :lung)
  (get-centres :kidney)

  (get-row-maps :lung :waiting-baseline-vars)
  (get-row-maps :kidney :waiting-baseline-vars)

  (get-row-maps :kidney :waiting-inputs)

  (get-col-maps :kidney :waiting-baseline-vars)
  (get-col-maps :kidney :waiting-inputs)
  (get-col-maps :kidney :waiting-inputs true)
  (get-col-maps :lung :waiting-inputs true)

  (remove nil? (:name (get-col-maps :kidney :centres)))

  (rest (get-row-maps :kidney :survival-baseline-cifs))
  (centre-row-maps :kidney :survival-baseline-cifs "Belfast")
  (centre-columns :kidney :survival-baseline-cifs "Belfast")
  (centre-columns :kidney :survival-baseline-cifs "Guy's")
  (centre-columns :kidney :waiting-baseline-cifs "Belfast")
  (get-bundle :kidney :waiting)
  (centre-row-maps :kidney :ldsurvival-baseline-cifs "UK")

  (get-bundle :kidney :ldsurvival)
  (get-bundle :lung :waiting)

  ;
  (-> (centre-columns :lung :waiting-baseline-cifs "Papworth") first first)
  (drop 1 (centre-row-maps :kidney :waiting-baseline-vars "Oxford"))
  (centre-columns :lung :waiting-baseline-cifs nil)
  (get-bundle :lung :waiting)
  (flatten (vals (get-bundle :lung nil)))
  ;
  (bundle-path :lung nil nil)
  (bundle-path :lung "Papworth" nil)
  (bundle-path :lung "Papworth" :waiting)
  ;
  (collect-mapped-tool-bundle :lung "Birmingham" :waiting)
  (:survival-baseline-cifs (collect-mapped-tool-bundle :kidney "Belfast" :survival))
  (collect-mapped-tool-bundle :kidney "St George's" :survival)
  (collect-mapped-tool-bundle :kidney "Guy's" :survival)
  (:waiting-baseline-vars (collect-mapped-tool-bundle :kidney "Oxford" :waiting))
  (string/starts-with? ":centre" ":")
  (keyword (subs ":centre" 1))
  (get-in (memo-config :lung) [:export :edn-path])
  (collect-mapped-tool-bundle :lung "Birmingham" :waiting)
  ;
  (get-centres :lung)
  (get-centres :kidney)
  (bundle-path :lung "Birmingham" nil)
  (bundle-path :kidney "Guy's" nil)
  (bundle-path nil nil nil)
  (collect-mapped-tool-bundle :kidney "Belfast" :survival)
  (collect-mapped-tool-bundle :kidney "Bristol" :survival)

  (export-all-edn-bundles)

  (write-edn-bundle :lung "Papworth" :waiting)
  (write-edn-bundle :lung "Newcastle" :waiting)
  (write-edn-bundle :lung "Manchester" :waiting)
  (write-edn-bundle :lung "Birmingham")
  (write-edn-bundle :lung)

  (get-bundle :lung)
  (write-edn-bundle :kidney "Edinburgh" :waiting)
  (write-edn-bundle :kidney "Belfast" :graft)
  (write-edn-bundle :kidney "Birmingham" :graft)

  (get-row-maps :kidney :waiting-baseline-cifs)
  (get-column-keys :kidney :waiting-inputs)

  (get-config :kidney)
  (memo-config :kidney)
  (get-config :lung)

  ;; configured loading test
  (get-workbook :kidney)
  (get-workbook :lung)
  (memo-workbook :kidney)

  (get-row-maps :kidney :waiting-baseline-cifs)
  (get-row-maps :kidney :waiting-baseline-vars)

  (:beta-removal (get-col-maps :kidney :waiting-inputs))
  (get-row-maps :kidney :waiting-inputs)
  ;
  )
