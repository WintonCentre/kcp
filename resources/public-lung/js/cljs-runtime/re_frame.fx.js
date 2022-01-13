goog.provide('re_frame.fx');
re_frame.fx.kind = new cljs.core.Keyword(null,"fx","fx",-1237829572);
if(cljs.core.truth_((re_frame.registrar.kinds.cljs$core$IFn$_invoke$arity$1 ? re_frame.registrar.kinds.cljs$core$IFn$_invoke$arity$1(re_frame.fx.kind) : re_frame.registrar.kinds.call(null,re_frame.fx.kind)))){
} else {
throw (new Error("Assert failed: (re-frame.registrar/kinds kind)"));
}
re_frame.fx.reg_fx = (function re_frame$fx$reg_fx(id,handler){
return re_frame.registrar.register_handler(re_frame.fx.kind,id,handler);
});
/**
 * An interceptor whose `:after` actions the contents of `:effects`. As a result,
 *   this interceptor is Domino 3.
 * 
 *   This interceptor is silently added (by reg-event-db etc) to the front of
 *   interceptor chains for all events.
 * 
 *   For each key in `:effects` (a map), it calls the registered `effects handler`
 *   (see `reg-fx` for registration of effect handlers).
 * 
 *   So, if `:effects` was:
 *    {:dispatch  [:hello 42]
 *     :db        {...}
 *     :undo      "set flag"}
 * 
 *   it will call the registered effect handlers for each of the map's keys:
 *   `:dispatch`, `:undo` and `:db`. When calling each handler, provides the map
 *   value for that key - so in the example above the effect handler for :dispatch
 *   will be given one arg `[:hello 42]`.
 * 
 *   You cannot rely on the ordering in which effects are executed, other than that
 *   `:db` is guaranteed to be executed first.
 */
re_frame.fx.do_fx = re_frame.interceptor.__GT_interceptor.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"id","id",-1388402092),new cljs.core.Keyword(null,"do-fx","do-fx",1194163050),new cljs.core.Keyword(null,"after","after",594996914),(function re_frame$fx$do_fx_after(context){
if(re_frame.trace.is_trace_enabled_QMARK_()){
var _STAR_current_trace_STAR__orig_val__78011 = re_frame.trace._STAR_current_trace_STAR_;
var _STAR_current_trace_STAR__temp_val__78012 = re_frame.trace.start_trace(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"op-type","op-type",-1636141668),new cljs.core.Keyword("event","do-fx","event/do-fx",1357330452)], null));
(re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__temp_val__78012);

try{try{var effects = new cljs.core.Keyword(null,"effects","effects",-282369292).cljs$core$IFn$_invoke$arity$1(context);
var effects_without_db = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(effects,new cljs.core.Keyword(null,"db","db",993250759));
var temp__5753__auto___78110 = new cljs.core.Keyword(null,"db","db",993250759).cljs$core$IFn$_invoke$arity$1(effects);
if(cljs.core.truth_(temp__5753__auto___78110)){
var new_db_78111 = temp__5753__auto___78110;
var fexpr__78013_78112 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,new cljs.core.Keyword(null,"db","db",993250759),false);
(fexpr__78013_78112.cljs$core$IFn$_invoke$arity$1 ? fexpr__78013_78112.cljs$core$IFn$_invoke$arity$1(new_db_78111) : fexpr__78013_78112.call(null,new_db_78111));
} else {
}

var seq__78014 = cljs.core.seq(effects_without_db);
var chunk__78015 = null;
var count__78016 = (0);
var i__78017 = (0);
while(true){
if((i__78017 < count__78016)){
var vec__78030 = chunk__78015.cljs$core$IIndexed$_nth$arity$2(null,i__78017);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78030,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78030,(1),null);
var temp__5751__auto___78113 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5751__auto___78113)){
var effect_fn_78114 = temp__5751__auto___78113;
(effect_fn_78114.cljs$core$IFn$_invoke$arity$1 ? effect_fn_78114.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_78114.call(null,effect_value));
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: no handler registered for effect:",effect_key,". Ignoring."], 0));
}


