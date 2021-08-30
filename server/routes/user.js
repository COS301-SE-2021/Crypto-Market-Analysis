const express = require("express");
const router = express.Router();
const userFunctions =require('./userFunctions')
const Database = require('../database/Database');
const firestore_db = new Database().getInstance();
const webpush = require("web-push");
const Push_notification=require('./notification/push_notification')
const emailObject = require('nodemailer');

/** This function adds a social media site to the users account
 * @param {object} request A request object with the email and symbol.
 * @param {object} response A response object which will return the status code.
 * @return          A status code stating if the request was successful.
 * */
router.post("/followCrypto", async (request, response, next)=>{

    if(!request.body.email || !request.body.symbol || !request.body.crypto_name){
        let error = new Error(`Malformed request. Please check your parameters`);
        error.status = 400;
        return next(error);
    }
    else{
        await userFunctions.followCrypto(request.body.email,request.body.symbol,request.body.crypto_name).then(data=>{
            return response.status(200).json(data);
        }).catch(err => {
            let error = new Error(err);
            error.status = 500;
            return next(error);
        });
    }
});

router.post("/unfollowCrypto", async (request, response, next)=>{

    if(!request.body.email || !request.body.symbol){
        let error = new Error(`Malformed request. Please check your parameters`);
        error.status = 400;
        return next(error);
    }
    else{
        await userFunctions.unfollowCrypto(request.body.email,request.body.symbol).then(data => {
            return response.status(200).json(data);
        }).catch(err=>{
            let error = new Error(err);
            error.status = 500;
            return next(error);
        });
    }
});

/** This function gets the cryptos a user is following
 * @param {object} request A request object with the email and symbol.
 * @param {object} response A response object which will return the status code.
 * @return          A status code stating if the request was successful.
 * */
router.post("/getUserCryptos", async (request, response, next) => {
    if(!request.body.email){
        let error = new Error(`Malformed request. Please check your parameters`);
        error.status = 400;
        return next(error);
    }
    else {
        userFunctions.getUserCrypto(request.body.email).then(data=>{
            return response.status(200).json(data);
        }).catch(err=>{
            let error = new Error(err);
            error.status = 500;
            return next(error);
        })
    }
});

/** This function adds a social media site to the users account
 * @param {object} request A request object with the email and social_media_sites.
 * @param {object} response A response object which will return the status code.
 * @return          A status code stating if the request was successful.
 * */
router.post("/followSocialMedia",async (request, response, next)=>{
    if(!request.body.email || !request.body.social_media_sites) {
        let error = new Error(`Malformed request. Please check your parameters`);
        error.status = 400;
        return next(error);
    }
    else{
        await userFunctions.followSocialMedia(request.body.email,request.body.social_media_sites).then(data=>{
            response.status(200).json(data);
        }).catch(err => {
            let error = new Error(err);
            error.status = 500;
            return next(error);
        })
    }
});

router.post("/unfollowSocialMedia", async (request,response, next)=>{

    if(!request.body.email || !request.body.social_media_sites){
        let error = new Error(`Malformed request. Please check your parameters`);
        error.status = 400;
        return next(error);
    }
    else{
        await userFunctions.unfollowSocialMedia(request.body.email,request.body.social_media_sites).then(data => {
            return response.status(200).json(data);
        }).catch(err => {
            let error = new Error(err);
            error.status = 500;
            return next(error);
        });
    }
});

/** This function gets the social media a user is following
 * @param {object} request A request object with the email and symbol.
 * @param {object} response A response object which will return the status code.
 * @return          A status code stating if the request was successful.
 * */
router.post("/fetchUserSocialMedia", async (request, response, next) => {
    if(!request.body.email) {
        let error = new Error(`Malformed request. Please check your parameters`);
        error.status = 400;
        return next(error);
    }
    else{
        userFunctions.fetchUserSocialMedia(request.body.email).then(data=>{
            return response.status(200).json(data);
        }).catch(err => {
            let error = new Error(err);
            error.status = 500;
            return next(error);
        })
    }
});

router.post("/getCoinPredictions", async (request, response, next)=>{
    if(!request.body.email){
        let error = new Error(`Malformed request. Please check your parameters`);
        error.status = 400;
        return next(error);
    }
    else {
        userFunctions.getCoinPredictions(request.body.email).then(data=>{
            return response.status(200).json(data);
        }).catch(err=>{
            let error = new Error(err);
            error.status = 500;
            return next(error);
        })
    }
});

