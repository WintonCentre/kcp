(ns transplants.paths
 ; "Configuration file paths"
  (:require [transplants.shared :refer [underscore]]))

(def slash "/")

(defn prefix
  [organ]
  (str slash (name organ) slash "edn" slash))


(def metadata-path (str slash "metadata.edn"))

(defn tools-path
  [organ]
  (str (prefix organ) "tools.txt"))

(defn centres-path
  [organ]
  (str (prefix organ) "centres.txt"))

#_(defn organ-centre-name-tool
  [organ centre-name tool]
  ;(println ::tool tool)
  (if (= (name tool) "guidance")
    nil
    (str (prefix organ)
         (underscore centre-name) slash
         (underscore tool) ".txt")))

(defn organ-centre-name-tool
  "return a pathname for tool data, else nil"
  [organ centre-name tool]
  (println ::tool tool)
  (let [tool-name (underscore (name tool))
        path
        (cond
      ;; todo: NHSBT dependent
          (= tool-name "guidance") nil

      ;; todo: NHSBT dependent
          (#{"ldsurvival" "ldgraft"} tool-name) (str (prefix organ)
                                                     "UK" slash
                                                     tool-name ".txt")
      ;; OK
          :else (str (prefix organ)
                     (underscore centre-name) slash
                     tool-name ".txt"))]
    (println ::organ-centre-name-tool "path=" path)
    path))

(comment
  (prefix "lung")
  (centres-path :lung)
  (underscore :waiting)
  
  (organ-centre-name-tool  "lung"
                            "birm"
                            "post-transplant")
  
  )
  