var G__78115 = seq__78014;
var G__78116 = chunk__78015;
var G__78117 = count__78016;
var G__78118 = (i__78017 + (1));
seq__78014 = G__78115;
chunk__78015 = G__78116;
count__78016 = G__78117;
i__78017 = G__78118;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__78014);
if(temp__5753__auto__){
var seq__78014__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__78014__$1)){
var c__4679__auto__ = cljs.core.chunk_first(seq__78014__$1);
var G__78119 = cljs.core.chunk_rest(seq__78014__$1);
var G__78120 = c__4679__auto__;
var G__78121 = cljs.core.count(c__4679__auto__);
var G__78122 = (0);
seq__78014 = G__78119;
chunk__78015 = G__78120;
count__78016 = G__78121;
i__78017 = G__78122;
continue;
} else {
var vec__78037 = cljs.core.first(seq__78014__$1);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78037,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78037,(1),null);
var temp__5751__auto___78123 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5751__auto___78123)){
var effect_fn_78124 = temp__5751__auto___78123;
(effect_fn_78124.cljs$core$IFn$_invoke$arity$1 ? effect_fn_78124.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_78124.call(null,effect_value));
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: no handler registered for effect:",effect_key,". Ignoring."], 0));
}


var G__78125 = cljs.core.next(seq__78014__$1);
var G__78126 = null;
var G__78127 = (0);
var G__78128 = (0);
seq__78014 = G__78125;
chunk__78015 = G__78126;
count__78016 = G__78127;
i__78017 = G__78128;
continue;
}
} else {
return null;
}
}
break;
}
}finally {if(re_frame.trace.is_trace_enabled_QMARK_()){
var end__48548__auto___78129 = re_frame.interop.now();
var duration__48549__auto___78130 = (end__48548__auto___78129 - new cljs.core.Keyword(null,"start","start",-355208981).cljs$core$IFn$_invoke$arity$1(re_frame.trace._STAR_current_trace_STAR_));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(re_frame.trace.traces,cljs.core.conj,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"duration","duration",1444101068),duration__48549__auto___78130,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"end","end",-268185958),re_frame.interop.now()], 0)));

re_frame.trace.run_tracing_callbacks_BANG_(end__48548__auto___78129);
} else {
}
}}finally {(re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__orig_val__78011);
}} else {
var effects = new cljs.core.Keyword(null,"effects","effects",-282369292).cljs$core$IFn$_invoke$arity$1(context);
var effects_without_db = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(effects,new cljs.core.Keyword(null,"db","db",993250759));
var temp__5753__auto___78131 = new cljs.core.Keyword(null,"db","db",993250759).cljs$core$IFn$_invoke$arity$1(effects);
if(cljs.core.truth_(temp__5753__auto___78131)){
var new_db_78132 = temp__5753__auto___78131;
var fexpr__78040_78133 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,new cljs.core.Keyword(null,"db","db",993250759),false);
(fexpr__78040_78133.cljs$core$IFn$_invoke$arity$1 ? fexpr__78040_78133.cljs$core$IFn$_invoke$arity$1(new_db_78132) : fexpr__78040_78133.call(null,new_db_78132));
} else {
}

var seq__78041 = cljs.core.seq(effects_without_db);
var chunk__78042 = null;
var count__78043 = (0);
var i__78044 = (0);
while(true){
if((i__78044 < count__78043)){
var vec__78055 = chunk__78042.cljs$core$IIndexed$_nth$arity$2(null,i__78044);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78055,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78055,(1),null);
var temp__5751__auto___78134 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5751__auto___78134)){
var effect_fn_78136 = temp__5751__auto___78134;
(effect_fn_78136.cljs$core$IFn$_invoke$arity$1 ? effect_fn_78136.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_78136.call(null,effect_value));
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: no handler registered for effect:",effect_key,". Ignoring."], 0));
}


