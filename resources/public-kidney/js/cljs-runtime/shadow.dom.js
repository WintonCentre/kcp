goog.provide('shadow.dom');
shadow.dom.transition_supported_QMARK_ = (((typeof window !== 'undefined'))?goog.style.transition.isSupported():null);

/**
 * @interface
 */
shadow.dom.IElement = function(){};

var shadow$dom$IElement$_to_dom$dyn_55954 = (function (this$){
var x__4550__auto__ = (((this$ == null))?null:this$);
var m__4551__auto__ = (shadow.dom._to_dom[goog.typeOf(x__4550__auto__)]);
if((!((m__4551__auto__ == null)))){
return (m__4551__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4551__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__4551__auto__.call(null,this$));
} else {
var m__4549__auto__ = (shadow.dom._to_dom["_"]);
if((!((m__4549__auto__ == null)))){
return (m__4549__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4549__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__4549__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("IElement.-to-dom",this$);
}
}
});
shadow.dom._to_dom = (function shadow$dom$_to_dom(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$dom$IElement$_to_dom$arity$1 == null)))))){
return this$.shadow$dom$IElement$_to_dom$arity$1(this$);
} else {
return shadow$dom$IElement$_to_dom$dyn_55954(this$);
}
});


/**
 * @interface
 */
shadow.dom.SVGElement = function(){};

var shadow$dom$SVGElement$_to_svg$dyn_55955 = (function (this$){
var x__4550__auto__ = (((this$ == null))?null:this$);
var m__4551__auto__ = (shadow.dom._to_svg[goog.typeOf(x__4550__auto__)]);
if((!((m__4551__auto__ == null)))){
return (m__4551__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4551__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__4551__auto__.call(null,this$));
} else {
var m__4549__auto__ = (shadow.dom._to_svg["_"]);
if((!((m__4549__auto__ == null)))){
return (m__4549__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4549__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__4549__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("SVGElement.-to-svg",this$);
}
}
});
shadow.dom._to_svg = (function shadow$dom$_to_svg(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$dom$SVGElement$_to_svg$arity$1 == null)))))){
return this$.shadow$dom$SVGElement$_to_svg$arity$1(this$);
} else {
return shadow$dom$SVGElement$_to_svg$dyn_55955(this$);
}
});

shadow.dom.lazy_native_coll_seq = (function shadow$dom$lazy_native_coll_seq(coll,idx){
if((idx < coll.length)){
return (new cljs.core.LazySeq(null,(function (){
return cljs.core.cons((coll[idx]),(function (){var G__55257 = coll;
var G__55258 = (idx + (1));
return (shadow.dom.lazy_native_coll_seq.cljs$core$IFn$_invoke$arity$2 ? shadow.dom.lazy_native_coll_seq.cljs$core$IFn$_invoke$arity$2(G__55257,G__55258) : shadow.dom.lazy_native_coll_seq.call(null,G__55257,G__55258));
})());
}),null,null));
} else {
return null;
}
});

/**
* @constructor
 * @implements {cljs.core.IIndexed}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IDeref}
 * @implements {shadow.dom.IElement}
*/
shadow.dom.NativeColl = (function (coll){
this.coll = coll;
this.cljs$lang$protocol_mask$partition0$ = 8421394;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(shadow.dom.NativeColl.prototype.cljs$core$IDeref$_deref$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.coll;
}));

(shadow.dom.NativeColl.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (this$,n){
var self__ = this;
var this$__$1 = this;
return (self__.coll[n]);
}));

(shadow.dom.NativeColl.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (this$,n,not_found){
var self__ = this;
var this$__$1 = this;
var or__4253__auto__ = (self__.coll[n]);
if(cljs.core.truth_(or__4253__auto__)){
return or__4253__auto__;
} else {
return not_found;
}
}));

(shadow.dom.NativeColl.prototype.cljs$core$ICounted$_count$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.coll.length;
}));

(shadow.dom.NativeColl.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return shadow.dom.lazy_native_coll_seq(self__.coll,(0));
}));

(shadow.dom.NativeColl.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.dom.NativeColl.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.coll;
}));

(shadow.dom.NativeColl.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"coll","coll",-1006698606,null)], null);
}));

(shadow.dom.NativeColl.cljs$lang$type = true);

(shadow.dom.NativeColl.cljs$lang$ctorStr = "shadow.dom/NativeColl");

(shadow.dom.NativeColl.cljs$lang$ctorPrWriter = (function (this__4491__auto__,writer__4492__auto__,opt__4493__auto__){
return cljs.core._write(writer__4492__auto__,"shadow.dom/NativeColl");
}));

/**
 * Positional factory function for shadow.dom/NativeColl.
 */
shadow.dom.__GT_NativeColl = (function shadow$dom$__GT_NativeColl(coll){
return (new shadow.dom.NativeColl(coll));
});

