const express = require("express");
const { check, validationResult } = require('express-validator')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user")

router.post(
    "/signup",(request,response,next) =>
    {
        User.find({ email: request.body.email })
            .exec()
            .then(user => {
                if (user.length >= 1) {
                    return response.status(409).json({
                        message: "User already registered"
                    });
                } else{

                    bcrypt.hash(request.body.password, 10, (err, hash) => {
                        if(err)
                        {
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
                            });user
                            .save()
                            .then(result => {
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
                            });
                        }
                    });
                }
            });
    });
router.delete("/:Email", (req, res, next) => {
    User.remove({ email: req.params.Email })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


module.exports = router;