var G__78138 = seq__78041;
var G__78139 = chunk__78042;
var G__78140 = count__78043;
var G__78141 = (i__78044 + (1));
seq__78041 = G__78138;
chunk__78042 = G__78139;
count__78043 = G__78140;
i__78044 = G__78141;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__78041);
if(temp__5753__auto__){
var seq__78041__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__78041__$1)){
var c__4679__auto__ = cljs.core.chunk_first(seq__78041__$1);
var G__78142 = cljs.core.chunk_rest(seq__78041__$1);
var G__78143 = c__4679__auto__;
var G__78144 = cljs.core.count(c__4679__auto__);
var G__78145 = (0);
seq__78041 = G__78142;
chunk__78042 = G__78143;
count__78043 = G__78144;
i__78044 = G__78145;
continue;
} else {
var vec__78060 = cljs.core.first(seq__78041__$1);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78060,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78060,(1),null);
var temp__5751__auto___78146 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5751__auto___78146)){
var effect_fn_78147 = temp__5751__auto___78146;
(effect_fn_78147.cljs$core$IFn$_invoke$arity$1 ? effect_fn_78147.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_78147.call(null,effect_value));
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: no handler registered for effect:",effect_key,". Ignoring."], 0));
}


var G__78149 = cljs.core.next(seq__78041__$1);
var G__78150 = null;
var G__78151 = (0);
var G__78152 = (0);
seq__78041 = G__78149;
chunk__78042 = G__78150;
count__78043 = G__78151;
i__78044 = G__78152;
continue;
}
} else {
return null;
}
}
break;
}
}
})], 0));
re_frame.fx.dispatch_later = (function re_frame$fx$dispatch_later(p__78071){
var map__78072 = p__78071;
var map__78072__$1 = cljs.core.__destructure_map(map__78072);
var effect = map__78072__$1;
var ms = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__78072__$1,new cljs.core.Keyword(null,"ms","ms",-1152709733));
var dispatch = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__78072__$1,new cljs.core.Keyword(null,"dispatch","dispatch",1319337009));
if(((cljs.core.empty_QMARK_(dispatch)) || ((!(typeof ms === 'number'))))){
return re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"error","error",-978969032),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: ignoring bad :dispatch-later value:",effect], 0));
} else {
return re_frame.interop.set_timeout_BANG_((function (){
return re_frame.router.dispatch(dispatch);
}),ms);
}
});
re_frame.fx.reg_fx(new cljs.core.Keyword(null,"dispatch-later","dispatch-later",291951390),(function (value){
if(cljs.core.map_QMARK_(value)){
return re_frame.fx.dispatch_later(value);
} else {
var seq__78073 = cljs.core.seq(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,value));
var chunk__78074 = null;
var count__78075 = (0);
var i__78076 = (0);
while(true){
if((i__78076 < count__78075)){
var effect = chunk__78074.cljs$core$IIndexed$_nth$arity$2(null,i__78076);
re_frame.fx.dispatch_later(effect);


var G__78155 = seq__78073;
var G__78156 = chunk__78074;
var G__78157 = count__78075;
var G__78158 = (i__78076 + (1));
seq__78073 = G__78155;
chunk__78074 = G__78156;
count__78075 = G__78157;
i__78076 = G__78158;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__78073);
if(temp__5753__auto__){
var seq__78073__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__78073__$1)){
var c__4679__auto__ = cljs.core.chunk_first(seq__78073__$1);
var G__78159 = cljs.core.chunk_rest(seq__78073__$1);
var G__78160 = c__4679__auto__;
var G__78161 = cljs.core.count(c__4679__auto__);
var G__78162 = (0);
seq__78073 = G__78159;
chunk__78074 = G__78160;
count__78075 = G__78161;
i__78076 = G__78162;
continue;
} else {
var effect = cljs.core.first(seq__78073__$1);
re_frame.fx.dispatch_later(effect);


var G__78163 = cljs.core.next(seq__78073__$1);
var G__78164 = null;
var G__78165 = (0);
var G__78166 = (0);
seq__78073 = G__78163;
chunk__78074 = G__78164;
count__78075 = G__78165;
i__78076 = G__78166;
continue;
}
} else {
return null;
}
}
break;
}
}
}));
re_frame.fx.reg_fx(new cljs.core.Keyword(null,"fx","fx",-1237829572),(function (seq_of_effects){
if((!(cljs.core.sequential_QMARK_(seq_of_effects)))){
return re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"error","error",-978969032),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: \":fx\" effect expects a seq, but was given ",cljs.core.type(seq_of_effects)], 0));
} else {
var seq__78077 = cljs.core.seq(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,seq_of_effects));
var chunk__78078 = null;
var count__78079 = (0);
var i__78080 = (0);
while(true){
if((i__78080 < count__78079)){
var vec__78089 = chunk__78078.cljs$core$IIndexed$_nth$arity$2(null,i__78080);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78089,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78089,(1),null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"db","db",993250759),effect_key)){
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: \":fx\" effect should not contain a :db effect"], 0));
} else {
}

