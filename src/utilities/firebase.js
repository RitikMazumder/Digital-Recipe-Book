import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDExovqWMtCx8JDXk1TjNLQbMJfkWBwWq4",
  authDomain: "digitalrecipebook-dceb5.firebaseapp.com",
  projectId: "digitalrecipebook-dceb5",
  storageBucket: "digitalrecipebook-dceb5.firebasestorage.app",
  messagingSenderId: "762216364848",
  appId: "1:762216364848:web:83ecedc19c205a8aa966f5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);