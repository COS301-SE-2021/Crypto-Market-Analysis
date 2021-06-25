const Twit = require('twit');
const admin = require('firebase-admin');
const serviceAccount = require('../database/firebase.json');
const consumer_key = 'GGXUovWNfvGvagGakjfTzDfe1';
const consumer_secret = 'UMG68Qym8K7vvsdtlEEIn0vRpyNj6Mfbmz6VUKMC3zn7tQNiat';
const access_token = '1401939250858319875-zS8LTvSWz5UspdmaF63hxzpkLv0lbE';
const access_secret_token = 'YDEVhFyEMZuKPN1JAJeeyJPggOeeNVscl17PRXBOObKhP';

const T = new Twit({
    consumer_key:         consumer_key,
    consumer_secret:      consumer_secret,
    access_token:         access_token,
    access_token_secret: access_secret_token, });

class Twitter {
    #firestore_db = null;

    constructor(){
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        this.#firestore_db = admin.firestore();
    }



    /** Gets the id's of the screen names of the users passed as a parameter.
     * @param {[String]} users An array of the screen name of twitter users.
     * */
    async getUsersID(users) {
        if(users==null){
            return Promise.reject(new Error('error null value entered'));
        }
        let screenNames = "";
        users.forEach((user, index) => {
            if(index === users.length - 1)
                screenNames += user;
            else
                screenNames += user + ",";
        })
        await T.get('users/lookup', {screen_name:screenNames}, (err, data, response) => {
            if(err) {
                console.error(`An error occurred while connecting to the Twitter API: ${err}`);
                return -1;
            }
            else{
                data.forEach(async (user) => {
                    this.#firestore_db.save('twitter_data',user.screen_name,'id',user.id);
                });

            }
        }).then();
    }

    /** This function accepts a list of users and makes an API call to the Twitter API to get the 10 latest tweets.
     * @param {[String]} users An array of the screen name of twitter users.
     * @param {String} email The email of the curret user in the session.
     * */
    getUserTimeline(email, users){
        let error = 0;
        if(email==null || users==null){
            return Promise.reject(new Error('error null value entered'));
        }
        if (!Array.isArray(users)) {
            console.error("Variable passed in is not of type String[]");
            error = -2;
            return error;
        }
        else if(users.length < 1) {
            error = -1;
            return error;
        }
        else{
            users.forEach(async user => {
                if(typeof user !== 'string'){
                    console.error("Array contains values that are not of type String");
                    error = -2;
                }
                else{
                    await T.get('statuses/user_timeline', {screen_name: user, count:200, include_rts: 1}, async (err, data, response) => {
                        if(response.caseless.get("status") !== "200 OK"){
                            console.error(`An error occurred while connecting to the twitter API: ${response.caseless.get("status")}`);
                            console.error(err);
                            error = -3;
                        }
                        else{
                            let tweets = [];
                            data.forEach(tweet => {
                                tweets.push(tweet.text);
                            });
                            tweets = await this.filterData(email, tweets);
                        }
                    });
                }
            });
            return error;
        }
    }

    async filterData(email, tweets){
        let cryptoSymbols = [];
        let cryptoNames = [];
        if(email==null || tweets==null){
            return Promise.reject(new Error('error null value entered'));
        }
        await this.#firestore_db.collection(`Users`).get().then((snapshot) =>{
            for (const doc of snapshot.docs) {
                if(doc.id === email){
                    cryptoSymbols = doc.data().crypto;
                    cryptoNames = doc.data().crypto_name;
                    break;
                }
            }
        });

        let tempTweet = null;
        let tempSymbol = null;
        let tempName = null;
        let tempArray = [];
        let database_data = null;
        for(const [index, value] of cryptoSymbols.entries()){
            tempArray = [];
            tempSymbol = value.toLowerCase();
            tempName = cryptoNames[index].toLowerCase();
            tweets.forEach((tweet) => {
                tempTweet = tweet.toLowerCase();
                if(tweet.search("RT")){
                    if(tempTweet.search(tempSymbol) !== -1 || tempTweet.search(tempName) !== -1) {
                        tempArray.push(tweet);
                    }
                }
            })
            if(tempArray.length > 0){
                database_data = {[`post`]: tempArray};
                try{
                    this.#firestore_db.collection(`Twitter`).doc(cryptoNames[index]).set(database_data, {merge:true}).then();
                }
                catch(e) {
                    console.error(`An error occurred while connecting to the database: \n${e}`);
                }
            }
        }
    }
}

module.exports = Twitter;
