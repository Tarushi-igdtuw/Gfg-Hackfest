// Get the current date
const today = new Date().toISOString().slice(0, 10);

// Submit Gratitude Entries
function submitGratitude() {
    const gratitude1 = document.getElementById('gratitude1').value;
    const gratitude2 = document.getElementById('gratitude2').value;
    const gratitude3 = document.getElementById('gratitude3').value;

    if (gratitude1 && gratitude2 && gratitude3) {
        db.collection("gratitude").add({
            date: today,
            gratitude1: gratitude1,
            gratitude2: gratitude2,
            gratitude3: gratitude3
        }).then(() => {
            alert("Gratitude entries saved successfully!");
            loadGratitudeEntries();
        }).catch(error => {
            console.error("Error adding document: ", error);
        });
    } else {
        alert("Please fill all three gratitude entries.");
    }
}

// Load Gratitude Entries
function loadGratitudeEntries() {
    const gratitudeLog = document.getElementById('gratitudeLog');
    gratitudeLog.innerHTML = ''; // Clear previous entries

    db.collection("gratitude").where("date", "==", today).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const gratitudeEntry = `
                    <li>${data.gratitude1}</li>
                    <li>${data.gratitude2}</li>
                    <li>${data.gratitude3}</li>
                `;
                gratitudeLog.innerHTML += gratitudeEntry;
            });
        })
        .catch((error) => {
            console.error("Error getting documents: ", error);
        });
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

// Load entries on page load
window.onload = loadGratitudeEntries;
