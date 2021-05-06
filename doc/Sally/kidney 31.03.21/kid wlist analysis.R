#work for kidney#

## Set work area/libname ##
setwd("F:\\Shared\\Organ Utilisation\\Winton Centre\\Kidney CR\\R work")

## Import data ##
survdata <- read.csv("kid_wlist.csv",fileEncoding = 'UTF-8-BOM')
param <- read.csv("kid_waitlist_params.csv")
attach(survdata)
attach(param)

## Check data ##
head(survdata)
head(param)


##Check baseline ##

## Adjusted capH will be - log(tx_surv) * exp(XB) ##

## Calculate cumulative hazard for each term ##
capHtx <- -log(tx_surv)
capHrem <- -log(rem_surv)
capHdth <- -log(dth_surv)

basehaz <- data.frame(survdata, capHtx, capHrem, capHdth)

head(basehaz)

#Start with Belfast #
bel <- basehaz[rec_unit=="Belfast",]


dim(bel)[1]

capS <- numeric(length = dim(bel)[1])
capS[1] <- 1
capF_tx <- numeric(length = dim(bel)[1])
capF_tx[1] <- 0
capF_rem <- numeric(length = dim(bel)[1])
capF_rem[1] <- 0
capF_dth <- numeric(length = dim(bel)[1])
capF_dth[1] <- 0

p_tx <- numeric(length = dim(bel)[1])
p_tx[1] <- 0
p_rem <- numeric(length = dim(bel)[1])
p_rem[1] <- 0
p_dth <- numeric(length = dim(bel)[1])
p_dth[1] <- 0

h_tx <- numeric(length = dim(bel)[1])
h_tx[1] <- 0
h_rem <- numeric(length = dim(bel)[1])
h_rem[1] <- 0
h_dth <- numeric(length = dim(bel)[1])
h_dth[1] <- 0

test <- numeric(length = dim(bel)[1])
test[1] <- 0


for (i in 1:(dim(bel)[1]-1)){
  h_tx[i] <- bel$capHtx[i+1] - bel$capHtx[i]
  p_tx[i] <- h_tx[i] * capS[i]
  capF_tx[i+1] <- capF_tx[i] + p_tx[i]
  
  h_rem[i] <- bel$capHrem[i+1] - bel$capHrem[i]
  p_rem[i] <- h_rem[i] * capS[i]
  capF_rem[i+1] <- capF_rem[i] + p_rem[i]
  
  h_dth[i] <- bel$capHdth[i+1] - bel$capHdth[i]
  p_dth[i] <- h_dth[i] * capS[i]
  capF_dth[i+1] <- capF_dth[i] + p_dth[i]
  
  capS[i+1] <- capS[i] - p_tx[i] - p_rem[i] - p_dth [i]
  
  test[i] <- capS[i] + capF_rem[i] + capF_tx[i] + capF_dth[i]
  
}

plot(y = capF_tx, x = bel$time, ylab = "Transplant probability", xlab = "Time (days)", ylim = c(0, 1), col = "red")
points(y = capS, x = bel$time, col = "blue")
points(y = capF_rem, x = bel$time, col="green")
points(y = capF_dth, x = bel$time, col = "purple")

#plot(y = capS, x = bel$time, ylab = "Overall survival", xlab = "Time (days)", ylim = c(0, 1))
#plot(y = capF_rem, x = bel$time, ylab = "Removal probability", xlab = "Time (days)", ylim = c(0, 1))


points(y = test, x = bel$time, col="black")

