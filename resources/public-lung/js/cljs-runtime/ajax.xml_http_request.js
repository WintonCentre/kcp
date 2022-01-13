goog.provide('ajax.xml_http_request');
ajax.xml_http_request.ready_state = (function ajax$xml_http_request$ready_state(e){
var G__81602 = e.target.readyState;
var fexpr__81601 = new cljs.core.PersistentArrayMap(null, 5, [(0),new cljs.core.Keyword(null,"not-initialized","not-initialized",-1937378906),(1),new cljs.core.Keyword(null,"connection-established","connection-established",-1403749733),(2),new cljs.core.Keyword(null,"request-received","request-received",2110590540),(3),new cljs.core.Keyword(null,"processing-request","processing-request",-264947221),(4),new cljs.core.Keyword(null,"response-ready","response-ready",245208276)], null);
return (fexpr__81601.cljs$core$IFn$_invoke$arity$1 ? fexpr__81601.cljs$core$IFn$_invoke$arity$1(G__81602) : fexpr__81601.call(null,G__81602));
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

(ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxImpl$_js_ajax_request$arity$3 = (function (this$,p__81607,handler){
var map__81608 = p__81607;
var map__81608__$1 = cljs.core.__destructure_map(map__81608);
var uri = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81608__$1,new cljs.core.Keyword(null,"uri","uri",-774711847));
var method = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81608__$1,new cljs.core.Keyword(null,"method","method",55703592));
var body = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81608__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var headers = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81608__$1,new cljs.core.Keyword(null,"headers","headers",-835030129));
var timeout = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__81608__$1,new cljs.core.Keyword(null,"timeout","timeout",-318625318),(0));
var with_credentials = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__81608__$1,new cljs.core.Keyword(null,"with-credentials","with-credentials",-1163127235),false);
var response_format = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81608__$1,new cljs.core.Keyword(null,"response-format","response-format",1664465322));
var this$__$1 = this;
(this$__$1.withCredentials = with_credentials);

(this$__$1.onreadystatechange = (function (p1__81604_SHARP_){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"response-ready","response-ready",245208276),ajax.xml_http_request.ready_state(p1__81604_SHARP_))){
return (handler.cljs$core$IFn$_invoke$arity$1 ? handler.cljs$core$IFn$_invoke$arity$1(this$__$1) : handler.call(null,this$__$1));
} else {
return null;
}
}));

this$__$1.open(method,uri,true);

(this$__$1.timeout = timeout);

var temp__5753__auto___81636 = new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(response_format);
if(cljs.core.truth_(temp__5753__auto___81636)){
var response_type_81637 = temp__5753__auto___81636;
(this$__$1.responseType = cljs.core.name(response_type_81637));
} else {
}

var seq__81614_81638 = cljs.core.seq(headers);
var chunk__81615_81639 = null;
var count__81616_81640 = (0);
var i__81617_81641 = (0);
while(true){
if((i__81617_81641 < count__81616_81640)){
var vec__81626_81642 = chunk__81615_81639.cljs$core$IIndexed$_nth$arity$2(null,i__81617_81641);
var k_81643 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81626_81642,(0),null);
var v_81644 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81626_81642,(1),null);
this$__$1.setRequestHeader(k_81643,v_81644);


var G__81645 = seq__81614_81638;
var G__81646 = chunk__81615_81639;
var G__81647 = count__81616_81640;
var G__81648 = (i__81617_81641 + (1));
seq__81614_81638 = G__81645;
chunk__81615_81639 = G__81646;
count__81616_81640 = G__81647;
i__81617_81641 = G__81648;
continue;
} else {
var temp__5753__auto___81649 = cljs.core.seq(seq__81614_81638);
if(temp__5753__auto___81649){
var seq__81614_81650__$1 = temp__5753__auto___81649;
if(cljs.core.chunked_seq_QMARK_(seq__81614_81650__$1)){
var c__4679__auto___81651 = cljs.core.chunk_first(seq__81614_81650__$1);
var G__81652 = cljs.core.chunk_rest(seq__81614_81650__$1);
var G__81653 = c__4679__auto___81651;
var G__81654 = cljs.core.count(c__4679__auto___81651);
var G__81655 = (0);
seq__81614_81638 = G__81652;
chunk__81615_81639 = G__81653;
count__81616_81640 = G__81654;
i__81617_81641 = G__81655;
continue;
} else {
var vec__81629_81656 = cljs.core.first(seq__81614_81650__$1);
var k_81657 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81629_81656,(0),null);
var v_81658 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81629_81656,(1),null);
this$__$1.setRequestHeader(k_81657,v_81658);


var G__81659 = cljs.core.next(seq__81614_81650__$1);
var G__81660 = null;
var G__81661 = (0);
var G__81662 = (0);
seq__81614_81638 = G__81659;
chunk__81615_81639 = G__81660;
count__81616_81640 = G__81661;
i__81617_81641 = G__81662;
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