shadow.dom.native_coll = (function shadow$dom$native_coll(coll){
return (new shadow.dom.NativeColl(coll));
});
shadow.dom.dom_node = (function shadow$dom$dom_node(el){
if((el == null)){
return null;
} else {
if((((!((el == null))))?((((false) || ((cljs.core.PROTOCOL_SENTINEL === el.shadow$dom$IElement$))))?true:false):false)){
return el.shadow$dom$IElement$_to_dom$arity$1(null);
} else {
if(typeof el === 'string'){
return document.createTextNode(el);
} else {
if(typeof el === 'number'){
return document.createTextNode(cljs.core.str.cljs$core$IFn$_invoke$arity$1(el));
} else {
return el;

}
}
}
}
});
shadow.dom.query_one = (function shadow$dom$query_one(var_args){
var G__55281 = arguments.length;
switch (G__55281) {
case 1:
return shadow.dom.query_one.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.query_one.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.query_one.cljs$core$IFn$_invoke$arity$1 = (function (sel){
return document.querySelector(sel);
}));

(shadow.dom.query_one.cljs$core$IFn$_invoke$arity$2 = (function (sel,root){
return shadow.dom.dom_node(root).querySelector(sel);
}));

(shadow.dom.query_one.cljs$lang$maxFixedArity = 2);

shadow.dom.query = (function shadow$dom$query(var_args){
var G__55287 = arguments.length;
switch (G__55287) {
case 1:
return shadow.dom.query.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.query.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.query.cljs$core$IFn$_invoke$arity$1 = (function (sel){
return (new shadow.dom.NativeColl(document.querySelectorAll(sel)));
}));

(shadow.dom.query.cljs$core$IFn$_invoke$arity$2 = (function (sel,root){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(root).querySelectorAll(sel)));
}));

(shadow.dom.query.cljs$lang$maxFixedArity = 2);

shadow.dom.by_id = (function shadow$dom$by_id(var_args){
var G__55300 = arguments.length;
switch (G__55300) {
case 2:
return shadow.dom.by_id.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return shadow.dom.by_id.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.by_id.cljs$core$IFn$_invoke$arity$2 = (function (id,el){
return shadow.dom.dom_node(el).getElementById(id);
}));

(shadow.dom.by_id.cljs$core$IFn$_invoke$arity$1 = (function (id){
return document.getElementById(id);
}));

(shadow.dom.by_id.cljs$lang$maxFixedArity = 2);

shadow.dom.build = shadow.dom.dom_node;
shadow.dom.ev_stop = (function shadow$dom$ev_stop(var_args){
var G__55313 = arguments.length;
switch (G__55313) {
case 1:
return shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1 = (function (e){
if(cljs.core.truth_(e.stopPropagation)){
e.stopPropagation();

e.preventDefault();
} else {
(e.cancelBubble = true);

(e.returnValue = false);
}

return e;
}));

(shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$2 = (function (e,el){
shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1(e);

return el;
}));

(shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$4 = (function (e,el,scope,owner){
shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1(e);

return el;
}));

(shadow.dom.ev_stop.cljs$lang$maxFixedArity = 4);

/**
 * check wether a parent node (or the document) contains the child
 */
shadow.dom.contains_QMARK_ = (function shadow$dom$contains_QMARK_(var_args){
var G__55327 = arguments.length;
switch (G__55327) {
case 1:
return shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$1 = (function (el){
return goog.dom.contains(document,shadow.dom.dom_node(el));
}));

(shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$2 = (function (parent,el){
return goog.dom.contains(shadow.dom.dom_node(parent),shadow.dom.dom_node(el));
}));

(shadow.dom.contains_QMARK_.cljs$lang$maxFixedArity = 2);

shadow.dom.add_class = (function shadow$dom$add_class(el,cls){
return goog.dom.classlist.add(shadow.dom.dom_node(el),cls);
});
shadow.dom.remove_class = (function shadow$dom$remove_class(el,cls){
return goog.dom.classlist.remove(shadow.dom.dom_node(el),cls);
});
shadow.dom.toggle_class = (function shadow$dom$toggle_class(var_args){
var G__55343 = arguments.length;
switch (G__55343) {
case 2:
return shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$2 = (function (el,cls){
return goog.dom.classlist.toggle(shadow.dom.dom_node(el),cls);
}));

(shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$3 = (function (el,cls,v){
if(cljs.core.truth_(v)){
return shadow.dom.add_class(el,cls);
} else {
return shadow.dom.remove_class(el,cls);
}
}));

(shadow.dom.toggle_class.cljs$lang$maxFixedArity = 3);

shadow.dom.dom_listen = (cljs.core.truth_((function (){var or__4253__auto__ = (!((typeof document !== 'undefined')));
if(or__4253__auto__){
return or__4253__auto__;
} else {
return document.addEventListener;
}
})())?(function shadow$dom$dom_listen_good(el,ev,handler){
return el.addEventListener(ev,handler,false);
}):(function shadow$dom$dom_listen_ie(el,ev,handler){
try{return el.attachEvent(["on",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ev)].join(''),(function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
}));
}catch (e55357){if((e55357 instanceof Object)){
var e = e55357;
return console.log("didnt support attachEvent",el,e);
} else {
throw e55357;

}
}}));
shadow.dom.dom_listen_remove = (cljs.core.truth_((function (){var or__4253__auto__ = (!((typeof document !== 'undefined')));
if(or__4253__auto__){
return or__4253__auto__;
} else {
return document.removeEventListener;
}
})())?(function shadow$dom$dom_listen_remove_good(el,ev,handler){
return el.removeEventListener(ev,handler,false);
}):(function shadow$dom$dom_listen_remove_ie(el,ev,handler){
return el.detachEvent(["on",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ev)].join(''),handler);
}));
shadow.dom.on_query = (function shadow$dom$on_query(root_el,ev,selector,handler){
var seq__55362 = cljs.core.seq(shadow.dom.query.cljs$core$IFn$_invoke$arity$2(selector,root_el));
var chunk__55363 = null;
var count__55364 = (0);
var i__55365 = (0);
while(true){
if((i__55365 < count__55364)){
var el = chunk__55363.cljs$core$IIndexed$_nth$arity$2(null,i__55365);
var handler_55962__$1 = ((function (seq__55362,chunk__55363,count__55364,i__55365,el){
return (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
});})(seq__55362,chunk__55363,count__55364,i__55365,el))
;
shadow.dom.dom_listen(el,cljs.core.name(ev),handler_55962__$1);


var G__55963 = seq__55362;
var G__55964 = chunk__55363;
var G__55965 = count__55364;
var G__55966 = (i__55365 + (1));
seq__55362 = G__55963;
chunk__55363 = G__55964;
count__55364 = G__55965;
i__55365 = G__55966;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__55362);
if(temp__5753__auto__){
var seq__55362__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__55362__$1)){
var c__4679__auto__ = cljs.core.chunk_first(seq__55362__$1);
var G__55967 = cljs.core.chunk_rest(seq__55362__$1);
var G__55968 = c__4679__auto__;
var G__55969 = cljs.core.count(c__4679__auto__);
var G__55970 = (0);
seq__55362 = G__55967;
chunk__55363 = G__55968;
count__55364 = G__55969;
i__55365 = G__55970;
continue;
} else {
var el = cljs.core.first(seq__55362__$1);
var handler_55971__$1 = ((function (seq__55362,chunk__55363,count__55364,i__55365,el,seq__55362__$1,temp__5753__auto__){
return (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
});})(seq__55362,chunk__55363,count__55364,i__55365,el,seq__55362__$1,temp__5753__auto__))
;
shadow.dom.dom_listen(el,cljs.core.name(ev),handler_55971__$1);


var G__55972 = cljs.core.next(seq__55362__$1);
var G__55973 = null;
var G__55974 = (0);
var G__55975 = (0);
seq__55362 = G__55972;
chunk__55363 = G__55973;
count__55364 = G__55974;
i__55365 = G__55975;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.dom.on = (function shadow$dom$on(var_args){
var G__55391 = arguments.length;
switch (G__55391) {
case 3:
return shadow.dom.on.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return shadow.dom.on.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.on.cljs$core$IFn$_invoke$arity$3 = (function (el,ev,handler){
return shadow.dom.on.cljs$core$IFn$_invoke$arity$4(el,ev,handler,false);
}));

(shadow.dom.on.cljs$core$IFn$_invoke$arity$4 = (function (el,ev,handler,capture){
if(cljs.core.vector_QMARK_(ev)){
return shadow.dom.on_query(el,cljs.core.first(ev),cljs.core.second(ev),handler);
} else {
var handler__$1 = (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
});
return shadow.dom.dom_listen(shadow.dom.dom_node(el),cljs.core.name(ev),handler__$1);
}
}));

(shadow.dom.on.cljs$lang$maxFixedArity = 4);

shadow.dom.remove_event_handler = (function shadow$dom$remove_event_handler(el,ev,handler){
return shadow.dom.dom_listen_remove(shadow.dom.dom_node(el),cljs.core.name(ev),handler);
});
shadow.dom.add_event_listeners = (function shadow$dom$add_event_listeners(el,events){
var seq__55402 = cljs.core.seq(events);
var chunk__55403 = null;
var count__55404 = (0);
var i__55405 = (0);
while(true){
if((i__55405 < count__55404)){
var vec__55422 = chunk__55403.cljs$core$IIndexed$_nth$arity$2(null,i__55405);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55422,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55422,(1),null);
shadow.dom.on.cljs$core$IFn$_invoke$arity$3(el,k,v);


var G__55977 = seq__55402;
var G__55978 = chunk__55403;
var G__55979 = count__55404;
var G__55980 = (i__55405 + (1));
seq__55402 = G__55977;
chunk__55403 = G__55978;
count__55404 = G__55979;
i__55405 = G__55980;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__55402);
if(temp__5753__auto__){
var seq__55402__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__55402__$1)){
var c__4679__auto__ = cljs.core.chunk_first(seq__55402__$1);
var G__55981 = cljs.core.chunk_rest(seq__55402__$1);
var G__55982 = c__4679__auto__;
var G__55983 = cljs.core.count(c__4679__auto__);
var G__55984 = (0);
seq__55402 = G__55981;
chunk__55403 = G__55982;
count__55404 = G__55983;
i__55405 = G__55984;
continue;
} else {
var vec__55430 = cljs.core.first(seq__55402__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55430,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55430,(1),null);
shadow.dom.on.cljs$core$IFn$_invoke$arity$3(el,k,v);


var G__55985 = cljs.core.next(seq__55402__$1);
var G__55986 = null;
var G__55987 = (0);
var G__55988 = (0);
seq__55402 = G__55985;
chunk__55403 = G__55986;
count__55404 = G__55987;
i__55405 = G__55988;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.dom.set_style = (function shadow$dom$set_style(el,styles){
var dom = shadow.dom.dom_node(el);
var seq__55437 = cljs.core.seq(styles);
var chunk__55438 = null;
var count__55439 = (0);
var i__55440 = (0);
while(true){
if((i__55440 < count__55439)){
var vec__55451 = chunk__55438.cljs$core$IIndexed$_nth$arity$2(null,i__55440);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55451,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55451,(1),null);
goog.style.setStyle(dom,cljs.core.name(k),(((v == null))?"":v));


var G__55989 = seq__55437;
var G__55990 = chunk__55438;
var G__55991 = count__55439;
var G__55992 = (i__55440 + (1));
seq__55437 = G__55989;
chunk__55438 = G__55990;
count__55439 = G__55991;
i__55440 = G__55992;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__55437);
if(temp__5753__auto__){
var seq__55437__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__55437__$1)){
var c__4679__auto__ = cljs.core.chunk_first(seq__55437__$1);
var G__55993 = cljs.core.chunk_rest(seq__55437__$1);
var G__55994 = c__4679__auto__;
var G__55995 = cljs.core.count(c__4679__auto__);
var G__55996 = (0);
seq__55437 = G__55993;
chunk__55438 = G__55994;
count__55439 = G__55995;
i__55440 = G__55996;
continue;
} else {
var vec__55454 = cljs.core.first(seq__55437__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55454,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55454,(1),null);
goog.style.setStyle(dom,cljs.core.name(k),(((v == null))?"":v));


var G__55997 = cljs.core.next(seq__55437__$1);
var G__55998 = null;
var G__55999 = (0);
var G__56000 = (0);
seq__55437 = G__55997;
chunk__55438 = G__55998;
count__55439 = G__55999;
i__55440 = G__56000;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.dom.set_attr_STAR_ = (function shadow$dom$set_attr_STAR_(el,key,value){
var G__55463_56001 = key;
var G__55463_56002__$1 = (((G__55463_56001 instanceof cljs.core.Keyword))?G__55463_56001.fqn:null);
switch (G__55463_56002__$1) {
case "id":
(el.id = cljs.core.str.cljs$core$IFn$_invoke$arity$1(value));

break;
case "class":
(el.className = cljs.core.str.cljs$core$IFn$_invoke$arity$1(value));

break;
case "for":
(el.htmlFor = value);

break;
case "cellpadding":
el.setAttribute("cellPadding",value);

break;
case "cellspacing":
el.setAttribute("cellSpacing",value);

break;
case "colspan":
el.setAttribute("colSpan",value);

break;
case "frameborder":
el.setAttribute("frameBorder",value);

break;
case "height":
el.setAttribute("height",value);

break;
case "maxlength":
el.setAttribute("maxLength",value);

break;
case "role":
el.setAttribute("role",value);

break;
case "rowspan":
el.setAttribute("rowSpan",value);

break;
case "type":
el.setAttribute("type",value);

break;
case "usemap":
el.setAttribute("useMap",value);

break;
case "valign":
el.setAttribute("vAlign",value);

break;
case "width":
el.setAttribute("width",value);

break;
case "on":
shadow.dom.add_event_listeners(el,value);

break;
case "style":
if((value == null)){
} else {
if(typeof value === 'string'){
el.setAttribute("style",value);
} else {
if(cljs.core.map_QMARK_(value)){
shadow.dom.set_style(el,value);
} else {
goog.style.setStyle(el,value);

}
}
}

break;
default:
var ks_56004 = cljs.core.name(key);
if(cljs.core.truth_((function (){var or__4253__auto__ = goog.string.startsWith(ks_56004,"data-");
if(cljs.core.truth_(or__4253__auto__)){
return or__4253__auto__;
} else {
return goog.string.startsWith(ks_56004,"aria-");
}
})())){
el.setAttribute(ks_56004,value);
} else {
(el[ks_56004] = value);
}

}

return el;
});
shadow.dom.set_attrs = (function shadow$dom$set_attrs(el,attrs){
return cljs.core.reduce_kv((function (el__$1,key,value){
shadow.dom.set_attr_STAR_(el__$1,key,value);

return el__$1;
}),shadow.dom.dom_node(el),attrs);
});
shadow.dom.set_attr = (function shadow$dom$set_attr(el,key,value){
return shadow.dom.set_attr_STAR_(shadow.dom.dom_node(el),key,value);
});
shadow.dom.has_class_QMARK_ = (function shadow$dom$has_class_QMARK_(el,cls){
return goog.dom.classlist.contains(shadow.dom.dom_node(el),cls);
});
shadow.dom.merge_class_string = (function shadow$dom$merge_class_string(current,extra_class){
if(cljs.core.seq(current)){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(current)," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(extra_class)].join('');
} else {
return extra_class;
}
});
shadow.dom.parse_tag = (function shadow$dom$parse_tag(spec){
var spec__$1 = cljs.core.name(spec);
var fdot = spec__$1.indexOf(".");
var fhash = spec__$1.indexOf("#");
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fdot)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fhash)))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1,null,null], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fhash)){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1.substring((0),fdot),null,clojure.string.replace(spec__$1.substring((fdot + (1))),/\./," ")], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fdot)){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1.substring((0),fhash),spec__$1.substring((fhash + (1))),null], null);
} else {
if((fhash > fdot)){
throw ["cant have id after class?",spec__$1].join('');
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1.substring((0),fhash),spec__$1.substring((fhash + (1)),fdot),clojure.string.replace(spec__$1.substring((fdot + (1))),/\./," ")], null);

}
}
}
}
});
shadow.dom.create_dom_node = (function shadow$dom$create_dom_node(tag_def,p__55495){
var map__55497 = p__55495;
var map__55497__$1 = cljs.core.__destructure_map(map__55497);
var props = map__55497__$1;
var class$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55497__$1,new cljs.core.Keyword(null,"class","class",-2030961996));
var tag_props = ({});
var vec__55499 = shadow.dom.parse_tag(tag_def);
var tag_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55499,(0),null);
var tag_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55499,(1),null);
var tag_classes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55499,(2),null);
if(cljs.core.truth_(tag_id)){
(tag_props["id"] = tag_id);
} else {
}

if(cljs.core.truth_(tag_classes)){
(tag_props["class"] = shadow.dom.merge_class_string(class$,tag_classes));
} else {
}

var G__55505 = goog.dom.createDom(tag_name,tag_props);
shadow.dom.set_attrs(G__55505,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(props,new cljs.core.Keyword(null,"class","class",-2030961996)));

return G__55505;
});
shadow.dom.append = (function shadow$dom$append(var_args){
var G__55513 = arguments.length;
switch (G__55513) {
case 1:
return shadow.dom.append.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.append.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.append.cljs$core$IFn$_invoke$arity$1 = (function (node){
if(cljs.core.truth_(node)){
var temp__5753__auto__ = shadow.dom.dom_node(node);
if(cljs.core.truth_(temp__5753__auto__)){
var n = temp__5753__auto__;
document.body.appendChild(n);

return n;
} else {
return null;
}
} else {
return null;
}
}));

(shadow.dom.append.cljs$core$IFn$_invoke$arity$2 = (function (el,node){
if(cljs.core.truth_(node)){
var temp__5753__auto__ = shadow.dom.dom_node(node);
if(cljs.core.truth_(temp__5753__auto__)){
var n = temp__5753__auto__;
shadow.dom.dom_node(el).appendChild(n);

return n;
} else {
return null;
}
} else {
return null;
}
}));

(shadow.dom.append.cljs$lang$maxFixedArity = 2);

shadow.dom.destructure_node = (function shadow$dom$destructure_node(create_fn,p__55525){
var vec__55526 = p__55525;
var seq__55527 = cljs.core.seq(vec__55526);
var first__55528 = cljs.core.first(seq__55527);
var seq__55527__$1 = cljs.core.next(seq__55527);
var nn = first__55528;
var first__55528__$1 = cljs.core.first(seq__55527__$1);
var seq__55527__$2 = cljs.core.next(seq__55527__$1);
var np = first__55528__$1;
var nc = seq__55527__$2;
var node = vec__55526;
if((nn instanceof cljs.core.Keyword)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("invalid dom node",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"node","node",581201198),node], null));
}

if((((np == null)) && ((nc == null)))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__55531 = nn;
var G__55532 = cljs.core.PersistentArrayMap.EMPTY;
return (create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(G__55531,G__55532) : create_fn.call(null,G__55531,G__55532));
})(),cljs.core.List.EMPTY], null);
} else {
if(cljs.core.map_QMARK_(np)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(nn,np) : create_fn.call(null,nn,np)),nc], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__55534 = nn;
var G__55535 = cljs.core.PersistentArrayMap.EMPTY;
return (create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(G__55534,G__55535) : create_fn.call(null,G__55534,G__55535));
})(),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(nc,np)], null);

}
}
});
shadow.dom.make_dom_node = (function shadow$dom$make_dom_node(structure){
var vec__55537 = shadow.dom.destructure_node(shadow.dom.create_dom_node,structure);
var node = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55537,(0),null);
var node_children = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55537,(1),null);
var seq__55541_56008 = cljs.core.seq(node_children);
var chunk__55542_56009 = null;
var count__55543_56010 = (0);
var i__55544_56011 = (0);
while(true){
if((i__55544_56011 < count__55543_56010)){
var child_struct_56012 = chunk__55542_56009.cljs$core$IIndexed$_nth$arity$2(null,i__55544_56011);
var children_56013 = shadow.dom.dom_node(child_struct_56012);
if(cljs.core.seq_QMARK_(children_56013)){
var seq__55576_56014 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom.dom_node,children_56013));
var chunk__55578_56015 = null;
var count__55579_56016 = (0);
var i__55580_56017 = (0);
while(true){
if((i__55580_56017 < count__55579_56016)){
var child_56018 = chunk__55578_56015.cljs$core$IIndexed$_nth$arity$2(null,i__55580_56017);
if(cljs.core.truth_(child_56018)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_56018);


var G__56019 = seq__55576_56014;
var G__56020 = chunk__55578_56015;
var G__56021 = count__55579_56016;
var G__56022 = (i__55580_56017 + (1));
seq__55576_56014 = G__56019;
chunk__55578_56015 = G__56020;
count__55579_56016 = G__56021;
i__55580_56017 = G__56022;
continue;
} else {
var G__56023 = seq__55576_56014;
var G__56024 = chunk__55578_56015;
var G__56025 = count__55579_56016;
var G__56026 = (i__55580_56017 + (1));
seq__55576_56014 = G__56023;
chunk__55578_56015 = G__56024;
count__55579_56016 = G__56025;
i__55580_56017 = G__56026;
continue;
}
} else {
var temp__5753__auto___56027 = cljs.core.seq(seq__55576_56014);
if(temp__5753__auto___56027){
var seq__55576_56028__$1 = temp__5753__auto___56027;
if(cljs.core.chunked_seq_QMARK_(seq__55576_56028__$1)){
var c__4679__auto___56029 = cljs.core.chunk_first(seq__55576_56028__$1);
var G__56030 = cljs.core.chunk_rest(seq__55576_56028__$1);
var G__56031 = c__4679__auto___56029;
var G__56032 = cljs.core.count(c__4679__auto___56029);
var G__56033 = (0);
seq__55576_56014 = G__56030;
chunk__55578_56015 = G__56031;
count__55579_56016 = G__56032;
i__55580_56017 = G__56033;
continue;
} else {
var child_56034 = cljs.core.first(seq__55576_56028__$1);
if(cljs.core.truth_(child_56034)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_56034);


var G__56035 = cljs.core.next(seq__55576_56028__$1);
var G__56036 = null;
var G__56037 = (0);
var G__56038 = (0);
seq__55576_56014 = G__56035;
chunk__55578_56015 = G__56036;
count__55579_56016 = G__56037;
i__55580_56017 = G__56038;
continue;
} else {
var G__56039 = cljs.core.next(seq__55576_56028__$1);
var G__56040 = null;
var G__56041 = (0);
var G__56042 = (0);
seq__55576_56014 = G__56039;
chunk__55578_56015 = G__56040;
count__55579_56016 = G__56041;
i__55580_56017 = G__56042;
continue;
}
}
} else {
}
}
break;
}
} else {
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,children_56013);
}


var G__56043 = seq__55541_56008;
var G__56044 = chunk__55542_56009;
var G__56045 = count__55543_56010;
var G__56046 = (i__55544_56011 + (1));
seq__55541_56008 = G__56043;
chunk__55542_56009 = G__56044;
count__55543_56010 = G__56045;
i__55544_56011 = G__56046;
continue;
} else {
var temp__5753__auto___56047 = cljs.core.seq(seq__55541_56008);
if(temp__5753__auto___56047){
var seq__55541_56048__$1 = temp__5753__auto___56047;
if(cljs.core.chunked_seq_QMARK_(seq__55541_56048__$1)){
var c__4679__auto___56049 = cljs.core.chunk_first(seq__55541_56048__$1);
var G__56050 = cljs.core.chunk_rest(seq__55541_56048__$1);
var G__56051 = c__4679__auto___56049;
var G__56052 = cljs.core.count(c__4679__auto___56049);
var G__56053 = (0);
seq__55541_56008 = G__56050;
chunk__55542_56009 = G__56051;
count__55543_56010 = G__56052;
i__55544_56011 = G__56053;
continue;
} else {
var child_struct_56054 = cljs.core.first(seq__55541_56048__$1);
var children_56055 = shadow.dom.dom_node(child_struct_56054);
if(cljs.core.seq_QMARK_(children_56055)){
var seq__55602_56056 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom.dom_node,children_56055));
var chunk__55604_56057 = null;
var count__55605_56058 = (0);
var i__55606_56059 = (0);
while(true){
if((i__55606_56059 < count__55605_56058)){
var child_56060 = chunk__55604_56057.cljs$core$IIndexed$_nth$arity$2(null,i__55606_56059);
if(cljs.core.truth_(child_56060)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_56060);


var G__56061 = seq__55602_56056;
var G__56062 = chunk__55604_56057;
var G__56063 = count__55605_56058;
var G__56064 = (i__55606_56059 + (1));
seq__55602_56056 = G__56061;
chunk__55604_56057 = G__56062;
count__55605_56058 = G__56063;
i__55606_56059 = G__56064;
continue;
} else {
var G__56065 = seq__55602_56056;
var G__56066 = chunk__55604_56057;
var G__56067 = count__55605_56058;
var G__56068 = (i__55606_56059 + (1));
seq__55602_56056 = G__56065;
chunk__55604_56057 = G__56066;
count__55605_56058 = G__56067;
i__55606_56059 = G__56068;
continue;
}
} else {
var temp__5753__auto___56069__$1 = cljs.core.seq(seq__55602_56056);
if(temp__5753__auto___56069__$1){
var seq__55602_56070__$1 = temp__5753__auto___56069__$1;
if(cljs.core.chunked_seq_QMARK_(seq__55602_56070__$1)){
var c__4679__auto___56071 = cljs.core.chunk_first(seq__55602_56070__$1);
var G__56072 = cljs.core.chunk_rest(seq__55602_56070__$1);
var G__56073 = c__4679__auto___56071;
var G__56074 = cljs.core.count(c__4679__auto___56071);
var G__56075 = (0);
seq__55602_56056 = G__56072;
chunk__55604_56057 = G__56073;
count__55605_56058 = G__56074;
i__55606_56059 = G__56075;
continue;
} else {
var child_56076 = cljs.core.first(seq__55602_56070__$1);
if(cljs.core.truth_(child_56076)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_56076);


var G__56077 = cljs.core.next(seq__55602_56070__$1);
var G__56078 = null;
var G__56079 = (0);
var G__56080 = (0);
seq__55602_56056 = G__56077;
chunk__55604_56057 = G__56078;
count__55605_56058 = G__56079;
i__55606_56059 = G__56080;
continue;
} else {
var G__56081 = cljs.core.next(seq__55602_56070__$1);
var G__56082 = null;
var G__56083 = (0);
var G__56084 = (0);
seq__55602_56056 = G__56081;
chunk__55604_56057 = G__56082;
count__55605_56058 = G__56083;
i__55606_56059 = G__56084;
continue;
}
}
} else {
}
}
break;
}
} else {
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,children_56055);
}


var G__56085 = cljs.core.next(seq__55541_56048__$1);
var G__56086 = null;
var G__56087 = (0);
var G__56088 = (0);
seq__55541_56008 = G__56085;
chunk__55542_56009 = G__56086;
count__55543_56010 = G__56087;
i__55544_56011 = G__56088;
continue;
}
} else {
}
}
break;
}

return node;
});
(cljs.core.Keyword.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.Keyword.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return shadow.dom.make_dom_node(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [this$__$1], null));
}));

(cljs.core.PersistentVector.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.PersistentVector.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return shadow.dom.make_dom_node(this$__$1);
}));

(cljs.core.LazySeq.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.LazySeq.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom._to_dom,this$__$1);
}));
if(cljs.core.truth_(((typeof HTMLElement) != 'undefined'))){
(HTMLElement.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(HTMLElement.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1;
}));
} else {
}
if(cljs.core.truth_(((typeof DocumentFragment) != 'undefined'))){
(DocumentFragment.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(DocumentFragment.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1;
}));
} else {
}
/**
 * clear node children
 */
