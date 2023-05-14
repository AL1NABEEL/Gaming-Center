import { getFirestore } from '@firebase/firestore';
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyDzN2hxnsu792FfdHzTAgjO65svxBo51ZM",
  authDomain: "game-center-ba60d.firebaseapp.com",
  projectId: "game-center-ba60d",
  storageBucket: "game-center-ba60d.appspot.com",
  messagingSenderId: "1004785391368",
  appId: "1:1004785391368:web:9d1d11d00cc09ab072bebd",
  measurementId: "G-BSDXV4CF8S"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);