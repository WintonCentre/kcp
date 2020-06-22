(ns transplants.shared
  (:require [clojure.string :as string]
            [clojure.set :as rel]
            [winton-utils.data-frame :refer [map-of-vs->v-of-maps]]
            [transplants.transforms :as xf]))

;;
;; This section may be only runtime - but may go into config on
;;

(defn underscore
  "replace special chars in file paths with underscore"
  [s]
  (string/replace (if (keyword? s) (name s) s) #"-|\s+|'|\." "_"))
; (underscore "St George's") => "St_George_s"


(defn unstring-key
  "ks is a string starting with a colon. Convert it to a true keyword.
   Useful when processing ':keyword' values readin from a spreadsheet into true keywords.
   
   Single arity returns a global key. Double arity returns a namespaced key"
  ([ks]
   (if (and ks (string? ks) (string/starts-with? ks ":"))
     (keyword (subs ks 1))
     ks))
  ([nsp ks]
   (if (and ks (string? ks) (string/starts-with? ks ":"))
     (keyword nsp (subs ks 1))
     ks)))


(defn index-by
  "Take a raw data table in map of vectors form.
   Convert it a vector or maps.
   Remove any maps where the primary index is nil.
   Then index by the (orange) index columns which are specified in metadata.edn
   Finally, convert those indexes to keywords."
  [organ raw indexes]
  (as-> raw x
    (map-of-vs->v-of-maps x)
    (filter (comp some? (first indexes)) x)
    (into #{} x)
    (rel/index x indexes)
    (map (fn [[k v]] [(xf/map-vals #(unstring-key organ %) k) (into {} v)]) x)
    (into {} x)))

