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
var pc_fs = cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__82697_SHARP_){
return ((100) * p1__82697_SHARP_);
}),ordered_fs);
var int_fs = (function (){var int_pc_fs = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (pc_fs){
return (function (p1__82698_SHARP_){
return Math.round(p1__82698_SHARP_);
});})(pc_fs))
,pc_fs);
while(true){
var err_pc_fs = cljs.core.map.cljs$core$IFn$_invoke$arity$3(((function (int_pc_fs,pc_fs){
return (function (p1__82699_SHARP_,p2__82700_SHARP_){
return (p1__82699_SHARP_ - p2__82700_SHARP_);
});})(int_pc_fs,pc_fs))
,int_pc_fs,pc_fs);
var sum_int_pc_fs = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,int_pc_fs);
var sum_err_pc_fs = (sum_int_pc_fs - (100));
if((sum_err_pc_fs === (0))){
return int_pc_fs;
} else {
var cmp = (((sum_err_pc_fs > (0)))?cljs.core._GT_:cljs.core._LT_);
var adjust = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (int_pc_fs,cmp,err_pc_fs,sum_int_pc_fs,sum_err_pc_fs,pc_fs){
return (function (p__82715,p__82716){
var vec__82718 = p__82715;
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82718,(0),null);
var me = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82718,(1),null);
var vec__82721 = p__82716;
var j = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82721,(0),null);
var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82721,(1),null);
if(cljs.core.truth_((cmp.cljs$core$IFn$_invoke$arity$2 ? cmp.cljs$core$IFn$_invoke$arity$2(e,me) : cmp.call(null,e,me)))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [j,e], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,me], null);
}
});})(int_pc_fs,cmp,err_pc_fs,sum_int_pc_fs,sum_err_pc_fs,pc_fs))
,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0)], null),cljs.core.zipmap(cljs.core.range.cljs$core$IFn$_invoke$arity$0(),err_pc_fs));
var G__83067 = cljs.core.update.cljs$core$IFn$_invoke$arity$3(int_pc_fs,cljs.core.first(adjust),(((sum_err_pc_fs > (0)))?cljs.core.dec:cljs.core.inc));
int_pc_fs = G__83067;
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
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__82724){
var vec__82725 = p__82724;
var t = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82725,(0),null);
var fs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82725,(1),null);
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
var G__82735 = arguments.length;
switch (G__82735) {
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
return transplants.vis2.svg_outcome_legend.cljs$core$IFn$_invoke$arity$3(plot_order,data_styles,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"string-value-f","string-value-f",639665654),cljs.core.constantly(""),new cljs.core.Keyword(null,"position-f","position-f",267141307),(function (p1__82730_SHARP_){
return ["translate(0 ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(((30) + ((80) * p1__82730_SHARP_))),")"].join('');
})], null));
}));

(transplants.vis2.svg_outcome_legend.cljs$core$IFn$_invoke$arity$3 = (function (plot_order,data_styles,p__82740){
var map__82742 = p__82740;
var map__82742__$1 = cljs.core.__destructure_map(map__82742);
var width = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__82742__$1,new cljs.core.Keyword(null,"width","width",-384071477),(255));
var height = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__82742__$1,new cljs.core.Keyword(null,"height","height",1025178622),(60));
var string_value_f = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82742__$1,new cljs.core.Keyword(null,"string-value-f","string-value-f",639665654));
var position_f = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82742__$1,new cljs.core.Keyword(null,"position-f","position-f",267141307));
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
transplants.vis2.test_rig = (function transplants$vis2$test_rig(p__82755){
var map__82756 = p__82755;
var map__82756__$1 = cljs.core.__destructure_map(map__82756);
var env = map__82756__$1;
var day = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82756__$1,new cljs.core.Keyword(null,"day","day",-274800446));
var beta_keys = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82756__$1,new cljs.core.Keyword(null,"beta-keys","beta-keys",-1150961314));
var outcomes = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82756__$1,new cljs.core.Keyword(null,"outcomes","outcomes",-2034044865));
var fmaps = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82756__$1,new cljs.core.Keyword(null,"fmaps","fmaps",-1655984758));
var s0 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82756__$1,new cljs.core.Keyword(null,"s0","s0",-350711836));
var sum_betas = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82756__$1,new cljs.core.Keyword(null,"sum-betas","sum-betas",-2024666066));
var F = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82756__$1,new cljs.core.Keyword(null,"F","F",-1115543258));
var factors = cljs.core.keys(fmaps);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Row,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin-top","margin-top",392161226),(20)], null)], null),(cljs.core.truth_(factors)?new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Col,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.ui.test_day_selector,"Results for test day:"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Row,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Col,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Table,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"striped","striped",-628686784),true,new cljs.core.Keyword(null,"bordered","bordered",-832486681),true,new cljs.core.Keyword(null,"hover","hover",-341141711),true], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"thead","thead",-291875296),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.vis2.outcome_tr,(1005),outcomes], null)], null),cljs.core.into.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tbody","tbody",-80678300),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),(1001)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"b","b",1482224470),"S",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sub","sub",-2093760025),"0"], null)], null)], null),cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (i,S0_i){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),i], null),transplants.model.to_precision(((1) - S0_i),(4))], null);
}),cljs.core.second(transplants.model.S0_for_day(s0,day)))], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),(1002)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"b","b",1482224470),"F"], null)], null),cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (i,F_i){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),i], null),transplants.model.to_precision(F_i,(4))], null);
}),cljs.core.second(transplants.model.S0_for_day(F,day)))], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),(1003)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"b","b",1482224470),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"font-size","font-size",-1847940346),(20)], null)], null),"\uD835\uDF2E \uD835\uDEFD",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sub","sub",-2093760025),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i","i",-1386841315),"\uD835\uDC8C"], null)], null),"\uD835\uDCCD",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sub","sub",-2093760025),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i","i",-1386841315),"\uD835\uDC8C"], null)], null)], null)], null),cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (i,sb){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),i], null),transplants.model.to_precision(sb,(4))], null);
}),sum_betas)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),(1004),new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"background-color","background-color",570434026),transplants.rgb.secondary,new cljs.core.Keyword(null,"color","color",1011675173),"#fff"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"Factor",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sub","sub",-2093760025),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i","i",-1386841315),"\uD835\uDC8C"], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"col-span","col-span",-232603210),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count(outcomes))], null),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"b","b",1482224470),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"font-size","font-size",-1847940346),(20)], null)], null),"\uD835\uDEFD",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sub","sub",-2093760025),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i","i",-1386841315),"\uD835\uDC8C"], null)], null),"\uD835\uDCCD",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sub","sub",-2093760025),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i","i",-1386841315),"\uD835\uDC8C"], null)], null)], null)], null)], null),transplants.vis2.outcome_tr((1006),outcomes),cljs.core.conj.cljs$core$IFn$_invoke$arity$1(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (i,p__82763){
var vec__82765 = p__82763;
var factor = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82765,(0),null);
var fmap = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82765,(1),null);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),i], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),i], null),factor], null),(cljs.core.truth_(fmap)?cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (j,b){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),j], null),transplants.model.to_precision(cljs.core.last(transplants.factors.selected_beta_x(env,factor,fmap,b)),(4))], null);
}),beta_keys):null)], null);
}),fmaps))], null))], null)], null)], null)], null):null)], null);
});
/**
 * Add default values to outcome styles
 */
transplants.vis2.bar_style = (function transplants$vis2$bar_style(styles){
var map__82770 = styles;
var map__82770__$1 = cljs.core.__destructure_map(map__82770);
var fill = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__82770__$1,new cljs.core.Keyword(null,"fill","fill",883462889),"#41af6b");
var stroke = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__82770__$1,new cljs.core.Keyword(null,"stroke","stroke",1741823555),"#fff");
var opacity = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__82770__$1,new cljs.core.Keyword(null,"opacity","opacity",397153780),0.7);
var stroke_width = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__82770__$1,new cljs.core.Keyword(null,"stroke-width","stroke-width",716836435),(1));
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"fill","fill",883462889),fill,new cljs.core.Keyword(null,"stroke","stroke",1741823555),stroke,new cljs.core.Keyword(null,"stroke-width","stroke-width",716836435),stroke_width,new cljs.core.Keyword(null,"opacity","opacity",397153780),opacity], null);
});
transplants.vis2.styles = cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"arrow","arrow",1071351425),new cljs.core.Keyword(null,"residual","residual",2138156039),new cljs.core.Keyword(null,"post-transplant","post-transplant",-1697398933),new cljs.core.Keyword(null,"graft","graft",-643427087),new cljs.core.Keyword(null,"inner","inner",-1383171215),new cljs.core.Keyword(null,"death","death",2026112826),new cljs.core.Keyword(null,"all-reasons","all-reasons",1847090236),new cljs.core.Keyword(null,"outer","outer",-375185956),new cljs.core.Keyword(null,"Survived","Survived",10186300),new cljs.core.Keyword(null,"transplant","transplant",-857281796),new cljs.core.Keyword(null,"from-listing","from-listing",916998333),new cljs.core.Keyword(null,"annotation","annotation",-344661666),new cljs.core.Keyword(null,"removal","removal",170016158)],["arrow--G__82773","residual--G__82773","post-transplant--G__82773","graft--G__82773","inner--G__82773","death--G__82773","all-reasons--G__82773","outer--G__82773","Survived--G__82773","transplant--G__82773","from-listing--G__82773","annotation--G__82773","removal--G__82773"]);

cljs_css_modules.runtime.inject_style_BANG_(cljs.core.apply.cljs$core$IFn$_invoke$arity$3(garden.core.css,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.PersistentVector(null, 13, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [".inner--G__82773",new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"fill","fill",883462889),"none",new cljs.core.Keyword(null,"stroke-opacity","stroke-opacity",-1191543159),(1),new cljs.core.Keyword(null,"stroke-width","stroke-width",716836435),(0),new cljs.core.Keyword(null,"stroke","stroke",1741823555),"#fa0"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [".outer--G__82773",new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"fill","fill",883462889),"#CCC",new cljs.core.Keyword(null,"stroke-opacity","stroke-opacity",-1191543159),(1),new cljs.core.Keyword(null,"stroke","stroke",1741823555),"#ccc"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [".transplant--G__82773",transplants.vis2.bar_style(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"fill","fill",883462889),"#41af6b"], null))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [".all-reasons--G__82773",transplants.vis2.bar_style(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"fill","fill",883462889),"#4866cb"], null))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [".removal--G__82773",transplants.vis2.bar_style(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"fill","fill",883462889),"#4b4d48"], null))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [".residual--G__82773",transplants.vis2.bar_style(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"fill","fill",883462889),"#4866cb"], null))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [".death--G__82773",transplants.vis2.bar_style(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"fill","fill",883462889),"#000000"], null))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [".post-transplant--G__82773",transplants.vis2.bar_style(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"fill","fill",883462889),"#008888"], null))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [".from-listing--G__82773",transplants.vis2.bar_style(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"fill","fill",883462889),"#4444AA"], null))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [".Survived--G__82773",transplants.vis2.bar_style(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"fill","fill",883462889),"#664488"], null))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [".graft--G__82773",transplants.vis2.bar_style(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"fill","fill",883462889),"#00AA44"], null))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [".annotation--G__82773",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"font-size","font-size",-1847940346),"13pt"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [".arrow--G__82773",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"stroke","stroke",1741823555),"#000",new cljs.core.Keyword(null,"stroke-width","stroke-width",716836435),"1.5px"], null)], null)], null)),"transplants.vis2","styles");
/**
 * returns a monoid for a given stagger threshold. The monoid calculates an array of booleans which indicates
 * whether labels should be staggered by looking at heights of labels in adjacent pairs.
 */
