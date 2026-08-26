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
        ons-uri "https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/lifeexpectancies/bulletins/pastandprojecteddatafromtheperiodandcohortlifetables/2020baseduk1981to2070"
        single-organ (ui/get-single-organ mdata)]

    (if mdata
      [ui/page (str "Publications and other resources")
       [ui/row
        (condp = single-organ
          :kidney [:> bs/Col
                   [:section {:style {:border-bottom "1px #337777 solid"
                                      :margin-bottom 20}}
                    [:h4 "The PREDICT Kidney model"]
                    [:ul
                     [:li "A paper describing the development of this model is being written by the research team and will be added here once published."]
                     [:li "An external validation of this model is underway and a paper describing these results will be added here once published."]
                     [:li "Information on " [:b "SAIL Databank"] ", which includes the NHS Wales patient records used to develop this model: " [:a {:href "https://saildatabank.com/" :target "_blank"} "Home - SAIL Databank"]]
                     [:li "More information about the joint modelling method used to develop the competing risk model can be found in papers describing the " [:a {:href "https://doi.org/10.1038/s41523-024-00612-y" :target "_blank"} "development of the PREDICT Breast model"] " and " [:a {:href "https://doi.org/10.1371/journal.pmed.1002758" :target "_blank"} "development of the PREDICT Prostate model"]]
                     [:li "More information about the Charlson comorbidity score: " [:a {:href "https://www.sciencedirect.com/science/article/abs/pii/0021968187901718?via%3Dihub" :target "_blank"} "the development of this score"] " and " [:a {:href "https://karger.com/pps/article/91/1/8/826493/Charlson-Comorbidity-Index-A-Critical-Review-of" :target "_blank"} "a recent review of its clinical usefulness"] "."]]]

                   [:section {:style {:border-bottom "1px #337777 solid"
                                      :margin-bottom 20}}
                    [:h4 "The Leibovich-Plus model"]
                    [:ul
                     [:li "A paper describing " [:a {:href "https://doi.org/10.1002/cncr.11234" :target "_blank"} "the development of the Leibovich Model"] " by the team at the Mayo clinic."]
                     [:li "A " [:a {:href "https://doi.org/10.1111/bju.15673" :target "_blank"} "systematic review of models predicting recurrence after kidney cancer surgery,"] " which includes reporting of the performance of Leibovich model in several external validations."]
                     [:li "A pre-print of a paper describing " [:a {:href "https://www.medrxiv.org/content/10.1101/2025.05.22.25328132v1" :target "_blank"} "the adjustment of the Leibovich model to include competing risks"] " by the team at the University of Cambridge (once a peer-reviewed version is published this will be added here)."]
                     [:li [:a {:href "https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/lifeexpectancies/bulletins/pastandprojecteddatafromtheperiodandcohortlifetables/2020baseduk1981to2070" :target "_blank"} "The ONS period life tables"] " used to calculate the adjustment for the competing risk of death from other causes to generate the Leibovich-Plus model."]]]

                   [:section {:style {:margin-bottom 20}}
                    [:h4 "Development of this webtool"]
                    [:ul
                     [:li "Description of " [:a {:href "https://doi.org/10.1136/bmjopen-2025-110668" :target "_blank"} "the co-design of the PREDICT Kidney webtool"] "."]
                     [:li [:a {:href "https://doi.org/10.1002/bco2.70014" :target "_blank"} "Protocol for a feasibility study testing this webtool"] " in three urology clinics (the full results of this feasibility study will be added once published)."]]]]
          :else [ui/col [:p "None."]])]]
      [ui/loading])))

