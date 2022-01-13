goog.provide('reitit.coercion.spec');
reitit.coercion.spec.string_transformer = spec_tools.core.type_transformer.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([spec_tools.core.strip_extra_keys_transformer,spec_tools.core.string_transformer], 0));
reitit.coercion.spec.json_transformer = spec_tools.core.type_transformer.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([spec_tools.core.strip_extra_keys_transformer,spec_tools.core.json_transformer], 0));
reitit.coercion.spec.strip_extra_keys_transformer = spec_tools.core.strip_extra_keys_transformer;
reitit.coercion.spec.no_op_transformer = (function (){
if((typeof reitit !== 'undefined') && (typeof reitit.coercion !== 'undefined') && (typeof reitit.coercion.spec !== 'undefined') && (typeof reitit.coercion.spec.t_reitit$coercion$spec67061 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {spec_tools.core.Transformer}
 * @implements {cljs.core.IWithMeta}
*/
reitit.coercion.spec.t_reitit$coercion$spec67061 = (function (meta67062){
this.meta67062 = meta67062;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(reitit.coercion.spec.t_reitit$coercion$spec67061.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_67063,meta67062__$1){
var self__ = this;
var _67063__$1 = this;
return (new reitit.coercion.spec.t_reitit$coercion$spec67061(meta67062__$1));
}));

(reitit.coercion.spec.t_reitit$coercion$spec67061.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_67063){
var self__ = this;
var _67063__$1 = this;
return self__.meta67062;
}));

(reitit.coercion.spec.t_reitit$coercion$spec67061.prototype.spec_tools$core$Transformer$ = cljs.core.PROTOCOL_SENTINEL);

(reitit.coercion.spec.t_reitit$coercion$spec67061.prototype.spec_tools$core$Transformer$_name$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return new cljs.core.Keyword("reitit.coercion.spec","no-op","reitit.coercion.spec/no-op",-549362779);
}));

(reitit.coercion.spec.t_reitit$coercion$spec67061.prototype.spec_tools$core$Transformer$_encoder$arity$3 = (function (_,___$1,___$2){
var self__ = this;
var ___$3 = this;
return null;
}));

(reitit.coercion.spec.t_reitit$coercion$spec67061.prototype.spec_tools$core$Transformer$_decoder$arity$3 = (function (_,___$1,___$2){
var self__ = this;
var ___$3 = this;
return null;
}));

(reitit.coercion.spec.t_reitit$coercion$spec67061.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta67062","meta67062",-1427281683,null)], null);
}));

(reitit.coercion.spec.t_reitit$coercion$spec67061.cljs$lang$type = true);

(reitit.coercion.spec.t_reitit$coercion$spec67061.cljs$lang$ctorStr = "reitit.coercion.spec/t_reitit$coercion$spec67061");

(reitit.coercion.spec.t_reitit$coercion$spec67061.cljs$lang$ctorPrWriter = (function (this__4491__auto__,writer__4492__auto__,opt__4493__auto__){
return cljs.core._write(writer__4492__auto__,"reitit.coercion.spec/t_reitit$coercion$spec67061");
}));

/**
 * Positional factory function for reitit.coercion.spec/t_reitit$coercion$spec67061.
 */
reitit.coercion.spec.__GT_t_reitit$coercion$spec67061 = (function reitit$coercion$spec$__GT_t_reitit$coercion$spec67061(meta67062){
return (new reitit.coercion.spec.t_reitit$coercion$spec67061(meta67062));
});

}

return (new reitit.coercion.spec.t_reitit$coercion$spec67061(cljs.core.PersistentArrayMap.EMPTY));
})()
;

/**
 * @interface
 */
reitit.coercion.spec.IntoSpec = function(){};

