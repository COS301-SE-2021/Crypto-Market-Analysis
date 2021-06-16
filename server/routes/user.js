const express = require("express");
const dotenv = require('dotenv');
dotenv.config();
const router = express.Router();
const Database = require('../database/Database');
const firestore_db = new Database().getInstance();

/**
 * This function adds crypto names to the user account that the user is following
 * @param {string} cryptoName   name of cryptocurrency to follow
 * @param {string} username     username of user logged on and following a cryptocurrency
 * @return         A document entry containing a cryptocurrency and username
 */
router.post("/followCrypto", async(request,response)=>{

    console.log(`This is the email: ${request.body.email} and this is the password: ${request.body.cryptoName}`);
    const users = {email: request.body.email};
    //users['cryptoName'] = document.querySelector(".crypto-name").innerText;
    users['cryptoName'] = request.body.cryptoName;
    let error = await firestore_db.getUser(request.body.email);
    if(error !== 0)
        console.log(`An error occurred: ${error}`);

    /*if(!user)
        return response.status(400).json({status: 'error', error: 'User does not exist'});
    else {
        firestoreDB.save('Crypto', users['cryptoName'], "Email", users['email']);
    }*/

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