const express = require("express");
const router = express.Router();
const Reddit = require("../social_media_sites/Reddit");
const reddit = new Reddit();

router.post("/coinRedditPost", async (request,response, next)=>{
    if(!request.body.email|| !request.body.coin){
        let error = new Error(`Malformed request. Please check your parameters`);
        error.status = 400;
        return next(error);
    }
    else{
        reddit.coinRedditPost(request.body.coin).then(data=>{
            response.status(200).json(data);
        }).catch(err=>{
            let error = new Error(err);
            error.status = 500;
            return next(error);
        })
    }
});

module.exports = router
