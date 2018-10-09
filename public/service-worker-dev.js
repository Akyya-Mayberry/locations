console.log('inside dev service worker!!!!');
const assetsCache = 'fs-cache-v1';

const urlsToCache = [
    'StoreData.js',
    'clients/Yelp.js'
]

/**
 * Installs service worker with assets to cached
 */
self.addEventListener('install', evt => {
    console.log('installing....');

    evt.waitUntil(
        caches.open(assetsCache)
            .then(cache => {
                console.log('Cache is opened...');
                return cache.addAll(urlsToCache);
            })
            .catch(err => {
                console.log('Cached install failed: ', err);
            })
    )
});

/**
 * Intercepts requests to serve/save cached assets
 */
self.addEventListener('fetch', evt => {

    evt.respondWith(
        // Open up cache for retrieval
        // or caching of new asset
        caches.open(assetsCache).then(cache => {
            return caches.match(evt.request).then(matchRsp => {
                return matchRsp || fetch(evt.request).then(rsp => {
                    cache.put(evt.request, rsp.clone());
                    return rsp;
                });
            })
                .catch(err => {
                    console.log('Unable to re-fetch request. Network error: ', err);
                });
        })
    );
});