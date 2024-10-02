chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed and alarm created.');
    chrome.alarms.create('moodTrackerAlarm', { delayInMinutes: 1, periodInMinutes: 1 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
    console.log('Alarm triggered: ', alarm);
    if (alarm.name === 'moodTrackerAlarm') {
        sendMoodNotification();
    }
});

function sendMoodNotification() {
    console.log('Sending mood notification');
    chrome.notifications.create({
        type: 'basic',                    // Notification type
        iconUrl: 'icon.png',               // Icon image path (make sure this is correct)
        title: 'How are you feeling?',     // Notification title
        message: 'Click to log your mood!', // Notification message
        priority: 1,                       // Notification priority
        buttons: [{ title: "Log Mood" }]   // Optional button to log mood
    }, function (notificationId) {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
        }
    });
}

chrome.notifications.onButtonClicked.addListener(() => {
    console.log('Notification button clicked');
    chrome.tabs.create({ url: 'popup.html' });
});
  