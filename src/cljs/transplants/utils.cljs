(ns transplants.utils)

(defn get-centre-info
  "Locate the info for an organ & centre from organ-centres"
  [organ-centres organ centre]
  (first (get (group-by :key ((keyword organ) organ-centres)) (name centre))))

(defn unstring-key
  "ks is a string starting with a colon. Convert it to a true keyword"
  [ks]
  (if ks
    (keyword (subs ks 1))
    :hidden)
  )

(comment
  (unstring-key ":hello"))