/*setting up express.js which will be user by the server
to capture the user info/request made by the front-end code*/

const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const User = require('./model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret_token = 'kabdaskjndbjhbkjaishouvhadjkljaosiuiygm';

mongoose.connect('mongodb://localhost:27017/login-app-db',{


});
const app = express();

app.use('/', express.static(path.join(_dirname, 'static')));
app.use(bodyParser.json());

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
