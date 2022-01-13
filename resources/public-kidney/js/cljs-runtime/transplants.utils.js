goog.provide('transplants.utils');
/**
 * @define {string}
 */
transplants.utils.ORGAN = goog.define("transplants.utils.ORGAN","");
/**
 * Does a field contain something?
 */
transplants.utils.filled_in_QMARK_ = (function transplants$utils$filled_in_QMARK_(field){
return (((!((field == null)))) && ((!(clojure.string.blank_QMARK_(field)))));
});
/**
 * Locate the info for an organ & centre from organ-centres
 */
transplants.utils.get_centre_info = (function transplants$utils$get_centre_info(organ_centres,organ,centre){
return cljs.core.first(cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.group_by(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.keyword,new cljs.core.Keyword(null,"key","key",-1516042587)),(organ.cljs$core$IFn$_invoke$arity$1 ? organ.cljs$core$IFn$_invoke$arity$1(organ_centres) : organ.call(null,organ_centres))),centre));
});
/**
 * Locate the info for an organ & centre from organ-centres
 */
transplants.utils.get_centre_info_STAR_ = (function transplants$utils$get_centre_info_STAR_(organ_centres,organ,centre){
return cljs.core.first(cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.group_by(new cljs.core.Keyword(null,"key","key",-1516042587),(function (){var fexpr__67481 = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(organ);
return (fexpr__67481.cljs$core$IFn$_invoke$arity$1 ? fexpr__67481.cljs$core$IFn$_invoke$arity$1(organ_centres) : fexpr__67481.call(null,organ_centres));
})()),cljs.core.name(centre)));
});
/**
 * Given reitit path-params, return the organ/centre/tool path keys
 */
transplants.utils.path_names = (function transplants$utils$path_names(path_params){
return cljs.core.juxt.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"organ","organ",-29862572),new cljs.core.Keyword(null,"centre","centre",-948091970),new cljs.core.Keyword(null,"tool","tool",-1298696470),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"tab","tab",-559583621)], 0))(path_params);
});
/**
 * Given reitit path-params, return the organ/centre/tool path keys
 */
transplants.utils.path_keys = (function transplants$utils$path_keys(path_params){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.keyword,transplants.utils.path_names(path_params));
});
/**
 * Returns a vector of tool keywords for an organ, read from mdata (data from /metadata.edn).
 *   If mdata has not yet arrived, or organ is invalid, will return nil.
 */
transplants.utils.get_tools = (function transplants$utils$get_tools(mdata,organ){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(organ),new cljs.core.Keyword(null,"tool-order","tool-order",450812257)], null));
});
/**
 * returns tool metadata for an organ. Returns nil if called before mdata is available (i.e. if it's nil)
 */
transplants.utils.get_tool_meta = (function transplants$utils$get_tool_meta(mdata,organ,tool){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(mdata,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(organ),new cljs.core.Keyword(null,"tools","tools",-1241731990),tool], null));
});
/**
 * Reconsruct a sheet key from a tool key and the sheet type suffix
 * e.g. :waiting '-inputs' -> :waiting-inputs
 */
transplants.utils.make_sheet_key = (function transplants$utils$make_sheet_key(tool,suffix){
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$1([cljs.core.name(tool),cljs.core.str.cljs$core$IFn$_invoke$arity$1(suffix)].join(''));
});
transplants.utils.year = 365.25;
transplants.utils.quarter = (transplants.utils.year / (4));
transplants.utils.month = (transplants.utils.year / (12));
transplants.utils.week = (7);
transplants.utils.day__GT_week = (function transplants$utils$day__GT_week(d){
return Math.ceil((d / transplants.utils.week));
});
transplants.utils.day__GT_month = (function transplants$utils$day__GT_month(d){
return Math.ceil((d / transplants.utils.month));
});
transplants.utils.day__GT_quarter = (function transplants$utils$day__GT_quarter(d){
return Math.ceil((d / transplants.utils.quarter));
});
/**
 * Given an x and an accessor function for day in x, discover whether the day is within given period of days
 */
transplants.utils.day_in_QMARK_ = (function transplants$utils$day_in_QMARK_(get_day,period){
return (function (x){
return ((get_day.cljs$core$IFn$_invoke$arity$1 ? get_day.cljs$core$IFn$_invoke$arity$1(x) : get_day.call(null,x)) <= period);
});
});
transplants.utils.week__GT_day = (function transplants$utils$week__GT_day(w){
return Math.round((w * transplants.utils.week));
});
transplants.utils.quarter__GT_day = (function transplants$utils$quarter__GT_day(q){
return Math.round((q * transplants.utils.quarter));
});
/**
 * Convert a day count to the nearest whole year
 */
transplants.utils.day__GT_year = (function transplants$utils$day__GT_year(d){
return Math.round((d / 365.25));
});
/**
 * Convert a year count to the nearest whole day
 */
transplants.utils.year__GT_day = (function transplants$utils$year__GT_day(y){
return Math.round((y * 365.25));
});
/**
 * transpose  matrix
 */
transplants.utils.transpose = cljs.core.partial.cljs$core$IFn$_invoke$arity$3(cljs.core.apply,cljs.core.map,cljs.core.vector);
/**
 * extract the outcome-keys used in a raw baseline-cifs table, eliminating the cif- prefix
 */
transplants.utils.baseline_outcome_names = (function transplants$utils$baseline_outcome_names(baseline_cifs){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__67497_SHARP_){
return cljs.core.subs.cljs$core$IFn$_invoke$arity$2(p1__67497_SHARP_,(4));
}),cljs.core.remove.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["centre",null,"days",null], null), null),cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.name,cljs.core.keys(cljs.core.first(baseline_cifs)))));
});
/**
 * extract the outcome-keys used in a raw baseline-cifs table, eliminating the cif- prefix
 */
transplants.utils.baseline_cif_outcome_keys = (function transplants$utils$baseline_cif_outcome_keys(baseline_cifs){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__67499_SHARP_){
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(["cif-",cljs.core.name(p1__67499_SHARP_)].join(''));
}),transplants.utils.baseline_outcome_names(baseline_cifs));
});

//# sourceMappingURL=transplants.utils.js.map
