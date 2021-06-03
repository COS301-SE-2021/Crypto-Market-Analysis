const mongoose = require("mongoose");

const TokenVerify = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },//saving token
    createdAt: { type: Date, required: true, default: Date.now, expires: 86400 }//24 hrs expiration time
});
module.exports = mongoose.model("Token", TokenVerify);