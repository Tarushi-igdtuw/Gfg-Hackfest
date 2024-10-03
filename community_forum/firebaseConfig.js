// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyArsdg2t-53KgAIv0TrQP_ZiHsoCD2_aoU",
  authDomain: "beacon-of-hope-eb8e2.firebaseapp.com",
  projectId: "beacon-of-hope-eb8e2",
  storageBucket: "beacon-of-hope-eb8e2.appspot.com",
  messagingSenderId: "575601325395",
  appId: "1:575601325395:web:cc8231183af17170971da6",
  measurementId: "G-GVBDXQLDQH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Exporting Firestore instance for use in other files
export { db };

// <// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-analytics.js";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyArsdg2t-53KgAIv0TrQP_ZiHsoCD2_aoU",
//   authDomain: "beacon-of-hope-eb8e2.firebaseapp.com",
//   projectId: "beacon-of-hope-eb8e2",
//   storageBucket: "beacon-of-hope-eb8e2.appspot.com",
//   messagingSenderId: "575601325395",
//   appId: "1:575601325395:web:cc8231183af17170971da6",
//   measurementId: "G-GVBDXQLDQH"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);