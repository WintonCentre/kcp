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
var G__59088__delegate = function (args){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"warn","warn",-436710552)], null),cljs.core.conj,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,args)], 0));
};
var G__59088 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__59089__i = 0, G__59089__a = new Array(arguments.length -  0);
while (G__59089__i < G__59089__a.length) {G__59089__a[G__59089__i] = arguments[G__59089__i + 0]; ++G__59089__i;}
  args = new cljs.core.IndexedSeq(G__59089__a,0,null);
} 
return G__59088__delegate.call(this,args);};
G__59088.cljs$lang$maxFixedArity = 0;
G__59088.cljs$lang$applyTo = (function (arglist__59090){
var args = cljs.core.seq(arglist__59090);
return G__59088__delegate(args);
});
G__59088.cljs$core$IFn$_invoke$arity$variadic = G__59088__delegate;
return G__59088;
})()
);

(o.error = (function() { 
var G__59091__delegate = function (args){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"error","error",-978969032)], null),cljs.core.conj,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,args)], 0));
};
var G__59091 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__59092__i = 0, G__59092__a = new Array(arguments.length -  0);
while (G__59092__i < G__59092__a.length) {G__59092__a[G__59092__i] = arguments[G__59092__i + 0]; ++G__59092__i;}
  args = new cljs.core.IndexedSeq(G__59092__a,0,null);
} 
return G__59091__delegate.call(this,args);};
G__59091.cljs$lang$maxFixedArity = 0;
G__59091.cljs$lang$applyTo = (function (arglist__59093){
var args = cljs.core.seq(arglist__59093);
return G__59091__delegate(args);
});
G__59091.cljs$core$IFn$_invoke$arity$variadic = G__59091__delegate;
return G__59091;
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
