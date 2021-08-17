#!/usr/bin/env bb
;; Code based on https://gist.github.com/roman01la/c6a2e4db8d74f89789292002794a7142
;; We converted it work with babashka. Start it with `bb re_frame_subscriptions.clj`

(ns re-frame-subscriptions
  (:require [clojure.set :as set]
            [babashka.pods :as pods]))

(pods/load-pod "clj-kondo")

(require '[pod.borkdude.clj-kondo :as clj-kondo])


;; checks re-frame's :<- syntax
;; to mark dependency subscriptions as used
(def analyze-reg-sub
  "(require '[clj-kondo.hooks-api :as api])
  (fn [{node :node}]
    (let [[_ kw & children] (:children node)
          reg-sub-kw (api/reg-keyword! kw 're-frame.core/reg-sub)
          reg-dep-kw! #(-> % :children first (api/reg-keyword! 're-frame.core/subscribe))
          sub-kws (map #(if (api/vector-node? %) (reg-dep-kw! %) %)
                       (butlast children))]
      {:node (api/list-node
               `(do ~reg-sub-kw ~@sub-kws ~(last children)))}))")

;; requires subscription name (keyword)
;; to be statically defined at the call site
;; i.e. `(subscribe [:my/sub])`
(def analyze-subscribe
  "(require '[clj-kondo.hooks-api :as api])
  (fn [{node :node}]
    (let [[_ query] (:children node)
          [kw & children] (:children query)]
      {:node (api/list-node
               `(do ~(api/reg-keyword! kw 're-frame.core/subscribe)
                    ~@children))}))")

(def out
  (clj-kondo/run!
    {:lint ["src"]
     :config {:output {:analysis {:keywords true}}
              :hooks {:__dangerously-allow-string-hooks__ true
                      :analyze-call {'re-frame.core/reg-sub analyze-reg-sub
                                     're-frame.core/subscribe analyze-subscribe}}}}))

(defn get-keywords-usages [var-name]
      (->> (:analysis out)
           :keywords
           (filter #(= var-name (:def %)))
           (map #(assoc % :kw (if (:ns %)
                                (keyword (str (:ns %)) (:name %))
                                (keyword (:name %)))))))

(defn find-unused-keywords [defs usages]
      (let [defs-set (into #{} (map :kw) defs)
            usages-set (into #{} (map :kw) usages)
            unused (set/difference defs-set usages-set)]
           (filter (comp unused :kw) defs)))

(defn find-usage-of-undefined-keywords [defs usages]
      (let [defs-set (into #{} (map :kw) defs)
            usages-set (into #{} (map :kw) usages)
            undefined (set/difference usages-set defs-set)]
           (filter (comp undefined :kw) defs)))

(defn fmt-message [warning-type {:keys [kw filename row]}]
      (-> (case warning-type
                :unused-subscription "Unused subscription")
          (str " " kw " at line " row " in " filename)))

(let [subs [(get-keywords-usages 're-frame.core/reg-sub)
            (get-keywords-usages 're-frame.core/subscribe)]
      unused-subs (apply find-unused-keywords subs)
      undefined-subs (apply find-usage-of-undefined-keywords subs)]
     (doseq [sub unused-subs]
            (println (fmt-message :unused-subscription sub))))