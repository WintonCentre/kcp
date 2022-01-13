goog.provide('transplants.widgets');
var module$node_modules$react_bootstrap$cjs$index=shadow.js.require("module$node_modules$react_bootstrap$cjs$index", {});
/**
 * Convert a namespaced factor key to an id
 */
transplants.widgets.key__GT_id = (function transplants$widgets$key__GT_id(k){
if(cljs.core.truth_(k)){
return [cljs.core.namespace(k),"-",cljs.core.name(k)].join('');
} else {
return null;
}
});
transplants.widgets.bad_widget_type = (function transplants$widgets$bad_widget_type(msg){
return console.log("Bad widget type",msg);
});
if((typeof transplants !== 'undefined') && (typeof transplants.widgets !== 'undefined') && (typeof transplants.widgets.widget !== 'undefined')){
} else {
/**
 * Create a widget component of a given type.
 * The first argument is the widget map, and the value of its :type slot determines the 
 * widget type. If it's a keyword, dispatch on that. If it's a string, read it into a map and dispatch on that map's :type.
 * This allows us to add parameters to the widget inside the type column in the spreadsheet.
 */
transplants.widgets.widget = (function (){var method_table__4747__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__4748__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var method_cache__4749__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__4750__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__4751__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"default","default",-1987822328),new cljs.core.Keyword(null,"unsupported","unsupported",-1045607016)], null),new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),(function (){var fexpr__67976 = cljs.core.get_global_hierarchy;
return (fexpr__67976.cljs$core$IFn$_invoke$arity$0 ? fexpr__67976.cljs$core$IFn$_invoke$arity$0() : fexpr__67976.call(null));
})());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("transplants.widgets","widget"),(function (m){
if((new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(m) instanceof cljs.core.Keyword)){
return new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(m);
} else {
try{var ms = clojure.edn.read_string.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(m));
if(((cljs.core.map_QMARK_(ms)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(ms),new cljs.core.Keyword(null,"numeric","numeric",-1495594714))))){
return new cljs.core.Keyword(null,"numeric","numeric",-1495594714);
} else {
transplants.widgets.bad_widget_type(":type :numeric should be like {:type :numeric :dps 0 :min 0 :max 100}");

console.log("culprit is: ",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([m], 0)));

return new cljs.core.Keyword(null,"unsupported","unsupported",-1045607016);
}
}catch (e67980){var _e = e67980;
transplants.widgets.bad_widget_type("Invalid type");

return new cljs.core.Keyword(null,"unsupported","unsupported",-1045607016);
}}
}),new cljs.core.Keyword(null,"unsupported","unsupported",-1045607016),hierarchy__4751__auto__,method_table__4747__auto__,prefer_table__4748__auto__,method_cache__4749__auto__,cached_hierarchy__4750__auto__));
})();
}
transplants.widgets.widget.cljs$core$IMultiFn$_add_method$arity$3(null,null,(function (_){
return null;
}));
transplants.widgets.mb = (0);
/**
 * label column grid-size
 */
transplants.widgets.label_width = (5);
/**
 * Widget column grid-size
 */
