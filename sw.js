console.log("This message is from the service worker");

const CACHE_NAME = 'my-cache-v1';
const CACHE_URLS = [
    '/',
    '/index.html', 
    '/styles.css' 
];

const cacheAssets = async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(CACHE_URLS);
}

const fetchAndCache = async (request) => {
    try {
        const cache = await caches.open(CACHE_NAME);
        const response = await fetch(request);
        await cache.put(request, response.clone());
        return response;
    } catch (error) {
        return caches.match(request);
    }
}

self.addEventListener('install', (event) => {
    event.waitUntil(cacheAssets());
});

self.addEventListener('fetch', (event) => {
    event.respondWith(fetchAndCache(event.request));
});


self.addEventListener('push', event => {
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: data.icon,
        badge: data.badge,
        image: data.image,
        vibrate: data.vibrate,
        tag: data.tag,
        actions: data.actions
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
});
