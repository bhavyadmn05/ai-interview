
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "ai-interview-d05a6.firebaseapp.com",
  projectId: "ai-interview-d05a6",
  storageBucket: "ai-interview-d05a6.firebasestorage.app",
  messagingSenderId: "35150784379",
  appId: "1:35150784379:web:877de62199f7af5c657fde"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth , provider}