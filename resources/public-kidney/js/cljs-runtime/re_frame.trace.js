goog.provide('re_frame.trace');
re_frame.trace.id = cljs.core.atom.cljs$core$IFn$_invoke$arity$1((0));
re_frame.trace._STAR_current_trace_STAR_ = null;
re_frame.trace.reset_tracing_BANG_ = (function re_frame$trace$reset_tracing_BANG_(){
return cljs.core.reset_BANG_(re_frame.trace.id,(0));
});
/**
 * @define {boolean}
 */
re_frame.trace.trace_enabled_QMARK_ = goog.define("re_frame.trace.trace_enabled_QMARK_",false);
/**
 * See https://groups.google.com/d/msg/clojurescript/jk43kmYiMhA/IHglVr_TPdgJ for more details
 */
re_frame.trace.is_trace_enabled_QMARK_ = (function re_frame$trace$is_trace_enabled_QMARK_(){
return re_frame.trace.trace_enabled_QMARK_;
});
re_frame.trace.trace_cbs = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
if((typeof re_frame !== 'undefined') && (typeof re_frame.trace !== 'undefined') && (typeof re_frame.trace.traces !== 'undefined')){
} else {
re_frame.trace.traces = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
}
if((typeof re_frame !== 'undefined') && (typeof re_frame.trace !== 'undefined') && (typeof re_frame.trace.next_delivery !== 'undefined')){
} else {
re_frame.trace.next_delivery = cljs.core.atom.cljs$core$IFn$_invoke$arity$1((0));
}
/**
 * Registers a tracing callback function which will receive a collection of one or more traces.
 *   Will replace an existing callback function if it shares the same key.
 */
