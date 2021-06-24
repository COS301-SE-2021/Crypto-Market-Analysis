const express = require("express");
const router = express.Router();
const analysis = require('./analysisFunction');
const userFunctions =require('./userFunctions')
const database = require("./FirestoreDB")
const db = database.db;


router.post("/getUserTweets", async (request,response)=>{
    if(request.body.email == null)
    {
        return response.status(401).json({status: `error`, error: `Malformed request. Please check your parameters,{You must request with an email}`});
    }
    userFunctions.getUserTweets(request.body.email).then(tweets=>{
        return response.status(200).json(tweets);
    }).catch(err=>{
        return response(401).json({status:`error`, error: err})
    })
});


router.post("/getRedditPost", async (request,response)=>{

    let collection = null;

    let posts = [];
    let reddits = [];
    if(request.body.email === null)
        return response.status(401).json({status: `error`, error: `Malformed request. Please check your parameters`});
    else{
        try{
            collection = await db.collection(`reddit_data`).get().then((snapshot) =>{
                for (const doc of snapshot.docs) {
                    posts.push(doc.data().posts);
                }
            });
            return response.status(200).json({status: `Ok`, posts: posts});
        }
        catch(err){
            return response(401).json({status:`error`, error: err})
        }
    }
});

/** This function gets the cryptos a user is following
 * @param {object} request A request object with the email and symbol.
 * @param {object} response A response object which will return the status code.
 * @return          A status code stating if the request was successful.
 * */
router.post("/getUserCryptos", async (request, response) => {

    let cryptoSymbols = null;
    if(request.body.email === null)
        return response.status(401).json({status: `error`, error: `Malformed request. Please check your parameters`});
    else{
        const email = request.body.email;
        try{
            await db.collection(`Users`).get().then((snapshot) =>{
                for (const doc of snapshot.docs) {
                    if(doc.id === email){
                        cryptoSymbols = doc.data().crypto_name;
                        break;
                    }
                }
            });
            return response.status(200).json({status: `Ok`, messageN: cryptoSymbols});
        }
        catch(err){
            return response(401).json({status:`error`, error: err})
        }
    }
});

/** This function gets the social media a user is following
 * @param {object} request A request object with the email and symbol.
 * @param {object} response A response object which will return the status code.
 * @return          A status code stating if the request was successful.
 * */
router.post("/fetchUserSocialMedia", async (request, response) => {

    let socialMediaName = null;
    if(request.body.email === null) {
        return response.status(401).json({status: `error`, error: `Malformed request. Please check your parameters`});
    }
    else{
        const email = request.body.email;
        try{
            await db.collection(`Users`).get().then((snapshot) =>{
                for (const doc of snapshot.docs) {
                    if(doc.id === email){
                        socialMediaName = doc.data().social_media_sites;
                        break;
                    }
                }
            });
            return response.status(200).json({status: `Ok`, message: socialMediaName});
        }
        catch(err){
            return response(401).json({status:`error`, error: err})
        }
    }
});

/** This function adds a social media site to the users account
 * @param {object} request A request object with the email and symbol.
 * @param {object} response A response object which will return the status code.
 * @return          A status code stating if the request was successful.
 * */
router.post("/followCrypto", async (request,response)=>{

    if(request.body.email === null || request.body.symbol === null || request.body.crypto_name === null)
        return response.status(401).json({status: `Bad Request`, error: `Malformed request. Please check your parameters`});
    else{
        const email = request.body.email;
        let crypto = [];
        let crypto_name = [];
        let data = {};
        let found = false;
        let docRef = null;
        try{
            docRef = db.collection(`Users`).doc(email)
        }
        catch (err) {
            return response.status( 500).json({status: `Internal Server Error`, error: `The document could not be retrieved: ${err}`});
        }

        try{
            await db.collection(`Users`).get().then((snapshot) =>{
                for (const doc of snapshot.docs) {
                    if(doc.id === email){
                        found = true;
                        if(doc.data().crypto)
                            crypto = doc.data().crypto;
                        else
                            crypto = [];
                        if(doc.data().crypto_name)
                            crypto_name = doc.data().crypto_name;
                        else
                            crypto_name = [];
                        break;
                    }
                }
            });

            if(found === false)
                return response.status(403).json({status: `Not authorized`, error: `The user does not exist`})

            if(crypto.find(element => element === request.body.crypto) === undefined && crypto_name.find(element => element === request.body.crypto_name) === undefined){
                crypto.push(request.body.symbol);
                crypto_name.push(request.body.crypto_name);
            }
            else
                return response.status(202).json({status: `Accepted`, message: `The cryptocurrency already exists`});
            data = {[`crypto`]: crypto,[`crypto_name`]: crypto_name}
            try{
                await docRef.set(data, {merge:true});
            }
            catch (err){
                return response.status( 500).json({status: `Internal Server Error`, error: `The crypto could not be added to the database: ${err}`});
            }
            return response.status(200).json({status: `Ok`, message: `The crypto been successfully added`});
        }
        catch(err){
            return response.status(500).json({status:`Internal server error`, error: err})
        }
    }
});