shadow.dom.reset = (function shadow$dom$reset(node){
return goog.dom.removeChildren(shadow.dom.dom_node(node));
});
shadow.dom.remove = (function shadow$dom$remove(node){
if((((!((node == null))))?(((((node.cljs$lang$protocol_mask$partition0$ & (8388608))) || ((cljs.core.PROTOCOL_SENTINEL === node.cljs$core$ISeqable$))))?true:false):false)){
var seq__55625 = cljs.core.seq(node);
var chunk__55626 = null;
var count__55627 = (0);
var i__55628 = (0);
while(true){
if((i__55628 < count__55627)){
var n = chunk__55626.cljs$core$IIndexed$_nth$arity$2(null,i__55628);
(shadow.dom.remove.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.remove.cljs$core$IFn$_invoke$arity$1(n) : shadow.dom.remove.call(null,n));


var G__56090 = seq__55625;
var G__56091 = chunk__55626;
var G__56092 = count__55627;
var G__56093 = (i__55628 + (1));
seq__55625 = G__56090;
chunk__55626 = G__56091;
count__55627 = G__56092;
i__55628 = G__56093;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__55625);
if(temp__5753__auto__){
var seq__55625__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__55625__$1)){
var c__4679__auto__ = cljs.core.chunk_first(seq__55625__$1);
var G__56094 = cljs.core.chunk_rest(seq__55625__$1);
var G__56095 = c__4679__auto__;
var G__56096 = cljs.core.count(c__4679__auto__);
var G__56097 = (0);
seq__55625 = G__56094;
chunk__55626 = G__56095;
count__55627 = G__56096;
i__55628 = G__56097;
continue;
} else {
var n = cljs.core.first(seq__55625__$1);
(shadow.dom.remove.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.remove.cljs$core$IFn$_invoke$arity$1(n) : shadow.dom.remove.call(null,n));


var G__56098 = cljs.core.next(seq__55625__$1);
var G__56099 = null;
var G__56100 = (0);
var G__56101 = (0);
seq__55625 = G__56098;
chunk__55626 = G__56099;
count__55627 = G__56100;
i__55628 = G__56101;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return goog.dom.removeNode(node);
}
});
shadow.dom.replace_node = (function shadow$dom$replace_node(old,new$){
return goog.dom.replaceNode(shadow.dom.dom_node(new$),shadow.dom.dom_node(old));
});
shadow.dom.text = (function shadow$dom$text(var_args){
var G__55647 = arguments.length;
switch (G__55647) {
case 2:
return shadow.dom.text.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return shadow.dom.text.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.text.cljs$core$IFn$_invoke$arity$2 = (function (el,new_text){
return (shadow.dom.dom_node(el).innerText = new_text);
}));

(shadow.dom.text.cljs$core$IFn$_invoke$arity$1 = (function (el){
return shadow.dom.dom_node(el).innerText;
}));

(shadow.dom.text.cljs$lang$maxFixedArity = 2);

shadow.dom.check = (function shadow$dom$check(var_args){
var G__55656 = arguments.length;
switch (G__55656) {
case 1:
return shadow.dom.check.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.check.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.check.cljs$core$IFn$_invoke$arity$1 = (function (el){
return shadow.dom.check.cljs$core$IFn$_invoke$arity$2(el,true);
}));

(shadow.dom.check.cljs$core$IFn$_invoke$arity$2 = (function (el,checked){
return (shadow.dom.dom_node(el).checked = checked);
}));

(shadow.dom.check.cljs$lang$maxFixedArity = 2);

shadow.dom.checked_QMARK_ = (function shadow$dom$checked_QMARK_(el){
return shadow.dom.dom_node(el).checked;
});
shadow.dom.form_elements = (function shadow$dom$form_elements(el){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(el).elements));
});
shadow.dom.children = (function shadow$dom$children(el){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(el).children));
});
shadow.dom.child_nodes = (function shadow$dom$child_nodes(el){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(el).childNodes));
});
shadow.dom.attr = (function shadow$dom$attr(var_args){
var G__55671 = arguments.length;
switch (G__55671) {
case 2:
return shadow.dom.attr.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.dom.attr.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.attr.cljs$core$IFn$_invoke$arity$2 = (function (el,key){
return shadow.dom.dom_node(el).getAttribute(cljs.core.name(key));
}));

(shadow.dom.attr.cljs$core$IFn$_invoke$arity$3 = (function (el,key,default$){
var or__4253__auto__ = shadow.dom.dom_node(el).getAttribute(cljs.core.name(key));
if(cljs.core.truth_(or__4253__auto__)){
return or__4253__auto__;
} else {
return default$;
}
}));

(shadow.dom.attr.cljs$lang$maxFixedArity = 3);

shadow.dom.del_attr = (function shadow$dom$del_attr(el,key){
return shadow.dom.dom_node(el).removeAttribute(cljs.core.name(key));
});
shadow.dom.data = (function shadow$dom$data(el,key){
return shadow.dom.dom_node(el).getAttribute(["data-",cljs.core.name(key)].join(''));
});
shadow.dom.set_data = (function shadow$dom$set_data(el,key,value){
return shadow.dom.dom_node(el).setAttribute(["data-",cljs.core.name(key)].join(''),cljs.core.str.cljs$core$IFn$_invoke$arity$1(value));
});
shadow.dom.set_html = (function shadow$dom$set_html(node,text){
return (shadow.dom.dom_node(node).innerHTML = text);
});
shadow.dom.get_html = (function shadow$dom$get_html(node){
return shadow.dom.dom_node(node).innerHTML;
});
shadow.dom.fragment = (function shadow$dom$fragment(var_args){
var args__4870__auto__ = [];
var len__4864__auto___56107 = arguments.length;
var i__4865__auto___56108 = (0);
while(true){
if((i__4865__auto___56108 < len__4864__auto___56107)){
args__4870__auto__.push((arguments[i__4865__auto___56108]));

var G__56109 = (i__4865__auto___56108 + (1));
i__4865__auto___56108 = G__56109;
continue;
} else {
}
break;
}

var argseq__4871__auto__ = ((((0) < args__4870__auto__.length))?(new cljs.core.IndexedSeq(args__4870__auto__.slice((0)),(0),null)):null);
return shadow.dom.fragment.cljs$core$IFn$_invoke$arity$variadic(argseq__4871__auto__);
});

(shadow.dom.fragment.cljs$core$IFn$_invoke$arity$variadic = (function (nodes){
var fragment = document.createDocumentFragment();
var seq__55695_56110 = cljs.core.seq(nodes);
var chunk__55696_56111 = null;
var count__55697_56112 = (0);
var i__55698_56113 = (0);
while(true){
if((i__55698_56113 < count__55697_56112)){
var node_56114 = chunk__55696_56111.cljs$core$IIndexed$_nth$arity$2(null,i__55698_56113);
fragment.appendChild(shadow.dom._to_dom(node_56114));


var G__56115 = seq__55695_56110;
var G__56116 = chunk__55696_56111;
var G__56117 = count__55697_56112;
var G__56118 = (i__55698_56113 + (1));
seq__55695_56110 = G__56115;
chunk__55696_56111 = G__56116;
count__55697_56112 = G__56117;
i__55698_56113 = G__56118;
continue;
} else {
var temp__5753__auto___56119 = cljs.core.seq(seq__55695_56110);
if(temp__5753__auto___56119){
var seq__55695_56120__$1 = temp__5753__auto___56119;
if(cljs.core.chunked_seq_QMARK_(seq__55695_56120__$1)){
var c__4679__auto___56121 = cljs.core.chunk_first(seq__55695_56120__$1);
var G__56122 = cljs.core.chunk_rest(seq__55695_56120__$1);
var G__56123 = c__4679__auto___56121;
var G__56124 = cljs.core.count(c__4679__auto___56121);
var G__56125 = (0);
seq__55695_56110 = G__56122;
chunk__55696_56111 = G__56123;
count__55697_56112 = G__56124;
i__55698_56113 = G__56125;
continue;
} else {
var node_56126 = cljs.core.first(seq__55695_56120__$1);
fragment.appendChild(shadow.dom._to_dom(node_56126));


var G__56127 = cljs.core.next(seq__55695_56120__$1);
var G__56128 = null;
var G__56129 = (0);
var G__56130 = (0);
seq__55695_56110 = G__56127;
chunk__55696_56111 = G__56128;
count__55697_56112 = G__56129;
i__55698_56113 = G__56130;
continue;
}
} else {
}
}
break;
}

return (new shadow.dom.NativeColl(fragment));
}));

(shadow.dom.fragment.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(shadow.dom.fragment.cljs$lang$applyTo = (function (seq55690){
var self__4852__auto__ = this;
return self__4852__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55690));
}));

/**
 * given a html string, eval all <script> tags and return the html without the scripts
 * don't do this for everything, only content you trust.
 */
shadow.dom.eval_scripts = (function shadow$dom$eval_scripts(s){
var scripts = cljs.core.re_seq(/<script[^>]*?>(.+?)<\/script>/,s);
var seq__55715_56131 = cljs.core.seq(scripts);
var chunk__55716_56132 = null;
var count__55717_56133 = (0);
var i__55718_56134 = (0);
while(true){
if((i__55718_56134 < count__55717_56133)){
var vec__55727_56135 = chunk__55716_56132.cljs$core$IIndexed$_nth$arity$2(null,i__55718_56134);
var script_tag_56136 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55727_56135,(0),null);
var script_body_56137 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55727_56135,(1),null);
eval(script_body_56137);


var G__56138 = seq__55715_56131;
var G__56139 = chunk__55716_56132;
var G__56140 = count__55717_56133;
var G__56141 = (i__55718_56134 + (1));
seq__55715_56131 = G__56138;
chunk__55716_56132 = G__56139;
count__55717_56133 = G__56140;
i__55718_56134 = G__56141;
continue;
} else {
var temp__5753__auto___56142 = cljs.core.seq(seq__55715_56131);
if(temp__5753__auto___56142){
var seq__55715_56143__$1 = temp__5753__auto___56142;
if(cljs.core.chunked_seq_QMARK_(seq__55715_56143__$1)){
var c__4679__auto___56144 = cljs.core.chunk_first(seq__55715_56143__$1);
var G__56145 = cljs.core.chunk_rest(seq__55715_56143__$1);
var G__56146 = c__4679__auto___56144;
var G__56147 = cljs.core.count(c__4679__auto___56144);
var G__56148 = (0);
seq__55715_56131 = G__56145;
chunk__55716_56132 = G__56146;
count__55717_56133 = G__56147;
i__55718_56134 = G__56148;
continue;
} else {
var vec__55730_56149 = cljs.core.first(seq__55715_56143__$1);
var script_tag_56150 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55730_56149,(0),null);
var script_body_56151 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55730_56149,(1),null);
eval(script_body_56151);


var G__56152 = cljs.core.next(seq__55715_56143__$1);
var G__56153 = null;
var G__56154 = (0);
var G__56155 = (0);
seq__55715_56131 = G__56152;
chunk__55716_56132 = G__56153;
count__55717_56133 = G__56154;
i__55718_56134 = G__56155;
continue;
}
} else {
}
}
break;
}

