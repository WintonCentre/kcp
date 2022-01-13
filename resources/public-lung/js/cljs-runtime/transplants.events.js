goog.provide('transplants.events');
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","initialize-db","transplants.events/initialize-db",784483349),(function (_,___$1){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([transplants.db.default_db,new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"current-route","current-route",2067529448),null,new cljs.core.Keyword(null,"randomise-icons","randomise-icons",-806648186),false,new cljs.core.Keyword(null,"inputs","inputs",865803858),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"selected-vis","selected-vis",624123356),"bars",new cljs.core.Keyword(null,"window-width","window-width",2057825599),window.innerWidth,new cljs.core.Keyword(null,"test-day","test-day",-1759386244),(100),new cljs.core.Keyword(null,"modal-data","modal-data",-1303581308),null], null)], 0));
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","update-window-width","transplants.events/update-window-width",378025084),(function (db,p__81687){
var vec__81688 = p__81687;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81688,(0),null);
var new_width = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81688,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"window-width","window-width",2057825599),new_width);
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","navigate","transplants.events/navigate",-1105685568),(function (p__81694,p__81695){
var map__81696 = p__81694;
var map__81696__$1 = cljs.core.__destructure_map(map__81696);
var _db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81696__$1,new cljs.core.Keyword(null,"_db","_db",1668840064));
var vec__81697 = p__81695;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81697,(0),null);
var route = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81697,(1),null);
var params = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81697,(2),null);
var query = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81697,(3),null);
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("transplants.fx","navigate!","transplants.fx/navigate!",1405740540),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [route,params,query], null)], null);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","navigated","transplants.events/navigated",-1319768447),(function (db,p__81703){
var vec__81704 = p__81703;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81704,(0),null);
var new_match = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81704,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"current-route","current-route",2067529448),new_match);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","organ","transplants.events/organ",1866933883),(function (db,p__81710){
var vec__81711 = p__81710;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81711,(0),null);
var organ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81711,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"organ","organ",-29862572),organ);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","centre","transplants.events/centre",1452595639),(function (db,p__81718){
var vec__81720 = p__81718;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81720,(0),null);
var c = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81720,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"centre","centre",-948091970),c);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","organ-centres","transplants.events/organ-centres",-1446031185),(function (db,p__81723){
var vec__81724 = p__81723;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81724,(0),null);
var ocs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81724,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"organ-centres","organ-centres",986037238),ocs);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","reset-inputs","transplants.events/reset-inputs",1125387447),(function (db,p__81730){
var vec__81731 = p__81730;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81731,(0),null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81731,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"inputs","inputs",865803858),cljs.core.PersistentArrayMap.EMPTY);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","guidance","transplants.events/guidance",69385185),(function (db,p__81738){
var vec__81739 = p__81738;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81739,(0),null);
var b_info = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81739,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"guidance","guidance",-1324762868),b_info);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","randomise-icons","transplants.events/randomise-icons",-554364099),(function (db,p__81747){
var vec__81748 = p__81747;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81748,(0),null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81748,(1),null);
return cljs.core.update.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"randomise-icons","randomise-icons",-806648186),cljs.core.not);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","inc-guidance-percent","transplants.events/inc-guidance-percent",804519127),(function (db,p__81751){
var vec__81752 = p__81751;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81752,(0),null);
var increment = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81752,(1),null);
return cljs.core.update.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"guidance-percent","guidance-percent",162639848),(function (old){
var new$ = (old + increment);
var x__4336__auto__ = (function (){var x__4339__auto__ = new$;
var y__4340__auto__ = (100);
return ((x__4339__auto__ < y__4340__auto__) ? x__4339__auto__ : y__4340__auto__);
})();
var y__4337__auto__ = (0);
return ((x__4336__auto__ > y__4337__auto__) ? x__4336__auto__ : y__4337__auto__);
}));
}));
/**
 * Concat a sheet type suffix onto the bundle name to generate a specific sheet key 
 * e.g.
 * ['waiting' '-inputs'] -> :waiting-inputs
 * ['graft' '-baseline-vars'] -> :graft-baseline-vars
 */
