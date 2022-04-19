args <- commandArgs(TRUE)
setwd(args)

survdata <- read.csv("surv.csv")
param <- read.csv("params.csv")
tests <- read.csv("tests.csv")

library(tidyr)
library(readr)

attach(survdata)
attach(param)
attach(tests)

adjcox <- function(cent = "UK", rage = 3, wait = 1, match=3, dage = 3, hla = 3) {
  
  
  ## Calculate individual xbeta terms ##
  
  #Recipient age at transplant #
  if(rage == 1){xbeta_rage = rage_1}
  if(rage == 2){xbeta_rage = rage_2}
  if(rage == 3){xbeta_rage = rage_3}
  if(rage == 4){xbeta_rage = rage_4}
  if(rage == 5){xbeta_rage = rage_5}

  
  #Ethnicity #
  if(match == 1){xbeta_match = match_1}
  if(match == 2){xbeta_match = match_2}
  if(match == 3){xbeta_match = match_3}
  
  #Wait time #
  if(wait == 1){xbeta_wait = wait_1}
  if(wait == 2){xbeta_wait = wait_2}
  if(wait == 3){xbeta_wait = wait_3}
  if(wait == 4){xbeta_wait = wait_4}

  #Donor age#
  if(dage == 1){xbeta_dage = dage_1}
  if(dage == 2){xbeta_dage = dage_2}
  if(dage == 3){xbeta_dage = dage_3}
  if(dage == 4){xbeta_dage = dage_4}
  if(dage == 5){xbeta_dage = dage_5}

  #HLA MM#
  if(hla == 1){xbeta_hla = hla_1}
  if(hla == 2){xbeta_hla = hla_2}
  if(hla == 3){xbeta_hla = hla_3}
  if(hla == 4){xbeta_hla = hla_4}
  
  
  
  ## Total xbetas ##
  xbeta <- sum(xbeta_rage, xbeta_wait, xbeta_match, xbeta_dage, xbeta_hla)
  
  
  ## Calculate cumulative hazard for each term ##
  adjsurv <- surv ** (exp(xbeta))
  
  basehaz <- data.frame(survdata, adjsurv)
  
  #Restrict to centre #
  centre <- basehaz
  
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
  
  
  ## impute values from belfast ##
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
    match = tests$match[i],
    dage = tests$dage[i],
    hla = tests$hla[i]
  )
  
  summary <-
    results[c(366, round(365.25 * 3 + 1), round(365.25 * 5 + 1)), c(1, 2)]
  
  write_csv(summary, paste("results_", i, ".csv", sep = ""))
}
