## Set work area/libname ##
setwd("F:\\Stats & Audit\\Shared\\Cardiothoracic\\Projects\\Outcomes from lung listing\\Modelling\\9. Work for David Speigenhalter\\October 2018\\Cox model work Dec 2020\\R work")

## Import data ##
survdata <- read.csv("lung post-tx surv.csv")
param <- read.csv("lung post-tx param.csv")
attach(survdata)
attach(param)

## Check data ##
head(survdata)
head(param)

## Adjusted capH will be - log(tx_surv) * exp(XB) ##

adjcox <- function(cent = "Newcastle", dcmv = 1, dsmoke = 1, pred_grp = "0", tx_type = 2, dis_grp = "COPD", rage_grp = 4, tlc_grp = 2, fvc_grp = 3, bili_grp = 2, chol_grp = 2) {
  
  
  ## Calculate individual xbeta terms ##
  
  #Donor CMV #
  if(dcmv == 1){xbeta_dcmv = dcmv_1}
  if(dcmv == 2){xbeta_dcmv = dcmv_2}
  
  #Donor smoking #
  if(dsmoke == 1){xbeta_dsmoke = dsmoke_1}
  if(dsmoke == 2){xbeta_dsmoke = dsmoke_2}
  
  #Prednisolone group #
  if(pred_grp == "0"){xbeta_pred = pred_grp_1}
  if(pred_grp == "1-14"){xbeta_pred = pred_grp_2}
  if(pred_grp == ">=15"){xbeta_pred = pred_grp_3}
  
  #Tx type #
  if(tx_type == 1){xbeta_tx_type = tx_type_1}
  if(tx_type == 2){xbeta_tx_type = tx_type_2}
  
  #Disease group #
  if(dis_grp == "COPD"){xbeta_dis = dis_grp_copd}
  if(dis_grp == "CF"){xbeta_dis = dis_grp_cf}
  if(dis_grp == "Other"){xbeta_dis = dis_grp_oth}
  if(dis_grp == "PF"){xbeta_dis = dis_grp_pf}
  
  #Recipient age at transplant #
  if(rage_grp == 1){xbeta_rage = rage_grp_1}
  if(rage_grp == 2){xbeta_rage = rage_grp_2}
  if(rage_grp == 3){xbeta_rage = rage_grp_3}
  if(rage_grp == 4){xbeta_rage = rage_grp_4}
  if(rage_grp == 5){xbeta_rage = rage_grp_5}
  
  #TLC mismatch #
  if(tlc_grp == 1){xbeta_tlc = tlc_mis_1}
  if(tlc_grp == 2){xbeta_tlc = tlc_mis_2}
  if(tlc_grp == 3){xbeta_tlc = tlc_mis_3}
  
  #FVC #
  if(fvc_grp == 1){xbeta_fvc = fvc_grp_1}
  if(fvc_grp == 2){xbeta_fvc = fvc_grp_2}
  if(fvc_grp == 3){xbeta_fvc = fvc_grp_3}
  if(fvc_grp == 4){xbeta_fvc = fvc_grp_4}
  
  #Bilirubin #
  if(bili_grp == 1){xbeta_bili = bili_grp_1}
  if(bili_grp == 2){xbeta_bili = bili_grp_2}
  if(bili_grp == 3){xbeta_bili = bili_grp_3}
  if(bili_grp == 4){xbeta_bili = bili_grp_4}
  
  #Cholesterol #
  if(chol_grp == 1){xbeta_chol = chol_grp_1}
  if(chol_grp == 2){xbeta_chol = chol_grp_2}
  if(chol_grp == 3){xbeta_chol = chol_grp_3}
  if(chol_grp == 4){xbeta_chol = chol_grp_4}
  
  
  ## Total xbetas ##
  xbeta <- sum(xbeta_dcmv, xbeta_dsmoke, xbeta_pred, xbeta_tx_type, xbeta_dis, xbeta_rage, xbeta_fvc, xbeta_bili, xbeta_chol)

  
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

test <- adjcox (cent = "Manchester", dcmv = 1, dsmoke = 1, pred_grp = "0", tx_type = 2, dis_grp = "PF", rage_grp = 5, tlc_grp = 2, fvc_grp = 1, bili_grp = 2, chol_grp = 2 )

#Plotting the output #
plot(y = test$adjsurv, x = test$days, ylab = "Survival", xlab = "Time (days)", ylim = c(0, 1), col = "red")

