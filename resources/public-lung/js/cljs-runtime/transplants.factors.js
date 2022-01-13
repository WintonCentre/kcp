goog.provide('transplants.factors');
/**
 * Given a master-fmap, returns all the outcomes as a seq of strings.
 * e.g. for :waitingfmaps this would be [transplant removal death all-reasons]
 */
transplants.factors.get_outcomes = (function transplants$factors$get_outcomes(fmap){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__81492_SHARP_){
return cljs.core.subs.cljs$core$IFn$_invoke$arity$2(p1__81492_SHARP_,(5));
}),cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__81491_SHARP_){
return clojure.string.starts_with_QMARK_(p1__81491_SHARP_,"beta-");
}),cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.name,cljs.core.keys(fmap))));
});
/**
 * Given a baseline-cif, returns all the outcomes as a seq of strings.
 * e.g. for :waitingfmaps this would be [transplant removal death all-reasons]
 */
transplants.factors.get_outcomes_STAR_ = (function transplants$factors$get_outcomes_STAR_(baseline_cif){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__81498_SHARP_){
return cljs.core.subs.cljs$core$IFn$_invoke$arity$2(p1__81498_SHARP_,(4));
}),cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__81497_SHARP_){
return clojure.string.starts_with_QMARK_(p1__81497_SHARP_,"cif-");
}),cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.name,cljs.core.keys(baseline_cif))));
});
/**
 * adds a prefix to an outcome and returns it as a keyword
 */
transplants.factors.prefix_outcome_key = (function transplants$factors$prefix_outcome_key(prefix,outcome){
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$1([cljs.core.name(prefix),"-",cljs.core.name(outcome)].join(''));
});
/**
 * Given a seq of outcomes, returns them as prefixed keywords
 */
transplants.factors.prefix_outcomes_keys = (function transplants$factors$prefix_outcomes_keys(prefix,outcomes){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(transplants.factors.prefix_outcome_key,prefix),outcomes);
});
/**
 * remove first prefix from a key, returning resulting string. Useful for converting
 * :beta-transplants back to 'transplants' 
 */
transplants.factors.remove_prefix_key = (function transplants$factors$remove_prefix_key(k){
return clojure.string.join.cljs$core$IFn$_invoke$arity$2("-",cljs.core.drop.cljs$core$IFn$_invoke$arity$2((1),clojure.string.split.cljs$core$IFn$_invoke$arity$2(cljs.core.name(k),"-")));
});
/**
 * Given a seq of input-maps all for the same factor, collect all level information under the first of these,
 * and return that fmap. 
 */
transplants.factors.level_maps = (function transplants$factors$level_maps(_factor,f_maps){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (m){
return cljs.core.update.cljs$core$IFn$_invoke$arity$3(m,new cljs.core.Keyword(null,"level","level",1290497552),(function (p1__81514_SHARP_){
if(typeof p1__81514_SHARP_ === 'string'){
return clojure.edn.read_string.cljs$core$IFn$_invoke$arity$1(p1__81514_SHARP_);
} else {
return p1__81514_SHARP_;
}
}));
}),cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (m){
return cljs.core.update.cljs$core$IFn$_invoke$arity$3(m,new cljs.core.Keyword(null,"type","type",1174270348),(function (p1__81510_SHARP_){
if(typeof p1__81510_SHARP_ === 'string'){
return clojure.edn.read_string.cljs$core$IFn$_invoke$arity$1(p1__81510_SHARP_);
} else {
return p1__81510_SHARP_;
}
}));
}),f_maps));
});
/**
 * Given a collection of f-maps all relating to the same factor, return a master f-map 
 * containing nested detail relating to levels
 */
transplants.factors.master_f_map = (function transplants$factors$master_f_map(organ,f_maps){
var f_map = cljs.core.first(f_maps);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(f_map,new cljs.core.Keyword(null,"factor-key","factor-key",-1402681225),cljs.core.keyword.cljs$core$IFn$_invoke$arity$2(organ,transplants.transforms.unstring_key.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"factor","factor",-2103172748).cljs$core$IFn$_invoke$arity$1(f_map))),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"levels","levels",-950747887),cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__81525){
var vec__81526 = p__81525;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81526,(0),null);
var vec__81529 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81526,(1),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81529,(0),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,v], null);
}),cljs.core.group_by(new cljs.core.Keyword(null,"level","level",1290497552),transplants.factors.level_maps(new cljs.core.Keyword(null,"factor","factor",-2103172748).cljs$core$IFn$_invoke$arity$1(f_map),f_maps))))], 0));
});
/**
 * Preprocess an inputs sheet before storing it
 */
