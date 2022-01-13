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
re_frame.trace.start_trace = (function re_frame$trace$start_trace(p__77742){
var map__77743 = p__77742;
var map__77743__$1 = cljs.core.__destructure_map(map__77743);
var operation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__77743__$1,new cljs.core.Keyword(null,"operation","operation",-1267664310));
var op_type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__77743__$1,new cljs.core.Keyword(null,"op-type","op-type",-1636141668));
var tags = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__77743__$1,new cljs.core.Keyword(null,"tags","tags",1771418977));
var child_of = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__77743__$1,new cljs.core.Keyword(null,"child-of","child-of",-903376662));
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
var seq__77747_77779 = cljs.core.seq(cljs.core.deref(re_frame.trace.trace_cbs));
var chunk__77748_77780 = null;
var count__77749_77781 = (0);
var i__77750_77782 = (0);
while(true){
if((i__77750_77782 < count__77749_77781)){
var vec__77762_77783 = chunk__77748_77780.cljs$core$IIndexed$_nth$arity$2(null,i__77750_77782);
var k_77784 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77762_77783,(0),null);
var cb_77785 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77762_77783,(1),null);
try{var G__77766_77786 = cljs.core.deref(re_frame.trace.traces);
(cb_77785.cljs$core$IFn$_invoke$arity$1 ? cb_77785.cljs$core$IFn$_invoke$arity$1(G__77766_77786) : cb_77785.call(null,G__77766_77786));
}catch (e77765){var e_77787 = e77765;
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"error","error",-978969032),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Error thrown from trace cb",k_77784,"while storing",cljs.core.deref(re_frame.trace.traces),e_77787], 0));
}

var G__77788 = seq__77747_77779;
var G__77789 = chunk__77748_77780;
var G__77790 = count__77749_77781;
var G__77791 = (i__77750_77782 + (1));
seq__77747_77779 = G__77788;
chunk__77748_77780 = G__77789;
count__77749_77781 = G__77790;
i__77750_77782 = G__77791;
continue;
} else {
var temp__5753__auto___77792 = cljs.core.seq(seq__77747_77779);
if(temp__5753__auto___77792){
var seq__77747_77793__$1 = temp__5753__auto___77792;
if(cljs.core.chunked_seq_QMARK_(seq__77747_77793__$1)){
var c__4679__auto___77794 = cljs.core.chunk_first(seq__77747_77793__$1);
var G__77795 = cljs.core.chunk_rest(seq__77747_77793__$1);
var G__77796 = c__4679__auto___77794;
var G__77797 = cljs.core.count(c__4679__auto___77794);
var G__77798 = (0);
seq__77747_77779 = G__77795;
chunk__77748_77780 = G__77796;
count__77749_77781 = G__77797;
i__77750_77782 = G__77798;
continue;
} else {
var vec__77768_77800 = cljs.core.first(seq__77747_77793__$1);
var k_77801 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77768_77800,(0),null);
var cb_77802 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77768_77800,(1),null);
try{var G__77773_77803 = cljs.core.deref(re_frame.trace.traces);
(cb_77802.cljs$core$IFn$_invoke$arity$1 ? cb_77802.cljs$core$IFn$_invoke$arity$1(G__77773_77803) : cb_77802.call(null,G__77773_77803));
}catch (e77772){var e_77804 = e77772;
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"error","error",-978969032),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Error thrown from trace cb",k_77801,"while storing",cljs.core.deref(re_frame.trace.traces),e_77804], 0));
}

var G__77805 = cljs.core.next(seq__77747_77793__$1);
var G__77806 = null;
var G__77807 = (0);
var G__77808 = (0);
seq__77747_77779 = G__77805;
chunk__77748_77780 = G__77806;
count__77749_77781 = G__77807;
i__77750_77782 = G__77808;
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
