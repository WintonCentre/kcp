goog.provide('transplants.spline');
/**
 * Perform spline calculation to transform x using knots and betas. See Jenny Mehew doc.
 * x0 is the base var, x is the entered var, and the betas and knots are configured in the
 * spreadsheet.
 */
transplants.spline.spline = (function transplants$spline$spline(p__81478,p__81479,x0,x){
var vec__81480 = p__81478;
var k1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81480,(0),null);
var k2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81480,(1),null);
var k3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81480,(2),null);
var k4 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81480,(3),null);
var vec__81483 = p__81479;
var _beta1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81483,(0),null);
var _beta2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81483,(1),null);
var _beta3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81483,(2),null);
var betas = vec__81483;
var cube_PLUS_ = (function (x__$1){
if((x__$1 > (0))){
return ((x__$1 * x__$1) * x__$1);
} else {
return (0);
}
});
var d3_PLUS_ = (function (x__$1,n){
return cube_PLUS_((x__$1 - n));
});
var term = (function (n,x__$1){
return ((d3_PLUS_(x__$1,n) - d3_PLUS_(x__$1,k4)) / (k4 - n));
});
var f1 = (function (x__$1){
return (term(k1,x__$1) - term(k3,x__$1));
});
var f2 = (function (x__$1){
return (term(k2,x__$1) - term(k3,x__$1));
});
var xs = (function (x__$1,x0__$1){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(x__$1 - x0__$1),(f1(x__$1) - f1(x0__$1)),(f2(x__$1) - f2(x0__$1))], null);
});
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core._STAR_,betas,xs(x,x0)));
});

//# sourceMappingURL=transplants.spline.js.map
