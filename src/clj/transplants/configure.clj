(ns transplants.configure
  (:require 
   [aero.core :as aero]
   [dk.ative.docjure.spreadsheet :as xls]
   [clojure.java [io :as io]]
   [clojure.string :as string]
   ))


(defn read-config
  "read configuration file from the classpath using aero"
  [path profile]
  (aero/read-config (io/resource path) {:profile profile}))

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
       (drop header-rows)))

(->> (xls/load-workbook "data/kidney-models-master.xlsx")
     (xls/select-sheet "waiting-inputs"))

;;;
; spreadsheet configuration
;;;
(defn get-config
  "Read the configuration file, profiled by organ - either :lung or :kidney"
  [profile]
  (aero/read-config "data/config.edn" {:profile profile}))

(def memo-config (memoize get-config))

;;;
; switch organ here for now
(def organ :kidney)
;(def organ :lung)
;;;

(defn get-workbook
  "Read in workbooks for an organ"
  [organ]
  (xls/load-workbook (:workbook (memo-config organ)))
  )

(def memo-workbook
  "memoize get-workbook because it reads in a load of data"
  (memoize get-workbook))

(defn get-sheet-spec
  "get sheet spec given sheet-key"
  [organ sheet-key]
  (if-let [sheet (get-in (memo-config organ) [:sheets sheet-key])]
    sheet
    (throw (ex-info "Unable to read sheet"
                    {:cause "sheet name missing?"
                     :organ organ
                     :sheet sheet-key}))))

(defn get-header
  "retrieve header variables in a seq"
  [organ sheet-key]
  (let [workbook (memo-workbook organ)
        sheet (get-sheet-spec organ sheet-key)]
    (->> (xls/select-sheet (name sheet-key) workbook)
         (xls/row-seq)
         (remove nil?)
         (first)
         (xls/cell-seq)
         (map xls/read-cell)
         (take-while #(and (some? %) (string/starts-with? % ":")))
         (map #(subs % 1))
         (map keyword)
         )))

(defn get-rows
  "retrieve a sequence of maps - one map per row of data, with variables as keys"
  ([organ sheet-key centre]
   (->> (get-rows organ sheet-key)
        (filter #(= (first %) centre))))
  
  ([organ sheet-key]
   (let [workbook (memo-workbook organ)
         sheet (get-sheet-spec organ sheet-key)
         headers (get-header organ sheet-key)]
     (->> (xls/select-sheet (name sheet-key) workbook)
          (xls/row-seq)
          (remove nil?)
          (drop 1)
          (map #(map xls/read-cell (take (count headers) %)))
          ))))

(defn row->map
  [headers row]
  (zipmap headers row))

(defn transpose
  "transpose rows of a matrix. If 2 arity, add headers"
  ([m]
   (apply map vector m))
  ([m headers]
   (zipmap headers (transpose m))))

(defn get-columns
  "retrieve a table as a map of vectors"
  ([organ sheet-key centre]
   (transpose
    (get-rows organ sheet-key centre)
    (get-header organ sheet-key)))
  ([organ sheet-key]
      (transpose
       (get-rows organ sheet-key)
       (get-header organ sheet-key))))
#_(defn get-columns
  "retrieve a table as a map of vectors"
  ([organ sheet-key centre]
   (->> (get-rows organ sheet-key centre)
        (apply map vector)
        (zipmap (get-header organ sheet-key))))
  ([organ sheet-key]
   (->> (get-rows organ sheet-key)
        (apply map vector)
        (zipmap (get-header organ sheet-key))))
  )

(comment
  (require '[clojure.pprint :refer [pp pprint]])

  (get-config :kidney)
  (memo-config :kidney)
  (get-config :lung)

  ;; configured loading test
  (get-workbook :kidney)
  (get-workbook :lung)
  (memo-workbook :kidney)

  (get-sheet-spec :kidney :waiting-baseline-cifs)
  (get-sheet-spec :kidney :waiting-baseline-vars)
  (get-sheet-spec :lung :waiting-baseline-cifs)
  (try (get-sheet-spec :kidney :foo)
       (catch Exception e (ex-data e)))

  (get-header :kidney :waiting-baseline-cifs)
  (get-rows :kidney :waiting-baseline-cifs)
  (get-rows :kidney :waiting-baseline-cifs "Newcastle")
  (get-columns :kidney :waiting-baseline-cifs)
  (get-columns :kidney :waiting-baseline-cifs "Newcastle")

  
  (get-header :kidney :waiting-baseline-vars)
  (get-header :kidney :waiting-inputs)
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