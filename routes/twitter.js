const express = require("express");
const router = express.Router();
const Twitter = require(`../functions/Twitter`);
const twitter = new Twitter().getInstance();
const User_Hash_Table = require(`../functions/User_Hash_Table`);
const user_object = new User_Hash_Table().getInstance();

router.post('/getCryptoTweets', async (request, response, next) => {
    const crypto_name = request.body.crypto_name;
    const email = request.body.email;

    //Check if the request has the parameters
    if(!crypto_name || !email){
        let error = new Error(`Malformed request. Please check your parameters`);
        error.status = 400;
        return next(error);
    }

    try {
        const embedded_tweets = await twitter.getCryptoTweets(email,crypto_name);
        return response.status(200).json({data: embedded_tweets});
    }
    catch(err){
        let error = new Error(err);
        error.status = 500;
        return next(error);
    }
});

router.post('/validateScreenName', async (request, response, next) => {
   const screen_name = request.body.screen_name;
   const email = request.body.email;

    //Check if the request has the parameters
    if(!screen_name || !email) {
        let error = new Error(`Malformed request. Please check your parameters`);
        error.status = 400;
        return next(error);
    }

    try {
        //Validate the screen name and return boolean variable to indicate if it exists or not
        const data = await twitter.validateScreenName(screen_name, email);
        return response.status(200).json({status: `Success`, data: data});
    }
    catch(err){
        let error = new Error(err);
        error.status = 500;
        return next(error);
    }
});

router.post('/follow', async (request, response, next) => {
     const email = request.body.email;
     const screen_name = request.body.screen_name;

    //Check if the request has the parameters
    if(!screen_name || !email){
        let error = new Error(`Malformed request. Please check your parameters`);
        error.status = 400;
        return next(error);
    }

    try {
        //Add the screen name to the email specified
        await user_object.insertScreenName(email, screen_name);
        return response.status(200).json({status: `Success`, message: `Screen name successfully added`});
    }
    catch(err){
        let error = new Error(err);
        error.status = 500;
        return next(error);
    }
});

router.post('/unfollow', async (request, response, next) => {
    //The email of the user
    const email = request.body.email;
    //The screen name of the person that the user wants to unfollow
    const screen_name = request.body.screen_name;

    //Check if the request has the parameters
    if(!screen_name || !email){
        let error = new Error(`Malformed request. Please check your parameters`);
        error.status = 400;
        return next(error);
    }

    try {
        //Remove the screen name from the email specified
        await user_object.removeScreenName(email, screen_name);
        return response.status(200).json({status: `Success`, message: `Screen name successfully removed`});
    }
    catch(err){
        let error = new Error(err);
        error.status = 500;
        return next(error);
    }
});

router.post('/getTweetIDs', async (request, response, next) => {

    // The email of the user
    const email = request.body.email;
    // The name of the cryptocurrency
    const crypto_name = request.body.crypto_name;

    //Check if the request has the parameters
    if(!crypto_name || !email){
        let error = new Error(`Malformed request. Please check your parameters`);
        error.status = 400;
        return next(error);
    }

    try{
        const data = await twitter.getTweetIDs(email, crypto_name);
        return response.status(200).json({status: `Success`, data: data});
    }
    catch(err){
        let error = new Error(err);
        error.status = 500;
        return next(error);
    }
});

module.exports = router