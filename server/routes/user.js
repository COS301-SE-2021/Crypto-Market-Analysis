const express = require("express");
const router = express.Router();
const Database = require('../database/Database');
const firestore_db = new Database().getInstance();

/** This function adds a social media site to the users account
 * @param {object} request A request object with the email and symbol.
 * @param {object} response A response object which will return the status code.
 * @return          A status code stating if the request was successful.
 * */
router.post("/followCrypto", async (request,response)=>{

    if(request.body.email === null || request.body.symbol === null)
        return response.status(401).json({status: `error`, error: `Malformed request. Please check your parameters`});
    else{
        const email = request.body.email;
        const symbol = [request.body.symbol];
        let error = await firestore_db.getUser(request.body.email);
        if(error !== 0)
            return response.status(401).json({status: `error`, error: error});
        else {
            firestore_db.save(`Users`, email, `crypto`, symbol);
            return response.status(200).json({status: `Ok`, message: `The crypto has successfully been added.`});
        }
    }
});

/** This function adds a social media site to the users account
 * @param {object} request A request object with the email and socialMediaName.
 * @param {object} response A response object which will return the status code.
 * @return          A status code stating if the request was successful.
 * */
router.post("/followSocialMedia",async (request,response)=>{

    if(request.body.email === null || request.body.socialMediaName === null)
        return response.status(401).json({status: `error`, error: `Malformed request. Please check your parameters`});
    else{
        const email = request.body.email;
        const socialMediaName = [request.body.socialMediaName];
        let error = await firestore_db.getUser(request.body.email);
        if(error !== 0)
            return response.status(401).json({status: `error`, error: error});
        else {
            firestore_db.save(`Users`, email, `social_media_sites`, socialMediaName);
            return response.status(200).json({status: `ok`, message: `The social media site has successfully been added.`});
        }
    }
});

module.exports = router;