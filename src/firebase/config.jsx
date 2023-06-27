import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAWaOt-L3TuDScPyNNzMdj48ed39_ASdPk",
  authDomain: "fir-137a4.firebaseapp.com",
  projectId: "fir-137a4",
  storageBucket: "fir-137a4.appspot.com",
  messagingSenderId: "581790326401",
  appId: "1:581790326401:web:686834e71d9132d419f780",
  measurementId: "G-F118GZCWFC"
};

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const firestore = getFirestore(firebase);
const storage = getStorage(firebase); // Initialize storage

export { firebase, auth, firestore, storage };
