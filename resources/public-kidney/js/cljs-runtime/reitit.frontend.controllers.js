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
reitit.frontend.controllers.get_identity = (function reitit$frontend$controllers$get_identity(p__66959,match){
var map__66960 = p__66959;
var map__66960__$1 = cljs.core.__destructure_map(map__66960);
var identity = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66960__$1,new cljs.core.Keyword(null,"identity","identity",1647396035));
var parameters = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66960__$1,new cljs.core.Keyword(null,"parameters","parameters",-1229919748));
var params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__66960__$1,new cljs.core.Keyword(null,"params","params",710516235));
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
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__4652__auto__ = (function reitit$frontend$controllers$get_identity_$_iter__66961(s__66962){
return (new cljs.core.LazySeq(null,(function (){
var s__66962__$1 = s__66962;
while(true){
var temp__5753__auto__ = cljs.core.seq(s__66962__$1);
if(temp__5753__auto__){
var s__66962__$2 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(s__66962__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__66962__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__66964 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__66963 = (0);
while(true){
if((i__66963 < size__4651__auto__)){
var vec__66969 = cljs.core._nth(c__4650__auto__,i__66963);
var param_type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66969,(0),null);
var ks = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66969,(1),null);
cljs.core.chunk_append(b__66964,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [param_type,cljs.core.select_keys(cljs.core.get.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"parameters","parameters",-1229919748).cljs$core$IFn$_invoke$arity$1(match),param_type),ks)], null));

var G__67012 = (i__66963 + (1));
i__66963 = G__67012;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__66964),reitit$frontend$controllers$get_identity_$_iter__66961(cljs.core.chunk_rest(s__66962__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__66964),null);
}
} else {
var vec__66975 = cljs.core.first(s__66962__$2);
var param_type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66975,(0),null);
var ks = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__66975,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [param_type,cljs.core.select_keys(cljs.core.get.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"parameters","parameters",-1229919748).cljs$core$IFn$_invoke$arity$1(match),param_type),ks)], null),reitit$frontend$controllers$get_identity_$_iter__66961(cljs.core.rest(s__66962__$2)));
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
var G__66981 = new cljs.core.Keyword("reitit.frontend.controllers","identity","reitit.frontend.controllers/identity",-806277693).cljs$core$IFn$_invoke$arity$1(controller);
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__66981) : f.call(null,G__66981));
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
var seq__66990_67013 = cljs.core.seq(cljs.core.reverse(cljs.core.map.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"old","old",-1825222690),changed_controllers)));
var chunk__66991_67014 = null;
var count__66992_67015 = (0);
var i__66993_67016 = (0);
while(true){
if((i__66993_67016 < count__66992_67015)){
var controller_67017 = chunk__66991_67014.cljs$core$IIndexed$_nth$arity$2(null,i__66993_67016);
reitit.frontend.controllers.apply_controller(controller_67017,new cljs.core.Keyword(null,"stop","stop",-2140911342));


var G__67018 = seq__66990_67013;
var G__67019 = chunk__66991_67014;
var G__67020 = count__66992_67015;
var G__67021 = (i__66993_67016 + (1));
seq__66990_67013 = G__67018;
chunk__66991_67014 = G__67019;
count__66992_67015 = G__67020;
i__66993_67016 = G__67021;
continue;
} else {
var temp__5753__auto___67022 = cljs.core.seq(seq__66990_67013);
if(temp__5753__auto___67022){
var seq__66990_67023__$1 = temp__5753__auto___67022;
if(cljs.core.chunked_seq_QMARK_(seq__66990_67023__$1)){
var c__4679__auto___67024 = cljs.core.chunk_first(seq__66990_67023__$1);
var G__67025 = cljs.core.chunk_rest(seq__66990_67023__$1);
var G__67026 = c__4679__auto___67024;
var G__67027 = cljs.core.count(c__4679__auto___67024);
var G__67028 = (0);
seq__66990_67013 = G__67025;
chunk__66991_67014 = G__67026;
count__66992_67015 = G__67027;
i__66993_67016 = G__67028;
continue;
} else {
var controller_67029 = cljs.core.first(seq__66990_67023__$1);
reitit.frontend.controllers.apply_controller(controller_67029,new cljs.core.Keyword(null,"stop","stop",-2140911342));


var G__67030 = cljs.core.next(seq__66990_67023__$1);
var G__67031 = null;
var G__67032 = (0);
var G__67033 = (0);
seq__66990_67013 = G__67030;
chunk__66991_67014 = G__67031;
count__66992_67015 = G__67032;
i__66993_67016 = G__67033;
continue;
}
} else {
}
}
break;
}

var seq__66999_67034 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"new","new",-2085437848),changed_controllers));
var chunk__67000_67035 = null;
var count__67001_67036 = (0);
var i__67002_67037 = (0);
while(true){
if((i__67002_67037 < count__67001_67036)){
var controller_67038 = chunk__67000_67035.cljs$core$IIndexed$_nth$arity$2(null,i__67002_67037);
reitit.frontend.controllers.apply_controller(controller_67038,new cljs.core.Keyword(null,"start","start",-355208981));


var G__67039 = seq__66999_67034;
var G__67040 = chunk__67000_67035;
var G__67041 = count__67001_67036;
var G__67042 = (i__67002_67037 + (1));
seq__66999_67034 = G__67039;
chunk__67000_67035 = G__67040;
count__67001_67036 = G__67041;
i__67002_67037 = G__67042;
continue;
} else {
var temp__5753__auto___67043 = cljs.core.seq(seq__66999_67034);
if(temp__5753__auto___67043){
var seq__66999_67044__$1 = temp__5753__auto___67043;
if(cljs.core.chunked_seq_QMARK_(seq__66999_67044__$1)){
var c__4679__auto___67046 = cljs.core.chunk_first(seq__66999_67044__$1);
var G__67047 = cljs.core.chunk_rest(seq__66999_67044__$1);
var G__67048 = c__4679__auto___67046;
var G__67049 = cljs.core.count(c__4679__auto___67046);
var G__67050 = (0);
seq__66999_67034 = G__67047;
chunk__67000_67035 = G__67048;
count__67001_67036 = G__67049;
i__67002_67037 = G__67050;
continue;
} else {
var controller_67051 = cljs.core.first(seq__66999_67044__$1);
reitit.frontend.controllers.apply_controller(controller_67051,new cljs.core.Keyword(null,"start","start",-355208981));


var G__67052 = cljs.core.next(seq__66999_67044__$1);
var G__67053 = null;
var G__67054 = (0);
var G__67055 = (0);
seq__66999_67034 = G__67052;
chunk__67000_67035 = G__67053;
count__67001_67036 = G__67054;
i__67002_67037 = G__67055;
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