(defn kidney-about-content
  []
  [:<>

   [:section {:style {:border-bottom "1px #337777 solid"
                      :margin-bottom 20}}
    [:h4 "Overview"]
    [:p "The tool takes " [:b "information about your tumour"] ", including the size and stage, and " [:b "information about you"] ", including your age, sex and other health conditions, and uses people who had these same characteristics to predict what might happen to you (for example, how many people \"like you\" had their kidney cancer come back within one year of surgery)."]

    [:p [:b "It is not showing you what will happen to you, it is showing you what happened to people like you, in the past."] " It's important to remember that the tool does not take into account everything about you."]

    [:p "The tool presents information about your risk from kidney cancer alongside your risk of dying from other causes. The aim of the tool is to support conversations between patients and their clinical team about long-term risk when planning follow-up care. Results can be printed out to take home."]

    [:p "The " [:b "tool includes two different models"] " (the PREDICT-Kidney model and the Leibovich-Plus model). They are different in several ways, they were developed by different teams of researchers using different sets of patient data, they use different patient information in their calculations, and they predict different things. " [:b "The PREDICT-Kidney model predicts the risk of dying from kidney cancer"] " over the 15 years following surgery and the " [:b "Leibovich-Plus model predicts the risk of kidney cancer coming back"] " over the next 10 years."]

    [:p "If you want to know more about the models and data behind the tools, please read the "
     [:a {:href (ui/href :kcp.views/tech)} "Technical section"] ". "]]

   [:section {:style {:border-bottom "1px #337777 solid"
                      :margin-bottom 20}}
    [:h4 "Who is this site for?"]
    [:p "The tool is suitable for patients with renal cell carcinoma (RCC) who are over 18 years old and have had part or all a kidney removed (underwent a partial or radical nephrectomy). Note that the Leibovich-Plus tool should only be used by patients with " [:b "clear cell"] " renal cell carcinoma (ccRCC)."]
    [:p [:b "The tool should be used by patients alongside their urologist, oncologist or specialist nurse."]]]

   [:section {:style {:border-bottom "1px #337777 solid"
                      :margin-bottom 20}}
    [:h4 "Who developed the tool?"]
    [:p "The tool was developed by the Winton Centre for Risk and Evidence Communication and calculates (a) the PREDICT-Kidney model developed by researchers at the University of Cambridge (UK) and (b) the Leibovich model built by a team at the Mayo Medical School and Mayo Clinic (USA). The Leibovich model was adjusted by the research team at the University of Cambridge to include the risk of dying from other causes."]]])



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

  [:section {:style {:margin-bottom 20}}
   [:h3#mathematical-section "Model Development"]
   [:p "A joint modelling, cox proportional hazards approach was adopted to model the risk of recurrence and risk of death due to other causes."]

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

   [:section {:style {:margin-bottom 20}}
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
   [:> bs/Accordion {:default-active-key "predict-kidney"}
    [:> bs/Card
     [:> bs/Card.Header
      [:> bs/Accordion.Toggle {:as bs/Button
                               :variant "link"
                               :event-key "predict-kidney"
                               :style {:font-size "1.5rem"
                                       :font-weight 500
                                       :padding 0}}
       "1. The PREDICT Kidney Model"]]
     [:> bs/Accordion.Collapse {:event-key "predict-kidney"}
      [:> bs/Card.Body
   [:section {:style {:border-bottom "1px #337777 solid"
                      :margin-bottom 20}}
    [:h3 "Overview"]
    [:p "The PREDICT Kidney model was developed by researchers at the University of Cambridge (UK) in 2024-2026, the team included academics based in the " [:a {:href "https://www.phpc.cam.ac.uk/" :target "_blank"} "Department of Public Health and Primary Care"] ", the " [:a {:href "https://www.medschl.cam.ac.uk/department-surgery" :target "_blank"} "Department of Surgery"] " and a patient advisory panel."]
    [:p "To develop this model, a cohort of patients diagnosed with renal cell carcinoma (RCC) between 2005-2021 were identified using NHS records available in the " [:a {:href "https://saildatabank.com/" :target "_blank"} "SAIL Databank"] " (this includes all individuals living in Wales, UK). Information on these patients was extracted from national registries (cancer and death records), their hospital in-patient records and their primary care (GP) records. This included:"]
    [:ul
     [:li "Risk factors relating to their kidney cancer tumour (stage, grade, lymph node involvement and cancer subtype)"]
     [:li "Risk factors about the patients (age, sex, smoking history, BMI, hypertension, diabetes and other health conditions needed to calculate the Charlson comorbidity index)"]
     [:li "Long term outcomes (the date and cause of death)"]]
    [:p "Each risk factor was statistically tested and used in the model if found to have an important relationship with the outcomes of interest (death from kidney cancer or death from other causes). The final model includes stage, grade, lymph node status, age, sex, smoking history and the Charlson comorbidity index. These are described in detail in the input factors section below."]
    [:p "The model predicts both the risk of death from kidney cancer and the risk of death from other causes for an individual following diagnosis and surgical treatment for RCC. The risk of death from other causes is displayed in the visualisations used in this webtool alongside the risk of death from kidney cancer and likelihood of survival."]
    [:p "The model is also used to assign people a risk group. This is determined based on an individual's risk of death from kidney cancer 10 years after their surgery: low risk (<19.3%), intermediate risk (19.3%-39.0%) and high risk (>39.0%)."]
    [:p "The PREDICT-Kidney model has only recently been developed and has not yet been used in clinics. Testing of this model (external validation) is currently under way. It cannot say what the outcomes for a particular patient will be. Instead, it estimates the probability of death based on people from the past with similar kidney cancer tumours and other characteristics."]]

   [:section {:style {:border-bottom "1px #337777 solid" :margin-bottom 20}}
    [:h3 "Data"]
    [:p "This analysis used individual-level pseudonymised data provided by the Secure Anonymised Information Linkage (SAIL) Databank. SAIL provides access to linked administrative and health records for 5 million Welsh residents. This includes information about: demographics (the Welsh Demographic Service Dataset), cancer diagnoses (the Cancer Network Information System and Welsh Cancer Intelligence and Surveillance Unit), primary care (Welsh Longitudinal General Practice Dataset), hospital admissions (Patient Episode Dataset for Wales) and deaths (Annual District Death Extract)."]
    [:h3 "Cohort"]
    [:p "In order to development the PREDICT-Kidney model, the researchers defined a cohort of eligible individuals with data available in SAIL Databank. The cohort includes all adults who received a diagnosis of RCC, and went on to have surgical treatment (nephrectomy) for RCC, between 01/01/2005 and 01/06/2021. Patients were excluded if their records could not be linked between SAIL data resources, they had metastatic cancer at the time of surgery, they had a hereditary cancer syndrome (such as Von Hippel-Lindau Disease), they were <18 years at surgery, or they died within 90 days of surgery."]
    [:p "The researchers identified 3609 individuals who met these criteria. The median follow-up time was 7.74 years (interquartile range: 4.75, 11.65 years). In total, 1342 deaths were observed within 15 years of surgery, 670 due to RCC (50.6%) and 639 due to other causes (49.4%)."]]

   [:section {:style {:border-bottom "1px #337777 solid" :margin-bottom 20}}
    [:h3 "Model Inputs"]
    [:p "In this section we explain the input factors used in this model:"]
    [:p [:b [:i "Stage"]] " – The pathological stage of a kidney cancer tumour is a measure of its size and how far it has spread. This is determined by assessing cancer tissue removed during surgery."]
    [:ul [:li "Stage 1 (or pT1) - the cancer is small (<7cm) and only inside the kidney"] [:li "Stage 2 (or pT2) - the cancer is larger (>7cm) and only inside the kidney"] [:li "Stage 3 (or pT3) - that cancer is growing into the area surrounding the kidney (this can include growing into the fat around the kidney, the renal vein or the vena cava)"] [:li "Stage 4 (or pT4) - the cancer has spread through the capsule that surrounds the kidney. It may have grown into the adrenal gland."]]
    [:p "The model does not differentiate between stage sub-classifications (such as T2a or T2b)."]
    [:p [:b [:i "Regional lymph node status"]] " – The regional lymph node status indicates if the cancer has spread to lymph nodes near the kidney. Lymph nodes are a network of glands found throughout the body that drain away waste products and fight infections. Lymph nodes near the kidney may be removed during surgery and tested for the presence of cancer. However, it is common for no lymph nodes to be removed at the time of surgery and no further investigation to be required."]
    [:ul [:li "No investigation required (pNx) - There were no lymph nodes in the tissue removed at surgery. This is common if there are no noticeable lymph nodes present."] [:li "pN0 – No cancer was detected in any lymph nodes near the tumour."] [:li "pN1 – Cancer cells were detected in one or more lymph nodes near the tumour."]]
    [:p [:b [:i "Nuclear grade"]] " – The nuclear grade is a scale indicating how much the cancer cells look like normal cells. Kidney cancers are graded 1 to 4. Grade 1 is the lowest (the most like normal cells) and grade 4 is the highest (the least like normal cells). Higher grade cancers tend to grow more quickly and are more likely to spread to other parts of the body. This is sometimes called the Fuhrman scale."]
    [:p [:b [:i "Age at surgery"]] " – Age when the kidney cancer surgery was performed. Older patients are more at risk of other long-term health conditions and are relatively less likely to die from kidney cancer. Only people between 25 and 85 were included in model development, so the model should be used with caution for people outside this age range."]
    [:p [:b [:i "Sex"]] " – Men are more likely to die at a younger age from both kidney cancer and other-causes than women with a similar kidney cancer tumour."]
    [:p [:b [:i "Charlson comorbidity score"]] " – The Charlson comorbidity score (or index) is a measure of the number and severity of long-term conditions present for an individual. It includes 15 conditions in addition to cancer. These conditions are: myocardial infarction (heart attack), congestive heart failure, peripheral arterial disease, cerebrovascular disease (stroke), liver disease, diabetes, chronic obstructive pulmonary disease (lung disease), connective tissue disease (such as arthritis), peptic ulcers (stomach ulcers), chronic kidney disease, hemiparesis or hemiplegia (weakness on one side of the body), dementia, leukaemia, lymphoma and AIDs. The Charlson comorbidity index is widely used in medical settings to measure the frailty of patients. Resources providing more information about this score can be found in the "
     [:a {:href (ui/href :kcp.views/pubs)} "publication section"] "."]
    [:p "A high score indicates that a patient is frail and less likely to benefit from further treatment for kidney cancer."]
    [:p [:b [:i "Smoking history"]] " – Smoking history at the time of surgery. Patients with a history of tobacco usage are more at risk of other long-term health conditions and are relatively less likely to die from kidney cancer."]
    [:p [:b [:i "Tumour size"]] " and " [:b [:i "tumour necrosis"]] " are not included in the model (this information was not available in the SAIL data). However, they are included as inputs because they are used to calculate the Leibovich score (displayed alongside the calculated risk) and used to assess eligibility for adjuvant treatment."]
    [:p [:b [:i "Tumour Size"]] " – The size of the tumour removed during surgery. Whether the tumour is larger or smaller than 10cm is most important in this context."]
    [:p [:b [:i "Tumour"]] " " [:b [:i "Necrosis"]] " – If dead cancer cells were found in the samples removed at surgery. Dead cells may indicate a faster-growing tumour. If necrosis was detected the cancer is more likely to return."]]

   [:section {:style {:margin-bottom 20}}
    [:h3 "Model Development"]
    [:p "Cox Proportional Hazard submodels were fitted for RCC-death and other-cause death. These two submodels were used to compute the risk of RCC death at time "
     (inline-math "t") ", " (inline-math "R" [:sub "RCC"] "(t|X" [:sub "RCC"] ")")
     " and the risk of other-cause death at time " (inline-math "t") ", "
     (inline-math "R" [:sub "OC"] "(t|X" [:sub "OC"] ")") ", where "
     (inline-math "X" [:sub "RCC"]) " and " (inline-math "X" [:sub "OC"])
     " are the variables included in each model respectively. These were combined to give the overall risk of all-cause death "
     (inline-math "R" [:sub "AC"] "(t|X)") ". Independence between the two submodels is assumed."]
    [:div {:class-name "inline-math" :style {:display "flex" :justify-content "center" :margin-bottom 20}}
     (inline-math "R" [:sub "AC"] "(t|X) = 1 - (1 - R" [:sub "RCC"] "(t|X" [:sub "RCC"] ")) * (1 - R" [:sub "OC"] "(t|X" [:sub "OC"] ")) #(1)")]
    [:p "Reweighting the overall risk of all-cause death " (inline-math "R" [:sub "AC"] "(t|X)")
     ", we compute the full PREDICT-Kidney model - cumulative risk of RCC death adjusted for the competing-risk of death from other causes - "
     (inline-math "CR" [:sub "RCC"] "(t|X)") ". There is an accompanying model predicting other-cause death "
     (inline-math "CR" [:sub "OC"] "(t|X)") "."]
    [:div {:class-name "inline-math" :style {:display "flex" :justify-content "center" :margin-bottom 20}}
     (inline-math "CR" [:sub "RCC"] "(t|X) = R" [:sub "AC"] "(t|X) * "
                  [:span {:style {:display "inline-flex" :flex-direction "column" :vertical-align "middle" :text-align "center"}}
                   [:span {:style {:border-bottom "1px solid currentColor"}} "R" [:sub "RCC"] "(t|X" [:sub "RCC"] ")"]
                   [:span "R" [:sub "RCC"] "(t|X" [:sub "RCC"] ") + R" [:sub "OC"] "(t|X" [:sub "OC"] ")"]]
                  " #(2.1)")]
    [:div {:class-name "inline-math" :style {:display "flex" :justify-content "center" :margin-bottom 20}}
     (inline-math "CR" [:sub "OC"] "(t|X) = R" [:sub "AC"] "(t|X) * "
                  [:span {:style {:display "inline-flex" :flex-direction "column" :vertical-align "middle" :text-align "center"}}
                   [:span {:style {:border-bottom "1px solid currentColor"}} "R" [:sub "OC"] "(t|X" [:sub "OC"] ")"]
                   [:span "R" [:sub "RCC"] "(t|X" [:sub "RCC"] ") + R" [:sub "OC"] "(t|X" [:sub "OC"] ")"]]
                  " #(2.2)")]
    [:p "The values " (inline-math "CR" [:sub "RCC"] "(t|X)") " and "
     (inline-math "CR" [:sub "OC"] "(t|X)") " are displayed by the webtool."]
    [:p "Categorisation into discrete risk groups enables assignment of patients to surveillance schedules based on prognosis. We use the k-means algorithm to cluster the PREDICT-Kidney model for each individual over the fifteen-year follow-up. Thresholds are computed for the PREDICT-Kidney model evaluated at 10-years. This is determined based on an individual's risk of death from kidney cancer 10 years after their surgery: low risk (<19.3%), intermediate risk (19.3%-39.0%) and high risk (>39.0%)."]
    [:h3 "External Validation"]
    [:p "The performance of this model is currently being tested in a second dataset which is independent of the development cohort (no individuals are present in both datasets). Results of this external validation will be added once this is complete."]]]]]

    [:> bs/Card
     [:> bs/Card.Header
      [:> bs/Accordion.Toggle {:as bs/Button
                               :variant "link"
                               :event-key "leibovich-plus"
                               :style {:font-size "1.5rem"
                                       :font-weight 500
                                       :padding 0
                                       :text-align "left"}}
       "2. The Leibovich-Plus Model"]]
     [:> bs/Accordion.Collapse {:event-key "leibovich-plus"}
      [:> bs/Card.Body
   [:section {:style {:border-bottom "1px #337777 solid"
                      :margin-bottom 20}}
    [:h3#model-development "Overview"]
    [:p "The Leibovich model was developed by a team at the Mayo Clinic (Minnesota, USA) between 2000 and 2002."]
    [:p "To develop this model, information was collected about a group of patients, who had been followed (on average)
    for 7 years after their kidney cancer surgery. This included information (or risk factors) about the patients
    (including their age, gender, whether they smoked, whether they were hypertensive at surgery) and risk factors
    related to their kidney cancer tumour (including stage, lymph node involvement, size, grade and necrosis)."]
    [:p "Each risk factor was statistically tested and used in the model if found to have an important relationship with
    the outcome of interest (metastasis-free survival). The final model includes tumour stage, regional lymph node
    status, tumour size, nuclear grade, and histologic tumour necrosis. These are described in detail in the input
    factors section below."]
    [:p "The Leibovich model is often used to assign patients a score (ranging from 0 to 11) based on their tumour
    characteristics. These scores are then separated into three risk groups: low risk (score 0 – 2), intermediate risk
    (score 3 – 5) and high risk (score above 6)."]
    [:p "The Leibovich model and score have been used clinically for 20 years. However, it cannot say what the outcomes
    for a particular patient will be. Instead, it estimates the probability of recurrence in people from the past with
    similar kidney cancer tumours (see the "
     [:a {:href (ui/href :kcp.views/pubs)} "publication section"] " for resources providing more information)."]
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
   [:h3#input-factors "Model Inputs"]
   [:p "In this section we explain the input factors considered in this model:"]

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

   [:p [:b "Tumour Necrosis"] " – The tumour necrosis indicates if dead cancer cells were found in the samples removed at surgery. Dead cells may indicate a faster-growing tumour. If necrosis was detected the cancer is more likely to return."]

   [:p [:b "Age"] " – The age at surgery in years. This is used to predict the risk of death from other causes."]
   [:p [:b "Sex"] " – Male or female. Note this refers to sex, not gender – This is used to predict the risk of death from other causes."]]

   (maths-section)]]]
    [:> bs/Card
     [:> bs/Card.Header
      [:> bs/Accordion.Toggle {:as bs/Button
                               :variant "link"
                               :event-key "predict-kidney-webtool"
                               :style {:font-size "1.5rem"
                                       :font-weight 500
                                       :padding 0
                                       :text-align "left"}}
       "3. The PREDICT Kidney Webtool"]]
     [:> bs/Accordion.Collapse {:event-key "predict-kidney-webtool"}
      [:> bs/Card.Body
   [:section {:style {:border-bottom "1px #337777 solid"
                      :margin-bottom 20}}
    [:h3 "Co-design Process"]
    [:p "PREDICT-Kidney was developed through a qualitative co-design process involving patients, members of the public, and healthcare professionals across the United Kingdom. Through a series of workshops in which we showcased the tool, participants, shared feedback, and evaluated changes."]
    [:p "This iterative process led to substantial refinement of the initial prototype tool, with changes made to terminology, visual design, and content in response to patient and clinician feedback. Importantly, this approach ensured that the final tool reflects not only clinical priorities but also patient needs and expectations."]]
   (web-development-section)]]]]])

(defn tech-page
  "Display a generic home page.
   Minimally, navigation from here to an organ home page."
  []
  (let [mdata @(rf/subscribe [::subs/mdata])
        single-organ (ui/get-single-organ mdata)]

    (if mdata
      [ui/page (str "Technical Details")
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
          [:p [:b "IMPORTANT NOTICE: "] "The tool uses two statistical models: "]
          [:ul {:style {:list-style "none"}}
           [:li "(a) The PREDICT Kidney model developed by a team of researchers at the University of Cambridge"]
           [:li "(b) The Leibovich-Plus model developed by a team at the Mayo Medical School and Mayo Clinic, USA and adjusted by researchers at the University of Cambridge."]]
          [:p "It is not showing you what will happen to you, it is showing you what happened to people like you, in the past. It's important to remember that the tool does not take into account everything about you. Patients should always consult their own urologist, oncologist or specialist nurse, who will be able to discuss the results in a more personalised context."]
          [:p [:b "TERMS OF USE: "] "Results provided by this tool are for the provision of information only and are not intended as a substitute for professional medical advice and counselling. Please read the " [:a {:href (ui/href :kcp.views/tech)} "technical details"] " for details of the model development and limitations. By accessing and using this tool, you acknowledge and agree to the following terms."]
          [:ul
           [:li "Except as otherwise permitted by law, this tool may be accessed and used in line with the disclaimer above or for private study or for non-commercial research with this notice intact."]
           [:li "You shall not copy, reproduce, distribute, transmit, broadcast, display, sell, rent, license, or otherwise exploit this tool or any content within in whole or in part for any other purposes without the prior written consent of the University of Cambridge and the authors."]
           [:li "The authors and the University of Cambridge do not accept any liability for any errors in the model prediction or outcomes. See also the University's standard terms at " [:a {:href "http://www.cam.ac.uk/about-this-site/terms-and-conditions"} "http://www.cam.ac.uk/about-this-site/terms-and-conditions"] "."]
           [:li "Any links from this tool or any associated text do not imply recommendations or endorsements of products or services."]
           [:li "The trademarks of the University of Cambridge and others that appear in this tool are the property of the University of Cambridge or their respective owners. You may not use any trademark displayed in the tool without the written permission of the University of Cambridge or the respective owner."]]
          [:p "Copyright © 2019 University of Cambridge. All rights reserved."]]

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
                  [:p "In other words, " (render-formatted (utils/localize-plural nil in-other-words-template risk-desc time-desc risk-val))]]))

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
