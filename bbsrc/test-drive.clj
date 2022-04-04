(ns test-drive
  "Babashka code to test drive the site model. 
   
   The main site is instrumented so it can generate results from uris that contain inputs like this:
   https//kidney.transplants.wintoncentre.uk/kidney/belf/survival/test/huA2SfBaDyl1EbMeGrdysnW1a2
   where the selected visualisation is 'test'.  The trailing alphabet soup encodes the inputs.

   Make a manual selection of these results to generate test cases, pasting them into tests.edn in the appropriate
   folder in r_model_tests.

   Use this utility to convert tests.edn to tests.csv and the n run the adjcox.R script against those test cases.

   "
  (:require [clojure.pprint :refer [pprint]]
            [clojure.java.shell :refer [sh]]
            [clojure.edn :as edn]
            [clojure.set :as rel]
            [clojure.string :as str]
            [clojure.java.io :as io]
            [clojure.tools.cli :refer [parse-opts]]
            [babashka.classpath :refer [add-classpath]]
            [babashka.tasks :refer [shell]]
            ;[clojure.test :as t :refer [deftest testing is are]]
            ))

(require '[clojure.test :as t :refer [deftest testing is]]
         '[prepare-test-data :as prep])

(def file-sep (java.lang.System/getProperty "file.separator"))

;; We add the classpath here so we can access it easily from the Calva Babashka REPL.
(add-classpath "bbsrc:src:resources")
;(require '[transplants.shortener :as short]) ; gain access to the .cljc 

(defn env [s] (java.lang.System/getenv s))

(defn invoked-by-command-line?
  "See https://book.babashka.org/_/recipes.html#main_file. 
  If false we are probably in a REPL."
  []
  (= (System/getProperty "babashka.file") *file*))

;;;
;; Plan:
;;  1. For each tool
;;    1. Select test points - semi-manually - write to test-data.edn in R tool subfolder 
;;    2. Convert test-data.edn to csv data?
;;    3. Run Rscript from bb

(defn dir-path
  "Create directory path"
  [dirs]
  (str/join file-sep dirs))

(defn file-path
  "join dirs with the file-separator and append the file name to create a file path"
  [dirs file]
  (str/join file-sep (conj dirs file)))

(defn current-directory
  []
  (-> (sh "pwd") :out (str/trimr)))

(defn read-edn-tests
  [r-dirs]
  (-> (file-path r-dirs "tests.edn")
      slurp
      (edn/read-string)))

(defn tests-csv
  [r-dirs]
  (let [tests (read-edn-tests r-dirs)
        headers (->> tests first :r-inputs keys (str/join ","))
        rows (map (fn [test] (->> test :r-inputs vals (str/join ","))) tests)]
    (str/join "\n" (cons headers rows))
    ))

(defn write-csv-tests
  [r-dirs]
  (spit (file-path r-dirs "tests.csv") (tests-csv r-dirs)))

(defn run-r-script
  [organ tool]
  (let [r-dirs ["resources" "r_model_tests" (name organ) (name tool)]
        r-working-dir (str (current-directory) file-sep (dir-path r-dirs))
        r-script (file-path r-dirs "adjcox.R")]
    ;;
    ;; convert tests.edn to tests.csv for R to read
    ;;
    (write-csv-tests r-dirs)
    ;; 
    ;; run adjcox over all csv rows (by calling R adjcox::run_tests())
    ;; passing in the r-working directory so R can use that context.
    ;;
    ;(sh "Rscript" "--vanilla" "--default-packages=base,datasets,graphics,grDevices,methods,stats,tidyr,utils,readr" r-script r-working-dir))
    (shell (str "Rscript --vanilla --default-packages=base,datasets,graphics,grDevices,methods,stats,tidyr,utils,readr" " " r-script " " r-working-dir))
  ;(sh "Rscript" "--vanilla" "--default-packages=base,datasets,graphics,grDevices,methods,stats,tidyr,utils,readr" "resources/r_model_tests/kidney/waiting/adjcox.R" "/Users/gmp26/clojure/transplants/resources/r_model_tests/kidney/waiting")
    ;;
    ;; Read in the results
    ;;
    ))


(run-r-script :kidney :waiting)

(comment
  (def r-dirs ["resources" "r_model_tests" "kidney" "waiting"])
  (def tests (read-edn-tests r-dirs))
  (def headers (->> tests first :r-inputs keys (str/join ",")))
  (count headers)
  (def rows (map (fn [test] (->> test :r-inputs vals (str/join ","))) tests))
  (write-csv-tests r-dirs)
  (spit tests-csv (str/join "\n" (cons headers rows)))
  (def r-script (file-path r-dirs "adjcox.R"))

  (current-directory)

  (defn edn-values [[k v]] [k (edn/read-string v)])

  tests-edn
   => [{:organ "kidney", :tool "waiting", :r-inputs {"bld" "o", "graft" "0", "diabetes" "2", "age" "2", "match" "1", "cent" "Birmingham", "sex" "m", "eth" "nonwhite", "sens" "1", "dialysis" "1"}, :result [{:death 1, :removal 1, :residual 85, :transplant 13, :year 1} {:death 2, :removal 7, :residual 43, :transplant 48, :year 3} {:death 2, :removal 12, :residual 8, :transplant 78, :year 5}]} {:organ "kidney", :tool "waiting", :r-inputs {"bld" "o", "graft" "0", "diabetes" "2", "age" "3", "match" "1", "cent" "Birmingham", "sex" "m", "eth" "nonwhite", "sens" "1", "dialysis" "1"}, :result [{:death 1, :removal 2, :residual 86, :transplant 11, :year 1} {:death 3, :removal 10, :residual 45, :transplant 42, :year 3} {:death 5, :removal 17, :residual 9, :transplant 69, :year 5}]} {:organ "kidney", :tool "waiting", :r-inputs {"bld" "o", "graft" "0", "diabetes" "2", "age" "4", "match" "1", "cent" "Birmingham", "sex" "m", "eth" "nonwhite", "sens" "1", "dialysis" "1"}, :result [{:death 2, :removal 2, :residual 87, :transplant 9, :year 1} {:death 5, :removal 13, :residual 48, :transplant 34, :year 3} {:death 8, :removal 22, :residual 11, :transplant 59, :year 5}]} {:organ "kidney", :tool "waiting", :r-inputs {"bld" "o", "graft" "0", "diabetes" "2", "age" "5", "match" "1", "cent" "Birmingham", "sex" "m", "eth" "nonwhite", "sens" "1", "dialysis" "1"}, :result [{:death 3, :removal 3, :residual 87, :transplant 7, :year 1} {:death 8, :removal 18, :residual 46, :transplant 28, :year 3} {:death 12, :removal 31, :residual 10, :transplant 47, :year 5}]} {:organ "kidney", :tool "waiting", :r-inputs {"bld" "o", "graft" "0", "diabetes" "2", "age" "6", "match" "1", "cent" "Birmingham", "sex" "m", "eth" "nonwhite", "sens" "1", "dialysis" "1"}, :result [{:death 3, :removal 5, :residual 86, :transplant 6, :year 1} {:death 9, :removal 30, :residual 40, :transplant 21, :year 3} {:death 13, :removal 48, :residual 6, :transplant 33, :year 5}]} {:organ "kidney", :tool "waiting", :r-inputs {"bld" "o", "graft" "0", "diabetes" "2", "age" "7", "match" "1", "cent" "Birmingham", "sex" "m", "eth" "nonwhite", "sens" "1", "dialysis" "1"}, :result [{:death 3, :removal 12, :residual 80, :transplant 5, :year 1} {:death 8, :removal 57, :residual 22, :transplant 13, :year 3} {:death 10, :removal 72, :residual 1, :transplant 17, :year 5}]} {:organ "kidney", :tool "waiting", :r-inputs {"bld" "o", "graft" "0", "diabetes" "2", "age" "2", "match" "1", "cent" "Birmingham", "sex" "f", "eth" "nonwhite", "sens" "1", "dialysis" "1"}, :result [{:death 0, :removal 1, :residual 87, :transplant 12, :year 1} {:death 2, :removal 6, :residual 47, :transplant 45, :year 3} {:death 2, :removal 11, :residual 10, :transplant 77, :year 5}]} {:organ "kidney", :tool "waiting", :r-inputs {"bld" "o", "graft" "0", "diabetes" "2", "age" "2", "match" "1", "cent" "Birmingham", "sex" "m", "eth" "white", "sens" "1", "dialysis" "1"}, :result [{:death 1, :removal 1, :residual 84, :transplant 14, :year 1} {:death 2, :removal 8, :residual 41, :transplant 49, :year 3} {:death 3, :removal 13, :residual 7, :transplant 77, :year 5}]} {:organ "kidney", :tool "waiting", :r-inputs {"bld" "a", "graft" "0", "diabetes" "2", "age" "2", "match" "1", "cent" "Birmingham", "sex" "m", "eth" "nonwhite", "sens" "1", "dialysis" "1"}, :result [{:death 1, :removal 1, :residual 75, :transplant 23, :year 1} {:death 2, :removal 7, :residual 22, :transplant 69, :year 3} {:death 2, :removal 9, :residual 1, :transplant 88, :year 5}]} {:organ "kidney", :tool "waiting", :r-inputs {"bld" "b", "graft" "0", "diabetes" "2", "age" "2", "match" "1", "cent" "Birmingham", "sex" "m", "eth" "nonwhite", "sens" "1", "dialysis" "1"}, :result [{:death 1, :removal 1, :residual 86, :transplant 12, :year 1} {:death 2, :removal 7, :residual 44, :transplant 47, :year 3} {:death 3, :removal 12, :residual 8, :transplant 77, :year 5}]} {:organ "kidney", :tool "waiting", :r-inputs {"bld" "ab", "graft" "0", "diabetes" "2", "age" "2", "match" "1", "cent" "Birmingham", "sex" "m", "eth" "nonwhite", "sens" "1", "dialysis" "1"}, :result [{:death 1, :removal 1, :residual 75, :transplant 23, :year 1} {:death 2, :removal 7, :residual 22, :transplant 69, :year 3} {:death 2, :removal 9, :residual 1, :transplant 88, :year 5}]} {:organ "kidney", :tool "waiting", :r-inputs {"bld" "o", "graft" "0", "diabetes" "1", "age" "2", "match" "1", "cent" "Birmingham", "sex" "m", "eth" "nonwhite", "sens" "1", "dialysis" "1"}, :result [{:death 0, :removal 1, :residual 84, :transplant 15, :year 1} {:death 1, :removal 5, :residual 41, :transplant 53, :year 3} {:death 1, :removal 9, :residual 7, :transplant 83, :year 5}]} {:organ "kidney", :tool "waiting", :r-inputs {"bld" "o", "graft" "1", "diabetes" "2", "age" "2", "match" "1", "cent" "Birmingham", "sex" "m", "eth" "nonwhite", "sens" "1", "dialysis" "1"}, :result [{:death 1, :removal 1, :residual 90, :transplant 8, :year 1} {:death 2, :removal 7, :residual 56, :transplant 35, :year 3} {:death 4, :removal 13, :residual 18, :transplant 65, :year 5}]} {:organ "kidney", :tool "waiting", :r-inputs {"bld" "o", "graft" "0", "diabetes" "2", "age" "2", "match" "1", "cent" "Birmingham", "sex" "m", "eth" "nonwhite", "sens" "1", "dialysis" "2"}, :result [{:death 0, :removal 1, :residual 83, :transplant 16, :year 1} {:death 1, :removal 5, :residual 37, :transplant 57, :year 3} {:death 2, :removal 8, :residual 5, :transplant 85, :year 5}]} {:organ "kidney", :tool "waiting", :r-inputs {"bld" "o", "graft" "0", "diabetes" "2", "age" "2", "match" "1", "cent" "Birmingham", "sex" "m", "eth" "nonwhite", "sens" "2", "dialysis" "1"}, :result [{:death 1, :removal 1, :residual 92, :transplant 6, :year 1} {:death 2, :removal 9, :residual 63, :transplant 26, :year 3} {:death 4, :removal 19, :residual 25, :transplant 52, :year 5}]} {:organ "kidney", :tool "waiting", :r-inputs {"bld" "o", "graft" "0", "diabetes" "2", "age" "2", "match" "2", "cent" "Birmingham", "sex" "m", "eth" "nonwhite", "sens" "1", "dialysis" "1"}, :result [{:death 1, :removal 1, :residual 89, :transplant 9, :year 1} {:death 2, :removal 7, :residual 53, :transplant 38, :year 3} {:death 3, :removal 13, :residual 15, :transplant 69, :year 5}]} {:organ "kidney", :tool "waiting", :r-inputs {"bld" "o", "graft" "0", "diabetes" "2", "age" "2", "match" "3", "cent" "Birmingham", "sex" "m", "eth" "nonwhite", "sens" "1", "dialysis" "1"}, :result [{:death 0, :removal 1, :residual 92, :transplant 7, :year 1} {:death 2, :removal 6, :residual 64, :transplant 28, :year 3} {:death 3, :removal 12, :residual 26, :transplant 59, :year 5}]}]

  (sh "pwd")
  (println (:err (sh "Rscript")))

  0
  )

;;;
;; main
;;;
(defn usage
  "Usage message"
  ([] (usage nil))
  ([err-msg]
   (when err-msg (println err-msg))
   (println "See bb.edn for examples such as\n
             bb --file ./bbsrc/test-drive.clj -d chrome -s kidney")))

(def cli-options [["-s" "--site-id site-id" "lung or kidney or local"
                   :default "kidney"
                   :parse-fn str
                   :validate [#(#{"kidney" "lung" "local"} %) "kidney | lung | local"]]
                  ["-d" "--driver-id driver-id" "ff for Firefox geckodriver, chrome, safari, edge"
                   :default "ff"
                   :parse-fn str
                   :validate [#(#{"ff" "chrome" "safari" "edge"} %) "gecko | chrome | safari | edge"]]
                  ["-h" "--help"]])

(defn -main [& _args]
  (let [parsed-options (parse-opts *command-line-args* cli-options)]
    (println "parsed-options: " parsed-options)
    ))

(when (invoked-by-command-line?)
  (try
    (-main)
    (catch Exception e (.getMessage e))))


