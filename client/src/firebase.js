import firebase from "firebase/app";
import "firebase/crypto"

let config = firebase.initializeApp({
    apiKey:process.env.local.REACT_APP_FIREBASE_API_KEY,
    authDomain:process.env.local.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId:process.env.local.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket:process.env.local.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSendeId:process.env.local.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId:process.env.local.REACT_APP_FIREBASE_APP_ID,
    databaseURL:process.env.local.REACT_APP_FIREBASE_DATABASE_URL
});