var reitit$coercion$spec$IntoSpec$into_spec$dyn_67123 = (function (this$,name){
var x__4550__auto__ = (((this$ == null))?null:this$);
var m__4551__auto__ = (reitit.coercion.spec.into_spec[goog.typeOf(x__4550__auto__)]);
if((!((m__4551__auto__ == null)))){
return (m__4551__auto__.cljs$core$IFn$_invoke$arity$2 ? m__4551__auto__.cljs$core$IFn$_invoke$arity$2(this$,name) : m__4551__auto__.call(null,this$,name));
} else {
var m__4549__auto__ = (reitit.coercion.spec.into_spec["_"]);
if((!((m__4549__auto__ == null)))){
return (m__4549__auto__.cljs$core$IFn$_invoke$arity$2 ? m__4549__auto__.cljs$core$IFn$_invoke$arity$2(this$,name) : m__4549__auto__.call(null,this$,name));
} else {
throw cljs.core.missing_protocol("IntoSpec.into-spec",this$);
}
}
});
reitit.coercion.spec.into_spec = (function reitit$coercion$spec$into_spec(this$,name){
if((((!((this$ == null)))) && ((!((this$.reitit$coercion$spec$IntoSpec$into_spec$arity$2 == null)))))){
return this$.reitit$coercion$spec$IntoSpec$into_spec$arity$2(this$,name);
} else {
return reitit$coercion$spec$IntoSpec$into_spec$dyn_67123(this$,name);
}
});

reitit.coercion.spec.ensure_name = (function reitit$coercion$spec$ensure_name(_QMARK_name){
var or__4253__auto__ = _QMARK_name;
if(cljs.core.truth_(or__4253__auto__)){
return or__4253__auto__;
} else {
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$2("spec",cljs.core.name(cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("")));
}
});
(cljs.core.PersistentArrayMap.prototype.reitit$coercion$spec$IntoSpec$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.PersistentArrayMap.prototype.reitit$coercion$spec$IntoSpec$into_spec$arity$2 = (function (this$,name){
var this$__$1 = this;
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(spec_tools.data_spec.spec.cljs$core$IFn$_invoke$arity$2(reitit.coercion.spec.ensure_name(name),this$__$1),new cljs.core.Keyword(null,"name","name",1843675177));
}));

(cljs.core.PersistentHashMap.prototype.reitit$coercion$spec$IntoSpec$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.PersistentHashMap.prototype.reitit$coercion$spec$IntoSpec$into_spec$arity$2 = (function (this$,name){
var this$__$1 = this;
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(spec_tools.data_spec.spec.cljs$core$IFn$_invoke$arity$2(reitit.coercion.spec.ensure_name(name),this$__$1),new cljs.core.Keyword(null,"name","name",1843675177));
}));

(cljs.core.PersistentVector.prototype.reitit$coercion$spec$IntoSpec$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.PersistentVector.prototype.reitit$coercion$spec$IntoSpec$into_spec$arity$2 = (function (this$,name){
var this$__$1 = this;
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(spec_tools.data_spec.spec.cljs$core$IFn$_invoke$arity$2(reitit.coercion.spec.ensure_name(name),this$__$1),new cljs.core.Keyword(null,"name","name",1843675177));
}));

(spec_tools.data_spec.Maybe.prototype.reitit$coercion$spec$IntoSpec$ = cljs.core.PROTOCOL_SENTINEL);

(spec_tools.data_spec.Maybe.prototype.reitit$coercion$spec$IntoSpec$into_spec$arity$2 = (function (this$,name){
var this$__$1 = this;
return spec_tools.data_spec.spec.cljs$core$IFn$_invoke$arity$2(reitit.coercion.spec.ensure_name(name),this$__$1);
}));

(spec_tools.core.Spec.prototype.reitit$coercion$spec$IntoSpec$ = cljs.core.PROTOCOL_SENTINEL);

(spec_tools.core.Spec.prototype.reitit$coercion$spec$IntoSpec$into_spec$arity$2 = (function (this$,_){
var this$__$1 = this;
return this$__$1;
}));

(reitit.coercion.spec.IntoSpec["_"] = true);

(reitit.coercion.spec.into_spec["_"] = (function (this$,_){
return spec_tools.core.create_spec(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"spec","spec",347520401),this$], null));
}));

(reitit.coercion.spec.IntoSpec["null"] = true);

