goog.provide('transplants.vis2');
var module$node_modules$react_bootstrap$cjs$index=shadow.js.require("module$node_modules$react_bootstrap$cjs$index", {});
/**
 * The Fs are the probabilities of leaving the list due to the various outcomes - see David's 
 * paper at doc/David/transplant-non-simulation.pdf for detail.
 * 
 * In Cox results we can always calculate a residual amount to make the Fs total to 100% on each day.
 * As we may need to plot this residual and decorate it, we should calculate it and make it explicit.
 * 
 * Given a seq of Fs for one day, return the residual for that day
 */
transplants.vis2.residual = (function transplants$vis2$residual(fs){
return ((1) - cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,fs));
});
/**
 * We will be plotting outcomes including residuals in some plot order specified in the metadata.
 * `outcomes` is a seq of baseline-cif outcome headers (less any cif- prefix, and as keywords)
 * `fs` are initially in that same order.
 * Both outcomes and fs are assumed to be in spreadsheet baseline-cif column order.
 * Return fs converted to a map keyed by outcome and with an additional residual outcome.
 */
transplants.vis2.fs_mapped = (function transplants$vis2$fs_mapped(outcomes,fs){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.map,cljs.core.vector,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [outcomes,fs], null))),new cljs.core.Keyword(null,"residual","residual",2138156039),transplants.vis2.residual(fs));
});
/**
 * order by outcome is a map of outcome-key to plot order.
 * fsk are a seq of [outcome-key fs] key-values like '([:residual 0.30000000000000004] [:transplant 0.3] [:death 0.4]).
 * plot-order is like [:transplant :residual :death]
 * Result would be (0.3 0.30000000000000004 0.4)
 */
transplants.vis2.fs_in_order = (function transplants$vis2$fs_in_order(plot_order,fsm){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (data_key){
return (fsm.cljs$core$IFn$_invoke$arity$1 ? fsm.cljs$core$IFn$_invoke$arity$1(data_key) : fsm.call(null,data_key));
}),plot_order);
});
/**
 * convert an ordered fs to a map containing the original ordered-fs and its partial sums.
 * Include integer valued percentage approximations for fs and cum-fs adjusted so the sum of the 
 * int-fs is 100. The alogithm seeks to minimise the error introduced by the adjustment.
 */
transplants.vis2.int_fs_series = (function transplants$vis2$int_fs_series(ordered_fs){
var pc_fs = cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__68759_SHARP_){
return ((100) * p1__68759_SHARP_);
}),ordered_fs);
var int_fs = (function (){var int_pc_fs = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (pc_fs){
return (function (p1__68760_SHARP_){
return Math.round(p1__68760_SHARP_);
});})(pc_fs))
,pc_fs);
while(true){
var err_pc_fs = cljs.core.map.cljs$core$IFn$_invoke$arity$3(((function (int_pc_fs,pc_fs){
return (function (p1__68761_SHARP_,p2__68762_SHARP_){
return (p1__68761_SHARP_ - p2__68762_SHARP_);
});})(int_pc_fs,pc_fs))
,int_pc_fs,pc_fs);
var sum_int_pc_fs = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,int_pc_fs);
var sum_err_pc_fs = (sum_int_pc_fs - (100));
if((sum_err_pc_fs === (0))){
return int_pc_fs;
} else {
var cmp = (((sum_err_pc_fs > (0)))?cljs.core._GT_:cljs.core._LT_);
var adjust = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (int_pc_fs,cmp,err_pc_fs,sum_int_pc_fs,sum_err_pc_fs,pc_fs){
return (function (p__68775,p__68776){
var vec__68778 = p__68775;
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__68778,(0),null);
var me = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__68778,(1),null);
var vec__68781 = p__68776;
var j = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__68781,(0),null);
var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__68781,(1),null);
if(cljs.core.truth_((cmp.cljs$core$IFn$_invoke$arity$2 ? cmp.cljs$core$IFn$_invoke$arity$2(e,me) : cmp.call(null,e,me)))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [j,e], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,me], null);
}
});})(int_pc_fs,cmp,err_pc_fs,sum_int_pc_fs,sum_err_pc_fs,pc_fs))
,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0)], null),cljs.core.zipmap(cljs.core.range.cljs$core$IFn$_invoke$arity$0(),err_pc_fs));
var G__69130 = cljs.core.update.cljs$core$IFn$_invoke$arity$3(int_pc_fs,cljs.core.first(adjust),(((sum_err_pc_fs > (0)))?cljs.core.dec:cljs.core.inc));
int_pc_fs = G__69130;
continue;
}
break;
}
})();
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"fs","fs",-2122926244),ordered_fs,new cljs.core.Keyword(null,"cum-fs","cum-fs",-164423437),cljs.core.reductions.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,ordered_fs),new cljs.core.Keyword(null,"int-fs","int-fs",1685464335),int_fs,new cljs.core.Keyword(null,"cum-int-fs","cum-int-fs",-2123649193),cljs.core.reductions.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,int_fs)], null);
});
/**
 * Take a time series of Fs with Fs in spreadsheet column order.
 * Add residuals, and reorder them into a plot data series, adding cumulative values to facilitate
 * a stacked plot.
 */
transplants.vis2.fs_time_series = (function transplants$vis2$fs_time_series(outcomes,plot_order,t_fs){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__68788){
var vec__68789 = p__68788;
var t = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__68789,(0),null);
var fs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__68789,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [t,transplants.vis2.int_fs_series(transplants.vis2.fs_in_order(plot_order,transplants.vis2.fs_mapped(outcomes,fs)))], null);
}),t_fs);
});
/**
 * Calculate an aspect ratio as a padding CSS %. 
 * See https://www.w3schools.com/howto/howto_css_aspect_ratio.asp
 */
transplants.vis2.aspect_ratio = (function transplants$vis2$aspect_ratio(width,height){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(Math.floor(((100) * (height / width)))),"%"].join('');
});
/**
 * Take a seq of outcome keys in plot order and render a styled legend.
 * The 3-arity version allows an option map where a value and a custom position can be
 * specified - both are functions of the integer plot-order of the series.
 */
transplants.vis2.svg_outcome_legend = (function transplants$vis2$svg_outcome_legend(var_args){
var G__68802 = arguments.length;
switch (G__68802) {
case 2:
return transplants.vis2.svg_outcome_legend.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return transplants.vis2.svg_outcome_legend.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(transplants.vis2.svg_outcome_legend.cljs$core$IFn$_invoke$arity$2 = (function (plot_order,data_styles){
return transplants.vis2.svg_outcome_legend.cljs$core$IFn$_invoke$arity$3(plot_order,data_styles,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"string-value-f","string-value-f",639665654),cljs.core.constantly(""),new cljs.core.Keyword(null,"position-f","position-f",267141307),(function (p1__68796_SHARP_){
return ["translate(0 ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(((30) + ((80) * p1__68796_SHARP_))),")"].join('');
})], null));
}));

(transplants.vis2.svg_outcome_legend.cljs$core$IFn$_invoke$arity$3 = (function (plot_order,data_styles,p__68807){
var map__68808 = p__68807;
var map__68808__$1 = cljs.core.__destructure_map(map__68808);
var width = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__68808__$1,new cljs.core.Keyword(null,"width","width",-384071477),(255));
var height = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__68808__$1,new cljs.core.Keyword(null,"height","height",1025178622),(60));
var string_value_f = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68808__$1,new cljs.core.Keyword(null,"string-value-f","string-value-f",639665654));
var position_f = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68808__$1,new cljs.core.Keyword(null,"position-f","position-f",267141307));
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"<>","<>",1280186386)], null),cljs.core.map.cljs$core$IFn$_invoke$arity$3((function (i,data_key){
var styles = (data_styles.cljs$core$IFn$_invoke$arity$1 ? data_styles.cljs$core$IFn$_invoke$arity$1(data_key) : data_styles.call(null,data_key));
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"transform","transform",1381301764),(position_f.cljs$core$IFn$_invoke$arity$1 ? position_f.cljs$core$IFn$_invoke$arity$1(i) : position_f.call(null,i)),new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(data_key),"-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"rect","rect",-108902628),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"x","x",2099068185),(0),new cljs.core.Keyword(null,"y","y",-1757859776),(0),new cljs.core.Keyword(null,"width","width",-384071477),width,new cljs.core.Keyword(null,"height","height",1025178622),height], null),transplants.ui.svg_styles(styles)], 0))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",-1790561697),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"x","x",2099068185),(10),new cljs.core.Keyword(null,"y","y",-1757859776),(40),new cljs.core.Keyword(null,"fill","fill",883462889),new cljs.core.Keyword(null,"label-fill","label-fill",1868368099).cljs$core$IFn$_invoke$arity$1(styles),new cljs.core.Keyword(null,"font-size","font-size",-1847940346),(25)], null),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"label","label",1718410804).cljs$core$IFn$_invoke$arity$1(styles)),cljs.core.str.cljs$core$IFn$_invoke$arity$1((string_value_f.cljs$core$IFn$_invoke$arity$1 ? string_value_f.cljs$core$IFn$_invoke$arity$1(i) : string_value_f.call(null,i)))].join('')], null)], null);
}),cljs.core.range.cljs$core$IFn$_invoke$arity$0(),plot_order));
}));

(transplants.vis2.svg_outcome_legend.cljs$lang$maxFixedArity = 3);

/**
 * Render an outcomes row header for the test-rig
 */
transplants.vis2.outcome_tr = (function transplants$vis2$outcome_tr(k,outcomes){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),k,new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"background-color","background-color",570434026),transplants.rgb.secondary,new cljs.core.Keyword(null,"color","color",1011675173),"#fff"], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566)], null),cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (k__$1,b){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),k__$1], null),clojure.string.replace(b,/-reasons/,"")], null);
}),outcomes)], null);
});
/**
 * expose calcluation in test
 */
transplants.vis2.test_rig = (function transplants$vis2$test_rig(p__68819){
var map__68820 = p__68819;
var map__68820__$1 = cljs.core.__destructure_map(map__68820);
var env = map__68820__$1;
var day = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68820__$1,new cljs.core.Keyword(null,"day","day",-274800446));
var beta_keys = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68820__$1,new cljs.core.Keyword(null,"beta-keys","beta-keys",-1150961314));
var outcomes = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68820__$1,new cljs.core.Keyword(null,"outcomes","outcomes",-2034044865));
var fmaps = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68820__$1,new cljs.core.Keyword(null,"fmaps","fmaps",-1655984758));
var s0 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68820__$1,new cljs.core.Keyword(null,"s0","s0",-350711836));
var sum_betas = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68820__$1,new cljs.core.Keyword(null,"sum-betas","sum-betas",-2024666066));
var F = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68820__$1,new cljs.core.Keyword(null,"F","F",-1115543258));
var factors = cljs.core.keys(fmaps);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Row,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin-top","margin-top",392161226),(20)], null)], null),(cljs.core.truth_(factors)?new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Col,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.ui.test_day_selector,"Results for test day:"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Row,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Col,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Table,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"striped","striped",-628686784),true,new cljs.core.Keyword(null,"bordered","bordered",-832486681),true,new cljs.core.Keyword(null,"hover","hover",-341141711),true], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"thead","thead",-291875296),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.vis2.outcome_tr,(1005),outcomes], null)], null),cljs.core.into.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tbody","tbody",-80678300),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),(1001)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"b","b",1482224470),"S",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sub","sub",-2093760025),"0"], null)], null)], null),cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (i,S0_i){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),i], null),transplants.model.to_precision(((1) - S0_i),(4))], null);
}),cljs.core.second(transplants.model.S0_for_day(s0,day)))], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),(1002)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"b","b",1482224470),"F"], null)], null),cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (i,F_i){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),i], null),transplants.model.to_precision(F_i,(4))], null);
}),cljs.core.second(transplants.model.S0_for_day(F,day)))], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),(1003)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"b","b",1482224470),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"font-size","font-size",-1847940346),(20)], null)], null),"\uD835\uDF2E \uD835\uDEFD",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sub","sub",-2093760025),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i","i",-1386841315),"\uD835\uDC8C"], null)], null),"\uD835\uDCCD",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sub","sub",-2093760025),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i","i",-1386841315),"\uD835\uDC8C"], null)], null)], null)], null),cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (i,sb){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),i], null),transplants.model.to_precision(sb,(4))], null);
}),sum_betas)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),(1004),new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"background-color","background-color",570434026),transplants.rgb.secondary,new cljs.core.Keyword(null,"color","color",1011675173),"#fff"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"Factor",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sub","sub",-2093760025),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i","i",-1386841315),"\uD835\uDC8C"], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"col-span","col-span",-232603210),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count(outcomes))], null),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"b","b",1482224470),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"font-size","font-size",-1847940346),(20)], null)], null),"\uD835\uDEFD",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sub","sub",-2093760025),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i","i",-1386841315),"\uD835\uDC8C"], null)], null),"\uD835\uDCCD",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sub","sub",-2093760025),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i","i",-1386841315),"\uD835\uDC8C"], null)], null)], null)], null)], null),transplants.vis2.outcome_tr((1006),outcomes),cljs.core.conj.cljs$core$IFn$_invoke$arity$1(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (i,p__68826){
var vec__68827 = p__68826;
var factor = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__68827,(0),null);
var fmap = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__68827,(1),null);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),i], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),i], null),factor], null),(cljs.core.truth_(fmap)?cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (j,b){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),j], null),transplants.model.to_precision(cljs.core.last(transplants.factors.selected_beta_x(env,factor,fmap,b)),(4))], null);
}),beta_keys):null)], null);
}),fmaps))], null))], null)], null)], null)], null):null)], null);
});
/**
 * Add default values to outcome styles
 */
transplants.vis2.bar_style = (function transplants$vis2$bar_style(styles){
var map__68834 = styles;
var map__68834__$1 = cljs.core.__destructure_map(map__68834);
var fill = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__68834__$1,new cljs.core.Keyword(null,"fill","fill",883462889),"#41af6b");
var stroke = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__68834__$1,new cljs.core.Keyword(null,"stroke","stroke",1741823555),"#fff");
var opacity = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__68834__$1,new cljs.core.Keyword(null,"opacity","opacity",397153780),0.7);
var stroke_width = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__68834__$1,new cljs.core.Keyword(null,"stroke-width","stroke-width",716836435),(1));
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"fill","fill",883462889),fill,new cljs.core.Keyword(null,"stroke","stroke",1741823555),stroke,new cljs.core.Keyword(null,"stroke-width","stroke-width",716836435),stroke_width,new cljs.core.Keyword(null,"opacity","opacity",397153780),opacity], null);
});
transplants.vis2.styles = cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"arrow","arrow",1071351425),new cljs.core.Keyword(null,"residual","residual",2138156039),new cljs.core.Keyword(null,"post-transplant","post-transplant",-1697398933),new cljs.core.Keyword(null,"graft","graft",-643427087),new cljs.core.Keyword(null,"inner","inner",-1383171215),new cljs.core.Keyword(null,"death","death",2026112826),new cljs.core.Keyword(null,"all-reasons","all-reasons",1847090236),new cljs.core.Keyword(null,"outer","outer",-375185956),new cljs.core.Keyword(null,"Survived","Survived",10186300),new cljs.core.Keyword(null,"transplant","transplant",-857281796),new cljs.core.Keyword(null,"from-listing","from-listing",916998333),new cljs.core.Keyword(null,"annotation","annotation",-344661666),new cljs.core.Keyword(null,"removal","removal",170016158)],["arrow--G__68835","residual--G__68835","post-transplant--G__68835","graft--G__68835","inner--G__68835","death--G__68835","all-reasons--G__68835","outer--G__68835","Survived--G__68835","transplant--G__68835","from-listing--G__68835","annotation--G__68835","removal--G__68835"]);

cljs_css_modules.runtime.inject_style_BANG_(cljs.core.apply.cljs$core$IFn$_invoke$arity$3(garden.core.css,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.PersistentVector(null, 13, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [".inner--G__68835",new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"fill","fill",883462889),"none",new cljs.core.Keyword(null,"stroke-opacity","stroke-opacity",-1191543159),(1),new cljs.core.Keyword(null,"stroke-width","stroke-width",716836435),(0),new cljs.core.Keyword(null,"stroke","stroke",1741823555),"#fa0"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [".outer--G__68835",new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"fill","fill",883462889),"#CCC",new cljs.core.Keyword(null,"stroke-opacity","stroke-opacity",-1191543159),(1),new cljs.core.Keyword(null,"stroke","stroke",1741823555),"#ccc"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [".transplant--G__68835",transplants.vis2.bar_style(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"fill","fill",883462889),"#41af6b"], null))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [".all-reasons--G__68835",transplants.vis2.bar_style(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"fill","fill",883462889),"#4866cb"], null))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [".removal--G__68835",transplants.vis2.bar_style(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"fill","fill",883462889),"#4b4d48"], null))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [".residual--G__68835",transplants.vis2.bar_style(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"fill","fill",883462889),"#4866cb"], null))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [".death--G__68835",transplants.vis2.bar_style(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"fill","fill",883462889),"#000000"], null))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [".post-transplant--G__68835",transplants.vis2.bar_style(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"fill","fill",883462889),"#008888"], null))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [".from-listing--G__68835",transplants.vis2.bar_style(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"fill","fill",883462889),"#4444AA"], null))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [".Survived--G__68835",transplants.vis2.bar_style(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"fill","fill",883462889),"#664488"], null))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [".graft--G__68835",transplants.vis2.bar_style(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"fill","fill",883462889),"#00AA44"], null))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [".annotation--G__68835",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"font-size","font-size",-1847940346),"13pt"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [".arrow--G__68835",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"stroke","stroke",1741823555),"#000",new cljs.core.Keyword(null,"stroke-width","stroke-width",716836435),"1.5px"], null)], null)], null)),"transplants.vis2","styles");
/**
 * returns a monoid for a given stagger threshold. The monoid calculates an array of booleans which indicates
 * whether labels should be staggered by looking at heights of labels in adjacent pairs.
 */
transplants.vis2.pairwise_stagger = (function transplants$vis2$pairwise_stagger(threshold){
return (function (staggers,p__68841){
var vec__68842 = p__68841;
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__68842,(0),null);
var vec__68845 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__68842,(1),null);
var f1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__68845,(0),null);
var f2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__68845,(1),null);
if(cljs.core.truth_((function (){var and__4251__auto__ = f2;
if(cljs.core.truth_(and__4251__auto__)){
return ((f1 + f2) < threshold);
} else {
return and__4251__auto__;
}
})())){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(staggers,i,true),(i + (1)),true);
} else {
return cljs.core.update.cljs$core$IFn$_invoke$arity$3(staggers,i,(function (p1__68838_SHARP_){
var or__4253__auto__ = p1__68838_SHARP_;
if(cljs.core.truth_(or__4253__auto__)){
return or__4253__auto__;
} else {
return null;
}
}));
}
});
});
/**
 * Take a sequence of values (the fs) to be plotted in a stacked bar chart. We want to label the bars with its
 * f-value which indicates the height of its bar. Bar heights can be smaller than the height of readable text, 
 * and as it's possible for 2 adjacent bars to be next to each other, their labels can overlap unless we stagger
 * them left to right. 
 * 
 * This function returns a vector indicating which of the f labels should be staggered. 
 */
transplants.vis2.label_staggers = (function transplants$vis2$label_staggers(threshold,fs){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(transplants.vis2.pairwise_stagger(threshold),cljs.core.PersistentVector.EMPTY,cljs.core.zipmap(cljs.core.range.cljs$core$IFn$_invoke$arity$0(),cljs.core.partition_all.cljs$core$IFn$_invoke$arity$3((2),(1),fs)));
});
/**
 * render a multiline bin label
 */
