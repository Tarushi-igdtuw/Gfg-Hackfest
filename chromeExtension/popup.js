function logMood(mood) {
  const timestamp = new Date().toLocaleString();

  // Store the mood and timestamp in Chrome storage
  chrome.storage.sync.get({ moodData: [] }, (data) => {
    const moodData = data.moodData;
    moodData.push({ mood, timestamp });
    chrome.storage.sync.set({ moodData }, () => {
      // Logging and closing window after storage is complete
      alert('Mood logged: ' + mood);
      console.log('Mood logged: ' + mood);  // This should now show up in the popup's console
      // window.close();
    });
  });
}

document.getElementById('submit').addEventListener('click', function () {
  const selectedMood = document.querySelector('input[name="mood"]:checked');

  if (selectedMood) {
    const moodValue = selectedMood.value;  // Get the mood selected by the user
    saveMood(moodValue);  // Save mood to chrome storage
    sendMoodToAPI(moodValue);  // Send the mood to your API
  } else {
    console.log('No mood selected');
  }
});

function saveMood(mood) {
  const moodEntry = {
    mood: mood,
    timestamp: new Date().toLocaleString() // Record timestamp
  };

  chrome.storage.sync.get(['moodHistory'], function (result) {
    let moodHistory = result.moodHistory || [];
    moodHistory.push(moodEntry);

    chrome.storage.sync.set({ moodHistory: moodHistory }, function () {
      console.log('Mood saved:', moodEntry);
      // Log to confirm success
      console.log('Current mood history:', moodHistory);
    });
  });
}

// Function to send mood to the API
function sendMoodToAPI(mood) {
  const moodData = {
    mood: mood,
    date: new Date().toISOString()  // Using ISO format for date
  };

  fetch('http://localhost:3000/moods', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(moodData),
  })
    .then(response => response.json())
    .then(data => console.log('Mood data sent successfully:', data))
    .catch((error) => console.error('Error sending mood data:', error));
}


