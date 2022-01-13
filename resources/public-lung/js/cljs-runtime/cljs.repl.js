goog.provide('cljs.repl');
cljs.repl.print_doc = (function cljs$repl$print_doc(p__76319){
var map__76320 = p__76319;
var map__76320__$1 = cljs.core.__destructure_map(map__76320);
var m = map__76320__$1;
var n = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__76320__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
var nm = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__76320__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["-------------------------"], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (){var or__4253__auto__ = new cljs.core.Keyword(null,"spec","spec",347520401).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__4253__auto__)){
return or__4253__auto__;
} else {
return [(function (){var temp__5753__auto__ = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(temp__5753__auto__)){
var ns = temp__5753__auto__;
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns),"/"].join('');
} else {
return null;
}
})(),cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join('');
}
})()], 0));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Protocol"], 0));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m))){
var seq__76321_76533 = cljs.core.seq(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m));
var chunk__76322_76534 = null;
var count__76323_76535 = (0);
var i__76324_76536 = (0);
while(true){
if((i__76324_76536 < count__76323_76535)){
var f_76537 = chunk__76322_76534.cljs$core$IIndexed$_nth$arity$2(null,i__76324_76536);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["  ",f_76537], 0));


var G__76538 = seq__76321_76533;
var G__76539 = chunk__76322_76534;
var G__76540 = count__76323_76535;
var G__76541 = (i__76324_76536 + (1));
seq__76321_76533 = G__76538;
chunk__76322_76534 = G__76539;
count__76323_76535 = G__76540;
i__76324_76536 = G__76541;
continue;
} else {
var temp__5753__auto___76542 = cljs.core.seq(seq__76321_76533);
if(temp__5753__auto___76542){
var seq__76321_76543__$1 = temp__5753__auto___76542;
if(cljs.core.chunked_seq_QMARK_(seq__76321_76543__$1)){
var c__4679__auto___76544 = cljs.core.chunk_first(seq__76321_76543__$1);
var G__76545 = cljs.core.chunk_rest(seq__76321_76543__$1);
var G__76546 = c__4679__auto___76544;
var G__76547 = cljs.core.count(c__4679__auto___76544);
var G__76548 = (0);
seq__76321_76533 = G__76545;
chunk__76322_76534 = G__76546;
count__76323_76535 = G__76547;
i__76324_76536 = G__76548;
continue;
} else {
var f_76549 = cljs.core.first(seq__76321_76543__$1);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["  ",f_76549], 0));


var G__76550 = cljs.core.next(seq__76321_76543__$1);
var G__76551 = null;
var G__76552 = (0);
var G__76553 = (0);
seq__76321_76533 = G__76550;
chunk__76322_76534 = G__76551;
count__76323_76535 = G__76552;
i__76324_76536 = G__76553;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
var arglists_76554 = new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__4253__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__4253__auto__)){
return or__4253__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([arglists_76554], 0));
} else {
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first(arglists_76554)))?cljs.core.second(arglists_76554):arglists_76554)], 0));
}
} else {
}
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"special-form","special-form",-1326536374).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Special Form"], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m)], 0));

if(cljs.core.contains_QMARK_(m,new cljs.core.Keyword(null,"url","url",276297046))){
if(cljs.core.truth_(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))){
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n  Please see http://clojure.org/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))].join('')], 0));
} else {
return null;
}
} else {
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n  Please see http://clojure.org/special_forms#",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join('')], 0));
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Macro"], 0));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"spec","spec",347520401).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Spec"], 0));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["REPL Special Function"], 0));
} else {
}

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m)], 0));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
var seq__76330_76556 = cljs.core.seq(new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m));
var chunk__76331_76557 = null;
var count__76332_76558 = (0);
var i__76333_76559 = (0);
while(true){
if((i__76333_76559 < count__76332_76558)){
var vec__76344_76560 = chunk__76331_76557.cljs$core$IIndexed$_nth$arity$2(null,i__76333_76559);
var name_76561 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__76344_76560,(0),null);
var map__76347_76562 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__76344_76560,(1),null);
var map__76347_76563__$1 = cljs.core.__destructure_map(map__76347_76562);
var doc_76564 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__76347_76563__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_76565 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__76347_76563__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",name_76561], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",arglists_76565], 0));

if(cljs.core.truth_(doc_76564)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",doc_76564], 0));
} else {
}


var G__76566 = seq__76330_76556;
var G__76567 = chunk__76331_76557;
var G__76568 = count__76332_76558;
var G__76569 = (i__76333_76559 + (1));
seq__76330_76556 = G__76566;
chunk__76331_76557 = G__76567;
count__76332_76558 = G__76568;
i__76333_76559 = G__76569;
continue;
} else {
var temp__5753__auto___76570 = cljs.core.seq(seq__76330_76556);
if(temp__5753__auto___76570){
var seq__76330_76571__$1 = temp__5753__auto___76570;
if(cljs.core.chunked_seq_QMARK_(seq__76330_76571__$1)){
var c__4679__auto___76572 = cljs.core.chunk_first(seq__76330_76571__$1);
var G__76573 = cljs.core.chunk_rest(seq__76330_76571__$1);
var G__76574 = c__4679__auto___76572;
var G__76575 = cljs.core.count(c__4679__auto___76572);
var G__76576 = (0);
seq__76330_76556 = G__76573;
chunk__76331_76557 = G__76574;
count__76332_76558 = G__76575;
i__76333_76559 = G__76576;
continue;
} else {
var vec__76350_76577 = cljs.core.first(seq__76330_76571__$1);
var name_76578 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__76350_76577,(0),null);
var map__76353_76579 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__76350_76577,(1),null);
var map__76353_76580__$1 = cljs.core.__destructure_map(map__76353_76579);
var doc_76581 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__76353_76580__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_76582 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__76353_76580__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",name_76578], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",arglists_76582], 0));

if(cljs.core.truth_(doc_76581)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",doc_76581], 0));
} else {
}


var G__76583 = cljs.core.next(seq__76330_76571__$1);
var G__76584 = null;
var G__76585 = (0);
var G__76586 = (0);
seq__76330_76556 = G__76583;
chunk__76331_76557 = G__76584;
count__76332_76558 = G__76585;
i__76333_76559 = G__76586;
continue;
}
} else {
}
}
break;
}
} else {
}

if(cljs.core.truth_(n)){
var temp__5753__auto__ = cljs.spec.alpha.get_spec(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.ns_name(n)),cljs.core.name(nm)));
if(cljs.core.truth_(temp__5753__auto__)){
var fnspec = temp__5753__auto__;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Spec"], 0));

var seq__76355 = cljs.core.seq(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"args","args",1315556576),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Keyword(null,"fn","fn",-1175266204)], null));
var chunk__76356 = null;
var count__76357 = (0);
var i__76358 = (0);
while(true){
if((i__76358 < count__76357)){
var role = chunk__76356.cljs$core$IIndexed$_nth$arity$2(null,i__76358);
var temp__5753__auto___76587__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(fnspec,role);
if(cljs.core.truth_(temp__5753__auto___76587__$1)){
var spec_76588 = temp__5753__auto___76587__$1;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n ",cljs.core.name(role),":"].join(''),cljs.spec.alpha.describe(spec_76588)], 0));
} else {
}


var G__76589 = seq__76355;
var G__76590 = chunk__76356;
var G__76591 = count__76357;
var G__76592 = (i__76358 + (1));
seq__76355 = G__76589;
chunk__76356 = G__76590;
count__76357 = G__76591;
i__76358 = G__76592;
continue;
} else {
var temp__5753__auto____$1 = cljs.core.seq(seq__76355);
if(temp__5753__auto____$1){
var seq__76355__$1 = temp__5753__auto____$1;
if(cljs.core.chunked_seq_QMARK_(seq__76355__$1)){
var c__4679__auto__ = cljs.core.chunk_first(seq__76355__$1);
var G__76593 = cljs.core.chunk_rest(seq__76355__$1);
var G__76594 = c__4679__auto__;
var G__76595 = cljs.core.count(c__4679__auto__);
var G__76596 = (0);
seq__76355 = G__76593;
chunk__76356 = G__76594;
count__76357 = G__76595;
i__76358 = G__76596;
continue;
} else {
var role = cljs.core.first(seq__76355__$1);
var temp__5753__auto___76597__$2 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(fnspec,role);
if(cljs.core.truth_(temp__5753__auto___76597__$2)){
var spec_76598 = temp__5753__auto___76597__$2;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n ",cljs.core.name(role),":"].join(''),cljs.spec.alpha.describe(spec_76598)], 0));
} else {
}


var G__76599 = cljs.core.next(seq__76355__$1);
var G__76600 = null;
var G__76601 = (0);
var G__76602 = (0);
seq__76355 = G__76599;
chunk__76356 = G__76600;
count__76357 = G__76601;
i__76358 = G__76602;
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
} else {
return null;
}
}
});
/**
 * Constructs a data representation for a Error with keys:
 *  :cause - root cause message
 *  :phase - error phase
 *  :via - cause chain, with cause keys:
 *           :type - exception class symbol
 *           :message - exception message
 *           :data - ex-data
 *           :at - top stack element
 *  :trace - root cause stack elements
 */