transplants.vis2.pairwise_stagger = (function transplants$vis2$pairwise_stagger(threshold){
return (function (staggers,p__82778){
var vec__82779 = p__82778;
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82779,(0),null);
var vec__82782 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82779,(1),null);
var f1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82782,(0),null);
var f2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82782,(1),null);
if(cljs.core.truth_((function (){var and__4251__auto__ = f2;
if(cljs.core.truth_(and__4251__auto__)){
return ((f1 + f2) < threshold);
} else {
return and__4251__auto__;
}
})())){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(staggers,i,true),(i + (1)),true);
} else {
return cljs.core.update.cljs$core$IFn$_invoke$arity$3(staggers,i,(function (p1__82777_SHARP_){
var or__4253__auto__ = p1__82777_SHARP_;
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
transplants.vis2.draw_bin_labels = (function transplants$vis2$draw_bin_labels(p__82793){
var map__82794 = p__82793;
var map__82794__$1 = cljs.core.__destructure_map(map__82794);
var bin_labels = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82794__$1,new cljs.core.Keyword(null,"bin-labels","bin-labels",-1917237450));
var spacing = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82794__$1,new cljs.core.Keyword(null,"spacing","spacing",204422175));
var offset = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82794__$1,new cljs.core.Keyword(null,"offset","offset",296498311));
var font_size = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82794__$1,new cljs.core.Keyword(null,"font-size","font-size",-1847940346));
var X = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82794__$1,new cljs.core.Keyword(null,"X","X",1705996313));
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),(1)], null)], null),cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (bar_index,bin_label){
var x0 = ((function (){var G__82795 = ((spacing * (bar_index + (1))));
return (X.cljs$core$IFn$_invoke$arity$1 ? X.cljs$core$IFn$_invoke$arity$1(G__82795) : X.call(null,G__82795));
})() - (X.cljs$core$IFn$_invoke$arity$1 ? X.cljs$core$IFn$_invoke$arity$1(offset) : X.call(null,offset)));
return transplants.vis2.multiline_bin_label(bin_label,x0,font_size);
}),bin_labels));
});
transplants.vis2.draw_bars = (function transplants$vis2$draw_bars(p__82796){
var map__82797 = p__82796;
var map__82797__$1 = cljs.core.__destructure_map(map__82797);
var X = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82797__$1,new cljs.core.Keyword(null,"X","X",1705996313));
var spacing = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82797__$1,new cljs.core.Keyword(null,"spacing","spacing",204422175));
var data_styles = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82797__$1,new cljs.core.Keyword(null,"data-styles","data-styles",-12538237));
var offset = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82797__$1,new cljs.core.Keyword(null,"offset","offset",296498311));
var bar_width = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82797__$1,new cljs.core.Keyword(null,"bar-width","bar-width",1233240523));
var Y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82797__$1,new cljs.core.Keyword(null,"Y","Y",-560717356));
var time_series = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82797__$1,new cljs.core.Keyword(null,"time-series","time-series",1050573973));
var bin_labels = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82797__$1,new cljs.core.Keyword(null,"bin-labels","bin-labels",-1917237450));
var data_keys = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82797__$1,new cljs.core.Keyword(null,"data-keys","data-keys",1654526230));
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),(2)], null)], null),cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (bar_index,bin_label){
var x0 = ((function (){var G__82802 = ((spacing * (bar_index + (1))));
return (X.cljs$core$IFn$_invoke$arity$1 ? X.cljs$core$IFn$_invoke$arity$1(G__82802) : X.call(null,G__82802));
})() - (X.cljs$core$IFn$_invoke$arity$1 ? X.cljs$core$IFn$_invoke$arity$1(offset) : X.call(null,offset)));
var vec__82798 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(time_series,new cljs.core.Keyword(null,"time-index","time-index",1670884208).cljs$core$IFn$_invoke$arity$1(bin_label));
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82798,(0),null);
var map__82801 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82798,(1),null);
var map__82801__$1 = cljs.core.__destructure_map(map__82801);
var fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82801__$1,new cljs.core.Keyword(null,"fs","fs",-2122926244));
var cum_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82801__$1,new cljs.core.Keyword(null,"cum-fs","cum-fs",-164423437));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"<>","<>",1280186386),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["bar-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(bar_index)].join('')], null)], null),cljs.core.map.cljs$core$IFn$_invoke$arity$4((function (data_key,cif,cum_cif){
var styles = (data_styles.cljs$core$IFn$_invoke$arity$1 ? data_styles.cljs$core$IFn$_invoke$arity$1(data_key) : data_styles.call(null,data_key));
var y0 = ((Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1(cum_cif) : Y.call(null,cum_cif)) - (Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1(cif) : Y.call(null,cif)));
var h = ((Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1(cum_cif) : Y.call(null,cum_cif)) - (function (){var G__82803 = (cum_cif - cif);
return (Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1(G__82803) : Y.call(null,G__82803));
})());
if(cljs.core.not(isNaN(y0))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"rect","rect",-108902628),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"key","key",-1516042587),data_key,new cljs.core.Keyword(null,"x","x",2099068185),x0,new cljs.core.Keyword(null,"y","y",-1757859776),y0,new cljs.core.Keyword(null,"width","width",-384071477),bar_width,new cljs.core.Keyword(null,"height","height",1025178622),h,new cljs.core.Keyword(null,"data-title","data-title",-83549535),cif], null),transplants.ui.svg_styles(styles)], 0))], null)], null);
} else {
return null;
}
}),data_keys,fs,cum_fs))], null);
}),bin_labels));
});
transplants.vis2.draw_percents = (function transplants$vis2$draw_percents(p__82805){
var map__82806 = p__82805;
var map__82806__$1 = cljs.core.__destructure_map(map__82806);
var X = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82806__$1,new cljs.core.Keyword(null,"X","X",1705996313));
var spacing = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82806__$1,new cljs.core.Keyword(null,"spacing","spacing",204422175));
var data_styles = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82806__$1,new cljs.core.Keyword(null,"data-styles","data-styles",-12538237));
var data_count = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82806__$1,new cljs.core.Keyword(null,"data-count","data-count",1898198662));
var offset = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82806__$1,new cljs.core.Keyword(null,"offset","offset",296498311));
var bar_width = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82806__$1,new cljs.core.Keyword(null,"bar-width","bar-width",1233240523));
var Y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82806__$1,new cljs.core.Keyword(null,"Y","Y",-560717356));
var time_series = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82806__$1,new cljs.core.Keyword(null,"time-series","time-series",1050573973));
var bin_labels = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82806__$1,new cljs.core.Keyword(null,"bin-labels","bin-labels",-1917237450));
var data_keys = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82806__$1,new cljs.core.Keyword(null,"data-keys","data-keys",1654526230));
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),(3),new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"opacity","opacity",397153780),(1)], null)], null)], null),cljs.core.map.cljs$core$IFn$_invoke$arity$3((function (bar_index,bin_label){
var vec__82807 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(time_series,new cljs.core.Keyword(null,"time-index","time-index",1670884208).cljs$core$IFn$_invoke$arity$1(bin_label));
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82807,(0),null);
var map__82810 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82807,(1),null);
var map__82810__$1 = cljs.core.__destructure_map(map__82810);
var fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82810__$1,new cljs.core.Keyword(null,"fs","fs",-2122926244));
var cum_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82810__$1,new cljs.core.Keyword(null,"cum-fs","cum-fs",-164423437));
var int_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82810__$1,new cljs.core.Keyword(null,"int-fs","int-fs",1685464335));
var x0 = (((function (){var G__82811 = ((spacing * (bar_index + (1))));
return (X.cljs$core$IFn$_invoke$arity$1 ? X.cljs$core$IFn$_invoke$arity$1(G__82811) : X.call(null,G__82811));
})() - (X.cljs$core$IFn$_invoke$arity$1 ? X.cljs$core$IFn$_invoke$arity$1(offset) : X.call(null,offset))) - (10));
var x_mid = ((x0 + (bar_width / (2))) + (0));
var staggers = transplants.vis2.label_staggers(0.12,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__82804_SHARP_){
if((p1__82804_SHARP_ == null)){
return (0);
} else {
return p1__82804_SHARP_;
}
}),fs));
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),bar_index], null)], null),cljs.core.conj.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$variadic((function (i,data_key,cif,cum_cif,int_fs__$1){
var styles = (data_styles.cljs$core$IFn$_invoke$arity$1 ? data_styles.cljs$core$IFn$_invoke$arity$1(data_key) : data_styles.call(null,data_key));
var y0 = (((data_count > (1)))?((Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1(cum_cif) : Y.call(null,cum_cif)) - (Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1(cif) : Y.call(null,cif))):(Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1(cif) : Y.call(null,cif)));
var h = (((data_count > (1)))?((Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1(cum_cif) : Y.call(null,cum_cif)) - (function (){var G__82812 = (cum_cif - cif);
return (Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1(G__82812) : Y.call(null,G__82812));
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
transplants.vis2.stacked_bar_chart = (function transplants$vis2$stacked_bar_chart(p__82813){
var map__82814 = p__82813;
var map__82814__$1 = cljs.core.__destructure_map(map__82814);
var params = map__82814__$1;
var data_keys = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82814__$1,new cljs.core.Keyword(null,"data-keys","data-keys",1654526230));
var tool_mdata = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82814__$1,new cljs.core.Keyword(null,"tool-mdata","tool-mdata",-1013259695));
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
transplants.vis2.bar_chart = (function transplants$vis2$bar_chart(p__82816){
var map__82817 = p__82816;
var map__82817__$1 = cljs.core.__destructure_map(map__82817);
var env = map__82817__$1;
var organ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82817__$1,new cljs.core.Keyword(null,"organ","organ",-29862572));
var tool = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82817__$1,new cljs.core.Keyword(null,"tool","tool",-1298696470));
var base_outcome_keys = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82817__$1,new cljs.core.Keyword(null,"base-outcome-keys","base-outcome-keys",519744091));
var s0 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82817__$1,new cljs.core.Keyword(null,"s0","s0",-350711836));
var F = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82817__$1,new cljs.core.Keyword(null,"F","F",-1115543258));
var sample_days = cljs.core.map.cljs$core$IFn$_invoke$arity$2(transplants.utils.year__GT_day,cljs.core.range.cljs$core$IFn$_invoke$arity$1((transplants.utils.day__GT_year(cljs.core.first(cljs.core.last(s0))) + (1))));
var fs_by_year = cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (day){
return transplants.model.S0_for_day(F,day);
}),sample_days);
var tool_mdata = transplants.vis2.tool_metadata(env,organ,tool);
var data_styles = cljs.core.get.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.Keyword(null,"outcomes","outcomes",-2034044865));
var plot_order = new cljs.core.Keyword(null,"plot-order","plot-order",443808332).cljs$core$IFn$_invoke$arity$1(tool_mdata);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Row,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Col,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin-top","margin-top",392161226),(10)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [svg.container.svg_container,(function (p1__82815_SHARP_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__82815_SHARP_,new cljs.core.Keyword(null,"aspect-ratio","aspect-ratio",1674013504),transplants.vis2.aspect_ratio(new cljs.core.Keyword(null,"width","width",-384071477).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"inner","inner",-1383171215).cljs$core$IFn$_invoke$arity$1(p1__82815_SHARP_)),new cljs.core.Keyword(null,"height","height",1025178622).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"inner","inner",-1383171215).cljs$core$IFn$_invoke$arity$1(p1__82815_SHARP_))));
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
transplants.vis2.stacked_area_chart = (function transplants$vis2$stacked_area_chart(p__82819){
var map__82820 = p__82819;
var map__82820__$1 = cljs.core.__destructure_map(map__82820);
var X = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82820__$1,new cljs.core.Keyword(null,"X","X",1705996313));
var Y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82820__$1,new cljs.core.Keyword(null,"Y","Y",-560717356));
var year_series = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82820__$1,new cljs.core.Keyword(null,"year-series","year-series",474161786));
var quarter_series = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82820__$1,new cljs.core.Keyword(null,"quarter-series","quarter-series",868609982));
var data_keys = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82820__$1,new cljs.core.Keyword(null,"data-keys","data-keys",1654526230));
var tool_mdata = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82820__$1,new cljs.core.Keyword(null,"tool-mdata","tool-mdata",-1013259695));
var data_styles = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82820__$1,new cljs.core.Keyword(null,"data-styles","data-styles",-12538237));
var data_count = cljs.core.count(data_keys);
var bar_width = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"area","area",472007256),new cljs.core.Keyword(null,"width","width",-384071477)], null));
var spacing = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"area","area",472007256),new cljs.core.Keyword(null,"spacing","spacing",204422175)], null));
var bin_labels = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"area","area",472007256),new cljs.core.Keyword(null,"labels","labels",-626734591)], null));
var font_size = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"area","area",472007256),new cljs.core.Keyword(null,"font-size","font-size",-1847940346)], null));
var offset = 1.85;
var q_offset = 1.86;
var bar_positions = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (bin_label){
var bar_index = new cljs.core.Keyword(null,"time-index","time-index",1670884208).cljs$core$IFn$_invoke$arity$1(bin_label);
var vec__82821 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(year_series,bar_index);
var time = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82821,(0),null);
var map__82824 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82821,(1),null);
var map__82824__$1 = cljs.core.__destructure_map(map__82824);
var fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82824__$1,new cljs.core.Keyword(null,"fs","fs",-2122926244));
var cum_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82824__$1,new cljs.core.Keyword(null,"cum-fs","cum-fs",-164423437));
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$4((function (data_key,cif,cum_cif){
var styles = (data_styles.cljs$core$IFn$_invoke$arity$1 ? data_styles.cljs$core$IFn$_invoke$arity$1(data_key) : data_styles.call(null,data_key));
var x0 = ((function (){var G__82825 = ((spacing * (bar_index + (1))));
return (X.cljs$core$IFn$_invoke$arity$1 ? X.cljs$core$IFn$_invoke$arity$1(G__82825) : X.call(null,G__82825));
})() - (X.cljs$core$IFn$_invoke$arity$1 ? X.cljs$core$IFn$_invoke$arity$1(offset) : X.call(null,offset)));
var x_mid = ((x0 + (bar_width / (2))) + (- (X.cljs$core$IFn$_invoke$arity$1 ? X.cljs$core$IFn$_invoke$arity$1(0.2) : X.call(null,0.2))));
var y0 = ((Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1(cum_cif) : Y.call(null,cum_cif)) - (Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1(cif) : Y.call(null,cif)));
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"key","key",-1516042587),data_key,new cljs.core.Keyword(null,"time","time",1385887882),time,new cljs.core.Keyword(null,"x","x",2099068185),(x_mid + (15)),new cljs.core.Keyword(null,"y0","y0",111454807),y0,new cljs.core.Keyword(null,"y1","y1",589123466),(Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1(cum_cif) : Y.call(null,cum_cif)),new cljs.core.Keyword(null,"styles","styles",1954480375),transplants.ui.svg_styles(styles)], null);
}),data_keys,fs,cum_fs));
}),bin_labels));
var quarter_positions = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__82826){
var vec__82827 = p__82826;
var time = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82827,(0),null);
var map__82830 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82827,(1),null);
var map__82830__$1 = cljs.core.__destructure_map(map__82830);
var fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82830__$1,new cljs.core.Keyword(null,"fs","fs",-2122926244));
var cum_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82830__$1,new cljs.core.Keyword(null,"cum-fs","cum-fs",-164423437));
var quarter = transplants.utils.day__GT_week(time);
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$4((function (data_key,cif,cum_cif){
var styles = (data_styles.cljs$core$IFn$_invoke$arity$1 ? data_styles.cljs$core$IFn$_invoke$arity$1(data_key) : data_styles.call(null,data_key));
var x0 = ((function (){var G__82831 = ((spacing * ((quarter / (52)) + (1))));
return (X.cljs$core$IFn$_invoke$arity$1 ? X.cljs$core$IFn$_invoke$arity$1(G__82831) : X.call(null,G__82831));
})() - (X.cljs$core$IFn$_invoke$arity$1 ? X.cljs$core$IFn$_invoke$arity$1(q_offset) : X.call(null,q_offset)));
var x_mid = ((x0 + (bar_width / (2))) + (- (X.cljs$core$IFn$_invoke$arity$1 ? X.cljs$core$IFn$_invoke$arity$1(0.2) : X.call(null,0.2))));
var y0 = ((Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1(cum_cif) : Y.call(null,cum_cif)) - (Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1(cif) : Y.call(null,cif)));
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"key","key",-1516042587),data_key,new cljs.core.Keyword(null,"time","time",1385887882),time,new cljs.core.Keyword(null,"x","x",2099068185),(x_mid + (15)),new cljs.core.Keyword(null,"y0","y0",111454807),y0,new cljs.core.Keyword(null,"y1","y1",589123466),(Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1(cum_cif) : Y.call(null,cum_cif)),new cljs.core.Keyword(null,"styles","styles",1954480375),transplants.ui.svg_styles(styles)], null);
}),data_keys,fs,cum_fs));
}),quarter_series));
var q_polygon_data = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__4652__auto__ = (function transplants$vis2$stacked_area_chart_$_iter__82832(s__82833){
return (new cljs.core.LazySeq(null,(function (){
var s__82833__$1 = s__82833;
while(true){
var temp__5753__auto__ = cljs.core.seq(s__82833__$1);
if(temp__5753__auto__){
var s__82833__$2 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(s__82833__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__82833__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__82835 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__82834 = (0);
while(true){
if((i__82834 < size__4651__auto__)){
var dk = cljs.core._nth(c__4650__auto__,i__82834);
cljs.core.chunk_append(b__82835,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [dk,(function (){var tops = (function (){var iter__4652__auto__ = ((function (i__82834,dk,c__4650__auto__,size__4651__auto__,b__82835,s__82833__$2,temp__5753__auto__,data_count,bar_width,spacing,bin_labels,font_size,offset,q_offset,bar_positions,quarter_positions,map__82820,map__82820__$1,X,Y,year_series,quarter_series,data_keys,tool_mdata,data_styles){
return (function transplants$vis2$stacked_area_chart_$_iter__82832_$_iter__82836(s__82837){
return (new cljs.core.LazySeq(null,((function (i__82834,dk,c__4650__auto__,size__4651__auto__,b__82835,s__82833__$2,temp__5753__auto__,data_count,bar_width,spacing,bin_labels,font_size,offset,q_offset,bar_positions,quarter_positions,map__82820,map__82820__$1,X,Y,year_series,quarter_series,data_keys,tool_mdata,data_styles){
return (function (){
var s__82837__$1 = s__82837;
while(true){
var temp__5753__auto____$1 = cljs.core.seq(s__82837__$1);
if(temp__5753__auto____$1){
var xs__6308__auto__ = temp__5753__auto____$1;
var bp_dks = cljs.core.first(xs__6308__auto__);
var iterys__4648__auto__ = ((function (s__82837__$1,i__82834,bp_dks,xs__6308__auto__,temp__5753__auto____$1,dk,c__4650__auto__,size__4651__auto__,b__82835,s__82833__$2,temp__5753__auto__,data_count,bar_width,spacing,bin_labels,font_size,offset,q_offset,bar_positions,quarter_positions,map__82820,map__82820__$1,X,Y,year_series,quarter_series,data_keys,tool_mdata,data_styles){
return (function transplants$vis2$stacked_area_chart_$_iter__82832_$_iter__82836_$_iter__82838(s__82839){
return (new cljs.core.LazySeq(null,((function (s__82837__$1,i__82834,bp_dks,xs__6308__auto__,temp__5753__auto____$1,dk,c__4650__auto__,size__4651__auto__,b__82835,s__82833__$2,temp__5753__auto__,data_count,bar_width,spacing,bin_labels,font_size,offset,q_offset,bar_positions,quarter_positions,map__82820,map__82820__$1,X,Y,year_series,quarter_series,data_keys,tool_mdata,data_styles){
return (function (){
var s__82839__$1 = s__82839;
while(true){
var temp__5753__auto____$2 = cljs.core.seq(s__82839__$1);
if(temp__5753__auto____$2){
var s__82839__$2 = temp__5753__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__82839__$2)){
var c__4650__auto____$1 = cljs.core.chunk_first(s__82839__$2);
var size__4651__auto____$1 = cljs.core.count(c__4650__auto____$1);
var b__82841 = cljs.core.chunk_buffer(size__4651__auto____$1);
if((function (){var i__82840 = (0);
while(true){
if((i__82840 < size__4651__auto____$1)){
var bp_dk = cljs.core._nth(c__4650__auto____$1,i__82840);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(dk,new cljs.core.Keyword(null,"key","key",-1516042587).cljs$core$IFn$_invoke$arity$1(bp_dk))){
cljs.core.chunk_append(b__82841,cljs.core.select_keys(bp_dk,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"x","x",2099068185),new cljs.core.Keyword(null,"y0","y0",111454807),new cljs.core.Keyword(null,"y1","y1",589123466)], null)));

var G__83091 = (i__82840 + (1));
i__82840 = G__83091;
continue;
} else {
var G__83092 = (i__82840 + (1));
i__82840 = G__83092;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__82841),transplants$vis2$stacked_area_chart_$_iter__82832_$_iter__82836_$_iter__82838(cljs.core.chunk_rest(s__82839__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__82841),null);
}
} else {
var bp_dk = cljs.core.first(s__82839__$2);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(dk,new cljs.core.Keyword(null,"key","key",-1516042587).cljs$core$IFn$_invoke$arity$1(bp_dk))){
return cljs.core.cons(cljs.core.select_keys(bp_dk,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"x","x",2099068185),new cljs.core.Keyword(null,"y0","y0",111454807),new cljs.core.Keyword(null,"y1","y1",589123466)], null)),transplants$vis2$stacked_area_chart_$_iter__82832_$_iter__82836_$_iter__82838(cljs.core.rest(s__82839__$2)));
} else {
var G__83093 = cljs.core.rest(s__82839__$2);
s__82839__$1 = G__83093;
continue;
}
}
} else {
return null;
}
break;
}
});})(s__82837__$1,i__82834,bp_dks,xs__6308__auto__,temp__5753__auto____$1,dk,c__4650__auto__,size__4651__auto__,b__82835,s__82833__$2,temp__5753__auto__,data_count,bar_width,spacing,bin_labels,font_size,offset,q_offset,bar_positions,quarter_positions,map__82820,map__82820__$1,X,Y,year_series,quarter_series,data_keys,tool_mdata,data_styles))
,null,null));
});})(s__82837__$1,i__82834,bp_dks,xs__6308__auto__,temp__5753__auto____$1,dk,c__4650__auto__,size__4651__auto__,b__82835,s__82833__$2,temp__5753__auto__,data_count,bar_width,spacing,bin_labels,font_size,offset,q_offset,bar_positions,quarter_positions,map__82820,map__82820__$1,X,Y,year_series,quarter_series,data_keys,tool_mdata,data_styles))
;
var fs__4649__auto__ = cljs.core.seq(iterys__4648__auto__(bp_dks));
if(fs__4649__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__4649__auto__,transplants$vis2$stacked_area_chart_$_iter__82832_$_iter__82836(cljs.core.rest(s__82837__$1)));
} else {
var G__83094 = cljs.core.rest(s__82837__$1);
s__82837__$1 = G__83094;
continue;
}
} else {
return null;
}
break;
}
});})(i__82834,dk,c__4650__auto__,size__4651__auto__,b__82835,s__82833__$2,temp__5753__auto__,data_count,bar_width,spacing,bin_labels,font_size,offset,q_offset,bar_positions,quarter_positions,map__82820,map__82820__$1,X,Y,year_series,quarter_series,data_keys,tool_mdata,data_styles))
,null,null));
});})(i__82834,dk,c__4650__auto__,size__4651__auto__,b__82835,s__82833__$2,temp__5753__auto__,data_count,bar_width,spacing,bin_labels,font_size,offset,q_offset,bar_positions,quarter_positions,map__82820,map__82820__$1,X,Y,year_series,quarter_series,data_keys,tool_mdata,data_styles))
;
return iter__4652__auto__(quarter_positions);
})();
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.juxt.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"x","x",2099068185),new cljs.core.Keyword(null,"y0","y0",111454807)),tops),cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.juxt.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"x","x",2099068185),new cljs.core.Keyword(null,"y1","y1",589123466)),cljs.core.reverse(tops)));
})()], null));

