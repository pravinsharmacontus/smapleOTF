import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { FIREBASE_API_KEY } from "../helper/ApiUrl";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "onthefly-5231f.firebaseapp.com",
  projectId: "onthefly-5231f",
  storageBucket: "onthefly-5231f.appspot.com",
  messagingSenderId: "513042259040",
  appId: "1:513042259040:web:3ac71a427cbe3557977705",
  measurementId: "G-M7RG6T1EE2",
  databaseURL: "https://onthefly-5231f-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseStorage = getStorage(app);
export const firebaseRealtimeDb = getDatabase(app);
