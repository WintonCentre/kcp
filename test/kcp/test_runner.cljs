;; This test runner is intended to be run from the command line
(ns kcp.test-runner
  (:require
    ;; require all the namespaces that you want to test
    [kcp.bsio-test]
    [kcp.spline-test]
    [kcp.bundles-test]
    #_[kcp.core-test]
    [figwheel.main.testing :refer [run-tests-async]]))

(comment
  
  ; only needed if running tests from the REPL
  (defn -main [& _args]
    (run-tests-async 5000))
  
  (-main))  