const emailObject = require('nodemailer');
const Database = require('../database/Database');
const firestore_db = new Database().getInstance();
require('dotenv').config();
const webpush = require("web-push");
const analysis = require('../analysisFunction');
const Push_notification=require('./push_notification')
const web_push = new Push_notification();
const send_email= async(email,results)=>{
    const sender =await emailObject.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME ,
            pass: process.env.EMAIL_PASSWORD
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
            return error;
        } else {

        }
    });
}
const followers = async(cryptocurrency,results)=>{

        let i=0;
        return  new Promise(function (resolve, reject) {
            (async () => {
                const docdata =await analysis.get_Doc_by_User_id(cryptocurrency)
                for(let mydata of docdata)
                {
                     let myObj = {};
                     let newObj = {};
                     let date = String(new Date());
                     let read = false;
                     if (typeof mydata.notification !== "undefined") {
                             myObj = mydata.notification;
                     }
                     newObj[date] = {"Email": results, 'Read': read};
                     let cmyObj = Object.assign({}, myObj, newObj);
                     const notify = {
                         notification: cmyObj
                     }
                    await firestore_db.saveData('Users', mydata.user_id, notify);
                   //  await send_email(mydata.user_id, results);
                   //  let subscription={}
                   //  web_push.setDetails();
                   //  await firestore_db.fetchPushNotification(mydata.user_id).then(data => {
                   //  try {
                   //      if(typeof mydata.subs !== 'undefined'){
                   //          subscription = mydata.subs;
                   //      }
                   //
                   //  } catch {
                   //      subscription = {}
                   //  }
                   //
                   //  });
                   //  console.log('showing subscription')
                   //  console.log(subscription)
                   //  if (Object.keys(subscription).length !== 0) {
                   //        const payload = JSON.stringify({title: results});
                   //           webpush
                   //             .sendNotification(subscription, payload)
                   //               .catch(err => console.error(err));
                   // }

                }
                resolve('The function is done');
            })()
        })

}
module.exports = {followers}