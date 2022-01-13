goog.provide('transplants.ui');
var module$node_modules$react_bootstrap$cjs$index=shadow.js.require("module$node_modules$react_bootstrap$cjs$index", {});
cljs.core.enable_console_print_BANG_();
/**
 * a react/bootstrap component adapter
 */
transplants.ui.container = reagent.core.adapt_react_class(module$node_modules$react_bootstrap$cjs$index.Container);
/**
 * a react/bootstrap component adapter
 */
transplants.ui.col = reagent.core.adapt_react_class(module$node_modules$react_bootstrap$cjs$index.Col);
/**
 * a react/bootstrap component adapter
 */
transplants.ui.row = reagent.core.adapt_react_class(module$node_modules$react_bootstrap$cjs$index.Row);
/**
 * a react/bootstrap component adapter
 */
transplants.ui.button = reagent.core.adapt_react_class(module$node_modules$react_bootstrap$cjs$index.Button);
/**
 * a react/bootstrap component adapter
 */
transplants.ui.tabs = reagent.core.adapt_react_class(module$node_modules$react_bootstrap$cjs$index.Tabs);
/**
 * a react/bootstrap component adapter
 */
transplants.ui.tab = reagent.core.adapt_react_class(module$node_modules$react_bootstrap$cjs$index.Tab);
/**
 * Remove information that should not appear on a DOM element
 * from a styles map.
 */
transplants.ui.svg_styles = (function transplants$ui$svg_styles(styles){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(styles,new cljs.core.Keyword(null,"label-fill","label-fill",1868368099)),new cljs.core.Keyword(null,"background-color","background-color",570434026)),new cljs.core.Keyword(null,"color","color",1011675173)),new cljs.core.Keyword(null,"long-label","long-label",1242973664));
});
/**
 * Return relative url for given route. Url can be used in HTML links. Note that k is a route name defined 
 * in the routes table.
 */
transplants.ui.href = (function transplants$ui$href(var_args){
var G__67950 = arguments.length;
switch (G__67950) {
case 1:
return transplants.ui.href.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return transplants.ui.href.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return transplants.ui.href.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(transplants.ui.href.cljs$core$IFn$_invoke$arity$1 = (function (k){
return transplants.ui.href.cljs$core$IFn$_invoke$arity$3(k,null,null);
}));

(transplants.ui.href.cljs$core$IFn$_invoke$arity$2 = (function (k,params){
return transplants.ui.href.cljs$core$IFn$_invoke$arity$3(k,params,null);
}));

(transplants.ui.href.cljs$core$IFn$_invoke$arity$3 = (function (k,params,query){
return reitit.frontend.easy.href.cljs$core$IFn$_invoke$arity$3(k,params,query);
}));

(transplants.ui.href.cljs$lang$maxFixedArity = 3);

/**
 * The page is loading
 */
transplants.ui.loading = (function transplants$ui$loading(){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"display","display",242065432),"flex",new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),"column",new cljs.core.Keyword(null,"justify-content","justify-content",-1990475787),"space-around"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h1","h1",-1896887462),"Loading"], null)], null);
});
/**
 * extract the single organ or if not single then nil from metadata
 */
transplants.ui.get_single_organ = (function transplants$ui$get_single_organ(mdata){
var organ_order = new cljs.core.Keyword(null,"organ-order","organ-order",-291569616).cljs$core$IFn$_invoke$arity$1(mdata);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(organ_order),(1))){
return cljs.core.first(organ_order);
} else {
return null;
}
});
/**
 * Straight out of the react-bootstrap example with reitit routing patched in.
 */
