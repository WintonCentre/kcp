#!/usr/bin/env bb

; Run from the kcp project directory
; $ ./bb-scripts/switch-10x-dev.clj
;
; I may be wrong, but it is very hard to configure figwheel-main with webpack to easily switch
; between dev (witout 10x), dev (with 10x), and production without also needing different html.
; Since I waste a lot of time whenever I need to do this, here is a script that does what I need:
; 
; Run this script BEFORE jacking in to select the correct mode. 
; You can then always select 'dev' as the profile when jacking in, and run the generated 
; javascript from cljs-out/dev.
; 
; Usage for 10x: switch-10x-dev 10x
; Usage for dev: switch-10x-dev
; 
; New:
; Usage for prod: switch-10x-dev prod
;
; NOTE: We don't really need bb for this any more as we could now simply copy 
; the needed template into dev.cljs.edn.
; 
(ns switcher)
(require '[clojure.edn :as edn]
         '[clojure.java.io :refer [writer]]
         '[clojure.pprint :refer [pprint]])

(declare day8.re-frame-10x.preloads)

(def template-edn "10x.template.edn")
(def prod-edn "prod.template.edn")
(def dev-edn "dev.cljs.edn")

(defn use-10x
  "copy 10x.template.edn to qdev.cljs.edn unchanged"
  []
  (let [build (edn/read-string (slurp template-edn))]
    (println "switch to 10x")
    (pprint build (writer dev-edn))))

(defn use-dev
  "copy 10x.template.edn to dev.cljs.edn, but remove the 10x configuration"
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

(defn use-prod
  "copy prod.template.edn to dev.cljs.edn"
  []
  (println "switch to prod")
  (-> (edn/read-string (slurp prod-edn))
      (pprint (writer dev-edn))))

(defn switch
  [mode]
  (case  mode
    "10x" (use-10x)
    "dev" (use-dev)
    "prod" (use-prod)
    nil (use-dev)
    (println mode "is not supported.")))

(switch (first *command-line-args*))