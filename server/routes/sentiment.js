const express = require("express");
const router = express.Router();
const sentiment_functions = require(`../functions/sentiment_functions`);
const {check, validationResult} = require('express-validator');

router.post('/getAverages', [
    check('email').notEmpty().withMessage('Malformed request. Please check your parameters'),
    check('crypto_name').notEmpty().withMessage('Malformed request. Please check your parameters'),
],async (request, response, next) => {
    const errors = validationResult(request);

    if(!errors.isEmpty()){
        return response.status(400).json({errors: errors.array() });
    }

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