transplants.ui.navbar = (function transplants$ui$navbar(p__67951){
var map__67952 = p__67951;
var map__67952__$1 = cljs.core.__destructure_map(map__67952);
var home_url = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67952__$1,new cljs.core.Keyword(null,"home-url","home-url",1829796492));
var logo = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67952__$1,new cljs.core.Keyword(null,"logo","logo",1237980263));
var route = cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.subs","current-route","transplants.subs/current-route",1078262869)], null)));
var organ = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(route,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"path-params","path-params",-48130597),new cljs.core.Keyword(null,"organ","organ",-29862572)], null));
var mdata = cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.subs","mdata","transplants.subs/mdata",-3881910)], null)));
var single_organ = transplants.ui.get_single_organ(mdata);
var organ_centres = cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.subs","organ-centres","transplants.subs/organ-centres",-1211185339)], null)));
var temp__5751__auto__ = (function (){var or__4253__auto__ = single_organ;
if(cljs.core.truth_(or__4253__auto__)){
return or__4253__auto__;
} else {
return organ;
}
})();
if(cljs.core.truth_(temp__5751__auto__)){
var organ__$1 = temp__5751__auto__;
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Navbar,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"bg","bg",-206688421),"light",new cljs.core.Keyword(null,"expand","expand",595248157),"md",new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"border-bottom","border-bottom",2110948415),"1px solid black",new cljs.core.Keyword(null,"opacity","opacity",397153780),"1"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Navbar.Brand,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),home_url], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img","img",1442687358),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"src","src",-1651076051),logo,new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"height","height",1025178622),(40)], null),new cljs.core.Keyword(null,"alt","alt",-3214426),"Winton Centre"], null)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Nav.Link,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"font-size","font-size",-1847940346),"1em"], null),new cljs.core.Keyword(null,"organ","organ",-29862572),cljs.core.name(organ__$1),new cljs.core.Keyword(null,"href","href",-793805698),transplants.ui.href.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.views","organ","transplants.views/organ",-1567940572),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"organ","organ",-29862572),cljs.core.name(organ__$1)], null))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"font-size","font-size",-1847940346),"2em"], null)], null),(cljs.core.truth_(single_organ)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [single_organ,new cljs.core.Keyword(null,"label","label",1718410804)], null)))," Tool"].join(''):"Development Site")], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Navbar.Toggle,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"aria-controls","aria-controls",-1872379154),"basic-navbar-nav"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Navbar.Collapse,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),"basic-navbar-nav",new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin-left","margin-left",2015598377),(70)], null)], null),new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Nav,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"active-key","active-key",-2039404654),(cljs.core.truth_(organ__$1)?cljs.core.name(organ__$1):"home")], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Nav.Link,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"font-size","font-size",-1847940346),"1.4em"], null),new cljs.core.Keyword(null,"event-key","event-key",2089664830),new cljs.core.Keyword(null,"home","home",-74557309),new cljs.core.Keyword(null,"href","href",-793805698),transplants.ui.href.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword("transplants.views","home","transplants.views/home",381467539))], null),"Home"], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Nav.Link,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"font-size","font-size",-1847940346),"1.4em"], null),new cljs.core.Keyword(null,"event-key","event-key",2089664830),new cljs.core.Keyword(null,"about","about",1423892543),new cljs.core.Keyword(null,"href","href",-793805698),transplants.ui.href.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword("transplants.views","about","transplants.views/about",944477487))], null),"About"], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Nav.Link,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"font-size","font-size",-1847940346),"1.4em"], null),new cljs.core.Keyword(null,"event-key","event-key",2089664830),new cljs.core.Keyword(null,"legal","legal",302401964),new cljs.core.Keyword(null,"href","href",-793805698),transplants.ui.href.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword("transplants.views","legal","transplants.views/legal",-193936196))], null),"Legal"], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Nav.Link,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"font-size","font-size",-1847940346),"1.4em"], null),new cljs.core.Keyword(null,"event-key","event-key",2089664830),new cljs.core.Keyword(null,"pubs","pubs",-1082418941),new cljs.core.Keyword(null,"href","href",-793805698),transplants.ui.href.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword("transplants.views","pubs","transplants.views/pubs",1676154387))], null),"Publications"], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Nav.Link,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"font-size","font-size",-1847940346),"1.4em"], null),new cljs.core.Keyword(null,"event-key","event-key",2089664830),new cljs.core.Keyword(null,"tech","tech",-2100994563),new cljs.core.Keyword(null,"href","href",-793805698),transplants.ui.href.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword("transplants.views","tech","transplants.views/tech",521526541))], null),"Technical"], null),(cljs.core.truth_(organ_centres)?(function (){var temp__5753__auto__ = (organ__$1.cljs$core$IFn$_invoke$arity$1 ? organ__$1.cljs$core$IFn$_invoke$arity$1(organ_centres) : organ__$1.call(null,organ_centres));
if(cljs.core.truth_(temp__5753__auto__)){
var centres = temp__5753__auto__;
var tool = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.subs","current-route","transplants.subs/current-route",1078262869)], null))),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"path-params","path-params",-48130597),new cljs.core.Keyword(null,"tool","tool",-1298696470)], null));
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.NavDropdown,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"font-size","font-size",-1847940346),"1.4em"], null),new cljs.core.Keyword(null,"title","title",636505583),"Transplant Centres",new cljs.core.Keyword(null,"id","id",-1388402092),"basic-nav-dropdown"], null)], null),cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (centre){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.NavDropdown.Item,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"href","href",-793805698),(cljs.core.truth_(tool)?transplants.ui.href.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.views","organ-centre-tool","transplants.views/organ-centre-tool",-538145031),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"organ","organ",-29862572),cljs.core.name(single_organ),new cljs.core.Keyword(null,"centre","centre",-948091970),cljs.core.name(new cljs.core.Keyword(null,"key","key",-1516042587).cljs$core$IFn$_invoke$arity$1(centre)),new cljs.core.Keyword(null,"tool","tool",-1298696470),cljs.core.name(tool)], null)):transplants.ui.href.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.views","organ-centre-tool","transplants.views/organ-centre-tool",-538145031),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"organ","organ",-29862572),cljs.core.name(single_organ),new cljs.core.Keyword(null,"centre","centre",-948091970),cljs.core.name(new cljs.core.Keyword(null,"key","key",-1516042587).cljs$core$IFn$_invoke$arity$1(centre)),new cljs.core.Keyword(null,"tool","tool",-1298696470),"waiting"], null))),new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.name(new cljs.core.Keyword(null,"key","key",-1516042587).cljs$core$IFn$_invoke$arity$1(centre))], null),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(centre)], null);
}),centres));
} else {
return null;
}
})():null)], null)], null)], null);
} else {
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.ui.loading], null);
}
});
/**
 * Site footer. 
 * todo: Needs to be made configurable.
 */
