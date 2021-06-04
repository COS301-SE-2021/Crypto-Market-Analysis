const mongoose = require("mongoose");

const Cryptocurrency = new mongoose.Schema({
     FollowedCryptoCurrency: [{ type: String }]
});
module.exports = mongoose.model("Cryptocurrency", Cryptocurrency);