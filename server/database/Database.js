const admin = require('firebase-admin');
const serviceAccount = require('./firebase.json');

/** Initializes the database*/
const initialize = () => {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

class Database {

    #db;

    /** Starts the database */
    constructor() {
        initialize();
        this.#db = admin.firestore();
    }

    /** Sets the fields in the collection name provided.
     * @param {String} collectionPath Name of the collection
     * @param {String} documentName Name of the document in the collection
     * @param {String} field The field to update in the document
     * @param {any} fieldsData The data of the updated field
     * */
    save(collectionPath, documentName, field, fieldsData){
        let data = {[field]: fieldsData}

        try{
            this.#db.collection(collectionPath).doc(documentName).set(data, {merge:true}).then();
        }
        catch(e) {
            console.error(`An error occurred while connecting to the database: \n${e}`);
        }
    }

    fetch(collectionPath, documentName = null, field = null)
    {
        if(documentName === null){
            try{
                return this.#db.collection(collectionPath).get().then();
            }
            catch(e) {
                console.error(`An error occurred while connecting to the database: \n${e}`);
            }
        }
        else if(field === null){
            console.log(`this is the field`);
            try{
                return this.#db.collection(collectionPath).doc(documentName).get().then();
            }
            catch(e) {
                console.error(`An error occurred while connecting to the database: \n${e}`);
            }
        }
        else{
            try{
                return this.#db.collection(collectionPath).doc(documentName).get(field).then();
            }
            catch(e) {
                console.error(`An error occurred while connecting to the database: \n${e}`);
            }
        }
    }

    async getUser(email){
        let error = 0;
        await admin.auth().getUserByEmail(email).then(() => {error = 0;}).catch((err) => {error = err;})
        return error;
    }
}

class Singleton {

    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = new Database();
        }
    }

    getInstance() {
        return Singleton.instance;
    }
}

module.exports = Singleton;