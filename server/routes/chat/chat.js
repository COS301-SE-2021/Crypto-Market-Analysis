const express = require("express");
const router = express.Router();
const chat = require("../../functions/chat");
const uniqid = require('uniqid');


router.post("/returnPost", async (request, response, next)=>{
    const email = request.body.email;
    const postId = request.body.postId;

    if(!email || !postId){
        let error = new Error(`Malformed request. Please check your parameters`);
        error.status = 400;
        return next(error);
    }
    else{
        await chat.returnPost(email, postId).then(data=>{
            return response.status(200).json(data);
        }).catch(err => {
            let error = new Error(err);
            error.status = 500;
            return next(error);
        });
    }
});

router.post("/getPost", async (request, response, next)=>{
    const email = request.body.email;
    const postId = request.body.postId;

    if(!email || !postId){
        let error = new Error(`Malformed request. Please check your parameters`);
        error.status = 400;
        return next(error);
    }
    else{
        await chat.getPost(email, postId).then(data=>{
            return response.status(200).json(data);
        }).catch(err => {
            let error = new Error(err);
            error.status = 500;
            return next(error);
        });
    }
});

router.post("/getUserLikedPosts", async (request, response, next)=>{
    const email = request.body.email;

    if(!email){
        let error = new Error(`Malformed request. Please check your parameters`);
        error.status = 400;
        return next(error);
    }
    else{
        await chat.getUserLikedPosts(email).then(data=>{
            return response.status(200).json(data);
        }).catch(err => {
            let error = new Error(err);
            error.status = 500;
            return next(error);
        });
    }
});

router.post("/getUserDislikedPosts", async (request, response, next)=>{
    const email = request.body.email;

    if(!email){
        let error = new Error(`Malformed request. Please check your parameters`);
        error.status = 400;
        return next(error);
    }
    else{
        await chat.getUserDislikedPosts(email).then(data=>{
            return response.status(200).json(data);
        }).catch(err => {
            let error = new Error(err);
            error.status = 500;
            return next(error);
        });
    }
});

router.post("/postReply", async (request, response, next)=>{
    const postId = request.body.postId;
    const owner = request.body.owner;
    const room = request.body.room;
    const body = request.body.body;
    const time = request.body.time;


    if(!owner){
        let error = new Error(`Malformed request. Please check your parameters`);
        error.status = 400;
        return next(error);
    }
    else{
        await chat.postReply(postId,owner,room,time,body).then(data=>{
            return response.status(200).json(data);
        }).catch(err => {
            let error = new Error(err);
            error.status = 500;
            return next(error);
        });
    }
});



router.post("/getAllChats", async (request, response, next)=>{
    const owner = request.body.owner;
    const room = request.body.room;

    if(!owner || !room){
        let error = new Error(`Malformed request. Please check your parameters`);
        error.status = 400;
        return next(error);
    }
    else{
        await chat.getAllChats(owner, room).then(data=>{
            return response.status(200).json(data);
        }).catch(err => {
            let error = new Error(err);
            error.status = 500;
            return next(error);
        });
    }
});

router.post("/postMessage", async (request, response, next)=>{

    const postId = uniqid();
    const owner = request.body.owner;
    const room = request.body.room;
    const title = request.body.title;
    const body = request.body.body;
    const time = request.body.time;
    const like = 0;
    const dislike = 0;
    const sentiment = request.body.sentiment;
    console.log(request.body.sentiment);

    if(!owner){
        let error = new Error(`Malformed request. Please check your parameters`);
        error.status = 400;
        return next(error);
    }
    else{
        await chat.postMessage(postId,owner,title,body,time,like,dislike,sentiment,room).then(data=>{
            return response.status(200).json(data);
        }).catch(err => {
            let error = new Error(err);
            error.status = 500;
            return next(error);
        });
   }
});


router.post("/postReact", async (request, response, next)=>{
    const owner = request.body.owner;
    const react = request.body.react;
    const postId = request.body.postId;
    const room = request.body.room;

    if(!owner || !react || !postId){
        let error = new Error(`Malformed request. Please check your parameters`);
        error.status = 400;
        return next(error);
    }
    else{
        await chat.postReact(owner, react, postId,room).then(data=>{
            return response.status(200).json(data);
        }).catch(err => {
            let error = new Error(err);
            error.status = 500;
            return next(error);
        });
    }
});

router.post("/totalPosts", async (request, response, next)=>{
    const owner = request.body.owner;
    const room = request.body.room;

    if(!owner){
        let error = new Error(`Malformed request. Please check your parameters`);
        error.status = 400;
        return next(error);
    }
    else{
        await chat.totalPosts(owner, room).then(data=>{
            return response.status(200).json(data);
        }).catch(err => {
            let error = new Error(err);
            error.status = 500;
            return next(error);
        });
    }
});
module.exports = router
