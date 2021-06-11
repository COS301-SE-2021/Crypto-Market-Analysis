const admin = require('firebase-admin');
const serviceAccount = require('../firebase.json');
const Twit = require('twit')

const consumer_key = 'GGXUovWNfvGvagGakjfTzDfe1';
const consumer_secret = 'UMG68Qym8K7vvsdtlEEIn0vRpyNj6Mfbmz6VUKMC3zn7tQNiat';
const access_token = '1401939250858319875-zS8LTvSWz5UspdmaF63hxzpkLv0lbE';
const access_secret_token = 'YDEVhFyEMZuKPN1JAJeeyJPggOeeNVscl17PRXBOObKhP';

const T = new Twit({
    consumer_key:         consumer_key,
    consumer_secret:      consumer_secret,
    access_token:         access_token,
    access_token_secret: access_secret_token, })

class Twitter {
    async getUsersID(users) {
        let screenNames = "";
        let userIDs = [];
        users.forEach((user, index) => {
            if(index === users.length - 1)
                screenNames += user;
            else
                screenNames += user + ",";
        })
       T.get('users/lookup', {screen_name:screenNames}, (err, data, response) => {
            data.forEach((account) => {
                userIDs.push(account.id);
            })
            console.log("in")
            return userIDs;
        }).then(() => {return userIDs});
        /*if(userIDs.length === 0)
            console.log("empty")
        console.log(userIDs);
        return userIDs;*/
    }

    async followAccounts(users){
        await this.getUsersID(users).then(res => {console.log(res)});
        console.log("out");
        /*const stream = T.stream('statuses/filter', {follow: '12'});
        stream.on('tweet', (tweet) => {
            console.log(tweet);
        })*/
    }

    /** Initializes the firebase database
    * */
    startDatabase(){
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    }

    /** This function accepts a list of users and makes an API call to the Twitter API to get the 10 latest tweets.
     * @param {[String]} users An array of the screen name of twitter users.
     * */
    getUserTimeline(users){
        this.startDatabase();
        let tweets = [];
        users.forEach(async user => {
            const { data } = await T.get('statuses/user_timeline', {screen_name: user}, async (err, data, response) => {
                if(err)
                    console.error(`An error occurred while connecting to the Twitter API: ${err}`);
                else{
                    let tweets = [];
                    data.forEach(tweet => {
                        tweets.push(tweet.text);
                    });
                    try{
                        const db = admin.firestore();
                        const docRef = db.collection('twitter_data').doc(user);
                        await docRef.set({
                            tweets: tweets,
                        });
                    }
                    catch(e) {
                        console.error(`An error occurred while connecting to the database: ${e}`);
                    }
                }

            });
        });
    }
}

const twitter = new Twitter();
const users = ["elonmusk","jack"];
twitter.getUserTimeline(users);