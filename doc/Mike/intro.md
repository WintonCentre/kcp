# Introduction to generic-kcp-data

This repo is a rewrite of the lung-model repo that was used in the prototype transplant tools, plus validation

* provide a home to store incoming models from the statisticians
* read those models from the source xlsx
* read in source code and extract text keys
* assign text keys to model labels
* export them to a runtime readable format - either EDN or CSV
* validate them against source code, writing readable xlsx with annotations. 

## Collecting the input files
These are specified in 2 configuration files
1. kidney-spec.edn containing paths to:
   * competing-risks-model
   * patient-survival-model
   * graft-survival-model
   * web-model source-path
2. lung-spec.edn containing paths to:
   * competing-risks-model
   * patient-survival-model
   * graft-survival-model
   * web-model source-path

## Validation of the incoming xslx files
The validation step needs to be configured to access the correct source code.

One goal of the project is to make all tool texts user configurable, and ultimately NHSBT translatable, and an xlsx configuration file may help do that. It would need to be backed by a schema.

Validation could proceed like this:
1.  Export all sheets from the xlsx file into an EDN file
2.  Validate the EDN against a clojure spec schema for the kidney site or for the lung site
3.  Finally, export a valid xlsx file in the same form as the input, but annotated.

