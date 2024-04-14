// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyDIepx-oOXD7I4q90yblHUc5W8mlvJHmhY",
    authDomain: "quizzy-19eef.firebaseapp.com",
    databaseURL: "https://quizzy-19eef-default-rtdb.firebaseio.com",
    projectId: "quizzy-19eef",
    storageBucket: "quizzy-19eef.appspot.com",
    messagingSenderId: "297145767464",
    appId: "1:297145767464:web:9648aaff32f066d133471d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export default db