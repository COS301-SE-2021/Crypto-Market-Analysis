const axios = require('axios');
const cheerio = require('cheerio');
const twitter=require("tweet-scraper");
const User = require("../models/user")
const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();
var getData = async(name) => {
    let data = await CoinGeckoClient.coins.fetch(name, {});
   // console.log(data);
    return data;
};
/* Tries to delete a user from the database
* @param {string} _id
* @return cryptocurrency data
* */
router.post("/getCryptodata",(request, response, next)=>
{
    User.find({ _id: request.body._id }, function (err, token) {
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
