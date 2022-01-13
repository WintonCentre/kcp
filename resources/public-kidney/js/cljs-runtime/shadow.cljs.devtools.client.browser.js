goog.provide('shadow.cljs.devtools.client.browser');
shadow.cljs.devtools.client.browser.devtools_msg = (function shadow$cljs$devtools$client$browser$devtools_msg(var_args){
var args__4870__auto__ = [];
var len__4864__auto___59222 = arguments.length;
var i__4865__auto___59223 = (0);
while(true){
if((i__4865__auto___59223 < len__4864__auto___59222)){
args__4870__auto__.push((arguments[i__4865__auto___59223]));

var G__59224 = (i__4865__auto___59223 + (1));
i__4865__auto___59223 = G__59224;
continue;
} else {
}
break;
}

var argseq__4871__auto__ = ((((1) < args__4870__auto__.length))?(new cljs.core.IndexedSeq(args__4870__auto__.slice((1)),(0),null)):null);
return shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4871__auto__);
});

(shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic = (function (msg,args){
if(shadow.cljs.devtools.client.env.log){
if(cljs.core.seq(shadow.cljs.devtools.client.env.log_style)){
return console.log.apply(console,cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [["%cshadow-cljs: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg)].join(''),shadow.cljs.devtools.client.env.log_style], null),args)));
} else {
return console.log.apply(console,cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [["shadow-cljs: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg)].join('')], null),args)));
}
} else {
return null;
}
}));

(shadow.cljs.devtools.client.browser.devtools_msg.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(shadow.cljs.devtools.client.browser.devtools_msg.cljs$lang$applyTo = (function (seq59042){
var G__59043 = cljs.core.first(seq59042);
var seq59042__$1 = cljs.core.next(seq59042);
var self__4851__auto__ = this;
return self__4851__auto__.cljs$core$IFn$_invoke$arity$variadic(G__59043,seq59042__$1);
}));

shadow.cljs.devtools.client.browser.script_eval = (function shadow$cljs$devtools$client$browser$script_eval(code){
return goog.globalEval(code);
});
shadow.cljs.devtools.client.browser.do_js_load = (function shadow$cljs$devtools$client$browser$do_js_load(sources){
var seq__59044 = cljs.core.seq(sources);
var chunk__59045 = null;
var count__59046 = (0);
var i__59047 = (0);
while(true){
if((i__59047 < count__59046)){
var map__59052 = chunk__59045.cljs$core$IIndexed$_nth$arity$2(null,i__59047);
var map__59052__$1 = cljs.core.__destructure_map(map__59052);
var src = map__59052__$1;
var resource_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59052__$1,new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582));
var output_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59052__$1,new cljs.core.Keyword(null,"output-name","output-name",-1769107767));
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59052__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59052__$1,new cljs.core.Keyword(null,"js","js",1768080579));
$CLJS.SHADOW_ENV.setLoaded(output_name);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load JS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([resource_name], 0));

shadow.cljs.devtools.client.env.before_load_src(src);

try{shadow.cljs.devtools.client.browser.script_eval([cljs.core.str.cljs$core$IFn$_invoke$arity$1(js),"\n//# sourceURL=",cljs.core.str.cljs$core$IFn$_invoke$arity$1($CLJS.SHADOW_ENV.scriptBase),cljs.core.str.cljs$core$IFn$_invoke$arity$1(output_name)].join(''));
}catch (e59053){var e_59225 = e59053;
if(shadow.cljs.devtools.client.env.log){
console.error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name)].join(''),e_59225);
} else {
}

throw (new Error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name),": ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(e_59225.message)].join('')));
}

var G__59227 = seq__59044;
var G__59228 = chunk__59045;
var G__59229 = count__59046;
var G__59230 = (i__59047 + (1));
seq__59044 = G__59227;
chunk__59045 = G__59228;
count__59046 = G__59229;
i__59047 = G__59230;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__59044);
if(temp__5753__auto__){
var seq__59044__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__59044__$1)){
var c__4679__auto__ = cljs.core.chunk_first(seq__59044__$1);
var G__59233 = cljs.core.chunk_rest(seq__59044__$1);
var G__59234 = c__4679__auto__;
var G__59235 = cljs.core.count(c__4679__auto__);
var G__59236 = (0);
seq__59044 = G__59233;
chunk__59045 = G__59234;
count__59046 = G__59235;
i__59047 = G__59236;
continue;
} else {
var map__59054 = cljs.core.first(seq__59044__$1);
var map__59054__$1 = cljs.core.__destructure_map(map__59054);
var src = map__59054__$1;
var resource_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59054__$1,new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582));
var output_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59054__$1,new cljs.core.Keyword(null,"output-name","output-name",-1769107767));
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59054__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59054__$1,new cljs.core.Keyword(null,"js","js",1768080579));
$CLJS.SHADOW_ENV.setLoaded(output_name);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load JS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([resource_name], 0));

shadow.cljs.devtools.client.env.before_load_src(src);

try{shadow.cljs.devtools.client.browser.script_eval([cljs.core.str.cljs$core$IFn$_invoke$arity$1(js),"\n//# sourceURL=",cljs.core.str.cljs$core$IFn$_invoke$arity$1($CLJS.SHADOW_ENV.scriptBase),cljs.core.str.cljs$core$IFn$_invoke$arity$1(output_name)].join(''));
}catch (e59055){var e_59237 = e59055;
if(shadow.cljs.devtools.client.env.log){
console.error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name)].join(''),e_59237);
} else {
}

throw (new Error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name),": ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(e_59237.message)].join('')));
}

