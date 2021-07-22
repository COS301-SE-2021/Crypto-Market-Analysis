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
        this.#init = this.#firestore_db.fetch(`Twitter_data`)
            .then(snapshot => {
                const docs = snapshot.docs;
                for(const doc of docs){
                    const keys = Object.keys(doc.data());
                    const values = Object.values(doc.data());
                    let doc_value = {};
                    for(const [index, value] of values.entries())
                        doc_value[keys[index]] = value;

                    this.#twitter_users[doc.id] = doc_value;
                }
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

    async getTimeline(email){
        if(!this.#initialized){
            await this.#init;
            this.#initialized = true;
        }

        if(!email)
            return Promise.reject(`Parameter is not defined`);
        else{
            const users = await user_object.getScreenName(email);
            if(users){
                for(const user of users){
                    let queryTime = new Date().getTime();
                    let last_query = await this.getQueryTime(user);
                    if(last_query){
                        const difference = Math.floor((Math.floor(queryTime/1000) - last_query._seconds)/60);
                        if(difference >= 10)
                            this.callTimelineAPI(user, email, new Date()).then();
                        else{
                            const crypto_currencies = await user_object.getCryptoName(email);
                            if(crypto_currencies){
                                for(const crypto of Object.entries(crypto_currencies)) {
                                    if(this.#twitter_users[user][crypto])
                                        this.filterData(email, await this.#twitter_users[user][crypto], user).then();
                                }
                            }
                        }
                    }
                    else{
                        this.callTimelineAPI(user, email, new Date()).then();
                    }
                }
            }
            else
                return Promise.reject(`User is not following anyone on twitter`);
        }
    }

    async callTimelineAPI(user, email, queryTime){
        let tweets = {};
        return await T.get('statuses/user_timeline', {screen_name: user, count:200, include_rts: 1}, async (error, data) => {
            if(error)
                return Promise.reject(error);
            else{
                for(const tweet of data)
                    tweets[tweet.id] = tweet.text;

                try{
                    await this.filterData(email, tweets, user);
                    await this.insertQueryTime(user, queryTime);
                }
                catch (error){
                    return Promise.reject(error);
                }
            }
        });
    }

    async filterData(email, tweets, user){
        if(email && tweets && user){
            const crypto = await user_object.getCrypto(email);
            const crypto_name = await user_object.getCryptoName(email);

            if(crypto && crypto_name) {
                for(const [index, value] of crypto.entries()){
                    let temp_array = {...tweets};
                    const regex_string = `\\s${crypto_name[index]}\\s|` + `\\s${value}\\s`;
                    const regex = new RegExp(regex_string, "gi");
                    for(const tweet of Object.entries(temp_array)){
                        if(regex.exec(tweet[1]) === null)
                            delete temp_array[tweet[0]];
                    }

                    try{
                        if(temp_array){
                            this.#firestore_db.save(`Twitter`, crypto_name[index], `id`, Object.keys(temp_array));
                            this.#firestore_db.save(`Twitter`, crypto_name[index], `post`, Object.values(temp_array));
                            this.#firestore_db.save(`Twitter_data`, user, crypto_name[index], temp_array);
                            if(this.#twitter_users[user])
                                this.#twitter_users[user][crypto_name[index]] = temp_array;
                        }

                    }
                    catch (error){
                        return Promise.reject(error);
                    }
                }
            }
        }
        else
            return Promise.reject(`Parameters are not defined`);
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

    async insertQueryTime(screen_name, queryTime){
        if(!this.#initialized){
            await this.#init;
            this.#initialized = true;
        }

        if(screen_name && queryTime){
            try{
                if(this.#twitter_users[screen_name])
                    this.#twitter_users[screen_name].last_query = queryTime;
                else
                    this.#twitter_users[screen_name] = {last_query: queryTime};
                this.#firestore_db.save(`Twitter_data`, screen_name, `last_query`, queryTime);
            }
            catch (error){
                return Promise.reject(error);
            }
        }
        else
            return Promise.reject(`Parameters are undefined`);
    }

    async getQueryTime(screen_name){
        if(!this.#initialized){
            await this.#init;
            this.#initialized = true;
        }

        if(screen_name){
            try{
                if(this.#twitter_users[screen_name])
                    return this.#twitter_users[screen_name].last_query;
                else
                    return undefined;
            }
            catch (error){
                return Promise.reject(error);
            }
        }
        else
            return Promise.reject(`Parameter is undefined`);
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

const singleton = new Singleton().getInstance();
singleton.getTimeline(`alekarzeeshan92@gmail.com`);
module.exports = Singleton;