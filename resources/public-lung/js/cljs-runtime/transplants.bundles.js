goog.provide('transplants.bundles');
/**
 * Subscribe to the collection of bundles
 */
transplants.bundles.get_all_bundles = (function transplants$bundles$get_all_bundles(){
return cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.subs","bundles","transplants.subs/bundles",1716532120)], null)));
});
/**
 * Subscribe to the collection of bundles, and return one indexed by the given 
 * organ, centre and tool
 */
transplants.bundles.get_bundle = (function transplants$bundles$get_bundle(organ,centre,tool){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(transplants.bundles.get_all_bundles(),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [organ,centre,tool], null));
});
/**
 * Samples an oct-bundle's baseline-cifs for the required day. 
 * Select the last baseline-cif which occurs on or before the target day.
 * 
 * Returns the whole map for the selected day which will contain baseline-cifs
 * under keys prefixed with :cif-.
 * 
 * If the selected day is less than the day of the first baseline, return the first baseline.
 * If it's more than the last, return the last baseline.
 * 
 */
transplants.bundles.cif_0 = (function transplants$bundles$cif_0(oct_bundle,day){
var rv = cljs.core.last(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__81486_SHARP_){
return (new cljs.core.Keyword(null,"days","days",-1394072564).cljs$core$IFn$_invoke$arity$1(p1__81486_SHARP_) <= day);
}),new cljs.core.Keyword(null,"baseline-cifs","baseline-cifs",-1388441263).cljs$core$IFn$_invoke$arity$1(oct_bundle)));
if(cljs.core.truth_((function (){var and__4251__auto__ = rv;
if(cljs.core.truth_(and__4251__auto__)){
return (new cljs.core.Keyword(null,"days","days",-1394072564).cljs$core$IFn$_invoke$arity$1(rv) > (0));
} else {
return and__4251__auto__;
}
})())){
return rv;
} else {
return cljs.core.first(new cljs.core.Keyword(null,"baseline-cifs","baseline-cifs",-1388441263).cljs$core$IFn$_invoke$arity$1(oct_bundle));
}
});

//# sourceMappingURL=transplants.bundles.js.map
