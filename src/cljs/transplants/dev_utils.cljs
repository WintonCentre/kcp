(ns transplants.dev-utils)


(defn lorem-1 [k]
  [:p {:key k} "nulla at felis elementum porttitor sem quis condimentum felis vivamus augue
    magna sagittis nec vestibulum sed dictum eu eros donec facilisis est at mi
    bibendum finibus praesent cursus eros et risus dignissim tincidunt pellentesque
    quam vehicula vivamus eleifend magna ultrices tortor facilisis viverra nunc
    tincidunt tortor sit amet justo volutpat sit amet venenatis nisi mollis donec
    vel pellentesque libero maecenas tincidunt sem id nunc pretium posuere
    suspendisse accumsan justo tellus quis semper erat maximus vel etiam nec
    ipsum sem  aliquam nisl magna vulputate a commodo in pellentesque ac lorem
    sed sodales bibendum nisi fermentum laoreet praesent quis metus interdum mattis"])


(defn lorem-many [n]
  (into [:<>] (map lorem-1 (range n))))