return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (s__$1,p__55733){
var vec__55734 = p__55733;
var script_tag = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55734,(0),null);
var script_body = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55734,(1),null);
return clojure.string.replace(s__$1,script_tag,"");
}),s,scripts);
});
shadow.dom.str__GT_fragment = (function shadow$dom$str__GT_fragment(s){
var el = document.createElement("div");
(el.innerHTML = s);

return (new shadow.dom.NativeColl(goog.dom.childrenToNode_(document,el)));
});
shadow.dom.node_name = (function shadow$dom$node_name(el){
return shadow.dom.dom_node(el).nodeName;
});
shadow.dom.ancestor_by_class = (function shadow$dom$ancestor_by_class(el,cls){
return goog.dom.getAncestorByClass(shadow.dom.dom_node(el),cls);
});
shadow.dom.ancestor_by_tag = (function shadow$dom$ancestor_by_tag(var_args){
var G__55738 = arguments.length;
switch (G__55738) {
case 2:
return shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$2 = (function (el,tag){
return goog.dom.getAncestorByTagNameAndClass(shadow.dom.dom_node(el),cljs.core.name(tag));
}));

(shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$3 = (function (el,tag,cls){
return goog.dom.getAncestorByTagNameAndClass(shadow.dom.dom_node(el),cljs.core.name(tag),cljs.core.name(cls));
}));

(shadow.dom.ancestor_by_tag.cljs$lang$maxFixedArity = 3);

shadow.dom.get_value = (function shadow$dom$get_value(dom){
return goog.dom.forms.getValue(shadow.dom.dom_node(dom));
});
shadow.dom.set_value = (function shadow$dom$set_value(dom,value){
return goog.dom.forms.setValue(shadow.dom.dom_node(dom),value);
});
shadow.dom.px = (function shadow$dom$px(value){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1((value | (0))),"px"].join('');
});
shadow.dom.pct = (function shadow$dom$pct(value){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(value),"%"].join('');
});
shadow.dom.remove_style_STAR_ = (function shadow$dom$remove_style_STAR_(el,style){
return el.style.removeProperty(cljs.core.name(style));
});
shadow.dom.remove_style = (function shadow$dom$remove_style(el,style){
var el__$1 = shadow.dom.dom_node(el);
return shadow.dom.remove_style_STAR_(el__$1,style);
});
shadow.dom.remove_styles = (function shadow$dom$remove_styles(el,style_keys){
var el__$1 = shadow.dom.dom_node(el);
var seq__55758 = cljs.core.seq(style_keys);
var chunk__55759 = null;
var count__55760 = (0);
var i__55761 = (0);
while(true){
if((i__55761 < count__55760)){
var it = chunk__55759.cljs$core$IIndexed$_nth$arity$2(null,i__55761);
shadow.dom.remove_style_STAR_(el__$1,it);


var G__56159 = seq__55758;
var G__56160 = chunk__55759;
var G__56161 = count__55760;
var G__56162 = (i__55761 + (1));
seq__55758 = G__56159;
chunk__55759 = G__56160;
count__55760 = G__56161;
i__55761 = G__56162;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__55758);
if(temp__5753__auto__){
var seq__55758__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__55758__$1)){
var c__4679__auto__ = cljs.core.chunk_first(seq__55758__$1);
var G__56164 = cljs.core.chunk_rest(seq__55758__$1);
var G__56165 = c__4679__auto__;
var G__56166 = cljs.core.count(c__4679__auto__);
var G__56167 = (0);
seq__55758 = G__56164;
chunk__55759 = G__56165;
count__55760 = G__56166;
i__55761 = G__56167;
continue;
} else {
var it = cljs.core.first(seq__55758__$1);
shadow.dom.remove_style_STAR_(el__$1,it);


var G__56168 = cljs.core.next(seq__55758__$1);
var G__56169 = null;
var G__56170 = (0);
var G__56171 = (0);
seq__55758 = G__56168;
chunk__55759 = G__56169;
count__55760 = G__56170;
i__55761 = G__56171;
continue;
}
} else {
return null;
}
}
break;
}
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IKVReduce}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
shadow.dom.Coordinate = (function (x,y,__meta,__extmap,__hash){
this.x = x;
this.y = y;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2230716170;
this.cljs$lang$protocol_mask$partition1$ = 139264;
});
(shadow.dom.Coordinate.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__4502__auto__,k__4503__auto__){
var self__ = this;
var this__4502__auto____$1 = this;
return this__4502__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__4503__auto__,null);
}));

(shadow.dom.Coordinate.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__4504__auto__,k55773,else__4505__auto__){
var self__ = this;
var this__4504__auto____$1 = this;
var G__55788 = k55773;
var G__55788__$1 = (((G__55788 instanceof cljs.core.Keyword))?G__55788.fqn:null);
switch (G__55788__$1) {
case "x":
return self__.x;

break;
case "y":
return self__.y;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k55773,else__4505__auto__);

}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__4522__auto__,f__4523__auto__,init__4524__auto__){
var self__ = this;
var this__4522__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__4525__auto__,p__55792){
var vec__55794 = p__55792;
var k__4526__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55794,(0),null);
var v__4527__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55794,(1),null);
return (f__4523__auto__.cljs$core$IFn$_invoke$arity$3 ? f__4523__auto__.cljs$core$IFn$_invoke$arity$3(ret__4525__auto__,k__4526__auto__,v__4527__auto__) : f__4523__auto__.call(null,ret__4525__auto__,k__4526__auto__,v__4527__auto__));
}),init__4524__auto__,this__4522__auto____$1);
}));

(shadow.dom.Coordinate.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__4517__auto__,writer__4518__auto__,opts__4519__auto__){
var self__ = this;
var this__4517__auto____$1 = this;
var pr_pair__4520__auto__ = (function (keyval__4521__auto__){
return cljs.core.pr_sequential_writer(writer__4518__auto__,cljs.core.pr_writer,""," ","",opts__4519__auto__,keyval__4521__auto__);
});
return cljs.core.pr_sequential_writer(writer__4518__auto__,pr_pair__4520__auto__,"#shadow.dom.Coordinate{",", ","}",opts__4519__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"x","x",2099068185),self__.x],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"y","y",-1757859776),self__.y],null))], null),self__.__extmap));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__55771){
var self__ = this;
var G__55771__$1 = this;
return (new cljs.core.RecordIter((0),G__55771__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"x","x",2099068185),new cljs.core.Keyword(null,"y","y",-1757859776)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__4500__auto__){
var self__ = this;
var this__4500__auto____$1 = this;
return self__.__meta;
}));

(shadow.dom.Coordinate.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__4497__auto__){
var self__ = this;
var this__4497__auto____$1 = this;
return (new shadow.dom.Coordinate(self__.x,self__.y,self__.__meta,self__.__extmap,self__.__hash));
}));

(shadow.dom.Coordinate.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__4506__auto__){
var self__ = this;
var this__4506__auto____$1 = this;
return (2 + cljs.core.count(self__.__extmap));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__4498__auto__){
var self__ = this;
var this__4498__auto____$1 = this;
var h__4360__auto__ = self__.__hash;
if((!((h__4360__auto__ == null)))){
return h__4360__auto__;
} else {
var h__4360__auto____$1 = (function (coll__4499__auto__){
return (145542109 ^ cljs.core.hash_unordered_coll(coll__4499__auto__));
})(this__4498__auto____$1);
(self__.__hash = h__4360__auto____$1);

return h__4360__auto____$1;
}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this55774,other55775){
var self__ = this;
var this55774__$1 = this;
return (((!((other55775 == null)))) && ((((this55774__$1.constructor === other55775.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this55774__$1.x,other55775.x)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this55774__$1.y,other55775.y)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this55774__$1.__extmap,other55775.__extmap)))))))));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__4512__auto__,k__4513__auto__){
var self__ = this;
var this__4512__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"y","y",-1757859776),null,new cljs.core.Keyword(null,"x","x",2099068185),null], null), null),k__4513__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__4512__auto____$1),self__.__meta),k__4513__auto__);
} else {
return (new shadow.dom.Coordinate(self__.x,self__.y,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__4513__auto__)),null));
}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__4509__auto__,k55773){
var self__ = this;
var this__4509__auto____$1 = this;
var G__55816 = k55773;
var G__55816__$1 = (((G__55816 instanceof cljs.core.Keyword))?G__55816.fqn:null);
switch (G__55816__$1) {
case "x":
case "y":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k55773);

}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__4510__auto__,k__4511__auto__,G__55771){
var self__ = this;
var this__4510__auto____$1 = this;
var pred__55821 = cljs.core.keyword_identical_QMARK_;
var expr__55822 = k__4511__auto__;
if(cljs.core.truth_((pred__55821.cljs$core$IFn$_invoke$arity$2 ? pred__55821.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"x","x",2099068185),expr__55822) : pred__55821.call(null,new cljs.core.Keyword(null,"x","x",2099068185),expr__55822)))){
return (new shadow.dom.Coordinate(G__55771,self__.y,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__55821.cljs$core$IFn$_invoke$arity$2 ? pred__55821.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"y","y",-1757859776),expr__55822) : pred__55821.call(null,new cljs.core.Keyword(null,"y","y",-1757859776),expr__55822)))){
return (new shadow.dom.Coordinate(self__.x,G__55771,self__.__meta,self__.__extmap,null));
} else {
return (new shadow.dom.Coordinate(self__.x,self__.y,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__4511__auto__,G__55771),null));
}
}
}));

(shadow.dom.Coordinate.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__4515__auto__){
var self__ = this;
var this__4515__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"x","x",2099068185),self__.x,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"y","y",-1757859776),self__.y,null))], null),self__.__extmap));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__4501__auto__,G__55771){
var self__ = this;
var this__4501__auto____$1 = this;
return (new shadow.dom.Coordinate(self__.x,self__.y,G__55771,self__.__extmap,self__.__hash));
}));

(shadow.dom.Coordinate.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__4507__auto__,entry__4508__auto__){
var self__ = this;
var this__4507__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__4508__auto__)){
return this__4507__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth(entry__4508__auto__,(0)),cljs.core._nth(entry__4508__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__4507__auto____$1,entry__4508__auto__);
}
}));

(shadow.dom.Coordinate.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",-555367584,null),new cljs.core.Symbol(null,"y","y",-117328249,null)], null);
}));

(shadow.dom.Coordinate.cljs$lang$type = true);

(shadow.dom.Coordinate.cljs$lang$ctorPrSeq = (function (this__4546__auto__){
return (new cljs.core.List(null,"shadow.dom/Coordinate",null,(1),null));
}));

(shadow.dom.Coordinate.cljs$lang$ctorPrWriter = (function (this__4546__auto__,writer__4547__auto__){
return cljs.core._write(writer__4547__auto__,"shadow.dom/Coordinate");
}));

/**
 * Positional factory function for shadow.dom/Coordinate.
 */
shadow.dom.__GT_Coordinate = (function shadow$dom$__GT_Coordinate(x,y){
return (new shadow.dom.Coordinate(x,y,null,null,null));
});

/**
 * Factory function for shadow.dom/Coordinate, taking a map of keywords to field values.
 */
shadow.dom.map__GT_Coordinate = (function shadow$dom$map__GT_Coordinate(G__55779){
var extmap__4542__auto__ = (function (){var G__55837 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__55779,new cljs.core.Keyword(null,"x","x",2099068185),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"y","y",-1757859776)], 0));
if(cljs.core.record_QMARK_(G__55779)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__55837);
} else {
return G__55837;
}
})();
return (new shadow.dom.Coordinate(new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(G__55779),new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(G__55779),null,cljs.core.not_empty(extmap__4542__auto__),null));
});

