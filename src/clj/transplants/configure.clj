(ns transplants.configure
  (:require 
   [aero.core :as aero]
   [dk.ative.docjure.spreadsheet :as xls]
   [clojure.java [io :as io]]
   ))


(defn read-config [path profile]
  (aero/read-config (io/resource path) {:profile profile}))

(defn read-table
  "Read in non-null rows of data from columns in a spreadsheet.
  'path' identifies the xlsx file.
  'sheet-title' is the name of the sheet to read.
  'columns' should be a map of XLSX column letters as keywords (:A, :B etc) to more meaningful keys.
  For example: {:A :centre, :B :days, :K :survival}

  Returns a collection of maps containing meaningful keys mapped to data.
  "
  ([{:keys [path sheet columns header-rows]}]
   (let [table (->> (xls/load-workbook path)
                    (xls/select-sheet (second sheet))
                    (xls/select-columns columns)
                    (drop header-rows)
                    )]
     table
     )))
;;;
; spreadsheet configuration
;;;
(defn get-config
  "Read the configuration file, profiled by organ - either :lung or :kidney"
  [profile]
  (aero/read-config "data/config.edn" {:profile profile}))

;;;
; switch organ here for now
(def organ :kidney)
;(def organ :lung)
;;;

(defn get-workbooks
  "Read in workbooks for an organ"
  [organ]
  (into {}
        (->> (:workbooks (get-config organ))
             (map (fn [[k v]]
                    (when v
                      (println "loading " k v)
                      [k (xls/load-workbook v)])))
             )))

(comment
  (require '[clojure.pprint :refer [pp pprint]])
  
  ;; raw loading test
  (xls/load-workbook "data/current-kidney/Competing risks CIF kidney.xlsx")
  (xls/load-workbook "data/current-kidney/post tx patient and graft survival.xlsx")

  ;; configured loading test
  (get-workbooks :kidney)
  (get-workbooks :lung)
  
  (pprint (read-table  ((:tables (aero/read-config kidney-config)) 0)))
  (pp)
  (pprint *1)
  )