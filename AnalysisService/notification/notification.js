const emailObject = require('nodemailer');
const Database = require('../database/Database');
const firestore_db = new Database().getInstance();
require('dotenv').config();
const send_email= async(email,results)=>{
    const sender = emailObject.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
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
            console.log(error);
        } else {
            console.log('Email sent: ' + data.response);
        }
    });
}
const followers = async(cryptocurrency,results)=>{
    firestore_db.getUsers('Users').onSnapshot((documents) => {
        documents.forEach((doc) => {
            console.log(doc.data().crypto_name); // For data inside doc
            if(typeof doc.data().crypto_name !== "undefined" && doc.data().crypto_name.includes(cryptocurrency))
            {
                send_email(doc.id,results);
            }
            console.log(doc.id); // For doc name
        })
    });
}
module.exports = {followers}