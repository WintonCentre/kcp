(ns transplants.shared
  (:require [clojure.string :as string]))

;;
;; todo: Could move this to the config process?
;;
(defn underscore
  "replace special chars in file paths with underscore"
  [s]
  (string/replace (if (keyword? s) (name s) s) #"-|\s+|'|\." "_"))
; (underscore "St George's") => "St_George_s"


