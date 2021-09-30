const express = require("express");
const router = express.Router();
const {getPostsInfo} = require("../functions/chat.js");

router.post('/getPostsInfo', async (request, response, next) => {
    const {email} = request.body;

    //Check if the request has the parameters
    if(!email){
        let error = new Error(`Malformed request. Please check your parameters`);
        error.status = 400;
        return next(error);
    }
    else{
        try{
            const postsInfo = await getPostsInfo(email);
            return response.status(200).json({data: postsInfo});    
        }
        catch(err){
            let error = new Error(err);
            error.status = 500;
            return next(error);
        }
    }
});

module.exports = router