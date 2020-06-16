(ns transplants.numeric-input
  (:require [clojure.string :refer [split]]
            ["react-bootstrap" :as bs]))

(defn error? [value] (or (nil? value) (= "" value) (js/isNaN value)))

;;
;; Numeric values are always stored in state as strings, but processed as numerics
;;
(defn str-to-num
  "convert str to num or to ##NaN if not possible"
  [s]
  (js/parseFloat s))
(comment
  (str-to-num "3.5")                                        ;=> 3.5
  (str-to-num 3.5)                                          ;=> 3.5
  )

(def epsilon 1e-8)

(defn near-integer? [n]
  (< (js/Math.abs (- n (js/Math.round n))) epsilon))

(defn trim-trailing-zero [s]
  (if-let [[m m1] (re-matches #"(.*\.\d)\d+" s)]
    m1 s))

(defn at-precision [n precision]
  (cond
    (= 0 precision)
    ; display as integer
    (str (js/Math.ceil n))

    (= 3 precision)
    ; flexible display up to 3dp
    (if (near-integer? n)
      (str (js/floor n))
      (-> n
          (.toPrecision (js/Number. 3))
          (trim-trailing-zero)))

    (= 2 precision)
    ; display with 2dp always
    (.toFixed (js/Number. n) 2)

    (= 1 precision)
    ; display with 1dp always
    (.toFixed (js/Number. n) 1)))

(defn num-to-str
  ([n]
   (num-to-str n 0))
  ([n precision]
   (if (string? n)
     n
     (if (js/isNaN n)
       ""
       (if (near-integer? n)
         (str (js/Math.floor n))
         (if precision
           (at-precision n precision)
           (at-precision n 0)))))))

(defn validate-input [value nmin nmax step]
  #_(js/console.log "in value " value)
  (println "nmin " nmin)
  (println "nmax " nmax)
  #_(js/console.log "step " step)
  (let [value (str-to-num value)
        nmin (if (fn? nmin) @(nmin) nmin)
        nmax (if (fn? nmax) @(nmax) nmax)                   ;(if (keyword? nmax) @(input-cursor nmax) nmax)
        val-1 (if (js/isNaN value)                          ; is value blank?
                (if (pos? step)                             ; is it an increment?
                  (dec nmin)                                ; yes - go to one less than minimum (we'll increment later)
                  (if (neg? step)                           ; is it a decrement?
                    (inc nmax)                              ; yes - got to one more than maximum (we'll decrement later)
                    nmin                                    ; no - check: This inserts nmin into val-1
                    ))
                value)
        val-2 (+ step val-1)                                ; do the increment

        val-3 (if (< val-2 nmin)                            ; is it too small?
                (str (num-to-str val-2) ":" val-2)          ; yes
                (if (> val-2 nmax)                          ; no; is it too big?
                  (str (num-to-str val-2) ":" val-2)        ; yes, return good and bad values, in colon separated string
                  val-2))]
    #_(js/console.log "out-value " value)
    (if (js/isNaN value)                                    ; Case when user has deleted value using backspace.
      nmin #_" :0"                                                 ; and there is no input there.
      val-3                                                 ; Otherwise return
      )))

(defn handle-inc [value on-change nmin nmax precision step]
  (let [v (validate-input value nmin nmax step)]
    ;#_(js/console.log "on-change " v)
    (on-change (num-to-str v precision))))


(defn handle-typed-input [nmin nmax precision on-change e]
  (let [value (.. (-> e .-target) -value)]
    (println "t:" value " " nmin nmax precision)
    (if (re-matches #"\s*\d*\.?\d*\s*" value)               ; todo: should this be d+ rather than d*?
      (on-change (num-to-str (validate-input (str-to-num value) nmin nmax 0) precision))
      (on-change ""))                                        ; todo: should this be nil or ##NaN?
    ))
(comment
  (re-matches #"\s*\d*\.?\d*\s*" "6")                       ;"6"
  (re-matches #"\s*\d*\.?\d*\s*" "")                        ;""
  (re-matches #"\s*\d*\.?\d*\s*" "0.7")                     ;"0.7"
  (re-matches #"\s*\d*\.?\d*\s*" ".7")                      ;".7"
  (re-matches #"\s*\d*\.?\d*\s*" "7.")                      ;"7."
  (re-matches #"\s*\d*\.?\d*\s*" "a")                       nil)

(defn update-value [value nmin nmax precision step on-change]
  (handle-inc value on-change nmin nmax precision step))

(defn inc-dec-button
  [{:keys [value-f increment on-change min max nmin nmax precision]
    :as   props}]
  (let [value (str-to-num (value-f))]
    [:span {:class-name "incdec"}
     [:> bs/Button {:class-name  (str (if (pos? increment) "right" "left") " btn btn-default ")
                    :variant "secondary"
                    :aria-hidden "true"
                    :disabled    (if (pos? increment)
                                   (if (>= value (str-to-num (if (fn? max) (max) max))) "disabled" nil)
                                   (if (<= value min) "disabled" nil))
                    :tab-index   -1
                    :on-click    #(update-value value min max precision increment on-change)}
      (if (pos? increment) "+" "–")]]))



(defn numeric-input
  [{:keys [key value-f on-change min max error-color color precision] :or {error-color "red" color "black"} :as props}]

  (println "numeric-value =" (value-f) "min " min " max " max)
  (let [[good bad] (split (value-f) #":")
        value (str-to-num good)
        nmin (str-to-num (if (fn? min) (min) min))
        nmax (str-to-num (if (fn? max) (max) max))
        _ (println "good:bad " [good bad])
        mutate (fn [e]
                 ;(js/console.log "nativeEvent " e)
                 ;(js/console.log "inputType " (.. e -nativeEvent -inputType))
                 (handle-typed-input
                  min
                  max
                  precision
                  on-change e))]

    [:div {:class       "numeric-input"
           :style       {:min-width      "100px"
                         :width "fit-content"
                         :tab-index  1
                         :selectable true
                         :border (str "3px solid " (if (nil? (value-f)) "#ff8888" "#ffffff"))
                         :border-radius 5
                         :padding 1}
           :on-key-down #(let [key-code (.. % -nativeEvent -code)]
                           (when (#{"ArrowUp" "ArrowDown"} key-code)
                             (.preventDefault %))
                           (update-value value nmin nmax precision
                                         (cond
                                           (= "ArrowUp" key-code) 1
                                           (= "ArrowDown" key-code) -1
                                           :else 0)
                                         on-change))}
     [:div {:style {:display "flex" :flex-direction "row" :align-items "center"}}
      (inc-dec-button (assoc props :variant "secondary" :min min :max max :precision precision :increment -1 :value-f value-f))
      [:input
       {:type      "text"
        :value     good
        :id        key
        :on-click  mutate
        :on-change mutate
        :style     {:width            "58px" :height "38px" :font-size "16px"
                    :border-top       "0px solid #888"
                    :border-left      "2px solid #ddd"
                    :border-bottom       "0px solid #ddd"
                    :border-right      "2px solid #ddd"
                    :background-color (if (nil? bad) "#6C757D" "#dd5533")
                    :color            "#fff"
                    :padding          "0 0 4px 0"
                    :text-align       "center"
                    #_#_:font-weight "bold"}}]
      (inc-dec-button (assoc props :min min :max max :precision precision :increment 1 :value-f value-f))]]))



