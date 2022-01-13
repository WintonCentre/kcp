goog.provide('cljs_css_modules.macro');
/**
 * Take the &env from a macro, and tell whether we are expanding into cljs.
 */
cljs_css_modules.macro.cljs_env_QMARK_ = (function cljs_css_modules$macro$cljs_env_QMARK_(env){
return cljs.core.boolean$(new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(env));
});
cljs_css_modules.macro.selectors_to_localise = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"id","id",-1388402092),new cljs.core.Keyword(null,"class","class",-2030961996),new cljs.core.Keyword(null,"regexp","regexp",-541372782),/\.([^#.:\[\s]+)(.*)/,new cljs.core.Keyword(null,"localise-fn","localise-fn",-375044382),(function (p1__82512_SHARP_){
return [".$1","--",cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__82512_SHARP_),"$2"].join('');
}),new cljs.core.Keyword(null,"name-template","name-template",1677383261),"$1",new cljs.core.Keyword(null,"value-template","value-template",10903298),"$1"], null),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"id","id",-1388402092),new cljs.core.Keyword(null,"keyframe","keyframe",1957083746),new cljs.core.Keyword(null,"regexp","regexp",-541372782),/@keyframes (.+)/,new cljs.core.Keyword(null,"localise-fn","localise-fn",-375044382),(function (p1__82513_SHARP_){
return ["$1--",cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__82513_SHARP_)].join('');
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
cljs_css_modules.macro.localise_selector = (function cljs_css_modules$macro$localise_selector(id,selector,p__82514){
var map__82515 = p__82514;
var map__82515__$1 = cljs.core.__destructure_map(map__82515);
var regexp = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82515__$1,new cljs.core.Keyword(null,"regexp","regexp",-541372782));
var localise_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82515__$1,new cljs.core.Keyword(null,"localise-fn","localise-fn",-375044382));
return clojure.string.replace(selector,regexp,(localise_fn.cljs$core$IFn$_invoke$arity$1 ? localise_fn.cljs$core$IFn$_invoke$arity$1(id) : localise_fn.call(null,id)));
});
/**
 * Return the key to use to retrieve the actual selector value
 */
cljs_css_modules.macro.get_selector_key = (function cljs_css_modules$macro$get_selector_key(selector,p__82516){
var map__82517 = p__82516;
var map__82517__$1 = cljs.core.__destructure_map(map__82517);
var regexp = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82517__$1,new cljs.core.Keyword(null,"regexp","regexp",-541372782));
var name_template = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82517__$1,new cljs.core.Keyword(null,"name-template","name-template",1677383261));
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(clojure.string.replace(selector,regexp,name_template));
});
/**
 * Return the actual selector value
 */
