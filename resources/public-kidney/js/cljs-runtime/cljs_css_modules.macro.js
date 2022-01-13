goog.provide('cljs_css_modules.macro');
/**
 * Take the &env from a macro, and tell whether we are expanding into cljs.
 */
cljs_css_modules.macro.cljs_env_QMARK_ = (function cljs_css_modules$macro$cljs_env_QMARK_(env){
return cljs.core.boolean$(new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(env));
});
cljs_css_modules.macro.selectors_to_localise = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"id","id",-1388402092),new cljs.core.Keyword(null,"class","class",-2030961996),new cljs.core.Keyword(null,"regexp","regexp",-541372782),/\.([^#.:\[\s]+)(.*)/,new cljs.core.Keyword(null,"localise-fn","localise-fn",-375044382),(function (p1__68568_SHARP_){
return [".$1","--",cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__68568_SHARP_),"$2"].join('');
}),new cljs.core.Keyword(null,"name-template","name-template",1677383261),"$1",new cljs.core.Keyword(null,"value-template","value-template",10903298),"$1"], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"id","id",-1388402092),new cljs.core.Keyword(null,"keyframe","keyframe",1957083746),new cljs.core.Keyword(null,"regexp","regexp",-541372782),/@keyframes (.+)/,new cljs.core.Keyword(null,"localise-fn","localise-fn",-375044382),(function (p1__68569_SHARP_){
return ["$1--",cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__68569_SHARP_)].join('');
}),new cljs.core.Keyword(null,"name-template","name-template",1677383261),"$1",new cljs.core.Keyword(null,"value-template","value-template",10903298),"$1"], null)], null);
cljs_css_modules.macro.should_be_localised = (function cljs_css_modules$macro$should_be_localised(selector){
return cljs.core.some((function (selector_object){
if(cljs.core.truth_(cljs.core.re_matches(new cljs.core.Keyword(null,"regexp","regexp",-541372782).cljs$core$IFn$_invoke$arity$1(selector_object),selector))){
return selector_object;
} else {
return false;
}
}),cljs_css_modules.macro.selectors_to_localise);
});
cljs_css_modules.macro.localise_selector = (function cljs_css_modules$macro$localise_selector(id,selector,p__68570){
var map__68571 = p__68570;
var map__68571__$1 = cljs.core.__destructure_map(map__68571);
var regexp = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68571__$1,new cljs.core.Keyword(null,"regexp","regexp",-541372782));
var localise_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68571__$1,new cljs.core.Keyword(null,"localise-fn","localise-fn",-375044382));
return clojure.string.replace(selector,regexp,(localise_fn.cljs$core$IFn$_invoke$arity$1 ? localise_fn.cljs$core$IFn$_invoke$arity$1(id) : localise_fn.call(null,id)));
});
/**
 * Return the key to use to retrieve the actual selector value
 */
cljs_css_modules.macro.get_selector_key = (function cljs_css_modules$macro$get_selector_key(selector,p__68572){
var map__68573 = p__68572;
var map__68573__$1 = cljs.core.__destructure_map(map__68573);
var regexp = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68573__$1,new cljs.core.Keyword(null,"regexp","regexp",-541372782));
var name_template = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68573__$1,new cljs.core.Keyword(null,"name-template","name-template",1677383261));
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(clojure.string.replace(selector,regexp,name_template));
});
/**
 * Return the actual selector value
 */
