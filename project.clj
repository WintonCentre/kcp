(defproject transplants "0.1.0-SNAPSHOT"
  :dependencies [[org.clojure/clojure "1.10.1"]
                 [org.clojure/clojurescript "1.10.764"
                  :exclusions [com.google.javascript/closure-compiler-unshaded
                               org.clojure/google-closure-library
                               org.clojure/google-closure-library-third-party]]
                 [thheller/shadow-cljs "2.10.0"] ; was "2.9.3"
                 [reagent "0.10.0"]
                 [re-frame "0.12.0"]
                 [day8.re-frame/tracing "0.5.5"]
                 [day8.re-frame/http-fx "v0.2.0"]
                 [metosin/reitit "0.4.2"]
                 [cljs-ajax "0.7.3"]
                 [winton-utils "0.2.1"]
                 ]

  :plugins [[lein-shell "0.5.0"]
            [lein-shadow "0.2.0"]
            [lein-eftest "0.5.9"]
            [lein-auto "0.1.3"]
            ; checkout `lein help sass4clj`
            [deraen/lein-sass4clj "0.5.1"]]

  :min-lein-version "2.9.0"

  :source-paths ["src/cljs"]
  :test-paths ["test/cljs"]
  :clean-targets ^{:protect false} ["resources/public/js/compiled" "target"
                                    "test/js"]

  :shell {:commands {"open" {:windows ["cmd" "/c" "start"]
                             :macosx  "open"
                             :linux   "xdg-open"}}}
  
  :main  transplants.configure/-main
  
  :npm-deps {;"bootstrap" "^4.5.0"
             "highlight.js" "9.18.1"
             "react" "16.13.0"
             "react-dom" "16.13.0"
             "react-bootstrap" "^1.0.1"
             }
  :npm-dev-deps {"shadow-cljs"           "2.9.3"
                 "karma"                 "4.4.1"
                 "karma-chrome-launcher" "3.1.0"
                 "karma-cljs-test"       "0.1.0"
                 "karma-junit-reporter"  "2.0.1"}
  
  :shadow-cljs {:nrepl {:port 8777}
                :dev-http {8100 "public"}

                :builds {:app {:target :browser
                               :output-dir "resources/public/js/compiled"
                               :asset-path "/js/compiled"
                               :modules {:app {:init-fn transplants.core/init
                                               :preloads [devtools.preload
                                                          day8.re-frame-10x.preload]}}
                               :dev {:compiler-options {:closure-defines {re-frame.trace.trace-enabled? true
                                                                          day8.re-frame.tracing.trace-enabled? true}}}
                               :release {:build-options
                                         {:ns-aliases
                                          {day8.re-frame.tracing day8.re-frame.tracing-stubs}}}
                               :devtools {:http-root "resources/public"
                                          :http-port 8280
                                          :after-load transplants.core/init}}

                         :browser-test
                         {:target :browser-test
                          :ns-regexp "-test$"
                          :runner-ns shadow.test.browser
                          :test-dir "target/browser-test"
                          :devtools {:http-root "target/browser-test"
                                     :http-port 8290}}

                         :karma-test
                         {:target :karma
                          :ns-regexp "-test$"
                          :output-to "target/karma-test.js"}}}
  
  
  :aliases {"check" ["with-profile" "configure" "auto" "eftest"]
            "config" ["with-profile" "configure" "do" "run" "-m" "transplants.configure"]
            "dev"          ["with-profile" "dev" "do"
                            ["shadow" "watch" "app"]]
            "prod"         ["with-profile" "prod" "do"
                            ["shadow" "release" "app"]]
            "build-report" ["with-profile" "prod" "do"
                            ["shadow" "run" "shadow.cljs.build-report" "app" "target/build-report.html"]
                            ["shell" "open" "target/build-report.html"]]
            "karma"        ["with-profile" "prod" "do"
                            ["shadow" "compile" "karma-test"]
                            ["shell" "karma" "start" "--single-run" "--reporters" "junit,dots"]]}


  :profiles {:dev {:dependencies [[binaryage/devtools "1.0.0"]
                                  [day8.re-frame/re-frame-10x "0.6.4"]
                                  [clj-kondo "2020.05.09"]]
                   :source-paths ["dev"]}

             :test {:dependencies [[binaryage/devtools "1.0.0"]
                                   [eftest "0.5.9"]]
                    :source-paths ["dev"]
                    :test-paths   ["test/cljs"]}
             
             :karma {:source-paths ["src/cljs" "test/cljs"]
                     :test-paths ["test/cljs"]}

             :configure {:source-paths ["src/clj" "data"]
                         :test-paths ["test/clj" "src/clj" "data"]
                         :dependencies [[aero "1.1.6"]
                                        [org.apache.poi/poi "3.17"]
                                        [org.apache.poi/poi-ooxml "3.17"]
                                        [dk.ative/docjure "1.13.0"]
                                        [org.apache.commons/commons-math3 "3.6.1"]
                                        [org.clojure/data.csv "1.0.0"]]}

             :prod {}}

  :prep-tasks [#_[sass4clj "once"]])
