(ns transplants.paths
  "Configuration file paths")

(def slash "/")

(defn prefix 
  [organ]
  (str (name organ) slash "edn" slash))


(def organs-path (str slash "organs.txt"))

(defn tools-path 
  [organ]
  (str (prefix organ) "tools.txt"))

(defn centres-path
  [organ]
  (str (prefix organ) "centres.txt"))
