import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const isLocal = import.meta.env.VITE_ENV === "local";
let app;
if (isLocal) {
  app = initializeApp(firebaseConfig);
} else {
  try {
    const firebaseWebAppConfig = import.meta.env.VITE_FIREBASE_WEBAPP_CONFIG;
    if (!firebaseWebAppConfig) {
      throw new Error("FIREBASE_WEBAPP_CONFIG is not defined in the environment variables.");
    }
    app = initializeApp(JSON.parse(firebaseWebAppConfig));
  } catch (error) {
    console.error("Error initializing Firebase:", error)
    throw error;
  }
}

const fbAuth = getAuth(app);
export const fbStore = getFirestore(app);
export const fbFileStore = getStorage(app);

export default fbAuth;
