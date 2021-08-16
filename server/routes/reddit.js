const express = require("express");
const router = express.Router();
const Reddit = require("../social_media_sites/Reddit");
const reddit = new Reddit();
const userFunctions = require("./userFunctions");

router.post("/getRedditPost", async (request,response, next)=>{
    if(!request.body.email){
        let error = new Error(`Malformed request. Please check your parameters`);
        error.status = 400;
        return next(error);
    }
    else{
        reddit.getRedditPost(request.body.email).then(data=>{
            response.status(200).json(data);
        }).catch(err=>{
            let error = new Error(err);
            error.status = 500;
            return next(error);
        })
    }
});

router.post("/unfollowSubreddit", async (request,response, next)=>{
    if(request.body.email === null || request.body.subreddit === null){
        let error = new Error(`Malformed request. Please check your parameters`);
        error.status = 400;
        return next(error);
    }
    else{
        await reddit.unfollowSubreddit(request.body.email,request.body.subreddit).then(data=>{
            return response.status(200).json(data);
        }).catch(err=>{
            let error = new Error(err);
            error.status = 500;
            return next(error);
        });
    }
});

router.post("/followSubreddit",async (request,response, next)=>{
    if(!request.body.email || !request.body.social_media_sites){
        let error = new Error(`Malformed request. Please check your parameters`);
        error.status = 400;
        return next(error);
    }
    else{
        await reddit.followSubreddit(request.body.email,request.body.social_media_sites).then(data=>{
            response.status(200).json(data);
        }).catch(err=>{
            let error = new Error(err);
            error.status = 500;
            return next(error);
        })
    }
});

router.post("/fetchUserSubreddits", async (request, response, next) => {

    if(request.body.email === null) {
        let error = new Error(`Malformed request. Please check your parameters`);
        error.status = 400;
        return next(error);
    }
    else{
        reddit.fetchUserSubreddits(request.body.email).then(data=>{
            return response.status(200).json(data);
        }).catch(err=>{
            let error = new Error(err);
            error.status = 500;
            return next(error);
        })
    }
});

router.post("/getUserSubreddits", async (request, response, next) => {
    if(!request.body.email){
        let error = new Error(`Malformed request. Please check your parameters`);
        error.status = 400;
        return next(error);
    }
    else {
        reddit.getUserSubreddits(request.body.email).then(data=>{
            return response.status(200).json(data);
        }).catch(err=>{
            let error = new Error(err);
            error.status = 500;
            return next(error);
        })
    }
});

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
