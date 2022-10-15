var GHPATH = '/ludo';
var APP_PREFIX = 'ludo_';
var VERSION = 'version_03';
var URLS = [    
  `${GHPATH}/`,
  `${GHPATH}/index.html`,
  `${GHPATH}/ludo.css`,
  `${GHPATH}/img/icon.png`,
  `${GHPATH}/ludo.js`,
  `${GHPATH}/bronze.png`,
  `${GHPATH}/click.wav`,
  `${GHPATH}/d1.jpg`,
  `${GHPATH}/d2.jpg`,
  `${GHPATH}/d3.jpg`,
  `${GHPATH}/d4.jpg`,
  `${GHPATH}/d5.jpg`,
  `${GHPATH}/d6.jpg`,
  `${GHPATH}/gold.png`,
  `${GHPATH}/ludo.png`,
  `${GHPATH}/ludo2.png`,
  `${GHPATH}/ludo_icon.png`,
  `${GHPATH}/reload.png`,
  `${GHPATH}/roll.wav`,
  `${GHPATH}/safe.mp3`,
  `${GHPATH}/shit.png`,
  `${GHPATH}/silver.png`,
  `${GHPATH}/tiyau.wav`,
  `${GHPATH}/tuii.mp3`,
  `${GHPATH}/yippe.mp3`,
]

var CACHE_NAME = APP_PREFIX + VERSION
self.addEventListener('fetch', function (e) {
  console.log('Fetch request : ' + e.request.url);
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) { 
        console.log('Responding with cache : ' + e.request.url);
        return request
      } else {       
        console.log('File is not cached, fetching : ' + e.request.url);
        return fetch(e.request)
      }
    })
  )
})

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('Installing cache : ' + CACHE_NAME);
      return cache.addAll(URLS)
    })
  )
})

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      var cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX)
      })
      cacheWhitelist.push(CACHE_NAME);
      return Promise.all(keyList.map(function (key, i) {
        if (cacheWhitelist.indexOf(key) === -1) {
          console.log('Deleting cache : ' + keyList[i] );
          return caches.delete(keyList[i])
        }
      }))
    })
  )
})