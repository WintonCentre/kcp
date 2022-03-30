(ns test-drive
  "Babashka code to test drive the site model using etaoin. 
   
   You will need to download, install, and configure the relevant 
   browser driver for the browser you want to test. Safaridriver is pre-installed on OSX. Firefox needs
   geckodriver. Drivers are closely tied to browser versions so do check you have the correct one installed.

   The main site is instrumented so it can generate results from uris that contain inputs like this:
   https//kidney.transplants.wintoncentre.uk/kidney/belf/survival/test/huA2SfBaDyl1EbMeGrdysnW1a2
   where the selected visualisation is 'test'. 
   
   The trailing alphabet soup encodes the inputs.

   We use etaoin to load a browser driver with those inputs, and to read off the site results. 
   
   We also need to poke those same inputs into the R code, generate its results and then compare.
   "
  (:require [clojure.pprint :refer [pprint]]
            [clojure.edn :as edn]
            [clojure.set :as rel]
            [clojure.string :as str]
            [clojure.java.shell :refer [sh]]
            [clojure.java.io :as io]
            [clojure.tools.cli :refer [parse-opts]]
            [babashka.classpath :refer [add-classpath]]
            ;[clojure.test :as t :refer [deftest testing is are]]
            [babashka.pods :as pods]))

(pods/load-pod 'org.babashka/etaoin "0.1.0")

(require '[clojure.test :as t :refer [deftest testing is]]
         '[pod.babashka.etaoin :as eta]
         '[pod.babashka.etaoin.query :as q]
         '[pod.babashka.etaoin.keys :as k]
         '[prepare-test-data :as prep])


(def file-sep (java.lang.System/getProperty "file.separator"))

;; We add the classpath here so we can access it easily from the Calva Babashka REPL.
(add-classpath "bbsrc:src:resources")
;(require '[transplants.shortener :as short]) ; gain access to the .cljc 

(defn env [s] (java.lang.System/getenv s))

(defn invoked-by-command-line?
  "See https://book.babashka.org/_/recipes.html#main_file. 
  If false we are probably in a REPL."
  []
  (= (System/getProperty "babashka.file") *file*))

(def drivers
  {"chrome" eta/chrome
   "ff" eta/firefox
   "safari" eta/safari
   "edge" eta/edge})

;;;
;; Following block isn't so useful in babashka as it turns out. The etaoin pod doesn't yet support
;; scrolling, so a fixture for uri wrpping by multiple deftests isn't so useful. This code would
;; make more sense in clojure+etaoin on the JVM. So leaving it for now
;;;
(defn get-site
  "Return a site address, defaulting to the local site if the id isn't known"
  [site-name]
  (get
   {"kidney" "kidney.transplants.wintoncentre.uk/"
    "lung" "lung.transplants.wintoncentre.uk/"
    "local" "localhost:3000/"}
   site-name
   "localhost:3000/"))

(defn uri
  "Return a URI to test. Get credentials from T_USER and T_PWD environment variables.
   site-id as used in 'sites' lookup
   The organ should be 'lung' or 'kidney' as a string
   centre should be a short centre code from centres.txt
   tool should be a string
   inputs should already be in URI string form - like A2SmBoDyEaMeGfdysn
   "
  [site-id organ tool inputs]
  (str
   (if (= site-id "local")
     (str (get-site site-id))
     (str "https://" (env "T_USER") ":" (env "T_PWD") "@" (get-site site-id)))
   "/"
   organ
   "/"
   tool
   "/test/"
   inputs))




(declare driver)
(declare sites [])
(def sites ["kidney.transplants.wintoncentre.uk/kidney/belf/waiting/test/A2SmBoDyEaMeGfdysn"
            "kidney.transplants.wintoncentre.uk/kidney/camb/waiting/test/A2SmBoDyEaMeGfdysn"])
(declare site)

;; global vars needed in the fixture. 
;(def driver "chrome") 
;(def site (uri "kidney"))

;;;
;; This lot later....
;; (deftest tester
;;   (testing "Tool loads and executes"
;;     (eta/go driver site)
;;     (eta/wait-visible driver {:id "uri-result"})
;;       (is (eta/exists? driver {:id "uri-result"}) "uri-result")
;;     (eta/quit driver)))


;; (defn use-driver
;;     "I had trouble getting this working, but I think that was due to chromedriver issues. geckodriver appears to be better"
;;     [driver-id uri]
;;     (with-redefs [driver ((get drivers driver-id))]
;;     ;(def driver ((get drivers driver-id)))
;;       (t/use-fixtures :each
;;         (fn [f]
;;           (eta/go driver uri)
;;           (f)
;;           (eta/quit driver)))))
;;;


;; Run `bb lung` or `bb kidney`  first
(def metadata (edn/read-string (slurp (io/resource (str "public" file-sep "metadata.txt")))))
(def organ-k (-> metadata :organ-order first))
(def tools (-> metadata organ-k :tool-order))
(def vis "test")
(def waiting (-> metadata :kidney :tools :waiting keys))
(def parameters (-> metadata :lookups))

(def m-keys (-> metadata organ-k keys))
(defn selected-data-points
  []
  (let [organ-k (-> metadata :organ-order first)]
    {:organ (-> metadata organ-k)
     :tools (-> metadata)}))

(defn urls-to-test
  [centre tool])
(defn collect-results
  "Plan:
   1. Select test points?
   2. Convert test points to URI codes
   3. Construct URIs
   4. Call driver to optain results
   5. Write results"
  [])


(comment
  (-main)
  (def driver-id "chrome")
  (def d (eta/chrome))
  (eta/go d "https://winton:development55@kidney.transplants.wintoncentre.uk/kidney/belf/waiting/test/A2SmBoDyEaMeGfdysn")

  (def options {:centre "Belfast", :organ "kidney", :tool "waiting"})
  ;; => #'test-drive/options

  (keys (prep/clj-info-by-clj-factor options))

  (def info (prep/clj-info-by-clj-factor options))

  (keys info)
  ;; => (:age :sex :blood-group :dialysis :ethnicity :matchability :graft :diabetes :sensitised)
  
  (map keys (:ethnicity info))
  ;; => ((:beta-transplant :beta-death :beta-removal :factor :level :r-name :r-names :r-link) (:beta-transplant :beta-death :beta-removal :factor :level :r-name :r-names :r-link) (:beta-transplant :beta-death :beta-removal :factor :level :r-name :r-names :r-link) (:beta-transplant :beta-death :beta-removal :factor :level :r-name :r-names :r-link) (:beta-transplant :beta-death :beta-removal :factor :level :r-name :r-names :r-link) (:beta-transplant :beta-death :beta-removal :factor :level :r-name :r-names :r-link))

  (map :factor (:ethnicity info))
  ;; => (:ethnicity :ethnicity :ethnicity :ethnicity :ethnicity :ethnicity)

  (map :level (:ethnicity info))
  ;; => (:asian :black :chinese :mixed :white :other)

  (map :r-name (:ethnicity info))
  ;; => ("eth_nonwhite" "eth_nonwhite" "eth_nonwhite" "eth_nonwhite" "eth_white" "eth_nonwhite")

  (map :r-names (:ethnicity info))
  ;; => (["tx_eth_nonwhite" "dth_eth_nonwhite" "rem_eth_nonwhite"] ["tx_eth_nonwhite" "dth_eth_nonwhite" "rem_eth_nonwhite"] ["tx_eth_nonwhite" "dth_eth_nonwhite" "rem_eth_nonwhite"] ["tx_eth_nonwhite" "dth_eth_nonwhite" "rem_eth_nonwhite"] ["tx_eth_white" "dth_eth_white" "rem_eth_white"] ["tx_eth_nonwhite" "dth_eth_nonwhite" "rem_eth_nonwhite"])

  (map :r-link (:ethnicity info))
  ;; => (nil nil nil nil nil nil)

  ;; => (nil nil nil nil nil nil)

  ;; => (:asian :black :chinese :mixed :white :other)

  (map keys (:ethnicity info))
  0
  )

;;;
;; main
;;;
(defn usage
  "Usage message"
  ([] (usage nil))
  ([err-msg]
   (when err-msg (println err-msg))
   (println "See bb.edn for examples such as\n
             bb --file ./bbsrc/test-drive.clj -d chrome -s kidney")))

(def cli-options [["-s" "--site-id site-id" "lung or kidney or local"
                   :default "kidney"
                   :parse-fn str
                   :validate [#(#{"kidney" "lung" "local"} %) "kidney | lung | local"]]
                  ["-d" "--driver-id driver-id" "ff for Firefox geckodriver, chrome, safari, edge"
                   :default "chrome"
                   :parse-fn str
                   :validate [#(#{"ff" "chrome" "safari" "edge"} %) "gecko | chrome | safari | edge"]]
                  ["-h" "--help"]])

(defn -main [& _args]
  (let [parsed-options (parse-opts *command-line-args* cli-options)]
    (println "parsed-options: " parsed-options)
    (if-let [errors (:errors parsed-options)]
      (let [msg (str "Encountered one or more errors: " (str/join ", " errors))]
        (usage msg)
        (System/exit 1))
      (let [{:keys [driver-id site-id]} (:options parsed-options)]
        ;;
        ;; I should be using var or with-redefs rather than def here
        ;;
        (def driver ((get drivers driver-id)))
        (def site (sites 0))
        (println "site: " site)
        (println "Testing: " site " in " driver-id)
        (t/run-tests)

        (when (invoked-by-command-line?)
          (System/exit 0))))))

(when (invoked-by-command-line?)
  (try
    (-main)
    (catch Exception e (.getMessage e))))


(comment


  (def driver ((get drivers "chrome")))

  (eta/go driver "https://winton:development55@kidney.transplants.wintoncentre.uk/kidney/belf/waiting/test/A2SmBoDyEaMeGfdysn")
  (eta/wait-visible driver {:id "uri-result"})
  (eta/get-element-text driver {:id "uri-result"})

  (eta/wait-visible driver "//*[@id=\"app\"]/div/nav/a[2]")
  (eta/click driver "//*[@id=\"app\"]/div/nav/a[2]")
  (eta/wait-visible driver "/html/body/div/div/div/div[1]/div/div/div/button[1]")
  (eta/click driver "/html/body/div/div/div/div[1]/div/div/div/button[1]")



  (uri "kidney")

  ;; fixture generators
  ;; (use-driver "chrome" "kidney")
  ;; => {test-drive {:babashka.impl.clojure.test/once-fixtures (#object[sci.impl.fns$fun$arity_1__7325 0x56fff7e0 "sci.impl.fns$fun$arity_1__7325@56fff7e0"])}}

  ;; (use-driver "ff" "local")
  ;; => {test-drive {:babashka.impl.clojure.test/once-fixtures (#object[sci.impl.fns$fun$arity_1__7325 0x63a24a3c "sci.impl.fns$fun$arity_1__7325@63a24a3c"])}}

  ;; (use-driver "safari" "local")

  ((get drivers "chrome"))

  (t/run-tests)

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

