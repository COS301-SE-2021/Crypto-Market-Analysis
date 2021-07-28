const Database = require('../database/Database');
const firestore_db = new Database().getInstance();


class User_Hash_Table {
    #users;
    #init;
    #initialized = false;

    constructor() {
        this.#users = {};
        this.#init = firestore_db.fetch(`Users`)
            .then(database_users => {
                if(database_users){
                    const docs = database_users.docs;
                    let cryptocurrencies = {};
                    let crypto;
                    let crypto_name;
                    let screen_name = [];
                    let subreddits = [];
                    let social_media_sites = [];
                    for (const doc of docs){
                        cryptocurrencies = {};
                        crypto = doc.data().crypto;
                        crypto_name = doc.data().crypto_name;
                        screen_name = doc.data().screen_name;
                        subreddits = doc.data().subreddits;
                        social_media_sites = doc.data().social_media_sites;
                        if(crypto){
                            for(const [index, value] of crypto.entries())
                                cryptocurrencies[value] = crypto_name[index];
                        }
                        this.#users[doc.id] = {cryptocurrencies, screen_name, subreddits, social_media_sites};
                    }
                }
        }).catch((error) => {
            console.error(error);
        });
    }

    async insertUser(key){
        if(!this.#initialized){
            await this.#init;
            this.#initialized = true;
        }

        if(key)
            this.#users[key] = {};
        else
            return Promise.reject(`Parameter is not defined`);
    }

    async searchUser(key){
        if(!this.#initialized){
            await this.#init;
            this.#initialized = true;
        }

        if(key)
            return !!this.#users[key];
        else
            return Promise.reject(`Parameter is not defined`);

    }

    async insertCrypto(key, crypto, crypto_name){
        if(!this.#initialized){
            await this.#init;
            this.#initialized = true;
        }

        //Check if the parameters are defined
        if(key && crypto && crypto_name){
            //Check if the email exists
            if(await this.searchUser(key)){
                    //Check if the crypto already exists. If it doesn't add it
                    if(!this.#users[key][`cryptocurrencies`] || !this.#users[key][`cryptocurrencies`][crypto]) {
                        try{
                            //Add crypto to the cryptocurrencies object
                            this.#users[key][`cryptocurrencies`][crypto] = crypto_name
                            firestore_db.save(`Users`, key, `crypto`, crypto, true);
                            firestore_db.save(`Users`, key, `crypto_name`, crypto_name, true);
                            return Promise.resolve(true);
                        }
                        catch (error){
                            return await Promise.reject(error);
                        }
                    }
            }
            else
                return Promise.reject(`Invalid email entered`);
        }
        else
            return Promise.reject(`Parameters are undefined`);
    }

    async insertSocialMediaSite(key, social_media){
        if(!this.#initialized){
            await this.#init;
            this.#initialized = true;
        }

        //Check if the parameters are defined
        if(key && social_media){
            //Check if the email exists
            if(await this.searchUser(key)){
                //Check if the site exists
                if(social_media === `Twitter` || social_media === `Reddit` || social_media === `4chan`){
                    //Get the social media sites array containing the list of social media platforms the user is following
                    let social_media_sites_array = this.#users[key].social_media_sites;
                    //If the screen name array doesn't exist create it
                    if(!social_media_sites_array) {
                        this.#users[key][`social_media_sites`] = [];
                        social_media_sites_array = this.#users[key].social_media_site;
                    }
                    //Check if the social media already exists in the array. If it doesn't add it
                    if(social_media_sites_array.indexOf(social_media) === -1) {
                        try{
                            //Add the social media site to the array of social media and add it to the database
                            social_media_sites_array.push(social_media);
                            firestore_db.save(`Users`, key, `social_media_sites`, social_media, true);
                            return Promise.resolve(true);
                        }
                        catch (error){
                            return await Promise.reject(error);
                        }
                    }
                }
                else
                    return Promise.reject(`User is already following the selected social media site`);
            }
            else
                return Promise.reject(`Invalid email entered`);
        }
        else
            return Promise.reject(`Parameters are undefined`);
    }

    async insertScreenName(key, screen_name){
        if(!this.#initialized){
            await this.#init;
            this.#initialized = true;
        }

        //Check if the parameters are defined
        if(key && screen_name){
            //Check if the email exists
            if(await this.searchUser(key)){
                //Get the twitter class instance
                const Twitter = require(`../social_media_sites/Twitter`);
                const twitter = new Twitter().getInstance();
                //Check if the screen name exists
                const exists = twitter.userLookup(screen_name);
                if(exists){
                    //Get the screen names array containing the list of screen names all the users are following
                    let screen_name_array = this.#users[key].screen_name;
                    //If the screen name array doesn't exist create it
                    if(!screen_name_array) {
                        this.#users[key][`screen_name`] = [];
                        screen_name_array = this.#users[key].screen_name;
                    }
                    //Check if the screen name already exists in the array. If it doesn't add it
                    if(screen_name_array.indexOf(screen_name) === -1) {
                        try{
                            //Add the screen name to the array of screen names and add it to the database
                            screen_name_array.push(screen_name);
                            firestore_db.save(`Users`, key, `screen_name`, screen_name, true);
                            return Promise.resolve(true);
                        }
                        catch (error){
                            return await Promise.reject(error);
                        }
                    }
                }
                else
                    return Promise.reject(`Screen name does not exist`);
            }
            else
                return Promise.reject(`Invalid email entered`);
        }
        else
            return Promise.reject(`Parameters are undefined`);
    }

