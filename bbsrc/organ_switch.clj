#!/usr/bin/env bb

(ns organ-switch
  "Switches the repo between transplant organs - kidney or lung.
   
   It does this by 
   1) Generating metadata,ed with the correct :organ-order
   2) Generating index.html with the correct matomo site-id

   All these resources/public files are generated from templates in resources.
   "
  (:require 
   [clojure.pprint :refer [pprint]]
   [clojure.edn :as edn]
   [clojure.set :as rel]
   [clojure.string :as str]
   [clojure.java.shell :refer [sh]]
   [clojure.java.io :as io]
   [clojure.tools.cli :refer [parse-opts]]
   [babashka.classpath :refer [add-classpath]]
   ))

;; We add the classpath here so we can access it easily from the Calva Babashka REPL.
(add-classpath "bbsrc:src:resources")
(require '[kcp.shortener :as short]) ; gain access to the .cljc 

;;;
;; main
;;;
(def cli-options [["-g" "--organ ORGAN" "Organ name (lung or kidney)"
                   :default "kidney"
                   :parse-fn str
                   :validate [#(#{"kidney" "lung"} %) "kidney | lung"]]
                  ["-h" "--help"]])



(def abbreviations (edn/read-string (slurp (io/resource "abbreviations.edn"))))
(defn get-organ-lookups
  "locate the organs abbreviations field and convert it to a lookup map"
  [organ-k]
  (short/make-lookups (-> abbreviations :abbreviations organ-k)))

(def lung-lookups (get-organ-lookups :lung))
(def kidney-lookups (get-organ-lookups :kidney))

(defn set-metadata
  "Read in template metadata, and poke in the :organ-order and the URL shortener lookup maps,
   and write result to metadata.txt"
  [organ]
  (let [organ-k (keyword organ)
        lookups (get-organ-lookups organ-k)
        ilookups (rel/map-invert lookups)]
    (as-> (slurp "resources/metadata_template.edn") x
      (edn/read-string x)
      (assoc x
             :organ-order [organ-k] ; we only ever have one now
             :lookups lookups     ; db -> URI compressor map
             :ilookups ilookups)  ; URI -> db expander map
      (spit "resources/public/metadata.txt" x)))
  )

(defn create-index
  "Apply variables to the index template, currently not used... retained for future use"
  [_organ]
  (let [template (slurp "resources/index.html.template")]
    (spit "resources/public/index.html" template)))

(defn -main [& _args]
  (let [options (parse-opts *command-line-args* cli-options)
        organ (get-in options [:options :organ])]
    (set-metadata organ)
    (create-index organ)
    ))


(-main)




