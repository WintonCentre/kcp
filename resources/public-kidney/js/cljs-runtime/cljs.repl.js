goog.provide('cljs.repl');
cljs.repl.print_doc = (function cljs$repl$print_doc(p__57963){
var map__57964 = p__57963;
var map__57964__$1 = cljs.core.__destructure_map(map__57964);
var m = map__57964__$1;
var n = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57964__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
var nm = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57964__$1,new cljs.core.Keyword(null,"name","name",1843675177));
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
var seq__57968_58175 = cljs.core.seq(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m));
var chunk__57969_58176 = null;
var count__57970_58177 = (0);
var i__57971_58178 = (0);
while(true){
if((i__57971_58178 < count__57970_58177)){
var f_58179 = chunk__57969_58176.cljs$core$IIndexed$_nth$arity$2(null,i__57971_58178);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["  ",f_58179], 0));


var G__58180 = seq__57968_58175;
var G__58181 = chunk__57969_58176;
var G__58182 = count__57970_58177;
var G__58183 = (i__57971_58178 + (1));
seq__57968_58175 = G__58180;
chunk__57969_58176 = G__58181;
count__57970_58177 = G__58182;
i__57971_58178 = G__58183;
continue;
} else {
var temp__5753__auto___58184 = cljs.core.seq(seq__57968_58175);
if(temp__5753__auto___58184){
var seq__57968_58185__$1 = temp__5753__auto___58184;
if(cljs.core.chunked_seq_QMARK_(seq__57968_58185__$1)){
var c__4679__auto___58186 = cljs.core.chunk_first(seq__57968_58185__$1);
var G__58187 = cljs.core.chunk_rest(seq__57968_58185__$1);
var G__58188 = c__4679__auto___58186;
var G__58189 = cljs.core.count(c__4679__auto___58186);
var G__58190 = (0);
seq__57968_58175 = G__58187;
chunk__57969_58176 = G__58188;
count__57970_58177 = G__58189;
i__57971_58178 = G__58190;
continue;
} else {
var f_58191 = cljs.core.first(seq__57968_58185__$1);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["  ",f_58191], 0));


var G__58192 = cljs.core.next(seq__57968_58185__$1);
var G__58193 = null;
var G__58194 = (0);
var G__58195 = (0);
seq__57968_58175 = G__58192;
chunk__57969_58176 = G__58193;
count__57970_58177 = G__58194;
i__57971_58178 = G__58195;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
var arglists_58196 = new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__4253__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__4253__auto__)){
return or__4253__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([arglists_58196], 0));
} else {
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first(arglists_58196)))?cljs.core.second(arglists_58196):arglists_58196)], 0));
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
var seq__57976_58197 = cljs.core.seq(new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m));
var chunk__57977_58198 = null;
var count__57978_58199 = (0);
var i__57979_58200 = (0);
while(true){
if((i__57979_58200 < count__57978_58199)){
var vec__57990_58202 = chunk__57977_58198.cljs$core$IIndexed$_nth$arity$2(null,i__57979_58200);
var name_58203 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__57990_58202,(0),null);
var map__57993_58204 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__57990_58202,(1),null);
var map__57993_58205__$1 = cljs.core.__destructure_map(map__57993_58204);
var doc_58206 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57993_58205__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_58207 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57993_58205__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",name_58203], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",arglists_58207], 0));

if(cljs.core.truth_(doc_58206)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",doc_58206], 0));
} else {
}


var G__58208 = seq__57976_58197;
var G__58209 = chunk__57977_58198;
var G__58210 = count__57978_58199;
var G__58211 = (i__57979_58200 + (1));
seq__57976_58197 = G__58208;
chunk__57977_58198 = G__58209;
count__57978_58199 = G__58210;
i__57979_58200 = G__58211;
continue;
} else {
var temp__5753__auto___58212 = cljs.core.seq(seq__57976_58197);
if(temp__5753__auto___58212){
var seq__57976_58213__$1 = temp__5753__auto___58212;
if(cljs.core.chunked_seq_QMARK_(seq__57976_58213__$1)){
var c__4679__auto___58214 = cljs.core.chunk_first(seq__57976_58213__$1);
var G__58215 = cljs.core.chunk_rest(seq__57976_58213__$1);
var G__58216 = c__4679__auto___58214;
var G__58217 = cljs.core.count(c__4679__auto___58214);
var G__58218 = (0);
seq__57976_58197 = G__58215;
chunk__57977_58198 = G__58216;
count__57978_58199 = G__58217;
i__57979_58200 = G__58218;
continue;
} else {
var vec__57994_58219 = cljs.core.first(seq__57976_58213__$1);
var name_58220 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__57994_58219,(0),null);
var map__57997_58221 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__57994_58219,(1),null);
var map__57997_58222__$1 = cljs.core.__destructure_map(map__57997_58221);
var doc_58223 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57997_58222__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_58224 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__57997_58222__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",name_58220], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",arglists_58224], 0));

