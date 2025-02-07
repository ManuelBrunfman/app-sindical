// src/services/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import Constants from 'expo-constants';

// Se extraen las variables definidas en app.config.js
const { extra } = Constants.manifest || { extra: {} };
console.log("Variables de Firebase:", extra);

const firebaseConfig = {
  apiKey: extra.firebaseApiKey,
  authDomain: extra.firebaseAuthDomain,
  projectId: extra.firebaseProjectId,
  storageBucket: extra.firebaseStorageBucket,
  messagingSenderId: extra.firebaseMessagingSenderId,
  appId: extra.firebaseAppId,
  measurementId: extra.firebaseMeasurementId,
};

const app = initializeApp(firebaseConfig);

export { app };
