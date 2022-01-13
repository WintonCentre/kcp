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
var len__4864__auto___68490 = arguments.length;
var i__4865__auto___68491 = (0);
while(true){
if((i__4865__auto___68491 < len__4864__auto___68490)){
args__4870__auto__.push((arguments[i__4865__auto___68491]));

var G__68492 = (i__4865__auto___68491 + (1));
i__4865__auto___68491 = G__68492;
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
var G__68493__delegate = function (children){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,selector,more),children);
};
var G__68493 = function (var_args){
var children = null;
if (arguments.length > 0) {
var G__68494__i = 0, G__68494__a = new Array(arguments.length -  0);
while (G__68494__i < G__68494__a.length) {G__68494__a[G__68494__i] = arguments[G__68494__i + 0]; ++G__68494__i;}
  children = new cljs.core.IndexedSeq(G__68494__a,0,null);
} 
return G__68493__delegate.call(this,children);};
G__68493.cljs$lang$maxFixedArity = 0;
G__68493.cljs$lang$applyTo = (function (arglist__68495){
var children = cljs.core.seq(arglist__68495);
return G__68493__delegate(children);
});
G__68493.cljs$core$IFn$_invoke$arity$variadic = G__68493__delegate;
return G__68493;
})()
;
}
}));

(garden.stylesheet.rule.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(garden.stylesheet.rule.cljs$lang$applyTo = (function (seq68463){
var G__68464 = cljs.core.first(seq68463);
var seq68463__$1 = cljs.core.next(seq68463);
var self__4851__auto__ = this;
return self__4851__auto__.cljs$core$IFn$_invoke$arity$variadic(G__68464,seq68463__$1);
}));

garden.stylesheet.cssfn = (function garden$stylesheet$cssfn(fn_name){
return (function() { 
var G__68496__delegate = function (args){
return (new garden.types.CSSFunction(fn_name,args,null,null,null));
};
var G__68496 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__68497__i = 0, G__68497__a = new Array(arguments.length -  0);
while (G__68497__i < G__68497__a.length) {G__68497__a[G__68497__i] = arguments[G__68497__i + 0]; ++G__68497__i;}
  args = new cljs.core.IndexedSeq(G__68497__a,0,null);
} 
return G__68496__delegate.call(this,args);};
G__68496.cljs$lang$maxFixedArity = 0;
G__68496.cljs$lang$applyTo = (function (arglist__68498){
var args = cljs.core.seq(arglist__68498);
return G__68496__delegate(args);
});
G__68496.cljs$core$IFn$_invoke$arity$variadic = G__68496__delegate;
return G__68496;
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
var len__4864__auto___68499 = arguments.length;
var i__4865__auto___68500 = (0);
while(true){
if((i__4865__auto___68500 < len__4864__auto___68499)){
args__4870__auto__.push((arguments[i__4865__auto___68500]));

var G__68501 = (i__4865__auto___68500 + (1));
i__4865__auto___68500 = G__68501;
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
(garden.stylesheet.at_font_face.cljs$lang$applyTo = (function (seq68465){
var self__4852__auto__ = this;
return self__4852__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq68465));
}));

/**
 * Create a CSS @import rule.
 */
garden.stylesheet.at_import = (function garden$stylesheet$at_import(var_args){
var G__68473 = arguments.length;
switch (G__68473) {
case 1:
return garden.stylesheet.at_import.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
var args_arr__4885__auto__ = [];
var len__4864__auto___68503 = arguments.length;
var i__4865__auto___68504 = (0);
while(true){
if((i__4865__auto___68504 < len__4864__auto___68503)){
args_arr__4885__auto__.push((arguments[i__4865__auto___68504]));

var G__68505 = (i__4865__auto___68504 + (1));
i__4865__auto___68504 = G__68505;
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
(garden.stylesheet.at_import.cljs$lang$applyTo = (function (seq68467){
var G__68469 = cljs.core.first(seq68467);
var seq68467__$1 = cljs.core.next(seq68467);
var self__4851__auto__ = this;
return self__4851__auto__.cljs$core$IFn$_invoke$arity$variadic(G__68469,seq68467__$1);
}));

(garden.stylesheet.at_import.cljs$lang$maxFixedArity = (1));

/**
 * Create a CSS @media rule.
 */
garden.stylesheet.at_media = (function garden$stylesheet$at_media(var_args){
var args__4870__auto__ = [];
var len__4864__auto___68510 = arguments.length;
var i__4865__auto___68511 = (0);
while(true){
if((i__4865__auto___68511 < len__4864__auto___68510)){
args__4870__auto__.push((arguments[i__4865__auto___68511]));

var G__68512 = (i__4865__auto___68511 + (1));
i__4865__auto___68511 = G__68512;
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
(garden.stylesheet.at_media.cljs$lang$applyTo = (function (seq68479){
var G__68484 = cljs.core.first(seq68479);
var seq68479__$1 = cljs.core.next(seq68479);
var self__4851__auto__ = this;
return self__4851__auto__.cljs$core$IFn$_invoke$arity$variadic(G__68484,seq68479__$1);
}));

/**
 * Create a CSS @keyframes rule.
 */
garden.stylesheet.at_keyframes = (function garden$stylesheet$at_keyframes(var_args){
var args__4870__auto__ = [];
var len__4864__auto___68513 = arguments.length;
var i__4865__auto___68514 = (0);
while(true){
if((i__4865__auto___68514 < len__4864__auto___68513)){
args__4870__auto__.push((arguments[i__4865__auto___68514]));

var G__68515 = (i__4865__auto___68514 + (1));
i__4865__auto___68514 = G__68515;
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
(garden.stylesheet.at_keyframes.cljs$lang$applyTo = (function (seq68485){
var G__68486 = cljs.core.first(seq68485);
var seq68485__$1 = cljs.core.next(seq68485);
var self__4851__auto__ = this;
return self__4851__auto__.cljs$core$IFn$_invoke$arity$variadic(G__68486,seq68485__$1);
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
