(ns transplants.fx
  (:require [clojure.edn :as edn]
            [re-frame.core :as rf]
            [reitit.frontend.easy :as rfe]
            [transplants.paths :as paths]
            ; :refer [?-> locals]]
            ))



;;; Effects ;;;

;; Triggering navigation from events.
;; k is the route :name as defined in routes/routes
;; params are any url parameters
;; query is any query parameters
(rf/reg-fx
 ::navigate!
 (fn [[k params query]]
   (println "NAVIGATE!" k params query)
   (rfe/push-state k params query)))


;; Loading edn files from the database
(rf/reg-fx
::dispatch
(fn [[event-key event-params]]
  (rf/dispatch [event-key event-params])))

(rf/reg-fx
 ::load-organ-centres
 (fn [organs]
   ;; We now only ever have ONE organ - so just take the first 
   (let [organ (first organs)]
     ;(locals)
     (goog.object.set js/document "title"
                      (condp = organ
                        :lung "Lung Transplants"
                        :kidney "Kidney Transplants"
                        :else "Metadata Error"))
     (rf/dispatch [:transplants.events/load-and-transpose-centres [(paths/centres-path organ) [:organ-centres organ]]]))))
  
(defn reg-factor
  "Register simple db subscription and event on a factor. Duplicate registrations are possible and will cause a console warning
   on startup. The final registration overwrites any previous ones. This function can be used to register db keys at run-time.
   Both subscription and event are registered on the organ-namespaced factor.
   Events happen when an input changes the value of a factor.
   Subscriptions access input values by the factor key."
  [organ-k factor-k]
  (let [ref-k (keyword (name organ-k) (name factor-k))]
    (rf/reg-sub ref-k (fn [db] (get-in db [:inputs organ-k factor-k])))
    ;; todo: this works, but better to use rf/reg-event-fx here since we must now side-effect a navigation 
    ;; in order to make inputs appear in the URL.
    (rf/reg-event-db ref-k (fn [db [_ v]]
                             ;; re-route to the URL with the newly changed input
                             #_(?-> [v (-> db
                                         :current-route
                                         :path-params
                                         :inputs)] ::current-route)

                             (let [path (-> db :current-route :path-params)
                                   path-inputs (:inputs path)]
                               (if path-inputs
                                 (do
                                   #_(?-> path ::path)
                                   #_(?-> (-> path-inputs
                                            js/decodeURI
                                            edn/read-string
                                            (assoc factor-k v)
                                            pr-str
                                            js/encodeURI) ::assoc-inputs)
                                   (rf/dispatch [:transplants.events/navigate
                                                 :transplants.views/organ-centre-tool-tab-inputs
                                                 (assoc path
                                                        :tab (:tab path)
                                                        :inputs (-> path-inputs
                                                                    js/decodeURI
                                                                    edn/read-string
                                                                    (assoc factor-k v)
                                                                    pr-str
                                                                    js/encodeURI))])
                                   (assoc-in db [:inputs organ-k factor-k] v))
                                 

                             ;; EDIT-ME: Should we navigate to a new URL instead here?

                                 (assoc-in db [:inputs organ-k factor-k] v)))))))

(defn reg-factors
  "Function which registers all organ factors given in a seq of factor maps"
  [[organ fmaps]]
  (doseq [fmap fmaps]
    (reg-factor organ (:factor fmap))))

(rf/reg-fx :reg-factors reg-factors)
  

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



  

