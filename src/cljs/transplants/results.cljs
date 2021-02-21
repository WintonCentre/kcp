(ns transplants.results
  (:require [re-frame.core :as rf]
            [transplants.events :as events]
            [transplants.subs :as subs]
            [transplants.factors :as fac]
            [transplants.bundles :as bun]
            [transplants.vis2 :as vis2]
            ["recharts" :as rech]
            [transplants.ui :as ui]
            [transplants.utils :as utils]))


(defn s-baseline-t
  "Given a baseline-cif table and an outcome cif-key and an interval dt, 
   return a table of S_baseline maps at regular intervals dt spanning the times in the data"
  [baseline-cifs  dt]
  (loop [r0 baseline-cifs          ;; current
         r1 (drop 1 baseline-cifs) ;; look-ahead
         t dt
         rv [(first r0)]] ;; first entry starts with survival 1
    (if (seq r0)
      (if (seq r1)
        (if (< t (:days (first r1)))
          (recur r0 r1 (+ t dt) (conj rv (assoc (first r0) :days t)))
          (recur (rest r0) (rest r1) (+ t dt) (conj rv (assoc (first r1) :days t))))
        rv)
      rv)))

(def bc->v 
  "Returns a function that converts a vector of [k v] maps to a vecror"
  (juxt :days :cif-transplant :cif-death))



(defn s-baseline-v
  "Given a baseline-cif table and an outcome cif-key and an interval dt, 
   return a table of S_baseline maps at regular intervals dt spanning the times in the data"
  [baseline-v dt]
  (loop [r0 baseline-v          ;; current
         r1 (drop 1 baseline-v) ;; look-ahead
         t dt
         rv [(first r0)]] ;; first entry starts with survival 1
    (if (seq r0)
      (if (seq r1)
        (if (< t ((first r1) 0))
          (recur r0 r1 (+ t dt) (conj rv (assoc (first r0) 0 t)))
          (recur (rest r0) (rest r1) (+ t dt) (conj rv (assoc (first r1) 0 t))))
        rv)
      rv)))

;; $$
;; H(t) = -log(S(t))
;; $$
;; Where you calculate $S(t)$ for a particular patient combination in the usual way by:
;; $$
;; S(t) = S_0(t)^\exp{beta_0 x_0 + beta_1 x_1 + ...}
;; $$

;; Adopting the notation of the R code where capHtx/rem is the cumulative (c) ap? Hazard function of "transplant" "death/removal"
(defn H [outcome sum-x-betas oct-bundle]
  (let [S (:-S0-outcome oct-bundle)
        H (map (comp - js/Math.log) S)])
  )

(defn survival [outcome baseline-cifs sum-x-betas oct-bundle day]
  (let [s-outcome-day (js/Math.pow (bun/cif-0 oct-bundle day) (js/Math.exp sum-x-betas))]))