transplants.ui.footer = (function transplants$ui$footer(){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.footer","div.footer",1103856744),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"width","width",-384071477),"100%",new cljs.core.Keyword(null,"height","height",1025178622),"80px",new cljs.core.Keyword(null,"background-color","background-color",570434026),"black",new cljs.core.Keyword(null,"color","color",1011675173),"white",new cljs.core.Keyword(null,"align-items","align-items",-267946462),"center",new cljs.core.Keyword(null,"justify-content","justify-content",-1990475787),"center"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"margin","margin",-995903681),"20px",new cljs.core.Keyword(null,"display","display",242065432),"flex",new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),"row",new cljs.core.Keyword(null,"align-items","align-items",-267946462),"center"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img","img",1442687358),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"src","src",-1651076051),"assets/crest.png",new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"height","height",1025178622),(40),new cljs.core.Keyword(null,"margin-right","margin-right",809689658),(20)], null),new cljs.core.Keyword(null,"alt","alt",-3214426),"University of Cambridge Crest"], null)], null),"Winton Centre"], null)], null);
});
/**
 * The root of the component tree which is mounted on the main app html element
 */
transplants.ui.root_component = (function transplants$ui$root_component(p__67953){
var map__67954 = p__67953;
var map__67954__$1 = cljs.core.__destructure_map(map__67954);
var router = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67954__$1,new cljs.core.Keyword(null,"router","router",1091916230));
var subscribe_current_route = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67954__$1,new cljs.core.Keyword(null,"subscribe-current-route","subscribe-current-route",1017696218));
var current_route = cljs.core.deref((subscribe_current_route.cljs$core$IFn$_invoke$arity$0 ? subscribe_current_route.cljs$core$IFn$_invoke$arity$0() : subscribe_current_route.call(null)));
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"display","display",242065432),new cljs.core.Keyword(null,"flex","flex",-1425124628),new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),"column-reverse"], null)], null),(cljs.core.truth_(current_route)?new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"margin-top","margin-top",392161226),"0px",new cljs.core.Keyword(null,"padding-top","padding-top",1929675955),(0)], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"view","view",1247994814).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(current_route))], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.ui.footer], null)], null):null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.ui.navbar,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"router","router",1091916230),router,new cljs.core.Keyword(null,"current-route","current-route",2067529448),current_route,new cljs.core.Keyword(null,"home-url","home-url",1829796492),"/",new cljs.core.Keyword(null,"logo","logo",1237980263),"/assets/crest.png",new cljs.core.Keyword(null,"tool-name","tool-name",613742581),"Lung Transplants"], null)], null),transplants.bsio.modal((function (){
return re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.subs","modal-data","transplants.subs/modal-data",895874517)], null));
}))], null);
});
/**
 * Render an array of cards
 */
