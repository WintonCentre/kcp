(ns transplants.fx
  (:require [re-frame.core :as rf]
            [reitit.frontend.easy :as rfe]
            [ajax.core :refer [GET]])
  )

;;; Effects ;;;

;; Triggering navigation from events.
;; k is the route :name as defined in routes/routes
;; params are any url parameters
;; query are any query parameters
(rf/reg-fx
 ::navigate!
 (fn [k params query]
   (println "NAVIGATE!" k params query)
   (rfe/push-state k params query)))


;; Loading edn files from the database
(rf/reg-fx)
::dispatch
(fn [[event-key event-params]]
  (rf/dispatch [event-key event-params]))

(defn path-to-tool-data 
  [tool-key]
  "/numerics.edn"
  )

(rf/reg-fx
 ::load
 (fn [[tool-key route]]
   (let [url (path-to-tool-data tool-key)]
     (GET url
       {:error-handler #(js/alert "error loading " url)
        :handler #(rf/dispatch [:events/navigate route])
        :format :transit}))))

(comment
  ; from predict code
  #_(defn get-dictionary
    "read dictionary ops from a url.
  USED IN PRODUCTION DICTIONARY LOAD"
    ([url {:keys [on-error handler]}]
     (GET url {:error-handler file-error                      ;on-error
               :handler       handler
               :format        :transit                        ;:transit
               })))

;;
;; load translation state; Call this to set up the translation system
;;
#_(defn load-translations*
  "load the initial dictionary into the rtdb t-state.
  local dictionary-url is the relative url to a txt file containing :upsert and :switch commands.
  At runtime, the callback handler is usually a call to handle-dictionary with ref bound to the t-state-change cursor.
  At test time this may be different.

  USED IN PRODUCTION DICTIONARY LOAD"
  ([local-dictionary-url handler]
   (get-dictionary
    local-dictionary-url {:headers {"Cache-Control" "no-store"}
                          :on-error file-error
                          :handler  handler})))



  )

