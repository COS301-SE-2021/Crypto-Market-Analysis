const express = require("express");
const router = express.Router();
const analysis = require('./analysisFunction');
const userFunctions =require('./userFunctions')
const database = require("./FirestoreDB")
const db = database;

router.post("/get4chanPost", async (request,response)=>{
    const email = request.body.email;
    if(!email || !(typeof email === 'string' || email instanceof String))
        return response.status(401).json({status: `Bad Request`, error: `Malformed request. Please check your parameters`});
    userFunctions.get4chanPost().then( tweets => {
        return response.status(200).json(tweets);
    }).catch(err=>{
        return response(401).json({status:`error`, error: err})
    })
});
/*router.post("/getUserTweets", async (request,response)=>{
    const email = request.body.email;
    if(!email || !(typeof email === 'string' || email instanceof String))
        return response.status(401).json({status: `Bad Request`, error: `Malformed request. Please check your parameters`});
    userFunctions.getUserTweets().then( tweets => {
        return response.status(200).json(tweets);
    }).catch( err => {
        return response(500).json({status:`Internal Server Error`, error: err})
    })
});*/


router.post("/getRedditPost", async (request,response)=>{
    if(request.body.email === null)
        return response.status(401).json({status: `error`, error: `Malformed request. Please check your parameters`});
    else{
        userFunctions.getRedditPost(request.body.email).then(data=>{
            response.status(200).json(data);
        }).catch(err=>{
            return response(401).json({status:`error`, error: err})
        })
    }
});

/** This function gets the cryptos a user is following
 * @param {object} request A request object with the email and symbol.
 * @param {object} response A response object which will return the status code.
 * @return          A status code stating if the request was successful.
 * */
router.post("/getUserCryptos", async (request, response) => {
     if(!request.body.email)
         return response.status(401).json({status: `error`, error: `Malformed request. Please check your parameters`});
     else {
          userFunctions.getUserCrypto(request.body.email).then(data=>{
             return response.status(200).json(data);
         }).catch(err=>{
             return response(401).json({status:`error`, error: err})
         })
     }
 });

/** This function gets the social media a user is following
 * @param {object} request A request object with the email and symbol.
 * @param {object} response A response object which will return the status code.
 * @return          A status code stating if the request was successful.
 * */

/*router.post("/getUserCryptos", async (request,response)=>{

    let cryptoSymbols = null;
    let socialSites = null;
    if(request.body.email === null){
        return response.status(401).json({status: `error`, error: `Malformed request. Please check your parameters`});
    }
    else{
        userFunctions.fetchUserSocialMedia(request.body.email).then(data=>{
            return response.status(200).json(data);
        }).catch(err=>{
            return response(401).json({status:`error`, error: err})
        }
    }
});*/

/** This function adds a social media site to the users account
 * @param {object} request A request object with the email and symbol.
 * @param {object} response A response object which will return the status code.
 * @return          A status code stating if the request was successful.
 * */
router.post("/followCrypto", async (request,response)=>{

    if(request.body.email === null || request.body.symbol === null || request.body.crypto_name === null)
        return response.status(401).json({status: `Bad Request`, error: `Malformed request. Please check your parameters`});
    else{
        await userFunctions.followCrypto(request.body.email,request.body.symbol,request.body.crypto_name).then(data=>{
            return response.status(200).json(data);
        }).catch(err=>{
            return response.status(500).json({status:`Internal server error`, error: err})
        });
    }
});

/** This function adds a social media site to the users account
 * @param {object} request A request object with the email and social_media_sites.
 * @param {object} response A response object which will return the status code.
 * @return          A status code stating if the request was successful.
 * */
router.post("/followSocialMedia",async (request,response)=>{
    if(!request.body.email || !request.body.social_media_sites){
        return response.status(401).json({status: `Bad Request`, error: `Malformed request. Please check your parameters`});
    }
    else{
          await userFunctions.followSocialMedia(request.body.email,request.body.social_media_sites).then(data=>{
              response.status(200).json(data);
          }).catch(err=>{
              response.status(500).json({status:`Internal server error`, error: err});
          })
        }
});

/** This function gets the social media a user is following
 * @param {object} request A request object with the email and symbol.
 * @param {object} response A response object which will return the status code.
 * @return          A status code stating if the request was successful.
 * */
router.post("/fetchUserSocialMedia", async (request, response) => {

    if(request.body.email === null) {
        return response.status(401).json({status: `error`, error: `Malformed request. Please check your parameters`});
    }
    else{
        userFunctions.fetchUserSocialMedia(request.body.email).then(data=>{
            return response.status(200).json(data);
        }).catch(err=>{
            return response(401).json({status:`error`, error: err})
        })
    }
});

/** This function adds analysis score to the database
 * @param {object} request A request object with the socialmedia and crypto.
 * @param {object} response A response object which will return the analysis results.
 * */
router.post('/analyse', async function(req, res) {

    if(req.body.crypto === null || req.body.socialmedia === null)
        return res.status(401).json({status: `Bad Request`, error: `Malformed request. Please check your parameters`});

    const { crypto ,socialmedia} = req.body;
    let Bigdata = null

    try{
        await analysis.getData(socialmedia,crypto).then(crypto_Data=>{
            Bigdata= crypto_Data;
            console.log(Bigdata)
        })
    }
    catch (err){
        return res.status(500).json({status:`Internal server error`, error: err});
    }

    const analysisArr = [];
    let i=0;
    try {
        await Bigdata.forEach(element =>
            analysis.convertion(element).then(comment => {
                analysis.splits(comment).then(newWording => {
                    analysis.spellingc(newWording).then(filteredwords => {
                        analysis.analysewords(filteredwords).then(analysis => {
                            if (isNaN(analysis)) {
                                analysis = 0;
                            }
                            analysisArr.push(analysis * 10);
                            i++;
                            if (i === Bigdata.length) {
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
