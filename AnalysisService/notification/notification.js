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
            pass: process.env.EMAIL_PASSWORD || 'PNeux9E^peM6s:z;'
        }
    });
    const receiver = {
        from: 'codexteam4@gmail.com',
        to: 'mojohnnylerato@gmail.com',
        subject: 'Cryptocurrency Notification',
        text: results,
        html: results,
    };
    await sender.sendMail(receiver, function(error, data){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + data.response);
            return  new Promise(function (resolve, reject) {
                firestore_db.getUsers('Users').onSnapshot(async (documents) => {
                   await documents.forEach((doc) => {
                        if (typeof doc.id !== "undefined" && doc.id === email) {
                            let myObj = {};
                            let newObj = {};
                            let date = String(new Date());
                            let read = false;
                            if (typeof doc.data().notification !=="undefined")
                            {
                                myObj=doc.data().notification;
                            }
                            newObj[date] = {"Email":results, 'Read': read};
                            let cmyObj = Object.assign({},myObj,newObj);
                            const notify ={
                                notification:cmyObj
                            }
                            firestore_db.saveData('Users',email,notify);

                        }
                    })
                })

            })



        }
    });
}
const followers = async(cryptocurrency,results)=>{
    return  new Promise(async function (resolve, reject) {
        await firestore_db.getUsers('Users').onSnapshot((documents) => {
            documents.forEach(async (doc) => {
                console.log(doc.data().crypto_name); // For data inside doc
                if (typeof doc.data().crypto_name !== "undefined" && doc.data().crypto_name.includes(cryptocurrency)) {

                    await send_email(doc.id, results);
                    //const subscription = firestore_db.fetchPushNotification(doc.id);

                    web_push.setDetails();
                    let subscription = {};
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
                // console.log(doc.id); // For doc name
            })
        });
    })
}
module.exports = {followers}