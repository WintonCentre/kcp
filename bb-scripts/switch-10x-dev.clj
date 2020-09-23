#!/usr/bin/env bb

; Run from the transplants directory
; $ ./bb-scripts/switch-10x-dev.clj
;
; I may be wrong, but it is very hard to configure figwheel-main with webpack to easily switch
; between dev (witout 10x), dev (with 10x) without also needing different html.
; Since I waste a lot of time whenever I need to do this, here is a script that does what I need:
; 
; Run this script BEFORE jacking in to select the correct mode. 
; You can then always select 'dev' as the profile when jacking in.
; 
; Usage for 10x: switch-10x-dev 10x
; Usage for dev: switch-10x-dev

;(ns bb-scripts)
  
(require '[clojure.edn :as edn]
         '[clojure.java.io :refer [writer]]
         '[clojure.pprint :refer [pprint]])

(declare day8.re-frame-10x.preloads)

(def template-edn (str "10x.cljs.edn"))
(def dev-edn (str "dev.cljs.edn"))

(defn use-10x
  "copy 10x.cljs.edn to dev.cljs.edn unchanged"
  []
  (let [build (edn/read-string (slurp template-edn))]
    (println "switch to 10x")
    (pprint build (writer dev-edn))))

(defn use-dev
  "copy 10x.cljs.edn to dev.cljs.edn, but remove the 10x configuration"
  []
  (println "switch to dev")
  (-> (edn/read-string (slurp template-edn))
      (update :closure-defines (fn [m] (assoc m "re_frame.trace.trace_enabled_QMARK_" false)))
      (update :preloads  (fn [preloads] (let [ps (remove #(= (symbol "day8.re-frame-10x.preload") %) preloads)]
                                          (if (pos? (count ps))
                                            (into [] ps)
                                            nil))))
      ((fn [build] (if (nil? (build :preloads)) 
                     (dissoc build :preloads)
                     build)))
      (pprint (writer dev-edn))))

(defn switch
  [mode]
  (case  mode
    "10x" (use-10x)
    "dev" (use-dev)
    nil (use-dev)
    (println mode "is not supported.")))

(switch (first *command-line-args*))