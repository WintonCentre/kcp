(ns transplants.utils)

(defn get-centre-info 
  [centres centre]
  (first (get (group-by :key centres) (name centre))))