transplants.ui.card_page = (function transplants$ui$card_page(var_args){
var args__4870__auto__ = [];
var len__4864__auto___67973 = arguments.length;
var i__4865__auto___67974 = (0);
while(true){
if((i__4865__auto___67974 < len__4864__auto___67973)){
args__4870__auto__.push((arguments[i__4865__auto___67974]));

var G__67975 = (i__4865__auto___67974 + (1));
i__4865__auto___67974 = G__67975;
continue;
} else {
}
break;
}

var argseq__4871__auto__ = ((((1) < args__4870__auto__.length))?(new cljs.core.IndexedSeq(args__4870__auto__.slice((1)),(0),null)):null);
return transplants.ui.card_page.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4871__auto__);
});

(transplants.ui.card_page.cljs$core$IFn$_invoke$arity$variadic = (function (title,children){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.ui.container,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),(1),new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"margin-top","margin-top",392161226),(40),new cljs.core.Keyword(null,"min-height","min-height",398480837),"calc(100vh - 144px"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.ui.row,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.ui.col,(((cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.subs","window-width","transplants.subs/window-width",-273620318)], null))) > (441)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"color","color",1011675173),"#355",new cljs.core.Keyword(null,"margin-bottom","margin-bottom",388334941),(30)], null)], null),title], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h5","h5",-1829156625),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"color","color",1011675173),"#355",new cljs.core.Keyword(null,"margin-bottom","margin-bottom",388334941),(20)], null)], null),title], null)),cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"<>","<>",1280186386)], null),cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (k,c){
return c;
}),children))], null)], null)], null);
}));

(transplants.ui.card_page.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(transplants.ui.card_page.cljs$lang$applyTo = (function (seq67955){
var G__67956 = cljs.core.first(seq67955);
var seq67955__$1 = cljs.core.next(seq67955);
var self__4851__auto__ = this;
return self__4851__auto__.cljs$core$IFn$_invoke$arity$variadic(G__67956,seq67955__$1);
}));

/**
 * Create buttons for each transplant tool
 */
transplants.ui.tool_buttons = (function transplants$ui$tool_buttons(p__67957){
var map__67958 = p__67957;
var map__67958__$1 = cljs.core.__destructure_map(map__67958);
var key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67958__$1,new cljs.core.Keyword(null,"key","key",-1516042587));
var label = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67958__$1,new cljs.core.Keyword(null,"label","label",1718410804));
var organ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67958__$1,new cljs.core.Keyword(null,"organ","organ",-29862572));
var centre = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67958__$1,new cljs.core.Keyword(null,"centre","centre",-948091970));
var tool = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67958__$1,new cljs.core.Keyword(null,"tool","tool",-1298696470));
var active_tool = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67958__$1,new cljs.core.Keyword(null,"active-tool","active-tool",-2103156718));
var button_type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67958__$1,new cljs.core.Keyword(null,"button-type","button-type",646960816));
var active = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.name(tool),active_tool);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.ui.button,new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"id","id",-1388402092),[cljs.core.name(organ),"-",cljs.core.name(centre),"-",cljs.core.name(key)].join(''),new cljs.core.Keyword(null,"variant","variant",-424354234),((active)?button_type:["outline-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(button_type)].join('')),new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"margin-bottom","margin-bottom",388334941),(2),new cljs.core.Keyword(null,"margin-right","margin-right",809689658),(0)], null),new cljs.core.Keyword(null,"active","active",1895962068),active,new cljs.core.Keyword(null,"key","key",-1516042587),key,new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.events","navigate","transplants.events/navigate",-1105685568),new cljs.core.Keyword("transplants.views","organ-centre-tool","transplants.views/organ-centre-tool",-538145031),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"organ","organ",-29862572),organ,new cljs.core.Keyword(null,"centre","centre",-948091970),centre,new cljs.core.Keyword(null,"tool","tool",-1298696470),tool], null)], null));
})], null),label], null);
});
/**
 * Tool menu prefix rubric.
 */
