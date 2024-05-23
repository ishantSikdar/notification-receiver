// src/components/NotificationHandler.jsx
import React, { useEffect } from 'react';
import { messaging } from '../config/firebaseConfig';
import { onMessage } from 'firebase/messaging';

// foreground notification handler component
export default function ForegroundNotification() {
  useEffect(() => {
    onMessage(messaging, (payload) => {
      console.log('Recieved Notification: ', payload);
      // Customize your notification here
      const notificationTitle = payload.notification.title;
      const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon,
      };

      if (Notification.permission === 'granted') {
        const notification = new Notification(notificationTitle, notificationOptions);
        notification.onclick = () => {
          // open link onClicking notification
          window.open(payload.data.link, '_blank');
        };
      }
    });
  }, []);

  return <></>;
};