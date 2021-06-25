const Database = require('../database/Database');
const firestore_db = new Database().getInstance();

firestore_db.save(`Cryptocurrency`, `Twitter`, `id`, `9988556632`);

const getUserTweets = async (email) => {
    let error = {}
    let screen_names = [];
    let tweets = [];
    try{
        const snapshot = await firestore_db.fetch(`twitter_data`, null, null);
        for(const doc of snapshot.docs){
            screen_names.push(doc.data().screen_name);
            tweets.push(doc.data().tweets);
        }
        error.status_code = 200;
        error.screen_names = screen_names;
        error.tweets_array = tweets;
        return JSON.stringify(error);
    }
    catch(err){
        error.status_code = 500;
        error.status = "Internal Server Error";
        error.message = err;
        return JSON.stringify(error);
    }
}

const main = async () => {
    const error = await getUserTweets(`codexteam4@gmail.com`);
    console.log(error);
}

module.exports = {getUserTweets};
/*
main().then();*/