(reitit.coercion.spec.into_spec["null"] = (function (this$,_){
return null;
}));
reitit.coercion.spec.stringify_pred = (function reitit$coercion$spec$stringify_pred(pred){
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(((cljs.core.seq_QMARK_(pred))?cljs.core.seq(pred):pred));
});
if((typeof reitit !== 'undefined') && (typeof reitit.coercion !== 'undefined') && (typeof reitit.coercion.spec !== 'undefined') && (typeof reitit.coercion.spec.coerce_response_QMARK_ !== 'undefined')){
} else {
reitit.coercion.spec.coerce_response_QMARK_ = (function (){var method_table__4747__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__4748__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var method_cache__4749__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__4750__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__4751__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"default","default",-1987822328),new cljs.core.Keyword("reitit.coercion.spec","default","reitit.coercion.spec/default",-1835621218)], null),new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),(function (){var fexpr__67080 = cljs.core.get_global_hierarchy;
return (fexpr__67080.cljs$core$IFn$_invoke$arity$0 ? fexpr__67080.cljs$core$IFn$_invoke$arity$0() : fexpr__67080.call(null));
})());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("reitit.coercion.spec","coerce-response?"),cljs.core.identity,new cljs.core.Keyword("reitit.coercion.spec","default","reitit.coercion.spec/default",-1835621218),hierarchy__4751__auto__,method_table__4747__auto__,prefer_table__4748__auto__,method_cache__4749__auto__,cached_hierarchy__4750__auto__));
})();
}
reitit.coercion.spec.coerce_response_QMARK_.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword("reitit.coercion.spec","default","reitit.coercion.spec/default",-1835621218),(function (_){
return true;
}));
reitit.coercion.spec.default_options = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"coerce-response?","coerce-response?",1125033091),reitit.coercion.spec.coerce_response_QMARK_,new cljs.core.Keyword(null,"transformers","transformers",-734201565),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"body","body",-2049205669),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"default","default",-1987822328),reitit.coercion.spec.strip_extra_keys_transformer,new cljs.core.Keyword(null,"formats","formats",-1397890976),new cljs.core.PersistentArrayMap(null, 1, ["application/json",reitit.coercion.spec.json_transformer], null)], null),new cljs.core.Keyword(null,"string","string",-1989541586),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"default","default",-1987822328),reitit.coercion.spec.string_transformer], null),new cljs.core.Keyword(null,"response","response",-1068424192),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"default","default",-1987822328),reitit.coercion.spec.no_op_transformer], null)], null)], null);
reitit.coercion.spec.create = (function reitit$coercion$spec$create(p__67083){
var map__67084 = p__67083;
var map__67084__$1 = cljs.core.__destructure_map(map__67084);
var opts = map__67084__$1;
var transformers = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67084__$1,new cljs.core.Keyword(null,"transformers","transformers",-734201565));
var coerce_response_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67084__$1,new cljs.core.Keyword(null,"coerce-response?","coerce-response?",1125033091));
if((typeof reitit !== 'undefined') && (typeof reitit.coercion !== 'undefined') && (typeof reitit.coercion.spec !== 'undefined') && (typeof reitit.coercion.spec.t_reitit$coercion$spec67085 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
 * @implements {reitit.coercion.Coercion}
*/
reitit.coercion.spec.t_reitit$coercion$spec67085 = (function (p__67083,map__67084,opts,transformers,coerce_response_QMARK_,meta67086){
this.p__67083 = p__67083;
this.map__67084 = map__67084;
this.opts = opts;
this.transformers = transformers;
this.coerce_response_QMARK_ = coerce_response_QMARK_;
this.meta67086 = meta67086;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(reitit.coercion.spec.t_reitit$coercion$spec67085.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_67087,meta67086__$1){
var self__ = this;
var _67087__$1 = this;
return (new reitit.coercion.spec.t_reitit$coercion$spec67085(self__.p__67083,self__.map__67084,self__.opts,self__.transformers,self__.coerce_response_QMARK_,meta67086__$1));
}));

(reitit.coercion.spec.t_reitit$coercion$spec67085.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_67087){
var self__ = this;
var _67087__$1 = this;
return self__.meta67086;
}));

(reitit.coercion.spec.t_reitit$coercion$spec67085.prototype.reitit$coercion$Coercion$ = cljs.core.PROTOCOL_SENTINEL);

(reitit.coercion.spec.t_reitit$coercion$spec67085.prototype.reitit$coercion$Coercion$_get_name$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return new cljs.core.Keyword(null,"spec","spec",347520401);
}));

(reitit.coercion.spec.t_reitit$coercion$spec67085.prototype.reitit$coercion$Coercion$_get_options$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.opts;
}));

