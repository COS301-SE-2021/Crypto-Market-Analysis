const express = require("express");
const router = express.Router();
const Twitter = require(`../social_media_sites/Twitter`);
const twitter = new Twitter();

router.post('/getAllTweets', async (request, response, next) => {
    //Need to authenticate with api_token.
    try{
        //Get all the tweets from the people the user is following by a twitter api call
        const tweets = await twitter.getAllTweets();
        return response.status(200).json({data: tweets});
    }
    catch(error){
        return response.status(500).json({status: 500, error: `Something went wrong while trying to retrieve the embedded tweets: ${error}`});
    }
});

router.post('/getCryptoTweets', (request, response) => {
    const crypto_name = request.crypto_name;
    try {
        const tweets = await twitter.getCryptoTweets();
        return response.status(200).json({data: tweets})
    }
    catch(error){
        return response.status(500).json({status: 500, error: `Something went wrong while trying to retrieve the tweets: ${error}`});
    }
});

module.exports = router