transplants.factors.master_f_maps = (function transplants$factors$master_f_maps(organ,inputs){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__81534_SHARP_){
return transplants.factors.master_f_map(organ,p1__81534_SHARP_);
}),cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"order","order",-1254677256),cljs.core.first),cljs.core.partition_by.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"factor","factor",-2103172748),cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__81533_SHARP_){
return transplants.transforms.map_vals(transplants.transforms.unstring_key,p1__81533_SHARP_);
}),cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__81532_SHARP_){
return (((new cljs.core.Keyword(null,"factor","factor",-2103172748).cljs$core$IFn$_invoke$arity$1(p1__81532_SHARP_) instanceof cljs.core.Keyword)) || (cljs.core.vector_QMARK_(new cljs.core.Keyword(null,"factor","factor",-2103172748).cljs$core$IFn$_invoke$arity$1(p1__81532_SHARP_))));
}),winton_utils.data_frame.map_of_vs__GT_v_of_maps(inputs))))));
});
/**
 * get the master level key for a bundle factor
 */
transplants.factors.master_level_key = (function transplants$factors$master_level_key(bundle,factor){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(bundle,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"fmaps","fmaps",-1655984758),factor,new cljs.core.Keyword(null,"level","level",1290497552)], null));
});
transplants.factors.is_categorical_QMARK_ = (function transplants$factors$is_categorical_QMARK_(env,factor){
var level_key = transplants.factors.master_level_key(new cljs.core.Keyword(null,"bundle","bundle",-1741503734).cljs$core$IFn$_invoke$arity$1(env),factor);
return (((level_key instanceof cljs.core.Keyword)) && (cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(level_key,new cljs.core.Keyword(null,"x","x",2099068185))));
});
transplants.factors.is_spline_QMARK_ = (function transplants$factors$is_spline_QMARK_(env,factor){
var master_level = transplants.factors.master_level_key(new cljs.core.Keyword(null,"bundle","bundle",-1741503734).cljs$core$IFn$_invoke$arity$1(env),factor);
var splined = ((typeof master_level === 'string') && ((clojure.string.index_of.cljs$core$IFn$_invoke$arity$2(master_level,"spline") > (0))));
return splined;
});
transplants.factors.is_numeric_QMARK_ = (function transplants$factors$is_numeric_QMARK_(env,factor){
var type = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(env,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"bundle","bundle",-1741503734),new cljs.core.Keyword(null,"fmaps","fmaps",-1655984758),factor,new cljs.core.Keyword(null,"type","type",1174270348)], null));
return cljs.core.map_QMARK_(clojure.edn.read_string.cljs$core$IFn$_invoke$arity$1(type));
});
/**
 * Cross over factors contain a '*' in their names
 */
transplants.factors.is_cross_over_QMARK_ = (function transplants$factors$is_cross_over_QMARK_(factor){
return (clojure.string.index_of.cljs$core$IFn$_invoke$arity$2(cljs.core.name(factor),"*") > (0));
});
transplants.factors.split_cross_over = (function transplants$factors$split_cross_over(cross_over_factor){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.keyword,clojure.string.split.cljs$core$IFn$_invoke$arity$2(cljs.core.name(cross_over_factor),/\*/));
});
transplants.factors.join_cross_levels = (function transplants$factors$join_cross_levels(p__81543){
var vec__81544 = p__81543;
var level1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81544,(0),null);
var level2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81544,(1),null);
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(clojure.string.join.cljs$core$IFn$_invoke$arity$2("*",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.name(level1),cljs.core.name(level2)], null)));
});
/**
 * The value (level) of input factors may be found in the tool path parameters or in the tool inputs.
 * This function first looks in the organ inputs (e.g. :age is an input), then in the environment 
 * (e.g. :centre which is determined by path-params). 
 *  The raw level is always returned - it may need further processing e.g. by a spline.
 * If the factor is not found or it does not yet have a level, returns nil.
 */
