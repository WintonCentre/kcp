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

adjcox <- function(cent = "Newcastle", dcmv = 1, dsmoke = 1, pred = "0", type = 2, dis = "COPD", rage = 4, tlc = 2, fvc = 3, bili = 2, chol = 2) {
  
  
  ## Calculate individual xbeta terms ##
  
  #Donor CMV #
  if(dcmv == 1){xbeta_dcmv = dcmv_1}
  if(dcmv == 2){xbeta_dcmv = dcmv_2}
  
  #Donor smoking #
  if(dsmoke == 1){xbeta_dsmoke = dsmoke_1}
  if(dsmoke == 2){xbeta_dsmoke = dsmoke_2}
  
  #Prednisolone group #
  if(pred == "0"){xbeta_pred = pred_grp_1}
  if(pred == "1"){xbeta_pred = pred_grp_2}
  if(pred == "15"){xbeta_pred = pred_grp_3}
  
  #Tx type #
  if(type == 1){xbeta_tx_type = tx_type_1}
  if(type == 2){xbeta_tx_type = tx_type_2}
  
  #Disease group #
  if(dis == "COPD"){xbeta_dis = dis_grp_copd}
  if(dis == "CF"){xbeta_dis = dis_grp_cf}
  if(dis == "Other"){xbeta_dis = dis_grp_oth}
  if(dis == "PF"){xbeta_dis = dis_grp_pf}
  
  #Recipient age at transplant #
  if(rage == 1){xbeta_rage = rage_grp_1}
  if(rage == 2){xbeta_rage = rage_grp_2}
  if(rage == 3){xbeta_rage = rage_grp_3}
  if(rage == 4){xbeta_rage = rage_grp_4}
  if(rage == 5){xbeta_rage = rage_grp_5}
  
  #TLC mismatch #
  if(tlc == 1){xbeta_tlc = tlc_mis_1}
  if(tlc == 2){xbeta_tlc = tlc_mis_2}
  if(tlc == 3){xbeta_tlc = tlc_mis_3}
  
  #FVC #
  if(fvc == 1){xbeta_fvc = fvc_grp_1}
  if(fvc == 2){xbeta_fvc = fvc_grp_2}
  if(fvc == 3){xbeta_fvc = fvc_grp_3}
  if(fvc == 4){xbeta_fvc = fvc_grp_4}
  
  #Bilirubin #
  if(bili == 1){xbeta_bili = bili_grp_1}
  if(bili == 2){xbeta_bili = bili_grp_2}
  if(bili == 3){xbeta_bili = bili_grp_3}
  if(bili == 4){xbeta_bili = bili_grp_4}
  
  #Cholesterol #
  if(chol == 1){xbeta_chol = chol_grp_1}
  if(chol == 2){xbeta_chol = chol_grp_2}
  if(chol == 3){xbeta_chol = chol_grp_3}
  if(chol == 4){xbeta_chol = chol_grp_4}
  
  
  ## Total xbetas ##
  xbeta <- sum(xbeta_dcmv, xbeta_dsmoke, xbeta_pred, xbeta_tx_type, xbeta_dis, xbeta_rage, xbeta_tlc, xbeta_fvc, xbeta_bili, xbeta_chol)

  
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
    fvc = tests$fvc[i],
    bili = tests$bili[i],
    dis = tests$dis[i],
    pred = tests$pred[i],
    dsmoke = tests$dsmoke[i],
    rage = tests$rage[i],
    type = tests$type[i],
    cent = tests$cent[i],
    dcmv = tests$dcmv[i],
    chol = tests$chol[i],
    tlc = tests$tlc[i]
  )
  
  summary <-
    results[c(366, round(365.25 * 3 + 1), round(365.25 * 5 + 1)), c(1, 2)]
  
  write_csv(summary, paste("results_", i, ".csv", sep = ""))
}
