(ns svg.container
  (:require [svg.scales :as scl]))

(defn svg-container

  "A container that can scale an svg to its parent's size while maintaining the svg aspect ratio.
   
   Inner and outer are rectangles represented by {:keys [width height]} maps.
   Outer defines the SVG viewbox size. Inner + Margins = Outer unless inner is given differently.
   
   Margin and padding are {:keys [top right bottom left]} maps
   x and y are Iscales that map the inner rectangle to the inner coordinate system
   todo:
   The inner rectangle size defaults to the outer
   
   The 
   
   "
  [{:keys [outer margin inner padding width height x y N
           x-title y-title styles]}
   content]

  (let [inner (if (nil? inner) {:width  (- (:width outer) (:left margin) (:right margin))
                                :height (- (:height outer) (:top margin) (:bottom margin))}
                  inner)
        width (if (nil? width) (- (:width inner) (:left padding) (:right padding)) width)
        height (if (nil? height) (- (:height inner) (:top padding) (:bottom padding)) height)
        x (if (nil? x) (scl/->Identity [0 width] N) x)
        x-ticks (scl/ticks x)
        y (if (nil? y) (scl/->Identity [0 height] 10) y)
        y-ticks (scl/ticks y)
        X (scl/i->o x)
        Y (scl/i->o y)]

    [:div {:style {:margin      "0 auto"
                   :width       "100%"
                   :height      0
                   :padding-top "100%"
                   :position    "relative"}}
     [:svg {:style    {:position "absolute"
                       :top      0
                       :left     0}
            :view-box (str " 0 0 " (:width outer) " " (:height outer))}

      [:g {:key       0
           :transform (str "translate(" (:left margin) ", " (:top margin) ")")}

       [:rect {:key        1
               :class-name (:outer styles)
               :width      (:width inner)
               :height     (:height inner)}]
               ;;
       ;; define the coordinate system
       ;;
       [:g {:key       2
            :transform (str "translate(" (:left padding) "," (:top padding) ")")}
        (when content [content X Y])]]]]))
