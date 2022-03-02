#!/usr/bin/env bb --classpath resources

(ns organ-switch
  "Switches the repo between ranspant organs - kidney or lung.
   
   It does this by 
   1) writing :organ-order
   
   Before running this tool, ensure that you have renamed the R tool folder, the
   R file, and the CSV files it needs.
   
   For example, LD graft incoming files (e.g. doc/Sally/kidney 31.03.21) should be copied into
   resources/r_model_tests/kidney/ldgraft and given simpler names.
   
   The tool folders needed are listed in resources/r_model_tests, and each folder should
   contain adjcox.R (the adjcox model), surv.csv (survival baseline), params.csv (log hazard ratios).

   surv.Rmd should be the same in all directories.

   RUNNING from project folder: 
   bb --file ./bb_scripts/test_prep.clj -g kidney -t graft -c Belfast
                                                                       see <project-folder>/bb.edn
   =======
   WIP: Automated parameter cross checks run from `bb run-tests` - see bbsrc and bbtest and <project-folder>/test-runner
   =======
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




