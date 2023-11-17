// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from  'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGf2BWyPv7SRWxvSzkeKeuZQmSFrg2Dlg",
  authDomain: "tier-6b074.firebaseapp.com",
  projectId: "tier-6b074",
  storageBucket: "tier-6b074.appspot.com",
  messagingSenderId: "19031595672",
  appId: "1:19031595672:web:2df3809a5fa2d398a44eed",
  measurementId: "G-NW5ZNY8FK2"
};


// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );