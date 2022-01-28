#!/usr/bin/env bb 

(ns test-prep
  "Creates the test-configuration.json files needed by each R run. Running the R
   associated with each too then generates a csv of expected results for that organ and tool.
   
   Before running this tool, ensure that you have renamed the R tool folder, the
   R file, and the CSV files it needs.
   
   For example, LD graft incoming files in doc/Sally/kidney 31.03.21 should be copied into
   resources/r_model_tests/kidney/ldgraft.
   
   The tool folders needed are listed in resources/r_model_tests, and each folder should
   contain adjcox.R (the adjcox model), surv.csv (survival baseline), params.csv (log hazard ratios).

   surv.Rmd should be the same in all directories.
   "
  (:require [cheshire.core :as json]
            [clojure.edn :as edn]
            [clojure.string :as str]
            [clojure.java.shell :refer [sh]]
            [clojure.java.io :as io]
            [clojure.data.csv :as csv]
            [clojure.tools.cli :refer [parse-opts]]))


(println *command-line-args*)

(def cli-options [["-c" "--centre CENTRE" "Transplant centre"
                   :default "Belfast"
                   :parse-fn str]
                  ["-g" "--organ ORGAN" "Organ name"
                   :default "kidney"
                   :parse-fn str
                   :validate [#(#{"kidney" "lung"} %) "organ must be kidney or lung"]]
                  ["-t" "--tool TOOL" "Tool name"
                   :default "waiting"
                   :parse-fn str]
                  ["-h" "--help"]])

(defn csv-data->maps 
  "csv column vectors to row maps"
  [csv-data]
  (map zipmap
       (->> (first csv-data) ;; First row is the header
            (map keyword) ;; Drop if you want string keys instead
            repeat)
       (rest csv-data)))

(def options (:options (parse-opts *command-line-args* cli-options)))
  
(def file-sep (java.lang.System/getProperty "file.separator"))

(defn base-dir [{:keys [organ tool]}]
  (str "resources" file-sep "r_model_tests" file-sep organ file-sep tool))

(def params
  "get params as pair of vectors of names and values, skipping the byte order mark"
  (let [[names values] (csv/read-csv (subs (slurp (str (base-dir options) file-sep "params.csv")) 1))]
    [names (map edn/read-string values)]))

(def param-map (apply zipmap params))

(defn valid-r-tool-address
  "We limit tool addresses to those that are used in the front-end and also in the NHSBT provided R files
   Note that the ldxxxx tools are UK wide rather than locally centred"
  [{:keys [centre organ tool]}]

  (let [valid-tool (if (= organ "kidney")
                     (#{"waiting" "survival" "ldsurvival" "graft" "ldgraft"} tool)
                     (#{"waiting" "post_transplant"} tool))

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
                               file-sep tool ".txt"))))

(defn tool-bundle-keys
  "Read in a tool bundle as configured in xlsx given the tool address. 
   This assumes you have first run `bb config` to generate the edn text file containing
   the bundle.
   We limit tool addresses to those that are used in the front-end and also in the NHSBT provided R files
   Note that the ldxxxx tools are UK wide rather than locally centred"
  [tool-address]
  ;{:pre [(valid-r-tool-address tool-address)]}
  (keys (tool-bundle tool-address)))
  

(defn distinct-r-factors
  "Seq of distinct R factor names"
  []
  (let [names (first params)]
    (->> (first params)
         (map #(subs % 0 (str/last-index-of % "_")))
         (distinct))))

(defn near-zero? "What counts as zero?" [x] (< (Math/abs x) 1e-8))
(defn name-num
  [[name num]]
  [name (edn/read-string num)])

(defn name-nums
  "Waiting tool factor r-names split into 3 parts and in this case we ignore the first part - the outcome code, 
   leaving always the factor and level parts."
  [r-name]
  (let [parts (str/split r-name #"_")]
    (if (> (count parts) 2)
      (drop 1 parts)
      parts)))

(defn zero-r-factors
  "Map of R zero-effect factor-levels"
  []
  (into {} (map #(name-num (name-nums %)) 
                (->> param-map
                     (filter (fn [[k v]] (near-zero? v)))
                     (map first)
                     ))))

(defn test-r-factors
  "Map of R non-zero-effect factor-levels to be tested.
   
   check: Note that we are assuming here that a zero effect parameter is zero effect for all
   possible outcomes when there are more than one. The assumption holds for lung and kidney data
   but may not hold in general. This assumption means that we do not need to qualify the
   factors by outcome in the return value."
  []
  (into {}
        (map last
             (map
              (fn [[k v]] (sort-by second compare v))
              (->> (map #(name-num (name-nums %))
                        (->> param-map
                             (filter (fn [[k v]] (not (near-zero? v))))
                              (map first)))
                             
                   (group-by first))))))



(defn assemble
  "Assemble the test_configuration ready for export."
  []
  (let [z (zero-r-factors)
        t (test-r-factors)]
    (->> (distinct-r-factors)
        (map (fn [f] {:r f :zero (get z f) :test (get t f)})))))



(comment
  (println (base-dir options))

  (pr "params " params)
  (pr "param-map " param-map)


  (subs "123" 0 2)
  (get param-map "rage_1")
  (distinct-r-factors)
  (zero-r-factors)
  (test-r-factors)
  (assemble)

  (str/split "rem_sens_1" #"_")

  (tool-bundle-keys {:centre "Belfast" :organ "kidney" :tool "graft"})
  (tool-bundle-keys {:centre "Belfast" :organ "kidney" :tool "survival"})
  (tool-bundle-keys {:centre "Belfast" :organ "kidney" :tool "waiting"})
(valid-r-tool-address {:centre "Belfast" :organ "kidney" :tool "ldsurvival"})
  (tool-bundle-keys {:centre "Belfast" :organ "kidney" :tool "ldsurvival"})

  (def inputs-key (nth (tool-bundle-keys {:centre "Belfast" :organ "kidney" :tool "survival"}) 2))
  (def inputs-key (nth (tool-bundle-keys {:centre "Belfast" :organ "kidney" :tool "waiting"}) 2))
  (def bundle (tool-bundle {:centre "Belfast" :organ "kidney" :tool "waiting"}))
  (def inputs (bundle inputs-key))
  (def factors (csv-data->maps inputs))

  (defn map-of-vs->v-of-maps
    "Transpose a map of vectors to a vector of maps.
  Resulting vector will be truncated to the length of the shortest input vector.
  e.g. {:a [0 1 2] :b [10 11 12]} -> [{:a 0 :b 10} {:a 1 :b 11} {:a 2 :b 12}]"
    [k-vs]
    (cond
      (seq k-vs)
      (mapv (fn [vs]
              (into {} (map-indexed (fn [k v] [(nth (keys k-vs) k) v]) vs)))
            (apply map vector (vals k-vs)))
      (nil? k-vs)
      nil

      :else
      []))
  
  (def factors* (map-of-vs->v-of-maps inputs))

  (< "1" "2")
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




