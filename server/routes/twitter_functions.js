const database = require("./FirestoreDB");
const Twitter = require("../social_media_sites/Twitter");
const twitter = new Twitter();
const db = database.db;

const getAllTweets = async () => {
    let tweet_id = null;
    let blockquotes = [];
    await db.collection(`Twitter`).get().then((snapshot) =>{
        snapshot.docs.forEach((doc) => {
            tweet_id = (doc.data().id);
            tweet_id.forEach((id) => {
                blockquotes.push(twitter.getEmbeddedTweet(id));
            });
        });
    });
    console.log(blockquotes);
    return blockquotes;
}

getAllTweets().then();