shadow.dom.get_position = (function shadow$dom$get_position(el){
var pos = goog.style.getPosition(shadow.dom.dom_node(el));
return shadow.dom.__GT_Coordinate(pos.x,pos.y);
});
shadow.dom.get_client_position = (function shadow$dom$get_client_position(el){
var pos = goog.style.getClientPosition(shadow.dom.dom_node(el));
return shadow.dom.__GT_Coordinate(pos.x,pos.y);
});
shadow.dom.get_page_offset = (function shadow$dom$get_page_offset(el){
var pos = goog.style.getPageOffset(shadow.dom.dom_node(el));
return shadow.dom.__GT_Coordinate(pos.x,pos.y);
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IKVReduce}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
shadow.dom.Size = (function (w,h,__meta,__extmap,__hash){
this.w = w;
this.h = h;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2230716170;
this.cljs$lang$protocol_mask$partition1$ = 139264;
});
(shadow.dom.Size.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__4502__auto__,k__4503__auto__){
var self__ = this;
var this__4502__auto____$1 = this;
return this__4502__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__4503__auto__,null);
}));

(shadow.dom.Size.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__4504__auto__,k55848,else__4505__auto__){
var self__ = this;
var this__4504__auto____$1 = this;
var G__55862 = k55848;
var G__55862__$1 = (((G__55862 instanceof cljs.core.Keyword))?G__55862.fqn:null);
switch (G__55862__$1) {
case "w":
return self__.w;

break;
case "h":
return self__.h;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k55848,else__4505__auto__);

}
}));

(shadow.dom.Size.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__4522__auto__,f__4523__auto__,init__4524__auto__){
var self__ = this;
var this__4522__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__4525__auto__,p__55866){
var vec__55867 = p__55866;
var k__4526__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55867,(0),null);
var v__4527__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55867,(1),null);
return (f__4523__auto__.cljs$core$IFn$_invoke$arity$3 ? f__4523__auto__.cljs$core$IFn$_invoke$arity$3(ret__4525__auto__,k__4526__auto__,v__4527__auto__) : f__4523__auto__.call(null,ret__4525__auto__,k__4526__auto__,v__4527__auto__));
}),init__4524__auto__,this__4522__auto____$1);
}));

(shadow.dom.Size.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__4517__auto__,writer__4518__auto__,opts__4519__auto__){
var self__ = this;
var this__4517__auto____$1 = this;
var pr_pair__4520__auto__ = (function (keyval__4521__auto__){
return cljs.core.pr_sequential_writer(writer__4518__auto__,cljs.core.pr_writer,""," ","",opts__4519__auto__,keyval__4521__auto__);
});
return cljs.core.pr_sequential_writer(writer__4518__auto__,pr_pair__4520__auto__,"#shadow.dom.Size{",", ","}",opts__4519__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"w","w",354169001),self__.w],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"h","h",1109658740),self__.h],null))], null),self__.__extmap));
}));

(shadow.dom.Size.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__55847){
var self__ = this;
var G__55847__$1 = this;
return (new cljs.core.RecordIter((0),G__55847__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"w","w",354169001),new cljs.core.Keyword(null,"h","h",1109658740)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(shadow.dom.Size.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__4500__auto__){
var self__ = this;
var this__4500__auto____$1 = this;
return self__.__meta;
}));

(shadow.dom.Size.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__4497__auto__){
var self__ = this;
var this__4497__auto____$1 = this;
return (new shadow.dom.Size(self__.w,self__.h,self__.__meta,self__.__extmap,self__.__hash));
}));

(shadow.dom.Size.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__4506__auto__){
var self__ = this;
var this__4506__auto____$1 = this;
return (2 + cljs.core.count(self__.__extmap));
}));

(shadow.dom.Size.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__4498__auto__){
var self__ = this;
var this__4498__auto____$1 = this;
var h__4360__auto__ = self__.__hash;
if((!((h__4360__auto__ == null)))){
return h__4360__auto__;
} else {
var h__4360__auto____$1 = (function (coll__4499__auto__){
return (-1228019642 ^ cljs.core.hash_unordered_coll(coll__4499__auto__));
})(this__4498__auto____$1);
(self__.__hash = h__4360__auto____$1);

return h__4360__auto____$1;
}
}));

(shadow.dom.Size.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this55849,other55850){
var self__ = this;
var this55849__$1 = this;
return (((!((other55850 == null)))) && ((((this55849__$1.constructor === other55850.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this55849__$1.w,other55850.w)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this55849__$1.h,other55850.h)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this55849__$1.__extmap,other55850.__extmap)))))))));
}));

(shadow.dom.Size.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__4512__auto__,k__4513__auto__){
var self__ = this;
var this__4512__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"w","w",354169001),null,new cljs.core.Keyword(null,"h","h",1109658740),null], null), null),k__4513__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__4512__auto____$1),self__.__meta),k__4513__auto__);
} else {
return (new shadow.dom.Size(self__.w,self__.h,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__4513__auto__)),null));
}
}));

(shadow.dom.Size.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__4509__auto__,k55848){
var self__ = this;
var this__4509__auto____$1 = this;
var G__55870 = k55848;
var G__55870__$1 = (((G__55870 instanceof cljs.core.Keyword))?G__55870.fqn:null);
switch (G__55870__$1) {
case "w":
case "h":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k55848);

}
}));

(shadow.dom.Size.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__4510__auto__,k__4511__auto__,G__55847){
var self__ = this;
var this__4510__auto____$1 = this;
var pred__55871 = cljs.core.keyword_identical_QMARK_;
var expr__55872 = k__4511__auto__;
if(cljs.core.truth_((pred__55871.cljs$core$IFn$_invoke$arity$2 ? pred__55871.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"w","w",354169001),expr__55872) : pred__55871.call(null,new cljs.core.Keyword(null,"w","w",354169001),expr__55872)))){
return (new shadow.dom.Size(G__55847,self__.h,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__55871.cljs$core$IFn$_invoke$arity$2 ? pred__55871.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"h","h",1109658740),expr__55872) : pred__55871.call(null,new cljs.core.Keyword(null,"h","h",1109658740),expr__55872)))){
return (new shadow.dom.Size(self__.w,G__55847,self__.__meta,self__.__extmap,null));
} else {
return (new shadow.dom.Size(self__.w,self__.h,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__4511__auto__,G__55847),null));
}
}
}));

(shadow.dom.Size.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__4515__auto__){
var self__ = this;
var this__4515__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"w","w",354169001),self__.w,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"h","h",1109658740),self__.h,null))], null),self__.__extmap));
}));

(shadow.dom.Size.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__4501__auto__,G__55847){
var self__ = this;
var this__4501__auto____$1 = this;
return (new shadow.dom.Size(self__.w,self__.h,G__55847,self__.__extmap,self__.__hash));
}));

(shadow.dom.Size.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__4507__auto__,entry__4508__auto__){
var self__ = this;
var this__4507__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__4508__auto__)){
return this__4507__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth(entry__4508__auto__,(0)),cljs.core._nth(entry__4508__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__4507__auto____$1,entry__4508__auto__);
}
}));

(shadow.dom.Size.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"w","w",1994700528,null),new cljs.core.Symbol(null,"h","h",-1544777029,null)], null);
}));

(shadow.dom.Size.cljs$lang$type = true);

(shadow.dom.Size.cljs$lang$ctorPrSeq = (function (this__4546__auto__){
return (new cljs.core.List(null,"shadow.dom/Size",null,(1),null));
}));

(shadow.dom.Size.cljs$lang$ctorPrWriter = (function (this__4546__auto__,writer__4547__auto__){
return cljs.core._write(writer__4547__auto__,"shadow.dom/Size");
}));

/**
 * Positional factory function for shadow.dom/Size.
 */
shadow.dom.__GT_Size = (function shadow$dom$__GT_Size(w,h){
return (new shadow.dom.Size(w,h,null,null,null));
});

/**
 * Factory function for shadow.dom/Size, taking a map of keywords to field values.
 */
shadow.dom.map__GT_Size = (function shadow$dom$map__GT_Size(G__55853){
var extmap__4542__auto__ = (function (){var G__55874 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__55853,new cljs.core.Keyword(null,"w","w",354169001),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"h","h",1109658740)], 0));
if(cljs.core.record_QMARK_(G__55853)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__55874);
} else {
return G__55874;
}
})();
return (new shadow.dom.Size(new cljs.core.Keyword(null,"w","w",354169001).cljs$core$IFn$_invoke$arity$1(G__55853),new cljs.core.Keyword(null,"h","h",1109658740).cljs$core$IFn$_invoke$arity$1(G__55853),null,cljs.core.not_empty(extmap__4542__auto__),null));
});

