(ns transplants.mock-data)

;; :lung :new :waiting bundle
(def bundle
  {:lung
 {:new
  {:waiting
   {:baseline-vars
    {:age 51,
     :sex :male,
     :blood-group :AB,
     :in-hosp :no,
     :fvc 1.9,
     :bmi 23,
     :pred :pred-0,
     :thoracotomy :yes,
     :nyha-class :4,
     :d-gp :copd},
    :S0
    '([0 '(0 0)]
     [1 '(0.01439640858297188 0.001987079635729493)]
     [2 '(0.018578693680599084 0.004006432342576412)]
     [4 '(0.02279547042063357 0.0050320437222478075)]
     [6 '(0.02491964654312902 0.00608517528114138)]
     [7 '(0.027057858224780632 0.00608517528114138)]
     [13 '(0.04000151391487556 0.00608517528114138)]
     [21 '(0.05310411377389569 0.007167013191932499)]
     [28 '(0.06418577781214711 0.011546193687145859)]
     [30 '(0.06868432637760401 0.01265345628603906)]
     [60 '(0.1424652108902868 0.029195561170570906)]
     [91 '(0.21558253559749477 0.04903356728456691)]
     [182 '(0.4730489243334817 0.09871930086964006)]
     [270 '(0.6729972482870039 0.14825642928552926)]
     [363 '(0.8329238858140747 0.1905832149825199)]
     [452 '(1.0084171222690206 0.23803764431735333)]
     [547 '(1.2032158618791668 0.28934455107054186)]
     [638 '(1.5177997498769713 0.3412699924274983)]
     [730 '(1.8118814016446894 0.4247992395836513)]
     [821 '(1.9586098650553825 0.47789863228653406)]
     [883 '(2.1807256483052777 0.5331568142553333)]
     [954 '(2.310803297115236 0.5691712863421807)]
     [1095 '(2.5163124536072954 0.6605356478877634)]),
    :fmaps
    {:age
     {:beta-transplant nil,
      :beta-death nil,
      :info-box? nil,
      :level-name "unit",
      :type
      "{:dps 0, :knot1 21, :knot2 44, :knot3 56, :knot4 63, :max 70, :min 16, :type :numeric}",
      :sub-text "years",
      :level "[:spline :x :beta1 :beta2 :beta3]",
      :levels
      {[:spline :x :beta1 :beta2 :beta3]
       {:beta-transplant nil,
        :beta-death nil,
        :info-box? nil,
        :level-name "unit",
        :type
        {:dps 0,
         :knot1 21,
         :knot2 44,
         :knot3 56,
         :knot4 63,
         :max 70,
         :min 16,
         :type :numeric},
        :sub-text "years",
        :level [:spline :x :beta1 :beta2 :beta3],
        :factor :age,
        :order 1.02,
        :factor-name "Age at registration"},
       :beta1
       {:beta-transplant 0.00289,
        :beta-death -0.01092,
        :info-box? nil,
        :level-name nil,
        :type :param,
        :sub-text nil,
        :level :beta1,
        :factor :age,
        :order 1.02,
        :factor-name nil},
       :beta2
       {:beta-transplant -0.0001107,
        :beta-death 0.00124,
        :info-box? nil,
        :level-name nil,
        :type :param,
        :sub-text nil,
        :level :beta2,
        :factor :age,
        :order 1.02,
        :factor-name nil},
       :beta3
       {:beta-transplant 0.0008618,
        :beta-death -0.004,
        :info-box? nil,
        :level-name nil,
        :type :param,
        :sub-text nil,
        :level :beta3,
        :factor :age,
        :order 1.02,
        :factor-name nil}},
      :factor :age,
      :factor-key :lung/age,
      :order 1.02,
      :factor-name "Age at registration"},
     :pred
     {:beta-transplant 0,
      :beta-death 0,
      :info-box? :yes?,
      :level-name "0 mg",
      :type :v-radio,
      :sub-text nil,
      :level :pred-0,
      :levels
      {:pred-0
       {:beta-transplant 0,
        :beta-death 0,
        :info-box? :yes?,
        :level-name "0 mg",
        :type :v-radio,
        :sub-text nil,
        :level :pred-0,
        :factor :pred,
        :order 1.03,
        :factor-name "Daily dose of prednisolone at registration"},
       :pred-1-14
       {:beta-transplant -0.11611,
        :beta-death 0.21752,
        :info-box? nil,
        :level-name "Under 15mg",
        :type :v-radio,
        :sub-text nil,
        :level :pred-1-14,
        :factor :pred,
        :order 1.03,
        :factor-name nil},
       :pred-15+
       {:beta-transplant -0.0368,
        :beta-death 0.46777,
        :info-box? nil,
        :level-name "15mg or more",
        :type :v-radio,
        :sub-text nil,
        :level :pred-15+,
        :factor :pred,
        :order 1.03,
        :factor-name nil}},
      :factor :pred,
      :factor-key :lung/dd-pred,
      :order 1.03,
      :factor-name "Daily dose of prednisolone at registration"},
     :nyha-class
     {:beta-transplant 0.24667,
      :beta-death 0.05114,
      :info-box? :yes?,
      :level-name "I",
      :type :radio,
      :sub-text nil,
      :level :nyha-1,
      :levels
      {:nyha-1
       {:beta-transplant 0.24667,
        :beta-death 0.05114,
        :info-box? :yes?,
        :level-name "I",
        :type :radio,
        :sub-text nil,
        :level :nyha-1,
        :factor :nyha-class,
        :order 1.05,
        :factor-name "NYHA class at registration"},
       :nyha-2
       {:beta-transplant 0.24667,
        :beta-death 0.05114,
        :info-box? nil,
        :level-name "II",
        :type :radio,
        :sub-text nil,
        :level :nyha-2,
        :factor :nyha-class,
        :order 1.05,
        :factor-name nil},
       :nyha-3
       {:beta-transplant 0,
        :beta-death 0,
        :info-box? nil,
        :level-name "III",
        :type :radio,
        :sub-text nil,
        :level :nyha-3,
        :factor :nyha-class,
        :order 1.05,
        :factor-name nil},
       :nyha-4
       {:beta-transplant -0.16959,
        :beta-death 0.72565,
        :info-box? nil,
        :level-name "IV",
        :type :radio,
        :sub-text nil,
        :level :nyha-4,
        :factor :nyha-class,
        :order 1.05,
        :factor-name nil}},
      :factor :nyha-class,
      :factor-key :lung/nyha-class,
      :order 1.05,
      :factor-name "NYHA class at registration"},
     :fvc
     {:beta-transplant 0.14069,
      :beta-death -0.30773,
      :info-box? nil,
      :level-name "unit",
      :type "{:dps 2,  :max 5, :min 0, :type :numeric}",
      :sub-text "litres",
      :level :x,
      :levels
      {:x
       {:beta-transplant 0.14069,
        :beta-death -0.30773,
        :info-box? nil,
        :level-name "unit",
        :type {:dps 2, :max 5, :min 0, :type :numeric},
        :sub-text "litres",
        :level :x,
        :factor :fvc,
        :order 1.06,
        :factor-name "FVC at registration"}},
      :factor :fvc,
      :factor-key :lung/fvc,
      :order 1.06,
      :factor-name "FVC at registration"},
     :in-hosp
     {:beta-transplant 0,
      :beta-death 0,
      :info-box? :yes?,
      :level-name "No",
      :type :radio,
      :sub-text nil,
      :level :no,
      :levels
      {:no
       {:beta-transplant 0,
        :beta-death 0,
        :info-box? :yes?,
        :level-name "No",
        :type :radio,
        :sub-text nil,
        :level :no,
        :factor :in-hosp,
        :order 1.07,
        :factor-name "In hospital at registration"},
       :yes
       {:beta-transplant 0.21125,
        :beta-death 0.85983,
        :info-box? nil,
        :level-name "Yes",
        :type :radio,
        :sub-text nil,
        :level :yes,
        :factor :in-hosp,
        :order 1.07,
        :factor-name nil}},
      :factor :in-hosp,
      :factor-key :lung/in-hosp,
      :order 1.07,
      :factor-name "In hospital at registration"},
     :sex
     {:beta-transplant 0,
      :beta-death 0,
      :info-box? :yes,
      :level-name "Male",
      :type :radio,
      :sub-text nil,
      :level :male,
      :levels
      {:male
       {:beta-transplant 0,
        :beta-death 0,
        :info-box? :yes,
        :level-name "Male",
        :type :radio,
        :sub-text nil,
        :level :male,
        :factor :sex,
        :order 1.08,
        :factor-name "Sex"},
       :female
       {:beta-transplant -0.39788,
        :beta-death -0.51771,
        :info-box? nil,
        :level-name "Female",
        :type :radio,
        :sub-text nil,
        :level :female,
        :factor :sex,
        :order 1.08,
        :factor-name nil}},
      :factor :sex,
      :factor-key :lung/sex,
      :order 1.08,
      :factor-name "Sex"},
     :d-gp
     {:beta-transplant -0.29738,
      :beta-death 0.81246,
      :info-box? :yes?,
      :level-name "Cystic Fibrosis",
      :type :v-radio,
      :sub-text nil,
      :level :cf,
      :levels
      {:cf
       {:beta-transplant -0.29738,
        :beta-death 0.81246,
        :info-box? :yes?,
        :level-name "Cystic Fibrosis",
        :type :v-radio,
        :sub-text nil,
        :level :cf,
        :factor :d-gp,
        :order 1.09,
        :factor-name "Disease group"},
       :other
       {:beta-transplant -0.51223,
        :beta-death 0.48839,
        :info-box? nil,
        :level-name "Other",
        :type :v-radio,
        :sub-text nil,
        :level :other,
        :factor :d-gp,
        :order 1.09,
        :factor-name nil},
       :pf
       {:beta-transplant -0.4007,
        :beta-death 1.05201,
        :info-box? nil,
        :level-name "Pulmonary Fibrosis",
        :type :v-radio,
        :sub-text nil,
        :level :pf,
        :factor :d-gp,
        :order 1.09,
        :factor-name nil},
       :copd
       {:beta-transplant 0,
        :beta-death 0,
        :info-box? nil,
        :level-name "COPD",
        :type :v-radio,
        :sub-text nil,
        :level :copd,
        :factor :d-gp,
        :order 1.09,
        :factor-name nil}},
      :factor :d-gp,
      :factor-key :lung/d-gp,
      :order 1.09,
      :factor-name "Disease group"},
     :blood-group
     {:beta-transplant 0,
      :beta-death 0,
      :info-box? nil,
      :level-name "O",
      :type :radio,
      :sub-text nil,
      :level :O,
      :levels
      {:O
       {:beta-transplant 0,
        :beta-death 0,
        :info-box? nil,
        :level-name "O",
        :type :radio,
        :sub-text nil,
        :level :O,
        :factor :blood-group,
        :order 1.1,
        :factor-name "Blood group"},
       :A
       {:beta-transplant 0.62835,
        :beta-death 0.09625,
        :info-box? nil,
        :level-name "A",
        :type :radio,
        :sub-text nil,
        :level :A,
        :factor :blood-group,
        :order 1.1,
        :factor-name nil},
       :B
       {:beta-transplant 0.07511,
        :beta-death 0.13067,
        :info-box? nil,
        :level-name "B",
        :type :radio,
        :sub-text nil,
        :level :B,
        :factor :blood-group,
        :order 1.1,
        :factor-name nil},
       :AB
       {:beta-transplant 0.83084,
        :beta-death 0.02257,
        :info-box? nil,
        :level-name "AB",
        :type :radio,
        :sub-text nil,
        :level :AB,
        :factor :blood-group,
        :order 1.1,
        :factor-name nil}},
      :factor :blood-group,
      :factor-key :lung/blood-group,
      :order 1.1,
      :factor-name "Blood group"},
     :bmi
     {:beta-transplant -0.00381,
      :beta-death -0.04588,
      :info-box? nil,
      :level-name "unit",
      :type "{:dps 1, :max 100, :min 10, :type :numeric}",
      :sub-text "kg/m²",
      :level :x,
      :levels
      {:x
       {:beta-transplant -0.00381,
        :beta-death -0.04588,
        :info-box? nil,
        :level-name "unit",
        :type {:dps 1, :max 100, :min 10, :type :numeric},
        :sub-text "kg/m²",
        :level :x,
        :factor :bmi,
        :order 1.12,
        :factor-name "BMI at registration"}},
      :factor :bmi,
      :factor-key :lung/bmi,
      :order 1.12,
      :factor-name "BMI at registration"},
     :thoracotomy
     {:beta-transplant 0,
      :beta-death 0,
      :info-box? nil,
      :level-name "No",
      :type :radio,
      :sub-text nil,
      :level :no,
      :levels
      {:no
       {:beta-transplant 0,
        :beta-death 0,
        :info-box? nil,
        :level-name "No",
        :type :radio,
        :sub-text nil,
        :level :no,
        :factor :thoracotomy,
        :order 1.14,
        :factor-name "Previous thoracotomy?"},
       :yes
       {:beta-transplant -0.54059,
        :beta-death 0.00355,
        :info-box? nil,
        :level-name "Yes",
        :type :radio,
        :sub-text nil,
        :level :yes,
        :factor :thoracotomy,
        :order nil,
        :factor-name nil}},
      :factor :thoracotomy,
      :factor-key :lung/thoracotomy,
      :order 1.14,
      :factor-name "Previous thoracotomy?"}},
    :outcome-keys '(:cif-transplant :cif-death),
    :baseline-cifs
    '({:days 0, :cif-transplant 1, :cif-death 1}
     {:days 0, :cif-transplant 0.9918571481, :cif-death 0.9990117231}
     {:days 1, :cif-transplant 0.9857067242, :cif-death 0.9980148933}
     {:days 2, :cif-transplant 0.9815928264, :cif-death 0.9960015827}
     {:days 4, :cif-transplant 0.9774623833, :cif-death 0.9949805958}
     {:days 6, :cif-transplant 0.9753882847, :cif-death 0.9939333019}
     {:days 7, :cif-transplant 0.9733049262, :cif-death 0.9939333019}
     {:days 8, :cif-transplant 0.9712219189, :cif-death 0.9939333019}
     {:days 10, :cif-transplant 0.9670562908, :cif-death 0.9939333019}
     {:days 11, :cif-transplant 0.9649660008, :cif-death 0.9939333019}
     {:days 12, :cif-transplant 0.9628765094, :cif-death 0.9939333019}
     {:days 13, :cif-transplant 0.9607879846, :cif-death 0.9939333019}
     {:days 15, :cif-transplant 0.9587002307, :cif-death 0.9939333019}
     {:days 16, :cif-transplant 0.9566149794, :cif-death 0.9939333019}
     {:days 17, :cif-transplant 0.954531177, :cif-death 0.9939333019}
     {:days 18, :cif-transplant 0.9482812782, :cif-death 0.9939333019}
     {:days 21, :cif-transplant 0.9482812782, :cif-death 0.9928586086}
     {:days 22, :cif-transplant 0.9461917332, :cif-death 0.9917832024}
     {:days 24, :cif-transplant 0.9399286645, :cif-death 0.9907008496}
     {:days 25, :cif-transplant 0.9378307552, :cif-death 0.9896120117}
     {:days 28, :cif-transplant 0.9378307552, :cif-death 0.9885202078}
     {:days 30, :cif-transplant 0.9336213532, :cif-death 0.9874262621}
     {:days 31, :cif-transplant 0.9294069696, :cif-death 0.9863249668}
     {:days 32, :cif-transplant 0.9294069696, :cif-death 0.9852187223}
     {:days 33, :cif-transplant 0.9272876669, :cif-death 0.9852187223}
     {:days 34, :cif-transplant 0.9251662085, :cif-death 0.9852187223}
     {:days 35, :cif-transplant 0.9209217874, :cif-death 0.9852187223}
     {:days 36, :cif-transplant 0.9166738216, :cif-death 0.9852187223}
     {:days 38, :cif-transplant 0.9166738216, :cif-death 0.9840925141}
     {:days 39, :cif-transplant 0.9145461783, :cif-death 0.9840925141}
     {:days 40, :cif-transplant 0.9124166166, :cif-death 0.9829650724}
     {:days 41, :cif-transplant 0.9102780244, :cif-death 0.9818191774}
     {:days 42, :cif-transplant 0.9060007452, :cif-death 0.9818191774}
     {:days 45, :cif-transplant 0.9038628501, :cif-death 0.9806675703}
     {:days 47, :cif-transplant 0.9017199241, :cif-death 0.9795119141}
     {:days 48, :cif-transplant 0.8974365574, :cif-death 0.9795119141}
     {:days 49, :cif-transplant 0.8931524223, :cif-death 0.9795119141}
     {:days 50, :cif-transplant 0.8931524223, :cif-death 0.9771738871}
     {:days 51, :cif-transplant 0.89100011, :cif-death 0.9759996518}
     {:days 53, :cif-transplant 0.8866887721, :cif-death 0.9748200686}
     {:days 54, :cif-transplant 0.8823713725, :cif-death 0.9736326699}
     {:days 57, :cif-transplant 0.8758853038, :cif-death 0.9736326699}
     {:days 58, :cif-transplant 0.8758853038, :cif-death 0.9724303997}
     {:days 59, :cif-transplant 0.8715537132, :cif-death 0.9712265117}
     {:days 60, :cif-transplant 0.8672177235, :cif-death 0.9712265117}
     {:days 61, :cif-transplant 0.865040677, :cif-death 0.9712265117}
     {:days 62, :cif-transplant 0.8628606331, :cif-death 0.9712265117}
     {:days 64, :cif-transplant 0.8628606331, :cif-death 0.9675799539}
     {:days 65, :cif-transplant 0.8606754937, :cif-death 0.9675799539}
     {:days 67, :cif-transplant 0.8584879644, :cif-death 0.9675799539}
     {:days 68, :cif-transplant 0.8563033069, :cif-death 0.9675799539}
     {:days 69, :cif-transplant 0.8541218763, :cif-death 0.9675799539}
     {:days 70, :cif-transplant 0.849770579, :cif-death 0.9675799539}
     {:days 71, :cif-transplant 0.8475930315, :cif-death 0.9675799539}
     {:days 72, :cif-transplant 0.8454164076, :cif-death 0.9675799539}
     {:days 74, :cif-transplant 0.8410700878, :cif-death 0.9675799539}
     {:days 75, :cif-transplant 0.8388991095, :cif-death 0.9675799539}
     {:days 77, :cif-transplant 0.8367248779, :cif-death 0.9675799539}
     {:days 78, :cif-transplant 0.8302241958, :cif-death 0.966320168}
     {:days 79, :cif-transplant 0.8280502788, :cif-death 0.9650544525}
     {:days 80, :cif-transplant 0.8258724409, :cif-death 0.9637877393}
     {:days 81, :cif-transplant 0.8193388558, :cif-death 0.9625131681}
     {:days 83, :cif-transplant 0.8193388558, :cif-death 0.9599406773}
     {:days 84, :cif-transplant 0.8193388558, :cif-death 0.9586452831}
     {:days 86, :cif-transplant 0.8171426349, :cif-death 0.9586452831}
     {:days 87, :cif-transplant 0.8171426349, :cif-death 0.9573487801}
     {:days 88, :cif-transplant 0.8149337428, :cif-death 0.9534625587}
     {:days 89, :cif-transplant 0.812714202, :cif-death 0.9534625587}
     {:days 90, :cif-transplant 0.812714202, :cif-death 0.9521491681}
     {:days 91, :cif-transplant 0.8060717379, :cif-death 0.9521491681}
     {:days 92, :cif-transplant 0.8060717379, :cif-death 0.9495102995}
     {:days 93, :cif-transplant 0.8060717379, :cif-death 0.9481854603}
     {:days 94, :cif-transplant 0.8016095197, :cif-death 0.9468525485}
     {:days 95, :cif-transplant 0.799375855, :cif-death 0.9468525485}
     {:days 96, :cif-transplant 0.799375855, :cif-death 0.945507717}
     {:days 97, :cif-transplant 0.7949135929, :cif-death 0.945507717}
     {:days 98, :cif-transplant 0.7926772992, :cif-death 0.945507717}
     {:days 100, :cif-transplant 0.7904398576, :cif-death 0.945507717}
     {:days 101, :cif-transplant 0.7837545685, :cif-death 0.9441448242}
     {:days 102, :cif-transplant 0.7792994101, :cif-death 0.9441448242}
     {:days 103, :cif-transplant 0.7792994101, :cif-death 0.9413882696}
     {:days 104, :cif-transplant 0.7770587352, :cif-death 0.9413882696}
     {:days 105, :cif-transplant 0.7770587352, :cif-death 0.9399958087}
     {:days 106, :cif-transplant 0.7748181693, :cif-death 0.9399958087}
     {:days 107, :cif-transplant 0.7658995401, :cif-death 0.9385902077}
     {:days 108, :cif-transplant 0.7614034305, :cif-death 0.9371620666}
     {:days 109, :cif-transplant 0.7591363804, :cif-death 0.9371620666}
     {:days 111, :cif-transplant 0.7545915451, :cif-death 0.9371620666}
     {:days 112, :cif-transplant 0.7500273246, :cif-death 0.9371620666}
     {:days 113, :cif-transplant 0.7477356163, :cif-death 0.9371620666}
     {:days 114, :cif-transplant 0.7454403358, :cif-death 0.9357054182}
     {:days 116, :cif-transplant 0.7431367381, :cif-death 0.9357054182}
     {:days 118, :cif-transplant 0.7408318352, :cif-death 0.9357054182}
     {:days 119, :cif-transplant 0.7385296525, :cif-death 0.9357054182}
     {:days 120, :cif-transplant 0.7362276105, :cif-death 0.9357054182}
     {:days 121, :cif-transplant 0.7339180761, :cif-death 0.9357054182}
     {:days 122, :cif-transplant 0.7293031774, :cif-death 0.9342150178}
     {:days 123, :cif-transplant 0.7269786675, :cif-death 0.9342150178}
     {:days 125, :cif-transplant 0.7223313501, :cif-death 0.9342150178}
     {:days 127, :cif-transplant 0.7199987832, :cif-death 0.9342150178}
     {:days 128, :cif-transplant 0.7176689725, :cif-death 0.9327039909}
     {:days 132, :cif-transplant 0.7153345294, :cif-death 0.9311874089}
     {:days 134, :cif-transplant 0.712987902, :cif-death 0.9311874089}
     {:days 135, :cif-transplant 0.708299819, :cif-death 0.9311874089}
     {:days 137, :cif-transplant 0.7059527906, :cif-death 0.9311874089}
     {:days 139, :cif-transplant 0.7036068063, :cif-death 0.9311874089}
     {:days 140, :cif-transplant 0.7012638484, :cif-death 0.9311874089}
     {:days 144, :cif-transplant 0.6989235208, :cif-death 0.9296264005}
     {:days 145, :cif-transplant 0.6942356747, :cif-death 0.9280460646}
     {:days 147, :cif-transplant 0.6871788867, :cif-death 0.9280460646}
     {:days 148, :cif-transplant 0.6871788867, :cif-death 0.9248325589}
     {:days 150, :cif-transplant 0.6848016759, :cif-death 0.9248325589}
     {:days 153, :cif-transplant 0.6800493311, :cif-death 0.9248325589}
     {:days 154, :cif-transplant 0.6800493311, :cif-death 0.9232071982}
     {:days 155, :cif-transplant 0.6776692821, :cif-death 0.9232071982}
     {:days 156, :cif-transplant 0.672912297, :cif-death 0.9232071982}
     {:days 159, :cif-transplant 0.670536613, :cif-death 0.9232071982}
     {:days 162, :cif-transplant 0.6657855498, :cif-death 0.9215553793}
     {:days 164, :cif-transplant 0.6634123163, :cif-death 0.919893635}
     {:days 165, :cif-transplant 0.6586691243, :cif-death 0.919893635}
     {:days 166, :cif-transplant 0.6563030261, :cif-death 0.918209215}
     {:days 168, :cif-transplant 0.649219877, :cif-death 0.918209215}
     {:days 169, :cif-transplant 0.6468619099, :cif-death 0.9165027763}
     {:days 170, :cif-transplant 0.6444980797, :cif-death 0.9165027763}
     {:days 171, :cif-transplant 0.6421382255, :cif-death 0.9165027763}
     {:days 172, :cif-transplant 0.6421382255, :cif-death 0.91477422}
     {:days 173, :cif-transplant 0.6397700441, :cif-death 0.91477422}
     {:days 174, :cif-transplant 0.6397700441, :cif-death 0.9095670535}
     {:days 175, :cif-transplant 0.6326388524, :cif-death 0.9095670535}
     {:days 176, :cif-transplant 0.6302600194, :cif-death 0.9077858593}
     {:days 177, :cif-transplant 0.6302600194, :cif-death 0.9059969849}
     {:days 178, :cif-transplant 0.6278756062, :cif-death 0.9059969849}
     {:days 180, :cif-transplant 0.6254879981, :cif-death 0.9059969849}
     {:days 182, :cif-transplant 0.6230995857, :cif-death 0.9059969849}
     {:days 183, :cif-transplant 0.6230995857, :cif-death 0.9041906071}
     {:days 184, :cif-transplant 0.6207002977, :cif-death 0.9041906071}
     {:days 187, :cif-transplant 0.6159163088, :cif-death 0.9023689263}
     {:days 189, :cif-transplant 0.6135214446, :cif-death 0.9023689263}
     {:days 192, :cif-transplant 0.6111235364, :cif-death 0.9023689263}
     {:days 195, :cif-transplant 0.608728312, :cif-death 0.9023689263}
     {:days 198, :cif-transplant 0.6039465296, :cif-death 0.9004982722}
     {:days 200, :cif-transplant 0.6015509889, :cif-death 0.9004982722}
     {:days 201, :cif-transplant 0.5967716584, :cif-death 0.9004982722}
     {:days 203, :cif-transplant 0.5967716584, :cif-death 0.8986001602}
     {:days 204, :cif-transplant 0.5967716584, :cif-death 0.8967027379}
     {:days 205, :cif-transplant 0.5967716584, :cif-death 0.8948060767}
     {:days 206, :cif-transplant 0.5943517222, :cif-death 0.8929000006}
     {:days 208, :cif-transplant 0.5919241822, :cif-death 0.8929000006}
     {:days 212, :cif-transplant 0.5870839746, :cif-death 0.8929000006}
     {:days 217, :cif-transplant 0.5846706918, :cif-death 0.8929000006}
     {:days 218, :cif-transplant 0.5822549014, :cif-death 0.8929000006}
     {:days 221, :cif-transplant 0.5798424436, :cif-death 0.8929000006}
     {:days 223, :cif-transplant 0.5774305454, :cif-death 0.8929000006}
     {:days 224, :cif-transplant 0.5750158707, :cif-death 0.8909547517}
     {:days 225, :cif-transplant 0.5750158707, :cif-death 0.8890035278}
     {:days 226, :cif-transplant 0.5750158707, :cif-death 0.8870527328}
     {:days 227, :cif-transplant 0.5725865095, :cif-death 0.8870527328}
     {:days 229, :cif-transplant 0.5701504098, :cif-death 0.8850978522}
     {:days 230, :cif-transplant 0.5652701912, :cif-death 0.8811831736}
     {:days 231, :cif-transplant 0.5628076238, :cif-death 0.8811831736}
     {:days 232, :cif-transplant 0.5603377481, :cif-death 0.8811831736}
     {:days 233, :cif-transplant 0.5554003643, :cif-death 0.8811831736}
     {:days 234, :cif-transplant 0.5529208837, :cif-death 0.8811831736}
     {:days 235, :cif-transplant 0.5504370799, :cif-death 0.8811831736}
     {:days 236, :cif-transplant 0.5479566619, :cif-death 0.8811831736}
     {:days 238, :cif-transplant 0.5479566619, :cif-death 0.8791452121}
     {:days 239, :cif-transplant 0.5454644343, :cif-death 0.8771035721}
     {:days 240, :cif-transplant 0.5454644343, :cif-death 0.875057511}
     {:days 242, :cif-transplant 0.5429604599, :cif-death 0.875057511}
     {:days 243, :cif-transplant 0.5404526539, :cif-death 0.875057511}
     {:days 247, :cif-transplant 0.537948508, :cif-death 0.875057511}
     {:days 248, :cif-transplant 0.537948508, :cif-death 0.8729508392}
     {:days 250, :cif-transplant 0.537948508, :cif-death 0.8708437427}
     {:days 252, :cif-transplant 0.5354355685, :cif-death 0.8708437427}
     {:days 255, :cif-transplant 0.5329196996, :cif-death 0.8708437427}
     {:days 256, :cif-transplant 0.5304024266, :cif-death 0.8708437427}
     {:days 257, :cif-transplant 0.527886393, :cif-death 0.8708437427}
     {:days 258, :cif-transplant 0.5253716908, :cif-death 0.8708437427}
     {:days 260, :cif-transplant 0.5228547789, :cif-death 0.8687099226}
     {:days 261, :cif-transplant 0.5203259415, :cif-death 0.8687099226}
     {:days 264, :cif-transplant 0.5203259415, :cif-death 0.8665610866}
     {:days 265, :cif-transplant 0.5152554835, :cif-death 0.8665610866}
     {:days 266, :cif-transplant 0.5127265964, :cif-death 0.864393837}
     {:days 268, :cif-transplant 0.5127265964, :cif-death 0.8622099907}
     {:days 270, :cif-transplant 0.5101771563, :cif-death 0.8622099907}
     {:days 277, :cif-transplant 0.5101771563, :cif-death 0.8578238702}
     {:days 278, :cif-transplant 0.5101771563, :cif-death 0.8556055855}
     {:days 280, :cif-transplant 0.5050530119, :cif-death 0.8556055855}
     {:days 281, :cif-transplant 0.4999146263, :cif-death 0.8556055855}
     {:days 282, :cif-transplant 0.4973325127, :cif-death 0.8533354447}
     {:days 283, :cif-transplant 0.4947450237, :cif-death 0.8533354447}
     {:days 285, :cif-transplant 0.4921554215, :cif-death 0.8510374833}
     {:days 293, :cif-transplant 0.48956495, :cif-death 0.8510374833}
     {:days 296, :cif-transplant 0.48956495, :cif-death 0.8487139978}
     {:days 300, :cif-transplant 0.4843868527, :cif-death 0.8487139978}
     {:days 301, :cif-transplant 0.481806164, :cif-death 0.8487139978}
     {:days 303, :cif-transplant 0.4792291676, :cif-death 0.8487139978}
     {:days 305, :cif-transplant 0.4792291676, :cif-death 0.8463440313}
     {:days 306, :cif-transplant 0.4792291676, :cif-death 0.843977815}
     {:days 307, :cif-transplant 0.4740440847, :cif-death 0.843977815}
     {:days 308, :cif-transplant 0.4714536002, :cif-death 0.8415861897}
     {:days 310, :cif-transplant 0.4688472861, :cif-death 0.8415861897}
     {:days 311, :cif-transplant 0.4662413473, :cif-death 0.8415861897}
     {:days 314, :cif-transplant 0.4636403145, :cif-death 0.8415861897}
     {:days 315, :cif-transplant 0.4636403145, :cif-death 0.8391380518}
     {:days 322, :cif-transplant 0.4610227145, :cif-death 0.8366873451}
     {:days 323, :cif-transplant 0.4583974945, :cif-death 0.8366873451}
     {:days 325, :cif-transplant 0.4557789987, :cif-death 0.8366873451}
     {:days 326, :cif-transplant 0.4531703514, :cif-death 0.8366873451}
     {:days 330, :cif-transplant 0.4531703514, :cif-death 0.8341617927}
     {:days 343, :cif-transplant 0.4479552599, :cif-death 0.8290947623}
     {:days 345, :cif-transplant 0.4453234622, :cif-death 0.8290947623}
     {:days 346, :cif-transplant 0.4426996286, :cif-death 0.8290947623}
     {:days 360, :cif-transplant 0.4400710259, :cif-death 0.8290947623}
     {:days 362, :cif-transplant 0.43742918, :cif-death 0.8264769796}
     {:days 363, :cif-transplant 0.4347761901, :cif-death 0.8264769796}
     {:days 366, :cif-transplant 0.4321164403, :cif-death 0.8264769796}
     {:days 367, :cif-transplant 0.4294525336, :cif-death 0.8264769796}
     {:days 369, :cif-transplant 0.4294525336, :cif-death 0.8238061929}
     {:days 370, :cif-transplant 0.4267784398, :cif-death 0.8238061929}
     {:days 373, :cif-transplant 0.4267784398, :cif-death 0.8211257389}
     {:days 377, :cif-transplant 0.4241067526, :cif-death 0.8211257389}
     {:days 384, :cif-transplant 0.4214365453, :cif-death 0.818405596}
     {:days 385, :cif-transplant 0.4187506309, :cif-death 0.818405596}
     {:days 387, :cif-transplant 0.4187506309, :cif-death 0.8156520775}
     {:days 388, :cif-transplant 0.4160602921, :cif-death 0.8156520775}
     {:days 390, :cif-transplant 0.4133749502, :cif-death 0.8156520775}
     {:days 391, :cif-transplant 0.4133749502, :cif-death 0.8128628175}
     {:days 392, :cif-transplant 0.41069066, :cif-death 0.8128628175}
     {:days 394, :cif-transplant 0.4080072241, :cif-death 0.8128628175}
     {:days 395, :cif-transplant 0.4053247338, :cif-death 0.8128628175}
     {:days 401, :cif-transplant 0.4026529993, :cif-death 0.8128628175}
     {:days 404, :cif-transplant 0.3999835336, :cif-death 0.8128628175}
     {:days 406, :cif-transplant 0.3946539636, :cif-death 0.8128628175}
     {:days 408, :cif-transplant 0.3919951188, :cif-death 0.8098810865}
     {:days 411, :cif-transplant 0.3919951188, :cif-death 0.8068664665}
     {:days 413, :cif-transplant 0.3893114865, :cif-death 0.8038289746}
     {:days 422, :cif-transplant 0.386620482, :cif-death 0.8038289746}
     {:days 424, :cif-transplant 0.3838976524, :cif-death 0.8038289746}
     {:days 431, :cif-transplant 0.3784783515, :cif-death 0.8038289746}
     {:days 432, :cif-transplant 0.3784783515, :cif-death 0.8007414633}
     {:days 433, :cif-transplant 0.3730412221, :cif-death 0.8007414633}
     {:days 434, :cif-transplant 0.3730412221, :cif-death 0.79762313}
     {:days 439, :cif-transplant 0.3730412221, :cif-death 0.7945015637}
     {:days 441, :cif-transplant 0.3730412221, :cif-death 0.7913760285}
     {:days 447, :cif-transplant 0.3702924332, :cif-death 0.7913760285}
     {:days 450, :cif-transplant 0.3675400863, :cif-death 0.7913760285}
     {:days 451, :cif-transplant 0.3647959502, :cif-death 0.7913760285}
     {:days 452, :cif-transplant 0.3647959502, :cif-death 0.7881730203}
     {:days 459, :cif-transplant 0.3620382126, :cif-death 0.7881730203}
     {:days 468, :cif-transplant 0.3620382126, :cif-death 0.7849308583}
     {:days 470, :cif-transplant 0.3592705685, :cif-death 0.7849308583}
     {:days 471, :cif-transplant 0.3565160527, :cif-death 0.7849308583}
     {:days 472, :cif-transplant 0.3537690266, :cif-death 0.7849308583}
     {:days 473, :cif-transplant 0.3510104644, :cif-death 0.7849308583}
     {:days 474, :cif-transplant 0.3454976788, :cif-death 0.7849308583}
     {:days 475, :cif-transplant 0.3454976788, :cif-death 0.7815428001}
     {:days 481, :cif-transplant 0.3427117317, :cif-death 0.7815428001}
     {:days 482, :cif-transplant 0.3399389547, :cif-death 0.7815428001}
     {:days 488, :cif-transplant 0.3371779695, :cif-death 0.7815428001}
     {:days 494, :cif-transplant 0.3344245193, :cif-death 0.77805811}
     {:days 498, :cif-transplant 0.3316542948, :cif-death 0.77805811}
     {:days 502, :cif-transplant 0.3288966087, :cif-death 0.77450957}
     {:days 503, :cif-transplant 0.3261146022, :cif-death 0.77450957}
     {:days 506, :cif-transplant 0.3261146022, :cif-death 0.7709222096}
     {:days 512, :cif-transplant 0.3233149065, :cif-death 0.7709222096}
     {:days 513, :cif-transplant 0.3233149065, :cif-death 0.7637418079}
     {:days 517, :cif-transplant 0.3204651681, :cif-death 0.7637418079}
     {:days 519, :cif-transplant 0.3176262733, :cif-death 0.7637418079}
     {:days 525, :cif-transplant 0.3176262733, :cif-death 0.7600628791}
     {:days 526, :cif-transplant 0.3147614376, :cif-death 0.7563867824}
     {:days 527, :cif-transplant 0.3118609073, :cif-death 0.7563867824}
     {:days 531, :cif-transplant 0.3089662414, :cif-death 0.7563867824}
     {:days 533, :cif-transplant 0.3060597567, :cif-death 0.7563867824}
     {:days 534, :cif-transplant 0.3031604359, :cif-death 0.7526020766}
     {:days 541, :cif-transplant 0.3031604359, :cif-death 0.7487541769}
     {:days 547, :cif-transplant 0.3002271687, :cif-death 0.7487541769}
     {:days 553, :cif-transplant 0.3002271687, :cif-death 0.7448615664}
     {:days 558, :cif-transplant 0.2972664087, :cif-death 0.7409451465}
     {:days 559, :cif-transplant 0.2943024571, :cif-death 0.7409451465}
     {:days 560, :cif-transplant 0.2913056927, :cif-death 0.7370021872}
     {:days 566, :cif-transplant 0.2883109729, :cif-death 0.7370021872}
     {:days 576, :cif-transplant 0.2823366284, :cif-death 0.7370021872}
     {:days 578, :cif-transplant 0.2793143408, :cif-death 0.7370021872}
     {:days 579, :cif-transplant 0.2763098448, :cif-death 0.7370021872}
     {:days 583, :cif-transplant 0.2732917034, :cif-death 0.7370021872}
     {:days 585, :cif-transplant 0.2732917034, :cif-death 0.7328753604}
     {:days 586, :cif-transplant 0.270271023, :cif-death 0.7328753604}
     {:days 589, :cif-transplant 0.2672721166, :cif-death 0.7328753604}
     {:days 590, :cif-transplant 0.2672721166, :cif-death 0.7286404963}
     {:days 591, :cif-transplant 0.2642628161, :cif-death 0.7243914674}
     {:days 595, :cif-transplant 0.2612451359, :cif-death 0.7243914674}
     {:days 599, :cif-transplant 0.2582385882, :cif-death 0.7243914674}
     {:days 600, :cif-transplant 0.2552379369, :cif-death 0.7243914674}
     {:days 602, :cif-transplant 0.2552379369, :cif-death 0.7199876019}
     {:days 604, :cif-transplant 0.2522101154, :cif-death 0.7199876019}
     {:days 606, :cif-transplant 0.2491745951, :cif-death 0.7155234012}
     {:days 608, :cif-transplant 0.243109124, :cif-death 0.7155234012}
     {:days 615, :cif-transplant 0.2400830969, :cif-death 0.7155234012}
     {:days 616, :cif-transplant 0.2370716891, :cif-death 0.7155234012}
     {:days 617, :cif-transplant 0.2370716891, :cif-death 0.7108669536}
     {:days 619, :cif-transplant 0.2340561498, :cif-death 0.7108669536}
     {:days 627, :cif-transplant 0.2310633956, :cif-death 0.7108669536}
     {:days 630, :cif-transplant 0.2280786434, :cif-death 0.7108669536}
     {:days 633, :cif-transplant 0.225104386, :cif-death 0.7108669536}
     {:days 637, :cif-transplant 0.222137206, :cif-death 0.7108669536}
     {:days 638, :cif-transplant 0.2191936376, :cif-death 0.7108669536}
     {:days 642, :cif-transplant 0.2162712255, :cif-death 0.7108669536}
     {:days 645, :cif-transplant 0.2162712255, :cif-death 0.7058783383}
     {:days 646, :cif-transplant 0.2132972389, :cif-death 0.7058783383}
     {:days 647, :cif-transplant 0.2103421096, :cif-death 0.7008767953}
     {:days 651, :cif-transplant 0.2044455674, :cif-death 0.7008767953}
     {:days 654, :cif-transplant 0.2014839713, :cif-death 0.7008767953}
     {:days 655, :cif-transplant 0.2014839713, :cif-death 0.6956353505}
     {:days 665, :cif-transplant 0.1985175032, :cif-death 0.6956353505}
     {:days 666, :cif-transplant 0.1985175032, :cif-death 0.6902866692}
     {:days 670, :cif-transplant 0.1955427074, :cif-death 0.6902866692}
     {:days 672, :cif-transplant 0.1925919067, :cif-death 0.6902866692}
     {:days 673, :cif-transplant 0.1896590758, :cif-death 0.6902866692}
     {:days 680, :cif-transplant 0.1782726892, :cif-death 0.6902866692}
     {:days 682, :cif-transplant 0.1782726892, :cif-death 0.6844337119}
     {:days 683, :cif-transplant 0.1753513011, :cif-death 0.6727541159}
     {:days 694, :cif-transplant 0.1753513011, :cif-death 0.6666174143}
     {:days 699, :cif-transplant 0.1723512617, :cif-death 0.6666174143}
     {:days 702, :cif-transplant 0.1693756522, :cif-death 0.6666174143}
     {:days 709, :cif-transplant 0.1693756522, :cif-death 0.6603058343}
     {:days 721, :cif-transplant 0.166357138, :cif-death 0.6603058343}
     {:days 729, :cif-transplant 0.166357138, :cif-death 0.6539010494}
     {:days 730, :cif-transplant 0.1633465271, :cif-death 0.6539010494}
     {:days 734, :cif-transplant 0.1633465271, :cif-death 0.647464987}
     {:days 735, :cif-transplant 0.1602841265, :cif-death 0.647464987}
     {:days 744, :cif-transplant 0.1602841265, :cif-death 0.640913421}
     {:days 762, :cif-transplant 0.1572023459, :cif-death 0.640913421}
     {:days 770, :cif-transplant 0.1572023459, :cif-death 0.6341069718}
     {:days 771, :cif-transplant 0.1540808538, :cif-death 0.6341069718}
     {:days 778, :cif-transplant 0.1540808538, :cif-death 0.6271819579}
     {:days 791, :cif-transplant 0.1540808538, :cif-death 0.6200850504}
     {:days 805, :cif-transplant 0.1508186859, :cif-death 0.6200850504}
     {:days 809, :cif-transplant 0.1475655878, :cif-death 0.6200850504}
     {:days 819, :cif-transplant 0.1443071084, :cif-death 0.6200850504}
     {:days 821, :cif-transplant 0.1410543693, :cif-death 0.6200850504}
     {:days 826, :cif-transplant 0.1410543693, :cif-death 0.612266758}
     {:days 827, :cif-transplant 0.137707787, :cif-death 0.612266758}
     {:days 831, :cif-transplant 0.137707787, :cif-death 0.6042336652}
     {:days 845, :cif-transplant 0.1343015166, :cif-death 0.6042336652}
     {:days 855, :cif-transplant 0.1308427045, :cif-death 0.5958520516}
     {:days 856, :cif-transplant 0.1273550874, :cif-death 0.5958520516}
     {:days 864, :cif-transplant 0.1238226767, :cif-death 0.5958520516}
     {:days 865, :cif-transplant 0.1238226767, :cif-death 0.5867497829}
     {:days 876, :cif-transplant 0.1201624303, :cif-death 0.5867497829}
     {:days 879, :cif-transplant 0.1165295457, :cif-death 0.5867497829}
     {:days 883, :cif-transplant 0.112959532, :cif-death 0.5867497829}
     {:days 917, :cif-transplant 0.1094493109, :cif-death 0.5867497829}
     {:days 919, :cif-transplant 0.1059986429, :cif-death 0.5867497829}
     {:days 921, :cif-transplant 0.1025716463, :cif-death 0.5867497829}
     {:days 931, :cif-transplant 0.0991815473, :cif-death 0.5867497829}
     {:days 934, :cif-transplant 0.0991815473, :cif-death 0.5763898876}
     {:days 954, :cif-transplant 0.0991815473, :cif-death 0.5659942916}
     {:days 1007,
      :cif-transplant 0.0991815473,
      :cif-death 0.5546143792}
     {:days 1015,
      :cif-transplant 0.0991815473,
      :cif-death 0.5432564012}
     {:days 1016,
      :cif-transplant 0.0953342442,
      :cif-death 0.5432564012}
     {:days 1046,
      :cif-transplant 0.0915784461,
      :cif-death 0.5432564012}
     {:days 1048,
      :cif-transplant 0.0878755028,
      :cif-death 0.5432564012}
     {:days 1054,
      :cif-transplant 0.0842557719,
      :cif-death 0.5432564012}
     {:days 1078, :cif-transplant 0.080756853, :cif-death 0.5432564012}
     {:days 1081, :cif-transplant 0.080756853, :cif-death 0.5299777164}
     {:days 1092, :cif-transplant 0.080756853, :cif-death 0.5165745583}
     {:days 1095,
      :cif-transplant 0.080756853,
      :cif-death 0.5165745583}),
    :timed-outcome-keys '(:days :cif-transplant :cif-death),
    :beta-keys '(:beta-transplant :beta-death),
    :outcomes ''("transplant" "death")}}}})