var G__59238 = cljs.core.next(seq__59044__$1);
var G__59239 = null;
var G__59240 = (0);
var G__59241 = (0);
seq__59044 = G__59238;
chunk__59045 = G__59239;
count__59046 = G__59240;
i__59047 = G__59241;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.cljs.devtools.client.browser.do_js_reload = (function shadow$cljs$devtools$client$browser$do_js_reload(msg,sources,complete_fn,failure_fn){
return shadow.cljs.devtools.client.env.do_js_reload.cljs$core$IFn$_invoke$arity$4(cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(msg,new cljs.core.Keyword(null,"log-missing-fn","log-missing-fn",732676765),(function (fn_sym){
return null;
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"log-call-async","log-call-async",183826192),(function (fn_sym){
return shadow.cljs.devtools.client.browser.devtools_msg(["call async ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym)].join(''));
}),new cljs.core.Keyword(null,"log-call","log-call",412404391),(function (fn_sym){
return shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym)].join(''));
})], 0)),(function (){
return shadow.cljs.devtools.client.browser.do_js_load(sources);
}),complete_fn,failure_fn);
});
/**
 * when (require '["some-str" :as x]) is done at the REPL we need to manually call the shadow.js.require for it
 * since the file only adds the shadow$provide. only need to do this for shadow-js.
 */
