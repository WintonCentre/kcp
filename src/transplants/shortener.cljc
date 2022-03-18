(ns transplants.shortener
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

(defn invert-lookups
  [lookups]
  (rel/map-invert lookups))

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

;; (comment
;;   "A2SfBaDyEaMeGrdpsn"
;;   (def s "A2SfBaDyEaMeGrdpsn")
;;   (partition 2 2 s)
;;   (require '[re-frame.core :as rf])
;;   (require '[transplants.subs :as subs])
;;   (def ilookups (:ilookups @(rf/subscribe [::subs/mdata])))
;;   )

(defn URI-to-db
  "Expand a URI compressed input parameter string into a db inputs map"
  [ilookups s]
  (condp = s
    "" {}
    "-" {}
    (into {} (map ilookups (mapv #(str/join "" %) (partition 2 2 s))))))

(comment
  (def test-data {:blood-group ["B" {:O "o"
                                     :A "a"
                                     :B "b"
                                     :AB "ab"}]
                  :wait ["W" {:<=1 "1"
                              :<=3 "3"
                              :<=5 "5"
                              :<=7 "7"
                              :>7 "8"}]
                  :donor-ht ["h" {:yes "y"
                                  :no "n"
                                  :unknown "u"}]
                  :hla-mismatch ["l" {:1 "1"
                                      :2 "2"
                                      :3 "3"
                                      :4 "4"
                                      :unknown "u"}]})

  (def lookups (make-lookups test-data))    ; forward lookup table
  (def ilookups (rel/map-invert lookups))   ; backwards lookup table
  (db-to-URI lookups {})
  ;; => "-"

  (db-to-URI lookups nil)
  ;; => "-"
  
  (db-to-URI lookups {:blood-group :B :hla-mismatch :3})
  (db-to-URI lookups {})
  ;; => "Bbl3"

  (URI-to-db ilookups "Bbl3")
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