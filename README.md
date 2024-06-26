# Quickstart

To Start the client app demonstration, you need to get firebaseConfig and a VAPID Key from the firebase account project where your client app has registered.

### Environment Variables

After gathering all required keys, create `.env` file in the root of the client app directory, and they paste all keys and variables values in it like shown below:

```
VITE_FIREBASE_API_KEY=<Api key>
VITE_FIREBASE_AUTH_DOMAIN=<Auth domain>
VITE_FIREBASE_PROJECT_ID=<project Id>
VITE_FIREBASE_STORAGE_BUCK=<Storage bucket>
VITE_FIREBASE_MESSAGING_SENDER_ID=<Sender Id>
VITE_FIREBASE_APP_ID=<Your App Id>
VITE_FIREBASE_APP_VAPID=<Your Vapid Key>
```

After its set, now just run
``npm install`` when you are at the root direcotry of app to get required dependencies.

To start, use ``npm run dev``, this command will first run the generate-sw-config.js file, which actually loads the environment variables you have defined in `.env` file to a newly generated file located at `/public/firebase-config.js`.

Once this file has generated, your app, specially `firebase-messagin-sw.js` can pick variables for your app using `importScripts('/firebase-config.js');` line. 

### API

The `BASE_URL` of server should be pointing to the Server app that generates the Notifications, in this case, it's Spring Boot application. Can be changed through `/src/api/api.js`, Let's give `8080` PORT to our Spring application.

On Send Notification click, the App Calls REST API using `fetch()`, it's URI is, `{{BASE_URL}}/api/v1/sendNotification`, of Request method `POST`, with a RAW JSON request body with only a field called `fcmToken`

```
//Json Request Body Structure:
{
    "fcmToken" : "your unique deviceId/fcmToken here"
}
```

### Notifications

Foreground Notifications are handled by `ForegroundNotification.jsx` component and Backgrond Notifications is handled by the firebase service worker, i.e, `firebase-messaging-sw.js`, Rest of the functionality is in the `App.jsx` itself with some application logic saved in `notificationService.js`

The App only generates notifications if the permission is granted, which is configured in `App.jsx` file.