cljs_css_modules.macro.get_selector_value = (function cljs_css_modules$macro$get_selector_value(selector,p__68577){
var map__68578 = p__68577;
var map__68578__$1 = cljs.core.__destructure_map(map__68578);
var regexp = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68578__$1,new cljs.core.Keyword(null,"regexp","regexp",-541372782));
var value_template = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68578__$1,new cljs.core.Keyword(null,"value-template","value-template",10903298));
return cljs.core.name(clojure.string.replace(selector,regexp,value_template));
});
cljs_css_modules.macro.is_media_QMARK_ = (function cljs_css_modules$macro$is_media_QMARK_(p__68579){
var vec__68580 = p__68579;
var seq__68581 = cljs.core.seq(vec__68580);
var first__68582 = cljs.core.first(seq__68581);
var seq__68581__$1 = cljs.core.next(seq__68581);
var first = first__68582;
var rest = seq__68581__$1;
var style = vec__68580;
return ((cljs.core.list_QMARK_(style)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(first,new cljs.core.Symbol(null,"at-media","at-media",494073870,null))));
});
cljs_css_modules.macro.is_keyframe_QMARK_ = (function cljs_css_modules$macro$is_keyframe_QMARK_(p__68583){
var vec__68584 = p__68583;
var seq__68585 = cljs.core.seq(vec__68584);
var first__68586 = cljs.core.first(seq__68585);
var seq__68585__$1 = cljs.core.next(seq__68585);
var first = first__68586;
var rest = seq__68585__$1;
var style = vec__68584;
return ((cljs.core.list_QMARK_(style)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(first,new cljs.core.Symbol(null,"at-keyframes","at-keyframes",-838208839,null))));
});
cljs_css_modules.macro.process_style = (function cljs_css_modules$macro$process_style(id,p__68587){
var vec__68588 = p__68587;
var seq__68589 = cljs.core.seq(vec__68588);
var first__68590 = cljs.core.first(seq__68589);
var seq__68589__$1 = cljs.core.next(seq__68589);
var fst = first__68590;
var rest = seq__68589__$1;
var style = vec__68588;
if(cljs_css_modules.macro.is_keyframe_QMARK_(style)){
var vec__68591 = style;
var seq__68592 = cljs.core.seq(vec__68591);
var first__68593 = cljs.core.first(seq__68592);
var seq__68592__$1 = cljs.core.next(seq__68592);
var symbol = first__68593;
var first__68593__$1 = cljs.core.first(seq__68592__$1);
var seq__68592__$2 = cljs.core.next(seq__68592__$1);
var name = first__68593__$1;
var style__$1 = seq__68592__$2;
var localised_name = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(name),"--",cljs.core.str.cljs$core$IFn$_invoke$arity$1(id)].join('');
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"at-keyframe","at-keyframe",1294985583),new cljs.core.Keyword(null,"garden-style","garden-style",334433186),style__$1,new cljs.core.Keyword(null,"selector","selector",762528866),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"original","original",-445386197),name,new cljs.core.Keyword(null,"localised","localised",-1733242051),localised_name,new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(name),new cljs.core.Keyword(null,"value","value",305978217),localised_name], null)], null);
} else {
if(cljs_css_modules.macro.is_media_QMARK_(style)){
var vec__68594 = style;
var seq__68595 = cljs.core.seq(vec__68594);
var first__68596 = cljs.core.first(seq__68595);
var seq__68595__$1 = cljs.core.next(seq__68595);
var symbol = first__68596;
var first__68596__$1 = cljs.core.first(seq__68595__$1);
var seq__68595__$2 = cljs.core.next(seq__68595__$1);
var params = first__68596__$1;
var style__$1 = seq__68595__$2;
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"media","media",-1066138403),new cljs.core.Keyword(null,"params","params",710516235),params,new cljs.core.Keyword(null,"nested-style","nested-style",2061569038),style__$1], null);
} else {
var rules = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,rest);
var s = cljs.core.name(fst);
var should_be_localised = cljs_css_modules.macro.should_be_localised(s);
if(cljs.core.truth_(should_be_localised)){
var selector_object = should_be_localised;
var localised_selector = cljs_css_modules.macro.localise_selector(id,s,selector_object);
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(selector_object),new cljs.core.Keyword(null,"selector","selector",762528866),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"original","original",-445386197),s,new cljs.core.Keyword(null,"localised","localised",-1733242051),localised_selector,new cljs.core.Keyword(null,"key","key",-1516042587),cljs_css_modules.macro.get_selector_key(s,selector_object),new cljs.core.Keyword(null,"value","value",305978217),cljs_css_modules.macro.get_selector_value(localised_selector,selector_object)], null),new cljs.core.Keyword(null,"garden-style","garden-style",334433186),style], null);
} else {
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"not-localised","not-localised",-1439986811),new cljs.core.Keyword(null,"garden-style","garden-style",334433186),style], null);
}

}
}
});
cljs_css_modules.macro.create_garden_style = (function cljs_css_modules$macro$create_garden_style(id,p__68597,item){
var map__68598 = p__68597;
var map__68598__$1 = cljs.core.__destructure_map(map__68598);
var acc = map__68598__$1;
var map = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68598__$1,new cljs.core.Keyword(null,"map","map",1371690461));
var style = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68598__$1,new cljs.core.Keyword(null,"style","style",-496642736));
var at_media = cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("garden.stylesheet","at-media");
var at_keyframes = cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("garden.stylesheet","at-keyframes");
var map__68599 = cljs_css_modules.macro.process_style(id,item);
var map__68599__$1 = cljs.core.__destructure_map(map__68599);
var item__$1 = map__68599__$1;
var selector = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68599__$1,new cljs.core.Keyword(null,"selector","selector",762528866));
var garden_style = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68599__$1,new cljs.core.Keyword(null,"garden-style","garden-style",334433186));
var nested_style = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68599__$1,new cljs.core.Keyword(null,"nested-style","nested-style",2061569038));
var type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68599__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68599__$1,new cljs.core.Keyword(null,"params","params",710516235));
var style_object_value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68599__$1,new cljs.core.Keyword(null,"style-object-value","style-object-value",1882769999));
var G__68600 = type;
var G__68600__$1 = (((G__68600 instanceof cljs.core.Keyword))?G__68600.fqn:null);
switch (G__68600__$1) {
case "class":
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"map","map",1371690461),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(map,new cljs.core.Keyword(null,"key","key",-1516042587).cljs$core$IFn$_invoke$arity$1(selector),new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(selector)),new cljs.core.Keyword(null,"style","style",-496642736),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(style,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.cons(new cljs.core.Keyword(null,"localised","localised",-1733242051).cljs$core$IFn$_invoke$arity$1(selector),cljs.core.rest(garden_style))))], null);

