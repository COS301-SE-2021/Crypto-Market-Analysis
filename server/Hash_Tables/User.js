const Database = require('../database/Database');
const firestore_db = new Database().getInstance();

let users = {};

class User {

}
class Singleton {

    constructor() {
        if (!Singleton.instance) {
            firestore_db.fetch(`Users`).then(database_users => {
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
                        users[doc.id] = cryptocurrencies;
                    }
                }
            });
            Singleton.instance = new User();
        }
    }

    getInstance() {
        return Singleton.instance;
    }
}