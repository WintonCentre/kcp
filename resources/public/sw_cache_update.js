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

self.addEventListener('fetch', event => {
    // Prevent the default, and handle the request ourselves.
    event.respondWith(async function() {
        // Try to get the response from a cache.
        const cachedResponse = await caches.match(event.request);
        // Return it if we found one.
        if (cachedResponse) return cachedResponse;
        // If we didn't find a match in the cache, use the network.
        return fetch(event.request);
    }());
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
            '/kidney/belf/waiting',
            '/kidney/birm/waiting',
            '/kidney/bris/waiting',
            '/kidney/camb/waiting',
            '/kidney/card/waiting',
            '/kidney/cov/waiting',
            '/kidney/edin/waiting',
            '/kidney/glas/waiting',
            '/kidney/guys/waiting',
            '/kidney/leeds/waiting',
            '/kidney/leic/waiting',
            '/kidney/liver/waiting',
            '/kidney/man/waiting',
            '/kidney/new/waiting',
            '/kidney/nott/waiting',
            '/kidney/oxon/waiting',
            '/kidney/plym/waiting',
            '/kidney/port/waiting',
            '/kidney/shef/waiting',
            '/kidney/st-gs/waiting',
            '/kidney/royalfree/waiting',
            '/kidney/barts/waiting',
            '/kidney/wlrtc/waiting',
            '/kidney/belf/graft',
            '/kidney/birm/graft',
            '/kidney/bris/graft',
            '/kidney/camb/graft',
            '/kidney/card/graft',
            '/kidney/cov/graft',
            '/kidney/edin/graft',
            '/kidney/glas/graft',
            '/kidney/guys/graft',
            '/kidney/leeds/graft',
            '/kidney/leic/graft',
            '/kidney/liver/graft',
            '/kidney/man/graft',
            '/kidney/new/graft',
            '/kidney/nott/graft',
            '/kidney/oxon/graft',
            '/kidney/plym/graft',
            '/kidney/port/graft',
            '/kidney/shef/graft',
            '/kidney/st-gs/graft',
            '/kidney/royalfree/graft',
            '/kidney/barts/graft',
            '/kidney/wlrtc/graft',
            '/kidney/belf/ldgraft',
            '/kidney/birm/ldgraft',
            '/kidney/bris/ldgraft',
            '/kidney/camb/ldgraft',
            '/kidney/card/ldgraft',
            '/kidney/cov/ldgraft',
            '/kidney/edin/ldgraft',
            '/kidney/glas/ldgraft',
            '/kidney/guys/ldgraft',
            '/kidney/leeds/ldgraft',
            '/kidney/leic/ldgraft',
            '/kidney/liver/ldgraft',
            '/kidney/man/ldgraft',
            '/kidney/new/ldgraft',
            '/kidney/nott/ldgraft',
            '/kidney/oxon/ldgraft',
            '/kidney/plym/ldgraft',
            '/kidney/port/ldgraft',
            '/kidney/shef/ldgraft',
            '/kidney/st-gs/ldgraft',
            '/kidney/royalfree/ldgraft',
            '/kidney/barts/ldgraft',
            '/kidney/wlrtc/ldgraft',
            '/kidney/belf/survival',
            '/kidney/birm/survival',
            '/kidney/bris/survival',
            '/kidney/camb/survival',
            '/kidney/card/survival',
            '/kidney/cov/survival',
            '/kidney/edin/survival',
            '/kidney/glas/survival',
            '/kidney/guys/survival',
            '/kidney/leeds/survival',
            '/kidney/leic/survival',
            '/kidney/liver/survival',
            '/kidney/man/survival',
            '/kidney/new/survival',
            '/kidney/nott/survival',
            '/kidney/oxon/survival',
            '/kidney/plym/survival',
            '/kidney/port/survival',
            '/kidney/shef/survival',
            '/kidney/st-gs/survival',
            '/kidney/royalfree/survival',
            '/kidney/barts/survival',
            '/kidney/wlrtc/survival',
            '/kidney/belf/ldsurvival',
            '/kidney/birm/ldsurvival',
            '/kidney/bris/ldsurvival',
            '/kidney/camb/ldsurvival',
            '/kidney/card/ldsurvival',
            '/kidney/cov/ldsurvival',
            '/kidney/edin/ldsurvival',
            '/kidney/glas/ldsurvival',
            '/kidney/guys/ldsurvival',
            '/kidney/leeds/ldsurvival',
            '/kidney/leic/ldsurvival',
            '/kidney/liver/ldsurvival',
            '/kidney/man/ldsurvival',
            '/kidney/new/ldsurvival',
            '/kidney/nott/ldsurvival',
            '/kidney/oxon/ldsurvival',
            '/kidney/plym/ldsurvival',
            '/kidney/port/ldsurvival',
            '/kidney/shef/ldsurvival',
            '/kidney/st-gs/ldsurvival',
            '/kidney/royalfree/ldsurvival',
            '/kidney/barts/ldsurvival',
            '/kidney/wlrtc/ldsurvival',
            // '/lung/pap/waiting',
            // '/lung/hare/waiting',
            // '/lung/birm/waiting',
            // '/lung/man/waiting',
            // '/lung/new/waiting',
            // '/lung/pap/post-transplant',
            // '/lung/hare/post-transplant',
            // '/lung/birm/post-transplant',
            // '/lung/man/post-transplant',
            // '/lung/new/post-transplant',
            '/competing_risks.pdf',
            '/index.html',
            '/metadata.edn',
            '/object-assign-auto-min.js',
            '/manifest.json',
            '/assets/logo_kidney_192.png',
            '/assets/logo_kidney_512.png',
            '/assets/kidney-banner.png',
            // '/assets/logo_lung_192.png',
            // '/assets/logo_lung_512.png',
            // '/assets/lung-banner.png',
            '/assets/crest.png',
            '/assets/The Window.png',
            '/css/styles.css',
            '/css/open-iconic-bootstrap.min.css',
            '/css/foo.css',
            '/fonts/open-iconic.ttf',
            '/fonts/open-iconic.woff'
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