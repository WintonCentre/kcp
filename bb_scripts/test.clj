(ns test
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

(println (:options (parse-opts *command-line-args* cli-options)))