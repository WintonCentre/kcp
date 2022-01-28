#!/usr/bin/env bb nrepl-server -- -g lung -t survival
(ns config)
  (require '[clojure.java.shell :as shell])

(shell/sh "clojure" 
          "-A:config" 
          "-X" "transplants.configure/main")

