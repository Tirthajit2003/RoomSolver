// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "roomsolver-de667.firebaseapp.com",
  projectId: "roomsolver-de667",
  storageBucket: "roomsolver-de667.appspot.com",
  messagingSenderId: "338120533026",
  appId: "1:338120533026:web:3c710cff6e4d0ef324967b"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);