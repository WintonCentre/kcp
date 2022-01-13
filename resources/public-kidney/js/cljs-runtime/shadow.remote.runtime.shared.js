goog.provide('shadow.remote.runtime.shared');
shadow.remote.runtime.shared.init_state = (function shadow$remote$runtime$shared$init_state(client_info){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"extensions","extensions",-1103629196),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"ops","ops",1237330063),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"client-info","client-info",1958982504),client_info,new cljs.core.Keyword(null,"call-id-seq","call-id-seq",-1679248218),(0),new cljs.core.Keyword(null,"call-handlers","call-handlers",386605551),cljs.core.PersistentArrayMap.EMPTY], null);
});
shadow.remote.runtime.shared.now = (function shadow$remote$runtime$shared$now(){
return Date.now();
});
shadow.remote.runtime.shared.relay_msg = (function shadow$remote$runtime$shared$relay_msg(runtime,msg){
return shadow.remote.runtime.api.relay_msg(runtime,msg);
});
shadow.remote.runtime.shared.reply = (function shadow$remote$runtime$shared$reply(runtime,p__56909,res){
var map__56915 = p__56909;
var map__56915__$1 = cljs.core.__destructure_map(map__56915);
var call_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56915__$1,new cljs.core.Keyword(null,"call-id","call-id",1043012968));
var from = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56915__$1,new cljs.core.Keyword(null,"from","from",1815293044));
var res__$1 = (function (){var G__56927 = res;
var G__56927__$1 = (cljs.core.truth_(call_id)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__56927,new cljs.core.Keyword(null,"call-id","call-id",1043012968),call_id):G__56927);
if(cljs.core.truth_(from)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__56927__$1,new cljs.core.Keyword(null,"to","to",192099007),from);
} else {
return G__56927__$1;
}
})();
return shadow.remote.runtime.api.relay_msg(runtime,res__$1);
});
shadow.remote.runtime.shared.call = (function shadow$remote$runtime$shared$call(var_args){
var G__56946 = arguments.length;
switch (G__56946) {
case 3:
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$3 = (function (runtime,msg,handlers){
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$4(runtime,msg,handlers,(0));
}));

(shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$4 = (function (p__56963,msg,handlers,timeout_after_ms){
var map__56964 = p__56963;
var map__56964__$1 = cljs.core.__destructure_map(map__56964);
var runtime = map__56964__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56964__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var call_id = new cljs.core.Keyword(null,"call-id-seq","call-id-seq",-1679248218).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state_ref,cljs.core.update,new cljs.core.Keyword(null,"call-id-seq","call-id-seq",-1679248218),cljs.core.inc);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state_ref,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"call-handlers","call-handlers",386605551),call_id], null),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"handlers","handlers",79528781),handlers,new cljs.core.Keyword(null,"called-at","called-at",607081160),shadow.remote.runtime.shared.now(),new cljs.core.Keyword(null,"msg","msg",-1386103444),msg,new cljs.core.Keyword(null,"timeout","timeout",-318625318),timeout_after_ms], null));

return shadow.remote.runtime.api.relay_msg(runtime,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg,new cljs.core.Keyword(null,"call-id","call-id",1043012968),call_id));
}));

(shadow.remote.runtime.shared.call.cljs$lang$maxFixedArity = 4);

shadow.remote.runtime.shared.trigger_BANG_ = (function shadow$remote$runtime$shared$trigger_BANG_(var_args){
var args__4870__auto__ = [];
var len__4864__auto___57068 = arguments.length;
var i__4865__auto___57069 = (0);
while(true){
if((i__4865__auto___57069 < len__4864__auto___57068)){
args__4870__auto__.push((arguments[i__4865__auto___57069]));

var G__57070 = (i__4865__auto___57069 + (1));
i__4865__auto___57069 = G__57070;
continue;
} else {
}
break;
}

var argseq__4871__auto__ = ((((2) < args__4870__auto__.length))?(new cljs.core.IndexedSeq(args__4870__auto__.slice((2)),(0),null)):null);
return shadow.remote.runtime.shared.trigger_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__4871__auto__);
});

