const admin = require('firebase-admin');
const serviceAC = require('./database/firebase.json')
const Database = require('./database/Database');

admin.initializeApp({
    credential: admin.credential.cert(serviceAC)
});

const db = admin.firestore();

const TweetList = document.querySelector('#tweets-list');

function renderTweet(doc)
{
    let li = document.createElement('li');
    let id = document.createElement('span');
    let tweets = document.createElement('span');

    li.setAttribute('data-id',doc.id);
    id.textContent = doc.data().id;
    tweets.textContent = doc.data().tweets;

    li.appendChild(id);
    li.appendChild(tweets);

    TweetList.appendChild(li);
}

db.collection('twitter_data').get().then((snapshot) =>{
    snapshot.docs.forEach(doc =>{
        renderTweet(doc);
        //console.log(doc.data().tweets);
    });
});

const SubRedditList = document.querySelector('#subreddit-list');

function renderSubReddit(doc)
{
    let li = document.createElement('li');
    let posts = document.createElement('span');


    li.setAttribute('data-id',doc.id);
    posts.textContent = doc.data().posts;


    li.appendChild(posts);


    SubRedditList.appendChild(li);
}

db.collection('reddit_data').get().then((snapshot) =>{
    snapshot.docs.forEach(doc =>{
        renderSubReddit(doc);

    });
});