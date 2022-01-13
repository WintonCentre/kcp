goog.provide('transplants.model');
/**
 * js number to sig figs
 */
transplants.model.to_precision = (function transplants$model$to_precision(d,sigs){
return (new Number(d)).toPrecision(sigs);
});
/**
 * Wrap javascript toFixed
 */
transplants.model.to_fixed = (function transplants$model$to_fixed(d,dps){
return (new Number(d)).toFixed(dps);
});
/**
 * Convert a decimal number to a fixed point string percentage
 */
transplants.model.to_percent = (function transplants$model$to_percent(var_args){
var G__67566 = arguments.length;
switch (G__67566) {
case 1:
return transplants.model.to_percent.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return transplants.model.to_percent.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(transplants.model.to_percent.cljs$core$IFn$_invoke$arity$1 = (function (d){
return transplants.model.to_percent.cljs$core$IFn$_invoke$arity$2(d,(0));
}));

(transplants.model.to_percent.cljs$core$IFn$_invoke$arity$2 = (function (d,dps){
return transplants.model.to_fixed((d * (100)),dps);
}));

(transplants.model.to_percent.cljs$lang$maxFixedArity = 2);

/**
 * returns a selection of data from S0. Could be optimised so it only needs one pass through S0, 
 * This is a once only call per centre so keeping it simple for now. It's called when centre data is stored on
 * :events/store-bundle-inputs
 */
transplants.model.sample_from = (function transplants$model$sample_from(S0){
var day_in_first_QMARK_ = cljs.core.partial.cljs$core$IFn$_invoke$arity$2(transplants.utils.day_in_QMARK_,cljs.core.first);
var W1S0 = cljs.core.take_while.cljs$core$IFn$_invoke$arity$2(day_in_first_QMARK_(transplants.utils.week),S0);
var M1S0 = cljs.core.take_while.cljs$core$IFn$_invoke$arity$2(day_in_first_QMARK_(transplants.utils.month),cljs.core.drop_while.cljs$core$IFn$_invoke$arity$2(day_in_first_QMARK_(transplants.utils.week),S0));
var Q1S0 = cljs.core.take_while.cljs$core$IFn$_invoke$arity$2(day_in_first_QMARK_(transplants.utils.quarter),cljs.core.drop_while.cljs$core$IFn$_invoke$arity$2(day_in_first_QMARK_(transplants.utils.month),S0));
var Qs = cljs.core.drop_while.cljs$core$IFn$_invoke$arity$2(day_in_first_QMARK_(transplants.utils.quarter),S0);
return cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(W1S0,cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.last,cljs.core.partition_by.cljs$core$IFn$_invoke$arity$2((function (p__67567){
var vec__67568 = p__67567;
var day = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67568,(0),null);
var _H = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67568,(1),null);
return transplants.utils.day__GT_week(day);
}),M1S0)),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.last,cljs.core.partition_by.cljs$core$IFn$_invoke$arity$2((function (p__67571){
var vec__67572 = p__67571;
var day = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67572,(0),null);
var _H = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67572,(1),null);
return transplants.utils.day__GT_month(day);
}),Q1S0)),cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.last,cljs.core.partition_by.cljs$core$IFn$_invoke$arity$2((function (p__67575){
var vec__67576 = p__67575;
var day = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67576,(0),null);
var _H = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67576,(1),null);
return transplants.utils.day__GT_quarter(day);
}),Qs))], 0));
});
/**
 * survival-data is a a vector of [day survival-by-outcomes].
 * survival-by-outcome is a vector of survivals for each outcome.
 * exp-sum-beta-xs is a vector of exponentials of sum-beta-xs for each outcome.
 * 
 * Run the cox-adustment over survival-data, returning a vector of [day leaving-proportion-by-outcome] having taken 
 * account of the input contributions to exp-sum-beta-xs, and having ensured the sum of all outcomes is 1.
 * Formally it has the same form as the input survival-data vector.
 */
