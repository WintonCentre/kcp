(ns transplants.paths
 ; "Configuration file paths"
  (:require [transplants.utils :as utils]
            [transplants.shared :refer [underscore]]
            [re-frame.core :as rf]))

(def slash "/")

(defn prefix
  [organ]
  (str (name organ) slash "edn" slash))


(def metadata-path (str slash "metadata.edn"))

(defn tools-path
  [organ]
  (str (prefix organ) "tools.txt"))

(defn centres-path
  [organ]
  (str (prefix organ) "centres.txt"))

(defn organ-centre-name-tool
  [organ centre-name tool]
  (str (prefix organ)
       (underscore centre-name) slash
       (underscore tool) ".txt"))

(comment
  (prefix "lung")
  (centres-path :lung)
  (underscore :waiting)
  
  (organ-centre-name-tool  "lung"
                            "birm"
                            "post-transplant")
  
  )
  