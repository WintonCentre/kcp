#!/usr/bin/env bb

(ns organ-switch
  "Switches the repo between transplant organs - kidney or lung.
   
   It does this by 
   1) Generating metadata,ed with the correct :organ-order
   2) Generating sw_cache_update.js with the correct precache files
   3) Generating index.html with the correct matomo site-id

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
(require '[transplants.shortener :as short]) ; gain access to the .cljc 

;;;
;; main
;;;
(def cli-options [["-g" "--organ ORGAN" "Organ name (lung or kidney)"
                   :default "kidney"
                   :parse-fn str
                   :validate [#(#{"kidney" "lung"} %) "kidney | lung"]]
                  ["-d" "--data" "Generate test data"
                   :default false]
                  ["-h" "--help"]])

(def matomo-site-id
  {"kidney" 6
   "lung" 7}
  )

(def abbreviations (edn/read-string (slurp (io/resource "abbreviations.edn"))))
(defn get-organ-lookups
  "locate the organs abbreviations field and convert it to a lookup map"
  [organ-k]
  (short/make-lookups (-> abbreviations :abbreviations organ-k)))

(def lung-lookups (get-organ-lookups :lung))
(def kidney-lookups (get-organ-lookups :kidney))

(defn set-metadata
  "Read in template metadata, and poke in the :organ-order and the URL shortener lookup maps,
   and write result to metadata.edn"
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
      (spit "resources/public/metadata.edn" x)))
  )

(defn set-sw-cache
  "Replace '//include-paths' with a list of pre-cache paths calculated by the `bb config`"
  [organ]
  (let [template (slurp "resources/sw_cache_template.js")
        precache-v (distinct (edn/read-string (slurp (str "resources/precache_paths_" organ ".edn"))))
        precache-list (->> precache-v
                           (map (fn [path] (str "\t\t\t'" path "'")))
                           (str/join ",\n")
                           )]

    (->> (str/replace template
                      #"\s+//include-paths"
                      (str "\n" precache-list))
         (spit "resources/public/sw_cache_update.js"))))

(defn set-matomo-site-id
  "Change the matomo site id in index.html to the right one for the organ.
   NB. we could do the same for the site title to avoid assigning it dynamically."
  [organ]
  (->>
   (-> (slurp "resources/index.html.template")
       (str/replace #"\['setSiteId', 'n'\]" (str "['setSiteId', '" (get matomo-site-id organ) "']")))
   (spit "resources/public/index.html")))


(defn -main [& _args]
  (let [options (parse-opts *command-line-args* cli-options)
        organ (get-in options [:options :organ])]
    (set-sw-cache organ)
    (set-metadata organ)
    (set-matomo-site-id organ)
    ))


(-main)




