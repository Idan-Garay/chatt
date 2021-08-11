
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyD5EmGtwXpxRCA2zNkOQTjgRtNVbd_Zkvk",
  authDomain: "chatt-8b658.firebaseapp.com",
  databaseURL: "https://chatt-8b658-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chatt-8b658",
  storageBucket: "chatt-8b658.appspot.com",
  messagingSenderId: "561726157562",
  appId: "1:561726157562:web:d660467f7e54e7842a0f43"
};

export const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();

export default db;