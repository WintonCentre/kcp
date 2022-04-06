setwd("~/clojure/transplants/resources/r_model_tests/kidney/graft")

survdata <- read.csv("surv.csv")
param <- read.csv("params.csv")
tests <- read.csv("tests.csv")

library(tidyr)
library(readr)

attach(survdata)
attach(param)
attach(tests)

adjcox <- function(cent = "Belfast", rage = 3, wait = 1, diabetes = 1, graft = 1, dage = 4, dbmi = 1, dhtn =2, hla = 1) {
  
  ## Calculate individual xbeta terms ##
  
  #Recipient age at transplant #
  if(rage == 1){xbeta_rage = rage_1}
  if(rage == 2){xbeta_rage = rage_2}
  if(rage == 3){xbeta_rage = rage_3}
  if(rage == 4){xbeta_rage = rage_4}
  if(rage == 5){xbeta_rage = rage_5}
  if(rage == 6){xbeta_rage = rage_6}
  
  #Wait time #
  if(wait == 1){xbeta_wait = wait_1}
  if(wait == 2){xbeta_wait = wait_2}
  if(wait == 3){xbeta_wait = wait_3}
  if(wait == 4){xbeta_wait = wait_4}
  if(wait == 5){xbeta_wait = wait_5}
  
  #Diabetes #
   if(diabetes == 0){xbeta_diabetes = diabetes_0}
  if(diabetes == 1){xbeta_diabetes = diabetes_1}
  
  #Graft #
  if(graft == 1){xbeta_graft = graft_1}
  if(graft == 2){xbeta_graft = graft_2}
 
  #Donor age#
  if(dage == 1){xbeta_dage = dage_1}
  if(dage == 2){xbeta_dage = dage_2}
  if(dage == 3){xbeta_dage = dage_3}
  if(dage == 4){xbeta_dage = dage_4}
  if(dage == 5){xbeta_dage = dage_5}
  if(dage == 6){xbeta_dage = dage_6}
  
  #Donor BMI#
  if(dbmi == 1){xbeta_dbmi = dbmi_1}
  if(dbmi == 2){xbeta_dbmi = dbmi_2}
  if(dbmi == 3){xbeta_dbmi = dbmi_3}
  
  #Donor htn#
  if(dhtn == 1){xbeta_dhtn = dhtn_1}
  if(dhtn == 2){xbeta_dhtn = dhtn_2}
  
  #HLA MM#
  if(hla == 1){xbeta_hla = hla_1}
  if(hla == 2){xbeta_hla = hla_2}
  if(hla == 3){xbeta_hla = hla_3}
  if(hla == 4){xbeta_hla = hla_4}
  
  
  ## Total xbetas ##
  xbeta <- sum(xbeta_rage, xbeta_wait, xbeta_graft, xbeta_diabetes, xbeta_dage, xbeta_dbmi, xbeta_dhtn, xbeta_hla)
  
  
  ## Calculate cumulative hazard for each term ##
  adjsurv <- surv ** (exp(xbeta))
  
  basehaz <- data.frame(survdata, adjsurv)
  
  #Restrict to centre #
  centre <- basehaz[rec_unit==cent,]
  
  #Set up for 1 row per every day #
  days <- numeric(length = 1827)
  days <- 0:1826
  
  adjsurv2 <- numeric(length = 1827)
  
  secondday <- centre$time[2]
  secondday
  
  ## delete second entry for day 0 - S(0) needs to start at 1 - only if second time entry is 0 ##
  
  if(secondday == 0){centre <- centre[-c(2),]}
  
  ## set up new dataset for day 0- 1826 - make sure there are data points for every day ##
  
  smoothed_cent <- data.frame(days)
  smoothed_cent$adjsurv <- adjsurv2
  
  
  ## impute values from newc ##
  j<-1
  for (i in 1:1827){
    if (smoothed_cent$days[i] == centre$time[j] )
    {  smoothed_cent$adjsurv[i] <- centre$adjsurv[j]
    j <- j + 1}
    else {smoothed_cent$adjsurv[i] <- centre$adjsurv[j-1]
    }
  }
  
  
  return(smoothed_cent)
  
  
}

for (i in 1:nrow(tests)) {
  results <- adjcox(
    cent = tests$cent[i],
    rage = tests$rage[i],
    wait = tests$wait[i],
    diabetes = tests$diabetes[i],
    graft = tests$graft[i],
    dage = tests$dage[i],
    dbmi = tests$dbmi[i],
    dhtn = tests$dhtn[i],
    hla = tests$hla[i]
  )
  
  summary <-
    results[c(366, 365 * 3 + 1, 365 * 5 + 1), c(1, 2)]
  
  write_csv(summary, paste("results_", i, ".csv", sep = ""))
}