goog.provide('transplants.numeric_input');
var module$node_modules$react_bootstrap$cjs$index=shadow.js.require("module$node_modules$react_bootstrap$cjs$index", {});
transplants.numeric_input.error_QMARK_ = (function transplants$numeric_input$error_QMARK_(value){
var or__4253__auto__ = (value == null);
if(or__4253__auto__){
return or__4253__auto__;
} else {
var or__4253__auto____$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("",value);
if(or__4253__auto____$1){
return or__4253__auto____$1;
} else {
return isNaN(value);
}
}
});
/**
 * convert str to num or to ##NaN if not possible
 */
transplants.numeric_input.str_to_num = (function transplants$numeric_input$str_to_num(s){
return parseFloat(s);
});
transplants.numeric_input.epsilon = 1.0E-8;
transplants.numeric_input.near_integer_QMARK_ = (function transplants$numeric_input$near_integer_QMARK_(n){
return (Math.abs((n - Math.round(n))) < transplants.numeric_input.epsilon);
});
transplants.numeric_input.to_dps = (function transplants$numeric_input$to_dps(n,dps){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((0),dps)){
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(Math.round(n));
} else {
return (new Number(n)).toFixed(dps);

}
});
transplants.numeric_input.num_to_str = (function transplants$numeric_input$num_to_str(var_args){
var G__67795 = arguments.length;
switch (G__67795) {
case 1:
return transplants.numeric_input.num_to_str.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return transplants.numeric_input.num_to_str.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(transplants.numeric_input.num_to_str.cljs$core$IFn$_invoke$arity$1 = (function (n){
return transplants.numeric_input.num_to_str.cljs$core$IFn$_invoke$arity$2(n,(1));
}));

(transplants.numeric_input.num_to_str.cljs$core$IFn$_invoke$arity$2 = (function (n,dps){
if(typeof n === 'string'){
return n;
} else {
if(cljs.core.truth_(isNaN(n))){
return "";
} else {
if(transplants.numeric_input.near_integer_QMARK_(n)){
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(Math.round(n));
} else {
if(cljs.core.truth_(dps)){
return transplants.numeric_input.to_dps(n,dps);
} else {
return transplants.numeric_input.to_dps(n,(1));
}
}
}
}
}));

(transplants.numeric_input.num_to_str.cljs$lang$maxFixedArity = 2);

transplants.numeric_input.validate_input = (function transplants$numeric_input$validate_input(value,nmin,nmax,step){
var value__$1 = transplants.numeric_input.str_to_num(value);
var nmin__$1 = ((cljs.core.fn_QMARK_(nmin))?(nmin.cljs$core$IFn$_invoke$arity$0 ? nmin.cljs$core$IFn$_invoke$arity$0() : nmin.call(null)):nmin);
var nmax__$1 = ((cljs.core.fn_QMARK_(nmax))?(nmax.cljs$core$IFn$_invoke$arity$0 ? nmax.cljs$core$IFn$_invoke$arity$0() : nmax.call(null)):nmax);
var val_1 = (cljs.core.truth_(isNaN(value__$1))?(((step > (0)))?(nmin__$1 - (1)):(((step < (0)))?(nmax__$1 + (1)):nmin__$1)):value__$1);
var val_2 = (step + val_1);
var val_3 = (((val_2 < nmin__$1))?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(transplants.numeric_input.num_to_str.cljs$core$IFn$_invoke$arity$1(val_2)),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(val_2)].join(''):(((val_2 > nmax__$1))?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(transplants.numeric_input.num_to_str.cljs$core$IFn$_invoke$arity$1(val_2)),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(val_2)].join(''):val_2));
if(cljs.core.truth_(isNaN(value__$1))){
return nmin__$1;
} else {
return val_3;
}
});
transplants.numeric_input.handle_inc = (function transplants$numeric_input$handle_inc(value,on_change,nmin,nmax,dps,increment){
var v = transplants.numeric_input.validate_input(value,nmin,nmax,increment);
var G__67873 = transplants.numeric_input.num_to_str.cljs$core$IFn$_invoke$arity$2(v,dps);
return (on_change.cljs$core$IFn$_invoke$arity$1 ? on_change.cljs$core$IFn$_invoke$arity$1(G__67873) : on_change.call(null,G__67873));
});
transplants.numeric_input.handle_typed_input = (function transplants$numeric_input$handle_typed_input(value_f,nmin,nmax,dps,on_change,e){
var value = e.target.value;
if(cljs.core.truth_(cljs.core.re_matches(/\s*\d*\.?\d*\s*/,value))){
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(value,(value_f.cljs$core$IFn$_invoke$arity$0 ? value_f.cljs$core$IFn$_invoke$arity$0() : value_f.call(null)))){
var G__67882 = ((cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(transplants.numeric_input.str_to_num(value),transplants.numeric_input.str_to_num((value_f.cljs$core$IFn$_invoke$arity$0 ? value_f.cljs$core$IFn$_invoke$arity$0() : value_f.call(null)))))?transplants.numeric_input.num_to_str.cljs$core$IFn$_invoke$arity$2(transplants.numeric_input.validate_input(transplants.numeric_input.str_to_num(value),nmin,nmax,(0)),dps):value);
return (on_change.cljs$core$IFn$_invoke$arity$1 ? on_change.cljs$core$IFn$_invoke$arity$1(G__67882) : on_change.call(null,G__67882));
} else {
return null;
}
} else {
return (on_change.cljs$core$IFn$_invoke$arity$1 ? on_change.cljs$core$IFn$_invoke$arity$1("") : on_change.call(null,""));
}
});
transplants.numeric_input.update_value = (function transplants$numeric_input$update_value(value,nmin,nmax,dps,increment,on_change){
return transplants.numeric_input.handle_inc(value,on_change,nmin,nmax,dps,increment);
});
transplants.numeric_input.inc_dec_button = (function transplants$numeric_input$inc_dec_button(p__67900){
var map__67901 = p__67900;
var map__67901__$1 = cljs.core.__destructure_map(map__67901);
var value_f = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67901__$1,new cljs.core.Keyword(null,"value-f","value-f",-1842795108));
var on_change = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67901__$1,new cljs.core.Keyword(null,"on-change","on-change",-732046149));
var _min = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67901__$1,new cljs.core.Keyword(null,"_min","_min",394226897));
var max = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67901__$1,new cljs.core.Keyword(null,"max","max",61366548));
var nmin = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67901__$1,new cljs.core.Keyword(null,"nmin","nmin",1751665282));
var nmax = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67901__$1,new cljs.core.Keyword(null,"nmax","nmax",608994404));
var dps = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67901__$1,new cljs.core.Keyword(null,"dps","dps",1756250620));
var increment = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67901__$1,new cljs.core.Keyword(null,"increment","increment",-1558831484));
var value = transplants.numeric_input.str_to_num((value_f.cljs$core$IFn$_invoke$arity$0 ? value_f.cljs$core$IFn$_invoke$arity$0() : value_f.call(null)));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class-name","class-name",945142584),"incdec"], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Button,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"class-name","class-name",945142584),[(((increment > (0)))?"right":"left")," btn btn-default "].join(''),new cljs.core.Keyword(null,"variant","variant",-424354234),((((value_f.cljs$core$IFn$_invoke$arity$0 ? value_f.cljs$core$IFn$_invoke$arity$0() : value_f.call(null)) == null))?"outline-secondary":"secondary"),new cljs.core.Keyword(null,"aria-hidden","aria-hidden",399337029),"true",new cljs.core.Keyword(null,"disabled","disabled",-1529784218),(((increment > (0)))?(((value >= transplants.numeric_input.str_to_num(((cljs.core.fn_QMARK_(max))?(max.cljs$core$IFn$_invoke$arity$0 ? max.cljs$core$IFn$_invoke$arity$0() : max.call(null)):max))))?"disabled":null):(((value <= nmin))?"disabled":null)),new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return transplants.numeric_input.update_value(value,nmin,nmax,dps,increment,on_change);
})], null),(((increment > (0)))?"+":"\u2013")], null)], null);
});
transplants.numeric_input.numeric_input = (function transplants$numeric_input$numeric_input(p__67924){
var map__67925 = p__67924;
var map__67925__$1 = cljs.core.__destructure_map(map__67925);
var props = map__67925__$1;
var key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67925__$1,new cljs.core.Keyword(null,"key","key",-1516042587));
var _id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67925__$1,new cljs.core.Keyword(null,"_id","_id",-789960287));
var value_f = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67925__$1,new cljs.core.Keyword(null,"value-f","value-f",-1842795108));
var on_change = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67925__$1,new cljs.core.Keyword(null,"on-change","on-change",-732046149));
var min = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67925__$1,new cljs.core.Keyword(null,"min","min",444991522));
var max = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67925__$1,new cljs.core.Keyword(null,"max","max",61366548));
var dps = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67925__$1,new cljs.core.Keyword(null,"dps","dps",1756250620));
var units = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67925__$1,new cljs.core.Keyword(null,"units","units",-533089095));
var vec__67928 = clojure.string.split.cljs$core$IFn$_invoke$arity$2((value_f.cljs$core$IFn$_invoke$arity$0 ? value_f.cljs$core$IFn$_invoke$arity$0() : value_f.call(null)),/:/);
var good = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67928,(0),null);
var bad = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67928,(1),null);
var value = transplants.numeric_input.str_to_num(good);
var nmin = transplants.numeric_input.str_to_num(((cljs.core.fn_QMARK_(min))?(min.cljs$core$IFn$_invoke$arity$0 ? min.cljs$core$IFn$_invoke$arity$0() : min.call(null)):min));
var nmax = transplants.numeric_input.str_to_num(((cljs.core.fn_QMARK_(max))?(max.cljs$core$IFn$_invoke$arity$0 ? max.cljs$core$IFn$_invoke$arity$0() : max.call(null)):max));
var mutate = (function (e){
return transplants.numeric_input.handle_typed_input(value_f,min,max,dps,on_change,e);
});
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Row,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"align-items","align-items",-267946462),"baseline"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Col,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"xs","xs",649443341),(9)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"class","class",-2030961996),"numeric-input",new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"min-width","min-width",1926193728),"100px",new cljs.core.Keyword(null,"width","width",-384071477),"max-content",new cljs.core.Keyword(null,"tab-index","tab-index",895755393),(1),new cljs.core.Keyword(null,"selectable","selectable",370587038),true,new cljs.core.Keyword(null,"border","border",1444987323),["3px solid ",((((value_f.cljs$core$IFn$_invoke$arity$0 ? value_f.cljs$core$IFn$_invoke$arity$0() : value_f.call(null)) == null))?"#ff8888":"#CCCCCC")].join(''),new cljs.core.Keyword(null,"border-radius","border-radius",419594011),(5),new cljs.core.Keyword(null,"padding","padding",1660304693),(1)], null),new cljs.core.Keyword(null,"on-key-down","on-key-down",-1374733765),(function (p1__67914_SHARP_){
var key_code = p1__67914_SHARP_.nativeEvent.code;
if(cljs.core.truth_((function (){var fexpr__67938 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["ArrowUp",null,"ArrowDown",null], null), null);
return (fexpr__67938.cljs$core$IFn$_invoke$arity$1 ? fexpr__67938.cljs$core$IFn$_invoke$arity$1(key_code) : fexpr__67938.call(null,key_code));
})())){
p1__67914_SHARP_.preventDefault();
} else {
}

