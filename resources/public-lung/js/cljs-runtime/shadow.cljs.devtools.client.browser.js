goog.provide('shadow.cljs.devtools.client.browser');
shadow.cljs.devtools.client.browser.devtools_msg = (function shadow$cljs$devtools$client$browser$devtools_msg(var_args){
var args__4870__auto__ = [];
var len__4864__auto___77143 = arguments.length;
var i__4865__auto___77144 = (0);
while(true){
if((i__4865__auto___77144 < len__4864__auto___77143)){
args__4870__auto__.push((arguments[i__4865__auto___77144]));

var G__77145 = (i__4865__auto___77144 + (1));
i__4865__auto___77144 = G__77145;
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
(shadow.cljs.devtools.client.browser.devtools_msg.cljs$lang$applyTo = (function (seq76999){
var G__77000 = cljs.core.first(seq76999);
var seq76999__$1 = cljs.core.next(seq76999);
var self__4851__auto__ = this;
return self__4851__auto__.cljs$core$IFn$_invoke$arity$variadic(G__77000,seq76999__$1);
}));

shadow.cljs.devtools.client.browser.script_eval = (function shadow$cljs$devtools$client$browser$script_eval(code){
return goog.globalEval(code);
});
shadow.cljs.devtools.client.browser.do_js_load = (function shadow$cljs$devtools$client$browser$do_js_load(sources){
var seq__77003 = cljs.core.seq(sources);
var chunk__77004 = null;
var count__77005 = (0);
var i__77006 = (0);
while(true){
if((i__77006 < count__77005)){
var map__77013 = chunk__77004.cljs$core$IIndexed$_nth$arity$2(null,i__77006);
var map__77013__$1 = cljs.core.__destructure_map(map__77013);
var src = map__77013__$1;
var resource_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__77013__$1,new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582));
var output_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__77013__$1,new cljs.core.Keyword(null,"output-name","output-name",-1769107767));
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__77013__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__77013__$1,new cljs.core.Keyword(null,"js","js",1768080579));
$CLJS.SHADOW_ENV.setLoaded(output_name);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load JS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([resource_name], 0));

shadow.cljs.devtools.client.env.before_load_src(src);

try{shadow.cljs.devtools.client.browser.script_eval([cljs.core.str.cljs$core$IFn$_invoke$arity$1(js),"\n//# sourceURL=",cljs.core.str.cljs$core$IFn$_invoke$arity$1($CLJS.SHADOW_ENV.scriptBase),cljs.core.str.cljs$core$IFn$_invoke$arity$1(output_name)].join(''));
}catch (e77014){var e_77146 = e77014;
if(shadow.cljs.devtools.client.env.log){
console.error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name)].join(''),e_77146);
} else {
}

throw (new Error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name),": ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(e_77146.message)].join('')));
}

var G__77147 = seq__77003;
var G__77148 = chunk__77004;
var G__77149 = count__77005;
var G__77150 = (i__77006 + (1));
seq__77003 = G__77147;
chunk__77004 = G__77148;
count__77005 = G__77149;
i__77006 = G__77150;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__77003);
if(temp__5753__auto__){
var seq__77003__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__77003__$1)){
var c__4679__auto__ = cljs.core.chunk_first(seq__77003__$1);
var G__77151 = cljs.core.chunk_rest(seq__77003__$1);
var G__77152 = c__4679__auto__;
var G__77153 = cljs.core.count(c__4679__auto__);
var G__77154 = (0);
seq__77003 = G__77151;
chunk__77004 = G__77152;
count__77005 = G__77153;
i__77006 = G__77154;
continue;
} else {
var map__77015 = cljs.core.first(seq__77003__$1);
var map__77015__$1 = cljs.core.__destructure_map(map__77015);
var src = map__77015__$1;
var resource_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__77015__$1,new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582));
var output_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__77015__$1,new cljs.core.Keyword(null,"output-name","output-name",-1769107767));
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__77015__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__77015__$1,new cljs.core.Keyword(null,"js","js",1768080579));
$CLJS.SHADOW_ENV.setLoaded(output_name);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load JS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([resource_name], 0));

shadow.cljs.devtools.client.env.before_load_src(src);

