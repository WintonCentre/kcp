goog.provide('garden.stylesheet');
/**
 * Create a rule function for the given selector. The `selector`
 *   argument must be valid selector (ie. a keyword, string, or symbol).
 *   Additional arguments may consist of extra selectors or
 *   declarations.
 * 
 *   The returned function accepts any number of arguments which represent
 *   the rule's children.
 * 
 *   Ex.
 *    (let [text-field (rule "[type="text"])]
 *     (text-field {:border ["1px" :solid "black"]}))
 *    ;; => ["[type="text"] {:boder ["1px" :solid "black"]}]
 */
garden.stylesheet.rule = (function garden$stylesheet$rule(var_args){
var args__4870__auto__ = [];
var len__4864__auto___82459 = arguments.length;
var i__4865__auto___82460 = (0);
while(true){
if((i__4865__auto___82460 < len__4864__auto___82459)){
args__4870__auto__.push((arguments[i__4865__auto___82460]));

var G__82461 = (i__4865__auto___82460 + (1));
i__4865__auto___82460 = G__82461;
continue;
} else {
}
break;
}

var argseq__4871__auto__ = ((((1) < args__4870__auto__.length))?(new cljs.core.IndexedSeq(args__4870__auto__.slice((1)),(0),null)):null);
return garden.stylesheet.rule.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4871__auto__);
});

(garden.stylesheet.rule.cljs$core$IFn$_invoke$arity$variadic = (function (selector,more){
if((!((((selector instanceof cljs.core.Keyword)) || (((typeof selector === 'string') || ((selector instanceof cljs.core.Symbol)))))))){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("Selector must be either a keyword, string, or symbol.",cljs.core.PersistentArrayMap.EMPTY);
} else {
return (function() { 
var G__82462__delegate = function (children){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,selector,more),children);
};
var G__82462 = function (var_args){
var children = null;
if (arguments.length > 0) {
var G__82463__i = 0, G__82463__a = new Array(arguments.length -  0);
while (G__82463__i < G__82463__a.length) {G__82463__a[G__82463__i] = arguments[G__82463__i + 0]; ++G__82463__i;}
  children = new cljs.core.IndexedSeq(G__82463__a,0,null);
} 
return G__82462__delegate.call(this,children);};
G__82462.cljs$lang$maxFixedArity = 0;
G__82462.cljs$lang$applyTo = (function (arglist__82464){
var children = cljs.core.seq(arglist__82464);
return G__82462__delegate(children);
});
G__82462.cljs$core$IFn$_invoke$arity$variadic = G__82462__delegate;
return G__82462;
})()
;
}
}));

(garden.stylesheet.rule.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(garden.stylesheet.rule.cljs$lang$applyTo = (function (seq82438){
var G__82439 = cljs.core.first(seq82438);
var seq82438__$1 = cljs.core.next(seq82438);
var self__4851__auto__ = this;
return self__4851__auto__.cljs$core$IFn$_invoke$arity$variadic(G__82439,seq82438__$1);
}));

garden.stylesheet.cssfn = (function garden$stylesheet$cssfn(fn_name){
return (function() { 
var G__82465__delegate = function (args){
return (new garden.types.CSSFunction(fn_name,args,null,null,null));
};
var G__82465 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__82466__i = 0, G__82466__a = new Array(arguments.length -  0);
while (G__82466__i < G__82466__a.length) {G__82466__a[G__82466__i] = arguments[G__82466__i + 0]; ++G__82466__i;}
  args = new cljs.core.IndexedSeq(G__82466__a,0,null);
} 
return G__82465__delegate.call(this,args);};
G__82465.cljs$lang$maxFixedArity = 0;
G__82465.cljs$lang$applyTo = (function (arglist__82467){
var args = cljs.core.seq(arglist__82467);
return G__82465__delegate(args);
});
G__82465.cljs$core$IFn$_invoke$arity$variadic = G__82465__delegate;
return G__82465;
})()
;
});
garden.stylesheet.at_rule = (function garden$stylesheet$at_rule(identifier,value){
return (new garden.types.CSSAtRule(identifier,value,null,null,null));
});
/**
 * Create a CSS @font-face rule.
 */
garden.stylesheet.at_font_face = (function garden$stylesheet$at_font_face(var_args){
var args__4870__auto__ = [];
var len__4864__auto___82468 = arguments.length;
var i__4865__auto___82469 = (0);
while(true){
if((i__4865__auto___82469 < len__4864__auto___82468)){
args__4870__auto__.push((arguments[i__4865__auto___82469]));

var G__82470 = (i__4865__auto___82469 + (1));
i__4865__auto___82469 = G__82470;
continue;
} else {
}
break;
}

var argseq__4871__auto__ = ((((0) < args__4870__auto__.length))?(new cljs.core.IndexedSeq(args__4870__auto__.slice((0)),(0),null)):null);
return garden.stylesheet.at_font_face.cljs$core$IFn$_invoke$arity$variadic(argseq__4871__auto__);
});

(garden.stylesheet.at_font_face.cljs$core$IFn$_invoke$arity$variadic = (function (font_properties){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["@font-face",font_properties], null);
}));

(garden.stylesheet.at_font_face.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(garden.stylesheet.at_font_face.cljs$lang$applyTo = (function (seq82450){
var self__4852__auto__ = this;
return self__4852__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq82450));
}));

/**
 * Create a CSS @import rule.
 */
