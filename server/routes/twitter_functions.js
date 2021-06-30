const Database = require('../database/Database');
const firestore_db = new Database().getInstance();
//const Twitter = require("../social_media_sites/Twitter");
//const twitter = new Twitter();

const getAllTweets = async () => {
    let tweet_id = null;
    let blockquotes = [];
    console.log(await firestore_db.fetch(`Twitter`));
    /*await db.collection(`Twitter`).get().then((snapshot) =>{
        snapshot.docs.forEach((doc) => {
            tweet_id = (doc.data().id);
            tweet_id.forEach((id) => {
                blockquotes.push(twitter.getEmbeddedTweet(id));
            });
        });
    });
    console.log(blockquotes);
    return blockquotes;*/
}

getAllTweets().then();