router.post("/getNotificationObject", async (request, response, next)=>{
    if(!request.body.email){
        let error = new Error(`Malformed request. Please check your parameters`);
        error.status = 400;
        return next(error);
    }
    else{
        await userFunctions.getNotification(request.body.email).then(data => {
            return response.status(200).json(data.data().notification);
        }).catch(() => {
            let error = new Error(`no notification`);
            error.status = 400;
            return next(error);
        });
    }
});

router.post("/setNotificationObject", async (request, response, next)=>{
    if(!request.body.email || !request.body.object){
        let error = new Error(`Malformed request. Please check your parameters`);
        error.status = 400;
        return next(error);
    }
    else {
        try{
            await userFunctions.setNotification(request.body.email, request.body.object).then(() => {
                    return response.status(200).json('data successfully saved');
                }
            )
        }
        catch (err){
            let error = new Error(err);
            error.status = 500;
            return next(error);
        }
    }
})

router.post("/storePush", async (request,response)=>{
     await userFunctions.setPush(request.body.email,request.body.object).then(data=>{
         return response.status(200).json("subs stored");
     })


});

router.post("/GETPush", async (request,response)=>{
    await userFunctions.getPush(request.body.email).then(data=>{
        return response.status(200).json(data);
    })


});

/** This function gets the social media a user is following
 * @param {object} request A request object with the email and symbol.
 * @param {object} response A response object which will return the status code.
 * @return          A status code stating if the request was successful.
 * */
router.post("/fetchUserSocialMedia", async (request, response) => {
    if(request.body.email === null) {
        return response.status(401).json({status: `error`, error: `Malformed request. Please check your parameters`});
    }
    else{
        userFunctions.fetchUserSocialMedia(request.body.email).then(data=>{
            return response.status(200).json(data);
        }).catch(err=>{
            return response(401).json({status:`error`, error: err})
        })
    }
});
router.post("/fetchAnalysis", async (request, response) => {
    if(request.body.socialmedia === null || request.body.crypto===null ) {
        return response.status(401).json({status: `error`, error: `Malformed request. Please check your parameters`});
    }
    else{
        userFunctions.getAnalysis(request.body.socialmedia,request.body.crypto).then(data=>{
            return response.status(200).json(data);
        }).catch(err=>{
            return response(401).json({status:`error`, error: err})
        })
    }
});
const webpush = require("web-push");
const Push_notification=require('./notification/push_notification')

router.post("/subscribe", async (req, res) => {
    const web_push = new Push_notification();
        web_push.setDetails();
        const subscription=req.body.object;
    const payload = JSON.stringify({ title: "You have subscribed to receive push notifications" });
    webpush
        .sendNotification(subscription, payload)
        .catch(err => console.error(err));
    res.status(201).json(subscription);

});

router.post("/sendMail", async (req, res) => {
    const sender =await emailObject.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME || 'codexteam4@gmail.com',
            pass: process.env.EMAIL_PASSWORD || 'PNeux9E^peM6s:z;'
        }
    });
    const receiver = {
        from: 'CryptoMarketAnalysis@sites.co.za',//'codexteam4@gmail.com',
        to: req.body.email,
        subject: 'Subscribed!',
        text: "You have subscribed to receive push notification and Email",
        html: "<body style=\" background-color: black;text-align: center;color: white;font-family: Arial, Helvetica, sans-serif; \">\n" +
            "\n" +
            "<h1>Subscription</h1>\n" +
            "<p>You have subscribed to receive push notification Alert</p>\n" +
            "<p></p>\n" +
            "<img src=\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiMQS1-LtJdXdKYhcC1WJ9pQjE9SOksrUc7IynK7z1ybmLsRx6Rmj4OIvRxtyYXj5PSGU&usqp=CAU\" alt=\"Avatar\" style=\"width:200px\">\n" +
            "\n" +
            "</body>",
    };
    await sender.sendMail(receiver, function(error, data) {
        if (error) {
            res.status(401).json(error+" Error Sending Email");
        } else {
            res.status(201).json('Email sent: ' + data.response);
        }
    })
    res.status(201).json("Email has been sent!");
});

module.exports = router
