import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAYg_KdWZsUN5ZFdpN3_5d-OQUPyr5NvFo",
  authDomain: "chatterstream-3acac.firebaseapp.com",
  projectId: "chatterstream-3acac",
  storageBucket: "chatterstream-3acac.appspot.com",
  messagingSenderId: "204506003603",
  appId: "1:204506003603:web:be0e0a5b13b32d1dd47566",
  measurementId: "G-LPNB9T9N9T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const requestFCMToken = async () => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey:
        "BFpBW181HPUGi5jpJYwdjuLz_cEwUpzjE--ZGv7OGx298dS6W4OhuUjGhtsfWlsS6-WBQAGL-WCRoEVykwitZeQ",
    });
    if (currentToken) {
      console.log("FCM Token:", currentToken);
      // Kirim token ke server untuk disimpan
      await fetch("http://localhost:4000/save-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: currentToken }),
      });
      return currentToken;
    } else {
      console.log("No registration token available.");
    }
  } catch (err) {
    console.log("An error occurred while retrieving token. ", err);
  }
};

const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      resolve(payload);
    });
  });

export { requestFCMToken, onMessageListener };