try{shadow.cljs.devtools.client.browser.script_eval([cljs.core.str.cljs$core$IFn$_invoke$arity$1(js),"\n//# sourceURL=",cljs.core.str.cljs$core$IFn$_invoke$arity$1($CLJS.SHADOW_ENV.scriptBase),cljs.core.str.cljs$core$IFn$_invoke$arity$1(output_name)].join(''));
}catch (e77016){var e_77155 = e77016;
if(shadow.cljs.devtools.client.env.log){
console.error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name)].join(''),e_77155);
} else {
}

throw (new Error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name),": ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(e_77155.message)].join('')));
}

var G__77156 = cljs.core.next(seq__77003__$1);
var G__77157 = null;
var G__77158 = (0);
var G__77159 = (0);
seq__77003 = G__77156;
chunk__77004 = G__77157;
count__77005 = G__77158;
i__77006 = G__77159;
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
var seq__77017 = cljs.core.seq(js_requires);
var chunk__77018 = null;
var count__77019 = (0);
var i__77020 = (0);
while(true){
if((i__77020 < count__77019)){
var js_ns = chunk__77018.cljs$core$IIndexed$_nth$arity$2(null,i__77020);
var require_str_77160 = ["var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns)," = shadow.js.require(\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns),"\");"].join('');
shadow.cljs.devtools.client.browser.script_eval(require_str_77160);


var G__77161 = seq__77017;
var G__77162 = chunk__77018;
var G__77163 = count__77019;
var G__77164 = (i__77020 + (1));
seq__77017 = G__77161;
chunk__77018 = G__77162;
count__77019 = G__77163;
i__77020 = G__77164;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__77017);
if(temp__5753__auto__){
var seq__77017__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__77017__$1)){
var c__4679__auto__ = cljs.core.chunk_first(seq__77017__$1);
var G__77165 = cljs.core.chunk_rest(seq__77017__$1);
var G__77166 = c__4679__auto__;
var G__77167 = cljs.core.count(c__4679__auto__);
var G__77168 = (0);
seq__77017 = G__77165;
chunk__77018 = G__77166;
count__77019 = G__77167;
i__77020 = G__77168;
continue;
} else {
var js_ns = cljs.core.first(seq__77017__$1);
var require_str_77169 = ["var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns)," = shadow.js.require(\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns),"\");"].join('');
shadow.cljs.devtools.client.browser.script_eval(require_str_77169);


var G__77170 = cljs.core.next(seq__77017__$1);
var G__77171 = null;
var G__77172 = (0);
var G__77173 = (0);
seq__77017 = G__77170;
chunk__77018 = G__77171;
count__77019 = G__77172;
i__77020 = G__77173;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.cljs.devtools.client.browser.handle_build_complete = (function shadow$cljs$devtools$client$browser$handle_build_complete(runtime,p__77022){
var map__77023 = p__77022;
var map__77023__$1 = cljs.core.__destructure_map(map__77023);
var msg = map__77023__$1;
var info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__77023__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var reload_info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__77023__$1,new cljs.core.Keyword(null,"reload-info","reload-info",1648088086));
var warnings = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.distinct.cljs$core$IFn$_invoke$arity$1((function (){var iter__4652__auto__ = (function shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__77024(s__77025){
return (new cljs.core.LazySeq(null,(function (){
var s__77025__$1 = s__77025;
while(true){
var temp__5753__auto__ = cljs.core.seq(s__77025__$1);
if(temp__5753__auto__){
var xs__6308__auto__ = temp__5753__auto__;
var map__77030 = cljs.core.first(xs__6308__auto__);
var map__77030__$1 = cljs.core.__destructure_map(map__77030);
var src = map__77030__$1;
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__77030__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var warnings = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__77030__$1,new cljs.core.Keyword(null,"warnings","warnings",-735437651));
if(cljs.core.not(new cljs.core.Keyword(null,"from-jar","from-jar",1050932827).cljs$core$IFn$_invoke$arity$1(src))){
var iterys__4648__auto__ = ((function (s__77025__$1,map__77030,map__77030__$1,src,resource_name,warnings,xs__6308__auto__,temp__5753__auto__,map__77023,map__77023__$1,msg,info,reload_info){
return (function shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__77024_$_iter__77026(s__77027){
return (new cljs.core.LazySeq(null,((function (s__77025__$1,map__77030,map__77030__$1,src,resource_name,warnings,xs__6308__auto__,temp__5753__auto__,map__77023,map__77023__$1,msg,info,reload_info){
return (function (){
var s__77027__$1 = s__77027;
while(true){
var temp__5753__auto____$1 = cljs.core.seq(s__77027__$1);
if(temp__5753__auto____$1){
var s__77027__$2 = temp__5753__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__77027__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__77027__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__77029 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__77028 = (0);
while(true){
if((i__77028 < size__4651__auto__)){
var warning = cljs.core._nth(c__4650__auto__,i__77028);
cljs.core.chunk_append(b__77029,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(warning,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100),resource_name));

var G__77174 = (i__77028 + (1));
i__77028 = G__77174;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__77029),shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__77024_$_iter__77026(cljs.core.chunk_rest(s__77027__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__77029),null);
}
} else {
var warning = cljs.core.first(s__77027__$2);
return cljs.core.cons(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(warning,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100),resource_name),shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__77024_$_iter__77026(cljs.core.rest(s__77027__$2)));
}
} else {
return null;
}
break;
}
});})(s__77025__$1,map__77030,map__77030__$1,src,resource_name,warnings,xs__6308__auto__,temp__5753__auto__,map__77023,map__77023__$1,msg,info,reload_info))
,null,null));
});})(s__77025__$1,map__77030,map__77030__$1,src,resource_name,warnings,xs__6308__auto__,temp__5753__auto__,map__77023,map__77023__$1,msg,info,reload_info))
;
var fs__4649__auto__ = cljs.core.seq(iterys__4648__auto__(warnings));
if(fs__4649__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__4649__auto__,shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__77024(cljs.core.rest(s__77025__$1)));
} else {
var G__77175 = cljs.core.rest(s__77025__$1);
s__77025__$1 = G__77175;
continue;
}
} else {
var G__77176 = cljs.core.rest(s__77025__$1);
s__77025__$1 = G__77176;
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
var seq__77031_77177 = cljs.core.seq(warnings);
var chunk__77032_77178 = null;
var count__77033_77179 = (0);
var i__77034_77180 = (0);
while(true){
if((i__77034_77180 < count__77033_77179)){
var map__77037_77181 = chunk__77032_77178.cljs$core$IIndexed$_nth$arity$2(null,i__77034_77180);
var map__77037_77182__$1 = cljs.core.__destructure_map(map__77037_77181);
var w_77183 = map__77037_77182__$1;
var msg_77184__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__77037_77182__$1,new cljs.core.Keyword(null,"msg","msg",-1386103444));
var line_77185 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__77037_77182__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column_77186 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__77037_77182__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var resource_name_77187 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__77037_77182__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
console.warn(["BUILD-WARNING in ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name_77187)," at [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line_77185),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column_77186),"]\n\t",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg_77184__$1)].join(''));


var G__77188 = seq__77031_77177;
var G__77189 = chunk__77032_77178;
var G__77190 = count__77033_77179;
var G__77191 = (i__77034_77180 + (1));
seq__77031_77177 = G__77188;
chunk__77032_77178 = G__77189;
count__77033_77179 = G__77190;
i__77034_77180 = G__77191;
continue;
} else {
var temp__5753__auto___77192 = cljs.core.seq(seq__77031_77177);
if(temp__5753__auto___77192){
var seq__77031_77193__$1 = temp__5753__auto___77192;
if(cljs.core.chunked_seq_QMARK_(seq__77031_77193__$1)){
var c__4679__auto___77194 = cljs.core.chunk_first(seq__77031_77193__$1);
var G__77195 = cljs.core.chunk_rest(seq__77031_77193__$1);
var G__77196 = c__4679__auto___77194;
var G__77197 = cljs.core.count(c__4679__auto___77194);
var G__77198 = (0);
seq__77031_77177 = G__77195;
chunk__77032_77178 = G__77196;
count__77033_77179 = G__77197;
i__77034_77180 = G__77198;
continue;
} else {
var map__77038_77199 = cljs.core.first(seq__77031_77193__$1);
var map__77038_77200__$1 = cljs.core.__destructure_map(map__77038_77199);
var w_77201 = map__77038_77200__$1;
var msg_77202__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__77038_77200__$1,new cljs.core.Keyword(null,"msg","msg",-1386103444));
var line_77203 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__77038_77200__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column_77204 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__77038_77200__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var resource_name_77205 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__77038_77200__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
console.warn(["BUILD-WARNING in ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name_77205)," at [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line_77203),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column_77204),"]\n\t",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg_77202__$1)].join(''));


var G__77206 = cljs.core.next(seq__77031_77193__$1);
var G__77207 = null;
var G__77208 = (0);
var G__77209 = (0);
seq__77031_77177 = G__77206;
chunk__77032_77178 = G__77207;
count__77033_77179 = G__77208;
i__77034_77180 = G__77209;
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

return shadow.cljs.devtools.client.shared.load_sources(runtime,sources_to_get,(function (p1__77021_SHARP_){
return shadow.cljs.devtools.client.browser.do_js_reload(msg,p1__77021_SHARP_,shadow.cljs.devtools.client.hud.load_end_success,shadow.cljs.devtools.client.hud.load_failure);
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
shadow.cljs.devtools.client.browser.handle_asset_update = (function shadow$cljs$devtools$client$browser$handle_asset_update(p__77039){
var map__77040 = p__77039;
var map__77040__$1 = cljs.core.__destructure_map(map__77040);
var msg = map__77040__$1;
var updates = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__77040__$1,new cljs.core.Keyword(null,"updates","updates",2013983452));
var seq__77041 = cljs.core.seq(updates);
var chunk__77043 = null;
var count__77044 = (0);
var i__77045 = (0);
while(true){
if((i__77045 < count__77044)){
var path = chunk__77043.cljs$core$IIndexed$_nth$arity$2(null,i__77045);
if(clojure.string.ends_with_QMARK_(path,"css")){
var seq__77075_77210 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("link[rel=\"stylesheet\"]")));
var chunk__77079_77211 = null;
var count__77080_77212 = (0);
var i__77081_77213 = (0);
while(true){
if((i__77081_77213 < count__77080_77212)){
var node_77214 = chunk__77079_77211.cljs$core$IIndexed$_nth$arity$2(null,i__77081_77213);
if(cljs.core.not(node_77214.shadow$old)){
var path_match_77215 = shadow.cljs.devtools.client.browser.match_paths(node_77214.getAttribute("href"),path);
if(cljs.core.truth_(path_match_77215)){
var new_link_77216 = (function (){var G__77087 = node_77214.cloneNode(true);
G__77087.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_77215),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__77087;
})();
(node_77214.shadow$old = true);

(new_link_77216.onload = ((function (seq__77075_77210,chunk__77079_77211,count__77080_77212,i__77081_77213,seq__77041,chunk__77043,count__77044,i__77045,new_link_77216,path_match_77215,node_77214,path,map__77040,map__77040__$1,msg,updates){
return (function (e){
return goog.dom.removeNode(node_77214);
});})(seq__77075_77210,chunk__77079_77211,count__77080_77212,i__77081_77213,seq__77041,chunk__77043,count__77044,i__77045,new_link_77216,path_match_77215,node_77214,path,map__77040,map__77040__$1,msg,updates))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_77215], 0));

goog.dom.insertSiblingAfter(new_link_77216,node_77214);


var G__77217 = seq__77075_77210;
var G__77218 = chunk__77079_77211;
var G__77219 = count__77080_77212;
var G__77220 = (i__77081_77213 + (1));
seq__77075_77210 = G__77217;
chunk__77079_77211 = G__77218;
count__77080_77212 = G__77219;
i__77081_77213 = G__77220;
continue;
} else {
var G__77221 = seq__77075_77210;
var G__77222 = chunk__77079_77211;
var G__77223 = count__77080_77212;
var G__77224 = (i__77081_77213 + (1));
seq__77075_77210 = G__77221;
chunk__77079_77211 = G__77222;
count__77080_77212 = G__77223;
i__77081_77213 = G__77224;
continue;
}
} else {
var G__77225 = seq__77075_77210;
var G__77226 = chunk__77079_77211;
var G__77227 = count__77080_77212;
var G__77228 = (i__77081_77213 + (1));
seq__77075_77210 = G__77225;
chunk__77079_77211 = G__77226;
count__77080_77212 = G__77227;
i__77081_77213 = G__77228;
continue;
}
} else {
var temp__5753__auto___77229 = cljs.core.seq(seq__77075_77210);
if(temp__5753__auto___77229){
var seq__77075_77230__$1 = temp__5753__auto___77229;
if(cljs.core.chunked_seq_QMARK_(seq__77075_77230__$1)){
var c__4679__auto___77231 = cljs.core.chunk_first(seq__77075_77230__$1);
var G__77232 = cljs.core.chunk_rest(seq__77075_77230__$1);
var G__77233 = c__4679__auto___77231;
var G__77234 = cljs.core.count(c__4679__auto___77231);
var G__77235 = (0);
seq__77075_77210 = G__77232;
chunk__77079_77211 = G__77233;
count__77080_77212 = G__77234;
i__77081_77213 = G__77235;
continue;
} else {
var node_77236 = cljs.core.first(seq__77075_77230__$1);
if(cljs.core.not(node_77236.shadow$old)){
var path_match_77237 = shadow.cljs.devtools.client.browser.match_paths(node_77236.getAttribute("href"),path);
if(cljs.core.truth_(path_match_77237)){
var new_link_77238 = (function (){var G__77088 = node_77236.cloneNode(true);
G__77088.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_77237),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__77088;
})();
(node_77236.shadow$old = true);

(new_link_77238.onload = ((function (seq__77075_77210,chunk__77079_77211,count__77080_77212,i__77081_77213,seq__77041,chunk__77043,count__77044,i__77045,new_link_77238,path_match_77237,node_77236,seq__77075_77230__$1,temp__5753__auto___77229,path,map__77040,map__77040__$1,msg,updates){
return (function (e){
return goog.dom.removeNode(node_77236);
});})(seq__77075_77210,chunk__77079_77211,count__77080_77212,i__77081_77213,seq__77041,chunk__77043,count__77044,i__77045,new_link_77238,path_match_77237,node_77236,seq__77075_77230__$1,temp__5753__auto___77229,path,map__77040,map__77040__$1,msg,updates))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_77237], 0));

goog.dom.insertSiblingAfter(new_link_77238,node_77236);


var G__77239 = cljs.core.next(seq__77075_77230__$1);
var G__77240 = null;
var G__77241 = (0);
var G__77242 = (0);
seq__77075_77210 = G__77239;
chunk__77079_77211 = G__77240;
count__77080_77212 = G__77241;
i__77081_77213 = G__77242;
continue;
} else {
var G__77243 = cljs.core.next(seq__77075_77230__$1);
var G__77244 = null;
var G__77245 = (0);
var G__77246 = (0);
seq__77075_77210 = G__77243;
chunk__77079_77211 = G__77244;
count__77080_77212 = G__77245;
i__77081_77213 = G__77246;
continue;
}
} else {
var G__77247 = cljs.core.next(seq__77075_77230__$1);
var G__77248 = null;
var G__77249 = (0);
var G__77250 = (0);
seq__77075_77210 = G__77247;
chunk__77079_77211 = G__77248;
count__77080_77212 = G__77249;
i__77081_77213 = G__77250;
continue;
}
}
} else {
}
}
break;
}


var G__77251 = seq__77041;
var G__77252 = chunk__77043;
var G__77253 = count__77044;
var G__77254 = (i__77045 + (1));
seq__77041 = G__77251;
chunk__77043 = G__77252;
count__77044 = G__77253;
i__77045 = G__77254;
continue;
} else {
var G__77255 = seq__77041;
var G__77256 = chunk__77043;
var G__77257 = count__77044;
var G__77258 = (i__77045 + (1));
seq__77041 = G__77255;
chunk__77043 = G__77256;
count__77044 = G__77257;
i__77045 = G__77258;
continue;
}
} else {
var temp__5753__auto__ = cljs.core.seq(seq__77041);
if(temp__5753__auto__){
var seq__77041__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__77041__$1)){
var c__4679__auto__ = cljs.core.chunk_first(seq__77041__$1);
var G__77259 = cljs.core.chunk_rest(seq__77041__$1);
var G__77260 = c__4679__auto__;
var G__77261 = cljs.core.count(c__4679__auto__);
var G__77262 = (0);
seq__77041 = G__77259;
chunk__77043 = G__77260;
count__77044 = G__77261;
i__77045 = G__77262;
continue;
} else {
var path = cljs.core.first(seq__77041__$1);
if(clojure.string.ends_with_QMARK_(path,"css")){
var seq__77089_77263 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("link[rel=\"stylesheet\"]")));
var chunk__77093_77264 = null;
var count__77094_77265 = (0);
var i__77095_77266 = (0);
while(true){
if((i__77095_77266 < count__77094_77265)){
var node_77267 = chunk__77093_77264.cljs$core$IIndexed$_nth$arity$2(null,i__77095_77266);
if(cljs.core.not(node_77267.shadow$old)){
var path_match_77268 = shadow.cljs.devtools.client.browser.match_paths(node_77267.getAttribute("href"),path);
if(cljs.core.truth_(path_match_77268)){
var new_link_77269 = (function (){var G__77107 = node_77267.cloneNode(true);
G__77107.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_77268),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__77107;
})();
(node_77267.shadow$old = true);

(new_link_77269.onload = ((function (seq__77089_77263,chunk__77093_77264,count__77094_77265,i__77095_77266,seq__77041,chunk__77043,count__77044,i__77045,new_link_77269,path_match_77268,node_77267,path,seq__77041__$1,temp__5753__auto__,map__77040,map__77040__$1,msg,updates){
return (function (e){
return goog.dom.removeNode(node_77267);
});})(seq__77089_77263,chunk__77093_77264,count__77094_77265,i__77095_77266,seq__77041,chunk__77043,count__77044,i__77045,new_link_77269,path_match_77268,node_77267,path,seq__77041__$1,temp__5753__auto__,map__77040,map__77040__$1,msg,updates))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_77268], 0));

goog.dom.insertSiblingAfter(new_link_77269,node_77267);


var G__77270 = seq__77089_77263;
var G__77271 = chunk__77093_77264;
var G__77272 = count__77094_77265;
var G__77273 = (i__77095_77266 + (1));
seq__77089_77263 = G__77270;
chunk__77093_77264 = G__77271;
count__77094_77265 = G__77272;
i__77095_77266 = G__77273;
continue;
} else {
var G__77274 = seq__77089_77263;
var G__77275 = chunk__77093_77264;
var G__77276 = count__77094_77265;
var G__77277 = (i__77095_77266 + (1));
seq__77089_77263 = G__77274;
chunk__77093_77264 = G__77275;
count__77094_77265 = G__77276;
i__77095_77266 = G__77277;
continue;
}
} else {
var G__77278 = seq__77089_77263;
var G__77279 = chunk__77093_77264;
var G__77280 = count__77094_77265;
var G__77281 = (i__77095_77266 + (1));
seq__77089_77263 = G__77278;
chunk__77093_77264 = G__77279;
count__77094_77265 = G__77280;
i__77095_77266 = G__77281;
continue;
}
} else {
var temp__5753__auto___77282__$1 = cljs.core.seq(seq__77089_77263);
if(temp__5753__auto___77282__$1){
var seq__77089_77283__$1 = temp__5753__auto___77282__$1;
if(cljs.core.chunked_seq_QMARK_(seq__77089_77283__$1)){
var c__4679__auto___77284 = cljs.core.chunk_first(seq__77089_77283__$1);
var G__77285 = cljs.core.chunk_rest(seq__77089_77283__$1);
var G__77286 = c__4679__auto___77284;
var G__77287 = cljs.core.count(c__4679__auto___77284);
var G__77288 = (0);
seq__77089_77263 = G__77285;
chunk__77093_77264 = G__77286;
count__77094_77265 = G__77287;
i__77095_77266 = G__77288;
continue;
} else {
var node_77289 = cljs.core.first(seq__77089_77283__$1);
if(cljs.core.not(node_77289.shadow$old)){
var path_match_77290 = shadow.cljs.devtools.client.browser.match_paths(node_77289.getAttribute("href"),path);
if(cljs.core.truth_(path_match_77290)){
var new_link_77291 = (function (){var G__77108 = node_77289.cloneNode(true);
G__77108.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_77290),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__77108;
})();
(node_77289.shadow$old = true);

(new_link_77291.onload = ((function (seq__77089_77263,chunk__77093_77264,count__77094_77265,i__77095_77266,seq__77041,chunk__77043,count__77044,i__77045,new_link_77291,path_match_77290,node_77289,seq__77089_77283__$1,temp__5753__auto___77282__$1,path,seq__77041__$1,temp__5753__auto__,map__77040,map__77040__$1,msg,updates){
return (function (e){
return goog.dom.removeNode(node_77289);
});})(seq__77089_77263,chunk__77093_77264,count__77094_77265,i__77095_77266,seq__77041,chunk__77043,count__77044,i__77045,new_link_77291,path_match_77290,node_77289,seq__77089_77283__$1,temp__5753__auto___77282__$1,path,seq__77041__$1,temp__5753__auto__,map__77040,map__77040__$1,msg,updates))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_77290], 0));

goog.dom.insertSiblingAfter(new_link_77291,node_77289);


var G__77296 = cljs.core.next(seq__77089_77283__$1);
var G__77297 = null;
var G__77298 = (0);
var G__77299 = (0);
seq__77089_77263 = G__77296;
chunk__77093_77264 = G__77297;
count__77094_77265 = G__77298;
i__77095_77266 = G__77299;
continue;
} else {
var G__77300 = cljs.core.next(seq__77089_77283__$1);
var G__77301 = null;
var G__77302 = (0);
var G__77303 = (0);
seq__77089_77263 = G__77300;
chunk__77093_77264 = G__77301;
count__77094_77265 = G__77302;
i__77095_77266 = G__77303;
continue;
}
} else {
var G__77304 = cljs.core.next(seq__77089_77283__$1);
var G__77305 = null;
var G__77306 = (0);
var G__77307 = (0);
seq__77089_77263 = G__77304;
chunk__77093_77264 = G__77305;
count__77094_77265 = G__77306;
i__77095_77266 = G__77307;
continue;
}
}
} else {
}
}
break;
}


