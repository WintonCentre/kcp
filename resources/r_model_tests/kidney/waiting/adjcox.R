library(tidyr)
library(readr)

args <- commandArgs(TRUE)
setwd(args)
# setwd("~/clojure/transplants/resources/r_model_tests/kidney/waiting")

survdata <- read.csv("surv.csv")
param <- read.csv("params.csv")
tests <- read.csv("tests.csv")
attach(survdata)
attach(param)
attach(tests)





# NB: we rationalise the adjcox formal parameter names to correspond better with the names used in params.csv.
# This makes it easier to call adjcox automatically.
adjcox <- function(cent = "Belfast", sex = "m", eth="white", diabetes=2, sens=1, bld="o", dialysis=1, match = 1, age = 4, graft = 0)
  {

  ## Calculate individual xbeta terms ##

  #Sex #
  if(sex == "m"){tx_xbeta_sex = tx_sex_m ; rem_xbeta_sex = rem_sex_m ; dth_xbeta_sex = dth_sex_m}
  if(sex == "f"){tx_xbeta_sex = tx_sex_f ; rem_xbeta_sex = rem_sex_f ; dth_xbeta_sex = dth_sex_f}

  #Age #
  if(age == 2){tx_xbeta_age = tx_age_2 ; rem_xbeta_age = rem_age_2 ; dth_xbeta_age = dth_age_2}
  if(age == 3){tx_xbeta_age = tx_age_3 ; rem_xbeta_age = rem_age_3 ; dth_xbeta_age = dth_age_3}
  if(age == 4){tx_xbeta_age = tx_age_4 ; rem_xbeta_age = rem_age_4 ; dth_xbeta_age = dth_age_4}
  if(age == 5){tx_xbeta_age = tx_age_5 ; rem_xbeta_age = rem_age_5 ; dth_xbeta_age = dth_age_5}
  if(age == 6){tx_xbeta_age = tx_age_6 ; rem_xbeta_age = rem_age_6 ; dth_xbeta_age = dth_age_6}
  if(age == 7){tx_xbeta_age = tx_age_7 ; rem_xbeta_age = rem_age_7 ; dth_xbeta_age = dth_age_7}

  #Ethnicity #
  if(eth == "white"){tx_xbeta_eth = tx_eth_wh ; rem_xbeta_eth = rem_eth_wh ; dth_xbeta_eth = dth_eth_wh}
  if(eth == "nonwhite"){tx_xbeta_eth = tx_eth_nonwh ; rem_xbeta_eth = rem_eth_nonwh ; dth_xbeta_eth = dth_eth_nonwh}

  #Blood group #
  if(bld == "o"){tx_xbeta_bld = tx_bld_o; rem_xbeta_bld = rem_bld_o; dth_xbeta_bld = dth_bld_o}
  if(bld == "a"){tx_xbeta_bld = tx_bld_a; rem_xbeta_bld = rem_bld_a; dth_xbeta_bld = dth_bld_a}
  if(bld == "b"){tx_xbeta_bld = tx_bld_b; rem_xbeta_bld = rem_bld_b; dth_xbeta_bld = dth_bld_b}
  if(bld == "ab"){tx_xbeta_bld = tx_bld_ab; rem_xbeta_bld = rem_bld_ab; dth_xbeta_bld = dth_bld_ab}


  #Matchability #
  if(match == 1){tx_xbeta_mat = tx_match_1 ; rem_xbeta_mat = rem_match_1 ; dth_xbeta_mat = dth_match_1}
  if(match == 2){tx_xbeta_mat = tx_match_2 ; rem_xbeta_mat = rem_match_2 ; dth_xbeta_mat = dth_match_2}
  if(match == 3){tx_xbeta_mat = tx_match_3 ; rem_xbeta_mat = rem_match_3 ; dth_xbeta_mat = dth_match_3}

  #Dialysis #
  if(dialysis == 1){tx_xbeta_dial = tx_dialysis_1 ; rem_xbeta_dial = rem_dialysis_1 ; dth_xbeta_dial = dth_dialysis_1}
  if(dialysis == 2){tx_xbeta_dial = tx_dialysis_2 ; rem_xbeta_dial = rem_dialysis_2 ; dth_xbeta_dial = dth_dialysis_2}

  #Graft #
  if(graft == 0){tx_xbeta_graft = tx_graft_0 ; rem_xbeta_graft = rem_graft_0 ; dth_xbeta_graft = dth_graft_0}
  if(graft == 1){tx_xbeta_graft = tx_graft_1 ; rem_xbeta_graft = rem_graft_1 ; dth_xbeta_graft = dth_graft_1}

  #Sensitisation #
  if(sens == 1){tx_xbeta_sens = tx_sens_1 ; rem_xbeta_sens = rem_sens_1 ; dth_xbeta_sens = dth_sens_1}
  if(sens == 2){tx_xbeta_sens = tx_sens_2 ; rem_xbeta_sens = rem_sens_2 ; dth_xbeta_sens = dth_sens_2}


  #Diabetes #
  if(diabetes == 1){tx_xbeta_diabetes = tx_diabetes_1 ; rem_xbeta_diabetes = rem_diabetes_1 ; dth_xbeta_diabetes = dth_diabetes_1}
  if(diabetes == 2){tx_xbeta_diabetes = tx_diabetes_2 ; rem_xbeta_diabetes = rem_diabetes_2 ; dth_xbeta_diabetes = dth_diabetes_2}


  ## Total xbetas ##
  tx_xbeta <- sum(tx_xbeta_sex, tx_xbeta_age, tx_xbeta_eth, tx_xbeta_bld, tx_xbeta_mat, tx_xbeta_dial, tx_xbeta_graft, tx_xbeta_sens, tx_xbeta_diabetes)
  rem_xbeta <- sum(rem_xbeta_sex, rem_xbeta_age, rem_xbeta_eth, rem_xbeta_bld, rem_xbeta_mat, rem_xbeta_dial, rem_xbeta_graft, rem_xbeta_sens, rem_xbeta_diabetes)
  dth_xbeta <- sum(dth_xbeta_sex, dth_xbeta_age, dth_xbeta_eth, dth_xbeta_bld, dth_xbeta_mat, dth_xbeta_dial, dth_xbeta_graft, dth_xbeta_sens, dth_xbeta_diabetes)

  ## Calculate cumulative hazard for each term ##
  capHtx <- -log(tx_surv) * exp (tx_xbeta)
  capHrem <- -log(rem_surv) * exp (rem_xbeta)
  capHdth <- -log(dth_surv) * exp (dth_xbeta)


  basehaz <- data.frame(survdata, capHtx, capHrem, capHdth)


  #Restrict to centre #
  centre <- basehaz[rec_unit==cent,]

  #Set up for 1 row per every day #
  days <- numeric(length = 1827)
  days <- 0:1826

  capHtx2 <- numeric(length = 1827)
  capHrem2 <- numeric(length = 1827)
  capHdth2 <- numeric(length = 1827)

  secondday <- centre$time[2]
  secondday

  ## delete second entry for day 0 - S(0) needs to start at 1 - only if second time entry is 0 ##

  if(secondday == 0){centre <- centre[-c(2),]}

  ## set up new dataset for day 0- 1826 - make sure there are data points for every day ##

  smoothed_cent <- data.frame(days)
  smoothed_cent$capHtx <- capHtx2
  smoothed_cent$capHrem <- capHrem2
  smoothed_cent$capHrem <- capHdth2


  ## impute values from bel ##
  j<-1
  for (i in 1:1827) {
    if (smoothed_cent$days[i] == centre$time[j])
    {
      smoothed_cent$capHtx[i] <- centre$capHtx[j]
      smoothed_cent$capHrem[i] <- centre$capHrem[j]
      smoothed_cent$capHdth[i] <- centre$capHdth[j]
      if (!is.na(centre$time[j + 1])) {
        j <- j + 1
      }
    }
    else {
      smoothed_cent$capHtx[i] <- centre$capHtx[j - 1]
      smoothed_cent$capHrem[i] <- centre$capHrem[j - 1]
      smoothed_cent$capHdth[i] <- centre$capHdth[j - 1]
    }
  }

  dim(smoothed_cent)[1]

  capS <- numeric(length = dim(smoothed_cent)[1])
  capS[1] <- 1
  capF_tx <- numeric(length = dim(smoothed_cent)[1])
  capF_tx[1] <- 0
  capF_rem <- numeric(length = dim(smoothed_cent)[1])
  capF_rem[1] <- 0
  capF_dth <- numeric(length = dim(smoothed_cent)[1])
  capF_dth[1] <- 0
  p_tx <- numeric(length = dim(smoothed_cent)[1])
  p_tx[1] <- 0
  p_rem <- numeric(length = dim(smoothed_cent)[1])
  p_rem[1] <- 0
  p_dth <- numeric(length = dim(smoothed_cent)[1])
  p_dth[1] <- 0
  h_tx <- numeric(length = dim(smoothed_cent)[1])
  h_tx[1] <- 0
  h_rem <- numeric(length = dim(smoothed_cent)[1])
  h_rem[1] <- 0
  h_dth <- numeric(length = dim(smoothed_cent)[1])
  h_dth[1] <- 0

  sumall <- numeric(length = dim(smoothed_cent)[1])
  sumall[1] <- 0


  for (i in 1:(dim(smoothed_cent)[1]-1)){
    h_tx[i] <- smoothed_cent$capHtx[i+1] - smoothed_cent$capHtx[i]
    p_tx[i] <- h_tx[i] * capS[i]
    capF_tx[i+1] <- capF_tx[i] + p_tx[i]

    h_rem[i] <- smoothed_cent$capHrem[i+1] - smoothed_cent$capHrem[i]
    p_rem[i] <- h_rem[i] * capS[i]
    capF_rem[i+1] <- capF_rem[i] + p_rem[i]

    h_dth[i] <- smoothed_cent$capHdth[i+1] - smoothed_cent$capHdth[i]
    p_dth[i] <- h_dth[i] * capS[i]
    capF_dth[i+1] <- capF_dth[i] + p_dth[i]

    capS[i+1] <- capS[i] - p_tx[i] - p_rem[i] - p_dth[i]

    sumall[i] <- capS[i] + capF_rem[i] + capF_tx[i] + capF_dth[i]

  }

  out <- cbind(smoothed_cent, capS, capF_rem, capF_tx, capF_dth, sumall)

  return(out)
}

for (i in 1:nrow(tests)) {
  results <- adjcox(
    cent = tests$cent[i],
    sex = tests$sex[i],
    eth = tests$eth[i],
    diabetes = tests$diabetes[i],
    sens = tests$sens[i],
    bld = tests$bld[i],
    dialysis = tests$dialysis[i],
    match = tests$match[i],
    age = tests$age[i],
    graft = tests$graft[i]
  )
  
  summary <- results[c(366, 365 * 3 + 1, 365 * 5 + 1), c(1, 5, 6, 7, 8)]
  
  write_csv(summary, paste("results_", i, ".csv", sep = ""))
}

