goog.provide('transplants.bsio');
var module$node_modules$react_bootstrap$cjs$index=shadow.js.require("module$node_modules$react_bootstrap$cjs$index", {});
transplants.bsio.missing_color = "#ff0000";
/**
 * Add in correct toggle operation.
 * The id may be used to locate this widget in E2E tests.
 * value-f is a function which, when called returns the current value of the widget.
 * event-f is an event handler which is called when the selected level changes
 * Each button is configured with a map wih the (buttons-f) containing its :level-name, :level, and :disabled status.
 */
transplants.bsio.radio_button_group = (function transplants$bsio$radio_button_group(p__81745){
var map__81746 = p__81745;
var map__81746__$1 = cljs.core.__destructure_map(map__81746);
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81746__$1,new cljs.core.Keyword(null,"id","id",-1388402092));
var value_f = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81746__$1,new cljs.core.Keyword(null,"value-f","value-f",-1842795108));
var on_change = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81746__$1,new cljs.core.Keyword(null,"on-change","on-change",-732046149));
var buttons_f = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81746__$1,new cljs.core.Keyword(null,"buttons-f","buttons-f",120679154));
var _vertical = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81746__$1,new cljs.core.Keyword(null,"_vertical","_vertical",-1198358645));
var _optional = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81746__$1,new cljs.core.Keyword(null,"_optional","_optional",2085316983));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"<>","<>",1280186386),(function (){var value = (value_f.cljs$core$IFn$_invoke$arity$0 ? value_f.cljs$core$IFn$_invoke$arity$0() : value_f.call(null));
var buttons = (buttons_f.cljs$core$IFn$_invoke$arity$0 ? buttons_f.cljs$core$IFn$_invoke$arity$0() : buttons_f.call(null));
var highlight_QMARK_ = (function (lev){
return ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(value,new cljs.core.Keyword(null,"unknown","unknown",-935977881))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(lev,new cljs.core.Keyword(null,"optional","optional",2053951509).cljs$core$IFn$_invoke$arity$1(cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__81737_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"level","level",1290497552).cljs$core$IFn$_invoke$arity$1(p1__81737_SHARP_),new cljs.core.Keyword(null,"unknown","unknown",-935977881));
}),buttons))))));
});
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.ToggleButtonGroup,new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"type","type",1174270348),"radio",new cljs.core.Keyword(null,"id","id",-1388402092),id,new cljs.core.Keyword(null,"name","name",1843675177),id,new cljs.core.Keyword(null,"value","value",305978217),value,new cljs.core.Keyword(null,"on-change","on-change",-732046149),on_change,new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"margin-top","margin-top",392161226),(5),new cljs.core.Keyword(null,"border","border",1444987323),["3px solid ",(((value == null))?transplants.bsio.missing_color:((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(value,new cljs.core.Keyword(null,"unknown","unknown",-935977881)))?"teal":"#CCCCCC"))].join(''),new cljs.core.Keyword(null,"border-radius","border-radius",419594011),(5),new cljs.core.Keyword(null,"padding","padding",1660304693),(1),new cljs.core.Keyword(null,"display","display",242065432),"flex",new cljs.core.Keyword(null,"justify-content","justify-content",-1990475787),"space-between",new cljs.core.Keyword(null,"flex-wrap","flex-wrap",455413707),"wrap"], null)], null)], null),cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__81755){
var map__81757 = p__81755;
var map__81757__$1 = cljs.core.__destructure_map(map__81757);
var level_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81757__$1,new cljs.core.Keyword(null,"level-name","level-name",-1650644216));
var level = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81757__$1,new cljs.core.Keyword(null,"level","level",1290497552));
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.ToggleButton,new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"type","type",1174270348),"checkbox",new cljs.core.Keyword(null,"class-name","class-name",945142584),"toggler",new cljs.core.Keyword(null,"key","key",-1516042587),level,new cljs.core.Keyword(null,"disabled","disabled",-1529784218),false,new cljs.core.Keyword(null,"value","value",305978217),level,new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"border-radius","border-radius",419594011),(0),new cljs.core.Keyword(null,"margin","margin",-995903681),(0),new cljs.core.Keyword(null,"color","color",1011675173),((highlight_QMARK_(level))?"#00B":null),new cljs.core.Keyword(null,"font-weight","font-weight",2085804583),((highlight_QMARK_(level))?"bold":null),new cljs.core.Keyword(null,"background-color","background-color",570434026),((highlight_QMARK_(level))?"#fec":((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(level,value))?transplants.rgb.theme:"#fff"))], null),new cljs.core.Keyword(null,"variant","variant",-424354234),"outline-secondary"], null),level_name], null);
}),buttons));
})()], null);
});
transplants.bsio.dropdown = (function transplants$bsio$dropdown(p__81765){
var map__81766 = p__81765;
var map__81766__$1 = cljs.core.__destructure_map(map__81766);
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81766__$1,new cljs.core.Keyword(null,"id","id",-1388402092));
var value_f = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81766__$1,new cljs.core.Keyword(null,"value-f","value-f",-1842795108));
var on_change = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81766__$1,new cljs.core.Keyword(null,"on-change","on-change",-732046149));
var buttons_f = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81766__$1,new cljs.core.Keyword(null,"buttons-f","buttons-f",120679154));
var value = (value_f.cljs$core$IFn$_invoke$arity$0 ? value_f.cljs$core$IFn$_invoke$arity$0() : value_f.call(null));
var buttons = (buttons_f.cljs$core$IFn$_invoke$arity$0 ? buttons_f.cljs$core$IFn$_invoke$arity$0() : buttons_f.call(null));
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Dropdown,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-select","on-select",-192407950),(function (p1__81759_SHARP_){
var G__81773 = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(p1__81759_SHARP_);
return (on_change.cljs$core$IFn$_invoke$arity$1 ? on_change.cljs$core$IFn$_invoke$arity$1(G__81773) : on_change.call(null,G__81773));
})], null),cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.DropdownButton,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"id","id",-1388402092),id,new cljs.core.Keyword(null,"value","value",305978217),value,new cljs.core.Keyword(null,"variant","variant",-424354234),(((value == null))?"outline-secondary":"secondary"),new cljs.core.Keyword(null,"title","title",636505583),new cljs.core.Keyword(null,"level-name","level-name",-1650644216).cljs$core$IFn$_invoke$arity$1(cljs.core.first((function (){var temp__5751__auto__ = cljs.core.seq(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p__81777){
var map__81778 = p__81777;
var map__81778__$1 = cljs.core.__destructure_map(map__81778);
var level = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81778__$1,new cljs.core.Keyword(null,"level","level",1290497552));
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(value,level);
}),buttons));
if(temp__5751__auto__){
var x = temp__5751__auto__;
return x;
} else {
return (buttons_f.cljs$core$IFn$_invoke$arity$0 ? buttons_f.cljs$core$IFn$_invoke$arity$0() : buttons_f.call(null));
}
})())),new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"border","border",1444987323),["3px solid ",(((value == null))?transplants.bsio.missing_color:"#ffffff")].join(''),new cljs.core.Keyword(null,"border-radius","border-radius",419594011),(5),new cljs.core.Keyword(null,"padding","padding",1660304693),(1),new cljs.core.Keyword(null,"width","width",-384071477),"max-content"], null)], null)], null),cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__81788){
var map__81789 = p__81788;
var map__81789__$1 = cljs.core.__destructure_map(map__81789);
var level_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81789__$1,new cljs.core.Keyword(null,"level-name","level-name",-1650644216));
var level = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81789__$1,new cljs.core.Keyword(null,"level","level",1290497552));
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Dropdown.Item,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"key","key",-1516042587),level,new cljs.core.Keyword(null,"as","as",1148689641),"button",new cljs.core.Keyword(null,"eventKey","eventKey",-828373657),level,new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (p1__81762_SHARP_){
return p1__81762_SHARP_.preventDefault();
})], null),level_name], null);
}),(buttons_f.cljs$core$IFn$_invoke$arity$0 ? buttons_f.cljs$core$IFn$_invoke$arity$0() : buttons_f.call(null))))], null);
});
transplants.bsio.reset_button = (function transplants$bsio$reset_button(p__81798){
var map__81799 = p__81798;
var map__81799__$1 = cljs.core.__destructure_map(map__81799);
var on_click = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81799__$1,new cljs.core.Keyword(null,"on-click","on-click",1632826543));
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Button,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"variant","variant",-424354234),"danger",new cljs.core.Keyword(null,"id","id",-1388402092),"reset",new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin-bottom","margin-bottom",388334941),(10)], null),new cljs.core.Keyword(null,"on-click","on-click",1632826543),on_click], null),"Reset all"], null);
});
/**
 * A modal dialog box
 */
