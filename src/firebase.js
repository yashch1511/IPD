// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAatR-THFVESFw8cyo41yTZFR_DTwjRMK8",
  authDomain: "ipd-9d3f3.firebaseapp.com",
  projectId: "ipd-9d3f3",
  storageBucket: "ipd-9d3f3.firebasestorage.app",
  messagingSenderId: "462082292189",
  appId: "1:462082292189:web:6da53c4d55e16e9f949e34",
  measurementId: "G-8MNJWLSG1J"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth(app);
const db= getFirestore(app);

export {auth,db};
