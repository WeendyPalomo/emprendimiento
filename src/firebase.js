// src/firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // <-- ¡IMPORTANTE! Añade esta línea para Firestore

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPQ6B1uRDVYMpHnE1X-EUr4iOAApnW7gk",
  authDomain: "emprendimiento-39791.firebaseapp.com",
  projectId: "emprendimiento-39791",
  storageBucket: "emprendimiento-39791.firebasestorage.app",
  messagingSenderId: "181170631823",
  appId: "1:181170631823:web:0c51bc83a362d0d810ecfa",
  measurementId: "G-V31NB2S8VG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// ¡AÑADE ESTAS LÍNEAS PARA INICIALIZAR FIRESTORE Y EXPORTARLO!
export const db = getFirestore(app); // Esto inicializa Firestore y lo exporta