shadow.cljs.devtools.client.browser.do_js_requires = (function shadow$cljs$devtools$client$browser$do_js_requires(js_requires){
var seq__59056 = cljs.core.seq(js_requires);
var chunk__59057 = null;
var count__59058 = (0);
var i__59059 = (0);
while(true){
if((i__59059 < count__59058)){
var js_ns = chunk__59057.cljs$core$IIndexed$_nth$arity$2(null,i__59059);
var require_str_59249 = ["var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns)," = shadow.js.require(\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns),"\");"].join('');
shadow.cljs.devtools.client.browser.script_eval(require_str_59249);


var G__59250 = seq__59056;
var G__59251 = chunk__59057;
var G__59252 = count__59058;
var G__59253 = (i__59059 + (1));
seq__59056 = G__59250;
chunk__59057 = G__59251;
count__59058 = G__59252;
i__59059 = G__59253;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__59056);
if(temp__5753__auto__){
var seq__59056__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__59056__$1)){
var c__4679__auto__ = cljs.core.chunk_first(seq__59056__$1);
var G__59254 = cljs.core.chunk_rest(seq__59056__$1);
var G__59255 = c__4679__auto__;
var G__59256 = cljs.core.count(c__4679__auto__);
var G__59257 = (0);
seq__59056 = G__59254;
chunk__59057 = G__59255;
count__59058 = G__59256;
i__59059 = G__59257;
continue;
} else {
var js_ns = cljs.core.first(seq__59056__$1);
var require_str_59258 = ["var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns)," = shadow.js.require(\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns),"\");"].join('');
shadow.cljs.devtools.client.browser.script_eval(require_str_59258);


var G__59259 = cljs.core.next(seq__59056__$1);
var G__59260 = null;
var G__59261 = (0);
var G__59262 = (0);
seq__59056 = G__59259;
chunk__59057 = G__59260;
count__59058 = G__59261;
i__59059 = G__59262;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.cljs.devtools.client.browser.handle_build_complete = (function shadow$cljs$devtools$client$browser$handle_build_complete(runtime,p__59067){
var map__59068 = p__59067;
var map__59068__$1 = cljs.core.__destructure_map(map__59068);
var msg = map__59068__$1;
var info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59068__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var reload_info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59068__$1,new cljs.core.Keyword(null,"reload-info","reload-info",1648088086));
var warnings = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.distinct.cljs$core$IFn$_invoke$arity$1((function (){var iter__4652__auto__ = (function shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__59069(s__59070){
return (new cljs.core.LazySeq(null,(function (){
var s__59070__$1 = s__59070;
while(true){
var temp__5753__auto__ = cljs.core.seq(s__59070__$1);
if(temp__5753__auto__){
var xs__6308__auto__ = temp__5753__auto__;
var map__59079 = cljs.core.first(xs__6308__auto__);
var map__59079__$1 = cljs.core.__destructure_map(map__59079);
var src = map__59079__$1;
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59079__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var warnings = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59079__$1,new cljs.core.Keyword(null,"warnings","warnings",-735437651));
if(cljs.core.not(new cljs.core.Keyword(null,"from-jar","from-jar",1050932827).cljs$core$IFn$_invoke$arity$1(src))){
var iterys__4648__auto__ = ((function (s__59070__$1,map__59079,map__59079__$1,src,resource_name,warnings,xs__6308__auto__,temp__5753__auto__,map__59068,map__59068__$1,msg,info,reload_info){
return (function shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__59069_$_iter__59071(s__59072){
return (new cljs.core.LazySeq(null,((function (s__59070__$1,map__59079,map__59079__$1,src,resource_name,warnings,xs__6308__auto__,temp__5753__auto__,map__59068,map__59068__$1,msg,info,reload_info){
return (function (){
var s__59072__$1 = s__59072;
while(true){
var temp__5753__auto____$1 = cljs.core.seq(s__59072__$1);
if(temp__5753__auto____$1){
var s__59072__$2 = temp__5753__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__59072__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__59072__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__59074 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__59073 = (0);
while(true){
if((i__59073 < size__4651__auto__)){
var warning = cljs.core._nth(c__4650__auto__,i__59073);
cljs.core.chunk_append(b__59074,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(warning,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100),resource_name));

var G__59267 = (i__59073 + (1));
i__59073 = G__59267;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__59074),shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__59069_$_iter__59071(cljs.core.chunk_rest(s__59072__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__59074),null);
}
} else {
var warning = cljs.core.first(s__59072__$2);
return cljs.core.cons(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(warning,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100),resource_name),shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__59069_$_iter__59071(cljs.core.rest(s__59072__$2)));
}
} else {
return null;
}
break;
}
});})(s__59070__$1,map__59079,map__59079__$1,src,resource_name,warnings,xs__6308__auto__,temp__5753__auto__,map__59068,map__59068__$1,msg,info,reload_info))
,null,null));
});})(s__59070__$1,map__59079,map__59079__$1,src,resource_name,warnings,xs__6308__auto__,temp__5753__auto__,map__59068,map__59068__$1,msg,info,reload_info))
;
var fs__4649__auto__ = cljs.core.seq(iterys__4648__auto__(warnings));
if(fs__4649__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__4649__auto__,shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__59069(cljs.core.rest(s__59070__$1)));
} else {
var G__59268 = cljs.core.rest(s__59070__$1);
s__59070__$1 = G__59268;
continue;
}
} else {
var G__59269 = cljs.core.rest(s__59070__$1);
s__59070__$1 = G__59269;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__4652__auto__(new cljs.core.Keyword(null,"sources","sources",-321166424).cljs$core$IFn$_invoke$arity$1(info));
})()));
if(shadow.cljs.devtools.client.env.log){
var seq__59080_59270 = cljs.core.seq(warnings);
var chunk__59081_59271 = null;
var count__59082_59272 = (0);
var i__59083_59273 = (0);
while(true){
if((i__59083_59273 < count__59082_59272)){
var map__59086_59274 = chunk__59081_59271.cljs$core$IIndexed$_nth$arity$2(null,i__59083_59273);
var map__59086_59275__$1 = cljs.core.__destructure_map(map__59086_59274);
var w_59276 = map__59086_59275__$1;
var msg_59277__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59086_59275__$1,new cljs.core.Keyword(null,"msg","msg",-1386103444));
var line_59278 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59086_59275__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column_59279 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59086_59275__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var resource_name_59280 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59086_59275__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
console.warn(["BUILD-WARNING in ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name_59280)," at [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line_59278),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column_59279),"]\n\t",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg_59277__$1)].join(''));


var G__59281 = seq__59080_59270;
var G__59282 = chunk__59081_59271;
var G__59283 = count__59082_59272;
var G__59284 = (i__59083_59273 + (1));
seq__59080_59270 = G__59281;
chunk__59081_59271 = G__59282;
count__59082_59272 = G__59283;
i__59083_59273 = G__59284;
continue;
} else {
var temp__5753__auto___59289 = cljs.core.seq(seq__59080_59270);
if(temp__5753__auto___59289){
var seq__59080_59290__$1 = temp__5753__auto___59289;
if(cljs.core.chunked_seq_QMARK_(seq__59080_59290__$1)){
var c__4679__auto___59291 = cljs.core.chunk_first(seq__59080_59290__$1);
var G__59292 = cljs.core.chunk_rest(seq__59080_59290__$1);
var G__59293 = c__4679__auto___59291;
var G__59294 = cljs.core.count(c__4679__auto___59291);
var G__59295 = (0);
seq__59080_59270 = G__59292;
chunk__59081_59271 = G__59293;
count__59082_59272 = G__59294;
i__59083_59273 = G__59295;
continue;
} else {
var map__59087_59296 = cljs.core.first(seq__59080_59290__$1);
var map__59087_59297__$1 = cljs.core.__destructure_map(map__59087_59296);
var w_59298 = map__59087_59297__$1;
var msg_59299__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59087_59297__$1,new cljs.core.Keyword(null,"msg","msg",-1386103444));
var line_59300 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59087_59297__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column_59301 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59087_59297__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var resource_name_59302 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59087_59297__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
console.warn(["BUILD-WARNING in ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name_59302)," at [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line_59300),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column_59301),"]\n\t",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg_59299__$1)].join(''));


var G__59303 = cljs.core.next(seq__59080_59290__$1);
var G__59304 = null;
var G__59305 = (0);
var G__59306 = (0);
seq__59080_59270 = G__59303;
chunk__59081_59271 = G__59304;
count__59082_59272 = G__59305;
i__59083_59273 = G__59306;
continue;
}
} else {
}
}
break;
}
} else {
}

if((!(shadow.cljs.devtools.client.env.autoload))){
return shadow.cljs.devtools.client.hud.load_end_success();
} else {
if(((cljs.core.empty_QMARK_(warnings)) || (shadow.cljs.devtools.client.env.ignore_warnings))){
var sources_to_get = shadow.cljs.devtools.client.env.filter_reload_sources(info,reload_info);
if(cljs.core.not(cljs.core.seq(sources_to_get))){
return shadow.cljs.devtools.client.hud.load_end_success();
} else {
if(cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"after-load","after-load",-1278503285)], null)))){
} else {
shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("reloading code but no :after-load hooks are configured!",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["https://shadow-cljs.github.io/docs/UsersGuide.html#_lifecycle_hooks"], 0));
}

