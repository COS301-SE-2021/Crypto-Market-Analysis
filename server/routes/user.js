const express = require("express");
const dotenv = require('dotenv');
dotenv.config();
const router = express.Router();

/**
 * This function adds crypto names to the user account that the user is following
 * @param {string} request.body.email
 * @param {string} request.body.crypt_name
 * @return          A response containing the status code
 */
router.post("/followCrypto",(request,response,next)=>{

});

/** This function adds a social media site to scrap from by the user
 * @param request.body.social_media The social media site to scrap from
 * @param request.body.email The email address of the registered user
 * @return          A response containing the status code
 * */
router.post("/followSocialMedia",(request,response,next)=>{

});

router.post("/getCryptodata",(request, response, next)=>
{

});


router.post("/viewCrypto",(req,res,next)=>{

});


module.exports = router;