transplants.events.bundle_sheet = (function transplants$events$bundle_sheet(bundle_name,tool_suffix){
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$1([cljs.core.str.cljs$core$IFn$_invoke$arity$1(bundle_name),cljs.core.str.cljs$core$IFn$_invoke$arity$1(tool_suffix)].join(''));
});
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","store-bundle-inputs","transplants.events/store-bundle-inputs",1357258480),(function (p__81767,p__81768){
var map__81769 = p__81767;
var map__81769__$1 = cljs.core.__destructure_map(map__81769);
var _ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81769__$1,new cljs.core.Keyword(null,"_","_",1453416199));
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81769__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__81770 = p__81768;
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81770,(0),null);
var data_path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81770,(1),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81770,(2),null);
var path_params = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(db,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"current-route","current-route",2067529448),new cljs.core.Keyword(null,"path-params","path-params",-48130597)], null));
var vec__81774 = transplants.utils.path_keys(path_params);
var organ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81774,(0),null);
var _centre = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81774,(1),null);
var tool = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81774,(2),null);
var _tab = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81774,(3),null);
var tool__$1 = (((tool == null))?new cljs.core.Keyword(null,"waiting","waiting",895906735):tool);
var raw = cljs.reader.read_string.cljs$core$IFn$_invoke$arity$1(response);
var bundle_name = cljs.core.name(tool__$1);
var inputs_key = transplants.events.bundle_sheet(bundle_name,"-inputs");
var fmaps = transplants.factors.master_f_maps(organ,(inputs_key.cljs$core$IFn$_invoke$arity$1 ? inputs_key.cljs$core$IFn$_invoke$arity$1(raw) : inputs_key.call(null,raw)));
var fmaps_STAR_ = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__81781){
var vec__81782 = p__81781;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81782,(0),null);
var vec__81785 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81782,(1),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81785,(0),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,v], null);
}),cljs.core.group_by(new cljs.core.Keyword(null,"factor","factor",-2103172748),fmaps)));
var tool_inputs = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.sorted_map_by((function (k1,k2){
return cljs.core.compare(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(fmaps_STAR_,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k1,new cljs.core.Keyword(null,"order","order",-1254677256)], null)),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(fmaps_STAR_,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k2,new cljs.core.Keyword(null,"order","order",-1254677256)], null)));
})),fmaps_STAR_);
var baseline_vars_key = transplants.events.bundle_sheet(bundle_name,"-baseline-vars");
var baseline_vars = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__81790){
var vec__81791 = p__81790;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81791,(0),null);
var vec__81794 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81791,(1),null);
var map__81797 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81794,(0),null);
var map__81797__$1 = cljs.core.__destructure_map(map__81797);
var level = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81797__$1,new cljs.core.Keyword(null,"level","level",1290497552));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,level], null);
}),cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,cljs.core.first),cljs.core.group_by(new cljs.core.Keyword(null,"factor","factor",-2103172748),cljs.core.get.cljs$core$IFn$_invoke$arity$2(raw,baseline_vars_key)))));
var baseline_cifs_key = transplants.events.bundle_sheet(bundle_name,"-baseline-cifs");
var baseline_cifs = cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__81758_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__81758_SHARP_,new cljs.core.Keyword(null,"centre","centre",-948091970));
}),cljs.core.get.cljs$core$IFn$_invoke$arity$2(raw,baseline_cifs_key));
var timed_outcome_keys = cljs.core.keys(cljs.core.first(baseline_cifs));
var outcome_keys = cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p1__81760_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"days","days",-1394072564),p1__81760_SHARP_);
}),timed_outcome_keys);
var outcomes = transplants.factors.get_outcomes_STAR_(cljs.core.first(baseline_cifs));
var beta_keys = transplants.factors.prefix_outcomes_keys("beta",outcomes);
var base_outcome_keys = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.keyword,outcomes);
var S0_PLUS_ = cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (bc){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"days","days",-1394072564).cljs$core$IFn$_invoke$arity$1(bc),(function (){var fexpr__81801 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.juxt,outcome_keys);
return (fexpr__81801.cljs$core$IFn$_invoke$arity$1 ? fexpr__81801.cljs$core$IFn$_invoke$arity$1(bc) : fexpr__81801.call(null,bc));
})()], null);
}),baseline_cifs);
var S0 = cljs.core.keep_indexed.cljs$core$IFn$_invoke$arity$2((function (p1__81763_SHARP_,p2__81764_SHARP_){
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(p1__81763_SHARP_,(1))) && ((cljs.core.first(p2__81764_SHARP_) === (0))))){
return null;
} else {
return p2__81764_SHARP_;
}
}),transplants.model.sample_from(S0_PLUS_));
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"db","db",993250759),cljs.core.assoc_in(db,data_path,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(raw,new cljs.core.Keyword(null,"fmaps","fmaps",-1655984758),tool_inputs,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"baseline-cifs","baseline-cifs",-1388441263),baseline_cifs,new cljs.core.Keyword(null,"baseline-vars","baseline-vars",1157410304),baseline_vars,new cljs.core.Keyword(null,"outcomes","outcomes",-2034044865),outcomes,new cljs.core.Keyword(null,"outcome-keys","outcome-keys",-2047325332),outcome_keys,new cljs.core.Keyword(null,"base-outcome-keys","base-outcome-keys",519744091),base_outcome_keys,new cljs.core.Keyword(null,"timed-outcome-keys","timed-outcome-keys",-304514980),timed_outcome_keys,new cljs.core.Keyword(null,"beta-keys","beta-keys",-1150961314),beta_keys,new cljs.core.Keyword(null,"all-S0","all-S0",2021249433),S0_PLUS_,new cljs.core.Keyword(null,"S0","S0",-1501768316),S0], 0)),inputs_key),baseline_cifs_key),baseline_vars_key)),new cljs.core.Keyword(null,"reg-factors","reg-factors",-4597615),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [organ,fmaps], null)], null);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","inc-test-day","transplants.events/inc-test-day",153447396),(function (db,p__81805){
var vec__81809 = p__81805;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81809,(0),null);
var step = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81809,(1),null);
return cljs.core.update.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"test-day","test-day",-1759386244),(function (p1__81804_SHARP_){
return (step + p1__81804_SHARP_);
}));
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","test-day","transplants.events/test-day",-401043247),(function (db,p__81813){
var vec__81814 = p__81813;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81814,(0),null);
var day = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81814,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"test-day","test-day",-1759386244),day);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","selected-vis","transplants.events/selected-vis",368577841),(function (db,p__81817){
var vec__81818 = p__81817;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81818,(0),null);
var selection = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81818,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"selected-vis","selected-vis",624123356),selection);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","store-response","transplants.events/store-response",-149290938),(function (db,p__81822){
var vec__81823 = p__81822;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81823,(0),null);
var data_path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81823,(1),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81823,(2),null);
return cljs.core.assoc_in(db,data_path,cljs.reader.read_string.cljs$core$IFn$_invoke$arity$1(response));
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","modal-data","transplants.events/modal-data",1130692203),(function (db,p__81826){
var vec__81827 = p__81826;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81827,(0),null);
var data = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81827,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"modal-data","modal-data",-1303581308),data);
}));
/**
 * store and transpose labelled column data to row maps format.
 * :todo - perhaps we should store the column format too to avoid regenerating it. I think we use column format for baselines?
 */
