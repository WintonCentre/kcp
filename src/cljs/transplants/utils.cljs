(ns transplants.utils)

(defn get-centre-info
  "Locate the info for an organ & centre from organ-centres"
  [organ-centres organ centre]
  (first (get (group-by :key ((keyword organ) organ-centres)) (name centre)))
  #_(if-let [rv (first (get (group-by :key ((keyword organ) organ-centres)) (name centre)))]
    rv
    (do
      (println "organ-centres " organ-centres)
      (println "keyword organ" (keyword organ))
      (println "centre" centre))))