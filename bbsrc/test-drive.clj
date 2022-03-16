(ns test-drive
  "Test drive the site using etaoin. You will need to download, install, and configure the relevant 
   browser driver for etaoin to connect to."
  (:require [clojure.pprint :refer [pprint]]
            [clojure.edn :as edn]
            [clojure.set :as rel]
            [clojure.string :as str]
            [clojure.java.shell :refer [sh]]
            [clojure.java.io :as io]
            [clojure.tools.cli :refer [parse-opts]]
            [babashka.classpath :refer [add-classpath]]
            [babashka.pods :as pods]))

(pods/load-pod 'org.babashka/etaoin "0.1.0")

(require '[pod.babashka.etaoin :as eta]
         '[pod.babashka.etaoin.keys :as k])

;; We add the classpath here so we can access it easily from the Calva Babashka REPL.
(add-classpath "bbsrc:src:resources")
;(require '[transplants.shortener :as short]) ; gain access to the .cljc 


(def organ "kidney")

(defn site
  "Return a site address, defaulting to the local site if the id isn't known"
  [site-id]
  (get
   {:kidney "kidney.transplants.wintoncentre.uk/"
    :lung "lung.transplants.wintoncentre.uk/"
    :local "localhost:3000/"}
   (keyword site-id)
   "localhost:3000/"))

(defn credentials
  "get credentials in URI form"
  [username password]
  (when (and username password)
    (str username ":" password "@")))

(defn uri
  "Return a URI for a site"
  [{:keys [site-name username password]}]
  (str "https://" (credentials username password) (site site-name)))

(defn env [s] (java.lang.System/getenv s))

(defn usage
  "Usage message"
  ([] (usage nil))
  ([err-msg]
   (when err-msg (println err-msg))
   (println "Usage placeholder")))

;;;
;; main
;;;
(def cli-options [["-s" "--site site-id" "lung or kidney or local)"
                   :default "kidney"
                   :parse-fn str
                   :validate [#(#{"kidney" "lung" "local"} %) "kidney | lung | local"]]
                  ["-d" "--driver driver" "gecko for FF, or chrome for chrome)"
                   :default "chrome"
                   :parse-fn str
                   :validate [#(#{"gecko" "chrome"} %) "gecko | chrome"]]
                  ["-h" "--help"]])

(defn -main [& _args]
  (let [{:keys [options errors]} (parse-opts *command-line-args* cli-options)]
    (if errors
      (let [msg (str "Encountered one or more errors: " (str/join ", " errors))]
        (usage msg)
        (System/exit 1))
      (let [{:keys [site driver]} options]
        (println "site " site)
        (println "driver " driver)
        #_(System/exit 0)))))
  
    

(-main)

(comment
  (usage)

  (env "HOME")
  ;; => "/Users/gmp26"

  ;; We don't want credentials in github, so set them locally in the environment first
  (uri {:site-id :kidney
        :username (env "T_USER")
        :password (env "T_PWD")})

  (uri {:site-id :local})
  ;; => "https://localhost:3000/"
  )


#_(def driver (eta/firefox))  ;; here, a Firefox window should appear
(def driver (eta/chrome)) ;; or a chrome window
;(def driver (eta/firefox-headless))

;; let's perform a quick Wiki session
(eta/go driver "https://winton:development55@kidney.transplants.wintoncentre.uk/")
(eta/wait-visible driver [{:id :simpleSearch} {:tag :input :name :search}])

;; search for something
(eta/fill driver {:tag :input :name :search} "Clojure programming language")
(eta/fill driver {:tag :input :name :search} k/enter)
(eta/wait-visible driver {:class :mw-search-results})

;; I'm sure the first link is what I was looking for
(eta/click driver [{:class :mw-search-results} {:class :mw-search-result-heading} {:tag :a}])
(eta/wait-visible driver {:id :firstHeading})

;; let's ensure
(prn (eta/get-url driver)) ;; "https://en.wikipedia.org/wiki/Clojure"

(prn (eta/get-title driver)) ;; "Clojure - Wikipedia"

(prn (eta/has-text? driver "Clojure")) ;; true

;; navigate on history
(eta/back driver)
(eta/forward driver)
(eta/refresh driver)
(prn (eta/get-title driver)) ;; "Clojure - Wikipedia"

;; stops Firefox and HTTP server
(eta/quit driver)
nil