if(cljs.core.truth_(doc_58223)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",doc_58223], 0));
} else {
}


var G__58225 = cljs.core.next(seq__57976_58213__$1);
var G__58226 = null;
var G__58227 = (0);
var G__58228 = (0);
seq__57976_58197 = G__58225;
chunk__57977_58198 = G__58226;
count__57978_58199 = G__58227;
i__57979_58200 = G__58228;
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

var seq__58015 = cljs.core.seq(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"args","args",1315556576),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Keyword(null,"fn","fn",-1175266204)], null));
var chunk__58016 = null;
var count__58017 = (0);
var i__58018 = (0);
while(true){
if((i__58018 < count__58017)){
var role = chunk__58016.cljs$core$IIndexed$_nth$arity$2(null,i__58018);
var temp__5753__auto___58231__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(fnspec,role);
if(cljs.core.truth_(temp__5753__auto___58231__$1)){
var spec_58232 = temp__5753__auto___58231__$1;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n ",cljs.core.name(role),":"].join(''),cljs.spec.alpha.describe(spec_58232)], 0));
} else {
}


var G__58233 = seq__58015;
var G__58234 = chunk__58016;
var G__58235 = count__58017;
var G__58236 = (i__58018 + (1));
seq__58015 = G__58233;
chunk__58016 = G__58234;
count__58017 = G__58235;
i__58018 = G__58236;
continue;
} else {
var temp__5753__auto____$1 = cljs.core.seq(seq__58015);
if(temp__5753__auto____$1){
var seq__58015__$1 = temp__5753__auto____$1;
if(cljs.core.chunked_seq_QMARK_(seq__58015__$1)){
var c__4679__auto__ = cljs.core.chunk_first(seq__58015__$1);
var G__58237 = cljs.core.chunk_rest(seq__58015__$1);
var G__58238 = c__4679__auto__;
var G__58239 = cljs.core.count(c__4679__auto__);
var G__58240 = (0);
seq__58015 = G__58237;
chunk__58016 = G__58238;
count__58017 = G__58239;
i__58018 = G__58240;
continue;
} else {
var role = cljs.core.first(seq__58015__$1);
var temp__5753__auto___58245__$2 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(fnspec,role);
if(cljs.core.truth_(temp__5753__auto___58245__$2)){
var spec_58248 = temp__5753__auto___58245__$2;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n ",cljs.core.name(role),":"].join(''),cljs.spec.alpha.describe(spec_58248)], 0));
} else {
}


var G__58249 = cljs.core.next(seq__58015__$1);
var G__58250 = null;
var G__58251 = (0);
var G__58252 = (0);
seq__58015 = G__58249;
chunk__58016 = G__58250;
count__58017 = G__58251;
i__58018 = G__58252;
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
var G__58254 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(via,t);
var G__58255 = cljs.core.ex_cause(t);
via = G__58254;
t = G__58255;
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
var map__58103 = datafied_throwable;
var map__58103__$1 = cljs.core.__destructure_map(map__58103);
var via = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58103__$1,new cljs.core.Keyword(null,"via","via",-1904457336));
var trace = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58103__$1,new cljs.core.Keyword(null,"trace","trace",-1082747415));
var phase = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__58103__$1,new cljs.core.Keyword(null,"phase","phase",575722892),new cljs.core.Keyword(null,"execution","execution",253283524));
var map__58104 = cljs.core.last(via);
var map__58104__$1 = cljs.core.__destructure_map(map__58104);
var type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58104__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var message = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58104__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58104__$1,new cljs.core.Keyword(null,"data","data",-232669377));
var map__58105 = data;
var map__58105__$1 = cljs.core.__destructure_map(map__58105);
var problems = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58105__$1,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814));
var fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58105__$1,new cljs.core.Keyword("cljs.spec.alpha","fn","cljs.spec.alpha/fn",408600443));
var caller = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58105__$1,new cljs.core.Keyword("cljs.spec.test.alpha","caller","cljs.spec.test.alpha/caller",-398302390));
var map__58106 = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.first(via));
var map__58106__$1 = cljs.core.__destructure_map(map__58106);
var top_data = map__58106__$1;
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58106__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3((function (){var G__58108 = phase;
var G__58108__$1 = (((G__58108 instanceof cljs.core.Keyword))?G__58108.fqn:null);
switch (G__58108__$1) {
case "read-source":
var map__58109 = data;
var map__58109__$1 = cljs.core.__destructure_map(map__58109);
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58109__$1,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471));
var column = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58109__$1,new cljs.core.Keyword("clojure.error","column","clojure.error/column",304721553));
var G__58111 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.second(via)),top_data], 0));
var G__58111__$1 = (cljs.core.truth_(source)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__58111,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),source):G__58111);
var G__58111__$2 = (cljs.core.truth_((function (){var fexpr__58112 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__58112.cljs$core$IFn$_invoke$arity$1 ? fexpr__58112.cljs$core$IFn$_invoke$arity$1(source) : fexpr__58112.call(null,source));
})())?cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__58111__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397)):G__58111__$1);
if(cljs.core.truth_(message)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__58111__$2,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message);
} else {
return G__58111__$2;
}

