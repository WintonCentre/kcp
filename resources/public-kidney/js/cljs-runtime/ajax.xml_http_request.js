goog.provide('ajax.xml_http_request');
ajax.xml_http_request.ready_state = (function ajax$xml_http_request$ready_state(e){
var G__67658 = e.target.readyState;
var fexpr__67657 = new cljs.core.PersistentArrayMap(null, 5, [(0),new cljs.core.Keyword(null,"not-initialized","not-initialized",-1937378906),(1),new cljs.core.Keyword(null,"connection-established","connection-established",-1403749733),(2),new cljs.core.Keyword(null,"request-received","request-received",2110590540),(3),new cljs.core.Keyword(null,"processing-request","processing-request",-264947221),(4),new cljs.core.Keyword(null,"response-ready","response-ready",245208276)], null);
return (fexpr__67657.cljs$core$IFn$_invoke$arity$1 ? fexpr__67657.cljs$core$IFn$_invoke$arity$1(G__67658) : fexpr__67657.call(null,G__67658));
});
ajax.xml_http_request.append = (function ajax$xml_http_request$append(current,next){
if(cljs.core.truth_(current)){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(current),", ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(next)].join('');
} else {
return next;
}
});
ajax.xml_http_request.process_headers = (function ajax$xml_http_request$process_headers(header_str){
if(cljs.core.truth_(header_str)){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (headers,header_line){
if(cljs.core.truth_(goog.string.isEmptyOrWhitespace(header_line))){
return headers;
} else {
var key_value = goog.string.splitLimit(header_line,": ",(2));
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(headers,(key_value[(0)]),ajax.xml_http_request.append,(key_value[(1)]));
}
}),cljs.core.PersistentArrayMap.EMPTY,header_str.split("\r\n"));
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
});
ajax.xml_http_request.xmlhttprequest = (((typeof goog !== 'undefined') && (typeof goog.global !== 'undefined') && (typeof goog.global.XMLHttpRequest !== 'undefined'))?goog.global.XMLHttpRequest:(((typeof require !== 'undefined'))?(function (){var req = require;
return (req.cljs$core$IFn$_invoke$arity$1 ? req.cljs$core$IFn$_invoke$arity$1("xmlhttprequest") : req.call(null,"xmlhttprequest")).XMLHttpRequest;
})():null));
(ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxImpl$ = cljs.core.PROTOCOL_SENTINEL);

(ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxImpl$_js_ajax_request$arity$3 = (function (this$,p__67664,handler){
var map__67665 = p__67664;
var map__67665__$1 = cljs.core.__destructure_map(map__67665);
var uri = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67665__$1,new cljs.core.Keyword(null,"uri","uri",-774711847));
var method = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67665__$1,new cljs.core.Keyword(null,"method","method",55703592));
var body = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67665__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var headers = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67665__$1,new cljs.core.Keyword(null,"headers","headers",-835030129));
var timeout = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__67665__$1,new cljs.core.Keyword(null,"timeout","timeout",-318625318),(0));
var with_credentials = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__67665__$1,new cljs.core.Keyword(null,"with-credentials","with-credentials",-1163127235),false);
var response_format = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67665__$1,new cljs.core.Keyword(null,"response-format","response-format",1664465322));
var this$__$1 = this;
(this$__$1.withCredentials = with_credentials);

(this$__$1.onreadystatechange = (function (p1__67663_SHARP_){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"response-ready","response-ready",245208276),ajax.xml_http_request.ready_state(p1__67663_SHARP_))){
return (handler.cljs$core$IFn$_invoke$arity$1 ? handler.cljs$core$IFn$_invoke$arity$1(this$__$1) : handler.call(null,this$__$1));
} else {
return null;
}
}));

this$__$1.open(method,uri,true);

(this$__$1.timeout = timeout);

var temp__5753__auto___67693 = new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(response_format);
if(cljs.core.truth_(temp__5753__auto___67693)){
var response_type_67694 = temp__5753__auto___67693;
(this$__$1.responseType = cljs.core.name(response_type_67694));
} else {
}

var seq__67666_67695 = cljs.core.seq(headers);
var chunk__67667_67696 = null;
var count__67668_67697 = (0);
var i__67669_67698 = (0);
while(true){
if((i__67669_67698 < count__67668_67697)){
var vec__67678_67699 = chunk__67667_67696.cljs$core$IIndexed$_nth$arity$2(null,i__67669_67698);
var k_67700 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67678_67699,(0),null);
var v_67701 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67678_67699,(1),null);
this$__$1.setRequestHeader(k_67700,v_67701);


var G__67703 = seq__67666_67695;
var G__67704 = chunk__67667_67696;
var G__67705 = count__67668_67697;
var G__67706 = (i__67669_67698 + (1));
seq__67666_67695 = G__67703;
chunk__67667_67696 = G__67704;
count__67668_67697 = G__67705;
i__67669_67698 = G__67706;
continue;
} else {
var temp__5753__auto___67707 = cljs.core.seq(seq__67666_67695);
if(temp__5753__auto___67707){
var seq__67666_67708__$1 = temp__5753__auto___67707;
if(cljs.core.chunked_seq_QMARK_(seq__67666_67708__$1)){
var c__4679__auto___67709 = cljs.core.chunk_first(seq__67666_67708__$1);
var G__67710 = cljs.core.chunk_rest(seq__67666_67708__$1);
var G__67711 = c__4679__auto___67709;
var G__67712 = cljs.core.count(c__4679__auto___67709);
var G__67713 = (0);
seq__67666_67695 = G__67710;
chunk__67667_67696 = G__67711;
count__67668_67697 = G__67712;
i__67669_67698 = G__67713;
continue;
} else {
var vec__67681_67714 = cljs.core.first(seq__67666_67708__$1);
var k_67715 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67681_67714,(0),null);
var v_67716 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67681_67714,(1),null);
this$__$1.setRequestHeader(k_67715,v_67716);


var G__67717 = cljs.core.next(seq__67666_67708__$1);
var G__67718 = null;
var G__67719 = (0);
var G__67720 = (0);
seq__67666_67695 = G__67717;
chunk__67667_67696 = G__67718;
count__67668_67697 = G__67719;
i__67669_67698 = G__67720;
continue;
}
} else {
}
}
break;
}

this$__$1.send((function (){var or__4253__auto__ = body;
if(cljs.core.truth_(or__4253__auto__)){
return or__4253__auto__;
} else {
return "";
}
})());

return this$__$1;
}));

(ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxRequest$ = cljs.core.PROTOCOL_SENTINEL);

(ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxRequest$_abort$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1.abort();
}));

(ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxResponse$ = cljs.core.PROTOCOL_SENTINEL);

(ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxResponse$_body$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1.response;
}));

(ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxResponse$_status$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1.status;
}));

(ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxResponse$_status_text$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1.statusText;
}));

(ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxResponse$_get_all_headers$arity$1 = (function (this$){
var this$__$1 = this;
return ajax.xml_http_request.process_headers(this$__$1.getAllResponseHeaders());
}));

(ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxResponse$_get_response_header$arity$2 = (function (this$,header){
var this$__$1 = this;
return this$__$1.getResponseHeader(header);
}));

(ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxResponse$_was_aborted$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((0),this$__$1.readyState);
}));

//# sourceMappingURL=ajax.xml_http_request.js.map
