(ns kcp.transforms
  "db value transforms"
  (:require  [winton-utils.data-frame :refer [map-of-vs->v-of-maps]]
             [clojure.string :refer [starts-with? trim]]
             [clojure.pprint :refer [pprint]]))

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
  ;
  ; problem2: We need to register subscriptions on the fly. However different tools overlap in their factor requirements and this
  ; can mean that the same factor is registered multiple times on the same organ. We assume that if factors have the same name, then
  ; they are in clinical practice the same (if not, change their name!), and so it is OK to use just the one at run-time for all tools 
  ; that refer to it.
  ; 
  ; re-frame default behaviour is to warn if a subsscription or event has been previously registered on a key. 
  ; That's OK - the warning is useful. In production the warning can be ignored as the most recent registration prevails. 
  ;
  ; What's not so helpful is that the old subscription is not removed when the new one is created so there is a possible small 
  ; memory leak each time the configuration is read in (unless garbage collection can handle it). However, since we only 
  ; read configuration once at startup, the leak is bounded.
  ; 
  )

(defn map-vals [f m]
  (into {} (map (fn [[k v]] [k (f v)]) m)))

(defn unstring-key
  "ks is a string starting with a colon. Convert it to a true keyword.
   Useful when processing ':keyword' values readin from a spreadsheet into true keywords.
   
   Single arity returns a global key. Double arity returns a namespaced key"
  ([ks]
   (unstring-key nil ks))
  ([nsp ks]
   (let [nsp (if (string? nsp) (trim nsp) nsp)
         ks (if (string? ks) (trim ks) ks)]
     (if (and ks (string? ks) (starts-with? ks ":"))
       (keyword nsp (subs ks 1)) 
       ks))))

(comment
  (unstring-key ":hello")
  ;; => :hello

  (unstring-key ":foo/bar")
  (unstring-key " :foo/bar ")
    ;; => " :foo/bar "
  0)
  ;=> :hello)

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
               (map #(map-vals unstring-key %))
               (partition-by :factor)
               (sort-by (comp :order first))))
  )


(comment
  (map-vals #(* 2 %) {:A 1 :B 3})

  
  (unstring-key nil)

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
  
  