var temp__5751__auto___78167 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5751__auto___78167)){
var effect_fn_78168 = temp__5751__auto___78167;
(effect_fn_78168.cljs$core$IFn$_invoke$arity$1 ? effect_fn_78168.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_78168.call(null,effect_value));
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: in \":fx\" effect found ",effect_key," which has no associated handler. Ignoring."], 0));
}


var G__78169 = seq__78077;
var G__78170 = chunk__78078;
var G__78171 = count__78079;
var G__78172 = (i__78080 + (1));
seq__78077 = G__78169;
chunk__78078 = G__78170;
count__78079 = G__78171;
i__78080 = G__78172;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__78077);
if(temp__5753__auto__){
var seq__78077__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__78077__$1)){
var c__4679__auto__ = cljs.core.chunk_first(seq__78077__$1);
var G__78173 = cljs.core.chunk_rest(seq__78077__$1);
var G__78174 = c__4679__auto__;
var G__78175 = cljs.core.count(c__4679__auto__);
var G__78176 = (0);
seq__78077 = G__78173;
chunk__78078 = G__78174;
count__78079 = G__78175;
i__78080 = G__78176;
continue;
} else {
var vec__78094 = cljs.core.first(seq__78077__$1);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78094,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78094,(1),null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"db","db",993250759),effect_key)){
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: \":fx\" effect should not contain a :db effect"], 0));
} else {
}

var temp__5751__auto___78177 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5751__auto___78177)){
var effect_fn_78178 = temp__5751__auto___78177;
(effect_fn_78178.cljs$core$IFn$_invoke$arity$1 ? effect_fn_78178.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_78178.call(null,effect_value));
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: in \":fx\" effect found ",effect_key," which has no associated handler. Ignoring."], 0));
}


