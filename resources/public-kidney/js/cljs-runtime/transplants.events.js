goog.provide('transplants.events');
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","initialize-db","transplants.events/initialize-db",784483349),(function (_,___$1){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([transplants.db.default_db,new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"current-route","current-route",2067529448),null,new cljs.core.Keyword(null,"randomise-icons","randomise-icons",-806648186),false,new cljs.core.Keyword(null,"inputs","inputs",865803858),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"selected-vis","selected-vis",624123356),"bars",new cljs.core.Keyword(null,"window-width","window-width",2057825599),window.innerWidth,new cljs.core.Keyword(null,"test-day","test-day",-1759386244),(100),new cljs.core.Keyword(null,"modal-data","modal-data",-1303581308),null], null)], 0));
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","update-window-width","transplants.events/update-window-width",378025084),(function (db,p__67746){
var vec__67747 = p__67746;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67747,(0),null);
var new_width = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67747,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"window-width","window-width",2057825599),new_width);
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","navigate","transplants.events/navigate",-1105685568),(function (p__67750,p__67751){
var map__67752 = p__67750;
var map__67752__$1 = cljs.core.__destructure_map(map__67752);
var _db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67752__$1,new cljs.core.Keyword(null,"_db","_db",1668840064));
var vec__67753 = p__67751;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67753,(0),null);
var route = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67753,(1),null);
var params = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67753,(2),null);
var query = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67753,(3),null);
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("transplants.fx","navigate!","transplants.fx/navigate!",1405740540),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [route,params,query], null)], null);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","navigated","transplants.events/navigated",-1319768447),(function (db,p__67756){
var vec__67757 = p__67756;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67757,(0),null);
var new_match = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67757,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"current-route","current-route",2067529448),new_match);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","organ","transplants.events/organ",1866933883),(function (db,p__67760){
var vec__67761 = p__67760;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67761,(0),null);
var organ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67761,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"organ","organ",-29862572),organ);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","centre","transplants.events/centre",1452595639),(function (db,p__67764){
var vec__67765 = p__67764;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67765,(0),null);
var c = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67765,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"centre","centre",-948091970),c);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","organ-centres","transplants.events/organ-centres",-1446031185),(function (db,p__67768){
var vec__67769 = p__67768;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67769,(0),null);
var ocs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67769,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"organ-centres","organ-centres",986037238),ocs);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","reset-inputs","transplants.events/reset-inputs",1125387447),(function (db,p__67773){
var vec__67776 = p__67773;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67776,(0),null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67776,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"inputs","inputs",865803858),cljs.core.PersistentArrayMap.EMPTY);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","guidance","transplants.events/guidance",69385185),(function (db,p__67779){
var vec__67782 = p__67779;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67782,(0),null);
var b_info = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67782,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"guidance","guidance",-1324762868),b_info);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","randomise-icons","transplants.events/randomise-icons",-554364099),(function (db,p__67786){
var vec__67787 = p__67786;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67787,(0),null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67787,(1),null);
return cljs.core.update.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"randomise-icons","randomise-icons",-806648186),cljs.core.not);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","inc-guidance-percent","transplants.events/inc-guidance-percent",804519127),(function (db,p__67793){
var vec__67796 = p__67793;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67796,(0),null);
var increment = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67796,(1),null);
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
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","store-bundle-inputs","transplants.events/store-bundle-inputs",1357258480),(function (p__67815,p__67816){
var map__67817 = p__67815;
var map__67817__$1 = cljs.core.__destructure_map(map__67817);
var _ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67817__$1,new cljs.core.Keyword(null,"_","_",1453416199));
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67817__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__67818 = p__67816;
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67818,(0),null);
var data_path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67818,(1),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67818,(2),null);
var path_params = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(db,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"current-route","current-route",2067529448),new cljs.core.Keyword(null,"path-params","path-params",-48130597)], null));
var vec__67821 = transplants.utils.path_keys(path_params);
var organ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67821,(0),null);
var _centre = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67821,(1),null);
var tool = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67821,(2),null);
var _tab = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67821,(3),null);
var tool__$1 = (((tool == null))?new cljs.core.Keyword(null,"waiting","waiting",895906735):tool);
var raw = cljs.reader.read_string.cljs$core$IFn$_invoke$arity$1(response);
var bundle_name = cljs.core.name(tool__$1);
var inputs_key = transplants.events.bundle_sheet(bundle_name,"-inputs");
var fmaps = transplants.factors.master_f_maps(organ,(inputs_key.cljs$core$IFn$_invoke$arity$1 ? inputs_key.cljs$core$IFn$_invoke$arity$1(raw) : inputs_key.call(null,raw)));
var fmaps_STAR_ = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__67824){
var vec__67825 = p__67824;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67825,(0),null);
var vec__67828 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67825,(1),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67828,(0),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,v], null);
}),cljs.core.group_by(new cljs.core.Keyword(null,"factor","factor",-2103172748),fmaps)));
var tool_inputs = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.sorted_map_by((function (k1,k2){
return cljs.core.compare(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(fmaps_STAR_,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k1,new cljs.core.Keyword(null,"order","order",-1254677256)], null)),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(fmaps_STAR_,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k2,new cljs.core.Keyword(null,"order","order",-1254677256)], null)));
})),fmaps_STAR_);
var baseline_vars_key = transplants.events.bundle_sheet(bundle_name,"-baseline-vars");
var baseline_vars = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__67833){
var vec__67835 = p__67833;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67835,(0),null);
var vec__67838 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67835,(1),null);
var map__67841 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67838,(0),null);
var map__67841__$1 = cljs.core.__destructure_map(map__67841);
var level = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67841__$1,new cljs.core.Keyword(null,"level","level",1290497552));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,level], null);
}),cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,cljs.core.first),cljs.core.group_by(new cljs.core.Keyword(null,"factor","factor",-2103172748),cljs.core.get.cljs$core$IFn$_invoke$arity$2(raw,baseline_vars_key)))));
var baseline_cifs_key = transplants.events.bundle_sheet(bundle_name,"-baseline-cifs");
var baseline_cifs = cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__67806_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__67806_SHARP_,new cljs.core.Keyword(null,"centre","centre",-948091970));
}),cljs.core.get.cljs$core$IFn$_invoke$arity$2(raw,baseline_cifs_key));
var timed_outcome_keys = cljs.core.keys(cljs.core.first(baseline_cifs));
var outcome_keys = cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p1__67809_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"days","days",-1394072564),p1__67809_SHARP_);
}),timed_outcome_keys);
var outcomes = transplants.factors.get_outcomes_STAR_(cljs.core.first(baseline_cifs));
var beta_keys = transplants.factors.prefix_outcomes_keys("beta",outcomes);
var base_outcome_keys = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.keyword,outcomes);
var S0_PLUS_ = cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (bc){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"days","days",-1394072564).cljs$core$IFn$_invoke$arity$1(bc),(function (){var fexpr__67842 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.juxt,outcome_keys);
return (fexpr__67842.cljs$core$IFn$_invoke$arity$1 ? fexpr__67842.cljs$core$IFn$_invoke$arity$1(bc) : fexpr__67842.call(null,bc));
})()], null);
}),baseline_cifs);
var S0 = cljs.core.keep_indexed.cljs$core$IFn$_invoke$arity$2((function (p1__67810_SHARP_,p2__67811_SHARP_){
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(p1__67810_SHARP_,(1))) && ((cljs.core.first(p2__67811_SHARP_) === (0))))){
return null;
} else {
return p2__67811_SHARP_;
}
}),transplants.model.sample_from(S0_PLUS_));
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"db","db",993250759),cljs.core.assoc_in(db,data_path,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(raw,new cljs.core.Keyword(null,"fmaps","fmaps",-1655984758),tool_inputs,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"baseline-cifs","baseline-cifs",-1388441263),baseline_cifs,new cljs.core.Keyword(null,"baseline-vars","baseline-vars",1157410304),baseline_vars,new cljs.core.Keyword(null,"outcomes","outcomes",-2034044865),outcomes,new cljs.core.Keyword(null,"outcome-keys","outcome-keys",-2047325332),outcome_keys,new cljs.core.Keyword(null,"base-outcome-keys","base-outcome-keys",519744091),base_outcome_keys,new cljs.core.Keyword(null,"timed-outcome-keys","timed-outcome-keys",-304514980),timed_outcome_keys,new cljs.core.Keyword(null,"beta-keys","beta-keys",-1150961314),beta_keys,new cljs.core.Keyword(null,"all-S0","all-S0",2021249433),S0_PLUS_,new cljs.core.Keyword(null,"S0","S0",-1501768316),S0], 0)),inputs_key),baseline_cifs_key),baseline_vars_key)),new cljs.core.Keyword(null,"reg-factors","reg-factors",-4597615),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [organ,fmaps], null)], null);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","inc-test-day","transplants.events/inc-test-day",153447396),(function (db,p__67846){
var vec__67847 = p__67846;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67847,(0),null);
var step = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67847,(1),null);
return cljs.core.update.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"test-day","test-day",-1759386244),(function (p1__67845_SHARP_){
return (step + p1__67845_SHARP_);
}));
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","test-day","transplants.events/test-day",-401043247),(function (db,p__67851){
var vec__67853 = p__67851;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67853,(0),null);
var day = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67853,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"test-day","test-day",-1759386244),day);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","selected-vis","transplants.events/selected-vis",368577841),(function (db,p__67857){
var vec__67859 = p__67857;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67859,(0),null);
var selection = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67859,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"selected-vis","selected-vis",624123356),selection);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","store-response","transplants.events/store-response",-149290938),(function (db,p__67862){
var vec__67864 = p__67862;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67864,(0),null);
var data_path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67864,(1),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67864,(2),null);
return cljs.core.assoc_in(db,data_path,cljs.reader.read_string.cljs$core$IFn$_invoke$arity$1(response));
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","modal-data","transplants.events/modal-data",1130692203),(function (db,p__67867){
var vec__67868 = p__67867;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67868,(0),null);
var data = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67868,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"modal-data","modal-data",-1303581308),data);
}));
/**
 * store and transpose labelled column data to row maps format.
 * :todo - perhaps we should store the column format too to avoid regenerating it. I think we use column format for baselines?
 */