transplants.events.transpose_response = (function transplants$events$transpose_response(db,p__81830){
var vec__81831 = p__81830;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81831,(0),null);
var data_path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81831,(1),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81831,(2),null);
return cljs.core.assoc_in(db,data_path,winton_utils.data_frame.map_of_vs__GT_v_of_maps(cljs.reader.read_string.cljs$core$IFn$_invoke$arity$1(response)));
});
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","transpose-response","transplants.events/transpose-response",252239069),transplants.events.transpose_response);
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","transpose-response-centres","transplants.events/transpose-response-centres",-1924757034),transplants.events.transpose_response);
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","bad-response","transplants.events/bad-response",453308191),(function (db,p__81835){
var vec__81836 = p__81835;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81836,(0),null);
var _data_path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81836,(1),null);
var _response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81836,(2),null);
console.error();

return db;
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","store-metadata-response","transplants.events/store-metadata-response",1414405850),(function (p__81839,p__81840){
var map__81841 = p__81839;
var map__81841__$1 = cljs.core.__destructure_map(map__81841);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81841__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__81842 = p__81840;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81842,(0),null);
var _data_path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81842,(1),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81842,(2),null);
var mdata = cljs.reader.read_string.cljs$core$IFn$_invoke$arity$1(response);
var organs = (mdata.cljs$core$IFn$_invoke$arity$1 ? mdata.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"organ-order","organ-order",-291569616)) : mdata.call(null,new cljs.core.Keyword(null,"organ-order","organ-order",-291569616)));
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"db","db",993250759),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"mdata","mdata",-2098476679),mdata),new cljs.core.Keyword("transplants.fx","load-organ-centres","transplants.fx/load-organ-centres",-273149344),organs], null);
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","load-metadata","transplants.events/load-metadata",34724586),(function (p__81845,p__81846){
var map__81847 = p__81845;
var map__81847__$1 = cljs.core.__destructure_map(map__81847);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81847__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__81848 = p__81846;
var _evt = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81848,(0),null);
var vec__81851 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81848,(1),null);
var path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81851,(0),null);
var data_path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81851,(1),null);
if((cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(db,data_path) == null)){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"http-xhrio","http-xhrio",1846166714),new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"uri","uri",-774711847),path,new cljs.core.Keyword(null,"timeout","timeout",-318625318),(8000),new cljs.core.Keyword(null,"format","format",-1306924766),(ajax.core.text_request_format.cljs$core$IFn$_invoke$arity$0 ? ajax.core.text_request_format.cljs$core$IFn$_invoke$arity$0() : ajax.core.text_request_format.call(null)),new cljs.core.Keyword(null,"response-format","response-format",1664465322),(ajax.core.text_response_format.cljs$core$IFn$_invoke$arity$0 ? ajax.core.text_response_format.cljs$core$IFn$_invoke$arity$0() : ajax.core.text_response_format.call(null)),new cljs.core.Keyword(null,"on-success","on-success",1786904109),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.events","store-metadata-response","transplants.events/store-metadata-response",1414405850),data_path], null),new cljs.core.Keyword(null,"on-failure","on-failure",842888245),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.events","bad-response","transplants.events/bad-response",453308191),data_path], null)], null)], null);
} else {
return null;
}
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","load-edn","transplants.events/load-edn",621053308),(function (p__81854,p__81855){
var map__81856 = p__81854;
var map__81856__$1 = cljs.core.__destructure_map(map__81856);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81856__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__81857 = p__81855;
var _evt = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81857,(0),null);
var vec__81860 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81857,(1),null);
var path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81860,(0),null);
var data_path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81860,(1),null);
if((cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(db,data_path) == null)){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"http-xhrio","http-xhrio",1846166714),new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"uri","uri",-774711847),path,new cljs.core.Keyword(null,"timeout","timeout",-318625318),(8000),new cljs.core.Keyword(null,"format","format",-1306924766),(ajax.core.text_request_format.cljs$core$IFn$_invoke$arity$0 ? ajax.core.text_request_format.cljs$core$IFn$_invoke$arity$0() : ajax.core.text_request_format.call(null)),new cljs.core.Keyword(null,"response-format","response-format",1664465322),(ajax.core.text_response_format.cljs$core$IFn$_invoke$arity$0 ? ajax.core.text_response_format.cljs$core$IFn$_invoke$arity$0() : ajax.core.text_response_format.call(null)),new cljs.core.Keyword(null,"on-success","on-success",1786904109),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.events","store-response","transplants.events/store-response",-149290938),data_path], null),new cljs.core.Keyword(null,"on-failure","on-failure",842888245),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.events","bad-response","transplants.events/bad-response",453308191),data_path], null)], null)], null);
} else {
return null;
}
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","load-bundles","transplants.events/load-bundles",-875632197),(function (p__81863,p__81864){
var map__81865 = p__81863;
var map__81865__$1 = cljs.core.__destructure_map(map__81865);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81865__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__81866 = p__81864;
var _evt = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81866,(0),null);
var vec__81869 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81866,(1),null);
var path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81869,(0),null);
var data_path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81869,(1),null);
if((cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(db,data_path) == null)){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"http-xhrio","http-xhrio",1846166714),new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"uri","uri",-774711847),path,new cljs.core.Keyword(null,"timeout","timeout",-318625318),(8000),new cljs.core.Keyword(null,"format","format",-1306924766),(ajax.core.text_request_format.cljs$core$IFn$_invoke$arity$0 ? ajax.core.text_request_format.cljs$core$IFn$_invoke$arity$0() : ajax.core.text_request_format.call(null)),new cljs.core.Keyword(null,"response-format","response-format",1664465322),(ajax.core.text_response_format.cljs$core$IFn$_invoke$arity$0 ? ajax.core.text_response_format.cljs$core$IFn$_invoke$arity$0() : ajax.core.text_response_format.call(null)),new cljs.core.Keyword(null,"on-success","on-success",1786904109),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.events","store-bundle-inputs","transplants.events/store-bundle-inputs",1357258480),data_path], null),new cljs.core.Keyword(null,"on-failure","on-failure",842888245),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.events","bad-response","transplants.events/bad-response",453308191),data_path], null)], null)], null);
} else {
return null;
}
}));
transplants.events.load_and_transpose = (function transplants$events$load_and_transpose(p__81872,p__81873){
var map__81874 = p__81872;
var map__81874__$1 = cljs.core.__destructure_map(map__81874);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81874__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__81875 = p__81873;
var _evt = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81875,(0),null);
var vec__81878 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81875,(1),null);
var path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81878,(0),null);
var data_path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81878,(1),null);
if((cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(db,data_path) == null)){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"http-xhrio","http-xhrio",1846166714),new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"uri","uri",-774711847),path,new cljs.core.Keyword(null,"timeout","timeout",-318625318),(8000),new cljs.core.Keyword(null,"format","format",-1306924766),(ajax.core.text_request_format.cljs$core$IFn$_invoke$arity$0 ? ajax.core.text_request_format.cljs$core$IFn$_invoke$arity$0() : ajax.core.text_request_format.call(null)),new cljs.core.Keyword(null,"response-format","response-format",1664465322),(ajax.core.text_response_format.cljs$core$IFn$_invoke$arity$0 ? ajax.core.text_response_format.cljs$core$IFn$_invoke$arity$0() : ajax.core.text_response_format.call(null)),new cljs.core.Keyword(null,"on-success","on-success",1786904109),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.events","transpose-response-centres","transplants.events/transpose-response-centres",-1924757034),data_path], null),new cljs.core.Keyword(null,"on-failure","on-failure",842888245),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.events","bad-response","transplants.events/bad-response",453308191),data_path], null)], null)], null);
} else {
return null;
}
});
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","load-and-transpose","transplants.events/load-and-transpose",821155585),transplants.events.load_and_transpose);
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","load-and-transpose-centres","transplants.events/load-and-transpose-centres",884756009),transplants.events.load_and_transpose);
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","load-and-transpose-always","transplants.events/load-and-transpose-always",-456586381),(function (p__81881,p__81882){
var map__81883 = p__81881;
var map__81883__$1 = cljs.core.__destructure_map(map__81883);
var _db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__81883__$1,new cljs.core.Keyword(null,"_db","_db",1668840064));
var vec__81884 = p__81882;
var _evt = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81884,(0),null);
var vec__81887 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81884,(1),null);
var path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81887,(0),null);
var data_path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81887,(1),null);
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"http-xhrio","http-xhrio",1846166714),new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"uri","uri",-774711847),path,new cljs.core.Keyword(null,"timeout","timeout",-318625318),(8000),new cljs.core.Keyword(null,"format","format",-1306924766),(ajax.core.text_request_format.cljs$core$IFn$_invoke$arity$0 ? ajax.core.text_request_format.cljs$core$IFn$_invoke$arity$0() : ajax.core.text_request_format.call(null)),new cljs.core.Keyword(null,"response-format","response-format",1664465322),(ajax.core.text_response_format.cljs$core$IFn$_invoke$arity$0 ? ajax.core.text_response_format.cljs$core$IFn$_invoke$arity$0() : ajax.core.text_response_format.call(null)),new cljs.core.Keyword(null,"on-success","on-success",1786904109),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.events","transpose-response","transplants.events/transpose-response",252239069),data_path], null),new cljs.core.Keyword(null,"on-failure","on-failure",842888245),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.events","bad-response","transplants.events/bad-response",453308191),data_path], null)], null)], null);
}));

//# sourceMappingURL=transplants.events.js.map
