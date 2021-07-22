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
                    let cryptocurrencies;
                    let crypto;
                    let crypto_name;
                    let screen_name;
                    for (const doc of docs){
                        cryptocurrencies = {};
                        crypto = doc.data().crypto;
                        crypto_name = doc.data().crypto_name;
                        screen_name = doc.data().screen_name;
                        if(crypto){
                            for(const [index, value] of crypto.entries())
                                cryptocurrencies[value] = crypto_name[index];
                        }
                        this.#users[doc.id] = {cryptocurrencies, screen_name};
                    }
                }
        }).catch((error) => {
            console.error(error);
        });
    }

    async insertUser(key) {
        if(!this.#initialized){
            await this.#init;
            this.#initialized = true;
        }

        if (key)
            this.#users[key] = {};
    }

    async insertCrypto(key, crypto, crypto_name){
        if(!this.#initialized){
            await this.#init;
            this.#initialized = true;
        }

        let value = await this.fetchUser(key);
        if(value){
            value = value.cryptocurrencies;
            if(value){
                if(!value[crypto])
                    value[crypto] = crypto_name;
            }
            else
                value[crypto] = crypto_name
        }
    }

    async insertScreenName(key, screen_name){
        if(!this.#initialized){
            await this.#init;
            this.#initialized = true;
        }

        if(key && screen_name){
            const Twitter = require(`./Twitter_Hash_Table`);
            const twitter = new Twitter().getInstance();
            const exists = twitter.userLookup(screen_name);
            if(exists){
                const screen_name_array = this.#users[key].screen_name;
                if(screen_name_array.indexOf(screen_name) === -1) {
                    try{
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
                    return null
            }
            else
                return null;
        }
        else
            return null;
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