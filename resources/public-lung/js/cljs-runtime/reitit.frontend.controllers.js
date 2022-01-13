goog.provide('reitit.frontend.controllers');
reitit.frontend.controllers.pad_same_length = (function reitit$frontend$controllers$pad_same_length(a,b){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(a,cljs.core.take.cljs$core$IFn$_invoke$arity$2((cljs.core.count(b) - cljs.core.count(a)),cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(null)));
});
reitit.frontend.controllers.params_warning = (new cljs.core.Delay((function (){
return console.warn("Reitit-frontend controller :params is deprecated. Replace with :identity or :parameters option.");
}),null));
/**
 * Get controller identity given controller and match.
 * 
 *   To select interesting properties from Match :parameters option can be set.
 *   Value should be param-type => [param-key]
 *   Resulting value is map of param-type => param-key => value.
 * 
 *   For other uses, :identity option can be used to provide function from
 *   Match to identity.
 * 
 *   Default value is nil, i.e. controller identity doesn't depend on Match.
 */
reitit.frontend.controllers.get_identity = (function reitit$frontend$controllers$get_identity(p__81000,match){
var map__81001 = p__81000;
var map__81001__$1 = cljs.core.__destructure_map(map__81001);
var identity = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81001__$1,new cljs.core.Keyword(null,"identity","identity",1647396035));
var parameters = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81001__$1,new cljs.core.Keyword(null,"parameters","parameters",-1229919748));
var params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81001__$1,new cljs.core.Keyword(null,"params","params",710516235));
if(cljs.core.not((function (){var and__4251__auto__ = identity;
if(cljs.core.truth_(and__4251__auto__)){
return parameters;
} else {
return and__4251__auto__;
}
})())){
} else {
throw (new Error(["Assert failed: ","Use either :identity or :parameters for controller, not both.","\n","(not (and identity parameters))"].join('')));
}

if(cljs.core.truth_(params)){
cljs.core.deref(reitit.frontend.controllers.params_warning);
} else {
}

if(cljs.core.truth_(parameters)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__4652__auto__ = (function reitit$frontend$controllers$get_identity_$_iter__81002(s__81003){
return (new cljs.core.LazySeq(null,(function (){
var s__81003__$1 = s__81003;
while(true){
var temp__5753__auto__ = cljs.core.seq(s__81003__$1);
if(temp__5753__auto__){
var s__81003__$2 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(s__81003__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__81003__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__81005 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__81004 = (0);
while(true){
if((i__81004 < size__4651__auto__)){
var vec__81006 = cljs.core._nth(c__4650__auto__,i__81004);
var param_type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81006,(0),null);
var ks = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81006,(1),null);
cljs.core.chunk_append(b__81005,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [param_type,cljs.core.select_keys(cljs.core.get.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"parameters","parameters",-1229919748).cljs$core$IFn$_invoke$arity$1(match),param_type),ks)], null));

var G__81027 = (i__81004 + (1));
i__81004 = G__81027;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__81005),reitit$frontend$controllers$get_identity_$_iter__81002(cljs.core.chunk_rest(s__81003__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__81005),null);
}
} else {
var vec__81009 = cljs.core.first(s__81003__$2);
var param_type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81009,(0),null);
var ks = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81009,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [param_type,cljs.core.select_keys(cljs.core.get.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"parameters","parameters",-1229919748).cljs$core$IFn$_invoke$arity$1(match),param_type),ks)], null),reitit$frontend$controllers$get_identity_$_iter__81002(cljs.core.rest(s__81003__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__4652__auto__(parameters);
})());
} else {
if(cljs.core.truth_(identity)){
return (identity.cljs$core$IFn$_invoke$arity$1 ? identity.cljs$core$IFn$_invoke$arity$1(match) : identity.call(null,match));
} else {
if(cljs.core.truth_(params)){
return (params.cljs$core$IFn$_invoke$arity$1 ? params.cljs$core$IFn$_invoke$arity$1(match) : params.call(null,match));
} else {
return null;

}
}
}
});
/**
 * Run side-effects (:start or :stop) for controller.
 *   The side-effect function is called with controller identity value.
 */
reitit.frontend.controllers.apply_controller = (function reitit$frontend$controllers$apply_controller(controller,method){
var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(controller,method);
if(cljs.core.truth_(temp__5753__auto__)){
var f = temp__5753__auto__;
var G__81012 = new cljs.core.Keyword("reitit.frontend.controllers","identity","reitit.frontend.controllers/identity",-806277693).cljs$core$IFn$_invoke$arity$1(controller);
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__81012) : f.call(null,G__81012));
} else {
return null;
}
});
/**
 * Applies changes between current controllers and
 *   those previously enabled. Reinitializes controllers whose
 *   identity has changed.
 */
