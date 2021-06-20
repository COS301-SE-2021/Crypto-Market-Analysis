const express = require("express");
const router = express.Router();
const analysis = require('./analysisFunction');


const admin = require('firebase-admin');
const serviceAC = require('../database/firebase.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAC)
});

const db = admin.firestore();

router.post("/getUserTweets", async (request,response)=>{

    let collection = null;
    let screen_names = [];
    let tweets = [];
    if(request.body.email === null)
        return response.status(401).json({status: `error`, error: `Malformed request. Please check your parameters`});
    else{
        const email = request.body.email;
        try{
            collection = await db.collection(`twitter_data`).get().then((snapshot) =>{
                for (const doc of snapshot.docs) {
                    screen_names.push(doc.data().screen_name);
                    tweets.push(doc.data().tweets);
                }
            });
            return response.status(200).json({status: `Ok`, screen_names: screen_names, tweets_array: tweets});
        }
        catch(err){
            return response(401).json({status:`error`, error: err})
        }
    }
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


router.post("/getUserCryptos", async (request,response)=>{

    let cryptoSymbols = null;
    if(request.body.email === null)
        return response.status(401).json({status: `error`, error: `Malformed request. Please check your parameters`});
    else{
        const email = request.body.email;
        try{
            await db.collection(`Users`).get().then((snapshot) =>{
                for (const doc of snapshot.docs) {
                    if(doc.id === email){
                        cryptoSymbols = doc.data().crypto;
                        break;
                    }
                }
            });
            return response.status(200).json({status: `Ok`, message: cryptoSymbols});
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
            return response(500).json({status:`Internal server error`, error: err})
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
        return response.status(401).json({status: `error`, error: `Malformed request. Please check your parameters`});
    else{
        const email = request.body.email;
        let social_media_sites = [];
        const docRef = db.collection(`Users`).doc(email);
        let data = {};

        try{
            await db.collection(`Users`).get().then((snapshot) =>{
                for (const doc of snapshot.docs) {
                    if(doc.id === email){
                        social_media_sites = doc.data().social_media_sites;
                        break;
                    }
                }
            });
            if(social_media_sites.find(element => element === request.body.social_media_sites) === undefined)
                social_media_sites.push(request.body.social_media_sites);
            else
                return response.status(202).json({status: `Accepted`, message: `The social media site already exists`});
            data = {[`social_media_sites`]: social_media_sites}
            await docRef.set(data, {merge:true});
            return response.status(200).json({status: `Ok`, message: `The social media site has successfully been added.`});
        }
        catch(err){
            return response(401).json({status:`error`, error: err})
        }
    }
});
/** This function adds analysis score to the databse
 * @param {object} request A request object with the socialmedia and crypto.
 * @param {object} response A response object which will return the analysis results.
 * */
router.post('/analyse', async function(req, res, next) {
    const { crypto ,socialmedia} = req.body;
    /* const contractions = aposToLexForm(post);
     const cLcase = contractions.toLowerCase();*/
    const Bigdata = await db.collection(socialmedia).doc(crypto).get();
    if (!Bigdata.exists) {
        console.log('No document');
    } else {
        console.log('analyse retrieve successful')
    }
    const analysisArr = [];
    let i=0;
    await Bigdata.data().post.forEach(element =>

        analysis.convertion(element).then(comment=>{
            // console.log(element);
            analysis.splits(comment).then(newWording=>{
                analysis.spellingc(newWording).then(filteredwords=>{
                    analysis.analysewords(filteredwords).then(analysis=>{
                        // res.status(200).json({ analysis });
                        if(isNaN(analysis))
                        {
                            analysis=0;
                        }
                        analysisArr.push(analysis*10);
                        i++;
                        if(i==Bigdata.data().post.length)
                        {
                            let mini=Math.min.apply(Math, analysisArr)
                            let maxi = Math.max.apply(Math, analysisArr)
                            const age = arr => arr.reduce((acc,v) => acc + v)
                            let average = age(analysisArr)
                            db.collection(socialmedia).doc(crypto).set({
                                Analysis_score: analysisArr ,Min: mini,Max: maxi,Average: average
                            }, {merge: true})
                            res.status(200).json({ analysisArr ,mini,maxi,average});
                        }

                    })
                })
            })
        })

    );



});
module.exports = router
