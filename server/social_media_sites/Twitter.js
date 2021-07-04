const Twit = require('twit');
const fetch = require('node-fetch');
const Database = require(`../database/Database`);
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
    #oembed_url = "https://publish.twitter.com/oembed"

    constructor(){
        if(this.#firestore_db === null)
            this.#firestore_db = new Database().getInstance();
    }

    async getAllTweets(){
        let tweets_id = null;
        let blockquotes = [];
        const snapshot = await this.#firestore_db.fetch(`Twitter`);
        const docs = await snapshot.docs;
        for(let i = 0; i < docs.length; i++){
            tweets_id = docs[i].data().id;
            if(tweets_id !== undefined){
                for(let z = 0; z < tweets_id.length; z++){
                    blockquotes.push(await this.getEmbeddedTweet(tweets_id[z]));
                }
            }
        }
        return blockquotes;
    }

    /** This function gets the tweet id as a parameter and returns an html formatted response to display the tweet.
     * @param {String} tweet_id The id of the tweet.
     * @param {String} screen_name Optional screen name of the user.
     * @return {blockquote} Returns an html blockquote tag to display the tweet.
     * */
    async getEmbeddedTweet(tweet_id, screen_name = "Codex98318352"){
        const url = `${this.#oembed_url}?url=https://twitter.com/${screen_name}/status/${tweet_id}`;
        try{
            const response = await fetch(url);
            const data = await response.json();
            return data.html;
        }
        catch (error){
            await Promise.reject(`An error occurred while getting the embedded tweets: ${error}`);
        }
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
                            let tweets_id = [];
                            data.forEach(tweet => {
                                //console.log(tweet.id_str);
                                tweets_id.push(tweet.id_str);
                                tweets.push(tweet.text);
                            });
                            tweets = await this.filterData(email, tweets, tweets_id);
                        }
                    });
                }
            });
            return error;
        }
    }

    async filterData(email, tweets , tweets_id){
        if(email == null || tweets == null || tweets_id == null)
            return Promise.reject(new Error('Null value entered for one of the parameters'));

        let cryptoSymbols = [];
        let cryptoNames = [];
        let tempTweet = null;
        let tempSymbol = null;
        let tempName = null;
        let tempArray = [];
        let temp_tweets_id = [];

        const snapshot = await this.#firestore_db.fetch(`Users`);
        snapshot.docs.every(doc => {
            if(doc.id === email){
                cryptoSymbols = doc.data().crypto;
                cryptoNames = doc.data().crypto_name;
                return false;
            }
            return true;
        });

        if(cryptoSymbols !== null && cryptoNames !== null && cryptoNames.length === cryptoSymbols.length){
            for(const [index, value] of cryptoSymbols.entries()){
                tempArray = [];
                temp_tweets_id = [];
                tempSymbol = value.toLowerCase();
                tempName = cryptoNames[index].toLowerCase();
                tweets.forEach((tweet, position) => {
                    tempTweet = tweet.toLowerCase();
                    if(tweet.search("RT")){
                        if(tempTweet.search(tempSymbol) !== -1 || tempTweet.search(tempName) !== -1) {
                            tempArray.push(tweet);
                            temp_tweets_id.push(tweets_id[position]);
                        }
                    }
                });
                if(tempArray.length > 0){
                    try{
                        this.#firestore_db.save(`Twitter`, cryptoNames[index], `post`, tempArray);
                        this.#firestore_db.save(`Twitter`, cryptoNames[index], `id`, temp_tweets_id);
                    }
                    catch(e) {
                        console.error(`An error occurred while connecting to the database: \n${e}`);
                    }
                }
            }
            return tweets;
        }

        return Promise.reject(new Error(`User is not following any cryptos`));
    }
}

module.exports = Twitter;