break;
case "at-keyframe":
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"map","map",1371690461),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(map,new cljs.core.Keyword(null,"key","key",-1516042587).cljs$core$IFn$_invoke$arity$1(selector),new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(selector)),new cljs.core.Keyword(null,"style","style",-496642736),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(style,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [at_keyframes,new cljs.core.Keyword(null,"localised","localised",-1733242051).cljs$core$IFn$_invoke$arity$1(selector)], null),garden_style))], null);

break;
case "keyframe":
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"map","map",1371690461),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(map,new cljs.core.Keyword(null,"key","key",-1516042587).cljs$core$IFn$_invoke$arity$1(selector),new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(selector)),new cljs.core.Keyword(null,"style","style",-496642736),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(style,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [at_keyframes,new cljs.core.Keyword(null,"localised","localised",-1733242051).cljs$core$IFn$_invoke$arity$1(selector)], null),cljs.core.rest(garden_style)))], null);

break;
case "media":
var map__68601 = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs_css_modules.macro.create_garden_style,id),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"map","map",1371690461),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"style","style",-496642736),cljs.core.PersistentVector.EMPTY], null),nested_style);
var map__68601__$1 = cljs.core.__destructure_map(map__68601);
var s = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68601__$1,new cljs.core.Keyword(null,"style","style",-496642736));
var m = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68601__$1,new cljs.core.Keyword(null,"map","map",1371690461));
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"map","map",1371690461),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([map,m], 0)),new cljs.core.Keyword(null,"style","style",-496642736),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(style,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic((new cljs.core.List(null,at_media,null,(1),null)),(new cljs.core.List(null,params,null,(1),null)),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(new cljs.core.List(null,s,null,(1),null))], 0)))))], null);

break;
case "not-localised":
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"map","map",1371690461),map,new cljs.core.Keyword(null,"style","style",-496642736),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(style,garden_style)], null);

break;
default:
return acc;

}
});

//# sourceMappingURL=cljs_css_modules.macro.js.map
