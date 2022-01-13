goog.provide('transplants.core');
cljs.core.enable_console_print_BANG_();
transplants.core.debug_QMARK_ = goog.DEBUG;
transplants.core.dev_setup = (function transplants$core$dev_setup(){
if(transplants.core.debug_QMARK_){
return cljs.core.enable_console_print_BANG_();
} else {
return null;
}
});
/**
 * Mount components and start the reitit router. The :dev/after-load meta-data causes
 * shadow-cljs to call mount-root after a hot-reload and clear the subsciption cache so
 * everything gets updated nicely.
 */
transplants.core.mount_root = (function transplants$core$mount_root(){
re_frame.core.clear_subscription_cache_BANG_();

transplants.routes.init_routes_BANG_();

return reagent.dom.render.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [error_boundary.error_boundary.err_boundary,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.ui.root_component,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"router","router",1091916230),transplants.routes.router,new cljs.core.Keyword(null,"subscribe-current-route","subscribe-current-route",1017696218),(function (){
return re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.subs","current-route","transplants.subs/current-route",1078262869)], null));
})], null)], null)], null),document.getElementById("app"));
});
/**
 * Handle window-size change by dispatching new width to db
 */
transplants.core.on_window_resize = (function transplants$core$on_window_resize(_evt){
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.events","update-window-width","transplants.events/update-window-width",378025084),window.innerWidth], null));
});
/**
 * Initialise the database, sense window-width, and mount root of component tree. 
 * 
 * We're breaking the rules slightly as this is an :afer-load function, which shadow-cljs docs 
 * say must be synchronous. However the parts that need to be synchronous here are, and we 
 * let the UI display a 'loading' state till the async dispatches complete. 
 * 
 * If we coded this up as an :after-load-async function we'd need to provide a `done` function 
 * to call on completion. Meanwhile, the UI would be dead.
 * 
 */
transplants.core.init = (function transplants$core$init(){
re_frame.core.dispatch_sync(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.events","initialize-db","transplants.events/initialize-db",784483349)], null));

re_frame.core.dispatch_sync(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("transplants.events","load-metadata","transplants.events/load-metadata",34724586),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.paths.metadata_path,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"metadata","metadata",1799301597)], null)], null)], null));

window.addEventListener("resize",transplants.core.on_window_resize);

transplants.core.dev_setup();

return transplants.core.mount_root();
});
goog.exportSymbol('transplants.core.init', transplants.core.init);
/**
 * Entry point for the lung app
 */
transplants.core.lung_init = (function transplants$core$lung_init(){
console.log("LUNG");

return transplants.core.init();
});
goog.exportSymbol('transplants.core.lung_init', transplants.core.lung_init);
/**
 * Entry point for the kidney app
 */
transplants.core.kidney_init = (function transplants$core$kidney_init(){
console.log("KIDNEY");

return transplants.core.init();
});
goog.exportSymbol('transplants.core.kidney_init', transplants.core.kidney_init);

//# sourceMappingURL=transplants.core.js.map
