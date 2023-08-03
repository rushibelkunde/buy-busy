// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAw0wj-TzpLUTkKFrDI1vI51D_Xl30s_SE",
  authDomain: "buybusy-fefb3.firebaseapp.com",
  projectId: "buybusy-fefb3",
  storageBucket: "buybusy-fefb3.appspot.com",
  messagingSenderId: "677319042639",
  appId: "1:677319042639:web:83409597c491e0c683ac3a"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);