transplants.ui.background_link = (function transplants$ui$background_link(organ,_centre,tool){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),((cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(tool,"guidance"))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),"For more information that will be helpful to patients, follow the link to useful information."], null):null)," There is also a ",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a.centre-header-link","a.centre-header-link",-1863957224),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"target","target",253001721),"_blank",new cljs.core.Keyword(null,"href","href",-793805698),[cljs.core.name(organ),".pdf"].join('')], null),"PDF download"], null)," which explains the technical details of the tool."], null);
});
/**
 * Render a group of tool selection buttons.
 * tools is a vector of tool keys offered for this organ
 */
transplants.ui.tools_menu = (function transplants$ui$tools_menu(tools,include_guidance_QMARK_,organ,centre_name,orientation){
var active_tool = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.subs","current-route","transplants.subs/current-route",1078262869)], null))),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"path-params","path-params",-48130597),new cljs.core.Keyword(null,"tool","tool",-1298696470)], null));
var organ_name = cljs.core.name(organ);
var mdata = cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.subs","mdata","transplants.subs/mdata",-3881910)], null)));
var menu_data = cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (tool){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(tool,new cljs.core.Keyword(null,"guidance","guidance",-1324762868)))?new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"Useful information",new cljs.core.Keyword(null,"button-type","button-type",646960816),"usefulinfo"], null):cljs.core.select_keys(transplants.utils.get_tool_meta(mdata,organ_name,tool),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1718410804),new cljs.core.Keyword(null,"button-type","button-type",646960816)], null))),new cljs.core.Keyword(null,"organ","organ",-29862572),organ_name,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"tool","tool",-1298696470),tool,new cljs.core.Keyword(null,"centre","centre",-948091970),centre_name,new cljs.core.Keyword(null,"active-tool","active-tool",-2103156718),active_tool,new cljs.core.Keyword(null,"key","key",-1516042587),[organ_name,"-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(tool)].join(''),new cljs.core.Keyword(null,"mdata","mdata",-2098476679),mdata], 0));
}),(cljs.core.truth_(include_guidance_QMARK_)?tools:cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p1__67959_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"guidance","guidance",-1324762868),p1__67959_SHARP_);
}),tools)));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"<>","<>",1280186386),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.ui.row,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.ui.col,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"xs","xs",649443341),(12),new cljs.core.Keyword(null,"sm","sm",-1402575065),(8)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"padding-right","padding-right",-1250249681),(20)], null)], null),"Choose a tool:"], null),cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (i,group){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),i], null),cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.ButtonGroup,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",-384071477),"auto"], null)], null),orientation], 0))], null),cljs.core.map.cljs$core$IFn$_invoke$arity$2(transplants.ui.tool_buttons,group))], null);
}),cljs.core.partition_by.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"button-type","button-type",646960816),cljs.core.butlast(menu_data)))], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.ui.col,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"xs","xs",649443341),(12),new cljs.core.Keyword(null,"sm","sm",-1402575065),(4)], null),transplants.ui.tool_buttons(cljs.core.last(menu_data)),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.ui.background_link,organ_name,centre_name,active_tool], null)], null)], null)], null);
});
/**
 * Render a desktop compatible card containing hospital-local links to tools
 */
