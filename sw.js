var staticCacheName = 'resturant-cache-1';

/* array of all the ruls on the website that need to be cached */
let urlToCache = [
  './',
  './restaurant.html',
  './css/styles.css',
  './data/restaurants.json',
  './img/1.jpg',
  './img/2.jpg',
  './img/3.jpg',
  './img/4.jpg',
  './img/5.jpg',
  './img/6.jpg',
  './img/7.jpg',
  './img/8.jpg',
  './img/9.jpg',
  './img/10.jpg',
  './js/main.js',
  './js/main-2.js',
  './js/main-1.js',
];

/**
  * listen for the install event to occur, and then wait until caching of urls are done.
  * if anything goes wrong output an error message.
  */
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function (cache) {
      console.log(cache);
      return cache.addAll(urlToCache);
    }).catch(erroe => {
      console.log(erroe);
    })
  );
});

/**
  * Handles checking of cache Names, and delition of cacheNames.
  */
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          return cacheName.startsWith('resturants-') &&
            cacheName != staticCacheName;
        }).map(function (cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

/**
  * handles fetch requests from the user when items are being called for via the cache
  */
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  )
})
