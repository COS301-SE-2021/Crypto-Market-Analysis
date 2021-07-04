const express = require("express");
const router = express.Router();
const Twitter = require(`../social_media_sites/Twitter`);
const twitter = new Twitter();

router.post('/getAllTweets', async (request, response, next) => {
    //Need to authenticate with api_token.
    try{
        const blockquotes = await twitter.getAllTweets();
        return response.status(200).json({data: blockquotes});
    }
    catch(error){
        return response.status(500).json({status: 500, error: `Something went wrong while trying to retrieve the embedded tweets: ${error}`});
    }
});

module.exports = router