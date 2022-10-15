var GHPATH = '/ludo';
var GHPATH2 = '/ludo/files';
var APP_PREFIX = 'ludo_';
var VERSION = 'version_07';
var URLS = [    
  `${GHPATH}/`,
  `${GHPATH}/index.html`,
  `${GHPATH}/ludo.css`,
  `${GHPATH}/ludo.js`,
  `${GHPATH2}/bronze.png`,
  `${GHPATH2}/click.wav`,
  `${GHPATH2}/d1.jpg`,
  `${GHPATH2}/d2.jpg`,
  `${GHPATH2}/d3.jpg`,
  `${GHPATH2}/d4.jpg`,
  `${GHPATH2}/d5.jpg`,
  `${GHPATH2}/d6.jpg`,
  `${GHPATH2}/gold.png`,
  `${GHPATH2}/ludo.png`,
  `${GHPATH2}/ludo2.png`,
  `${GHPATH2}/ludo_icon.png`,
  `${GHPATH2}/reload.png`,
  `${GHPATH2}/roll.wav`,
  `${GHPATH2}/safe.mp3`,
  `${GHPATH2}/shit.png`,
  `${GHPATH2}/silver.png`,
  `${GHPATH2}/tiyau.wav`,
  `${GHPATH2}/tuii.mp3`,
  `${GHPATH2}/yippe.mp3`,
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