transplants.vis2.multiline_bin_label = (function transplants$vis2$multiline_bin_label(bin_label,x0,font_size){
return new cljs.core.Keyword(null,"into","into",-150836029).cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905)], null),cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (row,line){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",-1790561697),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"key","key",-1516042587),line,new cljs.core.Keyword(null,"x","x",2099068185),(x0 + new cljs.core.Keyword(null,"x-offset","x-offset",-1499732449).cljs$core$IFn$_invoke$arity$1(bin_label)),new cljs.core.Keyword(null,"y","y",-1757859776),(new cljs.core.Keyword(null,"y-offset","y-offset",-1716542).cljs$core$IFn$_invoke$arity$1(bin_label) + ((35) * row)),new cljs.core.Keyword(null,"font-size","font-size",-1847940346),font_size], null),line], null);
}),new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(bin_label)));
});
transplants.vis2.draw_bin_labels = (function transplants$vis2$draw_bin_labels(p__68852){
var map__68853 = p__68852;
var map__68853__$1 = cljs.core.__destructure_map(map__68853);
var bin_labels = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68853__$1,new cljs.core.Keyword(null,"bin-labels","bin-labels",-1917237450));
var spacing = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68853__$1,new cljs.core.Keyword(null,"spacing","spacing",204422175));
var offset = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68853__$1,new cljs.core.Keyword(null,"offset","offset",296498311));
var font_size = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68853__$1,new cljs.core.Keyword(null,"font-size","font-size",-1847940346));
var X = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68853__$1,new cljs.core.Keyword(null,"X","X",1705996313));
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),(1)], null)], null),cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (bar_index,bin_label){
var x0 = ((function (){var G__68854 = ((spacing * (bar_index + (1))));
return (X.cljs$core$IFn$_invoke$arity$1 ? X.cljs$core$IFn$_invoke$arity$1(G__68854) : X.call(null,G__68854));
})() - (X.cljs$core$IFn$_invoke$arity$1 ? X.cljs$core$IFn$_invoke$arity$1(offset) : X.call(null,offset)));
return transplants.vis2.multiline_bin_label(bin_label,x0,font_size);
}),bin_labels));
});
transplants.vis2.draw_bars = (function transplants$vis2$draw_bars(p__68855){
var map__68856 = p__68855;
var map__68856__$1 = cljs.core.__destructure_map(map__68856);
var X = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68856__$1,new cljs.core.Keyword(null,"X","X",1705996313));
var spacing = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68856__$1,new cljs.core.Keyword(null,"spacing","spacing",204422175));
var data_styles = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68856__$1,new cljs.core.Keyword(null,"data-styles","data-styles",-12538237));
var offset = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68856__$1,new cljs.core.Keyword(null,"offset","offset",296498311));
var bar_width = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68856__$1,new cljs.core.Keyword(null,"bar-width","bar-width",1233240523));
var Y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68856__$1,new cljs.core.Keyword(null,"Y","Y",-560717356));
var time_series = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68856__$1,new cljs.core.Keyword(null,"time-series","time-series",1050573973));
var bin_labels = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68856__$1,new cljs.core.Keyword(null,"bin-labels","bin-labels",-1917237450));
var data_keys = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68856__$1,new cljs.core.Keyword(null,"data-keys","data-keys",1654526230));
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),(2)], null)], null),cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (bar_index,bin_label){
var x0 = ((function (){var G__68861 = ((spacing * (bar_index + (1))));
return (X.cljs$core$IFn$_invoke$arity$1 ? X.cljs$core$IFn$_invoke$arity$1(G__68861) : X.call(null,G__68861));
})() - (X.cljs$core$IFn$_invoke$arity$1 ? X.cljs$core$IFn$_invoke$arity$1(offset) : X.call(null,offset)));
var vec__68857 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(time_series,new cljs.core.Keyword(null,"time-index","time-index",1670884208).cljs$core$IFn$_invoke$arity$1(bin_label));
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__68857,(0),null);
var map__68860 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__68857,(1),null);
var map__68860__$1 = cljs.core.__destructure_map(map__68860);
var fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68860__$1,new cljs.core.Keyword(null,"fs","fs",-2122926244));
var cum_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68860__$1,new cljs.core.Keyword(null,"cum-fs","cum-fs",-164423437));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"<>","<>",1280186386),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["bar-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(bar_index)].join('')], null)], null),cljs.core.map.cljs$core$IFn$_invoke$arity$4((function (data_key,cif,cum_cif){
var styles = (data_styles.cljs$core$IFn$_invoke$arity$1 ? data_styles.cljs$core$IFn$_invoke$arity$1(data_key) : data_styles.call(null,data_key));
var y0 = ((Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1(cum_cif) : Y.call(null,cum_cif)) - (Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1(cif) : Y.call(null,cif)));
var h = ((Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1(cum_cif) : Y.call(null,cum_cif)) - (function (){var G__68862 = (cum_cif - cif);
return (Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1(G__68862) : Y.call(null,G__68862));
})());
if(cljs.core.not(isNaN(y0))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"rect","rect",-108902628),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"key","key",-1516042587),data_key,new cljs.core.Keyword(null,"x","x",2099068185),x0,new cljs.core.Keyword(null,"y","y",-1757859776),y0,new cljs.core.Keyword(null,"width","width",-384071477),bar_width,new cljs.core.Keyword(null,"height","height",1025178622),h,new cljs.core.Keyword(null,"data-title","data-title",-83549535),cif], null),transplants.ui.svg_styles(styles)], 0))], null)], null);
} else {
return null;
}
}),data_keys,fs,cum_fs))], null);
}),bin_labels));
});
transplants.vis2.draw_percents = (function transplants$vis2$draw_percents(p__68864){
var map__68865 = p__68864;
var map__68865__$1 = cljs.core.__destructure_map(map__68865);
var X = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68865__$1,new cljs.core.Keyword(null,"X","X",1705996313));
var spacing = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68865__$1,new cljs.core.Keyword(null,"spacing","spacing",204422175));
var data_styles = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68865__$1,new cljs.core.Keyword(null,"data-styles","data-styles",-12538237));
var data_count = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68865__$1,new cljs.core.Keyword(null,"data-count","data-count",1898198662));
var offset = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68865__$1,new cljs.core.Keyword(null,"offset","offset",296498311));
var bar_width = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68865__$1,new cljs.core.Keyword(null,"bar-width","bar-width",1233240523));
var Y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68865__$1,new cljs.core.Keyword(null,"Y","Y",-560717356));
var time_series = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68865__$1,new cljs.core.Keyword(null,"time-series","time-series",1050573973));
var bin_labels = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68865__$1,new cljs.core.Keyword(null,"bin-labels","bin-labels",-1917237450));
var data_keys = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68865__$1,new cljs.core.Keyword(null,"data-keys","data-keys",1654526230));
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),(3),new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"opacity","opacity",397153780),(1)], null)], null)], null),cljs.core.map.cljs$core$IFn$_invoke$arity$3((function (bar_index,bin_label){
var vec__68866 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(time_series,new cljs.core.Keyword(null,"time-index","time-index",1670884208).cljs$core$IFn$_invoke$arity$1(bin_label));
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__68866,(0),null);
var map__68869 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__68866,(1),null);
var map__68869__$1 = cljs.core.__destructure_map(map__68869);
var fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68869__$1,new cljs.core.Keyword(null,"fs","fs",-2122926244));
var cum_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68869__$1,new cljs.core.Keyword(null,"cum-fs","cum-fs",-164423437));
var int_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68869__$1,new cljs.core.Keyword(null,"int-fs","int-fs",1685464335));
var x0 = (((function (){var G__68870 = ((spacing * (bar_index + (1))));
return (X.cljs$core$IFn$_invoke$arity$1 ? X.cljs$core$IFn$_invoke$arity$1(G__68870) : X.call(null,G__68870));
})() - (X.cljs$core$IFn$_invoke$arity$1 ? X.cljs$core$IFn$_invoke$arity$1(offset) : X.call(null,offset))) - (10));
var x_mid = ((x0 + (bar_width / (2))) + (0));
var staggers = transplants.vis2.label_staggers(0.12,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__68863_SHARP_){
if((p1__68863_SHARP_ == null)){
return (0);
} else {
return p1__68863_SHARP_;
}
}),fs));
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),bar_index], null)], null),cljs.core.conj.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$variadic((function (i,data_key,cif,cum_cif,int_fs__$1){
var styles = (data_styles.cljs$core$IFn$_invoke$arity$1 ? data_styles.cljs$core$IFn$_invoke$arity$1(data_key) : data_styles.call(null,data_key));
var y0 = (((data_count > (1)))?((Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1(cum_cif) : Y.call(null,cum_cif)) - (Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1(cif) : Y.call(null,cif))):(Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1(cif) : Y.call(null,cif)));
var h = (((data_count > (1)))?((Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1(cum_cif) : Y.call(null,cum_cif)) - (function (){var G__68871 = (cum_cif - cif);
return (Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1(G__68871) : Y.call(null,G__68871));
})()):((Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1((0)) : Y.call(null,(0))) - (Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1(cif) : Y.call(null,cif))));
var y_mid = (y0 + (h / (2)));
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"transform","transform",1381301764),["translate(",cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_((staggers.cljs$core$IFn$_invoke$arity$1 ? staggers.cljs$core$IFn$_invoke$arity$1(i) : staggers.call(null,i)))?((cljs.core.odd_QMARK_(i))?(18):(-54)):(((cif < (1)))?(-20):(-30))))," 10)"].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"rect","rect",-108902628),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"x","x",2099068185),(x_mid - (5)),new cljs.core.Keyword(null,"width","width",-384071477),(((cif >= (1)))?(90):(((cif < 0.1))?(70):(70)
)),new cljs.core.Keyword(null,"y","y",-1757859776),(y_mid - (30)),new cljs.core.Keyword(null,"height","height",1025178622),(40),new cljs.core.Keyword(null,"rx","rx",1627208482),(10)], null),transplants.ui.svg_styles(styles)], 0))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",-1790561697),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"x","x",2099068185),x_mid,new cljs.core.Keyword(null,"y","y",-1757859776),y_mid,new cljs.core.Keyword(null,"font-size","font-size",-1847940346),(30),new cljs.core.Keyword(null,"fill","fill",883462889),new cljs.core.Keyword(null,"label-fill","label-fill",1868368099).cljs$core$IFn$_invoke$arity$1(styles)], null),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(int_fs__$1),"%"].join('')], null)], null);

}),cljs.core.range.cljs$core$IFn$_invoke$arity$0(),data_keys,fs,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cum_fs,int_fs], 0))));
}),cljs.core.range.cljs$core$IFn$_invoke$arity$0(),bin_labels));
});
transplants.vis2.tool_metadata = (function transplants$vis2$tool_metadata(env,organ,tool){
cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(env,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"mdata","mdata",-2098476679),organ,new cljs.core.Keyword(null,"tools","tools",-1241731990),tool], null));

return medley.core.deep_merge.cljs$core$IFn$_invoke$arity$2(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(env,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"mdata","mdata",-2098476679),organ,new cljs.core.Keyword(null,"tools","tools",-1241731990),new cljs.core.Keyword(null,"default","default",-1987822328)], null)),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(env,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"mdata","mdata",-2098476679),organ,new cljs.core.Keyword(null,"tools","tools",-1241731990),tool], null)));
});
/**
 * Draw a stacked bar chart.
 * x is a Linear scale defined in svg.scales.Linear containing
 *  :in - an input range of numbers to plot on the x-axis.
 *  :out - an equivalent x coordinate in he SVG window.
 * X is a function mapping between the two
 * y and Y are similar for the Y axis
 * sample-days are indices into the cif data-series at which bars should be drawn.
 * outcomes are the cif data-series
 */
transplants.vis2.stacked_bar_chart = (function transplants$vis2$stacked_bar_chart(p__68872){
var map__68873 = p__68872;
var map__68873__$1 = cljs.core.__destructure_map(map__68873);
var params = map__68873__$1;
var data_keys = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68873__$1,new cljs.core.Keyword(null,"data-keys","data-keys",1654526230));
var tool_mdata = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68873__$1,new cljs.core.Keyword(null,"tool-mdata","tool-mdata",-1013259695));
var params__$1 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(params,new cljs.core.Keyword(null,"bin-labels","bin-labels",-1917237450),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"bars","bars",-586907130),new cljs.core.Keyword(null,"labels","labels",-626734591)], null)),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"spacing","spacing",204422175),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"bars","bars",-586907130),new cljs.core.Keyword(null,"spacing","spacing",204422175)], null)),new cljs.core.Keyword(null,"offset","offset",296498311),(function (){var temp__5751__auto__ = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"bars","bars",-586907130),new cljs.core.Keyword(null,"offset","offset",296498311)], null));
if(cljs.core.truth_(temp__5751__auto__)){
var offset = temp__5751__auto__;
return offset;
} else {
return 1.5;
}
})(),new cljs.core.Keyword(null,"data-count","data-count",1898198662),cljs.core.count(data_keys),new cljs.core.Keyword(null,"bar-width","bar-width",1233240523),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"bars","bars",-586907130),new cljs.core.Keyword(null,"width","width",-384071477)], null)),new cljs.core.Keyword(null,"font-size","font-size",-1847940346),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"bars","bars",-586907130),new cljs.core.Keyword(null,"font-size","font-size",-1847940346)], null))], 0));
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),(1)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"rect","rect",-108902628),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"key","key",-1516042587),(1),new cljs.core.Keyword(null,"class-name","class-name",945142584),new cljs.core.Keyword(null,"inner","inner",-1383171215).cljs$core$IFn$_invoke$arity$1(transplants.vis2.styles),new cljs.core.Keyword(null,"x","x",2099068185),(0),new cljs.core.Keyword(null,"y","y",-1757859776),(0),new cljs.core.Keyword(null,"width","width",-384071477),(1000),new cljs.core.Keyword(null,"height","height",1025178622),(600)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),"bin-labels"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.vis2.draw_bin_labels,params__$1], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),"bars"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.vis2.draw_bars,params__$1], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),"percents"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.vis2.draw_percents,params__$1], null)], null)], null);
});
/**
 * Draw the bar chart
 */
transplants.vis2.bar_chart = (function transplants$vis2$bar_chart(p__68875){
var map__68876 = p__68875;
var map__68876__$1 = cljs.core.__destructure_map(map__68876);
var env = map__68876__$1;
var organ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68876__$1,new cljs.core.Keyword(null,"organ","organ",-29862572));
var tool = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68876__$1,new cljs.core.Keyword(null,"tool","tool",-1298696470));
var base_outcome_keys = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68876__$1,new cljs.core.Keyword(null,"base-outcome-keys","base-outcome-keys",519744091));
var s0 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68876__$1,new cljs.core.Keyword(null,"s0","s0",-350711836));
var F = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68876__$1,new cljs.core.Keyword(null,"F","F",-1115543258));
var sample_days = cljs.core.map.cljs$core$IFn$_invoke$arity$2(transplants.utils.year__GT_day,cljs.core.range.cljs$core$IFn$_invoke$arity$1((transplants.utils.day__GT_year(cljs.core.first(cljs.core.last(s0))) + (1))));
var fs_by_year = cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (day){
return transplants.model.S0_for_day(F,day);
}),sample_days);
var tool_mdata = transplants.vis2.tool_metadata(env,organ,tool);
var data_styles = cljs.core.get.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.Keyword(null,"outcomes","outcomes",-2034044865));
var plot_order = new cljs.core.Keyword(null,"plot-order","plot-order",443808332).cljs$core$IFn$_invoke$arity$1(tool_mdata);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Row,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Col,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin-top","margin-top",392161226),(10)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [svg.container.svg_container,(function (p1__68874_SHARP_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__68874_SHARP_,new cljs.core.Keyword(null,"aspect-ratio","aspect-ratio",1674013504),transplants.vis2.aspect_ratio(new cljs.core.Keyword(null,"width","width",-384071477).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"inner","inner",-1383171215).cljs$core$IFn$_invoke$arity$1(p1__68874_SHARP_)),new cljs.core.Keyword(null,"height","height",1025178622).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"inner","inner",-1383171215).cljs$core$IFn$_invoke$arity$1(p1__68874_SHARP_))));
})(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(svg.space.space(new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"outer","outer",-375185956),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"width","width",-384071477),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"bars","bars",-586907130),new cljs.core.Keyword(null,"svg-width","svg-width",1259023155)], null)),new cljs.core.Keyword(null,"height","height",1025178622),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"bars","bars",-586907130),new cljs.core.Keyword(null,"svg-height","svg-height",1432012799)], null))], null),new cljs.core.Keyword(null,"margin","margin",-995903681),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"bars","bars",-586907130),new cljs.core.Keyword(null,"svg-margin","svg-margin",1509529342)], null)),new cljs.core.Keyword(null,"padding","padding",1660304693),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"bars","bars",-586907130),new cljs.core.Keyword(null,"svg-padding","svg-padding",1501468269)], null)),new cljs.core.Keyword(null,"x-domain","x-domain",501559689),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(14)], null),new cljs.core.Keyword(null,"x-ticks","x-ticks",1636599024),(10),new cljs.core.Keyword(null,"y-domain","y-domain",-969203007),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),(0)], null),new cljs.core.Keyword(null,"y-ticks","y-ticks",-843622722),(10)], null)),new cljs.core.Keyword(null,"styles","styles",1954480375),transplants.vis2.styles)),(function (_,___$1,X,Y){
var fs_by_year_in_plot_order = transplants.vis2.fs_time_series(base_outcome_keys,plot_order,fs_by_year);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),transplants.vis2.svg_outcome_legend.cljs$core$IFn$_invoke$arity$2(plot_order,data_styles),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"transform","transform",1381301764),"translate(280 0)"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.vis2.stacked_bar_chart,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(env,new cljs.core.Keyword(null,"X","X",1705996313),X,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"Y","Y",-560717356),Y,new cljs.core.Keyword(null,"data-keys","data-keys",1654526230),plot_order,new cljs.core.Keyword(null,"time-series","time-series",1050573973),fs_by_year_in_plot_order,new cljs.core.Keyword(null,"tool-mdata","tool-mdata",-1013259695),tool_mdata,new cljs.core.Keyword(null,"data-styles","data-styles",-12538237),data_styles], 0))], null)], null)], null);
})], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"section","section",-300141526),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin-top","margin-top",392161226),(10)], null)], null),new cljs.core.Keyword(null,"post-section","post-section",-774244483).cljs$core$IFn$_invoke$arity$1(tool_mdata)], null)], null)], null);
});
/**
 * Draw a stacked bar chart.
 * x is a Linear scale defined in svg.scales.Linear containing
 *  :in - an input range of numbers to plot on the x-axis.
 *  :out - an equivalent x coordinate in he SVG window.
 * X is a function mapping between the two
 * y and Y are similar for the Y axis
 * sample-days are indices into the cif data-series at which bars should be drawn.
 * outcomes are the cif data-series
 */
