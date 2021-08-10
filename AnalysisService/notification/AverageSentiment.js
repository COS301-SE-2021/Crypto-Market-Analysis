const Database = require('../database/Database');
const firestore_db = new Database().getInstance();

const Analyse_Average = async(SocialMedia,cryptocurrency)=>{
    return new Promise(function (resolve, reject) {
        firestore_db.getUsers(SocialMedia).onSnapshot(async (documents) => {
            documents.forEach((doc) => {
                if (typeof doc.id !== "undefined" && doc.id === cryptocurrency) {
                    const difference = doc.data().Average - doc.data().Old_Average;

                    if (difference < 0) {
                        resolve('negative');
                    } else if (difference > 0) {
                        resolve('positive');
                    } else {
                        resolve('nothing');
                    }
                }

            })
        })
    })
}
Analyse_Average('Twitter','Bitcoin').then(data=>{
    console.log(data);
}).catch(err=>{console.log(err)})
module.exports ={Analyse_Average };