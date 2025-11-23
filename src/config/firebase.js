// src/config/firebase.js
// Firebase configuration using CDN

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBS5hORECOIB-Wk4VOiR_3XOTdAYO49bMo",
  authDomain: "blueberry-2be3c.firebaseapp.com",
  databaseURL: "https://blueberry-2be3c-default-rtdb.firebaseio.com",
  projectId: "blueberry-2be3c",
  storageBucket: "blueberry-2be3c.firebasestorage.app",
  messagingSenderId: "273487728404",
  appId: "1:273487728404:web:00d03cf891938a8ae97c01",
  measurementId: "G-YXJME3DF7P"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics(app);
const auth = firebase.auth(app);
const db = firebase.firestore(app);

export { app, analytics, auth, db };