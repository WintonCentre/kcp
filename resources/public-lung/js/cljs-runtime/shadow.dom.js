goog.provide('shadow.dom');
shadow.dom.transition_supported_QMARK_ = (((typeof window !== 'undefined'))?goog.style.transition.isSupported():null);

/**
 * @interface
 */
shadow.dom.IElement = function(){};

var shadow$dom$IElement$_to_dom$dyn_74393 = (function (this$){
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
return shadow$dom$IElement$_to_dom$dyn_74393(this$);
}
});


/**
 * @interface
 */
shadow.dom.SVGElement = function(){};

var shadow$dom$SVGElement$_to_svg$dyn_74394 = (function (this$){
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
return shadow$dom$SVGElement$_to_svg$dyn_74394(this$);
}
});

shadow.dom.lazy_native_coll_seq = (function shadow$dom$lazy_native_coll_seq(coll,idx){
if((idx < coll.length)){
return (new cljs.core.LazySeq(null,(function (){
return cljs.core.cons((coll[idx]),(function (){var G__73688 = coll;
var G__73689 = (idx + (1));
return (shadow.dom.lazy_native_coll_seq.cljs$core$IFn$_invoke$arity$2 ? shadow.dom.lazy_native_coll_seq.cljs$core$IFn$_invoke$arity$2(G__73688,G__73689) : shadow.dom.lazy_native_coll_seq.call(null,G__73688,G__73689));
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
var G__73700 = arguments.length;
switch (G__73700) {
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
var G__73703 = arguments.length;
switch (G__73703) {
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
var G__73709 = arguments.length;
switch (G__73709) {
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
var G__73724 = arguments.length;
switch (G__73724) {
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
var G__73735 = arguments.length;
switch (G__73735) {
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
var G__73753 = arguments.length;
switch (G__73753) {
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
}catch (e73763){if((e73763 instanceof Object)){
var e = e73763;
return console.log("didnt support attachEvent",el,e);
} else {
throw e73763;

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
var seq__73772 = cljs.core.seq(shadow.dom.query.cljs$core$IFn$_invoke$arity$2(selector,root_el));
var chunk__73773 = null;
var count__73774 = (0);
var i__73775 = (0);
while(true){
if((i__73775 < count__73774)){
var el = chunk__73773.cljs$core$IIndexed$_nth$arity$2(null,i__73775);
var handler_74401__$1 = ((function (seq__73772,chunk__73773,count__73774,i__73775,el){
return (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
});})(seq__73772,chunk__73773,count__73774,i__73775,el))
;
shadow.dom.dom_listen(el,cljs.core.name(ev),handler_74401__$1);


var G__74402 = seq__73772;
var G__74403 = chunk__73773;
var G__74404 = count__73774;
var G__74405 = (i__73775 + (1));
seq__73772 = G__74402;
chunk__73773 = G__74403;
count__73774 = G__74404;
i__73775 = G__74405;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__73772);
if(temp__5753__auto__){
var seq__73772__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__73772__$1)){
var c__4679__auto__ = cljs.core.chunk_first(seq__73772__$1);
var G__74406 = cljs.core.chunk_rest(seq__73772__$1);
var G__74407 = c__4679__auto__;
var G__74408 = cljs.core.count(c__4679__auto__);
var G__74409 = (0);
seq__73772 = G__74406;
chunk__73773 = G__74407;
count__73774 = G__74408;
i__73775 = G__74409;
continue;
} else {
var el = cljs.core.first(seq__73772__$1);
var handler_74410__$1 = ((function (seq__73772,chunk__73773,count__73774,i__73775,el,seq__73772__$1,temp__5753__auto__){
return (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
});})(seq__73772,chunk__73773,count__73774,i__73775,el,seq__73772__$1,temp__5753__auto__))
;
shadow.dom.dom_listen(el,cljs.core.name(ev),handler_74410__$1);


var G__74411 = cljs.core.next(seq__73772__$1);
var G__74412 = null;
var G__74413 = (0);
var G__74414 = (0);
seq__73772 = G__74411;
chunk__73773 = G__74412;
count__73774 = G__74413;
i__73775 = G__74414;
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
var G__73799 = arguments.length;
switch (G__73799) {
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
var seq__73807 = cljs.core.seq(events);
var chunk__73808 = null;
var count__73809 = (0);
var i__73810 = (0);
while(true){
if((i__73810 < count__73809)){
var vec__73827 = chunk__73808.cljs$core$IIndexed$_nth$arity$2(null,i__73810);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__73827,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__73827,(1),null);
shadow.dom.on.cljs$core$IFn$_invoke$arity$3(el,k,v);


var G__74416 = seq__73807;
var G__74417 = chunk__73808;
var G__74418 = count__73809;
var G__74419 = (i__73810 + (1));
seq__73807 = G__74416;
chunk__73808 = G__74417;
count__73809 = G__74418;
i__73810 = G__74419;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__73807);
if(temp__5753__auto__){
var seq__73807__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__73807__$1)){
var c__4679__auto__ = cljs.core.chunk_first(seq__73807__$1);
var G__74420 = cljs.core.chunk_rest(seq__73807__$1);
var G__74421 = c__4679__auto__;
var G__74422 = cljs.core.count(c__4679__auto__);
var G__74423 = (0);
seq__73807 = G__74420;
chunk__73808 = G__74421;
count__73809 = G__74422;
i__73810 = G__74423;
continue;
} else {
var vec__73835 = cljs.core.first(seq__73807__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__73835,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__73835,(1),null);
shadow.dom.on.cljs$core$IFn$_invoke$arity$3(el,k,v);


var G__74424 = cljs.core.next(seq__73807__$1);
var G__74425 = null;
var G__74426 = (0);
var G__74427 = (0);
seq__73807 = G__74424;
chunk__73808 = G__74425;
count__73809 = G__74426;
i__73810 = G__74427;
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
var seq__73842 = cljs.core.seq(styles);
var chunk__73843 = null;
var count__73844 = (0);
var i__73845 = (0);
while(true){
if((i__73845 < count__73844)){
var vec__73861 = chunk__73843.cljs$core$IIndexed$_nth$arity$2(null,i__73845);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__73861,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__73861,(1),null);
goog.style.setStyle(dom,cljs.core.name(k),(((v == null))?"":v));


var G__74428 = seq__73842;
var G__74429 = chunk__73843;
var G__74430 = count__73844;
var G__74431 = (i__73845 + (1));
seq__73842 = G__74428;
chunk__73843 = G__74429;
count__73844 = G__74430;
i__73845 = G__74431;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__73842);
if(temp__5753__auto__){
var seq__73842__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__73842__$1)){
var c__4679__auto__ = cljs.core.chunk_first(seq__73842__$1);
var G__74432 = cljs.core.chunk_rest(seq__73842__$1);
var G__74433 = c__4679__auto__;
var G__74434 = cljs.core.count(c__4679__auto__);
var G__74435 = (0);
seq__73842 = G__74432;
chunk__73843 = G__74433;
count__73844 = G__74434;
i__73845 = G__74435;
continue;
} else {
var vec__73867 = cljs.core.first(seq__73842__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__73867,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__73867,(1),null);
goog.style.setStyle(dom,cljs.core.name(k),(((v == null))?"":v));


var G__74436 = cljs.core.next(seq__73842__$1);
var G__74437 = null;
var G__74438 = (0);
var G__74439 = (0);
seq__73842 = G__74436;
chunk__73843 = G__74437;
count__73844 = G__74438;
i__73845 = G__74439;
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
var G__73873_74440 = key;
var G__73873_74441__$1 = (((G__73873_74440 instanceof cljs.core.Keyword))?G__73873_74440.fqn:null);
switch (G__73873_74441__$1) {
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
var ks_74443 = cljs.core.name(key);
if(cljs.core.truth_((function (){var or__4253__auto__ = goog.string.startsWith(ks_74443,"data-");
if(cljs.core.truth_(or__4253__auto__)){
return or__4253__auto__;
} else {
return goog.string.startsWith(ks_74443,"aria-");
}
})())){
el.setAttribute(ks_74443,value);
} else {
(el[ks_74443] = value);
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
shadow.dom.create_dom_node = (function shadow$dom$create_dom_node(tag_def,p__73896){
var map__73898 = p__73896;
var map__73898__$1 = cljs.core.__destructure_map(map__73898);
var props = map__73898__$1;
var class$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__73898__$1,new cljs.core.Keyword(null,"class","class",-2030961996));
var tag_props = ({});
var vec__73899 = shadow.dom.parse_tag(tag_def);
var tag_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__73899,(0),null);
var tag_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__73899,(1),null);
var tag_classes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__73899,(2),null);
if(cljs.core.truth_(tag_id)){
(tag_props["id"] = tag_id);
} else {
}

if(cljs.core.truth_(tag_classes)){
(tag_props["class"] = shadow.dom.merge_class_string(class$,tag_classes));
} else {
}

var G__73902 = goog.dom.createDom(tag_name,tag_props);
shadow.dom.set_attrs(G__73902,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(props,new cljs.core.Keyword(null,"class","class",-2030961996)));

return G__73902;
});
shadow.dom.append = (function shadow$dom$append(var_args){
var G__73905 = arguments.length;
switch (G__73905) {
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

shadow.dom.destructure_node = (function shadow$dom$destructure_node(create_fn,p__73917){
var vec__73919 = p__73917;
var seq__73920 = cljs.core.seq(vec__73919);
var first__73921 = cljs.core.first(seq__73920);
var seq__73920__$1 = cljs.core.next(seq__73920);
var nn = first__73921;
var first__73921__$1 = cljs.core.first(seq__73920__$1);
var seq__73920__$2 = cljs.core.next(seq__73920__$1);
var np = first__73921__$1;
var nc = seq__73920__$2;
var node = vec__73919;
if((nn instanceof cljs.core.Keyword)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("invalid dom node",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"node","node",581201198),node], null));
}

if((((np == null)) && ((nc == null)))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__73924 = nn;
var G__73925 = cljs.core.PersistentArrayMap.EMPTY;
return (create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(G__73924,G__73925) : create_fn.call(null,G__73924,G__73925));
})(),cljs.core.List.EMPTY], null);
} else {
if(cljs.core.map_QMARK_(np)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(nn,np) : create_fn.call(null,nn,np)),nc], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__73928 = nn;
var G__73929 = cljs.core.PersistentArrayMap.EMPTY;
return (create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(G__73928,G__73929) : create_fn.call(null,G__73928,G__73929));
})(),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(nc,np)], null);

}
}
});
shadow.dom.make_dom_node = (function shadow$dom$make_dom_node(structure){
var vec__73934 = shadow.dom.destructure_node(shadow.dom.create_dom_node,structure);
var node = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__73934,(0),null);
var node_children = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__73934,(1),null);
var seq__73937_74445 = cljs.core.seq(node_children);
var chunk__73938_74446 = null;
var count__73939_74447 = (0);
var i__73940_74448 = (0);
while(true){
if((i__73940_74448 < count__73939_74447)){
var child_struct_74449 = chunk__73938_74446.cljs$core$IIndexed$_nth$arity$2(null,i__73940_74448);
var children_74450 = shadow.dom.dom_node(child_struct_74449);
if(cljs.core.seq_QMARK_(children_74450)){
var seq__73987_74451 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom.dom_node,children_74450));
var chunk__73989_74452 = null;
var count__73990_74453 = (0);
var i__73991_74454 = (0);
while(true){
if((i__73991_74454 < count__73990_74453)){
var child_74455 = chunk__73989_74452.cljs$core$IIndexed$_nth$arity$2(null,i__73991_74454);
if(cljs.core.truth_(child_74455)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_74455);


var G__74456 = seq__73987_74451;
var G__74457 = chunk__73989_74452;
var G__74458 = count__73990_74453;
var G__74459 = (i__73991_74454 + (1));
seq__73987_74451 = G__74456;
chunk__73989_74452 = G__74457;
count__73990_74453 = G__74458;
i__73991_74454 = G__74459;
continue;
} else {
var G__74460 = seq__73987_74451;
var G__74461 = chunk__73989_74452;
var G__74462 = count__73990_74453;
var G__74463 = (i__73991_74454 + (1));
seq__73987_74451 = G__74460;
chunk__73989_74452 = G__74461;
count__73990_74453 = G__74462;
i__73991_74454 = G__74463;
continue;
}
} else {
var temp__5753__auto___74464 = cljs.core.seq(seq__73987_74451);
if(temp__5753__auto___74464){
var seq__73987_74465__$1 = temp__5753__auto___74464;
if(cljs.core.chunked_seq_QMARK_(seq__73987_74465__$1)){
var c__4679__auto___74468 = cljs.core.chunk_first(seq__73987_74465__$1);
var G__74469 = cljs.core.chunk_rest(seq__73987_74465__$1);
var G__74470 = c__4679__auto___74468;
var G__74471 = cljs.core.count(c__4679__auto___74468);
var G__74472 = (0);
seq__73987_74451 = G__74469;
chunk__73989_74452 = G__74470;
count__73990_74453 = G__74471;
i__73991_74454 = G__74472;
continue;
} else {
var child_74473 = cljs.core.first(seq__73987_74465__$1);
if(cljs.core.truth_(child_74473)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_74473);


var G__74474 = cljs.core.next(seq__73987_74465__$1);
var G__74475 = null;
var G__74476 = (0);
var G__74477 = (0);
seq__73987_74451 = G__74474;
chunk__73989_74452 = G__74475;
count__73990_74453 = G__74476;
i__73991_74454 = G__74477;
continue;
} else {
var G__74478 = cljs.core.next(seq__73987_74465__$1);
var G__74479 = null;
var G__74480 = (0);
var G__74481 = (0);
seq__73987_74451 = G__74478;
chunk__73989_74452 = G__74479;
count__73990_74453 = G__74480;
i__73991_74454 = G__74481;
continue;
}
}
} else {
}
}
break;
}
} else {
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,children_74450);
}


var G__74482 = seq__73937_74445;
var G__74483 = chunk__73938_74446;
var G__74484 = count__73939_74447;
var G__74485 = (i__73940_74448 + (1));
seq__73937_74445 = G__74482;
chunk__73938_74446 = G__74483;
count__73939_74447 = G__74484;
i__73940_74448 = G__74485;
continue;
} else {
var temp__5753__auto___74486 = cljs.core.seq(seq__73937_74445);
if(temp__5753__auto___74486){
var seq__73937_74487__$1 = temp__5753__auto___74486;
if(cljs.core.chunked_seq_QMARK_(seq__73937_74487__$1)){
var c__4679__auto___74488 = cljs.core.chunk_first(seq__73937_74487__$1);
var G__74489 = cljs.core.chunk_rest(seq__73937_74487__$1);
var G__74490 = c__4679__auto___74488;
var G__74491 = cljs.core.count(c__4679__auto___74488);
var G__74492 = (0);
seq__73937_74445 = G__74489;
chunk__73938_74446 = G__74490;
count__73939_74447 = G__74491;
i__73940_74448 = G__74492;
continue;
} else {
var child_struct_74493 = cljs.core.first(seq__73937_74487__$1);
var children_74494 = shadow.dom.dom_node(child_struct_74493);
if(cljs.core.seq_QMARK_(children_74494)){
var seq__74001_74495 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom.dom_node,children_74494));
var chunk__74003_74496 = null;
var count__74004_74497 = (0);
var i__74005_74498 = (0);
while(true){
if((i__74005_74498 < count__74004_74497)){
var child_74499 = chunk__74003_74496.cljs$core$IIndexed$_nth$arity$2(null,i__74005_74498);
if(cljs.core.truth_(child_74499)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_74499);


var G__74500 = seq__74001_74495;
var G__74501 = chunk__74003_74496;
var G__74502 = count__74004_74497;
var G__74503 = (i__74005_74498 + (1));
seq__74001_74495 = G__74500;
chunk__74003_74496 = G__74501;
count__74004_74497 = G__74502;
i__74005_74498 = G__74503;
continue;
} else {
var G__74504 = seq__74001_74495;
var G__74505 = chunk__74003_74496;
var G__74506 = count__74004_74497;
var G__74507 = (i__74005_74498 + (1));
seq__74001_74495 = G__74504;
chunk__74003_74496 = G__74505;
count__74004_74497 = G__74506;
i__74005_74498 = G__74507;
continue;
}
} else {
var temp__5753__auto___74508__$1 = cljs.core.seq(seq__74001_74495);
if(temp__5753__auto___74508__$1){
var seq__74001_74509__$1 = temp__5753__auto___74508__$1;
if(cljs.core.chunked_seq_QMARK_(seq__74001_74509__$1)){
var c__4679__auto___74510 = cljs.core.chunk_first(seq__74001_74509__$1);
var G__74511 = cljs.core.chunk_rest(seq__74001_74509__$1);
var G__74512 = c__4679__auto___74510;
var G__74513 = cljs.core.count(c__4679__auto___74510);
var G__74514 = (0);
seq__74001_74495 = G__74511;
chunk__74003_74496 = G__74512;
count__74004_74497 = G__74513;
i__74005_74498 = G__74514;
continue;
} else {
var child_74515 = cljs.core.first(seq__74001_74509__$1);
if(cljs.core.truth_(child_74515)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_74515);


var G__74516 = cljs.core.next(seq__74001_74509__$1);
var G__74517 = null;
var G__74518 = (0);
var G__74519 = (0);
seq__74001_74495 = G__74516;
chunk__74003_74496 = G__74517;
count__74004_74497 = G__74518;
i__74005_74498 = G__74519;
continue;
} else {
var G__74520 = cljs.core.next(seq__74001_74509__$1);
var G__74521 = null;
var G__74522 = (0);
var G__74523 = (0);
seq__74001_74495 = G__74520;
chunk__74003_74496 = G__74521;
count__74004_74497 = G__74522;
i__74005_74498 = G__74523;
continue;
}
}
} else {
}
}
break;
}
} else {
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,children_74494);
}