transplants.vis2.stacked_area_chart = (function transplants$vis2$stacked_area_chart(p__68878){
var map__68879 = p__68878;
var map__68879__$1 = cljs.core.__destructure_map(map__68879);
var X = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68879__$1,new cljs.core.Keyword(null,"X","X",1705996313));
var Y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68879__$1,new cljs.core.Keyword(null,"Y","Y",-560717356));
var year_series = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68879__$1,new cljs.core.Keyword(null,"year-series","year-series",474161786));
var quarter_series = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68879__$1,new cljs.core.Keyword(null,"quarter-series","quarter-series",868609982));
var data_keys = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68879__$1,new cljs.core.Keyword(null,"data-keys","data-keys",1654526230));
var tool_mdata = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68879__$1,new cljs.core.Keyword(null,"tool-mdata","tool-mdata",-1013259695));
var data_styles = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68879__$1,new cljs.core.Keyword(null,"data-styles","data-styles",-12538237));
var data_count = cljs.core.count(data_keys);
var bar_width = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"area","area",472007256),new cljs.core.Keyword(null,"width","width",-384071477)], null));
var spacing = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"area","area",472007256),new cljs.core.Keyword(null,"spacing","spacing",204422175)], null));
var bin_labels = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"area","area",472007256),new cljs.core.Keyword(null,"labels","labels",-626734591)], null));
var font_size = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"area","area",472007256),new cljs.core.Keyword(null,"font-size","font-size",-1847940346)], null));
var offset = 1.85;
var q_offset = 1.86;
var bar_positions = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (bin_label){
var bar_index = new cljs.core.Keyword(null,"time-index","time-index",1670884208).cljs$core$IFn$_invoke$arity$1(bin_label);
var vec__68880 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(year_series,bar_index);
var time = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__68880,(0),null);
var map__68883 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__68880,(1),null);
var map__68883__$1 = cljs.core.__destructure_map(map__68883);
var fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68883__$1,new cljs.core.Keyword(null,"fs","fs",-2122926244));
var cum_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68883__$1,new cljs.core.Keyword(null,"cum-fs","cum-fs",-164423437));
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$4((function (data_key,cif,cum_cif){
var styles = (data_styles.cljs$core$IFn$_invoke$arity$1 ? data_styles.cljs$core$IFn$_invoke$arity$1(data_key) : data_styles.call(null,data_key));
var x0 = ((function (){var G__68884 = ((spacing * (bar_index + (1))));
return (X.cljs$core$IFn$_invoke$arity$1 ? X.cljs$core$IFn$_invoke$arity$1(G__68884) : X.call(null,G__68884));
})() - (X.cljs$core$IFn$_invoke$arity$1 ? X.cljs$core$IFn$_invoke$arity$1(offset) : X.call(null,offset)));
var x_mid = ((x0 + (bar_width / (2))) + (- (X.cljs$core$IFn$_invoke$arity$1 ? X.cljs$core$IFn$_invoke$arity$1(0.2) : X.call(null,0.2))));
var y0 = ((Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1(cum_cif) : Y.call(null,cum_cif)) - (Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1(cif) : Y.call(null,cif)));
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"key","key",-1516042587),data_key,new cljs.core.Keyword(null,"time","time",1385887882),time,new cljs.core.Keyword(null,"x","x",2099068185),(x_mid + (15)),new cljs.core.Keyword(null,"y0","y0",111454807),y0,new cljs.core.Keyword(null,"y1","y1",589123466),(Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1(cum_cif) : Y.call(null,cum_cif)),new cljs.core.Keyword(null,"styles","styles",1954480375),transplants.ui.svg_styles(styles)], null);
}),data_keys,fs,cum_fs));
}),bin_labels));
var quarter_positions = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__68885){
var vec__68886 = p__68885;
var time = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__68886,(0),null);
var map__68889 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__68886,(1),null);
var map__68889__$1 = cljs.core.__destructure_map(map__68889);
var fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68889__$1,new cljs.core.Keyword(null,"fs","fs",-2122926244));
var cum_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68889__$1,new cljs.core.Keyword(null,"cum-fs","cum-fs",-164423437));
var quarter = transplants.utils.day__GT_week(time);
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$4((function (data_key,cif,cum_cif){
var styles = (data_styles.cljs$core$IFn$_invoke$arity$1 ? data_styles.cljs$core$IFn$_invoke$arity$1(data_key) : data_styles.call(null,data_key));
var x0 = ((function (){var G__68890 = ((spacing * ((quarter / (52)) + (1))));
return (X.cljs$core$IFn$_invoke$arity$1 ? X.cljs$core$IFn$_invoke$arity$1(G__68890) : X.call(null,G__68890));
})() - (X.cljs$core$IFn$_invoke$arity$1 ? X.cljs$core$IFn$_invoke$arity$1(q_offset) : X.call(null,q_offset)));
var x_mid = ((x0 + (bar_width / (2))) + (- (X.cljs$core$IFn$_invoke$arity$1 ? X.cljs$core$IFn$_invoke$arity$1(0.2) : X.call(null,0.2))));
var y0 = ((Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1(cum_cif) : Y.call(null,cum_cif)) - (Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1(cif) : Y.call(null,cif)));
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"key","key",-1516042587),data_key,new cljs.core.Keyword(null,"time","time",1385887882),time,new cljs.core.Keyword(null,"x","x",2099068185),(x_mid + (15)),new cljs.core.Keyword(null,"y0","y0",111454807),y0,new cljs.core.Keyword(null,"y1","y1",589123466),(Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1(cum_cif) : Y.call(null,cum_cif)),new cljs.core.Keyword(null,"styles","styles",1954480375),transplants.ui.svg_styles(styles)], null);
}),data_keys,fs,cum_fs));
}),quarter_series));
var q_polygon_data = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__4652__auto__ = (function transplants$vis2$stacked_area_chart_$_iter__68891(s__68892){
return (new cljs.core.LazySeq(null,(function (){
var s__68892__$1 = s__68892;
while(true){
var temp__5753__auto__ = cljs.core.seq(s__68892__$1);
if(temp__5753__auto__){
var s__68892__$2 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(s__68892__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__68892__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__68894 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__68893 = (0);
while(true){
if((i__68893 < size__4651__auto__)){
var dk = cljs.core._nth(c__4650__auto__,i__68893);
cljs.core.chunk_append(b__68894,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [dk,(function (){var tops = (function (){var iter__4652__auto__ = ((function (i__68893,dk,c__4650__auto__,size__4651__auto__,b__68894,s__68892__$2,temp__5753__auto__,data_count,bar_width,spacing,bin_labels,font_size,offset,q_offset,bar_positions,quarter_positions,map__68879,map__68879__$1,X,Y,year_series,quarter_series,data_keys,tool_mdata,data_styles){
return (function transplants$vis2$stacked_area_chart_$_iter__68891_$_iter__68895(s__68896){
return (new cljs.core.LazySeq(null,((function (i__68893,dk,c__4650__auto__,size__4651__auto__,b__68894,s__68892__$2,temp__5753__auto__,data_count,bar_width,spacing,bin_labels,font_size,offset,q_offset,bar_positions,quarter_positions,map__68879,map__68879__$1,X,Y,year_series,quarter_series,data_keys,tool_mdata,data_styles){
return (function (){
var s__68896__$1 = s__68896;
while(true){
var temp__5753__auto____$1 = cljs.core.seq(s__68896__$1);
if(temp__5753__auto____$1){
var xs__6308__auto__ = temp__5753__auto____$1;
var bp_dks = cljs.core.first(xs__6308__auto__);
var iterys__4648__auto__ = ((function (s__68896__$1,i__68893,bp_dks,xs__6308__auto__,temp__5753__auto____$1,dk,c__4650__auto__,size__4651__auto__,b__68894,s__68892__$2,temp__5753__auto__,data_count,bar_width,spacing,bin_labels,font_size,offset,q_offset,bar_positions,quarter_positions,map__68879,map__68879__$1,X,Y,year_series,quarter_series,data_keys,tool_mdata,data_styles){
return (function transplants$vis2$stacked_area_chart_$_iter__68891_$_iter__68895_$_iter__68897(s__68898){
return (new cljs.core.LazySeq(null,((function (s__68896__$1,i__68893,bp_dks,xs__6308__auto__,temp__5753__auto____$1,dk,c__4650__auto__,size__4651__auto__,b__68894,s__68892__$2,temp__5753__auto__,data_count,bar_width,spacing,bin_labels,font_size,offset,q_offset,bar_positions,quarter_positions,map__68879,map__68879__$1,X,Y,year_series,quarter_series,data_keys,tool_mdata,data_styles){
return (function (){
var s__68898__$1 = s__68898;
while(true){
var temp__5753__auto____$2 = cljs.core.seq(s__68898__$1);
if(temp__5753__auto____$2){
var s__68898__$2 = temp__5753__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__68898__$2)){
var c__4650__auto____$1 = cljs.core.chunk_first(s__68898__$2);
var size__4651__auto____$1 = cljs.core.count(c__4650__auto____$1);
var b__68900 = cljs.core.chunk_buffer(size__4651__auto____$1);
if((function (){var i__68899 = (0);
while(true){
if((i__68899 < size__4651__auto____$1)){
var bp_dk = cljs.core._nth(c__4650__auto____$1,i__68899);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(dk,new cljs.core.Keyword(null,"key","key",-1516042587).cljs$core$IFn$_invoke$arity$1(bp_dk))){
cljs.core.chunk_append(b__68900,cljs.core.select_keys(bp_dk,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"x","x",2099068185),new cljs.core.Keyword(null,"y0","y0",111454807),new cljs.core.Keyword(null,"y1","y1",589123466)], null)));

var G__69150 = (i__68899 + (1));
i__68899 = G__69150;
continue;
} else {
var G__69151 = (i__68899 + (1));
i__68899 = G__69151;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__68900),transplants$vis2$stacked_area_chart_$_iter__68891_$_iter__68895_$_iter__68897(cljs.core.chunk_rest(s__68898__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__68900),null);
}
} else {
var bp_dk = cljs.core.first(s__68898__$2);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(dk,new cljs.core.Keyword(null,"key","key",-1516042587).cljs$core$IFn$_invoke$arity$1(bp_dk))){
return cljs.core.cons(cljs.core.select_keys(bp_dk,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"x","x",2099068185),new cljs.core.Keyword(null,"y0","y0",111454807),new cljs.core.Keyword(null,"y1","y1",589123466)], null)),transplants$vis2$stacked_area_chart_$_iter__68891_$_iter__68895_$_iter__68897(cljs.core.rest(s__68898__$2)));
} else {
var G__69152 = cljs.core.rest(s__68898__$2);
s__68898__$1 = G__69152;
continue;
}
}
} else {
return null;
}
break;
}
});})(s__68896__$1,i__68893,bp_dks,xs__6308__auto__,temp__5753__auto____$1,dk,c__4650__auto__,size__4651__auto__,b__68894,s__68892__$2,temp__5753__auto__,data_count,bar_width,spacing,bin_labels,font_size,offset,q_offset,bar_positions,quarter_positions,map__68879,map__68879__$1,X,Y,year_series,quarter_series,data_keys,tool_mdata,data_styles))
,null,null));
});})(s__68896__$1,i__68893,bp_dks,xs__6308__auto__,temp__5753__auto____$1,dk,c__4650__auto__,size__4651__auto__,b__68894,s__68892__$2,temp__5753__auto__,data_count,bar_width,spacing,bin_labels,font_size,offset,q_offset,bar_positions,quarter_positions,map__68879,map__68879__$1,X,Y,year_series,quarter_series,data_keys,tool_mdata,data_styles))
;
var fs__4649__auto__ = cljs.core.seq(iterys__4648__auto__(bp_dks));
if(fs__4649__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__4649__auto__,transplants$vis2$stacked_area_chart_$_iter__68891_$_iter__68895(cljs.core.rest(s__68896__$1)));
} else {
var G__69153 = cljs.core.rest(s__68896__$1);
s__68896__$1 = G__69153;
continue;
}
} else {
return null;
}
break;
}
});})(i__68893,dk,c__4650__auto__,size__4651__auto__,b__68894,s__68892__$2,temp__5753__auto__,data_count,bar_width,spacing,bin_labels,font_size,offset,q_offset,bar_positions,quarter_positions,map__68879,map__68879__$1,X,Y,year_series,quarter_series,data_keys,tool_mdata,data_styles))
,null,null));
});})(i__68893,dk,c__4650__auto__,size__4651__auto__,b__68894,s__68892__$2,temp__5753__auto__,data_count,bar_width,spacing,bin_labels,font_size,offset,q_offset,bar_positions,quarter_positions,map__68879,map__68879__$1,X,Y,year_series,quarter_series,data_keys,tool_mdata,data_styles))
;
return iter__4652__auto__(quarter_positions);
})();
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.juxt.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"x","x",2099068185),new cljs.core.Keyword(null,"y0","y0",111454807)),tops),cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.juxt.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"x","x",2099068185),new cljs.core.Keyword(null,"y1","y1",589123466)),cljs.core.reverse(tops)));
})()], null));

var G__69154 = (i__68893 + (1));
i__68893 = G__69154;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__68894),transplants$vis2$stacked_area_chart_$_iter__68891(cljs.core.chunk_rest(s__68892__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__68894),null);
}
} else {
var dk = cljs.core.first(s__68892__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [dk,(function (){var tops = (function (){var iter__4652__auto__ = ((function (dk,s__68892__$2,temp__5753__auto__,data_count,bar_width,spacing,bin_labels,font_size,offset,q_offset,bar_positions,quarter_positions,map__68879,map__68879__$1,X,Y,year_series,quarter_series,data_keys,tool_mdata,data_styles){
return (function transplants$vis2$stacked_area_chart_$_iter__68891_$_iter__68901(s__68902){
return (new cljs.core.LazySeq(null,(function (){
var s__68902__$1 = s__68902;
while(true){
var temp__5753__auto____$1 = cljs.core.seq(s__68902__$1);
if(temp__5753__auto____$1){
var xs__6308__auto__ = temp__5753__auto____$1;
var bp_dks = cljs.core.first(xs__6308__auto__);
var iterys__4648__auto__ = ((function (s__68902__$1,bp_dks,xs__6308__auto__,temp__5753__auto____$1,dk,s__68892__$2,temp__5753__auto__,data_count,bar_width,spacing,bin_labels,font_size,offset,q_offset,bar_positions,quarter_positions,map__68879,map__68879__$1,X,Y,year_series,quarter_series,data_keys,tool_mdata,data_styles){
return (function transplants$vis2$stacked_area_chart_$_iter__68891_$_iter__68901_$_iter__68903(s__68904){
return (new cljs.core.LazySeq(null,((function (s__68902__$1,bp_dks,xs__6308__auto__,temp__5753__auto____$1,dk,s__68892__$2,temp__5753__auto__,data_count,bar_width,spacing,bin_labels,font_size,offset,q_offset,bar_positions,quarter_positions,map__68879,map__68879__$1,X,Y,year_series,quarter_series,data_keys,tool_mdata,data_styles){
return (function (){
var s__68904__$1 = s__68904;
while(true){
var temp__5753__auto____$2 = cljs.core.seq(s__68904__$1);
if(temp__5753__auto____$2){
var s__68904__$2 = temp__5753__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__68904__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__68904__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__68906 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__68905 = (0);
while(true){
if((i__68905 < size__4651__auto__)){
var bp_dk = cljs.core._nth(c__4650__auto__,i__68905);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(dk,new cljs.core.Keyword(null,"key","key",-1516042587).cljs$core$IFn$_invoke$arity$1(bp_dk))){
cljs.core.chunk_append(b__68906,cljs.core.select_keys(bp_dk,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"x","x",2099068185),new cljs.core.Keyword(null,"y0","y0",111454807),new cljs.core.Keyword(null,"y1","y1",589123466)], null)));

var G__69155 = (i__68905 + (1));
i__68905 = G__69155;
continue;
} else {
var G__69156 = (i__68905 + (1));
i__68905 = G__69156;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__68906),transplants$vis2$stacked_area_chart_$_iter__68891_$_iter__68901_$_iter__68903(cljs.core.chunk_rest(s__68904__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__68906),null);
}
} else {
var bp_dk = cljs.core.first(s__68904__$2);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(dk,new cljs.core.Keyword(null,"key","key",-1516042587).cljs$core$IFn$_invoke$arity$1(bp_dk))){
return cljs.core.cons(cljs.core.select_keys(bp_dk,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"x","x",2099068185),new cljs.core.Keyword(null,"y0","y0",111454807),new cljs.core.Keyword(null,"y1","y1",589123466)], null)),transplants$vis2$stacked_area_chart_$_iter__68891_$_iter__68901_$_iter__68903(cljs.core.rest(s__68904__$2)));
} else {
var G__69157 = cljs.core.rest(s__68904__$2);
s__68904__$1 = G__69157;
continue;
}
}
} else {
return null;
}
break;
}
});})(s__68902__$1,bp_dks,xs__6308__auto__,temp__5753__auto____$1,dk,s__68892__$2,temp__5753__auto__,data_count,bar_width,spacing,bin_labels,font_size,offset,q_offset,bar_positions,quarter_positions,map__68879,map__68879__$1,X,Y,year_series,quarter_series,data_keys,tool_mdata,data_styles))
,null,null));
});})(s__68902__$1,bp_dks,xs__6308__auto__,temp__5753__auto____$1,dk,s__68892__$2,temp__5753__auto__,data_count,bar_width,spacing,bin_labels,font_size,offset,q_offset,bar_positions,quarter_positions,map__68879,map__68879__$1,X,Y,year_series,quarter_series,data_keys,tool_mdata,data_styles))
;
var fs__4649__auto__ = cljs.core.seq(iterys__4648__auto__(bp_dks));
if(fs__4649__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__4649__auto__,transplants$vis2$stacked_area_chart_$_iter__68891_$_iter__68901(cljs.core.rest(s__68902__$1)));
} else {
var G__69158 = cljs.core.rest(s__68902__$1);
s__68902__$1 = G__69158;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});})(dk,s__68892__$2,temp__5753__auto__,data_count,bar_width,spacing,bin_labels,font_size,offset,q_offset,bar_positions,quarter_positions,map__68879,map__68879__$1,X,Y,year_series,quarter_series,data_keys,tool_mdata,data_styles))
;
return iter__4652__auto__(quarter_positions);
})();
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.juxt.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"x","x",2099068185),new cljs.core.Keyword(null,"y0","y0",111454807)),tops),cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.juxt.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"x","x",2099068185),new cljs.core.Keyword(null,"y1","y1",589123466)),cljs.core.reverse(tops)));
})()], null),transplants$vis2$stacked_area_chart_$_iter__68891(cljs.core.rest(s__68892__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__4652__auto__(data_keys);
})());
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),(1)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"rect","rect",-108902628),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"key","key",-1516042587),(1),new cljs.core.Keyword(null,"class-name","class-name",945142584),new cljs.core.Keyword(null,"inner","inner",-1383171215).cljs$core$IFn$_invoke$arity$1(transplants.vis2.styles),new cljs.core.Keyword(null,"x","x",2099068185),(0),new cljs.core.Keyword(null,"y","y",-1757859776),(0),new cljs.core.Keyword(null,"width","width",-384071477),(1000),new cljs.core.Keyword(null,"height","height",1025178622),(600)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"opacity","opacity",397153780),(1)], null)], null),(function (){var iter__4652__auto__ = (function transplants$vis2$stacked_area_chart_$_iter__68907(s__68908){
return (new cljs.core.LazySeq(null,(function (){
var s__68908__$1 = s__68908;
while(true){
var temp__5753__auto__ = cljs.core.seq(s__68908__$1);
if(temp__5753__auto__){
var s__68908__$2 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(s__68908__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__68908__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__68910 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__68909 = (0);
while(true){
if((i__68909 < size__4651__auto__)){
var dk = cljs.core._nth(c__4650__auto__,i__68909);
cljs.core.chunk_append(b__68910,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"polygon","polygon",837053759),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"key","key",-1516042587),dk,new cljs.core.Keyword(null,"points","points",-1486596883),(function (){var iter__4652__auto__ = ((function (i__68909,dk,c__4650__auto__,size__4651__auto__,b__68910,s__68908__$2,temp__5753__auto__,data_count,bar_width,spacing,bin_labels,font_size,offset,q_offset,bar_positions,quarter_positions,q_polygon_data,map__68879,map__68879__$1,X,Y,year_series,quarter_series,data_keys,tool_mdata,data_styles){
return (function transplants$vis2$stacked_area_chart_$_iter__68907_$_iter__68911(s__68912){
return (new cljs.core.LazySeq(null,((function (i__68909,dk,c__4650__auto__,size__4651__auto__,b__68910,s__68908__$2,temp__5753__auto__,data_count,bar_width,spacing,bin_labels,font_size,offset,q_offset,bar_positions,quarter_positions,q_polygon_data,map__68879,map__68879__$1,X,Y,year_series,quarter_series,data_keys,tool_mdata,data_styles){
return (function (){
var s__68912__$1 = s__68912;
while(true){
var temp__5753__auto____$1 = cljs.core.seq(s__68912__$1);
if(temp__5753__auto____$1){
var s__68912__$2 = temp__5753__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__68912__$2)){
var c__4650__auto____$1 = cljs.core.chunk_first(s__68912__$2);
var size__4651__auto____$1 = cljs.core.count(c__4650__auto____$1);
var b__68914 = cljs.core.chunk_buffer(size__4651__auto____$1);
if((function (){var i__68913 = (0);
while(true){
if((i__68913 < size__4651__auto____$1)){
var vec__68915 = cljs.core._nth(c__4650__auto____$1,i__68913);
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__68915,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__68915,(1),null);
cljs.core.chunk_append(b__68914,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(x),",",cljs.core.str.cljs$core$IFn$_invoke$arity$1(y)," "].join(''));

var G__69162 = (i__68913 + (1));
i__68913 = G__69162;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__68914),transplants$vis2$stacked_area_chart_$_iter__68907_$_iter__68911(cljs.core.chunk_rest(s__68912__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__68914),null);
}
} else {
var vec__68918 = cljs.core.first(s__68912__$2);
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__68918,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__68918,(1),null);
return cljs.core.cons([cljs.core.str.cljs$core$IFn$_invoke$arity$1(x),",",cljs.core.str.cljs$core$IFn$_invoke$arity$1(y)," "].join(''),transplants$vis2$stacked_area_chart_$_iter__68907_$_iter__68911(cljs.core.rest(s__68912__$2)));
}
} else {
return null;
}
break;
}
});})(i__68909,dk,c__4650__auto__,size__4651__auto__,b__68910,s__68908__$2,temp__5753__auto__,data_count,bar_width,spacing,bin_labels,font_size,offset,q_offset,bar_positions,quarter_positions,q_polygon_data,map__68879,map__68879__$1,X,Y,year_series,quarter_series,data_keys,tool_mdata,data_styles))
,null,null));
});})(i__68909,dk,c__4650__auto__,size__4651__auto__,b__68910,s__68908__$2,temp__5753__auto__,data_count,bar_width,spacing,bin_labels,font_size,offset,q_offset,bar_positions,quarter_positions,q_polygon_data,map__68879,map__68879__$1,X,Y,year_series,quarter_series,data_keys,tool_mdata,data_styles))
;
return iter__4652__auto__((dk.cljs$core$IFn$_invoke$arity$1 ? dk.cljs$core$IFn$_invoke$arity$1(q_polygon_data) : dk.call(null,q_polygon_data)));
})(),new cljs.core.Keyword(null,"style","style",-496642736),transplants.ui.svg_styles((data_styles.cljs$core$IFn$_invoke$arity$1 ? data_styles.cljs$core$IFn$_invoke$arity$1(dk) : data_styles.call(null,dk)))], null)], null));

var G__69163 = (i__68909 + (1));
i__68909 = G__69163;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__68910),transplants$vis2$stacked_area_chart_$_iter__68907(cljs.core.chunk_rest(s__68908__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__68910),null);
}
} else {
var dk = cljs.core.first(s__68908__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"polygon","polygon",837053759),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"key","key",-1516042587),dk,new cljs.core.Keyword(null,"points","points",-1486596883),(function (){var iter__4652__auto__ = ((function (dk,s__68908__$2,temp__5753__auto__,data_count,bar_width,spacing,bin_labels,font_size,offset,q_offset,bar_positions,quarter_positions,q_polygon_data,map__68879,map__68879__$1,X,Y,year_series,quarter_series,data_keys,tool_mdata,data_styles){
return (function transplants$vis2$stacked_area_chart_$_iter__68907_$_iter__68921(s__68922){
return (new cljs.core.LazySeq(null,(function (){
var s__68922__$1 = s__68922;
while(true){
var temp__5753__auto____$1 = cljs.core.seq(s__68922__$1);
if(temp__5753__auto____$1){
var s__68922__$2 = temp__5753__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__68922__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__68922__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__68924 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__68923 = (0);
while(true){
if((i__68923 < size__4651__auto__)){
var vec__68925 = cljs.core._nth(c__4650__auto__,i__68923);
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__68925,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__68925,(1),null);
cljs.core.chunk_append(b__68924,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(x),",",cljs.core.str.cljs$core$IFn$_invoke$arity$1(y)," "].join(''));

var G__69164 = (i__68923 + (1));
i__68923 = G__69164;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__68924),transplants$vis2$stacked_area_chart_$_iter__68907_$_iter__68921(cljs.core.chunk_rest(s__68922__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__68924),null);
}
} else {
var vec__68928 = cljs.core.first(s__68922__$2);
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__68928,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__68928,(1),null);
return cljs.core.cons([cljs.core.str.cljs$core$IFn$_invoke$arity$1(x),",",cljs.core.str.cljs$core$IFn$_invoke$arity$1(y)," "].join(''),transplants$vis2$stacked_area_chart_$_iter__68907_$_iter__68921(cljs.core.rest(s__68922__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});})(dk,s__68908__$2,temp__5753__auto__,data_count,bar_width,spacing,bin_labels,font_size,offset,q_offset,bar_positions,quarter_positions,q_polygon_data,map__68879,map__68879__$1,X,Y,year_series,quarter_series,data_keys,tool_mdata,data_styles))
;
return iter__4652__auto__((dk.cljs$core$IFn$_invoke$arity$1 ? dk.cljs$core$IFn$_invoke$arity$1(q_polygon_data) : dk.call(null,q_polygon_data)));
})(),new cljs.core.Keyword(null,"style","style",-496642736),transplants.ui.svg_styles((data_styles.cljs$core$IFn$_invoke$arity$1 ? data_styles.cljs$core$IFn$_invoke$arity$1(dk) : data_styles.call(null,dk)))], null)], null),transplants$vis2$stacked_area_chart_$_iter__68907(cljs.core.rest(s__68908__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__4652__auto__(data_keys);
})()),cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),(2)], null)], null),cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (bin_label){
var bar_index = new cljs.core.Keyword(null,"time-index","time-index",1670884208).cljs$core$IFn$_invoke$arity$1(bin_label);
var x0 = ((function (){var G__68931 = ((spacing * (bar_index + (1))));
return (X.cljs$core$IFn$_invoke$arity$1 ? X.cljs$core$IFn$_invoke$arity$1(G__68931) : X.call(null,G__68931));
})() - (X.cljs$core$IFn$_invoke$arity$1 ? X.cljs$core$IFn$_invoke$arity$1(offset) : X.call(null,offset)));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),transplants.vis2.multiline_bin_label(bin_label,x0,font_size)], null);
}),bin_labels)),cljs.core.into.cljs$core$IFn$_invoke$arity$3(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905)], null),cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (bp){
var x = new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(cljs.core.first(bp));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"x1","x1",-1863922247),x,new cljs.core.Keyword(null,"x2","x2",-1362513475),x,new cljs.core.Keyword(null,"y1","y1",589123466),(Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1((0)) : Y.call(null,(0))),new cljs.core.Keyword(null,"y2","y2",-718691301),(Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1((1)) : Y.call(null,(1))),new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"stroke","stroke",1741823555),"#fff",new cljs.core.Keyword(null,"stroke-width","stroke-width",716836435),(3)], null)], null)], null);
})),bar_positions)], null),cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),(3),new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"opacity","opacity",397153780),(1)], null)], null)], null),cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (bin_label){
var bar_index = new cljs.core.Keyword(null,"time-index","time-index",1670884208).cljs$core$IFn$_invoke$arity$1(bin_label);
var x0 = (((function (){var G__68936 = ((spacing * (bar_index + (1))));
return (X.cljs$core$IFn$_invoke$arity$1 ? X.cljs$core$IFn$_invoke$arity$1(G__68936) : X.call(null,G__68936));
})() - (X.cljs$core$IFn$_invoke$arity$1 ? X.cljs$core$IFn$_invoke$arity$1(offset) : X.call(null,offset))) - (10));
var x_mid = ((x0 + (bar_width / (2))) + (0));
var vec__68932 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(year_series,bar_index);
var time = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__68932,(0),null);
var map__68935 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__68932,(1),null);
var map__68935__$1 = cljs.core.__destructure_map(map__68935);
var fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68935__$1,new cljs.core.Keyword(null,"fs","fs",-2122926244));
var cum_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68935__$1,new cljs.core.Keyword(null,"cum-fs","cum-fs",-164423437));
var int_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68935__$1,new cljs.core.Keyword(null,"int-fs","int-fs",1685464335));
var staggers = transplants.vis2.label_staggers(0.12,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__68877_SHARP_){
if((p1__68877_SHARP_ == null)){
return (0);
} else {
return p1__68877_SHARP_;
}
}),fs));
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),time], null)], null),cljs.core.conj.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$variadic((function (i,data_key,cif,cum_cif,int_fs__$1){
var styles = (data_styles.cljs$core$IFn$_invoke$arity$1 ? data_styles.cljs$core$IFn$_invoke$arity$1(data_key) : data_styles.call(null,data_key));
var y0 = (((data_count > (1)))?((Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1(cum_cif) : Y.call(null,cum_cif)) - (Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1(cif) : Y.call(null,cif))):(Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1(cif) : Y.call(null,cif)));
var h = (((data_count > (1)))?((Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1(cum_cif) : Y.call(null,cum_cif)) - (function (){var G__68937 = (cum_cif - cif);
return (Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1(G__68937) : Y.call(null,G__68937));
})()):((Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1((0)) : Y.call(null,(0))) - (Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1(cif) : Y.call(null,cif))));
var y_mid = (y0 + (h / (2)));
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"transform","transform",1381301764),["translate(",cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_((staggers.cljs$core$IFn$_invoke$arity$1 ? staggers.cljs$core$IFn$_invoke$arity$1(i) : staggers.call(null,i)))?((cljs.core.odd_QMARK_(i))?(18):(-54)):(((cif < (1)))?(-20):(-30))))," 10)"].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"rect","rect",-108902628),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"x","x",2099068185),(x_mid - (5)),new cljs.core.Keyword(null,"width","width",-384071477),(((cif >= (1)))?(90):(((cif < 0.1))?(70):(70)
)),new cljs.core.Keyword(null,"y","y",-1757859776),(y_mid - (30)),new cljs.core.Keyword(null,"height","height",1025178622),(40),new cljs.core.Keyword(null,"rx","rx",1627208482),(10)], null),transplants.ui.svg_styles(styles)], 0))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",-1790561697),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"x","x",2099068185),x_mid,new cljs.core.Keyword(null,"y","y",-1757859776),y_mid,new cljs.core.Keyword(null,"font-size","font-size",-1847940346),(30),new cljs.core.Keyword(null,"fill","fill",883462889),new cljs.core.Keyword(null,"label-fill","label-fill",1868368099).cljs$core$IFn$_invoke$arity$1(styles)], null),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(int_fs__$1),"%"].join('')], null)], null);

}),cljs.core.range.cljs$core$IFn$_invoke$arity$0(),data_keys,fs,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cum_fs,int_fs], 0))));
}),bin_labels))], null);
});
/**
 * Draw the area chart
 */
