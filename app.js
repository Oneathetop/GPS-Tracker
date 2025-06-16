const firebaseConfig = {
    apiKey: "AIzaSyBDPESPPxWxEeSRv5kAw-8zEvCorN0f4iw",
    authDomain: "gps-tracker-81070.firebaseapp.com",
    databaseURL: "https://gps-tracker-81070-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "gps-tracker-81070",
    storageBucket: "gps-tracker-81070.firebasestorage.app",
    messagingSenderId: "719663125263",
    appId: "1:719663125263:web:88d7a562137aac2fdd647a",
    measurementId: "G-89NKPG9TZ4"
    };
    firebase.initializeApp(firebaseConfig);
    const db = firebase.database();

    
// Register service worker for PWA support
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log("Service Worker registered"))
    .catch((err) => console.error("SW registration failed:", err));
}

// Function to send location
function sendLocation() {
  if (!navigator.geolocation) {
    console.log("Geolocation not supported.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const timestamp = new Date().toISOString();

      // Send location to Firebase
      db.ref("myPhoneLocation").set({
        latitude,
        longitude,
        timestamp
      });

      console.log("Location sent:", latitude, longitude, timestamp);
    },
    (error) => {
      console.error("Error getting location:", error);
    }
  );
}

sendLocation();
// Run every 15 seconds
setInterval(sendLocation, 15000)