var G__77309 = cljs.core.next(seq__77041__$1);
var G__77310 = null;
var G__77311 = (0);
var G__77312 = (0);
seq__77041 = G__77309;
chunk__77043 = G__77310;
count__77044 = G__77311;
i__77045 = G__77312;
continue;
} else {
var G__77313 = cljs.core.next(seq__77041__$1);
var G__77314 = null;
var G__77315 = (0);
var G__77316 = (0);
seq__77041 = G__77313;
chunk__77043 = G__77314;
count__77044 = G__77315;
i__77045 = G__77316;
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
shadow.cljs.devtools.client.browser.repl_init = (function shadow$cljs$devtools$client$browser$repl_init(runtime,p__77115){
var map__77116 = p__77115;
var map__77116__$1 = cljs.core.__destructure_map(map__77116);
var repl_state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__77116__$1,new cljs.core.Keyword(null,"repl-state","repl-state",-1733780387));
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

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_invoke$arity$2 = (function (this$,p__77119){
var map__77120 = p__77119;
var map__77120__$1 = cljs.core.__destructure_map(map__77120);
var _ = map__77120__$1;
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__77120__$1,new cljs.core.Keyword(null,"js","js",1768080579));
var this$__$1 = this;
return shadow.cljs.devtools.client.browser.global_eval(js);
}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_repl_init$arity$4 = (function (runtime,p__77121,done,error){
var map__77122 = p__77121;
var map__77122__$1 = cljs.core.__destructure_map(map__77122);
var repl_sources = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__77122__$1,new cljs.core.Keyword(null,"repl-sources","repl-sources",723867535));
var runtime__$1 = this;
return shadow.cljs.devtools.client.shared.load_sources(runtime__$1,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2(shadow.cljs.devtools.client.env.src_is_loaded_QMARK_,repl_sources)),(function (sources){
shadow.cljs.devtools.client.browser.do_js_load(sources);

return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_repl_require$arity$4 = (function (runtime,p__77123,done,error){
var map__77124 = p__77123;
var map__77124__$1 = cljs.core.__destructure_map(map__77124);
var msg = map__77124__$1;
var sources = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__77124__$1,new cljs.core.Keyword(null,"sources","sources",-321166424));
var reload_namespaces = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__77124__$1,new cljs.core.Keyword(null,"reload-namespaces","reload-namespaces",250210134));
var js_requires = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__77124__$1,new cljs.core.Keyword(null,"js-requires","js-requires",-1311472051));
var runtime__$1 = this;
var sources_to_load = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p__77125){
var map__77126 = p__77125;
var map__77126__$1 = cljs.core.__destructure_map(map__77126);
var src = map__77126__$1;
var provides = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__77126__$1,new cljs.core.Keyword(null,"provides","provides",-1634397992));
var and__4251__auto__ = shadow.cljs.devtools.client.env.src_is_loaded_QMARK_(src);
if(cljs.core.truth_(and__4251__auto__)){
return cljs.core.not(cljs.core.some(reload_namespaces,provides));
} else {
return and__4251__auto__;
}
}),sources));
if(cljs.core.not(cljs.core.seq(sources_to_load))){
var G__77127 = cljs.core.PersistentVector.EMPTY;
return (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(G__77127) : done.call(null,G__77127));
} else {
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$3(runtime__$1,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"cljs-load-sources","cljs-load-sources",-1458295962),new cljs.core.Keyword(null,"to","to",192099007),shadow.cljs.devtools.client.env.worker_client_id,new cljs.core.Keyword(null,"sources","sources",-321166424),cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582)),sources_to_load)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cljs-sources","cljs-sources",31121610),(function (p__77128){
var map__77129 = p__77128;
var map__77129__$1 = cljs.core.__destructure_map(map__77129);
var msg__$1 = map__77129__$1;
var sources__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__77129__$1,new cljs.core.Keyword(null,"sources","sources",-321166424));
try{shadow.cljs.devtools.client.browser.do_js_load(sources__$1);

if(cljs.core.seq(js_requires)){
shadow.cljs.devtools.client.browser.do_js_requires(js_requires);
} else {
}

return (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(sources_to_load) : done.call(null,sources_to_load));
}catch (e77130){var ex = e77130;
return (error.cljs$core$IFn$_invoke$arity$1 ? error.cljs$core$IFn$_invoke$arity$1(ex) : error.call(null,ex));
}})], null));
}
}));