transplants.vis2.area_chart = (function transplants$vis2$area_chart(p__68939){
var map__68940 = p__68939;
var map__68940__$1 = cljs.core.__destructure_map(map__68940);
var env = map__68940__$1;
var organ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68940__$1,new cljs.core.Keyword(null,"organ","organ",-29862572));
var tool = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68940__$1,new cljs.core.Keyword(null,"tool","tool",-1298696470));
var base_outcome_keys = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68940__$1,new cljs.core.Keyword(null,"base-outcome-keys","base-outcome-keys",519744091));
var s0 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68940__$1,new cljs.core.Keyword(null,"s0","s0",-350711836));
var F = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68940__$1,new cljs.core.Keyword(null,"F","F",-1115543258));
var year_days = cljs.core.map.cljs$core$IFn$_invoke$arity$2(transplants.utils.year__GT_day,cljs.core.range.cljs$core$IFn$_invoke$arity$1((transplants.utils.day__GT_year(cljs.core.first(cljs.core.last(s0))) + (1))));
var fs_by_year = cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (day){
return transplants.model.S0_for_day(F,day);
}),year_days);
var quarter_days = cljs.core.map.cljs$core$IFn$_invoke$arity$2(transplants.utils.week__GT_day,cljs.core.range.cljs$core$IFn$_invoke$arity$1((transplants.utils.day__GT_week(cljs.core.first(cljs.core.last(s0))) + (1))));
var fs_by_quarter = cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (day){
return transplants.model.S0_for_day(F,day);
}),quarter_days);
var tool_mdata = transplants.vis2.tool_metadata(env,organ,tool);
var data_styles = cljs.core.get.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.Keyword(null,"outcomes","outcomes",-2034044865));
var plot_order = new cljs.core.Keyword(null,"plot-order","plot-order",443808332).cljs$core$IFn$_invoke$arity$1(tool_mdata);
var svg_width = (1060);
var svg_height = (660);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Row,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Col,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin-top","margin-top",392161226),(10)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [svg.container.svg_container,(function (p1__68938_SHARP_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__68938_SHARP_,new cljs.core.Keyword(null,"aspect-ratio","aspect-ratio",1674013504),transplants.vis2.aspect_ratio(new cljs.core.Keyword(null,"width","width",-384071477).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"inner","inner",-1383171215).cljs$core$IFn$_invoke$arity$1(p1__68938_SHARP_)),new cljs.core.Keyword(null,"height","height",1025178622).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"inner","inner",-1383171215).cljs$core$IFn$_invoke$arity$1(p1__68938_SHARP_))));
})(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(svg.space.space(new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"outer","outer",-375185956),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"width","width",-384071477),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"area","area",472007256),new cljs.core.Keyword(null,"svg-width","svg-width",1259023155)], null)),new cljs.core.Keyword(null,"height","height",1025178622),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"area","area",472007256),new cljs.core.Keyword(null,"svg-height","svg-height",1432012799)], null))], null),new cljs.core.Keyword(null,"aspect-ratio","aspect-ratio",1674013504),transplants.vis2.aspect_ratio(svg_width,svg_height),new cljs.core.Keyword(null,"margin","margin",-995903681),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"area","area",472007256),new cljs.core.Keyword(null,"svg-margin","svg-margin",1509529342)], null)),new cljs.core.Keyword(null,"padding","padding",1660304693),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"top","top",-1856271961),(40),new cljs.core.Keyword(null,"right","right",-452581833),(20),new cljs.core.Keyword(null,"bottom","bottom",-1550509018),(100),new cljs.core.Keyword(null,"left","left",-399115937),(20)], null),new cljs.core.Keyword(null,"x-domain","x-domain",501559689),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(14)], null),new cljs.core.Keyword(null,"x-ticks","x-ticks",1636599024),(10),new cljs.core.Keyword(null,"y-domain","y-domain",-969203007),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),(0)], null),new cljs.core.Keyword(null,"y-ticks","y-ticks",-843622722),(10)], null)),new cljs.core.Keyword(null,"styles","styles",1954480375),transplants.vis2.styles)),(function (_,___$1,X,Y){
var fs_by_year_in_plot_order = transplants.vis2.fs_time_series(base_outcome_keys,plot_order,fs_by_year);
var fs_by_quarter_in_plot_order = transplants.vis2.fs_time_series(base_outcome_keys,plot_order,fs_by_quarter);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),transplants.vis2.svg_outcome_legend.cljs$core$IFn$_invoke$arity$2(plot_order,data_styles),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"transform","transform",1381301764),"translate(280 0)"], null),transplants.vis2.stacked_area_chart(new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"X","X",1705996313),X,new cljs.core.Keyword(null,"Y","Y",-560717356),Y,new cljs.core.Keyword(null,"year-series","year-series",474161786),fs_by_year_in_plot_order,new cljs.core.Keyword(null,"quarter-series","quarter-series",868609982),fs_by_quarter_in_plot_order,new cljs.core.Keyword(null,"data-keys","data-keys",1654526230),plot_order,new cljs.core.Keyword(null,"tool-mdata","tool-mdata",-1013259695),tool_mdata,new cljs.core.Keyword(null,"data-styles","data-styles",-12538237),data_styles], null))], null)], null);
})], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"section","section",-300141526),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin-top","margin-top",392161226),(25)], null)], null),new cljs.core.Keyword(null,"post-section","post-section",-774244483).cljs$core$IFn$_invoke$arity$1(tool_mdata)], null)], null)], null);
});
/**
 * render a head and shoulders icon
 */
transplants.vis2.h_and_s = (function transplants$vis2$h_and_s(p__68941){
var map__68942 = p__68941;
var map__68942__$1 = cljs.core.__destructure_map(map__68942);
var key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68942__$1,new cljs.core.Keyword(null,"key","key",-1516042587));
var fill = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__68942__$1,new cljs.core.Keyword(null,"fill","fill",883462889),"red");
var scale = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__68942__$1,new cljs.core.Keyword(null,"scale","scale",-230427353),"0.2");
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"key","key",-1516042587),key,new cljs.core.Keyword(null,"transform","transform",1381301764),["scale(",cljs.core.str.cljs$core$IFn$_invoke$arity$1(scale),")"].join(''),new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"fill","fill",883462889),fill], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"path","path",-188191168),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"d","d",1972142424),["M4 0c-1.1 0-2 1.12-2 2.5s.9 2.5 2 2.5 2-1.12 2-2.5-.9-2.5-2-2.5z","m-2.09 5c-1.06.05-1.91.92-1.91 2v1h8v-1c0-1.08-.84-1.95-1.91-2-.54.61-1.28 1-2.09 1-.81 0-1.55-.39-2.09-1z"].join('')], null)], null)], null);
});
/**
 * Deternine the outcome from the icon position
 */
transplants.vis2.ordinal__GT_outcome = (function transplants$vis2$ordinal__GT_outcome(ordinal,cum_int_fs){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (i,cum){
if((ordinal >= cum)){
return (i + (1));
} else {
return i;
}
}),(0),cum_int_fs);
});
/**
 * Determines an icon style based on the icon ordinal position in the array
 */
transplants.vis2.ordinal_mdata = (function transplants$vis2$ordinal_mdata(ordinal,cum_int_fs,tool_mdata){
var index = transplants.vis2.ordinal__GT_outcome(ordinal,cum_int_fs);
var plot_order = new cljs.core.Keyword(null,"plot-order","plot-order",443808332).cljs$core$IFn$_invoke$arity$1(tool_mdata);
var outcome_key = (cljs.core.truth_(plot_order)?(plot_order.cljs$core$IFn$_invoke$arity$1 ? plot_order.cljs$core$IFn$_invoke$arity$1(index) : plot_order.call(null,index)):null);
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"outcomes","outcomes",-2034044865),outcome_key], null));
});
/**
 * Render stacked icon arrays - one for each timeperiod of interest - called a year at the moment.
 */
