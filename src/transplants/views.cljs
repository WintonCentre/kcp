(ns transplants.views
  (:require
   [clojure.string :as string]
   [re-frame.core :as rf]
   ["react-bootstrap" :as bs]
   [transplants.bundles :as bun]
   [transplants.utils :as utils]
   [transplants.subs :as subs]
   [transplants.events :as events]
   [transplants.ui :as ui]
   [transplants.paths :as paths]
   [transplants.widgets :as widg]
   [transplants.results :as results]
   [transplants.print-fills :as prf]
   [shadow.debug :refer [locals ?> ?-> ?->>]]))

(comment
  (rf/dispatch [::events/initialize-db]))

;;; Views ;;;
(defn home-page
  "Display a generic home page. 
   Minimally, navigation from here to an organ home page."
  []
  ;; This needs to be a promise....
  (let [mdata @(rf/subscribe [::subs/mdata])]
    ;(locals)
    (if mdata
      [ui/page "Trac tools"
       [ui/row
        [ui/col
         (into [:div {:style {:margin-bottom 20}}
                (map (fn [organ]
                       [:div {:key (get-in mdata [organ :text])
                              :style {:margin-bottom 20}}
                        [ui/button {:id (str (name organ) "-button")
                                    :variant "primary"
                                    :on-click #(rf/dispatch [::events/navigate ::organ {:organ organ}])}
                         (get-in mdata [organ :label])]])
                     (mdata :organ-order))])]]]
      [ui/loading])))

(defn organ-home
  "The organ home pages need organ centres data to render. And it's handy to detect small screens.
   Minimally, navigate to an organ centre home page."
  []
  (let [window-width @(rf/subscribe [::subs/window-width])
        mdata @(rf/subscribe [::subs/mdata])
        organ (get-in @(rf/subscribe [::subs/current-route]) [:path-params :organ])
        centres @(rf/subscribe [::subs/organ-centres])
        mobile (<= window-width ui/mobile-break)]
    ;;
    ;; Insert Kidney or Lung home page here
    ;;
    [ui/card-page "Choose your transplant centre" ; todo: configure
     (if-not centres
       [:div "loading /" organ " centres"]
       (if-not mdata
         [:div "Loading /metadata.edn"]
         (let [centres (sort-by :description ((keyword organ) centres))
               centres (filter #(utils/filled-in? (:description %)) centres)
               tools (utils/get-tools mdata organ)
               centre-card (fn [centre]
                             [ui/centre-card mobile
                              {:img-src (:image centre)
                               :organ organ
                               :link [::organ-centre {:organ organ :centre (name (:key centre))}]
                               :centre (:key centre)
                               :hospital (:description centre)
                               :width 200
                               :tools tools}])]
           (into (ui/centre-card-deck mobile)
                 (map centre-card centres)))))]))

;;
;; Move background info to config
;;

(def guidances
  {:percent "What does a percentage look like?"
   :visits "Visits to hospital after transplant"
   :donors "Donor Decisions"
   :medications "Medications after Transplant Surgery"
   :window "The Window"
   :graft-failure "What are my options if my new kidney fails?"
   :lung-numbers "Lung transplants - 2019 - 2020 numbers"
   :kidney-numbers "Kidney transplants - 2019 - 2020 numbers"})

(defmulti show-guidance
  "Render the selected background info"
  :info-key)

(defmethod show-guidance :visits []
  [:<>
   [:h3 (:visits guidances)]
   [:p "A typical patient might revisit"]
   [:ul
    [:li "in the first month 	-  once a week,"]
    [:li "in the second month - every other week,"]
    [:li "in the third month 	- every other week,"]
    [:li "in the first year	- every 4 weeks,"]
    [:li "then every 3 months for life"]]])

(defmethod show-guidance :donors []
  [:<>
   [:h3 (:donors guidances)]
   [:p "A checklist of donor factors that may affect a decision."]
   [:ul
    [:li "Recent or ex smoker"]
    [:li "Older donor (>60 years)"]
    [:li "Donor with a malignancy that has very low risk of transmission to me"]
    [:li "Bacterial or viral infection considered to be low risk to me"]
    [:li "High risk sexual behaviour or intravenous drug use"]]])

(defmethod show-guidance :medications []
  [:<>
   [ui/row
    [ui/col
     [:h3 (:medications guidances)]]]
   [ui/row
    [ui/col {:md 5}
     [:ul
      [:li "Cyclosporines"]
      [:li "Tacrolimus"]
      [:li "Mycophenolate Mofetil"]
      [:li "Prednisolone"]
      [:li "Azathuiprine"]
      [:li "Sirolimus"]
      [:li "Dacllizumab and Basilecmab"]
      [:li "OKT3"]
      [:li "Anti-Fungal Medications"]
      [:li "Antiviral Medications"]
      [:li "Diuretics"]
      [:li "Antibiotics"]
      [:li "Anti-ulcer medications"]]]
    #_[ui/col {:md 6}
     [:> bs/Image {:fluid true
                   :src "assets/Post Transplant Medications.png"}]]]])


(defmethod show-guidance :window []
  [:<>
   [:h3 (:window guidances)]
   [:p "This is a diagram drawn by a clinician. As the health of a transplant candidate
        decreases, there comes a point where a transplant could be recommended. This opens
        a window of opportunity which persists until the patient receives a transplant or
        their health deteriorates to the point where it would no longer be recommended."]
   [:> bs/Image {:fluid true
                 :src "assets/The Window.png"}]])


(defmethod show-guidance :graft-failure []
  [:<>
   [:h3 (:graft-failure guidances)]
   [ui/row {:style {:display :flex
                    :justify-content "start"
                    :flex-wrap "wrap"
                    :margin-top 20}}
    [ui/col {:xs 6}
     [:h5 "Acute Rejections"]
     [:p "What to look out for..."]]
    [ui/col {:xs 6}
     [:h5 "Chronic Rejection"]
     [:p "What to look out for..."]]
    [ui/col {:xs 12}
     [:h5 "Peritoneal Dialysis (PD) "]
     [:p "This is always done at home so no regular need to go to hospital for treatment."]]
    [ui/col {:xs 12}
     [:h5 "Haemodialysis (HD)"]
     [:p "There are 2 ways of doing HD:"]
     [:ul {:style {:margin-top -5}}
      [:li "HD (haemodialysis). Done at hospital. People go to hospital 3 times a week 
            (every week) for a 4 hour session."]
      [:li "HHD (home haemodialysis). HD done at home after training people how to do it. 
            All supplies are provided free. Saves people needing to stick to inflexible 
            hospital appointments."]]]]])

(defmethod show-guidance :kidney-numbers []
  [:<>
   [:h3 (:kidney-numbers guidances)]
   [:p "On the 11th Sept 2019 a new National Kidney Offering Scheme was introduced."]
   [:p "This tool does can not take into account the new offering scheme because it’s too new."]
   [ui/row
    [ui/col {:sm 8} [:p "Total number of kidney patients on the waiting list"]]
    [ui/col {:sm 4} [:p 4960]]]
   [ui/row
    [ui/col {:sm 8} [:p "Total number of transplants carried out"]]
    [ui/col {:sm 4} [:p 3448]]]
   [ui/row
    [ui/col {:sm 8} [:p "Total number of deceased transplants carried out"]]
    [ui/col {:sm 4} [:p 2466]]]
   [ui/row
    [ui/col {:sm 8} [:p "Total number of living transplants carried out"]]
    [ui/col {:sm 4} [:p 982]]]
   [ui/row
    [ui/col {:sm 8} [:p "Altruistic donors - who contributed to 146 transplants"]]
    [ui/col {:sm 4} [:p 95]]]
   [ui/row
    [ui/col {:sm 12}
     [:p " See page 4 of "
      [:a {:href "https://nhsbtdbe.blob.core.windows.net/umbraco-assets-corp/19191/section-5-kidney-activity.pdf"
           :target "_blank"}
       "this PDF document for local numbers"]]]]])


(defmethod show-guidance :lung-numbers []
  [:<>
   [:h3 (:lung-numbers guidances)]
   [:p "For further detail, please see "
    [:a {:href "https://nhsbtdbe.blob.core.windows.net/umbraco-assets-corp/19874/nhsbt-annual-report-on-cardiothoracic-organ-transplantation-201920.pdf"
         :target "_blank"} "the annual report"] "."]
   [ui/row
    [ui/col {:sm 12} [:h3 "Numbers on the waiting list"]]]
   [ui/row
    [ui/col {:sm 4} [:p "Papworth"]]
    [ui/col {:sm 4} [:p 50]]]
   [ui/row
    [ui/col {:sm 4} [:p "Newcastle"]]
    [ui/col {:sm 4} [:p 108]]]
   [ui/row
    [ui/col {:sm 4} [:p "Manchester"]]
    [ui/col {:sm 4} [:p 52]]]
   [ui/row
    [ui/col {:sm 4} [:p "Harefield"]]
    [ui/col {:sm 4} [:p 94]]]
   [ui/row
    [ui/col {:sm 4} [:p "Birmingham"]]
    [ui/col {:sm 4} [:p 51]]]
   [ui/row
    [ui/col {:sm 12} [:h3 "Numbers who were transplanted"]]]
   [ui/row
    [ui/col {:sm 4} [:p "Papworth"]]
    [ui/col {:sm 4} [:p 41]]]
   [ui/row
    [ui/col {:sm 4} [:p "Newcastle"]]
    [ui/col {:sm 4} [:p 30]]]
   [ui/row
    [ui/col {:sm 4} [:p "Manchester"]]
    [ui/col {:sm 4} [:p 29]]]
   [ui/row
    [ui/col {:sm 4} [:p "Harefield"]]
    [ui/col {:sm 4} [:p 40]]]
   [ui/row
    [ui/col {:sm 4} [:p "Birmingham"]]
    [ui/col {:sm 4} [:p 17]]]
   [ui/row
    [ui/col {:sm 4} [:p [:b "Nationally"]]]
    [ui/col {:sm 4} [:p [:b 161]]]]])


(defmethod show-guidance :kidney-numbers []
  [:<>
   [:h3 (:kidney-numbers guidances)]
   [:p "On the 11th Sept 2019 a new National Kidney Offering Scheme was introduced."]
   [:p "This tool does can not take into account the new offering scheme because it’s too new."]
   [ui/row
    [ui/col {:sm 8} [:p "Total number of kidney patients on the waiting list"]]
    [ui/col {:sm 4} [:p 4960]]]
   [ui/row
    [ui/col {:sm 8} [:p "Total number of transplants carried out"]]
    [ui/col {:sm 4} [:p 3448]]]
   [ui/row
    [ui/col {:sm 8} [:p "Total number of deceased transplants carried out"]]
    [ui/col {:sm 4} [:p 2466]]]
   [ui/row
    [ui/col {:sm 8} [:p "Total number of living transplants carried out"]]
    [ui/col {:sm 4} [:p 982]]]
   [ui/row
    [ui/col {:sm 8} [:p "Altruistic donors - who contributed to 146 transplants"]]
    [ui/col {:sm 4} [:p 95]]]
   [ui/row
    [ui/col {:sm 12}
     [:p " See page 4 of "
      [:a {:href "https://nhsbtdbe.blob.core.windows.net/umbraco-assets-corp/19191/section-5-kidney-activity.pdf"
           :target "_blank"}
       "this PDF document for local numbers"]]]]])

(defn a-percentage
  "Replace 'a percentage ' in s with 'v% '"
  [s v]
  (string/replace s
                  "a percentage "
                  (str v "% ")))
#_(comment
    (def random true)
    (def sample-set (atom #{}))
    (defn resample [n percent]
      (when (zero? n)
        (reset! sample-set #{}))
      (if (< (count sample-set) percent)
        (let [x (rand-int 100)]
          (while (sample-set x))))))

(defmethod show-guidance :percent []
  (let [percent @(rf/subscribe [::subs/guidance-percent])
        randomise-icons @(rf/subscribe [::subs/randomise-icons])]
    [:<>
     [:h3 (a-percentage (:percent guidances) percent)]
     [ui/row {:style {:display :flex
                      :justify-content "start"
                      :flex-wrap "wrap"}}
      [ui/col
       [:div {:sm 3 :style {;:margin-bottom 5
                            :display :flex
                            :justify-content "flex-start"
                            :flex-wrap "wrap"}}
        [:div {:style {:display :flex
                       :flex-direction "row"
                       :width 115
                       :justify-content "space-between"
                       :margin-bottom 5
                       :margin-right 5}}
         [:> bs/Button {:style {:width 55 :height 50
                                :margin-right 5}
                        :disabled (zero? percent)
                        :on-click #(rf/dispatch [::events/inc-guidance-percent -1])} "- 1"]
         [:> bs/Button {:style {:width 55   :height 50}
                        :disabled (= 100 percent)
                        :on-click #(rf/dispatch [::events/inc-guidance-percent 1])} "+ 1"]]
        [:div {:style {:display :flex
                       :width 115
                       :justify-content "space-between"
                       :margin-bottom 5
                       :margin-right 5}}
         [:> bs/Button {:style {:width 55
                                :height 50
                                :margin-right 5}
                        :disabled (zero? percent)
                        :on-click #(rf/dispatch [::events/inc-guidance-percent -10])} "-10"]
         [:> bs/Button {:style {:width 55 :height 50}
                        :disabled (= 100 percent)
                        :on-click #(rf/dispatch [::events/inc-guidance-percent 10])} "+10"]]]
       (ui/randomise-query-panel "Randomised? ")]
      [ui/col {:sm 9}
       (let [order (shuffle (concat (range percent) (range -1 (- percent 101) -1)))]
         (into
          [:<>
           (map
            (fn [j]
              [ui/row {:key (str "icon-row-" j)}
               [ui/col
                (into [:<>
                       (map (fn [i]
                              [ui/open-icon
                               {:key (str "icon-col-" i)
                                :color (if (neg? (if randomise-icons
                                                   (order (- 100 (+ 10 (* j 10) (- i))))
                                                   (- percent (- 101 (+ 10 (* j 10) (- i))))))
                                         "#CCC"
                                         "#488")
                                #_(if (< (- 100 (+ 10 (* j 10) (- i))) percent) "#488" "#CCC")
                                :padding "4px 5px"} "person"]) (range 10))])]])
            (range 10))]))]]]))
(comment
  (def i 5)
  (- i))


(defn useful-info-button
  [{:keys [active event label]}]
  [:> bs/Button {:style {:width "100%"}
                 :variant (if active "secondary" "outline-secondary")
                 #_(if active "primary" "outline-primary")
                 :active active
                 :on-click #(rf/dispatch event)}
   label])


(defn guidance
  ;; TODO: configure this
  "Organ specific guidance.
   TODO: Pull from a file somehow. We need an EDN/Hiccup template mechanism for that. Somebody must
   have written one?"
  [organ]
  (let [selected @(rf/subscribe [::subs/guidance])
        sample-percentage (a-percentage (:percent guidances) @(rf/subscribe [::subs/guidance-percent]))]
    [ui/row {:style {:margin "40px 10px" :min-height "calc(100vh - 490px"}}
     (cond
       (= organ :kidney) [ui/col {:md 4}
                          [:h3  "Useful information"] ; :todo

                          [:> bs/ButtonGroup {:vertical true}
                           [useful-info-button {:active (= :percent selected)
                                                :event [::events/guidance :percent]
                                                :label sample-percentage}]
                           [useful-info-button {:active (= :visits selected)
                                                :event [::events/guidance :visits]
                                                :label (:visits guidances)}]
                           [useful-info-button {:active (= :kidney-numbers selected)
                                                :event [::events/guidance :kidney-numbers]
                                                :label (:kidney-numbers guidances)}]
                           [useful-info-button {:active (= :medications selected)
                                                :event [::events/guidance :medications]
                                                :label (:medications guidances)}]
                           [useful-info-button {:active (= :graft-failure selected)
                                                :event [::events/guidance :graft-failure]
                                    
                                                :label (:graft-failure guidances)}]]]

       (= organ :lung) [ui/col {:md 4}
                        [:h3  "Useful information"]
                        [:> bs/ButtonGroup {:vertical true}
                         [useful-info-button {:active (= selected :percent)
                                              :event [::events/guidance :percent]
                                              :label sample-percentage}]
                         [useful-info-button {:active (= selected :visits)
                                              :event [::events/guidance :visits]
                                              :label (:visits guidances)}]
                         [useful-info-button {:active (= selected :lung-numbers)
                                              :event [::events/guidance :lung-numbers]
                                              :label (:lung-numbers guidances)}]
                         [useful-info-button {:active (= selected :donors)
                                              :event [::events/guidance :donors]
                                              :label (:donors guidances)}]
                         [useful-info-button {:active (= selected :medications)
                                              :event [::events/guidance :medications]
                                              :label (:medications guidances)}]
                         [useful-info-button {:active (= selected :window)
                                              :event [::events/guidance :window]
                                              :label (:window guidances)}]]])
     [ui/col {:md 8}
      [:div {:style {:margin-top 40}}
       (show-guidance {:info-key @(rf/subscribe [::subs/guidance])})]]]))

(declare organ-centre-tool)

(defn organ-centre
  "A home page for an organ at a centre. It should offer links to the available tools, pre-configured
   for that organ and centre. I think we no longer use this component because we always set the tool to 
   the first available one for the organ, so we never display a page without a known tool.
   Minimally, navigate to an organ-centre-tool home page."
  []
  (let [route @(rf/subscribe [::subs/current-route])
        centres @(rf/subscribe [::subs/organ-centres])

        [organ-name centre-name :as p-names] (utils/path-names (:path-params route))
        [organ centre _tool] (map keyword p-names)
        ;tools @(rf/subscribe [::subs/tools])
        mdata @(rf/subscribe [::subs/mdata])
        tools (utils/get-tools mdata organ)]
    ;(locals)
    
    (when (and organ centre centres tools)

      ;;; TODO: Tidy organ centre tool up here

      (let [centre-info (utils/get-centre-info centres organ centre)]
        
         [:div {:style {:width "100%" :background-color "#889988" #_"#0072BA" :padding 20 :color "white"}}
          [ui/row
           [ui/col {:xs 12 :sm 8} [:h1 (:description centre-info)]]
           [ui/col {:xs 12 :sm 8} [:h1 organ-name]]
           ]
          #_[:div {:style {:display "flex" :justify-content "space-bewteen"}}
           [:h1 (:description centre-info)]
           [:h1 (:description centre-info)]]

          [ui/tools-menu tools true organ-name centre-name {:vertical false}]]
        [guidance organ]

        #_[ui/page [:span (:description centre-info)
                  (str " " (string/capitalize (name organ)) " transplant centre")]
         [ui/row
          [ui/col
           ;(when (not= tool :guidance) [ui/background-link organ centre tool])
           [ui/tools-menu tools true organ-name centre-name {:vertical false}]]]
         [guidance organ]]))))



(comment
    (def organ "kidney")
    (def centre-info {:key :belf, :name "Belfast", :link "http://www.belfasttrust.hscni.net/", :image "assets/kidney/bel.png", :description "Belfast City Hospital"})
    (paths/organ-centre-name-tool organ
                                  "Belfast"
                                  "waiting"))


(comment
  (utils/get-tool-meta @(rf/subscribe [::subs/mdata]) :lung :waiting)
  )

;; todo - move to config
(def boxed-fill "#DFE4DF")
(def boxed-border "20px solid #DFE4DF")
(def boxed-text "DONOR")
(def boxed-text-color "#000")


(defn organ-centre-tool
  "A home page for an organ at a centre. It should offer links to the available tools, pre-configured
   for that organ and centre."
  []
  (let [route @(rf/subscribe [::subs/current-route])
        mdata @(rf/subscribe [::subs/mdata])
        organ-centres @(rf/subscribe [::subs/organ-centres])
        [organ-name centre-name tool-name :as p-names] (utils/path-names (:path-params route))
        tool-name (if (nil? tool-name) :waiting tool-name)
        [organ centre tool] (map keyword p-names)
        tools (utils/get-tools mdata organ)
        ;tool (if tool tool "waiting")
        ]
    (when (and organ centre ((keyword organ) organ-centres) tool)
      (let [centre-info (utils/get-centre-info organ-centres organ centre)
            tool-mdata (utils/get-tool-meta mdata organ tool)
            tcb (bun/get-bundle organ centre tool)]
        ;(locals)
        [:div 

         [:div {:style {:width "100%" :background-color "#889988" #_"#0072BA" :padding 20 :color "white"}}
          [ui/row
           [ui/col {:xs 12 :sm 8} [:h1 (:description centre-info)]]
           [ui/col {:xs 12 :sm 4} [:h2 (string/capitalize organ-name) " Transplants"]]]

          [ui/tools-menu tools true organ-name centre-name {:vertical false}]]

         (if-let [tool-centre-bundle tcb]
           (let [tcb-fmaps (get tool-centre-bundle :fmaps)
                 first-boxed (ffirst (filter (fn [[_k w]] (:boxed w)) tcb-fmaps))]
             [ui/row {:style {:margin "0px 10px"}}
              [ui/col {:xs 12}
               [:h3 {:style {:margin-top 10}} (:page-title tool-mdata)]]
              [ui/col {:xs 12 :md 6
                       :style {:margin-top 10}}

               (when-let [input-header (get-in tool-mdata [:inputs :header])]
                 input-header)

               [:div {:style {:padding "0px 30px 15px 15px"
                              :height "calc(100vh + 10ex)"
                              :overflow-y "scroll"}}

                (widg/widget {:type :reset})

                (into [:<>]
                      (map-indexed
                       (fn [i [k w]] ^{:key (:factor w)}
                         [:div {:style {:margin-top 0
                                        :margin-bottom -5
                                        :padding 5
                                        :display "relative"
                                        :outline-bottom (when (some? (:boxed w)) boxed-border)
                                        :background-image (when (some? (:boxed w)) (str "url(" (prf/data-urls :boxed) ")"))
                                        ;:background-color (when (some? (:boxed w)) boxed-fill)
                                        }}
                          [:div {:style {:position "relative"
                                         :padding-right 5}}
                           (when (= k first-boxed)
                             [:> bs/Row {:style {:padding-top 0 :display "flex" :align-items  "center"}}
                              [:> bs/Col {:xs 5
                                          :style {:display "flex" :justify-content "flex-end"}}
                               [:span {:style {:text-align "right"}}
                                boxed-text]]])

                           (widg/widget (assoc w :model tool))]
                          [:div {:style {:height 10}}]])
                       
                       tcb-fmaps))]]
              [ui/col {:xs 12 :md 6}
               [:section {:style {:margin-top 10}} (:pre-section tool-mdata)]
               [:section
                [results/results-panel organ centre tool]
                (:rest-of-page tool-mdata)
                #_(let [tool-mdata (get-in @(rf/subscribe [::subs/mdata])
                                           [organ :tools tool])]
                    (:rest-of-page tool-mdata))]]])
           (if (= tool :guidance)
             [guidance organ]
             (let [path (paths/organ-centre-name-tool organ-name
                                                      (:name centre-info)
                                                      tool-name)]
               (rf/dispatch [::events/load-bundles [path
                                                    [:bundles organ centre tool]]])
               #_[:div "Loading " path])))
         [ui/row
          [ui/col {:class-name "d-none d-md-block"}]]]))))

(comment
  (+ 1 1)
  (paths/organ-centre-name-tool :kidney
                                "The Royal Free"
                                :waiting)
  (paths/organ-centre-name-tool :kidney
                                "The Royal Free"
                                "waiting")
  (paths/organ-centre-name-tool :kidney
                                "The Royal Free"
                                :guidance))


#_(comment

    ;; Up for discussion: How should we configure texts in general....

    ;-------------- Text views below --------------
;
; Needs replacing with a text system that supports editable rich text somewhere
;
;(defn lung-home [] (organ-home :lung))
;(defn kidney-home [] (organ-home :kidney))

    (defn sub-page1 []
      [:h1 "This is sub-page 1"])


    (defn about []
      [ui/page "About"])


    (defn about-technical
      "Technical stuff - in Predict we scroll to this rather than making it a separate page. 
In reagent, maybe use https://github.com/PEZ/clerk if we need to do this."
      []
      [ui/page "Technical"]))
