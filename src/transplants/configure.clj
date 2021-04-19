(ns transplants.configure
  "Spreadsheet reader, checker, and csv or edn export according to config.edn configuration.
 There are 2 sources of data for the transplants apps
 1) The app configuration file `config.edn` which specifies the format of the spreadsheet
 2) The workbook containing the model for that organ

 Clearly, the spreadsheet format must agree with that in the app configuration file. We provided a large number of
 tests to check this, but these can be extended at will. 
 
 The configuration edn readers are in a separate workspace (alias cfg) to those that read the spreadsheet."

  (:require
   [aero.core :as aero]
   [dk.ative.docjure.spreadsheet :as xls]
   [clojure.java.io :as io]
   [clojure.string :as string]
   [clojure.stacktrace :as stack]
   [clojure.core.memoize :as memo]
   [clojure.set :as st]
   [transplants.config-utils :as utils]
   [transplants.transforms :as xf]
   [transplants.shared :refer [underscore]])
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
  (->> (get-row-maps organ :waiting-baseline-cifs)
       (map :centre)
       (distinct)
       (remove nil?)
       (remove #(= ":centre" %))
       (sort)))


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

(defn- select-columns
  "Return selected columns of a spreadsheet"
  [organ sheet-key & columns]
  (->> (get-row-maps organ sheet-key)
       (map (apply juxt columns))
       (map #(map utils/maybe-key %))))

(defn centre-row-maps
  "Return row-maps, filtered by centre. If centre is nil, return all"
  [organ sheet-key centre]
  (let [row-maps (->> (get-row-maps organ sheet-key)
                      (map (fn [ms]
                             (into {} (map
                                       (fn [[k v]] [k (xf/unstring-key v)])
                                       ms)))))
        header-map (first row-maps)
        header-set (into #{} (keys header-map))
        f #(if (contains? header-set :centre)
             (or (nil? centre) (= (:centre %) centre))
             true)]
    (cons header-map (filter f (rest row-maps)))))

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
         (if  centre
           (str slash (underscore centre)) "")
         (if tool-key (str slash (underscore (name tool-key))) "")
         (if (or centre tool-key) (str "." suffix) (str "/all." suffix)))))

(defn bundle-path
  "Generates an export pathname for a tool. 
   Rename to 'tool-path'?"
  [organ centre tool-key]
  (-bundle-path "edn" organ centre tool-key))

(comment
  (bundle-path :lung "Birmingham" :waiting)
  ;; => "resources/public/lung/edn/Birmingham/waiting.txt"
  )

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

