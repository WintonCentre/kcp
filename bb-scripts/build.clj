#!/usr/bin/env bb

(ns build)
  (require '[clojure.java.shell :as shell]
           '[clojure.edn :as edn]
           '[clojure.pprint :refer [pprint]]
           '[clojure.java.io :refer [writer]])

(defn use-prod
  "copy prod.template.edn to dev.cljs.edn"
  []
  (try
    (-> (edn/read-string (slurp "prod.template.edn"))
        (pprint (writer "dev.cljs.edn")))
    (catch Exception e
      (println (str ">>-switch error " (.getMessage e) " -<<"))
      (System/exit 1))))

;------

(println "==> npm install")
(let [{:keys [:exit :err :out]} (shell/sh "npm" "install")]
  (if (zero? exit) 
    (do (println out)
        (println "<== npm install done"))
    (do (println ">>- npm install ERROR: -<<" err)
        (System/exit 1))))

(println "==> switch to production build")
(use-prod)
(println "<== switch to production done")

(println "==> generate configuration data")
; Alternatively use 'lein config', 
; but this method avoids a dependency on leiningen
(let [{:keys [:exit :err :out]} 
      #_(shell/sh "clj" "-M:config" "-m" "transplants.configure")
      (shell/sh "clj" "-A:config" "-m" "transplants.configure")]
  (if (zero? exit)
    (do (println out)
        (println "<== configuration done"))
    (do (println ">>- configuration ERROR: -<<" err)
        (System/exit 1))))

(println "==> Compile the TRAC tool")
; Alternatively use 'lein config', 
; but this method avoids a dependency on leiningen
(let [{:keys [:exit :err :out]}
      (shell/sh "clj" "-A:fig:prod")]
  (if (zero? exit)
    (do (println out)
        (println "<== TRAC tool created"))
    (do (println ">>- TRAC tool compilation error: -<< " err)
        (System/exit 1))))
