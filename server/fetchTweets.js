const admin = require('firebase-admin');
const serviceAC = require('./database/firebase.json')
const Database = require('./database/Database');

admin.initializeApp({
    credential: admin.credential.cert(serviceAC)
});

const db = admin.firestore();

//const TweetList = document.querySelector('');

/*function renderTweet(doc)
{
    let div = document.createElement('div');
    div.setAttribute('data-id',doc.id);
}*/

db.collection('twitter_data').get().then((snapshot) =>{
    snapshot.docs.forEach(doc =>{
       // renderTweet(doc);
        console.log(doc.data().tweets);
    });
});