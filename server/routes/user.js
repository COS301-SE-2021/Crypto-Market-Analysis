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
router.post("/viewCrypto",(req,res,next)=>{
   userFunctions.getFavoriteCrypto(req.body.email)
       .then(error => {
           if(error.get(200) !== undefined)
    return res.status(200).json({message: error.get(200)})
})
});

const Crypto = require("../models/cryptocurrency")

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
                    bcrypt.hash(request.body.password, 10, (err, hash) => {
                        if (err)
                            return response.status(500).json({
                                error: err
                            });
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
 * This function verify the user email
 * @param {string} token
 * @param {string} id
 * @param {string} email
 */
router.post("/verify",(request, response, next)=>
{
    Token.findOne({ token: request.body.token }, function (err, token) {
        if (!token) return response.status(400).send({ type: 'user is not verified', msg: 'Token expired' });

        User.findOne({ _id: token._id, email: request.body.email }, function (err, user) {
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

/**
 * This function adds crypto names to the user account that the user is following
 * @param {string} id
 * @param {string} FavouriteCrypto
 */
router.post("/followCrypto",(request,response,next)=>{
    User.findOne({  _id:request.body._id }, function (err, user) {
        if (err)
            return response.status(400).send({  type: 'already-added', msg: 'Unable to locate user' });
        if(user.FavouriteCrypto.includes(request.body.FavouriteCrypto))
            return response.status(400).send({ type: 'already-followed', msg: "already following the cryptocurrency" });
        user.FavouriteCrypto.push(request.body.FavouriteCrypto)
        user.save(function (err) {
            if (err) { return response.status(500).send({ msg: "An error occurred contact administrator" }); }
            response.status(200).send("Favourite Crypto added");
        });
    });
});

/**
 * This function deletes the user from the database
 * @param {string} email
 */
router.delete("/:Email", (req, res, next) => {
    User.deleteOne({email: req.body.email})
        .exec()
        .catch(err => {
            return res.status(500).json({"message": err});
        });
    return res.status(200).json({"message":"User Deleted"})
});
/* Tries to delete a user from the database
* @param {string} name of bitcoin
* @return object containing all data
* */
const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();
const getData = async(name) => {
    let data = await CoinGeckoClient.coins.fetch(name, {});
    //console.log(data);
    return data;
};
const fs = require('fs');
/* Tries to delete a user from the database
* @param {string} _id
* @return cryptocurrency data
* */
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
                    console.log('Json files created');
                });

            }

            response.status(200).send("function successful");
        }response.status(500).send("user not following any cryptoCurrency");
    });

});

module.exports = router;