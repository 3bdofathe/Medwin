// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZnLq37H8l13sfWIP6OjA6vcU2fvZ5lO0",
  authDomain: "medwin-6f044.firebaseapp.com",
  projectId: "medwin-6f044",
  storageBucket: "medwin-6f044.firebasestorage.app",
  messagingSenderId: "157005646963",
  appId: "1:157005646963:web:12b2a9f83383bcf543ae06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;
