goog.provide('transplants.paths');
transplants.paths.slash = "/";
transplants.paths.prefix = (function transplants$paths$prefix(organ){
return [cljs.core.name(organ),transplants.paths.slash,"edn",transplants.paths.slash].join('');
});
transplants.paths.metadata_path = [transplants.paths.slash,"metadata.edn"].join('');
transplants.paths.tools_path = (function transplants$paths$tools_path(organ){
return [transplants.paths.prefix(organ),"tools.txt"].join('');
});
transplants.paths.centres_path = (function transplants$paths$centres_path(organ){
return [transplants.paths.prefix(organ),"centres.txt"].join('');
});
/**
 * return a pathname for tool data, else nil
 */
transplants.paths.organ_centre_name_tool = (function transplants$paths$organ_centre_name_tool(organ,centre_name,tool){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("transplants.paths","tool","transplants.paths/tool",-828261318),tool], 0));

var tool_name = transplants.shared.underscore(cljs.core.name(tool));
var path = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(tool_name,"guidance"))?null:(cljs.core.truth_((function (){var fexpr__81409 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["ldgraft",null,"ldsurvival",null], null), null);
return (fexpr__81409.cljs$core$IFn$_invoke$arity$1 ? fexpr__81409.cljs$core$IFn$_invoke$arity$1(tool_name) : fexpr__81409.call(null,tool_name));
})())?[transplants.paths.prefix(organ),"UK",transplants.paths.slash,tool_name,".txt"].join(''):[transplants.paths.prefix(organ),transplants.shared.underscore(centre_name),transplants.paths.slash,tool_name,".txt"].join('')
));
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("transplants.paths","organ-centre-name-tool","transplants.paths/organ-centre-name-tool",1079778566),"path=",path], 0));

return path;
});

//# sourceMappingURL=transplants.paths.js.map
