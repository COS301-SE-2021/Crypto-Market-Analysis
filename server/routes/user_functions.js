const User = require("../models/user")
const Token = require("../models/verification")
const nodemailer = require('nodemailer');
const bcrypt = require("bcryptjs");

const dotenv = require('dotenv');
dotenv.config();
const crypto = require('crypto');


/* Tries to delete a user from the database
* @param {string} email The email of the user in the database
* @return {null || string} Returns null if no error occurred while deleting the user from the database or else it returns the error
* */
const deleteUser = async (email) => {
    let error = null;
    await User.deleteOne({email: email})
        .exec()
        .catch(err => {
            error = err;
        });

    return error;
};

/*const add_user = async (email, username, password) => {
    let error = null;

    await User.find({ email: email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                /!*return response.status(400).json({
                    message: "User already registered"
                });*!/
                console.error(`User already registered`);
                return error = "User already registered";
            }
            else{
                bcrypt.hash(password, 10, async (err, hash) => {
                    console.warn("Inside bcrypt")
                    if(err)
                    {
                        /!*return response.status(500).json({
                            error: err
                        });*!/
                        console.error(`Error 1`);
                        return error = err;
                    }
                    else
                    {
                        const user= new User({
                            username: username,
                            email: email,
                            password: hash
                        });

                        await user
                            .save(function (err)
                                {
                                    console.log("Enters save statement")
                                    if(err){
                                        /!*return response.status(500).send({msg: err.message});*!/
                                        console.error(`Error 2`);
                                        return error = err;
                                    }
                                    const token = new Token({ _id: user._id, token: crypto.randomBytes(10).toString('hex') });
                                    token.save(function (err)
                                    {
                                        if(err){
                                            /!*return response.status(500).send({msg: err.message});*!/
                                            console.error(`Error 3`);
                                            return error = err;
                                        }
                                        let transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: process.env.EMAIL_USERNAME, pass: process.env.EMAIL_PASSWORD } });
                                        let mailOptions = { from: process.env.EMAIL_USERNAME, to: email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by Entering this code when you log in: ' + token.token + '.\n' };
                                        transporter.sendMail(mailOptions, function (err) {
                                            if (err) { return response.status(500).send({ msg: err.message }); }
                                            /!*response.status(200).send('A verification email has been sent to ' + email+ '.');*!/
                                            console.log("Sucess")
                                            return error = null;
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
                    return error;
                });
            }
        });
}*/

module.exports = deleteUser;