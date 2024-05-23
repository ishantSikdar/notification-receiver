importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js');
importScripts('/firebase-config.js'); // import firebaseConfig

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// background service worker
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png',
    data: { 
      url: payload.data.link
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// onclick handler to open link embed in background notification
self.addEventListener('notificationclick', (event) => {
  event.notification.close(); // Close the notification
  const url = event.notification.data.url;

  // Open the URL
  if (url) {
    event.waitUntil(clients.openWindow(url));
  }
});
