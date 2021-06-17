const bodyParser = require('body-parser');
const path = require('path');
const express = require("express");
const { check, validationResult } = require('express-validator')
const router = express.Router();
const crypto = require('crypto');
const secret_token = 'kabdaskjndbjhbkjaishouvhadjkljaosiuiygm';

const admin = require('firebase-admin');
const serviceAC = require('../database/firebase.json')
const Database = require('../database/Database');

admin.initializeApp({
    credential: admin.credential.cert(serviceAC)
});

const db = admin.firestore();
const docR = db.collection('Users').doc('Emails');


/**
 * This function verify the user email by making use of the token sent to the user's email
 * @param {string} request.body.token The token sent to the user's email address
 * @param {string} request.body.email The email of the user
 * @param {string} request.body.id The id of the user
 * @return                          A response containing the status code
 */
router.post("/verify",(request, response, next)=>
{
    Token.findOne({ token: request.body.token }, function (err, token) {
        if (!token) return response.status(400).send({ type: 'user is not verified', msg: 'Token expired' });

        User.findOne({ email: request.body.email }, function (err, user) {
            if (!user) return response.status(400).send({ msg: 'Invalid token' });
            if (user.Verified) return response.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });

            user.Verified = true;
            user.save(function (err) {
                if (err) { return response.status(500).send({ msg: err.message }); }
                response.status(200).send("Account successfully verified log in.");
            });
        });
    });
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
exports.analysewords = analysewords;
//this function returns -3 for bad, 3 for good,0 for neutral
//takes post:'comment' request object
router.post('/analyse', async function(req, res, next) {
    const { post } = req.body;
    /* const contractions = aposToLexForm(post);
     const cLcase = contractions.toLowerCase();*/
    const billgate = await db.collection('twitter_data').doc('BillGates').get();
    if (!billgate.exists) {
        console.log('No document');
    } else {
        //console.log(billgate.data().tweets);
    }
    const analysisArr = [];
    const x= [];
    let i=0;
   await billgate.data().tweets.forEach(element =>

        convertion(element).then(comment=>{
           // console.log(element);
          splits(comment).then(newWording=>{
                spellingc(newWording).then(filteredwords=>{
                    analysewords(filteredwords).then(analysis=>{
                       // res.status(200).json({ analysis });
                        x.push(i);
                        analysisArr.push(analysis);
                        i++;
                        if(i==billgate.data().tweets.length)
                        {
                            res.status(200).json({ analysisArr, x });
                        }


                    })
                })
            })
        })

    );



});


module.exports = router;