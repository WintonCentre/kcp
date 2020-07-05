(ns transplants.factors
  (:require [clojure.string :refer [starts-with?]]
            [clojure.pprint :refer [pprint]]
            [winton-utils.data-frame :refer [map-of-vs->v-of-maps]]
            [transplants.transforms :as xf]))

(comment
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
     :factor-name '("Sex" nil nil "Age (years)" nil nil nil nil nil nil "Ethnicity" nil nil "Blood group" nil nil nil nil "Matchability group" nil nil nil "Graft number" nil nil "Dialysis at registration?" nil nil "Highly sensitised?" nil nil "Primary renal disease - diabetes?" nil nil nil nil nil nil nil nil nil nil nil)}
    )

  (pprint (->> inputs
               (map-of-vs->v-of-maps)
               ;(filter #(= (:factor %) :sex)
               ))

  (pprint (->> inputs
               (map-of-vs->v-of-maps)
               (filter #(keyword? (:factor %)))
               (map #(xf/map-vals xf/unstring-key %))
               (partition-by :factor)
               (sort-by (comp :order first)))))

(reduce conj [:beta-1 :beta-2] [:level :level-name])

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
       (lookup-beta-keys)))

(defn level-maps*
  "Given a seq of input-maps all for the same factor, collect all level information under the first of these,
   and return that fmap. "
  [factor f-maps]
  (map #(assoc % :label (:level-name %)) f-maps)
  )

(defn master-f-map
  "Given a collection of f-maps all relating to the same factor, return a master f-map 
   containing nested detail relating to levels"
  [organ f-maps]
  (let [f-map (first f-maps)
        categorical-levels (group-by :level (filter (comp keyword? :level) (level-maps* (:factor f-map) f-maps)))]
         ;(js/console.log "beta-keys")
         ;(js/console.log beta-keys)
    (assoc f-map
           :factor-key (keyword organ (xf/unstring-key (:factor f-map)))
           :levels (level-maps* (:factor f-map) f-maps)
           :categorical-levels categorical-levels))
  )

(defn factor-maps
  "Preprocess an inputs sheet before storing it"
  [organ inputs]
  (->> inputs
       ; change to vector of maps form
       (map-of-vs->v-of-maps)
       
       ; remove non-factor rows
       (filter #(keyword? (:factor %)))
       
       ; ensure all values like ":foo" become keyword :foo
       (map #(xf/map-vals xf/unstring-key %))
       
       ; group rows relating to the same factor
       (partition-by :factor)
       
       ; sort those groups by the :order column
       (sort-by (comp :order first))
       
       ; replace each group with a master f-map containing nested level detail
       (map #(master-f-map organ %))
       ))