transplants.bsio.modal = (function transplants$bsio$modal(data_f){
var map__81812 = cljs.core.deref((data_f.cljs$core$IFn$_invoke$arity$0 ? data_f.cljs$core$IFn$_invoke$arity$0() : data_f.call(null)));
var map__81812__$1 = cljs.core.__destructure_map(map__81812);
var data = map__81812__$1;
var title = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81812__$1,new cljs.core.Keyword(null,"title","title",636505583));
var content = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81812__$1,new cljs.core.Keyword(null,"content","content",15833224));
var cancel = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81812__$1,new cljs.core.Keyword(null,"cancel","cancel",-1964088360));
var save = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81812__$1,new cljs.core.Keyword(null,"save","save",1850079149));
var ok = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81812__$1,new cljs.core.Keyword(null,"ok","ok",967785236));
if(cljs.core.truth_(data)){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Modal,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"show","show",-576705889),true,new cljs.core.Keyword(null,"on-hide","on-hide",1263105709),ok], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Modal.Header,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"close-button","close-button",1885538121),true], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Modal.Title,title], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Modal.Body,content], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Modal.Footer,(cljs.core.truth_(cancel)?new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Button,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"variant","variant",-424354234),"secondary",new cljs.core.Keyword(null,"on-click","on-click",1632826543),cancel], null),"Cancel"], null):null),(cljs.core.truth_(save)?new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Button,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"variant","variant",-424354234),"primary",new cljs.core.Keyword(null,"on-click","on-click",1632826543),save], null),"Save"], null):new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Button,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"variant","variant",-424354234),"primary",new cljs.core.Keyword(null,"on-click","on-click",1632826543),ok], null),"OK"], null))], null)], null);
} else {
return null;
}
});

//# sourceMappingURL=transplants.bsio.js.map
