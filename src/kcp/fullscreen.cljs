(ns kcp.fullscreen
  "Wraps components so they can be switched in and out of full screen mode."
  (:require ["react-request-fullscreen" :as fs :default FullScreen]
            ;["react-request-fullscreen/dist/bundle/FullScreen" :default FullScreen]
            ["react-bootstrap" :as bs]
            [re-frame.core :as rf]
            [reagent.core :as rc]
            [kcp.events :as events]
            [kcp.subs :as subs]))

;;;;; Experimental FullScreen support
;; See: https://www.npmjs.com/package/react-request-fullscreen


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
    (when-not @(rf/subscribe [::subs/is-full-screen])
      [small-text-button {:label "Use Full Screen"
                          :on-click #(.fullScreen ref)}])))

(defn full-screen-changed
  []
  (rf/dispatch [::events/set-full-screen (not @(rf/subscribe [::subs/is-full-screen]))]))

(defn full-screen-wrapper
  "Wrap a component with fullscreen capability"
  [content options]
  (let [state (rc/atom 10)]   ; I think not a reagent atom here?
    (rc/create-class
     {:display-name "full-screen-wrapper"
      :reagent-render
      (fn [content options]
        [:> FullScreen {:ref #(reset! state %)
                        :onFullScreenChange full-screen-changed}
         [full-screen-button @state]
         [content options]])})))