cljs_css_modules.macro.get_selector_value = (function cljs_css_modules$macro$get_selector_value(selector,p__82518){
var map__82519 = p__82518;
var map__82519__$1 = cljs.core.__destructure_map(map__82519);
var regexp = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82519__$1,new cljs.core.Keyword(null,"regexp","regexp",-541372782));
var value_template = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82519__$1,new cljs.core.Keyword(null,"value-template","value-template",10903298));
return cljs.core.name(clojure.string.replace(selector,regexp,value_template));
});
cljs_css_modules.macro.is_media_QMARK_ = (function cljs_css_modules$macro$is_media_QMARK_(p__82520){
var vec__82521 = p__82520;
var seq__82522 = cljs.core.seq(vec__82521);
var first__82523 = cljs.core.first(seq__82522);
var seq__82522__$1 = cljs.core.next(seq__82522);
var first = first__82523;
var rest = seq__82522__$1;
var style = vec__82521;
return ((cljs.core.list_QMARK_(style)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(first,new cljs.core.Symbol(null,"at-media","at-media",494073870,null))));
});
cljs_css_modules.macro.is_keyframe_QMARK_ = (function cljs_css_modules$macro$is_keyframe_QMARK_(p__82524){
var vec__82525 = p__82524;
var seq__82526 = cljs.core.seq(vec__82525);
var first__82527 = cljs.core.first(seq__82526);
var seq__82526__$1 = cljs.core.next(seq__82526);
var first = first__82527;
var rest = seq__82526__$1;
var style = vec__82525;
return ((cljs.core.list_QMARK_(style)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(first,new cljs.core.Symbol(null,"at-keyframes","at-keyframes",-838208839,null))));
});
cljs_css_modules.macro.process_style = (function cljs_css_modules$macro$process_style(id,p__82528){
var vec__82529 = p__82528;
var seq__82530 = cljs.core.seq(vec__82529);
var first__82531 = cljs.core.first(seq__82530);
var seq__82530__$1 = cljs.core.next(seq__82530);
var fst = first__82531;
var rest = seq__82530__$1;
var style = vec__82529;
if(cljs_css_modules.macro.is_keyframe_QMARK_(style)){
var vec__82532 = style;
var seq__82533 = cljs.core.seq(vec__82532);
var first__82534 = cljs.core.first(seq__82533);
var seq__82533__$1 = cljs.core.next(seq__82533);
var symbol = first__82534;
var first__82534__$1 = cljs.core.first(seq__82533__$1);
var seq__82533__$2 = cljs.core.next(seq__82533__$1);
var name = first__82534__$1;
var style__$1 = seq__82533__$2;
var localised_name = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(name),"--",cljs.core.str.cljs$core$IFn$_invoke$arity$1(id)].join('');
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"at-keyframe","at-keyframe",1294985583),new cljs.core.Keyword(null,"garden-style","garden-style",334433186),style__$1,new cljs.core.Keyword(null,"selector","selector",762528866),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"original","original",-445386197),name,new cljs.core.Keyword(null,"localised","localised",-1733242051),localised_name,new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(name),new cljs.core.Keyword(null,"value","value",305978217),localised_name], null)], null);
} else {
if(cljs_css_modules.macro.is_media_QMARK_(style)){
var vec__82535 = style;
var seq__82536 = cljs.core.seq(vec__82535);
var first__82537 = cljs.core.first(seq__82536);
var seq__82536__$1 = cljs.core.next(seq__82536);
var symbol = first__82537;
var first__82537__$1 = cljs.core.first(seq__82536__$1);
var seq__82536__$2 = cljs.core.next(seq__82536__$1);
var params = first__82537__$1;
var style__$1 = seq__82536__$2;
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
cljs_css_modules.macro.create_garden_style = (function cljs_css_modules$macro$create_garden_style(id,p__82538,item){
var map__82539 = p__82538;
var map__82539__$1 = cljs.core.__destructure_map(map__82539);
var acc = map__82539__$1;
var map = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82539__$1,new cljs.core.Keyword(null,"map","map",1371690461));
var style = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82539__$1,new cljs.core.Keyword(null,"style","style",-496642736));
var at_media = cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("garden.stylesheet","at-media");
var at_keyframes = cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("garden.stylesheet","at-keyframes");
var map__82540 = cljs_css_modules.macro.process_style(id,item);
var map__82540__$1 = cljs.core.__destructure_map(map__82540);
var item__$1 = map__82540__$1;
var selector = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82540__$1,new cljs.core.Keyword(null,"selector","selector",762528866));
var garden_style = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82540__$1,new cljs.core.Keyword(null,"garden-style","garden-style",334433186));
var nested_style = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82540__$1,new cljs.core.Keyword(null,"nested-style","nested-style",2061569038));
var type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82540__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82540__$1,new cljs.core.Keyword(null,"params","params",710516235));
var style_object_value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82540__$1,new cljs.core.Keyword(null,"style-object-value","style-object-value",1882769999));
var G__82541 = type;
var G__82541__$1 = (((G__82541 instanceof cljs.core.Keyword))?G__82541.fqn:null);
switch (G__82541__$1) {
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
var map__82542 = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs_css_modules.macro.create_garden_style,id),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"map","map",1371690461),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"style","style",-496642736),cljs.core.PersistentVector.EMPTY], null),nested_style);
var map__82542__$1 = cljs.core.__destructure_map(map__82542);
var s = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82542__$1,new cljs.core.Keyword(null,"style","style",-496642736));
var m = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82542__$1,new cljs.core.Keyword(null,"map","map",1371690461));
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
