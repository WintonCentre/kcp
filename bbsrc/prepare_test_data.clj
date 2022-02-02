;#!/usr/bin/env bb 

(ns prepare-test-data
  "Creates the test-configuration.json files needed by each R run. Running the R
   associated with each too then generates a csv of expected results for that organ and tool.
   
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

   "
  (:require ;[babashka.classpath :refer [add-classpath]]
   [cheshire.core :as json]
   [clojure.pprint :refer [pprint]]
   [clojure.edn :as edn]
   [clojure.string :as str]
   [clojure.java.shell :refer [sh]]
   ;[clojure.java.io :as io]
   [clojure.data.csv :as csv]
   [clojure.tools.cli :refer [parse-opts]]
   ))

#_(comment
  ; Requiring bom dynamically works, but messed up in strange way (e.g. Math/abs fails in the repl)

  (def bom-deps '{:deps {clj-bom {:mvn/version "0.1.2"}}})
  (def cp (-> (sh "clojure" "-Spath" "-Sdeps" (str bom-deps)) :out str/trim))
  (add-classpath cp)
  (require '[clj-bom.core :as bom]))
  

;;(println *command-line-args*)

;;
;; A few global defs and utils. 
;;
;; Todo: Set these up in (-main) and use
;; (defn -main [& args]
;;  (parse-opts args cli-options))
;;

(def cli-options [["-c" "--centre CENTRE" "Transplant centre"
                   :default "Belfast"
                   :parse-fn str]
                  ["-g" "--organ ORGAN" "Organ name (lung or kidney)"
                   :default "kidney"
                   :parse-fn str
                   :validate [#(#{"kidney" "lung"} %) "kidney | lung"]]
                  ["-t" "--tool TOOL" "Tool name (lung: waiting | post-survival), (kidney: waiting | (ld)survival | (ld)graft)"
                   :default "waiting"
                   :parse-fn str]
                  ["-h" "--help"]])


(def options (:options (parse-opts *command-line-args* cli-options)))


(def file-sep (java.lang.System/getProperty "file.separator"))

(def times (mapv :time-index
                (-> (edn/read-string (slurp (str "resources" file-sep "public" file-sep "metadata.edn")))
                    ((keyword (:organ options)))
                    :tools
                    ((keyword (:tool options)))
                    :table
                    :labels)))


(defn near-zero? "What counts as zero?" [x] (and (number? x) (< (if (neg? x) (- x) x) 1e-8)))
(defn different? "Are two reals different?" [a b] (when (and (number? a) (number? b)) 
                                               (not (near-zero? (- a b)))))
#_(comment
    (near-zero? -1e-9)
    (near-zero? 1e9))


;;;
;; Look into the r_model_test folders for R test data
;;;
(defn csv-data->maps 
  "csv column vectors to row maps"
  [csv-data]
  (map zipmap
       (->> (first csv-data) ;; First row is the header
            (map keyword) ;; Drop if you want string keys instead
            repeat)
       (rest csv-data)))

(defn base-dir [{:keys [organ tool]}]
  (str "resources" file-sep "r_model_tests" file-sep organ file-sep tool))

(def params
  "get params as pair of vectors of r-names and parameter values, skipping the byte order mark"
  (let [[names values] (csv/read-csv (subs (slurp (str (base-dir options) file-sep "params.csv")) 0))]
    [(map str/trim names) (map edn/read-string values)]))

(def param-map (apply zipmap params))
(comment 
  (pprint param-map))

(defn valid-r-tool-address
  "We limit tool addresses to those that are used in the front-end and also in the NHSBT provided R files
   Note that the ldxxxx tools are UK wide rather than locally centred"
  [{:keys [centre organ tool]}]

  (let [valid-tool (if (= organ "kidney")
                     (#{"waiting" "survival" "ldsurvival" "graft" "ldgraft"} tool)
                     (#{"waiting" "post-transplant"} tool))

        valid-centre (cond
                       (= (subs tool 0 2) "ld") (= centre "UK")
                       (= organ "kidney") (= centre "Belfast")
                       (= organ "lung") (= centre "Newcastle")
                       :else nil)]
    (and valid-tool valid-centre)))

(defn tool-bundle
  "Read in the tool bundle as configured in xlsx. 
   This assumes you have first run `bb config` to generate the edn text file containing
   the bundle."
  [{:keys [centre organ tool] :as tool-address}]
  {:pre [(valid-r-tool-address tool-address)]}
  (edn/read-string (slurp (str "resources"
                               file-sep "public"
                               file-sep organ
                               file-sep "edn"
                               file-sep centre
                               file-sep (str/replace tool "-" "_") ".txt"))))

(defn tool-bundle-keys
  "Read in a tool bundle as configured in xlsx given the tool address. 
   This assumes you have first run `bb config` to generate the edn text file containing
   the bundle.
   We limit tool addresses to those that are used in the front-end and also in the NHSBT provided R files
   Note that the ldxxxx tools are UK wide rather than locally centred"
  [tool-address]
  ;{:pre [(valid-r-tool-address tool-address)]}
  (keys (tool-bundle tool-address)))
#_(comment
  (tool-bundle-keys options)
  )


(defn parse-r-name
  "Extract relevant fields from an r-name read in from params.csv.
   There are a few awkward cases in the data here"
  [r-name]
  
  (let [parts (str/split r-name #"_")
        p1 (first parts)
        pn (next parts)
        has-outcome? (fn [] (and (= (:tool options) "waiting") (#{"tx" "rem" "dth"} p1)))
        parts (if (has-outcome?)
                pn
                parts)]
    (cond
      (str/index-of r-name "in_hosp") {:r-factor "in_hosp"
                                       :r-level (last pn)}
      (str/index-of r-name "prev_thor") {:r-factor "prev_thor"
                                         :r-level (last pn)}
      :else {:r-factor (first parts)
             :r-level (str/join "_" (next parts))})))
(comment
  (parse-r-name "dth_rage_4")
  (parse-r-name "tx_in_hosp_2")
  (parse-r-name "tx_prev_thor_1")
  (parse-r-name "rem_pred_1_14")
  (str/index-of "tx_in_hosp_2" "in_hosp")
  (str/index-of "dth_rage_4" "in-hosp")
  )

  
;;;;
;;; R summaries
;;;;
(defn r-factor-value
  [info]
  (if (= (:tool options) "waiting")
    (assoc info :info
           (mapv
            (fn [outcome-code]
              (let [r-name (str/join "_" [outcome-code (:r-factor info) (:r-level info)])]
                {:r-name    r-name
                 :r-outcome outcome-code
                 :r-value   (get param-map r-name)}))
            (if (= (:organ options) "kidney")
              ["tx" "rem" "dth"]
              ["tx" "rem"])))))
#_(comment
  (pprint (r-factor-value {:r-factor "rage", :r-level "3"}))
  )


(defn r-factor-info
  []
  (map parse-r-name (first params)))
#_(comment
    (pprint (r-factor-info)))


(defn r-info-by-clj-r-name
  "r-info maps grouped by the factor in the r-name spreadsheet column EDN.
   This map is NOT created from the EDN, but should be accessible from the r-name column.

   *** THIS FUNCTION MAKES THE LINKING VALUE ***
   "
  []
  (into {}
        (map (fn [[[fac lev] v]] [(str fac "_" lev) (first v)])
             (group-by (juxt :r-factor :r-level)
                       (map r-factor-value (r-factor-info))))))
#_(comment
    (pprint (get (r-info-by-clj-r-name) "prev_thor")))

(comment
  (pprint (r-factor-info))
  (pprint (r-info-by-clj-r-name)))

(def linkup (r-info-by-clj-r-name))

;;;;
;; Now process data from xlsx-sourced EDN files
;;;;

(defn map-of-vs->v-of-maps
  "Transpose a map of vectors to a vector of maps.
    Resulting vector will be truncated to the length of the shortest input vector.
    e.g. {:a [0 1 2] :b [10 11 12]} -> [{:a 0 :b 10} {:a 1 :b 11} {:a 2 :b 12}]"
  [k-vs]
  (cond
    (seq k-vs) (mapv (fn [vs]
                       (into {} (map-indexed (fn [k v] [(nth (keys k-vs) k) v]) vs)))
                     (apply map vector (vals k-vs)))
    (nil? k-vs) nil
    :else []))

(defn add-outcome-prefix
  "Prefixes an rname with the outcome code if bk is one of the listed betas.
     Unlisted betas do not add a prefix.
     
     The R code for lungs codes 'death or removal' as 'rem', and there is no 'dth'.
     The clojure code uses :beta-death, and there is no :beta-removal.
     
     For kidneys both R and clj use all 3 (death + removal + transplant)."

  [rname bk]
  (str ({:beta-death (if (= (:organ options) "lung") "rem_" "dth_")
         :beta-removal "rem_"
         :beta-transplant "tx_"} bk) rname))

(defn stripped-factor
  "factor map stripped of fields that are not relevant to tests."
  [factor]
  (let [beta-keys (filter (fn [k] (str/starts-with? (name k) "beta")) (keys factor))
        stripped (select-keys factor (concat beta-keys [:factor-name :factor :level :r-name]))]
    (if (> (count beta-keys) 1)
      (assoc stripped :r-names (mapv
                                (fn [bk]
                                  (add-outcome-prefix (:r-name stripped) bk))
                                beta-keys))
      stripped)))

(defn raw-factors [options]
  (let [inputs-key (nth (tool-bundle-keys options) 2)
        bundle (tool-bundle options)
        inputs (bundle inputs-key)]
    (map-of-vs->v-of-maps inputs)))

(comment
  (pprint (raw-factors options))
  )

(defn info-by-outcome
  [info outcome]
  (first (filter #(= (:r-outcome %) outcome) info))
  )
;;;
;; EDN data summaries
;;

(def r-named-factors
  "EDN factors that also have an R name and level, grouped by that r-name.
     This links R data to edn data for test."
  (map (fn [m] (assoc m :r-link (linkup (:r-name m))))
       (->> (filter (comp some? :r-name) (raw-factors options))
            (map stripped-factor))))

(comment
  (pprint r-named-factors)
  )

;(different? nil 1)

#_(comment
  (defn test-parameter-values
    "Move this to a proper test framework?"
    [r-outcome edn-outcome]
    (testing (str (:organ options) ":" (:tool options) ": " edn-outcome "/" r-outcome))
    (map
     (fn [rnf]
       (let [a (get rnf edn-outcome)
             b (:r-value (info-by-outcome (get-in rnf [:r-link :info]) r-outcome))]
         (is (not (different? a b)) (str "Mismatch for " (:factor rnf) " " (:level rnf) " " r-outcome " " a " /= " b))))
     r-named-factors))


  (t/run-tests)

  (comment
    (test-parameter-values "tx" :beta-transplant))
  )


(defn clj-info-by-clj-factor
  []
  (group-by :factor r-named-factors))


(comment
  (pprint  (first (clj-info-by-clj-factor)))
  (pprint (:age (clj-info-by-clj-factor)))
  )

(defn distinct-clj-factors
  []
  (keys (clj-info-by-clj-factor)))

(defn zero-r-factor
  "Map of R zero-effect factor-levels"
  [rf-info]
  (first (filter (fn [r-info] (near-zero? (:r-value r-info))) rf-info)))

(defn test-r-factor
  "Map of R zero-effect factor-levels"
  [rf-info]
  (last (filter (fn [r-info] (not (near-zero? (:r-value r-info)))) rf-info)))

#_(defn r-test-for-clj-factor
  [fkey]
  (let [cinfo (get (clj-info-by-clj-factor) fkey)
        rinfo (get (r-info-by-clj-name) (name fkey))]
    {:clj fkey
     :rfactor rinfo
     :cfactor cinfo}))


#_(clojure.pprint/pprint
 {:times times
  :factors (mapv r-test-for-clj-factor (distinct-clj-factors))})

;;;
;; Generate R test configurations
;;;
;; {:times   [1 3 5]
;;  :factors [{:clj      :age
;;             :rname    nil
;;             :r        "1"
;;             :clj-test nil
;;             :zero     nil
;;             :test     nil}
;;            {:clj      :wait
;;             :rname    nil
;;             :r        "1"
;;             :clj-test nil
;;             :zero     nil
;;             :test     nil}
;;            {:clj      :graft
;;             :rname    nil
;;             :r        "1"
;;             :clj-test nil
;;             :zero     nil
;;             :test     nil}]}


 #_(defn assemble
     "Assemble the test_configuration data ready for export."
     []
     (let [cm clj-factor-map
           z (zero-r-factors)
           t (test-r-factors)]
       {:times times
        :factors (->> (keys clj-factor-map)
                      (map (fn [k]
                             (let [f (cm k)]
                               {:clj k
                                :rname (:r-name (k clj-factor-map))
                                :r f
                                :clj-test (r-level->clj-level k (str f "_" (get t f)))
                                :zero (get z f)
                                :test (get t f)}))))}))

 #_(comment
   (println (base-dir options))

   params
   param-map
   (get param-map "rage_1")
   (parse-r-name "rem_rage_pf")
   (map parse-r-name (first params))

   (r-factor-info)
   (clojure.pprint/pprint
    (r-factor-info))

   (clojure.pprint/pprint (map r-factor-value (r-factor-info)))
   (clojure.pprint/pprint (r-info-by-clj-name))
   (clojure.pprint/pprint (clj-info-by-clj-factor))


   (clojure.pprint/pprint (clj-factors))

   (clojure.pprint/pprint (assemble))
   (str/split "rem@sens_1" #"_")

   options
   (tool-bundle-keys options)
   (valid-r-tool-address options)


   (def inputs-key (nth (tool-bundle-keys options) 2))
   (def bundle (tool-bundle options))
   (def inputs (bundle inputs-key))
   (def factors (map-of-vs->v-of-maps inputs))
   (clojure.pprint/pprint factors)

   (def r-name "Tx_age_3")



   (def surv (str base-dir file-sep "surv.csv"))

   (defn from-edn [edn-file]
     (-> edn-file
         slurp
         edn/read-string
         json/generate-string))

   (def s (json/parse-string (json/generate-string {:a 1 :c {:b [4 5 6]}}) true))
   s

   (defn to-json
     [edn-file json-file]
     (spit json-file (from-edn edn-file)))


   (let [[edn-file json-file] (if (= *file* (System/getProperty "babashka.file"))
                                *command-line-args*
                                ["bb.edn" "bb.json"])]
  ;
     (println edn-file json-file))


   (comment
     (sh "pwd")
     (spit "bb.json" (from-edn "bb.edn"))
     (from-edn "bb.edn"))
   (require '[clojure.math :as math])
   (math/get-exponent 100000)
   (math/log 100000)
   (/ 1 10000)
   )






;;;;;;;;;;; REMOVE name-num stuff soon

#_(comment
  (def clj-factors
   ;[]
    (->> r-named-factors
         (group-by :factor)))



  (defn factor-by-r-name [r-name]
    (first (get
            (group-by :r-name r-named-factors)
            r-name)))



  (defn factor-by-key [fkey]
    (first (get
            (group-by :factor r-named-factors)
            fkey)))



  (factor-by-r-name "rage@grp_1")


  (factor-by-key :tage)





  (defn stripped-factor-by-r-name
    "factor by r-name stripped of fields that are not relevant to tests."
    [r-name]
    (let [factor (factor-by-r-name r-name)
          beta-keys (filter (fn [k] (str/starts-with? (name k) "beta")) (keys factor))]

      (select-keys factor (concat beta-keys [:factor-name :factor :level :r-name]))))



  (stripped-factor-by-r-name "rage_1")



  (defn r-name->clj [r-name]
    (->> (filter (comp some? :r-name) raw-factors)
         (group-by :r-name)))



  (def clj-factor-map
    (into {}
          (map
           (fn [fkey]
             [fkey
              (->> (clj-factors)
                   fkey
                   first
                   :r-name
                   name-nums
                   first)])
           (keys (clj-factors)))))



  (defn r-level->clj-level
    "find the clj-level corresponding to an r-level"
    [fkey r-level]
    (->> (filter (fn [f] (= r-level (:r-name f))) (fkey (clj-factors)))
         first
         :level))




  #_(defn assemble
      "Assemble the test_configuration data ready for export."
      []
      (let [cm clj-factor-map
            z (zero-r-factors)
            t (test-r-factors)]
        {:times times
         :factors (->> (keys clj-factor-map)
                       (map (fn [k]
                              (let [f (cm k)]
                                {:clj k
                                 :rname (:r-name (k clj-factor-map))
                                 :r f
                                 :clj-test (r-level->clj-level k (str f "_" (get t f)))
                                 :zero (get z f)
                                 :test (get t f)}))))}))



  (defn export-json
    [path edn-data]
    (spit path (json/generate-string edn-data)))



  (def export-edn spit)



;;;
;; main
;;;
  (defn -main [& _args]
    (println (parse-opts *command-line-args* cli-options))
    (export-json (str (base-dir options) file-sep "test-configuration.json") (assemble))
    (export-edn (str (base-dir options) file-sep "test-configuration.edn") (assemble)))
  )
  


