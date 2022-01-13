goog.provide('svg.space');
svg.space.space = (function svg$space$space(p__81994){
var map__81995 = p__81994;
var map__81995__$1 = cljs.core.__destructure_map(map__81995);
var params = map__81995__$1;
var outer = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81995__$1,new cljs.core.Keyword(null,"outer","outer",-375185956));
var margin = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81995__$1,new cljs.core.Keyword(null,"margin","margin",-995903681));
var padding = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81995__$1,new cljs.core.Keyword(null,"padding","padding",1660304693));
var x_domain = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81995__$1,new cljs.core.Keyword(null,"x-domain","x-domain",501559689));
var x_ticks = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81995__$1,new cljs.core.Keyword(null,"x-ticks","x-ticks",1636599024));
var y_domain = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81995__$1,new cljs.core.Keyword(null,"y-domain","y-domain",-969203007));
var y_ticks = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81995__$1,new cljs.core.Keyword(null,"y-ticks","y-ticks",-843622722));
var inner = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"width","width",-384071477),((new cljs.core.Keyword(null,"width","width",-384071477).cljs$core$IFn$_invoke$arity$1(outer) - new cljs.core.Keyword(null,"left","left",-399115937).cljs$core$IFn$_invoke$arity$1(margin)) - new cljs.core.Keyword(null,"right","right",-452581833).cljs$core$IFn$_invoke$arity$1(margin)),new cljs.core.Keyword(null,"height","height",1025178622),((new cljs.core.Keyword(null,"height","height",1025178622).cljs$core$IFn$_invoke$arity$1(outer) - new cljs.core.Keyword(null,"top","top",-1856271961).cljs$core$IFn$_invoke$arity$1(margin)) - new cljs.core.Keyword(null,"bottom","bottom",-1550509018).cljs$core$IFn$_invoke$arity$1(margin))], null);
var width = ((new cljs.core.Keyword(null,"width","width",-384071477).cljs$core$IFn$_invoke$arity$1(inner) - new cljs.core.Keyword(null,"left","left",-399115937).cljs$core$IFn$_invoke$arity$1(padding)) - new cljs.core.Keyword(null,"right","right",-452581833).cljs$core$IFn$_invoke$arity$1(padding));
var height = ((new cljs.core.Keyword(null,"height","height",1025178622).cljs$core$IFn$_invoke$arity$1(inner) - new cljs.core.Keyword(null,"top","top",-1856271961).cljs$core$IFn$_invoke$arity$1(padding)) - new cljs.core.Keyword(null,"bottom","bottom",-1550509018).cljs$core$IFn$_invoke$arity$1(padding));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(params,new cljs.core.Keyword(null,"inner","inner",-1383171215),inner,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"width","width",-384071477),((new cljs.core.Keyword(null,"width","width",-384071477).cljs$core$IFn$_invoke$arity$1(inner) - new cljs.core.Keyword(null,"left","left",-399115937).cljs$core$IFn$_invoke$arity$1(padding)) - new cljs.core.Keyword(null,"right","right",-452581833).cljs$core$IFn$_invoke$arity$1(padding)),new cljs.core.Keyword(null,"height","height",1025178622),((new cljs.core.Keyword(null,"height","height",1025178622).cljs$core$IFn$_invoke$arity$1(inner) - new cljs.core.Keyword(null,"top","top",-1856271961).cljs$core$IFn$_invoke$arity$1(padding)) - new cljs.core.Keyword(null,"bottom","bottom",-1550509018).cljs$core$IFn$_invoke$arity$1(padding)),new cljs.core.Keyword(null,"x","x",2099068185),svg.scales.nice_linear(x_domain,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),width], null),x_ticks),new cljs.core.Keyword(null,"y","y",-1757859776),svg.scales.nice_linear(y_domain,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [height,(0)], null),y_ticks)], 0));
});

//# sourceMappingURL=svg.space.js.map
