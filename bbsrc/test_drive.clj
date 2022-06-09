(ns test-drive
  "Babashka code to test drive the site model. 
   
   The main site is instrumented so it can generate results from uris that contain inputs like this:
   https//kidney.kcp.wintoncentre.uk/kidney/belf/survival/test/huA2SfBaDyl1EbMeGrdysnW1a2
   where the selected visualisation is 'test'.  The trailing alphabet soup encodes the inputs.

   Make a manual selection of these results to generate test cases, pasting them into tests.edn in the appropriate
   folder in r_model_tests.

   Use this utility to convert tests.edn to tests.csv and the n run the adjcox.R script against those test cases.

   Run all tests by evaluating this file.


   If running from the Calva babashka REPL you will need to take things in stages because running the R code in that environment
   fails. See https://gist.github.com/gmp26/b859872eeb53c753ece08c7e632f7b02.

   First, run down to line 123 so all the test.csv files are generated.
   Then, run the rscript-commands via some other mechanism - e.g. in RStudio, or simply from an external non-Calva shell

   "
  (:require [clojure.pprint :refer [pprint]]
            [clojure.java.shell :refer [sh]]
            [clojure.edn :as edn]
            [clojure.set :as rel]
            [clojure.string :as str]
            [clojure.java.io :as io]
            [clojure.tools.cli :refer [parse-opts]]
            [clojure.data.csv :as csv]
            [clojure.test :refer [deftest testing is are]]
            [babashka.classpath :refer [add-classpath]]
            [babashka.tasks :as tasks]))

;; We add the classpath here so we can access it easily from the Calva Babashka REPL.
(add-classpath "bbsrc:src:resources")
(require  '[babashka.fs :as fs])
;(require '[clojure.test :as t :refer [deftest testing is are]])

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

(defn test-count
  [r-dirs]
  (count (read-edn-tests r-dirs)))

(defn write-csv-tests
  "Read and convert test.edn to a csv table for R. 
   Then write it to tests.csv"
  [r-dirs]
  (let [tests (read-edn-tests r-dirs)
        headers (->> tests first :r-inputs keys (str/join ","))
        rows (map (fn [test] (->> test :r-inputs vals (str/join ","))) tests)]
    (str/join "\n" (cons headers rows))
    ; spit out data plus a final EOF marker ("\n")
    (spit (file-path r-dirs "tests.csv") (str (str/join "\n" (cons headers rows)) "\n"))))

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
    (babashka.process/sh ["Rscript" r-script r-working-dir])  ;; unfortunately this fails in the Calva bb repl, 
    ;; though it does run in other contexts. 
    ;; See https://gist.github.com/gmp26/b859872eeb53c753ece08c7e632f7b02

    ;; so for the REPL we just echo a script line we can run in a shell. You may need to tweak these to get them working in your R environment
    (str "Rscript " r-script " " r-working-dir)
    ;; => "Rscript resources/r_model_tests/kidney/waiting/adjcox.R ..."

    ))
(rscript-command :kidney :waiting) 
(rscript-command :kidney :graft)
(rscript-command :kidney :ldgraft)
(rscript-command :kidney :survival)
(rscript-command :kidney :ldsurvival)
(rscript-command :lung :waiting)
(rscript-command :lung :post-transplant)

(defn test-n-cljs
  "Get results from the nth cljs test (zero-indexed)"
  [r-dirs n]
  (-> (read-edn-tests r-dirs)
      (get n)
      :result))

(comment
;  (def path (file-path r-dirs (str "results_" (inc n) ".csv")))
  )

(defn test-n-r
  "Get raw results from the n+1 th R results file"
  [r-dirs n]
  (with-open [reader (io/reader (file-path r-dirs (str "results_" (inc n) ".csv")))]
    (doall
     (csv/read-csv reader))))

