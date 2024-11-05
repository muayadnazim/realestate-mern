// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestate-522e4.firebaseapp.com",
  projectId: "realestate-522e4",
  storageBucket: "realestate-522e4.firebasestorage.app",
  messagingSenderId: "839926473995",
  appId: "1:839926473995:web:5cc90b311973256385ae0e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);