
import { auth } from './firebaseConfig.js'; // Import Firebase auth instance
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

// Login function
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form from submitting

    // Get email and password values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Sign in using Firebase Authentication
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in successfully
            const user = userCredential.user;

            // Display success message and redirect
            alert('Login successful! Redirecting to the dashboard.');
            window.location.href = 'dashboard.html'; // Redirect to dashboard or home page
        })
        .catch((error) => {
            // Handle login errors and display detailed error messages
            const errorCode = error.code;

            if (errorCode === 'auth/user-not-found') {
                // Email is not registered
                const registerPrompt = confirm('This email is not registered. Would you like to register for a new account?');
                if (registerPrompt) {
                    window.location.href = 'register.html'; // Redirect to registration page
                }
            } else if (errorCode === 'auth/wrong-password') {
                // Password is incorrect
                alert('Incorrect password. Please try again.');
            } else if (errorCode === 'auth/invalid-email') {
                // Email format is invalid
                alert('Invalid email format. Please enter a valid email address (e.g., example@example.com).');
            } else if (errorCode === 'auth/too-many-requests') {
                // Too many failed login attempts
                alert('Too many login attempts. Please wait for a few minutes and try again.');
            } else {
                // Generic error handler
                alert(`Error: ${error.message}. Please try again.`);
            }
        });
});
