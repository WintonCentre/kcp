goog.provide('cljs.core.async');
goog.scope(function(){
  cljs.core.async.goog$module$goog$array = goog.module.get('goog.array');
});
cljs.core.async.fn_handler = (function cljs$core$async$fn_handler(var_args){
var G__53661 = arguments.length;
switch (G__53661) {
case 1:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1 = (function (f){
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(f,true);
}));

(cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2 = (function (f,blockable){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async53663 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async53663 = (function (f,blockable,meta53664){
this.f = f;
this.blockable = blockable;
this.meta53664 = meta53664;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async53663.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_53665,meta53664__$1){
var self__ = this;
var _53665__$1 = this;
return (new cljs.core.async.t_cljs$core$async53663(self__.f,self__.blockable,meta53664__$1));
}));

(cljs.core.async.t_cljs$core$async53663.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_53665){
var self__ = this;
var _53665__$1 = this;
return self__.meta53664;
}));

(cljs.core.async.t_cljs$core$async53663.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async53663.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async53663.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.blockable;
}));

(cljs.core.async.t_cljs$core$async53663.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.f;
}));

(cljs.core.async.t_cljs$core$async53663.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"blockable","blockable",-28395259,null),new cljs.core.Symbol(null,"meta53664","meta53664",-1066284809,null)], null);
}));

(cljs.core.async.t_cljs$core$async53663.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async53663.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async53663");

(cljs.core.async.t_cljs$core$async53663.cljs$lang$ctorPrWriter = (function (this__4491__auto__,writer__4492__auto__,opt__4493__auto__){
return cljs.core._write(writer__4492__auto__,"cljs.core.async/t_cljs$core$async53663");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async53663.
 */
cljs.core.async.__GT_t_cljs$core$async53663 = (function cljs$core$async$__GT_t_cljs$core$async53663(f__$1,blockable__$1,meta53664){
return (new cljs.core.async.t_cljs$core$async53663(f__$1,blockable__$1,meta53664));
});

}

return (new cljs.core.async.t_cljs$core$async53663(f,blockable,cljs.core.PersistentArrayMap.EMPTY));
}));

(cljs.core.async.fn_handler.cljs$lang$maxFixedArity = 2);

/**
 * Returns a fixed buffer of size n. When full, puts will block/park.
 */
cljs.core.async.buffer = (function cljs$core$async$buffer(n){
return cljs.core.async.impl.buffers.fixed_buffer(n);
});
/**
 * Returns a buffer of size n. When full, puts will complete but
 *   val will be dropped (no transfer).
 */
cljs.core.async.dropping_buffer = (function cljs$core$async$dropping_buffer(n){
return cljs.core.async.impl.buffers.dropping_buffer(n);
});
/**
 * Returns a buffer of size n. When full, puts will complete, and be
 *   buffered, but oldest elements in buffer will be dropped (not
 *   transferred).
 */
cljs.core.async.sliding_buffer = (function cljs$core$async$sliding_buffer(n){
return cljs.core.async.impl.buffers.sliding_buffer(n);
});
/**
 * Returns true if a channel created with buff will never block. That is to say,
 * puts into this buffer will never cause the buffer to be full. 
 */
cljs.core.async.unblocking_buffer_QMARK_ = (function cljs$core$async$unblocking_buffer_QMARK_(buff){
if((!((buff == null)))){
if(((false) || ((cljs.core.PROTOCOL_SENTINEL === buff.cljs$core$async$impl$protocols$UnblockingBuffer$)))){
return true;
} else {
if((!buff.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_(cljs.core.async.impl.protocols.UnblockingBuffer,buff);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_(cljs.core.async.impl.protocols.UnblockingBuffer,buff);
}
});
/**
 * Creates a channel with an optional buffer, an optional transducer (like (map f),
 *   (filter p) etc or a composition thereof), and an optional exception handler.
 *   If buf-or-n is a number, will create and use a fixed buffer of that size. If a
 *   transducer is supplied a buffer must be specified. ex-handler must be a
 *   fn of one argument - if an exception occurs during transformation it will be called
 *   with the thrown value as an argument, and any non-nil return value will be placed
 *   in the channel.
 */
cljs.core.async.chan = (function cljs$core$async$chan(var_args){
var G__53674 = arguments.length;
switch (G__53674) {
case 0:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(null);
}));

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1 = (function (buf_or_n){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(buf_or_n,null,null);
}));

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2 = (function (buf_or_n,xform){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(buf_or_n,xform,null);
}));

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3 = (function (buf_or_n,xform,ex_handler){
var buf_or_n__$1 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(buf_or_n,(0)))?null:buf_or_n);
if(cljs.core.truth_(xform)){
if(cljs.core.truth_(buf_or_n__$1)){
} else {
throw (new Error(["Assert failed: ","buffer must be supplied when transducer is","\n","buf-or-n"].join('')));
}
} else {
}

return cljs.core.async.impl.channels.chan.cljs$core$IFn$_invoke$arity$3(((typeof buf_or_n__$1 === 'number')?cljs.core.async.buffer(buf_or_n__$1):buf_or_n__$1),xform,ex_handler);
}));

(cljs.core.async.chan.cljs$lang$maxFixedArity = 3);

/**
 * Creates a promise channel with an optional transducer, and an optional
 *   exception-handler. A promise channel can take exactly one value that consumers
 *   will receive. Once full, puts complete but val is dropped (no transfer).
 *   Consumers will block until either a value is placed in the channel or the
 *   channel is closed. See chan for the semantics of xform and ex-handler.
 */
cljs.core.async.promise_chan = (function cljs$core$async$promise_chan(var_args){
var G__53682 = arguments.length;
switch (G__53682) {
case 0:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1(null);
}));

(cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1 = (function (xform){
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2(xform,null);
}));

(cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2 = (function (xform,ex_handler){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(cljs.core.async.impl.buffers.promise_buffer(),xform,ex_handler);
}));

(cljs.core.async.promise_chan.cljs$lang$maxFixedArity = 2);

/**
 * Returns a channel that will close after msecs
 */
cljs.core.async.timeout = (function cljs$core$async$timeout(msecs){
return cljs.core.async.impl.timers.timeout(msecs);
});
/**
 * takes a val from port. Must be called inside a (go ...) block. Will
 *   return nil if closed. Will park if nothing is available.
 *   Returns true unless port is already closed
 */
cljs.core.async._LT__BANG_ = (function cljs$core$async$_LT__BANG_(port){
throw (new Error("<! used not in (go ...) block"));
});
/**
 * Asynchronously takes a val from port, passing to fn1. Will pass nil
 * if closed. If on-caller? (default true) is true, and value is
 * immediately available, will call fn1 on calling thread.
 * Returns nil.
 */
cljs.core.async.take_BANG_ = (function cljs$core$async$take_BANG_(var_args){
var G__53691 = arguments.length;
switch (G__53691) {
case 2:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,fn1){
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3(port,fn1,true);
}));

(cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,fn1,on_caller_QMARK_){
var ret = cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(fn1));
if(cljs.core.truth_(ret)){
var val_55252 = cljs.core.deref(ret);
if(cljs.core.truth_(on_caller_QMARK_)){
(fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(val_55252) : fn1.call(null,val_55252));
} else {
cljs.core.async.impl.dispatch.run((function (){
return (fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(val_55252) : fn1.call(null,val_55252));
}));
}
} else {
}

return null;
}));

(cljs.core.async.take_BANG_.cljs$lang$maxFixedArity = 3);

cljs.core.async.nop = (function cljs$core$async$nop(_){
return null;
});
cljs.core.async.fhnop = cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(cljs.core.async.nop);
/**
 * puts a val into port. nil values are not allowed. Must be called
 *   inside a (go ...) block. Will park if no buffer space is available.
 *   Returns true unless port is already closed.
 */
cljs.core.async._GT__BANG_ = (function cljs$core$async$_GT__BANG_(port,val){
throw (new Error(">! used not in (go ...) block"));
});
/**
 * Asynchronously puts a val into port, calling fn1 (if supplied) when
 * complete. nil values are not allowed. Will throw if closed. If
 * on-caller? (default true) is true, and the put is immediately
 * accepted, will call fn1 on calling thread.  Returns nil.
 */
cljs.core.async.put_BANG_ = (function cljs$core$async$put_BANG_(var_args){
var G__53700 = arguments.length;
switch (G__53700) {
case 2:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,val){
var temp__5751__auto__ = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fhnop);
if(cljs.core.truth_(temp__5751__auto__)){
var ret = temp__5751__auto__;
return cljs.core.deref(ret);
} else {
return true;
}
}));

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,val,fn1){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4(port,val,fn1,true);
}));

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (port,val,fn1,on_caller_QMARK_){
var temp__5751__auto__ = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(fn1));
if(cljs.core.truth_(temp__5751__auto__)){
var retb = temp__5751__auto__;
var ret = cljs.core.deref(retb);
if(cljs.core.truth_(on_caller_QMARK_)){
(fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(ret) : fn1.call(null,ret));
} else {
cljs.core.async.impl.dispatch.run((function (){
return (fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(ret) : fn1.call(null,ret));
}));
}

return ret;
} else {
return true;
}
}));

(cljs.core.async.put_BANG_.cljs$lang$maxFixedArity = 4);

cljs.core.async.close_BANG_ = (function cljs$core$async$close_BANG_(port){
return cljs.core.async.impl.protocols.close_BANG_(port);
});
cljs.core.async.random_array = (function cljs$core$async$random_array(n){
var a = (new Array(n));
var n__4741__auto___55254 = n;
var x_55255 = (0);
while(true){
if((x_55255 < n__4741__auto___55254)){
(a[x_55255] = x_55255);

var G__55256 = (x_55255 + (1));
x_55255 = G__55256;
continue;
} else {
}
break;
}

cljs.core.async.goog$module$goog$array.shuffle(a);

return a;
});
cljs.core.async.alt_flag = (function cljs$core$async$alt_flag(){
var flag = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(true);
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async53701 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async53701 = (function (flag,meta53702){
this.flag = flag;
this.meta53702 = meta53702;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async53701.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_53703,meta53702__$1){
var self__ = this;
var _53703__$1 = this;
return (new cljs.core.async.t_cljs$core$async53701(self__.flag,meta53702__$1));
}));

(cljs.core.async.t_cljs$core$async53701.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_53703){
var self__ = this;
var _53703__$1 = this;
return self__.meta53702;
}));

(cljs.core.async.t_cljs$core$async53701.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async53701.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.deref(self__.flag);
}));

(cljs.core.async.t_cljs$core$async53701.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async53701.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.flag,null);

return true;
}));

(cljs.core.async.t_cljs$core$async53701.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"meta53702","meta53702",-924146712,null)], null);
}));

(cljs.core.async.t_cljs$core$async53701.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async53701.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async53701");

(cljs.core.async.t_cljs$core$async53701.cljs$lang$ctorPrWriter = (function (this__4491__auto__,writer__4492__auto__,opt__4493__auto__){
return cljs.core._write(writer__4492__auto__,"cljs.core.async/t_cljs$core$async53701");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async53701.
 */
cljs.core.async.__GT_t_cljs$core$async53701 = (function cljs$core$async$alt_flag_$___GT_t_cljs$core$async53701(flag__$1,meta53702){
return (new cljs.core.async.t_cljs$core$async53701(flag__$1,meta53702));
});

}

return (new cljs.core.async.t_cljs$core$async53701(flag,cljs.core.PersistentArrayMap.EMPTY));
});
cljs.core.async.alt_handler = (function cljs$core$async$alt_handler(flag,cb){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async53708 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async53708 = (function (flag,cb,meta53709){
this.flag = flag;
this.cb = cb;
this.meta53709 = meta53709;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async53708.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_53710,meta53709__$1){
var self__ = this;
var _53710__$1 = this;
return (new cljs.core.async.t_cljs$core$async53708(self__.flag,self__.cb,meta53709__$1));
}));

(cljs.core.async.t_cljs$core$async53708.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_53710){
var self__ = this;
var _53710__$1 = this;
return self__.meta53709;
}));

(cljs.core.async.t_cljs$core$async53708.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async53708.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.active_QMARK_(self__.flag);
}));

(cljs.core.async.t_cljs$core$async53708.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async53708.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.commit(self__.flag);

return self__.cb;
}));

(cljs.core.async.t_cljs$core$async53708.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null),new cljs.core.Symbol(null,"meta53709","meta53709",1765603367,null)], null);
}));

(cljs.core.async.t_cljs$core$async53708.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async53708.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async53708");

(cljs.core.async.t_cljs$core$async53708.cljs$lang$ctorPrWriter = (function (this__4491__auto__,writer__4492__auto__,opt__4493__auto__){
return cljs.core._write(writer__4492__auto__,"cljs.core.async/t_cljs$core$async53708");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async53708.
 */
cljs.core.async.__GT_t_cljs$core$async53708 = (function cljs$core$async$alt_handler_$___GT_t_cljs$core$async53708(flag__$1,cb__$1,meta53709){
return (new cljs.core.async.t_cljs$core$async53708(flag__$1,cb__$1,meta53709));
});

}

return (new cljs.core.async.t_cljs$core$async53708(flag,cb,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * returns derefable [val port] if immediate, nil if enqueued
 */
cljs.core.async.do_alts = (function cljs$core$async$do_alts(fret,ports,opts){
if((cljs.core.count(ports) > (0))){
} else {
throw (new Error(["Assert failed: ","alts must have at least one channel operation","\n","(pos? (count ports))"].join('')));
}

var flag = cljs.core.async.alt_flag();
var n = cljs.core.count(ports);
var idxs = cljs.core.async.random_array(n);
var priority = new cljs.core.Keyword(null,"priority","priority",1431093715).cljs$core$IFn$_invoke$arity$1(opts);
var ret = (function (){var i = (0);
while(true){
if((i < n)){
var idx = (cljs.core.truth_(priority)?i:(idxs[i]));
var port = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(ports,idx);
var wport = ((cljs.core.vector_QMARK_(port))?(port.cljs$core$IFn$_invoke$arity$1 ? port.cljs$core$IFn$_invoke$arity$1((0)) : port.call(null,(0))):null);
var vbox = (cljs.core.truth_(wport)?(function (){var val = (port.cljs$core$IFn$_invoke$arity$1 ? port.cljs$core$IFn$_invoke$arity$1((1)) : port.call(null,(1)));
return cljs.core.async.impl.protocols.put_BANG_(wport,val,cljs.core.async.alt_handler(flag,((function (i,val,idx,port,wport,flag,n,idxs,priority){
return (function (p1__53716_SHARP_){
var G__53719 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__53716_SHARP_,wport], null);
return (fret.cljs$core$IFn$_invoke$arity$1 ? fret.cljs$core$IFn$_invoke$arity$1(G__53719) : fret.call(null,G__53719));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.alt_handler(flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__53717_SHARP_){
var G__53721 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__53717_SHARP_,port], null);
return (fret.cljs$core$IFn$_invoke$arity$1 ? fret.cljs$core$IFn$_invoke$arity$1(G__53721) : fret.call(null,G__53721));
});})(i,idx,port,wport,flag,n,idxs,priority))
)));
if(cljs.core.truth_(vbox)){
return cljs.core.async.impl.channels.box(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref(vbox),(function (){var or__4253__auto__ = wport;
if(cljs.core.truth_(or__4253__auto__)){
return or__4253__auto__;
} else {
return port;
}
})()], null));
} else {
var G__55259 = (i + (1));
i = G__55259;
continue;
}
} else {
return null;
}
break;
}
})();
var or__4253__auto__ = ret;
if(cljs.core.truth_(or__4253__auto__)){
return or__4253__auto__;
} else {
if(cljs.core.contains_QMARK_(opts,new cljs.core.Keyword(null,"default","default",-1987822328))){
var temp__5753__auto__ = (function (){var and__4251__auto__ = flag.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1(null);
if(cljs.core.truth_(and__4251__auto__)){
return flag.cljs$core$async$impl$protocols$Handler$commit$arity$1(null);
} else {
return and__4251__auto__;
}
})();
if(cljs.core.truth_(temp__5753__auto__)){
var got = temp__5753__auto__;
return cljs.core.async.impl.channels.box(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"default","default",-1987822328).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"default","default",-1987822328)], null));
} else {
return null;
}
} else {
return null;
}
}
});
/**
 * Completes at most one of several channel operations. Must be called
 * inside a (go ...) block. ports is a vector of channel endpoints,
 * which can be either a channel to take from or a vector of
 *   [channel-to-put-to val-to-put], in any combination. Takes will be
 *   made as if by <!, and puts will be made as if by >!. Unless
 *   the :priority option is true, if more than one port operation is
 *   ready a non-deterministic choice will be made. If no operation is
 *   ready and a :default value is supplied, [default-val :default] will
 *   be returned, otherwise alts! will park until the first operation to
 *   become ready completes. Returns [val port] of the completed
 *   operation, where val is the value taken for takes, and a
 *   boolean (true unless already closed, as per put!) for puts.
 * 
 *   opts are passed as :key val ... Supported options:
 * 
 *   :default val - the value to use if none of the operations are immediately ready
 *   :priority true - (default nil) when true, the operations will be tried in order.
 * 
 *   Note: there is no guarantee that the port exps or val exprs will be
 *   used, nor in what order should they be, so they should not be
 *   depended upon for side effects.
 */
cljs.core.async.alts_BANG_ = (function cljs$core$async$alts_BANG_(var_args){
var args__4870__auto__ = [];
var len__4864__auto___55260 = arguments.length;
var i__4865__auto___55261 = (0);
while(true){
if((i__4865__auto___55261 < len__4864__auto___55260)){
args__4870__auto__.push((arguments[i__4865__auto___55261]));

var G__55262 = (i__4865__auto___55261 + (1));
i__4865__auto___55261 = G__55262;
continue;
} else {
}
break;
}

var argseq__4871__auto__ = ((((1) < args__4870__auto__.length))?(new cljs.core.IndexedSeq(args__4870__auto__.slice((1)),(0),null)):null);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4871__auto__);
});

(cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ports,p__53731){
var map__53732 = p__53731;
var map__53732__$1 = cljs.core.__destructure_map(map__53732);
var opts = map__53732__$1;
throw (new Error("alts! used not in (go ...) block"));
}));

(cljs.core.async.alts_BANG_.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(cljs.core.async.alts_BANG_.cljs$lang$applyTo = (function (seq53729){
var G__53730 = cljs.core.first(seq53729);
var seq53729__$1 = cljs.core.next(seq53729);
var self__4851__auto__ = this;
return self__4851__auto__.cljs$core$IFn$_invoke$arity$variadic(G__53730,seq53729__$1);
}));

/**
 * Puts a val into port if it's possible to do so immediately.
 *   nil values are not allowed. Never blocks. Returns true if offer succeeds.
 */
cljs.core.async.offer_BANG_ = (function cljs$core$async$offer_BANG_(port,val){
var ret = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref(ret);
} else {
return null;
}
});
/**
 * Takes a val from port if it's possible to do so immediately.
 *   Never blocks. Returns value if successful, nil otherwise.
 */
cljs.core.async.poll_BANG_ = (function cljs$core$async$poll_BANG_(port){
var ret = cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref(ret);
} else {
return null;
}
});
/**
 * Takes elements from the from channel and supplies them to the to
 * channel. By default, the to channel will be closed when the from
 * channel closes, but can be determined by the close?  parameter. Will
 * stop consuming the from channel if the to channel closes
 */