transplants.ui.nav_card = (function transplants$ui$nav_card(p__67960){
var map__67961 = p__67960;
var map__67961__$1 = cljs.core.__destructure_map(map__67961);
var organ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67961__$1,new cljs.core.Keyword(null,"organ","organ",-29862572));
var centre = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67961__$1,new cljs.core.Keyword(null,"centre","centre",-948091970));
var hospital = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67961__$1,new cljs.core.Keyword(null,"hospital","hospital",871548384));
var _link = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67961__$1,new cljs.core.Keyword(null,"_link","_link",-124523836));
var width = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67961__$1,new cljs.core.Keyword(null,"width","width",-384071477));
var tools = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67961__$1,new cljs.core.Keyword(null,"tools","tools",-1241731990));
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Card,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"max-width","max-width",-1939924051),width,new cljs.core.Keyword(null,"min-width","min-width",1926193728),width,new cljs.core.Keyword(null,"margin-bottom","margin-bottom",388334941),(10),new cljs.core.Keyword(null,"box-shadow","box-shadow",1600206755),"1px 1px #888888"], null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Card.Body,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"display","display",242065432),"flex",new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),"column",new cljs.core.Keyword(null,"justify-content","justify-content",-1990475787),"space-around",new cljs.core.Keyword(null,"padding-top","padding-top",1929675955),(20)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Card.Title,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"font-size","font-size",-1847940346),"1.2 rem"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"href","href",-793805698),"#",new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.events","navigate","transplants.events/navigate",-1105685568),new cljs.core.Keyword("transplants.views","organ-centre-tool","transplants.views/organ-centre-tool",-538145031),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"organ","organ",-29862572),organ,new cljs.core.Keyword(null,"centre","centre",-948091970),centre,new cljs.core.Keyword(null,"tool","tool",-1298696470),cljs.core.first(tools)], null)], null));
})], null),hospital], null)], null),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.ui.tools_menu,tools,false,organ,centre,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"vertical","vertical",718696748),true], null)], null)], null)], null);
});
/**
 * Render a mobile compatible card - actually a list item - containing hospital-local links to tools
 */
transplants.ui.phone_card = (function transplants$ui$phone_card(p__67962){
var map__67963 = p__67962;
var map__67963__$1 = cljs.core.__destructure_map(map__67963);
var hospital = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67963__$1,new cljs.core.Keyword(null,"hospital","hospital",871548384));
var _link = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67963__$1,new cljs.core.Keyword(null,"_link","_link",-124523836));
var organ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67963__$1,new cljs.core.Keyword(null,"organ","organ",-29862572));
var centre = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67963__$1,new cljs.core.Keyword(null,"centre","centre",-948091970));
var tools = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67963__$1,new cljs.core.Keyword(null,"tools","tools",-1241731990));
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.ListGroup.Item,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"action","action",-811238024),true,new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.events","navigate","transplants.events/navigate",-1105685568),new cljs.core.Keyword("transplants.views","organ-centre-tool","transplants.views/organ-centre-tool",-538145031),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"organ","organ",-29862572),organ,new cljs.core.Keyword(null,"centre","centre",-948091970),centre,new cljs.core.Keyword(null,"tool","tool",-1298696470),cljs.core.first(tools)], null)], null));
})], null),hospital], null);
});
/**
 * A generic page component, rendering a title and the page's children
 */
transplants.ui.page = (function transplants$ui$page(var_args){
var args__4870__auto__ = [];
var len__4864__auto___67977 = arguments.length;
var i__4865__auto___67978 = (0);
while(true){
if((i__4865__auto___67978 < len__4864__auto___67977)){
args__4870__auto__.push((arguments[i__4865__auto___67978]));

var G__67979 = (i__4865__auto___67978 + (1));
i__4865__auto___67978 = G__67979;
continue;
} else {
}
break;
}

var argseq__4871__auto__ = ((((1) < args__4870__auto__.length))?(new cljs.core.IndexedSeq(args__4870__auto__.slice((1)),(0),null)):null);
return transplants.ui.page.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4871__auto__);
});

