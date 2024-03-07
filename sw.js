console.log("This message is from the service worker");


const CACHE_NAME = 'my-cache-v1';
const CACHE_URLS = [
    '/',
    '/index.html', 
    '/style.css' 
];

const cacheAssets = async () => {
    const cache = await caches.open(CACHE_NAME);
    try {
        await Promise.all(CACHE_URLS.map(url => fetch(url)));
    } catch (error) {
        console.error('Failed to cache one or more assets:', error);
    }
};

const fetchAndCache = async (request) => {
    try {
        const cache = await caches.open(CACHE_NAME);
        const response = await fetch(request);
        
        // Check if the response is valid
        if (!response || response.status !== 200 || response.type !== 'basic') {
            return response; // Return the original response
        }

        // Clone the response before putting it in the cache
        const responseToCache = response.clone();
        await cache.put(request, responseToCache);
        
        return response; // Return the original response
    } catch (error) {
        // If fetching fails, try to return from cache
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse; // Return the cached response if available
        }
        
        throw error; // Throw the error if no cached response is available
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


// Function to send notification
const sendNotification = (message) => {
    self.registration.showNotification('Network Status', {
        body: message,
    });
}

// Event listener for online event
const handleOnlineEvent = () => {
    sendNotification('You are now online.');
}

// Event listener for offline event
const handleOfflineEvent = () => {
    sendNotification('You are now offline.');
}

self.addEventListener('online', handleOnlineEvent);
self.addEventListener('offline', handleOfflineEvent);
