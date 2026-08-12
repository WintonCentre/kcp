(ns kcp.views
  (:require
    [clojure.edn :as edn]
    [clojure.string :as string]
    [clojure.string :as str]
    [kcp.bsio :as bsio]
    ["react-bootstrap" :as bs]
    [kcp.bundles :as bun]
    [kcp.events :as events]
    [kcp.factors :as fac]
    [kcp.model :as model]
    [kcp.paths :as paths]
    [kcp.print-fills :as prf]
    [kcp.results :as results]
    [kcp.rgb :as rgb]
    [kcp.subs :as subs]
    [kcp.ui :as ui]
    [kcp.utils :as utils]
    [kcp.vis2 :as vis]
    [kcp.widgets :as widg]
    [medley.core :as medl]
    [re-frame.core :as rf]
    [reagent.core :as r]
    [shadow.debug :refer [?-> ?->> ?> locals]]))

(defn home-section
  [& content]
  (into [:section {:class-name "home-section"}]
        content))

(defn scroll-to-target
  "A reagent component that registers itself as a target for js/scrollIntoView."
  [{:keys [id]} & content]
  (into [:section {:id id}]
        content))

(defn render-description
  [desc]
  (cond
    (string? desc) [:p desc]
    (sequential? desc) (into [:<>]
                             (for [[i p] (map-indexed vector desc)]
                               [:p {:key i} p]))
    :else nil))

