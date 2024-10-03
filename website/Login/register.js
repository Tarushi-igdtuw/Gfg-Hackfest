import { auth } from './firebaseConfig.js'; // Import Firebase auth instance
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

// Event listener for the registration form submission
document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form from submitting the traditional way

    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;

    // Create user with email and password in Firebase
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Successfully created a new user
            const user = userCredential.user;

            // Redirect to login page after successful registration
            window.location.href = 'login.html';
        })
        .catch((error) => {
            // Error handling
            const errorCode = error.code;
            const errorMessage = error.message;

            if (errorCode === 'auth/email-already-in-use') {
                // If email is already in use, display error
                displayErrorMessage("The email address is already in use. Please try again.");
            } else {
                // Display other error messages
                displayErrorMessage(errorMessage);
            }

            // Clear the form fields
            document.getElementById('rEmail').value = '';
            document.getElementById('rPassword').value = '';
        });
});

// Function to display error messages in the DOM
function displayErrorMessage(message) {
    const signUpMessage = document.getElementById('signUpMessage');
    signUpMessage.innerHTML = message;
    signUpMessage.style.display = 'block';
}