(shadow.remote.runtime.shared.trigger_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (p__56971,ev,args){
var map__56972 = p__56971;
var map__56972__$1 = cljs.core.__destructure_map(map__56972);
var runtime = map__56972__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56972__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var seq__56973 = cljs.core.seq(cljs.core.vals(new cljs.core.Keyword(null,"extensions","extensions",-1103629196).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref))));
var chunk__56976 = null;
var count__56977 = (0);
var i__56978 = (0);
while(true){
if((i__56978 < count__56977)){
var ext = chunk__56976.cljs$core$IIndexed$_nth$arity$2(null,i__56978);
var ev_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(ext,ev);
if(cljs.core.truth_(ev_fn)){
cljs.core.apply.cljs$core$IFn$_invoke$arity$2(ev_fn,args);


var G__57072 = seq__56973;
var G__57073 = chunk__56976;
var G__57074 = count__56977;
var G__57075 = (i__56978 + (1));
seq__56973 = G__57072;
chunk__56976 = G__57073;
count__56977 = G__57074;
i__56978 = G__57075;
continue;
} else {
var G__57076 = seq__56973;
var G__57077 = chunk__56976;
var G__57078 = count__56977;
var G__57079 = (i__56978 + (1));
seq__56973 = G__57076;
chunk__56976 = G__57077;
count__56977 = G__57078;
i__56978 = G__57079;
continue;
}
} else {
var temp__5753__auto__ = cljs.core.seq(seq__56973);
if(temp__5753__auto__){
var seq__56973__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__56973__$1)){
var c__4679__auto__ = cljs.core.chunk_first(seq__56973__$1);
var G__57080 = cljs.core.chunk_rest(seq__56973__$1);
var G__57081 = c__4679__auto__;
var G__57082 = cljs.core.count(c__4679__auto__);
var G__57083 = (0);
seq__56973 = G__57080;
chunk__56976 = G__57081;
count__56977 = G__57082;
i__56978 = G__57083;
continue;
} else {
var ext = cljs.core.first(seq__56973__$1);
var ev_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(ext,ev);
if(cljs.core.truth_(ev_fn)){
cljs.core.apply.cljs$core$IFn$_invoke$arity$2(ev_fn,args);


var G__57084 = cljs.core.next(seq__56973__$1);
var G__57085 = null;
var G__57086 = (0);
var G__57087 = (0);
seq__56973 = G__57084;
chunk__56976 = G__57085;
count__56977 = G__57086;
i__56978 = G__57087;
continue;
} else {
var G__57089 = cljs.core.next(seq__56973__$1);
var G__57090 = null;
var G__57091 = (0);
var G__57092 = (0);
seq__56973 = G__57089;
chunk__56976 = G__57090;
count__56977 = G__57091;
i__56978 = G__57092;
continue;
}
}
} else {
return null;
}
}
break;
}
}));

(shadow.remote.runtime.shared.trigger_BANG_.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(shadow.remote.runtime.shared.trigger_BANG_.cljs$lang$applyTo = (function (seq56965){
var G__56966 = cljs.core.first(seq56965);
var seq56965__$1 = cljs.core.next(seq56965);
var G__56967 = cljs.core.first(seq56965__$1);
var seq56965__$2 = cljs.core.next(seq56965__$1);
var self__4851__auto__ = this;
return self__4851__auto__.cljs$core$IFn$_invoke$arity$variadic(G__56966,G__56967,seq56965__$2);
}));

shadow.remote.runtime.shared.welcome = (function shadow$remote$runtime$shared$welcome(p__56986,p__56987){
var map__56988 = p__56986;
var map__56988__$1 = cljs.core.__destructure_map(map__56988);
var runtime = map__56988__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56988__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var map__56989 = p__56987;
var map__56989__$1 = cljs.core.__destructure_map(map__56989);
var msg = map__56989__$1;
var client_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56989__$1,new cljs.core.Keyword(null,"client-id","client-id",-464622140));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state_ref,cljs.core.assoc,new cljs.core.Keyword(null,"client-id","client-id",-464622140),client_id);

var map__56990 = cljs.core.deref(state_ref);
var map__56990__$1 = cljs.core.__destructure_map(map__56990);
var client_info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56990__$1,new cljs.core.Keyword(null,"client-info","client-info",1958982504));
var extensions = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56990__$1,new cljs.core.Keyword(null,"extensions","extensions",-1103629196));
shadow.remote.runtime.shared.relay_msg(runtime,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"hello","hello",-245025397),new cljs.core.Keyword(null,"client-info","client-info",1958982504),client_info], null));

