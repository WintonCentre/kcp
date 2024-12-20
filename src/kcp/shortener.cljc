(ns kcp.shortener
  "Code for shortening and expanding a map of user inputs (factor keys, level values) into and out of the URL.
   This code is cljc since it used both by babaskha scripts and in the app at runtime."
  (:require [clojure.string :as str]
            [clojure.edn :as edn]
            [clojure.set :as rel]))

(defn make-lookups
  "Make a lookup table from abbreviations data read in from metadata :abbreviations. There's one lookup
   table for each organ. The original abbreviations table is compact and one-way, so we convert it to a bidirectional 
   redundant format that can be converted into both forward and backward lookup maps easily.
   
   See test-data below for an example abbreviations form."
  [abbreviations]
  (into {} (mapcat
             (fn [[long-factor-k [short-factor-k levels]]]
               (mapv
                 (fn [[long-level short-level]]
                   [[long-factor-k long-level] (str short-factor-k short-level)])
                 levels))
             abbreviations)))

(defn db-to-URI
  "Compress a db inputs map into a URI parameter string.
   There are no characters in the string that require special URL encoding."
  [lookups m]
  (condp = m
    nil "-"
    {} "-"
    (if lookups
      (str/join (mapcat lookups m))
      "-")))

(defn URI-to-db
  "Expand a URI compressed input parameter string into a db inputs map"
  [ilookups s]
  (condp = s
    "" {}
    "-" {}
    (let [split (partition 3 s)]
      (into {} (map ilookups (mapv #(str/join "" %) split))))))

(comment
  (def test-data {:age ["A" {:18+ "2"
                             :30+ "3"
                             :40+ "4"
                             :50+ "5"
                             :60+ "6"}]})

  (def lookups (make-lookups test-data))                    ; forward lookup table
  (def ilookups (rel/map-invert lookups))                   ; backwards lookup table
  (db-to-URI lookups {})
  ;; => "-"

  (db-to-URI lookups nil)
  ;; => "-"

  (db-to-URI lookups {:age :40+})
  (db-to-URI lookups {})
  ;; => "Bbl3"

  (URI-to-db ilookups "A4")
  ;; => {:blood-group :B, :hla-mismatch :3}

  (URI-to-db ilookups "-")
  ;; => {}

  (URI-to-db ilookups "")
  ;; => {}

  (URI-to-db ilookups nil)
  ;; => {}

  ;; => {:blood-group :B, :hla-mismatch :3}

  (db-to-URI lookups {:blood-group :B :hla-mismatch :3 :donor-ht :unknown :wait :<=5})
  ;; => "Bbl3huW5"

  (URI-to-db ilookups (db-to-URI lookups {:blood-group :B :hla-mismatch :3 :donor-ht :unknown :wait :<=5}))
  ;; => {:blood-group :B, :hla-mismatch :3, :donor-ht :unknown, :wait :<=5}
  )