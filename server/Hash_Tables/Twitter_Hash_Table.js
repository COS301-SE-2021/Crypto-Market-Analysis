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

class Twitter_Hash_Table {
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

    async userLookup(screen_name){
        if(!this.#initialized){
            await this.#init;
            this.#initialized = true;
        }

        if(screen_name){
            if(await user_object.searchScreenName(screen_name))
                return true;
            else{
                const error = await T.get('users/show', {screen_name: screen_name}).catch(error => {return error});
                return !!error.data;
            }
        }
        else
            throw `No parameters passed in`;
    }

    async getTimeline(email, users){
        if(!this.#initialized){
            await this.#init;
            this.#initialized = true;
        }

        let tweets = {};

        if(!email || !users)
            return Promise.reject(`Null value entered`);
        else{
            for(const user of users){
                await T.get('statuses/user_timeline', {screen_name: user, count:200, include_rts: 1}, async (error, data) => {
                    if(error)
                        return Promise.reject(error);
                    else{
                        for(const tweet of data)
                            tweets[tweet.id] = tweet.text;
                        this.filterData(email, tweets).then();
                    }
                });
            }
        }
    }

    async filterData(email, tweets){
        if(email && tweets){
            const crypto = await user_object.getCrypto(email);
            const crypto_name = await user_object.getCryptoName(email);
            let regex;

            if(crypto && crypto_name){
                let regex_string = "";
                for(const [index,value] of crypto.entries()){
                    if(index === crypto.length -1) {
                        regex_string += `\\s${crypto_name[index]}\\s|` + `\\s${value}\\s`;
                        regex = new RegExp(regex_string, "gi");
                    }
                    else {
                        regex_string = `\\s${crypto_name[index]}\\s|` + `\\s${value}\\s`;
                        regex = new RegExp(regex_string, "gi");
                        console.log(regex);
                        for(const tweet of Object.entries(tweets)){
                            if(regex.exec(tweet[1]) === null)
                                delete tweets[tweet[0]];
                        }
                        //console.log(tweets, crypto_name[index]);
                    }
                }

                /*const regex = new RegExp(regex_string, "gi");
                for(const tweet of Object.entries(tweets)){
                    if(regex.exec(tweet[1]) === null)
                        delete tweets[tweet[0]];
                }*/
            }
        }
    }

    async getValue(key){
        if(!this.#initialized){
            await this.#init;
            this.#initialized = true;
        }

        if(key)
            return this.#twitter_users[key];
        else
            return null
    }
}

class Singleton {

    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = new Twitter_Hash_Table();
        }
    }

    getInstance() {
        return Singleton.instance;
    }
}

module.exports = Singleton;