var G__74524 = cljs.core.next(seq__73937_74487__$1);
var G__74525 = null;
var G__74526 = (0);
var G__74527 = (0);
seq__73937_74445 = G__74524;
chunk__73938_74446 = G__74525;
count__73939_74447 = G__74526;
i__73940_74448 = G__74527;
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
var seq__74018 = cljs.core.seq(node);
var chunk__74019 = null;
var count__74020 = (0);
var i__74021 = (0);
while(true){
if((i__74021 < count__74020)){
var n = chunk__74019.cljs$core$IIndexed$_nth$arity$2(null,i__74021);
(shadow.dom.remove.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.remove.cljs$core$IFn$_invoke$arity$1(n) : shadow.dom.remove.call(null,n));


var G__74528 = seq__74018;
var G__74529 = chunk__74019;
var G__74530 = count__74020;
var G__74531 = (i__74021 + (1));
seq__74018 = G__74528;
chunk__74019 = G__74529;
count__74020 = G__74530;
i__74021 = G__74531;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__74018);
if(temp__5753__auto__){
var seq__74018__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__74018__$1)){
var c__4679__auto__ = cljs.core.chunk_first(seq__74018__$1);
var G__74532 = cljs.core.chunk_rest(seq__74018__$1);
var G__74533 = c__4679__auto__;
var G__74534 = cljs.core.count(c__4679__auto__);
var G__74535 = (0);
seq__74018 = G__74532;
chunk__74019 = G__74533;
count__74020 = G__74534;
i__74021 = G__74535;
continue;
} else {
var n = cljs.core.first(seq__74018__$1);
(shadow.dom.remove.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.remove.cljs$core$IFn$_invoke$arity$1(n) : shadow.dom.remove.call(null,n));


var G__74536 = cljs.core.next(seq__74018__$1);
var G__74537 = null;
var G__74538 = (0);
var G__74539 = (0);
seq__74018 = G__74536;
chunk__74019 = G__74537;
count__74020 = G__74538;
i__74021 = G__74539;
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
var G__74036 = arguments.length;
switch (G__74036) {
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
var G__74049 = arguments.length;
switch (G__74049) {
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
var G__74062 = arguments.length;
switch (G__74062) {
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
var len__4864__auto___74545 = arguments.length;
var i__4865__auto___74546 = (0);
while(true){
if((i__4865__auto___74546 < len__4864__auto___74545)){
args__4870__auto__.push((arguments[i__4865__auto___74546]));

var G__74548 = (i__4865__auto___74546 + (1));
i__4865__auto___74546 = G__74548;
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
var seq__74077_74549 = cljs.core.seq(nodes);
var chunk__74078_74550 = null;
var count__74079_74551 = (0);
var i__74080_74552 = (0);
while(true){
if((i__74080_74552 < count__74079_74551)){
var node_74553 = chunk__74078_74550.cljs$core$IIndexed$_nth$arity$2(null,i__74080_74552);
fragment.appendChild(shadow.dom._to_dom(node_74553));


var G__74554 = seq__74077_74549;
var G__74555 = chunk__74078_74550;
var G__74556 = count__74079_74551;
var G__74557 = (i__74080_74552 + (1));
seq__74077_74549 = G__74554;
chunk__74078_74550 = G__74555;
count__74079_74551 = G__74556;
i__74080_74552 = G__74557;
continue;
} else {
var temp__5753__auto___74558 = cljs.core.seq(seq__74077_74549);
if(temp__5753__auto___74558){
var seq__74077_74559__$1 = temp__5753__auto___74558;
if(cljs.core.chunked_seq_QMARK_(seq__74077_74559__$1)){
var c__4679__auto___74560 = cljs.core.chunk_first(seq__74077_74559__$1);
var G__74561 = cljs.core.chunk_rest(seq__74077_74559__$1);
var G__74562 = c__4679__auto___74560;
var G__74563 = cljs.core.count(c__4679__auto___74560);
var G__74564 = (0);
seq__74077_74549 = G__74561;
chunk__74078_74550 = G__74562;
count__74079_74551 = G__74563;
i__74080_74552 = G__74564;
continue;
} else {
var node_74565 = cljs.core.first(seq__74077_74559__$1);
fragment.appendChild(shadow.dom._to_dom(node_74565));


var G__74566 = cljs.core.next(seq__74077_74559__$1);
var G__74567 = null;
var G__74568 = (0);
var G__74569 = (0);
seq__74077_74549 = G__74566;
chunk__74078_74550 = G__74567;
count__74079_74551 = G__74568;
i__74080_74552 = G__74569;
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
(shadow.dom.fragment.cljs$lang$applyTo = (function (seq74070){
var self__4852__auto__ = this;
return self__4852__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq74070));
}));

/**
 * given a html string, eval all <script> tags and return the html without the scripts
 * don't do this for everything, only content you trust.
 */
shadow.dom.eval_scripts = (function shadow$dom$eval_scripts(s){
var scripts = cljs.core.re_seq(/<script[^>]*?>(.+?)<\/script>/,s);
var seq__74094_74570 = cljs.core.seq(scripts);
var chunk__74096_74571 = null;
var count__74097_74572 = (0);
var i__74098_74573 = (0);
while(true){
if((i__74098_74573 < count__74097_74572)){
var vec__74112_74574 = chunk__74096_74571.cljs$core$IIndexed$_nth$arity$2(null,i__74098_74573);
var script_tag_74575 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__74112_74574,(0),null);
var script_body_74576 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__74112_74574,(1),null);
eval(script_body_74576);


var G__74577 = seq__74094_74570;
var G__74578 = chunk__74096_74571;
var G__74579 = count__74097_74572;
var G__74580 = (i__74098_74573 + (1));
seq__74094_74570 = G__74577;
chunk__74096_74571 = G__74578;
count__74097_74572 = G__74579;
i__74098_74573 = G__74580;
continue;
} else {
var temp__5753__auto___74581 = cljs.core.seq(seq__74094_74570);
if(temp__5753__auto___74581){
var seq__74094_74582__$1 = temp__5753__auto___74581;
if(cljs.core.chunked_seq_QMARK_(seq__74094_74582__$1)){
var c__4679__auto___74583 = cljs.core.chunk_first(seq__74094_74582__$1);
var G__74584 = cljs.core.chunk_rest(seq__74094_74582__$1);
var G__74585 = c__4679__auto___74583;
var G__74586 = cljs.core.count(c__4679__auto___74583);
var G__74587 = (0);
seq__74094_74570 = G__74584;
chunk__74096_74571 = G__74585;
count__74097_74572 = G__74586;
i__74098_74573 = G__74587;
continue;
} else {
var vec__74116_74588 = cljs.core.first(seq__74094_74582__$1);
var script_tag_74589 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__74116_74588,(0),null);
var script_body_74590 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__74116_74588,(1),null);
eval(script_body_74590);


var G__74591 = cljs.core.next(seq__74094_74582__$1);
var G__74592 = null;
var G__74593 = (0);
var G__74594 = (0);
seq__74094_74570 = G__74591;
chunk__74096_74571 = G__74592;
count__74097_74572 = G__74593;
i__74098_74573 = G__74594;
continue;
}
} else {
}
}
break;
}

return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (s__$1,p__74121){
var vec__74122 = p__74121;
var script_tag = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__74122,(0),null);
var script_body = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__74122,(1),null);
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
var G__74138 = arguments.length;
switch (G__74138) {
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
var seq__74158 = cljs.core.seq(style_keys);
var chunk__74159 = null;
var count__74160 = (0);
var i__74161 = (0);
while(true){
if((i__74161 < count__74160)){
var it = chunk__74159.cljs$core$IIndexed$_nth$arity$2(null,i__74161);
shadow.dom.remove_style_STAR_(el__$1,it);


var G__74598 = seq__74158;
var G__74599 = chunk__74159;
var G__74600 = count__74160;
var G__74601 = (i__74161 + (1));
seq__74158 = G__74598;
chunk__74159 = G__74599;
count__74160 = G__74600;
i__74161 = G__74601;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__74158);
if(temp__5753__auto__){
var seq__74158__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__74158__$1)){
var c__4679__auto__ = cljs.core.chunk_first(seq__74158__$1);
var G__74603 = cljs.core.chunk_rest(seq__74158__$1);
var G__74604 = c__4679__auto__;
var G__74605 = cljs.core.count(c__4679__auto__);
var G__74606 = (0);
seq__74158 = G__74603;
chunk__74159 = G__74604;
count__74160 = G__74605;
i__74161 = G__74606;
continue;
} else {
var it = cljs.core.first(seq__74158__$1);
shadow.dom.remove_style_STAR_(el__$1,it);


var G__74607 = cljs.core.next(seq__74158__$1);
var G__74608 = null;
var G__74609 = (0);
var G__74610 = (0);
seq__74158 = G__74607;
chunk__74159 = G__74608;
count__74160 = G__74609;
i__74161 = G__74610;
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

(shadow.dom.Coordinate.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__4504__auto__,k74170,else__4505__auto__){
var self__ = this;
var this__4504__auto____$1 = this;
var G__74180 = k74170;
var G__74180__$1 = (((G__74180 instanceof cljs.core.Keyword))?G__74180.fqn:null);
switch (G__74180__$1) {
case "x":
return self__.x;

break;
case "y":
return self__.y;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k74170,else__4505__auto__);

}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__4522__auto__,f__4523__auto__,init__4524__auto__){
var self__ = this;
var this__4522__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__4525__auto__,p__74185){
var vec__74186 = p__74185;
var k__4526__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__74186,(0),null);
var v__4527__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__74186,(1),null);
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

(shadow.dom.Coordinate.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__74169){
var self__ = this;
var G__74169__$1 = this;
return (new cljs.core.RecordIter((0),G__74169__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"x","x",2099068185),new cljs.core.Keyword(null,"y","y",-1757859776)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
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

(shadow.dom.Coordinate.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this74171,other74172){
var self__ = this;
var this74171__$1 = this;
return (((!((other74172 == null)))) && ((((this74171__$1.constructor === other74172.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this74171__$1.x,other74172.x)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this74171__$1.y,other74172.y)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this74171__$1.__extmap,other74172.__extmap)))))))));
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

(shadow.dom.Coordinate.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__4509__auto__,k74170){
var self__ = this;
var this__4509__auto____$1 = this;
var G__74192 = k74170;
var G__74192__$1 = (((G__74192 instanceof cljs.core.Keyword))?G__74192.fqn:null);
switch (G__74192__$1) {
case "x":
case "y":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k74170);

}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__4510__auto__,k__4511__auto__,G__74169){
var self__ = this;
var this__4510__auto____$1 = this;
var pred__74194 = cljs.core.keyword_identical_QMARK_;
var expr__74195 = k__4511__auto__;
if(cljs.core.truth_((pred__74194.cljs$core$IFn$_invoke$arity$2 ? pred__74194.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"x","x",2099068185),expr__74195) : pred__74194.call(null,new cljs.core.Keyword(null,"x","x",2099068185),expr__74195)))){
return (new shadow.dom.Coordinate(G__74169,self__.y,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__74194.cljs$core$IFn$_invoke$arity$2 ? pred__74194.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"y","y",-1757859776),expr__74195) : pred__74194.call(null,new cljs.core.Keyword(null,"y","y",-1757859776),expr__74195)))){
return (new shadow.dom.Coordinate(self__.x,G__74169,self__.__meta,self__.__extmap,null));
} else {
return (new shadow.dom.Coordinate(self__.x,self__.y,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__4511__auto__,G__74169),null));
}
}
}));