shadow.dom.size__GT_clj = (function shadow$dom$size__GT_clj(size){
return (new shadow.dom.Size(size.width,size.height,null,null,null));
});
shadow.dom.get_size = (function shadow$dom$get_size(el){
return shadow.dom.size__GT_clj(goog.style.getSize(shadow.dom.dom_node(el)));
});
shadow.dom.get_height = (function shadow$dom$get_height(el){
return shadow.dom.get_size(el).h;
});
shadow.dom.get_viewport_size = (function shadow$dom$get_viewport_size(){
return shadow.dom.size__GT_clj(goog.dom.getViewportSize());
});
shadow.dom.first_child = (function shadow$dom$first_child(el){
return (shadow.dom.dom_node(el).children[(0)]);
});
shadow.dom.select_option_values = (function shadow$dom$select_option_values(el){
var native$ = shadow.dom.dom_node(el);
var opts = (native$["options"]);
var a__4738__auto__ = opts;
var l__4739__auto__ = a__4738__auto__.length;
var i = (0);
var ret = cljs.core.PersistentVector.EMPTY;
while(true){
if((i < l__4739__auto__)){
var G__56189 = (i + (1));
var G__56190 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ret,(opts[i]["value"]));
i = G__56189;
ret = G__56190;
continue;
} else {
return ret;
}
break;
}
});
shadow.dom.build_url = (function shadow$dom$build_url(path,query_params){
if(cljs.core.empty_QMARK_(query_params)){
return path;
} else {
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(path),"?",clojure.string.join.cljs$core$IFn$_invoke$arity$2("&",cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__55879){
var vec__55880 = p__55879;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55880,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55880,(1),null);
return [cljs.core.name(k),"=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(encodeURIComponent(cljs.core.str.cljs$core$IFn$_invoke$arity$1(v)))].join('');
}),query_params))].join('');
}
});
shadow.dom.redirect = (function shadow$dom$redirect(var_args){
var G__55884 = arguments.length;
switch (G__55884) {
case 1:
return shadow.dom.redirect.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.redirect.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.redirect.cljs$core$IFn$_invoke$arity$1 = (function (path){
return shadow.dom.redirect.cljs$core$IFn$_invoke$arity$2(path,cljs.core.PersistentArrayMap.EMPTY);
}));

(shadow.dom.redirect.cljs$core$IFn$_invoke$arity$2 = (function (path,query_params){
return (document["location"]["href"] = shadow.dom.build_url(path,query_params));
}));

(shadow.dom.redirect.cljs$lang$maxFixedArity = 2);

shadow.dom.reload_BANG_ = (function shadow$dom$reload_BANG_(){
return (document.location.href = document.location.href);
});
shadow.dom.tag_name = (function shadow$dom$tag_name(el){
var dom = shadow.dom.dom_node(el);
return dom.tagName;
});
shadow.dom.insert_after = (function shadow$dom$insert_after(ref,new$){
var new_node = shadow.dom.dom_node(new$);
goog.dom.insertSiblingAfter(new_node,shadow.dom.dom_node(ref));

return new_node;
});
shadow.dom.insert_before = (function shadow$dom$insert_before(ref,new$){
var new_node = shadow.dom.dom_node(new$);
goog.dom.insertSiblingBefore(new_node,shadow.dom.dom_node(ref));

return new_node;
});
shadow.dom.insert_first = (function shadow$dom$insert_first(ref,new$){
var temp__5751__auto__ = shadow.dom.dom_node(ref).firstChild;
if(cljs.core.truth_(temp__5751__auto__)){
var child = temp__5751__auto__;
return shadow.dom.insert_before(child,new$);
} else {
return shadow.dom.append.cljs$core$IFn$_invoke$arity$2(ref,new$);
}
});
shadow.dom.index_of = (function shadow$dom$index_of(el){
var el__$1 = shadow.dom.dom_node(el);
var i = (0);
while(true){
var ps = el__$1.previousSibling;
if((ps == null)){
return i;
} else {
var G__56192 = ps;
var G__56193 = (i + (1));
el__$1 = G__56192;
i = G__56193;
continue;
}
break;
}
});
shadow.dom.get_parent = (function shadow$dom$get_parent(el){
return goog.dom.getParentElement(shadow.dom.dom_node(el));
});
shadow.dom.parents = (function shadow$dom$parents(el){
var parent = shadow.dom.get_parent(el);
if(cljs.core.truth_(parent)){
return cljs.core.cons(parent,(new cljs.core.LazySeq(null,(function (){
return (shadow.dom.parents.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.parents.cljs$core$IFn$_invoke$arity$1(parent) : shadow.dom.parents.call(null,parent));
}),null,null)));
} else {
return null;
}
});
shadow.dom.matches = (function shadow$dom$matches(el,sel){
return shadow.dom.dom_node(el).matches(sel);
});
shadow.dom.get_next_sibling = (function shadow$dom$get_next_sibling(el){
return goog.dom.getNextElementSibling(shadow.dom.dom_node(el));
});
shadow.dom.get_previous_sibling = (function shadow$dom$get_previous_sibling(el){
return goog.dom.getPreviousElementSibling(shadow.dom.dom_node(el));
});
shadow.dom.xmlns = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, ["svg","http://www.w3.org/2000/svg","xlink","http://www.w3.org/1999/xlink"], null));
shadow.dom.create_svg_node = (function shadow$dom$create_svg_node(tag_def,props){
var vec__55885 = shadow.dom.parse_tag(tag_def);
var tag_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55885,(0),null);
var tag_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55885,(1),null);
var tag_classes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55885,(2),null);
var el = document.createElementNS("http://www.w3.org/2000/svg",tag_name);
if(cljs.core.truth_(tag_id)){
el.setAttribute("id",tag_id);
} else {
}

if(cljs.core.truth_(tag_classes)){
el.setAttribute("class",shadow.dom.merge_class_string(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(props),tag_classes));
} else {
}

var seq__55888_56194 = cljs.core.seq(props);
var chunk__55889_56195 = null;
var count__55890_56196 = (0);
var i__55891_56197 = (0);
while(true){
if((i__55891_56197 < count__55890_56196)){
var vec__55898_56198 = chunk__55889_56195.cljs$core$IIndexed$_nth$arity$2(null,i__55891_56197);
var k_56199 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55898_56198,(0),null);
var v_56200 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55898_56198,(1),null);
el.setAttributeNS((function (){var temp__5753__auto__ = cljs.core.namespace(k_56199);
if(cljs.core.truth_(temp__5753__auto__)){
var ns = temp__5753__auto__;
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(shadow.dom.xmlns),ns);
} else {
return null;
}
})(),cljs.core.name(k_56199),v_56200);


var G__56205 = seq__55888_56194;
var G__56206 = chunk__55889_56195;
var G__56207 = count__55890_56196;
var G__56208 = (i__55891_56197 + (1));
seq__55888_56194 = G__56205;
chunk__55889_56195 = G__56206;
count__55890_56196 = G__56207;
i__55891_56197 = G__56208;
continue;
} else {
var temp__5753__auto___56209 = cljs.core.seq(seq__55888_56194);
if(temp__5753__auto___56209){
var seq__55888_56210__$1 = temp__5753__auto___56209;
if(cljs.core.chunked_seq_QMARK_(seq__55888_56210__$1)){
var c__4679__auto___56211 = cljs.core.chunk_first(seq__55888_56210__$1);
var G__56212 = cljs.core.chunk_rest(seq__55888_56210__$1);
var G__56213 = c__4679__auto___56211;
var G__56214 = cljs.core.count(c__4679__auto___56211);
var G__56215 = (0);
seq__55888_56194 = G__56212;
chunk__55889_56195 = G__56213;
count__55890_56196 = G__56214;
i__55891_56197 = G__56215;
continue;
} else {
var vec__55901_56216 = cljs.core.first(seq__55888_56210__$1);
var k_56217 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55901_56216,(0),null);
var v_56218 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55901_56216,(1),null);
el.setAttributeNS((function (){var temp__5753__auto____$1 = cljs.core.namespace(k_56217);
if(cljs.core.truth_(temp__5753__auto____$1)){
var ns = temp__5753__auto____$1;
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(shadow.dom.xmlns),ns);
} else {
return null;
}
})(),cljs.core.name(k_56217),v_56218);


var G__56219 = cljs.core.next(seq__55888_56210__$1);
var G__56220 = null;
var G__56221 = (0);
var G__56222 = (0);
seq__55888_56194 = G__56219;
chunk__55889_56195 = G__56220;
count__55890_56196 = G__56221;
i__55891_56197 = G__56222;
continue;
}
} else {
}
}
break;
}

