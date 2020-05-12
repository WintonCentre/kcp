(defproject transplants "0.1.0-SNAPSHOT"
  :dependencies [[org.clojure/clojure "1.10.1"]
                 [org.clojure/clojurescript "1.10.758"
                  :exclusions [com.google.javascript/closure-compiler-unshaded
                               org.clojure/google-closure-library
                               org.clojure/google-closure-library-third-party]]
                 [thheller/shadow-cljs "2.9.2"]
                 [reagent "0.9.1"]
                 [re-frame "0.11.0"]
                 [metosin/reitit "0.4.2"]
                 [reagent "1.0.0-alpha1"]
                 [re-frame "0.12.0"]
                 [metosin/reitit "0.4.2"]
                 [cljs-ajax "0.7.3"]]

  :plugins [[lein-shell "0.5.0"]
            [lein-eftest "0.5.9"]
            [lein-auto "0.1.3"]
            ; checkout `lein help sass4clj`
            [deraen/lein-sass4clj "0.5.1"]]

  :min-lein-version "2.5.3"

  :source-paths ["src/cljs"]

  :clean-targets ^{:protect false} ["resources/public/js/compiled" "target"
                                    "test/js"]

  :shell {:commands {"open" {:windows ["cmd" "/c" "start"]
                             :macosx  "open"
                             :linux   "xdg-open"}}}
  
  :main "transplants.configure/-main"

  :aliases {"check" ["with-profile" "configure" "auto" "eftest"]
            "config" ["with-profile" "configure" "do" "run" "-m" "transplants.configure"]
            "dev"          ["with-profile" "dev" "do"
                            ["run" "-m" "shadow.cljs.devtools.cli" "watch" "app"]]
            "example"          ["with-profile" "dev" "do"
                                ["run" "-m" "shadow.cljs.devtools.cli" "watch" "example"]]
            "prod"         ["with-profile" "prod" "do"
                            ["run" "-m" "shadow.cljs.devtools.cli" "release" "app"]]
            "build-report" ["with-profile" "prod" "do"
                            ["run" "-m" "shadow.cljs.devtools.cli" "run" "shadow.cljs.build-report" "app" "target/build-report.html"]
                            ["shell" "open" "target/build-report.html"]]
            "karma"        ["with-profile" "prod" "do"
                            ["run" "-m" "shadow.cljs.devtools.cli" "compile" "karma-test"]
                            ["shell" "karma" "start" "--single-run" "--reporters" "junit,dots"]]}

  :profiles {:dev {:dependencies [[binaryage/devtools "1.0.0"]]
                   :source-paths ["dev"]}

             :test {:dependencies [[binaryage/devtools "1.0.0"]
                                   [eftest "0.5.9"]]
                    :source-paths ["dev"]
                    :test-paths   ["test/cljs"]}

             :configure {:source-paths ["src/clj" "data"]
                         :test-paths ["test/clj" "src/clj" "data"]
                         :dependencies [[aero "1.1.6"]
                                        [org.apache.poi/poi "3.17"]
                                        [org.apache.poi/poi-ooxml "3.17"]
                                        [dk.ative/docjure "1.13.0"]
                                        [org.apache.commons/commons-math3 "3.6.1"]
                                        [org.clojure/data.csv "1.0.0"]]}

             :prod {:dependencies []}}

  :prep-tasks [])
