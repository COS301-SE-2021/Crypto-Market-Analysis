const User = require("../models/user")
const Token = require("../models/verification")
const nodemailer = require('nodemailer');
const bcrypt = require("bcryptjs");

const dotenv = require('dotenv');
dotenv.config();
const crypto = require('crypto');
/* Tries to delete a user from the database
* @param {string} email The email of the user in the database
* @return array of followed bitcoin
* */
const getFavoriteCrypto= async(email)=>{
    await User.find({email:email})
        .exec()
        .then(async user=>
            {

            }

        )
};


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
const registerUser = async (email , username, password) => {
     await User.findOne({email:email})
         .then(

         )

};

/*Adds a user to the database
*@param {string} email The email of the user being added
*@param {string} username The email of the user being added
*@param {string} password The email of the user being added
* */
const add_user = async (email, username, password) => {
    let error = new Map()
    await User.find({ email: email })
        .exec()
        .then(async user => {
            if (user.length >= 1)
                return error.set(400,"User already registered");
            else{
                await hashPassword(email, username,password, error)
            }
        });
    return error;
}

/* Hashes a password using salt and the bcrypt library
*@param {string} email The email of the user being registered
*@param {string} username The username of the user being registered
*@param {string} password The password of the user being registered
*@param {map<number><string>} error The map object to that sets the status code and message
* */
const hashPassword = async (email, username, password, error) => {
    await new Promise(() => {
        bcrypt.hash(password, 10, async (err, hash) => {
            if(err)
                return error.set(500, err);
            else
            {
                const user= new User({
                    username: username,
                    email: email,
                    password: hash
                });

                await user.save(async err => {
                    if(err)
                        return error.set(500,err.message);

                    let token = new Token({ _id: user._id, token: crypto.randomBytes(10).toString('hex') });
                    await token.save(async err => {
                        if(err) {
                            return error.set(500, err.message);
                        }
                        return error.set(200, "User registered")
                    })
                })
            }
        });
    });
    return error;
}

/*Sends an email with a verification token to the parameter provided
*@param {string} email The email to which the token must be sent to
* @return {map<number><string>} Returns a map object with the status code and error or success message if any
* */
const send_verification_mail = (email, error) => {
    let transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: process.env.EMAIL_USERNAME, pass: process.env.EMAIL_PASSWORD } });
    let mailOptions = { from: process.env.EMAIL_USERNAME, to: email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by Entering this code when you log in: ' + token.token + '.\n' };

    transporter.sendMail(mailOptions).then((err) => {
        if (err) { return error.set(500, err.message) }
        return error.set(200, `A verification email has been sent to ${email}`);
    });
}

module.exports = {deleteUser, add_user};