return shadow.cljs.devtools.client.shared.load_sources(runtime,sources_to_get,(function (p1__59065_SHARP_){
return shadow.cljs.devtools.client.browser.do_js_reload(msg,p1__59065_SHARP_,shadow.cljs.devtools.client.hud.load_end_success,shadow.cljs.devtools.client.hud.load_failure);
}));
}
} else {
return null;
}
}
});
shadow.cljs.devtools.client.browser.page_load_uri = (cljs.core.truth_(goog.global.document)?goog.Uri.parse(document.location.href):null);
shadow.cljs.devtools.client.browser.match_paths = (function shadow$cljs$devtools$client$browser$match_paths(old,new$){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("file",shadow.cljs.devtools.client.browser.page_load_uri.getScheme())){
var rel_new = cljs.core.subs.cljs$core$IFn$_invoke$arity$2(new$,(1));
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(old,rel_new)) || (clojure.string.starts_with_QMARK_(old,[rel_new,"?"].join(''))))){
return rel_new;
} else {
return null;
}
} else {
var node_uri = goog.Uri.parse(old);
var node_uri_resolved = shadow.cljs.devtools.client.browser.page_load_uri.resolve(node_uri);
var node_abs = node_uri_resolved.getPath();
var and__4251__auto__ = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$1(shadow.cljs.devtools.client.browser.page_load_uri.hasSameDomainAs(node_uri))) || (cljs.core.not(node_uri.hasDomain())));
if(and__4251__auto__){
var and__4251__auto____$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(node_abs,new$);
if(and__4251__auto____$1){
return new$;
} else {
return and__4251__auto____$1;
}
} else {
return and__4251__auto__;
}
}
});
shadow.cljs.devtools.client.browser.handle_asset_update = (function shadow$cljs$devtools$client$browser$handle_asset_update(p__59094){
var map__59095 = p__59094;
var map__59095__$1 = cljs.core.__destructure_map(map__59095);
var msg = map__59095__$1;
var updates = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59095__$1,new cljs.core.Keyword(null,"updates","updates",2013983452));
var seq__59096 = cljs.core.seq(updates);
var chunk__59098 = null;
var count__59099 = (0);
var i__59100 = (0);
while(true){
if((i__59100 < count__59099)){
var path = chunk__59098.cljs$core$IIndexed$_nth$arity$2(null,i__59100);
if(clojure.string.ends_with_QMARK_(path,"css")){
var seq__59141_59307 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("link[rel=\"stylesheet\"]")));
var chunk__59145_59308 = null;
var count__59146_59309 = (0);
var i__59147_59310 = (0);
while(true){
if((i__59147_59310 < count__59146_59309)){
var node_59311 = chunk__59145_59308.cljs$core$IIndexed$_nth$arity$2(null,i__59147_59310);
if(cljs.core.not(node_59311.shadow$old)){
var path_match_59312 = shadow.cljs.devtools.client.browser.match_paths(node_59311.getAttribute("href"),path);
if(cljs.core.truth_(path_match_59312)){
var new_link_59313 = (function (){var G__59157 = node_59311.cloneNode(true);
G__59157.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_59312),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__59157;
})();
(node_59311.shadow$old = true);

(new_link_59313.onload = ((function (seq__59141_59307,chunk__59145_59308,count__59146_59309,i__59147_59310,seq__59096,chunk__59098,count__59099,i__59100,new_link_59313,path_match_59312,node_59311,path,map__59095,map__59095__$1,msg,updates){
return (function (e){
return goog.dom.removeNode(node_59311);
});})(seq__59141_59307,chunk__59145_59308,count__59146_59309,i__59147_59310,seq__59096,chunk__59098,count__59099,i__59100,new_link_59313,path_match_59312,node_59311,path,map__59095,map__59095__$1,msg,updates))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_59312], 0));

goog.dom.insertSiblingAfter(new_link_59313,node_59311);


var G__59314 = seq__59141_59307;
var G__59315 = chunk__59145_59308;
var G__59316 = count__59146_59309;
var G__59317 = (i__59147_59310 + (1));
seq__59141_59307 = G__59314;
chunk__59145_59308 = G__59315;
count__59146_59309 = G__59316;
i__59147_59310 = G__59317;
continue;
} else {
var G__59318 = seq__59141_59307;
var G__59319 = chunk__59145_59308;
var G__59320 = count__59146_59309;
var G__59321 = (i__59147_59310 + (1));
seq__59141_59307 = G__59318;
chunk__59145_59308 = G__59319;
count__59146_59309 = G__59320;
i__59147_59310 = G__59321;
continue;
}
} else {
var G__59322 = seq__59141_59307;
var G__59323 = chunk__59145_59308;
var G__59324 = count__59146_59309;
var G__59325 = (i__59147_59310 + (1));
seq__59141_59307 = G__59322;
chunk__59145_59308 = G__59323;
count__59146_59309 = G__59324;
i__59147_59310 = G__59325;
continue;
}
} else {
var temp__5753__auto___59326 = cljs.core.seq(seq__59141_59307);
if(temp__5753__auto___59326){
var seq__59141_59327__$1 = temp__5753__auto___59326;
if(cljs.core.chunked_seq_QMARK_(seq__59141_59327__$1)){
var c__4679__auto___59328 = cljs.core.chunk_first(seq__59141_59327__$1);
var G__59329 = cljs.core.chunk_rest(seq__59141_59327__$1);
var G__59330 = c__4679__auto___59328;
var G__59331 = cljs.core.count(c__4679__auto___59328);
var G__59332 = (0);
seq__59141_59307 = G__59329;
chunk__59145_59308 = G__59330;
count__59146_59309 = G__59331;
i__59147_59310 = G__59332;
continue;
} else {
var node_59333 = cljs.core.first(seq__59141_59327__$1);
if(cljs.core.not(node_59333.shadow$old)){
var path_match_59334 = shadow.cljs.devtools.client.browser.match_paths(node_59333.getAttribute("href"),path);
if(cljs.core.truth_(path_match_59334)){
var new_link_59335 = (function (){var G__59158 = node_59333.cloneNode(true);
G__59158.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_59334),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__59158;
})();
(node_59333.shadow$old = true);

(new_link_59335.onload = ((function (seq__59141_59307,chunk__59145_59308,count__59146_59309,i__59147_59310,seq__59096,chunk__59098,count__59099,i__59100,new_link_59335,path_match_59334,node_59333,seq__59141_59327__$1,temp__5753__auto___59326,path,map__59095,map__59095__$1,msg,updates){
return (function (e){
return goog.dom.removeNode(node_59333);
});})(seq__59141_59307,chunk__59145_59308,count__59146_59309,i__59147_59310,seq__59096,chunk__59098,count__59099,i__59100,new_link_59335,path_match_59334,node_59333,seq__59141_59327__$1,temp__5753__auto___59326,path,map__59095,map__59095__$1,msg,updates))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_59334], 0));

goog.dom.insertSiblingAfter(new_link_59335,node_59333);


var G__59336 = cljs.core.next(seq__59141_59327__$1);
var G__59337 = null;
var G__59338 = (0);
var G__59339 = (0);
seq__59141_59307 = G__59336;
chunk__59145_59308 = G__59337;
count__59146_59309 = G__59338;
i__59147_59310 = G__59339;
continue;
} else {
var G__59340 = cljs.core.next(seq__59141_59327__$1);
var G__59341 = null;
var G__59342 = (0);
var G__59343 = (0);
seq__59141_59307 = G__59340;
chunk__59145_59308 = G__59341;
count__59146_59309 = G__59342;
i__59147_59310 = G__59343;
continue;
}
} else {
var G__59344 = cljs.core.next(seq__59141_59327__$1);
var G__59345 = null;
var G__59346 = (0);
var G__59347 = (0);
seq__59141_59307 = G__59344;
chunk__59145_59308 = G__59345;
count__59146_59309 = G__59346;
i__59147_59310 = G__59347;
continue;
}
}
} else {
}
}
break;
}


