import express from 'express';
import pkg from 'body-parser';
const { json } = pkg;

import cors from 'cors';
const app = express();

// Store moods in an array (in-memory, not persistent)
let moods = [];

// Middleware to parse JSON and handle CORS
app.use(json());
app.use(cors());

// API endpoint to receive mood data from the Chrome extension
app.post('/moods', (req, res) => {
    const mood = req.body;
    if (!mood.mood || !mood.date) {
        return res.status(400).json({ message: 'Mood and date are required' });
    }
    moods.push(mood);
    res.status(201).json({ message: 'Mood saved!', data: mood });
});

// API endpoint to retrieve mood history
app.get('/moods', (req, res) => {
    res.status(200).json(moods);
});

// // Start the server on port 3000
// app.listen(3000, () => {
//     console.log('Server running on http://localhost:3000');
// });

// Start the server on the port provided by the platform, or fallback to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});