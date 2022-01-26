(ns test-config
  "Creates the test-configuration.json files needed by each R run. Running the R
   associated with each too then generates a csv of expected results for that organ and tool.
   
   Before running this tool, ensure that you have renamed the R tool folder, the
   R file, and the CSV files it needs.
   
   For example, LD graft incoming files in doc/Sally/kidney 31.03.21 should be copied into
   resources/r_model_tests/kidney/ldgraft.
   
   The tool folders needed are listed in resources/r_model_tests, and each folder should
   contain adjcox.R (the adjcox model), surv.csv (survival baseline), params.csv (log hazard ratios).

   surv.Rmd should be the same in all directories.

   We want to generate json from things like:
   {:times [1 3 5]
    :factors [{:clj :age :r "rage" :zero 3 :test 6}
              {:clj :wait :r "wait" :zero 1 :test 5}
              {:clj :diabetes :r "diabetes" :zero 1 :test 0}
              {:clj :graft :r "graft" :zero 1 :test 2}
              {:clj :donor-age :r "dage" :zero 4 :test 6}
              {:clj :donor-bmi :r "dbmi" :zero 2 :test 3}
              {:clj :donor-ht :r "dhtn" :zero 2 :test 1}
              {:clj :hla-mismatch :r "hla" :zero 1 :test 4}
              ]}
   "
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