transplants.vis2.side_by_side_icon_array = (function transplants$vis2$side_by_side_icon_array(_plot_order,year_series,tool_mdata,_data_styles){
var plot_order = new cljs.core.Keyword(null,"plot-order","plot-order",443808332).cljs$core$IFn$_invoke$arity$1(tool_mdata);
var labels = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"icons","icons",-297140977),new cljs.core.Keyword(null,"labels","labels",-626734591)], null));
var icon_order = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.range.cljs$core$IFn$_invoke$arity$1((100)));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [svg.container.svg_container,(function (p1__68943_SHARP_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__68943_SHARP_,new cljs.core.Keyword(null,"aspect-ratio","aspect-ratio",1674013504),transplants.vis2.aspect_ratio(new cljs.core.Keyword(null,"width","width",-384071477).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"inner","inner",-1383171215).cljs$core$IFn$_invoke$arity$1(p1__68943_SHARP_)),new cljs.core.Keyword(null,"height","height",1025178622).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"inner","inner",-1383171215).cljs$core$IFn$_invoke$arity$1(p1__68943_SHARP_))));
})(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(svg.space.space(new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"outer","outer",-375185956),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"width","width",-384071477),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"icons","icons",-297140977),new cljs.core.Keyword(null,"svg-width","svg-width",1259023155)], null)),new cljs.core.Keyword(null,"height","height",1025178622),((40) + cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"icons","icons",-297140977),new cljs.core.Keyword(null,"svg-height","svg-height",1432012799)], null)))], null),new cljs.core.Keyword(null,"margin","margin",-995903681),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"icons","icons",-297140977),new cljs.core.Keyword(null,"svg-margin","svg-margin",1509529342)], null)),new cljs.core.Keyword(null,"padding","padding",1660304693),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"icons","icons",-297140977),new cljs.core.Keyword(null,"svg-padding","svg-padding",1501468269)], null)),new cljs.core.Keyword(null,"x-ticks","x-ticks",1636599024),(10),new cljs.core.Keyword(null,"y-domain","y-domain",-969203007),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(300),(0)], null),new cljs.core.Keyword(null,"y-ticks","y-ticks",-843622722),(10)], null)),new cljs.core.Keyword(null,"styles","styles",1954480375),transplants.vis2.styles)),(function (_x,_y,_X,_Y){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"transform","transform",1381301764),"translate(20,40),scale(1.42)"], null)], null),(function (){var iter__4652__auto__ = (function transplants$vis2$side_by_side_icon_array_$_iter__68944(s__68945){
return (new cljs.core.LazySeq(null,(function (){
var s__68945__$1 = s__68945;
while(true){
var temp__5753__auto__ = cljs.core.seq(s__68945__$1);
if(temp__5753__auto__){
var s__68945__$2 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(s__68945__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__68945__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__68947 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__68946 = (0);
while(true){
if((i__68946 < size__4651__auto__)){
var label_index = cljs.core._nth(c__4650__auto__,i__68946);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(labels,label_index);
var time_index = new cljs.core.Keyword(null,"time-index","time-index",1670884208).cljs$core$IFn$_invoke$arity$1(label);
var vec__68948 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(year_series,time_index);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__68948,(0),null);
var map__68951 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__68948,(1),null);
var map__68951__$1 = cljs.core.__destructure_map(map__68951);
var int_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68951__$1,new cljs.core.Keyword(null,"int-fs","int-fs",1685464335));
var cum_int_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68951__$1,new cljs.core.Keyword(null,"cum-int-fs","cum-int-fs",-2123649193));
cljs.core.chunk_append(b__68947,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["lab-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(label_index)].join(''),new cljs.core.Keyword(null,"transform","transform",1381301764),"translate (0, 10)"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),(1)], null),(function (){var iter__4652__auto__ = ((function (i__68946,label,time_index,vec__68948,_,map__68951,map__68951__$1,int_fs,cum_int_fs,label_index,c__4650__auto__,size__4651__auto__,b__68947,s__68945__$2,temp__5753__auto__,plot_order,labels,icon_order){
return (function transplants$vis2$side_by_side_icon_array_$_iter__68944_$_iter__68952(s__68953){
return (new cljs.core.LazySeq(null,((function (i__68946,label,time_index,vec__68948,_,map__68951,map__68951__$1,int_fs,cum_int_fs,label_index,c__4650__auto__,size__4651__auto__,b__68947,s__68945__$2,temp__5753__auto__,plot_order,labels,icon_order){
return (function (){
var s__68953__$1 = s__68953;
while(true){
var temp__5753__auto____$1 = cljs.core.seq(s__68953__$1);
if(temp__5753__auto____$1){
var s__68953__$2 = temp__5753__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__68953__$2)){
var c__4650__auto____$1 = cljs.core.chunk_first(s__68953__$2);
var size__4651__auto____$1 = cljs.core.count(c__4650__auto____$1);
var b__68955 = cljs.core.chunk_buffer(size__4651__auto____$1);
if((function (){var i__68954 = (0);
while(true){
if((i__68954 < size__4651__auto____$1)){
var k = cljs.core._nth(c__4650__auto____$1,i__68954);
var outcome_key = (plot_order.cljs$core$IFn$_invoke$arity$1 ? plot_order.cljs$core$IFn$_invoke$arity$1(k) : plot_order.call(null,k));
var outcome = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"outcomes","outcomes",-2034044865),outcome_key], null));
cljs.core.chunk_append(b__68955,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["outk-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)].join(''),new cljs.core.Keyword(null,"transform","transform",1381301764),["translate (",cljs.core.str.cljs$core$IFn$_invoke$arity$1((label_index * (250))),", ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(((k * (25)) - (20))),")"].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.vis2.h_and_s,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"scale","scale",-230427353),(2),new cljs.core.Keyword(null,"fill","fill",883462889),new cljs.core.Keyword(null,"fill","fill",883462889).cljs$core$IFn$_invoke$arity$1(outcome)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",-1790561697),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"transform","transform",1381301764),"translate (40,15)"], null),[cljs.core.str.cljs$core$IFn$_invoke$arity$1((int_fs.cljs$core$IFn$_invoke$arity$1 ? int_fs.cljs$core$IFn$_invoke$arity$1(k) : int_fs.call(null,k)))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"label","label",1718410804).cljs$core$IFn$_invoke$arity$1(outcome))].join('')], null)], null));

var G__69169 = (i__68954 + (1));
i__68954 = G__69169;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__68955),transplants$vis2$side_by_side_icon_array_$_iter__68944_$_iter__68952(cljs.core.chunk_rest(s__68953__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__68955),null);
}
} else {
var k = cljs.core.first(s__68953__$2);
var outcome_key = (plot_order.cljs$core$IFn$_invoke$arity$1 ? plot_order.cljs$core$IFn$_invoke$arity$1(k) : plot_order.call(null,k));
var outcome = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"outcomes","outcomes",-2034044865),outcome_key], null));
return cljs.core.cons(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["outk-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)].join(''),new cljs.core.Keyword(null,"transform","transform",1381301764),["translate (",cljs.core.str.cljs$core$IFn$_invoke$arity$1((label_index * (250))),", ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(((k * (25)) - (20))),")"].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.vis2.h_and_s,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"scale","scale",-230427353),(2),new cljs.core.Keyword(null,"fill","fill",883462889),new cljs.core.Keyword(null,"fill","fill",883462889).cljs$core$IFn$_invoke$arity$1(outcome)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",-1790561697),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"transform","transform",1381301764),"translate (40,15)"], null),[cljs.core.str.cljs$core$IFn$_invoke$arity$1((int_fs.cljs$core$IFn$_invoke$arity$1 ? int_fs.cljs$core$IFn$_invoke$arity$1(k) : int_fs.call(null,k)))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"label","label",1718410804).cljs$core$IFn$_invoke$arity$1(outcome))].join('')], null)], null),transplants$vis2$side_by_side_icon_array_$_iter__68944_$_iter__68952(cljs.core.rest(s__68953__$2)));
}
} else {
return null;
}
break;
}
});})(i__68946,label,time_index,vec__68948,_,map__68951,map__68951__$1,int_fs,cum_int_fs,label_index,c__4650__auto__,size__4651__auto__,b__68947,s__68945__$2,temp__5753__auto__,plot_order,labels,icon_order))
,null,null));
});})(i__68946,label,time_index,vec__68948,_,map__68951,map__68951__$1,int_fs,cum_int_fs,label_index,c__4650__auto__,size__4651__auto__,b__68947,s__68945__$2,temp__5753__auto__,plot_order,labels,icon_order))
;
return iter__4652__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(plot_order)));
})()], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),(2),new cljs.core.Keyword(null,"transform","transform",1381301764),["translate(",cljs.core.str.cljs$core$IFn$_invoke$arity$1((label_index * (250))),", 90)"].join('')], null),(function (){var iter__4652__auto__ = ((function (i__68946,label,time_index,vec__68948,_,map__68951,map__68951__$1,int_fs,cum_int_fs,label_index,c__4650__auto__,size__4651__auto__,b__68947,s__68945__$2,temp__5753__auto__,plot_order,labels,icon_order){
return (function transplants$vis2$side_by_side_icon_array_$_iter__68944_$_iter__68956(s__68957){
return (new cljs.core.LazySeq(null,((function (i__68946,label,time_index,vec__68948,_,map__68951,map__68951__$1,int_fs,cum_int_fs,label_index,c__4650__auto__,size__4651__auto__,b__68947,s__68945__$2,temp__5753__auto__,plot_order,labels,icon_order){
return (function (){
var s__68957__$1 = s__68957;
while(true){
var temp__5753__auto____$1 = cljs.core.seq(s__68957__$1);
if(temp__5753__auto____$1){
var xs__6308__auto__ = temp__5753__auto____$1;
var i = cljs.core.first(xs__6308__auto__);
var iterys__4648__auto__ = ((function (s__68957__$1,i__68946,i,xs__6308__auto__,temp__5753__auto____$1,label,time_index,vec__68948,_,map__68951,map__68951__$1,int_fs,cum_int_fs,label_index,c__4650__auto__,size__4651__auto__,b__68947,s__68945__$2,temp__5753__auto__,plot_order,labels,icon_order){
return (function transplants$vis2$side_by_side_icon_array_$_iter__68944_$_iter__68956_$_iter__68958(s__68959){
return (new cljs.core.LazySeq(null,((function (s__68957__$1,i__68946,i,xs__6308__auto__,temp__5753__auto____$1,label,time_index,vec__68948,_,map__68951,map__68951__$1,int_fs,cum_int_fs,label_index,c__4650__auto__,size__4651__auto__,b__68947,s__68945__$2,temp__5753__auto__,plot_order,labels,icon_order){
return (function (){
var s__68959__$1 = s__68959;
while(true){
var temp__5753__auto____$2 = cljs.core.seq(s__68959__$1);
if(temp__5753__auto____$2){
var s__68959__$2 = temp__5753__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__68959__$2)){
var c__4650__auto____$1 = cljs.core.chunk_first(s__68959__$2);
var size__4651__auto____$1 = cljs.core.count(c__4650__auto____$1);
var b__68961 = cljs.core.chunk_buffer(size__4651__auto____$1);
if((function (){var i__68960 = (0);
while(true){
if((i__68960 < size__4651__auto____$1)){
var j = cljs.core._nth(c__4650__auto____$1,i__68960);
var ordinal = (function (){var G__68962 = (j + ((10) * i));
return (icon_order.cljs$core$IFn$_invoke$arity$1 ? icon_order.cljs$core$IFn$_invoke$arity$1(G__68962) : icon_order.call(null,G__68962));
})();
cljs.core.chunk_append(b__68961,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["i-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(j),"-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join(''),new cljs.core.Keyword(null,"transform","transform",1381301764),["translate(",cljs.core.str.cljs$core$IFn$_invoke$arity$1((j * (22)))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1((i * (22))),")"].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.vis2.h_and_s,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"scale","scale",-230427353),(2),new cljs.core.Keyword(null,"fill","fill",883462889),new cljs.core.Keyword(null,"fill","fill",883462889).cljs$core$IFn$_invoke$arity$1(transplants.vis2.ordinal_mdata(ordinal,cum_int_fs,tool_mdata))], null)], null)], null));

var G__69170 = (i__68960 + (1));
i__68960 = G__69170;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__68961),transplants$vis2$side_by_side_icon_array_$_iter__68944_$_iter__68956_$_iter__68958(cljs.core.chunk_rest(s__68959__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__68961),null);
}
} else {
var j = cljs.core.first(s__68959__$2);
var ordinal = (function (){var G__68963 = (j + ((10) * i));
return (icon_order.cljs$core$IFn$_invoke$arity$1 ? icon_order.cljs$core$IFn$_invoke$arity$1(G__68963) : icon_order.call(null,G__68963));
})();
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["i-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(j),"-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join(''),new cljs.core.Keyword(null,"transform","transform",1381301764),["translate(",cljs.core.str.cljs$core$IFn$_invoke$arity$1((j * (22)))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1((i * (22))),")"].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.vis2.h_and_s,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"scale","scale",-230427353),(2),new cljs.core.Keyword(null,"fill","fill",883462889),new cljs.core.Keyword(null,"fill","fill",883462889).cljs$core$IFn$_invoke$arity$1(transplants.vis2.ordinal_mdata(ordinal,cum_int_fs,tool_mdata))], null)], null)], null),transplants$vis2$side_by_side_icon_array_$_iter__68944_$_iter__68956_$_iter__68958(cljs.core.rest(s__68959__$2)));
}
} else {
return null;
}
break;
}
});})(s__68957__$1,i__68946,i,xs__6308__auto__,temp__5753__auto____$1,label,time_index,vec__68948,_,map__68951,map__68951__$1,int_fs,cum_int_fs,label_index,c__4650__auto__,size__4651__auto__,b__68947,s__68945__$2,temp__5753__auto__,plot_order,labels,icon_order))
,null,null));
});})(s__68957__$1,i__68946,i,xs__6308__auto__,temp__5753__auto____$1,label,time_index,vec__68948,_,map__68951,map__68951__$1,int_fs,cum_int_fs,label_index,c__4650__auto__,size__4651__auto__,b__68947,s__68945__$2,temp__5753__auto__,plot_order,labels,icon_order))
;
var fs__4649__auto__ = cljs.core.seq(iterys__4648__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1((10))));
if(fs__4649__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__4649__auto__,transplants$vis2$side_by_side_icon_array_$_iter__68944_$_iter__68956(cljs.core.rest(s__68957__$1)));
} else {
var G__69171 = cljs.core.rest(s__68957__$1);
s__68957__$1 = G__69171;
continue;
}
} else {
return null;
}
break;
}
});})(i__68946,label,time_index,vec__68948,_,map__68951,map__68951__$1,int_fs,cum_int_fs,label_index,c__4650__auto__,size__4651__auto__,b__68947,s__68945__$2,temp__5753__auto__,plot_order,labels,icon_order))
,null,null));
});})(i__68946,label,time_index,vec__68948,_,map__68951,map__68951__$1,int_fs,cum_int_fs,label_index,c__4650__auto__,size__4651__auto__,b__68947,s__68945__$2,temp__5753__auto__,plot_order,labels,icon_order))
;
return iter__4652__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1((10)));
})()], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),(3),new cljs.core.Keyword(null,"transform","transform",1381301764),["translate(",cljs.core.str.cljs$core$IFn$_invoke$arity$1((label_index * (250))),", 340)"].join('')], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",-1790561697),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"font-size","font-size",-1847940346),"1.2em",new cljs.core.Keyword(null,"x","x",2099068185),(20)], null),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(label,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"line","line",212345235),(0)], null))], null)], null)], null));

var G__69172 = (i__68946 + (1));
i__68946 = G__69172;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__68947),transplants$vis2$side_by_side_icon_array_$_iter__68944(cljs.core.chunk_rest(s__68945__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__68947),null);
}
} else {
var label_index = cljs.core.first(s__68945__$2);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(labels,label_index);
var time_index = new cljs.core.Keyword(null,"time-index","time-index",1670884208).cljs$core$IFn$_invoke$arity$1(label);
var vec__68964 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(year_series,time_index);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__68964,(0),null);
var map__68967 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__68964,(1),null);
var map__68967__$1 = cljs.core.__destructure_map(map__68967);
var int_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68967__$1,new cljs.core.Keyword(null,"int-fs","int-fs",1685464335));
var cum_int_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68967__$1,new cljs.core.Keyword(null,"cum-int-fs","cum-int-fs",-2123649193));
return cljs.core.cons(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["lab-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(label_index)].join(''),new cljs.core.Keyword(null,"transform","transform",1381301764),"translate (0, 10)"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),(1)], null),(function (){var iter__4652__auto__ = ((function (label,time_index,vec__68964,_,map__68967,map__68967__$1,int_fs,cum_int_fs,label_index,s__68945__$2,temp__5753__auto__,plot_order,labels,icon_order){
return (function transplants$vis2$side_by_side_icon_array_$_iter__68944_$_iter__68968(s__68969){
return (new cljs.core.LazySeq(null,(function (){
var s__68969__$1 = s__68969;
while(true){
var temp__5753__auto____$1 = cljs.core.seq(s__68969__$1);
if(temp__5753__auto____$1){
var s__68969__$2 = temp__5753__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__68969__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__68969__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__68971 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__68970 = (0);
while(true){
if((i__68970 < size__4651__auto__)){
var k = cljs.core._nth(c__4650__auto__,i__68970);
var outcome_key = (plot_order.cljs$core$IFn$_invoke$arity$1 ? plot_order.cljs$core$IFn$_invoke$arity$1(k) : plot_order.call(null,k));
var outcome = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"outcomes","outcomes",-2034044865),outcome_key], null));
cljs.core.chunk_append(b__68971,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["outk-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)].join(''),new cljs.core.Keyword(null,"transform","transform",1381301764),["translate (",cljs.core.str.cljs$core$IFn$_invoke$arity$1((label_index * (250))),", ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(((k * (25)) - (20))),")"].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.vis2.h_and_s,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"scale","scale",-230427353),(2),new cljs.core.Keyword(null,"fill","fill",883462889),new cljs.core.Keyword(null,"fill","fill",883462889).cljs$core$IFn$_invoke$arity$1(outcome)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",-1790561697),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"transform","transform",1381301764),"translate (40,15)"], null),[cljs.core.str.cljs$core$IFn$_invoke$arity$1((int_fs.cljs$core$IFn$_invoke$arity$1 ? int_fs.cljs$core$IFn$_invoke$arity$1(k) : int_fs.call(null,k)))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"label","label",1718410804).cljs$core$IFn$_invoke$arity$1(outcome))].join('')], null)], null));

var G__69173 = (i__68970 + (1));
i__68970 = G__69173;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__68971),transplants$vis2$side_by_side_icon_array_$_iter__68944_$_iter__68968(cljs.core.chunk_rest(s__68969__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__68971),null);
}
} else {
var k = cljs.core.first(s__68969__$2);
var outcome_key = (plot_order.cljs$core$IFn$_invoke$arity$1 ? plot_order.cljs$core$IFn$_invoke$arity$1(k) : plot_order.call(null,k));
var outcome = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"outcomes","outcomes",-2034044865),outcome_key], null));
return cljs.core.cons(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["outk-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)].join(''),new cljs.core.Keyword(null,"transform","transform",1381301764),["translate (",cljs.core.str.cljs$core$IFn$_invoke$arity$1((label_index * (250))),", ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(((k * (25)) - (20))),")"].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.vis2.h_and_s,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"scale","scale",-230427353),(2),new cljs.core.Keyword(null,"fill","fill",883462889),new cljs.core.Keyword(null,"fill","fill",883462889).cljs$core$IFn$_invoke$arity$1(outcome)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",-1790561697),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"transform","transform",1381301764),"translate (40,15)"], null),[cljs.core.str.cljs$core$IFn$_invoke$arity$1((int_fs.cljs$core$IFn$_invoke$arity$1 ? int_fs.cljs$core$IFn$_invoke$arity$1(k) : int_fs.call(null,k)))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"label","label",1718410804).cljs$core$IFn$_invoke$arity$1(outcome))].join('')], null)], null),transplants$vis2$side_by_side_icon_array_$_iter__68944_$_iter__68968(cljs.core.rest(s__68969__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});})(label,time_index,vec__68964,_,map__68967,map__68967__$1,int_fs,cum_int_fs,label_index,s__68945__$2,temp__5753__auto__,plot_order,labels,icon_order))
;
return iter__4652__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(plot_order)));
})()], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),(2),new cljs.core.Keyword(null,"transform","transform",1381301764),["translate(",cljs.core.str.cljs$core$IFn$_invoke$arity$1((label_index * (250))),", 90)"].join('')], null),(function (){var iter__4652__auto__ = ((function (label,time_index,vec__68964,_,map__68967,map__68967__$1,int_fs,cum_int_fs,label_index,s__68945__$2,temp__5753__auto__,plot_order,labels,icon_order){
return (function transplants$vis2$side_by_side_icon_array_$_iter__68944_$_iter__68972(s__68973){
return (new cljs.core.LazySeq(null,(function (){
var s__68973__$1 = s__68973;
while(true){
var temp__5753__auto____$1 = cljs.core.seq(s__68973__$1);
if(temp__5753__auto____$1){
var xs__6308__auto__ = temp__5753__auto____$1;
var i = cljs.core.first(xs__6308__auto__);
var iterys__4648__auto__ = ((function (s__68973__$1,i,xs__6308__auto__,temp__5753__auto____$1,label,time_index,vec__68964,_,map__68967,map__68967__$1,int_fs,cum_int_fs,label_index,s__68945__$2,temp__5753__auto__,plot_order,labels,icon_order){
return (function transplants$vis2$side_by_side_icon_array_$_iter__68944_$_iter__68972_$_iter__68974(s__68975){
return (new cljs.core.LazySeq(null,((function (s__68973__$1,i,xs__6308__auto__,temp__5753__auto____$1,label,time_index,vec__68964,_,map__68967,map__68967__$1,int_fs,cum_int_fs,label_index,s__68945__$2,temp__5753__auto__,plot_order,labels,icon_order){
return (function (){
var s__68975__$1 = s__68975;
while(true){
var temp__5753__auto____$2 = cljs.core.seq(s__68975__$1);
if(temp__5753__auto____$2){
var s__68975__$2 = temp__5753__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__68975__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__68975__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__68977 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__68976 = (0);
while(true){
if((i__68976 < size__4651__auto__)){
var j = cljs.core._nth(c__4650__auto__,i__68976);
var ordinal = (function (){var G__68978 = (j + ((10) * i));
return (icon_order.cljs$core$IFn$_invoke$arity$1 ? icon_order.cljs$core$IFn$_invoke$arity$1(G__68978) : icon_order.call(null,G__68978));
})();
cljs.core.chunk_append(b__68977,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["i-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(j),"-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join(''),new cljs.core.Keyword(null,"transform","transform",1381301764),["translate(",cljs.core.str.cljs$core$IFn$_invoke$arity$1((j * (22)))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1((i * (22))),")"].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.vis2.h_and_s,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"scale","scale",-230427353),(2),new cljs.core.Keyword(null,"fill","fill",883462889),new cljs.core.Keyword(null,"fill","fill",883462889).cljs$core$IFn$_invoke$arity$1(transplants.vis2.ordinal_mdata(ordinal,cum_int_fs,tool_mdata))], null)], null)], null));

var G__69175 = (i__68976 + (1));
i__68976 = G__69175;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__68977),transplants$vis2$side_by_side_icon_array_$_iter__68944_$_iter__68972_$_iter__68974(cljs.core.chunk_rest(s__68975__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__68977),null);
}
} else {
var j = cljs.core.first(s__68975__$2);
var ordinal = (function (){var G__68979 = (j + ((10) * i));
return (icon_order.cljs$core$IFn$_invoke$arity$1 ? icon_order.cljs$core$IFn$_invoke$arity$1(G__68979) : icon_order.call(null,G__68979));
})();
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["i-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(j),"-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join(''),new cljs.core.Keyword(null,"transform","transform",1381301764),["translate(",cljs.core.str.cljs$core$IFn$_invoke$arity$1((j * (22)))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1((i * (22))),")"].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.vis2.h_and_s,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"scale","scale",-230427353),(2),new cljs.core.Keyword(null,"fill","fill",883462889),new cljs.core.Keyword(null,"fill","fill",883462889).cljs$core$IFn$_invoke$arity$1(transplants.vis2.ordinal_mdata(ordinal,cum_int_fs,tool_mdata))], null)], null)], null),transplants$vis2$side_by_side_icon_array_$_iter__68944_$_iter__68972_$_iter__68974(cljs.core.rest(s__68975__$2)));
}
} else {
return null;
}
break;
}
});})(s__68973__$1,i,xs__6308__auto__,temp__5753__auto____$1,label,time_index,vec__68964,_,map__68967,map__68967__$1,int_fs,cum_int_fs,label_index,s__68945__$2,temp__5753__auto__,plot_order,labels,icon_order))
,null,null));
});})(s__68973__$1,i,xs__6308__auto__,temp__5753__auto____$1,label,time_index,vec__68964,_,map__68967,map__68967__$1,int_fs,cum_int_fs,label_index,s__68945__$2,temp__5753__auto__,plot_order,labels,icon_order))
;
var fs__4649__auto__ = cljs.core.seq(iterys__4648__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1((10))));
if(fs__4649__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__4649__auto__,transplants$vis2$side_by_side_icon_array_$_iter__68944_$_iter__68972(cljs.core.rest(s__68973__$1)));
} else {
var G__69176 = cljs.core.rest(s__68973__$1);
s__68973__$1 = G__69176;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});})(label,time_index,vec__68964,_,map__68967,map__68967__$1,int_fs,cum_int_fs,label_index,s__68945__$2,temp__5753__auto__,plot_order,labels,icon_order))
;
return iter__4652__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1((10)));
})()], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),(3),new cljs.core.Keyword(null,"transform","transform",1381301764),["translate(",cljs.core.str.cljs$core$IFn$_invoke$arity$1((label_index * (250))),", 340)"].join('')], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",-1790561697),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"font-size","font-size",-1847940346),"1.2em",new cljs.core.Keyword(null,"x","x",2099068185),(20)], null),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(label,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"line","line",212345235),(0)], null))], null)], null)], null),transplants$vis2$side_by_side_icon_array_$_iter__68944(cljs.core.rest(s__68945__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__4652__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(labels)));
})());
})], null)], null);
});
/**
 * Render stacked icon arrays - one for each timeperiod of interest - called a year at the moment.
 */