transplants.factors.lookup_simple_factor_level = (function transplants$factors$lookup_simple_factor_level(env,factor){
var temp__5751__auto__ = (function (){var G__81547 = cljs.core.select_keys(env,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"centre","centre",-948091970)], null));
return (factor.cljs$core$IFn$_invoke$arity$1 ? factor.cljs$core$IFn$_invoke$arity$1(G__81547) : factor.call(null,G__81547));
})();
if(cljs.core.truth_(temp__5751__auto__)){
var level = temp__5751__auto__;
return level;
} else {
var temp__5753__auto__ = (function (){var G__81549 = new cljs.core.Keyword(null,"inputs","inputs",865803858).cljs$core$IFn$_invoke$arity$1(env);
return (factor.cljs$core$IFn$_invoke$arity$1 ? factor.cljs$core$IFn$_invoke$arity$1(G__81549) : factor.call(null,G__81549));
})();
if(cljs.core.truth_(temp__5753__auto__)){
var level = temp__5753__auto__;
return level;
} else {
return null;
}
}
});
/**
 * When we have a cross-over factor, we need to lookup each of its simple factor components, and
 * join them together into a simple level. We then find in the level map inside the fmaps (the fmaps) for 
 * that cross-over factor.
 * 
 * The spreadsheet checker should verify in advance that all cross-over combinations have levels.
 */
