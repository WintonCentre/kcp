goog.provide('cljs.core.async');
goog.scope(function(){
  cljs.core.async.goog$module$goog$array = goog.module.get('goog.array');
});
cljs.core.async.fn_handler = (function cljs$core$async$fn_handler(var_args){
var G__72245 = arguments.length;
switch (G__72245) {
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
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async72246 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async72246 = (function (f,blockable,meta72247){
this.f = f;
this.blockable = blockable;
this.meta72247 = meta72247;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async72246.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_72248,meta72247__$1){
var self__ = this;
var _72248__$1 = this;
return (new cljs.core.async.t_cljs$core$async72246(self__.f,self__.blockable,meta72247__$1));
}));

(cljs.core.async.t_cljs$core$async72246.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_72248){
var self__ = this;
var _72248__$1 = this;
return self__.meta72247;
}));

(cljs.core.async.t_cljs$core$async72246.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async72246.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async72246.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.blockable;
}));

(cljs.core.async.t_cljs$core$async72246.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.f;
}));

(cljs.core.async.t_cljs$core$async72246.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"blockable","blockable",-28395259,null),new cljs.core.Symbol(null,"meta72247","meta72247",-301777905,null)], null);
}));

(cljs.core.async.t_cljs$core$async72246.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async72246.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async72246");

(cljs.core.async.t_cljs$core$async72246.cljs$lang$ctorPrWriter = (function (this__4491__auto__,writer__4492__auto__,opt__4493__auto__){
return cljs.core._write(writer__4492__auto__,"cljs.core.async/t_cljs$core$async72246");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async72246.
 */
cljs.core.async.__GT_t_cljs$core$async72246 = (function cljs$core$async$__GT_t_cljs$core$async72246(f__$1,blockable__$1,meta72247){
return (new cljs.core.async.t_cljs$core$async72246(f__$1,blockable__$1,meta72247));
});

}

return (new cljs.core.async.t_cljs$core$async72246(f,blockable,cljs.core.PersistentArrayMap.EMPTY));
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
var G__72251 = arguments.length;
switch (G__72251) {
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
var G__72253 = arguments.length;
switch (G__72253) {
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
var G__72255 = arguments.length;
switch (G__72255) {
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
var val_73693 = cljs.core.deref(ret);
if(cljs.core.truth_(on_caller_QMARK_)){
(fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(val_73693) : fn1.call(null,val_73693));
} else {
cljs.core.async.impl.dispatch.run((function (){
return (fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(val_73693) : fn1.call(null,val_73693));
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
var G__72257 = arguments.length;
switch (G__72257) {
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
var n__4741__auto___73695 = n;
var x_73696 = (0);
while(true){
if((x_73696 < n__4741__auto___73695)){
(a[x_73696] = x_73696);

var G__73697 = (x_73696 + (1));
x_73696 = G__73697;
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
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async72258 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async72258 = (function (flag,meta72259){
this.flag = flag;
this.meta72259 = meta72259;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async72258.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_72260,meta72259__$1){
var self__ = this;
var _72260__$1 = this;
return (new cljs.core.async.t_cljs$core$async72258(self__.flag,meta72259__$1));
}));

(cljs.core.async.t_cljs$core$async72258.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_72260){
var self__ = this;
var _72260__$1 = this;
return self__.meta72259;
}));

(cljs.core.async.t_cljs$core$async72258.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async72258.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.deref(self__.flag);
}));

(cljs.core.async.t_cljs$core$async72258.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async72258.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.flag,null);

return true;
}));

(cljs.core.async.t_cljs$core$async72258.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"meta72259","meta72259",-1982172702,null)], null);
}));

(cljs.core.async.t_cljs$core$async72258.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async72258.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async72258");

(cljs.core.async.t_cljs$core$async72258.cljs$lang$ctorPrWriter = (function (this__4491__auto__,writer__4492__auto__,opt__4493__auto__){
return cljs.core._write(writer__4492__auto__,"cljs.core.async/t_cljs$core$async72258");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async72258.
 */
cljs.core.async.__GT_t_cljs$core$async72258 = (function cljs$core$async$alt_flag_$___GT_t_cljs$core$async72258(flag__$1,meta72259){
return (new cljs.core.async.t_cljs$core$async72258(flag__$1,meta72259));
});

}

return (new cljs.core.async.t_cljs$core$async72258(flag,cljs.core.PersistentArrayMap.EMPTY));
});
cljs.core.async.alt_handler = (function cljs$core$async$alt_handler(flag,cb){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async72261 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async72261 = (function (flag,cb,meta72262){
this.flag = flag;
this.cb = cb;
this.meta72262 = meta72262;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async72261.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_72263,meta72262__$1){
var self__ = this;
var _72263__$1 = this;
return (new cljs.core.async.t_cljs$core$async72261(self__.flag,self__.cb,meta72262__$1));
}));

(cljs.core.async.t_cljs$core$async72261.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_72263){
var self__ = this;
var _72263__$1 = this;
return self__.meta72262;
}));

(cljs.core.async.t_cljs$core$async72261.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async72261.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.active_QMARK_(self__.flag);
}));

(cljs.core.async.t_cljs$core$async72261.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async72261.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.commit(self__.flag);

return self__.cb;
}));

(cljs.core.async.t_cljs$core$async72261.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null),new cljs.core.Symbol(null,"meta72262","meta72262",850328905,null)], null);
}));

(cljs.core.async.t_cljs$core$async72261.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async72261.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async72261");

(cljs.core.async.t_cljs$core$async72261.cljs$lang$ctorPrWriter = (function (this__4491__auto__,writer__4492__auto__,opt__4493__auto__){
return cljs.core._write(writer__4492__auto__,"cljs.core.async/t_cljs$core$async72261");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async72261.
 */
cljs.core.async.__GT_t_cljs$core$async72261 = (function cljs$core$async$alt_handler_$___GT_t_cljs$core$async72261(flag__$1,cb__$1,meta72262){
return (new cljs.core.async.t_cljs$core$async72261(flag__$1,cb__$1,meta72262));
});

}

return (new cljs.core.async.t_cljs$core$async72261(flag,cb,cljs.core.PersistentArrayMap.EMPTY));
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
return (function (p1__72264_SHARP_){
var G__72267 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__72264_SHARP_,wport], null);
return (fret.cljs$core$IFn$_invoke$arity$1 ? fret.cljs$core$IFn$_invoke$arity$1(G__72267) : fret.call(null,G__72267));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.alt_handler(flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__72265_SHARP_){
var G__72268 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__72265_SHARP_,port], null);
return (fret.cljs$core$IFn$_invoke$arity$1 ? fret.cljs$core$IFn$_invoke$arity$1(G__72268) : fret.call(null,G__72268));
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
var G__73702 = (i + (1));
i = G__73702;
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
var len__4864__auto___73704 = arguments.length;
var i__4865__auto___73705 = (0);
while(true){
if((i__4865__auto___73705 < len__4864__auto___73704)){
args__4870__auto__.push((arguments[i__4865__auto___73705]));

var G__73706 = (i__4865__auto___73705 + (1));
i__4865__auto___73705 = G__73706;
continue;
} else {
}
break;
}

var argseq__4871__auto__ = ((((1) < args__4870__auto__.length))?(new cljs.core.IndexedSeq(args__4870__auto__.slice((1)),(0),null)):null);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4871__auto__);
});

(cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ports,p__72273){
var map__72274 = p__72273;
var map__72274__$1 = cljs.core.__destructure_map(map__72274);
var opts = map__72274__$1;
throw (new Error("alts! used not in (go ...) block"));
}));

