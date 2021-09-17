require("dotenv").config();
const admin = require('firebase-admin');
const serviceAccount = require('./firebase.js');

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
    async fetchPushNotification(email){
        try{
            return this.#db.collection('Subscribers').doc(email).get();
        }
        catch {
            return {'not subscribed':'email'};
        }
        // .then(data=>{
        //     // console.log('showing data')
        //    // console.log(data.data().subing);
        //         return data.data().subing;
        //     });
    }
    saveData(collectionPath,documentName,object)
    {
        try{
            this.#db.collection(collectionPath).doc(documentName).set(object, {merge:true});
        }
        catch(e) {
            console.error(`An error occurred while connecting to the database: \n${e}`);
        }
    }
    getUsers(collectionPath){
        return this.#db.collection(collectionPath);
    }
    getField(collectionPath,documentName)
    {
        return this.#db.collection(collectionPath).doc(documentName).get();
    }
    saveRateChange(collection, document, object)
    {
        try{
            this.#db.collection(collection).doc(document).set(object, {merge:true});
        }
        catch(e) {
            console.error(`error occurred while saving rate change: \n${e}`);
        }

    }
    fetch(collectionPath, documentName, field)
    {
        if(field === null && collectionPath !==undefined){
            try{
                return this.#db.collection(collectionPath).doc(documentName).get().then();
            }
            catch(e) {
                console.error(`An error occurred while connecting to the database: \n${e}`);
            }
        }
        else if(documentName===undefined)
        {
            try{
                console.log(this.#db.collection(collectionPath).get())
                return this.#db.collection(collectionPath).get().then();
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
