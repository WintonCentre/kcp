(ns transplants.fx
  (:require [clojure.edn :as edn]
            [re-frame.core :as rf]
            [reitit.frontend.easy :as rfe]
            [transplants.subs :as subs]
            [transplants.paths :as paths]
            [transplants.shortener :as shorts]
            [shadow.debug :refer [?-> locals]]
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

    (rf/reg-event-fx ref-k (fn [{:keys [db]} [_ v]]
                             ;; re-route to the URL with the newly changed input
                             ;(?-> (-> db :mdata :ilookups) ::metadata)
                             
                             (let [path (-> db :current-route :path-params)
                                   path-inputs (:inputs path)
                                   lookups (-> db :mdata :lookups)
                                   ilookups (-> db :mdata :ilookups)]

                               (if (and path-inputs lookups ilookups)
                                 (do
                                   (?-> (-> db :inputs) ::db-inputs)
                                   (?-> (as-> path-inputs x
                                          (shorts/URI-to-db ilookups x)
                                                                    ;js/decodeURI
                                                                    ;edn/read-string
                                          (assoc x factor-k v)
                                                                    ;pr-str x
                                          (shorts/db-to-URI lookups x)
                                                                    ;js/encodeURI x
                                          )::new-inputs)
                                   {:fx [:dispatch [:transplants.events/navigate
                                                    :transplants.views/organ-centre-tool-tab-inputs
                                                    (assoc path
                                                           :tab (:tab path)
                                                           :inputs (as-> path-inputs x
                                                                     (shorts/URI-to-db ilookups x)
                                                                    ;js/decodeURI
                                                                    ;edn/read-string
                                                                     (assoc x factor-k v)
                                                                    ;pr-str x
                                                                     (shorts/db-to-URI lookups x)
                                                                    ;js/encodeURI x
                                                                     ))]]
                                    #_#_:db (assoc-in db [:inputs organ-k factor-k] v)}))

                               {:db (assoc-in db [:inputs organ-k factor-k] v)})))
    
    #_(rf/reg-event-db ref-k (fn [db [_ v]]
    ;; todo: this works, but better to use rf/reg-event-fx here since we must now side-effect a navigation 
    ;; in order to make inputs appear in the URL.
                             ;; re-route to the URL with the newly changed input
                             ;(?-> (-> db :mdata :ilookups) ::metadata)

                               (let [path (-> db :current-route :path-params)
                                     path-inputs (:inputs path)
                                     lookups (-> db :mdata :lookups)
                                     ilookups (-> db :mdata :ilookups)]

                                 (when (and path-inputs lookups ilookups)
                                   (?-> (-> db :inputs) ::db-inputs)
                                   (?-> (as-> path-inputs x
                                          (shorts/URI-to-db ilookups x)
                                                                    ;js/decodeURI
                                                                    ;edn/read-string
                                          (assoc x factor-k v)
                                                                    ;pr-str x
                                          (shorts/db-to-URI lookups x)
                                                                    ;js/encodeURI x
                                          )::new-inputs)
                                   (rf/dispatch [:transplants.events/navigate
                                                 :transplants.views/organ-centre-tool-tab-inputs
                                                 (assoc path
                                                        :tab (:tab path)
                                                        :inputs (as-> path-inputs x
                                                                  (shorts/URI-to-db ilookups x)
                                                                    ;js/decodeURI
                                                                    ;edn/read-string
                                                                  (assoc x factor-k v)
                                                                    ;pr-str x
                                                                  (shorts/db-to-URI lookups x)
                                                                    ;js/encodeURI x
                                                                  ))])

                                   #_(assoc-in db [:inputs organ-k factor-k] v))


                             ;; EDIT-ME: Should we navigate to a new URL instead here?

                                 (assoc-in db [:inputs organ-k factor-k] v))))))

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



  

