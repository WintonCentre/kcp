goog.provide('transplants.routes');
/**
 * Reitit nested route syntax can be tricky. Only the leaves are valid.
 * This example is helpful:
 * (def route
 *   (r/router
 *    ["/api"
 *     ["" ::api] ; <-- necessary to make "/api" a valid leaf route
 *     ["/ping" ::ping]
 *     ["/user/:id" ::user]]))
 * as it defines valid routes for /api, /ping, and /user/fred
 */
transplants.routes.routes = new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, ["/",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["",new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword("transplants.views","home","transplants.views/home",381467539),new cljs.core.Keyword(null,"view","view",1247994814),transplants.views.home_page,new cljs.core.Keyword(null,"link-text","link-text",224432076),"Transplant Risks",new cljs.core.Keyword(null,"controllers","controllers",-1120410624),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"start","start",-355208981),(function() { 
var G__83158__delegate = function (params){
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("transplants.routes","routes","transplants.routes/routes",1107776922),"Entering Home ",params], 0));
};
var G__83158 = function (var_args){
var params = null;
if (arguments.length > 0) {
var G__83159__i = 0, G__83159__a = new Array(arguments.length -  0);
while (G__83159__i < G__83159__a.length) {G__83159__a[G__83159__i] = arguments[G__83159__i + 0]; ++G__83159__i;}
  params = new cljs.core.IndexedSeq(G__83159__a,0,null);
} 
return G__83158__delegate.call(this,params);};
G__83158.cljs$lang$maxFixedArity = 0;
G__83158.cljs$lang$applyTo = (function (arglist__83160){
var params = cljs.core.seq(arglist__83160);
return G__83158__delegate(params);
});
G__83158.cljs$core$IFn$_invoke$arity$variadic = G__83158__delegate;
return G__83158;
})()
,new cljs.core.Keyword(null,"stop","stop",-2140911342),(function() { 
var G__83161__delegate = function (params){
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("transplants.routes","routes","transplants.routes/routes",1107776922),"Leaving Home ",params], 0));
};
var G__83161 = function (var_args){
var params = null;
if (arguments.length > 0) {
var G__83163__i = 0, G__83163__a = new Array(arguments.length -  0);
while (G__83163__i < G__83163__a.length) {G__83163__a[G__83163__i] = arguments[G__83163__i + 0]; ++G__83163__i;}
  params = new cljs.core.IndexedSeq(G__83163__a,0,null);
} 
return G__83161__delegate.call(this,params);};
G__83161.cljs$lang$maxFixedArity = 0;
G__83161.cljs$lang$applyTo = (function (arglist__83164){
var params = cljs.core.seq(arglist__83164);
return G__83161__delegate(params);
});
G__83161.cljs$core$IFn$_invoke$arity$variadic = G__83161__delegate;
return G__83161;
})()
], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["about",new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword("transplants.views","about","transplants.views/about",944477487),new cljs.core.Keyword(null,"view","view",1247994814),transplants.views.about_page,new cljs.core.Keyword(null,"link-text","link-text",224432076),"About",new cljs.core.Keyword(null,"conflicting","conflicting",2003828416),true,new cljs.core.Keyword(null,"controllers","controllers",-1120410624),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"parameters","parameters",-1229919748),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"path","path",-188191168),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"organ","organ",-29862572)], null)], null),new cljs.core.Keyword(null,"start","start",-355208981),(function (params){
return console.log("Entering About:",params);
}),new cljs.core.Keyword(null,"stop","stop",-2140911342),(function (_params){
return console.log("Leaving About");
})], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["legal",new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword("transplants.views","legal","transplants.views/legal",-193936196),new cljs.core.Keyword(null,"view","view",1247994814),transplants.views.legal_page,new cljs.core.Keyword(null,"link-text","link-text",224432076),"Legal",new cljs.core.Keyword(null,"conflicting","conflicting",2003828416),true,new cljs.core.Keyword(null,"controllers","controllers",-1120410624),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"parameters","parameters",-1229919748),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"path","path",-188191168),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"organ","organ",-29862572)], null)], null),new cljs.core.Keyword(null,"start","start",-355208981),(function (params){
return console.log("Entering Legal:",params);
}),new cljs.core.Keyword(null,"stop","stop",-2140911342),(function (_params){
return console.log("Leaving Legal");
})], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["pubs",new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword("transplants.views","pubs","transplants.views/pubs",1676154387),new cljs.core.Keyword(null,"view","view",1247994814),transplants.views.pubs_page,new cljs.core.Keyword(null,"link-text","link-text",224432076),"Publications",new cljs.core.Keyword(null,"conflicting","conflicting",2003828416),true,new cljs.core.Keyword(null,"controllers","controllers",-1120410624),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"parameters","parameters",-1229919748),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"path","path",-188191168),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"organ","organ",-29862572)], null)], null),new cljs.core.Keyword(null,"start","start",-355208981),(function (params){
return console.log("Entering Pubs:",params);
}),new cljs.core.Keyword(null,"stop","stop",-2140911342),(function (_params){
return console.log("Leaving Pubs");
})], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["tech",new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword("transplants.views","tech","transplants.views/tech",521526541),new cljs.core.Keyword(null,"view","view",1247994814),transplants.views.tech_page,new cljs.core.Keyword(null,"link-text","link-text",224432076),"Technical",new cljs.core.Keyword(null,"conflicting","conflicting",2003828416),true,new cljs.core.Keyword(null,"controllers","controllers",-1120410624),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"parameters","parameters",-1229919748),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"path","path",-188191168),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"organ","organ",-29862572)], null)], null),new cljs.core.Keyword(null,"start","start",-355208981),(function (params){
return console.log("Entering Tech:",params);
}),new cljs.core.Keyword(null,"stop","stop",-2140911342),(function (_params){
return console.log("Leaving Tech");
})], null)], null)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [":organ",new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword("transplants.views","organ","transplants.views/organ",-1567940572),new cljs.core.Keyword(null,"view","view",1247994814),transplants.views.organ_home,new cljs.core.Keyword(null,"link-text","link-text",224432076),"organ",new cljs.core.Keyword(null,"conflicting","conflicting",2003828416),true,new cljs.core.Keyword(null,"controllers","controllers",-1120410624),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"parameters","parameters",-1229919748),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"path","path",-188191168),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"organ","organ",-29862572)], null)], null),new cljs.core.Keyword(null,"start","start",-355208981),(function (params){
console.log("Entering organ:",params);

var organ = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(params,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"path","path",-188191168),new cljs.core.Keyword(null,"organ","organ",-29862572)], null)));
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.events","load-and-transpose-always","transplants.events/load-and-transpose-always",-456586381),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.paths.tools_path(organ),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tools","tools",-1241731990)], null)], null)], null));
}),new cljs.core.Keyword(null,"stop","stop",-2140911342),(function (_params){
return console.log(["Leaving ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"organ","organ",-29862572))," Home"].join(''));
})], null)], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [""], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, ["/:centre",new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword("transplants.views","organ-centre","transplants.views/organ-centre",1420165722),new cljs.core.Keyword(null,"view","view",1247994814),transplants.views.organ_centre,new cljs.core.Keyword(null,"link-text","link-text",224432076),"organ-centre",new cljs.core.Keyword(null,"controllers","controllers",-1120410624),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"parameters","parameters",-1229919748),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"path","path",-188191168),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"organ","organ",-29862572),new cljs.core.Keyword(null,"centre","centre",-948091970)], null)], null),new cljs.core.Keyword(null,"start","start",-355208981),(function (params){
var _centre = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(params,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"path","path",-188191168),new cljs.core.Keyword(null,"centre","centre",-948091970)], null)));
return null;
}),new cljs.core.Keyword(null,"stop","stop",-2140911342),(function (params){
return console.log("Leaving ",cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(params,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"path","path",-188191168),new cljs.core.Keyword(null,"centre","centre",-948091970)], null)));
})], null)], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [""], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, ["/:tool",new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword("transplants.views","organ-centre-tool","transplants.views/organ-centre-tool",-538145031),new cljs.core.Keyword(null,"view","view",1247994814),transplants.views.organ_centre_tool,new cljs.core.Keyword(null,"link-text","link-text",224432076),"organ-centre-tool",new cljs.core.Keyword(null,"controllers","controllers",-1120410624),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"parameters","parameters",-1229919748),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"path","path",-188191168),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"organ","organ",-29862572),new cljs.core.Keyword(null,"centre","centre",-948091970),new cljs.core.Keyword(null,"tool","tool",-1298696470)], null)], null),new cljs.core.Keyword(null,"start","start",-355208981),(function (params){
var _tool = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(params,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"path","path",-188191168),new cljs.core.Keyword(null,"tool","tool",-1298696470)], null)));
return console.log("Entering organ-centre-tool: ",params);
}),new cljs.core.Keyword(null,"stop","stop",-2140911342),(function (params){
return console.log("Leaving ",cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(params,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"path","path",-188191168),new cljs.core.Keyword(null,"tool","tool",-1298696470)], null)));
})], null)], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [""], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["/:tab",new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword("transplants.views","organ-centre-tool-tab","transplants.views/organ-centre-tool-tab",-1871946762),new cljs.core.Keyword(null,"view","view",1247994814),transplants.views.organ_centre_tool,new cljs.core.Keyword(null,"link-text","link-text",224432076),"organ-centre-tool",new cljs.core.Keyword(null,"controllers","controllers",-1120410624),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"parameters","parameters",-1229919748),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"path","path",-188191168),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"organ","organ",-29862572),new cljs.core.Keyword(null,"centre","centre",-948091970),new cljs.core.Keyword(null,"tool","tool",-1298696470),new cljs.core.Keyword(null,"tab","tab",-559583621)], null)], null),new cljs.core.Keyword(null,"start","start",-355208981),(function (params){
var _tool = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(params,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"path","path",-188191168),new cljs.core.Keyword(null,"tool","tool",-1298696470)], null)));
var tab = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(params,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"path","path",-188191168),new cljs.core.Keyword(null,"tab","tab",-559583621)], null)));
console.log("Entering organ-centre-tool: ",params);

