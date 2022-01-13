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
var _STAR_current_trace_STAR__orig_val__62135 = re_frame.trace._STAR_current_trace_STAR_;
var _STAR_current_trace_STAR__temp_val__62136 = re_frame.trace.start_trace(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"op-type","op-type",-1636141668),new cljs.core.Keyword("event","do-fx","event/do-fx",1357330452)], null));
(re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__temp_val__62136);

try{try{var effects = new cljs.core.Keyword(null,"effects","effects",-282369292).cljs$core$IFn$_invoke$arity$1(context);
var effects_without_db = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(effects,new cljs.core.Keyword(null,"db","db",993250759));
var temp__5753__auto___62278 = new cljs.core.Keyword(null,"db","db",993250759).cljs$core$IFn$_invoke$arity$1(effects);
if(cljs.core.truth_(temp__5753__auto___62278)){
var new_db_62279 = temp__5753__auto___62278;
var fexpr__62137_62280 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,new cljs.core.Keyword(null,"db","db",993250759),false);
(fexpr__62137_62280.cljs$core$IFn$_invoke$arity$1 ? fexpr__62137_62280.cljs$core$IFn$_invoke$arity$1(new_db_62279) : fexpr__62137_62280.call(null,new_db_62279));
} else {
}

var seq__62138 = cljs.core.seq(effects_without_db);
var chunk__62139 = null;
var count__62140 = (0);
var i__62141 = (0);
while(true){
if((i__62141 < count__62140)){
var vec__62154 = chunk__62139.cljs$core$IIndexed$_nth$arity$2(null,i__62141);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62154,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62154,(1),null);
var temp__5751__auto___62281 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5751__auto___62281)){
var effect_fn_62282 = temp__5751__auto___62281;
(effect_fn_62282.cljs$core$IFn$_invoke$arity$1 ? effect_fn_62282.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_62282.call(null,effect_value));
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: no handler registered for effect:",effect_key,". Ignoring."], 0));
}


var G__62283 = seq__62138;
var G__62284 = chunk__62139;
var G__62285 = count__62140;
var G__62286 = (i__62141 + (1));
seq__62138 = G__62283;
chunk__62139 = G__62284;
count__62140 = G__62285;
i__62141 = G__62286;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__62138);
if(temp__5753__auto__){
var seq__62138__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__62138__$1)){
var c__4679__auto__ = cljs.core.chunk_first(seq__62138__$1);
var G__62287 = cljs.core.chunk_rest(seq__62138__$1);
var G__62288 = c__4679__auto__;
var G__62289 = cljs.core.count(c__4679__auto__);
var G__62290 = (0);
seq__62138 = G__62287;
chunk__62139 = G__62288;
count__62140 = G__62289;
i__62141 = G__62290;
continue;
} else {
var vec__62157 = cljs.core.first(seq__62138__$1);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62157,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62157,(1),null);
var temp__5751__auto___62291 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5751__auto___62291)){
var effect_fn_62292 = temp__5751__auto___62291;
(effect_fn_62292.cljs$core$IFn$_invoke$arity$1 ? effect_fn_62292.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_62292.call(null,effect_value));
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: no handler registered for effect:",effect_key,". Ignoring."], 0));
}


var G__62293 = cljs.core.next(seq__62138__$1);
var G__62294 = null;
var G__62295 = (0);
var G__62296 = (0);
seq__62138 = G__62293;
chunk__62139 = G__62294;
count__62140 = G__62295;
i__62141 = G__62296;
continue;
}
} else {
return null;
}
}
break;
}
}finally {if(re_frame.trace.is_trace_enabled_QMARK_()){
var end__48548__auto___62297 = re_frame.interop.now();
var duration__48549__auto___62298 = (end__48548__auto___62297 - new cljs.core.Keyword(null,"start","start",-355208981).cljs$core$IFn$_invoke$arity$1(re_frame.trace._STAR_current_trace_STAR_));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(re_frame.trace.traces,cljs.core.conj,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"duration","duration",1444101068),duration__48549__auto___62298,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"end","end",-268185958),re_frame.interop.now()], 0)));

re_frame.trace.run_tracing_callbacks_BANG_(end__48548__auto___62297);
} else {
}
}}finally {(re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__orig_val__62135);
}} else {
var effects = new cljs.core.Keyword(null,"effects","effects",-282369292).cljs$core$IFn$_invoke$arity$1(context);
var effects_without_db = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(effects,new cljs.core.Keyword(null,"db","db",993250759));
var temp__5753__auto___62303 = new cljs.core.Keyword(null,"db","db",993250759).cljs$core$IFn$_invoke$arity$1(effects);
if(cljs.core.truth_(temp__5753__auto___62303)){
var new_db_62304 = temp__5753__auto___62303;
var fexpr__62160_62305 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,new cljs.core.Keyword(null,"db","db",993250759),false);
(fexpr__62160_62305.cljs$core$IFn$_invoke$arity$1 ? fexpr__62160_62305.cljs$core$IFn$_invoke$arity$1(new_db_62304) : fexpr__62160_62305.call(null,new_db_62304));
} else {
}

