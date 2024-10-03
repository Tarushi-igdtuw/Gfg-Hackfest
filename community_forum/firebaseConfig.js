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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };