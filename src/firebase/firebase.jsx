import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyBlFIDEJpP7FspPMEVIWAD8-SBnKQo1lEk",
  authDomain: "langlearn-ba04f.firebaseapp.com",
  databaseURL:
    "https://langlearn-ba04f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "langlearn-ba04f",
  storageBucket: "langlearn-ba04f.appspot.com",
  messagingSenderId: "477806300399",
  appId: "1:477806300399:web:378d87285aa158e2491f1a",
  measurementId: "G-D1T2TR2475",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const analytics = firebase.analytics();
const db = getFirestore(app);
// const db = firebase.firestore()

export default db;
