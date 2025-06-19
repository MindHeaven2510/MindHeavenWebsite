// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Add this line

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJUtktSYHxkx_3vvbCeVWH4BMXwFF9Nb0",
  authDomain: "mindheavenwebsite.firebaseapp.com",
  projectId: "mindheavenwebsite",
  storageBucket: "mindheavenwebsite.firebasestorage.app",
  messagingSenderId: "1068397929077",
  appId: "1:1068397929077:web:674b4621184cafbd98ce3c",
  measurementId: "G-G6FT5FKRS2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Add this line

// Export db so other files can import it
export { db }; // Add this line