(reitit.coercion.spec.t_reitit$coercion$spec67085.prototype.reitit$coercion$Coercion$_get_apidocs$arity$3 = (function (this$,specification,p__67088){
var self__ = this;
var map__67089 = p__67088;
var map__67089__$1 = cljs.core.__destructure_map(map__67089);
var parameters = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67089__$1,new cljs.core.Keyword(null,"parameters","parameters",-1229919748));
var responses = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67089__$1,new cljs.core.Keyword(null,"responses","responses",1257546453));
var this$__$1 = this;
var G__67090 = specification;
var G__67090__$1 = (((G__67090 instanceof cljs.core.Keyword))?G__67090.fqn:null);
switch (G__67090__$1) {
case "swagger":
return spec_tools.swagger.core.swagger_spec.cljs$core$IFn$_invoke$arity$1(cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(cljs.core.truth_(parameters)?new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("spec-tools.swagger.core","parameters","spec-tools.swagger.core/parameters",-239005676),cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.empty(parameters),(function (){var iter__4652__auto__ = (function reitit$coercion$spec$create_$_iter__67091(s__67092){
return (new cljs.core.LazySeq(null,(function (){
var s__67092__$1 = s__67092;
while(true){
var temp__5753__auto__ = cljs.core.seq(s__67092__$1);
if(temp__5753__auto__){
var s__67092__$2 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(s__67092__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__67092__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__67094 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__67093 = (0);
while(true){
if((i__67093 < size__4651__auto__)){
var vec__67095 = cljs.core._nth(c__4650__auto__,i__67093);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67095,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67095,(1),null);
cljs.core.chunk_append(b__67094,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,this$__$1.reitit$coercion$Coercion$_compile_model$arity$3(null,v,null)], null));

var G__67131 = (i__67093 + (1));
i__67093 = G__67131;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__67094),reitit$coercion$spec$create_$_iter__67091(cljs.core.chunk_rest(s__67092__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__67094),null);
}
} else {
var vec__67098 = cljs.core.first(s__67092__$2);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67098,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67098,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,this$__$1.reitit$coercion$Coercion$_compile_model$arity$3(null,v,null)], null),reitit$coercion$spec$create_$_iter__67091(cljs.core.rest(s__67092__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__4652__auto__(parameters);
})())], null):null),(cljs.core.truth_(responses)?new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("spec-tools.swagger.core","responses","spec-tools.swagger.core/responses",308528333),cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.empty(responses),(function (){var iter__4652__auto__ = (function reitit$coercion$spec$create_$_iter__67101(s__67102){
return (new cljs.core.LazySeq(null,(function (){
var s__67102__$1 = s__67102;
while(true){
var temp__5753__auto__ = cljs.core.seq(s__67102__$1);
if(temp__5753__auto__){
var s__67102__$2 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(s__67102__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__67102__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__67104 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__67103 = (0);
while(true){
if((i__67103 < size__4651__auto__)){
var vec__67105 = cljs.core._nth(c__4650__auto__,i__67103);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67105,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67105,(1),null);
cljs.core.chunk_append(b__67104,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,(function (){var $ = response;
var $__$1 = clojure.set.rename_keys($,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"body","body",-2049205669),new cljs.core.Keyword(null,"schema","schema",-1582001791)], null));
if(cljs.core.truth_(new cljs.core.Keyword(null,"schema","schema",-1582001791).cljs$core$IFn$_invoke$arity$1($__$1))){
return cljs.core.update.cljs$core$IFn$_invoke$arity$3($__$1,new cljs.core.Keyword(null,"schema","schema",-1582001791),((function (i__67103,$,$__$1,vec__67105,k,response,c__4650__auto__,size__4651__auto__,b__67104,s__67102__$2,temp__5753__auto__,G__67090,G__67090__$1,this$__$1,map__67089,map__67089__$1,parameters,responses,map__67084,map__67084__$1,opts,transformers,coerce_response_QMARK_){
return (function (p1__67081_SHARP_){
return this$__$1.reitit$coercion$Coercion$_compile_model$arity$3(null,p1__67081_SHARP_,null);
});})(i__67103,$,$__$1,vec__67105,k,response,c__4650__auto__,size__4651__auto__,b__67104,s__67102__$2,temp__5753__auto__,G__67090,G__67090__$1,this$__$1,map__67089,map__67089__$1,parameters,responses,map__67084,map__67084__$1,opts,transformers,coerce_response_QMARK_))
);
} else {
return $__$1;
}
})()], null));

var G__67132 = (i__67103 + (1));
i__67103 = G__67132;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__67104),reitit$coercion$spec$create_$_iter__67101(cljs.core.chunk_rest(s__67102__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__67104),null);
}
} else {
var vec__67108 = cljs.core.first(s__67102__$2);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67108,(0),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67108,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,(function (){var $ = response;
var $__$1 = clojure.set.rename_keys($,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"body","body",-2049205669),new cljs.core.Keyword(null,"schema","schema",-1582001791)], null));
if(cljs.core.truth_(new cljs.core.Keyword(null,"schema","schema",-1582001791).cljs$core$IFn$_invoke$arity$1($__$1))){
return cljs.core.update.cljs$core$IFn$_invoke$arity$3($__$1,new cljs.core.Keyword(null,"schema","schema",-1582001791),((function ($,$__$1,vec__67108,k,response,s__67102__$2,temp__5753__auto__,G__67090,G__67090__$1,this$__$1,map__67089,map__67089__$1,parameters,responses,map__67084,map__67084__$1,opts,transformers,coerce_response_QMARK_){
return (function (p1__67081_SHARP_){
return this$__$1.reitit$coercion$Coercion$_compile_model$arity$3(null,p1__67081_SHARP_,null);
});})($,$__$1,vec__67108,k,response,s__67102__$2,temp__5753__auto__,G__67090,G__67090__$1,this$__$1,map__67089,map__67089__$1,parameters,responses,map__67084,map__67084__$1,opts,transformers,coerce_response_QMARK_))
);
} else {
return $__$1;
}
})()], null),reitit$coercion$spec$create_$_iter__67101(cljs.core.rest(s__67102__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__4652__auto__(responses);
})())], null):null)], 0)));

