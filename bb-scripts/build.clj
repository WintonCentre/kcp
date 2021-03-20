#!/usr/bin/env bb

(ns build)
  (require '[clojure.java.shell :as shell])

(println "==> npm install")
(let [{:keys [:exit :err :out]} (shell/sh "npm" "install")]
  (if (zero? exit) 
    (do (println out)
        (println "<== npm install done"))
    (do (println ">>- npm install ERROR: -<<" err)
        (System/exit 1))))

(println "==> Generate configuration data")
; Alternatively use 'lein config', 
; but this method avoids a dependency on leiningen
(let [{:keys [:exit :err :out]} 
      #_(shell/sh "clj" "-M:config" "-m" "transplants.configure")
      (shell/sh "clojure" "-A:config" "-X" "transplants.configure")]
  (if (zero? exit)
    (do (println out)
        (println "<== configuration done"))
    (do (println ">>- configuration ERROR: -<<" err)
        (System/exit 1))))

(println "==> Compile the TRAC tool")
(let [{:keys [:exit :err :out]}
      (shell/sh "npm" "run" "build")]
  (if (zero? exit)
    (do (println out)
        (println "<== TRAC tool created"))
    (do (println ">>- TRAC tool compilation error: -<< " err)
        (System/exit 1))))
