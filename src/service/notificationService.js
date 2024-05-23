import { BASE_URL } from "../api/api";
import { getToken, getMessaging } from "firebase/messaging";
import { app } from "../config/firebaseConfig"

const VAPID = import.meta.env.VITE_FIREBASE_APP_VAPID;

export const getDeviceToken = async () => {
    try {
        const messaging = getMessaging(app);
        return await getToken(messaging, { vapidKey: VAPID });

    } catch (err) {
        console.error('Error getting device token:', err);
        return null;
    }
}

export const sendNotificationRequest = (token) => {
    fetch(`${BASE_URL}/api/v1/sendNotification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fcmToken: token }),
        redirect: "follow"
    })
        .then((res) => res.json())
        .then((res) => console.log(`Api Response:`, res))
        .catch((err) => console.error(err.message))
}