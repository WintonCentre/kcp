goog.provide('shadow.remote.runtime.tap_support');
shadow.remote.runtime.tap_support.tap_subscribe = (function shadow$remote$runtime$tap_support$tap_subscribe(p__58425,p__58426){
var map__58428 = p__58425;
var map__58428__$1 = cljs.core.__destructure_map(map__58428);
var svc = map__58428__$1;
var subs_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58428__$1,new cljs.core.Keyword(null,"subs-ref","subs-ref",-1355989911));
var obj_support = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58428__$1,new cljs.core.Keyword(null,"obj-support","obj-support",1522559229));
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58428__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
var map__58429 = p__58426;
var map__58429__$1 = cljs.core.__destructure_map(map__58429);
var msg = map__58429__$1;
var from = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58429__$1,new cljs.core.Keyword(null,"from","from",1815293044));
var summary = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58429__$1,new cljs.core.Keyword(null,"summary","summary",380847952));
var history = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58429__$1,new cljs.core.Keyword(null,"history","history",-247395220));
var num = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__58429__$1,new cljs.core.Keyword(null,"num","num",1985240673),(10));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(subs_ref,cljs.core.assoc,from,msg);

if(cljs.core.truth_(history)){
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"tap-subscribed","tap-subscribed",-1882247432),new cljs.core.Keyword(null,"history","history",-247395220),cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (oid){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"oid","oid",-768692334),oid,new cljs.core.Keyword(null,"summary","summary",380847952),shadow.remote.runtime.obj_support.obj_describe_STAR_(obj_support,oid)], null);
}),shadow.remote.runtime.obj_support.get_tap_history(obj_support,num)))], null));
} else {
return null;
}
});
shadow.remote.runtime.tap_support.tap_unsubscribe = (function shadow$remote$runtime$tap_support$tap_unsubscribe(p__58430,p__58431){
var map__58432 = p__58430;
var map__58432__$1 = cljs.core.__destructure_map(map__58432);
var subs_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58432__$1,new cljs.core.Keyword(null,"subs-ref","subs-ref",-1355989911));
var map__58433 = p__58431;
var map__58433__$1 = cljs.core.__destructure_map(map__58433);
var from = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58433__$1,new cljs.core.Keyword(null,"from","from",1815293044));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(subs_ref,cljs.core.dissoc,from);
});
shadow.remote.runtime.tap_support.request_tap_history = (function shadow$remote$runtime$tap_support$request_tap_history(p__58434,p__58435){
var map__58436 = p__58434;
var map__58436__$1 = cljs.core.__destructure_map(map__58436);
var obj_support = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58436__$1,new cljs.core.Keyword(null,"obj-support","obj-support",1522559229));
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58436__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
var map__58437 = p__58435;
var map__58437__$1 = cljs.core.__destructure_map(map__58437);
var msg = map__58437__$1;
var num = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__58437__$1,new cljs.core.Keyword(null,"num","num",1985240673),(10));
var tap_ids = shadow.remote.runtime.obj_support.get_tap_history(obj_support,num);
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"tap-history","tap-history",-282803347),new cljs.core.Keyword(null,"oids","oids",-1580877688),tap_ids], null));
});
shadow.remote.runtime.tap_support.tool_disconnect = (function shadow$remote$runtime$tap_support$tool_disconnect(p__58438,tid){
var map__58439 = p__58438;
var map__58439__$1 = cljs.core.__destructure_map(map__58439);
var svc = map__58439__$1;
var subs_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58439__$1,new cljs.core.Keyword(null,"subs-ref","subs-ref",-1355989911));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(subs_ref,cljs.core.dissoc,tid);
});
shadow.remote.runtime.tap_support.start = (function shadow$remote$runtime$tap_support$start(runtime,obj_support){
var subs_ref = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var tap_fn = (function shadow$remote$runtime$tap_support$start_$_runtime_tap(obj){
if((!((obj == null)))){
var oid = shadow.remote.runtime.obj_support.register(obj_support,obj,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"from","from",1815293044),new cljs.core.Keyword(null,"tap","tap",-1086702463)], null));
var seq__58444 = cljs.core.seq(cljs.core.deref(subs_ref));
var chunk__58445 = null;
var count__58446 = (0);
var i__58447 = (0);
while(true){
if((i__58447 < count__58446)){
var vec__58457 = chunk__58445.cljs$core$IIndexed$_nth$arity$2(null,i__58447);
var tid = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__58457,(0),null);
var tap_config = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__58457,(1),null);
shadow.remote.runtime.api.relay_msg(runtime,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"tap","tap",-1086702463),new cljs.core.Keyword(null,"to","to",192099007),tid,new cljs.core.Keyword(null,"oid","oid",-768692334),oid], null));


