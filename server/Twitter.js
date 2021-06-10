const consumer_key = 'GGXUovWNfvGvagGakjfTzDfe1';
const consumer_secret = 'UMG68Qym8K7vvsdtlEEIn0vRpyNj6Mfbmz6VUKMC3zn7tQNiat';
const access_token = '1401939250858319875-zS8LTvSWz5UspdmaF63hxzpkLv0lbE';
const access_secret_token = 'YDEVhFyEMZuKPN1JAJeeyJPggOeeNVscl17PRXBOObKhP';

let Twit = require('twit')
let T = new Twit({
    consumer_key:         consumer_key,
    consumer_secret:      consumer_secret,
    access_token:         access_token,
    access_token_secret: access_secret_token, })

class Twitter {
    getUsersID = async (users) => {
        let screenNames = "";
        let userIDs = [];
        users.forEach((user, index) => {
            if(index === users.length - 1)
                screenNames += user;
            else
                screenNames += user + ",";
        })
       T.get('users/lookup', {screen_name:screenNames}, (err, data, response) => {
            data.forEach((account) => {
                userIDs.push(account.id);
            })
            console.log("in")
            return userIDs;
        }).then(() => {return userIDs});
        /*if(userIDs.length === 0)
            console.log("empty")
        console.log(userIDs);
        return userIDs;*/
    }

    followAccounts = async (users) => {
        await this.getUsersID(users).then(res => {console.log(res)});
        console.log("out");
        /*const stream = T.stream('statuses/filter', {follow: '12'});
        stream.on('tweet', (tweet) => {
            console.log(tweet);
        })*/
    }
}

const twitter = new Twitter();
const users = ["elonmusk","jack"];
twitter.followAccounts(users);