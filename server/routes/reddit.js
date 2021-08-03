const express = require("express");
const router = express.Router();
const Reddit = require("../social_media_sites/Reddit");

router.post("/getRedditPost", async (request,response)=>{
    if(request.body.email === null)
        return response.status(401).json({status: `error`, error: `Malformed request. Please check your parameters`});
    else{
        userFunctions.getRedditPost(request.body.email).then(data=>{
            response.status(200).json(data);
        }).catch(err=>{
            return response(401).json({status:`error`, error: err})
        })
    }
});


module.exports = router