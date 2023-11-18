// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estate-marketplace-3d4dd.firebaseapp.com",
  projectId: "estate-marketplace-3d4dd",
  storageBucket: "estate-marketplace-3d4dd.appspot.com",
  messagingSenderId: "213860540705",
  appId: "1:213860540705:web:08ad7869338247668f9e60",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