(shadow.dom.Coordinate.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__4515__auto__){
var self__ = this;
var this__4515__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"x","x",2099068185),self__.x,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"y","y",-1757859776),self__.y,null))], null),self__.__extmap));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__4501__auto__,G__74169){
var self__ = this;
var this__4501__auto____$1 = this;
return (new shadow.dom.Coordinate(self__.x,self__.y,G__74169,self__.__extmap,self__.__hash));
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
shadow.dom.map__GT_Coordinate = (function shadow$dom$map__GT_Coordinate(G__74174){
var extmap__4542__auto__ = (function (){var G__74212 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__74174,new cljs.core.Keyword(null,"x","x",2099068185),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"y","y",-1757859776)], 0));
if(cljs.core.record_QMARK_(G__74174)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__74212);
} else {
return G__74212;
}
})();
return (new shadow.dom.Coordinate(new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(G__74174),new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(G__74174),null,cljs.core.not_empty(extmap__4542__auto__),null));
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

(shadow.dom.Size.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__4504__auto__,k74221,else__4505__auto__){
var self__ = this;
var this__4504__auto____$1 = this;
var G__74230 = k74221;
var G__74230__$1 = (((G__74230 instanceof cljs.core.Keyword))?G__74230.fqn:null);
switch (G__74230__$1) {
case "w":
return self__.w;

break;
case "h":
return self__.h;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k74221,else__4505__auto__);

}
}));

