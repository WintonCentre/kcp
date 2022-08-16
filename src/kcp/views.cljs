(ns kcp.views
  (:require
   [clojure.string :as string]
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
   ;[kcp.fullscreen :as fs]
   ;[shadow.debug :refer [locals ?> ?-> ?->>]]
   ))

;;;;;
(comment
  (rf/dispatch [::events/initialize-db]))

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
           [:div {:key (get-in mdata [organ :text])
                  :style {:margin-bottom 20}}
            [ui/button {:id (str (name organ) "-button")
                        :class-name "btn-lg"
                        :variant "primary"
                        :style {:font-size "1.5em"}
                        :on-click #(rf/dispatch [::events/navigate ::organ-centre-tool-tab-inputs {:organ organ :centre "uk" :tool "ldsurvival" :tab "bars" :inputs "-"}])}
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
      ;[:> bs/Col {:sm 12} (choose-centre-nav mdata)]

      [:> bs/Col {:md 6}
       [home-section
        [:h2 "What does this site do?"]
        [:p "This is a communication tool."]
        [:p "Results can be printed out for patients to take home"]

        [:> bs/Row
         [:> bs/Col {:md 4}
          [:p [bsio/feedback-button mdata single-organ]]]
         [:> bs/Col {:md 8}
          [:p
           [:i "We are still asking for feedback on this site. You are encouraged to email us with any thoughts, corrections
              and feedback on any aspect of the site."]]]]]
        

       [home-section
        [:h2 "How does it work?"]
        [:p "The tool takes details about the patient such as " [:b "Placeholder-9"] " and produces results personalised for them."]]

       [home-section
        [:h2 "The tool will show"]
        [:ul
         ;[:li "What is my likely " [:b "waiting time"] " for a transplant?"]
         ;(when (= single-organ :kidney) [:li "How long might " [:b "the transplant last?"]])
         ;[:li "How long might " [:b "I survive"] " after a transplant?"]
         [:li [:b "Placeholder-10"]]]]

       [home-section
        [:h2 "Who is this site for?"]
        ;[:p "People who are suitable for " (name single-organ) " transplant and who are over "
         ;(if (= single-organ :kidney) "18" "16") " years old."]
        [:b "Placeholder-11"]]]
        ;(when (= single-organ :kidney)
         ; [:p [:span {:style {:color "red"}} [bsio/open-icon "warning"]] [:b "Changes to the kidney offering scheme in September 2019 are not reflected in this tool."]]]]]

      [:> bs/Col {:md 6}
       [home-section
        [:h2 "Overview"]
        [:p "It takes the information you enter and shows what happened to people “like you” in the past. "
         [:b " It is not showing what will happen to you in the future, it is showing what happened to people
              like you in the past."]]
        [:p "The tool cannot take into account everything about you.  For example it does not currently ask
             about other health conditions you may have."]
        [:p " If you want to know more about the data and the models behind the tool read
             the " [:a {:href (ui/href :kcp.views/tech)}  "technical section"] " of this site."]]
       [home-section
        [:h2 "Use the tool offline"]
        [:p "You need an internet connection to access the tool for the first time."]
        [:p "Provided you have visited the site once, you can revisit it from the same browser even if you are offline."]]]

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
    ;(locals)
    (if mdata
      (if-let [organ (or single-organ organ)]
        [ui/decorated-page
         [:div {:style {:width "calc(100% + 30px)"
                        :background-color "#337777"; "#E0E0E8"
                        :margin-left "-15px"
                        :padding "15px"}}
          [ui/row
           [ui/col {:md 4}
            [:img (if (= organ :lung)
                    {:src "/assets/lung-banner.png" :alt "lung tool banner image" :async true :style {:height 130 :width 250}}
                    {:src "/assets/kidney-banner.png" :alt "kidney tool banner image" :async true :style {:height 130 :width 260}})]]
           [ui/col {:md 8 :style {:color "#fff"}}
            [:p [:b {:style {:font-size "1.2em"}} "How should I use this site?"]]
            [:p [:b "The tool should be used with a clinition, specialist nurse or other healthcare professional."]]
            [:p [:b "If you are a patient and you use this site on your own, discuss the results with oncologist."]]]]]
         (str (string/capitalize (name single-organ)) " kcp: Understanding the Numbers")
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

    ;;
    ;; Insert Kidney or Lung home page here
    ;;
      [ui/card-page
       "Choose your transplant centre" ; todo: configure
       (if-not centres
         [:div "loading /" organ " centres"]
         (if-not mdata
           [:div "Loading /metadata.txt"]
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
                                 :tools tools
                                 :mdata mdata}])]
             (into (ui/centre-card-deck mobile)
                   (map centre-card centres)))))]))



(defn pubs-page
  "Display a generic home page.
   Minimally, navigation from here to an organ home page."
  []
  ;; This needs to be a promise....
  (let [mdata @(rf/subscribe [::subs/mdata])
        #_#_route @(rf/subscribe [::subs/current-route])
        single-organ (ui/get-single-organ mdata)
        #_#_organ (get-in route [:path-params :organ])]
    ;(locals)

    (if mdata
      [ui/page (str "Publications")
       [ui/row
        (condp = single-organ
          :kidney [:> bs/Col
                   [:p "NHSBT organ specific annual reports (" [:a {:href "https://www.odt.nhs.uk/statistics-and-reports/organ-specific-reports/" :target "_blank"} "https://www.odt.nhs.uk/statistics-and-reports/organ-specific-reports/"] ")"]
                   [:p [:a {:href "https://nhsbtdbe.blob.core.windows.net/umbraco-assets-corp/20032/kidney-annual-report-2019-20-final.pdf"
                            :target "_blank"} "Annual Report on Kidney Transplantation 2019/2020."] " NHS Blood and Transplant. https://nhsbtdbe.blob.core.windows.net/umbraco-assets-corp/20032/kidney-annual-report-2019-20-final.pdf Published 2020."]]
          :else [ui/col [:p "None."]])]]
      [ui/loading])))

(defn kidney-about-content
  []
  [:<>

   [:section {:style {:border-bottom "1px #337777 solid"
                      :margin-bottom  20}}
    [:h4 "Overview"]
    [:p "The tool takes information about you, such as age, blood group, disease, and it looks at people who had these same
           characteristics, and shows what happened to these people. "

     "For example, how many people 'like you' received a transplant within one year of being listed."]

    [:p "It is not showing you what will happen to you, it is showing you what happened to people like you, in the past."]

    [:p "It’s important to remember that the tool cannot take into account everything about you, for example,
        whether you have other health conditions. The tool will ask for some medical information such as blood group,
        or recent test results. The tool will be less accurate if you don't have all the relevant information."]

    [:p "There are many factors that can influence how well a transplanted organ does, for example taking your medication
        properly, diet and whether you exercise."]
    [:p "If you want to know more about the models and data behind the tools, please read the "
     [:a {:href (ui/href :kcp.views/tech)} "Technical section"] ". "
     "Data about transplant patients were used to create statistical models.  When you enter information into the tool, the calculator looks at these models and produces results.
"]

    [:p [:span {:style {:color "red"}} [ui/open-icon "warning"]] "Changes to the UK Kidney Offering Scheme in September 2019 are not reflected in these models"]]


   [:section {:style {:border-bottom "1px #337777 solid"
                      :margin-bottom  20}}
    [:h4 "Using the tool offline"]
    [:p "You need an internet connection to access the tool for the first time, but once you have visited
         the site once, you can access it offline (just don't close the browser)."]

    [:p "The tool can produce a printout of results for later reference."]]

   [:section {:style {:border-bottom "1px #337777 solid"
                      :margin-bottom  20}}
    [:h4 "Who is this site for?"]
    [:p "The tool is suitable for kidney patients who are over 18 years old.
        This is because we use past data from the NHS transplant registry.  Fewer children have kcp than adults and
        there is not enough data yet to make a tool for children. "]
    [:p [:b "The tool should be used by patients alongside their transplant doctors or specialist nurses."]]]

   [:h4 "Who developed the tool?"]
   [:p "The tool was developed by the Winton Centre for Risk and Evidence Communication and currently displays models
        disclosed by NHSBT under a data sharing agreement."]
   [:p "We wish to thank all the transplant patients and their partners,
        as well as clinical teams at transplant centres in England who took part in researching the tool design."]])

  

;;; Views ;;;
(defn about-page
  "Display a generic home page.
   Minimally, navigation from here to an organ home page."
  []
  ;; This needs to be a promise....
  (let [mdata @(rf/subscribe [::subs/mdata])
        #_#_route @(rf/subscribe [::subs/current-route])
        single-organ (ui/get-single-organ mdata)
        #_#_organ (get-in route [:path-params :organ])]
    ;(locals)

    (if mdata
      [ui/page (str "About the " (string/capitalize (name single-organ)) " tool")
       (condp = single-organ
         :kidney
         [kidney-about-content]
         :else [:div])]
      [ui/loading])))

(defn maths-section
  []

  [:section {:style {:border-bottom "1px #337777 solid"
                     :margin-bottom  20}}
   [:h3#mathematical-section "Mathematical Section"]
   [:p "A cox proportional hazards model was adopted. This multiplies a baseline cumulative hazard by a
        constant hazard ratio for each risk factor."]
   [:p "Using the example of post-transplant survival, this means that the cumulative hazard of post-transplant
        death is the product of two components: the baseline hazard (chances of dying for a patient with a baseline set of
        characteristics at time of transplant) and all the hazard ratios for the risk factors (the increased/decreased risk of
        death due to changes in these risk factors compared to the baseline characteristics)."]
   [:p "In the case of post-transplant survival, the cumulative hazard is then translated into a survival function.
        This is described in mathematical form below. "]
   [:p "The estimated cumulative hazard for the ith individual  for the event of interest (e.g. death post-transplant), after t days has the form:

"]
   [:div {:style {:display "flex" :justify-content "center" :font-family "serif" :margin-bottom 20}}
    [:i "H" [:sub "i"] "(t) " " = H" [:sub "0"] [:span {:style {:margin-right 5}} "(t)"]] " exp" [:i " (" [:b "β . χ"] [:sub "i"] ")"]]
   [:p "where:"]
   [:ul
    [:li [:span {:style {:font-family "serif"}}
          [:i "H" [:sub "0"] "(t)"]] " is estimated using the " [:a {:href "https://www.tandfonline.com/doi/full/10.1080/10485250500491661"} "Breslow (1972) estimate"]]
    [:li "The log hazard ratios " [:b [:i "β"]] " are estimated by a multivariate linear regression."]
    [:li [:i {:style {:font-family "serif"}} [:b "χ"] [:sub "i"]] " represents the set of characteristics for the " [:i {:style {:font-family "serif"}} "i"] "th individual."]]
   [:p "This can be translated into a survival function through the following equation:"]
   [:div {:style {:display "flex" :justify-content "center" :font-family "serif" :margin-bottom 20}}
    [:i "S" [:sub "i"] "(t) "] " = exp" [:i " (-H" [:sub "i"] " (t))"]]
   [:div ""]
   [:p "In the case of the ‘Waiting time’ models, we apply an " [:a {:href "/competing_risks.pdf" :target "_blank"} "iterative algorithm"] " to calculate the risks of all the competing outcomes."]

   [:p "The phreg function in SAS V.7.1 (SAS Institute, Cary, North Carolina, USA) was used to compute these estimates. "]]
  #_[:p "The waiting times tool requires a " [:a {:href "/competing_risks.pdf" :target "_blank"} "further adjustment for the competing risks."]])

(defn web-development-section
  []
  [:<>
   [:section {:style {:border-bottom "1px #337777 solid"
                      :margin-bottom  20}}
    [:h3#the-web-implementation "The web implementation"]
    [:p "This tool is a Single Page Application - an SPA. It is a single web page which loads a Javascript application that updates the page according
        to the user's inputs. All data that you enter to the tool is stored in Javascript variables in the browser. "]
    [:p "The application is also a calculator. The Javascript code includes
        implementations of all the Cox statistical models described above. This means that all inputs, calculations, and result displays are managed
        without the need for any interaction with another machine. The model calculations run once you have entered all necessary data, and will rerun whenever
        you change any input. Once you close the browser window or tab, the data is erased, just like in a calculator."]
    [:p "The tool is also a Progressive Web App - a PWA - which means that in some ways it behaves like an application you might have downloaded onto your phone
        from an App Store. Once you load the app from the website, it is automatically cached in your browser for future use - offline if need be. You can also install the
        app so it appears as an icon on your home page. You should be able to find some relevant instructions by searching the internet for 'Install PWA' with your browser's name
        (e.g. Edge, Safari, Chrome, Firefox), and your operating system (e.g. IOS, Android, MacOS, Windows, Linux)."]]
   [:section {:style {:border-bottom "1px #337777 solid"
                      :margin-bottom  20}}
    [:h3#the-development-stack "The development stack"]
    [:p "The tool runs as a Javascript application, but it was written in Clojurescript and then compiled to Javascript. The most important libraries that it uses
        are ReactJS, Reagent, and Reframe, and we are sincerely grateful to the developers of these codes. The development system used Shadow-cljs (by Thomas Heller),
        supported by a number of Clojure scripts running under Babashka (by Michiel Borkent) and the Clojure integrated development system Calva running in VSCode. "]]
   [:section {:style {:border-bottom "1px #337777 solid"
                      :margin-bottom  20}}
    [:h3#testing "Testing"]
    [:p "The reference for our implementation was a collection of canonical R implementations of the statistical models. We generated a large collection of test inputs and ran these
       through the R code, collected the results, and then fed the same inputs into our Javascript implementation, and compared the results. "]]

   [:h3#browser-compatibility "Browser Compatibility"]
    [:p "This version has been tested and found to work in Edge, Chrome, Safari, Firefox, on desktop PCs and Macs and also on Android and IOS mobile devices."]
    [:p "Support for IE 11 is limited and some functionalities like 'Copy' or 'Fullscreen' may not work at all."]
    [:p "It does not currently support any other version of Internet Explorer."]])

#_(defn web-development-section
  []
  [:<>
   [:section {:style {:border-bottom "1px #337777 solid"
                      :margin-bottom  20}}
    [:h3 "The web implementation"]
    [:p "This tool is a Single Page Application - an SPA. it is a single web page which loads a javascript application that updates the page according
        to the user's inputs. All data that you enter to the tool is stored in javascript variables in the browser. "]
    [:p "The application is also a calculator. The javascript code includes
        implementations of all the Cox statistical models described above. This means that all inputs, calculations, and result displays are managed
        without the need for any interaction with another machine. The model calculations run once you have entered all necessary data, and will rerun whenever
        you change any input. Once you close the browser window or tab, the data is erased, just like in a calculator."]
    [:p "The tool is also a Progressive Web App - a PWA - which means that in some ways it behaves like an application you might have downloaded onto your phone
        from an App Store. Once you load the app from the web-site, it is automatically cached in your browser for future use - offline if need be. You can also install the
        app so it appears as an icon on your home page. You should be able to find some relevant instructions by searching the internet for 'Install PWA' with your browser's name
        (e.g. Edge, Safari, Chrome, Firefox), and your operating system (e.g. IOS, Android, MacOS, Windows, Linux)"]]
   [:section {:style {:border-bottom "1px #337777 solid"
                      :margin-bottom  20}}
    [:h3 "The development stack"]
    [:p "The tool runs as a javascript application, but it was written in clojurescript and then compiled to javascript. The most important libraries that it uses
        are ReactJS, Reagent, and Reframe, and we are sincerely greateful to the developers of these codes. The development system wass Shadow-cljs by Thomas Heller,
        supported by a number of clojure scripts running under Babashka (by Michel Borkent) and the clojure integrated development system Calva running in VSCode. "]]
   [:section {:style {:border-bottom "1px #337777 solid"
                      :margin-bottom  20}}
    [:h3 "Testing"]
    [:p "The reference for our implementation was a collection of canonical R implementations of the statistical models. We generated a large collection of test inputs and ran these
       through the R code, collected the results, and then fed the same inputs into our javascript implementation, and compared the results. "]]

   [:section {:style {:border-bottom "1px #337777 solid"
                      :margin-bottom  20}}
    [:h3 "Browser Compatibilty"]
    [:p "This version has been tested and found to work in Edge, Chrome, Safari, Firefox, on desktop PCs and Macs and also on Android and IOS mobile devices."]
    [:p "It does not currently support any version of Internet Explorer."]]])

(defn overview-menu [[route text]]
  [:li {:key (random-uuid)} [:span {:on-click #(.scrollIntoView (.getElementById js/document route)
                                                                (js-obj "behavior" "smooth"))
                                    :style {:color :#1F6BC4 :font-size 18 :cursor :pointer}} text]])

(def kidney-tags [["model-development"       "Model development"]
                  ["waiting-times"          "Waiting Times"]
                  ["after-deceased-donor"   "Patient and graft survival after a deceased donor kidney transplant"]
                  ["after-living-donor"     "Patient and graft survival after a living donor kidney transplant"]
                  ["input-factors"          "Input Factors"]
                  ["mathematical-section"   "Mathematical Section"]
                  ["the-web-implementation" "The web implementation"]
                  ["the-development-stack"  "The development stack"]
                  ["testing"                "Testing"]
                  ["browser-compatibility"  "Browser Compatibility"]])


(defn kidney-tech-content
  []
  [:> bs/Col
   [:section {:style {:border-bottom "1px #337777 solid"
                      :margin-bottom  20}}
    [:section
     [:ul {:style {:list-style-image "url(/assets/bullet-plus.png)"
                   :margin-top 10}} (map overview-menu kidney-tags)]]

    [:h3#model-development "Model development"]
    [:p "The models behind the tool were developed using UK Transplant Registry (UKTR) data which is held by NHS Blood and Transplant (NHSBT).  The UKTR database contains information on all patients who are listed for transplantation in the UK, and all patients who are transplanted with a solid organ transplant in the UK with follow-up data. "]
    [:p "NHSBT Statisticians work closely with transplant clinicians to compile a large list of potential variables (e.g. age, primary renal disease) from the UK Transplant Registry to test in their models. Each of these variables are statistically tested and kept in the model if found to have an important relationship with the outcome of interest (e.g. post-transplant survival). These variables are referred to as ‘risk factors’. Some of the models used by the tool are also used regularly by NHSBT in their organ specific annual reports (" [:a {:href "https://www.odt.nhs.uk/statistics-and-reports/organ-specific-reports/" :target "_blank"} "https://www.odt.nhs.uk/statistics-and-reports/organ-specific-reports/"] ") and in other analyses. "]
    [:p "At the end of the modelling process values were obtained called ‘parameter estimates’ which quantify the estimated impact of each risk factor upon the outcome of interest. Please refer to the Mathematical Section below to see exactly how a change in parameter estimates affects the outcome of interest. There will also be an estimated baseline risk curve plotted over time that represents an ‘average’ patient in the study cohort." [:b " The most common/mean value from the model development dataset for each risk factor is indicated as the baseline value as this value is represented by the baseline curve."] "  The parameter estimates are then used by the tool to essentially shift this baseline curve when the values of the risk factors are changed from the ‘average’ values. This way, the patient can plot a curve for values of the risk factors that are relevant to their own circumstances. For all models, transplant centre was treated as a stratifying factor, i.e. a separate baseline curve was produced for each centre."]

    [:p "Although the tool is based on reputable models, it cannot say what the outcomes for a particular patient will be. It can only provide a summary of survival and waiting list outcomes for people in the past with similar characteristics."]

    [:p "This tool has been developed using retrospective registry data. " [:b "Therefore, changes to the Kidney Offering Scheme in 2019 are NOT reflected in these models. "]]

    [:p "All statistical analyses for this website were generated using SAS Enterprise Guide software, Version 7.1.  SAS and all other SAS Institute Inc. product or service names are registered trademarks or trademarks of SAS Institute Inc., Cary, NC, USA. "]]

   [:section {:style {:border-bottom "1px #337777 solid"
                      :margin-bottom  20}}
    [:h3#waiting-times "Waiting Times"]
    [:p "The dataset used for this model comprised of all adult (aged ≥18 years) first kidney-only registrations (i.e. people joining the transplant waiting list) between 1 January 2010 and 31 December 2015."]
    [:p "From the point of joining the waiting list, receiving a transplant is one of three competing events (transplant, death on the list, removal from the list) that a patient is ‘at risk’ of. We considered outcome data up to 5 years from listing for all patients in the modelling cohort. A model for ‘time to transplant’, a model for ‘time to death on the list’ and a model for ‘time to removal from the list’ was then developed using Cox Regression (Section 3.1)."]
    [:p "Each patient in the cohort was assigned to 1 of 4 categories:"]
    [:ol
     [:li "Patients who were transplanted with either a living or deceased donor transplant"]
     [:li "Patients who died on the list whilst awaiting transplantation"]
     [:li "Patients who were removed from the list prior to transplantation. This could occur for a number of reasons including patient choice or a deterioration in health such that a transplant was no longer suitable."]
     [:li "Patients who were still waiting on the list. Patients who were suspended were classed as still waiting on the list."]]
    [:p "The covariates used in the model were those which have previously been shown to have an impact on outcome and those which were thought to be clinically significant."]
    [:p "Following development of the Cox Proportional hazards models, a numerical approximation algorithm was applied which combined the model results from the time to transplant model with the time to death on the list/removal from the list model. This algorithm enabled the estimated chances of each of the listed outcomes at any particular time up to three years post-listing to be presented side-by-side and the sum of the probabilities of each of these happening at a particular time t to equal 100%."]]

   [::section {:style {:border-bottom "1px #337777 solid"
                       :margin-bottom  20}}
    [:h3#after-deceased-donor "Patient and graft survival after a deceased donor kidney transplant"]
    [:p "The patient cohort for these models comprised all adult (aged ≥18 years) first kidney-only kcp that occurred in the UK between 1 January 2010 and 31 December 2017. Cox proportional hazards models were built where the following 22 factors were tested for inclusion in the models: Donor age, type, cause of death, sex, cmv status, hypertension, BMI, height, weight retrieval creatinine, recipient age, ethnicity, sex diabetic nephropathy as a cause of renal failure, waiting time, matchability, blood group, cold ischaemia time and HLA mismatch. Factors tested were those collected by NHSBT and available on the database and thought to potentially be clinically relevant.  The model was built using a forward-step approach.  Transplant centre was added to the model as a strata."]

    [:p "The post-transplant survival Cox proportional hazards model operates such that each risk factor multiplies the baseline cumulative hazard by a fixed amount known as the hazard ratio or relative risk - essentially the proportional change in mortality risk. This means the cumulative hazard is the product of two components: the baseline hazard (chances of death or graft failure for a patient with a baseline set of characteristics at time of transplant) and the hazard ratios for the risk factors (the increased/decreased risk of death due to changes in these risk factors compared to the baseline characteristics). The cumulative hazard is then translated in to a survival function as described in the mathematical description."]

    [:h5 "Five-year deceased donor post-transplant patient survival"]
    [:p "Post-transplant patient survival was defined as the time from transplant until the time of death. These data were censored at the last known follow-up date post-transplant if this was within 5 years of transplantation. The following factors were found to be significant and included in the model; recipient age, recipient ethnicity, waiting time, recipient primary renal disease, donor age, donor hypertension, HLA MM level."]
    [:p "This model was tested for goodness of fit using a concordance statistic (c-statistic) which was found to be 0.71. "]

    [:h5 "Five-year deceased donor post-transplant graft survival"]
    [:p "‘Graft survival’ refers to death-censored graft survival and was defined as the time from transplantation to return to long-term kidney replacement therapy or re-transplantation, whichever occurred first. Data were censored at the time of death or at last known follow-up.  The following factors were found to be significant and included in the model; recipient age, waiting time, graft number, recipient primary renal disease, donor age, donor BMI, donor hypertension, HLA MM level."]
    [:p "This model was tested for goodness of fit using a concordance statistic (c-statistic) which was found to be 0.63."]]

   [::section {:style {:border-bottom "1px #337777 solid"
                       :margin-bottom  20}}
    [:h3#after-living-donor "Patient and graft survival after a living donor kidney transplant"]
    [:p "The patient cohort for these models comprised all adult (aged ≥18 years) first kidney-only kcp that occurred in the UK between 1 January 2010 and 31 December 2015."]
    [:p "Cox proportional hazards models were built where the following 17 factors were tested for inclusion in the models - "]
    [:ul
     [:li "Donor factors: age, sex, relationship to recipient, BMI, ethnicity, status, hypertension, BMI, height, weight retrieval creatinine."]
     [:li "Recipient factors: age, sex, ethnicity, diabetic nephropathy as a cause of renal failure, waiting time, dialysis status, matchability, blood group, cold ischaemia time, HLA mismatch and graft number. "]
     [:li "Factors tested were those collected by NHSBT and available on the database and thought to potentially be clinically relevant.  The model was built using a forward-step approach.  Due to fewer numbers, the transplant centre was not included as a strata and national results have been demonstrated."]]
    [:h5 "Five-year living donor post-transplant graft survival"]
    [:p "‘Graft survival’ refers to death-censored graft survival and was defined as the time from transplantation to return to long-term kidney replacement therapy or re-transplantation, whichever occurred first. Data were censored at the time of death or at last known follow-up."]
    [:p "The following factors were found to be significant and included in the model; recipient age, waiting time, matchability, donor age, HLA MM level."]]

   [::section {:style {:border-bottom "1px #337777 solid"
                       :margin-bottom  20}}
    [:h3#input-factors "Input factors"]
    [:p "Explanation of donor and recipient input covariates:"]
    [:p [:b "Recipient age (years)"] " - Age at point of being actively listed onto the National Kidney Transplant List. This has been divided into categories by decade."]
    [:p [:b "Sex"] " - Male or female. Note this refers to sex, not gender."]
    [:p [:b "Recipient ethnicity"] " - Asian, Black Chinese, Mixed, White, Other."]
    [:p [:b "Recipient waiting time (years)"] " - Time waiting on deceased donor kidney waiting list until time of transplant (active and suspended).  This can serve as a proxy for ‘time on dialysis’ as most patients are either already on dialysis or due to commence dialysis within 6 months at the time of listing for transplantation."]
    [:p [:b "Previous Kidney Transplant?"] " - Yes or No"]
    [:p [:b "Highly sensitised (cRF >85%)"] "- any antibodies in the blood – e.g. as a result of pregnancy or a previous organ transplant."]
    [:p [:b "Blood group"] " - Patient’s blood group: O, A, B, AB"]
    [:p [:b "Dialysis at registration"] " - Refers to any form of dialysis (peritoneal or haemodialysis) at the time of listing for transplantation."]
    [:p [:b "Matchability"] " - Whether due to a range of factors, such as blood group, it will be ‘easy’, ‘moderate’, or ‘difficult’ to find a matching organ.  The ODT provides further details on how this is calculated and a tool for calculating matchability for individual patients: https://www.odt.nhs.uk/transplantation/tools-policies-and-guidance/calculators/ "]
    [:p [:b "Donor age"] " - The age at which the donor donated their organs."]
    [:p [:b "Donor BMI"] " - Donor BMI as recorded at the donating hospital site. Calculated as weight (kilograms) divided by height (m" [:sup "2"] ")"]
    [:p [:b "Donor Hypertension"] " - Whether the donor suffered from high blood pressure as recorded by NHSBT on data collection forms at the time of donation."]
    [:p [:b "HLA MM level"] " - Human Leukocyte Antigen (HLA) matching level.  HLA are proteins located on the surface of white blood cells and other tissues. When people share the same HLA’s, they are said to be a ‘match’. There are may different types of HLA, and the matching can occur to different degrees, hence the different levels of matching. "]
    [:p [:b "Transplant Centre"] " - This refers to which of the 23 UK adult kidney transplant centres the patient will be receiving their transplant.  (This is not always the dialysis centre at which they are followed up)."]]

   (maths-section)
   (web-development-section)])

(defn tech-page
  "Display a generic home page.
   Minimally, navigation from here to an organ home page."
  []
  ;; This needs to be a promise....
  (let [mdata @(rf/subscribe [::subs/mdata])
        #_#_route @(rf/subscribe [::subs/current-route])
        single-organ (ui/get-single-organ mdata)
        #_#_organ (get-in route [:path-params :organ])]
    ;(locals)

    (if mdata
      [ui/page (str "Technical Details for the " (string/capitalize (name single-organ)) " tool")
       [ui/row
        (condp = single-organ
          :kidney [kidney-tech-content]
          :else [:div])]]
      [ui/loading])))


(defn legal-page
  "Display a generic home page.
   Minimally, navigation from here to an organ home page."
  []
  ;; This needs to be a promise....
  (let [mdata @(rf/subscribe [::subs/mdata])
        #_#_route @(rf/subscribe [::subs/current-route])
        #_#_single-organ (ui/get-single-organ mdata)
        #_#_organ (get-in route [:path-params :organ])]
    ;(locals)

    (if mdata
      [ui/page (str " Legal ")
       [ui/row
        [:> bs/Col
         [:section  {:style {:border-bottom "1px #337777 solid"
                      :margin-bottom  20}}
          [:h4 "Disclaimer"]
          [:p "You MUST read the information below before using the tool."]
          [:p [:b "IMPORTANT NOTICE: "] "The tool uses statistical models developed using patient data recorded on the UK Transplant Registry. However, it can only provide a 'best guess' of likely outcomes based on past data, and it can never provide an accurate prediction for an individual. Patients should always consult their own specialist, who will be able to discuss the results in a more personalised context."]
          [:p [:b "TERMS OF USE: "] "Results provided by this tool are for informational purposes only and are not intended as a substitute for professional medical advice and counselling. This tool is a reference guide only and cannot replace standard clinical counselling. Please read the referenced papers for the study derivation and context. By accessing and using this tool, you acknowledge and agree to the following terms."]
          [:p "Except as otherwise permitted by law, this tool may be accessed and used in line with the disclaimer above or private study or non-commercial research with this notice intact."]
          [:p "You shall not copy, reproduce, distribute, transmit, broadcast, display, sell, rent, license, or otherwise exploit this tool or any content within in whole or in part for any other purposes without the prior written consent of the University of Cambridge, the authors and NHSBT."]
          [:p "The authors and the University of Cambridge do not accept any liability for any errors in the model prediction or outcomes. See also the University’s standard terms at " [:a {:href "http://www.cam.ac.uk/about-this-site/terms-and-conditions"} "http://www.cam.ac.uk/about-this-site/terms-and-conditions."]]
          [:p "Any links from this tool or any associated text do not imply recommendations or endorsements of products or services."]
          [:p "The trademarks of the University of Cambridge and others that appear in this tool are the property of the University of Cambridge or their respective owners. You may not use any trademark displayed in the tool without the written permission of the University of Cambridge or the respective owner. Copyright © 2019 University of Cambridge. All rights reserved."]]

         [:h4 "Cookies and Privacy Notice"]
          [:p "All cookies " [:u "are disabled"] " on this website."]
          [:p "No identifiable user data is collected by the app. The data that you enter in your web browser is not transferred to any other
              system, and it is erased once you close the application window. "]
          [:p "This website uses Matomo to analyze traffic and help us to improve your user experience. The default data listed " [:a {:href "https://matomo.org/faq/general/faq_18254/"} " here "] "is anonymized as part of its processing."]
          [:p "This data is only processed by us, Matomo and their web hosting platforms. You can read more information about Matomo’s Privacy Policy on " [:a {:href "https://matomo.org/privacy-policy/"} " their website."]]
          [:p "If you print or save pages containing user entered data then you are responsible
              for protecting the data in those copies."]
          [:p "The Data Protection Officer for this tool is " [:a {:href "mailto:dpo@admin.cam.ac.uk"} "dpo@admin.cam.ac.uk"]]]]]
      [ui/loading])))

;;
;; todo: Move background info to config
;;

(def guidances
  {:percent "What does a percentage look like?"
   :visits "Visits to hospital after transplant"
   :donors "Donor Decisions"
   :medications "Medications after Transplant Surgery"
   :window "The Window"
   :graft-failure "What are my options if my new kidney fails?"
   :lung-numbers "Lung kcp - 2019 - 2020 numbers"
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
      [:li "Anti-ulcer medications"]]]
    #_[ui/col {:md 6}
     [:> bs/Image {:fluid true
                   :src "assets/Post Transplant Medications.png"}]]]])


(defmethod show-guidance :window []
  [:<>
   [:h3 (:window guidances)]
   [:p "This diagram shows how your lung disease might progress.
        Transplantation is offered when you are ill enough to need it,
        but well enough to survive the surgery.  We call this the ‘window of opportunity’."]
   #_[:p "This is a diagram drawn by a clinician. As the health of a transplant candidate
        decreases, there comes a point where a transplant could be recommended. This opens
        a window of opportunity which persists until the patient receives a transplant or
        their health deteriorates to the point where it would no longer be recommended."]
   [:> bs/Image {:fluid true
                 :src "/assets/The_Window.png"
                 :async true}]])


(defmethod show-guidance :graft-failure []
  [:<>
   [:h3 (:graft-failure guidances)]
   [ui/row {:style {:display :flex
                    :justify-content "start"
                    :flex-wrap "wrap"
                    :margin-top 20}}
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
                       :width 140
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
                       :width 140
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
       (show-guidance {:info-key @(rf/subscribe [::subs/guidance])})
       [:> bs/Row
        [:> bs/Col {:md {:span 5}
                    :style {:border "3px solid #336677"
                            :border-radius 3
                            :padding-top 20
                            :margin-left 15
                            :margin-right 10
                            :margin-top 30}}
         [:p [:b [:span {:style {:color "red"}} (ui/open-icon "wrench")] " UNDER CONSTRUCTION!"]]
         [:p "Please tell us what you would like to see here, and do let us know of any errors that need correction."]
         [:p [:b [:span {:style {:color "#336677"}} (ui/open-icon "envelope-closed")]
              [:a {:href (str "mailto:" (if (= organ :lung) "lung" "kidney") "kcp@statslab.cam.ac.uk?subject=Useful%20Information%20Feedback")} " Email us"]

              #_[:a {:href "mailto:Leila.finikarides@maths.cam.ac.uk?subject=Useful%20Information%20Feedback"} " Email us"]]]]]]]]))



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
               [:p [:b "Recipient BMI"] " - Tested and not found  to be significant in model"]
               [:p [:b "Creatinine"] " - Although we can get terminal creatinine for donor, we don’t know how many were on filtration in ITU – this would give a falsely low creatinine and be misleading. "]
               [:p [:b "Comorbidities (cardiovascular disease, vascular disease, stroke, MI)"] " - Not collected, looked into those that are, have a high proportion of missing data."]]
      :else [:div])))


(defn tool-page
  [{:keys [organ organ-centres centre tool tool-name mdata tools organ-name centre-name] :as params}]
 ;(?-> params ::params)
  (when (and mdata organ centre ((keyword organ) organ-centres) tool)
    (let [centre-info (utils/get-centre-info organ-centres organ centre)
          uk-info (utils/get-centre-info organ-centres organ :uk)
          tool-mdata (utils/get-tool-meta mdata organ tool)
          tcb (bun/get-bundle organ centre tool)
          is-full-screen @(rf/subscribe [::subs/is-full-screen])
          tab (get-in @(rf/subscribe [::subs/current-route]) [:path-params :tab] "bars")]
        ;(locals)
      [:div {:id "capture"}
       (when-not is-full-screen
         [:div [:div.d-print-none {:style {:width "100%" :background-color rgb/theme :padding 20 :color "white"}}
                [ui/row
                 [ui/col {:xs 12 :sm 8}
                  [:h1 (:description centre-info)]
                  [:p (:explanation uk-info)]]
                 ;[ui/col {:xs 12 :sm 4} [:h2 (string/capitalize organ-name) " Transplant Tool"]]
                 [ui/col {:xs 12 :sm 4} [:h2 "Placeholder-2"]]]

                [ui/tools-menu tools true organ-name centre-name {:vertical false}]]
          [:div.d-none.d-print-block {:style {:width "100%" :background-color rgb/theme :padding 20 :color "white"}}
           [ui/row
            [ui/col {:xs 6 :sm 4}
             [:h1 (:description centre-info)]]
            [ui/col {:xs 6 :sm 4} [:h2 (string/capitalize organ-name) " Transplant Tool"]]]
           [ui/row
            [ui/col {:xs 6 :sm 4} [:h4.lblprint (:label tool-mdata) " model"]]]]
          [:hr.rounded]])

       (when (= tab "test")
         [results/results-panel {:organ organ :centre centre :tool tool :bare true
                                 :centre-info centre-info}])
         


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
              [ui/col {:md 6
                       :style {:margin-top 10}
                       :class-name "col-print-6"}

               (when-let [input-header (get-in tool-mdata [:inputs :header])]
                 input-header)

               [:div {:style {:padding "0px 0px 15px 15px"}}
                (widg/widget {:type :reset})

                (into [:<>]
                      (map
                       (fn [[k w]] ^{:key (:factor w)}
                         [:div {:style {:margin-top 0
                                        :margin-bottom -5
                                        :margin-left -15
                                        :padding 5
                                        :display "relative"
                                        :outline-bottom (when (some? (:boxed w)) boxed-border)
                                        :background-image (when (some? (:boxed w)) (str "url(" (prf/data-urls :boxed) ")"))}}
                          [:div {:style {:position "relative"
                                         :padding-right 5}}
                           (when (= k first-boxed)
                             [:> bs/Row {:style {:padding-top 0 :display "flex" :align-items  "center"}}
                              [:> bs/Col {:xs 6
                                          :style {:display "flex" :justify-content "flex-end"}}
                               [:span {:style {:text-align "right"}}
                                boxed-text]]])
                           (widg/widget (assoc w :model tool))]
                          [:div {:style {:height 10}}]])

                       tcb-fmaps))]
               [:<>
                [:p "Placeholder-6"]
                ;[:p "This tool cannot take into account all the factors about you that might affect the result.
                ;                           We hope to include more in the future. "]
                [:p.d-print-none "Click below to find out more about those we have considered but are not in the tool."]
                [:p
                 [:> bs/Button {:id "factors-considered"
                                :size "md"
                                :variant "primary"
                                :title "Factors considered but not included"
                                :style {:margin-left 0}
                                :on-click (fn [_e]
                                            (rf/dispatch [::events/modal-data
                                                          {:show true
                                                           :title "Factors considered but not included"
                                                           :content (factors-not-included mdata)
                                                           :on-hide widg/hide-handler
                                                           :ok widg/hide-handler}]))}
                  [:span "Show factors considered but not included"]]]]])

            ;;;
            ;; Results Panel
            ;;;
            [:div.w-100.d-print-none.d-xs-block.d-md-none] ; this allows for a two column print layout but a one column xs and sm screen sizes
            [ui/col {:class-name "col-print-6"
                     :md (if is-full-screen 12 6)}
             (when-not is-full-screen
               [:section {:id "test-results"}]
               [:section {:style {:margin-top 10}} (:pre-section tool-mdata)])
             [:section

              [results/results-panel {:organ organ :centre centre :tool tool}]

              (:rest-of-page tool-mdata)]
             [widg/print-or-save]]])

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

    (tool-page {:organ organ
                :organ-centres organ-centres
                :centre centre
                :tool :waiting
                :tool-name "waiting"
                :mdata mdata
                :tools tools
                :organ-name organ-name
                :centre-name centre-name})
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

    (tool-page {:organ organ
                :organ-centres organ-centres
                :centre centre
                :tool tool
                :tool-name tool-name
                :mdata mdata
                :tools tools
                :organ-name organ-name
                :centre-name centre-name})))

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
    (tool-page {:organ organ
                :organ-centres organ-centres
                :centre centre
                :tool tool
                :tool-name tool-name
                :mdata mdata
                :tools tools
                :organ-name organ-name
                :centre-name centre-name})))

(defn organ-centre-tool-tab-inputs
  "A home page for an organ at a centre. It should offer links to the available tools, pre-configured
   for that organ and centre."
  []
  (let [route @(rf/subscribe [::subs/current-route])
        mdata @(rf/subscribe [::subs/mdata])
        organ-centres @(rf/subscribe [::subs/organ-centres])
        path-params (:path-params route)
        path-inputs (:inputs path-params)
        ;db-inputs @(rf/subscribe [::subs/inputs])
        tab (:tab path-params)
        [organ-name centre-name tool-name :as p-names] (utils/path-names path-params)
        tool-name (if (nil? tool-name) :waiting tool-name)
        [organ centre tool] (map keyword p-names)
        tools (utils/get-tools mdata organ)
;; either DISPATCH selected-inputs-vis or set db:inputs here?
        ]
    #_(?-> {:route route
          :db-inputs db-inputs
          :path-inputs path-inputs
          :organ organ
          :organ-centres organ-centres
          :centre centre
          :tool tool
          :tool-name tool-name
          :mdata mdata
          :tools tools
          :organ-name organ-name
          :centre-name centre-name} ::param-check)
    (rf/dispatch [::events/selected-inputs-vis path-inputs tab])

    ;;organ organ-centres centre tool tool-name mdata tools organ-name centre-name :as params
    [tool-page {:organ organ
                :organ-centres organ-centres
                :centre centre
                :tool tool
                :tool-name tool-name
                :mdata mdata
                :tools tools
                :organ-name organ-name
                :centre-name centre-name}]))
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