(cljs.core.async.alts_BANG_.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(cljs.core.async.alts_BANG_.cljs$lang$applyTo = (function (seq72269){
var G__72270 = cljs.core.first(seq72269);
var seq72269__$1 = cljs.core.next(seq72269);
var self__4851__auto__ = this;
return self__4851__auto__.cljs$core$IFn$_invoke$arity$variadic(G__72270,seq72269__$1);
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
var G__72283 = arguments.length;
switch (G__72283) {
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
var c__41995__auto___73710 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__41996__auto__ = (function (){var switch__41902__auto__ = (function (state_72307){
var state_val_72308 = (state_72307[(1)]);
if((state_val_72308 === (7))){
var inst_72303 = (state_72307[(2)]);
var state_72307__$1 = state_72307;
var statearr_72309_73711 = state_72307__$1;
(statearr_72309_73711[(2)] = inst_72303);

(statearr_72309_73711[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72308 === (1))){
var state_72307__$1 = state_72307;
var statearr_72314_73712 = state_72307__$1;
(statearr_72314_73712[(2)] = null);

(statearr_72314_73712[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72308 === (4))){
var inst_72286 = (state_72307[(7)]);
var inst_72286__$1 = (state_72307[(2)]);
var inst_72287 = (inst_72286__$1 == null);
var state_72307__$1 = (function (){var statearr_72315 = state_72307;
(statearr_72315[(7)] = inst_72286__$1);

return statearr_72315;
})();
if(cljs.core.truth_(inst_72287)){
var statearr_72316_73713 = state_72307__$1;
(statearr_72316_73713[(1)] = (5));

} else {
var statearr_72317_73714 = state_72307__$1;
(statearr_72317_73714[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72308 === (13))){
var state_72307__$1 = state_72307;
var statearr_72319_73715 = state_72307__$1;
(statearr_72319_73715[(2)] = null);

(statearr_72319_73715[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72308 === (6))){
var inst_72286 = (state_72307[(7)]);
var state_72307__$1 = state_72307;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_72307__$1,(11),to,inst_72286);
} else {
if((state_val_72308 === (3))){
var inst_72305 = (state_72307[(2)]);
var state_72307__$1 = state_72307;
return cljs.core.async.impl.ioc_helpers.return_chan(state_72307__$1,inst_72305);
} else {
if((state_val_72308 === (12))){
var state_72307__$1 = state_72307;
var statearr_72321_73716 = state_72307__$1;
(statearr_72321_73716[(2)] = null);

(statearr_72321_73716[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72308 === (2))){
var state_72307__$1 = state_72307;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_72307__$1,(4),from);
} else {
if((state_val_72308 === (11))){
var inst_72296 = (state_72307[(2)]);
var state_72307__$1 = state_72307;
if(cljs.core.truth_(inst_72296)){
var statearr_72323_73717 = state_72307__$1;
(statearr_72323_73717[(1)] = (12));

} else {
var statearr_72324_73718 = state_72307__$1;
(statearr_72324_73718[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72308 === (9))){
var state_72307__$1 = state_72307;
var statearr_72325_73719 = state_72307__$1;
(statearr_72325_73719[(2)] = null);

(statearr_72325_73719[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72308 === (5))){
var state_72307__$1 = state_72307;
if(cljs.core.truth_(close_QMARK_)){
var statearr_72326_73720 = state_72307__$1;
(statearr_72326_73720[(1)] = (8));

} else {
var statearr_72327_73722 = state_72307__$1;
(statearr_72327_73722[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72308 === (14))){
var inst_72301 = (state_72307[(2)]);
var state_72307__$1 = state_72307;
var statearr_72328_73723 = state_72307__$1;
(statearr_72328_73723[(2)] = inst_72301);

(statearr_72328_73723[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72308 === (10))){
var inst_72293 = (state_72307[(2)]);
var state_72307__$1 = state_72307;
var statearr_72329_73725 = state_72307__$1;
(statearr_72329_73725[(2)] = inst_72293);

(statearr_72329_73725[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72308 === (8))){
var inst_72290 = cljs.core.async.close_BANG_(to);
var state_72307__$1 = state_72307;
var statearr_72330_73726 = state_72307__$1;
(statearr_72330_73726[(2)] = inst_72290);

(statearr_72330_73726[(1)] = (10));


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
var statearr_72332 = [null,null,null,null,null,null,null,null];
(statearr_72332[(0)] = cljs$core$async$state_machine__41903__auto__);

(statearr_72332[(1)] = (1));

return statearr_72332;
});
var cljs$core$async$state_machine__41903__auto____1 = (function (state_72307){
while(true){
var ret_value__41904__auto__ = (function (){try{while(true){
var result__41905__auto__ = switch__41902__auto__(state_72307);
if(cljs.core.keyword_identical_QMARK_(result__41905__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__41905__auto__;
}
break;
}
}catch (e72336){var ex__41906__auto__ = e72336;
var statearr_72337_73727 = state_72307;
(statearr_72337_73727[(2)] = ex__41906__auto__);


if(cljs.core.seq((state_72307[(4)]))){
var statearr_72338_73728 = state_72307;
(statearr_72338_73728[(1)] = cljs.core.first((state_72307[(4)])));

} else {
throw ex__41906__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41904__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__73729 = state_72307;
state_72307 = G__73729;
continue;
} else {
return ret_value__41904__auto__;
}
break;
}
});
cljs$core$async$state_machine__41903__auto__ = function(state_72307){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__41903__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__41903__auto____1.call(this,state_72307);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__41903__auto____0;
cljs$core$async$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__41903__auto____1;
return cljs$core$async$state_machine__41903__auto__;
})()
})();
var state__41997__auto__ = (function (){var statearr_72339 = f__41996__auto__();
(statearr_72339[(6)] = c__41995__auto___73710);

return statearr_72339;
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
var process = (function (p__72340){
var vec__72341 = p__72340;
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__72341,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__72341,(1),null);
var job = vec__72341;
if((job == null)){
cljs.core.async.close_BANG_(results);

return null;
} else {
var res = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((1),xf,ex_handler);
var c__41995__auto___73730 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__41996__auto__ = (function (){var switch__41902__auto__ = (function (state_72348){
var state_val_72349 = (state_72348[(1)]);
if((state_val_72349 === (1))){
var state_72348__$1 = state_72348;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_72348__$1,(2),res,v);
} else {
if((state_val_72349 === (2))){
var inst_72345 = (state_72348[(2)]);
var inst_72346 = cljs.core.async.close_BANG_(res);
var state_72348__$1 = (function (){var statearr_72350 = state_72348;
(statearr_72350[(7)] = inst_72345);

return statearr_72350;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_72348__$1,inst_72346);
} else {
return null;
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____0 = (function (){
var statearr_72351 = [null,null,null,null,null,null,null,null];
(statearr_72351[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__);

(statearr_72351[(1)] = (1));

return statearr_72351;
});
var cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____1 = (function (state_72348){
while(true){
var ret_value__41904__auto__ = (function (){try{while(true){
var result__41905__auto__ = switch__41902__auto__(state_72348);
if(cljs.core.keyword_identical_QMARK_(result__41905__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__41905__auto__;
}
break;
}
}catch (e72352){var ex__41906__auto__ = e72352;
var statearr_72353_73731 = state_72348;
(statearr_72353_73731[(2)] = ex__41906__auto__);


if(cljs.core.seq((state_72348[(4)]))){
var statearr_72354_73733 = state_72348;
(statearr_72354_73733[(1)] = cljs.core.first((state_72348[(4)])));

} else {
throw ex__41906__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41904__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__73734 = state_72348;
state_72348 = G__73734;
continue;
} else {
return ret_value__41904__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__ = function(state_72348){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____1.call(this,state_72348);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__;
})()
})();
var state__41997__auto__ = (function (){var statearr_72355 = f__41996__auto__();
(statearr_72355[(6)] = c__41995__auto___73730);

return statearr_72355;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__41997__auto__);
}));


cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(p,res);

return true;
}
});
var async = (function (p__72356){
var vec__72357 = p__72356;
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__72357,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__72357,(1),null);
var job = vec__72357;
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
var n__4741__auto___73736 = n;
var __73737 = (0);
while(true){
if((__73737 < n__4741__auto___73736)){
var G__72360_73738 = type;
var G__72360_73739__$1 = (((G__72360_73738 instanceof cljs.core.Keyword))?G__72360_73738.fqn:null);
switch (G__72360_73739__$1) {
case "compute":
var c__41995__auto___73741 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (__73737,c__41995__auto___73741,G__72360_73738,G__72360_73739__$1,n__4741__auto___73736,jobs,results,process,async){
return (function (){
var f__41996__auto__ = (function (){var switch__41902__auto__ = ((function (__73737,c__41995__auto___73741,G__72360_73738,G__72360_73739__$1,n__4741__auto___73736,jobs,results,process,async){
return (function (state_72373){
var state_val_72374 = (state_72373[(1)]);
if((state_val_72374 === (1))){
var state_72373__$1 = state_72373;
var statearr_72375_73742 = state_72373__$1;
(statearr_72375_73742[(2)] = null);

(statearr_72375_73742[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72374 === (2))){
var state_72373__$1 = state_72373;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_72373__$1,(4),jobs);
} else {
if((state_val_72374 === (3))){
var inst_72371 = (state_72373[(2)]);
var state_72373__$1 = state_72373;
return cljs.core.async.impl.ioc_helpers.return_chan(state_72373__$1,inst_72371);
} else {
if((state_val_72374 === (4))){
var inst_72363 = (state_72373[(2)]);
var inst_72364 = process(inst_72363);
var state_72373__$1 = state_72373;
if(cljs.core.truth_(inst_72364)){
var statearr_72376_73743 = state_72373__$1;
(statearr_72376_73743[(1)] = (5));

} else {
var statearr_72377_73744 = state_72373__$1;
(statearr_72377_73744[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72374 === (5))){
var state_72373__$1 = state_72373;
var statearr_72378_73745 = state_72373__$1;
(statearr_72378_73745[(2)] = null);

(statearr_72378_73745[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72374 === (6))){
var state_72373__$1 = state_72373;
var statearr_72379_73746 = state_72373__$1;
(statearr_72379_73746[(2)] = null);

(statearr_72379_73746[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72374 === (7))){
var inst_72369 = (state_72373[(2)]);
var state_72373__$1 = state_72373;
var statearr_72380_73747 = state_72373__$1;
(statearr_72380_73747[(2)] = inst_72369);

(statearr_72380_73747[(1)] = (3));


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
});})(__73737,c__41995__auto___73741,G__72360_73738,G__72360_73739__$1,n__4741__auto___73736,jobs,results,process,async))
;
return ((function (__73737,switch__41902__auto__,c__41995__auto___73741,G__72360_73738,G__72360_73739__$1,n__4741__auto___73736,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____0 = (function (){
var statearr_72381 = [null,null,null,null,null,null,null];
(statearr_72381[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__);

(statearr_72381[(1)] = (1));

return statearr_72381;
});
var cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____1 = (function (state_72373){
while(true){
var ret_value__41904__auto__ = (function (){try{while(true){
var result__41905__auto__ = switch__41902__auto__(state_72373);
if(cljs.core.keyword_identical_QMARK_(result__41905__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__41905__auto__;
}
break;
}
}catch (e72382){var ex__41906__auto__ = e72382;
var statearr_72383_73748 = state_72373;
(statearr_72383_73748[(2)] = ex__41906__auto__);


if(cljs.core.seq((state_72373[(4)]))){
var statearr_72384_73749 = state_72373;
(statearr_72384_73749[(1)] = cljs.core.first((state_72373[(4)])));

} else {
throw ex__41906__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41904__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__73750 = state_72373;
state_72373 = G__73750;
continue;
} else {
return ret_value__41904__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__ = function(state_72373){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____1.call(this,state_72373);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__;
})()
;})(__73737,switch__41902__auto__,c__41995__auto___73741,G__72360_73738,G__72360_73739__$1,n__4741__auto___73736,jobs,results,process,async))
})();
var state__41997__auto__ = (function (){var statearr_72385 = f__41996__auto__();
(statearr_72385[(6)] = c__41995__auto___73741);

return statearr_72385;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__41997__auto__);
});})(__73737,c__41995__auto___73741,G__72360_73738,G__72360_73739__$1,n__4741__auto___73736,jobs,results,process,async))
);


break;
case "async":
var c__41995__auto___73752 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (__73737,c__41995__auto___73752,G__72360_73738,G__72360_73739__$1,n__4741__auto___73736,jobs,results,process,async){
return (function (){
var f__41996__auto__ = (function (){var switch__41902__auto__ = ((function (__73737,c__41995__auto___73752,G__72360_73738,G__72360_73739__$1,n__4741__auto___73736,jobs,results,process,async){
return (function (state_72398){
var state_val_72399 = (state_72398[(1)]);
if((state_val_72399 === (1))){
var state_72398__$1 = state_72398;
var statearr_72400_73754 = state_72398__$1;
(statearr_72400_73754[(2)] = null);

(statearr_72400_73754[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72399 === (2))){
var state_72398__$1 = state_72398;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_72398__$1,(4),jobs);
} else {
if((state_val_72399 === (3))){
var inst_72396 = (state_72398[(2)]);
var state_72398__$1 = state_72398;
return cljs.core.async.impl.ioc_helpers.return_chan(state_72398__$1,inst_72396);
} else {
if((state_val_72399 === (4))){
var inst_72388 = (state_72398[(2)]);
var inst_72389 = async(inst_72388);
var state_72398__$1 = state_72398;
if(cljs.core.truth_(inst_72389)){
var statearr_72401_73755 = state_72398__$1;
(statearr_72401_73755[(1)] = (5));

} else {
var statearr_72402_73756 = state_72398__$1;
(statearr_72402_73756[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72399 === (5))){
var state_72398__$1 = state_72398;
var statearr_72403_73757 = state_72398__$1;
(statearr_72403_73757[(2)] = null);

(statearr_72403_73757[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72399 === (6))){
var state_72398__$1 = state_72398;
var statearr_72404_73758 = state_72398__$1;
(statearr_72404_73758[(2)] = null);

(statearr_72404_73758[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72399 === (7))){
var inst_72394 = (state_72398[(2)]);
var state_72398__$1 = state_72398;
var statearr_72405_73759 = state_72398__$1;
(statearr_72405_73759[(2)] = inst_72394);

(statearr_72405_73759[(1)] = (3));


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
});})(__73737,c__41995__auto___73752,G__72360_73738,G__72360_73739__$1,n__4741__auto___73736,jobs,results,process,async))
;
return ((function (__73737,switch__41902__auto__,c__41995__auto___73752,G__72360_73738,G__72360_73739__$1,n__4741__auto___73736,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____0 = (function (){
var statearr_72406 = [null,null,null,null,null,null,null];
(statearr_72406[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__);

(statearr_72406[(1)] = (1));

return statearr_72406;
});
var cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____1 = (function (state_72398){
while(true){
var ret_value__41904__auto__ = (function (){try{while(true){
var result__41905__auto__ = switch__41902__auto__(state_72398);
if(cljs.core.keyword_identical_QMARK_(result__41905__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__41905__auto__;
}
break;
}
}catch (e72407){var ex__41906__auto__ = e72407;
var statearr_72408_73760 = state_72398;
(statearr_72408_73760[(2)] = ex__41906__auto__);


if(cljs.core.seq((state_72398[(4)]))){
var statearr_72409_73761 = state_72398;
(statearr_72409_73761[(1)] = cljs.core.first((state_72398[(4)])));

} else {
throw ex__41906__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41904__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__73762 = state_72398;
state_72398 = G__73762;
continue;
} else {
return ret_value__41904__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__ = function(state_72398){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____1.call(this,state_72398);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__;
})()
;})(__73737,switch__41902__auto__,c__41995__auto___73752,G__72360_73738,G__72360_73739__$1,n__4741__auto___73736,jobs,results,process,async))
})();
var state__41997__auto__ = (function (){var statearr_72410 = f__41996__auto__();
(statearr_72410[(6)] = c__41995__auto___73752);

return statearr_72410;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__41997__auto__);
});})(__73737,c__41995__auto___73752,G__72360_73738,G__72360_73739__$1,n__4741__auto___73736,jobs,results,process,async))
);


break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__72360_73739__$1)].join('')));

}

var G__73764 = (__73737 + (1));
__73737 = G__73764;
continue;
} else {
}
break;
}

var c__41995__auto___73765 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__41996__auto__ = (function (){var switch__41902__auto__ = (function (state_72432){
var state_val_72433 = (state_72432[(1)]);
if((state_val_72433 === (7))){
var inst_72428 = (state_72432[(2)]);
var state_72432__$1 = state_72432;
var statearr_72434_73766 = state_72432__$1;
(statearr_72434_73766[(2)] = inst_72428);

(statearr_72434_73766[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72433 === (1))){
var state_72432__$1 = state_72432;
var statearr_72435_73767 = state_72432__$1;
(statearr_72435_73767[(2)] = null);

(statearr_72435_73767[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72433 === (4))){
var inst_72413 = (state_72432[(7)]);
var inst_72413__$1 = (state_72432[(2)]);
var inst_72414 = (inst_72413__$1 == null);
var state_72432__$1 = (function (){var statearr_72436 = state_72432;
(statearr_72436[(7)] = inst_72413__$1);

return statearr_72436;
})();
if(cljs.core.truth_(inst_72414)){
var statearr_72437_73768 = state_72432__$1;
(statearr_72437_73768[(1)] = (5));

} else {
var statearr_72438_73769 = state_72432__$1;
(statearr_72438_73769[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72433 === (6))){
var inst_72413 = (state_72432[(7)]);
var inst_72418 = (state_72432[(8)]);
var inst_72418__$1 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var inst_72419 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_72420 = [inst_72413,inst_72418__$1];
var inst_72421 = (new cljs.core.PersistentVector(null,2,(5),inst_72419,inst_72420,null));
var state_72432__$1 = (function (){var statearr_72439 = state_72432;
(statearr_72439[(8)] = inst_72418__$1);

return statearr_72439;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_72432__$1,(8),jobs,inst_72421);
} else {
if((state_val_72433 === (3))){
var inst_72430 = (state_72432[(2)]);
var state_72432__$1 = state_72432;
return cljs.core.async.impl.ioc_helpers.return_chan(state_72432__$1,inst_72430);
} else {
if((state_val_72433 === (2))){
var state_72432__$1 = state_72432;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_72432__$1,(4),from);
} else {
if((state_val_72433 === (9))){
var inst_72425 = (state_72432[(2)]);
var state_72432__$1 = (function (){var statearr_72440 = state_72432;
(statearr_72440[(9)] = inst_72425);

return statearr_72440;
})();
var statearr_72441_73770 = state_72432__$1;
(statearr_72441_73770[(2)] = null);

(statearr_72441_73770[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72433 === (5))){
var inst_72416 = cljs.core.async.close_BANG_(jobs);
var state_72432__$1 = state_72432;
var statearr_72442_73771 = state_72432__$1;
(statearr_72442_73771[(2)] = inst_72416);

(statearr_72442_73771[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72433 === (8))){
var inst_72418 = (state_72432[(8)]);
var inst_72423 = (state_72432[(2)]);
var state_72432__$1 = (function (){var statearr_72443 = state_72432;
(statearr_72443[(10)] = inst_72423);

return statearr_72443;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_72432__$1,(9),results,inst_72418);
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
var statearr_72444 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_72444[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__);

(statearr_72444[(1)] = (1));

return statearr_72444;
});
var cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____1 = (function (state_72432){
while(true){
var ret_value__41904__auto__ = (function (){try{while(true){
var result__41905__auto__ = switch__41902__auto__(state_72432);
if(cljs.core.keyword_identical_QMARK_(result__41905__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__41905__auto__;
}
break;
}
}catch (e72445){var ex__41906__auto__ = e72445;
var statearr_72446_73776 = state_72432;
(statearr_72446_73776[(2)] = ex__41906__auto__);


if(cljs.core.seq((state_72432[(4)]))){
var statearr_72447_73777 = state_72432;
(statearr_72447_73777[(1)] = cljs.core.first((state_72432[(4)])));

} else {
throw ex__41906__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41904__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__73778 = state_72432;
state_72432 = G__73778;
continue;
} else {
return ret_value__41904__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__ = function(state_72432){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____1.call(this,state_72432);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__;
})()
})();
var state__41997__auto__ = (function (){var statearr_72448 = f__41996__auto__();
(statearr_72448[(6)] = c__41995__auto___73765);

return statearr_72448;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__41997__auto__);
}));


var c__41995__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__41996__auto__ = (function (){var switch__41902__auto__ = (function (state_72486){
var state_val_72487 = (state_72486[(1)]);
if((state_val_72487 === (7))){
var inst_72482 = (state_72486[(2)]);
var state_72486__$1 = state_72486;
var statearr_72488_73779 = state_72486__$1;
(statearr_72488_73779[(2)] = inst_72482);

(statearr_72488_73779[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72487 === (20))){
var state_72486__$1 = state_72486;
var statearr_72489_73780 = state_72486__$1;
(statearr_72489_73780[(2)] = null);

(statearr_72489_73780[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72487 === (1))){
var state_72486__$1 = state_72486;
var statearr_72490_73781 = state_72486__$1;
(statearr_72490_73781[(2)] = null);

(statearr_72490_73781[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72487 === (4))){
var inst_72451 = (state_72486[(7)]);
var inst_72451__$1 = (state_72486[(2)]);
var inst_72452 = (inst_72451__$1 == null);
var state_72486__$1 = (function (){var statearr_72491 = state_72486;
(statearr_72491[(7)] = inst_72451__$1);

return statearr_72491;
})();
if(cljs.core.truth_(inst_72452)){
var statearr_72492_73782 = state_72486__$1;
(statearr_72492_73782[(1)] = (5));

} else {
var statearr_72493_73783 = state_72486__$1;
(statearr_72493_73783[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72487 === (15))){
var inst_72464 = (state_72486[(8)]);
var state_72486__$1 = state_72486;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_72486__$1,(18),to,inst_72464);
} else {
if((state_val_72487 === (21))){
var inst_72477 = (state_72486[(2)]);
var state_72486__$1 = state_72486;
var statearr_72494_73784 = state_72486__$1;
(statearr_72494_73784[(2)] = inst_72477);

(statearr_72494_73784[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72487 === (13))){
var inst_72479 = (state_72486[(2)]);
var state_72486__$1 = (function (){var statearr_72495 = state_72486;
(statearr_72495[(9)] = inst_72479);

return statearr_72495;
})();
var statearr_72496_73785 = state_72486__$1;
(statearr_72496_73785[(2)] = null);

(statearr_72496_73785[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72487 === (6))){
var inst_72451 = (state_72486[(7)]);
var state_72486__$1 = state_72486;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_72486__$1,(11),inst_72451);
} else {
if((state_val_72487 === (17))){
var inst_72472 = (state_72486[(2)]);
var state_72486__$1 = state_72486;
if(cljs.core.truth_(inst_72472)){
var statearr_72497_73786 = state_72486__$1;
(statearr_72497_73786[(1)] = (19));

} else {
var statearr_72498_73787 = state_72486__$1;
(statearr_72498_73787[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72487 === (3))){
var inst_72484 = (state_72486[(2)]);
var state_72486__$1 = state_72486;
return cljs.core.async.impl.ioc_helpers.return_chan(state_72486__$1,inst_72484);
} else {
if((state_val_72487 === (12))){
var inst_72461 = (state_72486[(10)]);
var state_72486__$1 = state_72486;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_72486__$1,(14),inst_72461);
} else {
if((state_val_72487 === (2))){
var state_72486__$1 = state_72486;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_72486__$1,(4),results);
} else {
if((state_val_72487 === (19))){
var state_72486__$1 = state_72486;
var statearr_72499_73788 = state_72486__$1;
(statearr_72499_73788[(2)] = null);

(statearr_72499_73788[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72487 === (11))){
var inst_72461 = (state_72486[(2)]);
var state_72486__$1 = (function (){var statearr_72500 = state_72486;
(statearr_72500[(10)] = inst_72461);

return statearr_72500;
})();
var statearr_72501_73789 = state_72486__$1;
(statearr_72501_73789[(2)] = null);

(statearr_72501_73789[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72487 === (9))){
var state_72486__$1 = state_72486;
var statearr_72502_73790 = state_72486__$1;
(statearr_72502_73790[(2)] = null);

(statearr_72502_73790[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72487 === (5))){
var state_72486__$1 = state_72486;
if(cljs.core.truth_(close_QMARK_)){
var statearr_72503_73791 = state_72486__$1;
(statearr_72503_73791[(1)] = (8));

} else {
var statearr_72504_73792 = state_72486__$1;
(statearr_72504_73792[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72487 === (14))){
var inst_72466 = (state_72486[(11)]);
var inst_72464 = (state_72486[(8)]);
var inst_72464__$1 = (state_72486[(2)]);
var inst_72465 = (inst_72464__$1 == null);
var inst_72466__$1 = cljs.core.not(inst_72465);
var state_72486__$1 = (function (){var statearr_72505 = state_72486;
(statearr_72505[(11)] = inst_72466__$1);

(statearr_72505[(8)] = inst_72464__$1);

return statearr_72505;
})();
if(inst_72466__$1){
var statearr_72506_73793 = state_72486__$1;
(statearr_72506_73793[(1)] = (15));

} else {
var statearr_72507_73794 = state_72486__$1;
(statearr_72507_73794[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72487 === (16))){
var inst_72466 = (state_72486[(11)]);
var state_72486__$1 = state_72486;
var statearr_72508_73795 = state_72486__$1;
(statearr_72508_73795[(2)] = inst_72466);

(statearr_72508_73795[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72487 === (10))){
var inst_72458 = (state_72486[(2)]);
var state_72486__$1 = state_72486;
var statearr_72509_73797 = state_72486__$1;
(statearr_72509_73797[(2)] = inst_72458);

(statearr_72509_73797[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72487 === (18))){
var inst_72469 = (state_72486[(2)]);
var state_72486__$1 = state_72486;
var statearr_72510_73798 = state_72486__$1;
(statearr_72510_73798[(2)] = inst_72469);

(statearr_72510_73798[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72487 === (8))){
var inst_72455 = cljs.core.async.close_BANG_(to);
var state_72486__$1 = state_72486;
var statearr_72511_73800 = state_72486__$1;
(statearr_72511_73800[(2)] = inst_72455);

(statearr_72511_73800[(1)] = (10));


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
var statearr_72512 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_72512[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__);

(statearr_72512[(1)] = (1));

return statearr_72512;
});
var cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____1 = (function (state_72486){
while(true){
var ret_value__41904__auto__ = (function (){try{while(true){
var result__41905__auto__ = switch__41902__auto__(state_72486);
if(cljs.core.keyword_identical_QMARK_(result__41905__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__41905__auto__;
}
break;
}
}catch (e72513){var ex__41906__auto__ = e72513;
var statearr_72514_73801 = state_72486;
(statearr_72514_73801[(2)] = ex__41906__auto__);


if(cljs.core.seq((state_72486[(4)]))){
var statearr_72515_73802 = state_72486;
(statearr_72515_73802[(1)] = cljs.core.first((state_72486[(4)])));

} else {
throw ex__41906__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41904__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__73803 = state_72486;
state_72486 = G__73803;
continue;
} else {
return ret_value__41904__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__ = function(state_72486){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____1.call(this,state_72486);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__41903__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__41903__auto__;
})()
})();
var state__41997__auto__ = (function (){var statearr_72516 = f__41996__auto__();
(statearr_72516[(6)] = c__41995__auto__);

return statearr_72516;
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
var G__72518 = arguments.length;
switch (G__72518) {
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
var G__72520 = arguments.length;
switch (G__72520) {
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
var G__72522 = arguments.length;
switch (G__72522) {
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
var c__41995__auto___73811 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__41996__auto__ = (function (){var switch__41902__auto__ = (function (state_72548){
var state_val_72549 = (state_72548[(1)]);
if((state_val_72549 === (7))){
var inst_72544 = (state_72548[(2)]);
var state_72548__$1 = state_72548;
var statearr_72550_73815 = state_72548__$1;
(statearr_72550_73815[(2)] = inst_72544);

(statearr_72550_73815[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72549 === (1))){
var state_72548__$1 = state_72548;
var statearr_72551_73816 = state_72548__$1;
(statearr_72551_73816[(2)] = null);

(statearr_72551_73816[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72549 === (4))){
var inst_72525 = (state_72548[(7)]);
var inst_72525__$1 = (state_72548[(2)]);
var inst_72526 = (inst_72525__$1 == null);
var state_72548__$1 = (function (){var statearr_72552 = state_72548;
(statearr_72552[(7)] = inst_72525__$1);

return statearr_72552;
})();
if(cljs.core.truth_(inst_72526)){
var statearr_72553_73817 = state_72548__$1;
(statearr_72553_73817[(1)] = (5));

} else {
var statearr_72554_73818 = state_72548__$1;
(statearr_72554_73818[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72549 === (13))){
var state_72548__$1 = state_72548;
var statearr_72555_73819 = state_72548__$1;
(statearr_72555_73819[(2)] = null);

(statearr_72555_73819[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72549 === (6))){
var inst_72525 = (state_72548[(7)]);
var inst_72531 = (p.cljs$core$IFn$_invoke$arity$1 ? p.cljs$core$IFn$_invoke$arity$1(inst_72525) : p.call(null,inst_72525));
var state_72548__$1 = state_72548;
if(cljs.core.truth_(inst_72531)){
var statearr_72556_73820 = state_72548__$1;
(statearr_72556_73820[(1)] = (9));

} else {
var statearr_72557_73821 = state_72548__$1;
(statearr_72557_73821[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72549 === (3))){
var inst_72546 = (state_72548[(2)]);
var state_72548__$1 = state_72548;
return cljs.core.async.impl.ioc_helpers.return_chan(state_72548__$1,inst_72546);
} else {
if((state_val_72549 === (12))){
var state_72548__$1 = state_72548;
var statearr_72558_73825 = state_72548__$1;
(statearr_72558_73825[(2)] = null);

(statearr_72558_73825[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72549 === (2))){
var state_72548__$1 = state_72548;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_72548__$1,(4),ch);
} else {
if((state_val_72549 === (11))){
var inst_72525 = (state_72548[(7)]);
var inst_72535 = (state_72548[(2)]);
var state_72548__$1 = state_72548;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_72548__$1,(8),inst_72535,inst_72525);
} else {
if((state_val_72549 === (9))){
var state_72548__$1 = state_72548;
var statearr_72559_73826 = state_72548__$1;
(statearr_72559_73826[(2)] = tc);

(statearr_72559_73826[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72549 === (5))){
var inst_72528 = cljs.core.async.close_BANG_(tc);
var inst_72529 = cljs.core.async.close_BANG_(fc);
var state_72548__$1 = (function (){var statearr_72560 = state_72548;
(statearr_72560[(8)] = inst_72528);

return statearr_72560;
})();
var statearr_72561_73830 = state_72548__$1;
(statearr_72561_73830[(2)] = inst_72529);

(statearr_72561_73830[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72549 === (14))){
var inst_72542 = (state_72548[(2)]);
var state_72548__$1 = state_72548;
var statearr_72562_73831 = state_72548__$1;
(statearr_72562_73831[(2)] = inst_72542);

(statearr_72562_73831[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72549 === (10))){
var state_72548__$1 = state_72548;
var statearr_72563_73832 = state_72548__$1;
(statearr_72563_73832[(2)] = fc);

(statearr_72563_73832[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72549 === (8))){
var inst_72537 = (state_72548[(2)]);
var state_72548__$1 = state_72548;
if(cljs.core.truth_(inst_72537)){
var statearr_72564_73833 = state_72548__$1;
(statearr_72564_73833[(1)] = (12));

} else {
var statearr_72565_73834 = state_72548__$1;
(statearr_72565_73834[(1)] = (13));

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
var statearr_72566 = [null,null,null,null,null,null,null,null,null];
(statearr_72566[(0)] = cljs$core$async$state_machine__41903__auto__);

(statearr_72566[(1)] = (1));

return statearr_72566;
});
var cljs$core$async$state_machine__41903__auto____1 = (function (state_72548){
while(true){
var ret_value__41904__auto__ = (function (){try{while(true){
var result__41905__auto__ = switch__41902__auto__(state_72548);
if(cljs.core.keyword_identical_QMARK_(result__41905__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__41905__auto__;
}
break;
}
}catch (e72567){var ex__41906__auto__ = e72567;
var statearr_72568_73838 = state_72548;
(statearr_72568_73838[(2)] = ex__41906__auto__);


if(cljs.core.seq((state_72548[(4)]))){
var statearr_72569_73839 = state_72548;
(statearr_72569_73839[(1)] = cljs.core.first((state_72548[(4)])));

} else {
throw ex__41906__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41904__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__73840 = state_72548;
state_72548 = G__73840;
continue;
} else {
return ret_value__41904__auto__;
}
break;
}
});
cljs$core$async$state_machine__41903__auto__ = function(state_72548){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__41903__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__41903__auto____1.call(this,state_72548);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__41903__auto____0;
cljs$core$async$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__41903__auto____1;
return cljs$core$async$state_machine__41903__auto__;
})()
})();
var state__41997__auto__ = (function (){var statearr_72570 = f__41996__auto__();
(statearr_72570[(6)] = c__41995__auto___73811);

return statearr_72570;
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
var f__41996__auto__ = (function (){var switch__41902__auto__ = (function (state_72592){
var state_val_72593 = (state_72592[(1)]);
if((state_val_72593 === (7))){
var inst_72588 = (state_72592[(2)]);
var state_72592__$1 = state_72592;
var statearr_72594_73841 = state_72592__$1;
(statearr_72594_73841[(2)] = inst_72588);

(statearr_72594_73841[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72593 === (1))){
var inst_72571 = init;
var inst_72572 = inst_72571;
var state_72592__$1 = (function (){var statearr_72595 = state_72592;
(statearr_72595[(7)] = inst_72572);

return statearr_72595;
})();
var statearr_72596_73846 = state_72592__$1;
(statearr_72596_73846[(2)] = null);

(statearr_72596_73846[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72593 === (4))){
var inst_72575 = (state_72592[(8)]);
var inst_72575__$1 = (state_72592[(2)]);
var inst_72576 = (inst_72575__$1 == null);
var state_72592__$1 = (function (){var statearr_72597 = state_72592;
(statearr_72597[(8)] = inst_72575__$1);

return statearr_72597;
})();
if(cljs.core.truth_(inst_72576)){
var statearr_72598_73850 = state_72592__$1;
(statearr_72598_73850[(1)] = (5));

} else {
var statearr_72599_73851 = state_72592__$1;
(statearr_72599_73851[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72593 === (6))){
var inst_72579 = (state_72592[(9)]);
var inst_72575 = (state_72592[(8)]);
var inst_72572 = (state_72592[(7)]);
var inst_72579__$1 = (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(inst_72572,inst_72575) : f.call(null,inst_72572,inst_72575));
var inst_72580 = cljs.core.reduced_QMARK_(inst_72579__$1);
var state_72592__$1 = (function (){var statearr_72600 = state_72592;
(statearr_72600[(9)] = inst_72579__$1);

return statearr_72600;
})();
if(inst_72580){
var statearr_72601_73852 = state_72592__$1;
(statearr_72601_73852[(1)] = (8));

} else {
var statearr_72602_73853 = state_72592__$1;
(statearr_72602_73853[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72593 === (3))){
var inst_72590 = (state_72592[(2)]);
var state_72592__$1 = state_72592;
return cljs.core.async.impl.ioc_helpers.return_chan(state_72592__$1,inst_72590);
} else {
if((state_val_72593 === (2))){
var state_72592__$1 = state_72592;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_72592__$1,(4),ch);
} else {
if((state_val_72593 === (9))){
var inst_72579 = (state_72592[(9)]);
var inst_72572 = inst_72579;
var state_72592__$1 = (function (){var statearr_72603 = state_72592;
(statearr_72603[(7)] = inst_72572);

return statearr_72603;
})();
var statearr_72604_73854 = state_72592__$1;
(statearr_72604_73854[(2)] = null);

(statearr_72604_73854[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72593 === (5))){
var inst_72572 = (state_72592[(7)]);
var state_72592__$1 = state_72592;
var statearr_72605_73858 = state_72592__$1;
(statearr_72605_73858[(2)] = inst_72572);

(statearr_72605_73858[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72593 === (10))){
var inst_72586 = (state_72592[(2)]);
var state_72592__$1 = state_72592;
var statearr_72606_73859 = state_72592__$1;
(statearr_72606_73859[(2)] = inst_72586);

(statearr_72606_73859[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72593 === (8))){
var inst_72579 = (state_72592[(9)]);
var inst_72582 = cljs.core.deref(inst_72579);
var state_72592__$1 = state_72592;
var statearr_72607_73860 = state_72592__$1;
(statearr_72607_73860[(2)] = inst_72582);

(statearr_72607_73860[(1)] = (10));


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
var statearr_72608 = [null,null,null,null,null,null,null,null,null,null];
(statearr_72608[(0)] = cljs$core$async$reduce_$_state_machine__41903__auto__);

(statearr_72608[(1)] = (1));

return statearr_72608;
});
var cljs$core$async$reduce_$_state_machine__41903__auto____1 = (function (state_72592){
while(true){
var ret_value__41904__auto__ = (function (){try{while(true){
var result__41905__auto__ = switch__41902__auto__(state_72592);
if(cljs.core.keyword_identical_QMARK_(result__41905__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__41905__auto__;
}
break;
}
}catch (e72609){var ex__41906__auto__ = e72609;
var statearr_72610_73864 = state_72592;
(statearr_72610_73864[(2)] = ex__41906__auto__);


if(cljs.core.seq((state_72592[(4)]))){
var statearr_72611_73865 = state_72592;
(statearr_72611_73865[(1)] = cljs.core.first((state_72592[(4)])));

} else {
throw ex__41906__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41904__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__73866 = state_72592;
state_72592 = G__73866;
continue;
} else {
return ret_value__41904__auto__;
}
break;
}
});
cljs$core$async$reduce_$_state_machine__41903__auto__ = function(state_72592){
switch(arguments.length){
case 0:
return cljs$core$async$reduce_$_state_machine__41903__auto____0.call(this);
case 1:
return cljs$core$async$reduce_$_state_machine__41903__auto____1.call(this,state_72592);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$reduce_$_state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$reduce_$_state_machine__41903__auto____0;
cljs$core$async$reduce_$_state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$reduce_$_state_machine__41903__auto____1;
return cljs$core$async$reduce_$_state_machine__41903__auto__;
})()
})();
var state__41997__auto__ = (function (){var statearr_72612 = f__41996__auto__();
(statearr_72612[(6)] = c__41995__auto__);

return statearr_72612;
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
var f__41996__auto__ = (function (){var switch__41902__auto__ = (function (state_72618){
var state_val_72619 = (state_72618[(1)]);
if((state_val_72619 === (1))){
var inst_72613 = cljs.core.async.reduce(f__$1,init,ch);
var state_72618__$1 = state_72618;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_72618__$1,(2),inst_72613);
} else {
if((state_val_72619 === (2))){
var inst_72615 = (state_72618[(2)]);
var inst_72616 = (f__$1.cljs$core$IFn$_invoke$arity$1 ? f__$1.cljs$core$IFn$_invoke$arity$1(inst_72615) : f__$1.call(null,inst_72615));
var state_72618__$1 = state_72618;
return cljs.core.async.impl.ioc_helpers.return_chan(state_72618__$1,inst_72616);
} else {
return null;
}
}
});
return (function() {
var cljs$core$async$transduce_$_state_machine__41903__auto__ = null;
var cljs$core$async$transduce_$_state_machine__41903__auto____0 = (function (){
var statearr_72620 = [null,null,null,null,null,null,null];
(statearr_72620[(0)] = cljs$core$async$transduce_$_state_machine__41903__auto__);

(statearr_72620[(1)] = (1));

return statearr_72620;
});
var cljs$core$async$transduce_$_state_machine__41903__auto____1 = (function (state_72618){
while(true){
var ret_value__41904__auto__ = (function (){try{while(true){
var result__41905__auto__ = switch__41902__auto__(state_72618);
if(cljs.core.keyword_identical_QMARK_(result__41905__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__41905__auto__;
}
break;
}
}catch (e72621){var ex__41906__auto__ = e72621;
var statearr_72622_73870 = state_72618;
(statearr_72622_73870[(2)] = ex__41906__auto__);


if(cljs.core.seq((state_72618[(4)]))){
var statearr_72623_73871 = state_72618;
(statearr_72623_73871[(1)] = cljs.core.first((state_72618[(4)])));

} else {
throw ex__41906__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41904__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__73872 = state_72618;
state_72618 = G__73872;
continue;
} else {
return ret_value__41904__auto__;
}
break;
}
});
cljs$core$async$transduce_$_state_machine__41903__auto__ = function(state_72618){
switch(arguments.length){
case 0:
return cljs$core$async$transduce_$_state_machine__41903__auto____0.call(this);
case 1:
return cljs$core$async$transduce_$_state_machine__41903__auto____1.call(this,state_72618);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$transduce_$_state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$transduce_$_state_machine__41903__auto____0;
cljs$core$async$transduce_$_state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$transduce_$_state_machine__41903__auto____1;
return cljs$core$async$transduce_$_state_machine__41903__auto__;
})()
})();
var state__41997__auto__ = (function (){var statearr_72624 = f__41996__auto__();
(statearr_72624[(6)] = c__41995__auto__);

return statearr_72624;
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
var G__72626 = arguments.length;
switch (G__72626) {
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
var f__41996__auto__ = (function (){var switch__41902__auto__ = (function (state_72651){
var state_val_72652 = (state_72651[(1)]);
if((state_val_72652 === (7))){
var inst_72633 = (state_72651[(2)]);
var state_72651__$1 = state_72651;
var statearr_72653_73875 = state_72651__$1;
(statearr_72653_73875[(2)] = inst_72633);

(statearr_72653_73875[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72652 === (1))){
var inst_72627 = cljs.core.seq(coll);
var inst_72628 = inst_72627;
var state_72651__$1 = (function (){var statearr_72654 = state_72651;
(statearr_72654[(7)] = inst_72628);

return statearr_72654;
})();
var statearr_72655_73876 = state_72651__$1;
(statearr_72655_73876[(2)] = null);

(statearr_72655_73876[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72652 === (4))){
var inst_72628 = (state_72651[(7)]);
var inst_72631 = cljs.core.first(inst_72628);
var state_72651__$1 = state_72651;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_72651__$1,(7),ch,inst_72631);
} else {
if((state_val_72652 === (13))){
var inst_72645 = (state_72651[(2)]);
var state_72651__$1 = state_72651;
var statearr_72656_73877 = state_72651__$1;
(statearr_72656_73877[(2)] = inst_72645);

(statearr_72656_73877[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72652 === (6))){
var inst_72636 = (state_72651[(2)]);
var state_72651__$1 = state_72651;
if(cljs.core.truth_(inst_72636)){
var statearr_72657_73878 = state_72651__$1;
(statearr_72657_73878[(1)] = (8));

} else {
var statearr_72658_73879 = state_72651__$1;
(statearr_72658_73879[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72652 === (3))){
var inst_72649 = (state_72651[(2)]);
var state_72651__$1 = state_72651;
return cljs.core.async.impl.ioc_helpers.return_chan(state_72651__$1,inst_72649);
} else {
if((state_val_72652 === (12))){
var state_72651__$1 = state_72651;
var statearr_72659_73880 = state_72651__$1;
(statearr_72659_73880[(2)] = null);

(statearr_72659_73880[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72652 === (2))){
var inst_72628 = (state_72651[(7)]);
var state_72651__$1 = state_72651;
if(cljs.core.truth_(inst_72628)){
var statearr_72660_73881 = state_72651__$1;
(statearr_72660_73881[(1)] = (4));

} else {
var statearr_72661_73882 = state_72651__$1;
(statearr_72661_73882[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72652 === (11))){
var inst_72642 = cljs.core.async.close_BANG_(ch);
var state_72651__$1 = state_72651;
var statearr_72662_73883 = state_72651__$1;
(statearr_72662_73883[(2)] = inst_72642);

(statearr_72662_73883[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72652 === (9))){
var state_72651__$1 = state_72651;
if(cljs.core.truth_(close_QMARK_)){
var statearr_72663_73884 = state_72651__$1;
(statearr_72663_73884[(1)] = (11));

} else {
var statearr_72664_73885 = state_72651__$1;
(statearr_72664_73885[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72652 === (5))){
var inst_72628 = (state_72651[(7)]);
var state_72651__$1 = state_72651;
var statearr_72665_73886 = state_72651__$1;
(statearr_72665_73886[(2)] = inst_72628);

(statearr_72665_73886[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72652 === (10))){
var inst_72647 = (state_72651[(2)]);
var state_72651__$1 = state_72651;
var statearr_72666_73887 = state_72651__$1;
(statearr_72666_73887[(2)] = inst_72647);

(statearr_72666_73887[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72652 === (8))){
var inst_72628 = (state_72651[(7)]);
var inst_72638 = cljs.core.next(inst_72628);
var inst_72628__$1 = inst_72638;
var state_72651__$1 = (function (){var statearr_72667 = state_72651;
(statearr_72667[(7)] = inst_72628__$1);

return statearr_72667;
})();
var statearr_72668_73888 = state_72651__$1;
(statearr_72668_73888[(2)] = null);

(statearr_72668_73888[(1)] = (2));


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
var statearr_72669 = [null,null,null,null,null,null,null,null];
(statearr_72669[(0)] = cljs$core$async$state_machine__41903__auto__);

(statearr_72669[(1)] = (1));

return statearr_72669;
});
var cljs$core$async$state_machine__41903__auto____1 = (function (state_72651){
while(true){
var ret_value__41904__auto__ = (function (){try{while(true){
var result__41905__auto__ = switch__41902__auto__(state_72651);
if(cljs.core.keyword_identical_QMARK_(result__41905__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__41905__auto__;
}
break;
}
}catch (e72670){var ex__41906__auto__ = e72670;
var statearr_72671_73889 = state_72651;
(statearr_72671_73889[(2)] = ex__41906__auto__);


if(cljs.core.seq((state_72651[(4)]))){
var statearr_72672_73890 = state_72651;
(statearr_72672_73890[(1)] = cljs.core.first((state_72651[(4)])));

} else {
throw ex__41906__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41904__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__73891 = state_72651;
state_72651 = G__73891;
continue;
} else {
return ret_value__41904__auto__;
}
break;
}
});
cljs$core$async$state_machine__41903__auto__ = function(state_72651){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__41903__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__41903__auto____1.call(this,state_72651);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__41903__auto____0;
cljs$core$async$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__41903__auto____1;
return cljs$core$async$state_machine__41903__auto__;
})()
})();
var state__41997__auto__ = (function (){var statearr_72673 = f__41996__auto__();
(statearr_72673[(6)] = c__41995__auto__);

return statearr_72673;
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
var G__72675 = arguments.length;
switch (G__72675) {
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

var cljs$core$async$Mux$muxch_STAR_$dyn_73893 = (function (_){
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
return cljs$core$async$Mux$muxch_STAR_$dyn_73893(_);
}
});


/**
 * @interface
 */
cljs.core.async.Mult = function(){};

var cljs$core$async$Mult$tap_STAR_$dyn_73894 = (function (m,ch,close_QMARK_){
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
return cljs$core$async$Mult$tap_STAR_$dyn_73894(m,ch,close_QMARK_);
}
});

var cljs$core$async$Mult$untap_STAR_$dyn_73895 = (function (m,ch){
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
return cljs$core$async$Mult$untap_STAR_$dyn_73895(m,ch);
}
});

var cljs$core$async$Mult$untap_all_STAR_$dyn_73897 = (function (m){
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
return cljs$core$async$Mult$untap_all_STAR_$dyn_73897(m);
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
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async72676 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Mult}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async72676 = (function (ch,cs,meta72677){
this.ch = ch;
this.cs = cs;
this.meta72677 = meta72677;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async72676.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_72678,meta72677__$1){
var self__ = this;
var _72678__$1 = this;
return (new cljs.core.async.t_cljs$core$async72676(self__.ch,self__.cs,meta72677__$1));
}));

(cljs.core.async.t_cljs$core$async72676.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_72678){
var self__ = this;
var _72678__$1 = this;
return self__.meta72677;
}));

(cljs.core.async.t_cljs$core$async72676.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async72676.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
}));

(cljs.core.async.t_cljs$core$async72676.prototype.cljs$core$async$Mult$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async72676.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = (function (_,ch__$1,close_QMARK_){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cs,cljs.core.assoc,ch__$1,close_QMARK_);

return null;
}));

(cljs.core.async.t_cljs$core$async72676.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = (function (_,ch__$1){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.dissoc,ch__$1);

return null;
}));

(cljs.core.async.t_cljs$core$async72676.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return null;
}));

(cljs.core.async.t_cljs$core$async72676.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"meta72677","meta72677",-1905653220,null)], null);
}));

(cljs.core.async.t_cljs$core$async72676.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async72676.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async72676");

(cljs.core.async.t_cljs$core$async72676.cljs$lang$ctorPrWriter = (function (this__4491__auto__,writer__4492__auto__,opt__4493__auto__){
return cljs.core._write(writer__4492__auto__,"cljs.core.async/t_cljs$core$async72676");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async72676.
 */
cljs.core.async.__GT_t_cljs$core$async72676 = (function cljs$core$async$mult_$___GT_t_cljs$core$async72676(ch__$1,cs__$1,meta72677){
return (new cljs.core.async.t_cljs$core$async72676(ch__$1,cs__$1,meta72677));
});

}

return (new cljs.core.async.t_cljs$core$async72676(ch,cs,cljs.core.PersistentArrayMap.EMPTY));
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
var c__41995__auto___73904 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__41996__auto__ = (function (){var switch__41902__auto__ = (function (state_72811){
var state_val_72812 = (state_72811[(1)]);
if((state_val_72812 === (7))){
var inst_72807 = (state_72811[(2)]);
var state_72811__$1 = state_72811;
var statearr_72813_73906 = state_72811__$1;
(statearr_72813_73906[(2)] = inst_72807);

(statearr_72813_73906[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72812 === (20))){
var inst_72712 = (state_72811[(7)]);
var inst_72724 = cljs.core.first(inst_72712);
var inst_72725 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_72724,(0),null);
var inst_72726 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_72724,(1),null);
var state_72811__$1 = (function (){var statearr_72814 = state_72811;
(statearr_72814[(8)] = inst_72725);

return statearr_72814;
})();
if(cljs.core.truth_(inst_72726)){
var statearr_72815_73907 = state_72811__$1;
(statearr_72815_73907[(1)] = (22));

} else {
var statearr_72816_73908 = state_72811__$1;
(statearr_72816_73908[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72812 === (27))){
var inst_72756 = (state_72811[(9)]);
var inst_72754 = (state_72811[(10)]);
var inst_72681 = (state_72811[(11)]);
var inst_72761 = (state_72811[(12)]);
var inst_72761__$1 = cljs.core._nth(inst_72754,inst_72756);
var inst_72762 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3(inst_72761__$1,inst_72681,done);
var state_72811__$1 = (function (){var statearr_72817 = state_72811;
(statearr_72817[(12)] = inst_72761__$1);

return statearr_72817;
})();
if(cljs.core.truth_(inst_72762)){
var statearr_72818_73909 = state_72811__$1;
(statearr_72818_73909[(1)] = (30));

} else {
var statearr_72819_73910 = state_72811__$1;
(statearr_72819_73910[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72812 === (1))){
var state_72811__$1 = state_72811;
var statearr_72820_73911 = state_72811__$1;
(statearr_72820_73911[(2)] = null);

(statearr_72820_73911[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72812 === (24))){
var inst_72712 = (state_72811[(7)]);
var inst_72731 = (state_72811[(2)]);
var inst_72732 = cljs.core.next(inst_72712);
var inst_72690 = inst_72732;
var inst_72691 = null;
var inst_72692 = (0);
var inst_72693 = (0);
var state_72811__$1 = (function (){var statearr_72821 = state_72811;
(statearr_72821[(13)] = inst_72693);

(statearr_72821[(14)] = inst_72731);

(statearr_72821[(15)] = inst_72691);

(statearr_72821[(16)] = inst_72690);

(statearr_72821[(17)] = inst_72692);

return statearr_72821;
})();
var statearr_72822_73912 = state_72811__$1;
(statearr_72822_73912[(2)] = null);

(statearr_72822_73912[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72812 === (39))){
var state_72811__$1 = state_72811;
var statearr_72826_73913 = state_72811__$1;
(statearr_72826_73913[(2)] = null);

(statearr_72826_73913[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72812 === (4))){
var inst_72681 = (state_72811[(11)]);
var inst_72681__$1 = (state_72811[(2)]);
var inst_72682 = (inst_72681__$1 == null);
var state_72811__$1 = (function (){var statearr_72827 = state_72811;
(statearr_72827[(11)] = inst_72681__$1);

return statearr_72827;
})();
if(cljs.core.truth_(inst_72682)){
var statearr_72828_73914 = state_72811__$1;
(statearr_72828_73914[(1)] = (5));

} else {
var statearr_72829_73915 = state_72811__$1;
(statearr_72829_73915[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72812 === (15))){
var inst_72693 = (state_72811[(13)]);
var inst_72691 = (state_72811[(15)]);
var inst_72690 = (state_72811[(16)]);
var inst_72692 = (state_72811[(17)]);
var inst_72708 = (state_72811[(2)]);
var inst_72709 = (inst_72693 + (1));
var tmp72823 = inst_72691;
var tmp72824 = inst_72690;
var tmp72825 = inst_72692;
var inst_72690__$1 = tmp72824;
var inst_72691__$1 = tmp72823;
var inst_72692__$1 = tmp72825;
var inst_72693__$1 = inst_72709;
var state_72811__$1 = (function (){var statearr_72830 = state_72811;
(statearr_72830[(18)] = inst_72708);

(statearr_72830[(13)] = inst_72693__$1);

(statearr_72830[(15)] = inst_72691__$1);

(statearr_72830[(16)] = inst_72690__$1);

(statearr_72830[(17)] = inst_72692__$1);

return statearr_72830;
})();
var statearr_72831_73916 = state_72811__$1;
(statearr_72831_73916[(2)] = null);

(statearr_72831_73916[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72812 === (21))){
var inst_72735 = (state_72811[(2)]);
var state_72811__$1 = state_72811;
var statearr_72835_73918 = state_72811__$1;
(statearr_72835_73918[(2)] = inst_72735);

(statearr_72835_73918[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72812 === (31))){
var inst_72761 = (state_72811[(12)]);
var inst_72765 = m.cljs$core$async$Mult$untap_STAR_$arity$2(null,inst_72761);
var state_72811__$1 = state_72811;
var statearr_72836_73922 = state_72811__$1;
(statearr_72836_73922[(2)] = inst_72765);

(statearr_72836_73922[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72812 === (32))){
var inst_72756 = (state_72811[(9)]);
var inst_72755 = (state_72811[(19)]);
var inst_72754 = (state_72811[(10)]);
var inst_72753 = (state_72811[(20)]);
var inst_72767 = (state_72811[(2)]);
var inst_72768 = (inst_72756 + (1));
var tmp72832 = inst_72755;
var tmp72833 = inst_72754;
var tmp72834 = inst_72753;
var inst_72753__$1 = tmp72834;
var inst_72754__$1 = tmp72833;
var inst_72755__$1 = tmp72832;
var inst_72756__$1 = inst_72768;
var state_72811__$1 = (function (){var statearr_72837 = state_72811;
(statearr_72837[(9)] = inst_72756__$1);

(statearr_72837[(19)] = inst_72755__$1);

(statearr_72837[(10)] = inst_72754__$1);

(statearr_72837[(21)] = inst_72767);

(statearr_72837[(20)] = inst_72753__$1);

return statearr_72837;
})();
var statearr_72838_73923 = state_72811__$1;
(statearr_72838_73923[(2)] = null);

(statearr_72838_73923[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72812 === (40))){
var inst_72780 = (state_72811[(22)]);
var inst_72784 = m.cljs$core$async$Mult$untap_STAR_$arity$2(null,inst_72780);
var state_72811__$1 = state_72811;
var statearr_72839_73926 = state_72811__$1;
(statearr_72839_73926[(2)] = inst_72784);

(statearr_72839_73926[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72812 === (33))){
var inst_72771 = (state_72811[(23)]);
var inst_72773 = cljs.core.chunked_seq_QMARK_(inst_72771);
var state_72811__$1 = state_72811;
if(inst_72773){
var statearr_72840_73927 = state_72811__$1;
(statearr_72840_73927[(1)] = (36));

} else {
var statearr_72841_73930 = state_72811__$1;
(statearr_72841_73930[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72812 === (13))){
var inst_72702 = (state_72811[(24)]);
var inst_72705 = cljs.core.async.close_BANG_(inst_72702);
var state_72811__$1 = state_72811;
var statearr_72842_73931 = state_72811__$1;
(statearr_72842_73931[(2)] = inst_72705);

(statearr_72842_73931[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72812 === (22))){
var inst_72725 = (state_72811[(8)]);
var inst_72728 = cljs.core.async.close_BANG_(inst_72725);
var state_72811__$1 = state_72811;
var statearr_72843_73932 = state_72811__$1;
(statearr_72843_73932[(2)] = inst_72728);

(statearr_72843_73932[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72812 === (36))){
var inst_72771 = (state_72811[(23)]);
var inst_72775 = cljs.core.chunk_first(inst_72771);
var inst_72776 = cljs.core.chunk_rest(inst_72771);
var inst_72777 = cljs.core.count(inst_72775);
var inst_72753 = inst_72776;
var inst_72754 = inst_72775;
var inst_72755 = inst_72777;
var inst_72756 = (0);
var state_72811__$1 = (function (){var statearr_72844 = state_72811;
(statearr_72844[(9)] = inst_72756);

(statearr_72844[(19)] = inst_72755);

(statearr_72844[(10)] = inst_72754);

(statearr_72844[(20)] = inst_72753);

return statearr_72844;
})();
var statearr_72845_73933 = state_72811__$1;
(statearr_72845_73933[(2)] = null);

(statearr_72845_73933[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72812 === (41))){
var inst_72771 = (state_72811[(23)]);
var inst_72786 = (state_72811[(2)]);
var inst_72787 = cljs.core.next(inst_72771);
var inst_72753 = inst_72787;
var inst_72754 = null;
var inst_72755 = (0);
var inst_72756 = (0);
var state_72811__$1 = (function (){var statearr_72846 = state_72811;
(statearr_72846[(9)] = inst_72756);

(statearr_72846[(19)] = inst_72755);

(statearr_72846[(10)] = inst_72754);

(statearr_72846[(20)] = inst_72753);

(statearr_72846[(25)] = inst_72786);

return statearr_72846;
})();
var statearr_72847_73941 = state_72811__$1;
(statearr_72847_73941[(2)] = null);

(statearr_72847_73941[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72812 === (43))){
var state_72811__$1 = state_72811;
var statearr_72848_73942 = state_72811__$1;
(statearr_72848_73942[(2)] = null);

(statearr_72848_73942[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72812 === (29))){
var inst_72795 = (state_72811[(2)]);
var state_72811__$1 = state_72811;
var statearr_72849_73943 = state_72811__$1;
(statearr_72849_73943[(2)] = inst_72795);

(statearr_72849_73943[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72812 === (44))){
var inst_72804 = (state_72811[(2)]);
var state_72811__$1 = (function (){var statearr_72850 = state_72811;
(statearr_72850[(26)] = inst_72804);

return statearr_72850;
})();
var statearr_72851_73950 = state_72811__$1;
(statearr_72851_73950[(2)] = null);

(statearr_72851_73950[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72812 === (6))){
var inst_72745 = (state_72811[(27)]);
var inst_72744 = cljs.core.deref(cs);
var inst_72745__$1 = cljs.core.keys(inst_72744);
var inst_72746 = cljs.core.count(inst_72745__$1);
var inst_72747 = cljs.core.reset_BANG_(dctr,inst_72746);
var inst_72752 = cljs.core.seq(inst_72745__$1);
var inst_72753 = inst_72752;
var inst_72754 = null;
var inst_72755 = (0);
var inst_72756 = (0);
var state_72811__$1 = (function (){var statearr_72852 = state_72811;
(statearr_72852[(9)] = inst_72756);

(statearr_72852[(19)] = inst_72755);

(statearr_72852[(10)] = inst_72754);

(statearr_72852[(27)] = inst_72745__$1);

(statearr_72852[(28)] = inst_72747);

(statearr_72852[(20)] = inst_72753);

return statearr_72852;
})();
var statearr_72853_73951 = state_72811__$1;
(statearr_72853_73951[(2)] = null);

(statearr_72853_73951[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72812 === (28))){
var inst_72771 = (state_72811[(23)]);
var inst_72753 = (state_72811[(20)]);
var inst_72771__$1 = cljs.core.seq(inst_72753);
var state_72811__$1 = (function (){var statearr_72854 = state_72811;
(statearr_72854[(23)] = inst_72771__$1);

return statearr_72854;
})();
if(inst_72771__$1){
var statearr_72855_73952 = state_72811__$1;
(statearr_72855_73952[(1)] = (33));

} else {
var statearr_72856_73953 = state_72811__$1;
(statearr_72856_73953[(1)] = (34));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72812 === (25))){
var inst_72756 = (state_72811[(9)]);
var inst_72755 = (state_72811[(19)]);
var inst_72758 = (inst_72756 < inst_72755);
var inst_72759 = inst_72758;
var state_72811__$1 = state_72811;
if(cljs.core.truth_(inst_72759)){
var statearr_72857_73954 = state_72811__$1;
(statearr_72857_73954[(1)] = (27));

} else {
var statearr_72858_73955 = state_72811__$1;
(statearr_72858_73955[(1)] = (28));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72812 === (34))){
var state_72811__$1 = state_72811;
var statearr_72859_73956 = state_72811__$1;
(statearr_72859_73956[(2)] = null);

(statearr_72859_73956[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72812 === (17))){
var state_72811__$1 = state_72811;
var statearr_72860_73957 = state_72811__$1;
(statearr_72860_73957[(2)] = null);

(statearr_72860_73957[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72812 === (3))){
var inst_72809 = (state_72811[(2)]);
var state_72811__$1 = state_72811;
return cljs.core.async.impl.ioc_helpers.return_chan(state_72811__$1,inst_72809);
} else {
if((state_val_72812 === (12))){
var inst_72740 = (state_72811[(2)]);
var state_72811__$1 = state_72811;
var statearr_72861_73958 = state_72811__$1;
(statearr_72861_73958[(2)] = inst_72740);

(statearr_72861_73958[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72812 === (2))){
var state_72811__$1 = state_72811;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_72811__$1,(4),ch);
} else {
if((state_val_72812 === (23))){
var state_72811__$1 = state_72811;
var statearr_72862_73959 = state_72811__$1;
(statearr_72862_73959[(2)] = null);

(statearr_72862_73959[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72812 === (35))){
var inst_72793 = (state_72811[(2)]);
var state_72811__$1 = state_72811;
var statearr_72863_73960 = state_72811__$1;
(statearr_72863_73960[(2)] = inst_72793);

(statearr_72863_73960[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72812 === (19))){
var inst_72712 = (state_72811[(7)]);
var inst_72716 = cljs.core.chunk_first(inst_72712);
var inst_72717 = cljs.core.chunk_rest(inst_72712);
var inst_72718 = cljs.core.count(inst_72716);
var inst_72690 = inst_72717;
var inst_72691 = inst_72716;
var inst_72692 = inst_72718;
var inst_72693 = (0);
var state_72811__$1 = (function (){var statearr_72864 = state_72811;
(statearr_72864[(13)] = inst_72693);

(statearr_72864[(15)] = inst_72691);

(statearr_72864[(16)] = inst_72690);

(statearr_72864[(17)] = inst_72692);

return statearr_72864;
})();
var statearr_72865_73961 = state_72811__$1;
(statearr_72865_73961[(2)] = null);

(statearr_72865_73961[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72812 === (11))){
var inst_72690 = (state_72811[(16)]);
var inst_72712 = (state_72811[(7)]);
var inst_72712__$1 = cljs.core.seq(inst_72690);
var state_72811__$1 = (function (){var statearr_72866 = state_72811;
(statearr_72866[(7)] = inst_72712__$1);

return statearr_72866;
})();
if(inst_72712__$1){
var statearr_72867_73968 = state_72811__$1;
(statearr_72867_73968[(1)] = (16));

} else {
var statearr_72868_73969 = state_72811__$1;
(statearr_72868_73969[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72812 === (9))){
var inst_72742 = (state_72811[(2)]);
var state_72811__$1 = state_72811;
var statearr_72869_73970 = state_72811__$1;
(statearr_72869_73970[(2)] = inst_72742);

(statearr_72869_73970[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72812 === (5))){
var inst_72688 = cljs.core.deref(cs);
var inst_72689 = cljs.core.seq(inst_72688);
var inst_72690 = inst_72689;
var inst_72691 = null;
var inst_72692 = (0);
var inst_72693 = (0);
var state_72811__$1 = (function (){var statearr_72870 = state_72811;
(statearr_72870[(13)] = inst_72693);

(statearr_72870[(15)] = inst_72691);

(statearr_72870[(16)] = inst_72690);

(statearr_72870[(17)] = inst_72692);

return statearr_72870;
})();
var statearr_72871_73971 = state_72811__$1;
(statearr_72871_73971[(2)] = null);

(statearr_72871_73971[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72812 === (14))){
var state_72811__$1 = state_72811;
var statearr_72872_73972 = state_72811__$1;
(statearr_72872_73972[(2)] = null);

(statearr_72872_73972[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72812 === (45))){
var inst_72801 = (state_72811[(2)]);
var state_72811__$1 = state_72811;
var statearr_72873_73973 = state_72811__$1;
(statearr_72873_73973[(2)] = inst_72801);

(statearr_72873_73973[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72812 === (26))){
var inst_72745 = (state_72811[(27)]);
var inst_72797 = (state_72811[(2)]);
var inst_72798 = cljs.core.seq(inst_72745);
var state_72811__$1 = (function (){var statearr_72874 = state_72811;
(statearr_72874[(29)] = inst_72797);

return statearr_72874;
})();
if(inst_72798){
var statearr_72875_73974 = state_72811__$1;
(statearr_72875_73974[(1)] = (42));

} else {
var statearr_72876_73975 = state_72811__$1;
(statearr_72876_73975[(1)] = (43));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72812 === (16))){
var inst_72712 = (state_72811[(7)]);
var inst_72714 = cljs.core.chunked_seq_QMARK_(inst_72712);
var state_72811__$1 = state_72811;
if(inst_72714){
var statearr_72877_73976 = state_72811__$1;
(statearr_72877_73976[(1)] = (19));

} else {
var statearr_72878_73977 = state_72811__$1;
(statearr_72878_73977[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72812 === (38))){
var inst_72790 = (state_72811[(2)]);
var state_72811__$1 = state_72811;
var statearr_72879_73978 = state_72811__$1;
(statearr_72879_73978[(2)] = inst_72790);

(statearr_72879_73978[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72812 === (30))){
var state_72811__$1 = state_72811;
var statearr_72880_73979 = state_72811__$1;
(statearr_72880_73979[(2)] = null);

(statearr_72880_73979[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72812 === (10))){
var inst_72693 = (state_72811[(13)]);
var inst_72691 = (state_72811[(15)]);
var inst_72701 = cljs.core._nth(inst_72691,inst_72693);
var inst_72702 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_72701,(0),null);
var inst_72703 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_72701,(1),null);
var state_72811__$1 = (function (){var statearr_72881 = state_72811;
(statearr_72881[(24)] = inst_72702);

return statearr_72881;
})();
if(cljs.core.truth_(inst_72703)){
var statearr_72882_73980 = state_72811__$1;
(statearr_72882_73980[(1)] = (13));

} else {
var statearr_72883_73981 = state_72811__$1;
(statearr_72883_73981[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72812 === (18))){
var inst_72738 = (state_72811[(2)]);
var state_72811__$1 = state_72811;
var statearr_72884_73982 = state_72811__$1;
(statearr_72884_73982[(2)] = inst_72738);

(statearr_72884_73982[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72812 === (42))){
var state_72811__$1 = state_72811;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_72811__$1,(45),dchan);
} else {
if((state_val_72812 === (37))){
var inst_72681 = (state_72811[(11)]);
var inst_72771 = (state_72811[(23)]);
var inst_72780 = (state_72811[(22)]);
var inst_72780__$1 = cljs.core.first(inst_72771);
var inst_72781 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3(inst_72780__$1,inst_72681,done);
var state_72811__$1 = (function (){var statearr_72885 = state_72811;
(statearr_72885[(22)] = inst_72780__$1);

return statearr_72885;
})();
if(cljs.core.truth_(inst_72781)){
var statearr_72886_73983 = state_72811__$1;
(statearr_72886_73983[(1)] = (39));

} else {
var statearr_72887_73984 = state_72811__$1;
(statearr_72887_73984[(1)] = (40));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72812 === (8))){
var inst_72693 = (state_72811[(13)]);
var inst_72692 = (state_72811[(17)]);
var inst_72695 = (inst_72693 < inst_72692);
var inst_72696 = inst_72695;
var state_72811__$1 = state_72811;
if(cljs.core.truth_(inst_72696)){
var statearr_72888_73985 = state_72811__$1;
(statearr_72888_73985[(1)] = (10));

} else {
var statearr_72889_73986 = state_72811__$1;
(statearr_72889_73986[(1)] = (11));

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
var statearr_72890 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_72890[(0)] = cljs$core$async$mult_$_state_machine__41903__auto__);

(statearr_72890[(1)] = (1));

return statearr_72890;
});
var cljs$core$async$mult_$_state_machine__41903__auto____1 = (function (state_72811){
while(true){
var ret_value__41904__auto__ = (function (){try{while(true){
var result__41905__auto__ = switch__41902__auto__(state_72811);
if(cljs.core.keyword_identical_QMARK_(result__41905__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__41905__auto__;
}
break;
}
}catch (e72891){var ex__41906__auto__ = e72891;
var statearr_72892_73993 = state_72811;
(statearr_72892_73993[(2)] = ex__41906__auto__);


if(cljs.core.seq((state_72811[(4)]))){
var statearr_72893_73994 = state_72811;
(statearr_72893_73994[(1)] = cljs.core.first((state_72811[(4)])));

} else {
throw ex__41906__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41904__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__73995 = state_72811;
state_72811 = G__73995;
continue;
} else {
return ret_value__41904__auto__;
}
break;
}
});
cljs$core$async$mult_$_state_machine__41903__auto__ = function(state_72811){
switch(arguments.length){
case 0:
return cljs$core$async$mult_$_state_machine__41903__auto____0.call(this);
case 1:
return cljs$core$async$mult_$_state_machine__41903__auto____1.call(this,state_72811);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mult_$_state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mult_$_state_machine__41903__auto____0;
cljs$core$async$mult_$_state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mult_$_state_machine__41903__auto____1;
return cljs$core$async$mult_$_state_machine__41903__auto__;
})()
})();
var state__41997__auto__ = (function (){var statearr_72894 = f__41996__auto__();
(statearr_72894[(6)] = c__41995__auto___73904);

return statearr_72894;
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
var G__72896 = arguments.length;
switch (G__72896) {
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

var cljs$core$async$Mix$admix_STAR_$dyn_73997 = (function (m,ch){
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
return cljs$core$async$Mix$admix_STAR_$dyn_73997(m,ch);
}
});

var cljs$core$async$Mix$unmix_STAR_$dyn_73998 = (function (m,ch){
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
return cljs$core$async$Mix$unmix_STAR_$dyn_73998(m,ch);
}
});

var cljs$core$async$Mix$unmix_all_STAR_$dyn_73999 = (function (m){
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
return cljs$core$async$Mix$unmix_all_STAR_$dyn_73999(m);
}
});

var cljs$core$async$Mix$toggle_STAR_$dyn_74000 = (function (m,state_map){
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
return cljs$core$async$Mix$toggle_STAR_$dyn_74000(m,state_map);
}
});

var cljs$core$async$Mix$solo_mode_STAR_$dyn_74007 = (function (m,mode){
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
return cljs$core$async$Mix$solo_mode_STAR_$dyn_74007(m,mode);
}
});

cljs.core.async.ioc_alts_BANG_ = (function cljs$core$async$ioc_alts_BANG_(var_args){
var args__4870__auto__ = [];
var len__4864__auto___74008 = arguments.length;
var i__4865__auto___74009 = (0);
while(true){
if((i__4865__auto___74009 < len__4864__auto___74008)){
args__4870__auto__.push((arguments[i__4865__auto___74009]));

var G__74010 = (i__4865__auto___74009 + (1));
i__4865__auto___74009 = G__74010;
continue;
} else {
}
break;
}

var argseq__4871__auto__ = ((((3) < args__4870__auto__.length))?(new cljs.core.IndexedSeq(args__4870__auto__.slice((3)),(0),null)):null);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__4871__auto__);
});

(cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,cont_block,ports,p__72901){
var map__72902 = p__72901;
var map__72902__$1 = cljs.core.__destructure_map(map__72902);
var opts = map__72902__$1;
var statearr_72903_74011 = state;
(statearr_72903_74011[(1)] = cont_block);


var temp__5753__auto__ = cljs.core.async.do_alts((function (val){
var statearr_72904_74012 = state;
(statearr_72904_74012[(2)] = val);


return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state);
}),ports,opts);
if(cljs.core.truth_(temp__5753__auto__)){
var cb = temp__5753__auto__;
var statearr_72905_74013 = state;
(statearr_72905_74013[(2)] = cljs.core.deref(cb));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}));

(cljs.core.async.ioc_alts_BANG_.cljs$lang$maxFixedArity = (3));

/** @this {Function} */
(cljs.core.async.ioc_alts_BANG_.cljs$lang$applyTo = (function (seq72897){
var G__72898 = cljs.core.first(seq72897);
var seq72897__$1 = cljs.core.next(seq72897);
var G__72899 = cljs.core.first(seq72897__$1);
var seq72897__$2 = cljs.core.next(seq72897__$1);
var G__72900 = cljs.core.first(seq72897__$2);
var seq72897__$3 = cljs.core.next(seq72897__$2);
var self__4851__auto__ = this;
return self__4851__auto__.cljs$core$IFn$_invoke$arity$variadic(G__72898,G__72899,G__72900,seq72897__$3);
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
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async72906 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mix}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async72906 = (function (change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta72907){
this.change = change;
this.solo_mode = solo_mode;
this.pick = pick;
this.cs = cs;
this.calc_state = calc_state;
this.out = out;
this.changed = changed;
this.solo_modes = solo_modes;
this.attrs = attrs;
this.meta72907 = meta72907;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async72906.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_72908,meta72907__$1){
var self__ = this;
var _72908__$1 = this;
return (new cljs.core.async.t_cljs$core$async72906(self__.change,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta72907__$1));
}));

(cljs.core.async.t_cljs$core$async72906.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_72908){
var self__ = this;
var _72908__$1 = this;
return self__.meta72907;
}));

(cljs.core.async.t_cljs$core$async72906.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async72906.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.out;
}));

(cljs.core.async.t_cljs$core$async72906.prototype.cljs$core$async$Mix$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async72906.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async72906.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.dissoc,ch);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async72906.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async72906.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = (function (_,state_map){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core.merge_with,cljs.core.merge),state_map);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async72906.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = (function (_,mode){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_((self__.solo_modes.cljs$core$IFn$_invoke$arity$1 ? self__.solo_modes.cljs$core$IFn$_invoke$arity$1(mode) : self__.solo_modes.call(null,mode)))){
} else {
throw (new Error(["Assert failed: ",["mode must be one of: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.solo_modes)].join(''),"\n","(solo-modes mode)"].join('')));
}

cljs.core.reset_BANG_(self__.solo_mode,mode);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async72906.getBasis = (function (){
return new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"change","change",477485025,null),new cljs.core.Symbol(null,"solo-mode","solo-mode",2031788074,null),new cljs.core.Symbol(null,"pick","pick",1300068175,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"calc-state","calc-state",-349968968,null),new cljs.core.Symbol(null,"out","out",729986010,null),new cljs.core.Symbol(null,"changed","changed",-2083710852,null),new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"attrs","attrs",-450137186,null),new cljs.core.Symbol(null,"meta72907","meta72907",1680841872,null)], null);
}));

(cljs.core.async.t_cljs$core$async72906.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async72906.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async72906");

(cljs.core.async.t_cljs$core$async72906.cljs$lang$ctorPrWriter = (function (this__4491__auto__,writer__4492__auto__,opt__4493__auto__){
return cljs.core._write(writer__4492__auto__,"cljs.core.async/t_cljs$core$async72906");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async72906.
 */
cljs.core.async.__GT_t_cljs$core$async72906 = (function cljs$core$async$mix_$___GT_t_cljs$core$async72906(change__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta72907){
return (new cljs.core.async.t_cljs$core$async72906(change__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta72907));
});

}

return (new cljs.core.async.t_cljs$core$async72906(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__41995__auto___74014 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__41996__auto__ = (function (){var switch__41902__auto__ = (function (state_72976){
var state_val_72977 = (state_72976[(1)]);
if((state_val_72977 === (7))){
var inst_72936 = (state_72976[(2)]);
var state_72976__$1 = state_72976;
if(cljs.core.truth_(inst_72936)){
var statearr_72978_74016 = state_72976__$1;
(statearr_72978_74016[(1)] = (8));

} else {
var statearr_72979_74017 = state_72976__$1;
(statearr_72979_74017[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72977 === (20))){
var inst_72929 = (state_72976[(7)]);
var state_72976__$1 = state_72976;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_72976__$1,(23),out,inst_72929);
} else {
if((state_val_72977 === (1))){
var inst_72912 = calc_state();
var inst_72913 = cljs.core.__destructure_map(inst_72912);
var inst_72914 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_72913,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_72915 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_72913,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_72916 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_72913,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var inst_72917 = inst_72912;
var state_72976__$1 = (function (){var statearr_72980 = state_72976;
(statearr_72980[(8)] = inst_72917);

(statearr_72980[(9)] = inst_72915);

(statearr_72980[(10)] = inst_72914);

(statearr_72980[(11)] = inst_72916);

return statearr_72980;
})();
var statearr_72981_74022 = state_72976__$1;
(statearr_72981_74022[(2)] = null);

(statearr_72981_74022[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72977 === (24))){
var inst_72920 = (state_72976[(12)]);
var inst_72917 = inst_72920;
var state_72976__$1 = (function (){var statearr_72982 = state_72976;
(statearr_72982[(8)] = inst_72917);

return statearr_72982;
})();
var statearr_72983_74023 = state_72976__$1;
(statearr_72983_74023[(2)] = null);

(statearr_72983_74023[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72977 === (4))){
var inst_72931 = (state_72976[(13)]);
var inst_72929 = (state_72976[(7)]);
var inst_72928 = (state_72976[(2)]);
var inst_72929__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_72928,(0),null);
var inst_72930 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_72928,(1),null);
var inst_72931__$1 = (inst_72929__$1 == null);
var state_72976__$1 = (function (){var statearr_72984 = state_72976;
(statearr_72984[(13)] = inst_72931__$1);

(statearr_72984[(14)] = inst_72930);

(statearr_72984[(7)] = inst_72929__$1);

return statearr_72984;
})();
if(cljs.core.truth_(inst_72931__$1)){
var statearr_72985_74024 = state_72976__$1;
(statearr_72985_74024[(1)] = (5));

} else {
var statearr_72986_74025 = state_72976__$1;
(statearr_72986_74025[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72977 === (15))){
var inst_72921 = (state_72976[(15)]);
var inst_72950 = (state_72976[(16)]);
var inst_72950__$1 = cljs.core.empty_QMARK_(inst_72921);
var state_72976__$1 = (function (){var statearr_72987 = state_72976;
(statearr_72987[(16)] = inst_72950__$1);

return statearr_72987;
})();
if(inst_72950__$1){
var statearr_72988_74026 = state_72976__$1;
(statearr_72988_74026[(1)] = (17));

} else {
var statearr_72989_74027 = state_72976__$1;
(statearr_72989_74027[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72977 === (21))){
var inst_72920 = (state_72976[(12)]);
var inst_72917 = inst_72920;
var state_72976__$1 = (function (){var statearr_72990 = state_72976;
(statearr_72990[(8)] = inst_72917);

return statearr_72990;
})();
var statearr_72991_74028 = state_72976__$1;
(statearr_72991_74028[(2)] = null);

(statearr_72991_74028[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72977 === (13))){
var inst_72943 = (state_72976[(2)]);
var inst_72944 = calc_state();
var inst_72917 = inst_72944;
var state_72976__$1 = (function (){var statearr_72992 = state_72976;
(statearr_72992[(8)] = inst_72917);

(statearr_72992[(17)] = inst_72943);

return statearr_72992;
})();
var statearr_72993_74029 = state_72976__$1;
(statearr_72993_74029[(2)] = null);

(statearr_72993_74029[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72977 === (22))){
var inst_72970 = (state_72976[(2)]);
var state_72976__$1 = state_72976;
var statearr_72994_74030 = state_72976__$1;
(statearr_72994_74030[(2)] = inst_72970);

(statearr_72994_74030[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72977 === (6))){
var inst_72930 = (state_72976[(14)]);
var inst_72934 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_72930,change);
var state_72976__$1 = state_72976;
var statearr_72995_74031 = state_72976__$1;
(statearr_72995_74031[(2)] = inst_72934);

(statearr_72995_74031[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72977 === (25))){
var state_72976__$1 = state_72976;
var statearr_72996_74032 = state_72976__$1;
(statearr_72996_74032[(2)] = null);

(statearr_72996_74032[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72977 === (17))){
var inst_72930 = (state_72976[(14)]);
var inst_72922 = (state_72976[(18)]);
var inst_72952 = (inst_72922.cljs$core$IFn$_invoke$arity$1 ? inst_72922.cljs$core$IFn$_invoke$arity$1(inst_72930) : inst_72922.call(null,inst_72930));
var inst_72953 = cljs.core.not(inst_72952);
var state_72976__$1 = state_72976;
var statearr_72997_74033 = state_72976__$1;
(statearr_72997_74033[(2)] = inst_72953);

(statearr_72997_74033[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72977 === (3))){
var inst_72974 = (state_72976[(2)]);
var state_72976__$1 = state_72976;
return cljs.core.async.impl.ioc_helpers.return_chan(state_72976__$1,inst_72974);
} else {
if((state_val_72977 === (12))){
var state_72976__$1 = state_72976;
var statearr_72998_74034 = state_72976__$1;
(statearr_72998_74034[(2)] = null);

(statearr_72998_74034[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72977 === (2))){
var inst_72917 = (state_72976[(8)]);
var inst_72920 = (state_72976[(12)]);
var inst_72920__$1 = cljs.core.__destructure_map(inst_72917);
var inst_72921 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_72920__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_72922 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_72920__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_72923 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_72920__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var state_72976__$1 = (function (){var statearr_72999 = state_72976;
(statearr_72999[(15)] = inst_72921);

(statearr_72999[(12)] = inst_72920__$1);

(statearr_72999[(18)] = inst_72922);

return statearr_72999;
})();
return cljs.core.async.ioc_alts_BANG_(state_72976__$1,(4),inst_72923);
} else {
if((state_val_72977 === (23))){
var inst_72961 = (state_72976[(2)]);
var state_72976__$1 = state_72976;
if(cljs.core.truth_(inst_72961)){
var statearr_73000_74037 = state_72976__$1;
(statearr_73000_74037[(1)] = (24));

} else {
var statearr_73001_74038 = state_72976__$1;
(statearr_73001_74038[(1)] = (25));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72977 === (19))){
var inst_72956 = (state_72976[(2)]);
var state_72976__$1 = state_72976;
var statearr_73002_74039 = state_72976__$1;
(statearr_73002_74039[(2)] = inst_72956);

(statearr_73002_74039[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72977 === (11))){
var inst_72930 = (state_72976[(14)]);
var inst_72940 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(cs,cljs.core.dissoc,inst_72930);
var state_72976__$1 = state_72976;
var statearr_73003_74040 = state_72976__$1;
(statearr_73003_74040[(2)] = inst_72940);

(statearr_73003_74040[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72977 === (9))){
var inst_72921 = (state_72976[(15)]);
var inst_72930 = (state_72976[(14)]);
var inst_72947 = (state_72976[(19)]);
var inst_72947__$1 = (inst_72921.cljs$core$IFn$_invoke$arity$1 ? inst_72921.cljs$core$IFn$_invoke$arity$1(inst_72930) : inst_72921.call(null,inst_72930));
var state_72976__$1 = (function (){var statearr_73004 = state_72976;
(statearr_73004[(19)] = inst_72947__$1);

return statearr_73004;
})();
if(cljs.core.truth_(inst_72947__$1)){
var statearr_73005_74041 = state_72976__$1;
(statearr_73005_74041[(1)] = (14));

} else {
var statearr_73006_74042 = state_72976__$1;
(statearr_73006_74042[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72977 === (5))){
var inst_72931 = (state_72976[(13)]);
var state_72976__$1 = state_72976;
var statearr_73007_74043 = state_72976__$1;
(statearr_73007_74043[(2)] = inst_72931);

(statearr_73007_74043[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72977 === (14))){
var inst_72947 = (state_72976[(19)]);
var state_72976__$1 = state_72976;
var statearr_73008_74044 = state_72976__$1;
(statearr_73008_74044[(2)] = inst_72947);

(statearr_73008_74044[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72977 === (26))){
var inst_72966 = (state_72976[(2)]);
var state_72976__$1 = state_72976;
var statearr_73009_74046 = state_72976__$1;
(statearr_73009_74046[(2)] = inst_72966);

(statearr_73009_74046[(1)] = (22));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72977 === (16))){
var inst_72958 = (state_72976[(2)]);
var state_72976__$1 = state_72976;
if(cljs.core.truth_(inst_72958)){
var statearr_73010_74047 = state_72976__$1;
(statearr_73010_74047[(1)] = (20));

} else {
var statearr_73011_74048 = state_72976__$1;
(statearr_73011_74048[(1)] = (21));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72977 === (10))){
var inst_72972 = (state_72976[(2)]);
var state_72976__$1 = state_72976;
var statearr_73012_74050 = state_72976__$1;
(statearr_73012_74050[(2)] = inst_72972);

(statearr_73012_74050[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72977 === (18))){
var inst_72950 = (state_72976[(16)]);
var state_72976__$1 = state_72976;
var statearr_73013_74051 = state_72976__$1;
(statearr_73013_74051[(2)] = inst_72950);

(statearr_73013_74051[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_72977 === (8))){
var inst_72929 = (state_72976[(7)]);
var inst_72938 = (inst_72929 == null);
var state_72976__$1 = state_72976;
if(cljs.core.truth_(inst_72938)){
var statearr_73014_74052 = state_72976__$1;
(statearr_73014_74052[(1)] = (11));

} else {
var statearr_73015_74053 = state_72976__$1;
(statearr_73015_74053[(1)] = (12));

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
var statearr_73016 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_73016[(0)] = cljs$core$async$mix_$_state_machine__41903__auto__);

(statearr_73016[(1)] = (1));

return statearr_73016;
});
var cljs$core$async$mix_$_state_machine__41903__auto____1 = (function (state_72976){
while(true){
var ret_value__41904__auto__ = (function (){try{while(true){
var result__41905__auto__ = switch__41902__auto__(state_72976);
if(cljs.core.keyword_identical_QMARK_(result__41905__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__41905__auto__;
}
break;
}
}catch (e73017){var ex__41906__auto__ = e73017;
var statearr_73018_74054 = state_72976;
(statearr_73018_74054[(2)] = ex__41906__auto__);


if(cljs.core.seq((state_72976[(4)]))){
var statearr_73019_74055 = state_72976;
(statearr_73019_74055[(1)] = cljs.core.first((state_72976[(4)])));

} else {
throw ex__41906__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41904__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__74056 = state_72976;
state_72976 = G__74056;
continue;
} else {
return ret_value__41904__auto__;
}
break;
}
});
cljs$core$async$mix_$_state_machine__41903__auto__ = function(state_72976){
switch(arguments.length){
case 0:
return cljs$core$async$mix_$_state_machine__41903__auto____0.call(this);
case 1:
return cljs$core$async$mix_$_state_machine__41903__auto____1.call(this,state_72976);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mix_$_state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mix_$_state_machine__41903__auto____0;
cljs$core$async$mix_$_state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mix_$_state_machine__41903__auto____1;
return cljs$core$async$mix_$_state_machine__41903__auto__;
})()
})();
var state__41997__auto__ = (function (){var statearr_73020 = f__41996__auto__();
(statearr_73020[(6)] = c__41995__auto___74014);

return statearr_73020;
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

var cljs$core$async$Pub$sub_STAR_$dyn_74057 = (function (p,v,ch,close_QMARK_){
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
return cljs$core$async$Pub$sub_STAR_$dyn_74057(p,v,ch,close_QMARK_);
}
});

var cljs$core$async$Pub$unsub_STAR_$dyn_74058 = (function (p,v,ch){
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
return cljs$core$async$Pub$unsub_STAR_$dyn_74058(p,v,ch);
}
});

var cljs$core$async$Pub$unsub_all_STAR_$dyn_74060 = (function() {
var G__74061 = null;
var G__74061__1 = (function (p){
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
var G__74061__2 = (function (p,v){
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
G__74061 = function(p,v){
switch(arguments.length){
case 1:
return G__74061__1.call(this,p);
case 2:
return G__74061__2.call(this,p,v);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__74061.cljs$core$IFn$_invoke$arity$1 = G__74061__1;
G__74061.cljs$core$IFn$_invoke$arity$2 = G__74061__2;
return G__74061;
})()
;
cljs.core.async.unsub_all_STAR_ = (function cljs$core$async$unsub_all_STAR_(var_args){
var G__73022 = arguments.length;
switch (G__73022) {
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
return cljs$core$async$Pub$unsub_all_STAR_$dyn_74060(p);
}
}));

(cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (p,v){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$2 == null)))))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else {
return cljs$core$async$Pub$unsub_all_STAR_$dyn_74060(p,v);
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
var G__73025 = arguments.length;
switch (G__73025) {
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
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(mults,(function (p1__73023_SHARP_){
if(cljs.core.truth_((p1__73023_SHARP_.cljs$core$IFn$_invoke$arity$1 ? p1__73023_SHARP_.cljs$core$IFn$_invoke$arity$1(topic) : p1__73023_SHARP_.call(null,topic)))){
return p1__73023_SHARP_;
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__73023_SHARP_,topic,cljs.core.async.mult(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((buf_fn.cljs$core$IFn$_invoke$arity$1 ? buf_fn.cljs$core$IFn$_invoke$arity$1(topic) : buf_fn.call(null,topic)))));
}
})),topic);
}
});
var p = (function (){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async73026 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Pub}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async73026 = (function (ch,topic_fn,buf_fn,mults,ensure_mult,meta73027){
this.ch = ch;
this.topic_fn = topic_fn;
this.buf_fn = buf_fn;
this.mults = mults;
this.ensure_mult = ensure_mult;
this.meta73027 = meta73027;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async73026.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_73028,meta73027__$1){
var self__ = this;
var _73028__$1 = this;
return (new cljs.core.async.t_cljs$core$async73026(self__.ch,self__.topic_fn,self__.buf_fn,self__.mults,self__.ensure_mult,meta73027__$1));
}));

(cljs.core.async.t_cljs$core$async73026.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_73028){
var self__ = this;
var _73028__$1 = this;
return self__.meta73027;
}));

(cljs.core.async.t_cljs$core$async73026.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async73026.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
}));

(cljs.core.async.t_cljs$core$async73026.prototype.cljs$core$async$Pub$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async73026.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = (function (p,topic,ch__$1,close_QMARK_){
var self__ = this;
var p__$1 = this;
var m = (self__.ensure_mult.cljs$core$IFn$_invoke$arity$1 ? self__.ensure_mult.cljs$core$IFn$_invoke$arity$1(topic) : self__.ensure_mult.call(null,topic));
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3(m,ch__$1,close_QMARK_);
}));

(cljs.core.async.t_cljs$core$async73026.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = (function (p,topic,ch__$1){
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

(cljs.core.async.t_cljs$core$async73026.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.reset_BANG_(self__.mults,cljs.core.PersistentArrayMap.EMPTY);
}));

(cljs.core.async.t_cljs$core$async73026.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = (function (_,topic){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.mults,cljs.core.dissoc,topic);
}));

(cljs.core.async.t_cljs$core$async73026.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"topic-fn","topic-fn",-862449736,null),new cljs.core.Symbol(null,"buf-fn","buf-fn",-1200281591,null),new cljs.core.Symbol(null,"mults","mults",-461114485,null),new cljs.core.Symbol(null,"ensure-mult","ensure-mult",1796584816,null),new cljs.core.Symbol(null,"meta73027","meta73027",-210686485,null)], null);
}));

(cljs.core.async.t_cljs$core$async73026.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async73026.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async73026");

(cljs.core.async.t_cljs$core$async73026.cljs$lang$ctorPrWriter = (function (this__4491__auto__,writer__4492__auto__,opt__4493__auto__){
return cljs.core._write(writer__4492__auto__,"cljs.core.async/t_cljs$core$async73026");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async73026.
 */
cljs.core.async.__GT_t_cljs$core$async73026 = (function cljs$core$async$__GT_t_cljs$core$async73026(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta73027){
return (new cljs.core.async.t_cljs$core$async73026(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta73027));
});

}

return (new cljs.core.async.t_cljs$core$async73026(ch,topic_fn,buf_fn,mults,ensure_mult,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__41995__auto___74065 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__41996__auto__ = (function (){var switch__41902__auto__ = (function (state_73100){
var state_val_73101 = (state_73100[(1)]);
if((state_val_73101 === (7))){
var inst_73096 = (state_73100[(2)]);
var state_73100__$1 = state_73100;
var statearr_73102_74066 = state_73100__$1;
(statearr_73102_74066[(2)] = inst_73096);

(statearr_73102_74066[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73101 === (20))){
var state_73100__$1 = state_73100;
var statearr_73103_74067 = state_73100__$1;
(statearr_73103_74067[(2)] = null);

(statearr_73103_74067[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73101 === (1))){
var state_73100__$1 = state_73100;
var statearr_73104_74068 = state_73100__$1;
(statearr_73104_74068[(2)] = null);

(statearr_73104_74068[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73101 === (24))){
var inst_73079 = (state_73100[(7)]);
var inst_73088 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(mults,cljs.core.dissoc,inst_73079);
var state_73100__$1 = state_73100;
var statearr_73105_74069 = state_73100__$1;
(statearr_73105_74069[(2)] = inst_73088);

(statearr_73105_74069[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73101 === (4))){
var inst_73031 = (state_73100[(8)]);
var inst_73031__$1 = (state_73100[(2)]);
var inst_73032 = (inst_73031__$1 == null);
var state_73100__$1 = (function (){var statearr_73106 = state_73100;
(statearr_73106[(8)] = inst_73031__$1);

return statearr_73106;
})();
if(cljs.core.truth_(inst_73032)){
var statearr_73107_74071 = state_73100__$1;
(statearr_73107_74071[(1)] = (5));

} else {
var statearr_73108_74072 = state_73100__$1;
(statearr_73108_74072[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73101 === (15))){
var inst_73073 = (state_73100[(2)]);
var state_73100__$1 = state_73100;
var statearr_73109_74073 = state_73100__$1;
(statearr_73109_74073[(2)] = inst_73073);

(statearr_73109_74073[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73101 === (21))){
var inst_73093 = (state_73100[(2)]);
var state_73100__$1 = (function (){var statearr_73110 = state_73100;
(statearr_73110[(9)] = inst_73093);

return statearr_73110;
})();
var statearr_73111_74074 = state_73100__$1;
(statearr_73111_74074[(2)] = null);

(statearr_73111_74074[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73101 === (13))){
var inst_73055 = (state_73100[(10)]);
var inst_73057 = cljs.core.chunked_seq_QMARK_(inst_73055);
var state_73100__$1 = state_73100;
if(inst_73057){
var statearr_73112_74075 = state_73100__$1;
(statearr_73112_74075[(1)] = (16));

} else {
var statearr_73113_74076 = state_73100__$1;
(statearr_73113_74076[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73101 === (22))){
var inst_73085 = (state_73100[(2)]);
var state_73100__$1 = state_73100;
if(cljs.core.truth_(inst_73085)){
var statearr_73114_74081 = state_73100__$1;
(statearr_73114_74081[(1)] = (23));

} else {
var statearr_73115_74082 = state_73100__$1;
(statearr_73115_74082[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73101 === (6))){
var inst_73081 = (state_73100[(11)]);
var inst_73031 = (state_73100[(8)]);
var inst_73079 = (state_73100[(7)]);
var inst_73079__$1 = (topic_fn.cljs$core$IFn$_invoke$arity$1 ? topic_fn.cljs$core$IFn$_invoke$arity$1(inst_73031) : topic_fn.call(null,inst_73031));
var inst_73080 = cljs.core.deref(mults);
var inst_73081__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_73080,inst_73079__$1);
var state_73100__$1 = (function (){var statearr_73116 = state_73100;
(statearr_73116[(11)] = inst_73081__$1);

(statearr_73116[(7)] = inst_73079__$1);

return statearr_73116;
})();
if(cljs.core.truth_(inst_73081__$1)){
var statearr_73117_74083 = state_73100__$1;
(statearr_73117_74083[(1)] = (19));

} else {
var statearr_73118_74084 = state_73100__$1;
(statearr_73118_74084[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73101 === (25))){
var inst_73090 = (state_73100[(2)]);
var state_73100__$1 = state_73100;
var statearr_73119_74085 = state_73100__$1;
(statearr_73119_74085[(2)] = inst_73090);

(statearr_73119_74085[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73101 === (17))){
var inst_73055 = (state_73100[(10)]);
var inst_73064 = cljs.core.first(inst_73055);
var inst_73065 = cljs.core.async.muxch_STAR_(inst_73064);
var inst_73066 = cljs.core.async.close_BANG_(inst_73065);
var inst_73067 = cljs.core.next(inst_73055);
var inst_73041 = inst_73067;
var inst_73042 = null;
var inst_73043 = (0);
var inst_73044 = (0);
var state_73100__$1 = (function (){var statearr_73120 = state_73100;
(statearr_73120[(12)] = inst_73041);

(statearr_73120[(13)] = inst_73066);

(statearr_73120[(14)] = inst_73043);

(statearr_73120[(15)] = inst_73044);

(statearr_73120[(16)] = inst_73042);

return statearr_73120;
})();
var statearr_73121_74086 = state_73100__$1;
(statearr_73121_74086[(2)] = null);

(statearr_73121_74086[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73101 === (3))){
var inst_73098 = (state_73100[(2)]);
var state_73100__$1 = state_73100;
return cljs.core.async.impl.ioc_helpers.return_chan(state_73100__$1,inst_73098);
} else {
if((state_val_73101 === (12))){
var inst_73075 = (state_73100[(2)]);
var state_73100__$1 = state_73100;
var statearr_73122_74087 = state_73100__$1;
(statearr_73122_74087[(2)] = inst_73075);

(statearr_73122_74087[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73101 === (2))){
var state_73100__$1 = state_73100;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_73100__$1,(4),ch);
} else {
if((state_val_73101 === (23))){
var state_73100__$1 = state_73100;
var statearr_73123_74088 = state_73100__$1;
(statearr_73123_74088[(2)] = null);

(statearr_73123_74088[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73101 === (19))){
var inst_73081 = (state_73100[(11)]);
var inst_73031 = (state_73100[(8)]);
var inst_73083 = cljs.core.async.muxch_STAR_(inst_73081);
var state_73100__$1 = state_73100;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_73100__$1,(22),inst_73083,inst_73031);
} else {
if((state_val_73101 === (11))){
var inst_73041 = (state_73100[(12)]);
var inst_73055 = (state_73100[(10)]);
var inst_73055__$1 = cljs.core.seq(inst_73041);
var state_73100__$1 = (function (){var statearr_73124 = state_73100;
(statearr_73124[(10)] = inst_73055__$1);

return statearr_73124;
})();
if(inst_73055__$1){
var statearr_73125_74089 = state_73100__$1;
(statearr_73125_74089[(1)] = (13));

} else {
var statearr_73126_74090 = state_73100__$1;
(statearr_73126_74090[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73101 === (9))){
var inst_73077 = (state_73100[(2)]);
var state_73100__$1 = state_73100;
var statearr_73127_74091 = state_73100__$1;
(statearr_73127_74091[(2)] = inst_73077);

(statearr_73127_74091[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73101 === (5))){
var inst_73038 = cljs.core.deref(mults);
var inst_73039 = cljs.core.vals(inst_73038);
var inst_73040 = cljs.core.seq(inst_73039);
var inst_73041 = inst_73040;
var inst_73042 = null;
var inst_73043 = (0);
var inst_73044 = (0);
var state_73100__$1 = (function (){var statearr_73128 = state_73100;
(statearr_73128[(12)] = inst_73041);

(statearr_73128[(14)] = inst_73043);

(statearr_73128[(15)] = inst_73044);

(statearr_73128[(16)] = inst_73042);

return statearr_73128;
})();
var statearr_73129_74092 = state_73100__$1;
(statearr_73129_74092[(2)] = null);

(statearr_73129_74092[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73101 === (14))){
var state_73100__$1 = state_73100;
var statearr_73133_74093 = state_73100__$1;
(statearr_73133_74093[(2)] = null);

(statearr_73133_74093[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73101 === (16))){
var inst_73055 = (state_73100[(10)]);
var inst_73059 = cljs.core.chunk_first(inst_73055);
var inst_73060 = cljs.core.chunk_rest(inst_73055);
var inst_73061 = cljs.core.count(inst_73059);
var inst_73041 = inst_73060;
var inst_73042 = inst_73059;
var inst_73043 = inst_73061;
var inst_73044 = (0);
var state_73100__$1 = (function (){var statearr_73134 = state_73100;
(statearr_73134[(12)] = inst_73041);

(statearr_73134[(14)] = inst_73043);

(statearr_73134[(15)] = inst_73044);

(statearr_73134[(16)] = inst_73042);

return statearr_73134;
})();
var statearr_73135_74095 = state_73100__$1;
(statearr_73135_74095[(2)] = null);

(statearr_73135_74095[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73101 === (10))){
var inst_73041 = (state_73100[(12)]);
var inst_73043 = (state_73100[(14)]);
var inst_73044 = (state_73100[(15)]);
var inst_73042 = (state_73100[(16)]);
var inst_73049 = cljs.core._nth(inst_73042,inst_73044);
var inst_73050 = cljs.core.async.muxch_STAR_(inst_73049);
var inst_73051 = cljs.core.async.close_BANG_(inst_73050);
var inst_73052 = (inst_73044 + (1));
var tmp73130 = inst_73041;
var tmp73131 = inst_73043;
var tmp73132 = inst_73042;
var inst_73041__$1 = tmp73130;
var inst_73042__$1 = tmp73132;
var inst_73043__$1 = tmp73131;
var inst_73044__$1 = inst_73052;
var state_73100__$1 = (function (){var statearr_73136 = state_73100;
(statearr_73136[(17)] = inst_73051);

(statearr_73136[(12)] = inst_73041__$1);

(statearr_73136[(14)] = inst_73043__$1);

(statearr_73136[(15)] = inst_73044__$1);

(statearr_73136[(16)] = inst_73042__$1);

return statearr_73136;
})();
var statearr_73137_74102 = state_73100__$1;
(statearr_73137_74102[(2)] = null);

(statearr_73137_74102[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73101 === (18))){
var inst_73070 = (state_73100[(2)]);
var state_73100__$1 = state_73100;
var statearr_73138_74103 = state_73100__$1;
(statearr_73138_74103[(2)] = inst_73070);

(statearr_73138_74103[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73101 === (8))){
var inst_73043 = (state_73100[(14)]);
var inst_73044 = (state_73100[(15)]);
var inst_73046 = (inst_73044 < inst_73043);
var inst_73047 = inst_73046;
var state_73100__$1 = state_73100;
if(cljs.core.truth_(inst_73047)){
var statearr_73139_74104 = state_73100__$1;
(statearr_73139_74104[(1)] = (10));

} else {
var statearr_73140_74105 = state_73100__$1;
(statearr_73140_74105[(1)] = (11));

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
var statearr_73141 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_73141[(0)] = cljs$core$async$state_machine__41903__auto__);

(statearr_73141[(1)] = (1));

return statearr_73141;
});
var cljs$core$async$state_machine__41903__auto____1 = (function (state_73100){
while(true){
var ret_value__41904__auto__ = (function (){try{while(true){
var result__41905__auto__ = switch__41902__auto__(state_73100);
if(cljs.core.keyword_identical_QMARK_(result__41905__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__41905__auto__;
}
break;
}
}catch (e73142){var ex__41906__auto__ = e73142;
var statearr_73143_74109 = state_73100;
(statearr_73143_74109[(2)] = ex__41906__auto__);


if(cljs.core.seq((state_73100[(4)]))){
var statearr_73144_74110 = state_73100;
(statearr_73144_74110[(1)] = cljs.core.first((state_73100[(4)])));

} else {
throw ex__41906__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41904__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__74111 = state_73100;
state_73100 = G__74111;
continue;
} else {
return ret_value__41904__auto__;
}
break;
}
});
cljs$core$async$state_machine__41903__auto__ = function(state_73100){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__41903__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__41903__auto____1.call(this,state_73100);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__41903__auto____0;
cljs$core$async$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__41903__auto____1;
return cljs$core$async$state_machine__41903__auto__;
})()
})();
var state__41997__auto__ = (function (){var statearr_73145 = f__41996__auto__();
(statearr_73145[(6)] = c__41995__auto___74065);

return statearr_73145;
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
var G__73147 = arguments.length;
switch (G__73147) {
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
var G__73149 = arguments.length;
switch (G__73149) {
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
var G__73151 = arguments.length;
switch (G__73151) {
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
var c__41995__auto___74125 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__41996__auto__ = (function (){var switch__41902__auto__ = (function (state_73194){
var state_val_73195 = (state_73194[(1)]);
if((state_val_73195 === (7))){
var state_73194__$1 = state_73194;
var statearr_73196_74126 = state_73194__$1;
(statearr_73196_74126[(2)] = null);

(statearr_73196_74126[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73195 === (1))){
var state_73194__$1 = state_73194;
var statearr_73197_74127 = state_73194__$1;
(statearr_73197_74127[(2)] = null);

(statearr_73197_74127[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73195 === (4))){
var inst_73154 = (state_73194[(7)]);
var inst_73155 = (state_73194[(8)]);
var inst_73157 = (inst_73155 < inst_73154);
var state_73194__$1 = state_73194;
if(cljs.core.truth_(inst_73157)){
var statearr_73198_74128 = state_73194__$1;
(statearr_73198_74128[(1)] = (6));

} else {
var statearr_73199_74129 = state_73194__$1;
(statearr_73199_74129[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73195 === (15))){
var inst_73180 = (state_73194[(9)]);
var inst_73185 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f,inst_73180);
var state_73194__$1 = state_73194;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_73194__$1,(17),out,inst_73185);
} else {
if((state_val_73195 === (13))){
var inst_73180 = (state_73194[(9)]);
var inst_73180__$1 = (state_73194[(2)]);
var inst_73181 = cljs.core.some(cljs.core.nil_QMARK_,inst_73180__$1);
var state_73194__$1 = (function (){var statearr_73200 = state_73194;
(statearr_73200[(9)] = inst_73180__$1);

return statearr_73200;
})();
if(cljs.core.truth_(inst_73181)){
var statearr_73201_74130 = state_73194__$1;
(statearr_73201_74130[(1)] = (14));

} else {
var statearr_73202_74131 = state_73194__$1;
(statearr_73202_74131[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73195 === (6))){
var state_73194__$1 = state_73194;
var statearr_73203_74132 = state_73194__$1;
(statearr_73203_74132[(2)] = null);

(statearr_73203_74132[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73195 === (17))){
var inst_73187 = (state_73194[(2)]);
var state_73194__$1 = (function (){var statearr_73205 = state_73194;
(statearr_73205[(10)] = inst_73187);

return statearr_73205;
})();
var statearr_73206_74133 = state_73194__$1;
(statearr_73206_74133[(2)] = null);

(statearr_73206_74133[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73195 === (3))){
var inst_73192 = (state_73194[(2)]);
var state_73194__$1 = state_73194;
return cljs.core.async.impl.ioc_helpers.return_chan(state_73194__$1,inst_73192);
} else {
if((state_val_73195 === (12))){
var _ = (function (){var statearr_73207 = state_73194;
(statearr_73207[(4)] = cljs.core.rest((state_73194[(4)])));

return statearr_73207;
})();
var state_73194__$1 = state_73194;
var ex73204 = (state_73194__$1[(2)]);
var statearr_73208_74134 = state_73194__$1;
(statearr_73208_74134[(5)] = ex73204);


if((ex73204 instanceof Object)){
var statearr_73209_74135 = state_73194__$1;
(statearr_73209_74135[(1)] = (11));

(statearr_73209_74135[(5)] = null);

} else {
throw ex73204;

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73195 === (2))){
var inst_73153 = cljs.core.reset_BANG_(dctr,cnt);
var inst_73154 = cnt;
var inst_73155 = (0);
var state_73194__$1 = (function (){var statearr_73210 = state_73194;
(statearr_73210[(7)] = inst_73154);

(statearr_73210[(8)] = inst_73155);

(statearr_73210[(11)] = inst_73153);

return statearr_73210;
})();
var statearr_73211_74137 = state_73194__$1;
(statearr_73211_74137[(2)] = null);

(statearr_73211_74137[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73195 === (11))){
var inst_73159 = (state_73194[(2)]);
var inst_73160 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec);
var state_73194__$1 = (function (){var statearr_73212 = state_73194;
(statearr_73212[(12)] = inst_73159);

return statearr_73212;
})();
var statearr_73213_74139 = state_73194__$1;
(statearr_73213_74139[(2)] = inst_73160);

(statearr_73213_74139[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73195 === (9))){
var inst_73155 = (state_73194[(8)]);
var _ = (function (){var statearr_73214 = state_73194;
(statearr_73214[(4)] = cljs.core.cons((12),(state_73194[(4)])));

return statearr_73214;
})();
var inst_73166 = (chs__$1.cljs$core$IFn$_invoke$arity$1 ? chs__$1.cljs$core$IFn$_invoke$arity$1(inst_73155) : chs__$1.call(null,inst_73155));
var inst_73167 = (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(inst_73155) : done.call(null,inst_73155));
var inst_73168 = cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2(inst_73166,inst_73167);
var ___$1 = (function (){var statearr_73215 = state_73194;
(statearr_73215[(4)] = cljs.core.rest((state_73194[(4)])));

return statearr_73215;
})();
var state_73194__$1 = state_73194;
var statearr_73216_74140 = state_73194__$1;
(statearr_73216_74140[(2)] = inst_73168);

(statearr_73216_74140[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73195 === (5))){
var inst_73178 = (state_73194[(2)]);
var state_73194__$1 = (function (){var statearr_73217 = state_73194;
(statearr_73217[(13)] = inst_73178);

return statearr_73217;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_73194__$1,(13),dchan);
} else {
if((state_val_73195 === (14))){
var inst_73183 = cljs.core.async.close_BANG_(out);
var state_73194__$1 = state_73194;
var statearr_73218_74141 = state_73194__$1;
(statearr_73218_74141[(2)] = inst_73183);

(statearr_73218_74141[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73195 === (16))){
var inst_73190 = (state_73194[(2)]);
var state_73194__$1 = state_73194;
var statearr_73219_74142 = state_73194__$1;
(statearr_73219_74142[(2)] = inst_73190);

(statearr_73219_74142[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73195 === (10))){
var inst_73155 = (state_73194[(8)]);
var inst_73171 = (state_73194[(2)]);
var inst_73172 = (inst_73155 + (1));
var inst_73155__$1 = inst_73172;
var state_73194__$1 = (function (){var statearr_73220 = state_73194;
(statearr_73220[(8)] = inst_73155__$1);

(statearr_73220[(14)] = inst_73171);

return statearr_73220;
})();
var statearr_73221_74143 = state_73194__$1;
(statearr_73221_74143[(2)] = null);

(statearr_73221_74143[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73195 === (8))){
var inst_73176 = (state_73194[(2)]);
var state_73194__$1 = state_73194;
var statearr_73222_74144 = state_73194__$1;
(statearr_73222_74144[(2)] = inst_73176);

(statearr_73222_74144[(1)] = (5));


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
var statearr_73223 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_73223[(0)] = cljs$core$async$state_machine__41903__auto__);

(statearr_73223[(1)] = (1));

return statearr_73223;
});
var cljs$core$async$state_machine__41903__auto____1 = (function (state_73194){
while(true){
var ret_value__41904__auto__ = (function (){try{while(true){
var result__41905__auto__ = switch__41902__auto__(state_73194);
if(cljs.core.keyword_identical_QMARK_(result__41905__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__41905__auto__;
}
break;
}
}catch (e73224){var ex__41906__auto__ = e73224;
var statearr_73225_74145 = state_73194;
(statearr_73225_74145[(2)] = ex__41906__auto__);


if(cljs.core.seq((state_73194[(4)]))){
var statearr_73226_74146 = state_73194;
(statearr_73226_74146[(1)] = cljs.core.first((state_73194[(4)])));

} else {
throw ex__41906__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41904__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__74147 = state_73194;
state_73194 = G__74147;
continue;
} else {
return ret_value__41904__auto__;
}
break;
}
});
cljs$core$async$state_machine__41903__auto__ = function(state_73194){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__41903__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__41903__auto____1.call(this,state_73194);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__41903__auto____0;
cljs$core$async$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__41903__auto____1;
return cljs$core$async$state_machine__41903__auto__;
})()
})();
var state__41997__auto__ = (function (){var statearr_73227 = f__41996__auto__();
(statearr_73227[(6)] = c__41995__auto___74125);

return statearr_73227;
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
var G__73230 = arguments.length;
switch (G__73230) {
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
var c__41995__auto___74149 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__41996__auto__ = (function (){var switch__41902__auto__ = (function (state_73262){
var state_val_73263 = (state_73262[(1)]);
if((state_val_73263 === (7))){
var inst_73241 = (state_73262[(7)]);
var inst_73242 = (state_73262[(8)]);
var inst_73241__$1 = (state_73262[(2)]);
var inst_73242__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_73241__$1,(0),null);
var inst_73243 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_73241__$1,(1),null);
var inst_73244 = (inst_73242__$1 == null);
var state_73262__$1 = (function (){var statearr_73264 = state_73262;
(statearr_73264[(7)] = inst_73241__$1);

(statearr_73264[(8)] = inst_73242__$1);

(statearr_73264[(9)] = inst_73243);

return statearr_73264;
})();
if(cljs.core.truth_(inst_73244)){
var statearr_73265_74150 = state_73262__$1;
(statearr_73265_74150[(1)] = (8));

} else {
var statearr_73266_74151 = state_73262__$1;
(statearr_73266_74151[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73263 === (1))){
var inst_73231 = cljs.core.vec(chs);
var inst_73232 = inst_73231;
var state_73262__$1 = (function (){var statearr_73267 = state_73262;
(statearr_73267[(10)] = inst_73232);

return statearr_73267;
})();
var statearr_73268_74152 = state_73262__$1;
(statearr_73268_74152[(2)] = null);

(statearr_73268_74152[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73263 === (4))){
var inst_73232 = (state_73262[(10)]);
var state_73262__$1 = state_73262;
return cljs.core.async.ioc_alts_BANG_(state_73262__$1,(7),inst_73232);
} else {
if((state_val_73263 === (6))){
var inst_73258 = (state_73262[(2)]);
var state_73262__$1 = state_73262;
var statearr_73269_74153 = state_73262__$1;
(statearr_73269_74153[(2)] = inst_73258);

(statearr_73269_74153[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73263 === (3))){
var inst_73260 = (state_73262[(2)]);
var state_73262__$1 = state_73262;
return cljs.core.async.impl.ioc_helpers.return_chan(state_73262__$1,inst_73260);
} else {
if((state_val_73263 === (2))){
var inst_73232 = (state_73262[(10)]);
var inst_73234 = cljs.core.count(inst_73232);
var inst_73235 = (inst_73234 > (0));
var state_73262__$1 = state_73262;
if(cljs.core.truth_(inst_73235)){
var statearr_73271_74154 = state_73262__$1;
(statearr_73271_74154[(1)] = (4));

} else {
var statearr_73272_74155 = state_73262__$1;
(statearr_73272_74155[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73263 === (11))){
var inst_73232 = (state_73262[(10)]);
var inst_73251 = (state_73262[(2)]);
var tmp73270 = inst_73232;
var inst_73232__$1 = tmp73270;
var state_73262__$1 = (function (){var statearr_73273 = state_73262;
(statearr_73273[(11)] = inst_73251);

(statearr_73273[(10)] = inst_73232__$1);

return statearr_73273;
})();
var statearr_73274_74156 = state_73262__$1;
(statearr_73274_74156[(2)] = null);

(statearr_73274_74156[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73263 === (9))){
var inst_73242 = (state_73262[(8)]);
var state_73262__$1 = state_73262;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_73262__$1,(11),out,inst_73242);
} else {
if((state_val_73263 === (5))){
var inst_73256 = cljs.core.async.close_BANG_(out);
var state_73262__$1 = state_73262;
var statearr_73275_74157 = state_73262__$1;
(statearr_73275_74157[(2)] = inst_73256);

(statearr_73275_74157[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73263 === (10))){
var inst_73254 = (state_73262[(2)]);
var state_73262__$1 = state_73262;
var statearr_73276_74162 = state_73262__$1;
(statearr_73276_74162[(2)] = inst_73254);

(statearr_73276_74162[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73263 === (8))){
var inst_73241 = (state_73262[(7)]);
var inst_73242 = (state_73262[(8)]);
var inst_73243 = (state_73262[(9)]);
var inst_73232 = (state_73262[(10)]);
var inst_73246 = (function (){var cs = inst_73232;
var vec__73237 = inst_73241;
var v = inst_73242;
var c = inst_73243;
return (function (p1__73228_SHARP_){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(c,p1__73228_SHARP_);
});
})();
var inst_73247 = cljs.core.filterv(inst_73246,inst_73232);
var inst_73232__$1 = inst_73247;
var state_73262__$1 = (function (){var statearr_73277 = state_73262;
(statearr_73277[(10)] = inst_73232__$1);

return statearr_73277;
})();
var statearr_73278_74163 = state_73262__$1;
(statearr_73278_74163[(2)] = null);

(statearr_73278_74163[(1)] = (2));


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
var statearr_73279 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_73279[(0)] = cljs$core$async$state_machine__41903__auto__);

(statearr_73279[(1)] = (1));

return statearr_73279;
});
var cljs$core$async$state_machine__41903__auto____1 = (function (state_73262){
while(true){
var ret_value__41904__auto__ = (function (){try{while(true){
var result__41905__auto__ = switch__41902__auto__(state_73262);
if(cljs.core.keyword_identical_QMARK_(result__41905__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__41905__auto__;
}
break;
}
}catch (e73280){var ex__41906__auto__ = e73280;
var statearr_73281_74164 = state_73262;
(statearr_73281_74164[(2)] = ex__41906__auto__);


if(cljs.core.seq((state_73262[(4)]))){
var statearr_73282_74165 = state_73262;
(statearr_73282_74165[(1)] = cljs.core.first((state_73262[(4)])));

} else {
throw ex__41906__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41904__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__74166 = state_73262;
state_73262 = G__74166;
continue;
} else {
return ret_value__41904__auto__;
}
break;
}
});
cljs$core$async$state_machine__41903__auto__ = function(state_73262){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__41903__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__41903__auto____1.call(this,state_73262);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__41903__auto____0;
cljs$core$async$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__41903__auto____1;
return cljs$core$async$state_machine__41903__auto__;
})()
})();
var state__41997__auto__ = (function (){var statearr_73283 = f__41996__auto__();
(statearr_73283[(6)] = c__41995__auto___74149);

return statearr_73283;
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
var G__73285 = arguments.length;
switch (G__73285) {
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
var c__41995__auto___74168 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__41996__auto__ = (function (){var switch__41902__auto__ = (function (state_73309){
var state_val_73310 = (state_73309[(1)]);
if((state_val_73310 === (7))){
var inst_73291 = (state_73309[(7)]);
var inst_73291__$1 = (state_73309[(2)]);
var inst_73292 = (inst_73291__$1 == null);
var inst_73293 = cljs.core.not(inst_73292);
var state_73309__$1 = (function (){var statearr_73311 = state_73309;
(statearr_73311[(7)] = inst_73291__$1);

return statearr_73311;
})();
if(inst_73293){
var statearr_73312_74173 = state_73309__$1;
(statearr_73312_74173[(1)] = (8));

} else {
var statearr_73313_74175 = state_73309__$1;
(statearr_73313_74175[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73310 === (1))){
var inst_73286 = (0);
var state_73309__$1 = (function (){var statearr_73314 = state_73309;
(statearr_73314[(8)] = inst_73286);

return statearr_73314;
})();
var statearr_73315_74176 = state_73309__$1;
(statearr_73315_74176[(2)] = null);

(statearr_73315_74176[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73310 === (4))){
var state_73309__$1 = state_73309;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_73309__$1,(7),ch);
} else {
if((state_val_73310 === (6))){
var inst_73304 = (state_73309[(2)]);
var state_73309__$1 = state_73309;
var statearr_73316_74177 = state_73309__$1;
(statearr_73316_74177[(2)] = inst_73304);

(statearr_73316_74177[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73310 === (3))){
var inst_73306 = (state_73309[(2)]);
var inst_73307 = cljs.core.async.close_BANG_(out);
var state_73309__$1 = (function (){var statearr_73317 = state_73309;
(statearr_73317[(9)] = inst_73306);

return statearr_73317;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_73309__$1,inst_73307);
} else {
if((state_val_73310 === (2))){
var inst_73286 = (state_73309[(8)]);
var inst_73288 = (inst_73286 < n);
var state_73309__$1 = state_73309;
if(cljs.core.truth_(inst_73288)){
var statearr_73318_74178 = state_73309__$1;
(statearr_73318_74178[(1)] = (4));

} else {
var statearr_73319_74179 = state_73309__$1;
(statearr_73319_74179[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73310 === (11))){
var inst_73286 = (state_73309[(8)]);
var inst_73296 = (state_73309[(2)]);
var inst_73297 = (inst_73286 + (1));
var inst_73286__$1 = inst_73297;
var state_73309__$1 = (function (){var statearr_73320 = state_73309;
(statearr_73320[(8)] = inst_73286__$1);

(statearr_73320[(10)] = inst_73296);

return statearr_73320;
})();
var statearr_73321_74181 = state_73309__$1;
(statearr_73321_74181[(2)] = null);

(statearr_73321_74181[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73310 === (9))){
var state_73309__$1 = state_73309;
var statearr_73322_74182 = state_73309__$1;
(statearr_73322_74182[(2)] = null);

(statearr_73322_74182[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73310 === (5))){
var state_73309__$1 = state_73309;
var statearr_73323_74183 = state_73309__$1;
(statearr_73323_74183[(2)] = null);

(statearr_73323_74183[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73310 === (10))){
var inst_73301 = (state_73309[(2)]);
var state_73309__$1 = state_73309;
var statearr_73324_74184 = state_73309__$1;
(statearr_73324_74184[(2)] = inst_73301);

(statearr_73324_74184[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73310 === (8))){
var inst_73291 = (state_73309[(7)]);
var state_73309__$1 = state_73309;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_73309__$1,(11),out,inst_73291);
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
var statearr_73325 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_73325[(0)] = cljs$core$async$state_machine__41903__auto__);

(statearr_73325[(1)] = (1));

return statearr_73325;
});
var cljs$core$async$state_machine__41903__auto____1 = (function (state_73309){
while(true){
var ret_value__41904__auto__ = (function (){try{while(true){
var result__41905__auto__ = switch__41902__auto__(state_73309);
if(cljs.core.keyword_identical_QMARK_(result__41905__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__41905__auto__;
}
break;
}
}catch (e73326){var ex__41906__auto__ = e73326;
var statearr_73327_74189 = state_73309;
(statearr_73327_74189[(2)] = ex__41906__auto__);


if(cljs.core.seq((state_73309[(4)]))){
var statearr_73328_74190 = state_73309;
(statearr_73328_74190[(1)] = cljs.core.first((state_73309[(4)])));

} else {
throw ex__41906__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41904__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__74191 = state_73309;
state_73309 = G__74191;
continue;
} else {
return ret_value__41904__auto__;
}
break;
}
});
cljs$core$async$state_machine__41903__auto__ = function(state_73309){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__41903__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__41903__auto____1.call(this,state_73309);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__41903__auto____0;
cljs$core$async$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__41903__auto____1;
return cljs$core$async$state_machine__41903__auto__;
})()
})();
var state__41997__auto__ = (function (){var statearr_73329 = f__41996__auto__();
(statearr_73329[(6)] = c__41995__auto___74168);

return statearr_73329;
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
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async73331 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async73331 = (function (f,ch,meta73332){
this.f = f;
this.ch = ch;
this.meta73332 = meta73332;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async73331.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_73333,meta73332__$1){
var self__ = this;
var _73333__$1 = this;
return (new cljs.core.async.t_cljs$core$async73331(self__.f,self__.ch,meta73332__$1));
}));

(cljs.core.async.t_cljs$core$async73331.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_73333){
var self__ = this;
var _73333__$1 = this;
return self__.meta73332;
}));

(cljs.core.async.t_cljs$core$async73331.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async73331.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async73331.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async73331.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async73331.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
var ret = cljs.core.async.impl.protocols.take_BANG_(self__.ch,(function (){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async73334 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async73334 = (function (f,ch,meta73332,_,fn1,meta73335){
this.f = f;
this.ch = ch;
this.meta73332 = meta73332;
this._ = _;
this.fn1 = fn1;
this.meta73335 = meta73335;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async73334.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_73336,meta73335__$1){
var self__ = this;
var _73336__$1 = this;
return (new cljs.core.async.t_cljs$core$async73334(self__.f,self__.ch,self__.meta73332,self__._,self__.fn1,meta73335__$1));
}));

(cljs.core.async.t_cljs$core$async73334.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_73336){
var self__ = this;
var _73336__$1 = this;
return self__.meta73335;
}));

(cljs.core.async.t_cljs$core$async73334.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async73334.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
return cljs.core.async.impl.protocols.active_QMARK_(self__.fn1);
}));

(cljs.core.async.t_cljs$core$async73334.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async73334.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
var f1 = cljs.core.async.impl.protocols.commit(self__.fn1);
return (function (p1__73330_SHARP_){
var G__73337 = (((p1__73330_SHARP_ == null))?null:(self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(p1__73330_SHARP_) : self__.f.call(null,p1__73330_SHARP_)));
return (f1.cljs$core$IFn$_invoke$arity$1 ? f1.cljs$core$IFn$_invoke$arity$1(G__73337) : f1.call(null,G__73337));
});
}));

(cljs.core.async.t_cljs$core$async73334.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta73332","meta73332",-1697679925,null),cljs.core.with_meta(new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol("cljs.core.async","t_cljs$core$async73331","cljs.core.async/t_cljs$core$async73331",713005704,null)], null)),new cljs.core.Symbol(null,"fn1","fn1",895834444,null),new cljs.core.Symbol(null,"meta73335","meta73335",1337886752,null)], null);
}));

(cljs.core.async.t_cljs$core$async73334.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async73334.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async73334");

(cljs.core.async.t_cljs$core$async73334.cljs$lang$ctorPrWriter = (function (this__4491__auto__,writer__4492__auto__,opt__4493__auto__){
return cljs.core._write(writer__4492__auto__,"cljs.core.async/t_cljs$core$async73334");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async73334.
 */
cljs.core.async.__GT_t_cljs$core$async73334 = (function cljs$core$async$map_LT__$___GT_t_cljs$core$async73334(f__$1,ch__$1,meta73332__$1,___$2,fn1__$1,meta73335){
return (new cljs.core.async.t_cljs$core$async73334(f__$1,ch__$1,meta73332__$1,___$2,fn1__$1,meta73335));
});

}

return (new cljs.core.async.t_cljs$core$async73334(self__.f,self__.ch,self__.meta73332,___$1,fn1,cljs.core.PersistentArrayMap.EMPTY));
})()
);
if(cljs.core.truth_((function (){var and__4251__auto__ = ret;
if(cljs.core.truth_(and__4251__auto__)){
return (!((cljs.core.deref(ret) == null)));
} else {
return and__4251__auto__;
}
})())){
return cljs.core.async.impl.channels.box((function (){var G__73338 = cljs.core.deref(ret);
return (self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(G__73338) : self__.f.call(null,G__73338));
})());
} else {
return ret;
}
}));

(cljs.core.async.t_cljs$core$async73331.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async73331.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,val,fn1);
}));

(cljs.core.async.t_cljs$core$async73331.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta73332","meta73332",-1697679925,null)], null);
}));

(cljs.core.async.t_cljs$core$async73331.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async73331.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async73331");

(cljs.core.async.t_cljs$core$async73331.cljs$lang$ctorPrWriter = (function (this__4491__auto__,writer__4492__auto__,opt__4493__auto__){
return cljs.core._write(writer__4492__auto__,"cljs.core.async/t_cljs$core$async73331");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async73331.
 */
cljs.core.async.__GT_t_cljs$core$async73331 = (function cljs$core$async$map_LT__$___GT_t_cljs$core$async73331(f__$1,ch__$1,meta73332){
return (new cljs.core.async.t_cljs$core$async73331(f__$1,ch__$1,meta73332));
});

}

return (new cljs.core.async.t_cljs$core$async73331(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_GT_ = (function cljs$core$async$map_GT_(f,ch){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async73339 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async73339 = (function (f,ch,meta73340){
this.f = f;
this.ch = ch;
this.meta73340 = meta73340;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async73339.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_73341,meta73340__$1){
var self__ = this;
var _73341__$1 = this;
return (new cljs.core.async.t_cljs$core$async73339(self__.f,self__.ch,meta73340__$1));
}));

(cljs.core.async.t_cljs$core$async73339.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_73341){
var self__ = this;
var _73341__$1 = this;
return self__.meta73340;
}));

(cljs.core.async.t_cljs$core$async73339.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async73339.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async73339.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async73339.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_(self__.ch,fn1);
}));

(cljs.core.async.t_cljs$core$async73339.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async73339.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,(self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(val) : self__.f.call(null,val)),fn1);
}));

(cljs.core.async.t_cljs$core$async73339.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta73340","meta73340",-426488509,null)], null);
}));

(cljs.core.async.t_cljs$core$async73339.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async73339.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async73339");

(cljs.core.async.t_cljs$core$async73339.cljs$lang$ctorPrWriter = (function (this__4491__auto__,writer__4492__auto__,opt__4493__auto__){
return cljs.core._write(writer__4492__auto__,"cljs.core.async/t_cljs$core$async73339");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async73339.
 */
cljs.core.async.__GT_t_cljs$core$async73339 = (function cljs$core$async$map_GT__$___GT_t_cljs$core$async73339(f__$1,ch__$1,meta73340){
return (new cljs.core.async.t_cljs$core$async73339(f__$1,ch__$1,meta73340));
});

}

return (new cljs.core.async.t_cljs$core$async73339(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_GT_ = (function cljs$core$async$filter_GT_(p,ch){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async73342 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async73342 = (function (p,ch,meta73343){
this.p = p;
this.ch = ch;
this.meta73343 = meta73343;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async73342.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_73344,meta73343__$1){
var self__ = this;
var _73344__$1 = this;
return (new cljs.core.async.t_cljs$core$async73342(self__.p,self__.ch,meta73343__$1));
}));

(cljs.core.async.t_cljs$core$async73342.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_73344){
var self__ = this;
var _73344__$1 = this;
return self__.meta73343;
}));

(cljs.core.async.t_cljs$core$async73342.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async73342.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async73342.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async73342.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async73342.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_(self__.ch,fn1);
}));

(cljs.core.async.t_cljs$core$async73342.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async73342.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_((self__.p.cljs$core$IFn$_invoke$arity$1 ? self__.p.cljs$core$IFn$_invoke$arity$1(val) : self__.p.call(null,val)))){
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,val,fn1);
} else {
return cljs.core.async.impl.channels.box(cljs.core.not(cljs.core.async.impl.protocols.closed_QMARK_(self__.ch)));
}
}));

(cljs.core.async.t_cljs$core$async73342.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta73343","meta73343",1555978149,null)], null);
}));

(cljs.core.async.t_cljs$core$async73342.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async73342.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async73342");

(cljs.core.async.t_cljs$core$async73342.cljs$lang$ctorPrWriter = (function (this__4491__auto__,writer__4492__auto__,opt__4493__auto__){
return cljs.core._write(writer__4492__auto__,"cljs.core.async/t_cljs$core$async73342");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async73342.
 */
cljs.core.async.__GT_t_cljs$core$async73342 = (function cljs$core$async$filter_GT__$___GT_t_cljs$core$async73342(p__$1,ch__$1,meta73343){
return (new cljs.core.async.t_cljs$core$async73342(p__$1,ch__$1,meta73343));
});

}

return (new cljs.core.async.t_cljs$core$async73342(p,ch,cljs.core.PersistentArrayMap.EMPTY));
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
var G__73346 = arguments.length;
switch (G__73346) {
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
var c__41995__auto___74197 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__41996__auto__ = (function (){var switch__41902__auto__ = (function (state_73367){
var state_val_73368 = (state_73367[(1)]);
if((state_val_73368 === (7))){
var inst_73363 = (state_73367[(2)]);
var state_73367__$1 = state_73367;
var statearr_73369_74198 = state_73367__$1;
(statearr_73369_74198[(2)] = inst_73363);

(statearr_73369_74198[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73368 === (1))){
var state_73367__$1 = state_73367;
var statearr_73370_74199 = state_73367__$1;
(statearr_73370_74199[(2)] = null);

(statearr_73370_74199[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73368 === (4))){
var inst_73349 = (state_73367[(7)]);
var inst_73349__$1 = (state_73367[(2)]);
var inst_73350 = (inst_73349__$1 == null);
var state_73367__$1 = (function (){var statearr_73371 = state_73367;
(statearr_73371[(7)] = inst_73349__$1);

return statearr_73371;
})();
if(cljs.core.truth_(inst_73350)){
var statearr_73372_74200 = state_73367__$1;
(statearr_73372_74200[(1)] = (5));

} else {
var statearr_73373_74201 = state_73367__$1;
(statearr_73373_74201[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73368 === (6))){
var inst_73349 = (state_73367[(7)]);
var inst_73354 = (p.cljs$core$IFn$_invoke$arity$1 ? p.cljs$core$IFn$_invoke$arity$1(inst_73349) : p.call(null,inst_73349));
var state_73367__$1 = state_73367;
if(cljs.core.truth_(inst_73354)){
var statearr_73374_74202 = state_73367__$1;
(statearr_73374_74202[(1)] = (8));

} else {
var statearr_73375_74203 = state_73367__$1;
(statearr_73375_74203[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73368 === (3))){
var inst_73365 = (state_73367[(2)]);
var state_73367__$1 = state_73367;
return cljs.core.async.impl.ioc_helpers.return_chan(state_73367__$1,inst_73365);
} else {
if((state_val_73368 === (2))){
var state_73367__$1 = state_73367;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_73367__$1,(4),ch);
} else {
if((state_val_73368 === (11))){
var inst_73357 = (state_73367[(2)]);
var state_73367__$1 = state_73367;
var statearr_73376_74204 = state_73367__$1;
(statearr_73376_74204[(2)] = inst_73357);

(statearr_73376_74204[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73368 === (9))){
var state_73367__$1 = state_73367;
var statearr_73377_74205 = state_73367__$1;
(statearr_73377_74205[(2)] = null);

(statearr_73377_74205[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73368 === (5))){
var inst_73352 = cljs.core.async.close_BANG_(out);
var state_73367__$1 = state_73367;
var statearr_73378_74206 = state_73367__$1;
(statearr_73378_74206[(2)] = inst_73352);

(statearr_73378_74206[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73368 === (10))){
var inst_73360 = (state_73367[(2)]);
var state_73367__$1 = (function (){var statearr_73379 = state_73367;
(statearr_73379[(8)] = inst_73360);

return statearr_73379;
})();
var statearr_73380_74207 = state_73367__$1;
(statearr_73380_74207[(2)] = null);

(statearr_73380_74207[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73368 === (8))){
var inst_73349 = (state_73367[(7)]);
var state_73367__$1 = state_73367;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_73367__$1,(11),out,inst_73349);
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
var statearr_73381 = [null,null,null,null,null,null,null,null,null];
(statearr_73381[(0)] = cljs$core$async$state_machine__41903__auto__);

(statearr_73381[(1)] = (1));

return statearr_73381;
});
var cljs$core$async$state_machine__41903__auto____1 = (function (state_73367){
while(true){
var ret_value__41904__auto__ = (function (){try{while(true){
var result__41905__auto__ = switch__41902__auto__(state_73367);
if(cljs.core.keyword_identical_QMARK_(result__41905__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__41905__auto__;
}
break;
}
}catch (e73382){var ex__41906__auto__ = e73382;
var statearr_73383_74208 = state_73367;
(statearr_73383_74208[(2)] = ex__41906__auto__);


if(cljs.core.seq((state_73367[(4)]))){
var statearr_73384_74209 = state_73367;
(statearr_73384_74209[(1)] = cljs.core.first((state_73367[(4)])));

} else {
throw ex__41906__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41904__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__74210 = state_73367;
state_73367 = G__74210;
continue;
} else {
return ret_value__41904__auto__;
}
break;
}
});
cljs$core$async$state_machine__41903__auto__ = function(state_73367){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__41903__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__41903__auto____1.call(this,state_73367);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__41903__auto____0;
cljs$core$async$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__41903__auto____1;
return cljs$core$async$state_machine__41903__auto__;
})()
})();
var state__41997__auto__ = (function (){var statearr_73385 = f__41996__auto__();
(statearr_73385[(6)] = c__41995__auto___74197);

return statearr_73385;
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
var G__73387 = arguments.length;
switch (G__73387) {
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
var f__41996__auto__ = (function (){var switch__41902__auto__ = (function (state_73449){
var state_val_73450 = (state_73449[(1)]);
if((state_val_73450 === (7))){
var inst_73445 = (state_73449[(2)]);
var state_73449__$1 = state_73449;
var statearr_73451_74213 = state_73449__$1;
(statearr_73451_74213[(2)] = inst_73445);

(statearr_73451_74213[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73450 === (20))){
var inst_73415 = (state_73449[(7)]);
var inst_73426 = (state_73449[(2)]);
var inst_73427 = cljs.core.next(inst_73415);
var inst_73401 = inst_73427;
var inst_73402 = null;
var inst_73403 = (0);
var inst_73404 = (0);
var state_73449__$1 = (function (){var statearr_73452 = state_73449;
(statearr_73452[(8)] = inst_73401);

(statearr_73452[(9)] = inst_73426);

(statearr_73452[(10)] = inst_73404);

(statearr_73452[(11)] = inst_73403);

(statearr_73452[(12)] = inst_73402);

return statearr_73452;
})();
var statearr_73453_74214 = state_73449__$1;
(statearr_73453_74214[(2)] = null);

(statearr_73453_74214[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73450 === (1))){
var state_73449__$1 = state_73449;
var statearr_73454_74215 = state_73449__$1;
(statearr_73454_74215[(2)] = null);

(statearr_73454_74215[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73450 === (4))){
var inst_73390 = (state_73449[(13)]);
var inst_73390__$1 = (state_73449[(2)]);
var inst_73391 = (inst_73390__$1 == null);
var state_73449__$1 = (function (){var statearr_73455 = state_73449;
(statearr_73455[(13)] = inst_73390__$1);

return statearr_73455;
})();
if(cljs.core.truth_(inst_73391)){
var statearr_73456_74216 = state_73449__$1;
(statearr_73456_74216[(1)] = (5));

} else {
var statearr_73457_74217 = state_73449__$1;
(statearr_73457_74217[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73450 === (15))){
var state_73449__$1 = state_73449;
var statearr_73461_74218 = state_73449__$1;
(statearr_73461_74218[(2)] = null);

(statearr_73461_74218[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73450 === (21))){
var state_73449__$1 = state_73449;
var statearr_73462_74219 = state_73449__$1;
(statearr_73462_74219[(2)] = null);

(statearr_73462_74219[(1)] = (23));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73450 === (13))){
var inst_73401 = (state_73449[(8)]);
var inst_73404 = (state_73449[(10)]);
var inst_73403 = (state_73449[(11)]);
var inst_73402 = (state_73449[(12)]);
var inst_73411 = (state_73449[(2)]);
var inst_73412 = (inst_73404 + (1));
var tmp73458 = inst_73401;
var tmp73459 = inst_73403;
var tmp73460 = inst_73402;
var inst_73401__$1 = tmp73458;
var inst_73402__$1 = tmp73460;
var inst_73403__$1 = tmp73459;
var inst_73404__$1 = inst_73412;
var state_73449__$1 = (function (){var statearr_73463 = state_73449;
(statearr_73463[(8)] = inst_73401__$1);

(statearr_73463[(10)] = inst_73404__$1);

(statearr_73463[(14)] = inst_73411);

(statearr_73463[(11)] = inst_73403__$1);

(statearr_73463[(12)] = inst_73402__$1);

return statearr_73463;
})();
var statearr_73464_74224 = state_73449__$1;
(statearr_73464_74224[(2)] = null);

(statearr_73464_74224[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73450 === (22))){
var state_73449__$1 = state_73449;
var statearr_73465_74225 = state_73449__$1;
(statearr_73465_74225[(2)] = null);

(statearr_73465_74225[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73450 === (6))){
var inst_73390 = (state_73449[(13)]);
var inst_73399 = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(inst_73390) : f.call(null,inst_73390));
var inst_73400 = cljs.core.seq(inst_73399);
var inst_73401 = inst_73400;
var inst_73402 = null;
var inst_73403 = (0);
var inst_73404 = (0);
var state_73449__$1 = (function (){var statearr_73466 = state_73449;
(statearr_73466[(8)] = inst_73401);

(statearr_73466[(10)] = inst_73404);

(statearr_73466[(11)] = inst_73403);

(statearr_73466[(12)] = inst_73402);

return statearr_73466;
})();
var statearr_73467_74227 = state_73449__$1;
(statearr_73467_74227[(2)] = null);

(statearr_73467_74227[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73450 === (17))){
var inst_73415 = (state_73449[(7)]);
var inst_73419 = cljs.core.chunk_first(inst_73415);
var inst_73420 = cljs.core.chunk_rest(inst_73415);
var inst_73421 = cljs.core.count(inst_73419);
var inst_73401 = inst_73420;
var inst_73402 = inst_73419;
var inst_73403 = inst_73421;
var inst_73404 = (0);
var state_73449__$1 = (function (){var statearr_73468 = state_73449;
(statearr_73468[(8)] = inst_73401);

(statearr_73468[(10)] = inst_73404);

(statearr_73468[(11)] = inst_73403);

(statearr_73468[(12)] = inst_73402);

return statearr_73468;
})();
var statearr_73469_74228 = state_73449__$1;
(statearr_73469_74228[(2)] = null);

(statearr_73469_74228[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73450 === (3))){
var inst_73447 = (state_73449[(2)]);
var state_73449__$1 = state_73449;
return cljs.core.async.impl.ioc_helpers.return_chan(state_73449__$1,inst_73447);
} else {
if((state_val_73450 === (12))){
var inst_73435 = (state_73449[(2)]);
var state_73449__$1 = state_73449;
var statearr_73470_74229 = state_73449__$1;
(statearr_73470_74229[(2)] = inst_73435);

(statearr_73470_74229[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73450 === (2))){
var state_73449__$1 = state_73449;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_73449__$1,(4),in$);
} else {
if((state_val_73450 === (23))){
var inst_73443 = (state_73449[(2)]);
var state_73449__$1 = state_73449;
var statearr_73471_74231 = state_73449__$1;
(statearr_73471_74231[(2)] = inst_73443);

(statearr_73471_74231[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73450 === (19))){
var inst_73430 = (state_73449[(2)]);
var state_73449__$1 = state_73449;
var statearr_73472_74232 = state_73449__$1;
(statearr_73472_74232[(2)] = inst_73430);

(statearr_73472_74232[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73450 === (11))){
var inst_73415 = (state_73449[(7)]);
var inst_73401 = (state_73449[(8)]);
var inst_73415__$1 = cljs.core.seq(inst_73401);
var state_73449__$1 = (function (){var statearr_73473 = state_73449;
(statearr_73473[(7)] = inst_73415__$1);

return statearr_73473;
})();
if(inst_73415__$1){
var statearr_73474_74233 = state_73449__$1;
(statearr_73474_74233[(1)] = (14));

} else {
var statearr_73475_74234 = state_73449__$1;
(statearr_73475_74234[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73450 === (9))){
var inst_73437 = (state_73449[(2)]);
var inst_73438 = cljs.core.async.impl.protocols.closed_QMARK_(out);
var state_73449__$1 = (function (){var statearr_73476 = state_73449;
(statearr_73476[(15)] = inst_73437);

return statearr_73476;
})();
if(cljs.core.truth_(inst_73438)){
var statearr_73477_74235 = state_73449__$1;
(statearr_73477_74235[(1)] = (21));

} else {
var statearr_73478_74236 = state_73449__$1;
(statearr_73478_74236[(1)] = (22));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73450 === (5))){
var inst_73393 = cljs.core.async.close_BANG_(out);
var state_73449__$1 = state_73449;
var statearr_73479_74238 = state_73449__$1;
(statearr_73479_74238[(2)] = inst_73393);

(statearr_73479_74238[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73450 === (14))){
var inst_73415 = (state_73449[(7)]);
var inst_73417 = cljs.core.chunked_seq_QMARK_(inst_73415);
var state_73449__$1 = state_73449;
if(inst_73417){
var statearr_73480_74242 = state_73449__$1;
(statearr_73480_74242[(1)] = (17));

} else {
var statearr_73481_74243 = state_73449__$1;
(statearr_73481_74243[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73450 === (16))){
var inst_73433 = (state_73449[(2)]);
var state_73449__$1 = state_73449;
var statearr_73482_74244 = state_73449__$1;
(statearr_73482_74244[(2)] = inst_73433);

(statearr_73482_74244[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73450 === (10))){
var inst_73404 = (state_73449[(10)]);
var inst_73402 = (state_73449[(12)]);
var inst_73409 = cljs.core._nth(inst_73402,inst_73404);
var state_73449__$1 = state_73449;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_73449__$1,(13),out,inst_73409);
} else {
if((state_val_73450 === (18))){
var inst_73415 = (state_73449[(7)]);
var inst_73424 = cljs.core.first(inst_73415);
var state_73449__$1 = state_73449;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_73449__$1,(20),out,inst_73424);
} else {
if((state_val_73450 === (8))){
var inst_73404 = (state_73449[(10)]);
var inst_73403 = (state_73449[(11)]);
var inst_73406 = (inst_73404 < inst_73403);
var inst_73407 = inst_73406;
var state_73449__$1 = state_73449;
if(cljs.core.truth_(inst_73407)){
var statearr_73483_74245 = state_73449__$1;
(statearr_73483_74245[(1)] = (10));

} else {
var statearr_73484_74246 = state_73449__$1;
(statearr_73484_74246[(1)] = (11));

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
var statearr_73485 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_73485[(0)] = cljs$core$async$mapcat_STAR__$_state_machine__41903__auto__);

(statearr_73485[(1)] = (1));

return statearr_73485;
});
var cljs$core$async$mapcat_STAR__$_state_machine__41903__auto____1 = (function (state_73449){
while(true){
var ret_value__41904__auto__ = (function (){try{while(true){
var result__41905__auto__ = switch__41902__auto__(state_73449);
if(cljs.core.keyword_identical_QMARK_(result__41905__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__41905__auto__;
}
break;
}
}catch (e73486){var ex__41906__auto__ = e73486;
var statearr_73487_74247 = state_73449;
(statearr_73487_74247[(2)] = ex__41906__auto__);


if(cljs.core.seq((state_73449[(4)]))){
var statearr_73488_74248 = state_73449;
(statearr_73488_74248[(1)] = cljs.core.first((state_73449[(4)])));

} else {
throw ex__41906__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41904__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__74249 = state_73449;
state_73449 = G__74249;
continue;
} else {
return ret_value__41904__auto__;
}
break;
}
});
cljs$core$async$mapcat_STAR__$_state_machine__41903__auto__ = function(state_73449){
switch(arguments.length){
case 0:
return cljs$core$async$mapcat_STAR__$_state_machine__41903__auto____0.call(this);
case 1:
return cljs$core$async$mapcat_STAR__$_state_machine__41903__auto____1.call(this,state_73449);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mapcat_STAR__$_state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mapcat_STAR__$_state_machine__41903__auto____0;
cljs$core$async$mapcat_STAR__$_state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mapcat_STAR__$_state_machine__41903__auto____1;
return cljs$core$async$mapcat_STAR__$_state_machine__41903__auto__;
})()
})();
var state__41997__auto__ = (function (){var statearr_73489 = f__41996__auto__();
(statearr_73489[(6)] = c__41995__auto__);

return statearr_73489;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__41997__auto__);
}));

return c__41995__auto__;
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_LT_ = (function cljs$core$async$mapcat_LT_(var_args){
var G__73491 = arguments.length;
switch (G__73491) {
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
var G__73493 = arguments.length;
switch (G__73493) {
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
var G__73495 = arguments.length;
switch (G__73495) {
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
var c__41995__auto___74253 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__41996__auto__ = (function (){var switch__41902__auto__ = (function (state_73519){
var state_val_73520 = (state_73519[(1)]);
if((state_val_73520 === (7))){
var inst_73514 = (state_73519[(2)]);
var state_73519__$1 = state_73519;
var statearr_73521_74254 = state_73519__$1;
(statearr_73521_74254[(2)] = inst_73514);

(statearr_73521_74254[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73520 === (1))){
var inst_73496 = null;
var state_73519__$1 = (function (){var statearr_73522 = state_73519;
(statearr_73522[(7)] = inst_73496);

return statearr_73522;
})();
var statearr_73523_74255 = state_73519__$1;
(statearr_73523_74255[(2)] = null);

(statearr_73523_74255[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73520 === (4))){
var inst_73499 = (state_73519[(8)]);
var inst_73499__$1 = (state_73519[(2)]);
var inst_73500 = (inst_73499__$1 == null);
var inst_73501 = cljs.core.not(inst_73500);
var state_73519__$1 = (function (){var statearr_73524 = state_73519;
(statearr_73524[(8)] = inst_73499__$1);

return statearr_73524;
})();
if(inst_73501){
var statearr_73525_74256 = state_73519__$1;
(statearr_73525_74256[(1)] = (5));

} else {
var statearr_73526_74257 = state_73519__$1;
(statearr_73526_74257[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73520 === (6))){
var state_73519__$1 = state_73519;
var statearr_73527_74258 = state_73519__$1;
(statearr_73527_74258[(2)] = null);

(statearr_73527_74258[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73520 === (3))){
var inst_73516 = (state_73519[(2)]);
var inst_73517 = cljs.core.async.close_BANG_(out);
var state_73519__$1 = (function (){var statearr_73528 = state_73519;
(statearr_73528[(9)] = inst_73516);

return statearr_73528;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_73519__$1,inst_73517);
} else {
if((state_val_73520 === (2))){
var state_73519__$1 = state_73519;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_73519__$1,(4),ch);
} else {
if((state_val_73520 === (11))){
var inst_73499 = (state_73519[(8)]);
var inst_73508 = (state_73519[(2)]);
var inst_73496 = inst_73499;
var state_73519__$1 = (function (){var statearr_73529 = state_73519;
(statearr_73529[(7)] = inst_73496);

(statearr_73529[(10)] = inst_73508);

return statearr_73529;
})();
var statearr_73530_74259 = state_73519__$1;
(statearr_73530_74259[(2)] = null);

(statearr_73530_74259[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73520 === (9))){
var inst_73499 = (state_73519[(8)]);
var state_73519__$1 = state_73519;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_73519__$1,(11),out,inst_73499);
} else {
if((state_val_73520 === (5))){
var inst_73499 = (state_73519[(8)]);
var inst_73496 = (state_73519[(7)]);
var inst_73503 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_73499,inst_73496);
var state_73519__$1 = state_73519;
if(inst_73503){
var statearr_73532_74260 = state_73519__$1;
(statearr_73532_74260[(1)] = (8));

} else {
var statearr_73533_74261 = state_73519__$1;
(statearr_73533_74261[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73520 === (10))){
var inst_73511 = (state_73519[(2)]);
var state_73519__$1 = state_73519;
var statearr_73534_74262 = state_73519__$1;
(statearr_73534_74262[(2)] = inst_73511);

(statearr_73534_74262[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73520 === (8))){
var inst_73496 = (state_73519[(7)]);
var tmp73531 = inst_73496;
var inst_73496__$1 = tmp73531;
var state_73519__$1 = (function (){var statearr_73535 = state_73519;
(statearr_73535[(7)] = inst_73496__$1);

return statearr_73535;
})();
var statearr_73536_74264 = state_73519__$1;
(statearr_73536_74264[(2)] = null);

(statearr_73536_74264[(1)] = (2));


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
var statearr_73537 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_73537[(0)] = cljs$core$async$state_machine__41903__auto__);

(statearr_73537[(1)] = (1));

return statearr_73537;
});
var cljs$core$async$state_machine__41903__auto____1 = (function (state_73519){
while(true){
var ret_value__41904__auto__ = (function (){try{while(true){
var result__41905__auto__ = switch__41902__auto__(state_73519);
if(cljs.core.keyword_identical_QMARK_(result__41905__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__41905__auto__;
}
break;
}
}catch (e73538){var ex__41906__auto__ = e73538;
var statearr_73539_74265 = state_73519;
(statearr_73539_74265[(2)] = ex__41906__auto__);


if(cljs.core.seq((state_73519[(4)]))){
var statearr_73540_74266 = state_73519;
(statearr_73540_74266[(1)] = cljs.core.first((state_73519[(4)])));

} else {
throw ex__41906__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41904__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__74270 = state_73519;
state_73519 = G__74270;
continue;
} else {
return ret_value__41904__auto__;
}
break;
}
});
cljs$core$async$state_machine__41903__auto__ = function(state_73519){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__41903__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__41903__auto____1.call(this,state_73519);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__41903__auto____0;
cljs$core$async$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__41903__auto____1;
return cljs$core$async$state_machine__41903__auto__;
})()
})();
var state__41997__auto__ = (function (){var statearr_73541 = f__41996__auto__();
(statearr_73541[(6)] = c__41995__auto___74253);

return statearr_73541;
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
var G__73543 = arguments.length;
switch (G__73543) {
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
var c__41995__auto___74272 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__41996__auto__ = (function (){var switch__41902__auto__ = (function (state_73581){
var state_val_73582 = (state_73581[(1)]);
if((state_val_73582 === (7))){
var inst_73577 = (state_73581[(2)]);
var state_73581__$1 = state_73581;
var statearr_73583_74273 = state_73581__$1;
(statearr_73583_74273[(2)] = inst_73577);

(statearr_73583_74273[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73582 === (1))){
var inst_73544 = (new Array(n));
var inst_73545 = inst_73544;
var inst_73546 = (0);
var state_73581__$1 = (function (){var statearr_73584 = state_73581;
(statearr_73584[(7)] = inst_73546);

(statearr_73584[(8)] = inst_73545);

return statearr_73584;
})();
var statearr_73585_74274 = state_73581__$1;
(statearr_73585_74274[(2)] = null);

(statearr_73585_74274[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73582 === (4))){
var inst_73549 = (state_73581[(9)]);
var inst_73549__$1 = (state_73581[(2)]);
var inst_73550 = (inst_73549__$1 == null);
var inst_73551 = cljs.core.not(inst_73550);
var state_73581__$1 = (function (){var statearr_73586 = state_73581;
(statearr_73586[(9)] = inst_73549__$1);

return statearr_73586;
})();
if(inst_73551){
var statearr_73587_74275 = state_73581__$1;
(statearr_73587_74275[(1)] = (5));

} else {
var statearr_73588_74276 = state_73581__$1;
(statearr_73588_74276[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73582 === (15))){
var inst_73571 = (state_73581[(2)]);
var state_73581__$1 = state_73581;
var statearr_73589_74277 = state_73581__$1;
(statearr_73589_74277[(2)] = inst_73571);

(statearr_73589_74277[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73582 === (13))){
var state_73581__$1 = state_73581;
var statearr_73590_74278 = state_73581__$1;
(statearr_73590_74278[(2)] = null);

(statearr_73590_74278[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73582 === (6))){
var inst_73546 = (state_73581[(7)]);
var inst_73567 = (inst_73546 > (0));
var state_73581__$1 = state_73581;
if(cljs.core.truth_(inst_73567)){
var statearr_73591_74279 = state_73581__$1;
(statearr_73591_74279[(1)] = (12));

} else {
var statearr_73592_74280 = state_73581__$1;
(statearr_73592_74280[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73582 === (3))){
var inst_73579 = (state_73581[(2)]);
var state_73581__$1 = state_73581;
return cljs.core.async.impl.ioc_helpers.return_chan(state_73581__$1,inst_73579);
} else {
if((state_val_73582 === (12))){
var inst_73545 = (state_73581[(8)]);
var inst_73569 = cljs.core.vec(inst_73545);
var state_73581__$1 = state_73581;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_73581__$1,(15),out,inst_73569);
} else {
if((state_val_73582 === (2))){
var state_73581__$1 = state_73581;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_73581__$1,(4),ch);
} else {
if((state_val_73582 === (11))){
var inst_73561 = (state_73581[(2)]);
var inst_73562 = (new Array(n));
var inst_73545 = inst_73562;
var inst_73546 = (0);
var state_73581__$1 = (function (){var statearr_73593 = state_73581;
(statearr_73593[(7)] = inst_73546);

(statearr_73593[(10)] = inst_73561);

(statearr_73593[(8)] = inst_73545);

return statearr_73593;
})();
var statearr_73594_74281 = state_73581__$1;
(statearr_73594_74281[(2)] = null);

(statearr_73594_74281[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73582 === (9))){
var inst_73545 = (state_73581[(8)]);
var inst_73559 = cljs.core.vec(inst_73545);
var state_73581__$1 = state_73581;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_73581__$1,(11),out,inst_73559);
} else {
if((state_val_73582 === (5))){
var inst_73546 = (state_73581[(7)]);
var inst_73549 = (state_73581[(9)]);
var inst_73545 = (state_73581[(8)]);
var inst_73554 = (state_73581[(11)]);
var inst_73553 = (inst_73545[inst_73546] = inst_73549);
var inst_73554__$1 = (inst_73546 + (1));
var inst_73555 = (inst_73554__$1 < n);
var state_73581__$1 = (function (){var statearr_73595 = state_73581;
(statearr_73595[(12)] = inst_73553);

(statearr_73595[(11)] = inst_73554__$1);

return statearr_73595;
})();
if(cljs.core.truth_(inst_73555)){
var statearr_73596_74283 = state_73581__$1;
(statearr_73596_74283[(1)] = (8));

} else {
var statearr_73597_74284 = state_73581__$1;
(statearr_73597_74284[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73582 === (14))){
var inst_73574 = (state_73581[(2)]);
var inst_73575 = cljs.core.async.close_BANG_(out);
var state_73581__$1 = (function (){var statearr_73599 = state_73581;
(statearr_73599[(13)] = inst_73574);

return statearr_73599;
})();
var statearr_73600_74285 = state_73581__$1;
(statearr_73600_74285[(2)] = inst_73575);

(statearr_73600_74285[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73582 === (10))){
var inst_73565 = (state_73581[(2)]);
var state_73581__$1 = state_73581;
var statearr_73601_74286 = state_73581__$1;
(statearr_73601_74286[(2)] = inst_73565);

(statearr_73601_74286[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73582 === (8))){
var inst_73545 = (state_73581[(8)]);
var inst_73554 = (state_73581[(11)]);
var tmp73598 = inst_73545;
var inst_73545__$1 = tmp73598;
var inst_73546 = inst_73554;
var state_73581__$1 = (function (){var statearr_73602 = state_73581;
(statearr_73602[(7)] = inst_73546);

(statearr_73602[(8)] = inst_73545__$1);

return statearr_73602;
})();
var statearr_73603_74287 = state_73581__$1;
(statearr_73603_74287[(2)] = null);

(statearr_73603_74287[(1)] = (2));


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
var statearr_73604 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_73604[(0)] = cljs$core$async$state_machine__41903__auto__);

(statearr_73604[(1)] = (1));

return statearr_73604;
});
var cljs$core$async$state_machine__41903__auto____1 = (function (state_73581){
while(true){
var ret_value__41904__auto__ = (function (){try{while(true){
var result__41905__auto__ = switch__41902__auto__(state_73581);
if(cljs.core.keyword_identical_QMARK_(result__41905__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__41905__auto__;
}
break;
}
}catch (e73605){var ex__41906__auto__ = e73605;
var statearr_73606_74288 = state_73581;
(statearr_73606_74288[(2)] = ex__41906__auto__);


if(cljs.core.seq((state_73581[(4)]))){
var statearr_73607_74289 = state_73581;
(statearr_73607_74289[(1)] = cljs.core.first((state_73581[(4)])));

} else {
throw ex__41906__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41904__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__74290 = state_73581;
state_73581 = G__74290;
continue;
} else {
return ret_value__41904__auto__;
}
break;
}
});
cljs$core$async$state_machine__41903__auto__ = function(state_73581){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__41903__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__41903__auto____1.call(this,state_73581);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__41903__auto____0;
cljs$core$async$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__41903__auto____1;
return cljs$core$async$state_machine__41903__auto__;
})()
})();
var state__41997__auto__ = (function (){var statearr_73608 = f__41996__auto__();
(statearr_73608[(6)] = c__41995__auto___74272);

return statearr_73608;
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
var G__73610 = arguments.length;
switch (G__73610) {
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
var c__41995__auto___74292 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__41996__auto__ = (function (){var switch__41902__auto__ = (function (state_73655){
var state_val_73656 = (state_73655[(1)]);
if((state_val_73656 === (7))){
var inst_73651 = (state_73655[(2)]);
var state_73655__$1 = state_73655;
var statearr_73657_74293 = state_73655__$1;
(statearr_73657_74293[(2)] = inst_73651);

(statearr_73657_74293[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73656 === (1))){
var inst_73611 = [];
var inst_73612 = inst_73611;
var inst_73613 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);
var state_73655__$1 = (function (){var statearr_73658 = state_73655;
(statearr_73658[(7)] = inst_73613);

(statearr_73658[(8)] = inst_73612);

return statearr_73658;
})();
var statearr_73659_74294 = state_73655__$1;
(statearr_73659_74294[(2)] = null);

(statearr_73659_74294[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73656 === (4))){
var inst_73616 = (state_73655[(9)]);
var inst_73616__$1 = (state_73655[(2)]);
var inst_73617 = (inst_73616__$1 == null);
var inst_73618 = cljs.core.not(inst_73617);
var state_73655__$1 = (function (){var statearr_73660 = state_73655;
(statearr_73660[(9)] = inst_73616__$1);

return statearr_73660;
})();
if(inst_73618){
var statearr_73661_74295 = state_73655__$1;
(statearr_73661_74295[(1)] = (5));

} else {
var statearr_73662_74296 = state_73655__$1;
(statearr_73662_74296[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73656 === (15))){
var inst_73612 = (state_73655[(8)]);
var inst_73643 = cljs.core.vec(inst_73612);
var state_73655__$1 = state_73655;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_73655__$1,(18),out,inst_73643);
} else {
if((state_val_73656 === (13))){
var inst_73638 = (state_73655[(2)]);
var state_73655__$1 = state_73655;
var statearr_73663_74297 = state_73655__$1;
(statearr_73663_74297[(2)] = inst_73638);

(statearr_73663_74297[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73656 === (6))){
var inst_73612 = (state_73655[(8)]);
var inst_73640 = inst_73612.length;
var inst_73641 = (inst_73640 > (0));
var state_73655__$1 = state_73655;
if(cljs.core.truth_(inst_73641)){
var statearr_73664_74298 = state_73655__$1;
(statearr_73664_74298[(1)] = (15));

} else {
var statearr_73665_74299 = state_73655__$1;
(statearr_73665_74299[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73656 === (17))){
var inst_73648 = (state_73655[(2)]);
var inst_73649 = cljs.core.async.close_BANG_(out);
var state_73655__$1 = (function (){var statearr_73666 = state_73655;
(statearr_73666[(10)] = inst_73648);

return statearr_73666;
})();
var statearr_73667_74300 = state_73655__$1;
(statearr_73667_74300[(2)] = inst_73649);

(statearr_73667_74300[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73656 === (3))){
var inst_73653 = (state_73655[(2)]);
var state_73655__$1 = state_73655;
return cljs.core.async.impl.ioc_helpers.return_chan(state_73655__$1,inst_73653);
} else {
if((state_val_73656 === (12))){
var inst_73612 = (state_73655[(8)]);
var inst_73631 = cljs.core.vec(inst_73612);
var state_73655__$1 = state_73655;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_73655__$1,(14),out,inst_73631);
} else {
if((state_val_73656 === (2))){
var state_73655__$1 = state_73655;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_73655__$1,(4),ch);
} else {
if((state_val_73656 === (11))){
var inst_73620 = (state_73655[(11)]);
var inst_73616 = (state_73655[(9)]);
var inst_73612 = (state_73655[(8)]);
var inst_73628 = inst_73612.push(inst_73616);
var tmp73668 = inst_73612;
var inst_73612__$1 = tmp73668;
var inst_73613 = inst_73620;
var state_73655__$1 = (function (){var statearr_73669 = state_73655;
(statearr_73669[(12)] = inst_73628);

(statearr_73669[(7)] = inst_73613);

(statearr_73669[(8)] = inst_73612__$1);

return statearr_73669;
})();
var statearr_73670_74301 = state_73655__$1;
(statearr_73670_74301[(2)] = null);

(statearr_73670_74301[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73656 === (9))){
var inst_73613 = (state_73655[(7)]);
var inst_73624 = cljs.core.keyword_identical_QMARK_(inst_73613,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));
var state_73655__$1 = state_73655;
var statearr_73671_74302 = state_73655__$1;
(statearr_73671_74302[(2)] = inst_73624);

(statearr_73671_74302[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73656 === (5))){
var inst_73620 = (state_73655[(11)]);
var inst_73616 = (state_73655[(9)]);
var inst_73613 = (state_73655[(7)]);
var inst_73621 = (state_73655[(13)]);
var inst_73620__$1 = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(inst_73616) : f.call(null,inst_73616));
var inst_73621__$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_73620__$1,inst_73613);
var state_73655__$1 = (function (){var statearr_73672 = state_73655;
(statearr_73672[(11)] = inst_73620__$1);

(statearr_73672[(13)] = inst_73621__$1);

return statearr_73672;
})();
if(inst_73621__$1){
var statearr_73673_74307 = state_73655__$1;
(statearr_73673_74307[(1)] = (8));

} else {
var statearr_73674_74308 = state_73655__$1;
(statearr_73674_74308[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73656 === (14))){
var inst_73620 = (state_73655[(11)]);
var inst_73616 = (state_73655[(9)]);
var inst_73633 = (state_73655[(2)]);
var inst_73634 = [];
var inst_73635 = inst_73634.push(inst_73616);
var inst_73612 = inst_73634;
var inst_73613 = inst_73620;
var state_73655__$1 = (function (){var statearr_73675 = state_73655;
(statearr_73675[(14)] = inst_73633);

(statearr_73675[(7)] = inst_73613);

(statearr_73675[(15)] = inst_73635);

(statearr_73675[(8)] = inst_73612);

return statearr_73675;
})();
var statearr_73676_74309 = state_73655__$1;
(statearr_73676_74309[(2)] = null);

(statearr_73676_74309[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73656 === (16))){
var state_73655__$1 = state_73655;
var statearr_73677_74310 = state_73655__$1;
(statearr_73677_74310[(2)] = null);

(statearr_73677_74310[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73656 === (10))){
var inst_73626 = (state_73655[(2)]);
var state_73655__$1 = state_73655;
if(cljs.core.truth_(inst_73626)){
var statearr_73678_74315 = state_73655__$1;
(statearr_73678_74315[(1)] = (11));

} else {
var statearr_73679_74316 = state_73655__$1;
(statearr_73679_74316[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73656 === (18))){
var inst_73645 = (state_73655[(2)]);
var state_73655__$1 = state_73655;
var statearr_73680_74317 = state_73655__$1;
(statearr_73680_74317[(2)] = inst_73645);

(statearr_73680_74317[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_73656 === (8))){
var inst_73621 = (state_73655[(13)]);
var state_73655__$1 = state_73655;
var statearr_73681_74318 = state_73655__$1;
(statearr_73681_74318[(2)] = inst_73621);

(statearr_73681_74318[(1)] = (10));


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
var statearr_73682 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_73682[(0)] = cljs$core$async$state_machine__41903__auto__);

(statearr_73682[(1)] = (1));

return statearr_73682;
});
var cljs$core$async$state_machine__41903__auto____1 = (function (state_73655){
while(true){
var ret_value__41904__auto__ = (function (){try{while(true){
var result__41905__auto__ = switch__41902__auto__(state_73655);
if(cljs.core.keyword_identical_QMARK_(result__41905__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__41905__auto__;
}
break;
}
}catch (e73683){var ex__41906__auto__ = e73683;
var statearr_73684_74319 = state_73655;
(statearr_73684_74319[(2)] = ex__41906__auto__);


if(cljs.core.seq((state_73655[(4)]))){
var statearr_73685_74321 = state_73655;
(statearr_73685_74321[(1)] = cljs.core.first((state_73655[(4)])));

} else {
throw ex__41906__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41904__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__74322 = state_73655;
state_73655 = G__74322;
continue;
} else {
return ret_value__41904__auto__;
}
break;
}
});
cljs$core$async$state_machine__41903__auto__ = function(state_73655){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__41903__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__41903__auto____1.call(this,state_73655);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__41903__auto____0;
cljs$core$async$state_machine__41903__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__41903__auto____1;
return cljs$core$async$state_machine__41903__auto__;
})()
})();
var state__41997__auto__ = (function (){var statearr_73686 = f__41996__auto__();
(statearr_73686[(6)] = c__41995__auto___74292);

return statearr_73686;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__41997__auto__);
}));


return out;
}));

(cljs.core.async.partition_by.cljs$lang$maxFixedArity = 3);


//# sourceMappingURL=cljs.core.async.js.map
