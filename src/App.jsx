import React, { useEffect, useState } from 'react';
import './App.css';
import { getDeviceToken, sendNotificationRequest } from './service/notificationService';
import CopyToClipboardButton from "./component/CopyToClipboardButton";
import ForegroundNotification from './component/ForegroundNotification';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/firebase-messaging-sw.js').then(function(registration) {
      console.log('Registration successful with scope: ', registration.scope);
    }, function(err) {
      console.log('Service Worker registration failed: ', err);
    });
  });
}

function App() {
  // fcm Token
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
      const permission = await Notification.requestPermission();
      if (permission == 'granted') {  // generate new token if permission granted
        const fcmToken = await getDeviceToken();
        setToken(fcmToken);
      }
    }
    fetchToken();
  }, []);

  return (
    <div className="App">
      <ForegroundNotification />
      <h2>Firebase Notification Demo</h2>
      {token && <button onClick={() => sendNotificationRequest(token)}>Get Notification</button>}

      {token ? (<CopyToClipboardButton textToCopy={token} />) : <h4>Loading...</h4>}
    </div>
  );
}

export default App;