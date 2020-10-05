;; This test runner is intended to be run from the command line
(ns transplants.test-runner
  (:require
    ;; require all the namespaces that you want to test
    [transplants.bsio-test]
    [transplants.spline-test]
    #_[transplants.core-test]
    [figwheel.main.testing :refer [run-tests-async]]))


(defn -main [& args]
  (run-tests-async 5000))

;; uncomment to run tests
(-main)
  