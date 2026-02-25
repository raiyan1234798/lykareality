import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA-9LfnPfFNeWCb_uoFJRouWg7xMWNI_PU",
    authDomain: "lykareality.firebaseapp.com",
    projectId: "lykareality",
    storageBucket: "lykareality.firebasestorage.app",
    messagingSenderId: "484091974778",
    appId: "1:484091974778:web:2aef1d18e01a52ff1ad7c3",
    measurementId: "G-D4ST0JWHPQ"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, db, auth, googleProvider };
