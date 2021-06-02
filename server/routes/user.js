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
    let user = await User.find({userName}).lean();

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
}
            
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
 * This function register the user account
 * @param {string} email
 * @param {string} username
 * @param {string} password
 */
router.post(
    "/signup",(request,response,next) =>
    {
        userFunctions.add_user(request.body.email, request.body.username, request.body.password).then((error) => {
            if(error.get(200) !== undefined)
                return response.status(200).json({message: error.get(200)});
            else {
                const iter_keys = error.keys();
                const iter_values = error.values();
                return response.status(iter_keys.next().value).json({message: iter_values.next().value});
            }
        })
        /*User.find({ email: request.body.email })
            .exec()
            .then(user => {
                if (user.length >= 1) {
                    return response.status(400).json({
                        message: "User already registered"
                    });
                }
                else{

                    bcrypt.hash(request.body.password, 10, (err, hash) => {
                        if(err)
                        {
                            console.log(`Error1: ${err}`)
                            return response.status(500).json({
                                error: err
                            });
                        }
                        else
                        {
                            const user= new User({
                                username: request.body.username,
                                email: request.body.email,
                                password: hash
                            });

                            user
                                .save(function (err)
                                    {
                                        if(err){
                                            return response.status(500).send({msg: err.message});
                                        }
                                        var token = new Token({ _id: user._id, token: crypto.randomBytes(10).toString('hex') });
                                        token.save(function (err)
                                        {
                                            if(err){
                                                return response.status(500).send({msg: err.message});
                                            }
                                            var transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: process.env.EMAIL_USERNAME, pass: process.env.EMAIL_PASSWORD } });
                                            var mailOptions = { from: process.env.EMAIL_USERNAME, to: request.body.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by Entering this code when you log in: ' + token.token + '.\n' };
                                            transporter.sendMail(mailOptions, function (err) {
                                                if (err) { return response.status(500).send({ msg: err.message }); }
                                                response.status(200).send('A verification email has been sent to ' + request.body.email+ '.');
                                            });
                                        });
                                    }

                                )/!*.then(result => {
                                console.log(result);
                                response.status(200).json({
                                    message: "User Registered"
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                response.status(401).json({
                                    error: err
                                });
                            });*!/
                        }
                    });
                }
            });*/
    }


/*userFunctions.add_user(request.body.email, request.body.username, request.body.password).then(error => {
    if (error === null)
        response.status(200).json({ message: "User registered" });
    else
        response.status(500).json({message: error});
});*/

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

        if (err) return response.status(400).send({  type: 'already-added', msg: 'Unable to locate user' });//This error will never occur
            if(user.FavouriteCrypto.includes(request.body.FavouriteCrypto)) return response.status(400).send({ type: 'already-followed', msg: "already following the cryptocurrency" });
            user.FavouriteCrypto.push(request.body.FavouriteCrypto)
            user.save(function (err) {
                if (err) { return response.status(500).send({ msg: "An error occurred contact administrator" }); }//This error will never occur
                response.status(200).send("Favourite Crypto added");
            });
    });
});
/**
 * This function deletes the user from the database
 * @param {string} email
 */
router.delete("/:Email", (req, res, next) => {
    let email = req.params.Email;
    userFunctions(email).then(error => {
        if (error === null) {
            res.status(200).json({
                message: "User deleted"
            });
        }
        else{
            res.status(500).json({
                error: error
            });
        }
    });
});

module.exports = router;