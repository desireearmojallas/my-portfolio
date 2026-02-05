// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import type { FirebaseApp } from "firebase/app";
import type { Firestore } from "firebase/firestore";
import type { FirebaseStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjA_HNhf9IJ5y0K7mcUPX2OQOtrVxEjws",
  authDomain: "des-my-portfolio.firebaseapp.com",
  projectId: "des-my-portfolio",
  storageBucket: "des-my-portfolio.appspot.com", // Fixed the storage bucket URL
  messagingSenderId: "22774777958",
  appId: "1:22774777958:web:a2599b4894d80a244d45a7"
};

// Initialize Firebase
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// Initialize Firebase services
const db: Firestore = getFirestore(app);
const storage: FirebaseStorage = getStorage(app);

// Export the services for use in other files
export { db, storage };
export default app;