(defn csv-map
  "ZipMaps header as keys onto values from lines."
  [head & lines]
  (map #(zipmap (map keyword head) %1) lines))

(defn to%
  "Fraction to Percentage"
  [v] (* 100 v))

(defn test-r-as-maps
  "Convert nth r results to seq of maps"
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

(defmethod cljs-normalise [:kidney :survival] [_ r-maps]
  (for [m r-maps]
    (into {}
          (map (fn [[k v]]
                 (let [v (edn/read-string v)]
                   (condp = k
                     :days [:year (Math/round (/ v 365.25))]
                     :adjsurv [:residual (to% v)]
                     :else [:unknown nil])))
               m))))

(defmethod cljs-normalise [:kidney :ldsurvival] [_ r-maps]
  (for [m r-maps]
    (into {}
          (map (fn [[k v]]
                 (let [v (edn/read-string v)]
                   (condp = k
                     :days [:year (Math/round (/ v 365.25))]
                     :adjsurv [:residual (to% v)]
                     :else [:unknown nil])))
               m))))

(defmethod cljs-normalise [:lung :waiting] [_ r-maps]
  (for [m r-maps]
    (into {}
          (map (fn [[k v]]
                 (let [v (edn/read-string v)]
                   ;;
                   ;; In the lung waiting tool the R code counts removals (= removals + deaths), but the 
                   ;; front-end tool calls these deaths.
                   (condp = k
                     :days [:year (Math/round (/ v 365.25))]
                     :capS [:residual (to% v)]
                     :capF_rem [:death (to% v)]
                     :capF_tx [:transplant (to% v)]
                     ;:capF_dth [:death (to% v)]
                     :else [:unknown nil])))
               m))))

(defmethod cljs-normalise [:lung :post-transplant] [_ r-maps]
  (for [m r-maps]
    (into {}
          (map (fn [[k v]]
                 (let [v (edn/read-string v)]
                   (condp = k
                     :days [:year (Math/round (/ v 365.25))]
                     :adjsurv [:residual (to% v)]
                     :else [:unknown nil])))
               m))))

(defn approx=
  [m1 m2 epsilon]
  (seq (remove
        (fn [[k1 v1]]
          (when-not (<= (Math/abs (- (k1 m2) v1)) epsilon)
            (println (k1 m2) "differs from" v1 "by more than" epsilon))
          (<= (Math/abs (- (k1 m2) v1)) epsilon))
        m1)))

(defn =+-1
  "Usually we check whether maps m1 and m2 are equal +/- 1%,
     However we can adjust epsilon globally here to see the accruracy we are achieving.
     We don't need to be more accurate than 1% because the maps are variously adjusted to add to 100%"
  [m1 m2]
  (approx= m1 m2 0.5))

;; These deftests work, but are useless at locating any failures.
;; I still wish it were possible to apply `are` so we could do (are .... (range 17))
;; Some clever macro needed maybe?
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
        0 ;1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16
        ))))

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

(defn pluralise 
  "Return a regular singular/plural of word 's'."
  [n s]
  (if (= 1 n) 
    (str "1 " s)
    (str n " " s "s")))
(comment
  (pluralise 4 "tree")
  ;; => "4 trees"

  (pluralise 1 "tree")
  ;; => "1 tree"


  (def r-dirs ["resources" "r_model_tests" "kidney" "waiting"])
  (def organ :kidney)
  (def tool :waiting)
  (def organ-name (name organ))
  (def organ-key (keyword organ))
  (def tool-name (name tool))
  (def tool-key (keyword tool))
  (def n 1)
  )

