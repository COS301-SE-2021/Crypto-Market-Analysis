const emailObject = require('nodemailer');
const Database = require('../database/Database');
const firestore_db = new Database().getInstance();
require('dotenv').config();
const send_email= async(email,results)=>{
    const sender = emailObject.createTransport({
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
                    documents.forEach((doc) => {
                        if (typeof doc.id !== "undefined" && doc.id === email) {
                            let notification_data =[];
                            if (typeof doc.data().notification !=="undefined")
                            {
                                notification_data=doc.data().notification;
                            }
                            console.log('Displaying notification data');
                            console.log(notification_data);
                            let arrayOfNotification=doc.data().notification;
                            const date = String(new Date());
                            let notificationLine ='Cryptocurrency Notification'+'='+ results +'='+date;
                            arrayOfNotification.push(notificationLine)
                            const notify ={
                                notification:arrayOfNotification
                            }
                            firestore_db.saveData('Users','mojohnnylerato@gmail.com',notify);
                            resolve('success');
                        }
                    })
                })

            })



        }
    });
}
const followers = async(cryptocurrency,results)=>{
    let i=1;
    firestore_db.getUsers('Users').onSnapshot((documents) => {
        documents.forEach((doc) => {
            console.log(doc.data().crypto_name); // For data inside doc
            if(typeof doc.data().crypto_name !== "undefined" && doc.data().crypto_name.includes(cryptocurrency))
            {

                if(i ===1){
                    i=2;
                    send_email(doc.id,results);
                }

            }
            console.log(doc.id); // For doc name
        })
    });
}
module.exports = {followers}