shadow.cljs.devtools.client.shared.add_plugin_BANG_(new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282),cljs.core.PersistentHashSet.EMPTY,(function (p__77131){
var map__77132 = p__77131;
var map__77132__$1 = cljs.core.__destructure_map(map__77132);
var env = map__77132__$1;
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__77132__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
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
}),new cljs.core.Keyword(null,"cljs-asset-update","cljs-asset-update",1224093028),(function (p__77133){
var map__77134 = p__77133;
var map__77134__$1 = cljs.core.__destructure_map(map__77134);
var msg = map__77134__$1;
var updates = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__77134__$1,new cljs.core.Keyword(null,"updates","updates",2013983452));
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
}),new cljs.core.Keyword("shadow.cljs.devtools.client.env","worker-notify","shadow.cljs.devtools.client.env/worker-notify",-1456820670),(function (p__77135){
var map__77136 = p__77135;
var map__77136__$1 = cljs.core.__destructure_map(map__77136);
var event_op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__77136__$1,new cljs.core.Keyword(null,"event-op","event-op",200358057));
var client_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__77136__$1,new cljs.core.Keyword(null,"client-id","client-id",-464622140));
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
}),(function (p__77138){
var map__77139 = p__77138;
var map__77139__$1 = cljs.core.__destructure_map(map__77139);
var svc = map__77139__$1;
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__77139__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
return shadow.remote.runtime.api.del_extension(runtime,new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282));
}));

shadow.cljs.devtools.client.shared.init_runtime_BANG_(shadow.cljs.devtools.client.browser.client_info,shadow.cljs.devtools.client.websocket.start,shadow.cljs.devtools.client.websocket.send,shadow.cljs.devtools.client.websocket.stop);
} else {
}

//# sourceMappingURL=shadow.cljs.devtools.client.browser.js.map