(defn write-edn-bundle
  "Write out a bundle containing sufficient data for one tool. If centre is not given, then enough for all centres."
  ([organ]
   (write-edn-bundle organ nil nil))

  ([organ centre]
   (write-edn-bundle organ centre nil))

  ([organ centre tool-key]

   (let [f (io/file (bundle-path organ centre tool-key))]
     (io/make-parents f)
     (spit f (collect-mapped-tool-bundle organ centre tool-key)))))


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
  (doseq [organ [:lung :kidney]
          sheet [:tools :centres]]
    
    (write-sheet organ sheet))

  (doseq [organ [:lung :kidney]
          :let [centres (get-centres organ)]
          centre centres]

    (write-edn-bundle organ centre)
    (doseq [tool-key (keys (get-bundle organ))]
      ;(println ::organ organ :centre centre :tool-key tool-key)
      
      (write-edn-bundle organ 
                        (if (contains? #{:ldgraft :ldsurvival} tool-key) "UK" centre) 
                        tool-key))))

(comment
  (get-centres :kidney)
  (write-edn-bundle :kidney "UK" :ldgraft)
  )

;-------- MAIN -----------
(defn main
  "Main entry point. This function reads config.edn and the spreadsheets and writes out edn files.
When processing a new version of the xlsx spreadsheets, run `lein check` first to validate them."
  [& args]
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
  ) ; Run this
  
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
  ; [{:baseline-factor ":baseline-factor", :baseline-level ":baseline-level"} {:baseline-factor ":age", :baseline-level ":50+"} {:baseline-factor ":sex", :baseline-level ":male"} {:baseline-factor ":ethincity", :baseline-level ":white"} {:baseline-factor ":dialysis", :baseline-level ":yes"} {:baseline-factor ":diabetes", :baseline-level ":no"} {:baseline-factor ":sensitised", :baseline-level ":no"} {:baseline-factor ":blood-group", :baseline-level ":O"} {:baseline-factor ":matchability", :baseline-level ":easy"} {:baseline-factor ":graft", :baseline-level ":first-graft"}]
  
  (get-row-maps :kidney :waiting-inputs)
  ; [{:beta-transplant ":beta-transplant", :beta-death ":beta-death", :info-box? ":info-box?", :beta-removal ":beta-removal", :beta-all-reasons ":beta-all-reasons", :type ":type", :sub-text ":sub-text", :level ":level", :button-labels ":button-labels", :factor ":factor", :label ":label"} {:beta-transplant nil, :beta-death nil, :info-box? nil, :beta-removal nil, :beta-all-reasons nil, :type ":dropdown", :sub-text nil, :level "[:centre-keys]", :button-labels "[:centre-labels]", :factor ":centre", :label "Transplant Centre"} {:beta-transplant nil, :beta-death nil, :info-box? nil, :beta-removal nil, :beta-all-reasons nil, :type nil, :sub-text nil, :level nil, :button-labels nil, :factor nil, :label nil} {:beta-transplant 0.0, :beta-death 0.0, :info-box? "Male", :beta-removal 0.0, :beta-all-reasons 0.0, :type ":radio", :sub-text "Sex", :level ":male", :button-labels "Male", :factor ":sex", :label "Sex"} {:beta-transplant -0.06289, :beta-death -0.10852, :info-box? "Female", :beta-removal 0.01097, :beta-all-reasons -0.10876, :type nil, :sub-text nil, :level ":female", :button-labels "Female", :factor ":sex", :label nil} {:beta-transplant nil, :beta-death nil, :info-box? nil, :beta-removal nil, :beta-all-reasons nil, :type nil, :sub-text nil, :level nil, :button-labels nil, :factor nil, :label nil} {:beta-transplant 0.60387, :beta-death -1.43819, :info-box? nil, :beta-removal -0.99622, :beta-all-reasons 0.3303, :type ":dropdown", :sub-text "Age (years)", :level ":18+", :button-labels "18 - 29 ", :factor ":age", :label "Age (years)"} {:beta-transplant 0.46442, :beta-death -1.04978, :info-box? nil, :beta-removal -0.75824, :beta-all-reasons 0.22041, :type nil, :sub-text nil, :level ":30+", :button-labels "30 - 39", :factor ":age", :label nil} {:beta-transplant 0.26097, :beta-death -0.57859, :info-box? nil, :beta-removal -0.43028, :beta-all-reasons 0.09241, :type nil, :sub-text nil, :level ":40+", :button-labels "40 - 49", :factor ":age", :label nil} {:beta-transplant 0.0, :beta-death 0.0, :info-box? nil, :beta-removal 0.0, :beta-all-reasons 0.0, :type nil, :sub-text nil, :level ":50+", :button-labels "50 - 59", :factor ":age", :label nil} {:beta-transplant -0.28334, :beta-death 0.09774, :info-box? nil, :beta-removal 0.66553, :beta-all-reasons -0.03388, :type nil, :sub-text nil, :level ":60+", :button-labels "60 - 69", :factor ":age", :label nil} {:beta-transplant -0.77722, :beta-death 0.13967, :info-box? nil, :beta-removal 1.56677, :beta-all-reasons 0.11484, :type nil, :sub-text nil, :level ":70+", :button-labels "70 +", :factor ":age", :label nil} {:beta-transplant nil, :beta-death nil, :info-box? nil, :beta-removal nil, :beta-all-reasons nil, :type nil, :sub-text nil, :level nil, :button-labels nil, :factor nil, :label nil} {:beta-transplant 0.0, :beta-death 0.0, :info-box? ":yes", :beta-removal 0.0, :beta-all-reasons 0.0, :type ":radio", :sub-text nil, :level ":white", :button-labels "White", :factor ":ethnicity", :label "Ethnicity"} {:beta-transplant -0.01539, :beta-death -0.26636, :info-box? nil, :beta-removal -0.13979, :beta-all-reasons -0.09953, :type nil, :sub-text nil, :level ":non-white", :button-labels "Non-white", :factor ":ethnicity", :label nil} {:beta-transplant nil, :beta-death nil, :info-box? nil, :beta-removal nil, :beta-all-reasons nil, :type nil, :sub-text nil, :level nil, :button-labels nil, :factor nil, :label nil} {:beta-transplant 0.0, :beta-death 0.0, :info-box? nil, :beta-removal 0.0, :beta-all-reasons 0.0, :type ":radio", :sub-text nil, :level ":O", :button-labels "O", :factor ":blood-group", :label "Blood group"} {:beta-transplant 0.54305, :beta-death -0.19369, :info-box? nil, :beta-removal -0.19443, :beta-all-reasons 0.57296, :type nil, :sub-text nil, :level ":A", :button-labels "A", :factor ":blood-group", :label nil} {:beta-transplant 0.00727, :beta-death 0.03454, :info-box? nil, :beta-removal -0.03596, :beta-all-reasons 0.00578, :type nil, :sub-text nil, :level ":B", :button-labels "B", :factor ":blood-group", :label nil} {:beta-transplant 0.54305, :beta-death -0.19369, :info-box? nil, :beta-removal -0.19443, :beta-all-reasons 0.57296, :type nil, :sub-text nil, :level ":AB", :button-labels "AB", :factor ":blood-group", :label nil} {:beta-transplant nil, :beta-death nil, :info-box? nil, :beta-removal nil, :beta-all-reasons nil, :type nil, :sub-text nil, :level nil, :button-labels nil, :factor nil, :label nil} {:beta-transplant 0.0, :beta-death 0.0, :info-box? ":yes", :beta-removal 0.0, :beta-all-reasons 0.0, :type ":dropdown", :sub-text "match score 1-3", :level ":easy", :button-labels "easy", :factor ":matchability", :label "Matchability group"} {:beta-transplant -0.28893, :beta-death 0.09036, :info-box? nil, :beta-removal 0.09631, :beta-all-reasons -0.29547, :type nil, :sub-text "match score 4-6", :level ":moderate", :button-labels "moderate", :factor ":matchability", :label nil} {:beta-transplant -0.61033, :beta-death 0.14314, :info-box? nil, :beta-removal 0.2109, :beta-all-reasons -0.62205, :type nil, :sub-text "match score 7-10", :level ":difficult", :button-labels "difficult", :factor ":matchability", :label nil} {:beta-transplant nil, :beta-death nil, :info-box? nil, :beta-removal nil, :beta-all-reasons nil, :type nil, :sub-text nil, :level nil, :button-labels nil, :factor nil, :label nil} {:beta-transplant 0.0, :beta-death 0.0, :info-box? nil, :beta-removal 0.0, :beta-all-reasons 0.0, :type ":radio", :sub-text "No previous graft", :level ":first", :button-labels "first", :factor ":graft", :label "Graft number"} {:beta-transplant -0.35381, :beta-death 0.46463, :info-box? nil, :beta-removal -0.10169, :beta-all-reasons -0.32497, :type nil, :sub-text "Replacing previous graft", :level ":re-graft", :button-labels "re-graft", :factor ":graft", :label nil} {:beta-transplant nil, :beta-death nil, :info-box? nil, :beta-removal nil, :beta-all-reasons nil, :type nil, :sub-text nil, :level nil, :button-labels nil, :factor nil, :label nil} {:beta-transplant 0.0, :beta-death 0.0, :info-box? nil, :beta-removal 0.0, :beta-all-reasons 0.0, :type ":radio", :sub-text nil, :level ":yes", :button-labels "Yes", :factor ":dialysis", :label "Dialysis at registration?"} {:beta-transplant 0.29132, :beta-death -0.50041, :info-box? nil, :beta-removal -0.31226, :beta-all-reasons 0.11702, :type nil, :sub-text nil, :level ":no", :button-labels "No", :factor ":dialysis", :label nil} {:beta-transplant nil, :beta-death nil, :info-box? nil, :beta-removal nil, :beta-all-reasons nil, :type nil, :sub-text nil, :level nil, :button-labels nil, :factor nil, :label nil} {:beta-transplant 0.0, :beta-death 0.0, :info-box? nil, :beta-removal 0.0, :beta-all-reasons 0.0, :type ":radio", :sub-text "cRF less than 85%", :level ":no", :button-labels "No", :factor ":sensitised", :label "Highly sensitised?"} {:beta-transplant -0.74768, :beta-death 0.33496, :info-box? nil, :beta-removal 0.32677, :beta-all-reasons -0.56793, :type nil, :sub-text "cRF 85% or more", :level ":yes", :button-labels "Yes", :factor ":sensitised", :label nil} {:beta-transplant nil, :beta-death nil, :info-box? nil, :beta-removal nil, :beta-all-reasons nil, :type nil, :sub-text nil, :level nil, :button-labels nil, :factor nil, :label nil} {:beta-transplant 0.0, :beta-death 0.86605, :info-box? nil, :beta-removal 0.18723, :beta-all-reasons 0.0, :type ":radio", :sub-text nil, :level ":no", :button-labels "No", :factor ":diabetes", :label "Primary renal disease - diabetes?"} {:beta-transplant -0.32635, :beta-death 0.0, :info-box? nil, :beta-removal 0.0, :beta-all-reasons 0.05058, :type nil, :sub-text "?", :level ":yes", :button-labels "Yes", :factor ":diabetes", :label nil} nil nil nil nil nil] 
  
  (get-col-maps :kidney :waiting-baseline-vars)
  (get-col-maps :kidney :waiting-inputs)
  (get-col-maps :kidney :waiting-inputs true)
  (get-col-maps :lung :waiting-inputs true)

  (remove nil? (:name (get-col-maps :kidney :centres)))

  (rest (get-row-maps :kidney :survival-baseline-cifs))
  (centre-row-maps :kidney :survival-baseline-cifs  "Belfast")
  (centre-columns :kidney :survival-baseline-cifs  "Belfast")
  (centre-columns :kidney :survival-baseline-cifs  "Guy's")
  (centre-columns :kidney :waiting-baseline-cifs "Belfast")
  (get-bundle :kidney :waiting)
  (centre-row-maps :kidney :ldsurvival-baseline-cifs  "UK")
  
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
  