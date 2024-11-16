import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyBnfFgA782c6SusKeA4cRNYFz2_YuTljOE",
  authDomain: "codered-f914a.firebaseapp.com",
  projectId: "codered-f914a",
  storageBucket: "codered-f914a.firebasestorage.app",
  messagingSenderId: "974894371505",
  appId: "1:974894371505:android:84e5f0a39a5d6fba394890"
};

const app = initializeApp(firebaseConfig);  
export const auth = getAuth(app);
export const firestore = getFirestore(app)