var G__83095 = (i__82834 + (1));
i__82834 = G__83095;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__82835),transplants$vis2$stacked_area_chart_$_iter__82832(cljs.core.chunk_rest(s__82833__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__82835),null);
}
} else {
var dk = cljs.core.first(s__82833__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [dk,(function (){var tops = (function (){var iter__4652__auto__ = ((function (dk,s__82833__$2,temp__5753__auto__,data_count,bar_width,spacing,bin_labels,font_size,offset,q_offset,bar_positions,quarter_positions,map__82820,map__82820__$1,X,Y,year_series,quarter_series,data_keys,tool_mdata,data_styles){
return (function transplants$vis2$stacked_area_chart_$_iter__82832_$_iter__82842(s__82843){
return (new cljs.core.LazySeq(null,(function (){
var s__82843__$1 = s__82843;
while(true){
var temp__5753__auto____$1 = cljs.core.seq(s__82843__$1);
if(temp__5753__auto____$1){
var xs__6308__auto__ = temp__5753__auto____$1;
var bp_dks = cljs.core.first(xs__6308__auto__);
var iterys__4648__auto__ = ((function (s__82843__$1,bp_dks,xs__6308__auto__,temp__5753__auto____$1,dk,s__82833__$2,temp__5753__auto__,data_count,bar_width,spacing,bin_labels,font_size,offset,q_offset,bar_positions,quarter_positions,map__82820,map__82820__$1,X,Y,year_series,quarter_series,data_keys,tool_mdata,data_styles){
return (function transplants$vis2$stacked_area_chart_$_iter__82832_$_iter__82842_$_iter__82844(s__82845){
return (new cljs.core.LazySeq(null,((function (s__82843__$1,bp_dks,xs__6308__auto__,temp__5753__auto____$1,dk,s__82833__$2,temp__5753__auto__,data_count,bar_width,spacing,bin_labels,font_size,offset,q_offset,bar_positions,quarter_positions,map__82820,map__82820__$1,X,Y,year_series,quarter_series,data_keys,tool_mdata,data_styles){
return (function (){
var s__82845__$1 = s__82845;
while(true){
var temp__5753__auto____$2 = cljs.core.seq(s__82845__$1);
if(temp__5753__auto____$2){
var s__82845__$2 = temp__5753__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__82845__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__82845__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__82847 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__82846 = (0);
while(true){
if((i__82846 < size__4651__auto__)){
var bp_dk = cljs.core._nth(c__4650__auto__,i__82846);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(dk,new cljs.core.Keyword(null,"key","key",-1516042587).cljs$core$IFn$_invoke$arity$1(bp_dk))){
cljs.core.chunk_append(b__82847,cljs.core.select_keys(bp_dk,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"x","x",2099068185),new cljs.core.Keyword(null,"y0","y0",111454807),new cljs.core.Keyword(null,"y1","y1",589123466)], null)));

var G__83099 = (i__82846 + (1));
i__82846 = G__83099;
continue;
} else {
var G__83100 = (i__82846 + (1));
i__82846 = G__83100;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__82847),transplants$vis2$stacked_area_chart_$_iter__82832_$_iter__82842_$_iter__82844(cljs.core.chunk_rest(s__82845__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__82847),null);
}
} else {
var bp_dk = cljs.core.first(s__82845__$2);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(dk,new cljs.core.Keyword(null,"key","key",-1516042587).cljs$core$IFn$_invoke$arity$1(bp_dk))){
return cljs.core.cons(cljs.core.select_keys(bp_dk,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"x","x",2099068185),new cljs.core.Keyword(null,"y0","y0",111454807),new cljs.core.Keyword(null,"y1","y1",589123466)], null)),transplants$vis2$stacked_area_chart_$_iter__82832_$_iter__82842_$_iter__82844(cljs.core.rest(s__82845__$2)));
} else {
var G__83101 = cljs.core.rest(s__82845__$2);
s__82845__$1 = G__83101;
continue;
}
}
} else {
return null;
}
break;
}
});})(s__82843__$1,bp_dks,xs__6308__auto__,temp__5753__auto____$1,dk,s__82833__$2,temp__5753__auto__,data_count,bar_width,spacing,bin_labels,font_size,offset,q_offset,bar_positions,quarter_positions,map__82820,map__82820__$1,X,Y,year_series,quarter_series,data_keys,tool_mdata,data_styles))
,null,null));
});})(s__82843__$1,bp_dks,xs__6308__auto__,temp__5753__auto____$1,dk,s__82833__$2,temp__5753__auto__,data_count,bar_width,spacing,bin_labels,font_size,offset,q_offset,bar_positions,quarter_positions,map__82820,map__82820__$1,X,Y,year_series,quarter_series,data_keys,tool_mdata,data_styles))
;
var fs__4649__auto__ = cljs.core.seq(iterys__4648__auto__(bp_dks));
if(fs__4649__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__4649__auto__,transplants$vis2$stacked_area_chart_$_iter__82832_$_iter__82842(cljs.core.rest(s__82843__$1)));
} else {
var G__83102 = cljs.core.rest(s__82843__$1);
s__82843__$1 = G__83102;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});})(dk,s__82833__$2,temp__5753__auto__,data_count,bar_width,spacing,bin_labels,font_size,offset,q_offset,bar_positions,quarter_positions,map__82820,map__82820__$1,X,Y,year_series,quarter_series,data_keys,tool_mdata,data_styles))
;
return iter__4652__auto__(quarter_positions);
})();
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.juxt.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"x","x",2099068185),new cljs.core.Keyword(null,"y0","y0",111454807)),tops),cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.juxt.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"x","x",2099068185),new cljs.core.Keyword(null,"y1","y1",589123466)),cljs.core.reverse(tops)));
})()], null),transplants$vis2$stacked_area_chart_$_iter__82832(cljs.core.rest(s__82833__$2)));
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
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),(1)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"rect","rect",-108902628),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"key","key",-1516042587),(1),new cljs.core.Keyword(null,"class-name","class-name",945142584),new cljs.core.Keyword(null,"inner","inner",-1383171215).cljs$core$IFn$_invoke$arity$1(transplants.vis2.styles),new cljs.core.Keyword(null,"x","x",2099068185),(0),new cljs.core.Keyword(null,"y","y",-1757859776),(0),new cljs.core.Keyword(null,"width","width",-384071477),(1000),new cljs.core.Keyword(null,"height","height",1025178622),(600)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"opacity","opacity",397153780),(1)], null)], null),(function (){var iter__4652__auto__ = (function transplants$vis2$stacked_area_chart_$_iter__82848(s__82849){
return (new cljs.core.LazySeq(null,(function (){
var s__82849__$1 = s__82849;
while(true){
var temp__5753__auto__ = cljs.core.seq(s__82849__$1);
if(temp__5753__auto__){
var s__82849__$2 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(s__82849__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__82849__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__82851 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__82850 = (0);
while(true){
if((i__82850 < size__4651__auto__)){
var dk = cljs.core._nth(c__4650__auto__,i__82850);
cljs.core.chunk_append(b__82851,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"polygon","polygon",837053759),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"key","key",-1516042587),dk,new cljs.core.Keyword(null,"points","points",-1486596883),(function (){var iter__4652__auto__ = ((function (i__82850,dk,c__4650__auto__,size__4651__auto__,b__82851,s__82849__$2,temp__5753__auto__,data_count,bar_width,spacing,bin_labels,font_size,offset,q_offset,bar_positions,quarter_positions,q_polygon_data,map__82820,map__82820__$1,X,Y,year_series,quarter_series,data_keys,tool_mdata,data_styles){
return (function transplants$vis2$stacked_area_chart_$_iter__82848_$_iter__82852(s__82853){
return (new cljs.core.LazySeq(null,((function (i__82850,dk,c__4650__auto__,size__4651__auto__,b__82851,s__82849__$2,temp__5753__auto__,data_count,bar_width,spacing,bin_labels,font_size,offset,q_offset,bar_positions,quarter_positions,q_polygon_data,map__82820,map__82820__$1,X,Y,year_series,quarter_series,data_keys,tool_mdata,data_styles){
return (function (){
var s__82853__$1 = s__82853;
while(true){
var temp__5753__auto____$1 = cljs.core.seq(s__82853__$1);
if(temp__5753__auto____$1){
var s__82853__$2 = temp__5753__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__82853__$2)){
var c__4650__auto____$1 = cljs.core.chunk_first(s__82853__$2);
var size__4651__auto____$1 = cljs.core.count(c__4650__auto____$1);
var b__82855 = cljs.core.chunk_buffer(size__4651__auto____$1);
if((function (){var i__82854 = (0);
while(true){
if((i__82854 < size__4651__auto____$1)){
var vec__82856 = cljs.core._nth(c__4650__auto____$1,i__82854);
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82856,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82856,(1),null);
cljs.core.chunk_append(b__82855,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(x),",",cljs.core.str.cljs$core$IFn$_invoke$arity$1(y)," "].join(''));

var G__83106 = (i__82854 + (1));
i__82854 = G__83106;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__82855),transplants$vis2$stacked_area_chart_$_iter__82848_$_iter__82852(cljs.core.chunk_rest(s__82853__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__82855),null);
}
} else {
var vec__82859 = cljs.core.first(s__82853__$2);
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82859,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82859,(1),null);
return cljs.core.cons([cljs.core.str.cljs$core$IFn$_invoke$arity$1(x),",",cljs.core.str.cljs$core$IFn$_invoke$arity$1(y)," "].join(''),transplants$vis2$stacked_area_chart_$_iter__82848_$_iter__82852(cljs.core.rest(s__82853__$2)));
}
} else {
return null;
}
break;
}
});})(i__82850,dk,c__4650__auto__,size__4651__auto__,b__82851,s__82849__$2,temp__5753__auto__,data_count,bar_width,spacing,bin_labels,font_size,offset,q_offset,bar_positions,quarter_positions,q_polygon_data,map__82820,map__82820__$1,X,Y,year_series,quarter_series,data_keys,tool_mdata,data_styles))
,null,null));
});})(i__82850,dk,c__4650__auto__,size__4651__auto__,b__82851,s__82849__$2,temp__5753__auto__,data_count,bar_width,spacing,bin_labels,font_size,offset,q_offset,bar_positions,quarter_positions,q_polygon_data,map__82820,map__82820__$1,X,Y,year_series,quarter_series,data_keys,tool_mdata,data_styles))
;
return iter__4652__auto__((dk.cljs$core$IFn$_invoke$arity$1 ? dk.cljs$core$IFn$_invoke$arity$1(q_polygon_data) : dk.call(null,q_polygon_data)));
})(),new cljs.core.Keyword(null,"style","style",-496642736),transplants.ui.svg_styles((data_styles.cljs$core$IFn$_invoke$arity$1 ? data_styles.cljs$core$IFn$_invoke$arity$1(dk) : data_styles.call(null,dk)))], null)], null));

var G__83107 = (i__82850 + (1));
i__82850 = G__83107;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__82851),transplants$vis2$stacked_area_chart_$_iter__82848(cljs.core.chunk_rest(s__82849__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__82851),null);
}
} else {
var dk = cljs.core.first(s__82849__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"polygon","polygon",837053759),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"key","key",-1516042587),dk,new cljs.core.Keyword(null,"points","points",-1486596883),(function (){var iter__4652__auto__ = ((function (dk,s__82849__$2,temp__5753__auto__,data_count,bar_width,spacing,bin_labels,font_size,offset,q_offset,bar_positions,quarter_positions,q_polygon_data,map__82820,map__82820__$1,X,Y,year_series,quarter_series,data_keys,tool_mdata,data_styles){
return (function transplants$vis2$stacked_area_chart_$_iter__82848_$_iter__82862(s__82863){
return (new cljs.core.LazySeq(null,(function (){
var s__82863__$1 = s__82863;
while(true){
var temp__5753__auto____$1 = cljs.core.seq(s__82863__$1);
if(temp__5753__auto____$1){
var s__82863__$2 = temp__5753__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__82863__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__82863__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__82865 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__82864 = (0);
while(true){
if((i__82864 < size__4651__auto__)){
var vec__82866 = cljs.core._nth(c__4650__auto__,i__82864);
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82866,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82866,(1),null);
cljs.core.chunk_append(b__82865,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(x),",",cljs.core.str.cljs$core$IFn$_invoke$arity$1(y)," "].join(''));

var G__83108 = (i__82864 + (1));
i__82864 = G__83108;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__82865),transplants$vis2$stacked_area_chart_$_iter__82848_$_iter__82862(cljs.core.chunk_rest(s__82863__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__82865),null);
}
} else {
var vec__82869 = cljs.core.first(s__82863__$2);
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82869,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82869,(1),null);
return cljs.core.cons([cljs.core.str.cljs$core$IFn$_invoke$arity$1(x),",",cljs.core.str.cljs$core$IFn$_invoke$arity$1(y)," "].join(''),transplants$vis2$stacked_area_chart_$_iter__82848_$_iter__82862(cljs.core.rest(s__82863__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});})(dk,s__82849__$2,temp__5753__auto__,data_count,bar_width,spacing,bin_labels,font_size,offset,q_offset,bar_positions,quarter_positions,q_polygon_data,map__82820,map__82820__$1,X,Y,year_series,quarter_series,data_keys,tool_mdata,data_styles))
;
return iter__4652__auto__((dk.cljs$core$IFn$_invoke$arity$1 ? dk.cljs$core$IFn$_invoke$arity$1(q_polygon_data) : dk.call(null,q_polygon_data)));
})(),new cljs.core.Keyword(null,"style","style",-496642736),transplants.ui.svg_styles((data_styles.cljs$core$IFn$_invoke$arity$1 ? data_styles.cljs$core$IFn$_invoke$arity$1(dk) : data_styles.call(null,dk)))], null)], null),transplants$vis2$stacked_area_chart_$_iter__82848(cljs.core.rest(s__82849__$2)));
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
var x0 = ((function (){var G__82872 = ((spacing * (bar_index + (1))));
return (X.cljs$core$IFn$_invoke$arity$1 ? X.cljs$core$IFn$_invoke$arity$1(G__82872) : X.call(null,G__82872));
})() - (X.cljs$core$IFn$_invoke$arity$1 ? X.cljs$core$IFn$_invoke$arity$1(offset) : X.call(null,offset)));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),transplants.vis2.multiline_bin_label(bin_label,x0,font_size)], null);
}),bin_labels)),cljs.core.into.cljs$core$IFn$_invoke$arity$3(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905)], null),cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (bp){
var x = new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(cljs.core.first(bp));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"x1","x1",-1863922247),x,new cljs.core.Keyword(null,"x2","x2",-1362513475),x,new cljs.core.Keyword(null,"y1","y1",589123466),(Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1((0)) : Y.call(null,(0))),new cljs.core.Keyword(null,"y2","y2",-718691301),(Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1((1)) : Y.call(null,(1))),new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"stroke","stroke",1741823555),"#fff",new cljs.core.Keyword(null,"stroke-width","stroke-width",716836435),(3)], null)], null)], null);
})),bar_positions)], null),cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),(3),new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"opacity","opacity",397153780),(1)], null)], null)], null),cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (bin_label){
var bar_index = new cljs.core.Keyword(null,"time-index","time-index",1670884208).cljs$core$IFn$_invoke$arity$1(bin_label);
var x0 = (((function (){var G__82877 = ((spacing * (bar_index + (1))));
return (X.cljs$core$IFn$_invoke$arity$1 ? X.cljs$core$IFn$_invoke$arity$1(G__82877) : X.call(null,G__82877));
})() - (X.cljs$core$IFn$_invoke$arity$1 ? X.cljs$core$IFn$_invoke$arity$1(offset) : X.call(null,offset))) - (10));
var x_mid = ((x0 + (bar_width / (2))) + (0));
var vec__82873 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(year_series,bar_index);
var time = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82873,(0),null);
var map__82876 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82873,(1),null);
var map__82876__$1 = cljs.core.__destructure_map(map__82876);
var fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82876__$1,new cljs.core.Keyword(null,"fs","fs",-2122926244));
var cum_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82876__$1,new cljs.core.Keyword(null,"cum-fs","cum-fs",-164423437));
var int_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82876__$1,new cljs.core.Keyword(null,"int-fs","int-fs",1685464335));
var staggers = transplants.vis2.label_staggers(0.12,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__82818_SHARP_){
if((p1__82818_SHARP_ == null)){
return (0);
} else {
return p1__82818_SHARP_;
}
}),fs));
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),time], null)], null),cljs.core.conj.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$variadic((function (i,data_key,cif,cum_cif,int_fs__$1){
var styles = (data_styles.cljs$core$IFn$_invoke$arity$1 ? data_styles.cljs$core$IFn$_invoke$arity$1(data_key) : data_styles.call(null,data_key));
var y0 = (((data_count > (1)))?((Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1(cum_cif) : Y.call(null,cum_cif)) - (Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1(cif) : Y.call(null,cif))):(Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1(cif) : Y.call(null,cif)));
var h = (((data_count > (1)))?((Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1(cum_cif) : Y.call(null,cum_cif)) - (function (){var G__82878 = (cum_cif - cif);
return (Y.cljs$core$IFn$_invoke$arity$1 ? Y.cljs$core$IFn$_invoke$arity$1(G__82878) : Y.call(null,G__82878));
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
transplants.vis2.area_chart = (function transplants$vis2$area_chart(p__82880){
var map__82881 = p__82880;
var map__82881__$1 = cljs.core.__destructure_map(map__82881);
var env = map__82881__$1;
var organ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82881__$1,new cljs.core.Keyword(null,"organ","organ",-29862572));
var tool = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82881__$1,new cljs.core.Keyword(null,"tool","tool",-1298696470));
var base_outcome_keys = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82881__$1,new cljs.core.Keyword(null,"base-outcome-keys","base-outcome-keys",519744091));
var s0 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82881__$1,new cljs.core.Keyword(null,"s0","s0",-350711836));
var F = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82881__$1,new cljs.core.Keyword(null,"F","F",-1115543258));
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
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Row,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Col,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin-top","margin-top",392161226),(10)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [svg.container.svg_container,(function (p1__82879_SHARP_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__82879_SHARP_,new cljs.core.Keyword(null,"aspect-ratio","aspect-ratio",1674013504),transplants.vis2.aspect_ratio(new cljs.core.Keyword(null,"width","width",-384071477).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"inner","inner",-1383171215).cljs$core$IFn$_invoke$arity$1(p1__82879_SHARP_)),new cljs.core.Keyword(null,"height","height",1025178622).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"inner","inner",-1383171215).cljs$core$IFn$_invoke$arity$1(p1__82879_SHARP_))));
})(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(svg.space.space(new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"outer","outer",-375185956),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"width","width",-384071477),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"area","area",472007256),new cljs.core.Keyword(null,"svg-width","svg-width",1259023155)], null)),new cljs.core.Keyword(null,"height","height",1025178622),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"area","area",472007256),new cljs.core.Keyword(null,"svg-height","svg-height",1432012799)], null))], null),new cljs.core.Keyword(null,"aspect-ratio","aspect-ratio",1674013504),transplants.vis2.aspect_ratio(svg_width,svg_height),new cljs.core.Keyword(null,"margin","margin",-995903681),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"area","area",472007256),new cljs.core.Keyword(null,"svg-margin","svg-margin",1509529342)], null)),new cljs.core.Keyword(null,"padding","padding",1660304693),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"top","top",-1856271961),(40),new cljs.core.Keyword(null,"right","right",-452581833),(20),new cljs.core.Keyword(null,"bottom","bottom",-1550509018),(100),new cljs.core.Keyword(null,"left","left",-399115937),(20)], null),new cljs.core.Keyword(null,"x-domain","x-domain",501559689),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(14)], null),new cljs.core.Keyword(null,"x-ticks","x-ticks",1636599024),(10),new cljs.core.Keyword(null,"y-domain","y-domain",-969203007),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),(0)], null),new cljs.core.Keyword(null,"y-ticks","y-ticks",-843622722),(10)], null)),new cljs.core.Keyword(null,"styles","styles",1954480375),transplants.vis2.styles)),(function (_,___$1,X,Y){
var fs_by_year_in_plot_order = transplants.vis2.fs_time_series(base_outcome_keys,plot_order,fs_by_year);
var fs_by_quarter_in_plot_order = transplants.vis2.fs_time_series(base_outcome_keys,plot_order,fs_by_quarter);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),transplants.vis2.svg_outcome_legend.cljs$core$IFn$_invoke$arity$2(plot_order,data_styles),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"transform","transform",1381301764),"translate(280 0)"], null),transplants.vis2.stacked_area_chart(new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"X","X",1705996313),X,new cljs.core.Keyword(null,"Y","Y",-560717356),Y,new cljs.core.Keyword(null,"year-series","year-series",474161786),fs_by_year_in_plot_order,new cljs.core.Keyword(null,"quarter-series","quarter-series",868609982),fs_by_quarter_in_plot_order,new cljs.core.Keyword(null,"data-keys","data-keys",1654526230),plot_order,new cljs.core.Keyword(null,"tool-mdata","tool-mdata",-1013259695),tool_mdata,new cljs.core.Keyword(null,"data-styles","data-styles",-12538237),data_styles], null))], null)], null);
})], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"section","section",-300141526),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin-top","margin-top",392161226),(25)], null)], null),new cljs.core.Keyword(null,"post-section","post-section",-774244483).cljs$core$IFn$_invoke$arity$1(tool_mdata)], null)], null)], null);
});
/**
 * render a head and shoulders icon
 */
