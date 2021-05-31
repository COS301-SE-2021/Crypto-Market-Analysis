const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

const secret_token = 'kabdaskjndbjhbkjaishouvhadjkljaosiuiygm';

//mongoose.connect("mongodb+srv://codex:codex@codex.z7mgz.mongodb.net/Codex?retryWrites=true&w=majority",{

//});

const app = express();

app.use('/', express.static(path.join(_dirname, 'static')));
app.use(bodyParser.json());

/**
 * use post method to  perform http request
 *@param /api/updatePassword API route
 * @param {async} function for response and requests
 * @param request request sent to server
 * @param response response received from server
 */
app.post('/api/updatePassword', async (request, response) => {

    const {token, newPassword: plainTextPassword} = request.body;

    if(!plainTextPassword || typeof plainTextPassword !== 'string')
    {
        return response.json({status: 'error', error: 'Invalid password'})
    }

    if(plainTextPassword.length < 4)
    {
        return response.json({status: 'error', error: 'Password too short. Password should be atleast 5 characters'})
    }

    try {
        const user = jwt.verify(token, secret_token);

        const _id = user.id;

        const password = await bcrypt.hash(plainTextPassword, 10);

        await User.updateOne({_id}, {
            $set: {password}
        });
        response.json({status: 'ok'})
    }catch(error){
        response.json({status: 'error',error:';))'});


    }

});

/**
 * use post method to  perform http request
 *@param /api/updatePassword API route
 * @param {async} function for response and requests
 * @param request request sent to server
 * @param response response received from server
 */
app.post('/api/login', async (request, response) => {
    const {userName, password: plainTextPassword } = request.body;
    const user = await User.find({userName}).lean();

    if(!user){
        return response.json({status: 'error', error: 'Invalid username/password entered'})
    }

    if(!plainTextPassword)

        if(await bcrypt.compare(plainTextPassword, user.password)){
            //password and username match an existing user

            const token = jwt.sign({id: user.ID, username: user.userName}, secret_token);
            return response.json({status: 'ok', data: token})
        }
    response.json({status: 'error', error: 'Invalid username/password entered'})
});

module.exports = router;