/** This function adds a social media site to the users account
 * @param {object} request A request object with the email and social_media_sites.
 * @param {object} response A response object which will return the status code.
 * @return          A status code stating if the request was successful.
 * */
router.post("/followSocialMedia",async (request,response)=>{

    if(request.body.email === null || request.body.social_media_sites === null)
        return response.status(401).json({status: `Bad Request`, error: `Malformed request. Please check your parameters`});
    else{
        const email = request.body.email;
        let social_media_sites = [];
        let data = {};
        let found = false;
        let docRef = null;
        try{
            docRef = db.collection(`Users`).doc(email)
        }
        catch (err) {
            return response.status( 500).json({status: `Internal Server Error`, error: `The document could not be retrieved: ${err}`});
        }

        try{
            await db.collection(`Users`).get().then((snapshot) =>{
                for (const doc of snapshot.docs) {
                    if(doc.id === email){
                        found = true;
                        if(doc.data().social_media_sites)
                            social_media_sites = doc.data().social_media_sites;
                        else
                            social_media_sites = [];
                        break;
                    }
                }
            });

            if(found === false)
                return response.status(403).json({status: `Not authorized`, error: `The user does not exist`})

            if(social_media_sites.find(element => element === request.body.social_media_sites) === undefined)
                social_media_sites.push(request.body.social_media_sites);
            else{
                return response.status(202).json({status: `Accepted`, message: `The site already exists`});
            }
            data = {[`social_media_sites`]: social_media_sites}
            try{
                await docRef.set(data, {merge:true});
            }
            catch (err){
                console.log(`enters test 2`);
                return response.status( 500).json({status: `Internal Server Error`, error: `The site could not be added to the database: ${err}`});
            }
            return response.status(200).json({status: `Ok`, message: `The social media site has been successfully added`});
        }
        catch(err){
            return response(500).json({status:`Internal server error`, error: err})
        }
    }
});

/** This function adds analysis score to the database
 * @param {object} request A request object with the socialmedia and crypto.
 * @param {object} response A response object which will return the analysis results.
 * */
router.post('/analyse', async function(req, res, next) {

    if(req.body.crypto === null || req.body.socialmedia === null)
        return res.status(401).json({status: `Bad Request`, error: `Malformed request. Please check your parameters`});

    const { crypto ,socialmedia} = req.body;
    let Bigdata = null

    try{
        Bigdata = await db.collection(socialmedia).doc(crypto).get();
    }
    catch (err){
        return res.status(500).json({status:`Internal server error`, error: err});
    }

    const analysisArr = [];
    let i=0;
    try {
        await Bigdata.data().post.forEach(element =>
            analysis.convertion(element).then(comment => {
                analysis.splits(comment).then(newWording => {
                    analysis.spellingc(newWording).then(filteredwords => {
                        analysis.analysewords(filteredwords).then(analysis => {
                            if (isNaN(analysis)) {
                                analysis = 0;
                            }
                            analysisArr.push(analysis * 10);
                            i++;
                            if (i === Bigdata.data().post.length) {
                                userFunctions.saveToDB(analysisArr,socialmedia,crypto).then(data=>{
                                    return res.status(200).json(data);
                                })
                            }
                        })
                    })
                })
            })
        );
    }
    catch(err){
        return res.status(500).json({status:`Internal server error`, error: err});
    }
});

module.exports = router
