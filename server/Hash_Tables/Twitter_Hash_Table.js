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
                    this.#twitter_users[`embedded_tweets`] = {};
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
                            if(crypto_currencies.length !== 0){
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
                    tweets[tweet.id_str] = tweet.text;

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
                        if(Object.keys(temp_array).length !== 0){
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

    async getEmbeddedTweets(email){
        if(!this.#initialized){
            await this.#init;
            this.#initialized = true;
        }

        //Get the names of the people the user is following on twitter
        const screen_names = await user_object.getScreenName(email);
        //Get the names of the cryptocurrencies the user is following
        const cryptocurrencies = await user_object.getCryptoName(email);
        //Stores the id's of the tweets from the people the user is following about the cryptocurrencies the user is interested in
        const id_array = [];
        //Stores the html blockquote for each tweet in the id_array
        const embedded_tweets = [];

        //Get the id of each tweet
        if(cryptocurrencies && screen_names){
            for(const crypto of cryptocurrencies){
                for(const name of screen_names){
                    if(this.#twitter_users[name][crypto] && Object.keys(this.#twitter_users[name][crypto]).length !== 0)
                        Array.prototype.push.apply(id_array, Object.keys(this.#twitter_users[name][crypto]));
                }
            }

            if(id_array){
                //Get the html blockquote for each id in id_array and store it in the twitter_users object
                for(const id of id_array){
                    //Check if the id exists in the object or call the api to get the embedded_tweet
                    if(this.#twitter_users[`embedded_tweets`][id])
                        embedded_tweets.push(this.#twitter_users[`embedded_tweets`][id]);
                    else{
                        const html_tweet = await this.callEmbedAPI(id);
                        embedded_tweets.push(html_tweet);
                        this.#twitter_users[`embedded_tweets`][id] = html_tweet;
                    }
                }
                return embedded_tweets;
            }
            else
                return Promise.reject(`No tweets to embed`);
        }
        else
            return Promise.reject(`The user is not following cryptocurrencies or people on twitter`);
    }

    /** This function gets the tweet id as a parameter and returns an html formatted response to display the tweet.
     * @param {String} tweet_id The id of the tweet.
     * @param {String} screen_name Optional screen name of the user.
     * @return {blockquote} Returns an html blockquote tag to display the tweet.
     * */
    async callEmbedAPI(tweet_id, screen_name = "Codex98318352"){
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