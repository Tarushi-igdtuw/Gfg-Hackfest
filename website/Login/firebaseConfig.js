
// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeGP_R5KhRDVUarMLfkXu-kzIZNfSCrjs",
  authDomain: "mental-health-care-792b2.firebaseapp.com",
  databaseURL: "https://mental-health-care-792b2-default-rtdb.firebaseio.com",
  projectId: "mental-health-care-792b2",
  storageBucket: "mental-health-care-792b2.appspot.com",
  messagingSenderId: "439565671155",
  appId: "1:439565671155:web:5a56c0a3a485effdfff586",
  measurementId: "G-M56V03RYHF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Firestore
const auth = getAuth(app); // Initialize Firebase Auth
const db = getFirestore(app); // Initialize Firestore

export { auth, db }; // Export Auth and Firestore instances



