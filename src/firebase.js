import { initializeApp } from "firebase/app";
import { initializeFirestore, persistentLocalCache } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBefqXD_0oVAvdSpm1xVAGSK2dOqkfBfQE",
    authDomain: "havocv2-4ce12.firebaseapp.com",
    projectId: "havocv2-4ce12",
    storageBucket: "havocv2-4ce12.firebasestorage.app",
    messagingSenderId: "864752456126",
    appId: "1:864752456126:web:21bf5fc99f13e48f57e9ef",
    measurementId: "G-7NNWD8VKQM"
};

export const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
    localCache: persistentLocalCache(),
});
export const auth = getAuth(app);
export const analytics = getAnalytics(app);