transplants.vis2.h_and_s = (function transplants$vis2$h_and_s(p__82882){
var map__82883 = p__82882;
var map__82883__$1 = cljs.core.__destructure_map(map__82883);
var key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82883__$1,new cljs.core.Keyword(null,"key","key",-1516042587));
var fill = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__82883__$1,new cljs.core.Keyword(null,"fill","fill",883462889),"red");
var scale = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__82883__$1,new cljs.core.Keyword(null,"scale","scale",-230427353),"0.2");
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
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [svg.container.svg_container,(function (p1__82884_SHARP_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__82884_SHARP_,new cljs.core.Keyword(null,"aspect-ratio","aspect-ratio",1674013504),transplants.vis2.aspect_ratio(new cljs.core.Keyword(null,"width","width",-384071477).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"inner","inner",-1383171215).cljs$core$IFn$_invoke$arity$1(p1__82884_SHARP_)),new cljs.core.Keyword(null,"height","height",1025178622).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"inner","inner",-1383171215).cljs$core$IFn$_invoke$arity$1(p1__82884_SHARP_))));
})(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(svg.space.space(new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"outer","outer",-375185956),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"width","width",-384071477),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"icons","icons",-297140977),new cljs.core.Keyword(null,"svg-width","svg-width",1259023155)], null)),new cljs.core.Keyword(null,"height","height",1025178622),((40) + cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"icons","icons",-297140977),new cljs.core.Keyword(null,"svg-height","svg-height",1432012799)], null)))], null),new cljs.core.Keyword(null,"margin","margin",-995903681),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"icons","icons",-297140977),new cljs.core.Keyword(null,"svg-margin","svg-margin",1509529342)], null)),new cljs.core.Keyword(null,"padding","padding",1660304693),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"icons","icons",-297140977),new cljs.core.Keyword(null,"svg-padding","svg-padding",1501468269)], null)),new cljs.core.Keyword(null,"x-ticks","x-ticks",1636599024),(10),new cljs.core.Keyword(null,"y-domain","y-domain",-969203007),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(300),(0)], null),new cljs.core.Keyword(null,"y-ticks","y-ticks",-843622722),(10)], null)),new cljs.core.Keyword(null,"styles","styles",1954480375),transplants.vis2.styles)),(function (_x,_y,_X,_Y){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"transform","transform",1381301764),"translate(20,40),scale(1.42)"], null)], null),(function (){var iter__4652__auto__ = (function transplants$vis2$side_by_side_icon_array_$_iter__82885(s__82886){
return (new cljs.core.LazySeq(null,(function (){
var s__82886__$1 = s__82886;
while(true){
var temp__5753__auto__ = cljs.core.seq(s__82886__$1);
if(temp__5753__auto__){
var s__82886__$2 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(s__82886__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__82886__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__82888 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__82887 = (0);
while(true){
if((i__82887 < size__4651__auto__)){
var label_index = cljs.core._nth(c__4650__auto__,i__82887);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(labels,label_index);
var time_index = new cljs.core.Keyword(null,"time-index","time-index",1670884208).cljs$core$IFn$_invoke$arity$1(label);
var vec__82889 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(year_series,time_index);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82889,(0),null);
var map__82892 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82889,(1),null);
var map__82892__$1 = cljs.core.__destructure_map(map__82892);
var int_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82892__$1,new cljs.core.Keyword(null,"int-fs","int-fs",1685464335));
var cum_int_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82892__$1,new cljs.core.Keyword(null,"cum-int-fs","cum-int-fs",-2123649193));
cljs.core.chunk_append(b__82888,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["lab-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(label_index)].join(''),new cljs.core.Keyword(null,"transform","transform",1381301764),"translate (0, 10)"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),(1)], null),(function (){var iter__4652__auto__ = ((function (i__82887,label,time_index,vec__82889,_,map__82892,map__82892__$1,int_fs,cum_int_fs,label_index,c__4650__auto__,size__4651__auto__,b__82888,s__82886__$2,temp__5753__auto__,plot_order,labels,icon_order){
return (function transplants$vis2$side_by_side_icon_array_$_iter__82885_$_iter__82893(s__82894){
return (new cljs.core.LazySeq(null,((function (i__82887,label,time_index,vec__82889,_,map__82892,map__82892__$1,int_fs,cum_int_fs,label_index,c__4650__auto__,size__4651__auto__,b__82888,s__82886__$2,temp__5753__auto__,plot_order,labels,icon_order){
return (function (){
var s__82894__$1 = s__82894;
while(true){
var temp__5753__auto____$1 = cljs.core.seq(s__82894__$1);
if(temp__5753__auto____$1){
var s__82894__$2 = temp__5753__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__82894__$2)){
var c__4650__auto____$1 = cljs.core.chunk_first(s__82894__$2);
var size__4651__auto____$1 = cljs.core.count(c__4650__auto____$1);
var b__82896 = cljs.core.chunk_buffer(size__4651__auto____$1);
if((function (){var i__82895 = (0);
while(true){
if((i__82895 < size__4651__auto____$1)){
var k = cljs.core._nth(c__4650__auto____$1,i__82895);
var outcome_key = (plot_order.cljs$core$IFn$_invoke$arity$1 ? plot_order.cljs$core$IFn$_invoke$arity$1(k) : plot_order.call(null,k));
var outcome = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"outcomes","outcomes",-2034044865),outcome_key], null));
cljs.core.chunk_append(b__82896,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["outk-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)].join(''),new cljs.core.Keyword(null,"transform","transform",1381301764),["translate (",cljs.core.str.cljs$core$IFn$_invoke$arity$1((label_index * (250))),", ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(((k * (25)) - (20))),")"].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.vis2.h_and_s,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"scale","scale",-230427353),(2),new cljs.core.Keyword(null,"fill","fill",883462889),new cljs.core.Keyword(null,"fill","fill",883462889).cljs$core$IFn$_invoke$arity$1(outcome)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",-1790561697),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"transform","transform",1381301764),"translate (40,15)"], null),[cljs.core.str.cljs$core$IFn$_invoke$arity$1((int_fs.cljs$core$IFn$_invoke$arity$1 ? int_fs.cljs$core$IFn$_invoke$arity$1(k) : int_fs.call(null,k)))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"label","label",1718410804).cljs$core$IFn$_invoke$arity$1(outcome))].join('')], null)], null));

var G__83110 = (i__82895 + (1));
i__82895 = G__83110;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__82896),transplants$vis2$side_by_side_icon_array_$_iter__82885_$_iter__82893(cljs.core.chunk_rest(s__82894__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__82896),null);
}
} else {
var k = cljs.core.first(s__82894__$2);
var outcome_key = (plot_order.cljs$core$IFn$_invoke$arity$1 ? plot_order.cljs$core$IFn$_invoke$arity$1(k) : plot_order.call(null,k));
var outcome = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"outcomes","outcomes",-2034044865),outcome_key], null));
return cljs.core.cons(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["outk-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)].join(''),new cljs.core.Keyword(null,"transform","transform",1381301764),["translate (",cljs.core.str.cljs$core$IFn$_invoke$arity$1((label_index * (250))),", ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(((k * (25)) - (20))),")"].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.vis2.h_and_s,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"scale","scale",-230427353),(2),new cljs.core.Keyword(null,"fill","fill",883462889),new cljs.core.Keyword(null,"fill","fill",883462889).cljs$core$IFn$_invoke$arity$1(outcome)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",-1790561697),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"transform","transform",1381301764),"translate (40,15)"], null),[cljs.core.str.cljs$core$IFn$_invoke$arity$1((int_fs.cljs$core$IFn$_invoke$arity$1 ? int_fs.cljs$core$IFn$_invoke$arity$1(k) : int_fs.call(null,k)))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"label","label",1718410804).cljs$core$IFn$_invoke$arity$1(outcome))].join('')], null)], null),transplants$vis2$side_by_side_icon_array_$_iter__82885_$_iter__82893(cljs.core.rest(s__82894__$2)));
}
} else {
return null;
}
break;
}
});})(i__82887,label,time_index,vec__82889,_,map__82892,map__82892__$1,int_fs,cum_int_fs,label_index,c__4650__auto__,size__4651__auto__,b__82888,s__82886__$2,temp__5753__auto__,plot_order,labels,icon_order))
,null,null));
});})(i__82887,label,time_index,vec__82889,_,map__82892,map__82892__$1,int_fs,cum_int_fs,label_index,c__4650__auto__,size__4651__auto__,b__82888,s__82886__$2,temp__5753__auto__,plot_order,labels,icon_order))
;
return iter__4652__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(plot_order)));
})()], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),(2),new cljs.core.Keyword(null,"transform","transform",1381301764),["translate(",cljs.core.str.cljs$core$IFn$_invoke$arity$1((label_index * (250))),", 90)"].join('')], null),(function (){var iter__4652__auto__ = ((function (i__82887,label,time_index,vec__82889,_,map__82892,map__82892__$1,int_fs,cum_int_fs,label_index,c__4650__auto__,size__4651__auto__,b__82888,s__82886__$2,temp__5753__auto__,plot_order,labels,icon_order){
return (function transplants$vis2$side_by_side_icon_array_$_iter__82885_$_iter__82897(s__82898){
return (new cljs.core.LazySeq(null,((function (i__82887,label,time_index,vec__82889,_,map__82892,map__82892__$1,int_fs,cum_int_fs,label_index,c__4650__auto__,size__4651__auto__,b__82888,s__82886__$2,temp__5753__auto__,plot_order,labels,icon_order){
return (function (){
var s__82898__$1 = s__82898;
while(true){
var temp__5753__auto____$1 = cljs.core.seq(s__82898__$1);
if(temp__5753__auto____$1){
var xs__6308__auto__ = temp__5753__auto____$1;
var i = cljs.core.first(xs__6308__auto__);
var iterys__4648__auto__ = ((function (s__82898__$1,i__82887,i,xs__6308__auto__,temp__5753__auto____$1,label,time_index,vec__82889,_,map__82892,map__82892__$1,int_fs,cum_int_fs,label_index,c__4650__auto__,size__4651__auto__,b__82888,s__82886__$2,temp__5753__auto__,plot_order,labels,icon_order){
return (function transplants$vis2$side_by_side_icon_array_$_iter__82885_$_iter__82897_$_iter__82899(s__82900){
return (new cljs.core.LazySeq(null,((function (s__82898__$1,i__82887,i,xs__6308__auto__,temp__5753__auto____$1,label,time_index,vec__82889,_,map__82892,map__82892__$1,int_fs,cum_int_fs,label_index,c__4650__auto__,size__4651__auto__,b__82888,s__82886__$2,temp__5753__auto__,plot_order,labels,icon_order){
return (function (){
var s__82900__$1 = s__82900;
while(true){
var temp__5753__auto____$2 = cljs.core.seq(s__82900__$1);
if(temp__5753__auto____$2){
var s__82900__$2 = temp__5753__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__82900__$2)){
var c__4650__auto____$1 = cljs.core.chunk_first(s__82900__$2);
var size__4651__auto____$1 = cljs.core.count(c__4650__auto____$1);
var b__82902 = cljs.core.chunk_buffer(size__4651__auto____$1);
if((function (){var i__82901 = (0);
while(true){
if((i__82901 < size__4651__auto____$1)){
var j = cljs.core._nth(c__4650__auto____$1,i__82901);
var ordinal = (function (){var G__82903 = (j + ((10) * i));
return (icon_order.cljs$core$IFn$_invoke$arity$1 ? icon_order.cljs$core$IFn$_invoke$arity$1(G__82903) : icon_order.call(null,G__82903));
})();
cljs.core.chunk_append(b__82902,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["i-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(j),"-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join(''),new cljs.core.Keyword(null,"transform","transform",1381301764),["translate(",cljs.core.str.cljs$core$IFn$_invoke$arity$1((j * (22)))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1((i * (22))),")"].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.vis2.h_and_s,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"scale","scale",-230427353),(2),new cljs.core.Keyword(null,"fill","fill",883462889),new cljs.core.Keyword(null,"fill","fill",883462889).cljs$core$IFn$_invoke$arity$1(transplants.vis2.ordinal_mdata(ordinal,cum_int_fs,tool_mdata))], null)], null)], null));

var G__83114 = (i__82901 + (1));
i__82901 = G__83114;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__82902),transplants$vis2$side_by_side_icon_array_$_iter__82885_$_iter__82897_$_iter__82899(cljs.core.chunk_rest(s__82900__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__82902),null);
}
} else {
var j = cljs.core.first(s__82900__$2);
var ordinal = (function (){var G__82904 = (j + ((10) * i));
return (icon_order.cljs$core$IFn$_invoke$arity$1 ? icon_order.cljs$core$IFn$_invoke$arity$1(G__82904) : icon_order.call(null,G__82904));
})();
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["i-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(j),"-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join(''),new cljs.core.Keyword(null,"transform","transform",1381301764),["translate(",cljs.core.str.cljs$core$IFn$_invoke$arity$1((j * (22)))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1((i * (22))),")"].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.vis2.h_and_s,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"scale","scale",-230427353),(2),new cljs.core.Keyword(null,"fill","fill",883462889),new cljs.core.Keyword(null,"fill","fill",883462889).cljs$core$IFn$_invoke$arity$1(transplants.vis2.ordinal_mdata(ordinal,cum_int_fs,tool_mdata))], null)], null)], null),transplants$vis2$side_by_side_icon_array_$_iter__82885_$_iter__82897_$_iter__82899(cljs.core.rest(s__82900__$2)));
}
} else {
return null;
}
break;
}
});})(s__82898__$1,i__82887,i,xs__6308__auto__,temp__5753__auto____$1,label,time_index,vec__82889,_,map__82892,map__82892__$1,int_fs,cum_int_fs,label_index,c__4650__auto__,size__4651__auto__,b__82888,s__82886__$2,temp__5753__auto__,plot_order,labels,icon_order))
,null,null));
});})(s__82898__$1,i__82887,i,xs__6308__auto__,temp__5753__auto____$1,label,time_index,vec__82889,_,map__82892,map__82892__$1,int_fs,cum_int_fs,label_index,c__4650__auto__,size__4651__auto__,b__82888,s__82886__$2,temp__5753__auto__,plot_order,labels,icon_order))
;
var fs__4649__auto__ = cljs.core.seq(iterys__4648__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1((10))));
if(fs__4649__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__4649__auto__,transplants$vis2$side_by_side_icon_array_$_iter__82885_$_iter__82897(cljs.core.rest(s__82898__$1)));
} else {
var G__83115 = cljs.core.rest(s__82898__$1);
s__82898__$1 = G__83115;
continue;
}
} else {
return null;
}
break;
}
});})(i__82887,label,time_index,vec__82889,_,map__82892,map__82892__$1,int_fs,cum_int_fs,label_index,c__4650__auto__,size__4651__auto__,b__82888,s__82886__$2,temp__5753__auto__,plot_order,labels,icon_order))
,null,null));
});})(i__82887,label,time_index,vec__82889,_,map__82892,map__82892__$1,int_fs,cum_int_fs,label_index,c__4650__auto__,size__4651__auto__,b__82888,s__82886__$2,temp__5753__auto__,plot_order,labels,icon_order))
;
return iter__4652__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1((10)));
})()], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),(3),new cljs.core.Keyword(null,"transform","transform",1381301764),["translate(",cljs.core.str.cljs$core$IFn$_invoke$arity$1((label_index * (250))),", 340)"].join('')], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",-1790561697),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"font-size","font-size",-1847940346),"1.2em",new cljs.core.Keyword(null,"x","x",2099068185),(20)], null),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(label,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"line","line",212345235),(0)], null))], null)], null)], null));

