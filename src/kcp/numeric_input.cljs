(ns kcp.numeric-input
  (:require [clojure.string :refer [split]]
            [kcp.rgb :as rgb]
            ["react-bootstrap" :as bs]))

(defn str-to-num
  "parse string to f64, map empty strings to nil"
  [val]
  (cond
    (number? val) val
    (empty? val) nil
    :else (js/parseFloat val)))

(def epsilon 1e-8)

(defn near-integer? [n]
  (< (js/Math.abs (- n (js/Math.round n))) epsilon))

(defn to-dps
  [n dps]
  (cond
    (= 0 dps)
    ; display as integer
    (str (js/Math.round n))

    :else
    ; display with 1dp always
    (.toFixed (js/Number. n) dps)))


(defn num-to-str
  ([n]
   (num-to-str n 1))
  ([n dps]
   (cond
     (nil? n) nil
     (string? n) n
     (js/isNaN n) ""
     (near-integer? n) (str (js/Math.round n))
     :else (to-dps n dps))))


(defn get-validated-input [value nmin nmax step]
  (let [value (str-to-num value)
        nmin (if (fn? nmin) (nmin) nmin)
        nmax (if (fn? nmax) (nmax) nmax)                    ;(if (keyword? nmax) @(input-cursor nmax) nmax)
        val-1 (if (js/isNaN value)                          ; is value blank?
                (if (pos? step)                             ; is it an increment?
                  (dec nmin)                                ; yes - go to one less than minimum (we'll increment later)
                  (if (neg? step)                           ; is it a decrement?
                    (inc nmax)                              ; yes - got to one more than maximum (we'll decrement later)
                    nmin                                    ; no - check: This inserts nmin into val-1
                    ))
                value)
        val-2 (+ step val-1)
        val-3 (if (< val-2 nmin)                            ; is it too small?
                (str (num-to-str val-2) ":" val-2)          ; yes
                (if (> val-2 nmax)                          ; no; is it too big?
                  (str (num-to-str val-2) ":" val-2)        ; yes, return good and bad values, in colon separated string
                  val-2))]

    (cond
      (or (= step 1) (= step -1) ) (max nmin (min val-2 nmax))
      (nil? value) nil
      (js/isNaN value) nmin
      :else val-3
      )))

(defn handle-inc [value on-change nmin nmax dps increment]  ;
  (let [value (get-validated-input value nmin nmax increment)]
    (on-change (num-to-str value dps))))


(defn handle-typed-input [value-f nmin nmax dps on-change e]
  (let [value (.. (-> e .-target) -value)]
    (if (re-matches #"\s*\d*\.?\d*\s*" value)               ; todo: should this be d+ rather than d*?
      (when (not= value (value-f))
        (on-change (if (not= (str-to-num value) (str-to-num (value-f)))
                     (num-to-str (get-validated-input (str-to-num value) nmin nmax 0) dps)
                     value)))

      (on-change ""))                                       ; todo: should this be nil or ##NaN?
    ))


(defn update-value [value nmin nmax dps increment on-change]
  (handle-inc value on-change nmin nmax dps increment))

(defn inc-dec-button
  [{:keys [value-f on-change _min max nmin nmax dps increment]}]
  (let [value (str-to-num (value-f))]
    [:span {:class-name "incdec"}
     [:> bs/Button {:class-name  (str (if (pos? increment) "right" "left") " btn btn-default ")
                    :variant     (if (nil? (value-f)) "outline-secondary" "secondary")
                    :aria-hidden "true"
                    :disabled    (if (pos? increment)
                                   (if (>= value (str-to-num (if (fn? max) (max) max))) "disabled" nil)
                                   (if (<= value nmin) "disabled" nil))
                    :on-click    #(update-value value nmin nmax dps increment on-change)}
      (if (pos? increment) "+" "–")]]))


(defn numeric-input
  [{:keys [key _id value-f on-change min max dps units]
    :as   props}]

  (let [[good bad] (split (value-f) #":")
        value (str-to-num good)
        nmin (str-to-num (if (fn? min) (min) min))
        nmax (str-to-num (if (fn? max) (max) max))
        mutate (fn [e]
                 (handle-typed-input
                   value-f
                   min
                   max
                   dps
                   on-change e))]
    [:> bs/Row {:style {:align-items "baseline"}}
     [:> bs/Col {:xs 9}
      [:div {:class       "numeric-input"
             :style       {:min-width     "100px"
                           :width         "max-content"
                           :tab-index     1
                           :selectable    true
                           :border        (str "3px solid " (if (nil? (value-f)) "#ff8888" "#CCCCCC"))
                           :border-radius 5
                           :padding       1}
             :on-key-down #(let [key-code (.. % -nativeEvent -code)]
                             (when (#{"ArrowUp" "ArrowDown"} key-code)
                               (.preventDefault %))
                             (update-value value nmin nmax dps
                                           (cond
                                             (= "ArrowUp" key-code) 1
                                             (= "ArrowDown" key-code) -1
                                             :else 0)
                                           on-change))}
       [:div {:style {:display "flex" :flex-direction "row" :align-items "center"}}
        (inc-dec-button (assoc props :variant "secondary" :nmin nmin :nmax nmax :dps dps :increment (- (js/Math.pow 10 (- dps))) :value-f value-f))
        [:input
         {:type         "text"
          :value        good
          :id           (when key (str (namespace key) "-" (name key)))
          :autoComplete "off"
          :on-change    mutate
          :style        {:width            "58px"
                         :height           "38px"
                         :font-size        "16px"
                         :border-top       "0px solid #888"
                         :border-left      "2px solid #ddd"
                         :border-bottom    "0px solid #ddd"
                         :border-right     "2px solid #ddd"
                         :background-color (if (nil? (value-f))
                                             "#fff"
                                             (if (nil? bad) rgb/secondary rgb/danger))
                         :color            "#fff"
                         :padding          "0 0 4px 0"
                         :text-align       "center"}}]
        (inc-dec-button (assoc props :nmin nmin :nmax nmax :dps dps :increment (js/Math.pow 10 (- dps)) :value-f value-f))]]]
     [:> bs/Col
      ; the styling suppresses units display when the screen is too small 
      {:class-name "col-3 d-none d-lg-block"}
      (when units [:div {:style {:color rgb/secondary}} units])]]))



