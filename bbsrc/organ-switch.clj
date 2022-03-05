#!/usr/bin/env bb --classpath resources

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
   [clojure.string :as str]
   [clojure.java.shell :refer [sh]]
   [clojure.java.io :as io]
   [clojure.tools.cli :refer [parse-opts]]))

(defn read-template
  [organ]
  (let [path (io/resource (str "edn-paths-" organ ".txt"))]
    (slurp path)))

(comment
  (def organ "kidney")
  (def organ "lung")
  (read-template organ)
  )

;;;
;; main
;;;
(def cli-options [["-g" "--organ ORGAN" "Organ name (lung or kidney)"
                   :default "kidney"
                   :parse-fn str
                   :validate [#(#{"kidney" "lung"} %) "kidney | lung"]]
                  ["-h" "--help"]])

(def matomo-site-id
  {"kidney" 6
   "lung" 7}
  )

(defn set-metadata
  [organ]
  (as-> (slurp "resources/metadata_template.edn") x
    (edn/read-string x)
    (assoc x :organ-order [(keyword organ)])
    (spit "resources/public/metadata.edn" x)
    )
  )

(defn set-sw-cache
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