transplants.vis2.stacked_icon_array = (function transplants$vis2$stacked_icon_array(year_series,tool_mdata,_){
var svg_width = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"icons","icons",-297140977),new cljs.core.Keyword(null,"svg-width","svg-width",1259023155)], null));
var svg_height = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"icons","icons",-297140977),new cljs.core.Keyword(null,"svg-height","svg-height",1432012799)], null));
var plot_order = new cljs.core.Keyword(null,"plot-order","plot-order",443808332).cljs$core$IFn$_invoke$arity$1(tool_mdata);
var labels = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"icons","icons",-297140977),new cljs.core.Keyword(null,"labels","labels",-626734591)], null));
var icon_order = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.range.cljs$core$IFn$_invoke$arity$1((100)));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.ui.col,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"sm","sm",-1402575065),(12),new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"padding","padding",1660304693),(0)], null)], null),(function (){var iter__4652__auto__ = (function transplants$vis2$stacked_icon_array_$_iter__68982(s__68983){
return (new cljs.core.LazySeq(null,(function (){
var s__68983__$1 = s__68983;
while(true){
var temp__5753__auto__ = cljs.core.seq(s__68983__$1);
if(temp__5753__auto__){
var s__68983__$2 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(s__68983__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__68983__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__68985 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__68984 = (0);
while(true){
if((i__68984 < size__4651__auto__)){
var i = cljs.core._nth(c__4650__auto__,i__68984);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(labels,i);
var time_index = new cljs.core.Keyword(null,"time-index","time-index",1670884208).cljs$core$IFn$_invoke$arity$1(label);
var vec__68986 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(year_series,time_index);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__68986,(0),null);
var map__68989 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__68986,(1),null);
var map__68989__$1 = cljs.core.__destructure_map(map__68989);
var int_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68989__$1,new cljs.core.Keyword(null,"int-fs","int-fs",1685464335));
var cum_int_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68989__$1,new cljs.core.Keyword(null,"cum-int-fs","cum-int-fs",-2123649193));
cljs.core.chunk_append(b__68985,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.ui.row,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"padding","padding",1660304693),"0px 0px"], null),new cljs.core.Keyword(null,"key","key",-1516042587),["year-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(time_index)].join('')], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.ui.col,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),(1)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h5","h5",-1829156625),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin-top","margin-top",392161226),(20)], null)], null),(function (){var line = new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(label);
if(cljs.core.sequential_QMARK_(line)){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.str,line);
} else {
return line;
}
})()], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [svg.container.svg_container,((function (i__68984,label,time_index,vec__68986,___$1,map__68989,map__68989__$1,int_fs,cum_int_fs,i,c__4650__auto__,size__4651__auto__,b__68985,s__68983__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order){
return (function (p1__68980_SHARP_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__68980_SHARP_,new cljs.core.Keyword(null,"aspect-ratio","aspect-ratio",1674013504),transplants.vis2.aspect_ratio(new cljs.core.Keyword(null,"width","width",-384071477).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"inner","inner",-1383171215).cljs$core$IFn$_invoke$arity$1(p1__68980_SHARP_)),new cljs.core.Keyword(null,"height","height",1025178622).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"inner","inner",-1383171215).cljs$core$IFn$_invoke$arity$1(p1__68980_SHARP_))));
});})(i__68984,label,time_index,vec__68986,___$1,map__68989,map__68989__$1,int_fs,cum_int_fs,i,c__4650__auto__,size__4651__auto__,b__68985,s__68983__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order))
(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(svg.space.space(new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"outer","outer",-375185956),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"width","width",-384071477),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"icons","icons",-297140977),new cljs.core.Keyword(null,"svg-width","svg-width",1259023155)], null)),new cljs.core.Keyword(null,"height","height",1025178622),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"icons","icons",-297140977),new cljs.core.Keyword(null,"svg-height","svg-height",1432012799)], null))], null),new cljs.core.Keyword(null,"aspect-ratio","aspect-ratio",1674013504),transplants.vis2.aspect_ratio(svg_width,svg_height),new cljs.core.Keyword(null,"margin","margin",-995903681),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"icons","icons",-297140977),new cljs.core.Keyword(null,"svg-margin","svg-margin",1509529342)], null)),new cljs.core.Keyword(null,"padding","padding",1660304693),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"icons","icons",-297140977),new cljs.core.Keyword(null,"svg-padding","svg-padding",1501468269)], null)),new cljs.core.Keyword(null,"x-domain","x-domain",501559689),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(300)], null),new cljs.core.Keyword(null,"x-ticks","x-ticks",1636599024),(10),new cljs.core.Keyword(null,"y-domain","y-domain",-969203007),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(300),(0)], null),new cljs.core.Keyword(null,"y-ticks","y-ticks",-843622722),(10)], null)),new cljs.core.Keyword(null,"styles","styles",1954480375),transplants.vis2.styles)),((function (i__68984,label,time_index,vec__68986,___$1,map__68989,map__68989__$1,int_fs,cum_int_fs,i,c__4650__auto__,size__4651__auto__,b__68985,s__68983__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order){
return (function (___$2,___$3,___$4,___$5){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"transform","transform",1381301764),"translate(10,15),scale(1.9)"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),(1)], null),(function (){var iter__4652__auto__ = ((function (i__68984,label,time_index,vec__68986,___$1,map__68989,map__68989__$1,int_fs,cum_int_fs,i,c__4650__auto__,size__4651__auto__,b__68985,s__68983__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order){
return (function transplants$vis2$stacked_icon_array_$_iter__68982_$_iter__68990(s__68991){
return (new cljs.core.LazySeq(null,((function (i__68984,label,time_index,vec__68986,___$1,map__68989,map__68989__$1,int_fs,cum_int_fs,i,c__4650__auto__,size__4651__auto__,b__68985,s__68983__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order){
return (function (){
var s__68991__$1 = s__68991;
while(true){
var temp__5753__auto____$1 = cljs.core.seq(s__68991__$1);
if(temp__5753__auto____$1){
var s__68991__$2 = temp__5753__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__68991__$2)){
var c__4650__auto____$1 = cljs.core.chunk_first(s__68991__$2);
var size__4651__auto____$1 = cljs.core.count(c__4650__auto____$1);
var b__68993 = cljs.core.chunk_buffer(size__4651__auto____$1);
if((function (){var i__68992 = (0);
while(true){
if((i__68992 < size__4651__auto____$1)){
var k = cljs.core._nth(c__4650__auto____$1,i__68992);
var outcome_key = (plot_order.cljs$core$IFn$_invoke$arity$1 ? plot_order.cljs$core$IFn$_invoke$arity$1(k) : plot_order.call(null,k));
var outcome = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"outcomes","outcomes",-2034044865),outcome_key], null));
cljs.core.chunk_append(b__68993,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["outk-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)].join(''),new cljs.core.Keyword(null,"transform","transform",1381301764),["translate (",cljs.core.str.cljs$core$IFn$_invoke$arity$1((10)),", ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(((k * (25)) + (20))),")"].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.vis2.h_and_s,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"scale","scale",-230427353),(2),new cljs.core.Keyword(null,"fill","fill",883462889),new cljs.core.Keyword(null,"fill","fill",883462889).cljs$core$IFn$_invoke$arity$1(outcome)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",-1790561697),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"transform","transform",1381301764),"translate(30,15)"], null),[cljs.core.str.cljs$core$IFn$_invoke$arity$1((int_fs.cljs$core$IFn$_invoke$arity$1 ? int_fs.cljs$core$IFn$_invoke$arity$1(k) : int_fs.call(null,k)))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"label","label",1718410804).cljs$core$IFn$_invoke$arity$1(outcome))].join('')], null)], null));

var G__69179 = (i__68992 + (1));
i__68992 = G__69179;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__68993),transplants$vis2$stacked_icon_array_$_iter__68982_$_iter__68990(cljs.core.chunk_rest(s__68991__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__68993),null);
}
} else {
var k = cljs.core.first(s__68991__$2);
var outcome_key = (plot_order.cljs$core$IFn$_invoke$arity$1 ? plot_order.cljs$core$IFn$_invoke$arity$1(k) : plot_order.call(null,k));
var outcome = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"outcomes","outcomes",-2034044865),outcome_key], null));
return cljs.core.cons(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["outk-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)].join(''),new cljs.core.Keyword(null,"transform","transform",1381301764),["translate (",cljs.core.str.cljs$core$IFn$_invoke$arity$1((10)),", ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(((k * (25)) + (20))),")"].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.vis2.h_and_s,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"scale","scale",-230427353),(2),new cljs.core.Keyword(null,"fill","fill",883462889),new cljs.core.Keyword(null,"fill","fill",883462889).cljs$core$IFn$_invoke$arity$1(outcome)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",-1790561697),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"transform","transform",1381301764),"translate(30,15)"], null),[cljs.core.str.cljs$core$IFn$_invoke$arity$1((int_fs.cljs$core$IFn$_invoke$arity$1 ? int_fs.cljs$core$IFn$_invoke$arity$1(k) : int_fs.call(null,k)))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"label","label",1718410804).cljs$core$IFn$_invoke$arity$1(outcome))].join('')], null)], null),transplants$vis2$stacked_icon_array_$_iter__68982_$_iter__68990(cljs.core.rest(s__68991__$2)));
}
} else {
return null;
}
break;
}
});})(i__68984,label,time_index,vec__68986,___$1,map__68989,map__68989__$1,int_fs,cum_int_fs,i,c__4650__auto__,size__4651__auto__,b__68985,s__68983__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order))
,null,null));
});})(i__68984,label,time_index,vec__68986,___$1,map__68989,map__68989__$1,int_fs,cum_int_fs,i,c__4650__auto__,size__4651__auto__,b__68985,s__68983__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order))
;
return iter__4652__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(plot_order)));
})()], null),(function (){var iter__4652__auto__ = ((function (i__68984,label,time_index,vec__68986,___$1,map__68989,map__68989__$1,int_fs,cum_int_fs,i,c__4650__auto__,size__4651__auto__,b__68985,s__68983__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order){
return (function transplants$vis2$stacked_icon_array_$_iter__68982_$_iter__68994(s__68995){
return (new cljs.core.LazySeq(null,((function (i__68984,label,time_index,vec__68986,___$1,map__68989,map__68989__$1,int_fs,cum_int_fs,i,c__4650__auto__,size__4651__auto__,b__68985,s__68983__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order){
return (function (){
var s__68995__$1 = s__68995;
while(true){
var temp__5753__auto____$1 = cljs.core.seq(s__68995__$1);
if(temp__5753__auto____$1){
var xs__6308__auto__ = temp__5753__auto____$1;
var i__$1 = cljs.core.first(xs__6308__auto__);
var iterys__4648__auto__ = ((function (s__68995__$1,i__68984,i__$1,xs__6308__auto__,temp__5753__auto____$1,label,time_index,vec__68986,___$1,map__68989,map__68989__$1,int_fs,cum_int_fs,i,c__4650__auto__,size__4651__auto__,b__68985,s__68983__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order){
return (function transplants$vis2$stacked_icon_array_$_iter__68982_$_iter__68994_$_iter__68996(s__68997){
return (new cljs.core.LazySeq(null,((function (s__68995__$1,i__68984,i__$1,xs__6308__auto__,temp__5753__auto____$1,label,time_index,vec__68986,___$1,map__68989,map__68989__$1,int_fs,cum_int_fs,i,c__4650__auto__,size__4651__auto__,b__68985,s__68983__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order){
return (function (){
var s__68997__$1 = s__68997;
while(true){
var temp__5753__auto____$2 = cljs.core.seq(s__68997__$1);
if(temp__5753__auto____$2){
var s__68997__$2 = temp__5753__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__68997__$2)){
var c__4650__auto____$1 = cljs.core.chunk_first(s__68997__$2);
var size__4651__auto____$1 = cljs.core.count(c__4650__auto____$1);
var b__68999 = cljs.core.chunk_buffer(size__4651__auto____$1);
if((function (){var i__68998 = (0);
while(true){
if((i__68998 < size__4651__auto____$1)){
var j = cljs.core._nth(c__4650__auto____$1,i__68998);
var ordinal = (function (){var G__69000 = (j + ((10) * i__$1));
return (icon_order.cljs$core$IFn$_invoke$arity$1 ? icon_order.cljs$core$IFn$_invoke$arity$1(G__69000) : icon_order.call(null,G__69000));
})();
cljs.core.chunk_append(b__68999,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["i-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(j),"-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i__$1)].join(''),new cljs.core.Keyword(null,"transform","transform",1381301764),["translate(",cljs.core.str.cljs$core$IFn$_invoke$arity$1(((300) + (j * (22))))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(((20) + (i__$1 * (22)))),")"].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.vis2.h_and_s,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"scale","scale",-230427353),(2),new cljs.core.Keyword(null,"fill","fill",883462889),new cljs.core.Keyword(null,"fill","fill",883462889).cljs$core$IFn$_invoke$arity$1(transplants.vis2.ordinal_mdata(ordinal,cum_int_fs,tool_mdata))], null)], null)], null));

var G__69183 = (i__68998 + (1));
i__68998 = G__69183;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__68999),transplants$vis2$stacked_icon_array_$_iter__68982_$_iter__68994_$_iter__68996(cljs.core.chunk_rest(s__68997__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__68999),null);
}
} else {
var j = cljs.core.first(s__68997__$2);
var ordinal = (function (){var G__69001 = (j + ((10) * i__$1));
return (icon_order.cljs$core$IFn$_invoke$arity$1 ? icon_order.cljs$core$IFn$_invoke$arity$1(G__69001) : icon_order.call(null,G__69001));
})();
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["i-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(j),"-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i__$1)].join(''),new cljs.core.Keyword(null,"transform","transform",1381301764),["translate(",cljs.core.str.cljs$core$IFn$_invoke$arity$1(((300) + (j * (22))))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(((20) + (i__$1 * (22)))),")"].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.vis2.h_and_s,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"scale","scale",-230427353),(2),new cljs.core.Keyword(null,"fill","fill",883462889),new cljs.core.Keyword(null,"fill","fill",883462889).cljs$core$IFn$_invoke$arity$1(transplants.vis2.ordinal_mdata(ordinal,cum_int_fs,tool_mdata))], null)], null)], null),transplants$vis2$stacked_icon_array_$_iter__68982_$_iter__68994_$_iter__68996(cljs.core.rest(s__68997__$2)));
}
} else {
return null;
}
break;
}
});})(s__68995__$1,i__68984,i__$1,xs__6308__auto__,temp__5753__auto____$1,label,time_index,vec__68986,___$1,map__68989,map__68989__$1,int_fs,cum_int_fs,i,c__4650__auto__,size__4651__auto__,b__68985,s__68983__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order))
,null,null));
});})(s__68995__$1,i__68984,i__$1,xs__6308__auto__,temp__5753__auto____$1,label,time_index,vec__68986,___$1,map__68989,map__68989__$1,int_fs,cum_int_fs,i,c__4650__auto__,size__4651__auto__,b__68985,s__68983__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order))
;
var fs__4649__auto__ = cljs.core.seq(iterys__4648__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1((10))));
if(fs__4649__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__4649__auto__,transplants$vis2$stacked_icon_array_$_iter__68982_$_iter__68994(cljs.core.rest(s__68995__$1)));
} else {
var G__69184 = cljs.core.rest(s__68995__$1);
s__68995__$1 = G__69184;
continue;
}
} else {
return null;
}
break;
}
});})(i__68984,label,time_index,vec__68986,___$1,map__68989,map__68989__$1,int_fs,cum_int_fs,i,c__4650__auto__,size__4651__auto__,b__68985,s__68983__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order))
,null,null));
});})(i__68984,label,time_index,vec__68986,___$1,map__68989,map__68989__$1,int_fs,cum_int_fs,i,c__4650__auto__,size__4651__auto__,b__68985,s__68983__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order))
;
return iter__4652__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1((10)));
})()], null);
});})(i__68984,label,time_index,vec__68986,___$1,map__68989,map__68989__$1,int_fs,cum_int_fs,i,c__4650__auto__,size__4651__auto__,b__68985,s__68983__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order))
], null)], null)], null));

var G__69185 = (i__68984 + (1));
i__68984 = G__69185;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__68985),transplants$vis2$stacked_icon_array_$_iter__68982(cljs.core.chunk_rest(s__68983__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__68985),null);
}
} else {
var i = cljs.core.first(s__68983__$2);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(labels,i);
var time_index = new cljs.core.Keyword(null,"time-index","time-index",1670884208).cljs$core$IFn$_invoke$arity$1(label);
var vec__69002 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(year_series,time_index);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69002,(0),null);
var map__69005 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69002,(1),null);
var map__69005__$1 = cljs.core.__destructure_map(map__69005);
var int_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69005__$1,new cljs.core.Keyword(null,"int-fs","int-fs",1685464335));
var cum_int_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69005__$1,new cljs.core.Keyword(null,"cum-int-fs","cum-int-fs",-2123649193));
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.ui.row,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"padding","padding",1660304693),"0px 0px"], null),new cljs.core.Keyword(null,"key","key",-1516042587),["year-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(time_index)].join('')], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.ui.col,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),(1)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h5","h5",-1829156625),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin-top","margin-top",392161226),(20)], null)], null),(function (){var line = new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(label);
if(cljs.core.sequential_QMARK_(line)){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.str,line);
} else {
return line;
}
})()], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [svg.container.svg_container,((function (label,time_index,vec__69002,___$1,map__69005,map__69005__$1,int_fs,cum_int_fs,i,s__68983__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order){
return (function (p1__68980_SHARP_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__68980_SHARP_,new cljs.core.Keyword(null,"aspect-ratio","aspect-ratio",1674013504),transplants.vis2.aspect_ratio(new cljs.core.Keyword(null,"width","width",-384071477).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"inner","inner",-1383171215).cljs$core$IFn$_invoke$arity$1(p1__68980_SHARP_)),new cljs.core.Keyword(null,"height","height",1025178622).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"inner","inner",-1383171215).cljs$core$IFn$_invoke$arity$1(p1__68980_SHARP_))));
});})(label,time_index,vec__69002,___$1,map__69005,map__69005__$1,int_fs,cum_int_fs,i,s__68983__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order))
(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(svg.space.space(new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"outer","outer",-375185956),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"width","width",-384071477),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"icons","icons",-297140977),new cljs.core.Keyword(null,"svg-width","svg-width",1259023155)], null)),new cljs.core.Keyword(null,"height","height",1025178622),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"icons","icons",-297140977),new cljs.core.Keyword(null,"svg-height","svg-height",1432012799)], null))], null),new cljs.core.Keyword(null,"aspect-ratio","aspect-ratio",1674013504),transplants.vis2.aspect_ratio(svg_width,svg_height),new cljs.core.Keyword(null,"margin","margin",-995903681),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"icons","icons",-297140977),new cljs.core.Keyword(null,"svg-margin","svg-margin",1509529342)], null)),new cljs.core.Keyword(null,"padding","padding",1660304693),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"icons","icons",-297140977),new cljs.core.Keyword(null,"svg-padding","svg-padding",1501468269)], null)),new cljs.core.Keyword(null,"x-domain","x-domain",501559689),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(300)], null),new cljs.core.Keyword(null,"x-ticks","x-ticks",1636599024),(10),new cljs.core.Keyword(null,"y-domain","y-domain",-969203007),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(300),(0)], null),new cljs.core.Keyword(null,"y-ticks","y-ticks",-843622722),(10)], null)),new cljs.core.Keyword(null,"styles","styles",1954480375),transplants.vis2.styles)),((function (label,time_index,vec__69002,___$1,map__69005,map__69005__$1,int_fs,cum_int_fs,i,s__68983__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order){
return (function (___$2,___$3,___$4,___$5){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"transform","transform",1381301764),"translate(10,15),scale(1.9)"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),(1)], null),(function (){var iter__4652__auto__ = (function transplants$vis2$stacked_icon_array_$_iter__68982_$_iter__69006(s__69007){
return (new cljs.core.LazySeq(null,(function (){
var s__69007__$1 = s__69007;
while(true){
var temp__5753__auto____$1 = cljs.core.seq(s__69007__$1);
if(temp__5753__auto____$1){
var s__69007__$2 = temp__5753__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__69007__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__69007__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__69009 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__69008 = (0);
while(true){
if((i__69008 < size__4651__auto__)){
var k = cljs.core._nth(c__4650__auto__,i__69008);
var outcome_key = (plot_order.cljs$core$IFn$_invoke$arity$1 ? plot_order.cljs$core$IFn$_invoke$arity$1(k) : plot_order.call(null,k));
var outcome = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"outcomes","outcomes",-2034044865),outcome_key], null));
cljs.core.chunk_append(b__69009,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["outk-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)].join(''),new cljs.core.Keyword(null,"transform","transform",1381301764),["translate (",cljs.core.str.cljs$core$IFn$_invoke$arity$1((10)),", ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(((k * (25)) + (20))),")"].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.vis2.h_and_s,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"scale","scale",-230427353),(2),new cljs.core.Keyword(null,"fill","fill",883462889),new cljs.core.Keyword(null,"fill","fill",883462889).cljs$core$IFn$_invoke$arity$1(outcome)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",-1790561697),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"transform","transform",1381301764),"translate(30,15)"], null),[cljs.core.str.cljs$core$IFn$_invoke$arity$1((int_fs.cljs$core$IFn$_invoke$arity$1 ? int_fs.cljs$core$IFn$_invoke$arity$1(k) : int_fs.call(null,k)))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"label","label",1718410804).cljs$core$IFn$_invoke$arity$1(outcome))].join('')], null)], null));

var G__69189 = (i__69008 + (1));
i__69008 = G__69189;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__69009),transplants$vis2$stacked_icon_array_$_iter__68982_$_iter__69006(cljs.core.chunk_rest(s__69007__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__69009),null);
}
} else {
var k = cljs.core.first(s__69007__$2);
var outcome_key = (plot_order.cljs$core$IFn$_invoke$arity$1 ? plot_order.cljs$core$IFn$_invoke$arity$1(k) : plot_order.call(null,k));
var outcome = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"outcomes","outcomes",-2034044865),outcome_key], null));
return cljs.core.cons(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["outk-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)].join(''),new cljs.core.Keyword(null,"transform","transform",1381301764),["translate (",cljs.core.str.cljs$core$IFn$_invoke$arity$1((10)),", ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(((k * (25)) + (20))),")"].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.vis2.h_and_s,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"scale","scale",-230427353),(2),new cljs.core.Keyword(null,"fill","fill",883462889),new cljs.core.Keyword(null,"fill","fill",883462889).cljs$core$IFn$_invoke$arity$1(outcome)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",-1790561697),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"transform","transform",1381301764),"translate(30,15)"], null),[cljs.core.str.cljs$core$IFn$_invoke$arity$1((int_fs.cljs$core$IFn$_invoke$arity$1 ? int_fs.cljs$core$IFn$_invoke$arity$1(k) : int_fs.call(null,k)))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"label","label",1718410804).cljs$core$IFn$_invoke$arity$1(outcome))].join('')], null)], null),transplants$vis2$stacked_icon_array_$_iter__68982_$_iter__69006(cljs.core.rest(s__69007__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__4652__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(plot_order)));
})()], null),(function (){var iter__4652__auto__ = (function transplants$vis2$stacked_icon_array_$_iter__68982_$_iter__69010(s__69011){
return (new cljs.core.LazySeq(null,(function (){
var s__69011__$1 = s__69011;
while(true){
var temp__5753__auto____$1 = cljs.core.seq(s__69011__$1);
if(temp__5753__auto____$1){
var xs__6308__auto__ = temp__5753__auto____$1;
var i__$1 = cljs.core.first(xs__6308__auto__);
var iterys__4648__auto__ = ((function (s__69011__$1,i__$1,xs__6308__auto__,temp__5753__auto____$1,label,time_index,vec__69002,___$1,map__69005,map__69005__$1,int_fs,cum_int_fs,i,s__68983__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order){
return (function transplants$vis2$stacked_icon_array_$_iter__68982_$_iter__69010_$_iter__69012(s__69013){
return (new cljs.core.LazySeq(null,((function (s__69011__$1,i__$1,xs__6308__auto__,temp__5753__auto____$1,label,time_index,vec__69002,___$1,map__69005,map__69005__$1,int_fs,cum_int_fs,i,s__68983__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order){
return (function (){
var s__69013__$1 = s__69013;
while(true){
var temp__5753__auto____$2 = cljs.core.seq(s__69013__$1);
if(temp__5753__auto____$2){
var s__69013__$2 = temp__5753__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__69013__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__69013__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__69015 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__69014 = (0);
while(true){
if((i__69014 < size__4651__auto__)){
var j = cljs.core._nth(c__4650__auto__,i__69014);
var ordinal = (function (){var G__69016 = (j + ((10) * i__$1));
return (icon_order.cljs$core$IFn$_invoke$arity$1 ? icon_order.cljs$core$IFn$_invoke$arity$1(G__69016) : icon_order.call(null,G__69016));
})();
cljs.core.chunk_append(b__69015,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["i-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(j),"-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i__$1)].join(''),new cljs.core.Keyword(null,"transform","transform",1381301764),["translate(",cljs.core.str.cljs$core$IFn$_invoke$arity$1(((300) + (j * (22))))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(((20) + (i__$1 * (22)))),")"].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.vis2.h_and_s,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"scale","scale",-230427353),(2),new cljs.core.Keyword(null,"fill","fill",883462889),new cljs.core.Keyword(null,"fill","fill",883462889).cljs$core$IFn$_invoke$arity$1(transplants.vis2.ordinal_mdata(ordinal,cum_int_fs,tool_mdata))], null)], null)], null));

var G__69194 = (i__69014 + (1));
i__69014 = G__69194;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__69015),transplants$vis2$stacked_icon_array_$_iter__68982_$_iter__69010_$_iter__69012(cljs.core.chunk_rest(s__69013__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__69015),null);
}
} else {
var j = cljs.core.first(s__69013__$2);
var ordinal = (function (){var G__69017 = (j + ((10) * i__$1));
return (icon_order.cljs$core$IFn$_invoke$arity$1 ? icon_order.cljs$core$IFn$_invoke$arity$1(G__69017) : icon_order.call(null,G__69017));
})();
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["i-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(j),"-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i__$1)].join(''),new cljs.core.Keyword(null,"transform","transform",1381301764),["translate(",cljs.core.str.cljs$core$IFn$_invoke$arity$1(((300) + (j * (22))))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(((20) + (i__$1 * (22)))),")"].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.vis2.h_and_s,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"scale","scale",-230427353),(2),new cljs.core.Keyword(null,"fill","fill",883462889),new cljs.core.Keyword(null,"fill","fill",883462889).cljs$core$IFn$_invoke$arity$1(transplants.vis2.ordinal_mdata(ordinal,cum_int_fs,tool_mdata))], null)], null)], null),transplants$vis2$stacked_icon_array_$_iter__68982_$_iter__69010_$_iter__69012(cljs.core.rest(s__69013__$2)));
}
} else {
return null;
}
break;
}
});})(s__69011__$1,i__$1,xs__6308__auto__,temp__5753__auto____$1,label,time_index,vec__69002,___$1,map__69005,map__69005__$1,int_fs,cum_int_fs,i,s__68983__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order))
,null,null));
});})(s__69011__$1,i__$1,xs__6308__auto__,temp__5753__auto____$1,label,time_index,vec__69002,___$1,map__69005,map__69005__$1,int_fs,cum_int_fs,i,s__68983__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order))
;
var fs__4649__auto__ = cljs.core.seq(iterys__4648__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1((10))));
if(fs__4649__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__4649__auto__,transplants$vis2$stacked_icon_array_$_iter__68982_$_iter__69010(cljs.core.rest(s__69011__$1)));
} else {
var G__69199 = cljs.core.rest(s__69011__$1);
s__69011__$1 = G__69199;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__4652__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1((10)));
})()], null);
});})(label,time_index,vec__69002,___$1,map__69005,map__69005__$1,int_fs,cum_int_fs,i,s__68983__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order))
], null)], null)], null),transplants$vis2$stacked_icon_array_$_iter__68982(cljs.core.rest(s__68983__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__4652__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(labels)));
})()], null);
});
/**
 * Returns a-vector with all items (if any) moved to the start or the end depending on whether
 *   a < b or b < a
 *   
 */