transplants.factors.lookup_cross_over_factor_level = (function transplants$factors$lookup_cross_over_factor_level(env,factor){
return transplants.factors.join_cross_levels(cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__81552_SHARP_){
return transplants.factors.lookup_simple_factor_level(env,p1__81552_SHARP_);
}),transplants.factors.split_cross_over(factor)));
});
transplants.factors.lookup_simple_beta = (function transplants$factors$lookup_simple_beta(master_fmap,level,beta_outcome_key){
var temp__5751__auto__ = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(master_fmap,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"levels","levels",-950747887),level,beta_outcome_key], null));
if(cljs.core.truth_(temp__5751__auto__)){
var beta = temp__5751__auto__;
return beta;
} else {
return (0);
}
});
transplants.factors.lookup_numeric_beta = (function transplants$factors$lookup_numeric_beta(master_fmap,beta_outcome_key){
return (beta_outcome_key.cljs$core$IFn$_invoke$arity$1 ? beta_outcome_key.cljs$core$IFn$_invoke$arity$1(master_fmap) : beta_outcome_key.call(null,master_fmap));
});
transplants.factors.lookup_numeric_input = (function transplants$factors$lookup_numeric_input(env,factor){
var x = (function (){var G__81558 = new cljs.core.Keyword(null,"inputs","inputs",865803858).cljs$core$IFn$_invoke$arity$1(env);
return (factor.cljs$core$IFn$_invoke$arity$1 ? factor.cljs$core$IFn$_invoke$arity$1(G__81558) : factor.call(null,G__81558));
})();
if(typeof x === 'string'){
return clojure.edn.read_string.cljs$core$IFn$_invoke$arity$1(x);
} else {
return x;
}
});
transplants.factors.selected_beta_x = (function transplants$factors$selected_beta_x(p__81560,factor,master_fmap,beta_outcome_key){
var map__81561 = p__81560;
var map__81561__$1 = cljs.core.__destructure_map(map__81561);
var env = map__81561__$1;
var bundle = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81561__$1,new cljs.core.Keyword(null,"bundle","bundle",-1741503734));
if(transplants.factors.is_cross_over_QMARK_(factor)){
try{var level_key = transplants.factors.lookup_cross_over_factor_level(env,factor);
var beta = transplants.factors.lookup_simple_beta(master_fmap,level_key,beta_outcome_key);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [factor,level_key,(cljs.core.truth_(beta)?beta:(0))], null);
}catch (e81564){var _e = e81564;
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [factor,null,(0)], null);
}} else {
if(transplants.factors.is_categorical_QMARK_(env,factor)){
var level_key = transplants.factors.lookup_simple_factor_level(env,factor);
var beta = transplants.factors.lookup_simple_beta(master_fmap,level_key,beta_outcome_key);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [factor,level_key,beta], null);
} else {
if(transplants.factors.is_spline_QMARK_(env,factor)){
var baseline_vars = new cljs.core.Keyword(null,"baseline-vars","baseline-vars",1157410304).cljs$core$IFn$_invoke$arity$1(bundle);
var levels = new cljs.core.Keyword(null,"levels","levels",-950747887).cljs$core$IFn$_invoke$arity$1(master_fmap);
var knots = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.second,cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.first,cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p__81565){
var vec__81566 = p__81565;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81566,(0),null);
var _v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81566,(1),null);
return clojure.string.starts_with_QMARK_(cljs.core.name(k),"knot");
}),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(levels,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"spline","spline",1200021714),new cljs.core.Keyword(null,"x","x",2099068185),new cljs.core.Keyword(null,"beta1","beta1",273840466),new cljs.core.Keyword(null,"beta2","beta2",-335217786),new cljs.core.Keyword(null,"beta3","beta3",-1167760089)], null),new cljs.core.Keyword(null,"type","type",1174270348)], null)))));
var betas = cljs.core.map.cljs$core$IFn$_invoke$arity$2(beta_outcome_key,cljs.core.juxt.cljs$core$IFn$_invoke$arity$3(new cljs.core.Keyword(null,"beta1","beta1",273840466),new cljs.core.Keyword(null,"beta2","beta2",-335217786),new cljs.core.Keyword(null,"beta3","beta3",-1167760089))(cljs.core.select_keys(levels,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"beta1","beta1",273840466),new cljs.core.Keyword(null,"beta2","beta2",-335217786),new cljs.core.Keyword(null,"beta3","beta3",-1167760089)], null))));
var x0 = (factor.cljs$core$IFn$_invoke$arity$1 ? factor.cljs$core$IFn$_invoke$arity$1(baseline_vars) : factor.call(null,baseline_vars));
var x = (function (){var temp__5751__auto__ = transplants.factors.lookup_numeric_input(env,factor);
if(cljs.core.truth_(temp__5751__auto__)){
var x_STAR_ = temp__5751__auto__;
return x_STAR_;
} else {
return x0;
}
})();
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [factor,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"spline","spline",1200021714),knots,betas], null),transplants.spline.spline(knots,betas,x0,x)], null);
} else {
if(transplants.factors.is_numeric_QMARK_(env,factor)){
var baseline_vars = new cljs.core.Keyword(null,"baseline-vars","baseline-vars",1157410304).cljs$core$IFn$_invoke$arity$1(bundle);
var x0 = (factor.cljs$core$IFn$_invoke$arity$1 ? factor.cljs$core$IFn$_invoke$arity$1(baseline_vars) : factor.call(null,baseline_vars));
var beta = transplants.factors.lookup_numeric_beta(master_fmap,beta_outcome_key);
var x = (function (){var temp__5751__auto__ = transplants.factors.lookup_numeric_input(env,factor);
if(cljs.core.truth_(temp__5751__auto__)){
var x_STAR_ = temp__5751__auto__;
return x_STAR_;
} else {
return x0;
}
})();
var x_x0 = (x - x0);
var beta_x_x0 = (beta * x_x0);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [factor,beta,x0,beta_x_x0], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"unclassified","unclassified",-88858074),factor], null);

}
}
}
}
});
/**
 * returns sum of all xs and betas (keyed by input factor?)
 */
transplants.factors.sum_beta_xs = (function transplants$factors$sum_beta_xs(p__81579,beta_outcome_key){
var map__81580 = p__81579;
var map__81580__$1 = cljs.core.__destructure_map(map__81580);
var env = map__81580__$1;
var bundle = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81580__$1,new cljs.core.Keyword(null,"bundle","bundle",-1741503734));
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.last,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__81581){
var vec__81582 = p__81581;
var factor = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81582,(0),null);
var master_fmap = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81582,(1),null);
return transplants.factors.selected_beta_x(env,factor,master_fmap,beta_outcome_key);
}),new cljs.core.Keyword(null,"fmaps","fmaps",-1655984758).cljs$core$IFn$_invoke$arity$1(bundle))));
});

//# sourceMappingURL=transplants.factors.js.map
