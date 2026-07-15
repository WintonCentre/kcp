(ns kcp.pkm-model)

;;; --- constants ---

(def ^:private rcc-coeffs
  {:age-yr    0.0334
   :sex-m     0.197
   :grade-3   0.197
   :grade-4   0.542
   :tstage-2  0.598
   :tstage-3  1.033
   :tstage-4  1.464
   :ln-1      0.494
   :cci-point 0.110})

(def ^:private mort-coeffs
  {:age-yr        0.0778
   :sex-m         0.249
   :smoke-former  0.128
   :smoke-current 0.481
   :cci-point     0.276})

(def ^:private norm-consts
  {:age 64.81
   :cci 2})

(def risk-thresholds
  "10-year RCC cumulative incidence thresholds for risk grouping"
  {:low-intermediate 0.1935
   :intermediate-high 0.389})

;;; --- input mapping ---

(defn- parse-int [s]
  #?(:clj  (Integer/parseInt (str s))
     :cljs (js/parseInt s)))

(defn- t-stage->tstage [t-stage]
  (case t-stage
    (:pT1a :pT1b)        1
    (:pT2a :pT2b)        2
    (:pT3a :pT3b :pT3c)  3
    :pT4                 4
    nil))

(defn- n-stage->ln [n-stage]
  (case n-stage
    (:pNx :pN0) 0
    (:pN1 :pN2) 1
    nil))

(defn- grade->int [grade]
  (case grade :1 1 :2 2 :3 3 :4 4 nil))

(defn- sex->code [sex]
  (case sex :Male "M" :Female "F" nil))

(defn- smoking->code [smoking]
  (case smoking :Current "current" :Former "former" :Never "never" nil))

(defn- cap-cci [n]
  (min n 12))

(defn normalize-inputs
  "Convert app keyword inputs to PREDICT model-ready values.
   Returns nil if any required input is absent or unrecognized."
  [{:keys [age-at-surgery sex nuclear-grade t-stage n-stage
           charlson-comorbidity-score smoking-history]}]
  (let [age     (when age-at-surgery (parse-int age-at-surgery))
        sex*    (sex->code sex)
        grade   (grade->int nuclear-grade)
        tstage  (t-stage->tstage t-stage)
        ln      (n-stage->ln n-stage)
        cci     (when charlson-comorbidity-score (cap-cci (parse-int charlson-comorbidity-score)))
        smoking (smoking->code smoking-history)]
    (when (and age sex* grade tstage (some? ln) cci smoking)
      {:age     age
       :sex     sex*
       :grade   grade
       :tstage  tstage
       :ln      ln
       :cci     cci
       :smoking smoking})))

;;; --- model computation ---

(defn- exp* [x]
  #?(:clj  (Math/exp x)
     :cljs (js/Math.exp x)))

(defn compute-pi
  "Compute prognostic indices for the RCC and mortality sub-models.
   Returns {:rcc-pi <double> :mort-pi <double>}"
  [{:keys [age sex grade tstage ln cci smoking]}]
  (let [age-c (- age (:age norm-consts))
        cci-c (- cci (:cci norm-consts))
        male? (= sex "M")]
    {:rcc-pi  (+ (* (:age-yr rcc-coeffs)    age-c)
                 (* (:sex-m rcc-coeffs)     (if male? 1 0))
                 (* (:grade-3 rcc-coeffs)   (if (= grade 3) 1 0))
                 (* (:grade-4 rcc-coeffs)   (if (= grade 4) 1 0))
                 (* (:tstage-2 rcc-coeffs)  (if (= tstage 2) 1 0))
                 (* (:tstage-3 rcc-coeffs)  (if (= tstage 3) 1 0))
                 (* (:tstage-4 rcc-coeffs)  (if (= tstage 4) 1 0))
                 (* (:ln-1 rcc-coeffs)      (if (= ln 1) 1 0))
                 (* (:cci-point rcc-coeffs) cci-c))
     :mort-pi (+ (* (:age-yr mort-coeffs)       age-c)
                 (* (:sex-m mort-coeffs)         (if male? 1 0))
                 (* (:smoke-former mort-coeffs)  (if (= smoking "former") 1 0))
                 (* (:smoke-current mort-coeffs) (if (= smoking "current") 1 0))
                 (* (:cci-point mort-coeffs)     cci-c))}))