cljs.repl.Error__GT_map = (function cljs$repl$Error__GT_map(o){
var base = (function (t){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),(((t instanceof cljs.core.ExceptionInfo))?new cljs.core.Symbol("cljs.core","ExceptionInfo","cljs.core/ExceptionInfo",701839050,null):(((t instanceof Error))?cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("js",t.name):null
))], null),(function (){var temp__5753__auto__ = cljs.core.ex_message(t);
if(cljs.core.truth_(temp__5753__auto__)){
var msg = temp__5753__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"message","message",-406056002),msg], null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.ex_data(t);
if(cljs.core.truth_(temp__5753__auto__)){
var ed = temp__5753__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data","data",-232669377),ed], null);
} else {
return null;
}
})()], 0));
});
var via = (function (){var via = cljs.core.PersistentVector.EMPTY;
var t = o;
while(true){
if(cljs.core.truth_(t)){
var G__76603 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(via,t);
var G__76604 = cljs.core.ex_cause(t);
via = G__76603;
t = G__76604;
continue;
} else {
return via;
}
break;
}
})();
var root = cljs.core.peek(via);
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"via","via",-1904457336),cljs.core.vec(cljs.core.map.cljs$core$IFn$_invoke$arity$2(base,via)),new cljs.core.Keyword(null,"trace","trace",-1082747415),null], null),(function (){var temp__5753__auto__ = cljs.core.ex_message(root);
if(cljs.core.truth_(temp__5753__auto__)){
var root_msg = temp__5753__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cause","cause",231901252),root_msg], null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = cljs.core.ex_data(root);
if(cljs.core.truth_(temp__5753__auto__)){
var data = temp__5753__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data","data",-232669377),data], null);
} else {
return null;
}
})(),(function (){var temp__5753__auto__ = new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358).cljs$core$IFn$_invoke$arity$1(cljs.core.ex_data(o));
if(cljs.core.truth_(temp__5753__auto__)){
var phase = temp__5753__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"phase","phase",575722892),phase], null);
} else {
return null;
}
})()], 0));
});
/**
 * Returns an analysis of the phase, error, cause, and location of an error that occurred
 *   based on Throwable data, as returned by Throwable->map. All attributes other than phase
 *   are optional:
 *  :clojure.error/phase - keyword phase indicator, one of:
 *    :read-source :compile-syntax-check :compilation :macro-syntax-check :macroexpansion
 *    :execution :read-eval-result :print-eval-result
 *  :clojure.error/source - file name (no path)
 *  :clojure.error/line - integer line number
 *  :clojure.error/column - integer column number
 *  :clojure.error/symbol - symbol being expanded/compiled/invoked
 *  :clojure.error/class - cause exception class symbol
 *  :clojure.error/cause - cause exception message
 *  :clojure.error/spec - explain-data for spec error
 */
