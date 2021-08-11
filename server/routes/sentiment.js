const express = require("express");
const router = express.Router();

router.post('/getAverages', async (request, response, next) => {
    const {crypto_name, social_media_site} = request.body;

    //Check if the parameters are defined
    if (!crypto_name || !social_media_site){
        let error = new Error(`Malformed request. Please check your parameters`);
        error.status = 400;
        return next(error);
    }

});

module.exports = router