(ns transplants.db)

(def default-db
  {:window-width 800 #_(.innerWidth js/Window)
   :guidance :visits
   :guidance-percent 22
   :randomise-icons true
  ; Move these to the spreadsheet
   :cohort-dates {:from-year 2004 :to-year 2014}})
