const express = require("express");
const router = express.Router();
const sentiment_functions = require(`../functions/sentiment_functions`);

router.post('/getAverages', async (request, response, next) => {
    const {email, crypto_name} = request.body;

    //Check if the parameters are defined
    if (!email || !crypto_name){
        let error = new Error(`Malformed request. Please check your parameters`);
        error.status = 400;
        return next(error);
    }
    else{
        try{
            const data = await sentiment_functions.getAverages(email, crypto_name);
            return response.status(200).json({data: data});
        }
        catch (err){
            let error = new Error(err);
            error.status = 500;
            return next(error);
        }
    }

});

module.exports = router