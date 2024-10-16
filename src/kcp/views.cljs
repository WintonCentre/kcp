(ns kcp.views
  (:require
    [clojure.edn :as edn]
    [clojure.string :as string]
    [kcp.vis2 :as vis]
    [re-frame.core :as rf]
    ["react-bootstrap" :as bs]
    [kcp.bsio :as bsio]
    [kcp.bundles :as bun]
    [kcp.utils :as utils]
    [kcp.subs :as subs]
    [kcp.events :as events]
    [kcp.ui :as ui]
    [kcp.paths :as paths]
    [kcp.widgets :as widg]
    [kcp.results :as results]
    [kcp.print-fills :as prf]
    [kcp.rgb :as rgb]
    [kcp.factors :as fac]
    [kcp.model :as model]
    [medley.core :as medl]
    [shadow.debug :refer [locals ?> ?-> ?->>]]
    [clojure.string :as str]
    [svg.container :as svgc]))

(defn home-section
  [& content]
  (into [:section {:class-name "home-section"}]
        content))

(defn scroll-to-target
  "A reagent component that registers itself as a target for js/scrollIntoView."
  [{:keys [id]} & content]
  (into [:section {:id id}]
        content))

(defn choose-centre-nav
  [mdata]
  (let [single-organ (ui/get-single-organ mdata)]
    (map (fn [organ]
           [:div {:key   (get-in mdata [organ :text])
                  :style {:margin-bottom 20}}
            [ui/button {:id         (str (name organ) "-button")
                        :class-name "btn-lg"
                        :variant    "primary"
                        :style      {:font-size "1.5em"}
                        :on-click   #(rf/dispatch [::events/navigate ::organ-centre-tool-tab-inputs {:organ organ :centre "uk" :tool "ldsurvival" :tab "icons" :inputs "-"}])}
             (if single-organ
               "Start the tool"
               ;"Choose your transplant centre"
               (get-in mdata [organ :label]))]])
         (mdata :organ-order))))

(defn leila-text
  [mdata]
  (let [single-organ (ui/get-single-organ mdata)]
    [:<>
     [:> bs/Row
      [:> bs/Col {:md 6}
       [home-section
        [:h2 "What does this site do?"]
        [:p (get-in mdata [single-organ :description])]
        [:p "Results can be printed out for patients to take home."]]


       [home-section
        [:h2 "How does it work?"]
        (ui/fixup-markup (get-in mdata [single-organ :how-does-it-work]))]

       [home-section
        [:h2 "What does the tool show?"]
        [:p "The tool will show the risk of your cancer coming back (recurrence) or spreading to other parts of the body (metastasis).
        It will also show an estimate of your risk of death from other causes over the next 10 years based on data from
        people of the same age and sex. If your cancer comes back there are several options for treatment,
        which your oncology team will discuss with you."]]

       [home-section
        [:h2 "Who is this site for?"]
        [:p (get-in mdata [single-organ :who-is-it-for])]]]

      [:> bs/Col {:md 6}
       [home-section
        [:h2 "Overview"]
        [:p "It takes the information you enter and shows what happened to people “like you” in the past. "
         [:b " It is not showing what will happen to you in the future, it is showing what happened to people
              like you in the past."]]
        [:p "The tool cannot take into account everything about you.  For example it does not currently ask
             about other health conditions you may have."]
        [:p " If you want to know more about the data and the models behind the tool read
             the " [:a {:href (ui/href :kcp.views/tech)} "technical section"] " of this site."]]
       [home-section
        [:h2 "Where can I find more information and support?"]
        (get-in mdata [single-organ :more-information])]]

      [:> bs/Col {:sm 12 :style {:display "flex" :justify-content "center"}}
       (choose-centre-nav mdata)]]]))

;;; Views ;;;
(defn home-page
  "Display a generic home page.
   Minimally, navigation from here to an organ home page."
  []
  (let [mdata @(rf/subscribe [::subs/mdata])
        route @(rf/subscribe [::subs/current-route])
        single-organ (ui/get-single-organ mdata)
        organ (get-in route [:path-params :organ])]
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
         (str "PREDICT " (string/capitalize (name single-organ)))
         (get-in mdata [single-organ :label])
         [ui/row
          [ui/col
           [:<> (leila-text mdata)]]]])
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
        single-organ (ui/get-single-organ mdata)]

    (if mdata
      [ui/page (str "Publications")
       [ui/row
        (condp = single-organ
          :kidney [:> bs/Col
                   [:p "Leibovich Model (" [:a {:href "https://doi.org/10.1002/cncr.11234" :target "_blank"} "https://doi.org/10.1002/cncr.11234"] ")."]
                   [:p "Systematic review of models predicting recurrence after kidney cancer surgery (" [:a {:href   "https://doi.org/10.1111/bju.15673"
                                                                                                              :target "_blank"} "https://doi.org/10.1111/bju.15673"] ")."]]
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
    [:p "The tool should be used initially by patients alongside their oncologist, urologist or specialist nurses."]]

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

(defn maths-section
  []

  [:section {:style {:border-bottom "1px #337777 solid"
                     :margin-bottom 20}}
   [:h3#mathematical-section "Mathematical Section"]
   [:p "A joint modelling, cox proportional hazards approach was adopted to model the risk of recurrence and risk of death due to other causes."]
   [:p [:b "Leibovich Model"]]
   [:p "The Leibovich model uses a Cox proportional hazard model as a way of modelling factors which effect an event that
   may or may not happen over an observation period (such as recurrence or death). Here, the hazard of recurrence is the
   likelihood that a recurrence will occur soon, conditional on not having experienced a recurrence so far. At its core,
   this modelling assumes that the hazard is made up of a baseline hazard, which is the same for everyone, multiplied by a fixed amount related to each risk factor."]
   [:p "In particular, we are interested in the cumulative hazard, which is the total amount of hazard experienced at a given time."]

   [:p "The estimated cumulative recurrence hazard for a given is given by; "]
   [:div {:style {:display "flex" :justify-content "center" :font-family "serif" :margin-bottom 20}}
    [:i "H" [:sub "R"] "(t|X" [:sub "t"] ") = H" [:sub "R0"] "(t) exp(β . X" [:sub "t"] ")"]]
   [:p "where:"]
   [:ul
    [:li [:span {:style {:font-family "serif"}}
          [:i "H" [:sub "R0"] "(t)"]] " is the estimated baseline hazard from the original Leibovich score" [:sup "1"] " at time " [:i "t"]]
    [:li "The log hazard ratios " [:i "β"] " are estimated by a multivariate linear regression as described in Table 3 of the original Leibovich paper" [:sup "1"]]
    [:li [:i {:style {:font-family "serif"}} "X" [:sub "t"]] " are the tumour characteristics for a given patient"]]

   [:p "This can be translated into a survival function, which describes the probability of having a recurrence after
   time " [:i "t"] " through the following equation: "]
   [:div {:style {:display "flex" :justify-content "center" :font-family "serif" :margin-bottom 20}}
    [:i "S" [:sub "R"] "(t|X" [:sub "t"] ") "] " = exp" [:i " (-H" [:sub "R"] "(t|X" [:sub "t"] "))"]]
   [:p "Conversely, the risk function describes the probability of having a recurrence before time " [:i "t"] ", and can be defined as: "]
   [:div {:style {:display "flex" :justify-content "center" :font-family "serif" :margin-bottom 20}}
    [:i "R" [:sub "R"] "(t|X" [:sub "t"] ") "] " = 1 - " [:i "S" [:sub "R"] "(t|X" [:sub "t"] ")"]]
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

   [:h3#browser-compatibility "Browser Compatibility"]
   [:p "This version has been tested and found to work in Edge, Chrome, Safari, Firefox, on desktop PCs and Macs and also on Android and IOS mobile devices."]
   [:p "Support for IE 11 is limited and some functionalities like 'Copy' or 'Fullscreen' may not work at all."]
   [:p "It does not currently support any other version of Internet Explorer."]])

(defn references-section
  []
  [:<>
   [:section {:style {:border-bottom "1px #337777 solid"
                      :margin-bottom 20}}
    [:h3#references "References"]
    [:ol
     [:li "Leibovich, B. C. et al. Prediction of progression after radical nephrectomy for patients with clear cell renal
    cell carcinoma: A stratification tool for prospective clinical trials. Cancer " [:b "97"] ", 1663–1671 (2003)."]
     [:li "Usher-Smith, J.A., et al. Risk models for recurrence and survival after kidney cancer: a systematic review. BJU Int, 130: 562-579. (2022)"]]]])

(defn overview-menu [[route text]]
  [:li {:key (random-uuid)} [:span {:on-click #(.scrollIntoView (.getElementById js/document route)
                                                                (js-obj "behavior" "smooth"))
                                    :style    {:color :#1F6BC4 :font-size 18 :cursor :pointer}} text]])

(def kidney-tags [["model-development" "Model development"]
                  ["cohort" "Cohort"]
                  ["model-validation" "Model Validation"]
                  ["input-factors" "Input Factors"]
                  ["mathematical-section" "Mathematical Section"]
                  ["the-web-implementation" "Web implementation"]
                  ["the-development-stack" "The development stack"]
                  ["browser-compatibility" "Browser Compatibility"]
                  ["references" "References"]])

(defn kidney-tech-content
  []
  [:> bs/Col
   [:section {:style {:border-bottom "1px #337777 solid"
                      :margin-bottom 20}}
    [:section
     [:ul {:style {:list-style-image "url(assets/bullet-plus.png)"
                   :margin-top       10}} (map overview-menu kidney-tags)]]


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
    [:p "The Leibovich model and score have been used clinically for 20 years. However, it cannot
say what the outcomes for a particular patient will be. Instead, it estimates the probability of
recurrence in people from the past with similar kidney cancer tumours."]
    [:p "Further information is provided in the " [:a {:href "https://doi.org/10.1002/cncr.11234" :target "_blank"} "development paper (published 2003)"] "."]]


   [:h3#cohort "Cohort"]
   [:p "The Leibovich score was developed in a cohort of patients who underwent a radical
nephrectomy (full removal of the kidney) to treat clear cell renal cell carcinoma (ccRCC)
between 1970 and 2000. This did not include patients who already had metastatic disease.
Patients with inherited renal cell carcinoma (including von Hippel-Lindau disease), those
with tumours in both kidneys (bilateral synchronous tumours), or who were diagnosed with
Wilms tumour (a different form of kidney cancer) were not included. All included patients
were over 18 at the time of surgery."]


   [:h3#model-validation "Model Validation"]
   [:p "The Leibovich model has been tested (or validated) in multiple different groups of patients
since it was first developed. In a recent review, 16 validations were identified with results for
discrimination in the range 0.67-0.86. More details can be found in this "
    [:a {:href "https://bjui-journals.onlinelibrary.wiley.com/doi/10.1111/bju.15673" :target "_blank"} "review paper (published in 2021)."]]

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

(defn factors-not-included
  "Considered factors that were not included"
  [mdata]
  (let [route @(rf/subscribe [::subs/current-route])
        single-organ (ui/get-single-organ mdata)
        organ (get-in route [:path-params :organ])]
    (condp = (or single-organ organ)
      :lung [:div
             [:p "Patient inputs that were considered but not included in the tool e.g. antibody status"]
             [:p [:b "Recipient Antibody Status"] " – not currently collected by NHS BT"]
             [:p [:b "Recipient Height or TLC" " – BMI is included in model.  In the model building, height was found to be significant for time to transplant and BMI for time to death on list (but not height), so a decision was made to go with BMI as it includes height."]]
             [:p [:b "O2 need or use / NIV / Frailty / 6 minute walk test"] " - 6 minute walk completeness for cohort used = 84% so would reduce cohort even further to include as we would remove all patients completely from the modelling if they had this missing.  Home oxygen use (y/n) is collected but when we did the original project for this, we were told it was not relevant to include. NIV is not collected."]
             [:p [:b "FEV1, Transfer Factor"] " - FVC is included in model."]
             [:p [:b "Comorbidities (coronary artery disease, renal dysfunction, diabetes)"] " - Coronary artery disease collected only as primary disease so not available for inclusion.  eGFR and diabetes was considered when constructing the models originally and were not significant."] [:p [:b "Time on ventilator / mechanical support"] " - Time on support not captured and very low numbers for on ventilator as it is only collected for patients in hospital at transplant – 9 (0.8%) of cohort were on ventilator at transplant."]]
      :kidney [:div
               [:p "In some studies, other information about patients has been shown to be related to likelihood of
kidney cancer coming back (recurrence). These factors include age, sex and measures of overall
health (sometimes described as comorbidity or frailty). However, the relationship between these
factors and the predictions made by this tool are not well understood by researchers and doctors do
not currently use these factors to make decisions about follow-up care."]]
      :else [:div])))

(defn create-printout-details
  "Creates a context object for use in the printout"
  [visualization-context additional-details]
  (let [
        total-score (:total-score visualization-context)
        time-index (get-in visualization-context [:tool-mdata :printout :time-index] nil)
        fs-by-year-in-plot-order (:fs-by-year-in-plot-order visualization-context)
        details {
                 :selection                (utils/reorder-map (:inputs visualization-context) (:fmaps visualization-context))
                 :risk-score               total-score
                 :risk-description         (cond
                                             (<= total-score 2) "low risk"
                                             (>= total-score 6) "high risk"
                                             :default "intermediate risk")
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
                                               :more-information)}]
    details)
  )

(defn tool-page
  [{:keys [organ organ-centres centre tool tool-name mdata tools organ-name centre-name] :as params}]
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
                  [:h1 (:explanation uk-info)]]]

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
           [:p {:style {:margin "8px"}}
            "PREDICT Kidney is a prognostic tool to predict recurrence in patients surgically treated for non-metastatic kidney cancer"]]
          [ui/col {:xs 12}
           (let [total-score (:risk-score printout-details)]
             [:h4 {:class-name "text-decoration-underline"}
              (str "RESULTS: " (str/upper-case (:risk-description printout-details)) " Leibovich Score " total-score)])]])


       (if-let [tool-centre-bundle tcb]
         (let [tcb-fmaps (get tool-centre-bundle :fmaps)
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
                          [:div {:style {:margin-top       0
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
                           [:div {:style {:height 10}}]])

                        tcb-fmaps))]
               [:<>
                [:p.d-print-none {:style {:margin-top "15px"}} "This tool cannot take into account all the factors about you that might affect the result. We hope to include more in the future."]
                [:p.d-print-none "Click below to find out more about factors that may affect the likelihood of kidney cancer coming back but are not included the tool."]
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
                                                           :content (factors-not-included mdata)
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

             (when-not @(rf/subscribe [::subs/missing-inputs]) [:section.d-none.d-print-block {:style {:margin-top 10}}
                                                                [:p "Based on the details of your tumour, you are at "
                                                                 [:b (:risk-description printout-details)] (str " of your cancer coming back or
              spreading. When we consider the details of your tumour the estimated risk of your cancer coming back
              (recurrence) or spreading to other parts of the body
              (metastasis) " (:time-index-description printout-details) " is " (:risk-at-print-time-index printout-details) "%.")]
                                                                [:p "In other words, " [:b (str "the cancer will come back or spread " (:time-index-description printout-details)
                                                                                                " in about " (:risk-at-print-time-index printout-details) " out of 100 patients with the same tumour as you.")]]])

             [widg/print-or-save]]

            (when-not @(rf/subscribe [::subs/missing-inputs])
              [:div [ui/col {:class-name "flex-fill d-none d-print-flex" :style {:margin-top "10px"}}
                     [ui/col {:xs 12 :style {:padding 0}} [:p "The following images show that risk in different ways. They also
             show the estimated risk of the cancer coming back or spreading between 1 year and 10 years."]]]

               [ui/col {:class-name "flex-fill d-none d-print-flex"}
                [ui/col {:xs 6 :style {:padding 0}} [vis/icon-array vis-context {:disable-mobile true}]]
                [ui/col {:xs 1 :style {:padding 0}}]
                [ui/col {:xs 4 :style {:padding 0}} [vis/area-chart vis-context {:slimline true}]]]

               [ui/col {:class-name "flex-fill d-none d-print-flex"}
                [ui/col {:xs 8 :style {:padding 0 :margin-top -20}} [vis/table vis-context]]

                [ui/col {:xs 3 :style {:padding 0}}
                 [:svg {:style               {:width "180px" :border "2px solid"}
                        :viewBox             "0 0 270 160"
                        :preserveAspectRatio "xMinYMin meet"}
                  [:rect {:width "100%" :height "100%" :fill "#CCC"}]
                  [:g {:transform "translate(7 -20)"}
                   (vis/svg-outcome-legend (:plot-order vis-context) (:data-styles vis-context))]]]]

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
                                [:p [:b (:factor-name stage-data)] " - " (-> stage-data :info-box? edn/read-string second)]
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


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;


; the standard error test programe.
; the rute for this program is standard-error-test-848efcc3-938f-4dff-9b55-1f0394f29793.

(defn standard-error-test
  []
  (let [index (atom 0)
        collection-of-all-scors (atom {:one [] :two [] :three [] :four [] :five [] :six [] :seven [] :eight []})
        organ :kidney
        centre :uk
        tool :ldsurvival
        day @(rf/subscribe [::subs/test-day])
        {:keys [fmaps outcome-keys base-outcome-keys timed-outcome-keys beta-keys outcomes S0 all-S0] :as bundle} (bun/get-bundle :kidney :uk :ldsurvival)
        s0 all-S0
        s0-for-day (model/S0-for-day s0 day)
        year-days (map utils/year->day (range (inc (utils/day->year (first (last s0))))))
        ]

    [ui/page "Comparing the labels of the year 1, 5 and 10 with the standard error range:"
     [:ul
      [:li "This table only presents the wrong labels of all possible combinations of inputs. Each score is sorted from high to low based on the labels."]
      [:li "In the table I have generated, the second column includes different sets of inputs, and the first column on the right is the score of that set of inputs."]
      [:li "The red numbers on the third column are the wrong labels generated by the current script. These are the labels shown on the charts as “no recurrence” percentages."]
      [:li "The fourth column includes the standard error range for that specific score."]
      [:li "The last column shows that each red wrong label belongs to which real score in green. If it's None, it means there is a gap in the standard error range list, and that red label does not belong to any standard error range at all."]]

     [:div

      (rf/dispatch [::events/standard-error-range])

      (for [t-stage [:pT1a :pT1b :pT2a :pT2b :pT3a :pT3b :pT3c :pT4]
            n-stage [:pNx :pN0 :pN1 :pN2]
            tumor-size [:cm-<10 :cm->=10]
            nuclear-grade [:1 :2 :3 :4]
            histologic-tumor-necrosis [:No :Yes]]

        (do
          (swap! index inc)

          (let [the-input (hash-map :t-stage t-stage :n-stage n-stage :tumor-size tumor-size :nuclear-grade nuclear-grade :histologic-tumor-necrosis histologic-tumor-necrosis)
                env {:organ        organ :centre centre :tool tool :mdata @(rf/subscribe [::subs/mdata]) :day @(rf/subscribe [::subs/test-day]) :bundle bundle :fmaps fmaps
                     :S0           S0 :all-S0 all-S0 :outcomes outcomes :outcome-keys outcome-keys :base-outcome-keys base-outcome-keys :beta-keys beta-keys
                     :cohort-datas @(rf/subscribe [::subs/cohort-dates]) :inputs the-input :selected-vis "area"}
                total-score (+
                              (get-in env [:fmaps :t-stage :levels t-stage :score])
                              (get-in env [:fmaps :n-stage :levels n-stage :score])
                              (get-in env [:fmaps :tumor-size :levels tumor-size :score])
                              (get-in env [:fmaps :nuclear-grade :levels nuclear-grade :score])
                              (get-in env [:fmaps :histologic-tumor-necrosis :levels histologic-tumor-necrosis :score]))
                sum-betas (map #(fac/sum-beta-xs env %) beta-keys)
                F (model/cox-only s0 sum-betas)
                env (conj env [:sum-betas sum-betas] [:s0 s0] [:s0-for-day s0-for-day] [:F F])
                fs-by-year (map (fn [day] (model/S0-for-day F day)) year-days)
                tool-mdata (vis/tool-metadata env :kidney :ldsurvival)
                plot-order (:plot-order tool-mdata)
                fs-by-year-in-plot-order (vis/fs-time-series base-outcome-keys plot-order fs-by-year)]

            (when (> (count fs-by-year-in-plot-order) 1)
              (cond
                (or (= 0 total-score) (= 1 total-score))
                (swap! collection-of-all-scors update :one conj (hash-map :index @index :score total-score :set-of-inputs the-input
                                                                          :int-fs-year-one (:int-fs (second (nth fs-by-year-in-plot-order 1)))
                                                                          :int-fs-year-five (:int-fs (second (nth fs-by-year-in-plot-order 5)))
                                                                          :int-fs-year-ten (:int-fs (second (nth fs-by-year-in-plot-order 10)))))
                (= 2 total-score)
                (swap! collection-of-all-scors update :two conj (hash-map :index @index :score total-score :set-of-inputs the-input
                                                                          :int-fs-year-one (:int-fs (second (nth fs-by-year-in-plot-order 1)))
                                                                          :int-fs-year-five (:int-fs (second (nth fs-by-year-in-plot-order 5)))
                                                                          :int-fs-year-ten (:int-fs (second (nth fs-by-year-in-plot-order 10)))))
                (= 3 total-score)
                (swap! collection-of-all-scors update :three conj (hash-map :index @index :score total-score :set-of-inputs the-input
                                                                            :int-fs-year-one (:int-fs (second (nth fs-by-year-in-plot-order 1)))
                                                                            :int-fs-year-five (:int-fs (second (nth fs-by-year-in-plot-order 5)))
                                                                            :int-fs-year-ten (:int-fs (second (nth fs-by-year-in-plot-order 10)))))
                (= 4 total-score)
                (swap! collection-of-all-scors update :four conj (hash-map :index @index :score total-score :set-of-inputs the-input
                                                                           :int-fs-year-one (:int-fs (second (nth fs-by-year-in-plot-order 1)))
                                                                           :int-fs-year-five (:int-fs (second (nth fs-by-year-in-plot-order 5)))
                                                                           :int-fs-year-ten (:int-fs (second (nth fs-by-year-in-plot-order 10)))))
                (= 5 total-score)
                (swap! collection-of-all-scors update :five conj (hash-map :index @index :score total-score :set-of-inputs the-input
                                                                           :int-fs-year-one (:int-fs (second (nth fs-by-year-in-plot-order 1)))
                                                                           :int-fs-year-five (:int-fs (second (nth fs-by-year-in-plot-order 5)))
                                                                           :int-fs-year-ten (:int-fs (second (nth fs-by-year-in-plot-order 10)))))
                (= 6 total-score)
                (swap! collection-of-all-scors update :six conj (hash-map :index @index :score total-score :set-of-inputs the-input
                                                                          :int-fs-year-one (:int-fs (second (nth fs-by-year-in-plot-order 1)))
                                                                          :int-fs-year-five (:int-fs (second (nth fs-by-year-in-plot-order 5)))
                                                                          :int-fs-year-ten (:int-fs (second (nth fs-by-year-in-plot-order 10)))))
                (= 7 total-score)
                (swap! collection-of-all-scors update :seven conj (hash-map :index @index :score total-score :set-of-inputs the-input
                                                                            :int-fs-year-one (:int-fs (second (nth fs-by-year-in-plot-order 1)))
                                                                            :int-fs-year-five (:int-fs (second (nth fs-by-year-in-plot-order 5)))
                                                                            :int-fs-year-ten (:int-fs (second (nth fs-by-year-in-plot-order 10)))))
                (= 8 total-score)
                (swap! collection-of-all-scors update :eight conj (hash-map :index @index :score total-score :set-of-inputs the-input
                                                                            :int-fs-year-one (:int-fs (second (nth fs-by-year-in-plot-order 1)))
                                                                            :int-fs-year-five (:int-fs (second (nth fs-by-year-in-plot-order 5)))
                                                                            :int-fs-year-ten (:int-fs (second (nth fs-by-year-in-plot-order 10)))))
                :else (swap! collection-of-all-scors update :eight conj (hash-map :index @index :score total-score :set-of-inputs the-input
                                                                                  :int-fs-year-one (:int-fs (second (nth fs-by-year-in-plot-order 1)))
                                                                                  :int-fs-year-five (:int-fs (second (nth fs-by-year-in-plot-order 5)))
                                                                                  :int-fs-year-ten (:int-fs (second (nth fs-by-year-in-plot-order 10)))))
                )                                           ;end of cond
              )                                             ;end of when

            (if (= @index 448)
              (rf/dispatch [::events/collection-of-all-scors @collection-of-all-scors]))

            )                                               ;end of let
          )                                                 ;end of do
        )                                                   ;end of for


      (let [scors-collection @(rf/subscribe [::subs/collection-of-all-scors])
            wrong-labels-all-scors (atom {:one   {:year-one [] :year-five [] :year-ten []}
                                          :two   {:year-one [] :year-five [] :year-ten []}
                                          :three {:year-one [] :year-five [] :year-ten []}
                                          :four  {:year-one [] :year-five [] :year-ten []}
                                          :five  {:year-one [] :year-five [] :year-ten []}
                                          :six   {:year-one [] :year-five [] :year-ten []}
                                          :seven {:year-one [] :year-five [] :year-ten []}
                                          :eight {:year-one [] :year-five [] :year-ten []}})

            correct-labels-all-scors (atom {:one   {:year-one [] :year-five [] :year-ten []}
                                            :two   {:year-one [] :year-five [] :year-ten []}
                                            :three {:year-one [] :year-five [] :year-ten []}
                                            :four  {:year-one [] :year-five [] :year-ten []}
                                            :five  {:year-one [] :year-five [] :year-ten []}
                                            :six   {:year-one [] :year-five [] :year-ten []}
                                            :seven {:year-one [] :year-five [] :year-ten []}
                                            :eight {:year-one [] :year-five [] :year-ten []}})

            error-range-for-score @(rf/subscribe [::subs/standard-error-range])
            index (atom 1)]

        (doseq [x [:one :two :three :four :five :six :seven :eight]]

          (doseq [each (x scors-collection)]

            (do
              (if (and
                    (<= (nth (:int-fs-year-one each) 1) (:max (:year-one (second (nth error-range-for-score @index)))))
                    (>= (nth (:int-fs-year-one each) 1) (:min (:year-one (second (nth error-range-for-score @index))))))
                (swap! correct-labels-all-scors update-in [x :year-one] conj (hash-map :inputs (:set-of-inputs each) :the-label (nth (:int-fs-year-one each) 1)))
                (swap! wrong-labels-all-scors update-in [x :year-one] conj (hash-map :inputs (:set-of-inputs each) :the-label (nth (:int-fs-year-one each) 1)))
                )

              (if (and
                    (<= (nth (:int-fs-year-five each) 1) (:max (:year-five (second (nth error-range-for-score @index)))))
                    (>= (nth (:int-fs-year-five each) 1) (:min (:year-five (second (nth error-range-for-score @index))))))
                (swap! correct-labels-all-scors update-in [x :year-five] conj (hash-map :inputs (:set-of-inputs each) :the-label (nth (:int-fs-year-five each) 1)))
                (swap! wrong-labels-all-scors update-in [x :year-five] conj (hash-map :inputs (:set-of-inputs each) :the-label (nth (:int-fs-year-five each) 1)))
                )

              (if (and
                    (<= (nth (:int-fs-year-ten each) 1) (:max (:year-ten (second (nth error-range-for-score @index)))))
                    (>= (nth (:int-fs-year-ten each) 1) (:min (:year-ten (second (nth error-range-for-score @index))))))
                (swap! correct-labels-all-scors update-in [x :year-ten] conj (hash-map :inputs (:set-of-inputs each) :the-label (nth (:int-fs-year-ten each) 1)))
                (swap! wrong-labels-all-scors update-in [x :year-ten] conj (hash-map :inputs (:set-of-inputs each) :the-label (nth (:int-fs-year-ten each) 1)))
                )

              (rf/dispatch [::events/wrong-labels-all-scors @wrong-labels-all-scors])
              (rf/dispatch [::events/correct-labels-all-scors @correct-labels-all-scors])
              )
            )

          (if (= @index (count (x scors-collection)))
            (reset! index 1)
            (swap! index inc))

          )

        )                                                   ;end of let


      (let [wrong @(rf/subscribe [::subs/wrong-labels-all-scors])
            error-range @(rf/subscribe [::subs/standard-error-range])
            index (atom 0)
            year (if (empty? (str @(rf/subscribe [::subs/select-table-year])))
                   :year-one
                   @(rf/subscribe [::subs/select-table-year]))
            year-number (nth (string/split (nth (string/split year #":") 1) #"-") 1)]

        [:div
         [:div {:style {:padding-top "10px"}}
          [ui/button {:class-name "btn-lg"
                      :variant    "primary"
                      :style      {:font-size "1.5em"}
                      :on-click   #(rf/dispatch [::events/select-table-year :year-one])}
           "year 1"]
          [ui/button {:class-name "btn-lg"
                      :variant    "primary"
                      :style      {:font-size "1.5em"}
                      :on-click   #(rf/dispatch [::events/select-table-year :year-five])}
           "year 5"]

          [ui/button {:class-name "btn-lg"
                      :variant    "primary"
                      :style      {:font-size "1.5em"}
                      :on-click   #(rf/dispatch [::events/select-table-year :year-ten])}
           "year 10"]]

         [:div
          [:h1 {:style {:padding-top "20px"}}
           (str "Wrong labels of all scors, year " year-number ":")]

          (for [each wrong]
            (do
              (swap! index inc)

              (if (> (count (year (nth each 1))) 0)
                [:table {:style {:font-family "monospace" :margin-left "-100px" :margin-right "-100px" :margin-top "10px"}}
                 [:tr {:style {:border "1px solid black" :padding "12px" :text-align "center"}}
                  [:th {:style {:border "1px solid black" :padding "12px" :text-align "center"}}
                   "Score"]
                  [:th {:style {:border "1px solid black" :padding "12px" :text-align "center"}}
                   (str "Inputs - Count is: " (count (year (nth each 1))))]
                  [:th {:style {:border "1px solid black" :padding "12px" :text-align "center"}}
                   (str "Label Year " year-number)]
                  [:th {:style {:border "1px solid black" :padding "12px" :text-align "center"}}
                   "Standard Error Range"]
                  [:th {:style {:border "1px soldi black" :padding "12px" :text-align "center"}}
                   "Correct Score"]
                  ]

                 (for [x (reverse (sort-by :the-label (year (nth each 1))))]

                   [:tr {:style {:border "1px solid black" :padding "12px" :text-align "center"}}

                    [:td {:style {:border "1px solid black" :padding "12px" :text-align "center"}}
                     (str @index)]

                    [:td {:style {:border "1px solid black" :padding "12px" :padding-left "25px" :text-align "left" :width "1000px"}}
                     "histologic-tumor-necrsis: " [:span {:style {:color "blue"}} (nth (string/split (:histologic-tumor-necrosis (:inputs x)) #":") 1)]
                     ", nuclear-grade: " [:span {:style {:color "blue"}} (nth (string/split (:nuclear-grade (:inputs x)) #":") 1)]
                     ", t-stage: " [:span {:style {:color "blue"}} (nth (string/split (:t-stage (:inputs x)) #":") 1)]
                     ", n-stage: " [:span {:style {:color "blue"}} (nth (string/split (:n-stage (:inputs x)) #":") 1)]
                     ", tumor-size: " [:span {:style {:color "blue"}} (nth (string/split (:tumor-size (:inputs x)) #":") 1)]
                     ]

                    [:td {:style {:border "1px solid black" :padding "12px" :text-align "center" :color "red"}}
                     (str (:the-label x))]

                    [:td {:style {:border "1px solid black" :padding "12px" :text-align "center"}}
                     (str (:min (year (second (nth error-range @index)))) " - " (:max (year (second (nth error-range @index)))))]
                    [:td {:style {:border "1px solid black" :padding "12px" :text-align "center" :color "green"}}
                     (cond
                       (and
                         (<= (:the-label x) (:max (year (second (nth error-range 0)))))
                         (>= (:the-label x) (:min (year (second (nth error-range 0)))))) (str "0")
                       (and
                         (<= (:the-label x) (:max (year (second (nth error-range 1)))))
                         (>= (:the-label x) (:min (year (second (nth error-range 1)))))) (str "1")
                       (and
                         (<= (:the-label x) (:max (year (second (nth error-range 2)))))
                         (>= (:the-label x) (:min (year (second (nth error-range 2)))))) (str "2")
                       (and
                         (<= (:the-label x) (:max (year (second (nth error-range 3)))))
                         (>= (:the-label x) (:min (year (second (nth error-range 3)))))) (str "3")
                       (and
                         (<= (:the-label x) (:max (year (second (nth error-range 4)))))
                         (>= (:the-label x) (:min (year (second (nth error-range 4)))))) (str "4")
                       (and
                         (<= (:the-label x) (:max (year (second (nth error-range 5)))))
                         (>= (:the-label x) (:min (year (second (nth error-range 5)))))) (str "5")
                       (and
                         (<= (:the-label x) (:max (year (second (nth error-range 6)))))
                         (>= (:the-label x) (:min (year (second (nth error-range 6)))))) (str "6")
                       (and
                         (<= (:the-label x) (:max (year (second (nth error-range 7)))))
                         (>= (:the-label x) (:min (year (second (nth error-range 7)))))) (str "7")
                       (and
                         (<= (:the-label x) (:max (year (second (nth error-range 8)))))
                         (>= (:the-label x) (:min (year (second (nth error-range 8)))))) (str "8")
                       :else (str "none")
                       )]

                    ]                                       ;end of tr

                   )                                        ;end of for

                 ]                                          ;end of table
                )                                           ;end of if

              )                                             ;end of do
            )
          ]

         ]                                                  ;end of div
        )                                                   ;end of let
      ]                                                     ;end of div tag above the ui/page tag


     (let [path (paths/organ-centre-name-tool "kidney" "UK" "ldsurvival")]
       (rf/dispatch [::events/load-bundles [path [:bundles :kidney :uk :ldsurvival]]]))

     ]                                                      ;end of ui/page tag
    ))