cljs.repl.ex_triage = (function cljs$repl$ex_triage(datafied_throwable){
var map__76458 = datafied_throwable;
var map__76458__$1 = cljs.core.__destructure_map(map__76458);
var via = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__76458__$1,new cljs.core.Keyword(null,"via","via",-1904457336));
var trace = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__76458__$1,new cljs.core.Keyword(null,"trace","trace",-1082747415));
var phase = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__76458__$1,new cljs.core.Keyword(null,"phase","phase",575722892),new cljs.core.Keyword(null,"execution","execution",253283524));
var map__76459 = cljs.core.last(via);
var map__76459__$1 = cljs.core.__destructure_map(map__76459);
var type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__76459__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var message = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__76459__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__76459__$1,new cljs.core.Keyword(null,"data","data",-232669377));
var map__76460 = data;
var map__76460__$1 = cljs.core.__destructure_map(map__76460);
var problems = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__76460__$1,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814));
var fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__76460__$1,new cljs.core.Keyword("cljs.spec.alpha","fn","cljs.spec.alpha/fn",408600443));
var caller = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__76460__$1,new cljs.core.Keyword("cljs.spec.test.alpha","caller","cljs.spec.test.alpha/caller",-398302390));
var map__76461 = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.first(via));
var map__76461__$1 = cljs.core.__destructure_map(map__76461);
var top_data = map__76461__$1;
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__76461__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3((function (){var G__76463 = phase;
var G__76463__$1 = (((G__76463 instanceof cljs.core.Keyword))?G__76463.fqn:null);
switch (G__76463__$1) {
case "read-source":
var map__76464 = data;
var map__76464__$1 = cljs.core.__destructure_map(map__76464);
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__76464__$1,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471));
var column = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__76464__$1,new cljs.core.Keyword("clojure.error","column","clojure.error/column",304721553));
var G__76465 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.second(via)),top_data], 0));
var G__76465__$1 = (cljs.core.truth_(source)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__76465,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),source):G__76465);
var G__76465__$2 = (cljs.core.truth_((function (){var fexpr__76467 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__76467.cljs$core$IFn$_invoke$arity$1 ? fexpr__76467.cljs$core$IFn$_invoke$arity$1(source) : fexpr__76467.call(null,source));
})())?cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__76465__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397)):G__76465__$1);
if(cljs.core.truth_(message)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__76465__$2,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message);
} else {
return G__76465__$2;
}

break;
case "compile-syntax-check":
case "compilation":
case "macro-syntax-check":
case "macroexpansion":
var G__76468 = top_data;
var G__76468__$1 = (cljs.core.truth_(source)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__76468,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),source):G__76468);
var G__76468__$2 = (cljs.core.truth_((function (){var fexpr__76469 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__76469.cljs$core$IFn$_invoke$arity$1 ? fexpr__76469.cljs$core$IFn$_invoke$arity$1(source) : fexpr__76469.call(null,source));
})())?cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__76468__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397)):G__76468__$1);
var G__76468__$3 = (cljs.core.truth_(type)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__76468__$2,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type):G__76468__$2);
var G__76468__$4 = (cljs.core.truth_(message)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__76468__$3,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message):G__76468__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__76468__$4,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595),data);
} else {
return G__76468__$4;
}

break;
case "read-eval-result":
case "print-eval-result":
var vec__76471 = cljs.core.first(trace);
var source__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__76471,(0),null);
var method = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__76471,(1),null);
var file = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__76471,(2),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__76471,(3),null);
var G__76474 = top_data;
var G__76474__$1 = (cljs.core.truth_(line)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__76474,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471),line):G__76474);
var G__76474__$2 = (cljs.core.truth_(file)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__76474__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),file):G__76474__$1);
var G__76474__$3 = (cljs.core.truth_((function (){var and__4251__auto__ = source__$1;
if(cljs.core.truth_(and__4251__auto__)){
return method;
} else {
return and__4251__auto__;
}
})())?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__76474__$2,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null))):G__76474__$2);
var G__76474__$4 = (cljs.core.truth_(type)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__76474__$3,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type):G__76474__$3);
if(cljs.core.truth_(message)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__76474__$4,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message);
} else {
return G__76474__$4;
}

break;
case "execution":
var vec__76477 = cljs.core.first(trace);
var source__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__76477,(0),null);
var method = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__76477,(1),null);
var file = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__76477,(2),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__76477,(3),null);
var file__$1 = cljs.core.first(cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p1__76453_SHARP_){
var or__4253__auto__ = (p1__76453_SHARP_ == null);
if(or__4253__auto__){
return or__4253__auto__;
} else {
var fexpr__76480 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__76480.cljs$core$IFn$_invoke$arity$1 ? fexpr__76480.cljs$core$IFn$_invoke$arity$1(p1__76453_SHARP_) : fexpr__76480.call(null,p1__76453_SHARP_));
}
}),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(caller),file], null)));
var err_line = (function (){var or__4253__auto__ = new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(caller);
if(cljs.core.truth_(or__4253__auto__)){
return or__4253__auto__;
} else {
return line;
}
})();
var G__76481 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type], null);
var G__76481__$1 = (cljs.core.truth_(err_line)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__76481,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471),err_line):G__76481);
var G__76481__$2 = (cljs.core.truth_(message)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__76481__$1,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message):G__76481__$1);
var G__76481__$3 = (cljs.core.truth_((function (){var or__4253__auto__ = fn;
if(cljs.core.truth_(or__4253__auto__)){
return or__4253__auto__;
} else {
var and__4251__auto__ = source__$1;
if(cljs.core.truth_(and__4251__auto__)){
return method;
} else {
return and__4251__auto__;
}
}
})())?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__76481__$2,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994),(function (){var or__4253__auto__ = fn;
if(cljs.core.truth_(or__4253__auto__)){
return or__4253__auto__;
} else {
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null));
}
})()):G__76481__$2);
var G__76481__$4 = (cljs.core.truth_(file__$1)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__76481__$3,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),file__$1):G__76481__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__76481__$4,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595),data);
} else {
return G__76481__$4;
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__76463__$1)].join('')));

}
})(),new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358),phase);
});
/**
 * Returns a string from exception data, as produced by ex-triage.
 *   The first line summarizes the exception phase and location.
 *   The subsequent lines describe the cause.
 */
cljs.repl.ex_str = (function cljs$repl$ex_str(p__76485){
var map__76486 = p__76485;
var map__76486__$1 = cljs.core.__destructure_map(map__76486);
var triage_data = map__76486__$1;
var phase = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__76486__$1,new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358));
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__76486__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397));
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__76486__$1,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471));
var column = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__76486__$1,new cljs.core.Keyword("clojure.error","column","clojure.error/column",304721553));
var symbol = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__76486__$1,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994));
var class$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__76486__$1,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890));
var cause = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__76486__$1,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742));
var spec = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__76486__$1,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595));
var loc = [cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__4253__auto__ = source;
if(cljs.core.truth_(or__4253__auto__)){
return or__4253__auto__;
} else {
return "<cljs repl>";
}
})()),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__4253__auto__ = line;
if(cljs.core.truth_(or__4253__auto__)){
return or__4253__auto__;
} else {
return (1);
}
})()),(cljs.core.truth_(column)?[":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column)].join(''):"")].join('');
var class_name = cljs.core.name((function (){var or__4253__auto__ = class$;
if(cljs.core.truth_(or__4253__auto__)){
return or__4253__auto__;
} else {
return "";
}
})());
var simple_class = class_name;
var cause_type = ((cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["RuntimeException",null,"Exception",null], null), null),simple_class))?"":[" (",simple_class,")"].join(''));
var format = goog.string.format;
var G__76493 = phase;
var G__76493__$1 = (((G__76493 instanceof cljs.core.Keyword))?G__76493.fqn:null);
switch (G__76493__$1) {
case "read-source":
return (format.cljs$core$IFn$_invoke$arity$3 ? format.cljs$core$IFn$_invoke$arity$3("Syntax error reading source at (%s).\n%s\n",loc,cause) : format.call(null,"Syntax error reading source at (%s).\n%s\n",loc,cause));

break;
case "macro-syntax-check":
var G__76496 = "Syntax error macroexpanding %sat (%s).\n%s";
var G__76497 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__76498 = loc;
var G__76499 = (cljs.core.truth_(spec)?(function (){var sb__4795__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__76500_76622 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__76501_76623 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__76502_76624 = true;
var _STAR_print_fn_STAR__temp_val__76503_76625 = (function (x__4796__auto__){
return sb__4795__auto__.append(x__4796__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__76502_76624);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__76503_76625);

try{cljs.spec.alpha.explain_out(cljs.core.update.cljs$core$IFn$_invoke$arity$3(spec,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814),(function (probs){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__76483_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__76483_SHARP_,new cljs.core.Keyword(null,"in","in",-1531184865));
}),probs);
}))
);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__76501_76623);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__76500_76622);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__4795__auto__);
})():(format.cljs$core$IFn$_invoke$arity$2 ? format.cljs$core$IFn$_invoke$arity$2("%s\n",cause) : format.call(null,"%s\n",cause)));
return (format.cljs$core$IFn$_invoke$arity$4 ? format.cljs$core$IFn$_invoke$arity$4(G__76496,G__76497,G__76498,G__76499) : format.call(null,G__76496,G__76497,G__76498,G__76499));