transplants.widgets.widget_width = (7);
transplants.widgets.widget.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"reset","reset",-800929946),(function (_w){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Row,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"display","display",242065432),"flex",new cljs.core.Keyword(null,"align-items","align-items",-267946462),"",new cljs.core.Keyword(null,"margin-top","margin-top",392161226),(5)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Col,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"xs","xs",649443341),transplants.widgets.label_width], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Col,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"xs","xs",649443341),transplants.widgets.widget_width], null),transplants.bsio.reset_button(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.events","reset-inputs","transplants.events/reset-inputs",1125387447)], null));
})], null))], null)], null);
}));
transplants.widgets.radio = (function transplants$widgets$radio(p__67985){
var map__67986 = p__67985;
var map__67986__$1 = cljs.core.__destructure_map(map__67986);
var w = map__67986__$1;
var factor_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67986__$1,new cljs.core.Keyword(null,"factor-name","factor-name",-1453446694));
var _default = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67986__$1,new cljs.core.Keyword(null,"_default","_default",308892991));
var _boxed = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67986__$1,new cljs.core.Keyword(null,"_boxed","_boxed",1447315520));
var info_box_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67986__$1,new cljs.core.Keyword(null,"info-box?","info-box?",825044934));
var _type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67986__$1,new cljs.core.Keyword(null,"_type","_type",-970742198));
var vertical = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67986__$1,new cljs.core.Keyword(null,"vertical","vertical",718696748));
var levels = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67986__$1,new cljs.core.Keyword(null,"levels","levels",-950747887));
var optional = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67986__$1,new cljs.core.Keyword(null,"optional","optional",2053951509));
var factor_key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67986__$1,new cljs.core.Keyword(null,"factor-key","factor-key",-1402681225));
var value_f = (function (){
return cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [factor_key], null)));
});
var optional_QMARK_ = (!((optional == null)));
var info_box = (function (){try{return clojure.edn.read_string.cljs$core$IFn$_invoke$arity$1(info_box_QMARK_);
}catch (e67987){var e = e67987;
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"title","title",636505583),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"color","color",1011675173),"red"], null)], null),"Info-box syntax error"], null),new cljs.core.Keyword(null,"content","content",15833224),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"see ",factor_name,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"br","br",934104792)], null),e], null)], null);
}})();
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Row,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"display","display",242065432),"flex",new cljs.core.Keyword(null,"align-items","align-items",-267946462),"center",new cljs.core.Keyword(null,"margin-bottom","margin-bottom",388334941),transplants.widgets.mb], null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Col,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"xs","xs",649443341),transplants.widgets.label_width,new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"display","display",242065432),"flex",new cljs.core.Keyword(null,"justify-content","justify-content",-1990475787),"flex-end"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Form.Label,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"font-weight","font-weight",2085804583),"bold",new cljs.core.Keyword(null,"text-align","text-align",1786091845),"right",new cljs.core.Keyword(null,"margin-bottom","margin-bottom",388334941),transplants.widgets.mb,new cljs.core.Keyword(null,"line-height","line-height",1870784992),1.2], null)], null),new cljs.core.Keyword(null,"factor-name","factor-name",-1453446694).cljs$core$IFn$_invoke$arity$1(w)], null),(cljs.core.truth_(info_box_QMARK_)?(function (){
shadow.debug.tap__GT_(new cljs.core.Keyword(null,"info-box?","info-box?",825044934).cljs$core$IFn$_invoke$arity$1(w),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"ns","ns",441598760),"transplants.widgets",new cljs.core.Keyword(null,"line","line",212345235),92,new cljs.core.Keyword(null,"column","column",2078222095),9,new cljs.core.Keyword(null,"label","label",1718410804),new cljs.core.Keyword("transplants.widgets","info-box","transplants.widgets/info-box",-1239898859)], null));

return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Button,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"size","size",1098693007),"sm",new cljs.core.Keyword(null,"variant","variant",-424354234),"outline",new cljs.core.Keyword(null,"class-name","class-name",945142584),"more",new cljs.core.Keyword(null,"title","title",636505583),"click for more info",new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (_e){
re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.events","modal-data","transplants.events/modal-data",1130692203),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"show","show",-576705889),true,new cljs.core.Keyword(null,"title","title",636505583),cljs.core.get.cljs$core$IFn$_invoke$arity$3(info_box,new cljs.core.Keyword(null,"title","title",636505583),new cljs.core.Keyword(null,"factor-name","factor-name",-1453446694).cljs$core$IFn$_invoke$arity$1(w)),new cljs.core.Keyword(null,"content","content",15833224),cljs.core.get.cljs$core$IFn$_invoke$arity$3(info_box,new cljs.core.Keyword(null,"content","content",15833224),info_box),new cljs.core.Keyword(null,"ok","ok",967785236),(function (_e__$1){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.events","modal-data","transplants.events/modal-data",1130692203),false], null));
})], null)], null));