var G__83116 = (i__82887 + (1));
i__82887 = G__83116;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__82888),transplants$vis2$side_by_side_icon_array_$_iter__82885(cljs.core.chunk_rest(s__82886__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__82888),null);
}
} else {
var label_index = cljs.core.first(s__82886__$2);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(labels,label_index);
var time_index = new cljs.core.Keyword(null,"time-index","time-index",1670884208).cljs$core$IFn$_invoke$arity$1(label);
var vec__82905 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(year_series,time_index);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82905,(0),null);
var map__82908 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82905,(1),null);
var map__82908__$1 = cljs.core.__destructure_map(map__82908);
var int_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82908__$1,new cljs.core.Keyword(null,"int-fs","int-fs",1685464335));
var cum_int_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82908__$1,new cljs.core.Keyword(null,"cum-int-fs","cum-int-fs",-2123649193));
return cljs.core.cons(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["lab-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(label_index)].join(''),new cljs.core.Keyword(null,"transform","transform",1381301764),"translate (0, 10)"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),(1)], null),(function (){var iter__4652__auto__ = ((function (label,time_index,vec__82905,_,map__82908,map__82908__$1,int_fs,cum_int_fs,label_index,s__82886__$2,temp__5753__auto__,plot_order,labels,icon_order){
return (function transplants$vis2$side_by_side_icon_array_$_iter__82885_$_iter__82909(s__82910){
return (new cljs.core.LazySeq(null,(function (){
var s__82910__$1 = s__82910;
while(true){
var temp__5753__auto____$1 = cljs.core.seq(s__82910__$1);
if(temp__5753__auto____$1){
var s__82910__$2 = temp__5753__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__82910__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__82910__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__82912 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__82911 = (0);
while(true){
if((i__82911 < size__4651__auto__)){
var k = cljs.core._nth(c__4650__auto__,i__82911);
var outcome_key = (plot_order.cljs$core$IFn$_invoke$arity$1 ? plot_order.cljs$core$IFn$_invoke$arity$1(k) : plot_order.call(null,k));
var outcome = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"outcomes","outcomes",-2034044865),outcome_key], null));
cljs.core.chunk_append(b__82912,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["outk-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)].join(''),new cljs.core.Keyword(null,"transform","transform",1381301764),["translate (",cljs.core.str.cljs$core$IFn$_invoke$arity$1((label_index * (250))),", ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(((k * (25)) - (20))),")"].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.vis2.h_and_s,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"scale","scale",-230427353),(2),new cljs.core.Keyword(null,"fill","fill",883462889),new cljs.core.Keyword(null,"fill","fill",883462889).cljs$core$IFn$_invoke$arity$1(outcome)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",-1790561697),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"transform","transform",1381301764),"translate (40,15)"], null),[cljs.core.str.cljs$core$IFn$_invoke$arity$1((int_fs.cljs$core$IFn$_invoke$arity$1 ? int_fs.cljs$core$IFn$_invoke$arity$1(k) : int_fs.call(null,k)))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"label","label",1718410804).cljs$core$IFn$_invoke$arity$1(outcome))].join('')], null)], null));

var G__83117 = (i__82911 + (1));
i__82911 = G__83117;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__82912),transplants$vis2$side_by_side_icon_array_$_iter__82885_$_iter__82909(cljs.core.chunk_rest(s__82910__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__82912),null);
}
} else {
var k = cljs.core.first(s__82910__$2);
var outcome_key = (plot_order.cljs$core$IFn$_invoke$arity$1 ? plot_order.cljs$core$IFn$_invoke$arity$1(k) : plot_order.call(null,k));
var outcome = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"outcomes","outcomes",-2034044865),outcome_key], null));
return cljs.core.cons(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["outk-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)].join(''),new cljs.core.Keyword(null,"transform","transform",1381301764),["translate (",cljs.core.str.cljs$core$IFn$_invoke$arity$1((label_index * (250))),", ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(((k * (25)) - (20))),")"].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.vis2.h_and_s,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"scale","scale",-230427353),(2),new cljs.core.Keyword(null,"fill","fill",883462889),new cljs.core.Keyword(null,"fill","fill",883462889).cljs$core$IFn$_invoke$arity$1(outcome)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",-1790561697),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"transform","transform",1381301764),"translate (40,15)"], null),[cljs.core.str.cljs$core$IFn$_invoke$arity$1((int_fs.cljs$core$IFn$_invoke$arity$1 ? int_fs.cljs$core$IFn$_invoke$arity$1(k) : int_fs.call(null,k)))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"label","label",1718410804).cljs$core$IFn$_invoke$arity$1(outcome))].join('')], null)], null),transplants$vis2$side_by_side_icon_array_$_iter__82885_$_iter__82909(cljs.core.rest(s__82910__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});})(label,time_index,vec__82905,_,map__82908,map__82908__$1,int_fs,cum_int_fs,label_index,s__82886__$2,temp__5753__auto__,plot_order,labels,icon_order))
;
return iter__4652__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(plot_order)));
})()], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),(2),new cljs.core.Keyword(null,"transform","transform",1381301764),["translate(",cljs.core.str.cljs$core$IFn$_invoke$arity$1((label_index * (250))),", 90)"].join('')], null),(function (){var iter__4652__auto__ = ((function (label,time_index,vec__82905,_,map__82908,map__82908__$1,int_fs,cum_int_fs,label_index,s__82886__$2,temp__5753__auto__,plot_order,labels,icon_order){
return (function transplants$vis2$side_by_side_icon_array_$_iter__82885_$_iter__82913(s__82914){
return (new cljs.core.LazySeq(null,(function (){
var s__82914__$1 = s__82914;
while(true){
var temp__5753__auto____$1 = cljs.core.seq(s__82914__$1);
if(temp__5753__auto____$1){
var xs__6308__auto__ = temp__5753__auto____$1;
var i = cljs.core.first(xs__6308__auto__);
var iterys__4648__auto__ = ((function (s__82914__$1,i,xs__6308__auto__,temp__5753__auto____$1,label,time_index,vec__82905,_,map__82908,map__82908__$1,int_fs,cum_int_fs,label_index,s__82886__$2,temp__5753__auto__,plot_order,labels,icon_order){
return (function transplants$vis2$side_by_side_icon_array_$_iter__82885_$_iter__82913_$_iter__82915(s__82916){
return (new cljs.core.LazySeq(null,((function (s__82914__$1,i,xs__6308__auto__,temp__5753__auto____$1,label,time_index,vec__82905,_,map__82908,map__82908__$1,int_fs,cum_int_fs,label_index,s__82886__$2,temp__5753__auto__,plot_order,labels,icon_order){
return (function (){
var s__82916__$1 = s__82916;
while(true){
var temp__5753__auto____$2 = cljs.core.seq(s__82916__$1);
if(temp__5753__auto____$2){
var s__82916__$2 = temp__5753__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__82916__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__82916__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__82918 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__82917 = (0);
while(true){
if((i__82917 < size__4651__auto__)){
var j = cljs.core._nth(c__4650__auto__,i__82917);
var ordinal = (function (){var G__82919 = (j + ((10) * i));
return (icon_order.cljs$core$IFn$_invoke$arity$1 ? icon_order.cljs$core$IFn$_invoke$arity$1(G__82919) : icon_order.call(null,G__82919));
})();
cljs.core.chunk_append(b__82918,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["i-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(j),"-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join(''),new cljs.core.Keyword(null,"transform","transform",1381301764),["translate(",cljs.core.str.cljs$core$IFn$_invoke$arity$1((j * (22)))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1((i * (22))),")"].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.vis2.h_and_s,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"scale","scale",-230427353),(2),new cljs.core.Keyword(null,"fill","fill",883462889),new cljs.core.Keyword(null,"fill","fill",883462889).cljs$core$IFn$_invoke$arity$1(transplants.vis2.ordinal_mdata(ordinal,cum_int_fs,tool_mdata))], null)], null)], null));

var G__83121 = (i__82917 + (1));
i__82917 = G__83121;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__82918),transplants$vis2$side_by_side_icon_array_$_iter__82885_$_iter__82913_$_iter__82915(cljs.core.chunk_rest(s__82916__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__82918),null);
}
} else {
var j = cljs.core.first(s__82916__$2);
var ordinal = (function (){var G__82920 = (j + ((10) * i));
return (icon_order.cljs$core$IFn$_invoke$arity$1 ? icon_order.cljs$core$IFn$_invoke$arity$1(G__82920) : icon_order.call(null,G__82920));
})();
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["i-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(j),"-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join(''),new cljs.core.Keyword(null,"transform","transform",1381301764),["translate(",cljs.core.str.cljs$core$IFn$_invoke$arity$1((j * (22)))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1((i * (22))),")"].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.vis2.h_and_s,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"scale","scale",-230427353),(2),new cljs.core.Keyword(null,"fill","fill",883462889),new cljs.core.Keyword(null,"fill","fill",883462889).cljs$core$IFn$_invoke$arity$1(transplants.vis2.ordinal_mdata(ordinal,cum_int_fs,tool_mdata))], null)], null)], null),transplants$vis2$side_by_side_icon_array_$_iter__82885_$_iter__82913_$_iter__82915(cljs.core.rest(s__82916__$2)));
}
} else {
return null;
}
break;
}
});})(s__82914__$1,i,xs__6308__auto__,temp__5753__auto____$1,label,time_index,vec__82905,_,map__82908,map__82908__$1,int_fs,cum_int_fs,label_index,s__82886__$2,temp__5753__auto__,plot_order,labels,icon_order))
,null,null));
});})(s__82914__$1,i,xs__6308__auto__,temp__5753__auto____$1,label,time_index,vec__82905,_,map__82908,map__82908__$1,int_fs,cum_int_fs,label_index,s__82886__$2,temp__5753__auto__,plot_order,labels,icon_order))
;
var fs__4649__auto__ = cljs.core.seq(iterys__4648__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1((10))));
if(fs__4649__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__4649__auto__,transplants$vis2$side_by_side_icon_array_$_iter__82885_$_iter__82913(cljs.core.rest(s__82914__$1)));
} else {
var G__83122 = cljs.core.rest(s__82914__$1);
s__82914__$1 = G__83122;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});})(label,time_index,vec__82905,_,map__82908,map__82908__$1,int_fs,cum_int_fs,label_index,s__82886__$2,temp__5753__auto__,plot_order,labels,icon_order))
;
return iter__4652__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1((10)));
})()], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),(3),new cljs.core.Keyword(null,"transform","transform",1381301764),["translate(",cljs.core.str.cljs$core$IFn$_invoke$arity$1((label_index * (250))),", 340)"].join('')], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",-1790561697),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"font-size","font-size",-1847940346),"1.2em",new cljs.core.Keyword(null,"x","x",2099068185),(20)], null),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(label,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"line","line",212345235),(0)], null))], null)], null)], null),transplants$vis2$side_by_side_icon_array_$_iter__82885(cljs.core.rest(s__82886__$2)));
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
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.ui.col,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"sm","sm",-1402575065),(12),new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"padding","padding",1660304693),(0)], null)], null),(function (){var iter__4652__auto__ = (function transplants$vis2$stacked_icon_array_$_iter__82923(s__82924){
return (new cljs.core.LazySeq(null,(function (){
var s__82924__$1 = s__82924;
while(true){
var temp__5753__auto__ = cljs.core.seq(s__82924__$1);
if(temp__5753__auto__){
var s__82924__$2 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(s__82924__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__82924__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__82926 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__82925 = (0);
while(true){
if((i__82925 < size__4651__auto__)){
var i = cljs.core._nth(c__4650__auto__,i__82925);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(labels,i);
var time_index = new cljs.core.Keyword(null,"time-index","time-index",1670884208).cljs$core$IFn$_invoke$arity$1(label);
var vec__82927 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(year_series,time_index);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82927,(0),null);
var map__82930 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82927,(1),null);
var map__82930__$1 = cljs.core.__destructure_map(map__82930);
var int_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82930__$1,new cljs.core.Keyword(null,"int-fs","int-fs",1685464335));
var cum_int_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82930__$1,new cljs.core.Keyword(null,"cum-int-fs","cum-int-fs",-2123649193));
cljs.core.chunk_append(b__82926,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.ui.row,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"padding","padding",1660304693),"0px 0px"], null),new cljs.core.Keyword(null,"key","key",-1516042587),["year-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(time_index)].join('')], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.ui.col,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),(1)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h5","h5",-1829156625),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin-top","margin-top",392161226),(20)], null)], null),(function (){var line = new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(label);
if(cljs.core.sequential_QMARK_(line)){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.str,line);
} else {
return line;
}
})()], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [svg.container.svg_container,((function (i__82925,label,time_index,vec__82927,___$1,map__82930,map__82930__$1,int_fs,cum_int_fs,i,c__4650__auto__,size__4651__auto__,b__82926,s__82924__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order){
return (function (p1__82921_SHARP_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__82921_SHARP_,new cljs.core.Keyword(null,"aspect-ratio","aspect-ratio",1674013504),transplants.vis2.aspect_ratio(new cljs.core.Keyword(null,"width","width",-384071477).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"inner","inner",-1383171215).cljs$core$IFn$_invoke$arity$1(p1__82921_SHARP_)),new cljs.core.Keyword(null,"height","height",1025178622).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"inner","inner",-1383171215).cljs$core$IFn$_invoke$arity$1(p1__82921_SHARP_))));
});})(i__82925,label,time_index,vec__82927,___$1,map__82930,map__82930__$1,int_fs,cum_int_fs,i,c__4650__auto__,size__4651__auto__,b__82926,s__82924__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order))
(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(svg.space.space(new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"outer","outer",-375185956),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"width","width",-384071477),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"icons","icons",-297140977),new cljs.core.Keyword(null,"svg-width","svg-width",1259023155)], null)),new cljs.core.Keyword(null,"height","height",1025178622),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"icons","icons",-297140977),new cljs.core.Keyword(null,"svg-height","svg-height",1432012799)], null))], null),new cljs.core.Keyword(null,"aspect-ratio","aspect-ratio",1674013504),transplants.vis2.aspect_ratio(svg_width,svg_height),new cljs.core.Keyword(null,"margin","margin",-995903681),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"icons","icons",-297140977),new cljs.core.Keyword(null,"svg-margin","svg-margin",1509529342)], null)),new cljs.core.Keyword(null,"padding","padding",1660304693),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"icons","icons",-297140977),new cljs.core.Keyword(null,"svg-padding","svg-padding",1501468269)], null)),new cljs.core.Keyword(null,"x-domain","x-domain",501559689),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(300)], null),new cljs.core.Keyword(null,"x-ticks","x-ticks",1636599024),(10),new cljs.core.Keyword(null,"y-domain","y-domain",-969203007),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(300),(0)], null),new cljs.core.Keyword(null,"y-ticks","y-ticks",-843622722),(10)], null)),new cljs.core.Keyword(null,"styles","styles",1954480375),transplants.vis2.styles)),((function (i__82925,label,time_index,vec__82927,___$1,map__82930,map__82930__$1,int_fs,cum_int_fs,i,c__4650__auto__,size__4651__auto__,b__82926,s__82924__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order){
return (function (___$2,___$3,___$4,___$5){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"transform","transform",1381301764),"translate(10,15),scale(1.9)"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),(1)], null),(function (){var iter__4652__auto__ = ((function (i__82925,label,time_index,vec__82927,___$1,map__82930,map__82930__$1,int_fs,cum_int_fs,i,c__4650__auto__,size__4651__auto__,b__82926,s__82924__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order){
return (function transplants$vis2$stacked_icon_array_$_iter__82923_$_iter__82931(s__82932){
return (new cljs.core.LazySeq(null,((function (i__82925,label,time_index,vec__82927,___$1,map__82930,map__82930__$1,int_fs,cum_int_fs,i,c__4650__auto__,size__4651__auto__,b__82926,s__82924__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order){
return (function (){
var s__82932__$1 = s__82932;
while(true){
var temp__5753__auto____$1 = cljs.core.seq(s__82932__$1);
if(temp__5753__auto____$1){
var s__82932__$2 = temp__5753__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__82932__$2)){
var c__4650__auto____$1 = cljs.core.chunk_first(s__82932__$2);
var size__4651__auto____$1 = cljs.core.count(c__4650__auto____$1);
var b__82934 = cljs.core.chunk_buffer(size__4651__auto____$1);
if((function (){var i__82933 = (0);
while(true){
if((i__82933 < size__4651__auto____$1)){
var k = cljs.core._nth(c__4650__auto____$1,i__82933);
var outcome_key = (plot_order.cljs$core$IFn$_invoke$arity$1 ? plot_order.cljs$core$IFn$_invoke$arity$1(k) : plot_order.call(null,k));
var outcome = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"outcomes","outcomes",-2034044865),outcome_key], null));
cljs.core.chunk_append(b__82934,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["outk-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)].join(''),new cljs.core.Keyword(null,"transform","transform",1381301764),["translate (",cljs.core.str.cljs$core$IFn$_invoke$arity$1((10)),", ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(((k * (25)) + (20))),")"].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.vis2.h_and_s,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"scale","scale",-230427353),(2),new cljs.core.Keyword(null,"fill","fill",883462889),new cljs.core.Keyword(null,"fill","fill",883462889).cljs$core$IFn$_invoke$arity$1(outcome)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",-1790561697),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"transform","transform",1381301764),"translate(30,15)"], null),[cljs.core.str.cljs$core$IFn$_invoke$arity$1((int_fs.cljs$core$IFn$_invoke$arity$1 ? int_fs.cljs$core$IFn$_invoke$arity$1(k) : int_fs.call(null,k)))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"label","label",1718410804).cljs$core$IFn$_invoke$arity$1(outcome))].join('')], null)], null));

var G__83134 = (i__82933 + (1));
i__82933 = G__83134;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__82934),transplants$vis2$stacked_icon_array_$_iter__82923_$_iter__82931(cljs.core.chunk_rest(s__82932__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__82934),null);
}
} else {
var k = cljs.core.first(s__82932__$2);
var outcome_key = (plot_order.cljs$core$IFn$_invoke$arity$1 ? plot_order.cljs$core$IFn$_invoke$arity$1(k) : plot_order.call(null,k));
var outcome = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"outcomes","outcomes",-2034044865),outcome_key], null));
return cljs.core.cons(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["outk-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)].join(''),new cljs.core.Keyword(null,"transform","transform",1381301764),["translate (",cljs.core.str.cljs$core$IFn$_invoke$arity$1((10)),", ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(((k * (25)) + (20))),")"].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.vis2.h_and_s,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"scale","scale",-230427353),(2),new cljs.core.Keyword(null,"fill","fill",883462889),new cljs.core.Keyword(null,"fill","fill",883462889).cljs$core$IFn$_invoke$arity$1(outcome)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",-1790561697),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"transform","transform",1381301764),"translate(30,15)"], null),[cljs.core.str.cljs$core$IFn$_invoke$arity$1((int_fs.cljs$core$IFn$_invoke$arity$1 ? int_fs.cljs$core$IFn$_invoke$arity$1(k) : int_fs.call(null,k)))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"label","label",1718410804).cljs$core$IFn$_invoke$arity$1(outcome))].join('')], null)], null),transplants$vis2$stacked_icon_array_$_iter__82923_$_iter__82931(cljs.core.rest(s__82932__$2)));
}
} else {
return null;
}
break;
}
});})(i__82925,label,time_index,vec__82927,___$1,map__82930,map__82930__$1,int_fs,cum_int_fs,i,c__4650__auto__,size__4651__auto__,b__82926,s__82924__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order))
,null,null));
});})(i__82925,label,time_index,vec__82927,___$1,map__82930,map__82930__$1,int_fs,cum_int_fs,i,c__4650__auto__,size__4651__auto__,b__82926,s__82924__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order))
;
return iter__4652__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(plot_order)));
})()], null),(function (){var iter__4652__auto__ = ((function (i__82925,label,time_index,vec__82927,___$1,map__82930,map__82930__$1,int_fs,cum_int_fs,i,c__4650__auto__,size__4651__auto__,b__82926,s__82924__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order){
return (function transplants$vis2$stacked_icon_array_$_iter__82923_$_iter__82935(s__82936){
return (new cljs.core.LazySeq(null,((function (i__82925,label,time_index,vec__82927,___$1,map__82930,map__82930__$1,int_fs,cum_int_fs,i,c__4650__auto__,size__4651__auto__,b__82926,s__82924__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order){
return (function (){
var s__82936__$1 = s__82936;
while(true){
var temp__5753__auto____$1 = cljs.core.seq(s__82936__$1);
if(temp__5753__auto____$1){
var xs__6308__auto__ = temp__5753__auto____$1;
var i__$1 = cljs.core.first(xs__6308__auto__);
var iterys__4648__auto__ = ((function (s__82936__$1,i__82925,i__$1,xs__6308__auto__,temp__5753__auto____$1,label,time_index,vec__82927,___$1,map__82930,map__82930__$1,int_fs,cum_int_fs,i,c__4650__auto__,size__4651__auto__,b__82926,s__82924__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order){
return (function transplants$vis2$stacked_icon_array_$_iter__82923_$_iter__82935_$_iter__82937(s__82938){
return (new cljs.core.LazySeq(null,((function (s__82936__$1,i__82925,i__$1,xs__6308__auto__,temp__5753__auto____$1,label,time_index,vec__82927,___$1,map__82930,map__82930__$1,int_fs,cum_int_fs,i,c__4650__auto__,size__4651__auto__,b__82926,s__82924__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order){
return (function (){
var s__82938__$1 = s__82938;
while(true){
var temp__5753__auto____$2 = cljs.core.seq(s__82938__$1);
if(temp__5753__auto____$2){
var s__82938__$2 = temp__5753__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__82938__$2)){
var c__4650__auto____$1 = cljs.core.chunk_first(s__82938__$2);
var size__4651__auto____$1 = cljs.core.count(c__4650__auto____$1);
var b__82940 = cljs.core.chunk_buffer(size__4651__auto____$1);
if((function (){var i__82939 = (0);
while(true){
if((i__82939 < size__4651__auto____$1)){
var j = cljs.core._nth(c__4650__auto____$1,i__82939);
var ordinal = (function (){var G__82941 = (j + ((10) * i__$1));
return (icon_order.cljs$core$IFn$_invoke$arity$1 ? icon_order.cljs$core$IFn$_invoke$arity$1(G__82941) : icon_order.call(null,G__82941));
})();
cljs.core.chunk_append(b__82940,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["i-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(j),"-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i__$1)].join(''),new cljs.core.Keyword(null,"transform","transform",1381301764),["translate(",cljs.core.str.cljs$core$IFn$_invoke$arity$1(((300) + (j * (22))))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(((20) + (i__$1 * (22)))),")"].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.vis2.h_and_s,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"scale","scale",-230427353),(2),new cljs.core.Keyword(null,"fill","fill",883462889),new cljs.core.Keyword(null,"fill","fill",883462889).cljs$core$IFn$_invoke$arity$1(transplants.vis2.ordinal_mdata(ordinal,cum_int_fs,tool_mdata))], null)], null)], null));

var G__83141 = (i__82939 + (1));
i__82939 = G__83141;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__82940),transplants$vis2$stacked_icon_array_$_iter__82923_$_iter__82935_$_iter__82937(cljs.core.chunk_rest(s__82938__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__82940),null);
}
} else {
var j = cljs.core.first(s__82938__$2);
var ordinal = (function (){var G__82942 = (j + ((10) * i__$1));
return (icon_order.cljs$core$IFn$_invoke$arity$1 ? icon_order.cljs$core$IFn$_invoke$arity$1(G__82942) : icon_order.call(null,G__82942));
})();
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["i-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(j),"-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i__$1)].join(''),new cljs.core.Keyword(null,"transform","transform",1381301764),["translate(",cljs.core.str.cljs$core$IFn$_invoke$arity$1(((300) + (j * (22))))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(((20) + (i__$1 * (22)))),")"].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.vis2.h_and_s,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"scale","scale",-230427353),(2),new cljs.core.Keyword(null,"fill","fill",883462889),new cljs.core.Keyword(null,"fill","fill",883462889).cljs$core$IFn$_invoke$arity$1(transplants.vis2.ordinal_mdata(ordinal,cum_int_fs,tool_mdata))], null)], null)], null),transplants$vis2$stacked_icon_array_$_iter__82923_$_iter__82935_$_iter__82937(cljs.core.rest(s__82938__$2)));
}
} else {
return null;
}
break;
}
});})(s__82936__$1,i__82925,i__$1,xs__6308__auto__,temp__5753__auto____$1,label,time_index,vec__82927,___$1,map__82930,map__82930__$1,int_fs,cum_int_fs,i,c__4650__auto__,size__4651__auto__,b__82926,s__82924__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order))
,null,null));
});})(s__82936__$1,i__82925,i__$1,xs__6308__auto__,temp__5753__auto____$1,label,time_index,vec__82927,___$1,map__82930,map__82930__$1,int_fs,cum_int_fs,i,c__4650__auto__,size__4651__auto__,b__82926,s__82924__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order))
;
var fs__4649__auto__ = cljs.core.seq(iterys__4648__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1((10))));
if(fs__4649__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__4649__auto__,transplants$vis2$stacked_icon_array_$_iter__82923_$_iter__82935(cljs.core.rest(s__82936__$1)));
} else {
var G__83142 = cljs.core.rest(s__82936__$1);
s__82936__$1 = G__83142;
continue;
}
} else {
return null;
}
break;
}
});})(i__82925,label,time_index,vec__82927,___$1,map__82930,map__82930__$1,int_fs,cum_int_fs,i,c__4650__auto__,size__4651__auto__,b__82926,s__82924__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order))
,null,null));
});})(i__82925,label,time_index,vec__82927,___$1,map__82930,map__82930__$1,int_fs,cum_int_fs,i,c__4650__auto__,size__4651__auto__,b__82926,s__82924__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order))
;
return iter__4652__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1((10)));
})()], null);
});})(i__82925,label,time_index,vec__82927,___$1,map__82930,map__82930__$1,int_fs,cum_int_fs,i,c__4650__auto__,size__4651__auto__,b__82926,s__82924__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order))
], null)], null)], null));

