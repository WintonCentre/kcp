(ns transplants.bsio
  "A (react) bootstrap i/o wrapper. There's an example of a boostrap text input component in the comment
where we can work on defining a common interface. 
"
  (:require ["react-bootstrap" :as bs]))

(comment
  
  (defn example
    "This example defines an interface for reading and writing application state. 
It borrows some language from re-frame.

`value-k` is a keyword which uniquely identifies a value to be written to the application. 
This will likely be a factor key as defined by the model spreadsheet.

`value-f` is a function that reads a value from the application when called. 
The caller can define `value-f` in a number of ways:
(fn [] @(rf/subscribe k))       ; Caller is closing over the subscription key here and supplies a deref
                                ; which will happen inside the bsio component.
(fn [] @ref-value)              ; Caller has already subscribed, but wants the component to deref.
(fn [] plain-value)             ; Caller is simply providing a value. 
By passing in a function the caller can control where and how often the dereferencing happens. 
In all cases the bsio component simply calls value-f to get the needed value.
We can't assume that value-k identifies (value-f) though it often will.

`event-f` is a function for reporting events that change the value referenced by value-k

`options` is a map for anything else we might need to pass in - e.g. labels or style or size choices.
[If we use bs4 Forms here, we'll need to do this, but it's the sort of things that is really app
responsibility. However some component like checkboxes (we don't need them at the moment), do require 
labels to be part of the same form control because they are part of the clickable area.]

The example uses a raw input component, but it may be desirable to replace that in the real library 
with a react-bootstrap Form.Control so we can use them to flag invalid or empty values. 

The caller would have to provide wrapping Form components like InputGroup in that case. 
I doubt that those would need to be part of this library. Each component would likely be wrapped in 
its own Form in that case. That's for the next level up to worry about.

Some experimentation with Forms is necessary to check it's a viable approach that allows the 
low level inputs to react to value changes without the user having to press a submit button. Hopefully it is.

I've also missed out things like stopPropagation, preventDefault, and touch events.

"
    [value-k value-f event-f & [options]]
    (let [handle-change (fn [e] (event-f [value-k (-> e .-target .-value)]))]
      [:input {:type "text" :value (value-f) :on-change handle-change}])))
          
          
(defn radio-button-group
  "Add in correct toggle operation. 
   Each button is configured with a map wih the (buttons-f) containing its :label, :level, and :disabled status."
  [{:keys [value-k value-f event-f buttons-f]}]
  [:div
   (let [value (value-f)]
     (into [:> bs/ToggleButtonGroup
            {:type "radio"
             :name value-k
             :value value
             :on-change #(event-f value-k %)
             :style  {:border (str "3px solid " (if (nil? value) "#ff8888" "#ffffff"))
                      :border-radius 5
                      :padding 1}}
            ]
           (map (fn [{:keys [label level disabled]}]
                  [:> bs/ToggleButton {:key level :disabled disabled :value level} label])
                (buttons-f))))])

(comment
  ; white border when there is a value
  (:border (:style (nth (second (radio-button-group {:value-k :sex
                                                     :value-f (fn [] :male)
                                                     :event-f identity
                                                     :buttons-f (fn [] [{:key :male :value :male :label "Male"}
                                                                        {:key :female :value :female :label "Female"}])}))
                        2)))
  
  ; red border when there isn't
  (:border (:style (nth (second (radio-button-group {:value-k :sex
                                                     :value-f (fn [] nil)
                                                     :event-f identity
                                                     :buttons-f (fn [] [{:key :male :value :male :label "Male"}
                                                                        {:key :female :value :female :label "Female"}])}))
                        2)))
  )

