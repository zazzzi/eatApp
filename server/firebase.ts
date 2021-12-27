// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUgVbvfbQQQXcNU5lSXZjcyGls0j7K6UQ",
  authDomain: "eatapp-5f84b.firebaseapp.com",
  projectId: "eatapp-5f84b",
  storageBucket: "eatapp-5f84b.appspot.com",
  messagingSenderId: "989232092908",
  appId: "1:989232092908:web:b0f0ed0ff24668117ef7c9",
  measurementId: "G-GNRHEMHNPM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);