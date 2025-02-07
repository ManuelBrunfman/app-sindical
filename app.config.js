// app.config.js
import 'dotenv/config';

export default {
  expo: {
    name: "sindicato-app",
    slug: "sindicato-app",
    extra: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID,
      eas: {
        projectId: process.env.EAS_PROJECT_ID,
      },
      // Agrega el applicationId. Puedes leerlo de .env o definirlo directamente.
      applicationId: process.env.APPLICATION_ID || "com.sindicato.app",
    },
    notification: {
      vapidPublicKey: process.env.VAPID_PUBLIC_KEY,
      serviceWorkerPath: "/service-worker.js",
    },
  },
};
