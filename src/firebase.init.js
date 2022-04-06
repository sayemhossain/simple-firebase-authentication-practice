// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWRmvgPh0rkyHXiDNU1rrwBwWaOiZm148",
  authDomain: "simple-firebase-authenti-2608c.firebaseapp.com",
  projectId: "simple-firebase-authenti-2608c",
  storageBucket: "simple-firebase-authenti-2608c.appspot.com",
  messagingSenderId: "984024236962",
  appId: "1:984024236962:web:1fef31d67ead292c2f28fb",
  measurementId: "G-ZGVERH7E5V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