break;
case "compile-syntax-check":
case "compilation":
case "macro-syntax-check":
case "macroexpansion":
var G__58113 = top_data;
var G__58113__$1 = (cljs.core.truth_(source)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__58113,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),source):G__58113);
var G__58113__$2 = (cljs.core.truth_((function (){var fexpr__58114 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__58114.cljs$core$IFn$_invoke$arity$1 ? fexpr__58114.cljs$core$IFn$_invoke$arity$1(source) : fexpr__58114.call(null,source));
})())?cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__58113__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397)):G__58113__$1);
var G__58113__$3 = (cljs.core.truth_(type)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__58113__$2,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type):G__58113__$2);
var G__58113__$4 = (cljs.core.truth_(message)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__58113__$3,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message):G__58113__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__58113__$4,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595),data);
} else {
return G__58113__$4;
}

break;
case "read-eval-result":
case "print-eval-result":
var vec__58115 = cljs.core.first(trace);
var source__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__58115,(0),null);
var method = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__58115,(1),null);
var file = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__58115,(2),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__58115,(3),null);
var G__58118 = top_data;
var G__58118__$1 = (cljs.core.truth_(line)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__58118,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471),line):G__58118);
var G__58118__$2 = (cljs.core.truth_(file)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__58118__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),file):G__58118__$1);
var G__58118__$3 = (cljs.core.truth_((function (){var and__4251__auto__ = source__$1;
if(cljs.core.truth_(and__4251__auto__)){
return method;
} else {
return and__4251__auto__;
}
})())?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__58118__$2,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null))):G__58118__$2);
var G__58118__$4 = (cljs.core.truth_(type)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__58118__$3,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type):G__58118__$3);
if(cljs.core.truth_(message)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__58118__$4,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message);
} else {
return G__58118__$4;
}

break;
case "execution":
var vec__58123 = cljs.core.first(trace);
var source__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__58123,(0),null);
var method = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__58123,(1),null);
var file = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__58123,(2),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__58123,(3),null);
var file__$1 = cljs.core.first(cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p1__58101_SHARP_){
var or__4253__auto__ = (p1__58101_SHARP_ == null);
if(or__4253__auto__){
return or__4253__auto__;
} else {
var fexpr__58128 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__58128.cljs$core$IFn$_invoke$arity$1 ? fexpr__58128.cljs$core$IFn$_invoke$arity$1(p1__58101_SHARP_) : fexpr__58128.call(null,p1__58101_SHARP_));
}
}),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(caller),file], null)));
var err_line = (function (){var or__4253__auto__ = new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(caller);
if(cljs.core.truth_(or__4253__auto__)){
return or__4253__auto__;
} else {
return line;
}
})();
var G__58131 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type], null);
var G__58131__$1 = (cljs.core.truth_(err_line)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__58131,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471),err_line):G__58131);
var G__58131__$2 = (cljs.core.truth_(message)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__58131__$1,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message):G__58131__$1);
var G__58131__$3 = (cljs.core.truth_((function (){var or__4253__auto__ = fn;
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
})())?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__58131__$2,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994),(function (){var or__4253__auto__ = fn;
if(cljs.core.truth_(or__4253__auto__)){
return or__4253__auto__;
} else {
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null));
}
})()):G__58131__$2);
var G__58131__$4 = (cljs.core.truth_(file__$1)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__58131__$3,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),file__$1):G__58131__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__58131__$4,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595),data);
} else {
return G__58131__$4;
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__58108__$1)].join('')));

}
})(),new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358),phase);
});
/**
 * Returns a string from exception data, as produced by ex-triage.
 *   The first line summarizes the exception phase and location.
 *   The subsequent lines describe the cause.
 */