(transplants.ui.page.cljs$core$IFn$_invoke$arity$variadic = (function (title,children){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.ui.container,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"key","key",-1516042587),(1),new cljs.core.Keyword(null,"fluid","fluid",-1823657759),"xl",new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"min-height","min-height",398480837),"calc(100vh - 165px",new cljs.core.Keyword(null,"background-color","background-color",570434026),"#ffffffbb",new cljs.core.Keyword(null,"max-width","max-width",-1939924051),(2000),new cljs.core.Keyword(null,"margin-bottom","margin-bottom",388334941),(20)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.ui.row,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.ui.col,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h1","h1",-1896887462),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"margin-top","margin-top",392161226),(20),new cljs.core.Keyword(null,"font-size","font-size",-1847940346),"2em"], null)], null),title], null),cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"<>","<>",1280186386)], null),cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (k,c){
return c;
}),children))], null)], null)], null);
}));

(transplants.ui.page.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(transplants.ui.page.cljs$lang$applyTo = (function (seq67964){
var G__67965 = cljs.core.first(seq67964);
var seq67964__$1 = cljs.core.next(seq67964);
var self__4851__auto__ = this;
return self__4851__auto__.cljs$core$IFn$_invoke$arity$variadic(G__67965,seq67964__$1);
}));

/**
 * A generic page component, rendering a title and the page's children
 */
transplants.ui.decorated_page = (function transplants$ui$decorated_page(var_args){
var args__4870__auto__ = [];
var len__4864__auto___67981 = arguments.length;
var i__4865__auto___67982 = (0);
while(true){
if((i__4865__auto___67982 < len__4864__auto___67981)){
args__4870__auto__.push((arguments[i__4865__auto___67982]));

var G__67983 = (i__4865__auto___67982 + (1));
i__4865__auto___67982 = G__67983;
continue;
} else {
}
break;
}

var argseq__4871__auto__ = ((((2) < args__4870__auto__.length))?(new cljs.core.IndexedSeq(args__4870__auto__.slice((2)),(0),null)):null);
return transplants.ui.decorated_page.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__4871__auto__);
});

(transplants.ui.decorated_page.cljs$core$IFn$_invoke$arity$variadic = (function (decoration,title,children){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.ui.container,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"key","key",-1516042587),(1),new cljs.core.Keyword(null,"fluid","fluid",-1823657759),"xl",new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"min-height","min-height",398480837),"calc(100vh - 165px",new cljs.core.Keyword(null,"background-color","background-color",570434026),"#ffffffbb",new cljs.core.Keyword(null,"max-width","max-width",-1939924051),(2000),new cljs.core.Keyword(null,"margin-bottom","margin-bottom",388334941),(20)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.ui.row,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.ui.col,decoration,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h1","h1",-1896887462),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"margin-top","margin-top",392161226),(20),new cljs.core.Keyword(null,"font-size","font-size",-1847940346),"2em"], null)], null),title], null),cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"<>","<>",1280186386)], null),cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (k,c){
return c;
}),children))], null)], null)], null);
}));

(transplants.ui.decorated_page.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(transplants.ui.decorated_page.cljs$lang$applyTo = (function (seq67966){
var G__67967 = cljs.core.first(seq67966);
var seq67966__$1 = cljs.core.next(seq67966);
var G__67968 = cljs.core.first(seq67966__$1);
var seq67966__$2 = cljs.core.next(seq67966__$1);
var self__4851__auto__ = this;
return self__4851__auto__.cljs$core$IFn$_invoke$arity$variadic(G__67967,G__67968,seq67966__$2);
}));

/**
 * Screens of this size or smaller are rendered with mobile oriented views.
 */
transplants.ui.mobile_break = (1200);
/**
 * A single card describing a centre
 */
transplants.ui.centre_card = (function transplants$ui$centre_card(_mobile,params){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.ui.phone_card,params], null);
});
/**
 * A card deck where the cards are simple list items in mobile view, but true cards in desktop view.
 */
