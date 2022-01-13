goog.provide('error_boundary.error_boundary');
/**
 *  See https://lilac.town/writing/modern-react-in-cljs-error-boundaries/ for Reactv16
 */
error_boundary.error_boundary.err_boundary = (function error_boundary$error_boundary$err_boundary(var_args){
var args__4870__auto__ = [];
var len__4864__auto___83173 = arguments.length;
var i__4865__auto___83174 = (0);
while(true){
if((i__4865__auto___83174 < len__4864__auto___83173)){
args__4870__auto__.push((arguments[i__4865__auto___83174]));

var G__83175 = (i__4865__auto___83174 + (1));
i__4865__auto___83174 = G__83175;
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
var G__83176__delegate = function (children){
if((cljs.core.deref(err_state) == null)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"<>","<>",1280186386)], null),children);
} else {
var vec__83170 = cljs.core.deref(err_state);
var err = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83170,(0),null);
var info = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83170,(1),null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"<>","<>",1280186386),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pre","pre",2118456869),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"code","code",1586293142),cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([info], 0))], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pre","pre",2118456869),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"code","code",1586293142),cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([err], 0))], null)], null)], null);
}
};
var G__83176 = function (var_args){
var children = null;
if (arguments.length > 0) {
var G__83177__i = 0, G__83177__a = new Array(arguments.length -  0);
while (G__83177__i < G__83177__a.length) {G__83177__a[G__83177__i] = arguments[G__83177__i + 0]; ++G__83177__i;}
  children = new cljs.core.IndexedSeq(G__83177__a,0,null);
} 
return G__83176__delegate.call(this,children);};
G__83176.cljs$lang$maxFixedArity = 0;
G__83176.cljs$lang$applyTo = (function (arglist__83178){
var children = cljs.core.seq(arglist__83178);
return G__83176__delegate(children);
});
G__83176.cljs$core$IFn$_invoke$arity$variadic = G__83176__delegate;
return G__83176;
})()
], null));
}));

(error_boundary.error_boundary.err_boundary.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(error_boundary.error_boundary.err_boundary.cljs$lang$applyTo = (function (seq83169){
var self__4852__auto__ = this;
return self__4852__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq83169));
}));


//# sourceMappingURL=error_boundary.error_boundary.js.map
