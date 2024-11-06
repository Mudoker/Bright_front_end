/*
GetToken (getDeviceToken.js) requires an empty file named firebase-messaging-sw.js.
Please don't delete the file.

REFERENCE
https://firebase.google.com/docs/cloud-messaging/js/send-multiple
*/

importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts(
    'https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js'
);

firebase.initializeApp({
    // TODO: info
});

// Get a reference to the messaging service
const messaging = firebase.messaging();

// Check if service worker is already initialized
if (!firebase.apps.length) {
    messaging.onBackgroundMessage(payload => {
        console.log(
            '[firebase-messaging-sw.js] Received background message ',
            payload
        );

        const notificationTitle = payload.notification.title;
        const notificationOptions = {
            body: payload.notification.body,
        };

        self.registration.showNotification(
            notificationTitle,
            notificationOptions
        );
    });
}
