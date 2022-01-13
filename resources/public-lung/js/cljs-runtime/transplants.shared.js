goog.provide('transplants.shared');
/**
 * replace special chars in file paths with underscore
 */
transplants.shared.underscore = (function transplants$shared$underscore(s){
return clojure.string.replace((((s instanceof cljs.core.Keyword))?cljs.core.name(s):s),/-|\s+|'|\./,"_");
});

//# sourceMappingURL=transplants.shared.js.map
