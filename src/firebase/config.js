import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

require("dotenv").config();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = firebaseApp.auth();
export default firebase;

//added for show up Current user!!!
export const firestore = firebase.firestore();

export const TwitterProvider = new firebase.auth.TwitterAuthProvider();
TwitterProvider.setCustomParameters({ prompt: "select_account" });

export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: "select_account" });

export const handleUserProfile = async ({ userAuth, additionalData }) => {
  if (!userAuth) return;
  const { uid } = userAuth;

  const userRef = firestore.doc(`users/${uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = userAuth;
    const timestamp = new Date();
    const userRoles = ["user"];

    try {
      await userRef.set({
        photoURL,
        displayName,
        email,
        createdDate: timestamp,
        userRoles,
        ...additionalData,
      });
    } catch (err) {
      console.log(err);
    }
  }
  return userRef;
};

