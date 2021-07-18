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
                    this.#twitter_users[doc.id] = {id: doc.data().id, post: doc.data().post}
                console.log(this.#twitter_users);
            }).catch((error) => {
                console.error(error);
            });
    }
}

const twitter = new Twitter();
module.exports = Twitter;