var G__59348 = seq__59096;
var G__59349 = chunk__59098;
var G__59350 = count__59099;
var G__59351 = (i__59100 + (1));
seq__59096 = G__59348;
chunk__59098 = G__59349;
count__59099 = G__59350;
i__59100 = G__59351;
continue;
} else {
var G__59352 = seq__59096;
var G__59353 = chunk__59098;
var G__59354 = count__59099;
var G__59355 = (i__59100 + (1));
seq__59096 = G__59352;
chunk__59098 = G__59353;
count__59099 = G__59354;
i__59100 = G__59355;
continue;
}
} else {
var temp__5753__auto__ = cljs.core.seq(seq__59096);
if(temp__5753__auto__){
var seq__59096__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__59096__$1)){
var c__4679__auto__ = cljs.core.chunk_first(seq__59096__$1);
var G__59356 = cljs.core.chunk_rest(seq__59096__$1);
var G__59357 = c__4679__auto__;
var G__59358 = cljs.core.count(c__4679__auto__);
var G__59359 = (0);
seq__59096 = G__59356;
chunk__59098 = G__59357;
count__59099 = G__59358;
i__59100 = G__59359;
continue;
} else {
var path = cljs.core.first(seq__59096__$1);
if(clojure.string.ends_with_QMARK_(path,"css")){
var seq__59159_59360 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("link[rel=\"stylesheet\"]")));
var chunk__59163_59361 = null;
var count__59164_59362 = (0);
var i__59165_59363 = (0);
while(true){
if((i__59165_59363 < count__59164_59362)){
var node_59364 = chunk__59163_59361.cljs$core$IIndexed$_nth$arity$2(null,i__59165_59363);
if(cljs.core.not(node_59364.shadow$old)){
var path_match_59365 = shadow.cljs.devtools.client.browser.match_paths(node_59364.getAttribute("href"),path);
if(cljs.core.truth_(path_match_59365)){
var new_link_59366 = (function (){var G__59175 = node_59364.cloneNode(true);
G__59175.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_59365),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__59175;
})();
(node_59364.shadow$old = true);

(new_link_59366.onload = ((function (seq__59159_59360,chunk__59163_59361,count__59164_59362,i__59165_59363,seq__59096,chunk__59098,count__59099,i__59100,new_link_59366,path_match_59365,node_59364,path,seq__59096__$1,temp__5753__auto__,map__59095,map__59095__$1,msg,updates){
return (function (e){
return goog.dom.removeNode(node_59364);
});})(seq__59159_59360,chunk__59163_59361,count__59164_59362,i__59165_59363,seq__59096,chunk__59098,count__59099,i__59100,new_link_59366,path_match_59365,node_59364,path,seq__59096__$1,temp__5753__auto__,map__59095,map__59095__$1,msg,updates))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_59365], 0));

goog.dom.insertSiblingAfter(new_link_59366,node_59364);


var G__59367 = seq__59159_59360;
var G__59368 = chunk__59163_59361;
var G__59369 = count__59164_59362;
var G__59370 = (i__59165_59363 + (1));
seq__59159_59360 = G__59367;
chunk__59163_59361 = G__59368;
count__59164_59362 = G__59369;
i__59165_59363 = G__59370;
continue;
} else {
var G__59371 = seq__59159_59360;
var G__59372 = chunk__59163_59361;
var G__59373 = count__59164_59362;
var G__59374 = (i__59165_59363 + (1));
seq__59159_59360 = G__59371;
chunk__59163_59361 = G__59372;
count__59164_59362 = G__59373;
i__59165_59363 = G__59374;
continue;
}
} else {
var G__59375 = seq__59159_59360;
var G__59376 = chunk__59163_59361;
var G__59377 = count__59164_59362;
var G__59378 = (i__59165_59363 + (1));
seq__59159_59360 = G__59375;
chunk__59163_59361 = G__59376;
count__59164_59362 = G__59377;
i__59165_59363 = G__59378;
continue;
}
} else {
var temp__5753__auto___59379__$1 = cljs.core.seq(seq__59159_59360);
if(temp__5753__auto___59379__$1){
var seq__59159_59380__$1 = temp__5753__auto___59379__$1;
if(cljs.core.chunked_seq_QMARK_(seq__59159_59380__$1)){
var c__4679__auto___59381 = cljs.core.chunk_first(seq__59159_59380__$1);
var G__59382 = cljs.core.chunk_rest(seq__59159_59380__$1);
var G__59383 = c__4679__auto___59381;
var G__59384 = cljs.core.count(c__4679__auto___59381);
var G__59385 = (0);
seq__59159_59360 = G__59382;
chunk__59163_59361 = G__59383;
count__59164_59362 = G__59384;
i__59165_59363 = G__59385;
continue;
} else {
var node_59386 = cljs.core.first(seq__59159_59380__$1);
if(cljs.core.not(node_59386.shadow$old)){
var path_match_59387 = shadow.cljs.devtools.client.browser.match_paths(node_59386.getAttribute("href"),path);
if(cljs.core.truth_(path_match_59387)){
var new_link_59388 = (function (){var G__59176 = node_59386.cloneNode(true);
G__59176.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_59387),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__59176;
})();
(node_59386.shadow$old = true);

(new_link_59388.onload = ((function (seq__59159_59360,chunk__59163_59361,count__59164_59362,i__59165_59363,seq__59096,chunk__59098,count__59099,i__59100,new_link_59388,path_match_59387,node_59386,seq__59159_59380__$1,temp__5753__auto___59379__$1,path,seq__59096__$1,temp__5753__auto__,map__59095,map__59095__$1,msg,updates){
return (function (e){
return goog.dom.removeNode(node_59386);
});})(seq__59159_59360,chunk__59163_59361,count__59164_59362,i__59165_59363,seq__59096,chunk__59098,count__59099,i__59100,new_link_59388,path_match_59387,node_59386,seq__59159_59380__$1,temp__5753__auto___59379__$1,path,seq__59096__$1,temp__5753__auto__,map__59095,map__59095__$1,msg,updates))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_59387], 0));

goog.dom.insertSiblingAfter(new_link_59388,node_59386);


var G__59389 = cljs.core.next(seq__59159_59380__$1);
var G__59390 = null;
var G__59391 = (0);
var G__59392 = (0);
seq__59159_59360 = G__59389;
chunk__59163_59361 = G__59390;
count__59164_59362 = G__59391;
i__59165_59363 = G__59392;
continue;
} else {
var G__59393 = cljs.core.next(seq__59159_59380__$1);
var G__59394 = null;
var G__59395 = (0);
var G__59396 = (0);
seq__59159_59360 = G__59393;
chunk__59163_59361 = G__59394;
count__59164_59362 = G__59395;
i__59165_59363 = G__59396;
continue;
}
} else {
var G__59397 = cljs.core.next(seq__59159_59380__$1);
var G__59398 = null;
var G__59399 = (0);
var G__59400 = (0);
seq__59159_59360 = G__59397;
chunk__59163_59361 = G__59398;
count__59164_59362 = G__59399;
i__59165_59363 = G__59400;
continue;
}
}
} else {
}
}
break;
}


