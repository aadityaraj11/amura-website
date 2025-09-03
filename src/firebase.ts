// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore'; // If you want Firestore too

const firebaseConfig = {
  apiKey: "AIzaSyCliPhppHfLaIoAGJVLS9tP92k3hNDXEGM",
  authDomain: "amura-e2782.firebaseapp.com",
  projectId: "amura-e2782",
  storageBucket: "amura-e2782.appspot.com", // fixed incorrect domain
  messagingSenderId: "477853533726",
  appId: "1:477853533726:web:73ee51f766e25808fe500f",
  measurementId: "G-VLFMY86398"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
const db = getFirestore(app); // optional

export { db, auth, provider, storage };
