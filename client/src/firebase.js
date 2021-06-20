import firebase from "firebase/app"
import "firebase/auth"
import 'firebase/firestore'
const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId
})
const db = app.firestore()
export {db}
export const auth = app.auth()
export default app