(shadow.dom.Size.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__4522__auto__,f__4523__auto__,init__4524__auto__){
var self__ = this;
var this__4522__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__4525__auto__,p__74237){
var vec__74239 = p__74237;
var k__4526__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__74239,(0),null);
var v__4527__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__74239,(1),null);
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

(shadow.dom.Size.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__74220){
var self__ = this;
var G__74220__$1 = this;
return (new cljs.core.RecordIter((0),G__74220__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"w","w",354169001),new cljs.core.Keyword(null,"h","h",1109658740)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
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

(shadow.dom.Size.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this74222,other74223){
var self__ = this;
var this74222__$1 = this;
return (((!((other74223 == null)))) && ((((this74222__$1.constructor === other74223.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this74222__$1.w,other74223.w)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this74222__$1.h,other74223.h)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this74222__$1.__extmap,other74223.__extmap)))))))));
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

(shadow.dom.Size.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__4509__auto__,k74221){
var self__ = this;
var this__4509__auto____$1 = this;
var G__74263 = k74221;
var G__74263__$1 = (((G__74263 instanceof cljs.core.Keyword))?G__74263.fqn:null);
switch (G__74263__$1) {
case "w":
case "h":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k74221);

}
}));

(shadow.dom.Size.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__4510__auto__,k__4511__auto__,G__74220){
var self__ = this;
var this__4510__auto____$1 = this;
var pred__74267 = cljs.core.keyword_identical_QMARK_;
var expr__74268 = k__4511__auto__;
if(cljs.core.truth_((pred__74267.cljs$core$IFn$_invoke$arity$2 ? pred__74267.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"w","w",354169001),expr__74268) : pred__74267.call(null,new cljs.core.Keyword(null,"w","w",354169001),expr__74268)))){
return (new shadow.dom.Size(G__74220,self__.h,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__74267.cljs$core$IFn$_invoke$arity$2 ? pred__74267.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"h","h",1109658740),expr__74268) : pred__74267.call(null,new cljs.core.Keyword(null,"h","h",1109658740),expr__74268)))){
return (new shadow.dom.Size(self__.w,G__74220,self__.__meta,self__.__extmap,null));
} else {
return (new shadow.dom.Size(self__.w,self__.h,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__4511__auto__,G__74220),null));
}
}
}));

(shadow.dom.Size.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__4515__auto__){
var self__ = this;
var this__4515__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"w","w",354169001),self__.w,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"h","h",1109658740),self__.h,null))], null),self__.__extmap));
}));

(shadow.dom.Size.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__4501__auto__,G__74220){
var self__ = this;
var this__4501__auto____$1 = this;
return (new shadow.dom.Size(self__.w,self__.h,G__74220,self__.__extmap,self__.__hash));
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
shadow.dom.map__GT_Size = (function shadow$dom$map__GT_Size(G__74226){
var extmap__4542__auto__ = (function (){var G__74282 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__74226,new cljs.core.Keyword(null,"w","w",354169001),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"h","h",1109658740)], 0));
if(cljs.core.record_QMARK_(G__74226)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__74282);
} else {
return G__74282;
}
})();
return (new shadow.dom.Size(new cljs.core.Keyword(null,"w","w",354169001).cljs$core$IFn$_invoke$arity$1(G__74226),new cljs.core.Keyword(null,"h","h",1109658740).cljs$core$IFn$_invoke$arity$1(G__74226),null,cljs.core.not_empty(extmap__4542__auto__),null));
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
var G__74624 = (i + (1));
var G__74625 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ret,(opts[i]["value"]));
i = G__74624;
ret = G__74625;
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
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(path),"?",clojure.string.join.cljs$core$IFn$_invoke$arity$2("&",cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__74311){
var vec__74312 = p__74311;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__74312,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__74312,(1),null);
return [cljs.core.name(k),"=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(encodeURIComponent(cljs.core.str.cljs$core$IFn$_invoke$arity$1(v)))].join('');
}),query_params))].join('');
}
});
shadow.dom.redirect = (function shadow$dom$redirect(var_args){
var G__74323 = arguments.length;
switch (G__74323) {
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
var G__74631 = ps;
var G__74632 = (i + (1));
el__$1 = G__74631;
i = G__74632;
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
var vec__74324 = shadow.dom.parse_tag(tag_def);
var tag_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__74324,(0),null);
var tag_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__74324,(1),null);
var tag_classes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__74324,(2),null);
var el = document.createElementNS("http://www.w3.org/2000/svg",tag_name);
if(cljs.core.truth_(tag_id)){
el.setAttribute("id",tag_id);
} else {
}

