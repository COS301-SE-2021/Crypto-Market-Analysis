const admin = require('firebase-admin');
const serviceAC = require('./database/firebase.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAC)
});
const db = admin;
module.exports ={db}