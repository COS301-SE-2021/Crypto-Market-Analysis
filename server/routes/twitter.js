const express = require("express");
const router = express.Router();
const Twitter = require(`../social_media_sites/Twitter`);
const twitter = new Twitter().getInstance();
const User_Hash_Table = require(`../Hash_Tables/User_Hash_Table`);
const user_object = new User_Hash_Table().getInstance();

router.post('/getCryptoTweets', async (request, response) => {
    const crypto_name = request.body.crypto_name;
    const email = request.body.email;

    //Check if the request has the parameters
    if(!crypto_name || !email)
        return response.status(401).json({status: `Bad Request`, error: `Malformed request. Please check your parameters`});

    try {
        const embedded_tweets = await twitter.getCryptoTweets(email,crypto_name);
        return response.status(200).json({data: embedded_tweets})
    }
    catch(error){
        return response.status(500).json({status: 500, error: `Something went wrong while trying to retrieve the tweets: ${error}`});
    }
});

router.post('/validateScreenName', async (request, response) => {
   const screen_name = request.body.screen_name;

    //Check if the request has the parameters
    if(!screen_name)
        return response.status(401).json({status: `Bad Request`, error: `Malformed request. Please check your parameters`});

    try {
        //Validate the screen name and return the html content to follow the screen name
        const data = await twitter.validateScreenName(screen_name);
        return response.status(200).json({status: `Success`, data: data});
    }
    catch(error){
        return response.status(500).json({status: 500, error: `Something went wrong while trying to add the screen name: ${error}`});
    }
});

router.post('/follow', async (request, response) => {
     const email = request.body.email;
     const screen_name = request.body.screen_name;

    //Check if the request has the parameters
    if(!screen_name || !email)
        return response.status(401).json({status: `Bad Request`, error: `Malformed request. Please check your parameters`});

    try {
        //Add the screen name to the email specified
        await user_object.insertScreenName(email, screen_name);
        return response.status(200).json({status: `Success`, message: `Screen name successfully added`});
    }
    catch(error){
        return response.status(500).json({status: 500, error: `Something went wrong while trying to add the screen name: ${error}`});
    }
});

router.post('/unfollow', async (request, response) => {
    //The email of the user
    const email = request.body.email;
    //The screen name of the person that the user wants to unfollow
    const screen_name = request.body.screen_name;

    //Check if the request has the parameters
    if(!screen_name || !email)
        return response.status(401).json({status: `Bad Request`, error: `Malformed request. Please check your parameters`});

    try {
        //Remove the screen name from the email specified
        await user_object.removeScreenName(email, screen_name);
        return response.status(200).json({status: `Success`, message: `Screen name successfully removed`});
    }
    catch(error){
        return response.status(500).json({status: 500, error: `Something went wrong while trying to remove the screen name: ${error}`});
    }
});

router.post(`getTweetIDs`, async (request, response) => {
    try{
        const data = await twitter.getTweetIDs();
        return response.status(200).json({status: `Success`, data: data});
    }
    catch (error){
        return response.status(500).json({status: 500, error: `Something went wrong while trying to retrieve the id's: ${error}`})
    }
});

module.exports = router