if(cljs.core.truth_(tag_classes)){
el.setAttribute("class",shadow.dom.merge_class_string(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(props),tag_classes));
} else {
}

var seq__74327_74633 = cljs.core.seq(props);
var chunk__74328_74634 = null;
var count__74329_74635 = (0);
var i__74330_74636 = (0);
while(true){
if((i__74330_74636 < count__74329_74635)){
var vec__74337_74637 = chunk__74328_74634.cljs$core$IIndexed$_nth$arity$2(null,i__74330_74636);
var k_74638 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__74337_74637,(0),null);
var v_74639 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__74337_74637,(1),null);
el.setAttributeNS((function (){var temp__5753__auto__ = cljs.core.namespace(k_74638);
if(cljs.core.truth_(temp__5753__auto__)){
var ns = temp__5753__auto__;
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(shadow.dom.xmlns),ns);
} else {
return null;
}
})(),cljs.core.name(k_74638),v_74639);


var G__74640 = seq__74327_74633;
var G__74641 = chunk__74328_74634;
var G__74642 = count__74329_74635;
var G__74643 = (i__74330_74636 + (1));
seq__74327_74633 = G__74640;
chunk__74328_74634 = G__74641;
count__74329_74635 = G__74642;
i__74330_74636 = G__74643;
continue;
} else {
var temp__5753__auto___74644 = cljs.core.seq(seq__74327_74633);
if(temp__5753__auto___74644){
var seq__74327_74645__$1 = temp__5753__auto___74644;
if(cljs.core.chunked_seq_QMARK_(seq__74327_74645__$1)){
var c__4679__auto___74646 = cljs.core.chunk_first(seq__74327_74645__$1);
var G__74647 = cljs.core.chunk_rest(seq__74327_74645__$1);
var G__74648 = c__4679__auto___74646;
var G__74649 = cljs.core.count(c__4679__auto___74646);
var G__74650 = (0);
seq__74327_74633 = G__74647;
chunk__74328_74634 = G__74648;
count__74329_74635 = G__74649;
i__74330_74636 = G__74650;
continue;
} else {
var vec__74340_74651 = cljs.core.first(seq__74327_74645__$1);
var k_74652 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__74340_74651,(0),null);
var v_74653 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__74340_74651,(1),null);
el.setAttributeNS((function (){var temp__5753__auto____$1 = cljs.core.namespace(k_74652);
if(cljs.core.truth_(temp__5753__auto____$1)){
var ns = temp__5753__auto____$1;
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(shadow.dom.xmlns),ns);
} else {
return null;
}
})(),cljs.core.name(k_74652),v_74653);


