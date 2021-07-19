const Twit = require('twit');
const fetch = require('node-fetch');
const Database = require(`../database/Database`);
const User_Hash_Table = require(`./User_Hash_Table`);
const user_object = new User_Hash_Table().getInstance();
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
    #oembed_url = "https://publish.twitter.com/oembed";
    #twitter_users;
    #init;
    #initialized = false;

    constructor(){
        if(this.#firestore_db === null)
            this.#firestore_db = new Database().getInstance();

        this.#twitter_users = {};
        this.#init = this.#firestore_db.fetch(`Twitter`)
            .then(snapshot => {
                const docs = snapshot.docs;
                for(const doc of docs)
                    this.#twitter_users[doc.id] = {id: doc.data().id, post: doc.data().post};
            }).catch((error) => {
                console.error(error);
            });
    }

    async getTimeline(email, users){
        if(!this.#initialized){
            await this.#init;
            this.#initialized = true;
        }

        let tweets = [];
        let tweets_id = [];

        if(!email || !users)
            return Promise.reject(new Error('error null value entered'));
        else{
            for(const user in users){
                if(users.hasOwnProperty(user)){
                    await T.get('statuses/user_timeline', {screen_name: user, count:200, include_rts: 1}, async (error, data, response) => {
                        if(error || response.caseless.get("status") !== "200 OK")
                            return Promise.reject(new Error(error));
                        else{
                            for(const tweet of data){
                                tweets_id.push(tweet.id_str);
                                tweets.push(tweet.text);
                            }
                            this.filterData(email, tweets, tweets_id).then();
                        }
                    });
                }
            }
        }
    }

    async filterData(email, tweets, tweets_id){
        const doc_crypto = user_object.getCrypto();
        const doc_crypto_name = user_object.getCryptoName();
    }

    async getValue(key){
        if(!this.#initialized){
            await this.#init;
            this.#initialized = true;
        }

        if(key)
            const value = this.#twitter_users[key]
        else
            return null
    }
}

const twitter = new Twitter();
module.exports = Twitter;