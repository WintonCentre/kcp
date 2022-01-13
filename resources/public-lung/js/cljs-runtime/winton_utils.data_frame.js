goog.provide('winton_utils.data_frame');
/**
 * Transpose a map of vectors to a vector of maps.
 *   Resulting vector will be truncated to the length of the shortest input vector.
 *   e.g. {:a [0 1 2] :b [10 11 12]} -> [{:a 0 :b 10} {:a 1 :b 11} {:a 2 :b 12}]
 */
winton_utils.data_frame.map_of_vs__GT_v_of_maps = (function winton_utils$data_frame$map_of_vs__GT_v_of_maps(k_vs){
if(cljs.core.seq(k_vs)){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (vs){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (k,v){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.nth.cljs$core$IFn$_invoke$arity$2(cljs.core.keys(k_vs),k),v], null);
}),vs));
}),cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.map,cljs.core.vector,cljs.core.vals(k_vs)));
} else {
if((k_vs == null)){
return null;
} else {
return cljs.core.PersistentVector.EMPTY;

}
}
});
/**
 * Transpose a vector of maps to a map of vectors.
 *   Resulting vector will be truncated to the length of the shortest input vector.
 *   e.g. [{:a 0 :b 10} {:a 1 :b 11} {:a 2 :b 12}] -> {:a [0 1 2] :b [10 11 12]}
 */
winton_utils.data_frame.v_of_maps__GT_map_of_vs = (function winton_utils$data_frame$v_of_maps__GT_map_of_vs(ms){
if(cljs.core.truth_(ms)){
var ks = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(cljs.core.keys,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([ms], 0)));
var vs = ((cljs.core.seq(ks))?cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.juxt,ks),ms):cljs.core.PersistentVector.EMPTY);
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (i,k){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (val){
return (val.cljs$core$IFn$_invoke$arity$1 ? val.cljs$core$IFn$_invoke$arity$1(i) : val.call(null,i));
}),vs)], null);
}),ks));
} else {
return null;
}
});
winton_utils.data_frame.cell_apply = (function winton_utils$data_frame$cell_apply(f){
return (function (p__81081){
var vec__81082 = p__81081;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81082,(0),null);
var vs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81082,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,cljs.core.map.cljs$core$IFn$_invoke$arity$2(f,vs)], null);
});
});
winton_utils.data_frame.cell_update = (function winton_utils$data_frame$cell_update(f){

return (function (p__81089){
var vec__81090 = p__81089;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81090,(0),null);
var vs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81090,(1),null);
var g = cljs.core.partial.cljs$core$IFn$_invoke$arity$2(f,k);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(g,vs)], null);
});
});
winton_utils.data_frame.cell_sums = (function winton_utils$data_frame$cell_sums(p__81094){
var vec__81095 = p__81094;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81095,(0),null);
var vs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81095,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,cljs.core.reductions.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,vs)], null);
});
winton_utils.data_frame.cell_diffs = (function winton_utils$data_frame$cell_diffs(initial){
return (function (p__81099){
var vec__81100 = p__81099;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81100,(0),null);
var vs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81100,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__81103){
var vec__81104 = p__81103;
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81104,(0),null);
var b = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81104,(1),null);
return (b - a);
}),cljs.core.partition.cljs$core$IFn$_invoke$arity$3((2),(1),cljs.core.cons(initial,vs)))], null);
});
});
/**
 * Apply a binary function to merge cells from the input dataframe with cells from df
 */
winton_utils.data_frame.cell_binary = (function winton_utils$data_frame$cell_binary(f,df){
return (function (p__81111){
var vec__81112 = p__81111;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81112,(0),null);
var vs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81112,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.completing.cljs$core$IFn$_invoke$arity$1(f),(k.cljs$core$IFn$_invoke$arity$1 ? k.cljs$core$IFn$_invoke$arity$1(df) : k.call(null,df)),vs)], null);
});
});
/**
 * Apply a binary function to merge cells from the input dataframe with cells from a seq
 */
winton_utils.data_frame.cell_binary_seq = (function winton_utils$data_frame$cell_binary_seq(f,cs){
return (function (p__81115){
var vec__81116 = p__81115;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81116,(0),null);
var vs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81116,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.completing.cljs$core$IFn$_invoke$arity$1(f),cs,vs)], null);
});
});

//# sourceMappingURL=winton_utils.data_frame.js.map