cljs.core.tap_GT_(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"tab","tab",-559583621),tab,new cljs.core.Keyword(null,"params","params",710516235),params], null));

return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.events","selected-vis","transplants.events/selected-vis",368577841),tab], null));
}),new cljs.core.Keyword(null,"stop","stop",-2140911342),(function (params){
return console.log("Leaving ",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(params)], 0)));
})], null)], null)], null)], null)], null)], null)], null)], null);
transplants.routes.on_navigate = (function transplants$routes$on_navigate(new_match){
var old_match = re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.subs","current-route","transplants.subs/current-route",1078262869)], null));
if(cljs.core.truth_(new_match)){
var cs = reitit.frontend.controllers.apply_controllers(new cljs.core.Keyword(null,"controllers","controllers",-1120410624).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(old_match)),new_match);
var m = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(new_match,new cljs.core.Keyword(null,"controllers","controllers",-1120410624),cs);
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.events","navigated","transplants.events/navigated",-1319768447),m], null));
} else {
return null;
}
});
transplants.routes.router = reitit.frontend.router.cljs$core$IFn$_invoke$arity$2(transplants.routes.routes,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data","data",-232669377),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"coercion","coercion",904067157),reitit.coercion.spec.coercion], null)], null));
transplants.routes.init_routes_BANG_ = (function transplants$routes$init_routes_BANG_(){
console.log("initializing routes");

return reitit.frontend.easy.start_BANG_(transplants.routes.router,transplants.routes.on_navigate,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"use-fragment","use-fragment",-1617737154),true], null));
});

//# sourceMappingURL=transplants.routes.js.map