(defn diagnostic-test
  "This provides a more useful printout on any discrepancy."
  [{:keys [organ tool]}]

  (let [organ-name (name organ)
        organ-key (keyword organ)
        tool-name (name tool)
        tool-key (keyword tool)
        r-dirs ["resources" "r_model_tests" organ-name tool-name]
        t-count (test-count r-dirs)
        failed (atom 0)]
    (println r-dirs)
    (println (str "testing " organ-name " " tool-name))
    (doseq [n (range t-count)]
      (if (not (every? nil?
                       (map
                        =+-1
                        (cljs-normalise {:organ organ-key :tool tool-key}
                                        (test-r-as-maps r-dirs n))
                        (map
                         (fn [m] (dissoc m tool-key))
                         (test-n-cljs r-dirs n)))))
        (do
          (swap! failed inc)
          (println (str "Fail on results_" (inc n)
                        "R: " (cljs-normalise {:organ organ-key :tool tool-key}
                                              (test-r-as-maps r-dirs n))
                        "cljs") (test-n-cljs r-dirs n)))))
    (println (str (pluralise (- t-count @failed) "test") " passed out of " t-count))))

(diagnostic-test {:organ :kidney :tool :waiting})
(println)
(diagnostic-test {:organ :kidney :tool :ldgraft})
(println)
(diagnostic-test {:organ :kidney :tool :graft})
(println)
(diagnostic-test {:organ :kidney :tool :survival})
(println)
(diagnostic-test {:organ :kidney :tool :ldsurvival})
(println)
(diagnostic-test {:organ :lung :tool :waiting})
(println)
(diagnostic-test {:organ :lung :tool :post-transplant})



;; #_(defn more-useful-kidney-graft
;;   "This provides a more useful printout on any discrepancy."
;;   []
;;   (let [r-dirs ["resources" "r_model_tests" "kidney" "graft"]]
;;     (println "testing kidney graft")
;;     (doseq [n (range (test-count r-dirs))]
;;       (if (not (every? nil?
;;                        (map
;;                         =+-1
;;                         (cljs-normalise {:organ :kidney :tool :graft}
;;                                         (test-r-as-maps r-dirs n))
;;                         (map
;;                          (fn [m] (dissoc m :graft))
;;                          (test-n-cljs r-dirs n)))))
;;         (println (str "Fail on results_" (inc n))
;;                  "R: " (cljs-normalise {:organ :kidney :tool :graft}
;;                                        (test-r-as-maps r-dirs n))
;;                  "cljs" (test-n-cljs r-dirs n))))))

;; ; same as test-n-cljs
;; #_(defn get-cljs-result
;;   [n]
;;   (:result (nth edn-tests n)))

;; #_(defn more-useful-test-eliding
;;   "This provides a more useful printout on any discrepancy.
;;    Tests are for a particular organ and tool, and to get a match we may need to elide one
;;    key fom the cljs result map."
;;   [{:keys [organ tool elide] :as args}]
;;   (let [r-dirs ["resources" "r_model_tests" (name organ) (name tool)]
;;         edn-tests (read-edn-tests r-dirs)]
;;     (println "testing " (name organ) " " (name tool))
;;     (doseq [n (range (count edn-tests))
;;             :let [cljs-result (map (fn [m] (dissoc m elide)) (test-n-cljs r-dirs n))
;;                   r-result (cljs-normalise args (test-r-as-maps r-dirs n))]]
;;       (map
;;        =+-1
;;        r-result
;;        cljs-result)
;;       #_(if (not-any? some?
;;                       (map
;;                        =+-1
;;                        r-result
;;                        cljs-result))
;;         (println (str "Fail on results_" (inc n))
;;                  "R: " r-result
;;                  "cljs" cljs-result)))))

;; #_(more-useful-test-eliding {:organ :kidney
;;                            :tool :graft
;;                            :elide :graft})


