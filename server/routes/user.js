const bodyParser = require('body-parser');
const path = require('path');
const express = require("express");
const { check, validationResult } = require('express-validator')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();
const router = express.Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const mongoose = require("mongoose");
const User = require("../models/user")
const userFunctions = require("./user_functions")
const Token = require("../models/verification")
const {val} = require("cheerio/lib/api/attributes");

const Crypto = require("../models/cryptocurrency");
const secret_token = 'kabdaskjndbjhbkjaishouvhadjkljaosiuiygm';



/**
 * use post method to  perform http request
 *@param /api/updatePassword API route
 * @param {async} function for response and requests
 * @param request request sent to server
 * @param response response received from server
 */
router.post("/login", async (request, response, next) => {
    let {username, password: plainTextPassword } = request.body;
    let user = await User.find({username}).lean();

    if(!user){
        return response.status(400).json({status: 'error', error: 'Invalid username/password entered'});
    }

    if(!plainTextPassword) {
        if (await bcrypt.compare(plainTextPassword, user.password)) {
            //password and username match an existing user

            const token = jwt.sign({id: user.id, username: user.username}, secret_token);
            return response.status(200).json({status: 'ok', data: token})
        }
    }
    response.status(500).json({status: 'error', error: 'Invalid username/password entered'})
});

/**
 * use post method to  perform http request
 *@param /api/updatePassword API route
 * @param {async} function for response and requests
 * @param request request sent to server
 * @param response response received from server
 */
router.post("/updatePassword", async (request, response, next) => {

    let {token, newPassword: plainTextPassword} = request.body;

    if(!plainTextPassword || typeof plainTextPassword !== 'string')
    {
        return response.status(400).json({status: 'error', error: 'Invalid password'})
    }

    if(plainTextPassword.length < 4)
    {
        return response.status(400).json({status: 'error', error: 'Password too short. Password should be atleast 5 characters'})
    }

    try {
        let user = jwt.verify(token, secret_token);

        let _id = user.id;

        let password = await bcrypt.hash(plainTextPassword, 10);

        await User.updateOne({_id}, {
            $set: {password}
        });
        response.status(200).json({status: 'ok'})
    }catch(error){
        response.status(500).json({status: 'error',error:';))'});


    }

});

/**
 * Registers a user in the database
 * @param {string} request.body.email The email of the user who is registering
 * @param {string} request.body.username The username of the user who is registering
 * @param {string} request.body.password The password of the user who is registering
 * @return {object}                      Contains the status code and message stating whether it was successful or not
 */
/*
  req {
        username;
        password;
        email;
     }

 */
const hashingPassword = async (pwd,res)=>{
    bcrypt.hash(pwd, 20, (err, hashedpwd) => {
          if(err)
          {
              return "error hashing password";
          }
          return hashedpwd;
    });
}


