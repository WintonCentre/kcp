goog.provide('transplants.print_fills');
transplants.print_fills.encode_triplet = (function transplants$print_fills$encode_triplet(e1,e2,e3){
var keys = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=");
var enc1 = (e1 >> (2));
var enc2 = (((e1 & (3)) << (4)) | (e2 >> (4)));
var enc3 = (((e2 & (15)) << (2)) | (e3 >> (6)));
var enc4 = (e3 & (63));
return clojure.string.join.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(keys.cljs$core$IFn$_invoke$arity$1 ? keys.cljs$core$IFn$_invoke$arity$1(enc1) : keys.call(null,enc1)),(keys.cljs$core$IFn$_invoke$arity$1 ? keys.cljs$core$IFn$_invoke$arity$1(enc2) : keys.call(null,enc2)),(keys.cljs$core$IFn$_invoke$arity$1 ? keys.cljs$core$IFn$_invoke$arity$1(enc3) : keys.call(null,enc3)),(keys.cljs$core$IFn$_invoke$arity$1 ? keys.cljs$core$IFn$_invoke$arity$1(enc4) : keys.call(null,enc4))], null));
});
transplants.print_fills.encode_rgb = (function transplants$print_fills$encode_rgb(r,g,b){
return clojure.string.join.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [transplants.print_fills.encode_triplet((0),r,g),transplants.print_fills.encode_triplet(b,(255),(255))], null));
});
transplants.print_fills.generate_pixel = (function transplants$print_fills$generate_pixel(encoded_color){
return clojure.string.join.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["data:image/gif;base64,R0lGODlhAQABAPAA",encoded_color,"/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="], null));
});
transplants.print_fills.fill_data_url = (function transplants$print_fills$fill_data_url(r,g,b){
return transplants.print_fills.generate_pixel(transplants.print_fills.encode_rgb(r,g,b));
});
transplants.print_fills.rgb_url = (function transplants$print_fills$rgb_url(rgb){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(transplants.print_fills.fill_data_url,rgb);
});
transplants.print_fills.hex_url = (function transplants$print_fills$hex_url(hex){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(transplants.print_fills.fill_data_url,cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$1(goog.color.hexToRgb(hex)));
});
transplants.print_fills.data_urls = cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"selected","selected",574897764),new cljs.core.Keyword(null,"vis-background","vis-background",-378936411),new cljs.core.Keyword(null,"white","white",-483998618),new cljs.core.Keyword(null,"survival","survival",2035274828),new cljs.core.Keyword(null,"waiting","waiting",895906735),new cljs.core.Keyword(null,"graft","graft",-643427087),new cljs.core.Keyword(null,"boxed","boxed",711935893),new cljs.core.Keyword(null,"info","info",-317069002),new cljs.core.Keyword(null,"usefulinfo","usefulinfo",1180508665)],[transplants.print_fills.hex_url(transplants.rgb.theme),transplants.print_fills.hex_url("#cccccc"),transplants.print_fills.hex_url("#ffffff"),transplants.print_fills.rgb_url(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(151),(156)], null)),transplants.print_fills.hex_url("#4866CB"),transplants.print_fills.hex_url("#0491d8"),transplants.print_fills.hex_url("#dfe4df"),transplants.print_fills.hex_url("#9C9CFF"),transplants.print_fills.rgb_url(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(12),(40),(44)], null))]);

//# sourceMappingURL=transplants.print_fills.js.map
