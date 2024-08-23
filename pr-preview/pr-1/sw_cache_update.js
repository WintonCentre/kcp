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
			'/metadata.txt',
			'/object-assign-auto-min.js',
			'/qrcode.min.js',
			'/manifest.json',
			'/assets/crest.png',
			'/assets/The_Window.png',
			'/css/styles.css',
			'/css/open-iconic-bootstrap.min.css',
			'/css/foo.css',
			'/fonts/open-iconic.ttf',
			'/fonts/open-iconic.woff',
			'/kidney/edn/tools.txt',
			'/kidney/edn/centres.txt',
			'/kidney/edn/UK.txt',
			'/kidney/edn/UK/centres.txt',
			'/kidney/edn/UK/tools.txt',
			'/kidney/edn/UK/ldsurvival.txt'
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