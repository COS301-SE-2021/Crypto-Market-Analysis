const express = require("express");
const router = express.Router();
const Reddit = require("../social_media_sites/chan");

router.post("/get4chanPost", async (request,response)=>{
    const email = request.body.email;
    if(!email || !(typeof email === 'string' || email instanceof String))
        return response.status(401).json({status: `Bad Request`, error: `Malformed request. Please check your parameters`});
    userFunctions.get4chanPost().then( tweets => {
        return response.status(200).json(tweets);
    }).catch(err=>{
        return response(401).json({status:`error`, error: err})
    })
});


module.exports = router