break;
default:
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2(["Can't produce Spec apidocs for ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(specification)].join(''),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"specification","specification",22067900),specification,new cljs.core.Keyword(null,"coercion","coercion",904067157),new cljs.core.Keyword(null,"spec","spec",347520401)], null));

}
}));

(reitit.coercion.spec.t_reitit$coercion$spec67085.prototype.reitit$coercion$Coercion$_compile_model$arity$3 = (function (_,model,name){
var self__ = this;
var ___$1 = this;
return reitit.coercion.spec.into_spec(model,name);
}));

(reitit.coercion.spec.t_reitit$coercion$spec67085.prototype.reitit$coercion$Coercion$_open_model$arity$2 = (function (_,spec){
var self__ = this;
var ___$1 = this;
return spec;
}));

(reitit.coercion.spec.t_reitit$coercion$spec67085.prototype.reitit$coercion$Coercion$_encode_error$arity$2 = (function (_,error){
var self__ = this;
var ___$1 = this;
var problems = new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"problems","problems",2097327077).cljs$core$IFn$_invoke$arity$1(error));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.update.cljs$core$IFn$_invoke$arity$3(error,new cljs.core.Keyword(null,"spec","spec",347520401),cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.spec.alpha.form)),new cljs.core.Keyword(null,"problems","problems",2097327077),cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__67082_SHARP_){
return cljs.core.update.cljs$core$IFn$_invoke$arity$3(p1__67082_SHARP_,new cljs.core.Keyword(null,"pred","pred",1927423397),reitit.coercion.spec.stringify_pred);
}),problems));
}));