transplants.vis2.move_item = (function transplants$vis2$move_item(a_vector,item,a,b){
if(cljs.core.not_any_QMARK_((function (p1__69018_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(item,p1__69018_SHARP_);
}),a_vector)){
return a_vector;
} else {
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2((function (el){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(item,el)){
return a;
} else {
return b;
}
}),a_vector));
}
});
/**
 * Move item to start of vector
 */
transplants.vis2.move_to_start = (function transplants$vis2$move_to_start(a_vector,item){
return transplants.vis2.move_item(a_vector,item,(-1),(1));
});
/**
 * Move item to end of vector.
 */
transplants.vis2.move_to_end = (function transplants$vis2$move_to_end(a_vector,item){
return transplants.vis2.move_item(a_vector,item,(1),(-1));
});
/**
 * render an icon array results view
 */
transplants.vis2.icon_array = (function transplants$vis2$icon_array(p__69019){
var map__69020 = p__69019;
var map__69020__$1 = cljs.core.__destructure_map(map__69020);
var env = map__69020__$1;
var organ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69020__$1,new cljs.core.Keyword(null,"organ","organ",-29862572));
var tool = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69020__$1,new cljs.core.Keyword(null,"tool","tool",-1298696470));
var base_outcome_keys = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69020__$1,new cljs.core.Keyword(null,"base-outcome-keys","base-outcome-keys",519744091));
var s0 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69020__$1,new cljs.core.Keyword(null,"s0","s0",-350711836));
var F = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69020__$1,new cljs.core.Keyword(null,"F","F",-1115543258));
var sample_days = cljs.core.map.cljs$core$IFn$_invoke$arity$2(transplants.utils.year__GT_day,cljs.core.range.cljs$core$IFn$_invoke$arity$1((transplants.utils.day__GT_year(cljs.core.first(cljs.core.last(s0))) + (1))));
var fs_by_year = cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (day){
return transplants.model.S0_for_day(F,day);
}),sample_days);
var tool_mdata = transplants.vis2.tool_metadata(env,organ,tool);
var data_styles = cljs.core.get.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.Keyword(null,"outcomes","outcomes",-2034044865));
var plot_order = new cljs.core.Keyword(null,"plot-order","plot-order",443808332).cljs$core$IFn$_invoke$arity$1(tool_mdata);
var plot_order_STAR_ = (function (){var x = new cljs.core.Keyword(null,"plot-order","plot-order",443808332).cljs$core$IFn$_invoke$arity$1(tool_mdata);
var x__$1 = transplants.vis2.move_to_end(x,new cljs.core.Keyword(null,"removal","removal",170016158));
return transplants.vis2.move_to_end(x__$1,new cljs.core.Keyword(null,"death","death",2026112826));
})();
var fs_by_year_in_plot_order = transplants.vis2.fs_time_series(base_outcome_keys,plot_order,fs_by_year);
var window_width = re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.subs","window-width","transplants.subs/window-width",-273620318)], null));
var mobile_QMARK_ = (cljs.core.deref(window_width) <= transplants.ui.mobile_break);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Row,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Col,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin","margin",-995903681),"10px 0px"], null)], null),((mobile_QMARK_)?transplants.vis2.stacked_icon_array(fs_by_year_in_plot_order,tool_mdata,data_styles):transplants.vis2.side_by_side_icon_array(plot_order_STAR_,fs_by_year_in_plot_order,tool_mdata,data_styles))], null)], null);
});
transplants.vis2.table_render = (function transplants$vis2$table_render(year_series,tool_mdata,plot_order,data_styles){
var labels = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"table","table",-564943036),new cljs.core.Keyword(null,"labels","labels",-626734591)], null));
var years = cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(labels));
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Table,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"margin-top","margin-top",392161226),(20),new cljs.core.Keyword(null,"border","border",1444987323),"3px solid #666"], null),new cljs.core.Keyword(null,"responsive","responsive",-1606632318),"xl",new cljs.core.Keyword(null,"bordered","bordered",-832486681),true], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"thead","thead",-291875296),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),(function (){var iter__4652__auto__ = (function transplants$vis2$table_render_$_iter__69021(s__69022){
return (new cljs.core.LazySeq(null,(function (){
var s__69022__$1 = s__69022;
while(true){
var temp__5753__auto__ = cljs.core.seq(s__69022__$1);
if(temp__5753__auto__){
var s__69022__$2 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(s__69022__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__69022__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__69024 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__69023 = (0);
while(true){
if((i__69023 < size__4651__auto__)){
var i = cljs.core._nth(c__4650__auto__,i__69023);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(labels,i);
var line = new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(label);
var line__$1 = ((cljs.core.sequential_QMARK_(line))?cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.str,line):line);
cljs.core.chunk_append(b__69024,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"border-bottom","border-bottom",2110948415),"3px solid #666"], null),new cljs.core.Keyword(null,"key","key",-1516042587),["y-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join('')], null),line__$1], null));

var G__69206 = (i__69023 + (1));
i__69023 = G__69206;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__69024),transplants$vis2$table_render_$_iter__69021(cljs.core.chunk_rest(s__69022__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__69024),null);
}
} else {
var i = cljs.core.first(s__69022__$2);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(labels,i);
var line = new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(label);
var line__$1 = ((cljs.core.sequential_QMARK_(line))?cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.str,line):line);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"border-bottom","border-bottom",2110948415),"3px solid #666"], null),new cljs.core.Keyword(null,"key","key",-1516042587),["y-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join('')], null),line__$1], null),transplants$vis2$table_render_$_iter__69021(cljs.core.rest(s__69022__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__4652__auto__(years);
})()], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tbody","tbody",-80678300),(function (){var iter__4652__auto__ = (function transplants$vis2$table_render_$_iter__69025(s__69026){
return (new cljs.core.LazySeq(null,(function (){
var s__69026__$1 = s__69026;
while(true){
var temp__5753__auto__ = cljs.core.seq(s__69026__$1);
if(temp__5753__auto__){
var s__69026__$2 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(s__69026__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__69026__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__69028 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__69027 = (0);
while(true){
if((i__69027 < size__4651__auto__)){
var j = cljs.core._nth(c__4650__auto__,i__69027);
var style = (function (){var fexpr__69029 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(plot_order,j);
return (fexpr__69029.cljs$core$IFn$_invoke$arity$1 ? fexpr__69029.cljs$core$IFn$_invoke$arity$1(data_styles) : fexpr__69029.call(null,data_styles));
})();
var long_label = new cljs.core.Keyword(null,"long-label","long-label",1242973664).cljs$core$IFn$_invoke$arity$1(style);
cljs.core.chunk_append(b__69028,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["c-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(j)].join(''),new cljs.core.Keyword(null,"style","style",-496642736),style], null),(function (){var iter__4652__auto__ = ((function (i__69027,style,long_label,j,c__4650__auto__,size__4651__auto__,b__69028,s__69026__$2,temp__5753__auto__,labels,years){
return (function transplants$vis2$table_render_$_iter__69025_$_iter__69030(s__69031){
return (new cljs.core.LazySeq(null,((function (i__69027,style,long_label,j,c__4650__auto__,size__4651__auto__,b__69028,s__69026__$2,temp__5753__auto__,labels,years){
return (function (){
var s__69031__$1 = s__69031;
while(true){
var temp__5753__auto____$1 = cljs.core.seq(s__69031__$1);
if(temp__5753__auto____$1){
var s__69031__$2 = temp__5753__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__69031__$2)){
var c__4650__auto____$1 = cljs.core.chunk_first(s__69031__$2);
var size__4651__auto____$1 = cljs.core.count(c__4650__auto____$1);
var b__69033 = cljs.core.chunk_buffer(size__4651__auto____$1);
if((function (){var i__69032 = (0);
while(true){
if((i__69032 < size__4651__auto____$1)){
var i = cljs.core._nth(c__4650__auto____$1,i__69032);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(labels,i);
var time_index = new cljs.core.Keyword(null,"time-index","time-index",1670884208).cljs$core$IFn$_invoke$arity$1(label);
var vec__69034 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(year_series,time_index);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69034,(0),null);
var map__69037 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69034,(1),null);
var map__69037__$1 = cljs.core.__destructure_map(map__69037);
var int_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69037__$1,new cljs.core.Keyword(null,"int-fs","int-fs",1685464335));
cljs.core.chunk_append(b__69033,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["r-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join('')], null),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(int_fs,j)),"%"].join('')," ",long_label], null));

var G__69213 = (i__69032 + (1));
i__69032 = G__69213;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__69033),transplants$vis2$table_render_$_iter__69025_$_iter__69030(cljs.core.chunk_rest(s__69031__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__69033),null);
}
} else {
var i = cljs.core.first(s__69031__$2);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(labels,i);
var time_index = new cljs.core.Keyword(null,"time-index","time-index",1670884208).cljs$core$IFn$_invoke$arity$1(label);
var vec__69038 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(year_series,time_index);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69038,(0),null);
var map__69041 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69038,(1),null);
var map__69041__$1 = cljs.core.__destructure_map(map__69041);
var int_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69041__$1,new cljs.core.Keyword(null,"int-fs","int-fs",1685464335));
return cljs.core.cons(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["r-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join('')], null),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(int_fs,j)),"%"].join('')," ",long_label], null),transplants$vis2$table_render_$_iter__69025_$_iter__69030(cljs.core.rest(s__69031__$2)));
}
} else {
return null;
}
break;
}
});})(i__69027,style,long_label,j,c__4650__auto__,size__4651__auto__,b__69028,s__69026__$2,temp__5753__auto__,labels,years))
,null,null));
});})(i__69027,style,long_label,j,c__4650__auto__,size__4651__auto__,b__69028,s__69026__$2,temp__5753__auto__,labels,years))
;
return iter__4652__auto__(years);
})()], null));

var G__69215 = (i__69027 + (1));
i__69027 = G__69215;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__69028),transplants$vis2$table_render_$_iter__69025(cljs.core.chunk_rest(s__69026__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__69028),null);
}
} else {
var j = cljs.core.first(s__69026__$2);
var style = (function (){var fexpr__69042 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(plot_order,j);
return (fexpr__69042.cljs$core$IFn$_invoke$arity$1 ? fexpr__69042.cljs$core$IFn$_invoke$arity$1(data_styles) : fexpr__69042.call(null,data_styles));
})();
var long_label = new cljs.core.Keyword(null,"long-label","long-label",1242973664).cljs$core$IFn$_invoke$arity$1(style);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["c-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(j)].join(''),new cljs.core.Keyword(null,"style","style",-496642736),style], null),(function (){var iter__4652__auto__ = ((function (style,long_label,j,s__69026__$2,temp__5753__auto__,labels,years){
return (function transplants$vis2$table_render_$_iter__69025_$_iter__69043(s__69044){
return (new cljs.core.LazySeq(null,(function (){
var s__69044__$1 = s__69044;
while(true){
var temp__5753__auto____$1 = cljs.core.seq(s__69044__$1);
if(temp__5753__auto____$1){
var s__69044__$2 = temp__5753__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__69044__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__69044__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__69046 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__69045 = (0);
while(true){
if((i__69045 < size__4651__auto__)){
var i = cljs.core._nth(c__4650__auto__,i__69045);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(labels,i);
var time_index = new cljs.core.Keyword(null,"time-index","time-index",1670884208).cljs$core$IFn$_invoke$arity$1(label);
var vec__69047 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(year_series,time_index);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69047,(0),null);
var map__69050 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69047,(1),null);
var map__69050__$1 = cljs.core.__destructure_map(map__69050);
var int_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69050__$1,new cljs.core.Keyword(null,"int-fs","int-fs",1685464335));
cljs.core.chunk_append(b__69046,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["r-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join('')], null),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(int_fs,j)),"%"].join('')," ",long_label], null));

var G__69218 = (i__69045 + (1));
i__69045 = G__69218;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__69046),transplants$vis2$table_render_$_iter__69025_$_iter__69043(cljs.core.chunk_rest(s__69044__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__69046),null);
}
} else {
var i = cljs.core.first(s__69044__$2);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(labels,i);
var time_index = new cljs.core.Keyword(null,"time-index","time-index",1670884208).cljs$core$IFn$_invoke$arity$1(label);
var vec__69051 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(year_series,time_index);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69051,(0),null);
var map__69054 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69051,(1),null);
var map__69054__$1 = cljs.core.__destructure_map(map__69054);
var int_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69054__$1,new cljs.core.Keyword(null,"int-fs","int-fs",1685464335));
return cljs.core.cons(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["r-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join('')], null),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(int_fs,j)),"%"].join('')," ",long_label], null),transplants$vis2$table_render_$_iter__69025_$_iter__69043(cljs.core.rest(s__69044__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});})(style,long_label,j,s__69026__$2,temp__5753__auto__,labels,years))
;
return iter__4652__auto__(years);
})()], null),transplants$vis2$table_render_$_iter__69025(cljs.core.rest(s__69026__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__4652__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(plot_order)));
})()], null)], null);
});
/**
 * If we took an example of 100 transplant patients, who input the same information as you into the tool, we would expect:
 * After 1 year	31  of them to have received a transplant
 * 		67  of them to still be waiting for a transplant
 * 		  2  of them to have died or been removed from the list
 * After 2 years 	67  of them to have received a transplant
 * 		23  of them to still be waiting for a transplant
 * 		10  of them to have died or been removed from the list
 * After 3 years	75  of them to have received a transplant
 * 		  3  of them to still be waiting for a transplant
 * 		22  of them to have died or been removed from the list 
 */
transplants.vis2.text_render = (function transplants$vis2$text_render(year_series,tool_mdata,plot_order,data_styles){
var labels = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"table","table",-564943036),new cljs.core.Keyword(null,"labels","labels",-626734591)], null));
var years = cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(labels));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin-top","margin-top",392161226),(20)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),(function (){var iter__4652__auto__ = (function transplants$vis2$text_render_$_iter__69055(s__69056){
return (new cljs.core.LazySeq(null,(function (){
var s__69056__$1 = s__69056;
while(true){
var temp__5753__auto__ = cljs.core.seq(s__69056__$1);
if(temp__5753__auto__){
var s__69056__$2 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(s__69056__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__69056__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__69058 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__69057 = (0);
while(true){
if((i__69057 < size__4651__auto__)){
var i = cljs.core._nth(c__4650__auto__,i__69057);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(labels,i);
var line = new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(label);
var line__$1 = ((cljs.core.sequential_QMARK_(line))?cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.str,line):line);
cljs.core.chunk_append(b__69058,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["y-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join(''),new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin-bottom","margin-bottom",388334941),(20)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h4","h4",2004862993),line__$1], null),(function (){var iter__4652__auto__ = ((function (i__69057,label,line,line__$1,i,c__4650__auto__,size__4651__auto__,b__69058,s__69056__$2,temp__5753__auto__,labels,years){
return (function transplants$vis2$text_render_$_iter__69055_$_iter__69059(s__69060){
return (new cljs.core.LazySeq(null,((function (i__69057,label,line,line__$1,i,c__4650__auto__,size__4651__auto__,b__69058,s__69056__$2,temp__5753__auto__,labels,years){
return (function (){
var s__69060__$1 = s__69060;
while(true){
var temp__5753__auto____$1 = cljs.core.seq(s__69060__$1);
if(temp__5753__auto____$1){
var s__69060__$2 = temp__5753__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__69060__$2)){
var c__4650__auto____$1 = cljs.core.chunk_first(s__69060__$2);
var size__4651__auto____$1 = cljs.core.count(c__4650__auto____$1);
var b__69062 = cljs.core.chunk_buffer(size__4651__auto____$1);
if((function (){var i__69061 = (0);
while(true){
if((i__69061 < size__4651__auto____$1)){
var j = cljs.core._nth(c__4650__auto____$1,i__69061);
var style = (function (){var fexpr__69063 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(plot_order,j);
return (fexpr__69063.cljs$core$IFn$_invoke$arity$1 ? fexpr__69063.cljs$core$IFn$_invoke$arity$1(data_styles) : fexpr__69063.call(null,data_styles));
})();
var long_label = new cljs.core.Keyword(null,"long-label","long-label",1242973664).cljs$core$IFn$_invoke$arity$1(style);
cljs.core.chunk_append(b__69062,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["c-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(j)].join('')], null),(function (){var label__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(labels,i);
var time_index = new cljs.core.Keyword(null,"time-index","time-index",1670884208).cljs$core$IFn$_invoke$arity$1(label__$1);
var vec__69064 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(year_series,time_index);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69064,(0),null);
var map__69067 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69064,(1),null);
var map__69067__$1 = cljs.core.__destructure_map(map__69067);
var int_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69067__$1,new cljs.core.Keyword(null,"int-fs","int-fs",1685464335));
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["r-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join('')], null),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(int_fs,j))," ",long_label], null);
})()], null));

var G__69219 = (i__69061 + (1));
i__69061 = G__69219;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__69062),transplants$vis2$text_render_$_iter__69055_$_iter__69059(cljs.core.chunk_rest(s__69060__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__69062),null);
}
} else {
var j = cljs.core.first(s__69060__$2);
var style = (function (){var fexpr__69068 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(plot_order,j);
return (fexpr__69068.cljs$core$IFn$_invoke$arity$1 ? fexpr__69068.cljs$core$IFn$_invoke$arity$1(data_styles) : fexpr__69068.call(null,data_styles));
})();
var long_label = new cljs.core.Keyword(null,"long-label","long-label",1242973664).cljs$core$IFn$_invoke$arity$1(style);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["c-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(j)].join('')], null),(function (){var label__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(labels,i);
var time_index = new cljs.core.Keyword(null,"time-index","time-index",1670884208).cljs$core$IFn$_invoke$arity$1(label__$1);
var vec__69069 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(year_series,time_index);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69069,(0),null);
var map__69072 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69069,(1),null);
var map__69072__$1 = cljs.core.__destructure_map(map__69072);
var int_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69072__$1,new cljs.core.Keyword(null,"int-fs","int-fs",1685464335));
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["r-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join('')], null),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(int_fs,j))," ",long_label], null);
})()], null),transplants$vis2$text_render_$_iter__69055_$_iter__69059(cljs.core.rest(s__69060__$2)));
}
} else {
return null;
}
break;
}
});})(i__69057,label,line,line__$1,i,c__4650__auto__,size__4651__auto__,b__69058,s__69056__$2,temp__5753__auto__,labels,years))
,null,null));
});})(i__69057,label,line,line__$1,i,c__4650__auto__,size__4651__auto__,b__69058,s__69056__$2,temp__5753__auto__,labels,years))
;
return iter__4652__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(plot_order)));
})()], null));

