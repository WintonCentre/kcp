goog.provide('reagent.debug');
reagent.debug.has_console = (typeof console !== 'undefined');
reagent.debug.tracking = false;
if((typeof reagent !== 'undefined') && (typeof reagent.debug !== 'undefined') && (typeof reagent.debug.warnings !== 'undefined')){
} else {
reagent.debug.warnings = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
}
if((typeof reagent !== 'undefined') && (typeof reagent.debug !== 'undefined') && (typeof reagent.debug.track_console !== 'undefined')){
} else {
reagent.debug.track_console = (function (){var o = ({});
(o.warn = (function() { 
var G__77099__delegate = function (args){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"warn","warn",-436710552)], null),cljs.core.conj,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,args)], 0));
};
var G__77099 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__77100__i = 0, G__77100__a = new Array(arguments.length -  0);
while (G__77100__i < G__77100__a.length) {G__77100__a[G__77100__i] = arguments[G__77100__i + 0]; ++G__77100__i;}
  args = new cljs.core.IndexedSeq(G__77100__a,0,null);
} 
return G__77099__delegate.call(this,args);};
G__77099.cljs$lang$maxFixedArity = 0;
G__77099.cljs$lang$applyTo = (function (arglist__77101){
var args = cljs.core.seq(arglist__77101);
return G__77099__delegate(args);
});
G__77099.cljs$core$IFn$_invoke$arity$variadic = G__77099__delegate;
return G__77099;
})()
);

(o.error = (function() { 
var G__77102__delegate = function (args){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"error","error",-978969032)], null),cljs.core.conj,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,args)], 0));
};
var G__77102 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__77104__i = 0, G__77104__a = new Array(arguments.length -  0);
while (G__77104__i < G__77104__a.length) {G__77104__a[G__77104__i] = arguments[G__77104__i + 0]; ++G__77104__i;}
  args = new cljs.core.IndexedSeq(G__77104__a,0,null);
} 
return G__77102__delegate.call(this,args);};
G__77102.cljs$lang$maxFixedArity = 0;
G__77102.cljs$lang$applyTo = (function (arglist__77105){
var args = cljs.core.seq(arglist__77105);
return G__77102__delegate(args);
});
G__77102.cljs$core$IFn$_invoke$arity$variadic = G__77102__delegate;
return G__77102;
})()
);

return o;
})();
}
reagent.debug.track_warnings = (function reagent$debug$track_warnings(f){
(reagent.debug.tracking = true);

cljs.core.reset_BANG_(reagent.debug.warnings,null);

(f.cljs$core$IFn$_invoke$arity$0 ? f.cljs$core$IFn$_invoke$arity$0() : f.call(null));

var warns = cljs.core.deref(reagent.debug.warnings);
cljs.core.reset_BANG_(reagent.debug.warnings,null);

(reagent.debug.tracking = false);

return warns;
});

//# sourceMappingURL=reagent.debug.js.map
