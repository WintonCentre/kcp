(ns transplants.configure
  (:require 
   [aero.core :as aero]
   [dk.ative.docjure.spreadsheet :as xls]
   [clojure.java.io :as io]
   [clojure.string :as string]
   [clojure.data.csv :as csv]
   [transplants.utils :as utils]
   [transplants.config :as cfg]
   ))

(comment
  ;;;
  ;; following is a docjure example. Keep as a quick check on setup, but it's not used here as it 
  ;; does not respect the edn configuration file
  
  (defn read-table
    "Read in non-null rows of data from columns in a spreadsheet.
  'path' identifies the xlsx file.
  'sheet-title' is the name of the sheet to read.
  'columns' should be a map of XLSX column letters as keywords (:A, :B etc) to more meaningful keys.
  For example: {:A :centre, :B :days, :K :survival}

  Returns a collection of maps containing meaningful keys mapped to data.
  "
    [{:keys [path sheet columns header-rows]}]
    (->> (xls/load-workbook path)
         (xls/select-sheet (second sheet))
         (xls/select-columns columns)
         (drop header-rows))))

;;;
; spreadsheet configuration.
; There are 2 sources of data for the transplants apps
; 1) The configuration file `config.edn`
; 2) The workbook containing the model for that organ
;
; These 2 should agree on certain details - typically those highlighted in orange in the spreadsheet
; To avoid confusion we'll put config data readers in a separate workspace.
;;;

(defn get-workbook
  "Read in xlsx workbook for an organ"
  [organ]
  (xls/load-workbook (:workbook (cfg/memo-config organ))))

(def memo-workbook
  "memoize get-workbook because it reads in a load of data"
  (if utils/MEMO (memoize get-workbook) get-workbook))

(comment
  (cfg/get-sheet-spec :kidney :waiting-inputs)
  ; {:beta-transplant {:column :E, :match "transplant"}, :beta-death {:column :G, :match "death"}, :info-box? {:column :K, :match "info"}, :beta-removal {:column :F, :match "remov"}, :beta-all-reasons {:column :H, :match "all"}, :type {:column :I, :match "type"}, :sub-text {:column :J, :match "sub"}, :level {:column :D, :match "level"}, :button-labels {:column :B, :match "(level)|(button)"}, :factor {:column :C, :match "factor"}, :label {:column :A, :match "(Factor)|(label)"}}
  
  (cfg/get-columns :kidney :waiting-inputs)
  ; (:label :button-labels :factor :level :beta-transplant :beta-removal :beta-death :beta-all-reasons :type :sub-text :info-box?)
  
  (cfg/get-variable-keys :kidney :waiting-inputs)
  ; (:label :button-labels :factor :level :beta-transplant :beta-removal :beta-death :beta-all-reasons :type :sub-text :info-box?)
  
  (cfg/get-column-selection :kidney :waiting-inputs)
  ; {:I :type, :A :label, :F :beta-removal, :D :level, :B :button-labels, :J :sub-text, :C :factor, :E :beta-transplant, :G :beta-death, :H :beta-all-reasons, :K :info-box?}
  )

(defn get-row-maps
  "Get maps of rows of a spreadsheet where each key is one of the specified data columns. 
  The result is the 'vector of maps' representation of a data frame.
  Empty rows are not removed to preserve indexes. 
  However it is often better to filter the result on some variable value"
  [organ sheet-key]
  (->> (memo-workbook organ)
       (xls/select-sheet (name sheet-key))
       (xls/select-columns (cfg/get-column-selection organ sheet-key))))
(comment
  (get-row-maps :kidney :waiting-baseline-vars)
  ; [{:baseline-factor ":baseline-factor", :baseline-level ":baseline-level"} {:baseline-factor ":age", :baseline-level ":50+"} {:baseline-factor ":sex", :baseline-level ":male"} {:baseline-factor ":ethincity", :baseline-level ":white"} {:baseline-factor ":dialysis", :baseline-level ":yes"} {:baseline-factor ":diabetes", :baseline-level ":no"} {:baseline-factor ":sensitised", :baseline-level ":no"} {:baseline-factor ":blood-group", :baseline-level ":O"} {:baseline-factor ":matchability", :baseline-level ":easy"} {:baseline-factor ":graft", :baseline-level ":first-graft"}]
  
  (get-row-maps :kidney :waiting-inputs)
  )

