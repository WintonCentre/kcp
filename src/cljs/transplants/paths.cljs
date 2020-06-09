(ns transplants.paths
  "Configuration file paths")

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