return shadow.remote.runtime.shared.trigger_BANG_(runtime,new cljs.core.Keyword(null,"on-welcome","on-welcome",1895317125));
});
shadow.remote.runtime.shared.ping = (function shadow$remote$runtime$shared$ping(runtime,msg){
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"pong","pong",-172484958)], null));
});
shadow.remote.runtime.shared.get_client_id = (function shadow$remote$runtime$shared$get_client_id(p__56991){
var map__56992 = p__56991;
var map__56992__$1 = cljs.core.__destructure_map(map__56992);
var runtime = map__56992__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56992__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var or__4253__auto__ = new cljs.core.Keyword(null,"client-id","client-id",-464622140).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref));
if(cljs.core.truth_(or__4253__auto__)){
return or__4253__auto__;
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("runtime has no assigned runtime-id",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"runtime","runtime",-1331573996),runtime], null));
}
});
shadow.remote.runtime.shared.request_supported_ops = (function shadow$remote$runtime$shared$request_supported_ops(p__56993,msg){
var map__56994 = p__56993;
var map__56994__$1 = cljs.core.__destructure_map(map__56994);
var runtime = map__56994__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56994__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"supported-ops","supported-ops",337914702),new cljs.core.Keyword(null,"ops","ops",1237330063),cljs.core.disj.cljs$core$IFn$_invoke$arity$variadic(cljs.core.set(cljs.core.keys(new cljs.core.Keyword(null,"ops","ops",1237330063).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref)))),new cljs.core.Keyword(null,"welcome","welcome",-578152123),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"unknown-relay-op","unknown-relay-op",170832753),new cljs.core.Keyword(null,"unknown-op","unknown-op",1900385996),new cljs.core.Keyword(null,"request-supported-ops","request-supported-ops",-1034994502),new cljs.core.Keyword(null,"tool-disconnect","tool-disconnect",189103996)], 0))], null));
});
shadow.remote.runtime.shared.unknown_relay_op = (function shadow$remote$runtime$shared$unknown_relay_op(msg){
return console.warn("unknown-relay-op",msg);
});
shadow.remote.runtime.shared.unknown_op = (function shadow$remote$runtime$shared$unknown_op(msg){
return console.warn("unknown-op",msg);
});
shadow.remote.runtime.shared.add_extension_STAR_ = (function shadow$remote$runtime$shared$add_extension_STAR_(p__56998,key,p__56999){
var map__57000 = p__56998;
var map__57000__$1 = cljs.core.__destructure_map(map__57000);
var state = map__57000__$1;
var extensions = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57000__$1,new cljs.core.Keyword(null,"extensions","extensions",-1103629196));
var map__57001 = p__56999;
var map__57001__$1 = cljs.core.__destructure_map(map__57001);
var spec = map__57001__$1;
var ops = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57001__$1,new cljs.core.Keyword(null,"ops","ops",1237330063));
if(cljs.core.contains_QMARK_(extensions,key)){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("extension already registered",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),key,new cljs.core.Keyword(null,"spec","spec",347520401),spec], null));
} else {
}