cljs.core.async.pipe = (function cljs$core$async$pipe(var_args){
var G__53734 = arguments.length;
switch (G__53734) {
case 2:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2 = (function (from,to){
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3(from,to,true);
}));

(cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3 = (function (from,to,close_QMARK_){
var c__41995__auto___55264 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__41996__auto__ = (function (){var switch__41902__auto__ = (function (state_53761){
var state_val_53762 = (state_53761[(1)]);
if((state_val_53762 === (7))){
var inst_53757 = (state_53761[(2)]);
var state_53761__$1 = state_53761;
var statearr_53763_55265 = state_53761__$1;
(statearr_53763_55265[(2)] = inst_53757);

(statearr_53763_55265[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53762 === (1))){
var state_53761__$1 = state_53761;
var statearr_53764_55266 = state_53761__$1;
(statearr_53764_55266[(2)] = null);

(statearr_53764_55266[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53762 === (4))){
var inst_53737 = (state_53761[(7)]);
var inst_53737__$1 = (state_53761[(2)]);
var inst_53738 = (inst_53737__$1 == null);
var state_53761__$1 = (function (){var statearr_53765 = state_53761;
(statearr_53765[(7)] = inst_53737__$1);

return statearr_53765;
})();
if(cljs.core.truth_(inst_53738)){
var statearr_53767_55267 = state_53761__$1;
(statearr_53767_55267[(1)] = (5));

} else {
var statearr_53768_55268 = state_53761__$1;
(statearr_53768_55268[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53762 === (13))){
var state_53761__$1 = state_53761;
var statearr_53769_55270 = state_53761__$1;
(statearr_53769_55270[(2)] = null);

(statearr_53769_55270[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53762 === (6))){
var inst_53737 = (state_53761[(7)]);
var state_53761__$1 = state_53761;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_53761__$1,(11),to,inst_53737);
} else {
if((state_val_53762 === (3))){
var inst_53759 = (state_53761[(2)]);
var state_53761__$1 = state_53761;
return cljs.core.async.impl.ioc_helpers.return_chan(state_53761__$1,inst_53759);
} else {
if((state_val_53762 === (12))){
var state_53761__$1 = state_53761;
var statearr_53772_55271 = state_53761__$1;
(statearr_53772_55271[(2)] = null);

(statearr_53772_55271[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53762 === (2))){
var state_53761__$1 = state_53761;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_53761__$1,(4),from);
} else {
if((state_val_53762 === (11))){
var inst_53750 = (state_53761[(2)]);
var state_53761__$1 = state_53761;
if(cljs.core.truth_(inst_53750)){
var statearr_53775_55272 = state_53761__$1;
(statearr_53775_55272[(1)] = (12));

} else {
var statearr_53776_55273 = state_53761__$1;
(statearr_53776_55273[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53762 === (9))){
var state_53761__$1 = state_53761;
var statearr_53779_55274 = state_53761__$1;
(statearr_53779_55274[(2)] = null);

(statearr_53779_55274[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53762 === (5))){
var state_53761__$1 = state_53761;
if(cljs.core.truth_(close_QMARK_)){
var statearr_53780_55275 = state_53761__$1;
(statearr_53780_55275[(1)] = (8));

} else {
var statearr_53781_55276 = state_53761__$1;
(statearr_53781_55276[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53762 === (14))){
var inst_53755 = (state_53761[(2)]);
var state_53761__$1 = state_53761;
var statearr_53782_55277 = state_53761__$1;
(statearr_53782_55277[(2)] = inst_53755);

(statearr_53782_55277[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53762 === (10))){
var inst_53744 = (state_53761[(2)]);
var state_53761__$1 = state_53761;
var statearr_53783_55278 = state_53761__$1;
(statearr_53783_55278[(2)] = inst_53744);

(statearr_53783_55278[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53762 === (8))){
var inst_53741 = cljs.core.async.close_BANG_(to);
var state_53761__$1 = state_53761;
var statearr_53784_55280 = state_53761__$1;
(statearr_53784_55280[(2)] = inst_53741);

(statearr_53784_55280[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__41903__auto__ = null;
var cljs$core$async$state_machine__41903__auto____0 = (function (){
var statearr_53789 = [null,null,null,null,null,null,null,null];
(statearr_53789[(0)] = cljs$core$async$state_machine__41903__auto__);

(statearr_53789[(1)] = (1));

return statearr_53789;
});
var cljs$core$async$state_machine__41903__auto____1 = (function (state_53761){
while(true){
var ret_value__41904__auto__ = (function (){try{while(true){
var result__41905__auto__ = switch__41902__auto__(state_53761);
if(cljs.core.keyword_identical_QMARK_(result__41905__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__41905__auto__;
}
break;
}
}catch (e53791){var ex__41906__auto__ = e53791;
var statearr_53792_55282 = state_53761;
(statearr_53792_55282[(2)] = ex__41906__auto__);


if(cljs.core.seq((state_53761[(4)]))){
var statearr_53793_55283 = state_53761;
(statearr_53793_55283[(1)] = cljs.core.first((state_53761[(4)])));

} else {
throw ex__41906__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41904__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__55284 = state_53761;
state_53761 = G__55284;
continue;
} else {
return ret_value__41904__auto__;
}
break;
}
});
cljs$core$async$state_machine__41903__auto__ = function(state_53761){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__41903__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__41903__auto____1.call(this,state_53761);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__41903__auto____0;
cljs$core$async$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__41903__auto____1;
return cljs$core$async$state_machine__41903__auto__;
})()
})();
var state__41997__auto__ = (function (){var statearr_53794 = f__41996__auto__();
(statearr_53794[(6)] = c__41995__auto___55264);

return statearr_53794;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__41997__auto__);
}));


return to;
}));

(cljs.core.async.pipe.cljs$lang$maxFixedArity = 3);

cljs.core.async.pipeline_STAR_ = (function cljs$core$async$pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,type){
if((n > (0))){
} else {
throw (new Error("Assert failed: (pos? n)"));
}

var jobs = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(n);
var results = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(n);
var process = (function (p__53803){
var vec__53804 = p__53803;
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53804,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53804,(1),null);
var job = vec__53804;
if((job == null)){
cljs.core.async.close_BANG_(results);

return null;
} else {
var res = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((1),xf,ex_handler);
var c__41995__auto___55285 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__41996__auto__ = (function (){var switch__41902__auto__ = (function (state_53811){
var state_val_53812 = (state_53811[(1)]);
if((state_val_53812 === (1))){
var state_53811__$1 = state_53811;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_53811__$1,(2),res,v);
} else {
if((state_val_53812 === (2))){
var inst_53808 = (state_53811[(2)]);
var inst_53809 = cljs.core.async.close_BANG_(res);
var state_53811__$1 = (function (){var statearr_53813 = state_53811;
(statearr_53813[(7)] = inst_53808);

return statearr_53813;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_53811__$1,inst_53809);
} else {
return null;
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____0 = (function (){
var statearr_53814 = [null,null,null,null,null,null,null,null];
(statearr_53814[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__);

(statearr_53814[(1)] = (1));

return statearr_53814;
});
var cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____1 = (function (state_53811){
while(true){
var ret_value__41904__auto__ = (function (){try{while(true){
var result__41905__auto__ = switch__41902__auto__(state_53811);
if(cljs.core.keyword_identical_QMARK_(result__41905__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__41905__auto__;
}
break;
}
}catch (e53815){var ex__41906__auto__ = e53815;
var statearr_53816_55288 = state_53811;
(statearr_53816_55288[(2)] = ex__41906__auto__);


if(cljs.core.seq((state_53811[(4)]))){
var statearr_53817_55289 = state_53811;
(statearr_53817_55289[(1)] = cljs.core.first((state_53811[(4)])));

} else {
throw ex__41906__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41904__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__55290 = state_53811;
state_53811 = G__55290;
continue;
} else {
return ret_value__41904__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__ = function(state_53811){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____1.call(this,state_53811);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__;
})()
})();
var state__41997__auto__ = (function (){var statearr_53818 = f__41996__auto__();
(statearr_53818[(6)] = c__41995__auto___55285);

return statearr_53818;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__41997__auto__);
}));


cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(p,res);

return true;
}
});
var async = (function (p__53819){
var vec__53820 = p__53819;
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53820,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__53820,(1),null);
var job = vec__53820;
if((job == null)){
cljs.core.async.close_BANG_(results);

return null;
} else {
var res = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
(xf.cljs$core$IFn$_invoke$arity$2 ? xf.cljs$core$IFn$_invoke$arity$2(v,res) : xf.call(null,v,res));

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(p,res);

return true;
}
});
var n__4741__auto___55291 = n;
var __55292 = (0);
while(true){
if((__55292 < n__4741__auto___55291)){
var G__53826_55293 = type;
var G__53826_55294__$1 = (((G__53826_55293 instanceof cljs.core.Keyword))?G__53826_55293.fqn:null);
switch (G__53826_55294__$1) {
case "compute":
var c__41995__auto___55296 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (__55292,c__41995__auto___55296,G__53826_55293,G__53826_55294__$1,n__4741__auto___55291,jobs,results,process,async){
return (function (){
var f__41996__auto__ = (function (){var switch__41902__auto__ = ((function (__55292,c__41995__auto___55296,G__53826_55293,G__53826_55294__$1,n__4741__auto___55291,jobs,results,process,async){
return (function (state_53839){
var state_val_53840 = (state_53839[(1)]);
if((state_val_53840 === (1))){
var state_53839__$1 = state_53839;
var statearr_53841_55297 = state_53839__$1;
(statearr_53841_55297[(2)] = null);

(statearr_53841_55297[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53840 === (2))){
var state_53839__$1 = state_53839;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_53839__$1,(4),jobs);
} else {
if((state_val_53840 === (3))){
var inst_53837 = (state_53839[(2)]);
var state_53839__$1 = state_53839;
return cljs.core.async.impl.ioc_helpers.return_chan(state_53839__$1,inst_53837);
} else {
if((state_val_53840 === (4))){
var inst_53829 = (state_53839[(2)]);
var inst_53830 = process(inst_53829);
var state_53839__$1 = state_53839;
if(cljs.core.truth_(inst_53830)){
var statearr_53843_55299 = state_53839__$1;
(statearr_53843_55299[(1)] = (5));

} else {
var statearr_53844_55301 = state_53839__$1;
(statearr_53844_55301[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53840 === (5))){
var state_53839__$1 = state_53839;
var statearr_53849_55302 = state_53839__$1;
(statearr_53849_55302[(2)] = null);

(statearr_53849_55302[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53840 === (6))){
var state_53839__$1 = state_53839;
var statearr_53850_55303 = state_53839__$1;
(statearr_53850_55303[(2)] = null);

(statearr_53850_55303[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53840 === (7))){
var inst_53835 = (state_53839[(2)]);
var state_53839__$1 = state_53839;
var statearr_53852_55304 = state_53839__$1;
(statearr_53852_55304[(2)] = inst_53835);

(statearr_53852_55304[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(__55292,c__41995__auto___55296,G__53826_55293,G__53826_55294__$1,n__4741__auto___55291,jobs,results,process,async))
;
return ((function (__55292,switch__41902__auto__,c__41995__auto___55296,G__53826_55293,G__53826_55294__$1,n__4741__auto___55291,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____0 = (function (){
var statearr_53853 = [null,null,null,null,null,null,null];
(statearr_53853[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__);

(statearr_53853[(1)] = (1));

return statearr_53853;
});
var cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____1 = (function (state_53839){
while(true){
var ret_value__41904__auto__ = (function (){try{while(true){
var result__41905__auto__ = switch__41902__auto__(state_53839);
if(cljs.core.keyword_identical_QMARK_(result__41905__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__41905__auto__;
}
break;
}
}catch (e53854){var ex__41906__auto__ = e53854;
var statearr_53855_55305 = state_53839;
(statearr_53855_55305[(2)] = ex__41906__auto__);


if(cljs.core.seq((state_53839[(4)]))){
var statearr_53857_55306 = state_53839;
(statearr_53857_55306[(1)] = cljs.core.first((state_53839[(4)])));

} else {
throw ex__41906__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41904__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__55307 = state_53839;
state_53839 = G__55307;
continue;
} else {
return ret_value__41904__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__ = function(state_53839){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____1.call(this,state_53839);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__;
})()
;})(__55292,switch__41902__auto__,c__41995__auto___55296,G__53826_55293,G__53826_55294__$1,n__4741__auto___55291,jobs,results,process,async))
})();
var state__41997__auto__ = (function (){var statearr_53859 = f__41996__auto__();
(statearr_53859[(6)] = c__41995__auto___55296);

return statearr_53859;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__41997__auto__);
});})(__55292,c__41995__auto___55296,G__53826_55293,G__53826_55294__$1,n__4741__auto___55291,jobs,results,process,async))
);


break;
case "async":
var c__41995__auto___55308 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (__55292,c__41995__auto___55308,G__53826_55293,G__53826_55294__$1,n__4741__auto___55291,jobs,results,process,async){
return (function (){
var f__41996__auto__ = (function (){var switch__41902__auto__ = ((function (__55292,c__41995__auto___55308,G__53826_55293,G__53826_55294__$1,n__4741__auto___55291,jobs,results,process,async){
return (function (state_53877){
var state_val_53878 = (state_53877[(1)]);
if((state_val_53878 === (1))){
var state_53877__$1 = state_53877;
var statearr_53879_55309 = state_53877__$1;
(statearr_53879_55309[(2)] = null);

(statearr_53879_55309[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53878 === (2))){
var state_53877__$1 = state_53877;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_53877__$1,(4),jobs);
} else {
if((state_val_53878 === (3))){
var inst_53875 = (state_53877[(2)]);
var state_53877__$1 = state_53877;
return cljs.core.async.impl.ioc_helpers.return_chan(state_53877__$1,inst_53875);
} else {
if((state_val_53878 === (4))){
var inst_53866 = (state_53877[(2)]);
var inst_53868 = async(inst_53866);
var state_53877__$1 = state_53877;
if(cljs.core.truth_(inst_53868)){
var statearr_53880_55311 = state_53877__$1;
(statearr_53880_55311[(1)] = (5));

} else {
var statearr_53881_55312 = state_53877__$1;
(statearr_53881_55312[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53878 === (5))){
var state_53877__$1 = state_53877;
var statearr_53882_55314 = state_53877__$1;
(statearr_53882_55314[(2)] = null);

(statearr_53882_55314[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53878 === (6))){
var state_53877__$1 = state_53877;
var statearr_53883_55315 = state_53877__$1;
(statearr_53883_55315[(2)] = null);

(statearr_53883_55315[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53878 === (7))){
var inst_53873 = (state_53877[(2)]);
var state_53877__$1 = state_53877;
var statearr_53884_55316 = state_53877__$1;
(statearr_53884_55316[(2)] = inst_53873);

(statearr_53884_55316[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(__55292,c__41995__auto___55308,G__53826_55293,G__53826_55294__$1,n__4741__auto___55291,jobs,results,process,async))
;
return ((function (__55292,switch__41902__auto__,c__41995__auto___55308,G__53826_55293,G__53826_55294__$1,n__4741__auto___55291,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____0 = (function (){
var statearr_53885 = [null,null,null,null,null,null,null];
(statearr_53885[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__);

(statearr_53885[(1)] = (1));

return statearr_53885;
});
var cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____1 = (function (state_53877){
while(true){
var ret_value__41904__auto__ = (function (){try{while(true){
var result__41905__auto__ = switch__41902__auto__(state_53877);
if(cljs.core.keyword_identical_QMARK_(result__41905__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__41905__auto__;
}
break;
}
}catch (e53886){var ex__41906__auto__ = e53886;
var statearr_53887_55317 = state_53877;
(statearr_53887_55317[(2)] = ex__41906__auto__);


if(cljs.core.seq((state_53877[(4)]))){
var statearr_53888_55318 = state_53877;
(statearr_53888_55318[(1)] = cljs.core.first((state_53877[(4)])));

} else {
throw ex__41906__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41904__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__55319 = state_53877;
state_53877 = G__55319;
continue;
} else {
return ret_value__41904__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__ = function(state_53877){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____1.call(this,state_53877);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__;
})()
;})(__55292,switch__41902__auto__,c__41995__auto___55308,G__53826_55293,G__53826_55294__$1,n__4741__auto___55291,jobs,results,process,async))
})();
var state__41997__auto__ = (function (){var statearr_53889 = f__41996__auto__();
(statearr_53889[(6)] = c__41995__auto___55308);

return statearr_53889;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__41997__auto__);
});})(__55292,c__41995__auto___55308,G__53826_55293,G__53826_55294__$1,n__4741__auto___55291,jobs,results,process,async))
);


break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__53826_55294__$1)].join('')));

}

var G__55320 = (__55292 + (1));
__55292 = G__55320;
continue;
} else {
}
break;
}

var c__41995__auto___55321 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__41996__auto__ = (function (){var switch__41902__auto__ = (function (state_53914){
var state_val_53915 = (state_53914[(1)]);
if((state_val_53915 === (7))){
var inst_53910 = (state_53914[(2)]);
var state_53914__$1 = state_53914;
var statearr_53917_55322 = state_53914__$1;
(statearr_53917_55322[(2)] = inst_53910);

(statearr_53917_55322[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53915 === (1))){
var state_53914__$1 = state_53914;
var statearr_53918_55323 = state_53914__$1;
(statearr_53918_55323[(2)] = null);

(statearr_53918_55323[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53915 === (4))){
var inst_53895 = (state_53914[(7)]);
var inst_53895__$1 = (state_53914[(2)]);
var inst_53896 = (inst_53895__$1 == null);
var state_53914__$1 = (function (){var statearr_53919 = state_53914;
(statearr_53919[(7)] = inst_53895__$1);

return statearr_53919;
})();
if(cljs.core.truth_(inst_53896)){
var statearr_53920_55324 = state_53914__$1;
(statearr_53920_55324[(1)] = (5));

} else {
var statearr_53921_55325 = state_53914__$1;
(statearr_53921_55325[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53915 === (6))){
var inst_53895 = (state_53914[(7)]);
var inst_53900 = (state_53914[(8)]);
var inst_53900__$1 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var inst_53901 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_53902 = [inst_53895,inst_53900__$1];
var inst_53903 = (new cljs.core.PersistentVector(null,2,(5),inst_53901,inst_53902,null));
var state_53914__$1 = (function (){var statearr_53924 = state_53914;
(statearr_53924[(8)] = inst_53900__$1);

return statearr_53924;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_53914__$1,(8),jobs,inst_53903);
} else {
if((state_val_53915 === (3))){
var inst_53912 = (state_53914[(2)]);
var state_53914__$1 = state_53914;
return cljs.core.async.impl.ioc_helpers.return_chan(state_53914__$1,inst_53912);
} else {
if((state_val_53915 === (2))){
var state_53914__$1 = state_53914;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_53914__$1,(4),from);
} else {
if((state_val_53915 === (9))){
var inst_53907 = (state_53914[(2)]);
var state_53914__$1 = (function (){var statearr_53928 = state_53914;
(statearr_53928[(9)] = inst_53907);

return statearr_53928;
})();
var statearr_53929_55328 = state_53914__$1;
(statearr_53929_55328[(2)] = null);

(statearr_53929_55328[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53915 === (5))){
var inst_53898 = cljs.core.async.close_BANG_(jobs);
var state_53914__$1 = state_53914;
var statearr_53930_55329 = state_53914__$1;
(statearr_53930_55329[(2)] = inst_53898);

(statearr_53930_55329[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53915 === (8))){
var inst_53900 = (state_53914[(8)]);
var inst_53905 = (state_53914[(2)]);
var state_53914__$1 = (function (){var statearr_53931 = state_53914;
(statearr_53931[(10)] = inst_53905);

return statearr_53931;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_53914__$1,(9),results,inst_53900);
} else {
return null;
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____0 = (function (){
var statearr_53932 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_53932[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__);

(statearr_53932[(1)] = (1));

return statearr_53932;
});
var cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____1 = (function (state_53914){
while(true){
var ret_value__41904__auto__ = (function (){try{while(true){
var result__41905__auto__ = switch__41902__auto__(state_53914);
if(cljs.core.keyword_identical_QMARK_(result__41905__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__41905__auto__;
}
break;
}
}catch (e53935){var ex__41906__auto__ = e53935;
var statearr_53936_55330 = state_53914;
(statearr_53936_55330[(2)] = ex__41906__auto__);


if(cljs.core.seq((state_53914[(4)]))){
var statearr_53938_55331 = state_53914;
(statearr_53938_55331[(1)] = cljs.core.first((state_53914[(4)])));

} else {
throw ex__41906__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41904__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__55332 = state_53914;
state_53914 = G__55332;
continue;
} else {
return ret_value__41904__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__ = function(state_53914){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____1.call(this,state_53914);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__;
})()
})();
var state__41997__auto__ = (function (){var statearr_53939 = f__41996__auto__();
(statearr_53939[(6)] = c__41995__auto___55321);

return statearr_53939;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__41997__auto__);
}));


var c__41995__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__41996__auto__ = (function (){var switch__41902__auto__ = (function (state_53983){
var state_val_53984 = (state_53983[(1)]);
if((state_val_53984 === (7))){
var inst_53979 = (state_53983[(2)]);
var state_53983__$1 = state_53983;
var statearr_53986_55333 = state_53983__$1;
(statearr_53986_55333[(2)] = inst_53979);

(statearr_53986_55333[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53984 === (20))){
var state_53983__$1 = state_53983;
var statearr_53987_55334 = state_53983__$1;
(statearr_53987_55334[(2)] = null);

(statearr_53987_55334[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53984 === (1))){
var state_53983__$1 = state_53983;
var statearr_53988_55335 = state_53983__$1;
(statearr_53988_55335[(2)] = null);

(statearr_53988_55335[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53984 === (4))){
var inst_53942 = (state_53983[(7)]);
var inst_53942__$1 = (state_53983[(2)]);
var inst_53944 = (inst_53942__$1 == null);
var state_53983__$1 = (function (){var statearr_53990 = state_53983;
(statearr_53990[(7)] = inst_53942__$1);

return statearr_53990;
})();
if(cljs.core.truth_(inst_53944)){
var statearr_53991_55336 = state_53983__$1;
(statearr_53991_55336[(1)] = (5));

} else {
var statearr_53993_55337 = state_53983__$1;
(statearr_53993_55337[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53984 === (15))){
var inst_53960 = (state_53983[(8)]);
var state_53983__$1 = state_53983;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_53983__$1,(18),to,inst_53960);
} else {
if((state_val_53984 === (21))){
var inst_53974 = (state_53983[(2)]);
var state_53983__$1 = state_53983;
var statearr_53995_55338 = state_53983__$1;
(statearr_53995_55338[(2)] = inst_53974);

(statearr_53995_55338[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53984 === (13))){
var inst_53976 = (state_53983[(2)]);
var state_53983__$1 = (function (){var statearr_53996 = state_53983;
(statearr_53996[(9)] = inst_53976);

return statearr_53996;
})();
var statearr_53997_55339 = state_53983__$1;
(statearr_53997_55339[(2)] = null);

(statearr_53997_55339[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53984 === (6))){
var inst_53942 = (state_53983[(7)]);
var state_53983__$1 = state_53983;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_53983__$1,(11),inst_53942);
} else {
if((state_val_53984 === (17))){
var inst_53968 = (state_53983[(2)]);
var state_53983__$1 = state_53983;
if(cljs.core.truth_(inst_53968)){
var statearr_53999_55341 = state_53983__$1;
(statearr_53999_55341[(1)] = (19));

} else {
var statearr_54000_55342 = state_53983__$1;
(statearr_54000_55342[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53984 === (3))){
var inst_53981 = (state_53983[(2)]);
var state_53983__$1 = state_53983;
return cljs.core.async.impl.ioc_helpers.return_chan(state_53983__$1,inst_53981);
} else {
if((state_val_53984 === (12))){
var inst_53956 = (state_53983[(10)]);
var state_53983__$1 = state_53983;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_53983__$1,(14),inst_53956);
} else {
if((state_val_53984 === (2))){
var state_53983__$1 = state_53983;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_53983__$1,(4),results);
} else {
if((state_val_53984 === (19))){
var state_53983__$1 = state_53983;
var statearr_54003_55344 = state_53983__$1;
(statearr_54003_55344[(2)] = null);

(statearr_54003_55344[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53984 === (11))){
var inst_53956 = (state_53983[(2)]);
var state_53983__$1 = (function (){var statearr_54004 = state_53983;
(statearr_54004[(10)] = inst_53956);

return statearr_54004;
})();
var statearr_54005_55345 = state_53983__$1;
(statearr_54005_55345[(2)] = null);

(statearr_54005_55345[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53984 === (9))){
var state_53983__$1 = state_53983;
var statearr_54006_55346 = state_53983__$1;
(statearr_54006_55346[(2)] = null);

(statearr_54006_55346[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53984 === (5))){
var state_53983__$1 = state_53983;
if(cljs.core.truth_(close_QMARK_)){
var statearr_54007_55347 = state_53983__$1;
(statearr_54007_55347[(1)] = (8));

} else {
var statearr_54008_55348 = state_53983__$1;
(statearr_54008_55348[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53984 === (14))){
var inst_53960 = (state_53983[(8)]);
var inst_53962 = (state_53983[(11)]);
var inst_53960__$1 = (state_53983[(2)]);
var inst_53961 = (inst_53960__$1 == null);
var inst_53962__$1 = cljs.core.not(inst_53961);
var state_53983__$1 = (function (){var statearr_54011 = state_53983;
(statearr_54011[(8)] = inst_53960__$1);

(statearr_54011[(11)] = inst_53962__$1);

return statearr_54011;
})();
if(inst_53962__$1){
var statearr_54012_55349 = state_53983__$1;
(statearr_54012_55349[(1)] = (15));

} else {
var statearr_54013_55350 = state_53983__$1;
(statearr_54013_55350[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53984 === (16))){
var inst_53962 = (state_53983[(11)]);
var state_53983__$1 = state_53983;
var statearr_54014_55351 = state_53983__$1;
(statearr_54014_55351[(2)] = inst_53962);

(statearr_54014_55351[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53984 === (10))){
var inst_53952 = (state_53983[(2)]);
var state_53983__$1 = state_53983;
var statearr_54017_55352 = state_53983__$1;
(statearr_54017_55352[(2)] = inst_53952);

(statearr_54017_55352[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53984 === (18))){
var inst_53965 = (state_53983[(2)]);
var state_53983__$1 = state_53983;
var statearr_54019_55353 = state_53983__$1;
(statearr_54019_55353[(2)] = inst_53965);

(statearr_54019_55353[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_53984 === (8))){
var inst_53949 = cljs.core.async.close_BANG_(to);
var state_53983__$1 = state_53983;
var statearr_54020_55354 = state_53983__$1;
(statearr_54020_55354[(2)] = inst_53949);

(statearr_54020_55354[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____0 = (function (){
var statearr_54022 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_54022[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__);

(statearr_54022[(1)] = (1));

return statearr_54022;
});
var cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____1 = (function (state_53983){
while(true){
var ret_value__41904__auto__ = (function (){try{while(true){
var result__41905__auto__ = switch__41902__auto__(state_53983);
if(cljs.core.keyword_identical_QMARK_(result__41905__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__41905__auto__;
}
break;
}
}catch (e54025){var ex__41906__auto__ = e54025;
var statearr_54026_55355 = state_53983;
(statearr_54026_55355[(2)] = ex__41906__auto__);


if(cljs.core.seq((state_53983[(4)]))){
var statearr_54028_55356 = state_53983;
(statearr_54028_55356[(1)] = cljs.core.first((state_53983[(4)])));

} else {
throw ex__41906__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41904__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__55358 = state_53983;
state_53983 = G__55358;
continue;
} else {
return ret_value__41904__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__ = function(state_53983){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____1.call(this,state_53983);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__;
})()
})();
var state__41997__auto__ = (function (){var statearr_54030 = f__41996__auto__();
(statearr_54030[(6)] = c__41995__auto__);

return statearr_54030;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__41997__auto__);
}));

return c__41995__auto__;
});
/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the async function af, with parallelism n. af
 *   must be a function of two arguments, the first an input value and
 *   the second a channel on which to place the result(s). af must close!
 *   the channel before returning.  The presumption is that af will
 *   return immediately, having launched some asynchronous operation
 *   whose completion/callback will manipulate the result channel. Outputs
 *   will be returned in order relative to  the inputs. By default, the to
 *   channel will be closed when the from channel closes, but can be
 *   determined by the close?  parameter. Will stop consuming the from
 *   channel if the to channel closes.
 */
cljs.core.async.pipeline_async = (function cljs$core$async$pipeline_async(var_args){
var G__54032 = arguments.length;
switch (G__54032) {
case 4:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4 = (function (n,to,af,from){
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5(n,to,af,from,true);
}));

(cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5 = (function (n,to,af,from,close_QMARK_){
return cljs.core.async.pipeline_STAR_(n,to,af,from,close_QMARK_,null,new cljs.core.Keyword(null,"async","async",1050769601));
}));

(cljs.core.async.pipeline_async.cljs$lang$maxFixedArity = 5);

/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the transducer xf, with parallelism n. Because
 *   it is parallel, the transducer will be applied independently to each
 *   element, not across elements, and may produce zero or more outputs
 *   per input.  Outputs will be returned in order relative to the
 *   inputs. By default, the to channel will be closed when the from
 *   channel closes, but can be determined by the close?  parameter. Will
 *   stop consuming the from channel if the to channel closes.
 * 
 *   Note this is supplied for API compatibility with the Clojure version.
 *   Values of N > 1 will not result in actual concurrency in a
 *   single-threaded runtime.
 */
cljs.core.async.pipeline = (function cljs$core$async$pipeline(var_args){
var G__54039 = arguments.length;
switch (G__54039) {
case 4:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4 = (function (n,to,xf,from){
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5(n,to,xf,from,true);
}));

(cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5 = (function (n,to,xf,from,close_QMARK_){
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6(n,to,xf,from,close_QMARK_,null);
}));

(cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6 = (function (n,to,xf,from,close_QMARK_,ex_handler){
return cljs.core.async.pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,new cljs.core.Keyword(null,"compute","compute",1555393130));
}));

(cljs.core.async.pipeline.cljs$lang$maxFixedArity = 6);

/**
 * Takes a predicate and a source channel and returns a vector of two
 *   channels, the first of which will contain the values for which the
 *   predicate returned true, the second those for which it returned
 *   false.
 * 
 *   The out channels will be unbuffered by default, or two buf-or-ns can
 *   be supplied. The channels will close after the source channel has
 *   closed.
 */
cljs.core.async.split = (function cljs$core$async$split(var_args){
var G__54043 = arguments.length;
switch (G__54043) {
case 2:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.split.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4(p,ch,null,null);
}));

(cljs.core.async.split.cljs$core$IFn$_invoke$arity$4 = (function (p,ch,t_buf_or_n,f_buf_or_n){
var tc = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(t_buf_or_n);
var fc = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(f_buf_or_n);
var c__41995__auto___55366 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__41996__auto__ = (function (){var switch__41902__auto__ = (function (state_54071){
var state_val_54072 = (state_54071[(1)]);
if((state_val_54072 === (7))){
var inst_54067 = (state_54071[(2)]);
var state_54071__$1 = state_54071;
var statearr_54075_55367 = state_54071__$1;
(statearr_54075_55367[(2)] = inst_54067);

(statearr_54075_55367[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54072 === (1))){
var state_54071__$1 = state_54071;
var statearr_54077_55368 = state_54071__$1;
(statearr_54077_55368[(2)] = null);

(statearr_54077_55368[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54072 === (4))){
var inst_54047 = (state_54071[(7)]);
var inst_54047__$1 = (state_54071[(2)]);
var inst_54049 = (inst_54047__$1 == null);
var state_54071__$1 = (function (){var statearr_54078 = state_54071;
(statearr_54078[(7)] = inst_54047__$1);

return statearr_54078;
})();
if(cljs.core.truth_(inst_54049)){
var statearr_54079_55369 = state_54071__$1;
(statearr_54079_55369[(1)] = (5));

} else {
var statearr_54080_55370 = state_54071__$1;
(statearr_54080_55370[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54072 === (13))){
var state_54071__$1 = state_54071;
var statearr_54081_55371 = state_54071__$1;
(statearr_54081_55371[(2)] = null);

(statearr_54081_55371[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54072 === (6))){
var inst_54047 = (state_54071[(7)]);
var inst_54054 = (p.cljs$core$IFn$_invoke$arity$1 ? p.cljs$core$IFn$_invoke$arity$1(inst_54047) : p.call(null,inst_54047));
var state_54071__$1 = state_54071;
if(cljs.core.truth_(inst_54054)){
var statearr_54082_55372 = state_54071__$1;
(statearr_54082_55372[(1)] = (9));

} else {
var statearr_54083_55373 = state_54071__$1;
(statearr_54083_55373[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54072 === (3))){
var inst_54069 = (state_54071[(2)]);
var state_54071__$1 = state_54071;
return cljs.core.async.impl.ioc_helpers.return_chan(state_54071__$1,inst_54069);
} else {
if((state_val_54072 === (12))){
var state_54071__$1 = state_54071;
var statearr_54084_55374 = state_54071__$1;
(statearr_54084_55374[(2)] = null);

(statearr_54084_55374[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54072 === (2))){
var state_54071__$1 = state_54071;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_54071__$1,(4),ch);
} else {
if((state_val_54072 === (11))){
var inst_54047 = (state_54071[(7)]);
var inst_54058 = (state_54071[(2)]);
var state_54071__$1 = state_54071;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_54071__$1,(8),inst_54058,inst_54047);
} else {
if((state_val_54072 === (9))){
var state_54071__$1 = state_54071;
var statearr_54085_55375 = state_54071__$1;
(statearr_54085_55375[(2)] = tc);

(statearr_54085_55375[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54072 === (5))){
var inst_54051 = cljs.core.async.close_BANG_(tc);
var inst_54052 = cljs.core.async.close_BANG_(fc);
var state_54071__$1 = (function (){var statearr_54088 = state_54071;
(statearr_54088[(8)] = inst_54051);

return statearr_54088;
})();
var statearr_54089_55376 = state_54071__$1;
(statearr_54089_55376[(2)] = inst_54052);

(statearr_54089_55376[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54072 === (14))){
var inst_54065 = (state_54071[(2)]);
var state_54071__$1 = state_54071;
var statearr_54090_55377 = state_54071__$1;
(statearr_54090_55377[(2)] = inst_54065);

(statearr_54090_55377[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54072 === (10))){
var state_54071__$1 = state_54071;
var statearr_54091_55378 = state_54071__$1;
(statearr_54091_55378[(2)] = fc);

(statearr_54091_55378[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54072 === (8))){
var inst_54060 = (state_54071[(2)]);
var state_54071__$1 = state_54071;
if(cljs.core.truth_(inst_54060)){
var statearr_54092_55379 = state_54071__$1;
(statearr_54092_55379[(1)] = (12));

} else {
var statearr_54094_55380 = state_54071__$1;
(statearr_54094_55380[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__41903__auto__ = null;
var cljs$core$async$state_machine__41903__auto____0 = (function (){
var statearr_54095 = [null,null,null,null,null,null,null,null,null];
(statearr_54095[(0)] = cljs$core$async$state_machine__41903__auto__);

(statearr_54095[(1)] = (1));

return statearr_54095;
});
var cljs$core$async$state_machine__41903__auto____1 = (function (state_54071){
while(true){
var ret_value__41904__auto__ = (function (){try{while(true){
var result__41905__auto__ = switch__41902__auto__(state_54071);
if(cljs.core.keyword_identical_QMARK_(result__41905__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__41905__auto__;
}
break;
}
}catch (e54096){var ex__41906__auto__ = e54096;
var statearr_54097_55381 = state_54071;
(statearr_54097_55381[(2)] = ex__41906__auto__);


if(cljs.core.seq((state_54071[(4)]))){
var statearr_54098_55382 = state_54071;
(statearr_54098_55382[(1)] = cljs.core.first((state_54071[(4)])));

} else {
throw ex__41906__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41904__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__55383 = state_54071;
state_54071 = G__55383;
continue;
} else {
return ret_value__41904__auto__;
}
break;
}
});
cljs$core$async$state_machine__41903__auto__ = function(state_54071){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__41903__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__41903__auto____1.call(this,state_54071);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__41903__auto____0;
cljs$core$async$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__41903__auto____1;
return cljs$core$async$state_machine__41903__auto__;
})()
})();
var state__41997__auto__ = (function (){var statearr_54099 = f__41996__auto__();
(statearr_54099[(6)] = c__41995__auto___55366);

return statearr_54099;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__41997__auto__);
}));


return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tc,fc], null);
}));

(cljs.core.async.split.cljs$lang$maxFixedArity = 4);

/**
 * f should be a function of 2 arguments. Returns a channel containing
 *   the single result of applying f to init and the first item from the
 *   channel, then applying f to that result and the 2nd item, etc. If
 *   the channel closes without yielding items, returns init and f is not
 *   called. ch must close before reduce produces a result.
 */
cljs.core.async.reduce = (function cljs$core$async$reduce(f,init,ch){
var c__41995__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__41996__auto__ = (function (){var switch__41902__auto__ = (function (state_54121){
var state_val_54122 = (state_54121[(1)]);
if((state_val_54122 === (7))){
var inst_54117 = (state_54121[(2)]);
var state_54121__$1 = state_54121;
var statearr_54123_55384 = state_54121__$1;
(statearr_54123_55384[(2)] = inst_54117);

(statearr_54123_55384[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54122 === (1))){
var inst_54100 = init;
var inst_54101 = inst_54100;
var state_54121__$1 = (function (){var statearr_54124 = state_54121;
(statearr_54124[(7)] = inst_54101);

return statearr_54124;
})();
var statearr_54125_55385 = state_54121__$1;
(statearr_54125_55385[(2)] = null);

(statearr_54125_55385[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54122 === (4))){
var inst_54104 = (state_54121[(8)]);
var inst_54104__$1 = (state_54121[(2)]);
var inst_54105 = (inst_54104__$1 == null);
var state_54121__$1 = (function (){var statearr_54126 = state_54121;
(statearr_54126[(8)] = inst_54104__$1);

return statearr_54126;
})();
if(cljs.core.truth_(inst_54105)){
var statearr_54127_55386 = state_54121__$1;
(statearr_54127_55386[(1)] = (5));

} else {
var statearr_54128_55387 = state_54121__$1;
(statearr_54128_55387[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54122 === (6))){
var inst_54104 = (state_54121[(8)]);
var inst_54101 = (state_54121[(7)]);
var inst_54108 = (state_54121[(9)]);
var inst_54108__$1 = (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(inst_54101,inst_54104) : f.call(null,inst_54101,inst_54104));
var inst_54109 = cljs.core.reduced_QMARK_(inst_54108__$1);
var state_54121__$1 = (function (){var statearr_54129 = state_54121;
(statearr_54129[(9)] = inst_54108__$1);

return statearr_54129;
})();
if(inst_54109){
var statearr_54130_55388 = state_54121__$1;
(statearr_54130_55388[(1)] = (8));

} else {
var statearr_54131_55389 = state_54121__$1;
(statearr_54131_55389[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54122 === (3))){
var inst_54119 = (state_54121[(2)]);
var state_54121__$1 = state_54121;
return cljs.core.async.impl.ioc_helpers.return_chan(state_54121__$1,inst_54119);
} else {
if((state_val_54122 === (2))){
var state_54121__$1 = state_54121;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_54121__$1,(4),ch);
} else {
if((state_val_54122 === (9))){
var inst_54108 = (state_54121[(9)]);
var inst_54101 = inst_54108;
var state_54121__$1 = (function (){var statearr_54132 = state_54121;
(statearr_54132[(7)] = inst_54101);

return statearr_54132;
})();
var statearr_54133_55392 = state_54121__$1;
(statearr_54133_55392[(2)] = null);

(statearr_54133_55392[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54122 === (5))){
var inst_54101 = (state_54121[(7)]);
var state_54121__$1 = state_54121;
var statearr_54134_55393 = state_54121__$1;
(statearr_54134_55393[(2)] = inst_54101);

(statearr_54134_55393[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54122 === (10))){
var inst_54115 = (state_54121[(2)]);
var state_54121__$1 = state_54121;
var statearr_54135_55394 = state_54121__$1;
(statearr_54135_55394[(2)] = inst_54115);

(statearr_54135_55394[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54122 === (8))){
var inst_54108 = (state_54121[(9)]);
var inst_54111 = cljs.core.deref(inst_54108);
var state_54121__$1 = state_54121;
var statearr_54136_55395 = state_54121__$1;
(statearr_54136_55395[(2)] = inst_54111);

(statearr_54136_55395[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$reduce_$_state_machine__41903__auto__ = null;
var cljs$core$async$reduce_$_state_machine__41903__auto____0 = (function (){
var statearr_54137 = [null,null,null,null,null,null,null,null,null,null];
(statearr_54137[(0)] = cljs$core$async$reduce_$_state_machine__41903__auto__);

(statearr_54137[(1)] = (1));

return statearr_54137;
});
var cljs$core$async$reduce_$_state_machine__41903__auto____1 = (function (state_54121){
while(true){
var ret_value__41904__auto__ = (function (){try{while(true){
var result__41905__auto__ = switch__41902__auto__(state_54121);
if(cljs.core.keyword_identical_QMARK_(result__41905__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__41905__auto__;
}
break;
}
}catch (e54138){var ex__41906__auto__ = e54138;
var statearr_54139_55396 = state_54121;
(statearr_54139_55396[(2)] = ex__41906__auto__);


if(cljs.core.seq((state_54121[(4)]))){
var statearr_54140_55397 = state_54121;
(statearr_54140_55397[(1)] = cljs.core.first((state_54121[(4)])));

} else {
throw ex__41906__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41904__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__55398 = state_54121;
state_54121 = G__55398;
continue;
} else {
return ret_value__41904__auto__;
}
break;
}
});
cljs$core$async$reduce_$_state_machine__41903__auto__ = function(state_54121){
switch(arguments.length){
case 0:
return cljs$core$async$reduce_$_state_machine__41903__auto____0.call(this);
case 1:
return cljs$core$async$reduce_$_state_machine__41903__auto____1.call(this,state_54121);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$reduce_$_state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$reduce_$_state_machine__41903__auto____0;
cljs$core$async$reduce_$_state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$reduce_$_state_machine__41903__auto____1;
return cljs$core$async$reduce_$_state_machine__41903__auto__;
})()
})();
var state__41997__auto__ = (function (){var statearr_54141 = f__41996__auto__();
(statearr_54141[(6)] = c__41995__auto__);

return statearr_54141;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__41997__auto__);
}));

return c__41995__auto__;
});
/**
 * async/reduces a channel with a transformation (xform f).
 *   Returns a channel containing the result.  ch must close before
 *   transduce produces a result.
 */
cljs.core.async.transduce = (function cljs$core$async$transduce(xform,f,init,ch){
var f__$1 = (xform.cljs$core$IFn$_invoke$arity$1 ? xform.cljs$core$IFn$_invoke$arity$1(f) : xform.call(null,f));
var c__41995__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__41996__auto__ = (function (){var switch__41902__auto__ = (function (state_54147){
var state_val_54148 = (state_54147[(1)]);
if((state_val_54148 === (1))){
var inst_54142 = cljs.core.async.reduce(f__$1,init,ch);
var state_54147__$1 = state_54147;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_54147__$1,(2),inst_54142);
} else {
if((state_val_54148 === (2))){
var inst_54144 = (state_54147[(2)]);
var inst_54145 = (f__$1.cljs$core$IFn$_invoke$arity$1 ? f__$1.cljs$core$IFn$_invoke$arity$1(inst_54144) : f__$1.call(null,inst_54144));
var state_54147__$1 = state_54147;
return cljs.core.async.impl.ioc_helpers.return_chan(state_54147__$1,inst_54145);
} else {
return null;
}
}
});
return (function() {
var cljs$core$async$transduce_$_state_machine__41903__auto__ = null;
var cljs$core$async$transduce_$_state_machine__41903__auto____0 = (function (){
var statearr_54149 = [null,null,null,null,null,null,null];
(statearr_54149[(0)] = cljs$core$async$transduce_$_state_machine__41903__auto__);

(statearr_54149[(1)] = (1));

return statearr_54149;
});
var cljs$core$async$transduce_$_state_machine__41903__auto____1 = (function (state_54147){
while(true){
var ret_value__41904__auto__ = (function (){try{while(true){
var result__41905__auto__ = switch__41902__auto__(state_54147);
if(cljs.core.keyword_identical_QMARK_(result__41905__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__41905__auto__;
}
break;
}
}catch (e54150){var ex__41906__auto__ = e54150;
var statearr_54151_55399 = state_54147;
(statearr_54151_55399[(2)] = ex__41906__auto__);


if(cljs.core.seq((state_54147[(4)]))){
var statearr_54152_55400 = state_54147;
(statearr_54152_55400[(1)] = cljs.core.first((state_54147[(4)])));

} else {
throw ex__41906__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41904__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__55401 = state_54147;
state_54147 = G__55401;
continue;
} else {
return ret_value__41904__auto__;
}
break;
}
});
cljs$core$async$transduce_$_state_machine__41903__auto__ = function(state_54147){
switch(arguments.length){
case 0:
return cljs$core$async$transduce_$_state_machine__41903__auto____0.call(this);
case 1:
return cljs$core$async$transduce_$_state_machine__41903__auto____1.call(this,state_54147);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$transduce_$_state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$transduce_$_state_machine__41903__auto____0;
cljs$core$async$transduce_$_state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$transduce_$_state_machine__41903__auto____1;
return cljs$core$async$transduce_$_state_machine__41903__auto__;
})()
})();
var state__41997__auto__ = (function (){var statearr_54153 = f__41996__auto__();
(statearr_54153[(6)] = c__41995__auto__);

return statearr_54153;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__41997__auto__);
}));

return c__41995__auto__;
});
/**
 * Puts the contents of coll into the supplied channel.
 * 
 *   By default the channel will be closed after the items are copied,
 *   but can be determined by the close? parameter.
 * 
 *   Returns a channel which will close after the items are copied.
 */
cljs.core.async.onto_chan_BANG_ = (function cljs$core$async$onto_chan_BANG_(var_args){
var G__54155 = arguments.length;
switch (G__54155) {
case 2:
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3(ch,coll,true);
}));

(cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
var c__41995__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__41996__auto__ = (function (){var switch__41902__auto__ = (function (state_54180){
var state_val_54181 = (state_54180[(1)]);
if((state_val_54181 === (7))){
var inst_54162 = (state_54180[(2)]);
var state_54180__$1 = state_54180;
var $statearr_54182 = state_54180__$1;
(statearr_54182_55410[(2)] = inst_54162);

(statearr_54182_55410[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54181 === (1))){
var inst_54156 = cljs.core.seq(coll);
var inst_54157 = inst_54156;
var state_54180__$1 = (function (){var statearr_54183 = state_54180;
(statearr_54183[(7)] = inst_54157);

return statearr_54183;
})();
var statearr_54184_55411 = state_54180__$1;
(statearr_54184_55411[(2)] = null);

(statearr_54184_55411[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54181 === (4))){
var inst_54157 = (state_54180[(7)]);
var inst_54160 = cljs.core.first(inst_54157);
var state_54180__$1 = state_54180;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_54180__$1,(7),ch,inst_54160);
} else {
if((state_val_54181 === (13))){
var inst_54174 = (state_54180[(2)]);
var state_54180__$1 = state_54180;
var statearr_54185_55412 = state_54180__$1;
(statearr_54185_55412[(2)] = inst_54174);

(statearr_54185_55412[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54181 === (6))){
var inst_54165 = (state_54180[(2)]);
var state_54180__$1 = state_54180;
if(cljs.core.truth_(inst_54165)){
var statearr_54186_55413 = state_54180__$1;
(statearr_54186_55413[(1)] = (8));

} else {
var statearr_54187_55414 = state_54180__$1;
(statearr_54187_55414[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54181 === (3))){
var inst_54178 = (state_54180[(2)]);
var state_54180__$1 = state_54180;
return cljs.core.async.impl.ioc_helpers.return_chan(state_54180__$1,inst_54178);
} else {
if((state_val_54181 === (12))){
var state_54180__$1 = state_54180;
var statearr_54188_55418 = state_54180__$1;
(statearr_54188_55418[(2)] = null);

(statearr_54188_55418[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54181 === (2))){
var inst_54157 = (state_54180[(7)]);
var state_54180__$1 = state_54180;
if(cljs.core.truth_(inst_54157)){
var statearr_54189_55419 = state_54180__$1;
(statearr_54189_55419[(1)] = (4));

} else {
var statearr_54190_55420 = state_54180__$1;
(statearr_54190_55420[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54181 === (11))){
var inst_54171 = cljs.core.async.close_BANG_(ch);
var state_54180__$1 = state_54180;
var statearr_54191_55421 = state_54180__$1;
(statearr_54191_55421[(2)] = inst_54171);

(statearr_54191_55421[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54181 === (9))){
var state_54180__$1 = state_54180;
if(cljs.core.truth_(close_QMARK_)){
var statearr_54192_55425 = state_54180__$1;
(statearr_54192_55425[(1)] = (11));

} else {
var statearr_54193_55426 = state_54180__$1;
(statearr_54193_55426[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54181 === (5))){
var inst_54157 = (state_54180[(7)]);
var state_54180__$1 = state_54180;
var statearr_54194_55427 = state_54180__$1;
(statearr_54194_55427[(2)] = inst_54157);

(statearr_54194_55427[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54181 === (10))){
var inst_54176 = (state_54180[(2)]);
var state_54180__$1 = state_54180;
var statearr_54195_55428 = state_54180__$1;
(statearr_54195_55428[(2)] = inst_54176);

(statearr_54195_55428[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54181 === (8))){
var inst_54157 = (state_54180[(7)]);
var inst_54167 = cljs.core.next(inst_54157);
var inst_54157__$1 = inst_54167;
var state_54180__$1 = (function (){var statearr_54196 = state_54180;
(statearr_54196[(7)] = inst_54157__$1);

return statearr_54196;
})();
var statearr_54198_55429 = state_54180__$1;
(statearr_54198_55429[(2)] = null);

(statearr_54198_55429[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__41903__auto__ = null;
var cljs$core$async$state_machine__41903__auto____0 = (function (){
var statearr_54199 = [null,null,null,null,null,null,null,null];
(statearr_54199[(0)] = cljs$core$async$state_machine__41903__auto__);

(statearr_54199[(1)] = (1));

return statearr_54199;
});
var cljs$core$async$state_machine__41903__auto____1 = (function (state_54180){
while(true){
var ret_value__41904__auto__ = (function (){try{while(true){
var result__41905__auto__ = switch__41902__auto__(state_54180);
if(cljs.core.keyword_identical_QMARK_(result__41905__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__41905__auto__;
}
break;
}
}catch (e54202){var ex__41906__auto__ = e54202;
var statearr_54204_55433 = state_54180;
(statearr_54204_55433[(2)] = ex__41906__auto__);


if(cljs.core.seq((state_54180[(4)]))){
var statearr_54205_55434 = state_54180;
(statearr_54205_55434[(1)] = cljs.core.first((state_54180[(4)])));

} else {
throw ex__41906__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41904__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__55435 = state_54180;
state_54180 = G__55435;
continue;
} else {
return ret_value__41904__auto__;
}
break;
}
});
cljs$core$async$state_machine__41903__auto__ = function(state_54180){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__41903__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__41903__auto____1.call(this,state_54180);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__41903__auto____0;
cljs$core$async$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__41903__auto____1;
return cljs$core$async$state_machine__41903__auto__;
})()
})();
var state__41997__auto__ = (function (){var statearr_54206 = f__41996__auto__();
(statearr_54206[(6)] = c__41995__auto__);

return statearr_54206;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__41997__auto__);
}));

return c__41995__auto__;
}));

(cljs.core.async.onto_chan_BANG_.cljs$lang$maxFixedArity = 3);

/**
 * Creates and returns a channel which contains the contents of coll,
 *   closing when exhausted.
 */
cljs.core.async.to_chan_BANG_ = (function cljs$core$async$to_chan_BANG_(coll){
var ch = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(cljs.core.bounded_count((100),coll));
cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$2(ch,coll);

return ch;
});
/**
 * Deprecated - use onto-chan!
 */
cljs.core.async.onto_chan = (function cljs$core$async$onto_chan(var_args){
var G__54219 = arguments.length;
switch (G__54219) {
case 2:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3(ch,coll,true);
}));

(cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3(ch,coll,close_QMARK_);
}));

(cljs.core.async.onto_chan.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - use to-chan!
 */
cljs.core.async.to_chan = (function cljs$core$async$to_chan(coll){
return cljs.core.async.to_chan_BANG_(coll);
});

/**
 * @interface
 */
cljs.core.async.Mux = function(){};

var cljs$core$async$Mux$muxch_STAR_$dyn_55444 = (function (_){
var x__4550__auto__ = (((_ == null))?null:_);
var m__4551__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__4550__auto__)]);
if((!((m__4551__auto__ == null)))){
return (m__4551__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4551__auto__.cljs$core$IFn$_invoke$arity$1(_) : m__4551__auto__.call(null,_));
} else {
var m__4549__auto__ = (cljs.core.async.muxch_STAR_["_"]);
if((!((m__4549__auto__ == null)))){
return (m__4549__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4549__auto__.cljs$core$IFn$_invoke$arity$1(_) : m__4549__auto__.call(null,_));
} else {
throw cljs.core.missing_protocol("Mux.muxch*",_);
}
}
});
cljs.core.async.muxch_STAR_ = (function cljs$core$async$muxch_STAR_(_){
if((((!((_ == null)))) && ((!((_.cljs$core$async$Mux$muxch_STAR_$arity$1 == null)))))){
return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else {
return cljs$core$async$Mux$muxch_STAR_$dyn_55444(_);
}
});


/**
 * @interface
 */
cljs.core.async.Mult = function(){};

var cljs$core$async$Mult$tap_STAR_$dyn_55445 = (function (m,ch,close_QMARK_){
var x__4550__auto__ = (((m == null))?null:m);
var m__4551__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__4550__auto__)]);
if((!((m__4551__auto__ == null)))){
return (m__4551__auto__.cljs$core$IFn$_invoke$arity$3 ? m__4551__auto__.cljs$core$IFn$_invoke$arity$3(m,ch,close_QMARK_) : m__4551__auto__.call(null,m,ch,close_QMARK_));
} else {
var m__4549__auto__ = (cljs.core.async.tap_STAR_["_"]);
if((!((m__4549__auto__ == null)))){
return (m__4549__auto__.cljs$core$IFn$_invoke$arity$3 ? m__4549__auto__.cljs$core$IFn$_invoke$arity$3(m,ch,close_QMARK_) : m__4549__auto__.call(null,m,ch,close_QMARK_));
} else {
throw cljs.core.missing_protocol("Mult.tap*",m);
}
}
});
cljs.core.async.tap_STAR_ = (function cljs$core$async$tap_STAR_(m,ch,close_QMARK_){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$tap_STAR_$arity$3 == null)))))){
return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else {
return cljs$core$async$Mult$tap_STAR_$dyn_55445(m,ch,close_QMARK_);
}
});

var cljs$core$async$Mult$untap_STAR_$dyn_55446 = (function (m,ch){
var x__4550__auto__ = (((m == null))?null:m);
var m__4551__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__4550__auto__)]);
if((!((m__4551__auto__ == null)))){
return (m__4551__auto__.cljs$core$IFn$_invoke$arity$2 ? m__4551__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__4551__auto__.call(null,m,ch));
} else {
var m__4549__auto__ = (cljs.core.async.untap_STAR_["_"]);
if((!((m__4549__auto__ == null)))){
return (m__4549__auto__.cljs$core$IFn$_invoke$arity$2 ? m__4549__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__4549__auto__.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mult.untap*",m);
}
}
});
cljs.core.async.untap_STAR_ = (function cljs$core$async$untap_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$untap_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else {
return cljs$core$async$Mult$untap_STAR_$dyn_55446(m,ch);
}
});

var cljs$core$async$Mult$untap_all_STAR_$dyn_55450 = (function (m){
var x__4550__auto__ = (((m == null))?null:m);
var m__4551__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__4550__auto__)]);
if((!((m__4551__auto__ == null)))){
return (m__4551__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4551__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__4551__auto__.call(null,m));
} else {
var m__4549__auto__ = (cljs.core.async.untap_all_STAR_["_"]);
if((!((m__4549__auto__ == null)))){
return (m__4549__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4549__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__4549__auto__.call(null,m));
} else {
throw cljs.core.missing_protocol("Mult.untap-all*",m);
}
}
});
cljs.core.async.untap_all_STAR_ = (function cljs$core$async$untap_all_STAR_(m){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$untap_all_STAR_$arity$1 == null)))))){
return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else {
return cljs$core$async$Mult$untap_all_STAR_$dyn_55450(m);
}
});

/**
 * Creates and returns a mult(iple) of the supplied channel. Channels
 *   containing copies of the channel can be created with 'tap', and
 *   detached with 'untap'.
 * 
 *   Each item is distributed to all taps in parallel and synchronously,
 *   i.e. each tap must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow taps from holding up the mult.
 * 
 *   Items received when there are no taps get dropped.
 * 
 *   If a tap puts to a closed channel, it will be removed from the mult.
 */
cljs.core.async.mult = (function cljs$core$async$mult(ch){
var cs = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var m = (function (){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async54233 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Mult}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async54233 = (function (ch,cs,meta54234){
this.ch = ch;
this.cs = cs;
this.meta54234 = meta54234;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async54233.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_54235,meta54234__$1){
var self__ = this;
var _54235__$1 = this;
return (new cljs.core.async.t_cljs$core$async54233(self__.ch,self__.cs,meta54234__$1));
}));

(cljs.core.async.t_cljs$core$async54233.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_54235){
var self__ = this;
var _54235__$1 = this;
return self__.meta54234;
}));

(cljs.core.async.t_cljs$core$async54233.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async54233.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
}));

(cljs.core.async.t_cljs$core$async54233.prototype.cljs$core$async$Mult$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async54233.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = (function (_,ch__$1,close_QMARK_){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cs,cljs.core.assoc,ch__$1,close_QMARK_);

return null;
}));

(cljs.core.async.t_cljs$core$async54233.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = (function (_,ch__$1){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.dissoc,ch__$1);

return null;
}));

(cljs.core.async.t_cljs$core$async54233.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return null;
}));

(cljs.core.async.t_cljs$core$async54233.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"meta54234","meta54234",-1994594411,null)], null);
}));

(cljs.core.async.t_cljs$core$async54233.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async54233.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async54233");

(cljs.core.async.t_cljs$core$async54233.cljs$lang$ctorPrWriter = (function (this__4491__auto__,writer__4492__auto__,opt__4493__auto__){
return cljs.core._write(writer__4492__auto__,"cljs.core.async/t_cljs$core$async54233");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async54233.
 */
cljs.core.async.__GT_t_cljs$core$async54233 = (function cljs$core$async$mult_$___GT_t_cljs$core$async54233(ch__$1,cs__$1,meta54234){
return (new cljs.core.async.t_cljs$core$async54233(ch__$1,cs__$1,meta54234));
});

}

return (new cljs.core.async.t_cljs$core$async54233(ch,cs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var dchan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var dctr = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var done = (function (_){
if((cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(dchan,true);
} else {
return null;
}
});
var c__41995__auto___55457 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__41996__auto__ = (function (){var switch__41902__auto__ = (function (state_54372){
var state_val_54373 = (state_54372[(1)]);
if((state_val_54373 === (7))){
var inst_54368 = (state_54372[(2)]);
var state_54372__$1 = state_54372;
var statearr_54374_55458 = state_54372__$1;
(statearr_54374_55458[(2)] = inst_54368);

(statearr_54374_55458[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54373 === (20))){
var inst_54273 = (state_54372[(7)]);
var inst_54285 = cljs.core.first(inst_54273);
var inst_54286 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_54285,(0),null);
var inst_54287 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_54285,(1),null);
var state_54372__$1 = (function (){var statearr_54375 = state_54372;
(statearr_54375[(8)] = inst_54286);

return statearr_54375;
})();
if(cljs.core.truth_(inst_54287)){
var statearr_54376_55459 = state_54372__$1;
(statearr_54376_55459[(1)] = (22));

} else {
var statearr_54377_55460 = state_54372__$1;
(statearr_54377_55460[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54373 === (27))){
var inst_54322 = (state_54372[(9)]);
var inst_54315 = (state_54372[(10)]);
var inst_54317 = (state_54372[(11)]);
var inst_54242 = (state_54372[(12)]);
var inst_54322__$1 = cljs.core._nth(inst_54315,inst_54317);
var inst_54323 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3(inst_54322__$1,inst_54242,done);
var state_54372__$1 = (function (){var statearr_54378 = state_54372;
(statearr_54378[(9)] = inst_54322__$1);

return statearr_54378;
})();
if(cljs.core.truth_(inst_54323)){
var statearr_54379_55461 = state_54372__$1;
(statearr_54379_55461[(1)] = (30));

} else {
var statearr_54380_55462 = state_54372__$1;
(statearr_54380_55462[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54373 === (1))){
var state_54372__$1 = state_54372;
var statearr_54381_55464 = state_54372__$1;
(statearr_54381_55464[(2)] = null);

(statearr_54381_55464[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54373 === (24))){
var inst_54273 = (state_54372[(7)]);
var inst_54292 = (state_54372[(2)]);
var inst_54293 = cljs.core.next(inst_54273);
var inst_54251 = inst_54293;
var inst_54252 = null;
var inst_54253 = (0);
var inst_54254 = (0);
var state_54372__$1 = (function (){var statearr_54382 = state_54372;
(statearr_54382[(13)] = inst_54254);

(statearr_54382[(14)] = inst_54252);

(statearr_54382[(15)] = inst_54251);

(statearr_54382[(16)] = inst_54253);

(statearr_54382[(17)] = inst_54292);

return statearr_54382;
})();
var statearr_54383_55465 = state_54372__$1;
(statearr_54383_55465[(2)] = null);

(statearr_54383_55465[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54373 === (39))){
var state_54372__$1 = state_54372;
var statearr_54387_55466 = state_54372__$1;
(statearr_54387_55466[(2)] = null);

(statearr_54387_55466[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54373 === (4))){
var inst_54242 = (state_54372[(12)]);
var inst_54242__$1 = (state_54372[(2)]);
var inst_54243 = (inst_54242__$1 == null);
var state_54372__$1 = (function (){var statearr_54388 = state_54372;
(statearr_54388[(12)] = inst_54242__$1);

return statearr_54388;
})();
if(cljs.core.truth_(inst_54243)){
var statearr_54389_55467 = state_54372__$1;
(statearr_54389_55467[(1)] = (5));

} else {
var statearr_54390_55468 = state_54372__$1;
(statearr_54390_55468[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54373 === (15))){
var inst_54254 = (state_54372[(13)]);
var inst_54252 = (state_54372[(14)]);
var inst_54251 = (state_54372[(15)]);
var inst_54253 = (state_54372[(16)]);
var inst_54269 = (state_54372[(2)]);
var inst_54270 = (inst_54254 + (1));
var tmp54384 = inst_54252;
var tmp54385 = inst_54251;
var tmp54386 = inst_54253;
var inst_54251__$1 = tmp54385;
var inst_54252__$1 = tmp54384;
var inst_54253__$1 = tmp54386;
var inst_54254__$1 = inst_54270;
var state_54372__$1 = (function (){var statearr_54391 = state_54372;
(statearr_54391[(13)] = inst_54254__$1);

(statearr_54391[(14)] = inst_54252__$1);

(statearr_54391[(18)] = inst_54269);

(statearr_54391[(15)] = inst_54251__$1);

(statearr_54391[(16)] = inst_54253__$1);

return statearr_54391;
})();
var statearr_54392_55469 = state_54372__$1;
(statearr_54392_55469[(2)] = null);

(statearr_54392_55469[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54373 === (21))){
var inst_54296 = (state_54372[(2)]);
var state_54372__$1 = state_54372;
var statearr_54396_55470 = state_54372__$1;
(statearr_54396_55470[(2)] = inst_54296);

(statearr_54396_55470[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54373 === (31))){
var inst_54322 = (state_54372[(9)]);
var inst_54326 = m.cljs$core$async$Mult$untap_STAR_$arity$2(null,inst_54322);
var state_54372__$1 = state_54372;
var statearr_54397_55471 = state_54372__$1;
(statearr_54397_55471[(2)] = inst_54326);

(statearr_54397_55471[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54373 === (32))){
var inst_54314 = (state_54372[(19)]);
var inst_54315 = (state_54372[(10)]);
var inst_54317 = (state_54372[(11)]);
var inst_54316 = (state_54372[(20)]);
var inst_54328 = (state_54372[(2)]);
var inst_54329 = (inst_54317 + (1));
var tmp54393 = inst_54314;
var tmp54394 = inst_54315;
var tmp54395 = inst_54316;
var inst_54314__$1 = tmp54393;
var inst_54315__$1 = tmp54394;
var inst_54316__$1 = tmp54395;
var inst_54317__$1 = inst_54329;
var state_54372__$1 = (function (){var statearr_54398 = state_54372;
(statearr_54398[(19)] = inst_54314__$1);

(statearr_54398[(10)] = inst_54315__$1);

(statearr_54398[(21)] = inst_54328);

(statearr_54398[(11)] = inst_54317__$1);

(statearr_54398[(20)] = inst_54316__$1);

return statearr_54398;
})();
var statearr_54399_55472 = state_54372__$1;
(statearr_54399_55472[(2)] = null);

(statearr_54399_55472[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54373 === (40))){
var inst_54341 = (state_54372[(22)]);
var inst_54345 = m.cljs$core$async$Mult$untap_STAR_$arity$2(null,inst_54341);
var state_54372__$1 = state_54372;
var statearr_54400_55473 = state_54372__$1;
(statearr_54400_55473[(2)] = inst_54345);

(statearr_54400_55473[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54373 === (33))){
var inst_54332 = (state_54372[(23)]);
var inst_54334 = cljs.core.chunked_seq_QMARK_(inst_54332);
var state_54372__$1 = state_54372;
if(inst_54334){
var statearr_54401_55474 = state_54372__$1;
(statearr_54401_55474[(1)] = (36));

} else {
var statearr_54402_55475 = state_54372__$1;
(statearr_54402_55475[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54373 === (13))){
var inst_54263 = (state_54372[(24)]);
var inst_54266 = cljs.core.async.close_BANG_(inst_54263);
var state_54372__$1 = state_54372;
var statearr_54403_55476 = state_54372__$1;
(statearr_54403_55476[(2)] = inst_54266);

(statearr_54403_55476[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54373 === (22))){
var inst_54286 = (state_54372[(8)]);
var inst_54289 = cljs.core.async.close_BANG_(inst_54286);
var state_54372__$1 = state_54372;
var statearr_54404_55477 = state_54372__$1;
(statearr_54404_55477[(2)] = inst_54289);

(statearr_54404_55477[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54373 === (36))){
var inst_54332 = (state_54372[(23)]);
var inst_54336 = cljs.core.chunk_first(inst_54332);
var inst_54337 = cljs.core.chunk_rest(inst_54332);
var inst_54338 = cljs.core.count(inst_54336);
var inst_54314 = inst_54337;
var inst_54315 = inst_54336;
var inst_54316 = inst_54338;
var inst_54317 = (0);
var state_54372__$1 = (function (){var statearr_54405 = state_54372;
(statearr_54405[(19)] = inst_54314);

(statearr_54405[(10)] = inst_54315);

(statearr_54405[(11)] = inst_54317);

(statearr_54405[(20)] = inst_54316);

return statearr_54405;
})();
var statearr_54406_55478 = state_54372__$1;
(statearr_54406_55478[(2)] = null);

(statearr_54406_55478[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54373 === (41))){
var inst_54332 = (state_54372[(23)]);
var inst_54347 = (state_54372[(2)]);
var inst_54348 = cljs.core.next(inst_54332);
var inst_54314 = inst_54348;
var inst_54315 = null;
var inst_54316 = (0);
var inst_54317 = (0);
var state_54372__$1 = (function (){var statearr_54407 = state_54372;
(statearr_54407[(19)] = inst_54314);

(statearr_54407[(10)] = inst_54315);

(statearr_54407[(25)] = inst_54347);

(statearr_54407[(11)] = inst_54317);

(statearr_54407[(20)] = inst_54316);

return statearr_54407;
})();
var statearr_54408_55479 = state_54372__$1;
(statearr_54408_55479[(2)] = null);

(statearr_54408_55479[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54373 === (43))){
var state_54372__$1 = state_54372;
var statearr_54409_55480 = state_54372__$1;
(statearr_54409_55480[(2)] = null);

(statearr_54409_55480[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54373 === (29))){
var inst_54356 = (state_54372[(2)]);
var state_54372__$1 = state_54372;
var statearr_54410_55481 = state_54372__$1;
(statearr_54410_55481[(2)] = inst_54356);

(statearr_54410_55481[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54373 === (44))){
var inst_54365 = (state_54372[(2)]);
var state_54372__$1 = (function (){var statearr_54411 = state_54372;
(statearr_54411[(26)] = inst_54365);

return statearr_54411;
})();
var statearr_54412_55482 = state_54372__$1;
(statearr_54412_55482[(2)] = null);

(statearr_54412_55482[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54373 === (6))){
var inst_54306 = (state_54372[(27)]);
var inst_54305 = cljs.core.deref(cs);
var inst_54306__$1 = cljs.core.keys(inst_54305);
var inst_54307 = cljs.core.count(inst_54306__$1);
var inst_54308 = cljs.core.reset_BANG_(dctr,inst_54307);
var inst_54313 = cljs.core.seq(inst_54306__$1);
var inst_54314 = inst_54313;
var inst_54315 = null;
var inst_54316 = (0);
var inst_54317 = (0);
var state_54372__$1 = (function (){var statearr_54413 = state_54372;
(statearr_54413[(19)] = inst_54314);

(statearr_54413[(10)] = inst_54315);

(statearr_54413[(11)] = inst_54317);

(statearr_54413[(20)] = inst_54316);

(statearr_54413[(27)] = inst_54306__$1);

(statearr_54413[(28)] = inst_54308);

return statearr_54413;
})();
var statearr_54414_55483 = state_54372__$1;
(statearr_54414_55483[(2)] = null);

(statearr_54414_55483[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54373 === (28))){
var inst_54314 = (state_54372[(19)]);
var inst_54332 = (state_54372[(23)]);
var inst_54332__$1 = cljs.core.seq(inst_54314);
var state_54372__$1 = (function (){var statearr_54415 = state_54372;
(statearr_54415[(23)] = inst_54332__$1);

return statearr_54415;
})();
if(inst_54332__$1){
var statearr_54416_55484 = state_54372__$1;
(statearr_54416_55484[(1)] = (33));

} else {
var statearr_54417_55485 = state_54372__$1;
(statearr_54417_55485[(1)] = (34));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54373 === (25))){
var inst_54317 = (state_54372[(11)]);
var inst_54316 = (state_54372[(20)]);
var inst_54319 = (inst_54317 < inst_54316);
var inst_54320 = inst_54319;
var state_54372__$1 = state_54372;
if(cljs.core.truth_(inst_54320)){
var statearr_54418_55486 = state_54372__$1;
(statearr_54418_55486[(1)] = (27));

} else {
var statearr_54419_55487 = state_54372__$1;
(statearr_54419_55487[(1)] = (28));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54373 === (34))){
var state_54372__$1 = state_54372;
var statearr_54420_55488 = state_54372__$1;
(statearr_54420_55488[(2)] = null);

(statearr_54420_55488[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54373 === (17))){
var state_54372__$1 = state_54372;
var statearr_54421_55489 = state_54372__$1;
(statearr_54421_55489[(2)] = null);

(statearr_54421_55489[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54373 === (3))){
var inst_54370 = (state_54372[(2)]);
var state_54372__$1 = state_54372;
return cljs.core.async.impl.ioc_helpers.return_chan(state_54372__$1,inst_54370);
} else {
if((state_val_54373 === (12))){
var inst_54301 = (state_54372[(2)]);
var state_54372__$1 = state_54372;
var statearr_54422_55490 = state_54372__$1;
(statearr_54422_55490[(2)] = inst_54301);

(statearr_54422_55490[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54373 === (2))){
var state_54372__$1 = state_54372;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_54372__$1,(4),ch);
} else {
if((state_val_54373 === (23))){
var state_54372__$1 = state_54372;
var statearr_54423_55491 = state_54372__$1;
(statearr_54423_55491[(2)] = null);

(statearr_54423_55491[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54373 === (35))){
var inst_54354 = (state_54372[(2)]);
var state_54372__$1 = state_54372;
var statearr_54424_55492 = state_54372__$1;
(statearr_54424_55492[(2)] = inst_54354);

(statearr_54424_55492[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54373 === (19))){
var inst_54273 = (state_54372[(7)]);
var inst_54277 = cljs.core.chunk_first(inst_54273);
var inst_54278 = cljs.core.chunk_rest(inst_54273);
var inst_54279 = cljs.core.count(inst_54277);
var inst_54251 = inst_54278;
var inst_54252 = inst_54277;
var inst_54253 = inst_54279;
var inst_54254 = (0);
var state_54372__$1 = (function (){var statearr_54425 = state_54372;
(statearr_54425[(13)] = inst_54254);

(statearr_54425[(14)] = inst_54252);

(statearr_54425[(15)] = inst_54251);

(statearr_54425[(16)] = inst_54253);

return statearr_54425;
})();
var statearr_54426_55493 = state_54372__$1;
(statearr_54426_55493[(2)] = null);

(statearr_54426_55493[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54373 === (11))){
var inst_54273 = (state_54372[(7)]);
var inst_54251 = (state_54372[(15)]);
var inst_54273__$1 = cljs.core.seq(inst_54251);
var state_54372__$1 = (function (){var statearr_54427 = state_54372;
(statearr_54427[(7)] = inst_54273__$1);

return statearr_54427;
})();
if(inst_54273__$1){
var statearr_54428_55494 = state_54372__$1;
(statearr_54428_55494[(1)] = (16));

} else {
var statearr_54429_55496 = state_54372__$1;
(statearr_54429_55496[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54373 === (9))){
var inst_54303 = (state_54372[(2)]);
var state_54372__$1 = state_54372;
var statearr_54430_55498 = state_54372__$1;
(statearr_54430_55498[(2)] = inst_54303);

(statearr_54430_55498[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54373 === (5))){
var inst_54249 = cljs.core.deref(cs);
var inst_54250 = cljs.core.seq(inst_54249);
var inst_54251 = inst_54250;
var inst_54252 = null;
var inst_54253 = (0);
var inst_54254 = (0);
var state_54372__$1 = (function (){var statearr_54431 = state_54372;
(statearr_54431[(13)] = inst_54254);

(statearr_54431[(14)] = inst_54252);

(statearr_54431[(15)] = inst_54251);

(statearr_54431[(16)] = inst_54253);

return statearr_54431;
})();
var statearr_54432_55502 = state_54372__$1;
(statearr_54432_55502[(2)] = null);

(statearr_54432_55502[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54373 === (14))){
var state_54372__$1 = state_54372;
var statearr_54433_55503 = state_54372__$1;
(statearr_54433_55503[(2)] = null);

(statearr_54433_55503[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54373 === (45))){
var inst_54362 = (state_54372[(2)]);
var state_54372__$1 = state_54372;
var statearr_54434_55504 = state_54372__$1;
(statearr_54434_55504[(2)] = inst_54362);

(statearr_54434_55504[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54373 === (26))){
var inst_54306 = (state_54372[(27)]);
var inst_54358 = (state_54372[(2)]);
var inst_54359 = cljs.core.seq(inst_54306);
var state_54372__$1 = (function (){var statearr_54435 = state_54372;
(statearr_54435[(29)] = inst_54358);

return statearr_54435;
})();
if(inst_54359){
var statearr_54436_55506 = state_54372__$1;
(statearr_54436_55506[(1)] = (42));

} else {
var statearr_54437_55507 = state_54372__$1;
(statearr_54437_55507[(1)] = (43));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54373 === (16))){
var inst_54273 = (state_54372[(7)]);
var inst_54275 = cljs.core.chunked_seq_QMARK_(inst_54273);
var state_54372__$1 = state_54372;
if(inst_54275){
var statearr_54438_55508 = state_54372__$1;
(statearr_54438_55508[(1)] = (19));

} else {
var statearr_54439_55509 = state_54372__$1;
(statearr_54439_55509[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54373 === (38))){
var inst_54351 = (state_54372[(2)]);
var state_54372__$1 = state_54372;
var statearr_54440_55510 = state_54372__$1;
(statearr_54440_55510[(2)] = inst_54351);

(statearr_54440_55510[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54373 === (30))){
var state_54372__$1 = state_54372;
var statearr_54441_55511 = state_54372__$1;
(statearr_54441_55511[(2)] = null);

(statearr_54441_55511[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54373 === (10))){
var inst_54254 = (state_54372[(13)]);
var inst_54252 = (state_54372[(14)]);
var inst_54262 = cljs.core._nth(inst_54252,inst_54254);
var inst_54263 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_54262,(0),null);
var inst_54264 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_54262,(1),null);
var state_54372__$1 = (function (){var statearr_54442 = state_54372;
(statearr_54442[(24)] = inst_54263);

return statearr_54442;
})();
if(cljs.core.truth_(inst_54264)){
var statearr_54443_55514 = state_54372__$1;
(statearr_54443_55514[(1)] = (13));

} else {
var statearr_54444_55515 = state_54372__$1;
(statearr_54444_55515[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54373 === (18))){
var inst_54299 = (state_54372[(2)]);
var state_54372__$1 = state_54372;
var statearr_54445_55516 = state_54372__$1;
(statearr_54445_55516[(2)] = inst_54299);

(statearr_54445_55516[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54373 === (42))){
var state_54372__$1 = state_54372;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_54372__$1,(45),dchan);
} else {
if((state_val_54373 === (37))){
var inst_54332 = (state_54372[(23)]);
var inst_54341 = (state_54372[(22)]);
var inst_54242 = (state_54372[(12)]);
var inst_54341__$1 = cljs.core.first(inst_54332);
var inst_54342 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3(inst_54341__$1,inst_54242,done);
var state_54372__$1 = (function (){var statearr_54446 = state_54372;
(statearr_54446[(22)] = inst_54341__$1);

return statearr_54446;
})();
if(cljs.core.truth_(inst_54342)){
var statearr_54447_55517 = state_54372__$1;
(statearr_54447_55517[(1)] = (39));

} else {
var statearr_54448_55518 = state_54372__$1;
(statearr_54448_55518[(1)] = (40));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54373 === (8))){
var inst_54254 = (state_54372[(13)]);
var inst_54253 = (state_54372[(16)]);
var inst_54256 = (inst_54254 < inst_54253);
var inst_54257 = inst_54256;
var state_54372__$1 = state_54372;
if(cljs.core.truth_(inst_54257)){
var statearr_54449_55519 = state_54372__$1;
(statearr_54449_55519[(1)] = (10));

} else {
var statearr_54450_55520 = state_54372__$1;
(statearr_54450_55520[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$mult_$_state_machine__41903__auto__ = null;
var cljs$core$async$mult_$_state_machine__41903__auto____0 = (function (){
var statearr_54451 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_54451[(0)] = cljs$core$async$mult_$_state_machine__41903__auto__);

(statearr_54451[(1)] = (1));

return statearr_54451;
});
var cljs$core$async$mult_$_state_machine__41903__auto____1 = (function (state_54372){
while(true){
var ret_value__41904__auto__ = (function (){try{while(true){
var result__41905__auto__ = switch__41902__auto__(state_54372);
if(cljs.core.keyword_identical_QMARK_(result__41905__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__41905__auto__;
}
break;
}
}catch (e54452){var ex__41906__auto__ = e54452;
var statearr_54453_55521 = state_54372;
(statearr_54453_55521[(2)] = ex__41906__auto__);


if(cljs.core.seq((state_54372[(4)]))){
var statearr_54454_55522 = state_54372;
(statearr_54454_55522[(1)] = cljs.core.first((state_54372[(4)])));

} else {
throw ex__41906__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41904__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__55523 = state_54372;
state_54372 = G__55523;
continue;
} else {
return ret_value__41904__auto__;
}
break;
}
});
cljs$core$async$mult_$_state_machine__41903__auto__ = function(state_54372){
switch(arguments.length){
case 0:
return cljs$core$async$mult_$_state_machine__41903__auto____0.call(this);
case 1:
return cljs$core$async$mult_$_state_machine__41903__auto____1.call(this,state_54372);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mult_$_state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mult_$_state_machine__41903__auto____0;
cljs$core$async$mult_$_state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mult_$_state_machine__41903__auto____1;
return cljs$core$async$mult_$_state_machine__41903__auto__;
})()
})();
var state__41997__auto__ = (function (){var statearr_54455 = f__41996__auto__();
(statearr_54455[(6)] = c__41995__auto___55457);

return statearr_54455;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__41997__auto__);
}));


return m;
});
/**
 * Copies the mult source onto the supplied channel.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.tap = (function cljs$core$async$tap(var_args){
var G__54457 = arguments.length;
switch (G__54457) {
case 2:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2 = (function (mult,ch){
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3(mult,ch,true);
}));

(cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3 = (function (mult,ch,close_QMARK_){
cljs.core.async.tap_STAR_(mult,ch,close_QMARK_);

return ch;
}));

(cljs.core.async.tap.cljs$lang$maxFixedArity = 3);

/**
 * Disconnects a target channel from a mult
 */
cljs.core.async.untap = (function cljs$core$async$untap(mult,ch){
return cljs.core.async.untap_STAR_(mult,ch);
});
/**
 * Disconnects all target channels from a mult
 */
cljs.core.async.untap_all = (function cljs$core$async$untap_all(mult){
return cljs.core.async.untap_all_STAR_(mult);
});

/**
 * @interface
 */
cljs.core.async.Mix = function(){};

var cljs$core$async$Mix$admix_STAR_$dyn_55529 = (function (m,ch){
var x__4550__auto__ = (((m == null))?null:m);
var m__4551__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__4550__auto__)]);
if((!((m__4551__auto__ == null)))){
return (m__4551__auto__.cljs$core$IFn$_invoke$arity$2 ? m__4551__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__4551__auto__.call(null,m,ch));
} else {
var m__4549__auto__ = (cljs.core.async.admix_STAR_["_"]);
if((!((m__4549__auto__ == null)))){
return (m__4549__auto__.cljs$core$IFn$_invoke$arity$2 ? m__4549__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__4549__auto__.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mix.admix*",m);
}
}
});
cljs.core.async.admix_STAR_ = (function cljs$core$async$admix_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$admix_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else {
return cljs$core$async$Mix$admix_STAR_$dyn_55529(m,ch);
}
});

var cljs$core$async$Mix$unmix_STAR_$dyn_55530 = (function (m,ch){
var x__4550__auto__ = (((m == null))?null:m);
var m__4551__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__4550__auto__)]);
if((!((m__4551__auto__ == null)))){
return (m__4551__auto__.cljs$core$IFn$_invoke$arity$2 ? m__4551__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__4551__auto__.call(null,m,ch));
} else {
var m__4549__auto__ = (cljs.core.async.unmix_STAR_["_"]);
if((!((m__4549__auto__ == null)))){
return (m__4549__auto__.cljs$core$IFn$_invoke$arity$2 ? m__4549__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__4549__auto__.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mix.unmix*",m);
}
}
});
cljs.core.async.unmix_STAR_ = (function cljs$core$async$unmix_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$unmix_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else {
return cljs$core$async$Mix$unmix_STAR_$dyn_55530(m,ch);
}
});

var cljs$core$async$Mix$unmix_all_STAR_$dyn_55533 = (function (m){
var x__4550__auto__ = (((m == null))?null:m);
var m__4551__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__4550__auto__)]);
if((!((m__4551__auto__ == null)))){
return (m__4551__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4551__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__4551__auto__.call(null,m));
} else {
var m__4549__auto__ = (cljs.core.async.unmix_all_STAR_["_"]);
if((!((m__4549__auto__ == null)))){
return (m__4549__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4549__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__4549__auto__.call(null,m));
} else {
throw cljs.core.missing_protocol("Mix.unmix-all*",m);
}
}
});
cljs.core.async.unmix_all_STAR_ = (function cljs$core$async$unmix_all_STAR_(m){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$unmix_all_STAR_$arity$1 == null)))))){
return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else {
return cljs$core$async$Mix$unmix_all_STAR_$dyn_55533(m);
}
});

var cljs$core$async$Mix$toggle_STAR_$dyn_55536 = (function (m,state_map){
var x__4550__auto__ = (((m == null))?null:m);
var m__4551__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__4550__auto__)]);
if((!((m__4551__auto__ == null)))){
return (m__4551__auto__.cljs$core$IFn$_invoke$arity$2 ? m__4551__auto__.cljs$core$IFn$_invoke$arity$2(m,state_map) : m__4551__auto__.call(null,m,state_map));
} else {
var m__4549__auto__ = (cljs.core.async.toggle_STAR_["_"]);
if((!((m__4549__auto__ == null)))){
return (m__4549__auto__.cljs$core$IFn$_invoke$arity$2 ? m__4549__auto__.cljs$core$IFn$_invoke$arity$2(m,state_map) : m__4549__auto__.call(null,m,state_map));
} else {
throw cljs.core.missing_protocol("Mix.toggle*",m);
}
}
});
cljs.core.async.toggle_STAR_ = (function cljs$core$async$toggle_STAR_(m,state_map){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$toggle_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else {
return cljs$core$async$Mix$toggle_STAR_$dyn_55536(m,state_map);
}
});

var cljs$core$async$Mix$solo_mode_STAR_$dyn_55540 = (function (m,mode){
var x__4550__auto__ = (((m == null))?null:m);
var m__4551__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__4550__auto__)]);
if((!((m__4551__auto__ == null)))){
return (m__4551__auto__.cljs$core$IFn$_invoke$arity$2 ? m__4551__auto__.cljs$core$IFn$_invoke$arity$2(m,mode) : m__4551__auto__.call(null,m,mode));
} else {
var m__4549__auto__ = (cljs.core.async.solo_mode_STAR_["_"]);
if((!((m__4549__auto__ == null)))){
return (m__4549__auto__.cljs$core$IFn$_invoke$arity$2 ? m__4549__auto__.cljs$core$IFn$_invoke$arity$2(m,mode) : m__4549__auto__.call(null,m,mode));
} else {
throw cljs.core.missing_protocol("Mix.solo-mode*",m);
}
}
});
cljs.core.async.solo_mode_STAR_ = (function cljs$core$async$solo_mode_STAR_(m,mode){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$solo_mode_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else {
return cljs$core$async$Mix$solo_mode_STAR_$dyn_55540(m,mode);
}
});

cljs.core.async.ioc_alts_BANG_ = (function cljs$core$async$ioc_alts_BANG_(var_args){
var args__4870__auto__ = [];
var len__4864__auto___55545 = arguments.length;
var i__4865__auto___55546 = (0);
while(true){
if((i__4865__auto___55546 < len__4864__auto___55545)){
args__4870__auto__.push((arguments[i__4865__auto___55546]));

var G__55547 = (i__4865__auto___55546 + (1));
i__4865__auto___55546 = G__55547;
continue;
} else {
}
break;
}

var argseq__4871__auto__ = ((((3) < args__4870__auto__.length))?(new cljs.core.IndexedSeq(args__4870__auto__.slice((3)),(0),null)):null);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__4871__auto__);
});

(cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,cont_block,ports,p__54462){
var map__54463 = p__54462;
var map__54463__$1 = cljs.core.__destructure_map(map__54463);
var opts = map__54463__$1;
var statearr_54464_55554 = state;
(statearr_54464_55554[(1)] = cont_block);


var temp__5753__auto__ = cljs.core.async.do_alts((function (val){
var statearr_54465_55555 = state;
(statearr_54465_55555[(2)] = val);


return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state);
}),ports,opts);
if(cljs.core.truth_(temp__5753__auto__)){
var cb = temp__5753__auto__;
var statearr_54466_55556 = state;
(statearr_54466_55556[(2)] = cljs.core.deref(cb));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}));

(cljs.core.async.ioc_alts_BANG_.cljs$lang$maxFixedArity = (3));

/** @this {Function} */
(cljs.core.async.ioc_alts_BANG_.cljs$lang$applyTo = (function (seq54458){
var G__54459 = cljs.core.first(seq54458);
var seq54458__$1 = cljs.core.next(seq54458);
var G__54460 = cljs.core.first(seq54458__$1);
var seq54458__$2 = cljs.core.next(seq54458__$1);
var G__54461 = cljs.core.first(seq54458__$2);
var seq54458__$3 = cljs.core.next(seq54458__$2);
var self__4851__auto__ = this;
return self__4851__auto__.cljs$core$IFn$_invoke$arity$variadic(G__54459,G__54460,G__54461,seq54458__$3);
}));

/**
 * Creates and returns a mix of one or more input channels which will
 *   be put on the supplied out channel. Input sources can be added to
 *   the mix with 'admix', and removed with 'unmix'. A mix supports
 *   soloing, muting and pausing multiple inputs atomically using
 *   'toggle', and can solo using either muting or pausing as determined
 *   by 'solo-mode'.
 * 
 *   Each channel can have zero or more boolean modes set via 'toggle':
 * 
 *   :solo - when true, only this (ond other soloed) channel(s) will appear
 *        in the mix output channel. :mute and :pause states of soloed
 *        channels are ignored. If solo-mode is :mute, non-soloed
 *        channels are muted, if :pause, non-soloed channels are
 *        paused.
 * 
 *   :mute - muted channels will have their contents consumed but not included in the mix
 *   :pause - paused channels will not have their contents consumed (and thus also not included in the mix)
 */
cljs.core.async.mix = (function cljs$core$async$mix(out){
var cs = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var solo_modes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pause","pause",-2095325672),null,new cljs.core.Keyword(null,"mute","mute",1151223646),null], null), null);
var attrs = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(solo_modes,new cljs.core.Keyword(null,"solo","solo",-316350075));
var solo_mode = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"mute","mute",1151223646));
var change = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(cljs.core.async.sliding_buffer((1)));
var changed = (function (){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(change,true);
});
var pick = (function (attr,chs){
return cljs.core.reduce_kv((function (ret,c,v){
if(cljs.core.truth_((attr.cljs$core$IFn$_invoke$arity$1 ? attr.cljs$core$IFn$_invoke$arity$1(v) : attr.call(null,v)))){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ret,c);
} else {
return ret;
}
}),cljs.core.PersistentHashSet.EMPTY,chs);
});
var calc_state = (function (){
var chs = cljs.core.deref(cs);
var mode = cljs.core.deref(solo_mode);
var solos = pick(new cljs.core.Keyword(null,"solo","solo",-316350075),chs);
var pauses = pick(new cljs.core.Keyword(null,"pause","pause",-2095325672),chs);
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"solos","solos",1441458643),solos,new cljs.core.Keyword(null,"mutes","mutes",1068806309),pick(new cljs.core.Keyword(null,"mute","mute",1151223646),chs),new cljs.core.Keyword(null,"reads","reads",-1215067361),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(((((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(mode,new cljs.core.Keyword(null,"pause","pause",-2095325672))) && ((!(cljs.core.empty_QMARK_(solos))))))?cljs.core.vec(solos):cljs.core.vec(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(pauses,cljs.core.keys(chs)))),change)], null);
});
var m = (function (){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async54467 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mix}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async54467 = (function (change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta54468){
this.change = change;
this.solo_mode = solo_mode;
this.pick = pick;
this.cs = cs;
this.calc_state = calc_state;
this.out = out;
this.changed = changed;
this.solo_modes = solo_modes;
this.attrs = attrs;
this.meta54468 = meta54468;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async54467.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_54469,meta54468__$1){
var self__ = this;
var _54469__$1 = this;
return (new cljs.core.async.t_cljs$core$async54467(self__.change,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta54468__$1));
}));

(cljs.core.async.t_cljs$core$async54467.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_54469){
var self__ = this;
var _54469__$1 = this;
return self__.meta54468;
}));

(cljs.core.async.t_cljs$core$async54467.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async54467.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.out;
}));

(cljs.core.async.t_cljs$core$async54467.prototype.cljs$core$async$Mix$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async54467.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async54467.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.dissoc,ch);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async54467.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async54467.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = (function (_,state_map){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core.merge_with,cljs.core.merge),state_map);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async54467.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = (function (_,mode){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_((self__.solo_modes.cljs$core$IFn$_invoke$arity$1 ? self__.solo_modes.cljs$core$IFn$_invoke$arity$1(mode) : self__.solo_modes.call(null,mode)))){
} else {
throw (new Error(["Assert failed: ",["mode must be one of: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.solo_modes)].join(''),"\n","(solo-modes mode)"].join('')));
}

cljs.core.reset_BANG_(self__.solo_mode,mode);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async54467.getBasis = (function (){
return new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"change","change",477485025,null),new cljs.core.Symbol(null,"solo-mode","solo-mode",2031788074,null),new cljs.core.Symbol(null,"pick","pick",1300068175,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"calc-state","calc-state",-349968968,null),new cljs.core.Symbol(null,"out","out",729986010,null),new cljs.core.Symbol(null,"changed","changed",-2083710852,null),new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"attrs","attrs",-450137186,null),new cljs.core.Symbol(null,"meta54468","meta54468",-2108187362,null)], null);
}));

(cljs.core.async.t_cljs$core$async54467.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async54467.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async54467");

(cljs.core.async.t_cljs$core$async54467.cljs$lang$ctorPrWriter = (function (this__4491__auto__,writer__4492__auto__,opt__4493__auto__){
return cljs.core._write(writer__4492__auto__,"cljs.core.async/t_cljs$core$async54467");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async54467.
 */
cljs.core.async.__GT_t_cljs$core$async54467 = (function cljs$core$async$mix_$___GT_t_cljs$core$async54467(change__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta54468){
return (new cljs.core.async.t_cljs$core$async54467(change__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta54468));
});

}

return (new cljs.core.async.t_cljs$core$async54467(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__41995__auto___55563 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__41996__auto__ = (function (){var switch__41902__auto__ = (function (state_54537){
var state_val_54538 = (state_54537[(1)]);
if((state_val_54538 === (7))){
var inst_54497 = (state_54537[(2)]);
var state_54537__$1 = state_54537;
if(cljs.core.truth_(inst_54497)){
var statearr_54539_55564 = state_54537__$1;
(statearr_54539_55564[(1)] = (8));

} else {
var statearr_54540_55565 = state_54537__$1;
(statearr_54540_55565[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54538 === (20))){
var inst_54490 = (state_54537[(7)]);
var state_54537__$1 = state_54537;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_54537__$1,(23),out,inst_54490);
} else {
if((state_val_54538 === (1))){
var inst_54473 = calc_state();
var inst_54474 = cljs.core.__destructure_map(inst_54473);
var inst_54475 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_54474,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_54476 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_54474,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_54477 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_54474,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var inst_54478 = inst_54473;
var state_54537__$1 = (function (){var statearr_54541 = state_54537;
(statearr_54541[(8)] = inst_54476);

(statearr_54541[(9)] = inst_54478);

(statearr_54541[(10)] = inst_54477);

(statearr_54541[(11)] = inst_54475);

return statearr_54541;
})();
var statearr_54542_55566 = state_54537__$1;
(statearr_54542_55566[(2)] = null);

(statearr_54542_55566[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54538 === (24))){
var inst_54481 = (state_54537[(12)]);
var inst_54478 = inst_54481;
var state_54537__$1 = (function (){var statearr_54543 = state_54537;
(statearr_54543[(9)] = inst_54478);

return statearr_54543;
})();
var statearr_54544_55567 = state_54537__$1;
(statearr_54544_55567[(2)] = null);

(statearr_54544_55567[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54538 === (4))){
var inst_54490 = (state_54537[(7)]);
var inst_54492 = (state_54537[(13)]);
var inst_54489 = (state_54537[(2)]);
var inst_54490__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_54489,(0),null);
var inst_54491 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_54489,(1),null);
var inst_54492__$1 = (inst_54490__$1 == null);
var state_54537__$1 = (function (){var statearr_54545 = state_54537;
(statearr_54545[(14)] = inst_54491);

(statearr_54545[(7)] = inst_54490__$1);

(statearr_54545[(13)] = inst_54492__$1);

return statearr_54545;
})();
if(cljs.core.truth_(inst_54492__$1)){
var statearr_54546_55568 = state_54537__$1;
(statearr_54546_55568[(1)] = (5));

} else {
var statearr_54547_55569 = state_54537__$1;
(statearr_54547_55569[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54538 === (15))){
var inst_54511 = (state_54537[(15)]);
var inst_54482 = (state_54537[(16)]);
var inst_54511__$1 = cljs.core.empty_QMARK_(inst_54482);
var state_54537__$1 = (function (){var statearr_54548 = state_54537;
(statearr_54548[(15)] = inst_54511__$1);

return statearr_54548;
})();
if(inst_54511__$1){
var statearr_54549_55570 = state_54537__$1;
(statearr_54549_55570[(1)] = (17));

} else {
var statearr_54550_55571 = state_54537__$1;
(statearr_54550_55571[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54538 === (21))){
var inst_54481 = (state_54537[(12)]);
var inst_54478 = inst_54481;
var state_54537__$1 = (function (){var statearr_54551 = state_54537;
(statearr_54551[(9)] = inst_54478);

return statearr_54551;
})();
var statearr_54552_55572 = state_54537__$1;
(statearr_54552_55572[(2)] = null);

(statearr_54552_55572[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54538 === (13))){
var inst_54504 = (state_54537[(2)]);
var inst_54505 = calc_state();
var inst_54478 = inst_54505;
var state_54537__$1 = (function (){var statearr_54553 = state_54537;
(statearr_54553[(17)] = inst_54504);

(statearr_54553[(9)] = inst_54478);

return statearr_54553;
})();
var statearr_54554_55573 = state_54537__$1;
(statearr_54554_55573[(2)] = null);

(statearr_54554_55573[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54538 === (22))){
var inst_54531 = (state_54537[(2)]);
var state_54537__$1 = state_54537;
var statearr_54555_55574 = state_54537__$1;
(statearr_54555_55574[(2)] = inst_54531);

(statearr_54555_55574[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54538 === (6))){
var inst_54491 = (state_54537[(14)]);
var inst_54495 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_54491,change);
var state_54537__$1 = state_54537;
var statearr_54556_55575 = state_54537__$1;
(statearr_54556_55575[(2)] = inst_54495);

(statearr_54556_55575[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54538 === (25))){
var state_54537__$1 = state_54537;
var statearr_54557_55582 = state_54537__$1;
(statearr_54557_55582[(2)] = null);

(statearr_54557_55582[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54538 === (17))){
var inst_54491 = (state_54537[(14)]);
var inst_54483 = (state_54537[(18)]);
var inst_54513 = (inst_54483.cljs$core$IFn$_invoke$arity$1 ? inst_54483.cljs$core$IFn$_invoke$arity$1(inst_54491) : inst_54483.call(null,inst_54491));
var inst_54514 = cljs.core.not(inst_54513);
var state_54537__$1 = state_54537;
var statearr_54558_55583 = state_54537__$1;
(statearr_54558_55583[(2)] = inst_54514);

(statearr_54558_55583[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54538 === (3))){
var inst_54535 = (state_54537[(2)]);
var state_54537__$1 = state_54537;
return cljs.core.async.impl.ioc_helpers.return_chan(state_54537__$1,inst_54535);
} else {
if((state_val_54538 === (12))){
var state_54537__$1 = state_54537;
var statearr_54559_55584 = state_54537__$1;
(statearr_54559_55584[(2)] = null);

(statearr_54559_55584[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54538 === (2))){
var inst_54478 = (state_54537[(9)]);
var inst_54481 = (state_54537[(12)]);
var inst_54481__$1 = cljs.core.__destructure_map(inst_54478);
var inst_54482 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_54481__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_54483 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_54481__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_54484 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_54481__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var state_54537__$1 = (function (){var statearr_54560 = state_54537;
(statearr_54560[(16)] = inst_54482);

(statearr_54560[(18)] = inst_54483);

(statearr_54560[(12)] = inst_54481__$1);

return statearr_54560;
})();
return cljs.core.async.ioc_alts_BANG_(state_54537__$1,(4),inst_54484);
} else {
if((state_val_54538 === (23))){
var inst_54522 = (state_54537[(2)]);
var state_54537__$1 = state_54537;
if(cljs.core.truth_(inst_54522)){
var statearr_54561_55585 = state_54537__$1;
(statearr_54561_55585[(1)] = (24));

} else {
var statearr_54562_55586 = state_54537__$1;
(statearr_54562_55586[(1)] = (25));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54538 === (19))){
var inst_54517 = (state_54537[(2)]);
var state_54537__$1 = state_54537;
var statearr_54563_55587 = state_54537__$1;
(statearr_54563_55587[(2)] = inst_54517);

(statearr_54563_55587[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54538 === (11))){
var inst_54491 = (state_54537[(14)]);
var inst_54501 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(cs,cljs.core.dissoc,inst_54491);
var state_54537__$1 = state_54537;
var statearr_54564_55588 = state_54537__$1;
(statearr_54564_55588[(2)] = inst_54501);

(statearr_54564_55588[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54538 === (9))){
var inst_54508 = (state_54537[(19)]);
var inst_54482 = (state_54537[(16)]);
var inst_54491 = (state_54537[(14)]);
var inst_54508__$1 = (inst_54482.cljs$core$IFn$_invoke$arity$1 ? inst_54482.cljs$core$IFn$_invoke$arity$1(inst_54491) : inst_54482.call(null,inst_54491));
var state_54537__$1 = (function (){var statearr_54565 = state_54537;
(statearr_54565[(19)] = inst_54508__$1);

return statearr_54565;
})();
if(cljs.core.truth_(inst_54508__$1)){
var statearr_54566_55589 = state_54537__$1;
(statearr_54566_55589[(1)] = (14));

} else {
var statearr_54567_55590 = state_54537__$1;
(statearr_54567_55590[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54538 === (5))){
var inst_54492 = (state_54537[(13)]);
var state_54537__$1 = state_54537;
var statearr_54568_55591 = state_54537__$1;
(statearr_54568_55591[(2)] = inst_54492);

(statearr_54568_55591[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54538 === (14))){
var inst_54508 = (state_54537[(19)]);
var state_54537__$1 = state_54537;
var statearr_54569_55592 = state_54537__$1;
(statearr_54569_55592[(2)] = inst_54508);

(statearr_54569_55592[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54538 === (26))){
var inst_54527 = (state_54537[(2)]);
var state_54537__$1 = state_54537;
var statearr_54570_55593 = state_54537__$1;
(statearr_54570_55593[(2)] = inst_54527);

(statearr_54570_55593[(1)] = (22));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54538 === (16))){
var inst_54519 = (state_54537[(2)]);
var state_54537__$1 = state_54537;
if(cljs.core.truth_(inst_54519)){
var statearr_54571_55594 = state_54537__$1;
(statearr_54571_55594[(1)] = (20));

} else {
var statearr_54572_55595 = state_54537__$1;
(statearr_54572_55595[(1)] = (21));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54538 === (10))){
var inst_54533 = (state_54537[(2)]);
var state_54537__$1 = state_54537;
var statearr_54573_55596 = state_54537__$1;
(statearr_54573_55596[(2)] = inst_54533);

(statearr_54573_55596[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54538 === (18))){
var inst_54511 = (state_54537[(15)]);
var state_54537__$1 = state_54537;
var statearr_54574_55597 = state_54537__$1;
(statearr_54574_55597[(2)] = inst_54511);

(statearr_54574_55597[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54538 === (8))){
var inst_54490 = (state_54537[(7)]);
var inst_54499 = (inst_54490 == null);
var state_54537__$1 = state_54537;
if(cljs.core.truth_(inst_54499)){
var statearr_54575_55598 = state_54537__$1;
(statearr_54575_55598[(1)] = (11));

} else {
var statearr_54576_55599 = state_54537__$1;
(statearr_54576_55599[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$mix_$_state_machine__41903__auto__ = null;
var cljs$core$async$mix_$_state_machine__41903__auto____0 = (function (){
var statearr_54577 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_54577[(0)] = cljs$core$async$mix_$_state_machine__41903__auto__);

(statearr_54577[(1)] = (1));

return statearr_54577;
});
var cljs$core$async$mix_$_state_machine__41903__auto____1 = (function (state_54537){
while(true){
var ret_value__41904__auto__ = (function (){try{while(true){
var result__41905__auto__ = switch__41902__auto__(state_54537);
if(cljs.core.keyword_identical_QMARK_(result__41905__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__41905__auto__;
}
break;
}
}catch (e54578){var ex__41906__auto__ = e54578;
var statearr_54579_55600 = state_54537;
(statearr_54579_55600[(2)] = ex__41906__auto__);


if(cljs.core.seq((state_54537[(4)]))){
var statearr_54580_55601 = state_54537;
(statearr_54580_55601[(1)] = cljs.core.first((state_54537[(4)])));

} else {
throw ex__41906__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41904__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__55608 = state_54537;
state_54537 = G__55608;
continue;
} else {
return ret_value__41904__auto__;
}
break;
}
});
cljs$core$async$mix_$_state_machine__41903__auto__ = function(state_54537){
switch(arguments.length){
case 0:
return cljs$core$async$mix_$_state_machine__41903__auto____0.call(this);
case 1:
return cljs$core$async$mix_$_state_machine__41903__auto____1.call(this,state_54537);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mix_$_state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mix_$_state_machine__41903__auto____0;
cljs$core$async$mix_$_state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mix_$_state_machine__41903__auto____1;
return cljs$core$async$mix_$_state_machine__41903__auto__;
})()
})();
var state__41997__auto__ = (function (){var statearr_54581 = f__41996__auto__();
(statearr_54581[(6)] = c__41995__auto___55563);

return statearr_54581;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__41997__auto__);
}));


return m;
});
/**
 * Adds ch as an input to the mix
 */
cljs.core.async.admix = (function cljs$core$async$admix(mix,ch){
return cljs.core.async.admix_STAR_(mix,ch);
});
/**
 * Removes ch as an input to the mix
 */
cljs.core.async.unmix = (function cljs$core$async$unmix(mix,ch){
return cljs.core.async.unmix_STAR_(mix,ch);
});
/**
 * removes all inputs from the mix
 */
cljs.core.async.unmix_all = (function cljs$core$async$unmix_all(mix){
return cljs.core.async.unmix_all_STAR_(mix);
});
/**
 * Atomically sets the state(s) of one or more channels in a mix. The
 *   state map is a map of channels -> channel-state-map. A
 *   channel-state-map is a map of attrs -> boolean, where attr is one or
 *   more of :mute, :pause or :solo. Any states supplied are merged with
 *   the current state.
 * 
 *   Note that channels can be added to a mix via toggle, which can be
 *   used to add channels in a particular (e.g. paused) state.
 */
cljs.core.async.toggle = (function cljs$core$async$toggle(mix,state_map){
return cljs.core.async.toggle_STAR_(mix,state_map);
});
/**
 * Sets the solo mode of the mix. mode must be one of :mute or :pause
 */
cljs.core.async.solo_mode = (function cljs$core$async$solo_mode(mix,mode){
return cljs.core.async.solo_mode_STAR_(mix,mode);
});

/**
 * @interface
 */
cljs.core.async.Pub = function(){};

var cljs$core$async$Pub$sub_STAR_$dyn_55609 = (function (p,v,ch,close_QMARK_){
var x__4550__auto__ = (((p == null))?null:p);
var m__4551__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__4550__auto__)]);
if((!((m__4551__auto__ == null)))){
return (m__4551__auto__.cljs$core$IFn$_invoke$arity$4 ? m__4551__auto__.cljs$core$IFn$_invoke$arity$4(p,v,ch,close_QMARK_) : m__4551__auto__.call(null,p,v,ch,close_QMARK_));
} else {
var m__4549__auto__ = (cljs.core.async.sub_STAR_["_"]);
if((!((m__4549__auto__ == null)))){
return (m__4549__auto__.cljs$core$IFn$_invoke$arity$4 ? m__4549__auto__.cljs$core$IFn$_invoke$arity$4(p,v,ch,close_QMARK_) : m__4549__auto__.call(null,p,v,ch,close_QMARK_));
} else {
throw cljs.core.missing_protocol("Pub.sub*",p);
}
}
});
cljs.core.async.sub_STAR_ = (function cljs$core$async$sub_STAR_(p,v,ch,close_QMARK_){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$sub_STAR_$arity$4 == null)))))){
return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else {
return cljs$core$async$Pub$sub_STAR_$dyn_55609(p,v,ch,close_QMARK_);
}
});

var cljs$core$async$Pub$unsub_STAR_$dyn_55610 = (function (p,v,ch){
var x__4550__auto__ = (((p == null))?null:p);
var m__4551__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__4550__auto__)]);
if((!((m__4551__auto__ == null)))){
return (m__4551__auto__.cljs$core$IFn$_invoke$arity$3 ? m__4551__auto__.cljs$core$IFn$_invoke$arity$3(p,v,ch) : m__4551__auto__.call(null,p,v,ch));
} else {
var m__4549__auto__ = (cljs.core.async.unsub_STAR_["_"]);
if((!((m__4549__auto__ == null)))){
return (m__4549__auto__.cljs$core$IFn$_invoke$arity$3 ? m__4549__auto__.cljs$core$IFn$_invoke$arity$3(p,v,ch) : m__4549__auto__.call(null,p,v,ch));
} else {
throw cljs.core.missing_protocol("Pub.unsub*",p);
}
}
});
cljs.core.async.unsub_STAR_ = (function cljs$core$async$unsub_STAR_(p,v,ch){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_STAR_$arity$3 == null)))))){
return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else {
return cljs$core$async$Pub$unsub_STAR_$dyn_55610(p,v,ch);
}
});

var cljs$core$async$Pub$unsub_all_STAR_$dyn_55611 = (function() {
var G__55612 = null;
var G__55612__1 = (function (p){
var x__4550__auto__ = (((p == null))?null:p);
var m__4551__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__4550__auto__)]);
if((!((m__4551__auto__ == null)))){
return (m__4551__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4551__auto__.cljs$core$IFn$_invoke$arity$1(p) : m__4551__auto__.call(null,p));
} else {
var m__4549__auto__ = (cljs.core.async.unsub_all_STAR_["_"]);
if((!((m__4549__auto__ == null)))){
return (m__4549__auto__.cljs$core$IFn$_invoke$arity$1 ? m__4549__auto__.cljs$core$IFn$_invoke$arity$1(p) : m__4549__auto__.call(null,p));
} else {
throw cljs.core.missing_protocol("Pub.unsub-all*",p);
}
}
});
var G__55612__2 = (function (p,v){
var x__4550__auto__ = (((p == null))?null:p);
var m__4551__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__4550__auto__)]);
if((!((m__4551__auto__ == null)))){
return (m__4551__auto__.cljs$core$IFn$_invoke$arity$2 ? m__4551__auto__.cljs$core$IFn$_invoke$arity$2(p,v) : m__4551__auto__.call(null,p,v));
} else {
var m__4549__auto__ = (cljs.core.async.unsub_all_STAR_["_"]);
if((!((m__4549__auto__ == null)))){
return (m__4549__auto__.cljs$core$IFn$_invoke$arity$2 ? m__4549__auto__.cljs$core$IFn$_invoke$arity$2(p,v) : m__4549__auto__.call(null,p,v));
} else {
throw cljs.core.missing_protocol("Pub.unsub-all*",p);
}
}
});
G__55612 = function(p,v){
switch(arguments.length){
case 1:
return G__55612__1.call(this,p);
case 2:
return G__55612__2.call(this,p,v);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__55612.cljs$core$IFn$_invoke$arity$1 = G__55612__1;
G__55612.cljs$core$IFn$_invoke$arity$2 = G__55612__2;
return G__55612;
})()
;
cljs.core.async.unsub_all_STAR_ = (function cljs$core$async$unsub_all_STAR_(var_args){
var G__54583 = arguments.length;
switch (G__54583) {
case 1:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1 = (function (p){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$1 == null)))))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else {
return cljs$core$async$Pub$unsub_all_STAR_$dyn_55611(p);
}
}));

(cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (p,v){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$2 == null)))))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else {
return cljs$core$async$Pub$unsub_all_STAR_$dyn_55611(p,v);
}
}));

(cljs.core.async.unsub_all_STAR_.cljs$lang$maxFixedArity = 2);


/**
 * Creates and returns a pub(lication) of the supplied channel,
 *   partitioned into topics by the topic-fn. topic-fn will be applied to
 *   each value on the channel and the result will determine the 'topic'
 *   on which that value will be put. Channels can be subscribed to
 *   receive copies of topics using 'sub', and unsubscribed using
 *   'unsub'. Each topic will be handled by an internal mult on a
 *   dedicated channel. By default these internal channels are
 *   unbuffered, but a buf-fn can be supplied which, given a topic,
 *   creates a buffer with desired properties.
 * 
 *   Each item is distributed to all subs in parallel and synchronously,
 *   i.e. each sub must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow subs from holding up the pub.
 * 
 *   Items received when there are no matching subs get dropped.
 * 
 *   Note that if buf-fns are used then each topic is handled
 *   asynchronously, i.e. if a channel is subscribed to more than one
 *   topic it should not expect them to be interleaved identically with
 *   the source.
 */
cljs.core.async.pub = (function cljs$core$async$pub(var_args){
var G__54586 = arguments.length;
switch (G__54586) {
case 2:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2 = (function (ch,topic_fn){
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3(ch,topic_fn,cljs.core.constantly(null));
}));

(cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3 = (function (ch,topic_fn,buf_fn){
var mults = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var ensure_mult = (function (topic){
var or__4253__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(mults),topic);
if(cljs.core.truth_(or__4253__auto__)){
return or__4253__auto__;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(mults,(function (p1__54584_SHARP_){
if(cljs.core.truth_((p1__54584_SHARP_.cljs$core$IFn$_invoke$arity$1 ? p1__54584_SHARP_.cljs$core$IFn$_invoke$arity$1(topic) : p1__54584_SHARP_.call(null,topic)))){
return p1__54584_SHARP_;
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__54584_SHARP_,topic,cljs.core.async.mult(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((buf_fn.cljs$core$IFn$_invoke$arity$1 ? buf_fn.cljs$core$IFn$_invoke$arity$1(topic) : buf_fn.call(null,topic)))));
}
})),topic);
}
});
var p = (function (){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async54587 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Pub}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async54587 = (function (ch,topic_fn,buf_fn,mults,ensure_mult,meta54588){
this.ch = ch;
this.topic_fn = topic_fn;
this.buf_fn = buf_fn;
this.mults = mults;
this.ensure_mult = ensure_mult;
this.meta54588 = meta54588;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async54587.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_54589,meta54588__$1){
var self__ = this;
var _54589__$1 = this;
return (new cljs.core.async.t_cljs$core$async54587(self__.ch,self__.topic_fn,self__.buf_fn,self__.mults,self__.ensure_mult,meta54588__$1));
}));

(cljs.core.async.t_cljs$core$async54587.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_54589){
var self__ = this;
var _54589__$1 = this;
return self__.meta54588;
}));

(cljs.core.async.t_cljs$core$async54587.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async54587.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
}));

(cljs.core.async.t_cljs$core$async54587.prototype.cljs$core$async$Pub$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async54587.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = (function (p,topic,ch__$1,close_QMARK_){
var self__ = this;
var p__$1 = this;
var m = (self__.ensure_mult.cljs$core$IFn$_invoke$arity$1 ? self__.ensure_mult.cljs$core$IFn$_invoke$arity$1(topic) : self__.ensure_mult.call(null,topic));
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3(m,ch__$1,close_QMARK_);
}));

(cljs.core.async.t_cljs$core$async54587.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = (function (p,topic,ch__$1){
var self__ = this;
var p__$1 = this;
var temp__5753__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(self__.mults),topic);
if(cljs.core.truth_(temp__5753__auto__)){
var m = temp__5753__auto__;
return cljs.core.async.untap(m,ch__$1);
} else {
return null;
}
}));

(cljs.core.async.t_cljs$core$async54587.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.reset_BANG_(self__.mults,cljs.core.PersistentArrayMap.EMPTY);
}));

(cljs.core.async.t_cljs$core$async54587.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = (function (_,topic){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.mults,cljs.core.dissoc,topic);
}));

(cljs.core.async.t_cljs$core$async54587.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"topic-fn","topic-fn",-862449736,null),new cljs.core.Symbol(null,"buf-fn","buf-fn",-1200281591,null),new cljs.core.Symbol(null,"mults","mults",-461114485,null),new cljs.core.Symbol(null,"ensure-mult","ensure-mult",1796584816,null),new cljs.core.Symbol(null,"meta54588","meta54588",1863969081,null)], null);
}));

(cljs.core.async.t_cljs$core$async54587.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async54587.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async54587");

(cljs.core.async.t_cljs$core$async54587.cljs$lang$ctorPrWriter = (function (this__4491__auto__,writer__4492__auto__,opt__4493__auto__){
return cljs.core._write(writer__4492__auto__,"cljs.core.async/t_cljs$core$async54587");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async54587.
 */
cljs.core.async.__GT_t_cljs$core$async54587 = (function cljs$core$async$__GT_t_cljs$core$async54587(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta54588){
return (new cljs.core.async.t_cljs$core$async54587(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta54588));
});

}

return (new cljs.core.async.t_cljs$core$async54587(ch,topic_fn,buf_fn,mults,ensure_mult,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__41995__auto___55615 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__41996__auto__ = (function (){var switch__41902__auto__ = (function (state_54661){
var state_val_54662 = (state_54661[(1)]);
if((state_val_54662 === (7))){
var inst_54657 = (state_54661[(2)]);
var state_54661__$1 = state_54661;
var statearr_54663_55616 = state_54661__$1;
(statearr_54663_55616[(2)] = inst_54657);

(statearr_54663_55616[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54662 === (20))){
var state_54661__$1 = state_54661;
var statearr_54664_55617 = state_54661__$1;
(statearr_54664_55617[(2)] = null);

(statearr_54664_55617[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54662 === (1))){
var state_54661__$1 = state_54661;
var statearr_54665_55618 = state_54661__$1;
(statearr_54665_55618[(2)] = null);

(statearr_54665_55618[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54662 === (24))){
var inst_54640 = (state_54661[(7)]);
var inst_54649 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(mults,cljs.core.dissoc,inst_54640);
var state_54661__$1 = state_54661;
var statearr_54666_55619 = state_54661__$1;
(statearr_54666_55619[(2)] = inst_54649);

(statearr_54666_55619[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54662 === (4))){
var inst_54592 = (state_54661[(8)]);
var inst_54592__$1 = (state_54661[(2)]);
var inst_54593 = (inst_54592__$1 == null);
var state_54661__$1 = (function (){var statearr_54667 = state_54661;
(statearr_54667[(8)] = inst_54592__$1);

return statearr_54667;
})();
if(cljs.core.truth_(inst_54593)){
var statearr_54668_55620 = state_54661__$1;
(statearr_54668_55620[(1)] = (5));

} else {
var statearr_54669_55622 = state_54661__$1;
(statearr_54669_55622[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54662 === (15))){
var inst_54634 = (state_54661[(2)]);
var state_54661__$1 = state_54661;
var statearr_54670_55623 = state_54661__$1;
(statearr_54670_55623[(2)] = inst_54634);

(statearr_54670_55623[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54662 === (21))){
var inst_54654 = (state_54661[(2)]);
var state_54661__$1 = (function (){var statearr_54671 = state_54661;
(statearr_54671[(9)] = inst_54654);

return statearr_54671;
})();
var statearr_54672_55624 = state_54661__$1;
(statearr_54672_55624[(2)] = null);

(statearr_54672_55624[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54662 === (13))){
var inst_54616 = (state_54661[(10)]);
var inst_54618 = cljs.core.chunked_seq_QMARK_(inst_54616);
var state_54661__$1 = state_54661;
if(inst_54618){
var statearr_54673_55629 = state_54661__$1;
(statearr_54673_55629[(1)] = (16));

} else {
var statearr_54674_55630 = state_54661__$1;
(statearr_54674_55630[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54662 === (22))){
var inst_54646 = (state_54661[(2)]);
var state_54661__$1 = state_54661;
if(cljs.core.truth_(inst_54646)){
var statearr_54675_55631 = state_54661__$1;
(statearr_54675_55631[(1)] = (23));

} else {
var statearr_54676_55632 = state_54661__$1;
(statearr_54676_55632[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54662 === (6))){
var inst_54642 = (state_54661[(11)]);
var inst_54592 = (state_54661[(8)]);
var inst_54640 = (state_54661[(7)]);
var inst_54640__$1 = (topic_fn.cljs$core$IFn$_invoke$arity$1 ? topic_fn.cljs$core$IFn$_invoke$arity$1(inst_54592) : topic_fn.call(null,inst_54592));
var inst_54641 = cljs.core.deref(mults);
var inst_54642__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_54641,inst_54640__$1);
var state_54661__$1 = (function (){var statearr_54677 = state_54661;
(statearr_54677[(11)] = inst_54642__$1);

(statearr_54677[(7)] = inst_54640__$1);

return statearr_54677;
})();
if(cljs.core.truth_(inst_54642__$1)){
var statearr_54678_55633 = state_54661__$1;
(statearr_54678_55633[(1)] = (19));

} else {
var statearr_54679_55634 = state_54661__$1;
(statearr_54679_55634[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54662 === (25))){
var inst_54651 = (state_54661[(2)]);
var state_54661__$1 = state_54661;
var statearr_54680_55635 = state_54661__$1;
(statearr_54680_55635[(2)] = inst_54651);

(statearr_54680_55635[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54662 === (17))){
var inst_54616 = (state_54661[(10)]);
var inst_54625 = cljs.core.first(inst_54616);
var inst_54626 = cljs.core.async.muxch_STAR_(inst_54625);
var inst_54627 = cljs.core.async.close_BANG_(inst_54626);
var inst_54628 = cljs.core.next(inst_54616);
var inst_54602 = inst_54628;
var inst_54603 = null;
var inst_54604 = (0);
var inst_54605 = (0);
var state_54661__$1 = (function (){var statearr_54681 = state_54661;
(statearr_54681[(12)] = inst_54603);

(statearr_54681[(13)] = inst_54605);

(statearr_54681[(14)] = inst_54604);

(statearr_54681[(15)] = inst_54602);

(statearr_54681[(16)] = inst_54627);

return statearr_54681;
})();
var statearr_54682_55636 = state_54661__$1;
(statearr_54682_55636[(2)] = null);

(statearr_54682_55636[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54662 === (3))){
var inst_54659 = (state_54661[(2)]);
var state_54661__$1 = state_54661;
return cljs.core.async.impl.ioc_helpers.return_chan(state_54661__$1,inst_54659);
} else {
if((state_val_54662 === (12))){
var inst_54636 = (state_54661[(2)]);
var state_54661__$1 = state_54661;
var statearr_54683_55637 = state_54661__$1;
(statearr_54683_55637[(2)] = inst_54636);

(statearr_54683_55637[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54662 === (2))){
var state_54661__$1 = state_54661;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_54661__$1,(4),ch);
} else {
if((state_val_54662 === (23))){
var state_54661__$1 = state_54661;
var statearr_54684_55638 = state_54661__$1;
(statearr_54684_55638[(2)] = null);

(statearr_54684_55638[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54662 === (19))){
var inst_54642 = (state_54661[(11)]);
var inst_54592 = (state_54661[(8)]);
var inst_54644 = cljs.core.async.muxch_STAR_(inst_54642);
var state_54661__$1 = state_54661;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_54661__$1,(22),inst_54644,inst_54592);
} else {
if((state_val_54662 === (11))){
var inst_54602 = (state_54661[(15)]);
var inst_54616 = (state_54661[(10)]);
var inst_54616__$1 = cljs.core.seq(inst_54602);
var state_54661__$1 = (function (){var statearr_54685 = state_54661;
(statearr_54685[(10)] = inst_54616__$1);

return statearr_54685;
})();
if(inst_54616__$1){
var statearr_54686_55639 = state_54661__$1;
(statearr_54686_55639[(1)] = (13));

} else {
var statearr_54687_55640 = state_54661__$1;
(statearr_54687_55640[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54662 === (9))){
var inst_54638 = (state_54661[(2)]);
var state_54661__$1 = state_54661;
var statearr_54688_55641 = state_54661__$1;
(statearr_54688_55641[(2)] = inst_54638);

(statearr_54688_55641[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54662 === (5))){
var inst_54599 = cljs.core.deref(mults);
var inst_54600 = cljs.core.vals(inst_54599);
var inst_54601 = cljs.core.seq(inst_54600);
var inst_54602 = inst_54601;
var inst_54603 = null;
var inst_54604 = (0);
var inst_54605 = (0);
var state_54661__$1 = (function (){var statearr_54689 = state_54661;
(statearr_54689[(12)] = inst_54603);

(statearr_54689[(13)] = inst_54605);

(statearr_54689[(14)] = inst_54604);

(statearr_54689[(15)] = inst_54602);

return statearr_54689;
})();
var statearr_54690_55642 = state_54661__$1;
(statearr_54690_55642[(2)] = null);

(statearr_54690_55642[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54662 === (14))){
var state_54661__$1 = state_54661;
var statearr_54694_55643 = state_54661__$1;
(statearr_54694_55643[(2)] = null);

(statearr_54694_55643[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54662 === (16))){
var inst_54616 = (state_54661[(10)]);
var inst_54620 = cljs.core.chunk_first(inst_54616);
var inst_54621 = cljs.core.chunk_rest(inst_54616);
var inst_54622 = cljs.core.count(inst_54620);
var inst_54602 = inst_54621;
var inst_54603 = inst_54620;
var inst_54604 = inst_54622;
var inst_54605 = (0);
var state_54661__$1 = (function (){var statearr_54695 = state_54661;
(statearr_54695[(12)] = inst_54603);

(statearr_54695[(13)] = inst_54605);

(statearr_54695[(14)] = inst_54604);

(statearr_54695[(15)] = inst_54602);

return statearr_54695;
})();
var statearr_54696_55644 = state_54661__$1;
(statearr_54696_55644[(2)] = null);

(statearr_54696_55644[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54662 === (10))){
var inst_54603 = (state_54661[(12)]);
var inst_54605 = (state_54661[(13)]);
var inst_54604 = (state_54661[(14)]);
var inst_54602 = (state_54661[(15)]);
var inst_54610 = cljs.core._nth(inst_54603,inst_54605);
var inst_54611 = cljs.core.async.muxch_STAR_(inst_54610);
var inst_54612 = cljs.core.async.close_BANG_(inst_54611);
var inst_54613 = (inst_54605 + (1));
var tmp54691 = inst_54603;
var tmp54692 = inst_54604;
var tmp54693 = inst_54602;
var inst_54602__$1 = tmp54693;
var inst_54603__$1 = tmp54691;
var inst_54604__$1 = tmp54692;
var inst_54605__$1 = inst_54613;
var state_54661__$1 = (function (){var statearr_54697 = state_54661;
(statearr_54697[(12)] = inst_54603__$1);

(statearr_54697[(13)] = inst_54605__$1);

(statearr_54697[(17)] = inst_54612);

(statearr_54697[(14)] = inst_54604__$1);

(statearr_54697[(15)] = inst_54602__$1);

return statearr_54697;
})();
var statearr_54698_55646 = state_54661__$1;
(statearr_54698_55646[(2)] = null);

(statearr_54698_55646[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54662 === (18))){
var inst_54631 = (state_54661[(2)]);
var state_54661__$1 = state_54661;
var statearr_54699_55648 = state_54661__$1;
(statearr_54699_55648[(2)] = inst_54631);

(statearr_54699_55648[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54662 === (8))){
var inst_54605 = (state_54661[(13)]);
var inst_54604 = (state_54661[(14)]);
var inst_54607 = (inst_54605 < inst_54604);
var inst_54608 = inst_54607;
var state_54661__$1 = state_54661;
if(cljs.core.truth_(inst_54608)){
var statearr_54700_55649 = state_54661__$1;
(statearr_54700_55649[(1)] = (10));

} else {
var statearr_54701_55650 = state_54661__$1;
(statearr_54701_55650[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__41903__auto__ = null;
var cljs$core$async$state_machine__41903__auto____0 = (function (){
var statearr_54702 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_54702[(0)] = cljs$core$async$state_machine__41903__auto__);

(statearr_54702[(1)] = (1));

return statearr_54702;
});
var cljs$core$async$state_machine__41903__auto____1 = (function (state_54661){
while(true){
var ret_value__41904__auto__ = (function (){try{while(true){
var result__41905__auto__ = switch__41902__auto__(state_54661);
if(cljs.core.keyword_identical_QMARK_(result__41905__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__41905__auto__;
}
break;
}
}catch (e54703){var ex__41906__auto__ = e54703;
var statearr_54704_55651 = state_54661;
(statearr_54704_55651[(2)] = ex__41906__auto__);


if(cljs.core.seq((state_54661[(4)]))){
var statearr_54705_55652 = state_54661;
(statearr_54705_55652[(1)] = cljs.core.first((state_54661[(4)])));

} else {
throw ex__41906__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41904__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__55653 = state_54661;
state_54661 = G__55653;
continue;
} else {
return ret_value__41904__auto__;
}
break;
}
});
cljs$core$async$state_machine__41903__auto__ = function(state_54661){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__41903__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__41903__auto____1.call(this,state_54661);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__41903__auto____0;
cljs$core$async$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__41903__auto____1;
return cljs$core$async$state_machine__41903__auto__;
})()
})();
var state__41997__auto__ = (function (){var statearr_54706 = f__41996__auto__();
(statearr_54706[(6)] = c__41995__auto___55615);

return statearr_54706;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__41997__auto__);
}));


return p;
}));

(cljs.core.async.pub.cljs$lang$maxFixedArity = 3);

/**
 * Subscribes a channel to a topic of a pub.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.sub = (function cljs$core$async$sub(var_args){
var G__54708 = arguments.length;
switch (G__54708) {
case 3:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3 = (function (p,topic,ch){
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4(p,topic,ch,true);
}));

(cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4 = (function (p,topic,ch,close_QMARK_){
return cljs.core.async.sub_STAR_(p,topic,ch,close_QMARK_);
}));

(cljs.core.async.sub.cljs$lang$maxFixedArity = 4);

/**
 * Unsubscribes a channel from a topic of a pub
 */
cljs.core.async.unsub = (function cljs$core$async$unsub(p,topic,ch){
return cljs.core.async.unsub_STAR_(p,topic,ch);
});
/**
 * Unsubscribes all channels from a pub, or a topic of a pub
 */
cljs.core.async.unsub_all = (function cljs$core$async$unsub_all(var_args){
var G__54710 = arguments.length;
switch (G__54710) {
case 1:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1 = (function (p){
return cljs.core.async.unsub_all_STAR_(p);
}));

(cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2 = (function (p,topic){
return cljs.core.async.unsub_all_STAR_(p,topic);
}));

(cljs.core.async.unsub_all.cljs$lang$maxFixedArity = 2);

/**
 * Takes a function and a collection of source channels, and returns a
 *   channel which contains the values produced by applying f to the set
 *   of first items taken from each source channel, followed by applying
 *   f to the set of second items from each channel, until any one of the
 *   channels is closed, at which point the output channel will be
 *   closed. The returned channel will be unbuffered by default, or a
 *   buf-or-n can be supplied
 */
cljs.core.async.map = (function cljs$core$async$map(var_args){
var G__54712 = arguments.length;
switch (G__54712) {
case 2:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.map.cljs$core$IFn$_invoke$arity$2 = (function (f,chs){
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3(f,chs,null);
}));

(cljs.core.async.map.cljs$core$IFn$_invoke$arity$3 = (function (f,chs,buf_or_n){
var chs__$1 = cljs.core.vec(chs);
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var cnt = cljs.core.count(chs__$1);
var rets = cljs.core.object_array.cljs$core$IFn$_invoke$arity$1(cnt);
var dchan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var dctr = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var done = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (i){
return (function (ret){
(rets[i] = ret);

if((cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(dchan,rets.slice((0)));
} else {
return null;
}
});
}),cljs.core.range.cljs$core$IFn$_invoke$arity$1(cnt));
var c__41995__auto___55659 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__41996__auto__ = (function (){var switch__41902__auto__ = (function (state_54755){
var state_val_54756 = (state_54755[(1)]);
if((state_val_54756 === (7))){
var state_54755__$1 = state_54755;
var statearr_54757_55660 = state_54755__$1;
(statearr_54757_55660[(2)] = null);

(statearr_54757_55660[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54756 === (1))){
var state_54755__$1 = state_54755;
var statearr_54758_55661 = state_54755__$1;
(statearr_54758_55661[(2)] = null);

(statearr_54758_55661[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54756 === (4))){
var inst_54716 = (state_54755[(7)]);
var inst_54715 = (state_54755[(8)]);
var inst_54718 = (inst_54716 < inst_54715);
var state_54755__$1 = state_54755;
if(cljs.core.truth_(inst_54718)){
var statearr_54759_55662 = state_54755__$1;
(statearr_54759_55662[(1)] = (6));

} else {
var statearr_54760_55663 = state_54755__$1;
(statearr_54760_55663[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54756 === (15))){
var inst_54741 = (state_54755[(9)]);
var inst_54746 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f,inst_54741);
var state_54755__$1 = state_54755;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_54755__$1,(17),out,inst_54746);
} else {
if((state_val_54756 === (13))){
var inst_54741 = (state_54755[(9)]);
var inst_54741__$1 = (state_54755[(2)]);
var inst_54742 = cljs.core.some(cljs.core.nil_QMARK_,inst_54741__$1);
var state_54755__$1 = (function (){var statearr_54761 = state_54755;
(statearr_54761[(9)] = inst_54741__$1);

return statearr_54761;
})();
if(cljs.core.truth_(inst_54742)){
var statearr_54762_55664 = state_54755__$1;
(statearr_54762_55664[(1)] = (14));

} else {
var statearr_54763_55665 = state_54755__$1;
(statearr_54763_55665[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54756 === (6))){
var state_54755__$1 = state_54755;
var statearr_54764_55666 = state_54755__$1;
(statearr_54764_55666[(2)] = null);

(statearr_54764_55666[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54756 === (17))){
var inst_54748 = (state_54755[(2)]);
var state_54755__$1 = (function (){var statearr_54766 = state_54755;
(statearr_54766[(10)] = inst_54748);

return statearr_54766;
})();
var statearr_54767_55667 = state_54755__$1;
(statearr_54767_55667[(2)] = null);

(statearr_54767_55667[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54756 === (3))){
var inst_54753 = (state_54755[(2)]);
var state_54755__$1 = state_54755;
return cljs.core.async.impl.ioc_helpers.return_chan(state_54755__$1,inst_54753);
} else {
if((state_val_54756 === (12))){
var _ = (function (){var statearr_54768 = state_54755;
(statearr_54768[(4)] = cljs.core.rest((state_54755[(4)])));

return statearr_54768;
})();
var state_54755__$1 = state_54755;
var ex54765 = (state_54755__$1[(2)]);
var statearr_54769_55669 = state_54755__$1;
(statearr_54769_55669[(5)] = ex54765);


if((ex54765 instanceof Object)){
var statearr_54770_55670 = state_54755__$1;
(statearr_54770_55670[(1)] = (11));

(statearr_54770_55670[(5)] = null);

} else {
throw ex54765;

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54756 === (2))){
var inst_54714 = cljs.core.reset_BANG_(dctr,cnt);
var inst_54715 = cnt;
var inst_54716 = (0);
var state_54755__$1 = (function (){var statearr_54771 = state_54755;
(statearr_54771[(7)] = inst_54716);

(statearr_54771[(11)] = inst_54714);

(statearr_54771[(8)] = inst_54715);

return statearr_54771;
})();
var statearr_54772_55672 = state_54755__$1;
(statearr_54772_55672[(2)] = null);

(statearr_54772_55672[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54756 === (11))){
var inst_54720 = (state_54755[(2)]);
var inst_54721 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec);
var state_54755__$1 = (function (){var statearr_54773 = state_54755;
(statearr_54773[(12)] = inst_54720);

return statearr_54773;
})();
var statearr_54774_55673 = state_54755__$1;
(statearr_54774_55673[(2)] = inst_54721);

(statearr_54774_55673[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54756 === (9))){
var inst_54716 = (state_54755[(7)]);
var _ = (function (){var statearr_54775 = state_54755;
(statearr_54775[(4)] = cljs.core.cons((12),(state_54755[(4)])));

return statearr_54775;
})();
var inst_54727 = (chs__$1.cljs$core$IFn$_invoke$arity$1 ? chs__$1.cljs$core$IFn$_invoke$arity$1(inst_54716) : chs__$1.call(null,inst_54716));
var inst_54728 = (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(inst_54716) : done.call(null,inst_54716));
var inst_54729 = cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2(inst_54727,inst_54728);
var ___$1 = (function (){var statearr_54776 = state_54755;
(statearr_54776[(4)] = cljs.core.rest((state_54755[(4)])));

return statearr_54776;
})();
var state_54755__$1 = state_54755;
var statearr_54777_55674 = state_54755__$1;
(statearr_54777_55674[(2)] = inst_54729);

(statearr_54777_55674[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54756 === (5))){
var inst_54739 = (state_54755[(2)]);
var state_54755__$1 = (function (){var statearr_54778 = state_54755;
(statearr_54778[(13)] = inst_54739);

return statearr_54778;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_54755__$1,(13),dchan);
} else {
if((state_val_54756 === (14))){
var inst_54744 = cljs.core.async.close_BANG_(out);
var state_54755__$1 = state_54755;
var statearr_54779_55675 = state_54755__$1;
(statearr_54779_55675[(2)] = inst_54744);

(statearr_54779_55675[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54756 === (16))){
var inst_54751 = (state_54755[(2)]);
var state_54755__$1 = state_54755;
var statearr_54780_55676 = state_54755__$1;
(statearr_54780_55676[(2)] = inst_54751);

(statearr_54780_55676[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54756 === (10))){
var inst_54716 = (state_54755[(7)]);
var inst_54732 = (state_54755[(2)]);
var inst_54733 = (inst_54716 + (1));
var inst_54716__$1 = inst_54733;
var state_54755__$1 = (function (){var statearr_54781 = state_54755;
(statearr_54781[(7)] = inst_54716__$1);

(statearr_54781[(14)] = inst_54732);

return statearr_54781;
})();
var statearr_54782_55677 = state_54755__$1;
(statearr_54782_55677[(2)] = null);

(statearr_54782_55677[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54756 === (8))){
var inst_54737 = (state_54755[(2)]);
var state_54755__$1 = state_54755;
var statearr_54783_55678 = state_54755__$1;
(statearr_54783_55678[(2)] = inst_54737);

(statearr_54783_55678[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__41903__auto__ = null;
var cljs$core$async$state_machine__41903__auto____0 = (function (){
var statearr_54784 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_54784[(0)] = cljs$core$async$state_machine__41903__auto__);

(statearr_54784[(1)] = (1));

return statearr_54784;
});
var cljs$core$async$state_machine__41903__auto____1 = (function (state_54755){
while(true){
var ret_value__41904__auto__ = (function (){try{while(true){
var result__41905__auto__ = switch__41902__auto__(state_54755);
if(cljs.core.keyword_identical_QMARK_(result__41905__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__41905__auto__;
}
break;
}
}catch (e54785){var ex__41906__auto__ = e54785;
var statearr_54786_55679 = state_54755;
(statearr_54786_55679[(2)] = ex__41906__auto__);


if(cljs.core.seq((state_54755[(4)]))){
var statearr_54787_55680 = state_54755;
(statearr_54787_55680[(1)] = cljs.core.first((state_54755[(4)])));

} else {
throw ex__41906__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41904__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__55681 = state_54755;
state_54755 = G__55681;
continue;
} else {
return ret_value__41904__auto__;
}
break;
}
});
cljs$core$async$state_machine__41903__auto__ = function(state_54755){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__41903__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__41903__auto____1.call(this,state_54755);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__41903__auto____0;
cljs$core$async$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__41903__auto____1;
return cljs$core$async$state_machine__41903__auto__;
})()
})();
var state__41997__auto__ = (function (){var statearr_54788 = f__41996__auto__();
(statearr_54788[(6)] = c__41995__auto___55659);

return statearr_54788;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__41997__auto__);
}));


return out;
}));

(cljs.core.async.map.cljs$lang$maxFixedArity = 3);

/**
 * Takes a collection of source channels and returns a channel which
 *   contains all values taken from them. The returned channel will be
 *   unbuffered by default, or a buf-or-n can be supplied. The channel
 *   will close after all the source channels have closed.
 */
cljs.core.async.merge = (function cljs$core$async$merge(var_args){
var G__54791 = arguments.length;
switch (G__54791) {
case 1:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1 = (function (chs){
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2(chs,null);
}));

(cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2 = (function (chs,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__41995__auto___55683 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__41996__auto__ = (function (){var switch__41902__auto__ = (function (state_54823){
var state_val_54824 = (state_54823[(1)]);
if((state_val_54824 === (7))){
var inst_54803 = (state_54823[(7)]);
var inst_54802 = (state_54823[(8)]);
var inst_54802__$1 = (state_54823[(2)]);
var inst_54803__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_54802__$1,(0),null);
var inst_54804 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_54802__$1,(1),null);
var inst_54805 = (inst_54803__$1 == null);
var state_54823__$1 = (function (){var statearr_54825 = state_54823;
(statearr_54825[(7)] = inst_54803__$1);

(statearr_54825[(9)] = inst_54804);

(statearr_54825[(8)] = inst_54802__$1);

return statearr_54825;
})();
if(cljs.core.truth_(inst_54805)){
var statearr_54826_55684 = state_54823__$1;
(statearr_54826_55684[(1)] = (8));

} else {
var statearr_54827_55685 = state_54823__$1;
(statearr_54827_55685[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54824 === (1))){
var inst_54792 = cljs.core.vec(chs);
var inst_54793 = inst_54792;
var state_54823__$1 = (function (){var statearr_54828 = state_54823;
(statearr_54828[(10)] = inst_54793);

return statearr_54828;
})();
var statearr_54829_55686 = state_54823__$1;
(statearr_54829_55686[(2)] = null);

(statearr_54829_55686[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54824 === (4))){
var inst_54793 = (state_54823[(10)]);
var state_54823__$1 = state_54823;
return cljs.core.async.ioc_alts_BANG_(state_54823__$1,(7),inst_54793);
} else {
if((state_val_54824 === (6))){
var inst_54819 = (state_54823[(2)]);
var state_54823__$1 = state_54823;
var statearr_54830_55687 = state_54823__$1;
(statearr_54830_55687[(2)] = inst_54819);

(statearr_54830_55687[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54824 === (3))){
var inst_54821 = (state_54823[(2)]);
var state_54823__$1 = state_54823;
return cljs.core.async.impl.ioc_helpers.return_chan(state_54823__$1,inst_54821);
} else {
if((state_val_54824 === (2))){
var inst_54793 = (state_54823[(10)]);
var inst_54795 = cljs.core.count(inst_54793);
var inst_54796 = (inst_54795 > (0));
var state_54823__$1 = state_54823;
if(cljs.core.truth_(inst_54796)){
var statearr_54832_55688 = state_54823__$1;
(statearr_54832_55688[(1)] = (4));

} else {
var statearr_54833_55689 = state_54823__$1;
(statearr_54833_55689[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54824 === (11))){
var inst_54793 = (state_54823[(10)]);
var inst_54812 = (state_54823[(2)]);
var tmp54831 = inst_54793;
var inst_54793__$1 = tmp54831;
var state_54823__$1 = (function (){var statearr_54834 = state_54823;
(statearr_54834[(11)] = inst_54812);

(statearr_54834[(10)] = inst_54793__$1);

return statearr_54834;
})();
var statearr_54835_55691 = state_54823__$1;
(statearr_54835_55691[(2)] = null);

(statearr_54835_55691[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54824 === (9))){
var inst_54803 = (state_54823[(7)]);
var state_54823__$1 = state_54823;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_54823__$1,(11),out,inst_54803);
} else {
if((state_val_54824 === (5))){
var inst_54817 = cljs.core.async.close_BANG_(out);
var state_54823__$1 = state_54823;
var statearr_54836_55692 = state_54823__$1;
(statearr_54836_55692[(2)] = inst_54817);

(statearr_54836_55692[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54824 === (10))){
var inst_54815 = (state_54823[(2)]);
var state_54823__$1 = state_54823;
var statearr_54837_55693 = state_54823__$1;
(statearr_54837_55693[(2)] = inst_54815);

(statearr_54837_55693[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54824 === (8))){
var inst_54803 = (state_54823[(7)]);
var inst_54804 = (state_54823[(9)]);
var inst_54793 = (state_54823[(10)]);
var inst_54802 = (state_54823[(8)]);
var inst_54807 = (function (){var cs = inst_54793;
var vec__54798 = inst_54802;
var v = inst_54803;
var c = inst_54804;
return (function (p1__54789_SHARP_){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(c,p1__54789_SHARP_);
});
})();
var inst_54808 = cljs.core.filterv(inst_54807,inst_54793);
var inst_54793__$1 = inst_54808;
var state_54823__$1 = (function (){var statearr_54838 = state_54823;
(statearr_54838[(10)] = inst_54793__$1);

return statearr_54838;
})();
var statearr_54839_55694 = state_54823__$1;
(statearr_54839_55694[(2)] = null);

(statearr_54839_55694[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__41903__auto__ = null;
var cljs$core$async$state_machine__41903__auto____0 = (function (){
var statearr_54840 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_54840[(0)] = cljs$core$async$state_machine__41903__auto__);

(statearr_54840[(1)] = (1));

return statearr_54840;
});
var cljs$core$async$state_machine__41903__auto____1 = (function (state_54823){
while(true){
var ret_value__41904__auto__ = (function (){try{while(true){
var result__41905__auto__ = switch__41902__auto__(state_54823);
if(cljs.core.keyword_identical_QMARK_(result__41905__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__41905__auto__;
}
break;
}
}catch (e54841){var ex__41906__auto__ = e54841;
var statearr_54842_55699 = state_54823;
(statearr_54842_55699[(2)] = ex__41906__auto__);


if(cljs.core.seq((state_54823[(4)]))){
var statearr_54843_55700 = state_54823;
(statearr_54843_55700[(1)] = cljs.core.first((state_54823[(4)])));

} else {
throw ex__41906__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41904__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__55701 = state_54823;
state_54823 = G__55701;
continue;
} else {
return ret_value__41904__auto__;
}
break;
}
});
cljs$core$async$state_machine__41903__auto__ = function(state_54823){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__41903__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__41903__auto____1.call(this,state_54823);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__41903__auto____0;
cljs$core$async$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__41903__auto____1;
return cljs$core$async$state_machine__41903__auto__;
})()
})();
var state__41997__auto__ = (function (){var statearr_54844 = f__41996__auto__();
(statearr_54844[(6)] = c__41995__auto___55683);

return statearr_54844;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__41997__auto__);
}));


return out;
}));

(cljs.core.async.merge.cljs$lang$maxFixedArity = 2);

/**
 * Returns a channel containing the single (collection) result of the
 *   items taken from the channel conjoined to the supplied
 *   collection. ch must close before into produces a result.
 */
cljs.core.async.into = (function cljs$core$async$into(coll,ch){
return cljs.core.async.reduce(cljs.core.conj,coll,ch);
});
/**
 * Returns a channel that will return, at most, n items from ch. After n items
 * have been returned, or ch has been closed, the return chanel will close.
 * 
 *   The output channel is unbuffered by default, unless buf-or-n is given.
 */
cljs.core.async.take = (function cljs$core$async$take(var_args){
var G__54846 = arguments.length;
switch (G__54846) {
case 2:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.take.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3(n,ch,null);
}));

(cljs.core.async.take.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__41995__auto___55703 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__41996__auto__ = (function (){var switch__41902__auto__ = (function (state_54870){
var state_val_54871 = (state_54870[(1)]);
if((state_val_54871 === (7))){
var inst_54852 = (state_54870[(7)]);
var inst_54852__$1 = (state_54870[(2)]);
var inst_54853 = (inst_54852__$1 == null);
var inst_54854 = cljs.core.not(inst_54853);
var state_54870__$1 = (function (){var statearr_54872 = state_54870;
(statearr_54872[(7)] = inst_54852__$1);

return statearr_54872;
})();
if(inst_54854){
var statearr_54873_55704 = state_54870__$1;
(statearr_54873_55704[(1)] = (8));

} else {
var statearr_54874_55705 = state_54870__$1;
(statearr_54874_55705[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54871 === (1))){
var inst_54847 = (0);
var state_54870__$1 = (function (){var statearr_54875 = state_54870;
(statearr_54875[(8)] = inst_54847);

return statearr_54875;
})();
var statearr_54876_55706 = state_54870__$1;
(statearr_54876_55706[(2)] = null);

(statearr_54876_55706[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54871 === (4))){
var state_54870__$1 = state_54870;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_54870__$1,(7),ch);
} else {
if((state_val_54871 === (6))){
var inst_54865 = (state_54870[(2)]);
var state_54870__$1 = state_54870;
var statearr_54877_55707 = state_54870__$1;
(statearr_54877_55707[(2)] = inst_54865);

(statearr_54877_55707[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54871 === (3))){
var inst_54867 = (state_54870[(2)]);
var inst_54868 = cljs.core.async.close_BANG_(out);
var state_54870__$1 = (function (){var statearr_54878 = state_54870;
(statearr_54878[(9)] = inst_54867);

return statearr_54878;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_54870__$1,inst_54868);
} else {
if((state_val_54871 === (2))){
var inst_54847 = (state_54870[(8)]);
var inst_54849 = (inst_54847 < n);
var state_54870__$1 = state_54870;
if(cljs.core.truth_(inst_54849)){
var statearr_54879_55708 = state_54870__$1;
(statearr_54879_55708[(1)] = (4));

} else {
var statearr_54880_55709 = state_54870__$1;
(statearr_54880_55709[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54871 === (11))){
var inst_54847 = (state_54870[(8)]);
var inst_54857 = (state_54870[(2)]);
var inst_54858 = (inst_54847 + (1));
var inst_54847__$1 = inst_54858;
var state_54870__$1 = (function (){var statearr_54881 = state_54870;
(statearr_54881[(8)] = inst_54847__$1);

(statearr_54881[(10)] = inst_54857);

return statearr_54881;
})();
var statearr_54882_55710 = state_54870__$1;
(statearr_54882_55710[(2)] = null);

(statearr_54882_55710[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54871 === (9))){
var state_54870__$1 = state_54870;
var statearr_54883_55711 = state_54870__$1;
(statearr_54883_55711[(2)] = null);

(statearr_54883_55711[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54871 === (5))){
var state_54870__$1 = state_54870;
var statearr_54884_55712 = state_54870__$1;
(statearr_54884_55712[(2)] = null);

(statearr_54884_55712[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54871 === (10))){
var inst_54862 = (state_54870[(2)]);
var state_54870__$1 = state_54870;
var statearr_54885_55713 = state_54870__$1;
(statearr_54885_55713[(2)] = inst_54862);

(statearr_54885_55713[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54871 === (8))){
var inst_54852 = (state_54870[(7)]);
var state_54870__$1 = state_54870;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_54870__$1,(11),out,inst_54852);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__41903__auto__ = null;
var cljs$core$async$state_machine__41903__auto____0 = (function (){
var statearr_54886 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_54886[(0)] = cljs$core$async$state_machine__41903__auto__);

(statearr_54886[(1)] = (1));

return statearr_54886;
});
var cljs$core$async$state_machine__41903__auto____1 = (function (state_54870){
while(true){
var ret_value__41904__auto__ = (function (){try{while(true){
var result__41905__auto__ = switch__41902__auto__(state_54870);
if(cljs.core.keyword_identical_QMARK_(result__41905__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__41905__auto__;
}
break;
}
}catch (e54887){var ex__41906__auto__ = e54887;
var statearr_54888_55714 = state_54870;
(statearr_54888_55714[(2)] = ex__41906__auto__);


if(cljs.core.seq((state_54870[(4)]))){
var statearr_54889_55719 = state_54870;
(statearr_54889_55719[(1)] = cljs.core.first((state_54870[(4)])));

} else {
throw ex__41906__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41904__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__55720 = state_54870;
state_54870 = G__55720;
continue;
} else {
return ret_value__41904__auto__;
}
break;
}
});
cljs$core$async$state_machine__41903__auto__ = function(state_54870){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__41903__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__41903__auto____1.call(this,state_54870);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__41903__auto____0;
cljs$core$async$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__41903__auto____1;
return cljs$core$async$state_machine__41903__auto__;
})()
})();
var state__41997__auto__ = (function (){var statearr_54890 = f__41996__auto__();
(statearr_54890[(6)] = c__41995__auto___55703);

return statearr_54890;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__41997__auto__);
}));


return out;
}));

(cljs.core.async.take.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_LT_ = (function cljs$core$async$map_LT_(f,ch){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async54892 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async54892 = (function (f,ch,meta54893){
this.f = f;
this.ch = ch;
this.meta54893 = meta54893;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async54892.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_54894,meta54893__$1){
var self__ = this;
var _54894__$1 = this;
return (new cljs.core.async.t_cljs$core$async54892(self__.f,self__.ch,meta54893__$1));
}));

(cljs.core.async.t_cljs$core$async54892.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_54894){
var self__ = this;
var _54894__$1 = this;
return self__.meta54893;
}));

(cljs.core.async.t_cljs$core$async54892.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async54892.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async54892.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async54892.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async54892.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
var ret = cljs.core.async.impl.protocols.take_BANG_(self__.ch,(function (){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async54895 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async54895 = (function (f,ch,meta54893,_,fn1,meta54896){
this.f = f;
this.ch = ch;
this.meta54893 = meta54893;
this._ = _;
this.fn1 = fn1;
this.meta54896 = meta54896;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async54895.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_54897,meta54896__$1){
var self__ = this;
var _54897__$1 = this;
return (new cljs.core.async.t_cljs$core$async54895(self__.f,self__.ch,self__.meta54893,self__._,self__.fn1,meta54896__$1));
}));

(cljs.core.async.t_cljs$core$async54895.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_54897){
var self__ = this;
var _54897__$1 = this;
return self__.meta54896;
}));

(cljs.core.async.t_cljs$core$async54895.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async54895.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
return cljs.core.async.impl.protocols.active_QMARK_(self__.fn1);
}));

(cljs.core.async.t_cljs$core$async54895.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async54895.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
var f1 = cljs.core.async.impl.protocols.commit(self__.fn1);
return (function (p1__54891_SHARP_){
var G__54898 = (((p1__54891_SHARP_ == null))?null:(self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(p1__54891_SHARP_) : self__.f.call(null,p1__54891_SHARP_)));
return (f1.cljs$core$IFn$_invoke$arity$1 ? f1.cljs$core$IFn$_invoke$arity$1(G__54898) : f1.call(null,G__54898));
});
}));

(cljs.core.async.t_cljs$core$async54895.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta54893","meta54893",556472232,null),cljs.core.with_meta(new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol("cljs.core.async","t_cljs$core$async54892","cljs.core.async/t_cljs$core$async54892",2119806041,null)], null)),new cljs.core.Symbol(null,"fn1","fn1",895834444,null),new cljs.core.Symbol(null,"meta54896","meta54896",1881612718,null)], null);
}));

(cljs.core.async.t_cljs$core$async54895.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async54895.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async54895");

(cljs.core.async.t_cljs$core$async54895.cljs$lang$ctorPrWriter = (function (this__4491__auto__,writer__4492__auto__,opt__4493__auto__){
return cljs.core._write(writer__4492__auto__,"cljs.core.async/t_cljs$core$async54895");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async54895.
 */
cljs.core.async.__GT_t_cljs$core$async54895 = (function cljs$core$async$map_LT__$___GT_t_cljs$core$async54895(f__$1,ch__$1,meta54893__$1,___$2,fn1__$1,meta54896){
return (new cljs.core.async.t_cljs$core$async54895(f__$1,ch__$1,meta54893__$1,___$2,fn1__$1,meta54896));
});

}

return (new cljs.core.async.t_cljs$core$async54895(self__.f,self__.ch,self__.meta54893,___$1,fn1,cljs.core.PersistentArrayMap.EMPTY));
})()
);
if(cljs.core.truth_((function (){var and__4251__auto__ = ret;
if(cljs.core.truth_(and__4251__auto__)){
return (!((cljs.core.deref(ret) == null)));
} else {
return and__4251__auto__;
}
})())){
return cljs.core.async.impl.channels.box((function (){var G__54899 = cljs.core.deref(ret);
return (self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(G__54899) : self__.f.call(null,G__54899));
})());
} else {
return ret;
}
}));

(cljs.core.async.t_cljs$core$async54892.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async54892.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,val,fn1);
}));

(cljs.core.async.t_cljs$core$async54892.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta54893","meta54893",556472232,null)], null);
}));

(cljs.core.async.t_cljs$core$async54892.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async54892.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async54892");

(cljs.core.async.t_cljs$core$async54892.cljs$lang$ctorPrWriter = (function (this__4491__auto__,writer__4492__auto__,opt__4493__auto__){
return cljs.core._write(writer__4492__auto__,"cljs.core.async/t_cljs$core$async54892");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async54892.
 */
cljs.core.async.__GT_t_cljs$core$async54892 = (function cljs$core$async$map_LT__$___GT_t_cljs$core$async54892(f__$1,ch__$1,meta54893){
return (new cljs.core.async.t_cljs$core$async54892(f__$1,ch__$1,meta54893));
});

}

return (new cljs.core.async.t_cljs$core$async54892(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_GT_ = (function cljs$core$async$map_GT_(f,ch){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async54900 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async54900 = (function (f,ch,meta54901){
this.f = f;
this.ch = ch;
this.meta54901 = meta54901;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async54900.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_54902,meta54901__$1){
var self__ = this;
var _54902__$1 = this;
return (new cljs.core.async.t_cljs$core$async54900(self__.f,self__.ch,meta54901__$1));
}));

(cljs.core.async.t_cljs$core$async54900.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_54902){
var self__ = this;
var _54902__$1 = this;
return self__.meta54901;
}));

(cljs.core.async.t_cljs$core$async54900.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async54900.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async54900.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async54900.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_(self__.ch,fn1);
}));

(cljs.core.async.t_cljs$core$async54900.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async54900.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,(self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(val) : self__.f.call(null,val)),fn1);
}));

(cljs.core.async.t_cljs$core$async54900.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta54901","meta54901",-285390866,null)], null);
}));

(cljs.core.async.t_cljs$core$async54900.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async54900.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async54900");

(cljs.core.async.t_cljs$core$async54900.cljs$lang$ctorPrWriter = (function (this__4491__auto__,writer__4492__auto__,opt__4493__auto__){
return cljs.core._write(writer__4492__auto__,"cljs.core.async/t_cljs$core$async54900");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async54900.
 */
cljs.core.async.__GT_t_cljs$core$async54900 = (function cljs$core$async$map_GT__$___GT_t_cljs$core$async54900(f__$1,ch__$1,meta54901){
return (new cljs.core.async.t_cljs$core$async54900(f__$1,ch__$1,meta54901));
});

}

return (new cljs.core.async.t_cljs$core$async54900(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_GT_ = (function cljs$core$async$filter_GT_(p,ch){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async54903 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async54903 = (function (p,ch,meta54904){
this.p = p;
this.ch = ch;
this.meta54904 = meta54904;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async54903.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_54905,meta54904__$1){
var self__ = this;
var _54905__$1 = this;
return (new cljs.core.async.t_cljs$core$async54903(self__.p,self__.ch,meta54904__$1));
}));

(cljs.core.async.t_cljs$core$async54903.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_54905){
var self__ = this;
var _54905__$1 = this;
return self__.meta54904;
}));

(cljs.core.async.t_cljs$core$async54903.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async54903.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async54903.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async54903.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async54903.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_(self__.ch,fn1);
}));

(cljs.core.async.t_cljs$core$async54903.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async54903.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_((self__.p.cljs$core$IFn$_invoke$arity$1 ? self__.p.cljs$core$IFn$_invoke$arity$1(val) : self__.p.call(null,val)))){
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,val,fn1);
} else {
return cljs.core.async.impl.channels.box(cljs.core.not(cljs.core.async.impl.protocols.closed_QMARK_(self__.ch)));
}
}));

(cljs.core.async.t_cljs$core$async54903.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta54904","meta54904",2097963503,null)], null);
}));

(cljs.core.async.t_cljs$core$async54903.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async54903.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async54903");

(cljs.core.async.t_cljs$core$async54903.cljs$lang$ctorPrWriter = (function (this__4491__auto__,writer__4492__auto__,opt__4493__auto__){
return cljs.core._write(writer__4492__auto__,"cljs.core.async/t_cljs$core$async54903");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async54903.
 */
cljs.core.async.__GT_t_cljs$core$async54903 = (function cljs$core$async$filter_GT__$___GT_t_cljs$core$async54903(p__$1,ch__$1,meta54904){
return (new cljs.core.async.t_cljs$core$async54903(p__$1,ch__$1,meta54904));
});

}

return (new cljs.core.async.t_cljs$core$async54903(p,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_GT_ = (function cljs$core$async$remove_GT_(p,ch){
return cljs.core.async.filter_GT_(cljs.core.complement(p),ch);
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_LT_ = (function cljs$core$async$filter_LT_(var_args){
var G__54907 = arguments.length;
switch (G__54907) {
case 2:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3(p,ch,null);
}));

(cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__41995__auto___55740 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__41996__auto__ = (function (){var switch__41902__auto__ = (function (state_54928){
var state_val_54929 = (state_54928[(1)]);
if((state_val_54929 === (7))){
var inst_54924 = (state_54928[(2)]);
var state_54928__$1 = state_54928;
var statearr_54930_55741 = state_54928__$1;
(statearr_54930_55741[(2)] = inst_54924);

(statearr_54930_55741[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54929 === (1))){
var state_54928__$1 = state_54928;
var statearr_54931_55742 = state_54928__$1;
(statearr_54931_55742[(2)] = null);

(statearr_54931_55742[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54929 === (4))){
var inst_54910 = (state_54928[(7)]);
var inst_54910__$1 = (state_54928[(2)]);
var inst_54911 = (inst_54910__$1 == null);
var state_54928__$1 = (function (){var statearr_54932 = state_54928;
(statearr_54932[(7)] = inst_54910__$1);

return statearr_54932;
})();
if(cljs.core.truth_(inst_54911)){
var statearr_54933_55743 = state_54928__$1;
(statearr_54933_55743[(1)] = (5));

} else {
var statearr_54934_55744 = state_54928__$1;
(statearr_54934_55744[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54929 === (6))){
var inst_54910 = (state_54928[(7)]);
var inst_54915 = (p.cljs$core$IFn$_invoke$arity$1 ? p.cljs$core$IFn$_invoke$arity$1(inst_54910) : p.call(null,inst_54910));
var state_54928__$1 = state_54928;
if(cljs.core.truth_(inst_54915)){
var statearr_54935_55745 = state_54928__$1;
(statearr_54935_55745[(1)] = (8));

} else {
var statearr_54936_55746 = state_54928__$1;
(statearr_54936_55746[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54929 === (3))){
var inst_54926 = (state_54928[(2)]);
var state_54928__$1 = state_54928;
return cljs.core.async.impl.ioc_helpers.return_chan(state_54928__$1,inst_54926);
} else {
if((state_val_54929 === (2))){
var state_54928__$1 = state_54928;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_54928__$1,(4),ch);
} else {
if((state_val_54929 === (11))){
var inst_54918 = (state_54928[(2)]);
var state_54928__$1 = state_54928;
var statearr_54937_55747 = state_54928__$1;
(statearr_54937_55747[(2)] = inst_54918);

(statearr_54937_55747[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54929 === (9))){
var state_54928__$1 = state_54928;
var statearr_54938_55748 = state_54928__$1;
(statearr_54938_55748[(2)] = null);

(statearr_54938_55748[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54929 === (5))){
var inst_54913 = cljs.core.async.close_BANG_(out);
var state_54928__$1 = state_54928;
var statearr_54939_55749 = state_54928__$1;
(statearr_54939_55749[(2)] = inst_54913);

(statearr_54939_55749[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54929 === (10))){
var inst_54921 = (state_54928[(2)]);
var state_54928__$1 = (function (){var statearr_54940 = state_54928;
(statearr_54940[(8)] = inst_54921);

return statearr_54940;
})();
var statearr_54941_55750 = state_54928__$1;
(statearr_54941_55750[(2)] = null);

(statearr_54941_55750[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_54929 === (8))){
var inst_54910 = (state_54928[(7)]);
var state_54928__$1 = state_54928;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_54928__$1,(11),out,inst_54910);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__41903__auto__ = null;
var cljs$core$async$state_machine__41903__auto____0 = (function (){
var statearr_54942 = [null,null,null,null,null,null,null,null,null];
(statearr_54942[(0)] = cljs$core$async$state_machine__41903__auto__);

(statearr_54942[(1)] = (1));

return statearr_54942;
});
var cljs$core$async$state_machine__41903__auto____1 = (function (state_54928){
while(true){
var ret_value__41904__auto__ = (function (){try{while(true){
var result__41905__auto__ = switch__41902__auto__(state_54928);
if(cljs.core.keyword_identical_QMARK_(result__41905__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__41905__auto__;
}
break;
}
}catch (e54943){var ex__41906__auto__ = e54943;
var statearr_54944_55751 = state_54928;
(statearr_54944_55751[(2)] = ex__41906__auto__);


if(cljs.core.seq((state_54928[(4)]))){
var statearr_54945_55752 = state_54928;
(statearr_54945_55752[(1)] = cljs.core.first((state_54928[(4)])));

} else {
throw ex__41906__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41904__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__55753 = state_54928;
state_54928 = G__55753;
continue;
} else {
return ret_value__41904__auto__;
}
break;
}
});
cljs$core$async$state_machine__41903__auto__ = function(state_54928){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__41903__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__41903__auto____1.call(this,state_54928);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__41903__auto____0;
cljs$core$async$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__41903__auto____1;
return cljs$core$async$state_machine__41903__auto__;
})()
})();
var state__41997__auto__ = (function (){var statearr_54946 = f__41996__auto__();
(statearr_54946[(6)] = c__41995__auto___55740);

return statearr_54946;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__41997__auto__);
}));


return out;
}));

(cljs.core.async.filter_LT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_LT_ = (function cljs$core$async$remove_LT_(var_args){
var G__54948 = arguments.length;
switch (G__54948) {
case 2:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3(p,ch,null);
}));

(cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3(cljs.core.complement(p),ch,buf_or_n);
}));

(cljs.core.async.remove_LT_.cljs$lang$maxFixedArity = 3);

cljs.core.async.mapcat_STAR_ = (function cljs$core$async$mapcat_STAR_(f,in$,out){
var c__41995__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__41996__auto__ = (function (){var switch__41902__auto__ = (function (state_55010){
var state_val_55011 = (state_55010[(1)]);
if((state_val_55011 === (7))){
var inst_55006 = (state_55010[(2)]);
var state_55010__$1 = state_55010;
var statearr_55012_55755 = state_55010__$1;
(statearr_55012_55755[(2)] = inst_55006);

(statearr_55012_55755[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55011 === (20))){
var inst_54976 = (state_55010[(7)]);
var inst_54987 = (state_55010[(2)]);
var inst_54988 = cljs.core.next(inst_54976);
var inst_54962 = inst_54988;
var inst_54963 = null;
var inst_54964 = (0);
var inst_54965 = (0);
var state_55010__$1 = (function (){var statearr_55013 = state_55010;
(statearr_55013[(8)] = inst_54963);

(statearr_55013[(9)] = inst_54962);

(statearr_55013[(10)] = inst_54987);

(statearr_55013[(11)] = inst_54964);

(statearr_55013[(12)] = inst_54965);

return statearr_55013;
})();
var statearr_55014_55756 = state_55010__$1;
(statearr_55014_55756[(2)] = null);

(statearr_55014_55756[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55011 === (1))){
var state_55010__$1 = state_55010;
var statearr_55015_55757 = state_55010__$1;
(statearr_55015_55757[(2)] = null);

(statearr_55015_55757[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55011 === (4))){
var inst_54951 = (state_55010[(13)]);
var inst_54951__$1 = (state_55010[(2)]);
var inst_54952 = (inst_54951__$1 == null);
var state_55010__$1 = (function (){var statearr_55016 = state_55010;
(statearr_55016[(13)] = inst_54951__$1);

return statearr_55016;
})();
if(cljs.core.truth_(inst_54952)){
var statearr_55017_55762 = state_55010__$1;
(statearr_55017_55762[(1)] = (5));

} else {
var statearr_55018_55763 = state_55010__$1;
(statearr_55018_55763[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55011 === (15))){
var state_55010__$1 = state_55010;
var statearr_55022_55764 = state_55010__$1;
(statearr_55022_55764[(2)] = null);

(statearr_55022_55764[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55011 === (21))){
var state_55010__$1 = state_55010;
var statearr_55023_55765 = state_55010__$1;
(statearr_55023_55765[(2)] = null);

(statearr_55023_55765[(1)] = (23));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55011 === (13))){
var inst_54963 = (state_55010[(8)]);
var inst_54962 = (state_55010[(9)]);
var inst_54964 = (state_55010[(11)]);
var inst_54965 = (state_55010[(12)]);
var inst_54972 = (state_55010[(2)]);
var inst_54973 = (inst_54965 + (1));
var tmp55019 = inst_54963;
var tmp55020 = inst_54962;
var tmp55021 = inst_54964;
var inst_54962__$1 = tmp55020;
var inst_54963__$1 = tmp55019;
var inst_54964__$1 = tmp55021;
var inst_54965__$1 = inst_54973;
var state_55010__$1 = (function (){var statearr_55024 = state_55010;
(statearr_55024[(8)] = inst_54963__$1);

(statearr_55024[(9)] = inst_54962__$1);

(statearr_55024[(11)] = inst_54964__$1);

(statearr_55024[(12)] = inst_54965__$1);

(statearr_55024[(14)] = inst_54972);

return statearr_55024;
})();
var statearr_55025_55766 = state_55010__$1;
(statearr_55025_55766[(2)] = null);

(statearr_55025_55766[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55011 === (22))){
var state_55010__$1 = state_55010;
var statearr_55026_55767 = state_55010__$1;
(statearr_55026_55767[(2)] = null);

(statearr_55026_55767[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55011 === (6))){
var inst_54951 = (state_55010[(13)]);
var inst_54960 = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(inst_54951) : f.call(null,inst_54951));
var inst_54961 = cljs.core.seq(inst_54960);
var inst_54962 = inst_54961;
var inst_54963 = null;
var inst_54964 = (0);
var inst_54965 = (0);
var state_55010__$1 = (function (){var statearr_55027 = state_55010;
(statearr_55027[(8)] = inst_54963);

(statearr_55027[(9)] = inst_54962);

(statearr_55027[(11)] = inst_54964);

(statearr_55027[(12)] = inst_54965);

return statearr_55027;
})();
var statearr_55028_55768 = state_55010__$1;
(statearr_55028_55768[(2)] = null);

(statearr_55028_55768[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55011 === (17))){
var inst_54976 = (state_55010[(7)]);
var inst_54980 = cljs.core.chunk_first(inst_54976);
var inst_54981 = cljs.core.chunk_rest(inst_54976);
var inst_54982 = cljs.core.count(inst_54980);
var inst_54962 = inst_54981;
var inst_54963 = inst_54980;
var inst_54964 = inst_54982;
var inst_54965 = (0);
var state_55010__$1 = (function (){var statearr_55029 = state_55010;
(statearr_55029[(8)] = inst_54963);

(statearr_55029[(9)] = inst_54962);

(statearr_55029[(11)] = inst_54964);

(statearr_55029[(12)] = inst_54965);

return statearr_55029;
})();
var statearr_55030_55769 = state_55010__$1;
(statearr_55030_55769[(2)] = null);

(statearr_55030_55769[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55011 === (3))){
var inst_55008 = (state_55010[(2)]);
var state_55010__$1 = state_55010;
return cljs.core.async.impl.ioc_helpers.return_chan(state_55010__$1,inst_55008);
} else {
if((state_val_55011 === (12))){
var inst_54996 = (state_55010[(2)]);
var state_55010__$1 = state_55010;
var statearr_55031_55770 = state_55010__$1;
(statearr_55031_55770[(2)] = inst_54996);

(statearr_55031_55770[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55011 === (2))){
var state_55010__$1 = state_55010;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_55010__$1,(4),in$);
} else {
if((state_val_55011 === (23))){
var inst_55004 = (state_55010[(2)]);
var state_55010__$1 = state_55010;
var statearr_55032_55772 = state_55010__$1;
(statearr_55032_55772[(2)] = inst_55004);

(statearr_55032_55772[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55011 === (19))){
var inst_54991 = (state_55010[(2)]);
var state_55010__$1 = state_55010;
var statearr_55033_55776 = state_55010__$1;
(statearr_55033_55776[(2)] = inst_54991);

(statearr_55033_55776[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55011 === (11))){
var inst_54976 = (state_55010[(7)]);
var inst_54962 = (state_55010[(9)]);
var inst_54976__$1 = cljs.core.seq(inst_54962);
var state_55010__$1 = (function (){var statearr_55034 = state_55010;
(statearr_55034[(7)] = inst_54976__$1);

return statearr_55034;
})();
if(inst_54976__$1){
var statearr_55035_55777 = state_55010__$1;
(statearr_55035_55777[(1)] = (14));

} else {
var statearr_55036_55778 = state_55010__$1;
(statearr_55036_55778[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55011 === (9))){
var inst_54998 = (state_55010[(2)]);
var inst_54999 = cljs.core.async.impl.protocols.closed_QMARK_(out);
var state_55010__$1 = (function (){var statearr_55037 = state_55010;
(statearr_55037[(15)] = inst_54998);

return statearr_55037;
})();
if(cljs.core.truth_(inst_54999)){
var statearr_55038_55780 = state_55010__$1;
(statearr_55038_55780[(1)] = (21));

} else {
var statearr_55039_55781 = state_55010__$1;
(statearr_55039_55781[(1)] = (22));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55011 === (5))){
var inst_54954 = cljs.core.async.close_BANG_(out);
var state_55010__$1 = state_55010;
var statearr_55040_55782 = state_55010__$1;
(statearr_55040_55782[(2)] = inst_54954);

(statearr_55040_55782[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55011 === (14))){
var inst_54976 = (state_55010[(7)]);
var inst_54978 = cljs.core.chunked_seq_QMARK_(inst_54976);
var state_55010__$1 = state_55010;
if(inst_54978){
var statearr_55041_55783 = state_55010__$1;
(statearr_55041_55783[(1)] = (17));

} else {
var statearr_55042_55784 = state_55010__$1;
(statearr_55042_55784[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55011 === (16))){
var inst_54994 = (state_55010[(2)]);
var state_55010__$1 = state_55010;
var statearr_55043_55785 = state_55010__$1;
(statearr_55043_55785[(2)] = inst_54994);

(statearr_55043_55785[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55011 === (10))){
var inst_54963 = (state_55010[(8)]);
var inst_54965 = (state_55010[(12)]);
var inst_54970 = cljs.core._nth(inst_54963,inst_54965);
var state_55010__$1 = state_55010;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_55010__$1,(13),out,inst_54970);
} else {
if((state_val_55011 === (18))){
var inst_54976 = (state_55010[(7)]);
var inst_54985 = cljs.core.first(inst_54976);
var state_55010__$1 = state_55010;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_55010__$1,(20),out,inst_54985);
} else {
if((state_val_55011 === (8))){
var inst_54964 = (state_55010[(11)]);
var inst_54965 = (state_55010[(12)]);
var inst_54967 = (inst_54965 < inst_54964);
var inst_54968 = inst_54967;
var state_55010__$1 = state_55010;
if(cljs.core.truth_(inst_54968)){
var statearr_55044_55786 = state_55010__$1;
(statearr_55044_55786[(1)] = (10));

} else {
var statearr_55045_55787 = state_55010__$1;
(statearr_55045_55787[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$mapcat_STAR__$_state_machine__41903__auto__ = null;
var cljs$core$async$mapcat_STAR__$_state_machine__41903__auto____0 = (function (){
var statearr_55046 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_55046[(0)] = cljs$core$async$mapcat_STAR__$_state_machine__41903__auto__);

(statearr_55046[(1)] = (1));

return statearr_55046;
});
var cljs$core$async$mapcat_STAR__$_state_machine__41903__auto____1 = (function (state_55010){
while(true){
var ret_value__41904__auto__ = (function (){try{while(true){
var result__41905__auto__ = switch__41902__auto__(state_55010);
if(cljs.core.keyword_identical_QMARK_(result__41905__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__41905__auto__;
}
break;
}
}catch (e55047){var ex__41906__auto__ = e55047;
var statearr_55048_55789 = state_55010;
(statearr_55048_55789[(2)] = ex__41906__auto__);


if(cljs.core.seq((state_55010[(4)]))){
var statearr_55049_55790 = state_55010;
(statearr_55049_55790[(1)] = cljs.core.first((state_55010[(4)])));

} else {
throw ex__41906__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41904__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__55791 = state_55010;
state_55010 = G__55791;
continue;
} else {
return ret_value__41904__auto__;
}
break;
}
});
cljs$core$async$mapcat_STAR__$_state_machine__41903__auto__ = function(state_55010){
switch(arguments.length){
case 0:
return cljs$core$async$mapcat_STAR__$_state_machine__41903__auto____0.call(this);
case 1:
return cljs$core$async$mapcat_STAR__$_state_machine__41903__auto____1.call(this,state_55010);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mapcat_STAR__$_state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mapcat_STAR__$_state_machine__41903__auto____0;
cljs$core$async$mapcat_STAR__$_state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mapcat_STAR__$_state_machine__41903__auto____1;
return cljs$core$async$mapcat_STAR__$_state_machine__41903__auto__;
})()
})();
var state__41997__auto__ = (function (){var statearr_55050 = f__41996__auto__();
(statearr_55050[(6)] = c__41995__auto__);

return statearr_55050;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__41997__auto__);
}));

return c__41995__auto__;
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_LT_ = (function cljs$core$async$mapcat_LT_(var_args){
var G__55052 = arguments.length;
switch (G__55052) {
case 2:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2 = (function (f,in$){
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3(f,in$,null);
}));

(cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3 = (function (f,in$,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
cljs.core.async.mapcat_STAR_(f,in$,out);

return out;
}));

(cljs.core.async.mapcat_LT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_GT_ = (function cljs$core$async$mapcat_GT_(var_args){
var G__55054 = arguments.length;
switch (G__55054) {
case 2:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2 = (function (f,out){
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3(f,out,null);
}));

(cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3 = (function (f,out,buf_or_n){
var in$ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
cljs.core.async.mapcat_STAR_(f,in$,out);

return in$;
}));

(cljs.core.async.mapcat_GT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.unique = (function cljs$core$async$unique(var_args){
var G__55056 = arguments.length;
switch (G__55056) {
case 1:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1 = (function (ch){
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2(ch,null);
}));

(cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2 = (function (ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__41995__auto___55799 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__41996__auto__ = (function (){var switch__41902__auto__ = (function (state_55080){
var state_val_55081 = (state_55080[(1)]);
if((state_val_55081 === (7))){
var inst_55075 = (state_55080[(2)]);
var state_55080__$1 = state_55080;
var statearr_55082_55800 = state_55080__$1;
(statearr_55082_55800[(2)] = inst_55075);

(statearr_55082_55800[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55081 === (1))){
var inst_55057 = null;
var state_55080__$1 = (function (){var statearr_55083 = state_55080;
(statearr_55083[(7)] = inst_55057);

return statearr_55083;
})();
var statearr_55084_55801 = state_55080__$1;
(statearr_55084_55801[(2)] = null);

(statearr_55084_55801[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55081 === (4))){
var inst_55060 = (state_55080[(8)]);
var inst_55060__$1 = (state_55080[(2)]);
var inst_55061 = (inst_55060__$1 == null);
var inst_55062 = cljs.core.not(inst_55061);
var state_55080__$1 = (function (){var statearr_55085 = state_55080;
(statearr_55085[(8)] = inst_55060__$1);

return statearr_55085;
})();
if(inst_55062){
var statearr_55086_55802 = state_55080__$1;
(statearr_55086_55802[(1)] = (5));

} else {
var statearr_55087_55803 = state_55080__$1;
(statearr_55087_55803[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55081 === (6))){
var state_55080__$1 = state_55080;
var statearr_55088_55804 = state_55080__$1;
(statearr_55088_55804[(2)] = null);

(statearr_55088_55804[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55081 === (3))){
var inst_55077 = (state_55080[(2)]);
var inst_55078 = cljs.core.async.close_BANG_(out);
var state_55080__$1 = (function (){var statearr_55089 = state_55080;
(statearr_55089[(9)] = inst_55077);

return statearr_55089;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_55080__$1,inst_55078);
} else {
if((state_val_55081 === (2))){
var state_55080__$1 = state_55080;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_55080__$1,(4),ch);
} else {
if((state_val_55081 === (11))){
var inst_55060 = (state_55080[(8)]);
var inst_55069 = (state_55080[(2)]);
var inst_55057 = inst_55060;
var state_55080__$1 = (function (){var statearr_55090 = state_55080;
(statearr_55090[(10)] = inst_55069);

(statearr_55090[(7)] = inst_55057);

return statearr_55090;
})();
var statearr_55091_55805 = state_55080__$1;
(statearr_55091_55805[(2)] = null);

(statearr_55091_55805[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55081 === (9))){
var inst_55060 = (state_55080[(8)]);
var state_55080__$1 = state_55080;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_55080__$1,(11),out,inst_55060);
} else {
if((state_val_55081 === (5))){
var inst_55060 = (state_55080[(8)]);
var inst_55057 = (state_55080[(7)]);
var inst_55064 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_55060,inst_55057);
var state_55080__$1 = state_55080;
if(inst_55064){
var statearr_55093_55806 = state_55080__$1;
(statearr_55093_55806[(1)] = (8));

} else {
var statearr_55094_55807 = state_55080__$1;
(statearr_55094_55807[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55081 === (10))){
var inst_55072 = (state_55080[(2)]);
var state_55080__$1 = state_55080;
var statearr_55095_55808 = state_55080__$1;
(statearr_55095_55808[(2)] = inst_55072);

(statearr_55095_55808[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55081 === (8))){
var inst_55057 = (state_55080[(7)]);
var tmp55092 = inst_55057;
var inst_55057__$1 = tmp55092;
var state_55080__$1 = (function (){var statearr_55096 = state_55080;
(statearr_55096[(7)] = inst_55057__$1);

return statearr_55096;
})();
var statearr_55097_55809 = state_55080__$1;
(statearr_55097_55809[(2)] = null);

(statearr_55097_55809[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__41903__auto__ = null;
var cljs$core$async$state_machine__41903__auto____0 = (function (){
var statearr_55098 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_55098[(0)] = cljs$core$async$state_machine__41903__auto__);

(statearr_55098[(1)] = (1));

return statearr_55098;
});
var cljs$core$async$state_machine__41903__auto____1 = (function (state_55080){
while(true){
var ret_value__41904__auto__ = (function (){try{while(true){
var result__41905__auto__ = switch__41902__auto__(state_55080);
if(cljs.core.keyword_identical_QMARK_(result__41905__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__41905__auto__;
}
break;
}
}catch (e55099){var ex__41906__auto__ = e55099;
var statearr_55100_55810 = state_55080;
(statearr_55100_55810[(2)] = ex__41906__auto__);


if(cljs.core.seq((state_55080[(4)]))){
var statearr_55101_55811 = state_55080;
(statearr_55101_55811[(1)] = cljs.core.first((state_55080[(4)])));

} else {
throw ex__41906__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41904__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__55812 = state_55080;
state_55080 = G__55812;
continue;
} else {
return ret_value__41904__auto__;
}
break;
}
});
cljs$core$async$state_machine__41903__auto__ = function(state_55080){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__41903__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__41903__auto____1.call(this,state_55080);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__41903__auto____0;
cljs$core$async$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__41903__auto____1;
return cljs$core$async$state_machine__41903__auto__;
})()
})();
var state__41997__auto__ = (function (){var statearr_55102 = f__41996__auto__();
(statearr_55102[(6)] = c__41995__auto___55799);

return statearr_55102;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__41997__auto__);
}));


return out;
}));

(cljs.core.async.unique.cljs$lang$maxFixedArity = 2);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition = (function cljs$core$async$partition(var_args){
var G__55104 = arguments.length;
switch (G__55104) {
case 2:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3(n,ch,null);
}));

(cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__41995__auto___55814 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__41996__auto__ = (function (){var switch__41902__auto__ = (function (state_55142){
var state_val_55143 = (state_55142[(1)]);
if((state_val_55143 === (7))){
var inst_55138 = (state_55142[(2)]);
var state_55142__$1 = state_55142;
var statearr_55144_55815 = state_55142__$1;
(statearr_55144_55815[(2)] = inst_55138);

(statearr_55144_55815[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55143 === (1))){
var inst_55105 = (new Array(n));
var inst_55106 = inst_55105;
var inst_55107 = (0);
var state_55142__$1 = (function (){var statearr_55145 = state_55142;
(statearr_55145[(7)] = inst_55106);

(statearr_55145[(8)] = inst_55107);

return statearr_55145;
})();
var statearr_55146_55817 = state_55142__$1;
(statearr_55146_55817[(2)] = null);

(statearr_55146_55817[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55143 === (4))){
var inst_55110 = (state_55142[(9)]);
var inst_55110__$1 = (state_55142[(2)]);
var inst_55111 = (inst_55110__$1 == null);
var inst_55112 = cljs.core.not(inst_55111);
var state_55142__$1 = (function (){var statearr_55147 = state_55142;
(statearr_55147[(9)] = inst_55110__$1);

return statearr_55147;
})();
if(inst_55112){
var statearr_55148_55818 = state_55142__$1;
(statearr_55148_55818[(1)] = (5));

} else {
var statearr_55149_55819 = state_55142__$1;
(statearr_55149_55819[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55143 === (15))){
var inst_55132 = (state_55142[(2)]);
var state_55142__$1 = state_55142;
var statearr_55150_55820 = state_55142__$1;
(statearr_55150_55820[(2)] = inst_55132);

(statearr_55150_55820[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55143 === (13))){
var state_55142__$1 = state_55142;
var statearr_55151_55824 = state_55142__$1;
(statearr_55151_55824[(2)] = null);

(statearr_55151_55824[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55143 === (6))){
var inst_55107 = (state_55142[(8)]);
var inst_55128 = (inst_55107 > (0));
var state_55142__$1 = state_55142;
if(cljs.core.truth_(inst_55128)){
var statearr_55152_55825 = state_55142__$1;
(statearr_55152_55825[(1)] = (12));

} else {
var statearr_55153_55826 = state_55142__$1;
(statearr_55153_55826[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55143 === (3))){
var inst_55140 = (state_55142[(2)]);
var state_55142__$1 = state_55142;
return cljs.core.async.impl.ioc_helpers.return_chan(state_55142__$1,inst_55140);
} else {
if((state_val_55143 === (12))){
var inst_55106 = (state_55142[(7)]);
var inst_55130 = cljs.core.vec(inst_55106);
var state_55142__$1 = state_55142;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_55142__$1,(15),out,inst_55130);
} else {
if((state_val_55143 === (2))){
var state_55142__$1 = state_55142;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_55142__$1,(4),ch);
} else {
if((state_val_55143 === (11))){
var inst_55122 = (state_55142[(2)]);
var inst_55123 = (new Array(n));
var inst_55106 = inst_55123;
var inst_55107 = (0);
var state_55142__$1 = (function (){var statearr_55154 = state_55142;
(statearr_55154[(10)] = inst_55122);

(statearr_55154[(7)] = inst_55106);

(statearr_55154[(8)] = inst_55107);

return statearr_55154;
})();
var statearr_55155_55827 = state_55142__$1;
(statearr_55155_55827[(2)] = null);

(statearr_55155_55827[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55143 === (9))){
var inst_55106 = (state_55142[(7)]);
var inst_55120 = cljs.core.vec(inst_55106);
var state_55142__$1 = state_55142;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_55142__$1,(11),out,inst_55120);
} else {
if((state_val_55143 === (5))){
var inst_55110 = (state_55142[(9)]);
var inst_55106 = (state_55142[(7)]);
var inst_55107 = (state_55142[(8)]);
var inst_55115 = (state_55142[(11)]);
var inst_55114 = (inst_55106[inst_55107] = inst_55110);
var inst_55115__$1 = (inst_55107 + (1));
var inst_55116 = (inst_55115__$1 < n);
var state_55142__$1 = (function (){var statearr_55156 = state_55142;
(statearr_55156[(12)] = inst_55114);

(statearr_55156[(11)] = inst_55115__$1);

return statearr_55156;
})();
if(cljs.core.truth_(inst_55116)){
var statearr_55157_55828 = state_55142__$1;
(statearr_55157_55828[(1)] = (8));

} else {
var statearr_55158_55829 = state_55142__$1;
(statearr_55158_55829[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55143 === (14))){
var inst_55135 = (state_55142[(2)]);
var inst_55136 = cljs.core.async.close_BANG_(out);
var state_55142__$1 = (function (){var statearr_55160 = state_55142;
(statearr_55160[(13)] = inst_55135);

return statearr_55160;
})();
var statearr_55161_55830 = state_55142__$1;
(statearr_55161_55830[(2)] = inst_55136);

(statearr_55161_55830[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55143 === (10))){
var inst_55126 = (state_55142[(2)]);
var state_55142__$1 = state_55142;
var statearr_55162_55831 = state_55142__$1;
(statearr_55162_55831[(2)] = inst_55126);

(statearr_55162_55831[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55143 === (8))){
var inst_55106 = (state_55142[(7)]);
var inst_55115 = (state_55142[(11)]);
var tmp55159 = inst_55106;
var inst_55106__$1 = tmp55159;
var inst_55107 = inst_55115;
var state_55142__$1 = (function (){var statearr_55163 = state_55142;
(statearr_55163[(7)] = inst_55106__$1);

(statearr_55163[(8)] = inst_55107);

return statearr_55163;
})();
var statearr_55164_55832 = state_55142__$1;
(statearr_55164_55832[(2)] = null);

(statearr_55164_55832[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__41903__auto__ = null;
var cljs$core$async$state_machine__41903__auto____0 = (function (){
var statearr_55165 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_55165[(0)] = cljs$core$async$state_machine__41903__auto__);

(statearr_55165[(1)] = (1));

return statearr_55165;
});
var cljs$core$async$state_machine__41903__auto____1 = (function (state_55142){
while(true){
var ret_value__41904__auto__ = (function (){try{while(true){
var result__41905__auto__ = switch__41902__auto__(state_55142);
if(cljs.core.keyword_identical_QMARK_(result__41905__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__41905__auto__;
}
break;
}
}catch (e55166){var ex__41906__auto__ = e55166;
var statearr_55167_55833 = state_55142;
(statearr_55167_55833[(2)] = ex__41906__auto__);


if(cljs.core.seq((state_55142[(4)]))){
var statearr_55168_55834 = state_55142;
(statearr_55168_55834[(1)] = cljs.core.first((state_55142[(4)])));

} else {
throw ex__41906__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41904__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__55835 = state_55142;
state_55142 = G__55835;
continue;
} else {
return ret_value__41904__auto__;
}
break;
}
});
cljs$core$async$state_machine__41903__auto__ = function(state_55142){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__41903__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__41903__auto____1.call(this,state_55142);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__41903__auto____0;
cljs$core$async$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__41903__auto____1;
return cljs$core$async$state_machine__41903__auto__;
})()
})();
var state__41997__auto__ = (function (){var statearr_55169 = f__41996__auto__();
(statearr_55169[(6)] = c__41995__auto___55814);

return statearr_55169;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__41997__auto__);
}));


return out;
}));

(cljs.core.async.partition.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition_by = (function cljs$core$async$partition_by(var_args){
var G__55171 = arguments.length;
switch (G__55171) {
case 2:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2 = (function (f,ch){
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3(f,ch,null);
}));

(cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3 = (function (f,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__41995__auto___55838 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__41996__auto__ = (function (){var switch__41902__auto__ = (function (state_55216){
var state_val_55217 = (state_55216[(1)]);
if((state_val_55217 === (7))){
var inst_55212 = (state_55216[(2)]);
var state_55216__$1 = state_55216;
var statearr_55218_55839 = state_55216__$1;
(statearr_55218_55839[(2)] = inst_55212);

(statearr_55218_55839[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55217 === (1))){
var inst_55172 = [];
var inst_55173 = inst_55172;
var inst_55174 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);
var state_55216__$1 = (function (){var statearr_55219 = state_55216;
(statearr_55219[(7)] = inst_55174);

(statearr_55219[(8)] = inst_55173);

return statearr_55219;
})();
var statearr_55220_55840 = state_55216__$1;
(statearr_55220_55840[(2)] = null);

(statearr_55220_55840[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55217 === (4))){
var inst_55177 = (state_55216[(9)]);
var inst_55177__$1 = (state_55216[(2)]);
var inst_55178 = (inst_55177__$1 == null);
var inst_55179 = cljs.core.not(inst_55178);
var state_55216__$1 = (function (){var statearr_55221 = state_55216;
(statearr_55221[(9)] = inst_55177__$1);

return statearr_55221;
})();
if(inst_55179){
var statearr_55222_55841 = state_55216__$1;
(statearr_55222_55841[(1)] = (5));

} else {
var statearr_55223_55842 = state_55216__$1;
(statearr_55223_55842[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55217 === (15))){
var inst_55173 = (state_55216[(8)]);
var inst_55204 = cljs.core.vec(inst_55173);
var state_55216__$1 = state_55216;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_55216__$1,(18),out,inst_55204);
} else {
if((state_val_55217 === (13))){
var inst_55199 = (state_55216[(2)]);
var state_55216__$1 = state_55216;
var statearr_55224_55843 = state_55216__$1;
(statearr_55224_55843[(2)] = inst_55199);

(statearr_55224_55843[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55217 === (6))){
var inst_55173 = (state_55216[(8)]);
var inst_55201 = inst_55173.length;
var inst_55202 = (inst_55201 > (0));
var state_55216__$1 = state_55216;
if(cljs.core.truth_(inst_55202)){
var statearr_55225_55844 = state_55216__$1;
(statearr_55225_55844[(1)] = (15));

} else {
var statearr_55226_55845 = state_55216__$1;
(statearr_55226_55845[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55217 === (17))){
var inst_55209 = (state_55216[(2)]);
var inst_55210 = cljs.core.async.close_BANG_(out);
var state_55216__$1 = (function (){var statearr_55227 = state_55216;
(statearr_55227[(10)] = inst_55209);

return statearr_55227;
})();
var statearr_55228_55846 = state_55216__$1;
(statearr_55228_55846[(2)] = inst_55210);

(statearr_55228_55846[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55217 === (3))){
var inst_55214 = (state_55216[(2)]);
var state_55216__$1 = state_55216;
return cljs.core.async.impl.ioc_helpers.return_chan(state_55216__$1,inst_55214);
} else {
if((state_val_55217 === (12))){
var inst_55173 = (state_55216[(8)]);
var inst_55192 = cljs.core.vec(inst_55173);
var state_55216__$1 = state_55216;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_55216__$1,(14),out,inst_55192);
} else {
if((state_val_55217 === (2))){
var state_55216__$1 = state_55216;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_55216__$1,(4),ch);
} else {
if((state_val_55217 === (11))){
var inst_55181 = (state_55216[(11)]);
var inst_55177 = (state_55216[(9)]);
var inst_55173 = (state_55216[(8)]);
var inst_55189 = inst_55173.push(inst_55177);
var tmp55229 = inst_55173;
var inst_55173__$1 = tmp55229;
var inst_55174 = inst_55181;
var state_55216__$1 = (function (){var statearr_55230 = state_55216;
(statearr_55230[(7)] = inst_55174);

(statearr_55230[(12)] = inst_55189);

(statearr_55230[(8)] = inst_55173__$1);

return statearr_55230;
})();
var statearr_55231_55851 = state_55216__$1;
(statearr_55231_55851[(2)] = null);

(statearr_55231_55851[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55217 === (9))){
var inst_55174 = (state_55216[(7)]);
var inst_55185 = cljs.core.keyword_identical_QMARK_(inst_55174,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));
var state_55216__$1 = state_55216;
var statearr_55232_55852 = state_55216__$1;
(statearr_55232_55852[(2)] = inst_55185);

(statearr_55232_55852[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55217 === (5))){
var inst_55174 = (state_55216[(7)]);
var inst_55182 = (state_55216[(13)]);
var inst_55181 = (state_55216[(11)]);
var inst_55177 = (state_55216[(9)]);
var inst_55181__$1 = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(inst_55177) : f.call(null,inst_55177));
var inst_55182__$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_55181__$1,inst_55174);
var state_55216__$1 = (function (){var statearr_55233 = state_55216;
(statearr_55233[(13)] = inst_55182__$1);

(statearr_55233[(11)] = inst_55181__$1);

return statearr_55233;
})();
if(inst_55182__$1){
var statearr_55234_55854 = state_55216__$1;
(statearr_55234_55854[(1)] = (8));

} else {
var statearr_55235_55855 = state_55216__$1;
(statearr_55235_55855[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55217 === (14))){
var inst_55181 = (state_55216[(11)]);
var inst_55177 = (state_55216[(9)]);
var inst_55194 = (state_55216[(2)]);
var inst_55195 = [];
var inst_55196 = inst_55195.push(inst_55177);
var inst_55173 = inst_55195;
var inst_55174 = inst_55181;
var state_55216__$1 = (function (){var statearr_55236 = state_55216;
(statearr_55236[(14)] = inst_55194);

(statearr_55236[(7)] = inst_55174);

(statearr_55236[(15)] = inst_55196);

(statearr_55236[(8)] = inst_55173);

return statearr_55236;
})();
var statearr_55237_55856 = state_55216__$1;
(statearr_55237_55856[(2)] = null);

(statearr_55237_55856[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55217 === (16))){
var state_55216__$1 = state_55216;
var statearr_55238_55857 = state_55216__$1;
(statearr_55238_55857[(2)] = null);

(statearr_55238_55857[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55217 === (10))){
var inst_55187 = (state_55216[(2)]);
var state_55216__$1 = state_55216;
if(cljs.core.truth_(inst_55187)){
var statearr_55239_55858 = state_55216__$1;
(statearr_55239_55858[(1)] = (11));

} else {
var statearr_55240_55859 = state_55216__$1;
(statearr_55240_55859[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55217 === (18))){
var inst_55206 = (state_55216[(2)]);
var state_55216__$1 = state_55216;
var statearr_55241_55860 = state_55216__$1;
(statearr_55241_55860[(2)] = inst_55206);

(statearr_55241_55860[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_55217 === (8))){
var inst_55182 = (state_55216[(13)]);
var state_55216__$1 = state_55216;
var statearr_55242_55861 = state_55216__$1;
(statearr_55242_55861[(2)] = inst_55182);

(statearr_55242_55861[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__41903__auto__ = null;
var cljs$core$async$state_machine__41903__auto____0 = (function (){
var statearr_55243 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_55243[(0)] = cljs$core$async$state_machine__41903__auto__);

(statearr_55243[(1)] = (1));

return statearr_55243;
});
var cljs$core$async$state_machine__41903__auto____1 = (function (state_55216){
while(true){
var ret_value__41904__auto__ = (function (){try{while(true){
var result__41905__auto__ = switch__41902__auto__(state_55216);
if(cljs.core.keyword_identical_QMARK_(result__41905__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__41905__auto__;
}
break;
}
}catch (e55244){var ex__41906__auto__ = e55244;
var statearr_55245_55863 = state_55216;
(statearr_55245_55863[(2)] = ex__41906__auto__);


if(cljs.core.seq((state_55216[(4)]))){
var statearr_55246_55864 = state_55216;
(statearr_55246_55864[(1)] = cljs.core.first((state_55216[(4)])));

} else {
throw ex__41906__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41904__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__55865 = state_55216;
state_55216 = G__55865;
continue;
} else {
return ret_value__41904__auto__;
}
break;
}
});
cljs$core$async$state_machine__41903__auto__ = function(state_55216){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__41903__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__41903__auto____1.call(this,state_55216);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__41903__auto____0;
cljs$core$async$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__41903__auto____1;
return cljs$core$async$state_machine__41903__auto__;
})()
})();
var state__41997__auto__ = (function (){var statearr_55247 = f__41996__auto__();
(statearr_55247[(6)] = c__41995__auto___55838);

return statearr_55247;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__41997__auto__);
}));


return out;
}));

(cljs.core.async.partition_by.cljs$lang$maxFixedArity = 3);


//# sourceMappingURL=cljs.core.async.js.map