var G__78179 = cljs.core.next(seq__78077__$1);
var G__78180 = null;
var G__78181 = (0);
var G__78182 = (0);
seq__78077 = G__78179;
chunk__78078 = G__78180;
count__78079 = G__78181;
i__78080 = G__78182;
continue;
}
} else {
return null;
}
}
break;
}
}
}));
re_frame.fx.reg_fx(new cljs.core.Keyword(null,"dispatch","dispatch",1319337009),(function (value){
if((!(cljs.core.vector_QMARK_(value)))){
return re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"error","error",-978969032),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: ignoring bad :dispatch value. Expected a vector, but got:",value], 0));
} else {
return re_frame.router.dispatch(value);
}
}));
re_frame.fx.reg_fx(new cljs.core.Keyword(null,"dispatch-n","dispatch-n",-504469236),(function (value){
if((!(cljs.core.sequential_QMARK_(value)))){
return re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"error","error",-978969032),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: ignoring bad :dispatch-n value. Expected a collection, but got:",value], 0));
} else {
var seq__78099 = cljs.core.seq(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,value));
var chunk__78100 = null;
var count__78101 = (0);
var i__78102 = (0);
while(true){
if((i__78102 < count__78101)){
var event = chunk__78100.cljs$core$IIndexed$_nth$arity$2(null,i__78102);
re_frame.router.dispatch(event);


var G__78183 = seq__78099;
var G__78184 = chunk__78100;
var G__78185 = count__78101;
var G__78186 = (i__78102 + (1));
seq__78099 = G__78183;
chunk__78100 = G__78184;
count__78101 = G__78185;
i__78102 = G__78186;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__78099);
if(temp__5753__auto__){
var seq__78099__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__78099__$1)){
var c__4679__auto__ = cljs.core.chunk_first(seq__78099__$1);
var G__78187 = cljs.core.chunk_rest(seq__78099__$1);
var G__78188 = c__4679__auto__;
var G__78189 = cljs.core.count(c__4679__auto__);
var G__78190 = (0);
seq__78099 = G__78187;
chunk__78100 = G__78188;
count__78101 = G__78189;
i__78102 = G__78190;
continue;
} else {
var event = cljs.core.first(seq__78099__$1);
re_frame.router.dispatch(event);


var G__78191 = cljs.core.next(seq__78099__$1);
var G__78192 = null;
var G__78193 = (0);
var G__78194 = (0);
seq__78099 = G__78191;
chunk__78100 = G__78192;
count__78101 = G__78193;
i__78102 = G__78194;
continue;
}
} else {
return null;
}
}
break;
}
}
}));
re_frame.fx.reg_fx(new cljs.core.Keyword(null,"deregister-event-handler","deregister-event-handler",-1096518994),(function (value){
var clear_event = cljs.core.partial.cljs$core$IFn$_invoke$arity$2(re_frame.registrar.clear_handlers,re_frame.events.kind);
if(cljs.core.sequential_QMARK_(value)){
var seq__78105 = cljs.core.seq(value);
var chunk__78106 = null;
var count__78107 = (0);
var i__78108 = (0);
while(true){
if((i__78108 < count__78107)){
var event = chunk__78106.cljs$core$IIndexed$_nth$arity$2(null,i__78108);
clear_event(event);


var G__78195 = seq__78105;
var G__78196 = chunk__78106;
var G__78197 = count__78107;
var G__78198 = (i__78108 + (1));
seq__78105 = G__78195;
chunk__78106 = G__78196;
count__78107 = G__78197;
i__78108 = G__78198;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__78105);
if(temp__5753__auto__){
var seq__78105__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__78105__$1)){
var c__4679__auto__ = cljs.core.chunk_first(seq__78105__$1);
var G__78200 = cljs.core.chunk_rest(seq__78105__$1);
var G__78201 = c__4679__auto__;
var G__78202 = cljs.core.count(c__4679__auto__);
var G__78203 = (0);
seq__78105 = G__78200;
chunk__78106 = G__78201;
count__78107 = G__78202;
i__78108 = G__78203;
continue;
} else {
var event = cljs.core.first(seq__78105__$1);
clear_event(event);


var G__78204 = cljs.core.next(seq__78105__$1);
var G__78205 = null;
var G__78206 = (0);
var G__78207 = (0);
seq__78105 = G__78204;
chunk__78106 = G__78205;
count__78107 = G__78206;
i__78108 = G__78207;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return clear_event(value);
}
}));
re_frame.fx.reg_fx(new cljs.core.Keyword(null,"db","db",993250759),(function (value){
if((!((cljs.core.deref(re_frame.db.app_db) === value)))){
return cljs.core.reset_BANG_(re_frame.db.app_db,value);
} else {
return null;
}
}));

//# sourceMappingURL=re_frame.fx.js.map
