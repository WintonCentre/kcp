(ns transplants.paths
 ; "Configuration file paths"
  (:require [transplants.utils :as utils]
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
       centre-name slash
       tool ".txt"))

(comment
  (prefix "lung")
  (centres-path :lung)

  (organ-centre-name-tool  "lung"
                            "birm"
                            "post-transplant")
  
  (require 'reframe.core)
  (reframe.core/subscribe [:transplants.subs/centres])
  )
  