var G__83143 = (i__82925 + (1));
i__82925 = G__83143;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__82926),transplants$vis2$stacked_icon_array_$_iter__82923(cljs.core.chunk_rest(s__82924__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__82926),null);
}
} else {
var i = cljs.core.first(s__82924__$2);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(labels,i);
var time_index = new cljs.core.Keyword(null,"time-index","time-index",1670884208).cljs$core$IFn$_invoke$arity$1(label);
var vec__82943 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(year_series,time_index);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82943,(0),null);
var map__82946 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82943,(1),null);
var map__82946__$1 = cljs.core.__destructure_map(map__82946);
var int_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82946__$1,new cljs.core.Keyword(null,"int-fs","int-fs",1685464335));
var cum_int_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82946__$1,new cljs.core.Keyword(null,"cum-int-fs","cum-int-fs",-2123649193));
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.ui.row,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"padding","padding",1660304693),"0px 0px"], null),new cljs.core.Keyword(null,"key","key",-1516042587),["year-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(time_index)].join('')], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.ui.col,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),(1)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h5","h5",-1829156625),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin-top","margin-top",392161226),(20)], null)], null),(function (){var line = new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(label);
if(cljs.core.sequential_QMARK_(line)){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.str,line);
} else {
return line;
}
})()], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [svg.container.svg_container,((function (label,time_index,vec__82943,___$1,map__82946,map__82946__$1,int_fs,cum_int_fs,i,s__82924__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order){
return (function (p1__82921_SHARP_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__82921_SHARP_,new cljs.core.Keyword(null,"aspect-ratio","aspect-ratio",1674013504),transplants.vis2.aspect_ratio(new cljs.core.Keyword(null,"width","width",-384071477).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"inner","inner",-1383171215).cljs$core$IFn$_invoke$arity$1(p1__82921_SHARP_)),new cljs.core.Keyword(null,"height","height",1025178622).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"inner","inner",-1383171215).cljs$core$IFn$_invoke$arity$1(p1__82921_SHARP_))));
});})(label,time_index,vec__82943,___$1,map__82946,map__82946__$1,int_fs,cum_int_fs,i,s__82924__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order))
(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(svg.space.space(new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"outer","outer",-375185956),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"width","width",-384071477),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"icons","icons",-297140977),new cljs.core.Keyword(null,"svg-width","svg-width",1259023155)], null)),new cljs.core.Keyword(null,"height","height",1025178622),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"icons","icons",-297140977),new cljs.core.Keyword(null,"svg-height","svg-height",1432012799)], null))], null),new cljs.core.Keyword(null,"aspect-ratio","aspect-ratio",1674013504),transplants.vis2.aspect_ratio(svg_width,svg_height),new cljs.core.Keyword(null,"margin","margin",-995903681),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"icons","icons",-297140977),new cljs.core.Keyword(null,"svg-margin","svg-margin",1509529342)], null)),new cljs.core.Keyword(null,"padding","padding",1660304693),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"icons","icons",-297140977),new cljs.core.Keyword(null,"svg-padding","svg-padding",1501468269)], null)),new cljs.core.Keyword(null,"x-domain","x-domain",501559689),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(300)], null),new cljs.core.Keyword(null,"x-ticks","x-ticks",1636599024),(10),new cljs.core.Keyword(null,"y-domain","y-domain",-969203007),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(300),(0)], null),new cljs.core.Keyword(null,"y-ticks","y-ticks",-843622722),(10)], null)),new cljs.core.Keyword(null,"styles","styles",1954480375),transplants.vis2.styles)),((function (label,time_index,vec__82943,___$1,map__82946,map__82946__$1,int_fs,cum_int_fs,i,s__82924__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order){
return (function (___$2,___$3,___$4,___$5){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"transform","transform",1381301764),"translate(10,15),scale(1.9)"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),(1)], null),(function (){var iter__4652__auto__ = (function transplants$vis2$stacked_icon_array_$_iter__82923_$_iter__82947(s__82948){
return (new cljs.core.LazySeq(null,(function (){
var s__82948__$1 = s__82948;
while(true){
var temp__5753__auto____$1 = cljs.core.seq(s__82948__$1);
if(temp__5753__auto____$1){
var s__82948__$2 = temp__5753__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__82948__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__82948__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__82950 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__82949 = (0);
while(true){
if((i__82949 < size__4651__auto__)){
var k = cljs.core._nth(c__4650__auto__,i__82949);
var outcome_key = (plot_order.cljs$core$IFn$_invoke$arity$1 ? plot_order.cljs$core$IFn$_invoke$arity$1(k) : plot_order.call(null,k));
var outcome = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"outcomes","outcomes",-2034044865),outcome_key], null));
cljs.core.chunk_append(b__82950,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["outk-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)].join(''),new cljs.core.Keyword(null,"transform","transform",1381301764),["translate (",cljs.core.str.cljs$core$IFn$_invoke$arity$1((10)),", ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(((k * (25)) + (20))),")"].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.vis2.h_and_s,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"scale","scale",-230427353),(2),new cljs.core.Keyword(null,"fill","fill",883462889),new cljs.core.Keyword(null,"fill","fill",883462889).cljs$core$IFn$_invoke$arity$1(outcome)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",-1790561697),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"transform","transform",1381301764),"translate(30,15)"], null),[cljs.core.str.cljs$core$IFn$_invoke$arity$1((int_fs.cljs$core$IFn$_invoke$arity$1 ? int_fs.cljs$core$IFn$_invoke$arity$1(k) : int_fs.call(null,k)))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"label","label",1718410804).cljs$core$IFn$_invoke$arity$1(outcome))].join('')], null)], null));

var G__83150 = (i__82949 + (1));
i__82949 = G__83150;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__82950),transplants$vis2$stacked_icon_array_$_iter__82923_$_iter__82947(cljs.core.chunk_rest(s__82948__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__82950),null);
}
} else {
var k = cljs.core.first(s__82948__$2);
var outcome_key = (plot_order.cljs$core$IFn$_invoke$arity$1 ? plot_order.cljs$core$IFn$_invoke$arity$1(k) : plot_order.call(null,k));
var outcome = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(tool_mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"outcomes","outcomes",-2034044865),outcome_key], null));
return cljs.core.cons(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["outk-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(k)].join(''),new cljs.core.Keyword(null,"transform","transform",1381301764),["translate (",cljs.core.str.cljs$core$IFn$_invoke$arity$1((10)),", ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(((k * (25)) + (20))),")"].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.vis2.h_and_s,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"scale","scale",-230427353),(2),new cljs.core.Keyword(null,"fill","fill",883462889),new cljs.core.Keyword(null,"fill","fill",883462889).cljs$core$IFn$_invoke$arity$1(outcome)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",-1790561697),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"transform","transform",1381301764),"translate(30,15)"], null),[cljs.core.str.cljs$core$IFn$_invoke$arity$1((int_fs.cljs$core$IFn$_invoke$arity$1 ? int_fs.cljs$core$IFn$_invoke$arity$1(k) : int_fs.call(null,k)))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"label","label",1718410804).cljs$core$IFn$_invoke$arity$1(outcome))].join('')], null)], null),transplants$vis2$stacked_icon_array_$_iter__82923_$_iter__82947(cljs.core.rest(s__82948__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__4652__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(plot_order)));
})()], null),(function (){var iter__4652__auto__ = (function transplants$vis2$stacked_icon_array_$_iter__82923_$_iter__82951(s__82952){
return (new cljs.core.LazySeq(null,(function (){
var s__82952__$1 = s__82952;
while(true){
var temp__5753__auto____$1 = cljs.core.seq(s__82952__$1);
if(temp__5753__auto____$1){
var xs__6308__auto__ = temp__5753__auto____$1;
var i__$1 = cljs.core.first(xs__6308__auto__);
var iterys__4648__auto__ = ((function (s__82952__$1,i__$1,xs__6308__auto__,temp__5753__auto____$1,label,time_index,vec__82943,___$1,map__82946,map__82946__$1,int_fs,cum_int_fs,i,s__82924__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order){
return (function transplants$vis2$stacked_icon_array_$_iter__82923_$_iter__82951_$_iter__82953(s__82954){
return (new cljs.core.LazySeq(null,((function (s__82952__$1,i__$1,xs__6308__auto__,temp__5753__auto____$1,label,time_index,vec__82943,___$1,map__82946,map__82946__$1,int_fs,cum_int_fs,i,s__82924__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order){
return (function (){
var s__82954__$1 = s__82954;
while(true){
var temp__5753__auto____$2 = cljs.core.seq(s__82954__$1);
if(temp__5753__auto____$2){
var s__82954__$2 = temp__5753__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__82954__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__82954__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__82956 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__82955 = (0);
while(true){
if((i__82955 < size__4651__auto__)){
var j = cljs.core._nth(c__4650__auto__,i__82955);
var ordinal = (function (){var G__82957 = (j + ((10) * i__$1));
return (icon_order.cljs$core$IFn$_invoke$arity$1 ? icon_order.cljs$core$IFn$_invoke$arity$1(G__82957) : icon_order.call(null,G__82957));
})();
cljs.core.chunk_append(b__82956,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["i-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(j),"-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i__$1)].join(''),new cljs.core.Keyword(null,"transform","transform",1381301764),["translate(",cljs.core.str.cljs$core$IFn$_invoke$arity$1(((300) + (j * (22))))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(((20) + (i__$1 * (22)))),")"].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.vis2.h_and_s,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"scale","scale",-230427353),(2),new cljs.core.Keyword(null,"fill","fill",883462889),new cljs.core.Keyword(null,"fill","fill",883462889).cljs$core$IFn$_invoke$arity$1(transplants.vis2.ordinal_mdata(ordinal,cum_int_fs,tool_mdata))], null)], null)], null));

var G__83154 = (i__82955 + (1));
i__82955 = G__83154;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__82956),transplants$vis2$stacked_icon_array_$_iter__82923_$_iter__82951_$_iter__82953(cljs.core.chunk_rest(s__82954__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__82956),null);
}
} else {
var j = cljs.core.first(s__82954__$2);
var ordinal = (function (){var G__82958 = (j + ((10) * i__$1));
return (icon_order.cljs$core$IFn$_invoke$arity$1 ? icon_order.cljs$core$IFn$_invoke$arity$1(G__82958) : icon_order.call(null,G__82958));
})();
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"g","g",1738089905),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["i-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(j),"-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i__$1)].join(''),new cljs.core.Keyword(null,"transform","transform",1381301764),["translate(",cljs.core.str.cljs$core$IFn$_invoke$arity$1(((300) + (j * (22))))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(((20) + (i__$1 * (22)))),")"].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.vis2.h_and_s,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"scale","scale",-230427353),(2),new cljs.core.Keyword(null,"fill","fill",883462889),new cljs.core.Keyword(null,"fill","fill",883462889).cljs$core$IFn$_invoke$arity$1(transplants.vis2.ordinal_mdata(ordinal,cum_int_fs,tool_mdata))], null)], null)], null),transplants$vis2$stacked_icon_array_$_iter__82923_$_iter__82951_$_iter__82953(cljs.core.rest(s__82954__$2)));
}
} else {
return null;
}
break;
}
});})(s__82952__$1,i__$1,xs__6308__auto__,temp__5753__auto____$1,label,time_index,vec__82943,___$1,map__82946,map__82946__$1,int_fs,cum_int_fs,i,s__82924__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order))
,null,null));
});})(s__82952__$1,i__$1,xs__6308__auto__,temp__5753__auto____$1,label,time_index,vec__82943,___$1,map__82946,map__82946__$1,int_fs,cum_int_fs,i,s__82924__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order))
;
var fs__4649__auto__ = cljs.core.seq(iterys__4648__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1((10))));
if(fs__4649__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__4649__auto__,transplants$vis2$stacked_icon_array_$_iter__82923_$_iter__82951(cljs.core.rest(s__82952__$1)));
} else {
var G__83155 = cljs.core.rest(s__82952__$1);
s__82952__$1 = G__83155;
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
});})(label,time_index,vec__82943,___$1,map__82946,map__82946__$1,int_fs,cum_int_fs,i,s__82924__$2,temp__5753__auto__,svg_width,svg_height,plot_order,labels,icon_order))
], null)], null)], null),transplants$vis2$stacked_icon_array_$_iter__82923(cljs.core.rest(s__82924__$2)));
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
if(cljs.core.not_any_QMARK_((function (p1__82959_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(item,p1__82959_SHARP_);
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
transplants.vis2.icon_array = (function transplants$vis2$icon_array(p__82960){
var map__82961 = p__82960;
var map__82961__$1 = cljs.core.__destructure_map(map__82961);
var env = map__82961__$1;
var organ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82961__$1,new cljs.core.Keyword(null,"organ","organ",-29862572));
var tool = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82961__$1,new cljs.core.Keyword(null,"tool","tool",-1298696470));
var base_outcome_keys = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82961__$1,new cljs.core.Keyword(null,"base-outcome-keys","base-outcome-keys",519744091));
var s0 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82961__$1,new cljs.core.Keyword(null,"s0","s0",-350711836));
var F = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82961__$1,new cljs.core.Keyword(null,"F","F",-1115543258));
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
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,">",">",-555517146),module$node_modules$react_bootstrap$cjs$index.Table,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"margin-top","margin-top",392161226),(20),new cljs.core.Keyword(null,"border","border",1444987323),"3px solid #666"], null),new cljs.core.Keyword(null,"responsive","responsive",-1606632318),"xl",new cljs.core.Keyword(null,"bordered","bordered",-832486681),true], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"thead","thead",-291875296),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),(function (){var iter__4652__auto__ = (function transplants$vis2$table_render_$_iter__82962(s__82963){
return (new cljs.core.LazySeq(null,(function (){
var s__82963__$1 = s__82963;
while(true){
var temp__5753__auto__ = cljs.core.seq(s__82963__$1);
if(temp__5753__auto__){
var s__82963__$2 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(s__82963__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__82963__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__82965 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__82964 = (0);
while(true){
if((i__82964 < size__4651__auto__)){
var i = cljs.core._nth(c__4650__auto__,i__82964);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(labels,i);
var line = new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(label);
var line__$1 = ((cljs.core.sequential_QMARK_(line))?cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.str,line):line);
cljs.core.chunk_append(b__82965,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"border-bottom","border-bottom",2110948415),"3px solid #666"], null),new cljs.core.Keyword(null,"key","key",-1516042587),["y-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join('')], null),line__$1], null));

var G__83156 = (i__82964 + (1));
i__82964 = G__83156;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__82965),transplants$vis2$table_render_$_iter__82962(cljs.core.chunk_rest(s__82963__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__82965),null);
}
} else {
var i = cljs.core.first(s__82963__$2);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(labels,i);
var line = new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(label);
var line__$1 = ((cljs.core.sequential_QMARK_(line))?cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.str,line):line);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"border-bottom","border-bottom",2110948415),"3px solid #666"], null),new cljs.core.Keyword(null,"key","key",-1516042587),["y-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join('')], null),line__$1], null),transplants$vis2$table_render_$_iter__82962(cljs.core.rest(s__82963__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__4652__auto__(years);
})()], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tbody","tbody",-80678300),(function (){var iter__4652__auto__ = (function transplants$vis2$table_render_$_iter__82966(s__82967){
return (new cljs.core.LazySeq(null,(function (){
var s__82967__$1 = s__82967;
while(true){
var temp__5753__auto__ = cljs.core.seq(s__82967__$1);
if(temp__5753__auto__){
var s__82967__$2 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(s__82967__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__82967__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__82969 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__82968 = (0);
while(true){
if((i__82968 < size__4651__auto__)){
var j = cljs.core._nth(c__4650__auto__,i__82968);
var style = (function (){var fexpr__82970 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(plot_order,j);
return (fexpr__82970.cljs$core$IFn$_invoke$arity$1 ? fexpr__82970.cljs$core$IFn$_invoke$arity$1(data_styles) : fexpr__82970.call(null,data_styles));
})();
var long_label = new cljs.core.Keyword(null,"long-label","long-label",1242973664).cljs$core$IFn$_invoke$arity$1(style);
cljs.core.chunk_append(b__82969,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["c-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(j)].join(''),new cljs.core.Keyword(null,"style","style",-496642736),style], null),(function (){var iter__4652__auto__ = ((function (i__82968,style,long_label,j,c__4650__auto__,size__4651__auto__,b__82969,s__82967__$2,temp__5753__auto__,labels,years){
return (function transplants$vis2$table_render_$_iter__82966_$_iter__82971(s__82972){
return (new cljs.core.LazySeq(null,((function (i__82968,style,long_label,j,c__4650__auto__,size__4651__auto__,b__82969,s__82967__$2,temp__5753__auto__,labels,years){
return (function (){
var s__82972__$1 = s__82972;
while(true){
var temp__5753__auto____$1 = cljs.core.seq(s__82972__$1);
if(temp__5753__auto____$1){
var s__82972__$2 = temp__5753__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__82972__$2)){
var c__4650__auto____$1 = cljs.core.chunk_first(s__82972__$2);
var size__4651__auto____$1 = cljs.core.count(c__4650__auto____$1);
var b__82974 = cljs.core.chunk_buffer(size__4651__auto____$1);
if((function (){var i__82973 = (0);
while(true){
if((i__82973 < size__4651__auto____$1)){
var i = cljs.core._nth(c__4650__auto____$1,i__82973);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(labels,i);
var time_index = new cljs.core.Keyword(null,"time-index","time-index",1670884208).cljs$core$IFn$_invoke$arity$1(label);
var vec__82975 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(year_series,time_index);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82975,(0),null);
var map__82978 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82975,(1),null);
var map__82978__$1 = cljs.core.__destructure_map(map__82978);
var int_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82978__$1,new cljs.core.Keyword(null,"int-fs","int-fs",1685464335));
cljs.core.chunk_append(b__82974,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["r-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join('')], null),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(int_fs,j)),"%"].join('')," ",long_label], null));

var G__83157 = (i__82973 + (1));
i__82973 = G__83157;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__82974),transplants$vis2$table_render_$_iter__82966_$_iter__82971(cljs.core.chunk_rest(s__82972__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__82974),null);
}
} else {
var i = cljs.core.first(s__82972__$2);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(labels,i);
var time_index = new cljs.core.Keyword(null,"time-index","time-index",1670884208).cljs$core$IFn$_invoke$arity$1(label);
var vec__82979 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(year_series,time_index);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82979,(0),null);
var map__82982 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82979,(1),null);
var map__82982__$1 = cljs.core.__destructure_map(map__82982);
var int_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82982__$1,new cljs.core.Keyword(null,"int-fs","int-fs",1685464335));
return cljs.core.cons(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["r-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join('')], null),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(int_fs,j)),"%"].join('')," ",long_label], null),transplants$vis2$table_render_$_iter__82966_$_iter__82971(cljs.core.rest(s__82972__$2)));
}
} else {
return null;
}
break;
}
});})(i__82968,style,long_label,j,c__4650__auto__,size__4651__auto__,b__82969,s__82967__$2,temp__5753__auto__,labels,years))
,null,null));
});})(i__82968,style,long_label,j,c__4650__auto__,size__4651__auto__,b__82969,s__82967__$2,temp__5753__auto__,labels,years))
;
return iter__4652__auto__(years);
})()], null));

var G__83162 = (i__82968 + (1));
i__82968 = G__83162;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__82969),transplants$vis2$table_render_$_iter__82966(cljs.core.chunk_rest(s__82967__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__82969),null);
}
} else {
var j = cljs.core.first(s__82967__$2);
var style = (function (){var fexpr__82983 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(plot_order,j);
return (fexpr__82983.cljs$core$IFn$_invoke$arity$1 ? fexpr__82983.cljs$core$IFn$_invoke$arity$1(data_styles) : fexpr__82983.call(null,data_styles));
})();
var long_label = new cljs.core.Keyword(null,"long-label","long-label",1242973664).cljs$core$IFn$_invoke$arity$1(style);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["c-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(j)].join(''),new cljs.core.Keyword(null,"style","style",-496642736),style], null),(function (){var iter__4652__auto__ = ((function (style,long_label,j,s__82967__$2,temp__5753__auto__,labels,years){
return (function transplants$vis2$table_render_$_iter__82966_$_iter__82984(s__82985){
return (new cljs.core.LazySeq(null,(function (){
var s__82985__$1 = s__82985;
while(true){
var temp__5753__auto____$1 = cljs.core.seq(s__82985__$1);
if(temp__5753__auto____$1){
var s__82985__$2 = temp__5753__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__82985__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__82985__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__82987 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__82986 = (0);
while(true){
if((i__82986 < size__4651__auto__)){
var i = cljs.core._nth(c__4650__auto__,i__82986);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(labels,i);
var time_index = new cljs.core.Keyword(null,"time-index","time-index",1670884208).cljs$core$IFn$_invoke$arity$1(label);
var vec__82988 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(year_series,time_index);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82988,(0),null);
var map__82991 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82988,(1),null);
var map__82991__$1 = cljs.core.__destructure_map(map__82991);
var int_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82991__$1,new cljs.core.Keyword(null,"int-fs","int-fs",1685464335));
cljs.core.chunk_append(b__82987,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["r-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join('')], null),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(int_fs,j)),"%"].join('')," ",long_label], null));

var G__83165 = (i__82986 + (1));
i__82986 = G__83165;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__82987),transplants$vis2$table_render_$_iter__82966_$_iter__82984(cljs.core.chunk_rest(s__82985__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__82987),null);
}
} else {
var i = cljs.core.first(s__82985__$2);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(labels,i);
var time_index = new cljs.core.Keyword(null,"time-index","time-index",1670884208).cljs$core$IFn$_invoke$arity$1(label);
var vec__82992 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(year_series,time_index);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82992,(0),null);
var map__82995 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82992,(1),null);
var map__82995__$1 = cljs.core.__destructure_map(map__82995);
var int_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82995__$1,new cljs.core.Keyword(null,"int-fs","int-fs",1685464335));
return cljs.core.cons(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["r-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join('')], null),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(int_fs,j)),"%"].join('')," ",long_label], null),transplants$vis2$table_render_$_iter__82966_$_iter__82984(cljs.core.rest(s__82985__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});})(style,long_label,j,s__82967__$2,temp__5753__auto__,labels,years))
;
return iter__4652__auto__(years);
})()], null),transplants$vis2$table_render_$_iter__82966(cljs.core.rest(s__82967__$2)));
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
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin-top","margin-top",392161226),(20)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),(function (){var iter__4652__auto__ = (function transplants$vis2$text_render_$_iter__82996(s__82997){
return (new cljs.core.LazySeq(null,(function (){
var s__82997__$1 = s__82997;
while(true){
var temp__5753__auto__ = cljs.core.seq(s__82997__$1);
if(temp__5753__auto__){
var s__82997__$2 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(s__82997__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__82997__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__82999 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__82998 = (0);
while(true){
if((i__82998 < size__4651__auto__)){
var i = cljs.core._nth(c__4650__auto__,i__82998);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(labels,i);
var line = new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(label);
var line__$1 = ((cljs.core.sequential_QMARK_(line))?cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.str,line):line);
cljs.core.chunk_append(b__82999,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["y-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join(''),new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin-bottom","margin-bottom",388334941),(20)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h4","h4",2004862993),line__$1], null),(function (){var iter__4652__auto__ = ((function (i__82998,label,line,line__$1,i,c__4650__auto__,size__4651__auto__,b__82999,s__82997__$2,temp__5753__auto__,labels,years){
return (function transplants$vis2$text_render_$_iter__82996_$_iter__83000(s__83001){
return (new cljs.core.LazySeq(null,((function (i__82998,label,line,line__$1,i,c__4650__auto__,size__4651__auto__,b__82999,s__82997__$2,temp__5753__auto__,labels,years){
return (function (){
var s__83001__$1 = s__83001;
while(true){
var temp__5753__auto____$1 = cljs.core.seq(s__83001__$1);
if(temp__5753__auto____$1){
var s__83001__$2 = temp__5753__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__83001__$2)){
var c__4650__auto____$1 = cljs.core.chunk_first(s__83001__$2);
var size__4651__auto____$1 = cljs.core.count(c__4650__auto____$1);
var b__83003 = cljs.core.chunk_buffer(size__4651__auto____$1);
if((function (){var i__83002 = (0);
while(true){
if((i__83002 < size__4651__auto____$1)){
var j = cljs.core._nth(c__4650__auto____$1,i__83002);
var style = (function (){var fexpr__83004 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(plot_order,j);
return (fexpr__83004.cljs$core$IFn$_invoke$arity$1 ? fexpr__83004.cljs$core$IFn$_invoke$arity$1(data_styles) : fexpr__83004.call(null,data_styles));
})();
var long_label = new cljs.core.Keyword(null,"long-label","long-label",1242973664).cljs$core$IFn$_invoke$arity$1(style);
cljs.core.chunk_append(b__83003,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["c-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(j)].join('')], null),(function (){var label__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(labels,i);
var time_index = new cljs.core.Keyword(null,"time-index","time-index",1670884208).cljs$core$IFn$_invoke$arity$1(label__$1);
var vec__83005 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(year_series,time_index);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83005,(0),null);
var map__83008 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83005,(1),null);
var map__83008__$1 = cljs.core.__destructure_map(map__83008);
var int_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__83008__$1,new cljs.core.Keyword(null,"int-fs","int-fs",1685464335));
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["r-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join('')], null),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(int_fs,j))," ",long_label], null);
})()], null));

var G__83166 = (i__83002 + (1));
i__83002 = G__83166;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__83003),transplants$vis2$text_render_$_iter__82996_$_iter__83000(cljs.core.chunk_rest(s__83001__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__83003),null);
}
} else {
var j = cljs.core.first(s__83001__$2);
var style = (function (){var fexpr__83009 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(plot_order,j);
return (fexpr__83009.cljs$core$IFn$_invoke$arity$1 ? fexpr__83009.cljs$core$IFn$_invoke$arity$1(data_styles) : fexpr__83009.call(null,data_styles));
})();
var long_label = new cljs.core.Keyword(null,"long-label","long-label",1242973664).cljs$core$IFn$_invoke$arity$1(style);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["c-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(j)].join('')], null),(function (){var label__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(labels,i);
var time_index = new cljs.core.Keyword(null,"time-index","time-index",1670884208).cljs$core$IFn$_invoke$arity$1(label__$1);
var vec__83010 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(year_series,time_index);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83010,(0),null);
var map__83013 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83010,(1),null);
var map__83013__$1 = cljs.core.__destructure_map(map__83013);
var int_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__83013__$1,new cljs.core.Keyword(null,"int-fs","int-fs",1685464335));
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["r-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join('')], null),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(int_fs,j))," ",long_label], null);
})()], null),transplants$vis2$text_render_$_iter__82996_$_iter__83000(cljs.core.rest(s__83001__$2)));
}
} else {
return null;
}
break;
}
});})(i__82998,label,line,line__$1,i,c__4650__auto__,size__4651__auto__,b__82999,s__82997__$2,temp__5753__auto__,labels,years))
,null,null));
});})(i__82998,label,line,line__$1,i,c__4650__auto__,size__4651__auto__,b__82999,s__82997__$2,temp__5753__auto__,labels,years))
;
return iter__4652__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(plot_order)));
})()], null));

