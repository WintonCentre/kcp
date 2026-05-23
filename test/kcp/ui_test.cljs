(ns kcp.ui-test
  (:require [cljs.test :refer [deftest is testing]]
            [kcp.ui :refer [fixup-markup]]
            [kcp.views :refer [render-description]]
            ))

(defn mock-parse-url
  "The real url parses requires a router, sidestep this..."
  [k]
  (str "parsed/" k))

(defn mocked-fixup-markup [markup]
  (fixup-markup markup {:parse-url mock-parse-url}))

(deftest test-fixup-markup
  (testing "anchor element"
    (is (= (mocked-fixup-markup [:a {:href ":kcp.views/tech"} "content"])
           [:a {:href "parsed/:kcp.views/tech"} "content"])))

  (testing "paragraph element"
    (is (= (mocked-fixup-markup [:p {:class "some-class"} "content"])
           [:p {:class "some-class"} "content"])))

  (testing "Nested valid markup vector with href update"
    (is (= (mocked-fixup-markup [:div [:p {:href "href"} "content"]])
           [:div [:p {:href "parsed/href"} "content"]])))

  (testing "Empty vector markup"
    (is (= (mocked-fixup-markup [])
           [])))

  (testing "Complex nested structure"
    (let [input [:div {:id "main"}
                 [:a {:href "href"} "content"]
                 [:span {:class "highlight"} "important"]]
          expected-output [:div {:id "main"}
                           [:a {:href "parsed/href"} "content"]
                           [:span {:class "highlight"} "important"]]]
      (is (= (mocked-fixup-markup input) expected-output))))
  )

(deftest test-render-description
  (testing "when description is a string"
    (is (= (render-description "Hello world")
           [:p "Hello world"])))

  (testing "when description is a sequential list/vector"
    (is (= (render-description ["Para 1" "Para 2"])
           [:<> [:p {:key 0} "Para 1"] [:p {:key 1} "Para 2"]])))

  (testing "when description is nil"
    (is (nil? (render-description nil)))))