;; (comment
;;   (def r-dirs ["resources" "r_model_tests" "kidney" "waiting"])
;;   (def r-dirs ["resources" "r_model_tests" "kidney" "graft"])
;;   (def elide :graft)
;;   (def edn-tests (read-edn-tests r-dirs))
;;                  ;; => [{:organ "kidney", :tool "graft", :clj-inputs {:age :18+, :diabetes :yes, :wait :>7, :graft :first, :hla-mismatch :1, :donor-age :0+, :donor-ht :no, :donor-bmi :underweight}, :r-inputs {"dage" "1", "graft" "1", "diabetes" "1", "dbmi" "1", "dhtn" "1", "wait" "5", "rage" "1", "cent" "Birmingham", "hla" "1"}, :result [{:graft 22.7999022255712, :residual 77.2000977744288, :year 1} {:graft 29.553725751698234, :residual 70.44627424830178, :year 3} {:graft 36.86901606239652, :residual 63.13098393760348, :year 5}]} {:organ "kidney", :tool "graft", :clj-inputs {:age :18+, :diabetes :yes, :wait :<=1, :graft :first, :hla-mismatch :1, :donor-age :60+, :donor-ht :no, :donor-bmi :underweight}, :r-inputs {"dage" "5", "graft" "1", "diabetes" "1", "dbmi" "1", "dhtn" "1", "wait" "1", "rage" "1", "cent" "Birmingham", "hla" "1"}, :result [{:graft 25.32129432037858, :residual 74.67870567962143, :year 1} {:graft 32.62370063062734, :residual 67.37629936937266, :year 3} {:graft 40.43725754124485, :residual 59.56274245875515, :year 5}]} {:organ "kidney", :tool "graft", :clj-inputs {:age :18+, :diabetes :yes, :wait :<=1, :graft :first, :hla-mismatch :1, :donor-age :70+, :donor-ht :no, :donor-bmi :underweight}, :r-inputs {"dage" "6", "graft" "1", "diabetes" "1", "dbmi" "1", "dhtn" "1", "wait" "1", "rage" "1", "cent" "Birmingham", "hla" "1"}, :result [{:graft 29.105778749317974, :residual 70.89422125068204, :year 1} {:graft 37.15344298556008, :residual 62.84655701443992, :year 3} {:graft 45.60315894390237, :residual 54.39684105609763, :year 5}]}]

;;   (def cljs-result
;;     (map (fn [m] (dissoc m :graft)) (test-n-cljs r-dirs 2)))
;;     ;; => ({:residual 74.67870567962143, :year 1} {:residual 67.37629936937266, :year 3} {:residual 59.56274245875515, :year 5})
  
;;   (def r-result
;;     (cljs-normalise {:organ :kidney :tool :graft :elide :graft}
;;                     (test-r-as-maps r-dirs 2)))
;;     ;; => ({:year 1, :residual 75.45411247482295} {:year 3, :residual 68.10027716746463} {:year 5, :residual 60.245024011478655})

;;   (def name "kidney")
;;   )


;; #_(more-useful-kidney-graft)
;; #_(t/run-tests)

;; #_(comment
;;   (test-r-as-maps r-dirs 1)

;;   (=+-1 [{:year 1, :residual 93.89609541620652} {:year 3, :residual 91.76749160887245} {:year 5, :residual 89.28656547546872}]
;;         [{:graft 6, :residual 94, :year 1} {:graft 8, :residual 92, :year 3} {:graft 11, :residual 89, :year 5}])
  
;;   (=+-1
;;    (cljs-normalise {:organ :kidney :tool :graft}
;;                    (test-r-as-maps r-dirs 1))
;;    (test-n-cljs r-dirs 1))
;;   )


;; #_(comment

;;   (defn test1-cljs
;;     [test-index]
;;     (-> (read-edn-tests r-dirs)
;;         (get 0)
;;         :result))

;;   (def test1-r
;;     (with-open [reader (io/reader (file-path r-dirs "results_1.csv"))]
;;       (doall
;;        (csv/read-csv reader))))