transplants.ui.centre_card_deck = (function transplants$ui$centre_card_deck(mobile){
if(cljs.core.truth_(mobile)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.ListGroup], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.CardDeck], null);
}
});
/**
 * wrapper for access open-icon access
 */
transplants.ui.open_icon = (function transplants$ui$open_icon(var_args){
var G__67970 = arguments.length;
switch (G__67970) {
case 1:
return transplants.ui.open_icon.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return transplants.ui.open_icon.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(transplants.ui.open_icon.cljs$core$IFn$_invoke$arity$1 = (function (name){
return transplants.ui.open_icon.cljs$core$IFn$_invoke$arity$2(null,name);
}));

(transplants.ui.open_icon.cljs$core$IFn$_invoke$arity$2 = (function (style,name){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"class","class",-2030961996),["oi oi-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(name)].join(''),new cljs.core.Keyword(null,"title","title",636505583),name,new cljs.core.Keyword(null,"aria-hidden","aria-hidden",399337029),"true"], null),new cljs.core.Keyword(null,"style","style",-496642736),style)], null);
}));

(transplants.ui.open_icon.cljs$lang$maxFixedArity = 2);

/**
 * Used to select a test day to display
 */
transplants.ui.test_day_selector = (function transplants$ui$test_day_selector(label){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Row,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"display","display",242065432),"flex",new cljs.core.Keyword(null,"align-items","align-items",-267946462),"center",new cljs.core.Keyword(null,"margin-bottom","margin-bottom",388334941),(20)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Col,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"display","display",242065432),"flex",new cljs.core.Keyword(null,"justify-content","justify-content",-1990475787),"flex-end"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Form.Label,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"font-weight","font-weight",2085804583),"bold",new cljs.core.Keyword(null,"text-align","text-align",1786091845),"right",new cljs.core.Keyword(null,"margin-bottom","margin-bottom",388334941),(20),new cljs.core.Keyword(null,"line-height","line-height",1870784992),1.2], null)], null),label], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Col,transplants.numeric_input.numeric_input(new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword("test","day-input","test/day-input",793179371),new cljs.core.Keyword(null,"value-f","value-f",-1842795108),(function (){
return cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.subs","test-day","transplants.subs/test-day",437848619)], null)));
}),new cljs.core.Keyword(null,"min","min",444991522),cljs.core.constantly((0)),new cljs.core.Keyword(null,"max","max",61366548),cljs.core.constantly(((365) * (5))),new cljs.core.Keyword(null,"dps","dps",1756250620),(-1),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (p1__67971_SHARP_){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.events","test-day","transplants.events/test-day",-401043247),p1__67971_SHARP_], null));
})], null))], null)], null);
});
/**
 * A simple checkbox asking whether an icon array should be randomised or ordered.
 */
transplants.ui.randomise_query_panel = (function transplants$ui$randomise_query_panel(label){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Form,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"margin","margin",-995903681),"0px 0px 0px 0px",new cljs.core.Keyword(null,"padding","padding",1660304693),"0px 0px 0px 0px"], null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Form.Group,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.events","randomise-icons","transplants.events/randomise-icons",-554364099)], null));
}),new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"margin","margin",-995903681),"0px 0px 0px 0px",new cljs.core.Keyword(null,"padding","padding",1660304693),"10px 0px 0px 10px",new cljs.core.Keyword(null,"color","color",1011675173),"#000",new cljs.core.Keyword(null,"background-color","background-color",570434026),"#CCC"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Form.Check,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"inline","inline",1399884222),true,new cljs.core.Keyword(null,"type","type",1174270348),"checkbox",new cljs.core.Keyword(null,"read-only","read-only",-191706886),true,new cljs.core.Keyword(null,"checked","checked",-50955819),cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.subs","randomise-icons","transplants.subs/randomise-icons",1559530231)], null)))], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Form.Label,label], null)], null)], null);
});

//# sourceMappingURL=transplants.ui.js.map
