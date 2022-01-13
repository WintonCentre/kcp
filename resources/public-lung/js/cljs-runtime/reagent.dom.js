goog.provide('reagent.dom');
var module$node_modules$react_dom$index=shadow.js.require("module$node_modules$react_dom$index", {});
if((typeof reagent !== 'undefined') && (typeof reagent.dom !== 'undefined') && (typeof reagent.dom.roots !== 'undefined')){
} else {
reagent.dom.roots = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
}
reagent.dom.unmount_comp = (function reagent$dom$unmount_comp(container){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(reagent.dom.roots,cljs.core.dissoc,container);

return module$node_modules$react_dom$index.unmountComponentAtNode(container);
});
reagent.dom.render_comp = (function reagent$dom$render_comp(comp,container,callback){
var _STAR_always_update_STAR__orig_val__77579 = reagent.impl.util._STAR_always_update_STAR_;
var _STAR_always_update_STAR__temp_val__77580 = true;
(reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__temp_val__77580);

try{return module$node_modules$react_dom$index.render((comp.cljs$core$IFn$_invoke$arity$0 ? comp.cljs$core$IFn$_invoke$arity$0() : comp.call(null)),container,(function (){
var _STAR_always_update_STAR__orig_val__77581 = reagent.impl.util._STAR_always_update_STAR_;
var _STAR_always_update_STAR__temp_val__77583 = false;
(reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__temp_val__77583);

try{cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(reagent.dom.roots,cljs.core.assoc,container,comp);

reagent.impl.batching.flush_after_render();

if((!((callback == null)))){
return (callback.cljs$core$IFn$_invoke$arity$0 ? callback.cljs$core$IFn$_invoke$arity$0() : callback.call(null));
} else {
return null;
}
}finally {(reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__orig_val__77581);
}}));
}finally {(reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__orig_val__77579);
}});
reagent.dom.re_render_component = (function reagent$dom$re_render_component(comp,container){
return reagent.dom.render_comp(comp,container,null);
});
/**
 * Render a Reagent component into the DOM. The first argument may be
 *   either a vector (using Reagent's Hiccup syntax), or a React element.
 *   The second argument should be a DOM node.
 * 
 *   Optionally takes a callback that is called when the component is in place.
 * 
 *   Returns the mounted component instance.
 */
reagent.dom.render = (function reagent$dom$render(var_args){
var G__77592 = arguments.length;
switch (G__77592) {
case 2:
return reagent.dom.render.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return reagent.dom.render.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(reagent.dom.render.cljs$core$IFn$_invoke$arity$2 = (function (comp,container){
return reagent.dom.render.cljs$core$IFn$_invoke$arity$3(comp,container,reagent.impl.template.default_compiler);
}));

(reagent.dom.render.cljs$core$IFn$_invoke$arity$3 = (function (comp,container,callback_or_compiler){
reagent.ratom.flush_BANG_();

var vec__77595 = ((cljs.core.fn_QMARK_(callback_or_compiler))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent.impl.template.default_compiler,callback_or_compiler], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [callback_or_compiler,new cljs.core.Keyword(null,"callback","callback",-705136228).cljs$core$IFn$_invoke$arity$1(callback_or_compiler)], null));
var compiler = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77595,(0),null);
var callback = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77595,(1),null);
var f = (function (){
return reagent.impl.protocols.as_element(compiler,((cljs.core.fn_QMARK_(comp))?(comp.cljs$core$IFn$_invoke$arity$0 ? comp.cljs$core$IFn$_invoke$arity$0() : comp.call(null)):comp));
});
return reagent.dom.render_comp(f,container,callback);
}));

(reagent.dom.render.cljs$lang$maxFixedArity = 3);

/**
 * Remove a component from the given DOM node.
 */
reagent.dom.unmount_component_at_node = (function reagent$dom$unmount_component_at_node(container){
return reagent.dom.unmount_comp(container);
});
/**
 * Returns the root DOM node of a mounted component.
 */
reagent.dom.dom_node = (function reagent$dom$dom_node(this$){
return module$node_modules$react_dom$index.findDOMNode(this$);
});
/**
 * Force re-rendering of all mounted Reagent components. This is
 *   probably only useful in a development environment, when you want to
 *   update components in response to some dynamic changes to code.
 * 
 *   Note that force-update-all may not update root components. This
 *   happens if a component 'foo' is mounted with `(render [foo])` (since
 *   functions are passed by value, and not by reference, in
 *   ClojureScript). To get around this you'll have to introduce a layer
 *   of indirection, for example by using `(render [#'foo])` instead.
 */
reagent.dom.force_update_all = (function reagent$dom$force_update_all(){
reagent.ratom.flush_BANG_();

var seq__77600_77619 = cljs.core.seq(cljs.core.deref(reagent.dom.roots));
var chunk__77601_77620 = null;
var count__77602_77621 = (0);
var i__77603_77622 = (0);
while(true){
if((i__77603_77622 < count__77602_77621)){
var vec__77612_77623 = chunk__77601_77620.cljs$core$IIndexed$_nth$arity$2(null,i__77603_77622);
var container_77624 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77612_77623,(0),null);
var comp_77625 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77612_77623,(1),null);
reagent.dom.re_render_component(comp_77625,container_77624);


var G__77626 = seq__77600_77619;
var G__77627 = chunk__77601_77620;
var G__77628 = count__77602_77621;
var G__77629 = (i__77603_77622 + (1));
seq__77600_77619 = G__77626;
chunk__77601_77620 = G__77627;
count__77602_77621 = G__77628;
i__77603_77622 = G__77629;
continue;
} else {
var temp__5753__auto___77630 = cljs.core.seq(seq__77600_77619);
if(temp__5753__auto___77630){
var seq__77600_77631__$1 = temp__5753__auto___77630;
if(cljs.core.chunked_seq_QMARK_(seq__77600_77631__$1)){
var c__4679__auto___77632 = cljs.core.chunk_first(seq__77600_77631__$1);
var G__77633 = cljs.core.chunk_rest(seq__77600_77631__$1);
var G__77634 = c__4679__auto___77632;
var G__77635 = cljs.core.count(c__4679__auto___77632);
var G__77636 = (0);
seq__77600_77619 = G__77633;
chunk__77601_77620 = G__77634;
count__77602_77621 = G__77635;
i__77603_77622 = G__77636;
continue;
} else {
var vec__77615_77637 = cljs.core.first(seq__77600_77631__$1);
var container_77638 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77615_77637,(0),null);
var comp_77639 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77615_77637,(1),null);
reagent.dom.re_render_component(comp_77639,container_77638);


var G__77640 = cljs.core.next(seq__77600_77631__$1);
var G__77641 = null;
var G__77642 = (0);
var G__77643 = (0);
seq__77600_77619 = G__77640;
chunk__77601_77620 = G__77641;
count__77602_77621 = G__77642;
i__77603_77622 = G__77643;
continue;
}
} else {
}
}
break;
}

return reagent.impl.batching.flush_after_render();
});

//# sourceMappingURL=reagent.dom.js.map
