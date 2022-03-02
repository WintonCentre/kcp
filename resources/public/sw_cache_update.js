let CACHE = 'cache-and-update';
let VERSION_CUR = 'v1.021';
// Internal tested. First live version
let LATEST_CACHE_ID = CACHE + '--' + VERSION_CUR;
console.log(VERSION_CUR);

// On install, cache some resources.
self.addEventListener('install', function(evt) {
    console.log('The service worker is being installed. ');
    // console.log('The service worker is being installed. ' + LATEST_CACHE_ID);
    self.skipWaiting()

    // Ask the service worker to keep installing until the returning promise
    // resolves.
    evt.waitUntil(precache());
});

// On fetch, use cache but update the entry with the latest contents
// from the server.
// self.addEventListener('fetch', function(evt) {
//     // console.debug('The service worker is serving the asset.');
//     // You can use `respondWith()` to answer immediately, without waiting for the
//     // network response to reach the service worker...
//     evt.respondWith(fromCache(evt.request));
//     // ...and `waitUntil()` to prevent the worker from being killed until the
//     // cache is updated.
//     evt.waitUntil(update(evt.request));
// });

// self.addEventListener('fetch', event => {
//     // Prevent the default, and handle the request ourselves.
//     event.respondWith(async function() {
//         // Try to get the response from a cache.
//         const cachedResponse = await caches.match(event.request);
//         // Return it if we found one.
//         if (cachedResponse) return cachedResponse;
//         // If we didn't find a match in the cache, use the network.
//         return fetch(event.request);
//     }());
// });

self.addEventListener('fetch', event => {
    // Prevent the default, and handle the request ourselves.
    event.respondWith(async function() {
        // Try to get the response from a cache, caching a fallback one as well
        // console.log('Testing the cached response.');
        const cachedResponse = await caches.match(event.request);
        // Return it if we found one.
        if (cachedResponse) return cachedResponse;
        // If we didn't find a match in the cache, use the network and catch errors (but not 4xx or 5xx valid errors)
        // console.log('Testing the network.');
        try {
            const networkResponse = await fetch(event.request);
            if (networkResponse) return networkResponse;
        } catch (error) {
            // console.log('No cache and network makes an error, redirecting to index.html...', error);
            const cachedFallback = await caches.match('index.html');
            return cachedFallback;
        }
    }())
});

// different fetch
// self.addEventListener('fetch', function(event) {
//     event.respondWith(
//         // Try the cache
//         caches.match(event.request).then(function(response) {
//             return response || fetch(event.request);
//         }).catch(function() {
//             //Error stuff
//         })
//     );
// });


