(ns transplants.bsio
  "A (react) bootstrap i/o wrapper. There's an example of a boostrap text input component in the comment
where we can work on defining a common interface. "
  (:require ["react-bootstrap" :as bs]
            [transplants.rgb :as rgb]
            ;[shadow.debug :refer [locals ?> ?-> ?->>]]
            ))

(def missing-color "#ff0000")

(defn open-icon
  "wrapper for access open-icon access"
  ([name]
   (open-icon nil name))
  ([style name]
   [:span (assoc {:class (str "oi oi-" name)
                  :title name
                  :aria-hidden "true"}
                 :style style)]))
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
    [value-k value-f event-f & [_options]]
    (let [handle-change (fn [e] (event-f [value-k (-> e .-target .-value)]))]
      [:input {:type "text" :value (value-f) :on-change handle-change}])))

(defn radio-button-group
  "Add in correct toggle operation.
   The id may be used to locate this widget in E2E tests.
   value-f is a function which, when called returns the current value of the widget.
   event-f is an event handler which is called when the selected level changes
   Each button is configured with a map wih the (buttons-f) containing its :level-name, :level, and :disabled status."
  [{:keys [id value-f on-change buttons-f _vertical _optional]}]
  [:<>
   (let [value (value-f)
         buttons (buttons-f)
         highlight? (fn [lev] (and (= value :unknown)
                                   (= lev (:optional (first (filter #(= (:level %) :unknown) buttons))))))]
     (into [:> bs/ToggleButtonGroup
            {:type "radio"
             :id id
             ;:inline "true"
             ;:size "sm"
             ;:vertical vertical 
             :name id
             :value value
             :on-change on-change
             :style  {:margin-top 5
                      :border (str "3px solid "
                                   (if (nil? value)
                                     missing-color
                                     (if (= value :unknown)
                                       "teal"
                                       "#CCCCCC")))
                      :border-radius 5
                      :padding 1
                      :display "flex"
                      :justify-content "space-between"
                      :flex-wrap "wrap"}}]
           (map (fn [{:keys [level-name level]}]
                  [:> bs/ToggleButton {:type "checkbox"
                                       :class-name "toggler"
                                       :key level :disabled false
                                       :value level
                                       :style {:border-radius 0
                                               :margin 0
                                               :color (when (highlight? level) "#00B")
                                               :font-weight (when (highlight? level) "bold")
                                               :background-color (if (highlight? level)
                                                                   "#fec"
                                                                   (if (= level value) 
                                                                     rgb/theme 
                                                                     "#fff"))}
                                       :variant "outline-secondary"}
                   level-name])
                buttons)))])

(defn dropdown
  [{:keys [id value-f on-change buttons-f]}]

  (let [value (value-f)
        buttons (buttons-f)]

    [:> bs/Dropdown
     {:on-select #(on-change (keyword %))}

     (into [:> bs/DropdownButton
            {:id id
             :value value
             :variant (if (nil? value) "outline-secondary" "secondary")
             :title  (:level-name (first (if-let [x (seq (filter (fn [{:keys [level]}]
                                                              (= value level)) buttons))]
                                      x (buttons-f))))
             :style  {:border (str "3px solid " (if (nil? value) missing-color "#ffffff"))
                      :border-radius 5
                      :padding 1
                      :width "max-content"}}]
           (map (fn [{:keys [level-name level]}]
                  [:> bs/Dropdown.Item {:key level :as "button"
                                        :eventKey level
                                        :on-click #(.preventDefault %)}
                   level-name])
                (buttons-f)))]))

(defn reset-button
  [{:keys [on-click]}]
  [:> bs/Button {:variant "danger" ;"secondary"
                 :id "reset"
                 :style {:margin-bottom 10}
                 :on-click on-click} "Reset all"])



(defn print-button
  [{:keys [on-click]}]
  [:> bs/Button {:variant "primary" ;"secondary"
                 :id "print-button"
                 :style {:margin-bottom 10}
                 :on-click on-click} 
   [:span (open-icon "print") " Print, Copy or Save"]])

(comment
  ; white border when there is a value
  (:border (:style (nth (second (radio-button-group {:value-path [:sex]
                                                     :value-f (fn [] :male)
                                                     :on-change identity
                                                     :buttons-f (fn [] [{:level :male :level-name "Male"}
                                                                        {:level :female :level-name "Female"}])}))
                        2)))

  ; red border when there isn't
  (:border (:style (nth (second (radio-button-group {:value-path [:sex]
                                                     :value-f (fn [] nil)
                                                     :on-change identity
                                                     :buttons-f (fn [] [{:level :male :level-name "Male"}
                                                                        {:level :female :level-name "Female"}])}))
                        2))))


(defn modal
  "A modal dialog box. 
   There is only one - so this gets called just once from the root component. We control it via db :modal-data - see available operations
   in https://react-bootstrap.github.io/components/modal/#modal-props. Not yet a reusable 
   component as ony the parts we use are configured.
   To cancel the dialogue use the top-right close button."
  [data-f]
  ;(locals)
  (let [{:keys [title content cancel onHide print copy save ok paste width] :as data} @(data-f)]
    
    (when data
      [:> bs/Modal {:show true :on-hide onHide}
       [:> bs/Modal.Header {:close-button true}
        [:> bs/Modal.Title title]]
       [:> bs/Modal.Body [:div {:id "snap-display"} content]]
       [:> bs/Modal.Footer
        (when paste (do (js/setTimeout (fn []
                                         (paste (js/document.querySelector "#snap-display"))
                                         (let [el (js/document.querySelector ".modal-dialog")
                                               style (.-style el)]
                                           (goog.object.set style "max-width" "none")
                                           (goog.object.set style "margin-left" "-17px"))), 200)
                        nil))
        (when copy [:> bs/Button {:variant "primary" :on-click copy}
                    "Copy"])
        (when print [:> bs/Button {:variant "primary" :on-click print}
                     "Print"])
        (when save [:> bs/Button {:variant "primary" :on-click save}
                    "Save"])
        (when ok [:> bs/Button {:variant "primary" :on-click ok}
                  "OK"])]])))