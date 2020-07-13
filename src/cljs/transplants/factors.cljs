(ns transplants.factors
  "Code associated with factors and master factor-maps"
  (:require [clojure.string :refer [starts-with? split join index-of]]
            [clojure.edn :as edn]
            [clojure.pprint :refer [pprint]]
            [winton-utils.data-frame :refer [map-of-vs->v-of-maps]]
            [transplants.transforms :as xf]
            [transplants.subs :as subs]
            [re-frame.core :as rf]))

#_(comment
    (def inputs
      {:beta-transplant '(0 -0.06289 nil 0.60387 0.46442 0.26097 0 -0.28334 -0.77722 nil 0 -0.01539 nil 0 0.54305 0.00727 0.54305 nil 0 -0.28893 -0.61033 nil 0 -0.35381 nil 0 0.29132 nil 0 -0.74768 nil 0 -0.32635 nil nil nil nil nil nil nil nil nil nil)
       :beta-death '(0 -0.10852 nil -1.43819 -1.04978 -0.57859 0 0.09774 0.13967 nil 0 -0.26636 nil 0 -0.19369 0.03454 -0.19369 nil 0 0.09036 0.14314 nil 0 0.46463 nil 0 -0.50041 nil 0 0.33496 nil 0.86605 0 nil nil nil nil nil nil nil nil nil nil)
       :info-box? '("Male" "Female" nil nil nil nil nil nil nil nil :yes nil nil nil nil nil nil nil :yes nil nil nil nil nil nil nil nil nil nil nil nil nil nil nil nil nil nil nil nil nil nil nil nil)
       :beta-removal '(0 0.01097 nil -0.99622 -0.75824 -0.43028 0 0.66553 1.56677 nil 0 -0.13979 nil 0 -0.19443 -0.03596 -0.19443 nil 0 0.09631 0.2109 nil 0 -0.10169 nil 0 -0.31226 nil 0 0.32677 nil 0.18723 0 nil nil nil nil nil nil nil nil nil nil)
       :level-name '("Male" "Female" nil "18 - 29"  "30 - 39" "40 - 49" "50 - 59" "60 - 69" "70 +" nil "White" "Non-white" nil "O" "A" "B" "AB" nil "easy" "moderate" "difficult" nil "first" "re-graft" nil "Yes" "No" nil "No" "Yes" nil "No" "Yes" nil nil nil nil nil nil nil nil nil nil)
       :beta-all-reasons '(0 -0.10876 nil 0.3303 0.22041 0.09241 0 -0.03388 0.11484 nil 0 -0.09953 nil 0 0.57296 0.00578 0.57296 nil 0 -0.29547 -0.62205 nil 0 -0.32497 nil 0 0.11702 nil 0 -0.56793 nil 0 0.05058 nil nil nil nil nil nil nil nil nil nil)
       :type '(:radio nil nil :dropdown nil nil nil nil nil nil :radio nil nil :radio nil nil nil nil :dropdown nil nil nil :radio nil nil :radio nil nil :radio nil nil :radio nil nil nil nil nil nil nil nil nil nil nil)
       :sub-text '("Sex" nil nil "Age (years)" nil nil nil nil nil nil nil nil nil nil nil nil nil nil "match score 1-3" "match score 4-6" "match score 7-10" nil "No previous graft" "Replacing previous graft" nil nil nil nil "cRF less than 85%" "cRF 85% or more" nil nil "?" nil nil nil nil nil nil nil nil nil nil)
       :level '(:male :female nil :18+ :30+ :40+ :50+ :60+ :70+ nil :white :non-white nil :O :A :B :AB nil :easy :moderate :difficult nil :first :re-graft nil :yes :no nil :no :yes nil :no :yes nil nil nil nil nil nil nil nil nil nil)
       :factor '(:sex :sex nil :age :age :age :age :age :age nil :ethnicity :ethnicity nil :blood-group :blood-group :blood-group :blood-group nil :matchability :matchability :matchability nil :graft :graft nil :dialysis :dialysis nil :sensitised :sensitised nil :diabetes :diabetes nil nil nil nil nil nil nil nil nil nil)
       :order '(1 1 nil 1.2 1.2 1.2 1.2 1.2 1.2 nil 1.3 1.3 nil 1.4 1.4 1.4 1.4 nil 1.5 1.5 1.5 nil 1.6 1.6 nil 1.7 1.7 nil 1.8 1.8 nil 1.9 1.9 nil nil nil nil nil nil nil nil nil nil)
       :factor-name '("Sex" nil nil "Age (years)" nil nil nil nil nil nil "Ethnicity" nil nil "Blood group" nil nil nil nil "Matchability group" nil nil nil "Graft number" nil nil "Dialysis at registration?" nil nil "Highly sensitised?" nil nil "Primary renal disease - diabetes?" nil nil nil nil nil nil nil nil nil nil nil)})

    (pprint (->> inputs
                 (map-of-vs->v-of-maps)
               ;(filter #(= (:factor %) :sex)
                 ))

    (pprint (->> inputs
                 (map-of-vs->v-of-maps)
                 (filter #(keyword? (:factor %)))
                 (map #(xf/map-vals xf/unstring-key %))
                 (partition-by :factor)
                 (sort-by (comp :order first))))

    (reduce conj [:beta-1 :beta-2] [:level :level-name]))

#_(comment ; unused?
    (defn extract-beta-keys [header-names]
      (->> header-names
           (filter #(starts-with? % "beta-"))
           (map keyword)))

    (def lookup-beta-keys (memoize extract-beta-keys))

    (defn beta-keys
      "Given the raw -inputs sheet data, extract beta keywords. 
   All factor levels will have a beta value for one of these keys"
      [inputs]
      (->> inputs
           (map (comp name first))
           (lookup-beta-keys))))

(defn get-outcomes
  "Given a master-fmap, returns all the outcomes as a seq of strings.
   e.g. for :waiting-inputs this would be [transplant removal death all-reasons]"
  [fmap]
  (->> fmap
       (keys)
       (map name)
       (filter #(starts-with? % "beta-"))
       (map #(subs % 5))))

(defn prefix-outcome-key
  "adds a prefix to an outcome and returns it as a keyword"
  [outcome prefix]
  (keyword (str (name prefix) "-" (name outcome))))

(defn prefix-outcomes-keys
  "Given a seq of outcomes, returns them as prefixed keywords"
  [outcomes prefix]
  (map #(prefix-outcome-key % prefix) outcomes))

(comment
  (get-outcomes  {:beta-transplant 1 :beta-waiting 2}))
  ; => '("transplant" "waiting")

(prefix-outcome-key  :transplant "beta")
; => :beta-transplant

(prefix-outcomes-keys '("transplant" "waiting") "beta")
; => '(:beta-transplant :beta-waiting)

(subs "beta-transplant" 5)


(defn level-maps
  "Given a seq of input-maps all for the same factor, collect all level information under the first of these,
   and return that fmap. "
  [factor f-maps]
  (->> f-maps
       (map (fn [m] (update m :type #(if (string? %)
                                       (edn/read-string %)
                                       %))))
       (map (fn [m] (update m :level #(if (string? %)
                                        (edn/read-string %)
                                        %))))
       #_(map #(assoc % :label (:level-name %)))))

(defn master-f-map
  "Given a collection of f-maps all relating to the same factor, return a master f-map 
   containing nested detail relating to levels"
  [organ f-maps]
  (let [f-map (first f-maps)
        categorical-levels (group-by :level (filter (comp keyword? :level) (level-maps (:factor f-map) f-maps)))]
         ;(js/console.log "beta-keys")
         ;(js/console.log beta-keys)
    (assoc f-map
           ; todo: :factor-key is probably no longer necessary, though it is currently used.
           :factor-key (keyword organ (xf/unstring-key (:factor f-map)))

           ; levels are f-map levels in spreadsheet order
           :levels (into {} (map (fn [[k [v]]] [k v])
                                 (group-by :level (level-maps (:factor f-map) f-maps))))
           #_(cond
               (keyword? (:level f-map))
               (into {} (map (fn [[k [v]]] [k v])
                             (group-by :level (level-maps (:factor f-map) f-maps))))

               :else
               "spline levels not implemented yet"))))

(defn master-f-maps
  "Preprocess an inputs sheet before storing it"
  [organ inputs]
  ;(println "RAW INPUTS" (keys inputs))
  (->> inputs
       ; change to vector of maps form
       (map-of-vs->v-of-maps)

       ; remove non-factor rows
       (filter #(or (keyword? (:factor %)) (vector? (:factor %))))

       ; ensure all values like ":foo" become keyword :foo
       (map #(xf/map-vals xf/unstring-key %))

       ; group rows relating to the same factor
       (partition-by :factor)

       ; sort those groups by the :order column
       (sort-by (comp :order first))

       ; replace each group with a master f-map containing nested level detail
       (map #(master-f-map organ %))))

(defn selected-level-maps
  "Given the master-fmaps, and the current inputs, return a list of selected level-maps.
   numeric levels "
  [master-fmaps inputs]
  (let [x (->> master-fmaps
               (remove nil?)
               (map (fn [[factor fmap]]
                      (if (keyword? (:type fmap))
                        (get-in fmap [:levels (factor inputs)])
                        :numeric)))
               (remove nil?))]
    #_(println "selected-level-maps: " x)
    x))


(defn simple-level
  [factor]
  nil)

#_(get-in env [1 :-inputs :age :level])
(defn is-categorical?
  [[_ {:keys [-inputs]} _ :as env] factor]
  (let [level-key (get-in -inputs [factor :level])]
    (and (keyword? level-key) (not= level-key :x))))

(defn is-spline?
  [[{:keys [organ centre tool] :as path-params}
    {:keys [-inputs -baseline-cifs -baseline-vars :as bundle]}
    inputs :as env] factor]
  (let [master-level (get-in -inputs [factor :level])]
    ;master-level
    (and (string? master-level)
         (pos? (index-of master-level "spline")))))

(defn is-numeric?
  [[{:keys [organ centre tool] :as path-params}
    {:keys [-inputs -baseline-cifs -baseline-vars :as bundle]}
    inputs :as env] factor]
  (let [type (get-in -inputs [factor :type])]
    (map? (edn/read-string type))))

(defn is-cross-over?
  "Cross over factors contain a '*' in their names"
  [env factor]
  (pos? (index-of (name factor) "*")))

(defn split-cross-over
  [cross-over-factor]
  (map keyword (split (name cross-over-factor) #"\*")))

(defn join-cross-levels
  [[level1 level2]]
  (keyword (join "*" [(name level1) (name level2)])))

(defn lookup-simple-factor-level
  "The value (level) of input factors may be found in the tool path parameters or in the tool inputs.
   This function first looks in the organ inputs (e.g. :age is an input), then in the environment 
   (e.g. :centre which is determined by path-params). 
    The raw level is always returned - it may need further processing e.g. by a spline.
   If the factor is not found or it does not yet have a level, returns nil."
  [[{:keys [organ] :as path-params} _ inputs] factor]
  (if-let [level (get-in inputs [organ factor])]
    level
    (when-let [level (factor path-params)]
      level)))

(defn lookup-cross-over-factor-level
  "When we have a cross-over factor, we need to lookup each of its simple factor components, and
   join them together into a simple level. We then find in the level map inside the fmaps (the -inputs) for 
   that cross-over factor"
  [env factor]
  (->> factor
       (split-cross-over)
       (map #(lookup-simple-factor-level env %))
       (join-cross-levels)))

(defn lookup-simple-beta
  [master-fmap level beta-outcome-key]
  (if-let [beta (get-in master-fmap [:levels level beta-outcome-key])]
    beta
    0))

(defn lookup-numeric-beta
  [master-fmap beta-outcome-key]
  (beta-outcome-key master-fmap))

(defn lookup-numeric-input
  [[{:keys [organ] :as path-params} _ inputs] factor]
  (let [x (get-in inputs [organ factor])]
    (if (string? x) (edn/read-string x) x)))

(defn selected-beta-x
  [[_ bundle _ :as env] factor master-fmap beta-outcome-key]
  (cond
    ; Simple categorical levels.
    ; Lookup the level and use that to lookup the beta
    ; x will be 1 if the factor has been entered, else 0
    (is-categorical? env factor)
    (let [level-key (lookup-simple-factor-level env factor)
          beta (lookup-simple-beta master-fmap level-key beta-outcome-key)]
      [factor level-key beta])

    ; If the factor contains a "*" it's a cross-over factor with 2 components like :d-gp*centre. 
    ; We need to separate these components into a seq like [:d-gp :centre]
    ; Find the level of each e.g. [:copd :birm]
    ; And encode this as a single level e.g. :copd*birm
    ; 
    (is-cross-over? env factor)
    (let [level-key (lookup-cross-over-factor-level env factor)
          #_(->> factor (split-cross-over)
                         (map #(lookup-simple-factor-level env %))
                         (join-cross-levels))
          fmap (get-in bundle [:-inputs factor])
          beta (lookup-simple-beta master-fmap level-key beta-outcome-key)]
      
      #_(let [level-key (->> factor
                             (split-cross-over)
                             (map #(lookup-simple-factor-level env %))
                             (join-cross-levels))
              fmap (get-in bundle [:-inputs factor])]
          (fmap level-key))
      
      [factor level-key beta])

    #_(comment
        (def organ :lung)
        (def factor :d-gp*centre)
        (def level-key :other*hare)
        (def [factor fmap])
        (def beta-outcome-key :beta-transplant))

    ; Splined numeric inputs are defined by a spline function and its parameters defined in
    ; the master-fmap's :level - such as '[:spline :x :beta1 :beta2 :beta3]'
    ; This iindicates that the raw value x, must be processed by a call to the function spline 
    ; of the form '(spline x beta1 beta2 beta3).
    ; x is the raw input value for this factor
    ; The beta parameters can be located in the master factor map :levels using the 
    ; keywords :beta1, :beta2, :beta3, and a knowledge of the required outcome
    ; ("transplant" "removal" "death").
    ;  - First locate the corresponding level map in :levels
    ;  - Then find the beta(s) from the :beta-outcome column for the relevant outcome
    ;    (e.g. from :beta-transplant)
    ; (get-in master-f-map [])
    (is-spline? env factor)
    (let [spline-def (edn/read-string (get-in master-fmap [:level]))]
      [spline-def factor])


    (is-numeric? env factor)
    (let [[_ {:keys [-baseline-vars]} _] env
          x0 (factor -baseline-vars)
          beta (lookup-numeric-beta master-fmap beta-outcome-key)
          x (lookup-numeric-input env factor)
          x-x0 (- x x0)
          beta-x-x0 (* beta x-x0)]
      [factor beta x0 beta-x-x0])

    :else
    [:unclassified factor]))

(defn selected-beta-xs
  "returns a seq of all xs and betas (keyed by input factor?)"
  [[{:keys [organ centre tool] :as path-params}
    {:keys [-inputs -baseline-cifs -baseline-vars :as bundle]}
    inputs :as env*]
   beta-outcome-key]
  (->> -inputs
       ;(first)
       #_(filter (fn [[factor* master-fmap*]] 
                 (or
                  (= factor* :d-gp*centre)
                  (= factor* :age)
                  ;(= factor* :dd-pred)
                  )
                 ))
       (map (fn [[factor* master-fmap*]]
              #_(def master-fmap (get-in bundle [:-inputs :d-gp*centre]))
              #_(selected-beta-x env :d-gp*centre master-fmap :beta-transplant)
              #_[factor* master-fmap*]
              
              (selected-beta-x env* factor* master-fmap* beta-outcome-key))
            )))

(comment

  (split (name :copd-d-gp) #"\*")
  (index-of (name :copd*d-gp) "*")

  (def bundle
    (get-in @(rf/subscribe [::subs/bundles]) [:lung :birm :waiting]))

  ;(def inputs @(rf/subscribe [::subs/inputs]))
  ;inputs
  (def inputs {:lung {:age "30", :sex :male, :blood-group :B, :in-hosp :no, :ethnicity :white, :fvc "3", :bmi "30", :dd-pred :pred-1-14, :thoracotomy :no, :bilirubin "3", :nyha-class :nyha-2, :d-gp :pf}})

  (def path-params {:organ :lung, :centre :birm, :tool :waiting})

  (def env [path-params bundle inputs])

  #_(defn lookup-cross-over-factor-level
      [env factor]
      (let [master-fmap-level-transplant (get-in bundle [:-inputs :d-gp*centre :levels :pf*birm :beta-transplant])
            master-fmap (get-in bundle [:-inputs :d-gp*centre])
            fmap (get-in env [1 :-inputs factor])]
        (= master-fmap fmap)
        fmap
        #_master-fmap-level-transplant))

  (lookup-cross-over-factor-level env :d-gp*centre)



  (def master-fmaps (get-in bundle [:-inputs]))
  (def master-fmap (get-in bundle [:-inputs :d-gp*centre]))
  (def master-fmap-level (get-in bundle [:-inputs :d-gp*centre :levels :pf*birm]))
  ;=> {:beta-transplant -0.10624, :beta-death -0.35576, :info-box? nil, :beta-removal 0.11786, :level-name "PF and Birmingham", :beta-all-reasons -0.45309, :type :none, :sub-text nil, :level :pf*birm, :factor :d-gp*centre, :order -1, :factor-name nil}
  (def master-fmap-level-transplant (get-in bundle [:-inputs :d-gp*centre :levels :pf*birm :beta-transplant]))
  ;=> -0.10624

  (:centre (first env))

  (is-cross-over? env :d-gp*centre)
  (split-cross-over :d-gp*centre)
  (lookup-simple-factor-level env :age)
  (lookup-simple-factor-level env :centre)
  (lookup-simple-factor-level env :d-gp)

  (is-spline? env :bmi)
  (is-spline? env :age)
  (is-categorical? env :bmi)
  (is-numeric? env :bmi)
  (lookup-simple-factor-level env :bmi)
  (lookup-simple-factor-level env :dd-pred)

  ; FAIL! but then :d-gp*centre is NOT a simple factor, it's a crossover. So actually OK!
  (lookup-simple-factor-level env :d-gp*centre)

  ; So we need to call this instead...
  (lookup-cross-over-factor-level env :d-gp*centre)


  (selected-beta-x env :d-gp*centre master-fmap :beta-transplant)
  (selected-beta-x env :dd-pred master-fmap :beta-transplant)
  (selected-beta-x env :ethnicity master-fmap :beta-transplant)
  (selected-beta-xs env :beta-transplant)

  ;=> ([:d-gp*centre nil 0] [:spline :age] [:dd-pred :pred-1-14 0.15256] [:nyha-class :3 0.33294] [:spline :fvc] [:in-hosp :yes 0] [:sex :male 0.24638] [:d-gp :pf -0.23764] [:blood-group :B -0.73794] [:ethnicity :non-white 0] [:bmi "15" 0] [:bilirubin "7" 0] [:thoracotomy :yes 0])
  ;=> ([:d-gp*centre nil 0] [:spline :age] [:dd-pred :pred-1-14 0.15256] [:nyha-class :3 0.33294] [:spline :fvc] [:in-hosp :yes 0] [:sex :male 0.24638] [:d-gp :pf -0.23764] [:blood-group :B -0.73794] [:ethnicity :non-white 0] [:bmi "15" 0] [:bilirubin "7" 0] [:thoracotomy :yes 0])
  ;=> (:cf*birm [:beta-transplant :age] "." "." [:beta-transplant :fvc] "." "." "." "." "." "." "." ".")
  ;=> (:cf*birm ["spline" :age] "." "." ["spline" :fvc] "." "." "." "." "." "." "." ".")
  )


