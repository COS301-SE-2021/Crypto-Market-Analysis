const mongoose = require('mongoose')

/*
* Creates  a user Schema to be used by the API
* */
const UserSchema = new mongoose.Schema(
    {
        userName: {type: String, required: true, unique: true},
        password: {type: String, required: true}
    },
    {collection: 'users'}
);

const model = mongoose.model('UserSchema', UserSchema);
module.exports = model;