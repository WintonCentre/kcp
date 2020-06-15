(ns transplants.utils
  (:require [clojure.string :refer [starts-with?]]))

(defn get-centre-info
  "Locate the info for an organ & centre from organ-centres"
  [organ-centres organ centre]
  (first (get (group-by :key ((keyword organ) organ-centres)) (name centre))))

(defn unstring-key
  "ks is a string starting with a colon. Convert it to a true keyword.
   Useful when processing ':keyword' values readin from a spreadsheet into true keywords."
  [ks]
  (if (and ks (string? ks) (starts-with? ks ":"))
    (keyword (subs ks 1))
    ks))
(comment
  (unstring-key ":hello"))
  ;=> :hello)

(defn path-keys
  "Given reitit path-params, return the organ/centre/tool patgh keys"
  [path-params]
  (->> path-params
       ((juxt :organ :centre :tool))
       (map keyword)))

  (comment
    (path-keys {:organ "k" :centre "c" :tool "t"})
    ;=> (:k :c :t)
    )


