(ns test-drive
  "Babashka code to test drive the site model. 
   
   The main site is instrumented so it can generate results from uris that contain inputs like this:
   https//kidney.transplants.wintoncentre.uk/kidney/belf/survival/test/huA2SfBaDyl1EbMeGrdysnW1a2
   where the selected visualisation is 'test'.  The trailing alphabet soup encodes the inputs.

   Make a manual selection of these results to generate test cases, pasting them into tests.edn in the appropriate
   folder in r_model_tests.

   Use this utility to convert tests.edn to tests.csv and the n run the adjcox.R script against those test cases.

   Run tests by evluating this file - which will call t/run-tests.

   "
  (:require [clojure.pprint :refer [pprint]]
            [clojure.java.shell :refer [sh]]
            [clojure.edn :as edn]
            [clojure.set :as rel]
            [clojure.string :as str]
            [clojure.java.io :as io]
            [clojure.tools.cli :refer [parse-opts]]
            [clojure.data.csv :as csv]
            [babashka.classpath :refer [add-classpath]]
            [babashka.tasks :as tasks]
            ;[clojure.test :as t :refer [deftest testing is are]]
            ))

;; We add the classpath here so we can access it easily from the Calva Babashka REPL.
(add-classpath "bbsrc:src:resources")

(require '[clojure.test :as t :refer [deftest testing is are]]
         '[prepare-test-data :as prep])

(def file-sep (java.lang.System/getProperty "file.separator"))

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
;;    3. Run Rscript from bb <=== THIS IS CURRENTLY FAILING. WHY?
;;    4. Rscript generates results.csv files
;;    5. We compare these to the cljs results

(defn dir-path
  "Create directory path"
  [dirs]
  (str/join file-sep dirs))

(defn file-path
  "join dirs with the file-separator and append the file name to create a file path"
  [dirs file]
  (str/join file-sep (conj dirs file)))

(defn current-directory
  "Get current directory"
  []
  (-> (sh "pwd") :out (str/trimr)))

(defn read-edn-tests
  "Read the tests.edn file generated manually from selected site test cases"
  [r-dirs]
  (-> (file-path r-dirs "tests.edn")
      slurp
      (edn/read-string)))

(defn write-csv-tests
  "Read and convert test.edn to a csv table for R. 
   Then write it to tests.csv"
  [r-dirs]
  (let [tests (read-edn-tests r-dirs)
        headers (->> tests first :r-inputs keys (str/join ","))
        rows (map (fn [test] (->> test :r-inputs vals (str/join ","))) tests)]
    (str/join "\n" (cons headers rows))
    (spit (file-path r-dirs "tests.csv") (str/join "\n" (cons headers rows)))))

(defn rscript-command
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
    (sh "bash" "-c" (str "Rscript " r-script))  ;; unfortunately this fails in the Calva bb repl, 
    ;; though it does run in other contexts. 
    ;; See https://gist.github.com/gmp26/b859872eeb53c753ece08c7e632f7b02

    ;; so for the REPL we just echo a script line we can run in bash. You may need to tweak these to get them working in your R environment
    (str "Rscript " r-script)
    ;; => "Rscript resources/r_model_tests/kidney/waiting/adjcox.R"

    ;;(str "Rscript --vanilla --default-packages=base,datasets,graphics,grDevices,methods,stats,tidyr,utils,readr " r-script)))
    ))

(rscript-command :kidney :ldgraft)
;; => "Rscript --vanilla --default-packages=base,datasets,graphics,grDevices,methods,stats,tidyr,utils,readr resources/r_model_tests/kidney/waiting/adjcox.R"

;; => "Rscript --vanilla --default-packages=base,datasets,graphics,grDevices,methods,stats,tidyr,utils,readr resources/r_model_tests/kidney/waiting/adjcox.R /Users/gmp26/clojure/transplants/resources/r_model_tests/kidney/waiting"

(defn test-n-cljs
  "Get resuts from the nth cljs test (zero-indexed)"
  [r-dirs n]
  (-> (read-edn-tests r-dirs)
      (get n)
      :result))

;;(map (fn[m] (dissoc m :graft)) (test-n-cljs r-dirs 1))

(defn test-n-r
  "Get raw results from the n+1 th R results file"
  [r-dirs n]
  (with-open [reader (io/reader (file-path r-dirs (str "results_" (inc n) ".csv")))]
    (doall
     (csv/read-csv reader))))

