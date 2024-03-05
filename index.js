const checkPermission = () => {
    if ( !('serviceWorker' in navigator)) {
        throw new Error("No support for service worker");
    }

    if ( !('Notification' in window)) {
        throw new Error("No support for Notification API");
    }


}

const registerSW = async () => {
    const registration = await navigator.serviceWorker.register('sw.js');
    return registration;
}

const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();

    if  (permission !== 'granted') {
        throw new Error("Notification Permission Not Granted");
    } else {
        new Notification("Welcome to My Resume");
    }
}




checkPermission()
requestNotificationPermission()
registerSW()
     