(comment
  (assoc  [1 2 3] 0 9)
  ;; => [9 2 3]

  (utils/transpose [[1 2 3 4] [-1 -2 -3 -4]])
  ;; => ([1 -1] [2 -2] [3 -3] [4 -4])
  
  (utils/transpose '([1 -1] [2 -2] [3 -3] [4 -4]))
  ;; => ([1 2 3 4] [-1 -2 -3 -4])
  0)


(defn competing-risks
  "Inputs to a competing risks algorithm for multistage survival.
   survival: A table of S_i(time) containing a seq of maps such as 
                  {:days 860, :transplant 0.1183483505, :death 0.4769499187}
                  [In David's notation this is: exp(- H_i(t))]
   Note that all S_outcome(time) can be extracted from this map.
   Note also that the times tabulated may be derived from a smoothed curve
      
   
   cif-0: "
  [H0]
  )


(comment
  ; this is fac/sum-beta-xs
  (defn sum-beta-xs
    "returns sum of all xs and betas for an outcome"
    [[{:keys [organ centre tool] :as path-params}
      {:keys [-inputs -baseline-cifs -baseline-vars :as bundle]}
      inputs :as env]
     beta-outcome-key]
    (->> -inputs
         (map (fn [[factor master-fmap]]
                (fac/selected-beta-x env factor master-fmap beta-outcome-key)))
         (map last)
         (apply +)))



  (def day 100)
  (def route @(rf/subscribe [::subs/current-route]))
  (def tools @(rf/subscribe [::subs/tools]))
  (def organ-centres @(rf/subscribe [::subs/organ-centres]))
  (def bundles @(rf/subscribe [::subs/bundles]))
  (def oct-names (utils/path-names (:path-params route)))
  (def oct-keys (map keyword oct-names))
  (def oct-bundle (get-in bundles oct-keys))
  (def baseline-cifs  (:-baseline-cifs oct-bundle))
  (def baseline-cifs-for-day (bun/cif-0 oct-bundle day))
  (def outcome-names (fac/get-outcomes* (bun/cif-0 oct-bundle day)))
  (def outcome-keys (map keyword outcome-names))

  (def beta-outcome-keys (map #(keyword (str "beta-" %)) outcome-names))
  (def cif-outcome-keys (map #(keyword (str "cif-" %)) outcome-names))
  (def inputs @(rf/subscribe [::subs/inputs]))
  (def env [oct-names oct-bundle inputs])

  ;; YOU ARE HERE!!!

  (def  sum-betas (map #(fac/sum-beta-xs env %) beta-outcome-keys))
  0)

(def waiting-fill "#0088EE" #_"#7C91D8")
(def transplant-fill "#66CC88" #_"#44dd99")
(def death-fill "#002244")
(def survival-fill "#927AAA")
(def graft-fill "#0099DD")



(defn results-panel
  "Display results.
   TODO: REMOVE HARD_CODED TOOL KEYWORDS AND TEXTS"
  [bundles organ centre tool]
  ;(println ::results-panel "render")
  (let [day @(rf/subscribe [::subs/test-day])
        inputs (get @(rf/subscribe [::subs/inputs]) organ)
        bundle (bun/get-bundle organ centre tool)
        {:keys [from-year to-year]} @(rf/subscribe [::subs/cohort-dates])
        selected-vis @(rf/subscribe [::subs/selected-vis])]
    
    
    [:<>
     [:p "These are the outcomes we would expect for people who entered the same information as you, based
        on patients who joined the waiting list between " from-year " and " to-year "."]
     [ui/tabs {:variant "pills" :default-active-key selected-vis
               :active-key selected-vis
               :on-select #(rf/dispatch [::events/selected-vis %])}
      #_[ui/tab {:event-key "bars" :title "Bar Chart"}
       #_(condp = tool
         :waiting
         [:<>
          [vis/bar-chart {:organ organ
                          :centre centre
                          :tool tool
                          :inputs inputs
                          :bundle bundle
                          :rubric [:<>
                                   [:h4 "Proportions of people waiting, transplanted, died or removed"]
                                   [:p "As time goes by, people on the waiting list either receive a transplant or leave the list due to death or some other reason."]]
                          :bar-info [{:key "transplant"
                                      :stack-id "a"
                                      :bar-label :none
                                      :label "Transplanted" :fill transplant-fill :ciff nth :hide false}
                                     {:key "waiting"
                                      :stack-id "a"
                                      :bar-label {:fill "#fff" :at :centre}
                                      :title "How long are these people stay on the list?"
                                      :label "Still waiting" :fill waiting-fill :ciff (fn [cifs i]
                                                                                        (- 200
                                                                                           (+ (nth cifs 0)
                                                                                              (- 100 (nth cifs 2))))) :hide false}
                                     {:key "death"
                                      :stack-id "a"
                                      :bar-label :none
                                      :label "Died" :fill death-fill :ciff (fn [cifs i] (- 100 (nth cifs 2))) :hide false}]
                          :y-range [0 200]}]]
         :post-transplant
         [vis/bar-chart {:organ organ
                         :centre centre
                         :tool tool
                         :inputs inputs
                         :bundle bundle
                         :rubric [:h4 "About how long do these people survive after a transplant?"]
                         :bar-info [{:key "post-transplant" :label "Survival post-transplant" :fill survival-fill :ciff nth :hide false}]}]

         #_#_:from-listing
           [vis/bar-chart {:organ organ
                           :centre centre
                           :tool tool
                           :inputs inputs
                           :bundle bundle
                           :rubric [:h4 "About how long do these people survive after being listed?"]
                           :bar-info [{:key "from-listing" :label "Survival from listing" :fill "#7A79C2" :ciff nth :hide false}]}]

         :survival
         [vis/bar-chart {:organ organ
                         :centre centre
                         :tool tool
                         :inputs inputs
                         :bundle bundle
                         :rubric [:h4 "About how long do these people survive after a transplant?"]
                         :bar-info [{:key "survival" :label "Patient survival post-transplant" :fill survival-fill :ciff nth :hide false}]}]

         :graft
         [vis/bar-chart {:organ organ
                         :centre centre
                         :tool tool
                         :inputs inputs
                         :bundle bundle
                         :rubric [:h4 "About how long does the graft survive?"]
                         :bar-info [{:key "graft" :label "Graft survival" :fill graft-fill :ciff nth :hide false}]}]
         :ldsurvival
         [vis/bar-chart {:organ organ
                         :centre centre
                         :tool tool
                         :inputs inputs
                         :bundle bundle
                         :rubric [:h4 "About how long do these people survive after a transplant from a living donor?"]
                         :bar-info [{:key "ldsurvival" :label "Patient survival post-transplant" :fill survival-fill :ciff nth :hide false}]}]

         :ldgraft
         [vis/bar-chart {:organ organ
                         :centre centre
                         :tool tool
                         :inputs inputs
                         :bundle bundle
                         :rubric [:h4 "About how long does the graft from a living donor survive?"]
                         :bar-info [{:key "ldgraft" :label "Graft survival" :fill graft-fill :ciff nth :hide false}]}])]


      #_[ui/tab {:event-key "area" :title "Area Chart"}
       (do
         ;(rf/dispatch [::events/selected-vis "area"])
         #_(condp = tool
           :waiting
           [vis/area-chart {:organ organ
                            :centre centre
                            :tool tool
                            :inputs inputs
                            :bundle bundle
                            :rubric [:<>
                                     [:h4 "Proportions of people waiting, transplanted, died or removed"]
                                     [:p "As time goes by, people on the waiting list either receive a transplant or leave the list due to death or some other reason."]]
                            :bar-info [{:key "transplant"
                                        :stack-id "a"
                                        :bar-label :none
                                        :label "Transplanted" :fill transplant-fill :ciff nth :hide false}
                                       {:key "waiting"
                                        :stack-id "a"
                                        :bar-label {:fill "#fff" :at :centre}
                                        :title "How long are these people stay on the list?"
                                        :label "Still waiting" :fill waiting-fill :ciff (fn [cifs i]
                                                                                          (- 200
                                                                                             (+ (nth cifs 0)
                                                                                                (- 100 (nth cifs 2))))) :hide false}
                                       {:key "death"
                                        :stack-id "a"
                                        :bar-label :none
                                        :label "Died" :fill death-fill :ciff (fn [cifs i] (- 100 (nth cifs 2))) :hide false}]
                            :y-range [0 200]}]

           :post-transplant
           [vis/area-chart {:organ organ
                            :centre centre
                            :tool tool
                            :inputs inputs
                            :bundle bundle
                            :rubric [:h4 "About how long do these people survive after a transplant?"]
                            :bar-info [{:key "post-transplant" :label "Survival post-transplant" :fill survival-fill :ciff nth :hide false}]}]

           :from-listing
           [vis/area-chart {:organ organ
                            :centre centre
                            :tool tool
                            :inputs inputs
                            :bundle bundle
                            :rubric [:h4 "About how long do these people survive after being listed?"]
                            :bar-info [{:key "from-listing" :label "Survival from listing" :fill "#7A79C2" :ciff nth :hide false}]}]

           :survival
           [vis/area-chart {:organ organ
                            :centre centre
                            :tool tool
                            :inputs inputs
                            :bundle bundle
                            :rubric [:h4 "About how long do these people survive after a transplant?"]
                            :bar-info [{:key "survival" :label "Patient survival post-transplant" :fill survival-fill :ciff nth :hide false}]}]

           :graft
           [vis/area-chart {:organ organ
                            :centre centre
                            :tool tool
                            :inputs inputs
                            :bundle bundle
                            :rubric [:h4 "About how long does the graft survive?"]
                            :bar-info [{:key "graft" :label "Graft survival" :fill graft-fill :ciff nth :hide false}]}]
           :ldsurvival
           [vis/area-chart {:organ organ
                            :centre centre
                            :tool tool
                            :inputs inputs
                            :bundle bundle
                            :rubric [:h4 "About how long do these people survive after a transplant from a living donor?"]
                            :bar-info [{:key "ldsurvival" :label "Patient survival post-transplant" :fill survival-fill :ciff nth :hide false}]}]

           :ldgraft
           [vis/area-chart {:organ organ
                            :centre centre
                            :tool tool
                            :inputs inputs
                            :bundle bundle
                            :rubric [:h4 "About how long does the graft survive?"]
                            :bar-info [{:key "ldgraft" :label "Graft survival" :fill graft-fill :ciff nth :hide false}]}]))]
      #_[ui/tab {:event-key "icons" :title "Icon Array"}
       #_(condp = tool
         :waiting
         [:<>
          [vis/icon-array {:organ organ
                           :centre centre
                           :tool tool
                           :inputs inputs
                           :bundle bundle
                           :rubric [:<>
                                    [:h4 "About how long do these people stay on the list?"]
                                    [:p "People will leave the list if they get a transplant, die,
                                       or are removed for some other reason."]]
                           :bar-info [{:key "waiting"
                                       :title "How long do these people stay on the list?"
                                       :label "Still waiting" :fill waiting-fill :ciff nth :hide false}
                                      {:key "transplant" :label "Transplanted" :fill transplant-fill :ciff nth :hide true}
                                      {:key "death" :label "Died" :fill death-fill :ciff nth :hide true}]}]
          [vis/icon-array {:organ organ
                           :centre centre
                           :tool tool
                           :inputs inputs
                           :bundle bundle
                           :rubric [:<>
                                    [:h4 "When are these people likely to receive a transplant?"]
                                    [:p "By way of example, the 'Year 2' value tells you how many people are likely to get a transplant  in year 2 after already having waited one year."]]

                           :bar-info [{:key "waiting" :label "Waiting" :fill waiting-fill :ciff nth :hide true}
                                      {:key "transplant" :label "Transplanted" :fill transplant-fill :ciff nth}
                                      {:key "death" :label "Died" :fill death-fill :ciff nth :hide true}]}]

          [vis/icon-array {:organ organ
                           :centre centre
                           :tool tool
                           :inputs inputs
                           :bundle bundle
                           :rubric [:<>
                                    [:h4 "Some of these people may die or be removed from the list"]]
                           :bar-info [{:key "waiting" :label "Waiting" :fill waiting-fill :ciff nth :hide true}
                                      {:key "transplant" :label "Transplanted" :fill transplant-fill :ciff nth :hide true}
                                      {:key "death" :label "Died" :fill death-fill :ciff nth :stack-id "b"}
                                      #_{:key "died or removed" :label "Died or removed" :fill "#666" :stroke death-fill :hide true
                                         :ciff (fn [cifs i] (apply + (map #(nth cifs %) [2 3])))}]}]

          [vis/icon-array {:organ organ
                           :centre centre
                           :tool tool
                           :inputs inputs
                           :bundle bundle
                           :rubric [:<>
                                    [:h4 "Sanity check on model"]
                                    [:p "The top of each stacked bar should always be close to 100%. 
                                        However, each bar shows the combined result of 4 independent 
                                        statistical models, each with its own error."]]
                           :bar-info [{:key "waiting"
                                       :stack-id "a"
                                       :bar-label {:fill "#fff" :at :centre}
                                       :title "How long are these people stay on the list?"
                                       :label "Still waiting" :fill waiting-fill :ciff nth :hide false}
                                      {:key "transplant"
                                       :stack-id "a"
                                       :bar-label :none
                                       :label "Transplanted" :fill transplant-fill :ciff nth :hide false}
                                      {:key "death"
                                       :stack-id "a"
                                       :bar-label :none
                                       :label "Died" :fill death-fill :ciff nth :hide false}]}]]
         :post-transplant
         [vis/icon-array {:organ organ
                          :centre centre
                          :tool tool
                          :inputs inputs
                          :bundle bundle
                          :rubric [:h4 "About how long do these people survive after a transplant?"]
                          :bar-info [{:key "post-transplant" :label "Survival post-transplant" :fill survival-fill :ciff nth :hide false}]}]

         :from-listing
         [vis/icon-array {:organ organ
                          :centre centre
                          :tool tool
                          :inputs inputs
                          :bundle bundle
                          :rubric [:h4 "About how long do these people survive after being listed?"]
                          :bar-info [{:key "from-listing" :label "Survival from listing" :fill "#7A79C2" :ciff nth :hide false}]}]

         :survival
         [vis/icon-array {:organ organ
                          :centre centre
                          :tool tool
                          :inputs inputs
                          :bundle bundle
                          :rubric [:h4 "About how long do these people survive after a transplant?"]
                          :bar-info [{:key "survival" :label "Patient survival post-transplant" :fill survival-fill :ciff nth :hide false}]}]

         :graft
         [vis/icon-array {:organ organ
                          :centre centre
                          :tool tool
                          :inputs inputs
                          :bundle bundle
                          :rubric [:h4 "About how long does the graft survive?"]
                          :bar-info [{:key "graft" :label "Graft survival" :fill graft-fill :ciff nth :hide false}]}]
         :ldsurvival
         [vis/icon-array {:organ organ
                          :centre centre
                          :tool tool
                          :inputs inputs
                          :bundle bundle
                          :rubric [:h4 "About how long do these people survive after a transplant from a living donor?"]
                          :bar-info [{:key "ldsurvival" :label "Patient survival post-transplant" :fill survival-fill :ciff nth :hide false}]}]

         :ldgraft
         [vis/icon-array {:organ organ
                          :centre centre
                          :tool tool
                          :inputs inputs
                          :bundle bundle
                          :rubric [:h4 "About how long does the graft from a living donor survive?"]
                          :bar-info [{:key "ldgraft" :label "Graft survival" :fill graft-fill :ciff nth :hide false}]}])]
      #_[ui/tab {:event-key "table" :title "Table"}
       [:div "not yet"]]
      
      [ui/tab {:variant "secondary"
               :event-key "test" :title "Test"}
       [vis/test-rig {:organ organ
                      :centre centre
                      :tool tool
                      :day day
                      :inputs inputs
                      :bundle bundle
                      :rubric [[:h4 "Test Rig"]]
                      :bar-info nil}]]]]))