return el;
});
shadow.dom.svg_node = (function shadow$dom$svg_node(el){
if((el == null)){
return null;
} else {
if((((!((el == null))))?((((false) || ((cljs.core.PROTOCOL_SENTINEL === el.shadow$dom$SVGElement$))))?true:false):false)){
return el.shadow$dom$SVGElement$_to_svg$arity$1(null);
} else {
return el;

}
}
});
shadow.dom.make_svg_node = (function shadow$dom$make_svg_node(structure){
var vec__55905 = shadow.dom.destructure_node(shadow.dom.create_svg_node,structure);
var node = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55905,(0),null);
var node_children = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55905,(1),null);
var seq__55908_56223 = cljs.core.seq(node_children);
var chunk__55910_56224 = null;
var count__55911_56225 = (0);
var i__55912_56226 = (0);
while(true){
if((i__55912_56226 < count__55911_56225)){
var child_struct_56227 = chunk__55910_56224.cljs$core$IIndexed$_nth$arity$2(null,i__55912_56226);
if((!((child_struct_56227 == null)))){
if(typeof child_struct_56227 === 'string'){
var text_56228 = (node["textContent"]);
(node["textContent"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(text_56228),child_struct_56227].join(''));
} else {
var children_56229 = shadow.dom.svg_node(child_struct_56227);
if(cljs.core.seq_QMARK_(children_56229)){
var seq__55926_56230 = cljs.core.seq(children_56229);
var chunk__55928_56231 = null;
var count__55929_56232 = (0);
var i__55930_56233 = (0);
while(true){
if((i__55930_56233 < count__55929_56232)){
var child_56234 = chunk__55928_56231.cljs$core$IIndexed$_nth$arity$2(null,i__55930_56233);
if(cljs.core.truth_(child_56234)){
node.appendChild(child_56234);


var G__56235 = seq__55926_56230;
var G__56236 = chunk__55928_56231;
var G__56237 = count__55929_56232;
var G__56238 = (i__55930_56233 + (1));
seq__55926_56230 = G__56235;
chunk__55928_56231 = G__56236;
count__55929_56232 = G__56237;
i__55930_56233 = G__56238;
continue;
} else {
var G__56239 = seq__55926_56230;
var G__56240 = chunk__55928_56231;
var G__56241 = count__55929_56232;
var G__56242 = (i__55930_56233 + (1));
seq__55926_56230 = G__56239;
chunk__55928_56231 = G__56240;
count__55929_56232 = G__56241;
i__55930_56233 = G__56242;
continue;
}
} else {
var temp__5753__auto___56243 = cljs.core.seq(seq__55926_56230);
if(temp__5753__auto___56243){
var seq__55926_56244__$1 = temp__5753__auto___56243;
if(cljs.core.chunked_seq_QMARK_(seq__55926_56244__$1)){
var c__4679__auto___56245 = cljs.core.chunk_first(seq__55926_56244__$1);
var G__56246 = cljs.core.chunk_rest(seq__55926_56244__$1);
var G__56247 = c__4679__auto___56245;
var G__56248 = cljs.core.count(c__4679__auto___56245);
var G__56249 = (0);
seq__55926_56230 = G__56246;
chunk__55928_56231 = G__56247;
count__55929_56232 = G__56248;
i__55930_56233 = G__56249;
continue;
} else {
var child_56250 = cljs.core.first(seq__55926_56244__$1);
if(cljs.core.truth_(child_56250)){
node.appendChild(child_56250);


var G__56251 = cljs.core.next(seq__55926_56244__$1);
var G__56252 = null;
var G__56253 = (0);
var G__56254 = (0);
seq__55926_56230 = G__56251;
chunk__55928_56231 = G__56252;
count__55929_56232 = G__56253;
i__55930_56233 = G__56254;
continue;
} else {
var G__56255 = cljs.core.next(seq__55926_56244__$1);
var G__56256 = null;
var G__56257 = (0);
var G__56258 = (0);
seq__55926_56230 = G__56255;
chunk__55928_56231 = G__56256;
count__55929_56232 = G__56257;
i__55930_56233 = G__56258;
continue;
}
}
} else {
}
}
break;
}
} else {
node.appendChild(children_56229);
}
}


var G__56259 = seq__55908_56223;
var G__56260 = chunk__55910_56224;
var G__56261 = count__55911_56225;
var G__56262 = (i__55912_56226 + (1));
seq__55908_56223 = G__56259;
chunk__55910_56224 = G__56260;
count__55911_56225 = G__56261;
i__55912_56226 = G__56262;
continue;
} else {
var G__56263 = seq__55908_56223;
var G__56264 = chunk__55910_56224;
var G__56265 = count__55911_56225;
var G__56266 = (i__55912_56226 + (1));
seq__55908_56223 = G__56263;
chunk__55910_56224 = G__56264;
count__55911_56225 = G__56265;
i__55912_56226 = G__56266;
continue;
}
} else {
var temp__5753__auto___56267 = cljs.core.seq(seq__55908_56223);
if(temp__5753__auto___56267){
var seq__55908_56268__$1 = temp__5753__auto___56267;
if(cljs.core.chunked_seq_QMARK_(seq__55908_56268__$1)){
var c__4679__auto___56269 = cljs.core.chunk_first(seq__55908_56268__$1);
var G__56270 = cljs.core.chunk_rest(seq__55908_56268__$1);
var G__56271 = c__4679__auto___56269;
var G__56272 = cljs.core.count(c__4679__auto___56269);
var G__56273 = (0);
seq__55908_56223 = G__56270;
chunk__55910_56224 = G__56271;
count__55911_56225 = G__56272;
i__55912_56226 = G__56273;
continue;
} else {
var child_struct_56274 = cljs.core.first(seq__55908_56268__$1);
if((!((child_struct_56274 == null)))){
if(typeof child_struct_56274 === 'string'){
var text_56275 = (node["textContent"]);
(node["textContent"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(text_56275),child_struct_56274].join(''));
} else {
var children_56276 = shadow.dom.svg_node(child_struct_56274);
if(cljs.core.seq_QMARK_(children_56276)){
var seq__55932_56277 = cljs.core.seq(children_56276);
var chunk__55934_56278 = null;
var count__55935_56279 = (0);
var i__55936_56280 = (0);
while(true){
if((i__55936_56280 < count__55935_56279)){
var child_56281 = chunk__55934_56278.cljs$core$IIndexed$_nth$arity$2(null,i__55936_56280);
if(cljs.core.truth_(child_56281)){
node.appendChild(child_56281);


var G__56282 = seq__55932_56277;
var G__56283 = chunk__55934_56278;
var G__56284 = count__55935_56279;
var G__56285 = (i__55936_56280 + (1));
seq__55932_56277 = G__56282;
chunk__55934_56278 = G__56283;
count__55935_56279 = G__56284;
i__55936_56280 = G__56285;
continue;
} else {
var G__56287 = seq__55932_56277;
var G__56288 = chunk__55934_56278;
var G__56289 = count__55935_56279;
var G__56290 = (i__55936_56280 + (1));
seq__55932_56277 = G__56287;
chunk__55934_56278 = G__56288;
count__55935_56279 = G__56289;
i__55936_56280 = G__56290;
continue;
}
} else {
var temp__5753__auto___56292__$1 = cljs.core.seq(seq__55932_56277);
if(temp__5753__auto___56292__$1){
var seq__55932_56294__$1 = temp__5753__auto___56292__$1;
if(cljs.core.chunked_seq_QMARK_(seq__55932_56294__$1)){
var c__4679__auto___56295 = cljs.core.chunk_first(seq__55932_56294__$1);
var G__56296 = cljs.core.chunk_rest(seq__55932_56294__$1);
var G__56297 = c__4679__auto___56295;
var G__56298 = cljs.core.count(c__4679__auto___56295);
var G__56299 = (0);
seq__55932_56277 = G__56296;
chunk__55934_56278 = G__56297;
count__55935_56279 = G__56298;
i__55936_56280 = G__56299;
continue;
} else {
var child_56300 = cljs.core.first(seq__55932_56294__$1);
if(cljs.core.truth_(child_56300)){
node.appendChild(child_56300);


var G__56301 = cljs.core.next(seq__55932_56294__$1);
var G__56302 = null;
var G__56303 = (0);
var G__56304 = (0);
seq__55932_56277 = G__56301;
chunk__55934_56278 = G__56302;
count__55935_56279 = G__56303;
i__55936_56280 = G__56304;
continue;
} else {
var G__56305 = cljs.core.next(seq__55932_56294__$1);
var G__56306 = null;
var G__56307 = (0);
var G__56308 = (0);
seq__55932_56277 = G__56305;
chunk__55934_56278 = G__56306;
count__55935_56279 = G__56307;
i__55936_56280 = G__56308;
continue;
}
}
} else {
}
}
break;
}
} else {
node.appendChild(children_56276);
}
}


var G__56309 = cljs.core.next(seq__55908_56268__$1);
var G__56310 = null;
var G__56311 = (0);
var G__56312 = (0);
seq__55908_56223 = G__56309;
chunk__55910_56224 = G__56310;
count__55911_56225 = G__56311;
i__55912_56226 = G__56312;
continue;
} else {
var G__56313 = cljs.core.next(seq__55908_56268__$1);
var G__56314 = null;
var G__56315 = (0);
var G__56316 = (0);
seq__55908_56223 = G__56313;
chunk__55910_56224 = G__56314;
count__55911_56225 = G__56315;
i__55912_56226 = G__56316;
continue;
}
}
} else {
}
}
break;
}

return node;
});
(shadow.dom.SVGElement["string"] = true);

(shadow.dom._to_svg["string"] = (function (this$){
if((this$ instanceof cljs.core.Keyword)){
return shadow.dom.make_svg_node(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [this$], null));
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("strings cannot be in svgs",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"this","this",-611633625),this$], null));
}
}));

(cljs.core.PersistentVector.prototype.shadow$dom$SVGElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.PersistentVector.prototype.shadow$dom$SVGElement$_to_svg$arity$1 = (function (this$){
var this$__$1 = this;
return shadow.dom.make_svg_node(this$__$1);
}));

(cljs.core.LazySeq.prototype.shadow$dom$SVGElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.LazySeq.prototype.shadow$dom$SVGElement$_to_svg$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom._to_svg,this$__$1);
}));

(shadow.dom.SVGElement["null"] = true);

(shadow.dom._to_svg["null"] = (function (_){
return null;
}));
shadow.dom.svg = (function shadow$dom$svg(var_args){
var args__4870__auto__ = [];
var len__4864__auto___56317 = arguments.length;
var i__4865__auto___56318 = (0);
while(true){
if((i__4865__auto___56318 < len__4864__auto___56317)){
args__4870__auto__.push((arguments[i__4865__auto___56318]));

var G__56319 = (i__4865__auto___56318 + (1));
i__4865__auto___56318 = G__56319;
continue;
} else {
}
break;
}

var argseq__4871__auto__ = ((((1) < args__4870__auto__.length))?(new cljs.core.IndexedSeq(args__4870__auto__.slice((1)),(0),null)):null);
return shadow.dom.svg.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4871__auto__);
});

(shadow.dom.svg.cljs$core$IFn$_invoke$arity$variadic = (function (attrs,children){
return shadow.dom._to_svg(cljs.core.vec(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"svg","svg",856789142),attrs], null),children)));
}));

(shadow.dom.svg.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(shadow.dom.svg.cljs$lang$applyTo = (function (seq55938){
var G__55939 = cljs.core.first(seq55938);
var seq55938__$1 = cljs.core.next(seq55938);
var self__4851__auto__ = this;
return self__4851__auto__.cljs$core$IFn$_invoke$arity$variadic(G__55939,seq55938__$1);
}));

/**
 * returns a channel for events on el
 * transform-fn should be a (fn [e el] some-val) where some-val will be put on the chan
 * once-or-cleanup handles the removal of the event handler
 * - true: remove after one event
 * - false: never removed
 * - chan: remove on msg/close
 */
shadow.dom.event_chan = (function shadow$dom$event_chan(var_args){
var G__55941 = arguments.length;
switch (G__55941) {
case 2:
return shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$2 = (function (el,event){
return shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$4(el,event,null,false);
}));

(shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$3 = (function (el,event,xf){
return shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$4(el,event,xf,false);
}));

(shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$4 = (function (el,event,xf,once_or_cleanup){
var buf = cljs.core.async.sliding_buffer((1));
var chan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2(buf,xf);
var event_fn = (function shadow$dom$event_fn(e){
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(chan,e);

if(once_or_cleanup === true){
shadow.dom.remove_event_handler(el,event,shadow$dom$event_fn);

return cljs.core.async.close_BANG_(chan);
} else {
return null;
}
});
shadow.dom.dom_listen(shadow.dom.dom_node(el),cljs.core.name(event),event_fn);

if(cljs.core.truth_((function (){var and__4251__auto__ = once_or_cleanup;
if(cljs.core.truth_(and__4251__auto__)){
return (!(once_or_cleanup === true));
} else {
return and__4251__auto__;
}
})())){
var c__41995__auto___56321 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__41996__auto__ = (function (){var switch__41902__auto__ = (function (state_55946){
var state_val_55947 = (state_55946[(1)]);
if((state_val_55947 === (1))){
var state_55946__$1 = state_55946;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_55946__$1,(2),once_or_cleanup);
} else {
if((state_val_55947 === (2))){
var inst_55943 = (state_55946[(2)]);
var inst_55944 = shadow.dom.remove_event_handler(el,event,event_fn);
var state_55946__$1 = (function (){var statearr_55948 = state_55946;
(statearr_55948[(7)] = inst_55943);

return statearr_55948;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_55946__$1,inst_55944);
} else {
return null;
}
}
});
return (function() {
var shadow$dom$state_machine__41903__auto__ = null;
var shadow$dom$state_machine__41903__auto____0 = (function (){
var statearr_55949 = [null,null,null,null,null,null,null,null];
(statearr_55949[(0)] = shadow$dom$state_machine__41903__auto__);

(statearr_55949[(1)] = (1));

return statearr_55949;
});
var shadow$dom$state_machine__41903__auto____1 = (function (state_55946){
while(true){
var ret_value__41904__auto__ = (function (){try{while(true){
var result__41905__auto__ = switch__41902__auto__(state_55946);
if(cljs.core.keyword_identical_QMARK_(result__41905__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__41905__auto__;
}
break;
}
}catch (e55950){var ex__41906__auto__ = e55950;
var statearr_55951_56325 = state_55946;
(statearr_55951_56325[(2)] = ex__41906__auto__);


if(cljs.core.seq((state_55946[(4)]))){
var statearr_55952_56326 = state_55946;
(statearr_55952_56326[(1)] = cljs.core.first((state_55946[(4)])));

} else {
throw ex__41906__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41904__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__56327 = state_55946;
state_55946 = G__56327;
continue;
} else {
return ret_value__41904__auto__;
}
break;
}
});
shadow$dom$state_machine__41903__auto__ = function(state_55946){
switch(arguments.length){
case 0:
return shadow$dom$state_machine__41903__auto____0.call(this);
case 1:
return shadow$dom$state_machine__41903__auto____1.call(this,state_55946);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
shadow$dom$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$0 = shadow$dom$state_machine__41903__auto____0;
shadow$dom$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$1 = shadow$dom$state_machine__41903__auto____1;
return shadow$dom$state_machine__41903__auto__;
})()
})();
var state__41997__auto__ = (function (){var statearr_55953 = f__41996__auto__();
(statearr_55953[(6)] = c__41995__auto___56321);

return statearr_55953;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__41997__auto__);
}));

} else {
}

return chan;
}));

(shadow.dom.event_chan.cljs$lang$maxFixedArity = 4);


//# sourceMappingURL=shadow.dom.js.map