return transplants.numeric_input.update_value(value,nmin,nmax,dps,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("ArrowUp",key_code))?(1):((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("ArrowDown",key_code))?(-1):(0)
)),on_change);
})], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"display","display",242065432),"flex",new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),"row",new cljs.core.Keyword(null,"align-items","align-items",-267946462),"center"], null)], null),transplants.numeric_input.inc_dec_button(cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(props,new cljs.core.Keyword(null,"variant","variant",-424354234),"secondary",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"nmin","nmin",1751665282),nmin,new cljs.core.Keyword(null,"nmax","nmax",608994404),nmax,new cljs.core.Keyword(null,"dps","dps",1756250620),dps,new cljs.core.Keyword(null,"increment","increment",-1558831484),(- Math.pow((10),(- dps))),new cljs.core.Keyword(null,"value-f","value-f",-1842795108),value_f], 0))),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"type","type",1174270348),"text",new cljs.core.Keyword(null,"value","value",305978217),good,new cljs.core.Keyword(null,"id","id",-1388402092),(cljs.core.truth_(key)?[cljs.core.namespace(key),"-",cljs.core.name(key)].join(''):null),new cljs.core.Keyword(null,"on-change","on-change",-732046149),mutate,new cljs.core.Keyword(null,"style","style",-496642736),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"border-right","border-right",-668932860),new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.Keyword(null,"text-align","text-align",1786091845),new cljs.core.Keyword(null,"font-size","font-size",-1847940346),new cljs.core.Keyword(null,"background-color","background-color",570434026),new cljs.core.Keyword(null,"width","width",-384071477),new cljs.core.Keyword(null,"border-left","border-left",-1150760178),new cljs.core.Keyword(null,"padding","padding",1660304693),new cljs.core.Keyword(null,"border-top","border-top",-158897573),new cljs.core.Keyword(null,"height","height",1025178622),new cljs.core.Keyword(null,"border-bottom","border-bottom",2110948415)],["2px solid #ddd","#fff","center","16px",((((value_f.cljs$core$IFn$_invoke$arity$0 ? value_f.cljs$core$IFn$_invoke$arity$0() : value_f.call(null)) == null))?"#fff":(((bad == null))?transplants.rgb.secondary:transplants.rgb.danger)),"58px","2px solid #ddd","0 0 4px 0","0px solid #888","38px","0px solid #ddd"])], null)], null),transplants.numeric_input.inc_dec_button(cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(props,new cljs.core.Keyword(null,"nmin","nmin",1751665282),nmin,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"nmax","nmax",608994404),nmax,new cljs.core.Keyword(null,"dps","dps",1756250620),dps,new cljs.core.Keyword(null,"increment","increment",-1558831484),Math.pow((10),(- dps)),new cljs.core.Keyword(null,"value-f","value-f",-1842795108),value_f], 0)))], null)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Col,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class-name","class-name",945142584),"col-3 d-none d-lg-block"], null),(cljs.core.truth_(units)?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"color","color",1011675173),transplants.rgb.secondary], null)], null),units], null):null)], null)], null);
});

//# sourceMappingURL=transplants.numeric_input.js.map
