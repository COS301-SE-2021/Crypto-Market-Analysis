const emailObject = require('nodemailer');
const Database = require('../database/Database');
const firestore_db = new Database().getInstance();
require('dotenv').config();
const webpush = require("web-push");
const Push_notification=require('./push_notification')
const web_push = new Push_notification();
const send_email= async(email,results)=>{
    const sender =await emailObject.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME || 'codexteam4@gmail.com',
            pass: process.env.EMAIL_PASSWORD || 'Y' +
                ''
        }
    });
    const receiver = {
        from: 'codexteam4@gmail.com',
        to: email,
        subject: 'Cryptocurrency Notification',
        text: results,
        html: results,
    };
    await sender.sendMail(receiver, function(error, data){
        if (error) {
            return error;
        } else {

        }
    });
}
const followers = async(cryptocurrency,results)=>{
    let i=0;
    return  new Promise(async function (resolve, reject) {
        await firestore_db.getUsers('Users').onSnapshot((documents) => {

                documents.forEach(async (doc) => {
                    if (typeof doc.data().crypto_name !== "undefined" && doc.data().crypto_name.includes(cryptocurrency)) {
                        let myObj = {};
                        let newObj = {};
                        let date = String(new Date());
                        let read = false;
                        if (typeof doc.data().notification !== "undefined") {
                            myObj = doc.data().notification;
                        }
                        newObj[date] = {"Email": results, 'Read': read};
                        let cmyObj = Object.assign({}, myObj, newObj);
                        const notify = {
                            notification: cmyObj
                        }
                        firestore_db.saveData('Users', doc.id, notify);
                        await send_email(doc.id, results);
                        let subscription={}
                        web_push.setDetails();
                        await firestore_db.fetchPushNotification(doc.id).then(data => {
                            try {
                                subscription = data.data().subs;
                            } catch {
                                subscription = {}
                            }

                        });
                        if (Object.keys(subscription).length !== 0) {
                            const payload = JSON.stringify({title: results});
                            webpush
                                .sendNotification(subscription, payload)
                                .catch(err => console.error(err));
                        }




                    }
                })

        });
    })
}
module.exports = {followers}