const express = require("express");
const router = express.Router();
const Reddit = require("../social_media_sites/chan");
const userFunctions = require("./userFunctions");

router.post("/get4chanPost", async (request,response, next)=>{
    const email = request.body.email;
    if(!email || !(typeof email === 'string' || email instanceof String)){
        let error = new Error(`Malformed request. Please check your parameters`);
        error.status = 400;
        return next(error);
    }
    userFunctions.get4chanPost().then( tweets => {
        return response.status(200).json(tweets);
    }).catch(err=>{
        let error = new Error(err);
        error.status = 500;
        return next(error);
    })
});

module.exports = router