var G__69220 = (i__69057 + (1));
i__69057 = G__69220;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__69058),transplants$vis2$text_render_$_iter__69055(cljs.core.chunk_rest(s__69056__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__69058),null);
}
} else {
var i = cljs.core.first(s__69056__$2);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(labels,i);
var line = new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(label);
var line__$1 = ((cljs.core.sequential_QMARK_(line))?cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.str,line):line);
return cljs.core.cons(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["y-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join(''),new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin-bottom","margin-bottom",388334941),(20)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h4","h4",2004862993),line__$1], null),(function (){var iter__4652__auto__ = ((function (label,line,line__$1,i,s__69056__$2,temp__5753__auto__,labels,years){
return (function transplants$vis2$text_render_$_iter__69055_$_iter__69073(s__69074){
return (new cljs.core.LazySeq(null,(function (){
var s__69074__$1 = s__69074;
while(true){
var temp__5753__auto____$1 = cljs.core.seq(s__69074__$1);
if(temp__5753__auto____$1){
var s__69074__$2 = temp__5753__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__69074__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__69074__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__69076 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__69075 = (0);
while(true){
if((i__69075 < size__4651__auto__)){
var j = cljs.core._nth(c__4650__auto__,i__69075);
var style = (function (){var fexpr__69077 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(plot_order,j);
return (fexpr__69077.cljs$core$IFn$_invoke$arity$1 ? fexpr__69077.cljs$core$IFn$_invoke$arity$1(data_styles) : fexpr__69077.call(null,data_styles));
})();
var long_label = new cljs.core.Keyword(null,"long-label","long-label",1242973664).cljs$core$IFn$_invoke$arity$1(style);
cljs.core.chunk_append(b__69076,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["c-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(j)].join('')], null),(function (){var label__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(labels,i);
var time_index = new cljs.core.Keyword(null,"time-index","time-index",1670884208).cljs$core$IFn$_invoke$arity$1(label__$1);
var vec__69078 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(year_series,time_index);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69078,(0),null);
var map__69081 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69078,(1),null);
var map__69081__$1 = cljs.core.__destructure_map(map__69081);
var int_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69081__$1,new cljs.core.Keyword(null,"int-fs","int-fs",1685464335));
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["r-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join('')], null),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(int_fs,j))," ",long_label], null);
})()], null));

var G__69221 = (i__69075 + (1));
i__69075 = G__69221;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__69076),transplants$vis2$text_render_$_iter__69055_$_iter__69073(cljs.core.chunk_rest(s__69074__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__69076),null);
}
} else {
var j = cljs.core.first(s__69074__$2);
var style = (function (){var fexpr__69082 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(plot_order,j);
return (fexpr__69082.cljs$core$IFn$_invoke$arity$1 ? fexpr__69082.cljs$core$IFn$_invoke$arity$1(data_styles) : fexpr__69082.call(null,data_styles));
})();
var long_label = new cljs.core.Keyword(null,"long-label","long-label",1242973664).cljs$core$IFn$_invoke$arity$1(style);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["c-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(j)].join('')], null),(function (){var label__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(labels,i);
var time_index = new cljs.core.Keyword(null,"time-index","time-index",1670884208).cljs$core$IFn$_invoke$arity$1(label__$1);
var vec__69083 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(year_series,time_index);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69083,(0),null);
var map__69086 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69083,(1),null);
var map__69086__$1 = cljs.core.__destructure_map(map__69086);
var int_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69086__$1,new cljs.core.Keyword(null,"int-fs","int-fs",1685464335));
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["r-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join('')], null),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(int_fs,j))," ",long_label], null);
})()], null),transplants$vis2$text_render_$_iter__69055_$_iter__69073(cljs.core.rest(s__69074__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});})(label,line,line__$1,i,s__69056__$2,temp__5753__auto__,labels,years))
;
return iter__4652__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(plot_order)));
})()], null),transplants$vis2$text_render_$_iter__69055(cljs.core.rest(s__69056__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__4652__auto__(years);
})()], null)], null);
});
/**
 * render a table results view
 */
transplants.vis2.table = (function transplants$vis2$table(p__69087){
var map__69088 = p__69087;
var map__69088__$1 = cljs.core.__destructure_map(map__69088);
var env = map__69088__$1;
var organ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69088__$1,new cljs.core.Keyword(null,"organ","organ",-29862572));
var tool = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69088__$1,new cljs.core.Keyword(null,"tool","tool",-1298696470));
var base_outcome_keys = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69088__$1,new cljs.core.Keyword(null,"base-outcome-keys","base-outcome-keys",519744091));
var s0 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69088__$1,new cljs.core.Keyword(null,"s0","s0",-350711836));
var F = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69088__$1,new cljs.core.Keyword(null,"F","F",-1115543258));
var sample_days = cljs.core.map.cljs$core$IFn$_invoke$arity$2(transplants.utils.year__GT_day,cljs.core.range.cljs$core$IFn$_invoke$arity$1((transplants.utils.day__GT_year(cljs.core.first(cljs.core.last(s0))) + (1))));
var fs_by_year = cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (day){
return transplants.model.S0_for_day(F,day);
}),sample_days);
var tool_mdata = transplants.vis2.tool_metadata(env,organ,tool);
var data_styles = cljs.core.get.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.Keyword(null,"outcomes","outcomes",-2034044865));
var plot_order_STAR_ = (function (){var x = new cljs.core.Keyword(null,"plot-order","plot-order",443808332).cljs$core$IFn$_invoke$arity$1(tool_mdata);
var x__$1 = transplants.vis2.move_to_start(x,new cljs.core.Keyword(null,"residual","residual",2138156039));
var x__$2 = transplants.vis2.move_to_end(x__$1,new cljs.core.Keyword(null,"removal","removal",170016158));
return transplants.vis2.move_to_end(x__$2,new cljs.core.Keyword(null,"death","death",2026112826));
})();
var fs_by_year_in_plot_order = transplants.vis2.fs_time_series(base_outcome_keys,plot_order_STAR_,fs_by_year);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"section","section",-300141526),transplants.vis2.table_render(fs_by_year_in_plot_order,tool_mdata,plot_order_STAR_,data_styles)], null);
});
/**
 * a text results view
 */
transplants.vis2.text = (function transplants$vis2$text(p__69089){
var map__69090 = p__69089;
var map__69090__$1 = cljs.core.__destructure_map(map__69090);
var env = map__69090__$1;
var organ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69090__$1,new cljs.core.Keyword(null,"organ","organ",-29862572));
var tool = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69090__$1,new cljs.core.Keyword(null,"tool","tool",-1298696470));
var base_outcome_keys = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69090__$1,new cljs.core.Keyword(null,"base-outcome-keys","base-outcome-keys",519744091));
var s0 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69090__$1,new cljs.core.Keyword(null,"s0","s0",-350711836));
var F = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69090__$1,new cljs.core.Keyword(null,"F","F",-1115543258));
var sample_days = cljs.core.map.cljs$core$IFn$_invoke$arity$2(transplants.utils.year__GT_day,cljs.core.range.cljs$core$IFn$_invoke$arity$1((transplants.utils.day__GT_year(cljs.core.first(cljs.core.last(s0))) + (1))));
var fs_by_year = cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (day){
return transplants.model.S0_for_day(F,day);
}),sample_days);
var tool_mdata = transplants.vis2.tool_metadata(env,organ,tool);
var data_styles = cljs.core.get.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.Keyword(null,"outcomes","outcomes",-2034044865));
var plot_order_STAR_ = (function (){var x = new cljs.core.Keyword(null,"plot-order","plot-order",443808332).cljs$core$IFn$_invoke$arity$1(tool_mdata);
var x__$1 = transplants.vis2.move_to_start(x,new cljs.core.Keyword(null,"residual","residual",2138156039));
var x__$2 = transplants.vis2.move_to_end(x__$1,new cljs.core.Keyword(null,"removal","removal",170016158));
return transplants.vis2.move_to_end(x__$2,new cljs.core.Keyword(null,"death","death",2026112826));
})();
var fs_by_year_in_plot_order = transplants.vis2.fs_time_series(base_outcome_keys,plot_order_STAR_,fs_by_year);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"section","section",-300141526),transplants.vis2.text_render(fs_by_year_in_plot_order,tool_mdata,plot_order_STAR_,data_styles)], null);
});
transplants.vis2.test_render = (function transplants$vis2$test_render(year_series,tool_mdata,plot_order,data_styles){
var labels = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"table","table",-564943036),new cljs.core.Keyword(null,"labels","labels",-626734591)], null));
var years = cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(labels));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin-top","margin-top",392161226),(20)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),(function (){var iter__4652__auto__ = (function transplants$vis2$test_render_$_iter__69091(s__69092){
return (new cljs.core.LazySeq(null,(function (){
var s__69092__$1 = s__69092;
while(true){
var temp__5753__auto__ = cljs.core.seq(s__69092__$1);
if(temp__5753__auto__){
var s__69092__$2 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(s__69092__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__69092__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__69094 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__69093 = (0);
while(true){
if((i__69093 < size__4651__auto__)){
var i = cljs.core._nth(c__4650__auto__,i__69093);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(labels,i);
var line = new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(label);
var line__$1 = ((cljs.core.sequential_QMARK_(line))?cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.str,line):line);
cljs.core.chunk_append(b__69094,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["y-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join(''),new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin-bottom","margin-bottom",388334941),(20)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h4","h4",2004862993),line__$1], null),(function (){var iter__4652__auto__ = ((function (i__69093,label,line,line__$1,i,c__4650__auto__,size__4651__auto__,b__69094,s__69092__$2,temp__5753__auto__,labels,years){
return (function transplants$vis2$test_render_$_iter__69091_$_iter__69095(s__69096){
return (new cljs.core.LazySeq(null,((function (i__69093,label,line,line__$1,i,c__4650__auto__,size__4651__auto__,b__69094,s__69092__$2,temp__5753__auto__,labels,years){
return (function (){
var s__69096__$1 = s__69096;
while(true){
var temp__5753__auto____$1 = cljs.core.seq(s__69096__$1);
if(temp__5753__auto____$1){
var s__69096__$2 = temp__5753__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__69096__$2)){
var c__4650__auto____$1 = cljs.core.chunk_first(s__69096__$2);
var size__4651__auto____$1 = cljs.core.count(c__4650__auto____$1);
var b__69098 = cljs.core.chunk_buffer(size__4651__auto____$1);
if((function (){var i__69097 = (0);
while(true){
if((i__69097 < size__4651__auto____$1)){
var j = cljs.core._nth(c__4650__auto____$1,i__69097);
var style = (function (){var fexpr__69099 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(plot_order,j);
return (fexpr__69099.cljs$core$IFn$_invoke$arity$1 ? fexpr__69099.cljs$core$IFn$_invoke$arity$1(data_styles) : fexpr__69099.call(null,data_styles));
})();
var long_label = new cljs.core.Keyword(null,"long-label","long-label",1242973664).cljs$core$IFn$_invoke$arity$1(style);
cljs.core.chunk_append(b__69098,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["c-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(j)].join('')], null),(function (){var label__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(labels,i);
var time_index = new cljs.core.Keyword(null,"time-index","time-index",1670884208).cljs$core$IFn$_invoke$arity$1(label__$1);
var vec__69100 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(year_series,time_index);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69100,(0),null);
var map__69103 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69100,(1),null);
var map__69103__$1 = cljs.core.__destructure_map(map__69103);
var int_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69103__$1,new cljs.core.Keyword(null,"int-fs","int-fs",1685464335));
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["r-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join('')], null),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(int_fs,j))," ",long_label], null);
})()], null));

var G__69228 = (i__69097 + (1));
i__69097 = G__69228;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__69098),transplants$vis2$test_render_$_iter__69091_$_iter__69095(cljs.core.chunk_rest(s__69096__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__69098),null);
}
} else {
var j = cljs.core.first(s__69096__$2);
var style = (function (){var fexpr__69104 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(plot_order,j);
return (fexpr__69104.cljs$core$IFn$_invoke$arity$1 ? fexpr__69104.cljs$core$IFn$_invoke$arity$1(data_styles) : fexpr__69104.call(null,data_styles));
})();
var long_label = new cljs.core.Keyword(null,"long-label","long-label",1242973664).cljs$core$IFn$_invoke$arity$1(style);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["c-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(j)].join('')], null),(function (){var label__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(labels,i);
var time_index = new cljs.core.Keyword(null,"time-index","time-index",1670884208).cljs$core$IFn$_invoke$arity$1(label__$1);
var vec__69105 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(year_series,time_index);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69105,(0),null);
var map__69108 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69105,(1),null);
var map__69108__$1 = cljs.core.__destructure_map(map__69108);
var int_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69108__$1,new cljs.core.Keyword(null,"int-fs","int-fs",1685464335));
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["r-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join('')], null),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(int_fs,j))," ",long_label], null);
})()], null),transplants$vis2$test_render_$_iter__69091_$_iter__69095(cljs.core.rest(s__69096__$2)));
}
} else {
return null;
}
break;
}
});})(i__69093,label,line,line__$1,i,c__4650__auto__,size__4651__auto__,b__69094,s__69092__$2,temp__5753__auto__,labels,years))
,null,null));
});})(i__69093,label,line,line__$1,i,c__4650__auto__,size__4651__auto__,b__69094,s__69092__$2,temp__5753__auto__,labels,years))
;
return iter__4652__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(plot_order)));
})()], null));

var G__69229 = (i__69093 + (1));
i__69093 = G__69229;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__69094),transplants$vis2$test_render_$_iter__69091(cljs.core.chunk_rest(s__69092__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__69094),null);
}
} else {
var i = cljs.core.first(s__69092__$2);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(labels,i);
var line = new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(label);
var line__$1 = ((cljs.core.sequential_QMARK_(line))?cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.str,line):line);
return cljs.core.cons(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["y-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join(''),new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin-bottom","margin-bottom",388334941),(20)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h4","h4",2004862993),line__$1], null),(function (){var iter__4652__auto__ = ((function (label,line,line__$1,i,s__69092__$2,temp__5753__auto__,labels,years){
return (function transplants$vis2$test_render_$_iter__69091_$_iter__69109(s__69110){
return (new cljs.core.LazySeq(null,(function (){
var s__69110__$1 = s__69110;
while(true){
var temp__5753__auto____$1 = cljs.core.seq(s__69110__$1);
if(temp__5753__auto____$1){
var s__69110__$2 = temp__5753__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__69110__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__69110__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__69112 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__69111 = (0);
while(true){
if((i__69111 < size__4651__auto__)){
var j = cljs.core._nth(c__4650__auto__,i__69111);
var style = (function (){var fexpr__69113 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(plot_order,j);
return (fexpr__69113.cljs$core$IFn$_invoke$arity$1 ? fexpr__69113.cljs$core$IFn$_invoke$arity$1(data_styles) : fexpr__69113.call(null,data_styles));
})();
var long_label = new cljs.core.Keyword(null,"long-label","long-label",1242973664).cljs$core$IFn$_invoke$arity$1(style);
cljs.core.chunk_append(b__69112,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["c-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(j)].join('')], null),(function (){var label__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(labels,i);
var time_index = new cljs.core.Keyword(null,"time-index","time-index",1670884208).cljs$core$IFn$_invoke$arity$1(label__$1);
var vec__69114 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(year_series,time_index);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69114,(0),null);
var map__69117 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69114,(1),null);
var map__69117__$1 = cljs.core.__destructure_map(map__69117);
var int_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69117__$1,new cljs.core.Keyword(null,"int-fs","int-fs",1685464335));
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["r-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join('')], null),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(int_fs,j))," ",long_label], null);
})()], null));

var G__69230 = (i__69111 + (1));
i__69111 = G__69230;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__69112),transplants$vis2$test_render_$_iter__69091_$_iter__69109(cljs.core.chunk_rest(s__69110__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__69112),null);
}
} else {
var j = cljs.core.first(s__69110__$2);
var style = (function (){var fexpr__69118 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(plot_order,j);
return (fexpr__69118.cljs$core$IFn$_invoke$arity$1 ? fexpr__69118.cljs$core$IFn$_invoke$arity$1(data_styles) : fexpr__69118.call(null,data_styles));
})();
var long_label = new cljs.core.Keyword(null,"long-label","long-label",1242973664).cljs$core$IFn$_invoke$arity$1(style);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["c-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(j)].join('')], null),(function (){var label__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(labels,i);
var time_index = new cljs.core.Keyword(null,"time-index","time-index",1670884208).cljs$core$IFn$_invoke$arity$1(label__$1);
var vec__69119 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(year_series,time_index);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69119,(0),null);
var map__69122 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69119,(1),null);
var map__69122__$1 = cljs.core.__destructure_map(map__69122);
var int_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69122__$1,new cljs.core.Keyword(null,"int-fs","int-fs",1685464335));
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["r-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join('')], null),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(int_fs,j))," ",long_label], null);
})()], null),transplants$vis2$test_render_$_iter__69091_$_iter__69109(cljs.core.rest(s__69110__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});})(label,line,line__$1,i,s__69092__$2,temp__5753__auto__,labels,years))
;
return iter__4652__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(plot_order)));
})()], null),transplants$vis2$test_render_$_iter__69091(cljs.core.rest(s__69092__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__4652__auto__(years);
})()], null)], null);
});
/**
 * send a test data structure to tap for comparison against an R structure
 */
transplants.vis2.test_gen = (function transplants$vis2$test_gen(p__69123){
var map__69124 = p__69123;
var map__69124__$1 = cljs.core.__destructure_map(map__69124);
var env = map__69124__$1;
var organ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69124__$1,new cljs.core.Keyword(null,"organ","organ",-29862572));
var tool = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69124__$1,new cljs.core.Keyword(null,"tool","tool",-1298696470));
var base_outcome_keys = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69124__$1,new cljs.core.Keyword(null,"base-outcome-keys","base-outcome-keys",519744091));
var s0 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69124__$1,new cljs.core.Keyword(null,"s0","s0",-350711836));
var F = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69124__$1,new cljs.core.Keyword(null,"F","F",-1115543258));
var sample_days = cljs.core.map.cljs$core$IFn$_invoke$arity$2(transplants.utils.year__GT_day,cljs.core.range.cljs$core$IFn$_invoke$arity$1((transplants.utils.day__GT_year(cljs.core.first(cljs.core.last(s0))) + (1))));
var fs_by_year = cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (day){
return transplants.model.S0_for_day(F,day);
}),sample_days);
var tool_mdata = transplants.vis2.tool_metadata(env,organ,tool);
var data_styles = cljs.core.get.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.Keyword(null,"outcomes","outcomes",-2034044865));
var plot_order_STAR_ = (function (){var x = new cljs.core.Keyword(null,"plot-order","plot-order",443808332).cljs$core$IFn$_invoke$arity$1(tool_mdata);
var x__$1 = transplants.vis2.move_to_start(x,new cljs.core.Keyword(null,"residual","residual",2138156039));
var x__$2 = transplants.vis2.move_to_end(x__$1,new cljs.core.Keyword(null,"removal","removal",170016158));
return transplants.vis2.move_to_end(x__$2,new cljs.core.Keyword(null,"death","death",2026112826));
})();
var fs_by_year_in_plot_order = transplants.vis2.fs_time_series(base_outcome_keys,plot_order_STAR_,fs_by_year);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"section","section",-300141526),transplants.vis2.test_render(fs_by_year_in_plot_order,tool_mdata,plot_order_STAR_,data_styles)], null);
});

//# sourceMappingURL=transplants.vis2.js.map
