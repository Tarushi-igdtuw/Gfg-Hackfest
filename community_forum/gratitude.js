// import { collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";
// import { db } from './firebaseConfig.js';


// // Get the current date
// const today = new Date().toISOString().slice(0, 10);

// // Submit Gratitude Entries
// async function submitGratitude() {
//     const gratitude1 = document.getElementById('gratitude1').value;
//     const gratitude2 = document.getElementById('gratitude2').value;
//     const gratitude3 = document.getElementById('gratitude3').value;

//     if (gratitude1 && gratitude2 && gratitude3) {
//         try {
//             // Add new document to the 'gratitude' collection
//             await addDoc(collection(db, "gratitude"), {
//                 date: today,
//                 gratitude1: gratitude1,
//                 gratitude2: gratitude2,
//                 gratitude3: gratitude3
//             });
//             // alert("Gratitude entries saved successfully!");
//             loadGratitudeEntries();
//         } catch (error) {
//             console.error("Error adding document: ", error);
//         }
//     } else {
//         alert("Please fill all three gratitude entries.");
//     }
// }

// // Load Gratitude Entries
// async function loadGratitudeEntries() {
//     const gratitudeLog = document.getElementById('gratitudeLog');
//     gratitudeLog.innerHTML = '';

//     // Query Firestore for gratitude entries from today
//     const q = query(collection(db, "gratitude"), where("date", "==", today));
//     try {
//         const querySnapshot = await getDocs(q);
//         querySnapshot.forEach((doc) => {
//             const data = doc.data();
//             const gratitudeEntry = `
//                 <li>${data.gratitude1}</li>
//                 <li>${data.gratitude2}</li>
//                 <li>${data.gratitude3}</li>
//             `;
//             gratitudeLog.innerHTML += gratitudeEntry;
//         });
//     } catch (error) {
//         console.error("Error getting documents: ", error);
//     }
// }

// // Generate Random Affirmation
// const affirmations = [
//     "You are worthy of all the good things that happen to you.",
//     "You are strong and capable of overcoming challenges.",
//     "You deserve love and kindness.",
//     "Your potential is limitless.",
//     "You are enough just as you are."
// ];

// function generateAffirmation() {
//     const randomIndex = Math.floor(Math.random() * affirmations.length);
//     document.getElementById('affirmationDisplay').innerText = affirmations[randomIndex];
// }

// // Attach the function to the window object so it can be called from the HTML
// window.generateAffirmation = generateAffirmation;
// window.submitGratitude = submitGratitude;

// // Load entries on page load
// window.onload = loadGratitudeEntries;

import { collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";
import { db } from './firebaseConfig.js';

// Get the current date
const today = new Date().toISOString().slice(0, 10);

// Submit Gratitude Entries
async function submitGratitude() {
    const gratitude1 = document.getElementById('gratitude1').value;
    const gratitude2 = document.getElementById('gratitude2').value;
    const gratitude3 = document.getElementById('gratitude3').value;

    if (gratitude1 && gratitude2 && gratitude3) {
        try {
            // Add new document to the 'gratitude' collection with only the date
            await addDoc(collection(db, "gratitude"), {
                date: today,
                gratitude1: gratitude1,
                gratitude2: gratitude2,
                gratitude3: gratitude3
            });

            // Clear form fields after submission
            document.getElementById('gratitudeForm').reset();

            // Load gratitude entries to reflect the newly added ones
            loadGratitudeEntries();
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    } else {
        alert("Please fill all three gratitude entries.");
    }
}

// Load Gratitude Entries
async function loadGratitudeEntries() {
    const gratitudeLog = document.getElementById('gratitudeLog');
    gratitudeLog.innerHTML = '';

    // Query Firestore for gratitude entries from today
    const q = query(collection(db, "gratitude"), where("date", "==", today));
    try {
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            gratitudeLog.innerHTML = '<p>No entries for today yet.</p>';
        } else {
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const gratitudeEntry = `
                    <div class="gratitude-entry">
                        <div class="entry-date">Date: ${data.date}</div>
                        <ul>
                            <li>${data.gratitude1}</li>
                            <li>${data.gratitude2}</li>
                            <li>${data.gratitude3}</li>
                        </ul>
                    </div>
                `;
                gratitudeLog.innerHTML += gratitudeEntry;
            });
        }
    } catch (error) {
        console.error("Error getting documents: ", error);
    }
}

// Generate Random Affirmation
const affirmations = [
    "You are worthy of all the good things that happen to you.",
    "You are strong and capable of overcoming challenges.",
    "You deserve love and kindness.",
    "Your potential is limitless.",
    "You are enough just as you are."
];

function generateAffirmation() {
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    document.getElementById('affirmationDisplay').innerText = affirmations[randomIndex];
}

// Attach the function to the window object so it can be called from the HTML
window.generateAffirmation = generateAffirmation;
window.submitGratitude = submitGratitude;

// Load entries on page load
window.onload = loadGratitudeEntries;
