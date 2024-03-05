const checkPermission = () => {
    if ( !('serviceWorker' in navigator)) {
        throw new Error("No support for service worker");
    }

}

const registerSW = async () => {
    const registration = await navigator.serviceWorker.register('sw.js');
    return registration;
}

checkPermission()
registerSW()