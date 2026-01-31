import { initializeApp } from "firebase/app"
import { initializeAuth, Auth, getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { logger } from "./logger"

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
let auth: Auth;
try {
  const { getReactNativePersistence } = require("firebase/auth/react-native")
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  })
} catch (error) {
  // Fallback to standard auth if React Native persistence is not available
  auth = getAuth(app)
  logger.warn(
    "Firebase React Native persistence not available, using standard auth"
  )
}

// Initialize Firestore
const db = getFirestore(app);

export type AppUser = {
  uid: string;
  email: string | null;
  displayName?: string | null;
  phoneNumber?: string | null;
  role?: "user" | "responder" | "admin";
  serviceRadius?: number;
  fcmToken?: string;
};

export { app, auth, db };