return shadow.debug.tap__GT_(new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"show","show",-576705889),true,new cljs.core.Keyword(null,"title","title",636505583),cljs.core.get.cljs$core$IFn$_invoke$arity$3(info_box,new cljs.core.Keyword(null,"title","title",636505583),new cljs.core.Keyword(null,"factor-name","factor-name",-1453446694).cljs$core$IFn$_invoke$arity$1(w)),new cljs.core.Keyword(null,"content","content",15833224),cljs.core.get.cljs$core$IFn$_invoke$arity$3(info_box,new cljs.core.Keyword(null,"content","content",15833224),info_box),new cljs.core.Keyword(null,"ok","ok",967785236),(function (_e__$1){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.events","modal-data","transplants.events/modal-data",1130692203),false], null));
})], null),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"ns","ns",441598760),"transplants.widgets",new cljs.core.Keyword(null,"line","line",212345235),105,new cljs.core.Keyword(null,"column","column",2078222095),36,new cljs.core.Keyword(null,"label","label",1718410804),new cljs.core.Keyword("transplants.widgets","radio","transplants.widgets/radio",2128461899)], null));
})], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),"?"], null)], null);
})()
:null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Col,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"xs","xs",649443341),transplants.widgets.widget_width], null),transplants.bsio.radio_button_group(new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"id","id",-1388402092),transplants.widgets.key__GT_id(factor_key),new cljs.core.Keyword(null,"vertical","vertical",718696748),vertical,new cljs.core.Keyword(null,"value-f","value-f",-1842795108),value_f,new cljs.core.Keyword(null,"optional","optional",2053951509),optional_QMARK_,new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (p1__67984_SHARP_){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [factor_key,cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(p1__67984_SHARP_)], null));
}),new cljs.core.Keyword(null,"buttons-f","buttons-f",120679154),(function (){
return cljs.core.vals(levels);
})], null))], null)], null);
});
transplants.widgets.widget.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"radio","radio",1323726374),(function (w){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.widgets.radio,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(w,new cljs.core.Keyword(null,"vertical","vertical",718696748),false)], null);
}));
transplants.widgets.widget.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"v-radio","v-radio",-2092397308),(function (w){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.widgets.radio,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(w,new cljs.core.Keyword(null,"vertical","vertical",718696748),true)], null);
}));
transplants.widgets.widget.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"dropdown","dropdown",1343185805),(function (p__67990){
var map__67991 = p__67990;
var map__67991__$1 = cljs.core.__destructure_map(map__67991);
var w = map__67991__$1;
var _factor_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67991__$1,new cljs.core.Keyword(null,"_factor-name","_factor-name",-8697381));
var factor_key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67991__$1,new cljs.core.Keyword(null,"factor-key","factor-key",-1402681225));
var levels = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67991__$1,new cljs.core.Keyword(null,"levels","levels",-950747887));
var _default = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67991__$1,new cljs.core.Keyword(null,"_default","_default",308892991));
var _type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67991__$1,new cljs.core.Keyword(null,"_type","_type",-970742198));
var value_f = (function (){
return cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [factor_key], null)));
});
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Row,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"display","display",242065432),"flex",new cljs.core.Keyword(null,"align-items","align-items",-267946462),"center",new cljs.core.Keyword(null,"margin-bottom","margin-bottom",388334941),transplants.widgets.mb], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Col,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"xs","xs",649443341),transplants.widgets.label_width,new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"display","display",242065432),"flex",new cljs.core.Keyword(null,"justify-content","justify-content",-1990475787),"flex-end"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Form.Label,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"font-weight","font-weight",2085804583),"bold",new cljs.core.Keyword(null,"text-align","text-align",1786091845),"right",new cljs.core.Keyword(null,"line-height","line-height",1870784992),1.2], null)], null),new cljs.core.Keyword(null,"factor-name","factor-name",-1453446694).cljs$core$IFn$_invoke$arity$1(w)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Col,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"xs","xs",649443341),transplants.widgets.widget_width], null),transplants.bsio.dropdown(new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),transplants.widgets.key__GT_id(factor_key),new cljs.core.Keyword(null,"value-f","value-f",-1842795108),value_f,new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (p1__67989_SHARP_){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [factor_key,cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(p1__67989_SHARP_)], null));
}),new cljs.core.Keyword(null,"buttons-f","buttons-f",120679154),(function (){
return cljs.core.vals(levels);
})], null))], null)], null);
}));
transplants.widgets.widget.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"numeric","numeric",-1495594714),(function (p__67993){
var map__67994 = p__67993;
var map__67994__$1 = cljs.core.__destructure_map(map__67994);
var w = map__67994__$1;
var _factor_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67994__$1,new cljs.core.Keyword(null,"_factor-name","_factor-name",-8697381));
var factor_key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67994__$1,new cljs.core.Keyword(null,"factor-key","factor-key",-1402681225));
var _factor = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67994__$1,new cljs.core.Keyword(null,"_factor","_factor",233356458));
var _levels = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67994__$1,new cljs.core.Keyword(null,"_levels","_levels",696902097));
var _default = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67994__$1,new cljs.core.Keyword(null,"_default","_default",308892991));
var _type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67994__$1,new cljs.core.Keyword(null,"_type","_type",-970742198));
var _model = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67994__$1,new cljs.core.Keyword(null,"_model","_model",-698954695));
var value_f = (function (){
return cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [factor_key], null)));
});
var numerics = clojure.edn.read_string.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(w));
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Row,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"display","display",242065432),"flex",new cljs.core.Keyword(null,"align-items","align-items",-267946462),"center",new cljs.core.Keyword(null,"margin-bottom","margin-bottom",388334941),(3)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Col,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"xs","xs",649443341),transplants.widgets.label_width,new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"display","display",242065432),"flex",new cljs.core.Keyword(null,"justify-content","justify-content",-1990475787),"flex-end"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Form.Label,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"font-weight","font-weight",2085804583),"bold",new cljs.core.Keyword(null,"text-align","text-align",1786091845),"right",new cljs.core.Keyword(null,"line-height","line-height",1870784992),1.2], null)], null),new cljs.core.Keyword(null,"factor-name","factor-name",-1453446694).cljs$core$IFn$_invoke$arity$1(w)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Col,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"xs","xs",649443341),transplants.widgets.widget_width,new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"display","display",242065432),"flex"], null)], null),((((cljs.core.map_QMARK_(numerics)) && (cljs.core.every_QMARK_(cljs.core.identity,cljs.core.map.cljs$core$IFn$_invoke$arity$2(numerics,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"min","min",444991522),new cljs.core.Keyword(null,"max","max",61366548),new cljs.core.Keyword(null,"dps","dps",1756250620)], null))))))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.numeric_input.numeric_input,new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"key","key",-1516042587),factor_key,new cljs.core.Keyword(null,"value-f","value-f",-1842795108),value_f,new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (p1__67992_SHARP_){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [factor_key,p1__67992_SHARP_], null));
}),new cljs.core.Keyword(null,"min","min",444991522),new cljs.core.Keyword(null,"min","min",444991522).cljs$core$IFn$_invoke$arity$1(numerics),new cljs.core.Keyword(null,"max","max",61366548),new cljs.core.Keyword(null,"max","max",61366548).cljs$core$IFn$_invoke$arity$1(numerics),new cljs.core.Keyword(null,"dps","dps",1756250620),new cljs.core.Keyword(null,"dps","dps",1756250620).cljs$core$IFn$_invoke$arity$1(numerics),new cljs.core.Keyword(null,"units","units",-533089095),new cljs.core.Keyword(null,"sub-text","sub-text",26485069).cljs$core$IFn$_invoke$arity$1(w)], null)], null):new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),"Check that ",new cljs.core.Keyword(null,"factor","factor",-2103172748).cljs$core$IFn$_invoke$arity$1(w)," has min, max, and dps parameters"], null))], null)], null);
}));
transplants.widgets.widget.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"unsupported","unsupported",-1045607016),(function (p__67996){
var map__67997 = p__67996;
var map__67997__$1 = cljs.core.__destructure_map(map__67997);
var m = map__67997__$1;
var type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67997__$1,new cljs.core.Keyword(null,"type","type",1174270348));
console.log("unsupported widget-type: ",m);

return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),type," widget badly configured"], null);
}));
transplants.widgets.widget.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"param","param",2013631823),(function (_){
return null;
}));
transplants.widgets.widget.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"none","none",1333468478),(function (_){
return null;
}));

//# sourceMappingURL=transplants.widgets.js.map