;;   (defn csv-map
;;     "ZipMaps header as keys and values from lines."
;;     [head & lines]
;;     (map #(zipmap (map keyword head) %1) lines))

;;   (defn to%
;;     "Fraction to Percentage"
;;     [v] (* 100 v))

;;   (def test1-r-as-maps (apply csv-map test1-r))
;;   (defn cljs-normalise
;;     [r-maps]
;;     (for [m r-maps]
;;       (into {}
;;             (map (fn [[k v]]

;;                    (let [v (edn/read-string v)]
;;                      (condp = k
;;                        :days [:year (Math/round (/ v 365.25))]
;;                        :capS [:residual (to% v)]
;;                        :capF_rem [:removal (to% v)]
;;                        :capF_tx [:transplant (to% v)]
;;                        :capF_dth [:death (to% v)]
;;                        :else [:unknown nil])))
;;                  m))))

;;   (cljs-normalise test1-r-as-maps)
;;   (= test1-cljs (cljs-normalise test-r-as-maps))

;;   (defn =+-1
;;     [m1 m2]
;;     (seq (remove
;;           (fn [[k1 v1]]
;;             (<= (Math/abs (- (k1 m2) v1)) 1)) m1)))

;;   (cljs-normalise test1-r-as-maps)
;;   ;; => ({:year 1, :residual 85, :removal 1, :transplant 13, :death 1} {:year 3, :residual 43, :removal 7, :transplant 48, :death 2} {:year 5, :residual 8, :removal 12, :transplant 77, :death 3})
;;   test1-cljs
;;   ;; => [{:death 1, :removal 1, :residual 85, :transplant 13, :year 1} {:death 2, :removal 7, :residual 43, :transplant 48, :year 3} {:death 2, :removal 12, :residual 8, :transplant 78, :year 5}]

;;   (every? nil? (map =+-1 (cljs-normalise test1-r-as-maps) test1-cljs))

;;   (def r-dirs ["resources" "r_model_tests" "kidney" "waiting"])
;;   (def r-dirs ["resources" "r_model_tests" "kidney" "graft"])
;;   (def r-working-dir (str (current-directory) file-sep (dir-path r-dirs)))
;;   (def tests (read-edn-tests r-dirs))
;;   (def headers (->> tests first :r-inputs keys (str/join ",")))
;;   (count headers)
;;   (def rows (map (fn [test] (->> test :r-inputs vals (str/join ","))) tests))
;;   (write-csv-tests r-dirs)
;;   (spit tests-csv (str/join "\n" (cons headers rows)))
;;   (def r-script
;;        ;; => "resources/r_model_tests/kidney/waiting/adjcox.R"
;;     (file-path r-dirs "adjcox.R"))

;;   (current-directory)

;;   (defn edn-values [[k v]] [k (edn/read-string v)])

;;   (sh "pwd")
;;   (println (:err (sh "Rscript")))

;;   0)

;; ;;;
;; ;; main
;; ;;;
;; #_(comment
;;   (defn usage
;;     "Usage message"
;;     ([] (usage nil))
;;     ([err-msg]
;;      (when err-msg (println err-msg))
;;      (println "See bb.edn for examples such as\n
;;              bb --file ./bbsrc/test-drive.clj -d chrome -s kidney")))


;;   (def cli-options [["-o" "--organ [organ-id]" "lung or kidney"
;;                      :default "kidney"
;;                      :parse-fn str
;;                      :validate [#(#{"kidney" "lung"} %) "kidney | lung"]]
;;                     ["-t" "--tool [tool-id]"
;;                      :default "waiting"
;;                      :parse-fn str
;;                      :validate [#(#{"waiting" "post-transplant" "graft" "ldgraft" "survival" "ldsurvival"} %)
;;                                 "waiting | post-transplant | graft | ldgraft | survival | ldsurvival"]]
;;                     ["-h" "--help"]])


;;   (defn -main [& _args]
;;     (let [parsed-options (parse-opts *command-line-args* cli-options)]
;;       (println "parsed-options: " parsed-options)))
;;   )

;; #_(when (invoked-by-command-line?)
;;   (try
;;     (-main)
;;     (catch Exception e (.getMessage e))))



