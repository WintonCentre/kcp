(ns kcp.db)

(def default-db
  {:window-width 800
   :guidance :visits
   :guidance-percent 22
   :randomise-icons true
   :missing-inputs true
   :additional-details {}
  ; Move these to the spreadsheet
   :cohort-dates {:from-year 2004 :to-year 2014}})
