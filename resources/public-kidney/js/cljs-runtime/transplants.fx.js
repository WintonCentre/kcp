goog.provide('transplants.fx');
re_frame.core.reg_fx(new cljs.core.Keyword("transplants.fx","navigate!","transplants.fx/navigate!",1405740540),(function (p__67469){
var vec__67470 = p__67469;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67470,(0),null);
var params = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67470,(1),null);
var query = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67470,(2),null);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["NAVIGATE!",k,params,query], 0));

return reitit.frontend.easy.push_state.cljs$core$IFn$_invoke$arity$3(k,params,query);
}));
re_frame.core.reg_fx(new cljs.core.Keyword("transplants.fx","dispatch","transplants.fx/dispatch",-1522088031),(function (p__67473){
var vec__67474 = p__67473;
var event_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67474,(0),null);
var event_params = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67474,(1),null);
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [event_key,event_params], null));
}));
re_frame.core.reg_fx(new cljs.core.Keyword("transplants.fx","load-organ-centres","transplants.fx/load-organ-centres",-273149344),(function (organs){
var seq__67477 = cljs.core.seq(organs);
var chunk__67478 = null;
var count__67479 = (0);
var i__67480 = (0);
while(true){
if((i__67480 < count__67479)){
var organ = chunk__67478.cljs$core$IIndexed$_nth$arity$2(null,i__67480);
re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.events","load-and-transpose-centres","transplants.events/load-and-transpose-centres",884756009),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.paths.centres_path(organ),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"organ-centres","organ-centres",986037238),organ], null)], null)], null));


var G__67500 = seq__67477;
var G__67501 = chunk__67478;
var G__67502 = count__67479;
var G__67503 = (i__67480 + (1));
seq__67477 = G__67500;
chunk__67478 = G__67501;
count__67479 = G__67502;
i__67480 = G__67503;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__67477);
if(temp__5753__auto__){
var seq__67477__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__67477__$1)){
var c__4679__auto__ = cljs.core.chunk_first(seq__67477__$1);
var G__67504 = cljs.core.chunk_rest(seq__67477__$1);
var G__67505 = c__4679__auto__;
var G__67506 = cljs.core.count(c__4679__auto__);
var G__67507 = (0);
seq__67477 = G__67504;
chunk__67478 = G__67505;
count__67479 = G__67506;
i__67480 = G__67507;
continue;
} else {
var organ = cljs.core.first(seq__67477__$1);
re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.events","load-and-transpose-centres","transplants.events/load-and-transpose-centres",884756009),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.paths.centres_path(organ),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"organ-centres","organ-centres",986037238),organ], null)], null)], null));


var G__67511 = cljs.core.next(seq__67477__$1);
var G__67512 = null;
var G__67513 = (0);
var G__67514 = (0);
seq__67477 = G__67511;
chunk__67478 = G__67512;
count__67479 = G__67513;
i__67480 = G__67514;
continue;
}
} else {
return null;
}
}
break;
}
}));
/**
 * Register simple db subscription and event on a factor. Duplicate registrations are possible and will cause a console warning
 * on startup. The final registration overwrites any previous ones. This function can be used to register db keys at run-time.
 * Both subscription and event are registered on the organ-namespaced factor.
 * Events happen when an input changes the value of a factor.
 * Subscriptions access input values by the factor key.
 */
transplants.fx.reg_factor = (function transplants$fx$reg_factor(organ_k,factor_k){
var ref_k = cljs.core.keyword.cljs$core$IFn$_invoke$arity$2(cljs.core.name(organ_k),cljs.core.name(factor_k));
re_frame.core.reg_sub.cljs$core$IFn$_invoke$arity$variadic(ref_k,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (db){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(db,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"inputs","inputs",865803858),organ_k,factor_k], null));
})], 0));

return re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(ref_k,(function (db,p__67482){
var vec__67483 = p__67482;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67483,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67483,(1),null);
return cljs.core.assoc_in(db,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"inputs","inputs",865803858),organ_k,factor_k], null),v);
}));
});
/**
 * Function which registers all organ factors given in a seq of factor maps
 */
transplants.fx.reg_factors = (function transplants$fx$reg_factors(p__67486){
var vec__67487 = p__67486;
var organ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67487,(0),null);
var fmaps = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67487,(1),null);
var seq__67490 = cljs.core.seq(fmaps);
var chunk__67491 = null;
var count__67492 = (0);
var i__67493 = (0);
while(true){
if((i__67493 < count__67492)){
var fmap = chunk__67491.cljs$core$IIndexed$_nth$arity$2(null,i__67493);
transplants.fx.reg_factor(organ,new cljs.core.Keyword(null,"factor","factor",-2103172748).cljs$core$IFn$_invoke$arity$1(fmap));


var G__67515 = seq__67490;
var G__67516 = chunk__67491;
var G__67517 = count__67492;
var G__67518 = (i__67493 + (1));
seq__67490 = G__67515;
chunk__67491 = G__67516;
count__67492 = G__67517;
i__67493 = G__67518;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__67490);
if(temp__5753__auto__){
var seq__67490__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__67490__$1)){
var c__4679__auto__ = cljs.core.chunk_first(seq__67490__$1);
var G__67519 = cljs.core.chunk_rest(seq__67490__$1);
var G__67520 = c__4679__auto__;
var G__67521 = cljs.core.count(c__4679__auto__);
var G__67522 = (0);
seq__67490 = G__67519;
chunk__67491 = G__67520;
count__67492 = G__67521;
i__67493 = G__67522;
continue;
} else {
var fmap = cljs.core.first(seq__67490__$1);
transplants.fx.reg_factor(organ,new cljs.core.Keyword(null,"factor","factor",-2103172748).cljs$core$IFn$_invoke$arity$1(fmap));


var G__67523 = cljs.core.next(seq__67490__$1);
var G__67524 = null;
var G__67525 = (0);
var G__67526 = (0);
seq__67490 = G__67523;
chunk__67491 = G__67524;
count__67492 = G__67525;
i__67493 = G__67526;
continue;
}
} else {
return null;
}
}
break;
}
});
re_frame.core.reg_fx(new cljs.core.Keyword(null,"reg-factors","reg-factors",-4597615),transplants.fx.reg_factors);

//# sourceMappingURL=transplants.fx.js.map