return cljs.core.reduce_kv((function (state__$1,op_kw,op_handler){
if(cljs.core.truth_(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state__$1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ops","ops",1237330063),op_kw], null)))){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("op already registered",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),key,new cljs.core.Keyword(null,"op","op",-1882987955),op_kw], null));
} else {
}

return cljs.core.assoc_in(state__$1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ops","ops",1237330063),op_kw], null),op_handler);
}),cljs.core.assoc_in(state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"extensions","extensions",-1103629196),key], null),spec),ops);
});
shadow.remote.runtime.shared.add_extension = (function shadow$remote$runtime$shared$add_extension(p__57002,key,spec){
var map__57003 = p__57002;
var map__57003__$1 = cljs.core.__destructure_map(map__57003);
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57003__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state_ref,shadow.remote.runtime.shared.add_extension_STAR_,key,spec);
});
shadow.remote.runtime.shared.add_defaults = (function shadow$remote$runtime$shared$add_defaults(runtime){
return shadow.remote.runtime.shared.add_extension(runtime,new cljs.core.Keyword("shadow.remote.runtime.shared","defaults","shadow.remote.runtime.shared/defaults",-1821257543),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"ops","ops",1237330063),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"welcome","welcome",-578152123),(function (p1__57004_SHARP_){
return shadow.remote.runtime.shared.welcome(runtime,p1__57004_SHARP_);
}),new cljs.core.Keyword(null,"unknown-relay-op","unknown-relay-op",170832753),(function (p1__57005_SHARP_){
return shadow.remote.runtime.shared.unknown_relay_op(p1__57005_SHARP_);
}),new cljs.core.Keyword(null,"unknown-op","unknown-op",1900385996),(function (p1__57006_SHARP_){
return shadow.remote.runtime.shared.unknown_op(p1__57006_SHARP_);
}),new cljs.core.Keyword(null,"ping","ping",-1670114784),(function (p1__57007_SHARP_){
return shadow.remote.runtime.shared.ping(runtime,p1__57007_SHARP_);
}),new cljs.core.Keyword(null,"request-supported-ops","request-supported-ops",-1034994502),(function (p1__57008_SHARP_){
return shadow.remote.runtime.shared.request_supported_ops(runtime,p1__57008_SHARP_);
})], null)], null));
});
shadow.remote.runtime.shared.del_extension_STAR_ = (function shadow$remote$runtime$shared$del_extension_STAR_(state,key){
var ext = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"extensions","extensions",-1103629196),key], null));
if(cljs.core.not(ext)){
return state;
} else {
return cljs.core.reduce_kv((function (state__$1,op_kw,op_handler){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(state__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ops","ops",1237330063)], null),cljs.core.dissoc,op_kw);
}),cljs.core.update.cljs$core$IFn$_invoke$arity$4(state,new cljs.core.Keyword(null,"extensions","extensions",-1103629196),cljs.core.dissoc,key),new cljs.core.Keyword(null,"ops","ops",1237330063).cljs$core$IFn$_invoke$arity$1(ext));
}
});
shadow.remote.runtime.shared.del_extension = (function shadow$remote$runtime$shared$del_extension(p__57013,key){
var map__57014 = p__57013;
var map__57014__$1 = cljs.core.__destructure_map(map__57014);
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57014__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(state_ref,shadow.remote.runtime.shared.del_extension_STAR_,key);
});
shadow.remote.runtime.shared.unhandled_call_result = (function shadow$remote$runtime$shared$unhandled_call_result(call_config,msg){
return console.warn("unhandled call result",msg,call_config);
});
shadow.remote.runtime.shared.unhandled_client_not_found = (function shadow$remote$runtime$shared$unhandled_client_not_found(p__57015,msg){
var map__57016 = p__57015;
var map__57016__$1 = cljs.core.__destructure_map(map__57016);
var runtime = map__57016__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57016__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
return shadow.remote.runtime.shared.trigger_BANG_.cljs$core$IFn$_invoke$arity$variadic(runtime,new cljs.core.Keyword(null,"on-client-not-found","on-client-not-found",-642452849),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([msg], 0));
});
shadow.remote.runtime.shared.reply_unknown_op = (function shadow$remote$runtime$shared$reply_unknown_op(runtime,msg){
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"unknown-op","unknown-op",1900385996),new cljs.core.Keyword(null,"msg","msg",-1386103444),msg], null));
});
shadow.remote.runtime.shared.process = (function shadow$remote$runtime$shared$process(p__57022,p__57023){
var map__57024 = p__57022;
var map__57024__$1 = cljs.core.__destructure_map(map__57024);
var runtime = map__57024__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57024__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var map__57025 = p__57023;
var map__57025__$1 = cljs.core.__destructure_map(map__57025);
var msg = map__57025__$1;
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57025__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var call_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57025__$1,new cljs.core.Keyword(null,"call-id","call-id",1043012968));
var state = cljs.core.deref(state_ref);
var op_handler = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ops","ops",1237330063),op], null));
if(cljs.core.truth_(call_id)){
var cfg = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"call-handlers","call-handlers",386605551),call_id], null));
var call_handler = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cfg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"handlers","handlers",79528781),op], null));
if(cljs.core.truth_(call_handler)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(state_ref,cljs.core.update,new cljs.core.Keyword(null,"call-handlers","call-handlers",386605551),cljs.core.dissoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([call_id], 0));

return (call_handler.cljs$core$IFn$_invoke$arity$1 ? call_handler.cljs$core$IFn$_invoke$arity$1(msg) : call_handler.call(null,msg));
} else {
if(cljs.core.truth_(op_handler)){
return (op_handler.cljs$core$IFn$_invoke$arity$1 ? op_handler.cljs$core$IFn$_invoke$arity$1(msg) : op_handler.call(null,msg));
} else {
return shadow.remote.runtime.shared.unhandled_call_result(cfg,msg);

}
}
} else {
if(cljs.core.truth_(op_handler)){
return (op_handler.cljs$core$IFn$_invoke$arity$1 ? op_handler.cljs$core$IFn$_invoke$arity$1(msg) : op_handler.call(null,msg));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"client-not-found","client-not-found",-1754042614),op)){
return shadow.remote.runtime.shared.unhandled_client_not_found(runtime,msg);
} else {
return shadow.remote.runtime.shared.reply_unknown_op(runtime,msg);

}
}
}
});
shadow.remote.runtime.shared.run_on_idle = (function shadow$remote$runtime$shared$run_on_idle(state_ref){
var seq__57032 = cljs.core.seq(cljs.core.vals(new cljs.core.Keyword(null,"extensions","extensions",-1103629196).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref))));
var chunk__57034 = null;
var count__57035 = (0);
var i__57036 = (0);
while(true){
if((i__57036 < count__57035)){
var map__57048 = chunk__57034.cljs$core$IIndexed$_nth$arity$2(null,i__57036);
var map__57048__$1 = cljs.core.__destructure_map(map__57048);
var on_idle = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57048__$1,new cljs.core.Keyword(null,"on-idle","on-idle",2044706602));
if(cljs.core.truth_(on_idle)){
(on_idle.cljs$core$IFn$_invoke$arity$0 ? on_idle.cljs$core$IFn$_invoke$arity$0() : on_idle.call(null));


var G__57104 = seq__57032;
var G__57105 = chunk__57034;
var G__57106 = count__57035;
var G__57107 = (i__57036 + (1));
seq__57032 = G__57104;
chunk__57034 = G__57105;
count__57035 = G__57106;
i__57036 = G__57107;
continue;
} else {
var G__57108 = seq__57032;
var G__57109 = chunk__57034;
var G__57110 = count__57035;
var G__57111 = (i__57036 + (1));
seq__57032 = G__57108;
chunk__57034 = G__57109;
count__57035 = G__57110;
i__57036 = G__57111;
continue;
}
} else {
var temp__5753__auto__ = cljs.core.seq(seq__57032);
if(temp__5753__auto__){
var seq__57032__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__57032__$1)){
var c__4679__auto__ = cljs.core.chunk_first(seq__57032__$1);
var G__57113 = cljs.core.chunk_rest(seq__57032__$1);
var G__57114 = c__4679__auto__;
var G__57115 = cljs.core.count(c__4679__auto__);
var G__57116 = (0);
seq__57032 = G__57113;
chunk__57034 = G__57114;
count__57035 = G__57115;
i__57036 = G__57116;
continue;
} else {
var map__57052 = cljs.core.first(seq__57032__$1);
var map__57052__$1 = cljs.core.__destructure_map(map__57052);
var on_idle = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57052__$1,new cljs.core.Keyword(null,"on-idle","on-idle",2044706602));
if(cljs.core.truth_(on_idle)){
(on_idle.cljs$core$IFn$_invoke$arity$0 ? on_idle.cljs$core$IFn$_invoke$arity$0() : on_idle.call(null));


var G__57117 = cljs.core.next(seq__57032__$1);
var G__57118 = null;
var G__57119 = (0);
var G__57120 = (0);
seq__57032 = G__57117;
chunk__57034 = G__57118;
count__57035 = G__57119;
i__57036 = G__57120;
continue;
} else {
var G__57121 = cljs.core.next(seq__57032__$1);
var G__57122 = null;
var G__57123 = (0);
var G__57124 = (0);
seq__57032 = G__57121;
chunk__57034 = G__57122;
count__57035 = G__57123;
i__57036 = G__57124;
continue;
}
}
} else {
return null;
}
}
break;
}
});

//# sourceMappingURL=shadow.remote.runtime.shared.js.map
