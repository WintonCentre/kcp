(ns transplants.transforms
  "db value transforms"
  (:require  [winton-utils.data-frame :refer [map-of-vs->v-of-maps]]
             [transplants.shared :as shared]
             ))

(comment
  ; problem1:
  ; 
  ; Transform an inputs sheet into a set of widget input maps
  (def widget-inputs-map
    "Example of a widget-inputs-map"
    {:factor-key [:kidney :sex]
     :levels [{:level :male
               :label "Male"}
              {:level :female
               :label "Female"}]
     :default :male})
  
  ; problem2: We need to register subscriptions on the fly. However different tools overlap in their factor requirements and this
  ; can mean that the same factor is registered multiple times on the same organ. We assume that if factors have the same name, then
  ; they are in clinical practice the same (if not, change their name!), and so it is OK to use just the one at run-time for all tools 
  ; that refer to it.
  ; 
  ; re-frame default behaviour is to warn if a subsscription ore event has been previously registered on a key. 
  ; That's OK - the warning is useful. In production the warning can be ignored as the most recent registration prevails. There is
  ; 
  )

(defn map-vals [f m]
  (into {} (map (fn [[k v]] [k (f v)]) m)))

(defn valid-keystring?
  [s]
  (and s (string? s) (= (first s) ":")))

; todo: Move shared/unstring-key calls - they should happend soon after data is acquired
(defn inputs->factor-maps
  "Preprocess an inputs sheet before storing it"
  [organ inputs]
  
  (map
   (fn [ins]
     (let [f-map (first ins)]
       (assoc f-map 
              :factor-key (keyword organ (shared/unstring-key (:factor f-map)))
              :levels (map (fn [{:keys [level level-name]}]
                             {:level level
                              :label level-name}) ins))))
   (->> inputs
        (map-of-vs->v-of-maps)
        (filter #(valid-keystring? (:factor %)) )
        (map #(map-vals shared/unstring-key %))
        (partition-by :factor)
        (sort-by (comp :order first)))))


(comment
  (map-vals #(* 2 %) {:A 1 :B 3})

  
  (shared/unstring-key nil)

  (def tool-inputs {:beta-transplant '(nil nil 0 -0.06289 nil 0.60387 0.46442 0.26097 0 -0.28334 -0.77722 nil 0 -0.01539 nil 0 0.54305 0.00727 0.54305 nil 0 -0.28893 -0.61033 nil 0 -0.35381 nil 0 0.29132 nil 0 -0.74768 nil 0 -0.32635 nil nil nil nil nil)
                    :beta-death '(nil nil 0 -0.10852 nil -1.43819 -1.04978 -0.57859 0 0.09774 0.13967 nil 0 -0.26636 nil 0 -0.19369 0.03454 -0.19369 nil 0 0.09036 0.14314 nil 0 0.46463 nil 0 -0.50041 nil 0 0.33496 nil 0.86605 0 nil nil nil nil nil)
                    :info-box? '(nil nil "Male" "Female" nil nil nil nil nil nil nil nil :yes nil nil nil nil nil nil nil :yes nil nil nil nil nil nil nil nil nil nil nil nil nil nil nil nil nil nil nil)
                    :beta-removal '(nil nil 0 0.01097 nil -0.99622 -0.75824 -0.43028 0 0.66553 1.56677 nil 0 -0.13979 nil 0 -0.19443 -0.03596 -0.19443 nil 0 0.09631 0.2109 nil 0 -0.10169 nil 0 -0.31226 nil 0 0.32677 nil 0.18723 0 nil nil nil nil nil)
                    :level-name '(nil nil "Male" "Female" nil 18 - 29  30 - 39 40 - 49 50 - 59 60 - 69 70 + nil "White" "Non-white" nil "O" "A" "B" "AB" nil "easy" "moderate" "difficult" nil "first" "re-graft" nil "Yes" "No" nil "No" "Yes" nil "No" "Yes" nil nil nil nil nil)
                    :beta-all-reasons '(nil nil 0 -0.10876 nil 0.3303 0.22041 0.09241 0 -0.03388 0.11484 nil 0 -0.09953 nil 0 0.57296 0.00578 0.57296 nil 0 -0.29547 -0.62205 nil 0 -0.32497 nil 0 0.11702 nil 0 -0.56793 nil 0 0.05058 nil nil nil nil nil)
                    :type '(nil nil :radio nil nil :dropdown nil nil nil nil nil nil :radio nil nil :radio nil nil nil nil :dropdown nil nil nil :radio nil nil :radio nil nil :radio nil nil :radio nil nil nil nil nil nil)
                    :sub-text '(nil nil "Sex" nil nil "Age (years)" nil nil nil nil nil nil nil nil nil nil nil nil nil nil "match score 1-3" "match score 4-6" "match score 7-10" nil "No" "previous graft" "Replacing previous graft" nil nil nil nil "cRF less than 85%" "cRF 85% or more" nil nil "?" nil nil nil nil nil)
                    :level '(nil nil :male :female nil :18+ :30+ :40+ :50+ :60+ :70+ nil :white :non-white nil :O :A :B :AB nil :easy :moderate :difficult nil :first :re-graft nil :yes :no nil :no :yes nil :no :yes nil nil nil nil nil)
                    :factor '(nil nil :sex :sex nil :age :age :age :age :age :age nil :ethnicity :ethnicity nil :blood-group :blood-group :blood-group :blood-group nil :matchability :matchability :matchability nil :graft :graft nil :dialysis :dialysis nil :sensitised :sensitised nil :diabetes :diabetes nil nil nil nil nil)
                    :order '(nil nil 1 1 nil 1.2 1.2 1.2 1.2 1.2 1.2 nil 1.3 1.3 nil 1.4 1.4 1.4 1.4 nil 1.5 1.5 1.5 nil 1.6 1.6 nil 1.7 1.7 nil 1.8 1.8 nil 1.9 1.9 nil nil nil nil nil)
                    :factor-name '(nil nil "Sex" nil nil "Age (years)" nil nil nil nil nil nil "Ethnicity" nil nil "Blood group" nil nil nil nil "Matchability group" nil nil nil "Graft number" nil nil "Dialysis at registration?" nil nil "Highly sensitised?" nil nil "Primary renal disease - diabetes?" nil nil nil nil nil nil)})
  tool-inputs
  
  (def factor-rows
    (->> tool-inputs
         (map-of-vs->v-of-maps)
         (filter :factor)
         (sort-by :order)
         (partition-by :factor)
         ))
  (first factor-rows)
  (comment 
    ({:beta-transplant 0, :beta-death 0, :info-box? "Male", :beta-removal 0, :level-name "Male", :beta-all-reasons 0, :type :radio, :sub-text "Sex", :level :male, :factor :sex, :order 1, :factor-name "Sex"} 
     {:beta-transplant -0.06289, :beta-death -0.10852, :info-box? "Female", :beta-removal 0.01097, :level-name "Female", :beta-all-reasons -0.10876, :type nil, :sub-text nil, :level :female, :factor :sex, :order 1, :factor-name nil}))
)
  
  

