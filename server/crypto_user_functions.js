const Twitter = require('twitter-v2');

//initialize
const consumer_key = 'GGXUovWNfvGvagGakjfTzDfe1';
const consumer_secret = 'UMG68Qym8K7vvsdtlEEIn0vRpyNj6Mfbmz6VUKMC3zn7tQNiat';
const access_token = '1401939250858319875-zS8LTvSWz5UspdmaF63hxzpkLv0lbE';
const access_secret_token = 'YDEVhFyEMZuKPN1JAJeeyJPggOeeNVscl17PRXBOObKhP';
const client = new Twitter({consumer_key, consumer_secret, access_token, access_secret_token});

const getTweets = async () => {
    /*const { data } = await client.get('statuses/user_timeline', { screen_name: 'elonmusk' });
    console.log(data);*/
    const { data } = await client.get('users/44196397/tweets?max_results=100', );
    console.log(data);
}

getTweets().then();