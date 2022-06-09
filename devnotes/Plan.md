# Plan

The [Configuration note](Configuration.md) outlines the problem that we have when 
generalising the kcp configuration to other contexts. I think this can be summarised by saying that the app configuration cannot be an adhoc collection of
text files, xlsx files, and various processing steps. This is quiickly becoming
unmanageable, and we need to rationalise it if we are going to make an easy to use 
configuration utility.

But how?

## Plan A: Use Pathom

Pathom appears to address this problem by creating indexes for these processes. 
We need to see whether this works for real by using it to build a demonstration configuration editor for a react-native app.

If this works we can migrate this approach to the kcp tool to generalise
it to other problem domains.

## Plan B: Something else

Hopefully the problems we encounter in Plan A will tell us how to procede. I don't have
an immediate alternative to Plan A before we try it apart from continuing with 
adhoc manual configuration.