re_frame.trace.register_trace_cb = (function re_frame$trace$register_trace_cb(key,f){
if(re_frame.trace.trace_enabled_QMARK_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(re_frame.trace.trace_cbs,cljs.core.assoc,key,f);
} else {
return re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Tracing is not enabled. Please set {\"re_frame.trace.trace_enabled_QMARK_\" true} in :closure-defines. See: https://github.com/day8/re-frame-10x#installation."], 0));
}
});
re_frame.trace.remove_trace_cb = (function re_frame$trace$remove_trace_cb(key){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(re_frame.trace.trace_cbs,cljs.core.dissoc,key);

return null;
});
re_frame.trace.next_id = (function re_frame$trace$next_id(){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(re_frame.trace.id,cljs.core.inc);
});
re_frame.trace.start_trace = (function re_frame$trace$start_trace(p__61692){
var map__61693 = p__61692;
var map__61693__$1 = cljs.core.__destructure_map(map__61693);
var operation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__61693__$1,new cljs.core.Keyword(null,"operation","operation",-1267664310));
var op_type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__61693__$1,new cljs.core.Keyword(null,"op-type","op-type",-1636141668));
var tags = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__61693__$1,new cljs.core.Keyword(null,"tags","tags",1771418977));
var child_of = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__61693__$1,new cljs.core.Keyword(null,"child-of","child-of",-903376662));
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"id","id",-1388402092),re_frame.trace.next_id(),new cljs.core.Keyword(null,"operation","operation",-1267664310),operation,new cljs.core.Keyword(null,"op-type","op-type",-1636141668),op_type,new cljs.core.Keyword(null,"tags","tags",1771418977),tags,new cljs.core.Keyword(null,"child-of","child-of",-903376662),(function (){var or__4253__auto__ = child_of;
if(cljs.core.truth_(or__4253__auto__)){
return or__4253__auto__;
} else {
return new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(re_frame.trace._STAR_current_trace_STAR_);
}
})(),new cljs.core.Keyword(null,"start","start",-355208981),re_frame.interop.now()], null);
});
re_frame.trace.debounce_time = (50);
re_frame.trace.debounce = (function re_frame$trace$debounce(f,interval){
return goog.functions.debounce(f,interval);
});
re_frame.trace.schedule_debounce = re_frame.trace.debounce((function re_frame$trace$tracing_cb_debounced(){
var seq__61702_61747 = cljs.core.seq(cljs.core.deref(re_frame.trace.trace_cbs));
var chunk__61703_61748 = null;
var count__61704_61749 = (0);
var i__61705_61750 = (0);
while(true){
if((i__61705_61750 < count__61704_61749)){
var vec__61725_61751 = chunk__61703_61748.cljs$core$IIndexed$_nth$arity$2(null,i__61705_61750);
var k_61752 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61725_61751,(0),null);
var cb_61753 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61725_61751,(1),null);
try{var G__61732_61754 = cljs.core.deref(re_frame.trace.traces);
(cb_61753.cljs$core$IFn$_invoke$arity$1 ? cb_61753.cljs$core$IFn$_invoke$arity$1(G__61732_61754) : cb_61753.call(null,G__61732_61754));
}catch (e61731){var e_61755 = e61731;
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"error","error",-978969032),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Error thrown from trace cb",k_61752,"while storing",cljs.core.deref(re_frame.trace.traces),e_61755], 0));
}

var G__61756 = seq__61702_61747;
var G__61757 = chunk__61703_61748;
var G__61758 = count__61704_61749;
var G__61759 = (i__61705_61750 + (1));
seq__61702_61747 = G__61756;
chunk__61703_61748 = G__61757;
count__61704_61749 = G__61758;
i__61705_61750 = G__61759;
continue;
} else {
var temp__5753__auto___61760 = cljs.core.seq(seq__61702_61747);
if(temp__5753__auto___61760){
var seq__61702_61761__$1 = temp__5753__auto___61760;
if(cljs.core.chunked_seq_QMARK_(seq__61702_61761__$1)){
var c__4679__auto___61762 = cljs.core.chunk_first(seq__61702_61761__$1);
var G__61763 = cljs.core.chunk_rest(seq__61702_61761__$1);
var G__61764 = c__4679__auto___61762;
var G__61765 = cljs.core.count(c__4679__auto___61762);
var G__61766 = (0);
seq__61702_61747 = G__61763;
chunk__61703_61748 = G__61764;
count__61704_61749 = G__61765;
i__61705_61750 = G__61766;
continue;
} else {
var vec__61733_61767 = cljs.core.first(seq__61702_61761__$1);
var k_61768 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61733_61767,(0),null);
var cb_61769 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__61733_61767,(1),null);
try{var G__61737_61770 = cljs.core.deref(re_frame.trace.traces);
(cb_61769.cljs$core$IFn$_invoke$arity$1 ? cb_61769.cljs$core$IFn$_invoke$arity$1(G__61737_61770) : cb_61769.call(null,G__61737_61770));
}catch (e61736){var e_61771 = e61736;
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"error","error",-978969032),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Error thrown from trace cb",k_61768,"while storing",cljs.core.deref(re_frame.trace.traces),e_61771], 0));
}

var G__61772 = cljs.core.next(seq__61702_61761__$1);
var G__61773 = null;
var G__61774 = (0);
var G__61775 = (0);
seq__61702_61747 = G__61772;
chunk__61703_61748 = G__61773;
count__61704_61749 = G__61774;
i__61705_61750 = G__61775;
continue;
}
} else {
}
}
break;
}

return cljs.core.reset_BANG_(re_frame.trace.traces,cljs.core.PersistentVector.EMPTY);
}),re_frame.trace.debounce_time);
re_frame.trace.run_tracing_callbacks_BANG_ = (function re_frame$trace$run_tracing_callbacks_BANG_(now){
if(((cljs.core.deref(re_frame.trace.next_delivery) - (25)) < now)){
(re_frame.trace.schedule_debounce.cljs$core$IFn$_invoke$arity$0 ? re_frame.trace.schedule_debounce.cljs$core$IFn$_invoke$arity$0() : re_frame.trace.schedule_debounce.call(null));

return cljs.core.reset_BANG_(re_frame.trace.next_delivery,(now + re_frame.trace.debounce_time));
} else {
return null;
}
});

//# sourceMappingURL=re_frame.trace.js.map