// Open a cache and use `addAll()` with an array of assets to add all of them
// to the cache. Return a promise resolving when all the assets are added.
function precache() {
    // return caches.open(CACHE).then(function (cache) {
    return caches.open(LATEST_CACHE_ID).then(function(cache) {
        return cache.addAll([
			'/',
			'/about',
			'/legal',
			'/pubs',
			'/tech',
			'/js/app.js',
			'/competing_risks.pdf',
			'/index.html',
			'/metadata.edn',
			'/object-assign-auto-min.js',
			'/manifest.json',
			'/assets/crest.png',
			'/assets/The Window.png',
			'/css/styles.css',
			'/css/open-iconic-bootstrap.min.css',
			'/css/foo.css',
			'/fonts/open-iconic.ttf',
			'/fonts/open-iconic.woff',
			'/kidney/edn/centres.txt',
			'/kidney/edn/Belfast.txt',
			'/kidney/edn/Belfast/centres.txt',
			'/kidney/edn/Belfast/tools.txt',
			'/kidney/edn/Belfast/waiting.txt',
			'/kidney/edn/Belfast/graft.txt',
			'/kidney/edn/Belfast/survival.txt',
			'/kidney/edn/UK/ldgraft.txt',
			'/kidney/edn/UK/ldsurvival.txt',
			'/kidney/edn/Birmingham.txt',
			'/kidney/edn/Birmingham/centres.txt',
			'/kidney/edn/Birmingham/tools.txt',
			'/kidney/edn/Birmingham/waiting.txt',
			'/kidney/edn/Birmingham/graft.txt',
			'/kidney/edn/Birmingham/survival.txt',
			'/kidney/edn/Bristol.txt',
			'/kidney/edn/Bristol/centres.txt',
			'/kidney/edn/Bristol/tools.txt',
			'/kidney/edn/Bristol/waiting.txt',
			'/kidney/edn/Bristol/graft.txt',
			'/kidney/edn/Bristol/survival.txt',
			'/kidney/edn/Cambridge.txt',
			'/kidney/edn/Cambridge/centres.txt',
			'/kidney/edn/Cambridge/tools.txt',
			'/kidney/edn/Cambridge/waiting.txt',
			'/kidney/edn/Cambridge/graft.txt',
			'/kidney/edn/Cambridge/survival.txt',
			'/kidney/edn/Cardiff.txt',
			'/kidney/edn/Cardiff/centres.txt',
			'/kidney/edn/Cardiff/tools.txt',
			'/kidney/edn/Cardiff/waiting.txt',
			'/kidney/edn/Cardiff/graft.txt',
			'/kidney/edn/Cardiff/survival.txt',
			'/kidney/edn/Coventry.txt',
			'/kidney/edn/Coventry/centres.txt',
			'/kidney/edn/Coventry/tools.txt',
			'/kidney/edn/Coventry/waiting.txt',
			'/kidney/edn/Coventry/graft.txt',
			'/kidney/edn/Coventry/survival.txt',
			'/kidney/edn/Edinburgh.txt',
			'/kidney/edn/Edinburgh/centres.txt',
			'/kidney/edn/Edinburgh/tools.txt',
			'/kidney/edn/Edinburgh/waiting.txt',
			'/kidney/edn/Edinburgh/graft.txt',
			'/kidney/edn/Edinburgh/survival.txt',
			'/kidney/edn/Glasgow.txt',
			'/kidney/edn/Glasgow/centres.txt',
			'/kidney/edn/Glasgow/tools.txt',
			'/kidney/edn/Glasgow/waiting.txt',
			'/kidney/edn/Glasgow/graft.txt',
			'/kidney/edn/Glasgow/survival.txt',
			'/kidney/edn/Guy_s.txt',
			'/kidney/edn/Guy_s/centres.txt',
			'/kidney/edn/Guy_s/tools.txt',
			'/kidney/edn/Guy_s/waiting.txt',
			'/kidney/edn/Guy_s/graft.txt',
			'/kidney/edn/Guy_s/survival.txt',
			'/kidney/edn/Leeds.txt',
			'/kidney/edn/Leeds/centres.txt',
			'/kidney/edn/Leeds/tools.txt',
			'/kidney/edn/Leeds/waiting.txt',
			'/kidney/edn/Leeds/graft.txt',
			'/kidney/edn/Leeds/survival.txt',
			'/kidney/edn/Leicester.txt',
			'/kidney/edn/Leicester/centres.txt',
			'/kidney/edn/Leicester/tools.txt',
			'/kidney/edn/Leicester/waiting.txt',
			'/kidney/edn/Leicester/graft.txt',
			'/kidney/edn/Leicester/survival.txt',
			'/kidney/edn/Liverpool.txt',
			'/kidney/edn/Liverpool/centres.txt',
			'/kidney/edn/Liverpool/tools.txt',
			'/kidney/edn/Liverpool/waiting.txt',
			'/kidney/edn/Liverpool/graft.txt',
			'/kidney/edn/Liverpool/survival.txt',
			'/kidney/edn/Manchester.txt',
			'/kidney/edn/Manchester/centres.txt',
			'/kidney/edn/Manchester/tools.txt',
			'/kidney/edn/Manchester/waiting.txt',
			'/kidney/edn/Manchester/graft.txt',
			'/kidney/edn/Manchester/survival.txt',
			'/kidney/edn/Newcastle.txt',
			'/kidney/edn/Newcastle/centres.txt',
			'/kidney/edn/Newcastle/tools.txt',
			'/kidney/edn/Newcastle/waiting.txt',
			'/kidney/edn/Newcastle/graft.txt',
			'/kidney/edn/Newcastle/survival.txt',
			'/kidney/edn/Nottingham.txt',
			'/kidney/edn/Nottingham/centres.txt',
			'/kidney/edn/Nottingham/tools.txt',
			'/kidney/edn/Nottingham/waiting.txt',
			'/kidney/edn/Nottingham/graft.txt',
			'/kidney/edn/Nottingham/survival.txt',
			'/kidney/edn/Oxford.txt',
			'/kidney/edn/Oxford/centres.txt',
			'/kidney/edn/Oxford/tools.txt',
			'/kidney/edn/Oxford/waiting.txt',
			'/kidney/edn/Oxford/graft.txt',
			'/kidney/edn/Oxford/survival.txt',
			'/kidney/edn/Plymouth.txt',
			'/kidney/edn/Plymouth/centres.txt',
			'/kidney/edn/Plymouth/tools.txt',
			'/kidney/edn/Plymouth/waiting.txt',
			'/kidney/edn/Plymouth/graft.txt',
			'/kidney/edn/Plymouth/survival.txt',
			'/kidney/edn/Portsmouth.txt',
			'/kidney/edn/Portsmouth/centres.txt',
			'/kidney/edn/Portsmouth/tools.txt',
			'/kidney/edn/Portsmouth/waiting.txt',
			'/kidney/edn/Portsmouth/graft.txt',
			'/kidney/edn/Portsmouth/survival.txt',
			'/kidney/edn/Sheffield.txt',
			'/kidney/edn/Sheffield/centres.txt',
			'/kidney/edn/Sheffield/tools.txt',
			'/kidney/edn/Sheffield/waiting.txt',
			'/kidney/edn/Sheffield/graft.txt',
			'/kidney/edn/Sheffield/survival.txt',
			'/kidney/edn/St_George_s.txt',
			'/kidney/edn/St_George_s/centres.txt',
			'/kidney/edn/St_George_s/tools.txt',
			'/kidney/edn/St_George_s/waiting.txt',
			'/kidney/edn/St_George_s/graft.txt',
			'/kidney/edn/St_George_s/survival.txt',
			'/kidney/edn/The_Royal_Free.txt',
			'/kidney/edn/The_Royal_Free/centres.txt',
			'/kidney/edn/The_Royal_Free/tools.txt',
			'/kidney/edn/The_Royal_Free/waiting.txt',
			'/kidney/edn/The_Royal_Free/graft.txt',
			'/kidney/edn/The_Royal_Free/survival.txt',
			'/kidney/edn/The_Royal_London.txt',
			'/kidney/edn/The_Royal_London/centres.txt',
			'/kidney/edn/The_Royal_London/tools.txt',
			'/kidney/edn/The_Royal_London/waiting.txt',
			'/kidney/edn/The_Royal_London/graft.txt',
			'/kidney/edn/The_Royal_London/survival.txt',
			'/kidney/edn/WLRTC.txt',
			'/kidney/edn/WLRTC/centres.txt',
			'/kidney/edn/WLRTC/tools.txt',
			'/kidney/edn/WLRTC/waiting.txt',
			'/kidney/edn/WLRTC/graft.txt',
			'/kidney/edn/WLRTC/survival.txt'
        ]);
    });
}

