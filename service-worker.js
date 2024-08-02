const CACHE_NAME = 'tic-tac-toe-cache-v1'
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/tic-tac-toe.js',
  '/images/close.png',
  '/images/rec.png',
  '/images/mainlogo.svg'
]

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('Opened cache')
      return cache
        .addAll(urlsToCache.map(url => new Request(url, { cache: 'reload' })))
        .catch(function (error) {
          console.error('Failed to cache:', error)
        })
    })
  )
})

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response
      }
      return fetch(event.request)
    })
  )
})