(defn render-formatted
  [s]
  (if (string? s)
    (let [parts (str/split s #"\*\*")]
      (into [:<>]
            (map-indexed (fn [idx part]
                           (if (odd? idx)
                             [:b part]
                             part))
                         parts)))
    s))

(defn tool-intro
      [mdata organ tool-key]
      (let [intro (get-in mdata [organ :tools tool-key :intro])]
           [:> bs/Row
            [:> bs/Col {:md 6}
             [home-section
              [:h2 "What does this site do?"]
              [render-description (:description intro)]]
             (when (utils/filled-in? (:what-does-it-show intro))
               [home-section
                [:h2 "What does the tool show?"]
                [:p (:what-does-it-show intro)]])
             [home-section
              [:h2 "Who is this site for?"]
              [:p (:who-is-it-for intro)]]]
            [:> bs/Col {:md 6}
             [home-section
              [:h2 "How does it work?"]
              (for [[i p] (map-indexed vector (:how-does-it-work intro))]
                   [:p {:key i} p])
              [:p "If you want to know more about the data and the models behind the tool read the "
               [:a {:href (ui/href :kcp.views/tech)} "technical section"]
               " of this site."]]
             [home-section
              [:h2 "Where can I find more information and support?"]
              (get-in mdata [organ :more-information])]]
            [:> bs/Col {:sm 12 :style {:display "flex" :justify-content "center"}}
             [ui/button {:class-name "btn-lg"
                         :variant    "primary"
                         :style      {:font-size "1.5em"}
                         :on-click   #(do
                                        (rf/dispatch [::events/reset-edit-state])
                                        (rf/dispatch [::events/navigate ::organ-centre-tool-tab-inputs
                                                      {:organ organ :centre "uk" :tool (name tool-key)
                                                       :tab "icons" :inputs "-"}]))}
              "Start the tool"]]]))

;;; Views ;;;
(defn home-page
  "Display a generic home page.
   Minimally, navigation from here to an organ home page."
  []
  (let [selected (r/atom nil)]
    (fn []
      (let [mdata        @(rf/subscribe [::subs/mdata])
            route        @(rf/subscribe [::subs/current-route])
            single-organ (ui/get-single-organ mdata)
            organ        (get-in route [:path-params :organ])
            home-tools   (when mdata
                           (filterv #(get-in mdata [single-organ :tools % :home-label])
                                    (get-in mdata [single-organ :tool-order])))]
        (when (and (seq home-tools) (nil? @selected))
          (reset! selected (first home-tools)))
        (if mdata
          (if-let [organ (or single-organ organ)]
            [ui/decorated-page
             [:div {:style {:width            "calc(100% + 30px)"
                            :background-color "#337777"         ; "#E0E0E8"
                            :margin-left      "-15px"
                            :padding          "15px"}}
              [ui/row
               [ui/col {:md 4}
                [:img (if (= organ :lung)
                        {:src "assets/lung-banner.png" :alt "lung tool banner image" :async true :style {:height 130 :width 250}}
                        {:src "assets/kidney-banner.png" :alt "kidney tool banner image" :async true :style {:height 130 :width 260}})]]
               [ui/col {:md 8 :style {:color "#fff"}}
                [:p [:b {:style {:font-size "1.2em"}} "How should I use this site?"]]
                [:p [:b "The tool should be used with a clinician, specialist nurse or other healthcare professional."]]
                [:p [:b "If you are a patient and you use this site on your own, discuss the results with your urology team."]]]]]
             [ui/tabs {:variant            "pills"
                       :class-name "tool-select"
                       :default-active-key (when @selected (name @selected))
                       :active-key         (when @selected (name @selected))
                       :on-select          #(reset! selected (keyword %))}
              (for [tool-key home-tools]
                [ui/tab {:key       (name tool-key)
                         :event-key (name tool-key)
                         :title     (get-in mdata [single-organ :tools tool-key :home-label])}])]
             (get-in mdata [single-organ :label])
             [ui/row
              [ui/col
               [tool-intro mdata single-organ @selected]]]])
          [ui/loading])))))

(defn organ-home
  "The organ home pages need organ centres data to render. And it's handy to detect small screens.
   Minimally, navigate to an organ centre home page."
  []
  (let [window-width @(rf/subscribe [::subs/window-width])
        mdata @(rf/subscribe [::subs/mdata])
        organ (get-in @(rf/subscribe [::subs/current-route]) [:path-params :organ])
        centres @(rf/subscribe [::subs/organ-centres])
        mobile (<= window-width ui/mobile-break)]

    [ui/card-page
     "Choose your transplant centre"                        ; todo: configure
     (if-not centres
       [:div "loading /" organ " centres"]
       (if-not mdata
         [:div "Loading /metadata.txt"]
         (let [centres (sort-by :description ((keyword organ) centres))
               centres (filter #(utils/filled-in? (:description %)) centres)
               tools (utils/get-tools mdata organ)
               centre-card (fn [centre]
                             [ui/centre-card mobile
                              {:img-src  (:image centre)
                               :organ    organ
                               :link     [::organ-centre {:organ organ :centre (name (:key centre))}]
                               :centre   (:key centre)
                               :hospital (:description centre)
                               :width    200
                               :tools    tools
                               :mdata    mdata}])]
           (into (ui/centre-card-deck mobile)
                 (map centre-card centres)))))]))

(defn pubs-page
  "Display a generic home page.
   Minimally, navigation from here to an organ home page."
  []
  ;; This needs to be a promise....
  (let [mdata @(rf/subscribe [::subs/mdata])
        ons-uri "https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/li\nfeexpectancies/bulletins/pastandprojecteddatafromtheperiodandcohortlifetables/2020\nbaseduk1981to2070"
        single-organ (ui/get-single-organ mdata)]

    (if mdata
      [ui/page (str "Publications")
       [ui/row
        (condp = single-organ
          :kidney [:> bs/Col
                   [:p "Leibovich Model (" [:a {:href "https://doi.org/10.1002/cncr.11234" :target "_blank"} "https://doi.org/10.1002/cncr.11234"] ")."]
                   [:p "Systematic review of models predicting recurrence after kidney cancer surgery (" [:a {:href   "https://doi.org/10.1111/bju.15673"
                                                                                                              :target "_blank"} "https://doi.org/10.1111/bju.15673"] ")."]
                   [:p "ONS period life tables (" [:a {:href ons-uri :target "_blank"} ons-uri] ")."]]
          :else [ui/col [:p "None."]])]]
      [ui/loading])))

(defn kidney-about-content
  []
  [:<>

   [:section {:style {:border-bottom "1px #337777 solid"
                      :margin-bottom 20}}
    [:h4 "Overview"]
    [:p "The tool takes information about your tumour, including the size and stage, and information
    about you, including your age and sex, and uses people who had these same characteristics to
    predict what might happen to you. For example, how many people 'like you' had their kidney
    cancer recur within one year of surgery. It also uses UK national estimates of your risk of dying from other causes."]

    [:p "It is not showing you what will happen to you, it is showing you what happened to people like you, in the past."]

    [:p "It’s important to remember that the tool does not take into account everything about you, for
    example, whether you have other health conditions which might impact your outcome."]

    [:p "If you want to know more about the models and data behind the tools, please read the "
     [:a {:href (ui/href :kcp.views/tech)} "Technical section"] ". "
     "Data about kidney cancer patients and the UK general population were
     used to create the statistical model. When you enter information into the tool, the calculator
     looks at the models and produces results."]]

   [:section {:style {:border-bottom "1px #337777 solid"
                      :margin-bottom 20}}
    [:h4 "Who is this site for?"]
    [:p "The tool is suitable for patients with clear cell renal cell carcinoma (ccRCC) who are over 18
years old and have had a kidney removed (underwent a radical neprectomy). More details
about the development cohort are available in the " [:a {:href (ui/href :kcp.views/tech)} "Technical section"] ". "]
    [:p "The tool should be used initially by patients alongside their oncologist, urologist or specialist nurse."]]

   [:h4 "Who developed the tool?"]
   [:p "The tool was developed by the Winton Centre for Risk and Evidence Communication and
   displays the Leibovich model built by a team at the Mayo Medical School and Mayo Clinic,
   USA. This has then been adjusted by the Predict Kidney team at the University of Cambridge
   to include the risk of dying from other causes."]])



;;; Views ;;;
(defn about-page
  "Display a generic home page.
   Minimally, navigation from here to an organ home page."
  []
  ;; This needs to be a promise....
  (let [mdata @(rf/subscribe [::subs/mdata])
        single-organ (ui/get-single-organ mdata)]

    (if mdata
      [ui/page (str "About the Predict " (string/capitalize (name single-organ)) " tool")
       (condp = single-organ
         :kidney
         [kidney-about-content]
         :else [:div])]
      [ui/loading])))

(defn inline-math
  "Provides an element with consistent style for math 'stuff'TM"
  [& elements]
  (into [:i {:class-name "inline-math"}] elements))

(defn maths-section
  []

  [:section {:style {:border-bottom "1px #337777 solid"
                     :margin-bottom 20}}
   [:h3#mathematical-section "Mathematical Section"]
   [:p "A joint modelling, cox proportional hazards approach was adopted to model the risk of recurrence and risk of death due to other causes."]

   [:p [:b "Leibovich Model"]]
   [:p "The Leibovich model uses a Cox proportional hazard model as a way of modelling
   factors which effect an event (such as a recurrence of kidney cancer) that may or may
   not happen over a certain amount of time. The hazard of recurrence is the likelihood
   that a recurrence will occur at a particular time, conditional on not having
   experienced a recurrence so far. The hazard is made up of a baseline hazard, which is
   the same for everyone, multiplied by a fixed amount related the risk factors (which is
   different for different people)."]
   [:p "In this tool, we use the cumulative hazard, which is the total amount of hazard
experienced from the start date (kidney cancer surgery) up to a given time."]

   [:p "The estimated cumulative recurrence hazard is given by:"]
   [:div {:class-name "inline-math" :style {:display "flex" :justify-content "center" :margin-bottom 20}}
    (inline-math "H" [:sub "R"] "(t|X" [:sub "P"] ") = H" [:sub "R0"] "(t) exp(β . X" [:sub "P"] ")")]

   [:p (inline-math "H" [:sub "R0"] "(t)") " is the estimated baseline cumulative hazard at a time " (inline-math "t") ". "
    (inline-math "βX" [:sub "P"]) " is the linear predictor "
    (inline-math "βX" [:sub "P"] " = β" [:sub "1"] "X" [:sub "P1"] " + " "β" [:sub "2"] "X" [:sub "P2"] " + ... + β" [:sub "n"] "X" [:sub "n"])
    ", where the pathological risk factors " (inline-math "X" [:sub "Pn"]) " are the tumour stage, grade, size, lymph node status and necrosis and " (inline-math "β" [:sub "n"])
    " their respective coefficients."]

   [:p "This can be converted to the probability of metastasis free survival (no kidney cancer recurrence) at a time " (inline-math "t")
    ", " (inline-math "S" [:sub "R"] "(t|X" [:sub "P"] ")") ", and the probability of recurrence at a time " (inline-math "t")
    ", " (inline-math "R" [:sub "R"] "(t|X" [:sub "P"] ")") ", as follows:"]

   [:div {:class-name "inline-math" :style {:display "flex" :justify-content "center" :margin-bottom 20}}
    (inline-math "R" [:sub "R"] "(t|X" [:sub "P"] ") = 1 - S" [:sub "R"] "(t|X" [:sub "P"] ") = 1 - exp(-H" [:sub "R"] "(t|X" [:sub "P"] "))")]


   [:p [:b "Leibovich Plus Model"]]
   [:p "The Leibovich model only captures the risk of recurrence in people who are still alive at time "
    (inline-math "t") ". We have adapted this to produce a relative estimate of recurrence risk
   alongside the competing risk of death from other causes. This is referred to as the Leibovich Plus model."]

   [:p "To estimate the risk of death from causes other than kidney cancer we have used
   English national data (published by the office for national statistics) which predicts
   the expected numbers of deaths each year for people in the general population
   depending on their age and sex. We can then calculate the absolute risk of
   “competing mortality” (death from other causes) risk at time " (inline-math "t") ", "
    (inline-math "(R" [:sub "CM"] "(t|X" [:sub "D"] ")") ", where " (inline-math "X" [:sub "D"]) " are the patient demographic factors (age and sex)."]

   [:p "This is then combined with the probability of recurrence at time " (inline-math "t") ", "
    (inline-math "R" [:sub "R"] "(t|X" [:sub "P"] ") ") " (described in the previous section) to generate a combined overall
   risk of an event " (inline-math "R" [:sub "OE"] "(t|X)") ", which is the probability of either event (recurrence of kidney cancer or
death from other causes) happening by time " (inline-math "t") ". "]
   [:div {:class-name "inline-math" :style {:display "flex" :justify-content "center" :margin-bottom 20}}
    (inline-math "R" [:sub "OE"] "(t|X) = 1 - (1 - R" [:sub "R"] "(t|X" [:sub "P"] ")) * (1 - R" [:sub "CM"] "(t|X" [:sub "D"] ") ") ")"]

   [:p "The combined risk is then redistributed to give the cumulative risk of recurrence "
    (inline-math "CR" [:sub "R"] "(t|X)") " and the cumulative risk of death from other causes "
    (inline-math "CR" [:sub "CM"] "(t|X)") ". This is based on how much of a person’s risk comes from their risk of
    recurrence and how much from their risk of death from other causes. These - " (inline-math "CR" [:sub "R"] "(t|X)")
    " and " (inline-math "CR" [:sub "CM"] "(t|X)") " - are the values displayed by the PREDICT-Kidney tool."]
   ])

(defn web-development-section
  []
  [:<>
   [:section {:style {:border-bottom "1px #337777 solid"
                      :margin-bottom 20}}
    [:h3#the-web-implementation "Web implementation"]
    [:p "This tool is a Single Page Application (SPA). It is a single web page which loads a Javascript application that
    updates the page according to the user's inputs. All data that you enter to the tool is stored in Javascript variables in the browser."]
    [:p "The application is also a calculator. The Javascript code includes implementations of the Leibovich models described above.
    This means that all inputs, calculations, and result displays are managed without the need for any interaction with another machine.
    The model calculations run once you have entered all necessary data, and will rerun whenever you change any input. Once you close the
    browser window or tab, the data is erased, just like in a calculator."]]
   [:section {:style {:border-bottom "1px #337777 solid"
                      :margin-bottom 20}}
    [:h3#the-development-stack "The development stack"]
    [:p "The tool runs as a Javascript application, but it was written in Clojurescript and then compiled to Javascript.
    The most important libraries that it uses are ReactJS, Reagent, and Reframe, and we are sincerely grateful to the
    developers of these codes. The development system used Shadow-cljs (by Thomas Heller), supported by a number of
    Clojure scripts running under Babashka (by Michiel Borkent) and the Clojure integrated development system Calva running in VSCode. "]]

   [:section {:style {:border-bottom "1px #337777 solid"
                      :margin-bottom 20}}
    [:h3#browser-compatibility "Browser Compatibility"]
    [:p "This version has been tested and found to work in Edge, Chrome, Safari, Firefox, on desktop PCs and Macs and also on Android and IOS mobile devices."]
    [:p "Support for IE 11 is limited and some functionalities like 'Copy' or 'Fullscreen' may not work at all."]
    [:p "It does not currently support any other version of Internet Explorer."]]])

(defn references-section
  []
  [:<>
   [:section {:style {:margin-bottom 20}}
    [:h3#references "References"]
    [:ol
     [:li "Leibovich, B. C. et al. Prediction of progression after radical nephrectomy for patients with clear cell renal
    cell carcinoma: A stratification tool for prospective clinical trials. Cancer " [:b "97"] ", 1663–1671 (2003)."]
     [:li "Usher-Smith, J.A., et al. Risk models for recurrence and survival after kidney cancer: a systematic review. BJU Int, 130: 562-579. (2022)"]]]])

(defn overview-menu [[route text]]
  [:li {:key (random-uuid)} [:span {:on-click #(.scrollIntoView (.getElementById js/document route)
                                                                (js-obj "behavior" "smooth"))
                                    :style    {:color :#1F6BC4 :font-size 18 :cursor :pointer}} text]])

(defn kidney-tech-content
  []
  [:> bs/Col
   [:section {:style {:border-bottom "1px #337777 solid"
                      :margin-bottom 20}}
    [:h3#model-development "Model development"]
    [:p "The model (the Leibovich model) behind this tool was developed by a team at the Mayo
Clinic (Minnesota, USA) between 2000 and 2002. To develop this model, information was
collected about a group of patients, who had been followed (on average) for 7 years after
their kidney cancer surgery. This included information (or risk factors) about the patients
(including their age, gender, whether they smoked, whether they were hypertensive at
surgery) and risk factors related to their kidney cancer tumour (including stage, lymph node
involvement, size, grade and necrosis)."]
    [:p "Each risk factor was statistically tested and used in the model if found to have an important
relationship with the outcome of interest (metastasis-free survival). The final model includes
tumour stage, regional lymph node status, tumour size, nuclear grade, and histologic tumour
necrosis. These are described in detail in the input factors section below."]
    [:p "The Leibovich model is often used to assign patients a score (ranging from 0 to 11) based on
their tumour characteristics. These scores are then separated into three risk groups: low risk
(score 0 – 2), intermediate risk (score 3 – 5) and high risk (score above 6)."]
    [:p "The Leibovich model and score have been used clinically for 20 years. However, it cannot say what the outcomes
    for a particular patient will be. Instead, it estimates the probability of recurrence in people from the past with
    similar kidney cancer tumours. Further information is provided in the "
     [:a {:href (ui/href :kcp.views/pubs)} "paper published"] " in the journal Cancer, March 2003. "]
    [:p "The Leibovich model has been adapted by the Predict Kidney team at the University of Cambridge, to create the
    Leibovich Plus model. The adjusted model uses data from the Office for National Statistics (projected period life
    tables for England for 2024). This provides estimated survival rates for the English general population by age and
    sex, based on historic data and trends. This version of the model calculates the risk of recurrence adjusted for
    the expected risk of death from other causes for people of the same age and sex living in England. The risk of death
    from other causes is displayed in the visualisations alongside the risk of recurrence and likelihood of surviving cancer-free."]]


   [:section {:style {:border-bottom "1px #337777 solid"
                      :margin-bottom 20}}
    [:h3#cohort "Cohort"]
    [:p "The Leibovich score was developed in a cohort of patients who underwent a radical
nephrectomy (full removal of the kidney) to treat clear cell renal cell carcinoma (ccRCC)
between 1970 and 2000. This did not include patients who already had metastatic disease.
Patients with inherited renal cell carcinoma (including von Hippel-Lindau disease), those
with tumours in both kidneys (bilateral synchronous tumours), or who were diagnosed with
Wilms tumour (a different form of kidney cancer) were not included. All included patients
were over 18 at the time of surgery."]]


   [:section {:style {:border-bottom "1px #337777 solid"
                      :margin-bottom 20}}
    [:h3#model-validation "Model Validation"]
    [:p "The Leibovich model has been tested (or validated) in multiple different groups of patients
since it was first developed. In a recent review, 16 validations were identified with results for
discrimination in the range 0.67-0.86. More details can be found in a review paper from 2021 (see the "
     [:a {:href (ui/href :kcp.views/pubs)} "publication section"] ")."]]

   [:section {:style {:border-bottom "1px #337777 solid"
                      :margin-bottom 20}}
   [:h3#input-factors "Input factors"]
   [:p "In this section we give an explanation of the input factors considered in this model:"]

   [:p [:b "Primary Tumour Status"] " – The pathological stage of a kidney cancer tumour is a measure
of its size and how far it has spread"]
   [:ul
    [:li "Stage 1a (or pT1a) – the cancer is small (4cm or smaller) and only inside the kidney"]
    [:li "Stage 1b (or pT1b) – the cancer is small (between 4cm and 7 cm) and only inside the kidney"]
    [:li "Stage 2a (pT2a) - the cancer is between 7cm and 10cm and only inside the kidney"]
    [:li "Stage 2b (pT2b) – the cancer is larger than 10cm and only inside the kidney"]
    [:li "Stage 3a (or pT3a) – the cancer is growing into the fat around the kidney, or into the renal vein"]
    [:li "Stage 3b (or pT3b) - the cancer is growing into the vena cava in the tummy (abdomen)"]
    [:li "Stage 3c (or pT3c) - the cancer is growing into the vena cava in the chest, or into the wall of the vena cava."]
    [:li "Stage 4 (or pT4) - the cancer has spread through the capsule that surrounds the kidney. It may have grown into the adrenal gland."]]

   [:p [:b "Regional Lymph Node Status"] " – The regional lymph node status indicates if the cancer has
spread to lymph nodes near the kidney. Lymph nodes are a network of glands found
throughout the body that drain away waste fluid, waste products and damaged cells. They
also fight infection."]
   [:ul
    [:li "Unknown (pNx) - There are no lymph nodes in the specimen removed at the time of surgery"]
    [:li "pN0 – No cancer was detected in any lymph nodes"]
    [:li "pN1 – There are cancer cells in at least one lymph node near the tumour."]]

   [:p [:b "Tumour Size"] " – The size of the tumour removed during surgery. Whether the tumour is larger
or smaller than 10cm is most important in the context of recurrence"]

   [:p [:b "Nuclear Grade"] " – The nuclear grade is a scale indicating how much the cancer cells look like normal cells.
   This is sometimes called the Fuhrman scale. Kidney cancers are graded 1 to 4. Grade 1 is the lowest (the most like
   normal cells) and grade 4 is the highest (the least like normal cells)"]

   [:p [:b "Tumour Necrosis"] " – Necrosis means that some of the cancer cells have died."]

   [:p [:b "Age (years)"] " – The age at surgery. This is used to predict the risk of death from other causes."]
   [:p [:b "Sex:"] " Male or female. Note this refers to sex, not gender – This is used to predict the risk of death from other causes."]]

   (maths-section)
   (web-development-section)
   (references-section)])

(defn tech-page
  "Display a generic home page.
   Minimally, navigation from here to an organ home page."
  []
  (let [mdata @(rf/subscribe [::subs/mdata])
        single-organ (ui/get-single-organ mdata)]

    (if mdata
      [ui/page (str "Technical Details for PREDICT " (string/capitalize (name single-organ)))
       [ui/row
        (condp = single-organ
          :kidney [kidney-tech-content]
          :else [:div])]]
      [ui/loading])))


(defn legal-page
  "Display a generic home page.
   Minimally, navigation from here to an organ home page."
  []
  (let [mdata @(rf/subscribe [::subs/mdata])]

    (if mdata
      [ui/page (str " Legal ")
       [ui/row
        [:> bs/Col
         [:section {:style {:border-bottom "1px #337777 solid"
                            :margin-bottom 20}}
          [:h4 "Disclaimer"]
          [:p "You MUST read the information below before using the tool."]
          [:p [:b "IMPORTANT NOTICE: "] "The tool uses a statistical model developed by a team at the Mayo
          Medical School and Mayo Clinic, USA and adjusted by the Predict Kidney team at the
          University of Cambridge. It is not showing you what will happen to you, it is showing you what
          happened to people like you, in the past. It’s important to remember that the tool does not take
          into account everything about you, for example, whether you have other health conditions which
          might impact your outcome. Patients should always consult their own urologist, oncologist or
          specialist nurse, who will be able to discuss the results in a more personalised context."]
          [:p [:b "TERMS OF USE: "] "Results provided by this tool are for informational purposes only and are not
          intended as a substitute for professional medical advice and counselling. This tool is a reference
          guide only and cannot replace standard clinical counselling. Please read the " [:a {:href (ui/href :kcp.views/tech)} "technical details"]
           " for the model derivation and context. By accessing and using this tool, you acknowledge and agree to the following terms."]
          [:p "Except as otherwise permitted by law, this tool may be accessed and used in line with the
               disclaimer above or for private study or for non-commercial research with this notice intact."]
          [:p "You shall not copy, reproduce, distribute, transmit, broadcast, display, sell, rent, license, or
               otherwise exploit this tool or any content within in whole or in part for any other purposes
               without the prior written consent of the University of Cambridge and the authors."]
          [:p "The authors and the University of Cambridge do not accept any liability for any errors in the
               model prediction or outcomes. See also the University’s standard terms
               at " [:a {:href "http://www.cam.ac.uk/about-this-site/terms-and-conditions"} "http://www.cam.ac.uk/about-this-site/terms-and-conditions"] "."]
          [:p "Any links from this tool or any associated text do not imply recommendations or endorsements of products or services."]
          [:p "The trademarks of the University of Cambridge and others that appear in this tool are the property of the University of Cambridge or their respective owners. You may not use any trademark displayed in the tool without the written permission of the University of Cambridge or the respective owner. Copyright © 2019 University of Cambridge. All rights reserved."]]

         [:h4 "Cookies and Privacy Notice"]
         [:p "This website does not use cookies."]
         [:p "No identifiable user data is stored by this website. The data that you enter in your web browser is
not transferred to any other system, and it is erased once you close the application window."]
         [:p "If you print or save pages containing user entered data, then you are responsible for protecting the data in those copies."]
         [:p "The Data Protection Officer for this tool is " [:a {:href "mailto:dpo@admin.cam.ac.uk"} "dpo@admin.cam.ac.uk"] "."]]]]
      [ui/loading])))

(def guidances
  {:percent        "What does a percentage look like?"
   :visits         "Visits to hospital after transplant"
   :donors         "Donor Decisions"
   :medications    "Medications after Transplant Surgery"
   :window         "The Window"
   :graft-failure  "What are my options if my new kidney fails?"
   :lung-numbers   "Lung kcp - 2019 - 2020 numbers"
   :kidney-numbers "Kidney kcp - 2019 - 2020 numbers"})

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
   [:p "Depending which transplant centre you are under, you might be asked about what kinds of donor you are willing to accept.
Here are typical donor characteristics you might be asked to think about."]
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
      [:li "Anti-ulcer medications"]]]]])

(defmethod show-guidance :window []
  [:<>
   [:h3 (:window guidances)]
   [:p "This diagram shows how your lung disease might progress.
        Transplantation is offered when you are ill enough to need it,
        but well enough to survive the surgery.  We call this the ‘window of opportunity’."]
   [:> bs/Image {:fluid true
                 :src   "assets/The_Window.png"
                 :async true}]])

(defmethod show-guidance :graft-failure []
  [:<>
   [:h3 (:graft-failure guidances)]
   [ui/row {:style {:display         :flex
                    :justify-content "start"
                    :flex-wrap       "wrap"
                    :margin-top      20}}
    [ui/col {:xs 6}
     [:h5 "Acute Rejections"]
     [:i "When to seek medical advice"]
     [:p "Please contact your transplant team if you experience any of the following:"]
     [:ul
      [:li "A high temperature of 38 degrees C"]
      [:li "Feeling hot and shivery"]
      [:li "Severe headache"]
      [:li "Diarrhoea"]
      [:li "Vomiting"]
      [:li "Shortness of breath"]
      [:li "New chest pain"]
      [:li "Fatigue or generally feelig 'rough'"]
      [:li "Little or no urine"]
      ]]
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
    [ui/col {:sm 8} [:p "Total number of kcp carried out"]]
    [ui/col {:sm 4} [:p 3448]]]
   [ui/row
    [ui/col {:sm 8} [:p "Total number of deceased kcp carried out"]]
    [ui/col {:sm 4} [:p 2466]]]
   [ui/row
    [ui/col {:sm 8} [:p "Total number of living kcp carried out"]]
    [ui/col {:sm 4} [:p 982]]]
   [ui/row
    [ui/col {:sm 8} [:p "Altruistic donors - who contributed to 146 kcp"]]
    [ui/col {:sm 4} [:p 95]]]
   [ui/row
    [ui/col {:sm 12}
     [:p " See page 4 of "
      [:a {:href   "https://nhsbtdbe.blob.core.windows.net/umbraco-assets-corp/19191/section-5-kidney-activity.pdf"
           :target "_blank"}
       "this PDF document for local numbers"]]]]])

(defmethod show-guidance :lung-numbers []
  [:<>
   [:h3 (:lung-numbers guidances)]
   [:p "For further detail, please see "
    [:a {:href   "https://nhsbtdbe.blob.core.windows.net/umbraco-assets-corp/19874/nhsbt-annual-report-on-cardiothoracic-organ-transplantation-201920.pdf"
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
    [ui/col {:sm 8} [:p "Total number of kcp carried out"]]
    [ui/col {:sm 4} [:p 3448]]]
   [ui/row
    [ui/col {:sm 8} [:p "Total number of deceased kcp carried out"]]
    [ui/col {:sm 4} [:p 2466]]]
   [ui/row
    [ui/col {:sm 8} [:p "Total number of living kcp carried out"]]
    [ui/col {:sm 4} [:p 982]]]
   [ui/row
    [ui/col {:sm 8} [:p "Altruistic donors - who contributed to 146 kcp"]]
    [ui/col {:sm 4} [:p 95]]]
   [ui/row
    [ui/col {:sm 12}
     [:p " See page 4 of "
      [:a {:href   "https://nhsbtdbe.blob.core.windows.net/umbraco-assets-corp/19191/section-5-kidney-activity.pdf"
           :target "_blank"}
       "this PDF document for local numbers"]]]]])

(defn a-percentage
  "Replace 'a percentage ' in s with 'v% '"
  [s v]
  (string/replace s
                  "a percentage "
                  (str v "% ")))

(defmethod show-guidance :percent []
  (let [percent @(rf/subscribe [::subs/guidance-percent])
        randomise-icons @(rf/subscribe [::subs/randomise-icons])]
    [:<>
     [:h3 (a-percentage (:percent guidances) percent)]
     [ui/row {:style {:display         :flex
                      :justify-content "start"
                      :flex-wrap       "wrap"}}
      [ui/col
       [:div {:sm 3 :style {:display         :flex
                            :justify-content "flex-start"
                            :flex-wrap       "wrap"}}
        [:div {:style {:display         :flex
                       :flex-direction  "row"
                       :width           140
                       :justify-content "space-between"
                       :margin-bottom   5
                       :margin-right    5}}
         [:> bs/Button {:style    {:width        55 :height 50
                                   :margin-right 5}
                        :disabled (zero? percent)
                        :on-click #(rf/dispatch [::events/inc-guidance-percent -1])} "- 1"]
         [:> bs/Button {:style    {:width 55 :height 50}
                        :disabled (= 100 percent)
                        :on-click #(rf/dispatch [::events/inc-guidance-percent 1])} "+ 1"]]
        [:div {:style {:display         :flex
                       :width           140
                       :justify-content "space-between"
                       :margin-bottom   5
                       :margin-right    5}}
         [:> bs/Button {:style    {:width        55
                                   :height       50
                                   :margin-right 5}
                        :disabled (zero? percent)
                        :on-click #(rf/dispatch [::events/inc-guidance-percent -10])} "-10"]
         [:> bs/Button {:style    {:width 55 :height 50}
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
                                 {:key     (str "icon-col-" i)
                                  :color   (if (neg? (if randomise-icons
                                                       (order (- 100 (+ 10 (* j 10) (- i))))
                                                       (- percent (- 101 (+ 10 (* j 10) (- i))))))
                                             "#CCC"
                                             "#488")
                                  #_(if (< (- 100 (+ 10 (* j 10) (- i))) percent) "#488" "#CCC")
                                  :padding "4px 5px"} "person"]) (range 10))])]])
              (range 10))]))]]]))

(defn useful-info-button
  [{:keys [active event label]}]
  [:> bs/Button {:style    {:width "100%"}
                 :variant  (if active "secondary" "outline-secondary")
                 :active   active
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
                          [:h3 "Useful information"]        ; :todo

                          [:> bs/ButtonGroup {:vertical true}
                           [useful-info-button {:active (= :percent selected)
                                                :event  [::events/guidance :percent]
                                                :label  sample-percentage}]
                           [useful-info-button {:active (= :visits selected)
                                                :event  [::events/guidance :visits]
                                                :label  (:visits guidances)}]
                           [useful-info-button {:active (= :kidney-numbers selected)
                                                :event  [::events/guidance :kidney-numbers]
                                                :label  (:kidney-numbers guidances)}]
                           [useful-info-button {:active (= :medications selected)
                                                :event  [::events/guidance :medications]
                                                :label  (:medications guidances)}]
                           [useful-info-button {:active (= :graft-failure selected)
                                                :event  [::events/guidance :graft-failure]

                                                :label  (:graft-failure guidances)}]]]

       (= organ :lung) [ui/col {:md 4}
                        [:h3 "Useful information"]
                        [:> bs/ButtonGroup {:vertical true}
                         [useful-info-button {:active (= selected :percent)
                                              :event  [::events/guidance :percent]
                                              :label  sample-percentage}]
                         [useful-info-button {:active (= selected :visits)
                                              :event  [::events/guidance :visits]
                                              :label  (:visits guidances)}]
                         [useful-info-button {:active (= selected :lung-numbers)
                                              :event  [::events/guidance :lung-numbers]
                                              :label  (:lung-numbers guidances)}]
                         [useful-info-button {:active (= selected :donors)
                                              :event  [::events/guidance :donors]
                                              :label  (:donors guidances)}]
                         [useful-info-button {:active (= selected :medications)
                                              :event  [::events/guidance :medications]
                                              :label  (:medications guidances)}]
                         [useful-info-button {:active (= selected :window)
                                              :event  [::events/guidance :window]
                                              :label  (:window guidances)}]]])
     [ui/col {:md 8}
      [:div {:style {:margin-top 40}}
       (show-guidance {:info-key @(rf/subscribe [::subs/guidance])})
       [:> bs/Row
        [:> bs/Col {:md    {:span 5}
                    :style {:border        "3px solid #336677"
                            :border-radius 3
                            :padding-top   20
                            :margin-left   15
                            :margin-right  10
                            :margin-top    30}}
         [:p [:b [:span {:style {:color "red"}} (ui/open-icon "wrench")] " UNDER CONSTRUCTION!"]]
         [:p "Please tell us what you would like to see here, and do let us know of any errors that need correction."]
         [:p [:b [:span {:style {:color "#336677"}} (ui/open-icon "envelope-closed")]
              [:a {:href (str "mailto:" (if (= organ :lung) "lung" "kidney") "kcp@statslab.cam.ac.uk?subject=Useful%20Information%20Feedback")} " Email us"]
              ]]]]]]]))

;; todo - move to config
(def boxed-fill "#DFE4DF")
(def boxed-border "20px solid #DFE4DF")
(def boxed-text [:span {:style {:font-size "1.2em" :font-weight "bold"}} "DONOR Characteristics"])
(def boxed-text-color "#000")

(defn create-printout-details
  "Creates a context object for use in the printout"
  [visualization-context additional-details]
  (let [
        total-score (:total-score visualization-context)
        time-index (get-in visualization-context [:tool-mdata :printout :time-index] nil)
        excluded-inputs (get-in visualization-context [:tool-mdata :printout :excluded-inputs] #{})
        fs-by-year-in-plot-order (:fs-by-year-in-plot-order visualization-context)
        details {
                 :selection                (utils/reorder-map (:inputs visualization-context) (:fmaps visualization-context))
                 :risk-score               total-score
                 :risk-description         (str (str/capitalize (name (:risk-group visualization-context))) " Risk")
                 :risk-group               (:risk-group visualization-context)
                 :leibovich-score          (:leibovich-score visualization-context)
                 :inline-score             (:inline-score visualization-context)
                 :excluded-inputs          excluded-inputs
                 :page-header              (get-in visualization-context [:tool-mdata :printout :header] "")
                 :risk-at-print-time-index (if (empty? fs-by-year-in-plot-order)
                                             nil
                                             (-> fs-by-year-in-plot-order
                                                 (nth time-index)
                                                 second     ; [time, {series}]
                                                 :int-fs
                                                 ; HACK: hardcoded against plot order... ideally this would be keyed
                                                 second))
                 :time-index-description   (get-in visualization-context [:tool-mdata :printout :description] "")
                 :header-data              {
                                            :patient-name      (:patient-name additional-details)
                                            :nhs-number        (:nhs-number additional-details)
                                            :dob               (utils/to-locale-date-str (:dob additional-details))
                                            :clinician-name    (:clinician-name additional-details)
                                            :consultation-date (utils/to-locale-date-str (:consultation-date additional-details))}
                 :more-information         (-> visualization-context
                                               :mdata
                                               (get-in [(ui/get-single-organ (:mdata visualization-context))])
                                               :more-information)
                 :risk-statement-template  (get-in visualization-context [:tool-mdata :printout :risk-statement] "")
                 :in-other-words-template  (get-in visualization-context [:tool-mdata :printout :in-other-words] "")
                 :images-desc              (get-in visualization-context [:tool-mdata :printout :images-desc] "")}]
    details)
  )

(defn tool-page
  [{:keys [organ organ-centres centre tool tool-name mdata tools organ-name centre-name]}]
  (when (and mdata organ centre ((keyword organ) organ-centres) tool)
    (let [centre-info (utils/get-centre-info organ-centres organ centre)
          uk-info (utils/get-centre-info organ-centres organ :uk)
          tool-mdata (utils/get-tool-meta mdata organ tool)
          tcb (bun/get-bundle organ centre tool)
          is-full-screen @(rf/subscribe [::subs/is-full-screen])
          tab (get-in @(rf/subscribe [::subs/current-route]) [:path-params :tab] "bars")
          vis-context (results/create-visualization-context {:organ        organ :centre centre :tool tool
                                                             :selected-vis @(rf/subscribe [::subs/selected-vis])})
          printout-details (create-printout-details vis-context @(rf/subscribe [::subs/additional-details]))]

      [:div {:id "capture" :class-name "print-body"}
       (when-not is-full-screen
         [:div [:div.d-print-none {:style {:width "100%" :background-color rgb/theme :padding 20 :color "white"}}
                [ui/row
                 [ui/col {:xs 12 :sm 8}
                  [:h1 (if (= tool-name "pkm") "PREDICT Kidney model" "Leibovich-Plus Score")]]]

                [ui/tools-menu tools true organ-name centre-name {:vertical false}]]
          [:div.d-none.d-print-block.print-header
           [:div {:style {:padding "30px 30px 0 30px"}}
            [:img {:src "assets/nhs-left-align_scaled.svg" :style {:display "block" :width "3cm" :margin-left "auto" :margin-right 0}}]
            [ui/row
             [ui/col {:xs 6}
              [:p [:b "Patient details:"] [:br]
               "Name: " (-> printout-details :header-data :patient-name) [:br]
               "NHS  number: " (-> printout-details :header-data :nhs-number) [:br]
               "Date of birth: " (-> printout-details :header-data :dob)]]
             [ui/col {:xs 6}
              [:p [:b "Consultant:"] [:br]
               "Name: " (-> printout-details :header-data :clinician-name) [:br]
               "Date: " (-> printout-details :header-data :consultation-date) [:br]
               "Signature: "]]]]
           [:hr.rounded {:style {:border-color rgb/theme :margin 0}}]]])

       (when (= tab "test")
         [results/results-panel {:bare true :vis-context vis-context :centre-info centre-info}])


       (when-not @(rf/subscribe [::subs/missing-inputs])
         [ui/col {:xs 12 :class-name "flex-fill d-none d-print-block"}
          [:div {:class-name "boxed text-center" :style {:margin-bottom "16px"}}
           [:p {:style {:margin "8px"}} (:page-header printout-details)]]
          [ui/col {:xs 12}
           [:h5 {:class-name "text-decoration-underline"}
            (let [{:keys [risk-group leibovich-score inline-score]} printout-details
                  risk-text (str "Results: " (str/capitalize (name risk-group)) " Risk")]
              (if inline-score
                (str risk-text ", " leibovich-score)
                risk-text))]]])


       (if-let [tool-centre-bundle tcb]
         (let [tcb-fmaps (get tool-centre-bundle :fmaps)
               filtered-inputs (:excluded-inputs printout-details)
               first-boxed (ffirst (filter (fn [[_k w]] (:boxed w)) tcb-fmaps))]
           [ui/row {:style {:margin "0px 10px"}}
            [ui/col {:xs 12}
             [:h3 {:style {:margin-top 10}} (:page-title tool-mdata)]]

            ;;;
            ;; Inputs panel
            ;;;
            (when-not is-full-screen
              [ui/col {:md         6
                       :style      {:margin-top 10}
                       :class-name "col-print-6 boxed"}

               (when-let [input-header (get-in tool-mdata [:inputs :header])]
                 input-header)

               [:div {:style {:padding "0px 0px 0 15px"}}
                (widg/widget {:type :reset})

                (into [:<>]
                      (map
                        (fn [[k w]] ^{:key (:factor w)}
                          [:div {:class-name (when (contains? filtered-inputs k) "d-print-none")
                                 :style      {:margin-top       0
                                              :margin-bottom    -5
                                              :margin-left      -15
                                              :padding          5
                                              :display          "relative"
                                              :outline-bottom   (when (some? (:boxed w)) boxed-border)
                                              :background-image (when (some? (:boxed w)) (str "url(" (prf/data-urls :boxed) ")"))}}
                           [:div {:style {:position      "relative"
                                          :padding-right 5}}
                            (when (= k first-boxed)
                              [:> bs/Row {:style {:padding-top 0 :display "flex" :align-items "center"}}
                               [:> bs/Col {:xs    6
                                           :style {:display "flex" :justify-content "flex-end"}}
                                [:span {:style {:text-align "right"}}
                                 boxed-text]]])
                            (widg/widget (assoc w :model tool))]
                           [:div {:style {:height 10} :class "d-print-none"}]])

                        tcb-fmaps))]
               [:<>
                (get-in tool-mdata [:inputs :footer])
                [:p
                 [:> bs/Button {:id       "factors-considered"
                                :size     "md"
                                :variant  "primary"
                                :title    "Factors considered but not included"
                                :style    {:margin-left 0}
                                :on-click (fn [_e]
                                            (rf/dispatch [::events/modal-data
                                                          {:show    true
                                                           :title   "Important factors not included in the tool"
                                                           :content (get-in tool-mdata [:inputs :factors-not-included])
                                                           :on-hide widg/hide-handler
                                                           :ok      widg/hide-handler}]))}
                  [:span "Show important factors not included in the tool"]]]]])

            ;;;
            ;; Results Panel
            ;;;
            [:div.w-100.d-print-none.d-xs-block.d-md-none]  ; this allows for a two column print layout but a one column xs and sm screen sizes
            [ui/col {:class-name "col-print-6"
                     :md         (if is-full-screen 12 6)}

             (when-not is-full-screen
               [:section.d-print-none {:style {:margin-top 10}} (:pre-section tool-mdata)])
             [:section.d-print-none
              [results/results-panel {:vis-context vis-context}]
              (:rest-of-page tool-mdata)]

             (when-not @(rf/subscribe [::subs/missing-inputs])
               (let [{:keys [risk-statement-template in-other-words-template risk-description time-index-description risk-at-print-time-index]} printout-details
                     risk-desc (str/lower-case risk-description)
                     time-desc time-index-description
                     risk-val risk-at-print-time-index]
                 [:section.d-none.d-print-block {:style {:margin-top 10}}
                  [:p (render-formatted (utils/localize-plural nil risk-statement-template risk-desc time-desc risk-val))]
                  [:p "In other words, " [:b (utils/localize-plural nil in-other-words-template risk-desc time-desc risk-val)]]]))

             [widg/print-or-save]]

            (when-not @(rf/subscribe [::subs/missing-inputs])
              [:div [ui/col {:class-name "flex-fill d-none d-print-flex" :style {:margin-top "10px"}}
                     [ui/col {:xs 12 :style {:padding 0}} [:p {:style {:margin-bottom "8px"}} (:images-desc printout-details)]]]

               [ui/col {:class-name "flex-fill d-none d-print-flex"}
                [ui/col {:xs 6 :style {:padding 0}} [vis/icon-array vis-context {:disable-mobile true}]]
                [ui/col {:xs 4 :style {:padding 0 :margin-left "16px"}} [vis/area-chart vis-context {:slimline true}]]]

               (let [vis-context (assoc vis-context :hidden-labels #{:ldsurvival-competing-mortality})]
                 [ui/col {:class-name "flex-fill d-none d-print-flex"}
                  [ui/col {:xs 8 :style {:padding 0 :margin-top -20 :margin-bottom -20}} [vis/table vis-context]]

                  [ui/col {:xs 4 :style {:padding 0}}
                   [:svg {:style               {:width "240px" :border "2px solid"}
                          :viewBox             "0 0 300 160"
                          :preserveAspectRatio "xMinYMin meet"}
                    [:rect {:width "100%" :height "100%" :fill "#CCC"}]
                    [:g {:transform "translate(20 -20)"}
                     (vis/svg-outcome-legend (:label-order vis-context) (:data-styles vis-context))]]
                   (let [{:keys [leibovich-score inline-score]} printout-details]
                        (when (and leibovich-score (not inline-score))
                              [:h5 {:class-name "d-none d-print-block"
                                    :style {:margin "16px 0 0 0px"}}
                               leibovich-score]))]])

               [ui/col {:xs 12 :class-name "d-none d-print-block page-break"}
                [:h3 "Further details"]
                [:div
                 (into [:<>]
                       (map
                         (fn [[level-id stage-id]]
                           (let [stage-data (get-in tcb-fmaps [level-id])
                                 level-data (get-in stage-data [:levels stage-id])
                                 description (get-in (:printout-level-name tool-mdata)
                                                     [level-id stage-id])]
                             (when description
                               [:div
                                [:p [:b (:factor-name stage-data)] " - " (r/as-element (-> stage-data :info-box? edn/read-string second))]
                                [:p {:class-name "ml-5" :style {:color "#007bff"}}
                                 (first description)
                                 [:b (second description)]
                                 (get description 2 "")
                                 (when-let [sub-text (:sub-text level-data)]
                                   (str " - " sub-text))]
                                ])))
                         (:selection printout-details)))
                 ]]

               [ui/col {:xs 12 :class-name "d-none d-print-block boxed" :style {:padding "16px 16px 0"}}
                [:h5 "MORE INFORMATION AND SUPPORT:"]
                (:more-information printout-details)]])])

         (if (= tool :guidance)
           [guidance organ]
           (let [path (paths/organ-centre-name-tool organ-name
                                                    (:name centre-info)
                                                    tool-name)]
             (rf/dispatch [::events/load-bundles [path
                                                  [:bundles organ centre tool]]])
             [:div "Loading " path])))
       [ui/row
        [ui/col {:class-name "d-none d-md-block"}]]])))

(defn organ-centre
  "A home page for an organ at a centre. It should offer links to the available tools, pre-configured
   for that organ and centre. I think we no longer use this component because we always set the tool to
   the first available one for the organ, so we never display a page without a known tool.
   Minimally, navigate to an organ-centre-tool home page.

   If no tool has been selected, load the waiting tool"
  []
  (let [route @(rf/subscribe [::subs/current-route])
        organ-centres @(rf/subscribe [::subs/organ-centres])
        [organ-name centre-name :as p-names] (utils/path-names (:path-params route))
        [organ centre _tool] (map keyword p-names)
        mdata @(rf/subscribe [::subs/mdata])
        tools (utils/get-tools mdata organ)]

    (tool-page {:organ         organ
                :organ-centres organ-centres
                :centre        centre
                :tool          :waiting
                :tool-name     "waiting"
                :mdata         mdata
                :tools         tools
                :organ-name    organ-name
                :centre-name   centre-name})
    ))


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
        tools (utils/get-tools mdata organ)]

    (tool-page {:organ         organ
                :organ-centres organ-centres
                :centre        centre
                :tool          tool
                :tool-name     tool-name
                :mdata         mdata
                :tools         tools
                :organ-name    organ-name
                :centre-name   centre-name})))

(defn organ-centre-tool-tab
  "A home page for an organ at a centre. It should offer links to the available tools, pre-configured
   for that organ and centre."
  []
  (let [route @(rf/subscribe [::subs/current-route])
        mdata @(rf/subscribe [::subs/mdata])
        organ-centres @(rf/subscribe [::subs/organ-centres])
        [organ-name centre-name tool-name :as p-names] (utils/path-names (:path-params route))
        tool-name (if (nil? tool-name) :waiting tool-name)
        [organ centre tool] (map keyword p-names)
        tools (utils/get-tools mdata organ)]
    ;(js/console.log "views 1170 path-params" (:path-params route) )
    (tool-page {:organ         organ
                :organ-centres organ-centres
                :centre        centre
                :tool          tool
                :tool-name     tool-name
                :mdata         mdata
                :tools         tools
                :organ-name    organ-name
                :centre-name   centre-name})))

(defn organ-centre-tool-tab-inputs
  "A home page for an organ at a centre. It should offer links to the available tools, pre-configured
   for that organ and centre."
  []
  (let [route @(rf/subscribe [::subs/current-route])
        mdata @(rf/subscribe [::subs/mdata])
        organ-centres @(rf/subscribe [::subs/organ-centres])
        path-params (:path-params route)
        path-inputs (:inputs path-params)
        tab (:tab path-params)
        [organ-name centre-name tool-name :as p-names] (utils/path-names path-params)
        tool-name (if (nil? tool-name) :waiting tool-name)
        [organ centre tool] (map keyword p-names)
        tools (utils/get-tools mdata organ)]
    #_(?-> {:route         route
            :db-inputs     db-inputs
            :path-inputs   path-inputs
            :organ         organ
            :organ-centres organ-centres
            :centre        centre
            :tool          tool
            :tool-name     tool-name
            :mdata         mdata
            :tools         tools
            :organ-name    organ-name
            :centre-name   centre-name} ::param-check)
    (rf/dispatch [::events/selected-inputs-vis path-inputs tab])

    [tool-page {:organ         organ
                :organ-centres organ-centres
                :centre        centre
                :tool          tool
                :tool-name     tool-name
                :mdata         mdata
                :tools         tools
                :organ-name    organ-name
                :centre-name   centre-name}]))
