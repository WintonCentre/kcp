(ns kcp.fx
  (:require [clojure.edn :as edn]
            [re-frame.core :as rf]
            [reitit.frontend.easy :as rfe]
            [kcp.paths :as paths]
            [kcp.shortener :as shorts]
            ))



;;; Effects ;;;

;; Triggering navigation from events.
;; k is the route :name as defined in routes/routes
;; params are any url parameters
;; query is any query parameters
(rf/reg-fx
  ::navigate!
  (fn [[k params query]]
    ;(js/console.log "NAVIGATE!" k params query)
    (let [params (assoc params
                   :tool (get params :tool "ldsurvival")
                   :tab (get params :tab "bars")
                   :inputs (get params :inputs "-"))]
      (rfe/push-state k params query))))


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
      (goog.object.set js/document "title"
                       (condp = organ
                         :kidney "Kidney kcp"
                         :else "Metadata Error"))
      (rf/dispatch [:kcp.events/load-and-transpose-centres [(paths/centres-path organ) [:organ-centres organ]]]))))

(defn reg-factor
  "Register simple db subscription and event on a factor. Duplicate registrations are possible and will cause a console warning
   on startup. The final registration overwrites any previous ones. This function can be used to register db keys at run-time.
   Both subscription and event are registered on the organ-namespaced factor.
   Events happen when an input changes the value of a factor.
   Subscriptions access input values by the factor key."
  [organ-k factor-k]
  (let [ref-k (keyword (name organ-k) (name factor-k))]
    (rf/reg-sub ref-k (fn [db] (get-in db [:inputs factor-k])))
    (rf/reg-event-db ref-k (fn [db [_ v]]
                             (let [path (-> db :current-route :path-params)
                                   path-inputs (:inputs path)
                                   lookups (-> db :mdata :lookups)
                                   ilookups (-> db :mdata :ilookups)]


                               (if (and path-inputs lookups ilookups)
                                 (let [inputs (as-> path-inputs x
                                                    (shorts/URI-to-db ilookups x)
                                                    (assoc x factor-k v)
                                                    (shorts/db-to-URI lookups x))]

                                   (rf/dispatch [:kcp.events/navigate
                                                 :kcp.views/organ-centre-tool-tab-inputs
                                                 (assoc path
                                                   :tab (:tab path)
                                                   :inputs inputs)])))

                               (if (nil? v)
                                 (update-in db [:inputs] dissoc factor-k)
                                 (assoc-in db [:inputs factor-k] v)))))
    ))

(defn reg-factors
  "Function which registers all organ factors given in a seq of factor maps"
  [[organ fmaps]]
  ;  (?-> "reg-factors" ::reg-factors)
  (doseq [fmap fmaps]
    (reg-factor organ (:factor fmap))))

(rf/reg-fx :reg-factors reg-factors)