var G__59401 = cljs.core.next(seq__59096__$1);
var G__59402 = null;
var G__59403 = (0);
var G__59404 = (0);
seq__59096 = G__59401;
chunk__59098 = G__59402;
count__59099 = G__59403;
i__59100 = G__59404;
continue;
} else {
var G__59405 = cljs.core.next(seq__59096__$1);
var G__59406 = null;
var G__59407 = (0);
var G__59408 = (0);
seq__59096 = G__59405;
chunk__59098 = G__59406;
count__59099 = G__59407;
i__59100 = G__59408;
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
shadow.cljs.devtools.client.browser.global_eval = (function shadow$cljs$devtools$client$browser$global_eval(js){
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2("undefined",typeof(module))){
return eval(js);
} else {
return (0,eval)(js);;
}
});
shadow.cljs.devtools.client.browser.repl_init = (function shadow$cljs$devtools$client$browser$repl_init(runtime,p__59183){
var map__59184 = p__59183;
var map__59184__$1 = cljs.core.__destructure_map(map__59184);
var repl_state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59184__$1,new cljs.core.Keyword(null,"repl-state","repl-state",-1733780387));
return shadow.cljs.devtools.client.shared.load_sources(runtime,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2(shadow.cljs.devtools.client.env.src_is_loaded_QMARK_,new cljs.core.Keyword(null,"repl-sources","repl-sources",723867535).cljs$core$IFn$_invoke$arity$1(repl_state))),(function (sources){
shadow.cljs.devtools.client.browser.do_js_load(sources);

return shadow.cljs.devtools.client.browser.devtools_msg("ready!");
}));
});
shadow.cljs.devtools.client.browser.runtime_info = (((typeof SHADOW_CONFIG !== 'undefined'))?shadow.json.to_clj.cljs$core$IFn$_invoke$arity$1(SHADOW_CONFIG):null);
shadow.cljs.devtools.client.browser.client_info = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([shadow.cljs.devtools.client.browser.runtime_info,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"host","host",-1558485167),(cljs.core.truth_(goog.global.document)?new cljs.core.Keyword(null,"browser","browser",828191719):new cljs.core.Keyword(null,"browser-worker","browser-worker",1638998282)),new cljs.core.Keyword(null,"user-agent","user-agent",1220426212),[(cljs.core.truth_(goog.userAgent.OPERA)?"Opera":(cljs.core.truth_(goog.userAgent.product.CHROME)?"Chrome":(cljs.core.truth_(goog.userAgent.IE)?"MSIE":(cljs.core.truth_(goog.userAgent.EDGE)?"Edge":(cljs.core.truth_(goog.userAgent.GECKO)?"Firefox":(cljs.core.truth_(goog.userAgent.SAFARI)?"Safari":(cljs.core.truth_(goog.userAgent.WEBKIT)?"Webkit":null)))))))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(goog.userAgent.VERSION)," [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(goog.userAgent.PLATFORM),"]"].join(''),new cljs.core.Keyword(null,"dom","dom",-1236537922),(!((goog.global.document == null)))], null)], 0));
if((typeof shadow !== 'undefined') && (typeof shadow.cljs !== 'undefined') && (typeof shadow.cljs.devtools !== 'undefined') && (typeof shadow.cljs.devtools.client !== 'undefined') && (typeof shadow.cljs.devtools.client.browser !== 'undefined') && (typeof shadow.cljs.devtools.client.browser.ws_was_welcome_ref !== 'undefined')){
} else {
shadow.cljs.devtools.client.browser.ws_was_welcome_ref = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(false);
}
if(((shadow.cljs.devtools.client.env.enabled) && ((shadow.cljs.devtools.client.env.worker_client_id > (0))))){
(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$remote$runtime$api$IEvalJS$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$remote$runtime$api$IEvalJS$_js_eval$arity$2 = (function (this$,code){
var this$__$1 = this;
return shadow.cljs.devtools.client.browser.global_eval(code);
}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_invoke$arity$2 = (function (this$,p__59190){
var map__59191 = p__59190;
var map__59191__$1 = cljs.core.__destructure_map(map__59191);
var _ = map__59191__$1;
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59191__$1,new cljs.core.Keyword(null,"js","js",1768080579));
var this$__$1 = this;
return shadow.cljs.devtools.client.browser.global_eval(js);
}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_repl_init$arity$4 = (function (runtime,p__59192,done,error){
var map__59193 = p__59192;
var map__59193__$1 = cljs.core.__destructure_map(map__59193);
var repl_sources = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59193__$1,new cljs.core.Keyword(null,"repl-sources","repl-sources",723867535));
var runtime__$1 = this;
return shadow.cljs.devtools.client.shared.load_sources(runtime__$1,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2(shadow.cljs.devtools.client.env.src_is_loaded_QMARK_,repl_sources)),(function (sources){
shadow.cljs.devtools.client.browser.do_js_load(sources);

return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_repl_require$arity$4 = (function (runtime,p__59195,done,error){
var map__59196 = p__59195;
var map__59196__$1 = cljs.core.__destructure_map(map__59196);
var msg = map__59196__$1;
var sources = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59196__$1,new cljs.core.Keyword(null,"sources","sources",-321166424));
var reload_namespaces = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59196__$1,new cljs.core.Keyword(null,"reload-namespaces","reload-namespaces",250210134));
var js_requires = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59196__$1,new cljs.core.Keyword(null,"js-requires","js-requires",-1311472051));
var runtime__$1 = this;
var sources_to_load = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p__59200){
var map__59201 = p__59200;
var map__59201__$1 = cljs.core.__destructure_map(map__59201);
var src = map__59201__$1;
var provides = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59201__$1,new cljs.core.Keyword(null,"provides","provides",-1634397992));
var and__4251__auto__ = shadow.cljs.devtools.client.env.src_is_loaded_QMARK_(src);
if(cljs.core.truth_(and__4251__auto__)){
return cljs.core.not(cljs.core.some(reload_namespaces,provides));
} else {
return and__4251__auto__;
}
}),sources));
if(cljs.core.not(cljs.core.seq(sources_to_load))){
var G__59202 = cljs.core.PersistentVector.EMPTY;
return (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(G__59202) : done.call(null,G__59202));
} else {
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$3(runtime__$1,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"cljs-load-sources","cljs-load-sources",-1458295962),new cljs.core.Keyword(null,"to","to",192099007),shadow.cljs.devtools.client.env.worker_client_id,new cljs.core.Keyword(null,"sources","sources",-321166424),cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582)),sources_to_load)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cljs-sources","cljs-sources",31121610),(function (p__59203){
var map__59204 = p__59203;
var map__59204__$1 = cljs.core.__destructure_map(map__59204);
var msg__$1 = map__59204__$1;
var sources__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59204__$1,new cljs.core.Keyword(null,"sources","sources",-321166424));
try{shadow.cljs.devtools.client.browser.do_js_load(sources__$1);

if(cljs.core.seq(js_requires)){
shadow.cljs.devtools.client.browser.do_js_requires(js_requires);
} else {
}

return (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(sources_to_load) : done.call(null,sources_to_load));
}catch (e59205){var ex = e59205;
return (error.cljs$core$IFn$_invoke$arity$1 ? error.cljs$core$IFn$_invoke$arity$1(ex) : error.call(null,ex));
}})], null));
}
}));

