(ns transplants.fullscreen
  "Wraps components so they can be switched in and out of full screen mode."
  (:require ["react-request-fullscreen" :as fs :default FullScreen]
            ;["react-request-fullscreen/dist/bundle/FullScreen" :default FullScreen]
            ["react-bootstrap" :as bs]
            [re-frame.core :as rf]
            [reagent.core :as rc]
            [transplants.events :as events]
            [transplants.subs :as subs]))

;;;;; Experimental FullScreen support
;; See: https://github.com/reagent-project/reagent/blob/master/doc/FAQ/UsingRefs.md
;; See: https://www.npmjs.com/package/react-request-fullscreen
;; See: https://www.npmjs.com/package/react-easyfullscreen


(defn small-text-button
  [{:keys [on-click label tool-tip]}]
  [:> bs/Button {:size "sm"
                 :variant "outline"
                 :class-name "more"
                 :title tool-tip
                 :on-click on-click}
   [:span label]])


(defn full-screen-button
  [ref]
  (when (fs/fullScreenSupported)
    (if @(rf/subscribe [::subs/is-full-screen])
      [small-text-button {:label "Escape Full Screen"
                            :on-click #(do (js/console.log "hello " ref)
                                           (.fullScreen ref)
                                           (rf/dispatch [::events/set-full-screen nil]))}]
      [small-text-button {:label "Full Screen"
                          :on-click #(do (js/console.log "there" ref)
                                         (.fullScreen ref)
                                         (rf/dispatch [::events/set-full-screen true]))}])))

#_(defn full-screen-wrapper
  "Wrap a component with fullscreen capability"
  [content options]
  (let [state (atom 10)]   ; I think not a reagent atom here?
    (fn [content options]
      [:> FullScreen {:ref #(reset! state %)}
       #_(.fullScreen @state)
       (js/console.log "current: " state)
       ;[full-screen-button @state]
      ])))

(defn full-screen-wrapper
  "Wrap a component with fullscreen capability"
  [content options]
  (let [state (rc/atom 10)]   ; I think not a reagent atom here?
    (rc/create-class
     {:display-name "full-screen-wrapper"
      ;:component-did-mount (fn [this] (js/console.log "did-mount"))

      :reagent-render
      (fn [content options]
        [:> FullScreen {:ref #(reset! state %)}
         [full-screen-button @state]
         [content options]])})))

(comment
  (fs/fullScreenSupported)
  ;; => true
  )