var G__83167 = (i__82998 + (1));
i__82998 = G__83167;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__82999),transplants$vis2$text_render_$_iter__82996(cljs.core.chunk_rest(s__82997__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__82999),null);
}
} else {
var i = cljs.core.first(s__82997__$2);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(labels,i);
var line = new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(label);
var line__$1 = ((cljs.core.sequential_QMARK_(line))?cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.str,line):line);
return cljs.core.cons(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["y-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join(''),new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin-bottom","margin-bottom",388334941),(20)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h4","h4",2004862993),line__$1], null),(function (){var iter__4652__auto__ = ((function (label,line,line__$1,i,s__82997__$2,temp__5753__auto__,labels,years){
return (function transplants$vis2$text_render_$_iter__82996_$_iter__83014(s__83015){
return (new cljs.core.LazySeq(null,(function (){
var s__83015__$1 = s__83015;
while(true){
var temp__5753__auto____$1 = cljs.core.seq(s__83015__$1);
if(temp__5753__auto____$1){
var s__83015__$2 = temp__5753__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__83015__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__83015__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__83017 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__83016 = (0);
while(true){
if((i__83016 < size__4651__auto__)){
var j = cljs.core._nth(c__4650__auto__,i__83016);
var style = (function (){var fexpr__83018 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(plot_order,j);
return (fexpr__83018.cljs$core$IFn$_invoke$arity$1 ? fexpr__83018.cljs$core$IFn$_invoke$arity$1(data_styles) : fexpr__83018.call(null,data_styles));
})();
var long_label = new cljs.core.Keyword(null,"long-label","long-label",1242973664).cljs$core$IFn$_invoke$arity$1(style);
cljs.core.chunk_append(b__83017,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["c-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(j)].join('')], null),(function (){var label__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(labels,i);
var time_index = new cljs.core.Keyword(null,"time-index","time-index",1670884208).cljs$core$IFn$_invoke$arity$1(label__$1);
var vec__83019 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(year_series,time_index);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83019,(0),null);
var map__83022 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83019,(1),null);
var map__83022__$1 = cljs.core.__destructure_map(map__83022);
var int_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__83022__$1,new cljs.core.Keyword(null,"int-fs","int-fs",1685464335));
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["r-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join('')], null),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(int_fs,j))," ",long_label], null);
})()], null));

var G__83168 = (i__83016 + (1));
i__83016 = G__83168;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__83017),transplants$vis2$text_render_$_iter__82996_$_iter__83014(cljs.core.chunk_rest(s__83015__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__83017),null);
}
} else {
var j = cljs.core.first(s__83015__$2);
var style = (function (){var fexpr__83023 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(plot_order,j);
return (fexpr__83023.cljs$core$IFn$_invoke$arity$1 ? fexpr__83023.cljs$core$IFn$_invoke$arity$1(data_styles) : fexpr__83023.call(null,data_styles));
})();
var long_label = new cljs.core.Keyword(null,"long-label","long-label",1242973664).cljs$core$IFn$_invoke$arity$1(style);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["c-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(j)].join('')], null),(function (){var label__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(labels,i);
var time_index = new cljs.core.Keyword(null,"time-index","time-index",1670884208).cljs$core$IFn$_invoke$arity$1(label__$1);
var vec__83024 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(year_series,time_index);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83024,(0),null);
var map__83027 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83024,(1),null);
var map__83027__$1 = cljs.core.__destructure_map(map__83027);
var int_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__83027__$1,new cljs.core.Keyword(null,"int-fs","int-fs",1685464335));
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["r-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join('')], null),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(int_fs,j))," ",long_label], null);
})()], null),transplants$vis2$text_render_$_iter__82996_$_iter__83014(cljs.core.rest(s__83015__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});})(label,line,line__$1,i,s__82997__$2,temp__5753__auto__,labels,years))
;
return iter__4652__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(plot_order)));
})()], null),transplants$vis2$text_render_$_iter__82996(cljs.core.rest(s__82997__$2)));
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
transplants.vis2.table = (function transplants$vis2$table(p__83028){
var map__83029 = p__83028;
var map__83029__$1 = cljs.core.__destructure_map(map__83029);
var env = map__83029__$1;
var organ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__83029__$1,new cljs.core.Keyword(null,"organ","organ",-29862572));
var tool = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__83029__$1,new cljs.core.Keyword(null,"tool","tool",-1298696470));
var base_outcome_keys = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__83029__$1,new cljs.core.Keyword(null,"base-outcome-keys","base-outcome-keys",519744091));
var s0 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__83029__$1,new cljs.core.Keyword(null,"s0","s0",-350711836));
var F = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__83029__$1,new cljs.core.Keyword(null,"F","F",-1115543258));
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
transplants.vis2.text = (function transplants$vis2$text(p__83030){
var map__83031 = p__83030;
var map__83031__$1 = cljs.core.__destructure_map(map__83031);
var env = map__83031__$1;
var organ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__83031__$1,new cljs.core.Keyword(null,"organ","organ",-29862572));
var tool = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__83031__$1,new cljs.core.Keyword(null,"tool","tool",-1298696470));
var base_outcome_keys = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__83031__$1,new cljs.core.Keyword(null,"base-outcome-keys","base-outcome-keys",519744091));
var s0 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__83031__$1,new cljs.core.Keyword(null,"s0","s0",-350711836));
var F = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__83031__$1,new cljs.core.Keyword(null,"F","F",-1115543258));
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
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin-top","margin-top",392161226),(20)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),(function (){var iter__4652__auto__ = (function transplants$vis2$test_render_$_iter__83032(s__83033){
return (new cljs.core.LazySeq(null,(function (){
var s__83033__$1 = s__83033;
while(true){
var temp__5753__auto__ = cljs.core.seq(s__83033__$1);
if(temp__5753__auto__){
var s__83033__$2 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(s__83033__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__83033__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__83035 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__83034 = (0);
while(true){
if((i__83034 < size__4651__auto__)){
var i = cljs.core._nth(c__4650__auto__,i__83034);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(labels,i);
var line = new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(label);
var line__$1 = ((cljs.core.sequential_QMARK_(line))?cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.str,line):line);
cljs.core.chunk_append(b__83035,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["y-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join(''),new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin-bottom","margin-bottom",388334941),(20)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h4","h4",2004862993),line__$1], null),(function (){var iter__4652__auto__ = ((function (i__83034,label,line,line__$1,i,c__4650__auto__,size__4651__auto__,b__83035,s__83033__$2,temp__5753__auto__,labels,years){
return (function transplants$vis2$test_render_$_iter__83032_$_iter__83036(s__83037){
return (new cljs.core.LazySeq(null,((function (i__83034,label,line,line__$1,i,c__4650__auto__,size__4651__auto__,b__83035,s__83033__$2,temp__5753__auto__,labels,years){
return (function (){
var s__83037__$1 = s__83037;
while(true){
var temp__5753__auto____$1 = cljs.core.seq(s__83037__$1);
if(temp__5753__auto____$1){
var s__83037__$2 = temp__5753__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__83037__$2)){
var c__4650__auto____$1 = cljs.core.chunk_first(s__83037__$2);
var size__4651__auto____$1 = cljs.core.count(c__4650__auto____$1);
var b__83039 = cljs.core.chunk_buffer(size__4651__auto____$1);
if((function (){var i__83038 = (0);
while(true){
if((i__83038 < size__4651__auto____$1)){
var j = cljs.core._nth(c__4650__auto____$1,i__83038);
var style = (function (){var fexpr__83040 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(plot_order,j);
return (fexpr__83040.cljs$core$IFn$_invoke$arity$1 ? fexpr__83040.cljs$core$IFn$_invoke$arity$1(data_styles) : fexpr__83040.call(null,data_styles));
})();
var long_label = new cljs.core.Keyword(null,"long-label","long-label",1242973664).cljs$core$IFn$_invoke$arity$1(style);
cljs.core.chunk_append(b__83039,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["c-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(j)].join('')], null),(function (){var label__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(labels,i);
var time_index = new cljs.core.Keyword(null,"time-index","time-index",1670884208).cljs$core$IFn$_invoke$arity$1(label__$1);
var vec__83041 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(year_series,time_index);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83041,(0),null);
var map__83044 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83041,(1),null);
var map__83044__$1 = cljs.core.__destructure_map(map__83044);
var int_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__83044__$1,new cljs.core.Keyword(null,"int-fs","int-fs",1685464335));
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["r-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join('')], null),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(int_fs,j))," ",long_label], null);
})()], null));

var G__83179 = (i__83038 + (1));
i__83038 = G__83179;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__83039),transplants$vis2$test_render_$_iter__83032_$_iter__83036(cljs.core.chunk_rest(s__83037__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__83039),null);
}
} else {
var j = cljs.core.first(s__83037__$2);
var style = (function (){var fexpr__83045 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(plot_order,j);
return (fexpr__83045.cljs$core$IFn$_invoke$arity$1 ? fexpr__83045.cljs$core$IFn$_invoke$arity$1(data_styles) : fexpr__83045.call(null,data_styles));
})();
var long_label = new cljs.core.Keyword(null,"long-label","long-label",1242973664).cljs$core$IFn$_invoke$arity$1(style);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["c-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(j)].join('')], null),(function (){var label__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(labels,i);
var time_index = new cljs.core.Keyword(null,"time-index","time-index",1670884208).cljs$core$IFn$_invoke$arity$1(label__$1);
var vec__83046 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(year_series,time_index);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83046,(0),null);
var map__83049 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83046,(1),null);
var map__83049__$1 = cljs.core.__destructure_map(map__83049);
var int_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__83049__$1,new cljs.core.Keyword(null,"int-fs","int-fs",1685464335));
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["r-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join('')], null),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(int_fs,j))," ",long_label], null);
})()], null),transplants$vis2$test_render_$_iter__83032_$_iter__83036(cljs.core.rest(s__83037__$2)));
}
} else {
return null;
}
break;
}
});})(i__83034,label,line,line__$1,i,c__4650__auto__,size__4651__auto__,b__83035,s__83033__$2,temp__5753__auto__,labels,years))
,null,null));
});})(i__83034,label,line,line__$1,i,c__4650__auto__,size__4651__auto__,b__83035,s__83033__$2,temp__5753__auto__,labels,years))
;
return iter__4652__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(plot_order)));
})()], null));