(defn csv-map
  "ZipMaps header as keys and values from lines."
  [head & lines]
  (map #(zipmap (map keyword head) %1) lines))

(defn to%
  "Fraction to Percentage"
  [v] (* 100 v))

(defn test-r-as-maps
  "Convert nth r result to maps"
  [r-dirs n]
  (apply csv-map (test-n-r r-dirs n)))


(defmulti cljs-normalise
  "Normalise an r-map read in from csv results to a cljs form to enable comparison.
   The normalisation is different for each organ/tool combo which the juxt dispatch function
   will retrieve from an options map (say)."
  (juxt :organ :tool))

(defmethod cljs-normalise [:kidney :waiting] [_ r-maps]
  (for [m r-maps]
    (into {}
          (map (fn [[k v]]
                 (let [v (edn/read-string v)]
                   (condp = k
                     :days [:year (Math/round (/ v 365.25))]
                     :capS [:residual (to% v)]
                     :capF_rem [:removal (to% v)]
                     :capF_tx [:transplant (to% v)]
                     :capF_dth [:death (to% v)]
                     :else [:unknown nil])))
               m))))

(defmethod cljs-normalise [:kidney :graft] [_ r-maps]
  (for [m r-maps]
    (into {}
          (map (fn [[k v]]
                 (let [v (edn/read-string v)]
                   (condp = k
                     :days [:year (Math/round (/ v 365.25))]
                     :adjsurv [:residual (to% v)]
                     :else [:unknown nil])))
               m))))

(defmethod cljs-normalise [:kidney :ldgraft] [_ r-maps]
  (for [m r-maps]
    (into {}
          (map (fn [[k v]]
                 (let [v (edn/read-string v)]
                   (condp = k
                     :days [:year (Math/round (/ v 365.25))]
                     :adjsurv [:residual (to% v)]
                     :else [:unknown nil])))
               m))))

(defn =+-1
  "Check whether maps m1 and m2 are equal +/- 1%. 
    We can't be more accurate than this because the maps are variously adjusted to add to 100%"
  [m1 m2]
  (seq (remove
        (fn [[k1 v1]]
          (<= (Math/abs (- (k1 m2) v1)) 1)) m1)))

(defn =+-15
  "Check whether maps m1 and m2 are equal +/- 1+%. 
    We can't be more accurate than this because the maps are variously adjusted to add to 100%"
  [m1 m2]
  (seq (remove
        (fn [[k1 v1]]
          (<= (Math/abs (- (k1 m2) v1)) 1.3)) m1)))

;; These deftests work, but are useless at locating any failures
#_(deftest kidney-waiting-n
  (let [r-dirs ["resources" "r_model_tests" "kidney" "waiting"]]
    (testing "kidney waiting"
      (are [n]
           (every? nil?
                   (map
                    =+-1
                    (cljs-normalise {:organ :kidney :tool :waiting}
                                    (test-r-as-maps r-dirs n))
                    (test-n-cljs r-dirs n)))
        0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16))))

#_(deftest kidney-graft-n
  (let [r-dirs ["resources" "r_model_tests" "kidney" "graft"]]
    (testing "kidney graft"
      (are [n]
           (every? nil?
                   (map
                    =+-15
                    (cljs-normalise {:organ :kidney :tool :graft}
                                    (test-r-as-maps r-dirs n))
                    (map
                     (fn [m] (dissoc m :graft))
                     (test-n-cljs r-dirs n))))
        0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22))))

(defn more-useful-kidney-graft
  "This provides a more useful printout on any discrepancy."
  []
  (let [r-dirs ["resources" "r_model_tests" "kidney" "graft"]]
    (println "testing kidney graft")
    (doseq [n (range 23)]
      (if (not (every? nil?
                       (map
                        =+-1
                        (cljs-normalise {:organ :kidney :tool :graft}
                                        (test-r-as-maps r-dirs n))
                        (map
                         (fn [m] (dissoc m :graft))
                         (test-n-cljs r-dirs n)))))
        (println (str "Fail on results_" (inc n))
                 "R: " (cljs-normalise {:organ :kidney :tool :graft}
                                       (test-r-as-maps r-dirs n))
                 "cljs" (test-n-cljs r-dirs n))))))

(more-useful-kidney-graft)
#_(t/run-tests)

