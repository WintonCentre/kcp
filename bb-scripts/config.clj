(ns config)
#!/usr/bin/env bb

(ns config)
  (require '[clojure.java.shell :as shell])

(shell/sh "clojure" 
          "-A:config" 
          "-X" "transplants.configure/-main")