shadow.cljs.devtools.client.shared.add_plugin_BANG_(new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282),cljs.core.PersistentHashSet.EMPTY,(function (p__59206){
var map__59207 = p__59206;
var map__59207__$1 = cljs.core.__destructure_map(map__59207);
var env = map__59207__$1;
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59207__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
var svc = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"runtime","runtime",-1331573996),runtime], null);
shadow.remote.runtime.api.add_extension(runtime,new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"on-welcome","on-welcome",1895317125),(function (){
cljs.core.reset_BANG_(shadow.cljs.devtools.client.browser.ws_was_welcome_ref,true);

shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

shadow.cljs.devtools.client.env.patch_goog_BANG_();

return shadow.cljs.devtools.client.browser.devtools_msg(["#",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"client-id","client-id",-464622140).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(new cljs.core.Keyword(null,"state-ref","state-ref",2127874952).cljs$core$IFn$_invoke$arity$1(runtime))))," ready!"].join(''));
}),new cljs.core.Keyword(null,"on-disconnect","on-disconnect",-809021814),(function (e){
if(cljs.core.truth_(cljs.core.deref(shadow.cljs.devtools.client.browser.ws_was_welcome_ref))){
shadow.cljs.devtools.client.hud.connection_error("The Websocket connection was closed!");

return cljs.core.reset_BANG_(shadow.cljs.devtools.client.browser.ws_was_welcome_ref,false);
} else {
return null;
}
}),new cljs.core.Keyword(null,"on-reconnect","on-reconnect",1239988702),(function (e){
return shadow.cljs.devtools.client.hud.connection_error("Reconnecting ...");
}),new cljs.core.Keyword(null,"ops","ops",1237330063),new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"access-denied","access-denied",959449406),(function (msg){
cljs.core.reset_BANG_(shadow.cljs.devtools.client.browser.ws_was_welcome_ref,false);

return shadow.cljs.devtools.client.hud.connection_error(["Stale Output! Your loaded JS was not produced by the running shadow-cljs instance."," Is the watch for this build running?"].join(''));
}),new cljs.core.Keyword(null,"cljs-runtime-init","cljs-runtime-init",1305890232),(function (msg){
return shadow.cljs.devtools.client.browser.repl_init(runtime,msg);
}),new cljs.core.Keyword(null,"cljs-asset-update","cljs-asset-update",1224093028),(function (p__59212){
var map__59213 = p__59212;
var map__59213__$1 = cljs.core.__destructure_map(map__59213);
var msg = map__59213__$1;
var updates = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59213__$1,new cljs.core.Keyword(null,"updates","updates",2013983452));
return shadow.cljs.devtools.client.browser.handle_asset_update(msg);
}),new cljs.core.Keyword(null,"cljs-build-configure","cljs-build-configure",-2089891268),(function (msg){
return null;
}),new cljs.core.Keyword(null,"cljs-build-start","cljs-build-start",-725781241),(function (msg){
shadow.cljs.devtools.client.hud.hud_hide();

shadow.cljs.devtools.client.hud.load_start();

return shadow.cljs.devtools.client.env.run_custom_notify_BANG_(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"build-start","build-start",-959649480)));
}),new cljs.core.Keyword(null,"cljs-build-complete","cljs-build-complete",273626153),(function (msg){
var msg__$1 = shadow.cljs.devtools.client.env.add_warnings_to_info(msg);
shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

shadow.cljs.devtools.client.hud.hud_warnings(msg__$1);

shadow.cljs.devtools.client.browser.handle_build_complete(runtime,msg__$1);

return shadow.cljs.devtools.client.env.run_custom_notify_BANG_(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg__$1,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"build-complete","build-complete",-501868472)));
}),new cljs.core.Keyword(null,"cljs-build-failure","cljs-build-failure",1718154990),(function (msg){
shadow.cljs.devtools.client.hud.load_end();

shadow.cljs.devtools.client.hud.hud_error(msg);

return shadow.cljs.devtools.client.env.run_custom_notify_BANG_(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"build-failure","build-failure",-2107487466)));
}),new cljs.core.Keyword("shadow.cljs.devtools.client.env","worker-notify","shadow.cljs.devtools.client.env/worker-notify",-1456820670),(function (p__59215){
var map__59216 = p__59215;
var map__59216__$1 = cljs.core.__destructure_map(map__59216);
var event_op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59216__$1,new cljs.core.Keyword(null,"event-op","event-op",200358057));
var client_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59216__$1,new cljs.core.Keyword(null,"client-id","client-id",-464622140));
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"client-disconnect","client-disconnect",640227957),event_op)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(client_id,shadow.cljs.devtools.client.env.worker_client_id)))){
shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

return shadow.cljs.devtools.client.hud.connection_error("The watch for this build was stopped!");
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"client-connect","client-connect",-1113973888),event_op)){
shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

return shadow.cljs.devtools.client.hud.connection_error("The watch for this build was restarted. Reload required!");
} else {
return null;
}
}
})], null)], null));

return svc;
}),(function (p__59218){
var map__59219 = p__59218;
var map__59219__$1 = cljs.core.__destructure_map(map__59219);
var svc = map__59219__$1;
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__59219__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
return shadow.remote.runtime.api.del_extension(runtime,new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282));
}));

shadow.cljs.devtools.client.shared.init_runtime_BANG_(shadow.cljs.devtools.client.browser.client_info,shadow.cljs.devtools.client.websocket.start,shadow.cljs.devtools.client.websocket.send,shadow.cljs.devtools.client.websocket.stop);
} else {
}

//# sourceMappingURL=shadow.cljs.devtools.client.browser.js.map
