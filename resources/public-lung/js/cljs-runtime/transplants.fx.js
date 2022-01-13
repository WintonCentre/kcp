goog.provide('transplants.fx');
re_frame.core.reg_fx(new cljs.core.Keyword("transplants.fx","navigate!","transplants.fx/navigate!",1405740540),(function (p__81411){
var vec__81412 = p__81411;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81412,(0),null);
var params = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81412,(1),null);
var query = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81412,(2),null);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["NAVIGATE!",k,params,query], 0));

return reitit.frontend.easy.push_state.cljs$core$IFn$_invoke$arity$3(k,params,query);
}));
re_frame.core.reg_fx(new cljs.core.Keyword("transplants.fx","dispatch","transplants.fx/dispatch",-1522088031),(function (p__81415){
var vec__81416 = p__81415;
var event_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81416,(0),null);
var event_params = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81416,(1),null);
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [event_key,event_params], null));
}));
re_frame.core.reg_fx(new cljs.core.Keyword("transplants.fx","load-organ-centres","transplants.fx/load-organ-centres",-273149344),(function (organs){
var seq__81419 = cljs.core.seq(organs);
var chunk__81420 = null;
var count__81421 = (0);
var i__81422 = (0);
while(true){
if((i__81422 < count__81421)){
var organ = chunk__81420.cljs$core$IIndexed$_nth$arity$2(null,i__81422);
re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.events","load-and-transpose-centres","transplants.events/load-and-transpose-centres",884756009),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.paths.centres_path(organ),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"organ-centres","organ-centres",986037238),organ], null)], null)], null));


var G__81444 = seq__81419;
var G__81445 = chunk__81420;
var G__81446 = count__81421;
var G__81447 = (i__81422 + (1));
seq__81419 = G__81444;
chunk__81420 = G__81445;
count__81421 = G__81446;
i__81422 = G__81447;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__81419);
if(temp__5753__auto__){
var seq__81419__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__81419__$1)){
var c__4679__auto__ = cljs.core.chunk_first(seq__81419__$1);
var G__81448 = cljs.core.chunk_rest(seq__81419__$1);
var G__81449 = c__4679__auto__;
var G__81450 = cljs.core.count(c__4679__auto__);
var G__81451 = (0);
seq__81419 = G__81448;
chunk__81420 = G__81449;
count__81421 = G__81450;
i__81422 = G__81451;
continue;
} else {
var organ = cljs.core.first(seq__81419__$1);
re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.events","load-and-transpose-centres","transplants.events/load-and-transpose-centres",884756009),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.paths.centres_path(organ),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"organ-centres","organ-centres",986037238),organ], null)], null)], null));


var G__81452 = cljs.core.next(seq__81419__$1);
var G__81453 = null;
var G__81454 = (0);
var G__81455 = (0);
seq__81419 = G__81452;
chunk__81420 = G__81453;
count__81421 = G__81454;
i__81422 = G__81455;
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

return re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(ref_k,(function (db,p__81423){
var vec__81424 = p__81423;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81424,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81424,(1),null);
return cljs.core.assoc_in(db,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"inputs","inputs",865803858),organ_k,factor_k], null),v);
}));
});
/**
 * Function which registers all organ factors given in a seq of factor maps
 */
transplants.fx.reg_factors = (function transplants$fx$reg_factors(p__81427){
var vec__81433 = p__81427;
var organ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81433,(0),null);
var fmaps = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81433,(1),null);
var seq__81436 = cljs.core.seq(fmaps);
var chunk__81437 = null;
var count__81438 = (0);
var i__81439 = (0);
while(true){
if((i__81439 < count__81438)){
var fmap = chunk__81437.cljs$core$IIndexed$_nth$arity$2(null,i__81439);
transplants.fx.reg_factor(organ,new cljs.core.Keyword(null,"factor","factor",-2103172748).cljs$core$IFn$_invoke$arity$1(fmap));


var G__81457 = seq__81436;
var G__81458 = chunk__81437;
var G__81459 = count__81438;
var G__81460 = (i__81439 + (1));
seq__81436 = G__81457;
chunk__81437 = G__81458;
count__81438 = G__81459;
i__81439 = G__81460;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__81436);
if(temp__5753__auto__){
var seq__81436__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__81436__$1)){
var c__4679__auto__ = cljs.core.chunk_first(seq__81436__$1);
var G__81464 = cljs.core.chunk_rest(seq__81436__$1);
var G__81465 = c__4679__auto__;
var G__81466 = cljs.core.count(c__4679__auto__);
var G__81467 = (0);
seq__81436 = G__81464;
chunk__81437 = G__81465;
count__81438 = G__81466;
i__81439 = G__81467;
continue;
} else {
var fmap = cljs.core.first(seq__81436__$1);
transplants.fx.reg_factor(organ,new cljs.core.Keyword(null,"factor","factor",-2103172748).cljs$core$IFn$_invoke$arity$1(fmap));


var G__81468 = cljs.core.next(seq__81436__$1);
var G__81469 = null;
var G__81470 = (0);
var G__81471 = (0);
seq__81436 = G__81468;
chunk__81437 = G__81469;
count__81438 = G__81470;
i__81439 = G__81471;
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
