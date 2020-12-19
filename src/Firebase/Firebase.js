import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/database";
import "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyDmP6QwrR3iSYE3pgN2VHQTtN3JsYTaIIc",
  authDomain: "ogolovok-f976b.firebaseapp.com",
  databaseURL: "https://ogolovok-f976b.firebaseio.com",
  projectId: "ogolovok-f976b",
  storageBucket: "ogolovok-f976b.appspot.com",
  messagingSenderId: "523601314485",
  appId: "1:523601314485:web:54504e1ac5846e5059b4fc"
};

firebase.initializeApp(firebaseConfig);

export const fs = firebase.firestore();
export const auth = firebase.auth();
export const db = firebase.database();
export const fc = firebase.functions();

fs.settings({ timestampsInSnapshots: true });

export default firebase;