reitit.frontend.controllers.apply_controllers = (function reitit$frontend$controllers$apply_controllers(old_controllers,new_match){
var new_controllers = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (controller){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(controller,new cljs.core.Keyword("reitit.frontend.controllers","identity","reitit.frontend.controllers/identity",-806277693),reitit.frontend.controllers.get_identity(controller,new_match));
}),new cljs.core.Keyword(null,"controllers","controllers",-1120410624).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(new_match)));
var changed_controllers = cljs.core.vec(cljs.core.keep.cljs$core$IFn$_invoke$arity$2(cljs.core.identity,cljs.core.map.cljs$core$IFn$_invoke$arity$3((function (old,new$){
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(old,new$)){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"old","old",-1825222690),old,new cljs.core.Keyword(null,"new","new",-2085437848),new$], null);
} else {
return null;
}
}),reitit.frontend.controllers.pad_same_length(old_controllers,new_controllers),reitit.frontend.controllers.pad_same_length(new_controllers,old_controllers))));
var seq__81013_81032 = cljs.core.seq(cljs.core.reverse(cljs.core.map.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"old","old",-1825222690),changed_controllers)));
var chunk__81014_81033 = null;
var count__81015_81034 = (0);
var i__81016_81035 = (0);
while(true){
if((i__81016_81035 < count__81015_81034)){
var controller_81036 = chunk__81014_81033.cljs$core$IIndexed$_nth$arity$2(null,i__81016_81035);
reitit.frontend.controllers.apply_controller(controller_81036,new cljs.core.Keyword(null,"stop","stop",-2140911342));


var G__81037 = seq__81013_81032;
var G__81038 = chunk__81014_81033;
var G__81039 = count__81015_81034;
var G__81040 = (i__81016_81035 + (1));
seq__81013_81032 = G__81037;
chunk__81014_81033 = G__81038;
count__81015_81034 = G__81039;
i__81016_81035 = G__81040;
continue;
} else {
var temp__5753__auto___81041 = cljs.core.seq(seq__81013_81032);
if(temp__5753__auto___81041){
var seq__81013_81042__$1 = temp__5753__auto___81041;
if(cljs.core.chunked_seq_QMARK_(seq__81013_81042__$1)){
var c__4679__auto___81043 = cljs.core.chunk_first(seq__81013_81042__$1);
var G__81044 = cljs.core.chunk_rest(seq__81013_81042__$1);
var G__81045 = c__4679__auto___81043;
var G__81046 = cljs.core.count(c__4679__auto___81043);
var G__81047 = (0);
seq__81013_81032 = G__81044;
chunk__81014_81033 = G__81045;
count__81015_81034 = G__81046;
i__81016_81035 = G__81047;
continue;
} else {
var controller_81048 = cljs.core.first(seq__81013_81042__$1);
reitit.frontend.controllers.apply_controller(controller_81048,new cljs.core.Keyword(null,"stop","stop",-2140911342));


var G__81049 = cljs.core.next(seq__81013_81042__$1);
var G__81050 = null;
var G__81051 = (0);
var G__81052 = (0);
seq__81013_81032 = G__81049;
chunk__81014_81033 = G__81050;
count__81015_81034 = G__81051;
i__81016_81035 = G__81052;
continue;
}
} else {
}
}
break;
}

var seq__81017_81053 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"new","new",-2085437848),changed_controllers));
var chunk__81018_81054 = null;
var count__81019_81055 = (0);
var i__81020_81056 = (0);
while(true){
if((i__81020_81056 < count__81019_81055)){
var controller_81057 = chunk__81018_81054.cljs$core$IIndexed$_nth$arity$2(null,i__81020_81056);
reitit.frontend.controllers.apply_controller(controller_81057,new cljs.core.Keyword(null,"start","start",-355208981));


var G__81058 = seq__81017_81053;
var G__81059 = chunk__81018_81054;
var G__81060 = count__81019_81055;
var G__81061 = (i__81020_81056 + (1));
seq__81017_81053 = G__81058;
chunk__81018_81054 = G__81059;
count__81019_81055 = G__81060;
i__81020_81056 = G__81061;
continue;
} else {
var temp__5753__auto___81062 = cljs.core.seq(seq__81017_81053);
if(temp__5753__auto___81062){
var seq__81017_81063__$1 = temp__5753__auto___81062;
if(cljs.core.chunked_seq_QMARK_(seq__81017_81063__$1)){
var c__4679__auto___81064 = cljs.core.chunk_first(seq__81017_81063__$1);
var G__81065 = cljs.core.chunk_rest(seq__81017_81063__$1);
var G__81066 = c__4679__auto___81064;
var G__81067 = cljs.core.count(c__4679__auto___81064);
var G__81068 = (0);
seq__81017_81053 = G__81065;
chunk__81018_81054 = G__81066;
count__81019_81055 = G__81067;
i__81020_81056 = G__81068;
continue;
} else {
var controller_81069 = cljs.core.first(seq__81017_81063__$1);
reitit.frontend.controllers.apply_controller(controller_81069,new cljs.core.Keyword(null,"start","start",-355208981));


var G__81070 = cljs.core.next(seq__81017_81063__$1);
var G__81071 = null;
var G__81072 = (0);
var G__81073 = (0);
seq__81017_81053 = G__81070;
chunk__81018_81054 = G__81071;
count__81019_81055 = G__81072;
i__81020_81056 = G__81073;
continue;
}
} else {
}
}
break;
}

return new_controllers;
});

//# sourceMappingURL=reitit.frontend.controllers.js.map