var G__58476 = seq__58444;
var G__58477 = chunk__58445;
var G__58478 = count__58446;
var G__58479 = (i__58447 + (1));
seq__58444 = G__58476;
chunk__58445 = G__58477;
count__58446 = G__58478;
i__58447 = G__58479;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__58444);
if(temp__5753__auto__){
var seq__58444__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__58444__$1)){
var c__4679__auto__ = cljs.core.chunk_first(seq__58444__$1);
var G__58480 = cljs.core.chunk_rest(seq__58444__$1);
var G__58481 = c__4679__auto__;
var G__58482 = cljs.core.count(c__4679__auto__);
var G__58483 = (0);
seq__58444 = G__58480;
chunk__58445 = G__58481;
count__58446 = G__58482;
i__58447 = G__58483;
continue;
} else {
var vec__58460 = cljs.core.first(seq__58444__$1);
var tid = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__58460,(0),null);
var tap_config = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__58460,(1),null);
shadow.remote.runtime.api.relay_msg(runtime,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"tap","tap",-1086702463),new cljs.core.Keyword(null,"to","to",192099007),tid,new cljs.core.Keyword(null,"oid","oid",-768692334),oid], null));


var G__58484 = cljs.core.next(seq__58444__$1);
var G__58485 = null;
var G__58486 = (0);
var G__58487 = (0);
seq__58444 = G__58484;
chunk__58445 = G__58485;
count__58446 = G__58486;
i__58447 = G__58487;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
});
var svc = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"runtime","runtime",-1331573996),runtime,new cljs.core.Keyword(null,"obj-support","obj-support",1522559229),obj_support,new cljs.core.Keyword(null,"tap-fn","tap-fn",1573556461),tap_fn,new cljs.core.Keyword(null,"subs-ref","subs-ref",-1355989911),subs_ref], null);
shadow.remote.runtime.api.add_extension(runtime,new cljs.core.Keyword("shadow.remote.runtime.tap-support","ext","shadow.remote.runtime.tap-support/ext",1019069674),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"ops","ops",1237330063),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"tap-subscribe","tap-subscribe",411179050),(function (p1__58440_SHARP_){
return shadow.remote.runtime.tap_support.tap_subscribe(svc,p1__58440_SHARP_);
}),new cljs.core.Keyword(null,"tap-unsubscribe","tap-unsubscribe",1183890755),(function (p1__58441_SHARP_){
return shadow.remote.runtime.tap_support.tap_unsubscribe(svc,p1__58441_SHARP_);
}),new cljs.core.Keyword(null,"request-tap-history","request-tap-history",-670837812),(function (p1__58442_SHARP_){
return shadow.remote.runtime.tap_support.request_tap_history(svc,p1__58442_SHARP_);
})], null),new cljs.core.Keyword(null,"on-tool-disconnect","on-tool-disconnect",693464366),(function (p1__58443_SHARP_){
return shadow.remote.runtime.tap_support.tool_disconnect(svc,p1__58443_SHARP_);
})], null));

cljs.core.add_tap(tap_fn);

return svc;
});
shadow.remote.runtime.tap_support.stop = (function shadow$remote$runtime$tap_support$stop(p__58463){
var map__58464 = p__58463;
var map__58464__$1 = cljs.core.__destructure_map(map__58464);
var svc = map__58464__$1;
var tap_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58464__$1,new cljs.core.Keyword(null,"tap-fn","tap-fn",1573556461));
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58464__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
cljs.core.remove_tap(tap_fn);

return shadow.remote.runtime.api.del_extension(runtime,new cljs.core.Keyword("shadow.remote.runtime.tap-support","ext","shadow.remote.runtime.tap-support/ext",1019069674));
});

//# sourceMappingURL=shadow.remote.runtime.tap_support.js.map
