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
var _STAR_always_update_STAR__orig_val__61153 = reagent.impl.util._STAR_always_update_STAR_;
var _STAR_always_update_STAR__temp_val__61154 = true;
(reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__temp_val__61154);

try{return module$node_modules$react_dom$index.render((comp.cljs$core$IFn$_invoke$arity$0 ? comp.cljs$core$IFn$_invoke$arity$0() : comp.call(null)),container,(function (){
var _STAR_always_update_STAR__orig_val__61155 = reagent.impl.util._STAR_always_update_STAR_;
var _STAR_always_update_STAR__temp_val__61156 = false;
(reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__temp_val__61156);

try{cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(reagent.dom.roots,cljs.core.assoc,container,comp);

reagent.impl.batching.flush_after_render();

if((!((callback == null)))){
return (callback.cljs$core$IFn$_invoke$arity$0 ? callback.cljs$core$IFn$_invoke$arity$0() : callback.call(null));
} else {
return null;
}
}finally {(reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__orig_val__61155);
}}));
}finally {(reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__orig_val__61153);
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
var G__61164 = arguments.length;
switch (G__61164) {
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

var vec__61165 = ((cljs.core.fn_QMARK_(callback_or_compiler))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent.impl.template.default_compiler,callback_or_compiler], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [callback_or_compiler,new cljs.core.Keyword(null,"callback","callback",-705136228).cljs$core$IFn$_invoke$arity$1(callback_or_compiler)], null));
var compiler = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61165,(0),null);
var callback = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61165,(1),null);
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

var seq__61171_61198 = cljs.core.seq(cljs.core.deref(reagent.dom.roots));
var chunk__61172_61199 = null;
var count__61173_61200 = (0);
var i__61174_61201 = (0);
while(true){
if((i__61174_61201 < count__61173_61200)){
var vec__61182_61202 = chunk__61172_61199.cljs$core$IIndexed$_nth$arity$2(null,i__61174_61201);
var container_61203 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61182_61202,(0),null);
var comp_61204 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61182_61202,(1),null);
reagent.dom.re_render_component(comp_61204,container_61203);


var G__61206 = seq__61171_61198;
var G__61207 = chunk__61172_61199;
var G__61208 = count__61173_61200;
var G__61209 = (i__61174_61201 + (1));
seq__61171_61198 = G__61206;
chunk__61172_61199 = G__61207;
count__61173_61200 = G__61208;
i__61174_61201 = G__61209;
continue;
} else {
var temp__5753__auto___61210 = cljs.core.seq(seq__61171_61198);
if(temp__5753__auto___61210){
var seq__61171_61211__$1 = temp__5753__auto___61210;
if(cljs.core.chunked_seq_QMARK_(seq__61171_61211__$1)){
var c__4679__auto___61212 = cljs.core.chunk_first(seq__61171_61211__$1);
var G__61213 = cljs.core.chunk_rest(seq__61171_61211__$1);
var G__61214 = c__4679__auto___61212;
var G__61215 = cljs.core.count(c__4679__auto___61212);
var G__61216 = (0);
seq__61171_61198 = G__61213;
chunk__61172_61199 = G__61214;
count__61173_61200 = G__61215;
i__61174_61201 = G__61216;
continue;
} else {
var vec__61186_61217 = cljs.core.first(seq__61171_61211__$1);
var container_61218 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61186_61217,(0),null);
var comp_61219 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61186_61217,(1),null);
reagent.dom.re_render_component(comp_61219,container_61218);


var G__61220 = cljs.core.next(seq__61171_61211__$1);
var G__61221 = null;
var G__61222 = (0);
var G__61223 = (0);
seq__61171_61198 = G__61220;
chunk__61172_61199 = G__61221;
count__61173_61200 = G__61222;
i__61174_61201 = G__61223;
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