    async removeCrypto(email, symbol){
        if(!this.#initialized){
            await this.#init;
            this.#initialized = true;
        }

        //Check if the parameters are defined
        if(email && symbol){
            //Check if the email exists
            if(await this.searchUser(email)){
                try{
                    //Check if the user is following any cryptocurrencies and if the crypto exists
                    if(this.#users[email][`cryptocurrencies`] && this.#users[email][`cryptocurrencies`][symbol]){
                            //Get the crypto name
                            const name = this.#users[email][`cryptocurrencies`][symbol];
                            //Remove the crypto from the object
                            delete this.#users[email][`cryptocurrencies`][symbol];
                            //Remove the crypto symbol from the database
                            await firestore_db.delete(`Users`, email, `crypto`, symbol);
                            //Remove the crypto name from the database
                            await firestore_db.delete(`Users`, email, `crypto_name`, name);
                            return true;
                    }
                    else
                        return Promise.reject(`User is not following the selected crypto`);
                }
                catch (error) {
                    return Promise.reject(error);
                }
            }
            else
                return Promise.reject(`Invalid email entered`);
        }
        else
            return Promise.reject(`Parameters are undefined`);
    }
    async removeScreenName(email, screen_name){
      if(!this.#initialized){
            await this.#init;
            this.#initialized = true;
        }
      
        //Holds the screen names retrieved from the user hash table in memory
        let screen_name_array;
        //The index of the screen name in the screen name array
        let index;

        //Check if the parameters are defined
        if(email && screen_name){
            //Check if the email exists
            if(await this.searchUser(email)){
                try{
                    //Get the array from the selected email
                    screen_name_array = this.#users[email][`screen_name`];
                    //Check if the array exists
                    if(screen_name_array){
                        //Get the index of the screen name in the array
                        index = screen_name_array.indexOf(screen_name);
                        //Check if the screen name is present in the array
                        if(index > -1){
                            //Remove the screen name from the array
                            screen_name_array.splice(index, 1);
                            //Remove the screen name from the database
                            await firestore_db.delete(`Users`, email, `screen_name`, screen_name);
                            return true;
                        }
                        else
                            return Promise.reject(`User is not following the selected screen_name`)
                    }
                    else
                        return Promise.reject(`User is not following the anyone on twitter`);
                }
                catch (error) {
                    return Promise.reject(error);
                }
            }
            else
                return Promise.reject(`Invalid email entered`);
        }
        else
            return Promise.reject(`Parameters are undefined`);
    }

    async removeSocialMediaSite(email, social_media){
        if(!this.#initialized){
            await this.#init;
            this.#initialized = true;
        }

        //Holds the social media sites retrieved from the user hash table in memory
        let social_media_sites_array;
        //The index of the social media in the social media sites array
        let index;

        //Check if the parameters are defined
        if(email && social_media){
            //Check if the email exists
            if(await this.searchUser(email)){
                try{
                    //Get the array from the selected email
                    social_media_sites_array = this.#users[email][`social_media_sites`];
                    //Check if the array exists
                    if(social_media_sites_array){
                        //Get the index of the social media in the array
                        index = social_media_sites_array.indexOf(social_media);
                        //Check if the screen name is present in the array
                        if(index > -1){
                            //Remove the social media from the array
                            social_media_sites_array.splice(index, 1);
                            //Remove the social media from the database
                            await firestore_db.delete(`Users`, email, `social_media_sites`, social_media);
                            return true;
                        }
                        else
                            return Promise.reject(`User is not following the selected social media platform`)
                    }
                    else
                        return Promise.reject(`User is not following any social media platforms`);
                }
                catch (error) {
                    return Promise.reject(error);
                }
            }
            else
                return Promise.reject(`Invalid email entered`);
        }
        else
            return Promise.reject(`Parameters are undefined`);
    }

