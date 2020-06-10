(ns transplants.paths
  "Configuration file paths"
  (:require [transplants.utils :as utils]))

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

(defn organ-centre-tools-path
  [{:keys [organ centre tool] :as path-params} centres]
  (println "centre-info " (utils/get-centre-info centres centre))
  (str (prefix organ)
       centre slash
       tool ".txt"))

(comment
  (prefix "lung")

  (organ-centre-tools-path {:organ "lung" 
                            :centre "birm" 
                            :tool "post-transplant"} 3)
  
  (require 'reframe.core)
  (reframe.core/subscribe [:transplants.subs/centres])
  )
  