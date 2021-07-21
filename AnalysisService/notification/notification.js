const emailObject = require('nodemailer');

const send_email= async(email)=>{
    const sender = emailObject.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    const receiver = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'Cryptocurrency Notification',
        text: "Bitcoin has changed",
        html: "<b>Hello world?</b>",
    };
    await sender.sendMail(receiver, function(error, data){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + data.response);
        }
    });
}
module.exports = {send_email}