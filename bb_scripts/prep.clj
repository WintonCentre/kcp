(ns prep
  (:require [cheshire.core :as json]
            [clojure.edn :as edn]
            [clojure.java.shell :refer [sh]]
            [clojure.java.io :as io]))

(defn from-edn [edn-file]
  (-> edn-file
       slurp
       edn/read-string
       json/generate-string)
  )

(defn to-json 
  [edn-file json-file]
  (spit json-file (from-edn edn-file)))

(let [[edn-file json-file] (if (= *file* (System/getProperty "babashka.file"))
                             *command-line-args*
                             ["bb.edn" "bb.json"])]
  ;
  (println edn-file json-file)
  )

(comment
  (sh "pwd")
  (spit "bb.json" (from-edn "bb.edn") )
  (from-edn "bb.edn")
  )




