require("dotenv").config();
const Database = require('../database/Database');
const firestore_db = new Database().getInstance();

const Analyse_Average = async(SocialMedia,cryptocurrency)=>{
    return new Promise(function (resolve, reject) {
        firestore_db.getUsers(SocialMedia).onSnapshot(async (documents) => {
            documents.forEach((doc) => {
                if (typeof doc.id !== "undefined" && doc.id === cryptocurrency) {
                    const percentage_results = doc.data().Old_Average/doc.data().Average* 100;
                    const percentage = percentage_results.toFixed(2);
                    if (percentage< 100) {
                        resolve('positive ' + percentage);
                    } else if (percentage > 100) {
                        let actual = percentage -100;
                        resolve('negative '+actual);
                    } else {
                        resolve('nothing ');
                    }
                }

            })
        })
    })
}

module.exports ={Analyse_Average };