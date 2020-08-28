(ns transplants.db)

(def default-db
  {:window-width 800 #_(.innerWidth js/Window)
   :background-info :visits
   :guidance-percent 22
  ; Move these to the spreadsheet
   :cohort-dates {:from-year 2004 :to-year 2014}})