transplants.model.cox_adjusted = (function transplants$model$cox_adjusted(survival_data,sum_beta_xs){
var exp_sum_beta_xs = cljs.core.map.cljs$core$IFn$_invoke$arity$2(Math.exp,sum_beta_xs);
var SD = survival_data;
var s = (1);
var f = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.constantly((0)),sum_beta_xs);
var _sumall = (1);
var result = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),f], null)], null);
while(true){
var vec__67595 = cljs.core.first(SD);
var _days = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67595,(0),null);
var S = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67595,(1),null);
var SD_PLUS_ = cljs.core.rest(SD);
if(cljs.core.seq(SD_PLUS_)){
var vec__67598 = cljs.core.first(SD_PLUS_);
var days_PLUS_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67598,(0),null);
var S_PLUS_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67598,(1),null);
var H = cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core._STAR_,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (SD,s,f,_sumall,result,vec__67598,days_PLUS_,S_PLUS_,vec__67595,_days,S,SD_PLUS_,exp_sum_beta_xs){
return (function (p1__67579_SHARP_){
return (- Math.log(p1__67579_SHARP_));
});})(SD,s,f,_sumall,result,vec__67598,days_PLUS_,S_PLUS_,vec__67595,_days,S,SD_PLUS_,exp_sum_beta_xs))
,S),exp_sum_beta_xs);
var H_PLUS_ = cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core._STAR_,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (SD,s,f,_sumall,result,vec__67598,days_PLUS_,S_PLUS_,H,vec__67595,_days,S,SD_PLUS_,exp_sum_beta_xs){
return (function (p1__67580_SHARP_){
return (- Math.log(p1__67580_SHARP_));
});})(SD,s,f,_sumall,result,vec__67598,days_PLUS_,S_PLUS_,H,vec__67595,_days,S,SD_PLUS_,exp_sum_beta_xs))
,S_PLUS_),exp_sum_beta_xs);
var delta_h = cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core._,H_PLUS_,H);
var p = cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (SD,s,f,_sumall,result,vec__67598,days_PLUS_,S_PLUS_,H,H_PLUS_,delta_h,vec__67595,_days,S,SD_PLUS_,exp_sum_beta_xs){
return (function (p1__67582_SHARP_){
return (s * p1__67582_SHARP_);
});})(SD,s,f,_sumall,result,vec__67598,days_PLUS_,S_PLUS_,H,H_PLUS_,delta_h,vec__67595,_days,S,SD_PLUS_,exp_sum_beta_xs))
,delta_h);
var f_PLUS_ = cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core._PLUS_,f,p);
var s_PLUS_ = (s - cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,p));
var sumall_PLUS_ = (s + cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,f));
var G__67627 = SD_PLUS_;
var G__67628 = s_PLUS_;
var G__67629 = f_PLUS_;
var G__67630 = sumall_PLUS_;
var G__67631 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(result,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [days_PLUS_,f_PLUS_], null));
SD = G__67627;
s = G__67628;
f = G__67629;
_sumall = G__67630;
result = G__67631;
continue;
} else {
return result;
}
break;
}
});
/**
 * Returns a vector of [day outcome-baselines] for the given day from S0.
 * 
 * Since S0 may not collect all days, but S0-for-day will return the last known value 
 * at or before the given day. The returned day may therefore be earlier or equal to the
 * input day.
 * 
 */
transplants.model.S0_for_day = (function transplants$model$S0_for_day(S0,day){
var rv = cljs.core.last(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__67602_SHARP_){
return (cljs.core.first(p1__67602_SHARP_) <= day);
}),S0));
if(cljs.core.truth_((function (){var and__4251__auto__ = rv;
if(cljs.core.truth_(and__4251__auto__)){
return (cljs.core.first(rv) > (0));
} else {
return and__4251__auto__;
}
})())){
return rv;
} else {
return cljs.core.first(S0);
}
});
/**
 * Returns a vector of [day outcome-baselines] for each given day from S0. This is the
 *   equivalent of `map #(S0-for-day S0 %) days` but avoids doing a pass through S0 for
 * each day.
 */
transplants.model.S0_for_days = (function transplants$model$S0_for_days(S0,days){
var ds = days;
var ss = S0;
var result = cljs.core.PersistentVector.EMPTY;
while(true){
var temp__5751__auto__ = cljs.core.first(ds);
if(cljs.core.truth_(temp__5751__auto__)){
var d = temp__5751__auto__;
if(cljs.core.seq(ss)){
var vec__67611 = cljs.core.split_with(((function (ds,ss,result,d,temp__5751__auto__){
return (function (p1__67605_SHARP_){
return (cljs.core.first(p1__67605_SHARP_) <= d);
});})(ds,ss,result,d,temp__5751__auto__))
,ss);
var accept = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67611,(0),null);
var reject = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67611,(1),null);
var G__67632 = cljs.core.rest(ds);
var G__67633 = reject;
var G__67634 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(result,((cljs.core.seq(accept))?cljs.core.last(accept):cljs.core.last(result)));
ds = G__67632;
ss = G__67633;
result = G__67634;
continue;
} else {
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(result,cljs.core.last(result));
}
} else {
return result;
}
break;
}
});
/**
 * Competing risk tools demand the cox-adjusted model
 */
transplants.model.use_cox_adjusted_QMARK_ = (function transplants$model$use_cox_adjusted_QMARK_(tool){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(tool,new cljs.core.Keyword(null,"waiting","waiting",895906735));
});
/**
 * For a single cox calculation we should use the formula based on all-S0 rather than S0
 */
transplants.model.cox = (function transplants$model$cox(s0_for_day,sum_x_betas){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__67617_SHARP_){
return ((1) - Math.pow(s0_for_day,Math.exp(p1__67617_SHARP_)));
}),sum_x_betas);
});

//# sourceMappingURL=transplants.model.js.map
