const express = require("express");
const dotenv = require('dotenv');
dotenv.config();
const router = express.Router();
const Database = require('../database/Database');
const firestore_db = new Database().getInstance();

/**
 * This function adds crypto symbols to the user account that is saved in the database
 * @param {request.body.email} email The email of the registered user in the database.
 * @param {request.body.symbol} symbol The cryptocurrency symbol that should be saved to the user account.
 * @return                              A status code stating if the request was successful.
 */
router.post("/followCrypto", async(request,response)=>{

    const email = request.body.email;
    const symbol = request.body.symbol;
    if(email === null || symbol === null)
        return response.status(401).json({status: `error`, error: `Malformed request`});
    else{
        let error = await firestore_db.getUser(request.body.email);
        if(error !== 0)
            return response.status(401).json({status: `error`, error: error});
        else {
            firestore_db.save(`Users`, email, `crypto`, symbol);
            return response.status(200).json({status: `ok`, message: `The crypto has successfully been added.`});
        }
    }
});


/** This function adds a social media site to scrap from by the user
 * @param socialMediaName The social media site to scrap from
 * @param email The email address of the registered user
 * @return          A document entry containing a social media and email
 * */
router.post("/followSocialMedia",(request,response,next)=>{

    const firestoreDB = new Database().getInstance();
    const rUser = {username: request.body.username};
     rUser['socialMediaName'] = document.querySelector(".social-name").innerText;
    //let socialMediaName = document.querySelector(".social-name").innerText;
    //let email = request.body.email;
    let user = admin
        .auth()
        .getUserByEmail(request.body.email)
        .then((userRecord) => {
            console.log("fetched" + userRecord.toJSON() + "successfully");
        }).catch((err) => {
            console.log("Error user not found: ", err);
        });

    if(!user)
        return response.status(400).json({status: 'error', error: 'User does not exist'});
    else {
        firestoreDB.save('Social Network', rUser['socialMediaName'], "Email", rUser['email']);
    }
});

module.exports = router;