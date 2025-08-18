// src/firebase/firebaseConfig.js
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCsl9-xgWLv6ROabth0gjdtXjNmnOoqpXc",
  authDomain: "arqila-ae7db.firebaseapp.com",
  projectId: "arqila-ae7db",
  storageBucket: "arqila-ae7db.firebasestorage.app",
  messagingSenderId: "146764911650",
  appId: "1:146764911650:web:27aadf647c91974a3de67b",
  measurementId: "G-QJPHHHWEYZ",
};

// Initialize Firebase only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Analytics (optional)
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// Auth setup
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Google Sign-In helper
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    return { user };
  } catch (error) {
    console.error("Google Sign-In Error:", error.message);
    return { user: null, error };
  }
};

// Logout helper
export const logout = async () => {
  await signOut(auth);
};

export default app;
