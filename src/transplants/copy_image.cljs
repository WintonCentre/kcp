(ns transplants.copy-image)


(def image-node (js/document.getElementById "visual"))

(.-offsetHeight image-node)
(.-offsetWidth image-node)
(.-offsetTop image-node)
(.-offsetLeft image-node)

(def w (.-offsetWidth image-node))
(def h (.-offsetHeight image-node))
(def clone (.-outerHTML image-node))
(def blob (js/Blob. #js [clone]))

(def url (or (.-URL js/window) (.-webkitURL js/window) js/window))
#_url
(def blob-url (.createObjectURL url blob))

(def the-canvas (js/document.getElementById "the-visual"))
(goog.object.set the-canvas "width" w)
(goog.object.set the-canvas "height" h)
(def context (.getContext the-canvas "2d"))
(def image (Image. w h))

#_(.drawImage context image 0 0 w h)