var seq__62162 = cljs.core.seq(effects_without_db);
var chunk__62163 = null;
var count__62164 = (0);
var i__62165 = (0);
while(true){
if((i__62165 < count__62164)){
var vec__62177 = chunk__62163.cljs$core$IIndexed$_nth$arity$2(null,i__62165);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62177,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62177,(1),null);
var temp__5751__auto___62306 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5751__auto___62306)){
var effect_fn_62307 = temp__5751__auto___62306;
(effect_fn_62307.cljs$core$IFn$_invoke$arity$1 ? effect_fn_62307.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_62307.call(null,effect_value));
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: no handler registered for effect:",effect_key,". Ignoring."], 0));
}


var G__62308 = seq__62162;
var G__62309 = chunk__62163;
var G__62310 = count__62164;
var G__62311 = (i__62165 + (1));
seq__62162 = G__62308;
chunk__62163 = G__62309;
count__62164 = G__62310;
i__62165 = G__62311;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__62162);
if(temp__5753__auto__){
var seq__62162__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__62162__$1)){
var c__4679__auto__ = cljs.core.chunk_first(seq__62162__$1);
var G__62312 = cljs.core.chunk_rest(seq__62162__$1);
var G__62313 = c__4679__auto__;
var G__62314 = cljs.core.count(c__4679__auto__);
var G__62315 = (0);
seq__62162 = G__62312;
chunk__62163 = G__62313;
count__62164 = G__62314;
i__62165 = G__62315;
continue;
} else {
var vec__62182 = cljs.core.first(seq__62162__$1);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62182,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62182,(1),null);
var temp__5751__auto___62316 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5751__auto___62316)){
var effect_fn_62317 = temp__5751__auto___62316;
(effect_fn_62317.cljs$core$IFn$_invoke$arity$1 ? effect_fn_62317.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_62317.call(null,effect_value));
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: no handler registered for effect:",effect_key,". Ignoring."], 0));
}


var G__62318 = cljs.core.next(seq__62162__$1);
var G__62319 = null;
var G__62320 = (0);
var G__62321 = (0);
seq__62162 = G__62318;
chunk__62163 = G__62319;
count__62164 = G__62320;
i__62165 = G__62321;
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
re_frame.fx.dispatch_later = (function re_frame$fx$dispatch_later(p__62188){
var map__62189 = p__62188;
var map__62189__$1 = cljs.core.__destructure_map(map__62189);
var effect = map__62189__$1;
var ms = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__62189__$1,new cljs.core.Keyword(null,"ms","ms",-1152709733));
var dispatch = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__62189__$1,new cljs.core.Keyword(null,"dispatch","dispatch",1319337009));
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
var seq__62195 = cljs.core.seq(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,value));
var chunk__62196 = null;
var count__62197 = (0);
var i__62198 = (0);
while(true){
if((i__62198 < count__62197)){
var effect = chunk__62196.cljs$core$IIndexed$_nth$arity$2(null,i__62198);
re_frame.fx.dispatch_later(effect);


var G__62322 = seq__62195;
var G__62323 = chunk__62196;
var G__62324 = count__62197;
var G__62325 = (i__62198 + (1));
seq__62195 = G__62322;
chunk__62196 = G__62323;
count__62197 = G__62324;
i__62198 = G__62325;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__62195);
if(temp__5753__auto__){
var seq__62195__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__62195__$1)){
var c__4679__auto__ = cljs.core.chunk_first(seq__62195__$1);
var G__62330 = cljs.core.chunk_rest(seq__62195__$1);
var G__62331 = c__4679__auto__;
var G__62332 = cljs.core.count(c__4679__auto__);
var G__62333 = (0);
seq__62195 = G__62330;
chunk__62196 = G__62331;
count__62197 = G__62332;
i__62198 = G__62333;
continue;
} else {
var effect = cljs.core.first(seq__62195__$1);
re_frame.fx.dispatch_later(effect);


var G__62334 = cljs.core.next(seq__62195__$1);
var G__62335 = null;
var G__62336 = (0);
var G__62337 = (0);
seq__62195 = G__62334;
chunk__62196 = G__62335;
count__62197 = G__62336;
i__62198 = G__62337;
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
var seq__62202 = cljs.core.seq(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,seq_of_effects));
var chunk__62204 = null;
var count__62206 = (0);
var i__62207 = (0);
while(true){
if((i__62207 < count__62206)){
var vec__62217 = chunk__62204.cljs$core$IIndexed$_nth$arity$2(null,i__62207);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62217,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62217,(1),null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"db","db",993250759),effect_key)){
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: \":fx\" effect should not contain a :db effect"], 0));
} else {
}

