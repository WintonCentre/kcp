#!/usr/bin/env bb --nrepl-server 1667
;
; To attach nrepl in Calva for babashka debug:
; 1) In a terminal run `bb --nrepl-server 1667`
; 2) Use ctl-alt-C ctl-alt-C and jack-in to "General"
; 3) Connect to localhost:1667 on the next prompt.
;
(require '[clojure.java.shell :refer [sh]]
         '[cheshire.core :as :json]
         )

(def home (.getProperty System "user.home"))
(def slash File/separator)

;
; Locate Dropbox path through ~/.dropbox/info.json 
; On my system it's under the "business" key
;
(def db-info (str home
                  slash ".dropbox"
                  slash "info.json"))
(def db-map (json/parse-string (slurp db-info)))
(def db-path (get-in db-map ["business" "path"]))
(def transplant (str db-path
                     slash "Winton Centre" 
                     slash "TRANSPLANT"
                     slash "configuration"))
(def kidney (str "resources" slash "kidney-models-master.xlsx"))
(def lung (str "resources" slash "lung-models-master.xlsx"))

(comment
  (sh "pwd")
  (sh "ls" lung)
  (sh "ls" kidney)
  (sh "ls" transplant))

; publish the xlsx on dropbox
(:exit (sh "cp" lung kidney transplant))