garden.stylesheet.at_import = (function garden$stylesheet$at_import(var_args){
var G__82454 = arguments.length;
switch (G__82454) {
case 1:
return garden.stylesheet.at_import.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
var args_arr__4885__auto__ = [];
var len__4864__auto___82472 = arguments.length;
var i__4865__auto___82473 = (0);
while(true){
if((i__4865__auto___82473 < len__4864__auto___82472)){
args_arr__4885__auto__.push((arguments[i__4865__auto___82473]));

var G__82474 = (i__4865__auto___82473 + (1));
i__4865__auto___82473 = G__82474;
continue;
} else {
}
break;
}

var argseq__4886__auto__ = (new cljs.core.IndexedSeq(args_arr__4885__auto__.slice((1)),(0),null));
return garden.stylesheet.at_import.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4886__auto__);

}
});

(garden.stylesheet.at_import.cljs$core$IFn$_invoke$arity$1 = (function (url){
return garden.stylesheet.at_rule(new cljs.core.Keyword(null,"import","import",-1399500709),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"url","url",276297046),url,new cljs.core.Keyword(null,"media-queries","media-queries",-1563277678),null], null));
}));

(garden.stylesheet.at_import.cljs$core$IFn$_invoke$arity$variadic = (function (url,media_queries){
return garden.stylesheet.at_rule(new cljs.core.Keyword(null,"import","import",-1399500709),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"url","url",276297046),url,new cljs.core.Keyword(null,"media-queries","media-queries",-1563277678),media_queries], null));
}));

/** @this {Function} */
(garden.stylesheet.at_import.cljs$lang$applyTo = (function (seq82452){
var G__82453 = cljs.core.first(seq82452);
var seq82452__$1 = cljs.core.next(seq82452);
var self__4851__auto__ = this;
return self__4851__auto__.cljs$core$IFn$_invoke$arity$variadic(G__82453,seq82452__$1);
}));

(garden.stylesheet.at_import.cljs$lang$maxFixedArity = (1));

/**
 * Create a CSS @media rule.
 */
garden.stylesheet.at_media = (function garden$stylesheet$at_media(var_args){
var args__4870__auto__ = [];
var len__4864__auto___82475 = arguments.length;
var i__4865__auto___82476 = (0);
while(true){
if((i__4865__auto___82476 < len__4864__auto___82475)){
args__4870__auto__.push((arguments[i__4865__auto___82476]));

var G__82477 = (i__4865__auto___82476 + (1));
i__4865__auto___82476 = G__82477;
continue;
} else {
}
break;
}

var argseq__4871__auto__ = ((((1) < args__4870__auto__.length))?(new cljs.core.IndexedSeq(args__4870__auto__.slice((1)),(0),null)):null);
return garden.stylesheet.at_media.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4871__auto__);
});

(garden.stylesheet.at_media.cljs$core$IFn$_invoke$arity$variadic = (function (media_queries,rules){
return garden.stylesheet.at_rule(new cljs.core.Keyword(null,"media","media",-1066138403),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"media-queries","media-queries",-1563277678),media_queries,new cljs.core.Keyword(null,"rules","rules",1198912366),rules], null));
}));

(garden.stylesheet.at_media.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(garden.stylesheet.at_media.cljs$lang$applyTo = (function (seq82455){
var G__82456 = cljs.core.first(seq82455);
var seq82455__$1 = cljs.core.next(seq82455);
var self__4851__auto__ = this;
return self__4851__auto__.cljs$core$IFn$_invoke$arity$variadic(G__82456,seq82455__$1);
}));

/**
 * Create a CSS @keyframes rule.
 */
garden.stylesheet.at_keyframes = (function garden$stylesheet$at_keyframes(var_args){
var args__4870__auto__ = [];
var len__4864__auto___82478 = arguments.length;
var i__4865__auto___82479 = (0);
while(true){
if((i__4865__auto___82479 < len__4864__auto___82478)){
args__4870__auto__.push((arguments[i__4865__auto___82479]));

var G__82480 = (i__4865__auto___82479 + (1));
i__4865__auto___82479 = G__82480;
continue;
} else {
}
break;
}

var argseq__4871__auto__ = ((((1) < args__4870__auto__.length))?(new cljs.core.IndexedSeq(args__4870__auto__.slice((1)),(0),null)):null);
return garden.stylesheet.at_keyframes.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4871__auto__);
});

(garden.stylesheet.at_keyframes.cljs$core$IFn$_invoke$arity$variadic = (function (identifier,frames){
return garden.stylesheet.at_rule(new cljs.core.Keyword(null,"keyframes","keyframes",-1437976012),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"identifier","identifier",-805503498),identifier,new cljs.core.Keyword(null,"frames","frames",1765687497),frames], null));
}));

(garden.stylesheet.at_keyframes.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(garden.stylesheet.at_keyframes.cljs$lang$applyTo = (function (seq82457){
var G__82458 = cljs.core.first(seq82457);
var seq82457__$1 = cljs.core.next(seq82457);
var self__4851__auto__ = this;
return self__4851__auto__.cljs$core$IFn$_invoke$arity$variadic(G__82458,seq82457__$1);
}));

/**
 * Create a color from RGB values.
 */
garden.stylesheet.rgb = (function garden$stylesheet$rgb(r,g,b){
return garden.color.rgb.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [r,g,b], null));
});
/**
 * Create a color from HSL values.
 */
garden.stylesheet.hsl = (function garden$stylesheet$hsl(h,s,l){
return garden.color.hsl.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [h,s,l], null));
});

//# sourceMappingURL=garden.stylesheet.js.map