(defn- floor* [x]
  #?(:clj  (Math/floor x)
     :cljs (js/Math.floor x)))

(defn index-hazards
  "Build a double-year -> H0 lookup from a headed-vectors map
   {\"Time\" [...] \"H0\" [...]}. Only integer timepoints are indexed.
   Keys are stored as doubles so lookups with (double t) are consistent."
  [hazard-data]
  (let [times (get hazard-data "Time")
        h0s   (get hazard-data "H0")]
    (->> (map vector times h0s)
         (filter (fn [[t _]] (== t (floor* t))))
         (map (fn [[t h0]] [(double t) h0]))
         (into {}))))

(defn compute-at-year
  "Competing-risk cumulative incidences at integer year t.
   Returns {:rcc-death <double> :oc-death <double>}"
  [{:keys [rcc-pi mort-pi]} t rcc-idx mort-idx]
  (let [rcc-h0  (get rcc-idx (double t))
        mort-h0 (get mort-idx (double t))
        rcc-cr  (- 1 (exp* (- (* rcc-h0   (exp* rcc-pi)))))
        oc-cr   (- 1 (exp* (- (* mort-h0 (exp* mort-pi)))))
        overall (- 1 (* (- 1 rcc-cr) (- 1 oc-cr)))
        denom   (+ rcc-cr oc-cr)]
    (if (zero? denom)
      {:rcc-death 0.0 :oc-death 0.0}
      {:rcc-death (* overall (/ rcc-cr denom))
       :oc-death  (* overall (/ oc-cr  denom))})))

(defn risk-group
  "Classify 10-year RCC cumulative incidence into :low/:intermediate/:high."
  [rcc-cr-10yr]
  (cond
    (< rcc-cr-10yr (:low-intermediate  risk-thresholds)) :low
    (< rcc-cr-10yr (:intermediate-high risk-thresholds)) :intermediate
    :else                                                 :high))

(defn compute-model
  "Compute PREDICT Kidney competing-risk incidences for years 1–15.
   Takes normalized inputs (from normalize-inputs) and indexed hazard tables
   (from index-hazards).
   Returns {:yearly-results [{:year t :rcc-death r :oc-death o} ...]
            :risk-group :low/:intermediate/:high}"
  [normalized-inputs rcc-idx mort-idx]
  (let [pi             (compute-pi normalized-inputs)
        yearly-results (mapv (fn [t]
                               (assoc (compute-at-year pi t rcc-idx mort-idx) :year t))
                             (range 1 16))]
    {:yearly-results yearly-results
     :risk-group     (risk-group (:rcc-death (nth yearly-results 9)))}))

(def sample-days
  "Months at which to sample the model for visualization (0 to 15 years)"
  (range 0 181 12))

(def ^:private zeroed-F
  (into [[0 [0.0 0.0]]]
        (map (fn [y] [(* y 12) [0.0 0.0]]) (range 1 16))))

(defn model->F
  "Convert compute-model year results to visualization F format:
   [[month [rcc-death oc-death]] ...] covering months 0, 12, ..., 180 (years 0–15)."
  [year-results]
  (into [[0 [0.0 0.0]]]
        (map (fn [{:keys [year rcc-death oc-death]}]
               [(* year 12) [oc-death rcc-death]])
             year-results)))

(defn compute-F
  "Compute PREDICT Kidney competing-risks model F format from inputs and hazards.
   hazards are maps with \"Time\" and \"H0\" keys.
   Returns {:F <F-data> :risk-group :low/:intermediate/:high}"
  [inputs rcc-hazards mort-hazards]
  (if-let [norm-inputs (normalize-inputs inputs)]
    (let [rcc-idx (index-hazards rcc-hazards)
          mort-idx (index-hazards mort-hazards)
          {:keys [yearly-results risk-group]} (compute-model norm-inputs rcc-idx mort-idx)]
      {:F          (model->F yearly-results)
       :risk-group risk-group})
    {:F          zeroed-F
     :risk-group ""}))