    async insertSubreddits(key, subreddit){
        if(!this.#initialized){
            await this.#init;
            this.#initialized = true;
        }
  
        //Check if the parameters are defined
        if(key && subreddit){
            //Check if the email exists
            if(await this.searchUser(key)){
                /*//Get the twitter class instance
                const Twitter = require(`../social_media_sites/Twitter`);
                const reddit = new Twitter().getInstance();
                //Check if the screen name exists
                const exists = reddit.userLookup(subreddits);*/
                /*if(exists){*/
                    //Get the subreddit array containing the list of subreddits
                    let subreddits_array = this.#users[key].subreddits;
                    //If the subreddit array doesn't exist create it
                    if(!subreddits_array) {
                        this.#users[key][`subreddits`] = [];
                        subreddits_array = this.#users[key].subreddits;
                    }
                    //Check if the subreddit already exists in the array. If it doesn't add it
                    if(subreddits_array.indexOf(subreddit) === -1) {
                        try{
                            //Add the subreddit to the array of subreddits and add it to the database
                            subreddits_array.push(subreddit);
                            firestore_db.save(`Users`, key, `subreddits`, subreddit, true);
                            return Promise.resolve(true);
                        }
                        catch (error){
                            return await Promise.reject(error);
                        }
                    }
                /*}
                else
                    return Promise.reject(`Subreddits does not exist`);*/
              }
            else
                return Promise.reject(`Invalid email entered`);
        }
        else
            return Promise.reject(`Parameters are undefined`);
     }

    async fetchUser(key){
        if(!this.#initialized){
            await this.#init;
            this.#initialized = true;
        }

        if(key)
            return this.#users[key];

    }

    async getCrypto(key){
        if(!this.#initialized){
            await this.#init;
            this.#initialized = true;
        }

        if(key){
            let value = this.#users[key];
            if(value){
                value = value.cryptocurrencies;
                if(value)
                    return Object.keys(value);
                else
                    return null
            }
            else
                return null;
        }
        else
            return null;
    }

    async getCryptoName(key){
        if(!this.#initialized){
            await this.#init;
            this.#initialized = true;
        }

        if(key){
            let value = this.#users[key];
            if(value){
                value = value.cryptocurrencies;
                if(value)
                    return Object.values(value);
                else
                    return Promise.reject(`The email is not following any cryptocurrencies`);
            }
            else
                return Promise.reject(`Invalid email entered`);
        }
        else
            return Promise.reject(`No parameters are defined`);
    }

    async searchCryptoName(key, crypto_name){
        if(!this.#initialized){
            await this.#init;
            this.#initialized = true;
        }

        if(key && crypto_name){
            if(this.#users[key]) {
                const values = Object.values(this.#users[key][`cryptocurrencies`]);
                return !!values.find(element => element === crypto_name);
            }
            else
                return Promise.reject(`Invalid email entered`);
        }
        else
            return Promise.reject(`Parameters are not defined`);
    }

    async getEmails(){
        if(!this.#initialized){
            await this.#init;
            this.#initialized = true;
        }

        if(this.#users)
            return Object.keys(this.#users);
        else
            return null;
    }

    async getUsers(){
        if(!this.#initialized){
            await this.#init;
            this.#initialized = true;
        }

        return this.#users;
    }

    async getScreenName(key){
        if(!this.#initialized){
            await this.#init;
            this.#initialized = true;
        }

        if(key){
            let value = this.#users[key];
            if(value){
                value = value.screen_name;
                if(value)
                    return value;
                else
                    return null
            }
            else
                return null;
        }
        else
            return null;
    }

    async getSocialMediaSites(key){
        if(!this.#initialized){
            await this.#init;
            this.#initialized = true;
        }

        if(key){
            let value = this.#users[key];
            if(value){
                value = value.social_media_sites;
                if(value)
                    return value;
                else
                    return null
            }
            else
                return null;
        }
        else
            return null;
    }

    async searchCryptoAndSocialMedia(social_media, cryptocurrency){
        if(!this.#initialized){
            await this.#init;
            this.#initialized = true;
        }

        if(social_media && cryptocurrency){
            const emails = await this.getEmails();
            let social_media_sites;
            let cryptocurrencies;
            let followers = [];
            for(const email of emails){
                social_media_sites = await this.getSocialMediaSites(email);
                if(social_media_sites && social_media_sites.includes(social_media)){
                    cryptocurrencies = await this.getCryptoName(email);
                    if(cryptocurrencies && cryptocurrencies.includes(cryptocurrency))
                        followers.push(email);
                }
            }
            return followers;
        }
        else
            return Promise.reject(`Parameters are not defined`);
    }

    async searchScreenName(screen_name){
        if(!this.#initialized){
            await this.#init;
            this.#initialized = true;
        }

        const values = Object.values(this.#users);
        for(const value of values)
            if(value.screen_name && (value.screen_name).indexOf(screen_name) > -1)
                return true;
        return false;
    }
}

class Singleton {

    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = new User_Hash_Table();
        }
    }

    getInstance() {
        return Singleton.instance;
    }
}

module.exports = Singleton;