// // Tutorial
addEventListener('activate', activateEvent => {
    activateEvent.waitUntil(
        caches.keys().then(keyList => Promise.all(keyList.map(key => {
            // console.log("key from activate")
            // console.log(key)
            if (key !== LATEST_CACHE_ID) {
                console.debug("New key found. Deleting old cache")
                return caches.delete(key);
            }
        })))
        .then(() => {
            console.debug('Activating now via self.skipWaiting()')
            return self.skipWaiting()
        })
    );
});


// Open the cache where the assets were stored and search for the requested
// resource. Notice that in case of no matching, the promise still resolves
// but it does with `undefined` as value.
function fromCache(request) {
    // console.debug('fromCache - request')
    // console.debug(request)

    return caches.open(LATEST_CACHE_ID).then(function(cache) {
        return cache.match(request).then(function(matching) {
            // console.debug('fromCache - matching')
            // console.debug(matching)
            // return matching || Promise.reject('no-match');
            return matching || fetch(request);
        }).catch(function(res) {
            // console.debug("Error fetching not found content in cache.")
            // console.debug(res)
        });
    });
}

// Update consists in opening the cache, performing a network request and
// storing the new response data.
function update(request) {
    return caches.open(LATEST_CACHE_ID).then(function(cache) {
        return fetch(request).then(function(response) {
            return cache.put(request, response);
        }).catch(function(err) {
            // console.debug('update fetch error. ')
            // console.debug(err)
        });
    });
}