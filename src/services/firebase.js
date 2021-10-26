import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import firebaseConfig from "./firebase.config";

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const auth = getAuth(firebaseApp);

import { createUserWithEmailAndPassword } from "firebase/auth";
const register = async (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

import { signInWithEmailAndPassword } from "firebase/auth";
const login = async (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // alert(JSON.stringify(user));
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

import { signOut } from "firebase/auth";
const logout = async () => {
  signOut(auth)
    .then(() => {})
    .catch((error) => {});
};

export { db, auth, login, logout };