break;
case "macroexpansion":
var G__76504 = "Unexpected error%s macroexpanding %sat (%s).\n%s\n";
var G__76505 = cause_type;
var G__76506 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__76507 = loc;
var G__76508 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__76504,G__76505,G__76506,G__76507,G__76508) : format.call(null,G__76504,G__76505,G__76506,G__76507,G__76508));

break;
case "compile-syntax-check":
var G__76509 = "Syntax error%s compiling %sat (%s).\n%s\n";
var G__76510 = cause_type;
var G__76511 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__76512 = loc;
var G__76513 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__76509,G__76510,G__76511,G__76512,G__76513) : format.call(null,G__76509,G__76510,G__76511,G__76512,G__76513));

break;
case "compilation":
var G__76514 = "Unexpected error%s compiling %sat (%s).\n%s\n";
var G__76515 = cause_type;
var G__76516 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__76517 = loc;
var G__76518 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__76514,G__76515,G__76516,G__76517,G__76518) : format.call(null,G__76514,G__76515,G__76516,G__76517,G__76518));

break;
case "read-eval-result":
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5("Error reading eval result%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause) : format.call(null,"Error reading eval result%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause));

break;
case "print-eval-result":
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5("Error printing return value%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause) : format.call(null,"Error printing return value%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause));

break;
case "execution":
if(cljs.core.truth_(spec)){
var G__76519 = "Execution error - invalid arguments to %s at (%s).\n%s";
var G__76520 = symbol;
var G__76521 = loc;
var G__76522 = (function (){var sb__4795__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__76523_76628 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__76524_76629 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__76525_76630 = true;
var _STAR_print_fn_STAR__temp_val__76526_76631 = (function (x__4796__auto__){
return sb__4795__auto__.append(x__4796__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__76525_76630);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__76526_76631);

try{cljs.spec.alpha.explain_out(cljs.core.update.cljs$core$IFn$_invoke$arity$3(spec,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814),(function (probs){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__76484_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__76484_SHARP_,new cljs.core.Keyword(null,"in","in",-1531184865));
}),probs);
}))
);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__76524_76629);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__76523_76628);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__4795__auto__);
})();
return (format.cljs$core$IFn$_invoke$arity$4 ? format.cljs$core$IFn$_invoke$arity$4(G__76519,G__76520,G__76521,G__76522) : format.call(null,G__76519,G__76520,G__76521,G__76522));
} else {
var G__76527 = "Execution error%s at %s(%s).\n%s\n";
var G__76528 = cause_type;
var G__76529 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__76530 = loc;
var G__76531 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__76527,G__76528,G__76529,G__76530,G__76531) : format.call(null,G__76527,G__76528,G__76529,G__76530,G__76531));
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__76493__$1)].join('')));

}
});
cljs.repl.error__GT_str = (function cljs$repl$error__GT_str(error){
return cljs.repl.ex_str(cljs.repl.ex_triage(cljs.repl.Error__GT_map(error)));
});

//# sourceMappingURL=cljs.repl.js.map
