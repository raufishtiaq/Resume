console.log("This message is from the service worker");

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