transplants.events.transpose_response = (function transplants$events$transpose_response(db,p__67874){
var vec__67875 = p__67874;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67875,(0),null);
var data_path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67875,(1),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67875,(2),null);
return cljs.core.assoc_in(db,data_path,winton_utils.data_frame.map_of_vs__GT_v_of_maps(cljs.reader.read_string.cljs$core$IFn$_invoke$arity$1(response)));
});
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","transpose-response","transplants.events/transpose-response",252239069),transplants.events.transpose_response);
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","transpose-response-centres","transplants.events/transpose-response-centres",-1924757034),transplants.events.transpose_response);
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","bad-response","transplants.events/bad-response",453308191),(function (db,p__67878){
var vec__67879 = p__67878;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67879,(0),null);
var _data_path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67879,(1),null);
var _response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67879,(2),null);
console.error();

return db;
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","store-metadata-response","transplants.events/store-metadata-response",1414405850),(function (p__67883,p__67884){
var map__67885 = p__67883;
var map__67885__$1 = cljs.core.__destructure_map(map__67885);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67885__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__67886 = p__67884;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67886,(0),null);
var _data_path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67886,(1),null);
var response = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67886,(2),null);
var mdata = cljs.reader.read_string.cljs$core$IFn$_invoke$arity$1(response);
var organs = (mdata.cljs$core$IFn$_invoke$arity$1 ? mdata.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"organ-order","organ-order",-291569616)) : mdata.call(null,new cljs.core.Keyword(null,"organ-order","organ-order",-291569616)));
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"db","db",993250759),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"mdata","mdata",-2098476679),mdata),new cljs.core.Keyword("transplants.fx","load-organ-centres","transplants.fx/load-organ-centres",-273149344),organs], null);
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","load-metadata","transplants.events/load-metadata",34724586),(function (p__67891,p__67892){
var map__67893 = p__67891;
var map__67893__$1 = cljs.core.__destructure_map(map__67893);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67893__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__67894 = p__67892;
var _evt = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67894,(0),null);
var vec__67897 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67894,(1),null);
var path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67897,(0),null);
var data_path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67897,(1),null);
if((cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(db,data_path) == null)){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"http-xhrio","http-xhrio",1846166714),new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"uri","uri",-774711847),path,new cljs.core.Keyword(null,"timeout","timeout",-318625318),(8000),new cljs.core.Keyword(null,"format","format",-1306924766),(ajax.core.text_request_format.cljs$core$IFn$_invoke$arity$0 ? ajax.core.text_request_format.cljs$core$IFn$_invoke$arity$0() : ajax.core.text_request_format.call(null)),new cljs.core.Keyword(null,"response-format","response-format",1664465322),(ajax.core.text_response_format.cljs$core$IFn$_invoke$arity$0 ? ajax.core.text_response_format.cljs$core$IFn$_invoke$arity$0() : ajax.core.text_response_format.call(null)),new cljs.core.Keyword(null,"on-success","on-success",1786904109),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.events","store-metadata-response","transplants.events/store-metadata-response",1414405850),data_path], null),new cljs.core.Keyword(null,"on-failure","on-failure",842888245),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.events","bad-response","transplants.events/bad-response",453308191),data_path], null)], null)], null);
} else {
return null;
}
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","load-edn","transplants.events/load-edn",621053308),(function (p__67904,p__67905){
var map__67906 = p__67904;
var map__67906__$1 = cljs.core.__destructure_map(map__67906);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67906__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__67907 = p__67905;
var _evt = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67907,(0),null);
var vec__67910 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67907,(1),null);
var path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67910,(0),null);
var data_path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67910,(1),null);
if((cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(db,data_path) == null)){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"http-xhrio","http-xhrio",1846166714),new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"uri","uri",-774711847),path,new cljs.core.Keyword(null,"timeout","timeout",-318625318),(8000),new cljs.core.Keyword(null,"format","format",-1306924766),(ajax.core.text_request_format.cljs$core$IFn$_invoke$arity$0 ? ajax.core.text_request_format.cljs$core$IFn$_invoke$arity$0() : ajax.core.text_request_format.call(null)),new cljs.core.Keyword(null,"response-format","response-format",1664465322),(ajax.core.text_response_format.cljs$core$IFn$_invoke$arity$0 ? ajax.core.text_response_format.cljs$core$IFn$_invoke$arity$0() : ajax.core.text_response_format.call(null)),new cljs.core.Keyword(null,"on-success","on-success",1786904109),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.events","store-response","transplants.events/store-response",-149290938),data_path], null),new cljs.core.Keyword(null,"on-failure","on-failure",842888245),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.events","bad-response","transplants.events/bad-response",453308191),data_path], null)], null)], null);
} else {
return null;
}
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","load-bundles","transplants.events/load-bundles",-875632197),(function (p__67915,p__67916){
var map__67917 = p__67915;
var map__67917__$1 = cljs.core.__destructure_map(map__67917);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67917__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__67918 = p__67916;
var _evt = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67918,(0),null);
var vec__67921 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67918,(1),null);
var path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67921,(0),null);
var data_path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67921,(1),null);
if((cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(db,data_path) == null)){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"http-xhrio","http-xhrio",1846166714),new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"uri","uri",-774711847),path,new cljs.core.Keyword(null,"timeout","timeout",-318625318),(8000),new cljs.core.Keyword(null,"format","format",-1306924766),(ajax.core.text_request_format.cljs$core$IFn$_invoke$arity$0 ? ajax.core.text_request_format.cljs$core$IFn$_invoke$arity$0() : ajax.core.text_request_format.call(null)),new cljs.core.Keyword(null,"response-format","response-format",1664465322),(ajax.core.text_response_format.cljs$core$IFn$_invoke$arity$0 ? ajax.core.text_response_format.cljs$core$IFn$_invoke$arity$0() : ajax.core.text_response_format.call(null)),new cljs.core.Keyword(null,"on-success","on-success",1786904109),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.events","store-bundle-inputs","transplants.events/store-bundle-inputs",1357258480),data_path], null),new cljs.core.Keyword(null,"on-failure","on-failure",842888245),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.events","bad-response","transplants.events/bad-response",453308191),data_path], null)], null)], null);
} else {
return null;
}
}));
transplants.events.load_and_transpose = (function transplants$events$load_and_transpose(p__67926,p__67927){
var map__67931 = p__67926;
var map__67931__$1 = cljs.core.__destructure_map(map__67931);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67931__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__67932 = p__67927;
var _evt = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67932,(0),null);
var vec__67935 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67932,(1),null);
var path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67935,(0),null);
var data_path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67935,(1),null);
if((cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(db,data_path) == null)){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"http-xhrio","http-xhrio",1846166714),new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"uri","uri",-774711847),path,new cljs.core.Keyword(null,"timeout","timeout",-318625318),(8000),new cljs.core.Keyword(null,"format","format",-1306924766),(ajax.core.text_request_format.cljs$core$IFn$_invoke$arity$0 ? ajax.core.text_request_format.cljs$core$IFn$_invoke$arity$0() : ajax.core.text_request_format.call(null)),new cljs.core.Keyword(null,"response-format","response-format",1664465322),(ajax.core.text_response_format.cljs$core$IFn$_invoke$arity$0 ? ajax.core.text_response_format.cljs$core$IFn$_invoke$arity$0() : ajax.core.text_response_format.call(null)),new cljs.core.Keyword(null,"on-success","on-success",1786904109),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.events","transpose-response-centres","transplants.events/transpose-response-centres",-1924757034),data_path], null),new cljs.core.Keyword(null,"on-failure","on-failure",842888245),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.events","bad-response","transplants.events/bad-response",453308191),data_path], null)], null)], null);
} else {
return null;
}
});
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","load-and-transpose","transplants.events/load-and-transpose",821155585),transplants.events.load_and_transpose);
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","load-and-transpose-centres","transplants.events/load-and-transpose-centres",884756009),transplants.events.load_and_transpose);
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("transplants.events","load-and-transpose-always","transplants.events/load-and-transpose-always",-456586381),(function (p__67939,p__67940){
var map__67941 = p__67939;
var map__67941__$1 = cljs.core.__destructure_map(map__67941);
var _db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__67941__$1,new cljs.core.Keyword(null,"_db","_db",1668840064));
var vec__67942 = p__67940;
var _evt = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67942,(0),null);
var vec__67945 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67942,(1),null);
var path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67945,(0),null);
var data_path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__67945,(1),null);
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"http-xhrio","http-xhrio",1846166714),new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"uri","uri",-774711847),path,new cljs.core.Keyword(null,"timeout","timeout",-318625318),(8000),new cljs.core.Keyword(null,"format","format",-1306924766),(ajax.core.text_request_format.cljs$core$IFn$_invoke$arity$0 ? ajax.core.text_request_format.cljs$core$IFn$_invoke$arity$0() : ajax.core.text_request_format.call(null)),new cljs.core.Keyword(null,"response-format","response-format",1664465322),(ajax.core.text_response_format.cljs$core$IFn$_invoke$arity$0 ? ajax.core.text_response_format.cljs$core$IFn$_invoke$arity$0() : ajax.core.text_response_format.call(null)),new cljs.core.Keyword(null,"on-success","on-success",1786904109),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.events","transpose-response","transplants.events/transpose-response",252239069),data_path], null),new cljs.core.Keyword(null,"on-failure","on-failure",842888245),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.events","bad-response","transplants.events/bad-response",453308191),data_path], null)], null)], null);
}));

//# sourceMappingURL=transplants.events.js.map