var G__83180 = (i__83034 + (1));
i__83034 = G__83180;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__83035),transplants$vis2$test_render_$_iter__83032(cljs.core.chunk_rest(s__83033__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__83035),null);
}
} else {
var i = cljs.core.first(s__83033__$2);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(labels,i);
var line = new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(label);
var line__$1 = ((cljs.core.sequential_QMARK_(line))?cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.str,line):line);
return cljs.core.cons(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),["y-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join(''),new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin-bottom","margin-bottom",388334941),(20)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h4","h4",2004862993),line__$1], null),(function (){var iter__4652__auto__ = ((function (label,line,line__$1,i,s__83033__$2,temp__5753__auto__,labels,years){
return (function transplants$vis2$test_render_$_iter__83032_$_iter__83050(s__83051){
return (new cljs.core.LazySeq(null,(function (){
var s__83051__$1 = s__83051;
while(true){
var temp__5753__auto____$1 = cljs.core.seq(s__83051__$1);
if(temp__5753__auto____$1){
var s__83051__$2 = temp__5753__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__83051__$2)){
var c__4650__auto__ = cljs.core.chunk_first(s__83051__$2);
var size__4651__auto__ = cljs.core.count(c__4650__auto__);
var b__83053 = cljs.core.chunk_buffer(size__4651__auto__);
if((function (){var i__83052 = (0);
while(true){
if((i__83052 < size__4651__auto__)){
var j = cljs.core._nth(c__4650__auto__,i__83052);
var style = (function (){var fexpr__83054 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(plot_order,j);
return (fexpr__83054.cljs$core$IFn$_invoke$arity$1 ? fexpr__83054.cljs$core$IFn$_invoke$arity$1(data_styles) : fexpr__83054.call(null,data_styles));
})();
var long_label = new cljs.core.Keyword(null,"long-label","long-label",1242973664).cljs$core$IFn$_invoke$arity$1(style);
cljs.core.chunk_append(b__83053,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["c-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(j)].join('')], null),(function (){var label__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(labels,i);
var time_index = new cljs.core.Keyword(null,"time-index","time-index",1670884208).cljs$core$IFn$_invoke$arity$1(label__$1);
var vec__83055 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(year_series,time_index);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83055,(0),null);
var map__83058 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83055,(1),null);
var map__83058__$1 = cljs.core.__destructure_map(map__83058);
var int_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__83058__$1,new cljs.core.Keyword(null,"int-fs","int-fs",1685464335));
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["r-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join('')], null),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(int_fs,j))," ",long_label], null);
})()], null));

var G__83181 = (i__83052 + (1));
i__83052 = G__83181;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__83053),transplants$vis2$test_render_$_iter__83032_$_iter__83050(cljs.core.chunk_rest(s__83051__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__83053),null);
}
} else {
var j = cljs.core.first(s__83051__$2);
var style = (function (){var fexpr__83059 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(plot_order,j);
return (fexpr__83059.cljs$core$IFn$_invoke$arity$1 ? fexpr__83059.cljs$core$IFn$_invoke$arity$1(data_styles) : fexpr__83059.call(null,data_styles));
})();
var long_label = new cljs.core.Keyword(null,"long-label","long-label",1242973664).cljs$core$IFn$_invoke$arity$1(style);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["c-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(j)].join('')], null),(function (){var label__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(labels,i);
var time_index = new cljs.core.Keyword(null,"time-index","time-index",1670884208).cljs$core$IFn$_invoke$arity$1(label__$1);
var vec__83060 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(year_series,time_index);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83060,(0),null);
var map__83063 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83060,(1),null);
var map__83063__$1 = cljs.core.__destructure_map(map__83063);
var int_fs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__83063__$1,new cljs.core.Keyword(null,"int-fs","int-fs",1685464335));
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["r-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(i)].join('')], null),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(int_fs,j))," ",long_label], null);
})()], null),transplants$vis2$test_render_$_iter__83032_$_iter__83050(cljs.core.rest(s__83051__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});})(label,line,line__$1,i,s__83033__$2,temp__5753__auto__,labels,years))
;
return iter__4652__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(plot_order)));
})()], null),transplants$vis2$test_render_$_iter__83032(cljs.core.rest(s__83033__$2)));
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
transplants.vis2.test_gen = (function transplants$vis2$test_gen(p__83064){
var map__83065 = p__83064;
var map__83065__$1 = cljs.core.__destructure_map(map__83065);
var env = map__83065__$1;
var organ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__83065__$1,new cljs.core.Keyword(null,"organ","organ",-29862572));
var tool = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__83065__$1,new cljs.core.Keyword(null,"tool","tool",-1298696470));
var base_outcome_keys = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__83065__$1,new cljs.core.Keyword(null,"base-outcome-keys","base-outcome-keys",519744091));
var s0 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__83065__$1,new cljs.core.Keyword(null,"s0","s0",-350711836));
var F = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__83065__$1,new cljs.core.Keyword(null,"F","F",-1115543258));
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
