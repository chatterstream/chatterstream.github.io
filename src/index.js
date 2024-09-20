import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { requestFCMToken, onMessageListener } from "./firebaseConfig"; // Import fungsi yang diperlukan dari firebaseConfig

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);

      // Mendapatkan token FCM setelah service worker berhasil didaftarkan
      return registration;
    })
    .then(() => {
      // Setelah service worker terdaftar, coba dapatkan token FCM
      return requestFCMToken();
    })
    .then((token) => {
      if (token) {
        console.log("FCM Token berhasil didapatkan:", token);
        // Anda dapat mengirim token ke server untuk disimpan atau digunakan
      } else {
        console.warn("Gagal mendapatkan FCM Token.");
      }
    })
    .catch((err) => {
      console.error(
        "Service Worker registration atau token retrieval failed:",
        err
      );
    });

  // Mendengarkan pesan ketika aplikasi berada di latar depan
  onMessageListener()
    .then((payload) => {
      console.log("Pesan diterima saat aplikasi di foreground:", payload);
      // Tampilkan notifikasi atau perbarui UI sesuai kebutuhan
    })
    .catch((err) => console.error("Gagal menerima pesan:", err));
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