var temp__5751__auto___62338 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5751__auto___62338)){
var effect_fn_62339 = temp__5751__auto___62338;
(effect_fn_62339.cljs$core$IFn$_invoke$arity$1 ? effect_fn_62339.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_62339.call(null,effect_value));
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: in \":fx\" effect found ",effect_key," which has no associated handler. Ignoring."], 0));
}


var G__62340 = seq__62202;
var G__62341 = chunk__62204;
var G__62342 = count__62206;
var G__62343 = (i__62207 + (1));
seq__62202 = G__62340;
chunk__62204 = G__62341;
count__62206 = G__62342;
i__62207 = G__62343;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__62202);
if(temp__5753__auto__){
var seq__62202__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__62202__$1)){
var c__4679__auto__ = cljs.core.chunk_first(seq__62202__$1);
var G__62344 = cljs.core.chunk_rest(seq__62202__$1);
var G__62345 = c__4679__auto__;
var G__62346 = cljs.core.count(c__4679__auto__);
var G__62347 = (0);
seq__62202 = G__62344;
chunk__62204 = G__62345;
count__62206 = G__62346;
i__62207 = G__62347;
continue;
} else {
var vec__62220 = cljs.core.first(seq__62202__$1);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62220,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62220,(1),null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"db","db",993250759),effect_key)){
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: \":fx\" effect should not contain a :db effect"], 0));
} else {
}

var temp__5751__auto___62348 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5751__auto___62348)){
var effect_fn_62349 = temp__5751__auto___62348;
(effect_fn_62349.cljs$core$IFn$_invoke$arity$1 ? effect_fn_62349.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_62349.call(null,effect_value));
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: in \":fx\" effect found ",effect_key," which has no associated handler. Ignoring."], 0));
}


var G__62350 = cljs.core.next(seq__62202__$1);
var G__62351 = null;
var G__62352 = (0);
var G__62353 = (0);
seq__62202 = G__62350;
chunk__62204 = G__62351;
count__62206 = G__62352;
i__62207 = G__62353;
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
var seq__62224 = cljs.core.seq(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,value));
var chunk__62225 = null;
var count__62226 = (0);
var i__62227 = (0);
while(true){
if((i__62227 < count__62226)){
var event = chunk__62225.cljs$core$IIndexed$_nth$arity$2(null,i__62227);
re_frame.router.dispatch(event);


var G__62354 = seq__62224;
var G__62355 = chunk__62225;
var G__62356 = count__62226;
var G__62357 = (i__62227 + (1));
seq__62224 = G__62354;
chunk__62225 = G__62355;
count__62226 = G__62356;
i__62227 = G__62357;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__62224);
if(temp__5753__auto__){
var seq__62224__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__62224__$1)){
var c__4679__auto__ = cljs.core.chunk_first(seq__62224__$1);
var G__62358 = cljs.core.chunk_rest(seq__62224__$1);
var G__62359 = c__4679__auto__;
var G__62360 = cljs.core.count(c__4679__auto__);
var G__62361 = (0);
seq__62224 = G__62358;
chunk__62225 = G__62359;
count__62226 = G__62360;
i__62227 = G__62361;
continue;
} else {
var event = cljs.core.first(seq__62224__$1);
re_frame.router.dispatch(event);


var G__62363 = cljs.core.next(seq__62224__$1);
var G__62364 = null;
var G__62365 = (0);
var G__62366 = (0);
seq__62224 = G__62363;
chunk__62225 = G__62364;
count__62226 = G__62365;
i__62227 = G__62366;
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
var seq__62231 = cljs.core.seq(value);
var chunk__62236 = null;
var count__62237 = (0);
var i__62238 = (0);
while(true){
if((i__62238 < count__62237)){
var event = chunk__62236.cljs$core$IIndexed$_nth$arity$2(null,i__62238);
clear_event(event);


var G__62367 = seq__62231;
var G__62368 = chunk__62236;
var G__62369 = count__62237;
var G__62370 = (i__62238 + (1));
seq__62231 = G__62367;
chunk__62236 = G__62368;
count__62237 = G__62369;
i__62238 = G__62370;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__62231);
if(temp__5753__auto__){
var seq__62231__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__62231__$1)){
var c__4679__auto__ = cljs.core.chunk_first(seq__62231__$1);
var G__62371 = cljs.core.chunk_rest(seq__62231__$1);
var G__62372 = c__4679__auto__;
var G__62373 = cljs.core.count(c__4679__auto__);
var G__62374 = (0);
seq__62231 = G__62371;
chunk__62236 = G__62372;
count__62237 = G__62373;
i__62238 = G__62374;
continue;
} else {
var event = cljs.core.first(seq__62231__$1);
clear_event(event);


var G__62375 = cljs.core.next(seq__62231__$1);
var G__62376 = null;
var G__62377 = (0);
var G__62378 = (0);
seq__62231 = G__62375;
chunk__62236 = G__62376;
count__62237 = G__62377;
i__62238 = G__62378;
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
