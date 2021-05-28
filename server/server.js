/*setting up express.js which will be user by the server
to capture the user info/request made by the front-end code*/

const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret_token = 'kabdaskjndbjhbkjaishouvhadjkljaosiuiygm';

mongoose.connect('mongodb://localhost:27017/login-app-db',{


});
const app = express();

app.use('/', express.static(path.join(_dirname, 'static')));
app.use(bodyParser.json());

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


app.post('/api/pages/login', async (request, response) => {
    const {userName, password: plainTextPassword } = request.body;
    const user = await User.find({userName}).lean();

    if(!user){
        return response.json({status: 'error', error: 'Invalid username/password entered'})
    }

    if(!plainTextPassword)

    if(await bcrypt.compare(plainTextPassword, user.password)){
        //password and username match an existing user

        const token = jwt.sign({id: user.ID, username: user.username}, secret_token);
        return response.json({status: 'ok', data: token})
    }
    response.json({status: 'error', error: 'Invalid username/password entered'})
});

app.listen(9999, ()=> {

    console.log('Server ports go up to 9999')
});
