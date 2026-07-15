(ns kcp.charlson
    "Charlson Comorbidity Score calculator.

    Notes:
    - A constant score of 2 is added because all patients have cancer.
    - The final score is capped at 12.
    - Condition inputs may be booleans, 0/1 numbers, or nil.
    - nil and false are treated as 0.
    - true is treated as 1."
    (:require [clojure.string :as str]))

(def charlson-weights
  {:MI      1  ;; Myocardial infarction
   :CHF     1  ;; Congestive heart failure
   :PVD     1  ;; Peripheral vascular disease
   :CBD     1  ;; Cerebrovascular disease
   :DEM     1  ;; Dementia
   :CPD     1  ;; Chronic pulmonary disease
   :CTD     1  ;; Connective tissue disorder
   :UD      1  ;; Ulcer disease
   :LIVmild 1  ;; Liver disease, mild
   :DIB     1  ;; Diabetes
   :HMP     2  ;; Hemiplegia
   :RENAL   2  ;; Renal disease, moderate or severe
   :DIBend  2  ;; Diabetes with end organ damage
   :LEUK    2  ;; Leukaemia
   :LYMPH   2  ;; Lymphoma
   :LIVsev  3  ;; Liver disease, moderate to severe
   :AIDS    6  ;; Acquired immunodeficiency syndrome
   })


; todo jack: this is a duplicate?
(defn- normalize-key
       "Normalizes condition keys so callers can provide keywords or strings.

       Examples:
       :MI       => :MI
       \"MI\"     => :MI
       \"input_MI\" => :MI"
       [k]
       (cond
         (keyword? k)
         k

         (string? k)
         (-> k
             (str/replace #"^input_" "")
             keyword)

         :else
         k))

; todo jack: not sure about this one, possibly a duplicate
(defn- input->binary
       "Converts an input value to 0 or 1.

       Accepted truthy/comorbidity-present values:
       - true
       - 1
       - positive numbers

       Everything else is treated as 0."
       [value]
       (cond
         (true? value) 1
         (number? value) (if (pos? value) 1 0)
         :else 0))

(defn cap-charlson-score
      "Caps the Charlson score at the maximum value used by the model."
      [score]
      (min 12 score))

(defn calculate-charlson-score
      "Calculates the uncapped Charlson Comorbidity Score from condition inputs.

      The supplied map should contain Charlson condition keys such as:

      {:MI true
       :CHF false
       :RENAL 1
       :AIDS 0}"
      [inputs]
      (let [normalized-inputs (into {}
                                    (map (fn [[k v]]
                                             [(normalize-key k) v]))
                                    inputs)
            comorbidity-score (reduce-kv
                                (fn [total condition weight]
                                    (+ total
                                       (* weight
                                          (input->binary
                                            (get normalized-inputs condition)))))
                                0
                                charlson-weights)]
           ; add two because all patients have cancer
           (+ comorbidity-score 2)))

(defn calculate-capped-charlson-score
      "Calculates the capped Charlson Comorbidity Score.

      The score is calculated as:

      sum(condition * condition-weight) + 2

      Then capped at 12."
      [inputs]
      (-> inputs
          calculate-charlson-score
          cap-charlson-score))