(defn get-col-maps
  "gets a map of columns"
  [organ sheet-key]
    (let [workbook (memo-workbook organ)
          sheet (cfg/get-sheet-spec organ sheet-key)
          columns (cfg/get-column-selection organ sheet-key)]
      (->> (get-row-maps organ sheet-key)
           ;(xls/select-sheet (name sheet-key) workbook)
           ;(xls/select-columns columns)
           (map (apply juxt (vals (cfg/get-column-selection organ sheet-key))))
           (utils/transpose)
           (map (fn [v] [(utils/maybe-key (first v)) (map utils/maybe-key (rest v))]))
           (into {}))))

(def get-variables
  "Column maps are also known as variables in a data-frame"
  get-col-maps)

(comment
  (def row-maps (get-row-maps :kidney :waiting-baseline-vars))
  #_(def row-maps [{:baseline-factor ":baseline-factor", :baseline-level ":baseline-level"} {:baseline-factor ":age", :baseline-level ":50+"} {:baseline-factor ":sex", :baseline-level ":male"} {:baseline-factor ":ethincity", :baseline-level ":white"} {:baseline-factor ":dialysis", :baseline-level ":yes"} {:baseline-factor ":diabetes", :baseline-level ":no"} {:baseline-factor ":sensitised", :baseline-level ":no"} {:baseline-factor ":blood-group", :baseline-level ":O"} {:baseline-factor ":matchability", :baseline-level ":easy"} {:baseline-factor ":graft", :baseline-level ":first-graft"}])

  (get-col-maps :kidney :waiting-baseline-vars)

  
  (let [cols (utils/transpose (map  (juxt :baseline-factor :baseline-level) row-maps))]
    (into {} (map (fn [v] [(utils/maybe-key (first v)) (map utils/maybe-key (rest v))]) cols)))

  ; ([":baseline-factor" ":age" ":sex" ":ethincity" ":dialysis" ":diabetes" ":sensitised" ":blood-group" ":matchability" ":graft"] 
  ; [":baseline-level" ":50+" ":male" ":white" ":yes" ":no" ":no" ":O" ":easy" ":first-graft"])
  )


