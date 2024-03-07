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

// Function to send notification
const sendNotification = (message) =>(
    new Notification(message));

// Event listener for online event
window.addEventListener('online', () => {
    sendNotification('You are now online.');
});

// Event listener for offline event
window.addEventListener('offline', () =>{
    sendNotification('You are now offline.');
});



checkPermission()
requestNotificationPermission()
registerSW()
     
