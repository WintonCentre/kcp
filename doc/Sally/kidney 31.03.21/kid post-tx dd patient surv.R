#work for kidney deceased donor post tx patient survival #

## Set work area/libname ##
setwd("F:\\Shared\\Organ Utilisation\\Winton Centre\\Kidney CR\\R work")

## Import data ##
survdata <- read.csv("kidney dd post tx patient surv.csv",fileEncoding = 'UTF-8-BOM')
param <- read.csv("kidney dd post tx patient params.csv",fileEncoding = 'UTF-8-BOM')
attach(survdata)
attach(param)

## Check data ##
head(survdata)
head(param)


## Adjusted capH will be - log(tx_surv) * exp(XB) ##

adjcox <- function(cent = "Belfast", rage = 3, rethnic = 1, wait = 2, diabetes=0, dage = 4, dhtn =1, hla = 1) {
  
  
  ## Calculate individual xbeta terms ##
  
  #Recipient age at transplant #
  if(rage == 1){xbeta_rage = rage_1}
  if(rage == 2){xbeta_rage = rage_2}
  if(rage == 3){xbeta_rage = rage_3}
  if(rage == 4){xbeta_rage = rage_4}
  if(rage == 5){xbeta_rage = rage_5}
  if(rage == 6){xbeta_rage = rage_6}
  
  #Ethnicity #
  if(rethnic == 1){xbeta_rethnic = rethnic_1}
  if(rethnic == 2){xbeta_rethnic = rethnic_2}
  
  #Wait time #
  if(wait == 1){xbeta_wait = wait_1}
  if(wait == 2){xbeta_wait = wait_2}
  if(wait == 3){xbeta_wait = wait_3}
  if(wait == 4){xbeta_wait = wait_4}
  if(wait == 5){xbeta_wait = wait_5}
  
  #Diabetes #
  if(diabetes == 0){xbeta_diabetes = diabetes_0}
  if(diabetes == 1){xbeta_diabetes = diabetes_1}
  
  
  #Donor age#
  if(dage == 1){xbeta_dage = dage_1}
  if(dage == 2){xbeta_dage = dage_2}
  if(dage == 3){xbeta_dage = dage_3}
  if(dage == 4){xbeta_dage = dage_4}
  if(dage == 5){xbeta_dage = dage_5}
  if(dage == 6){xbeta_dage = dage_6}

  #Donor htn#
  if(dhtn == 1){xbeta_dhtn = dhtn_1}
  if(dhtn == 2){xbeta_dhtn = dhtn_2}
  
  #HLA MM#
  if(hla == 1){xbeta_hla = hla_1}
  if(hla == 2){xbeta_hla = hla_2}
  if(hla == 3){xbeta_hla = hla_3}
  if(hla == 4){xbeta_hla = hla_4}
  
  
  
  ## Total xbetas ##
  xbeta <- sum(xbeta_rage, xbeta_wait, xbeta_rethnic, xbeta_diabetes, xbeta_dage, xbeta_dhtn, xbeta_hla)
  
  
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

test <- adjcox (cent = "Cambridge", rage = 6, rethnic = 2, wait = 2, diabetes = 0, dage = 4, dhtn = 1, hla = 1)

#Plotting the output #
plot(y = test$adjsurv, x = test$days, ylab = "Survival", xlab = "Time (days)", ylim = c(0, 1), col = "red")


  