const Database = require('../database/Database');
const firestore_db = new Database().getInstance();

class User {
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
                    for (const doc of docs){
                        cryptocurrencies = {};
                        crypto = doc.data().crypto;
                        crypto_name = doc.data().crypto_name;
                        if(crypto){
                            for(const [index, value] of crypto.entries())
                                cryptocurrencies[value] = crypto_name[index];
                        }
                        this.#users[doc.id] = cryptocurrencies;
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
        if(!value[crypto])
            value[crypto] = crypto_name;
        console.log(this.#users);
    }

    async fetchUser(key){
        if(!this.#initialized){
            await this.#init;
            this.#initialized = true;
        }

        if(key) {
            return this.#users[key];
        }
    }

}
class Singleton {

    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = new User();
        }
    }

    getInstance() {
        return Singleton.instance;
    }
}