(reitit.coercion.spec.t_reitit$coercion$spec67085.prototype.reitit$coercion$Coercion$_request_coercer$arity$3 = (function (this$,type,spec){
var self__ = this;
var this$__$1 = this;
var spec__$1 = this$__$1.reitit$coercion$Coercion$_compile_model$arity$3(null,spec,null);
var map__67111 = (self__.transformers.cljs$core$IFn$_invoke$arity$1 ? self__.transformers.cljs$core$IFn$_invoke$arity$1(type) : self__.transformers.call(null,type));
var map__67111__$1 = cljs.core.__destructure_map(map__67111);
var formats = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67111__$1,new cljs.core.Keyword(null,"formats","formats",-1397890976));
var default$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67111__$1,new cljs.core.Keyword(null,"default","default",-1987822328));
return (function (value,format){
var temp__5751__auto__ = (function (){var or__4253__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(formats,format);
if(cljs.core.truth_(or__4253__auto__)){
return or__4253__auto__;
} else {
return default$;
}
})();
if(cljs.core.truth_(temp__5751__auto__)){
var transformer = temp__5751__auto__;
var coerced = spec_tools.core.coerce.cljs$core$IFn$_invoke$arity$3(spec__$1,value,transformer);
if(cljs.spec.alpha.valid_QMARK_.cljs$core$IFn$_invoke$arity$2(spec__$1,coerced)){
return coerced;
} else {
var transformed = spec_tools.core.conform.cljs$core$IFn$_invoke$arity$3(spec__$1,coerced,transformer);
if(cljs.spec.alpha.invalid_QMARK_(transformed)){
var problems = spec_tools.core.explain_data.cljs$core$IFn$_invoke$arity$3(spec__$1,coerced,transformer);
return reitit.coercion.map__GT_CoercionError(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"spec","spec",347520401),spec__$1,new cljs.core.Keyword(null,"problems","problems",2097327077),problems], null));
} else {
return cljs.spec.alpha.unform(spec__$1,transformed);
}
}
} else {
return value;
}
});
}));

(reitit.coercion.spec.t_reitit$coercion$spec67085.prototype.reitit$coercion$Coercion$_response_coercer$arity$2 = (function (this$,spec){
var self__ = this;
var this$__$1 = this;
if(cljs.core.truth_((self__.coerce_response_QMARK_.cljs$core$IFn$_invoke$arity$1 ? self__.coerce_response_QMARK_.cljs$core$IFn$_invoke$arity$1(spec) : self__.coerce_response_QMARK_.call(null,spec)))){
return this$__$1.reitit$coercion$Coercion$_request_coercer$arity$3(null,new cljs.core.Keyword(null,"response","response",-1068424192),spec);
} else {
return null;
}
}));

(reitit.coercion.spec.t_reitit$coercion$spec67085.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p__67083","p__67083",782901368,null),new cljs.core.Symbol(null,"map__67084","map__67084",-1905023170,null),new cljs.core.Symbol(null,"opts","opts",1795607228,null),new cljs.core.Symbol(null,"transformers","transformers",906329962,null),new cljs.core.Symbol(null,"coerce-response?","coerce-response?",-1529402678,null),new cljs.core.Symbol(null,"meta67086","meta67086",-721453375,null)], null);
}));

(reitit.coercion.spec.t_reitit$coercion$spec67085.cljs$lang$type = true);

(reitit.coercion.spec.t_reitit$coercion$spec67085.cljs$lang$ctorStr = "reitit.coercion.spec/t_reitit$coercion$spec67085");

(reitit.coercion.spec.t_reitit$coercion$spec67085.cljs$lang$ctorPrWriter = (function (this__4491__auto__,writer__4492__auto__,opt__4493__auto__){
return cljs.core._write(writer__4492__auto__,"reitit.coercion.spec/t_reitit$coercion$spec67085");
}));

/**
 * Positional factory function for reitit.coercion.spec/t_reitit$coercion$spec67085.
 */
reitit.coercion.spec.__GT_t_reitit$coercion$spec67085 = (function reitit$coercion$spec$create_$___GT_t_reitit$coercion$spec67085(p__67083__$1,map__67084__$2,opts__$1,transformers__$1,coerce_response_QMARK___$1,meta67086){
return (new reitit.coercion.spec.t_reitit$coercion$spec67085(p__67083__$1,map__67084__$2,opts__$1,transformers__$1,coerce_response_QMARK___$1,meta67086));
});

}

return (new reitit.coercion.spec.t_reitit$coercion$spec67085(p__67083,map__67084__$1,opts,transformers,coerce_response_QMARK_,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("reitit.coercion","coercion","reitit.coercion/coercion",-866612966)], null)));
});
reitit.coercion.spec.coercion = reitit.coercion.spec.create(reitit.coercion.spec.default_options);

//# sourceMappingURL=reitit.coercion.spec.js.map