cljs.repl.ex_str = (function cljs$repl$ex_str(p__58134){
var map__58135 = p__58134;
var map__58135__$1 = cljs.core.__destructure_map(map__58135);
var triage_data = map__58135__$1;
var phase = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58135__$1,new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358));
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58135__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397));
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58135__$1,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471));
var column = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58135__$1,new cljs.core.Keyword("clojure.error","column","clojure.error/column",304721553));
var symbol = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58135__$1,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994));
var class$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58135__$1,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890));
var cause = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58135__$1,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742));
var spec = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__58135__$1,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595));
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
var G__58136 = phase;
var G__58136__$1 = (((G__58136 instanceof cljs.core.Keyword))?G__58136.fqn:null);
switch (G__58136__$1) {
case "read-source":
return (format.cljs$core$IFn$_invoke$arity$3 ? format.cljs$core$IFn$_invoke$arity$3("Syntax error reading source at (%s).\n%s\n",loc,cause) : format.call(null,"Syntax error reading source at (%s).\n%s\n",loc,cause));

break;
case "macro-syntax-check":
var G__58138 = "Syntax error macroexpanding %sat (%s).\n%s";
var G__58139 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__58140 = loc;
var G__58141 = (cljs.core.truth_(spec)?(function (){var sb__4795__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__58142_58265 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__58143_58266 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__58144_58267 = true;
var _STAR_print_fn_STAR__temp_val__58145_58268 = (function (x__4796__auto__){
return sb__4795__auto__.append(x__4796__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__58144_58267);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__58145_58268);

try{cljs.spec.alpha.explain_out(cljs.core.update.cljs$core$IFn$_invoke$arity$3(spec,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814),(function (probs){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__58132_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__58132_SHARP_,new cljs.core.Keyword(null,"in","in",-1531184865));
}),probs);
}))
);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__58143_58266);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__58142_58265);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__4795__auto__);
})():(format.cljs$core$IFn$_invoke$arity$2 ? format.cljs$core$IFn$_invoke$arity$2("%s\n",cause) : format.call(null,"%s\n",cause)));
return (format.cljs$core$IFn$_invoke$arity$4 ? format.cljs$core$IFn$_invoke$arity$4(G__58138,G__58139,G__58140,G__58141) : format.call(null,G__58138,G__58139,G__58140,G__58141));

break;
case "macroexpansion":
var G__58146 = "Unexpected error%s macroexpanding %sat (%s).\n%s\n";
var G__58147 = cause_type;
var G__58148 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__58149 = loc;
var G__58150 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__58146,G__58147,G__58148,G__58149,G__58150) : format.call(null,G__58146,G__58147,G__58148,G__58149,G__58150));

break;
case "compile-syntax-check":
var G__58151 = "Syntax error%s compiling %sat (%s).\n%s\n";
var G__58152 = cause_type;
var G__58153 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__58154 = loc;
var G__58155 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__58151,G__58152,G__58153,G__58154,G__58155) : format.call(null,G__58151,G__58152,G__58153,G__58154,G__58155));

break;
case "compilation":
var G__58156 = "Unexpected error%s compiling %sat (%s).\n%s\n";
var G__58157 = cause_type;
var G__58158 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__58159 = loc;
var G__58160 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__58156,G__58157,G__58158,G__58159,G__58160) : format.call(null,G__58156,G__58157,G__58158,G__58159,G__58160));

break;
case "read-eval-result":
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5("Error reading eval result%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause) : format.call(null,"Error reading eval result%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause));

break;
case "print-eval-result":
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5("Error printing return value%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause) : format.call(null,"Error printing return value%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause));

break;
case "execution":
if(cljs.core.truth_(spec)){
var G__58161 = "Execution error - invalid arguments to %s at (%s).\n%s";
var G__58162 = symbol;
var G__58163 = loc;
var G__58164 = (function (){var sb__4795__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__58165_58280 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__58166_58281 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__58167_58282 = true;
var _STAR_print_fn_STAR__temp_val__58168_58283 = (function (x__4796__auto__){
return sb__4795__auto__.append(x__4796__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__58167_58282);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__58168_58283);

try{cljs.spec.alpha.explain_out(cljs.core.update.cljs$core$IFn$_invoke$arity$3(spec,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814),(function (probs){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__58133_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__58133_SHARP_,new cljs.core.Keyword(null,"in","in",-1531184865));
}),probs);
}))
);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__58166_58281);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__58165_58280);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__4795__auto__);
})();
return (format.cljs$core$IFn$_invoke$arity$4 ? format.cljs$core$IFn$_invoke$arity$4(G__58161,G__58162,G__58163,G__58164) : format.call(null,G__58161,G__58162,G__58163,G__58164));
} else {
var G__58170 = "Execution error%s at %s(%s).\n%s\n";
var G__58171 = cause_type;
var G__58172 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__58173 = loc;
var G__58174 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__58170,G__58171,G__58172,G__58173,G__58174) : format.call(null,G__58170,G__58171,G__58172,G__58173,G__58174));
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__58136__$1)].join('')));

}
});
cljs.repl.error__GT_str = (function cljs$repl$error__GT_str(error){
return cljs.repl.ex_str(cljs.repl.ex_triage(cljs.repl.Error__GT_map(error)));
});

//# sourceMappingURL=cljs.repl.js.map
