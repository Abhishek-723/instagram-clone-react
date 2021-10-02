import firebase from 'firebase'
import 'firebase/auth';
import 'firebase/firestore';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBqLJmQNZLJTMVzJ4wsPit3iDXc8hcoccQ",
  authDomain: "instagram-clone-899bd.firebaseapp.com",
  projectId: "instagram-clone-899bd",
  storageBucket: "instagram-clone-899bd.appspot.com",
  messagingSenderId: "1057393915163",
  appId: "1:1057393915163:web:e60cb3f85d764e62e10fbe",
  measurementId: "G-EVYKFGHVER"
})

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };