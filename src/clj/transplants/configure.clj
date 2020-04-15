(ns transplants.configure
  (:require 
   [aero.core :as aero]
   [dk.ative.docjure.spreadsheet :as xls]
   [clojure.java [io :as io]]
   ))


(defn read-config [path]
  (aero/read-config (io/resource path)))

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
; startup
;;;
(def kidney-config "data/kidney-config.edn")
(def lung-config "data/kidney-config.edn")
(def system-config (atom {}))

(read-table  ((:tables (aero/read-config kidney-config)) 0))

(comment
  (require '[clojure.pprint :refer [pp pprint]])
  (xls/load-workbook "data/current-kidney/Competing risks CIF kidney.xlsx")
  (clojure.java.io/resource kidney-config)
  (io/resource kidney-config)
  (aero/read-config kidney-config)
  (pprint (aero/read-config kidney-config))
  (pprint (read-table  ((:tables (aero/read-config kidney-config)) 0)))
  (pp)
  (pprint *1)
  )