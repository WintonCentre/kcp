#!/usr/bin/env bb

(ns test-runner
  (:require 
            [clojure.test :as t]
            [babashka.classpath :as cp]
            ))

(cp/add-classpath "bbsrc:bbtest")
(require 'prepare-test-data 'test-params)

(def test-results
  (t/run-tests 'test-params))

(def failures-and-errors
  (let [{:keys [:fail :error]} test-results]
    (+ fail error)))

(System/exit failures-and-errors)