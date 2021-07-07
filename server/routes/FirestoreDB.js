const admin = require('firebase-admin');
const serviceAC = require('../database/firebase.json')
const User = require('../Models/DBmodel')
admin.initializeApp({
    credential: admin.credential.cert(serviceAC)
});
const db = admin.firestore();
module.exports ={db}