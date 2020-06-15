(ns transplants.shared
  (:require [clojure.string :as string]))

;;
;; This section may be only runtime - but may go into config on
;;

(defn underscore
  "replace special chars in file paths with underscore"
  [s]
  (string/replace (if (keyword? s) (name s) s) #"-|\s+|'|\." "_"))
; (underscore "St George's") => "St_George_s"