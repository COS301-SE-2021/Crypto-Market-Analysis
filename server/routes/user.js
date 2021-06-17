const express = require("express");
const router = express.Router();

const natural = require('natural');
const SpellCorrector = require('spelling-corrector');
const SW = require('stopword');
const aposToLexForm = require('apos-to-lex-form');
const spellCorrector = new SpellCorrector();
spellCorrector.loadDictionary();
const convertion= async (post)=>{  const contractions = aposToLexForm(post);//convert word to contractions
    const cLcase = contractions.toLowerCase();//convert to lowercases
    const value = cLcase.replace(/[^a-zA-Z\s]+/g, '');//remove stop word
    return value //post converted ready to be read
}
//spliting post/comment into individual words
const splits = async (comment)=>{
    const { WordTokenizer } = natural;
    const words = new WordTokenizer();
    const Splited = words.tokenize(comment);
    return Splited;
}
//correcting spelling errors
const spellingc = async(newWording)=>{
    newWording.forEach((word, index) => {
        newWording[index] = spellCorrector.correct(word);
    })
    const filteredwords = SW.removeStopwords(newWording); //removeStopwords
    return filteredwords;

}
//return analysis value
const analysewords = async (filteredwords)=>{
    const { SentimentAnalyzer, PorterStemmer } = natural;
    const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');//using afinn dictionary may change
    const analysis = analyzer.getSentiment(filteredwords);
    return analysis;

}

const admin = require('firebase-admin');
const serviceAC = require('../database/firebase.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAC)
});

const db = admin.firestore();

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
        const crypto_name = [request.body.crypto_name];
        const data = {[`crypto`]: symbol,[`crypto_name`]: crypto_name}
        try{
            db.collection(`Users`).doc(email).set(data, {merge:true}).then();
            return response.status(200).json({status: `Ok`, message: `The crypto has successfully been added.`});
        }
        catch(err){
            return response(401).json({status:`error`, error: err})
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
        const social_media_sites = [request.body.social_media_sites];
        const data = {[`social_media_sites`]: social_media_sites}

        try{
            db.collection(`Users`).doc(email).set(data, {merge:true}).then();
            return response.status(200).json({status: `Ok`, message: `The social media site has successfully been added.`});
        }
        catch(err){
            return response(401).json({status:`error`, error: err})
        }
    }
});

//this function returns -3 for bad, 3 for good,0 for neutral
//takes post:'comment' request object
router.post('/analyse', async function(req, res, next) {
    const { crypto ,socialmedia} = req.body;
    /* const contractions = aposToLexForm(post);
     const cLcase = contractions.toLowerCase();*/
    const Bigdata = await db.collection(socialmedia).doc(crypto).get();
    if (!Bigdata.exists) {
        console.log('No document');
    } else {
        //console.log(billgate.data().tweets);
    }
    const analysisArr = [];
    let i=0;
   await Bigdata.data().subreddits.forEach(element =>

        convertion(element).then(comment=>{
           // console.log(element);
          splits(comment).then(newWording=>{
                spellingc(newWording).then(filteredwords=>{
                    analysewords(filteredwords).then(analysis=>{
                       // res.status(200).json({ analysis });
                        if(isNaN(analysis))
                        {
                            analysis=0;
                        }
                        analysisArr.push(analysis*10);
                        i++;
                        if(i==Bigdata.data().subreddits.length)
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

exports.analysewords = analysewords;
module.exports = router;