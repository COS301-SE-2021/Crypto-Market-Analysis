const Twit = require('twit');
const Database = require('../database/Database');

const consumer_key = 'GGXUovWNfvGvagGakjfTzDfe1';
const consumer_secret = 'UMG68Qym8K7vvsdtlEEIn0vRpyNj6Mfbmz6VUKMC3zn7tQNiat';
const access_token = '1401939250858319875-zS8LTvSWz5UspdmaF63hxzpkLv0lbE';
const access_secret_token = 'YDEVhFyEMZuKPN1JAJeeyJPggOeeNVscl17PRXBOObKhP';

const T = new Twit({
    consumer_key:         consumer_key,
    consumer_secret:      consumer_secret,
    access_token:         access_token,
    access_token_secret: access_secret_token, })

class Twitter {
    #firestore_db = new Database().getInstance();

    /** Gets the id's of the screen names of the users passed as a parameter.
     * @param {[String]} users An array of the screen name of twitter users.
     * */
    async getUsersID(users) {
        let screenNames = "";
        let userIDs = [];
        users.forEach((user, index) => {
            if(index === users.length - 1)
                screenNames += user;
            else
                screenNames += user + ",";
        })
        await T.get('users/lookup', {screen_name:screenNames}, (err, data, response) => {
            if(err) {
                console.error(`An error occurred while connecting to the Twitter API: ${err}`);
                return -1;
            }
            else{
                data.forEach(async (user) => {
                    this.#firestore_db.save('twitter_data',user.screen_name,'id',user.id);
                });

            }
        }).then();
    }

    /** This function accepts a list of users and makes an API call to the Twitter API to get the 10 latest tweets.
     * @param {[String]} users An array of the screen name of twitter users.
     * */
    getUserTimeline(users){
        let error = 0;

        if (!Array.isArray(users)) {
            console.error("Variable passed in is not of type String[]");
            error = -2;
            return error;
        }
        else if(users.length < 1) {
            error = -1;
            return error;
        }
        else{
            users.forEach(async user => {
                if(typeof user !== 'string'){
                    console.error("Array contains values that are not of type String");
                    error = -2;
                }
                else{
                    await T.get('statuses/user_timeline', {screen_name: user}, (err, data, response) => {
                        if(response.caseless.get("status") !== "200 OK"){
                            console.error(`An error occurred while connecting to the twitter API: ${response.caseless.get("status")}`);
                            console.error(err);
                            error = -3;
                        }
                        else{
                            let tweets = [];
                            data.forEach(tweet => {
                                tweets.push(tweet.text);
                            });
                            this.#firestore_db.save('twitter_data', user, "tweets", tweets);
                        }
                    });
                }
            });
            return error;
        }
    }
}

module.exports = Twitter;
