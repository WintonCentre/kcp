goog.provide('transplants.transforms');
transplants.transforms.map_vals = (function transplants$transforms$map_vals(f,m){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__81456){
var vec__81461 = p__81456;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81461,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81461,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,(f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(v) : f.call(null,v))], null);
}),m));
});
/**
 * ks is a string starting with a colon. Convert it to a true keyword.
 * Useful when processing ':keyword' values readin from a spreadsheet into true keywords.
 * 
 * Single arity returns a global key. Double arity returns a namespaced key
 */
transplants.transforms.unstring_key = (function transplants$transforms$unstring_key(var_args){
var G__81473 = arguments.length;
switch (G__81473) {
case 1:
return transplants.transforms.unstring_key.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return transplants.transforms.unstring_key.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(transplants.transforms.unstring_key.cljs$core$IFn$_invoke$arity$1 = (function (ks){
return transplants.transforms.unstring_key.cljs$core$IFn$_invoke$arity$2(null,ks);
}));

(transplants.transforms.unstring_key.cljs$core$IFn$_invoke$arity$2 = (function (nsp,ks){
var nsp__$1 = ((typeof nsp === 'string')?clojure.string.trim(nsp):nsp);
var ks__$1 = ((typeof ks === 'string')?clojure.string.trim(ks):ks);
if(cljs.core.truth_((function (){var and__4251__auto__ = ks__$1;
if(cljs.core.truth_(and__4251__auto__)){
return ((typeof ks__$1 === 'string') && (clojure.string.starts_with_QMARK_(ks__$1,":")));
} else {
return and__4251__auto__;
}
})())){
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$2(nsp__$1,cljs.core.subs.cljs$core$IFn$_invoke$arity$2(ks__$1,(1)));
} else {
return ks__$1;
}
}));

(transplants.transforms.unstring_key.cljs$lang$maxFixedArity = 2);


//# sourceMappingURL=transplants.transforms.js.map
