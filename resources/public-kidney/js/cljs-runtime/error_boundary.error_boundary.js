goog.provide('error_boundary.error_boundary');
/**
 *  See https://lilac.town/writing/modern-react-in-cljs-error-boundaries/ for Reactv16
 */
error_boundary.error_boundary.err_boundary = (function error_boundary$error_boundary$err_boundary(var_args){
var args__4870__auto__ = [];
var len__4864__auto___69235 = arguments.length;
var i__4865__auto___69236 = (0);
while(true){
if((i__4865__auto___69236 < len__4864__auto___69235)){
args__4870__auto__.push((arguments[i__4865__auto___69236]));

var G__69237 = (i__4865__auto___69236 + (1));
i__4865__auto___69236 = G__69237;
continue;
} else {
}
break;
}

var argseq__4871__auto__ = ((((0) < args__4870__auto__.length))?(new cljs.core.IndexedSeq(args__4870__auto__.slice((0)),(0),null)):null);
return error_boundary.error_boundary.err_boundary.cljs$core$IFn$_invoke$arity$variadic(argseq__4871__auto__);
});

(error_boundary.error_boundary.err_boundary.cljs$core$IFn$_invoke$arity$variadic = (function (_children){
var err_state = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
return reagent.core.create_class.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"display-name","display-name",694513143),"ErrBoundary",new cljs.core.Keyword(null,"component-did-catch","component-did-catch",652725810),(function (err,info){
return cljs.core.reset_BANG_(err_state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [err,info], null));
}),new cljs.core.Keyword(null,"get-derived-state-from-error","get-derived-state-from-error",1473896468),(function (err){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"The error is ",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([err], 0))], null);
}),new cljs.core.Keyword(null,"reagent-render","reagent-render",-985383853),(function() { 
var G__69238__delegate = function (children){
if((cljs.core.deref(err_state) == null)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"<>","<>",1280186386)], null),children);
} else {
var vec__69232 = cljs.core.deref(err_state);
var err = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69232,(0),null);
var info = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69232,(1),null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"<>","<>",1280186386),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pre","pre",2118456869),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"code","code",1586293142),cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([info], 0))], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pre","pre",2118456869),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"code","code",1586293142),cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([err], 0))], null)], null)], null);
}
};
var G__69238 = function (var_args){
var children = null;
if (arguments.length > 0) {
var G__69239__i = 0, G__69239__a = new Array(arguments.length -  0);
while (G__69239__i < G__69239__a.length) {G__69239__a[G__69239__i] = arguments[G__69239__i + 0]; ++G__69239__i;}
  children = new cljs.core.IndexedSeq(G__69239__a,0,null);
} 
return G__69238__delegate.call(this,children);};
G__69238.cljs$lang$maxFixedArity = 0;
G__69238.cljs$lang$applyTo = (function (arglist__69240){
var children = cljs.core.seq(arglist__69240);
return G__69238__delegate(children);
});
G__69238.cljs$core$IFn$_invoke$arity$variadic = G__69238__delegate;
return G__69238;
})()
], null));
}));

(error_boundary.error_boundary.err_boundary.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(error_boundary.error_boundary.err_boundary.cljs$lang$applyTo = (function (seq69231){
var self__4852__auto__ = this;
return self__4852__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq69231));
}));


//# sourceMappingURL=error_boundary.error_boundary.js.map