var G__74654 = cljs.core.next(seq__74327_74645__$1);
var G__74655 = null;
var G__74656 = (0);
var G__74657 = (0);
seq__74327_74633 = G__74654;
chunk__74328_74634 = G__74655;
count__74329_74635 = G__74656;
i__74330_74636 = G__74657;
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
var vec__74344 = shadow.dom.destructure_node(shadow.dom.create_svg_node,structure);
var node = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__74344,(0),null);
var node_children = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__74344,(1),null);
var seq__74347_74658 = cljs.core.seq(node_children);
var chunk__74349_74659 = null;
var count__74350_74660 = (0);
var i__74351_74661 = (0);
while(true){
if((i__74351_74661 < count__74350_74660)){
var child_struct_74662 = chunk__74349_74659.cljs$core$IIndexed$_nth$arity$2(null,i__74351_74661);
if((!((child_struct_74662 == null)))){
if(typeof child_struct_74662 === 'string'){
var text_74663 = (node["textContent"]);
(node["textContent"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(text_74663),child_struct_74662].join(''));
} else {
var children_74664 = shadow.dom.svg_node(child_struct_74662);
if(cljs.core.seq_QMARK_(children_74664)){
var seq__74365_74666 = cljs.core.seq(children_74664);
var chunk__74367_74667 = null;
var count__74368_74668 = (0);
var i__74369_74669 = (0);
while(true){
if((i__74369_74669 < count__74368_74668)){
var child_74673 = chunk__74367_74667.cljs$core$IIndexed$_nth$arity$2(null,i__74369_74669);
if(cljs.core.truth_(child_74673)){
node.appendChild(child_74673);


var G__74674 = seq__74365_74666;
var G__74675 = chunk__74367_74667;
var G__74676 = count__74368_74668;
var G__74677 = (i__74369_74669 + (1));
seq__74365_74666 = G__74674;
chunk__74367_74667 = G__74675;
count__74368_74668 = G__74676;
i__74369_74669 = G__74677;
continue;
} else {
var G__74678 = seq__74365_74666;
var G__74679 = chunk__74367_74667;
var G__74680 = count__74368_74668;
var G__74681 = (i__74369_74669 + (1));
seq__74365_74666 = G__74678;
chunk__74367_74667 = G__74679;
count__74368_74668 = G__74680;
i__74369_74669 = G__74681;
continue;
}
} else {
var temp__5753__auto___74682 = cljs.core.seq(seq__74365_74666);
if(temp__5753__auto___74682){
var seq__74365_74683__$1 = temp__5753__auto___74682;
if(cljs.core.chunked_seq_QMARK_(seq__74365_74683__$1)){
var c__4679__auto___74684 = cljs.core.chunk_first(seq__74365_74683__$1);
var G__74685 = cljs.core.chunk_rest(seq__74365_74683__$1);
var G__74686 = c__4679__auto___74684;
var G__74687 = cljs.core.count(c__4679__auto___74684);
var G__74688 = (0);
seq__74365_74666 = G__74685;
chunk__74367_74667 = G__74686;
count__74368_74668 = G__74687;
i__74369_74669 = G__74688;
continue;
} else {
var child_74689 = cljs.core.first(seq__74365_74683__$1);
if(cljs.core.truth_(child_74689)){
node.appendChild(child_74689);


var G__74690 = cljs.core.next(seq__74365_74683__$1);
var G__74691 = null;
var G__74692 = (0);
var G__74693 = (0);
seq__74365_74666 = G__74690;
chunk__74367_74667 = G__74691;
count__74368_74668 = G__74692;
i__74369_74669 = G__74693;
continue;
} else {
var G__74694 = cljs.core.next(seq__74365_74683__$1);
var G__74695 = null;
var G__74696 = (0);
var G__74697 = (0);
seq__74365_74666 = G__74694;
chunk__74367_74667 = G__74695;
count__74368_74668 = G__74696;
i__74369_74669 = G__74697;
continue;
}
}
} else {
}
}
break;
}
} else {
node.appendChild(children_74664);
}
}


var G__74698 = seq__74347_74658;
var G__74699 = chunk__74349_74659;
var G__74700 = count__74350_74660;
var G__74701 = (i__74351_74661 + (1));
seq__74347_74658 = G__74698;
chunk__74349_74659 = G__74699;
count__74350_74660 = G__74700;
i__74351_74661 = G__74701;
continue;
} else {
var G__74702 = seq__74347_74658;
var G__74703 = chunk__74349_74659;
var G__74704 = count__74350_74660;
var G__74705 = (i__74351_74661 + (1));
seq__74347_74658 = G__74702;
chunk__74349_74659 = G__74703;
count__74350_74660 = G__74704;
i__74351_74661 = G__74705;
continue;
}
} else {
var temp__5753__auto___74706 = cljs.core.seq(seq__74347_74658);
if(temp__5753__auto___74706){
var seq__74347_74707__$1 = temp__5753__auto___74706;
if(cljs.core.chunked_seq_QMARK_(seq__74347_74707__$1)){
var c__4679__auto___74708 = cljs.core.chunk_first(seq__74347_74707__$1);
var G__74709 = cljs.core.chunk_rest(seq__74347_74707__$1);
var G__74710 = c__4679__auto___74708;
var G__74711 = cljs.core.count(c__4679__auto___74708);
var G__74712 = (0);
seq__74347_74658 = G__74709;
chunk__74349_74659 = G__74710;
count__74350_74660 = G__74711;
i__74351_74661 = G__74712;
continue;
} else {
var child_struct_74713 = cljs.core.first(seq__74347_74707__$1);
if((!((child_struct_74713 == null)))){
if(typeof child_struct_74713 === 'string'){
var text_74714 = (node["textContent"]);
(node["textContent"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(text_74714),child_struct_74713].join(''));
} else {
var children_74715 = shadow.dom.svg_node(child_struct_74713);
if(cljs.core.seq_QMARK_(children_74715)){
var seq__74371_74716 = cljs.core.seq(children_74715);
var chunk__74373_74717 = null;
var count__74374_74718 = (0);
var i__74375_74719 = (0);
while(true){
if((i__74375_74719 < count__74374_74718)){
var child_74720 = chunk__74373_74717.cljs$core$IIndexed$_nth$arity$2(null,i__74375_74719);
if(cljs.core.truth_(child_74720)){
node.appendChild(child_74720);


var G__74721 = seq__74371_74716;
var G__74722 = chunk__74373_74717;
var G__74723 = count__74374_74718;
var G__74724 = (i__74375_74719 + (1));
seq__74371_74716 = G__74721;
chunk__74373_74717 = G__74722;
count__74374_74718 = G__74723;
i__74375_74719 = G__74724;
continue;
} else {
var G__74725 = seq__74371_74716;
var G__74726 = chunk__74373_74717;
var G__74727 = count__74374_74718;
var G__74728 = (i__74375_74719 + (1));
seq__74371_74716 = G__74725;
chunk__74373_74717 = G__74726;
count__74374_74718 = G__74727;
i__74375_74719 = G__74728;
continue;
}
} else {
var temp__5753__auto___74729__$1 = cljs.core.seq(seq__74371_74716);
if(temp__5753__auto___74729__$1){
var seq__74371_74730__$1 = temp__5753__auto___74729__$1;
if(cljs.core.chunked_seq_QMARK_(seq__74371_74730__$1)){
var c__4679__auto___74731 = cljs.core.chunk_first(seq__74371_74730__$1);
var G__74732 = cljs.core.chunk_rest(seq__74371_74730__$1);
var G__74733 = c__4679__auto___74731;
var G__74734 = cljs.core.count(c__4679__auto___74731);
var G__74735 = (0);
seq__74371_74716 = G__74732;
chunk__74373_74717 = G__74733;
count__74374_74718 = G__74734;
i__74375_74719 = G__74735;
continue;
} else {
var child_74736 = cljs.core.first(seq__74371_74730__$1);
if(cljs.core.truth_(child_74736)){
node.appendChild(child_74736);


var G__74737 = cljs.core.next(seq__74371_74730__$1);
var G__74738 = null;
var G__74739 = (0);
var G__74740 = (0);
seq__74371_74716 = G__74737;
chunk__74373_74717 = G__74738;
count__74374_74718 = G__74739;
i__74375_74719 = G__74740;
continue;
} else {
var G__74741 = cljs.core.next(seq__74371_74730__$1);
var G__74742 = null;
var G__74743 = (0);
var G__74744 = (0);
seq__74371_74716 = G__74741;
chunk__74373_74717 = G__74742;
count__74374_74718 = G__74743;
i__74375_74719 = G__74744;
continue;
}
}
} else {
}
}
break;
}
} else {
node.appendChild(children_74715);
}
}


var G__74745 = cljs.core.next(seq__74347_74707__$1);
var G__74746 = null;
var G__74747 = (0);
var G__74748 = (0);
seq__74347_74658 = G__74745;
chunk__74349_74659 = G__74746;
count__74350_74660 = G__74747;
i__74351_74661 = G__74748;
continue;
} else {
var G__74749 = cljs.core.next(seq__74347_74707__$1);
var G__74750 = null;
var G__74751 = (0);
var G__74752 = (0);
seq__74347_74658 = G__74749;
chunk__74349_74659 = G__74750;
count__74350_74660 = G__74751;
i__74351_74661 = G__74752;
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
var len__4864__auto___74756 = arguments.length;
var i__4865__auto___74757 = (0);
while(true){
if((i__4865__auto___74757 < len__4864__auto___74756)){
args__4870__auto__.push((arguments[i__4865__auto___74757]));

var G__74758 = (i__4865__auto___74757 + (1));
i__4865__auto___74757 = G__74758;
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
(shadow.dom.svg.cljs$lang$applyTo = (function (seq74377){
var G__74378 = cljs.core.first(seq74377);
var seq74377__$1 = cljs.core.next(seq74377);
var self__4851__auto__ = this;
return self__4851__auto__.cljs$core$IFn$_invoke$arity$variadic(G__74378,seq74377__$1);
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
var G__74380 = arguments.length;
switch (G__74380) {
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
var c__41995__auto___74760 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__41996__auto__ = (function (){var switch__41902__auto__ = (function (state_74385){
var state_val_74386 = (state_74385[(1)]);
if((state_val_74386 === (1))){
var state_74385__$1 = state_74385;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_74385__$1,(2),once_or_cleanup);
} else {
if((state_val_74386 === (2))){
var inst_74382 = (state_74385[(2)]);
var inst_74383 = shadow.dom.remove_event_handler(el,event,event_fn);
var state_74385__$1 = (function (){var statearr_74387 = state_74385;
(statearr_74387[(7)] = inst_74382);

return statearr_74387;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_74385__$1,inst_74383);
} else {
return null;
}
}
});
return (function() {
var shadow$dom$state_machine__41903__auto__ = null;
var shadow$dom$state_machine__41903__auto____0 = (function (){
var statearr_74388 = [null,null,null,null,null,null,null,null];
(statearr_74388[(0)] = shadow$dom$state_machine__41903__auto__);

(statearr_74388[(1)] = (1));

return statearr_74388;
});
var shadow$dom$state_machine__41903__auto____1 = (function (state_74385){
while(true){
var ret_value__41904__auto__ = (function (){try{while(true){
var result__41905__auto__ = switch__41902__auto__(state_74385);
if(cljs.core.keyword_identical_QMARK_(result__41905__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__41905__auto__;
}
break;
}
}catch (e74389){var ex__41906__auto__ = e74389;
var statearr_74390_74764 = state_74385;
(statearr_74390_74764[(2)] = ex__41906__auto__);


if(cljs.core.seq((state_74385[(4)]))){
var statearr_74391_74765 = state_74385;
(statearr_74391_74765[(1)] = cljs.core.first((state_74385[(4)])));

} else {
throw ex__41906__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41904__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__74766 = state_74385;
state_74385 = G__74766;
continue;
} else {
return ret_value__41904__auto__;
}
break;
}
});
shadow$dom$state_machine__41903__auto__ = function(state_74385){
switch(arguments.length){
case 0:
return shadow$dom$state_machine__41903__auto____0.call(this);
case 1:
return shadow$dom$state_machine__41903__auto____1.call(this,state_74385);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
shadow$dom$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$0 = shadow$dom$state_machine__41903__auto____0;
shadow$dom$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$1 = shadow$dom$state_machine__41903__auto____1;
return shadow$dom$state_machine__41903__auto__;
})()
})();
var state__41997__auto__ = (function (){var statearr_74392 = f__41996__auto__();
(statearr_74392[(6)] = c__41995__auto___74760);

return statearr_74392;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__41997__auto__);
}));

} else {
}

return chan;
}));

(shadow.dom.event_chan.cljs$lang$maxFixedArity = 4);


//# sourceMappingURL=shadow.dom.js.map
