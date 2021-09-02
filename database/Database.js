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
     * @param merge
     * */
    save(collectionPath, documentName, field, fieldsData, merge = false){
        let data = {[field]: fieldsData}

        if(merge){
            try{
                this.fetch(collectionPath, documentName, field).then(oldField => {
                    if(!oldField)
                        oldField = [];
                    oldField.push(fieldsData);
                    data = {[field]: oldField};
                    this.#db.collection(collectionPath).doc(documentName).set(data, {merge:true}).then();
                }).catch(error => {
                    return Promise.reject(error);
                })
            }
            catch(e) {
                console.error(`An error occurred while connecting to the database: \n${e}`);
            }
        }
        else
            this.#db.collection(collectionPath).doc(documentName).set(data, {merge:true}).then();
    }
    async fetchNotification(email){
        if(email !== 'undefined')
            return this.#db.collection('Users').doc(email).get();
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
    async storeNotification(email,object){
        if(email && object) {
            const notification_object ={
                notification:object
            }
           try{
                await this.#db.collection('Users').doc(email).update(notification_object);
            }
            catch (err){
                return Promise.reject(err);
            }
        }
        else
            return Promise.reject(`Parameters are undefined`);

    }
    async setPushNotification(email,object){
            console.log('something')
            const notification_object ={
                subs:object
            }
            try{await this.#db.collection('Subscribers').doc(email).set(notification_object);
            }
            catch (err){console.log('error saving to database')}


    }
    async fetch(collectionPath, documentName = null, field = null)
    {
        if(documentName === null)
        {
            try{
                return this.#db.collection(collectionPath).get().then();
            }
            catch(e) {
                console.error(`An error occurred while connecting to the database: \n${e}`);
            }

        }
        else if(field === null && collectionPath !==undefined){
          try{
                return this.#db.collection(collectionPath).doc(documentName).get().then();
            }
            catch(e) {
                console.error(`An error occurred while connecting to the database: \n${e}`);
            }
          
        }
        else if(field === null){
            try{
                return this.#db.collection(collectionPath).doc().get().then();
            }
            catch(e) {
                console.error(`An error occurred while connecting to the database: \n${e}`);
            }
        }
        else{
            try{
                const doc = await this.#db.collection(collectionPath).doc(documentName).get(field);
                if(doc){
                    const entries = await Object.entries(doc.data());
                    for(const entry of entries){
                        if(entry[0] === field)
                            return entry[1]
                    }
                }

                return null;
            }
            catch(e) {
                return null;
            }
        }
    }

    async delete(collectionPath, documentPath, field, fieldData){
        //Delete a specific value from a field. Only works when the field is an array or object
        if(collectionPath && documentPath && field && fieldData){
            //Get the field from the database
            const oldField = await this.fetch(collectionPath, documentPath, field);
            //Check if the field is an array
            if(Array.isArray(oldField)){
                //Check if the value exists in the array
                const index = oldField.indexOf(fieldData);
                if(index !== -1){
                    try{
                        //Delete the value from the array
                        oldField.splice(index, 1);
                        if(oldField){
                            try{
                                //Save the new array in the field
                                this.save(collectionPath, documentPath, field, oldField);
                            }
                            catch (error){
                                return Promise.reject(error)
                            }
                        }
                        return true;
                    }
                    catch (error){
                        return Promise.reject(error);
                    }
                }
                else
                    return Promise.reject(`Value does not exist within the field`);

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