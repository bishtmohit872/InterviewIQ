// Import the functions you need from the SDKs you need
import { initializeApp,getApp, getApps } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-B9Tj55bMbgqba1ooUxqxlHEHO9gdSE0",
  authDomain: "prepwise-25650.firebaseapp.com",
  projectId: "prepwise-25650",
  storageBucket: "prepwise-25650.firebasestorage.app",
  messagingSenderId: "204171253893",
  appId: "1:204171253893:web:486db7fefe8f703ceab1ec",
  measurementId: "G-46TNF3D3JG"
};

// Initialize Firebase
const app = !getApps.length?initializeApp(firebaseConfig):getApp();
export const auth = getAuth(app)
export const authStateChanged = onAuthStateChanged
export const db = getFirestore(app)