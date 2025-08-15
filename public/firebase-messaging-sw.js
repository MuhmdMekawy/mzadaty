// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// Replace 10.13.2 with latest version of the Firebase JS SDK.
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyAnqh06FnavvxkoA5np4VREkQazdkyYI6U",
  authDomain: "muzadati.firebaseapp.com",
  projectId: "muzadati",
  storageBucket: "muzadati.firebasestorage.app",
  messagingSenderId: "636057990633",
  appId: "1:636057990633:web:b19c41690314ef7b538778",
  measurementId: "G-RGBYVRZZB9"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: './logo.png'
  };
  
  if (document.cookie.includes('token')) {
    self.registration.showNotification(notificationTitle, notificationOptions);
  }
});


self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    // clients.openWindow('https://store.thunder-way.com/orders') 
  );
});


if ('serviceWorker' in navigator) {
  navigator.serviceWorker
      .register('/firebase-messaging-sw.js')
      .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((err) => {
          console.error('Service Worker registration failed:', err);
      });
}


