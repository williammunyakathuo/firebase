import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAJTIqcAM9x8zlfZdsoWbtKiM-g_Cguqf4",
  authDomain: "fir-app-73225.firebaseapp.com",
  projectId: "fir-app-73225",
  storageBucket: "fir-app-73225.appspot.com",
  messagingSenderId: "603207832094",
  appId: "1:603207832094:web:198c9de8db79b9a66dd40f",
  measurementId: "G-0LSVH5SK2E"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleAuth = new GoogleAuthProvider()

export const db = getFirestore(app)