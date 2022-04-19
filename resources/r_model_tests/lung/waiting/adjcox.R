library(tidyr)
library(readr)

args <- commandArgs(TRUE)
setwd(args)
# setwd("~/clojure/transplants/resources/r_model_tests/lung/waiting")

survdata <- read.csv("surv.csv")
param <- read.csv("params.csv")
tests <- read.csv("tests.csv")
attach(survdata)
attach(param)
attach(tests)


adjcox <- function(cent = "Newcastle", sex = 1, dis = "COPD", pred = "0", inhosp = 1, nyha = 3, rage = 4, prev = 1, bld = 1, bmi = 2, fvc = 3) {
  
  
  ## Calculate individual xbeta terms ##
  
  #Sex #
  if(sex == 1){tx_xbeta_sex = tx_sex_1 ; rem_xbeta_sex = rem_sex_1}
  if(sex == 2){tx_xbeta_sex = tx_sex_2 ; rem_xbeta_sex = rem_sex_2}

  #Disease group #
  if(dis == "COPD"){tx_xbeta_dis = tx_dis_copd; rem_xbeta_dis = rem_dis_copd}
  if(dis == "CF"){tx_xbeta_dis = tx_dis_cf; rem_xbeta_dis = rem_dis_cf}
  if(dis == "Other"){tx_xbeta_dis = tx_dis_oth; rem_xbeta_dis = rem_dis_oth}
  if(dis == "PF"){tx_xbeta_dis = tx_dis_pf; rem_xbeta_dis = rem_dis_pf}
  
  #Prednisolone group #
  if(pred == "0"){tx_xbeta_pred = tx_pred_0; rem_xbeta_pred = rem_pred_0}
  if(pred == "1"){tx_xbeta_pred = tx_pred_1_14; rem_xbeta_pred = rem_pred_1_14}
  if(pred == "15"){tx_xbeta_pred = tx_pred_15; rem_xbeta_pred = rem_pred_15}
  
  #In hospital #
  if(inhosp == 1){tx_xbeta_hosp = tx_in_hosp_1; rem_xbeta_hosp = rem_in_hosp_1}
  if(inhosp == 2){tx_xbeta_hosp = tx_in_hosp_2; rem_xbeta_hosp = rem_in_hosp_2}
  
  #NYHA #
  if(nyha == 1){tx_xbeta_nyha = tx_nyha_1; rem_xbeta_nyha = rem_nyha_1}
  if(nyha == 2){tx_xbeta_nyha = tx_nyha_2; rem_xbeta_nyha = rem_nyha_2}
  if(nyha == 3){tx_xbeta_nyha = tx_nyha_3; rem_xbeta_nyha = rem_nyha_3}
  if(nyha == 4){tx_xbeta_nyha = tx_nyha_4; rem_xbeta_nyha = rem_nyha_4}
  
  #Previous thoracotomy #
  if(prev == 1){tx_xbeta_prevthor = tx_prev_thor_1; rem_xbeta_prevthor = rem_prev_thor_1}
  if(prev == 2){tx_xbeta_prevthor = tx_prev_thor_2; rem_xbeta_prevthor = rem_prev_thor_2}
  
  #Blood group #
  if(bld == 1){tx_xbeta_bld = tx_bld_1; rem_xbeta_bld = rem_bld_1}
  if(bld == 2){tx_xbeta_bld = tx_bld_2; rem_xbeta_bld = rem_bld_2}
  if(bld == 3){tx_xbeta_bld = tx_bld_3; rem_xbeta_bld = rem_bld_3}
  if(bld == 4){tx_xbeta_bld = tx_bld_4; rem_xbeta_bld = rem_bld_4}
  
  #BMI group #
  if(bmi == 1){tx_xbeta_bmi = tx_bmi_1; rem_xbeta_bmi = rem_bmi_1}
  if(bmi == 2){tx_xbeta_bmi = tx_bmi_2; rem_xbeta_bmi = rem_bmi_2}
  if(bmi == 3){tx_xbeta_bmi = tx_bmi_3; rem_xbeta_bmi = rem_bmi_3}
  
  #FVC #
  if(fvc == 1){tx_xbeta_fvc = tx_fvc_1; rem_xbeta_fvc = rem_fvc_1}
  if(fvc == 2){tx_xbeta_fvc = tx_fvc_2; rem_xbeta_fvc = rem_fvc_2}
  if(fvc == 3){tx_xbeta_fvc = tx_fvc_3; rem_xbeta_fvc = rem_fvc_3}
  if(fvc == 4){tx_xbeta_fvc = tx_fvc_4; rem_xbeta_fvc = rem_fvc_4}
  
  #Age #
  if(rage == 1){tx_xbeta_age = tx_rage_1; rem_xbeta_age = rem_rage_1}
  if(rage == 2){tx_xbeta_age = tx_rage_2; rem_xbeta_age = rem_rage_2}
  if(rage == 3){tx_xbeta_age = tx_rage_3; rem_xbeta_age = rem_rage_3}
  if(rage == 4){tx_xbeta_age = tx_rage_4; rem_xbeta_age = rem_rage_4}
  if(rage == 5){tx_xbeta_age = tx_rage_5; rem_xbeta_age = rem_rage_5}
  
  
  ## Total xbetas ##
  tx_xbeta <- sum(tx_xbeta_sex, tx_xbeta_dis, tx_xbeta_pred, tx_xbeta_hosp, tx_xbeta_nyha, tx_xbeta_prevthor, tx_xbeta_bld, tx_xbeta_bmi, tx_xbeta_fvc, tx_xbeta_age)
  rem_xbeta <- sum(rem_xbeta_sex, rem_xbeta_dis, rem_xbeta_pred, rem_xbeta_hosp, rem_xbeta_nyha, rem_xbeta_prevthor, rem_xbeta_bld, rem_xbeta_bmi, rem_xbeta_fvc, rem_xbeta_age)
  
  ## Calculate cumulative hazard for each term ##
  capHtx <- -log(tx_surv) * exp (tx_xbeta)
  capHrem <- -log(rem_surv) * exp (rem_xbeta)
  
  basehaz <- data.frame(survdata, capHtx, capHrem)
  
  #Restrict to centre #
  centre <- basehaz[rec_unit==cent,]
  
  #Set up for 1 row per every day #
  days <- numeric(length = 1096)
  days <- 0:1095
  
  capHtx2 <- numeric(length = 1096)
  capHrem2 <- numeric(length = 1096)
  
  secondday <- centre$time[2]
  secondday
  
  ## delete second entry for day 0 - S(0) needs to start at 1 - only if second time entry is 0 ##
  
  if(secondday == 0){centre <- centre[-c(2),]}
  
  ## set up new dataset for day 0- 1095 - make sure there are data points for every day ##
  
  smoothed_cent <- data.frame(days)
  smoothed_cent$capHtx <- capHtx2
  smoothed_cent$capHrem <- capHrem2
  
  
  ## impute values from newc ##
  j<-1
  for (i in 1:1096){
    if (smoothed_cent$days[i] == centre$time[j] )
    {  smoothed_cent$capHtx[i] <- centre$capHtx[j]
    smoothed_cent$capHrem[i] <- centre$capHrem[j]
    j <- j + 1}
    else {smoothed_cent$capHtx[i] <- centre$capHtx[j-1]
    smoothed_cent$capHrem[i] <- centre$capHrem[j-1]
    }
  }
  
  
  dim(smoothed_cent)[1]
  
  capS <- numeric(length = dim(smoothed_cent)[1])
  capS[1] <- 1
  capF_tx <- numeric(length = dim(smoothed_cent)[1])
  capF_tx[1] <- 0
  capF_rem <- numeric(length = dim(smoothed_cent)[1])
  capF_rem[1] <- 0
  p_tx <- numeric(length = dim(smoothed_cent)[1])
  p_tx[1] <- 0
  p_rem <- numeric(length = dim(smoothed_cent)[1])
  p_rem[1] <- 0
  h_tx <- numeric(length = dim(smoothed_cent)[1])
  h_tx[1] <- 0
  h_rem <- numeric(length = dim(smoothed_cent)[1])
  h_rem[1] <- 0
  
  sumall <- numeric(length = dim(smoothed_cent)[1])
  sumall[1] <- 0
  
  
  for (i in 1:(dim(smoothed_cent)[1]-1)){
    h_tx[i] <- smoothed_cent$capHtx[i+1] - smoothed_cent$capHtx[i]
    p_tx[i] <- h_tx[i] * capS[i]
    capF_tx[i+1] <- capF_tx[i] + p_tx[i]
    
    h_rem[i] <- smoothed_cent$capHrem[i+1] - smoothed_cent$capHrem[i]
    p_rem[i] <- h_rem[i] * capS[i]
    capF_rem[i+1] <- capF_rem[i] + p_rem[i]
    
    capS[i+1] <- capS[i] - p_tx[i] - p_rem[i]
    
    sumall[i] <- capS[i] + capF_rem[i] + capF_tx[i]
    
  }
  
  out <- cbind(smoothed_cent, capS, capF_rem, capF_tx, sumall)
  
  return(out)
  
}


for (i in 1:nrow(tests)) {
  results <- adjcox(
    cent = tests$cent[i],
    bld = tests$bld[i],
    fvc = tests$fvc[i],
    bmi = tests$bmi[i],
    dis = tests$dis[i],
    pred = tests$pred[i],
    prev = tests$prev[i],
    rage = tests$rage[i],
    nyha = tests$nyha[i],
    sex = tests$sex[i],
    inhosp = tests$inhosp[i]
  )
  
  summary <- results[c(366, 365 * 2 + 1, 365 * 3 + 1), c(1, 4, 5, 6)]
  
  write_csv(summary, paste("results_", i, ".csv", sep = ""))
}