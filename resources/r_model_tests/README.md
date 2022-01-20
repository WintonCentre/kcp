R model tests
=============

These are a partially automated set of tests designed to provide confidence that the cljs models implemented
in the tool produce the same results as the R models supplied by NHSBT.

A further, purely manual, verification can be done by comparing the live tool results with those produced by the
NHSBT at https://www.odt.nhs.uk/transplantation/tools-policies-and-guidance/risk-communication-tools/

Both the R and the cljs tests require baseline data, factors, levels, and coefficients for each level. In cljs these are specified in the lung or kidney xlsx master file. In R, they are specified in the various CSV files referenced by the R code. 

R sources
---------
The final R code provided by NHSBT is in doc/Sally. To simplify testing code, we have copied these files to separate tool folders in the resources/r_model_tests folder and renamed them according to their function. The tool folder paths correspond to their paths within the cljs tool as specified in resources/metadata.edn under [:lung :tool-order] and [:kidney :tool-order]

Test configuration
------------------
Since the same data is labelled differently in R and cljs we need to add a label lookup table somewhere, and we have chosen to place this on the clojure side, in a column in the