(defn select-columns
  "Return selected columns of a spreadsheet"
  [organ sheet-key & columns]
  (->> (get-row-maps organ sheet-key)
       (map (apply juxt columns))
       (map #(map utils/maybe-key %))))

;;;
;; Following does not always work since the rows matrix may not be rectangular
;;;
;; (defn get-column-data
;;   "retrieve a table as a map of vectors"
;;   ([organ sheet-key]
;;    (transpose
;;     (get-rows organ sheet-key)
;;     (get-header organ sheet-key))))

(defn get-table [] nil)

(defn sub-table
  "Extract a sub-table from the given columns, 
  selecting rows where the first column takes the given value"
  [organ sheet-key columns value]
  (->>
   (apply select-columns organ sheet-key columns)
   (filter #(= (first %) value))
   (map #(zipmap columns %))))

(defn get-header
  "retrieve header variables from the speadsheet in a seq. We assume they are in the 
  first non-nil row, and always stat with a :. Headers that do not start with ':' are ignored."
  [organ sheet-key]
  (let [workbook (memo-workbook organ)
        sheet (cfg/get-sheet-spec organ sheet-key)]
    (->> (xls/select-sheet (name sheet-key) workbook)
         (xls/row-seq)
         (remove nil?)
         (first)
         (xls/cell-seq)
         (map xls/read-cell)
         (take-while #(and (some? %) (string/starts-with? % ":")))
         (map #(subs % 1))
         (map keyword))))

(defn get-all-rows
  "retrieve a sequence of maps - one map per row of data, with variables as keys"
  ([organ sheet-key]
   (let [workbook (memo-workbook organ)
         sheet (cfg/get-sheet-spec organ sheet-key)
         headers (get-header organ sheet-key)]
     (->> (xls/select-sheet (name sheet-key) workbook)
          (xls/row-seq)
          (map #(map xls/read-cell (take (count headers) %)))
          ;(remove #(every? string/blank? %))
          ))))


(defn get-rows
  "retrieve a sequence of maps - one map per row of data, with variables as keys"
  ([organ sheet-key]
   (let [workbook (memo-workbook organ)
         sheet (cfg/get-sheet-spec organ sheet-key)
         headers (get-header organ sheet-key)]
     (->> (xls/select-sheet (name sheet-key) workbook)
          (xls/row-seq)          
          (drop 1)
          (map #(map xls/read-cell (take (count headers) %)))
          ))))

(defn write-csv
  "read a sheet from xslx and export it to data/csv as a csv file"
  [organ sheet-key]
  (let [cfg (cfg/memo-config organ)
        f (io/file (str (get-in cfg [:export :csv-path])) (str (name sheet-key) ".csv"))
        ;headers (map #(str ":" (name %)) (get-header organ sheet-key))
        rows (get-all-rows organ sheet-key)]
    (io/make-parents f)
    (with-open [writer (io/writer f)]
      ;(csv/write-csv writer (list headers))
      (csv/write-csv writer rows))))

(comment
  (def cfg  (cfg/memo-config :kidney))
  (def organ :kidney)
  (def sheet-key :waiting-baseline-cifs)
  ;(def sheet-key :waiting-inputs)
  (def f (io/file (str (get-in cfg [:export :csv-path])) (str (name sheet-key) ".csv")))
  (def headers (map #(str ":" (name %)) (get-header organ sheet-key)))
  (def rows (get-rows organ sheet-key))
  (take 10 (concat (list headers) rows))
  (write-csv :kidney :waiting-baseline-cifs)
  (write-csv :kidney :waiting-baseline-vars)
  (write-csv :kidney :waiting-inputs)
  )

(defn row->map
  [headers row]
  (zipmap headers row))




(comment
  (require '[clojure.pprint :refer [pp pprint]])

  (cfg/get-config :kidney)
  (cfg/memo-config :kidney)
  (cfg/get-config :lung)

  ;; configured loading test
  (get-workbook :kidney)
  (get-workbook :lung)
  (memo-workbook :kidney)

  (cfg/get-sheet-spec :kidney :waiting-baseline-cifs)
  (cfg/get-sheet-spec :kidney :waiting-baseline-vars)
  (cfg/get-sheet-spec :lung :waiting-baseline-cifs)
  (try (cfg/get-sheet-spec :kidney :foo)
       (catch Exception e (ex-data e)))

  (get-header :kidney :waiting-baseline-cifs)
  (get-rows :kidney :waiting-baseline-cifs)
  (get-all-rows :kidney :waiting-baseline-cifs)
  (get-row-maps :kidney :waiting-baseline-cifs)

  (get-header :kidney :waiting-baseline-vars)
  (get-rows :kidney :waiting-baseline-vars)
  (get-row-maps :kidney :waiting-baseline-vars)

  (get-header :kidney :waiting-inputs)
  (get-all-rows :kidney :waiting-inputs)
  (:beta-removal (get-variables :kidney :waiting-inputs))
  ; (nil nil 0.0 0.01097 nil -0.99622 -0.75824 -0.43028 0.0 0.66553 1.56677 nil 0.0 -0.13979 nil 0.0 -0.19443 -0.03596 -0.19443 nil 0.0 0.09631 0.2109 nil 0.0 -0.10169 nil 0.0 -0.31226 nil 0.0 0.32677 nil 0.18723 0.0 nil nil nil nil nil)
  
  (first (get-all-rows :kidney :waiting-inputs))
  (get-row-maps :kidney :waiting-inputs)

  (sub-table :kidney :waiting-inputs [:factor :level :button-labels] :sex)
  ; ({:factor :sex, :level :male, :button-labels "Male"} 
  ; {:factor :sex, :level :female, :button-labels "Female"})
  
  (get-header :kidney :waiting-baseline-cifs)
  

  (get-header :kidney :graft-baseline-cifs)
  (get-header :kidney :graft-baseline-vars)
  (get-header :kidney :graft-baseline-inputs)

  (get-header :kidney :bmi-calculator)

  (get-header :kidney :survival-baseline-cifs)
  (get-header :kidney :survival-baseline-vars)
  (get-header :kidney :survival-inputs)

  (get-header :lung :waiting-baseline-cifs)

  
  
  (pprint (read-table  ((:tables (aero/read-config :kidney)) 0)))
  (pp)
  (pprint *1))