(ns error-boundary.error-boundary
  (:require [reagent.core :as r]
            ;[reagent.impl.component :as comp]
            ;[reagent.impl.util :as util]
            ;[goog.object :as gobj]
            ))

;;
;; todo: Is our error boundary function doing what it is meant to? I'm not sure what to expect. 
;;
(defn err-boundary
  " See https://lilac.town/writing/modern-react-in-cljs-error-boundaries/ for Reactv16"
  [& _children]
  (let [err-state (r/atom nil)]
    (r/create-class
     {:display-name "ErrBoundary"
      :component-did-catch (fn [err info]
                             (reset! err-state [err info]))
      :get-derived-state-from-error (fn [err] [:p "The error is " (pr-str err)])
      :reagent-render (fn [& children]
                        (if (nil? @err-state)
                          (into [:<>] children)
                          (let [[err info] @err-state]
                            [:<>
                             [:pre [:code (pr-str info)]]
                             [:pre [:code (pr-str err)]]])))})))

