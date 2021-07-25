const express = require("express");
const router = express.Router();
const Twitter = require(`../social_media_sites/Twitter`);
const twitter = new Twitter().getInstance();

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

router.post('/follow', async (request, response) => {

});

module.exports = router