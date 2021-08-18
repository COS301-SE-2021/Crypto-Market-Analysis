const express = require("express");
const router = express.Router();
const Chan = require("../social_media_sites/chan");
const chan = new Chan();

router.post("/get4chanPost", async (request,response, next)=>{
    const email = request.body.email;
    if(!email || !(typeof email === 'string' || email instanceof String)){
        let error = new Error(`Malformed request. Please check your parameters`);
        error.status = 400;
        return next(error);
    }
    chan.get4chanPost().then( data => {
        return response.status(200).json(data);
    }).catch(err=>{
        let error = new Error(err);
        error.status = 500;
        return next(error);
    })
});

module.exports = router
