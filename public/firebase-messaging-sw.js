importScripts(
  "https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyAYg_KdWZsUN5ZFdpN3_5d-OQUPyr5NvFo",
  authDomain: "chatterstream-3acac.firebaseapp.com",
  projectId: "chatterstream-3acac",
  storageBucket: "chatterstream-3acac.appspot.com",
  messagingSenderId: "204506003603",
  appId: "1:204506003603:web:be0e0a5b13b32d1dd47566",
  measurementId: "G-LPNB9T9N9T",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message: ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
