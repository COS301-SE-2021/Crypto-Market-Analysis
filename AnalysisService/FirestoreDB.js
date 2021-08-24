const admin = require('firebase-admin');
const serviceAC = require('./database/firebase.js')
admin.initializeApp({
    credential: admin.credential.cert(serviceAC)
});
const db = admin;
module.exports ={db}