#_(comment
  (test-r-as-maps r-dirs 1)

  (=+-1 [{:year 1, :residual 93.89609541620652} {:year 3, :residual 91.76749160887245} {:year 5, :residual 89.28656547546872}]
        [{:graft 6, :residual 94, :year 1} {:graft 8, :residual 92, :year 3} {:graft 11, :residual 89, :year 5}])
  
  (=+-1
   (cljs-normalise {:organ :kidney :tool :graft}
                   (test-r-as-maps r-dirs 1))
   (test-n-cljs r-dirs 1))
  )


#_(comment

  (defn test1-cljs
    [test-index]
    (-> (read-edn-tests r-dirs)
        (get 0)
        :result))

  (def test1-r
    (with-open [reader (io/reader (file-path r-dirs "results_1.csv"))]
      (doall
       (csv/read-csv reader))))

  (defn csv-map
    "ZipMaps header as keys and values from lines."
    [head & lines]
    (map #(zipmap (map keyword head) %1) lines))

  (defn to%
    "Fraction to Percentage"
    [v] (* 100 v))

  (def test1-r-as-maps (apply csv-map test1-r))
  (defn cljs-normalise
    [r-maps]
    (for [m r-maps]
      (into {}
            (map (fn [[k v]]

                   (let [v (edn/read-string v)]
                     (condp = k
                       :days [:year (Math/round (/ v 365.25))]
                       :capS [:residual (to% v)]
                       :capF_rem [:removal (to% v)]
                       :capF_tx [:transplant (to% v)]
                       :capF_dth [:death (to% v)]
                       :else [:unknown nil])))
                 m))))

  (cljs-normalise test1-r-as-maps)
  (= test1-cljs (cljs-normalise test-r-as-maps))

  (defn =+-1
    [m1 m2]
    (seq (remove
          (fn [[k1 v1]]
            (<= (Math/abs (- (k1 m2) v1)) 1)) m1)))

  (cljs-normalise test1-r-as-maps)
  ;; => ({:year 1, :residual 85, :removal 1, :transplant 13, :death 1} {:year 3, :residual 43, :removal 7, :transplant 48, :death 2} {:year 5, :residual 8, :removal 12, :transplant 77, :death 3})
  test1-cljs
  ;; => [{:death 1, :removal 1, :residual 85, :transplant 13, :year 1} {:death 2, :removal 7, :residual 43, :transplant 48, :year 3} {:death 2, :removal 12, :residual 8, :transplant 78, :year 5}]

  (every? nil? (map =+-1 (cljs-normalise test1-r-as-maps) test1-cljs))

  (def r-dirs ["resources" "r_model_tests" "kidney" "waiting"])
  (def r-dirs ["resources" "r_model_tests" "kidney" "graft"])
  (def r-working-dir (str (current-directory) file-sep (dir-path r-dirs)))
  (def tests (read-edn-tests r-dirs))
  (def headers (->> tests first :r-inputs keys (str/join ",")))
  (count headers)
  (def rows (map (fn [test] (->> test :r-inputs vals (str/join ","))) tests))
  (write-csv-tests r-dirs)
  (spit tests-csv (str/join "\n" (cons headers rows)))
  (def r-script
       ;; => "resources/r_model_tests/kidney/waiting/adjcox.R"
    (file-path r-dirs "adjcox.R"))

  (current-directory)

  (defn edn-values [[k v]] [k (edn/read-string v)])

  (sh "pwd")
  (println (:err (sh "Rscript")))

  0)

;;;
;; main
;;;
#_(comment
  (defn usage
    "Usage message"
    ([] (usage nil))
    ([err-msg]
     (when err-msg (println err-msg))
     (println "See bb.edn for examples such as\n
             bb --file ./bbsrc/test-drive.clj -d chrome -s kidney")))


  (def cli-options [["-o" "--organ [organ-id]" "lung or kidney"
                     :default "kidney"
                     :parse-fn str
                     :validate [#(#{"kidney" "lung"} %) "kidney | lung"]]
                    ["-t" "--tool [tool-id]"
                     :default "waiting"
                     :parse-fn str
                     :validate [#(#{"waiting" "post-transplant" "graft" "ldgraft" "survival" "ldsurvival"} %)
                                "waiting | post-transplant | graft | ldgraft | survival | ldsurvival"]]
                    ["-h" "--help"]])


  (defn -main [& _args]
    (let [parsed-options (parse-opts *command-line-args* cli-options)]
      (println "parsed-options: " parsed-options)))
  )

#_(when (invoked-by-command-line?)
  (try
    (-main)
    (catch Exception e (.getMessage e))))