const register = async(req, res) => {
    const newUser= User(
        {
            username: req.body.username,
            email: req.body.email,
            password: hash
        }

    );


};
router.post(
    "/signup",(request,response,next) => {
        User
            .find({email: request.body.email})
            .exec()
            .then(user => {

                if (user.length >= 1)
                    return response.status(400).json({
                        message: "User already registered"
                    });
                else {
                    bcrypt.hash(request.body.password, 20, (err, hash) => {
                        if (err){
                            return response.status(500).json({
                                error: err
                            });
                        }

                        else {
                            const user = new User({
                                username: request.body.username,
                                email: request.body.email,
                                password: hash
                            });

                            user.save(err => {
                                if (err) {
                                    return response.status(500).send({msg: err.message});
                                }
                                const token = new Token({_id: user._id, token: crypto.randomBytes(10).toString('hex')});
                                token.save(function (err) {
                                    if (err) {
                                        return response.status(500).send({msg: err.message});
                                    }
                                    const transporter = nodemailer.createTransport({
                                        service: 'gmail',
                                        auth: {user: process.env.EMAIL_USERNAME, pass: process.env.EMAIL_PASSWORD}
                                    });
                                    const mailOptions = {
                                        from: process.env.EMAIL_USERNAME,
                                        to: request.body.email,
                                        subject: 'Account Verification Token',
                                        text: 'Hello,\n\n' + 'Please verify your account by Entering this code when you log in: ' + token.token + '.\n'
                                    };
                                    transporter.sendMail(mailOptions, function (err) {
                                        if (err) {
                                            return response.status(500).send({msg: err.message});
                                        }
                                        response.status(200).send('A verification email has been sent to ' + request.body.email + '.');
                                    });
                                })
                            })
                        }
                    });
                }
            });
    }
);

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
const {spawn} = require('child_process');
router.get('/data', (req, res) => {

    var dataToSend;
    const python = spawn('python', ['FacebookScrapper.py']);
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
    });
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        res.send(dataToSend)
    });

})
const natural = require('natural');
const SpellCorrector = require('spelling-corrector');
const SW = require('stopword');
const aposToLexForm = require('apos-to-lex-form');
const spellCorrector = new SpellCorrector();
spellCorrector.loadDictionary();
const convertion = async (post)=>
{
    const contractions = aposToLexForm(post);//convert word to contractions
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
//this function returns -3 for bad, 3 for good,0 for neutral
//takes post:'comment' request object
router.post('/analyse', function(req, res, next) {
    const { post } = req.body;
   /* const contractions = aposToLexForm(post);
    const cLcase = contractions.toLowerCase();*/
    convertion(post).then(comment=>{

        splits(comment).then(newWording=>{
            spellingc(newWording).then(filteredwords=>{
                analysewords(filteredwords).then(analysis=>{
                    res.status(200).json({ analysis });
                })
            })
        })
    })

});
/**
 * This function adds crypto names to the user account that the user is following
 * @param {string} request.body.email
 * @param {string} request.body.crypt_name
 * @return          A response containing the status code
 */
router.post("/followCrypto",(request,response,next)=>{
    User.findOne({  email:request.body.email }, (err, user) => {

        if (err)
            return response.status(404).send({  message: 'Unable to find user' });
        else if(user !== null) {
            if (user.FavouriteCrypto.includes(request.body.crypto_name))
                return response.status(400).send({
                    type: 'already-followed',
                    message: "already following the cryptocurrency"
                });
            user.FavouriteCrypto.push(request.body.crypto_name)
            user.save(function (err) {
                if (err) {
                    return response.status(500).send({message: "An error occurred contact administrator"});
                }
                response.status(200).send({message: "Favourite Crypto added"});
            });
        }
        else
            return response.status(403).send({  message: 'Not authorized' });

    });
});

/** This function adds a social media site to scrap from by the user
 * @param request.body.social_media The social media site to scrap from
 * @param request.body.email The email address of the registered user
 * @return          A response containing the status code
 * */
router.post("/followSocialMedia",(request,response,next)=>{
    User.findOne({  email:request.body.email }, (err, user) => {
        if (err)
            return response.status(404).send({  message: 'Unable to find user' });
        else if(user !== null) {
            if (user.SocialMediaSites.includes(request.body.social_media))
                return response.status(400).send({
                    message: "Already following the social media site"
                });
            user.SocialMediaSites.push(request.body.social_media)
            user.save(function (err) {
                if (err)
                    return response.status(500).send({message: "An error occurred contact administrator"});
                response.status(200).send({message: "Successful"});
            });
        }
        else
            return response.status(403).send({  message: 'Not authorized' });

    });
});

/**
 * This function deletes the user from the database
 * @param {string} request.body.Email The email of the user being deleted
 * @return          A response containing the status code
 */
router.delete("/:Email", (req, res, next) => {
    User.deleteOne({email: req.params.Email})
        .exec()
        .catch(err => {
            return res.status(500).json({"message": err});
        });
    return res.status(200).json({"message":"User Deleted"})
});

const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();
const getData = async(name) => {
    let data = await CoinGeckoClient.coins.fetch(name, {});

    return data;
};
const fs = require('fs');

router.post("/getCryptodata",(request, response, next)=>
{
    User.findOne({ _id: request.body._id}, async (err, user) =>{
        if (!user) return response.status(400).send({ msg: 'User not found' });
        let following =user.FavouriteCrypto;
        if(following.length>0)
        {
            for(let val of user.FavouriteCrypto)
            {
                let path =user.username+val+'.json';
                const dr= await getData(val);
                let fdata= JSON.stringify(dr);
                fs.writeFile('routes/CryptoCurrencyJsonFiles/'+path, fdata, (err) => {
                    if (err) throw err;

                });

            }

            response.status(200).send("function successful");
        }response.status(500).send("user not following any cryptoCurrency");
    });

});


router.post("/viewCrypto",(req,res,next)=>{
    userFunctions.getFavoriteCrypto(req.body.email)
        .then(error => {
            if(error.get(200) !== undefined)
                return res.status(200).json({message: error.get(200)})
        })
});


module.exports = router;