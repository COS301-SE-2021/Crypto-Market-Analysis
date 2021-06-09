const Twitter = require('twitter-v2');
const snoowrap = require('snoowrap');
const Sentiment = require('sentiment');
const vader = require('vader-sentiment');

//initialize
const consumer_key = 'GGXUovWNfvGvagGakjfTzDfe1';
const consumer_secret = 'UMG68Qym8K7vvsdtlEEIn0vRpyNj6Mfbmz6VUKMC3zn7tQNiat';
const access_token = '1401939250858319875-zS8LTvSWz5UspdmaF63hxzpkLv0lbE';
const access_secret_token = 'YDEVhFyEMZuKPN1JAJeeyJPggOeeNVscl17PRXBOObKhP';
const client = new Twitter({consumer_key, consumer_secret, access_token, access_secret_token});

//intialize reddit
const userAgent = 'codex';
const clientId = '9hYB1ExwwjFAPw';
const clientSecret = 'jvq3MgpkmN0WUXqnjAct2DXTU-h-ow';
const username = 'JuGGz87';
const password = 'Ndhlovu4Lyf';


async function scrapeSubreddit() {
    const r = new snoowrap({
        userAgent: userAgent,
        clientId: clientId,
        clientSecret: clientSecret,
        username: username,
        password: password
    });

//subreddits
    const subreddit1 = await r.getSubreddit('Cryptomarkets');
    const subreddit2 = await r.getSubreddit('CryptoCurrencyTrading');
    const subreddit3 = await r.getSubreddit('Crypto_Currency_News');
    const subreddit4 = await r.getSubreddit('SatoshiStreetBets');
    const subreddit5 = await r.getSubreddit('CryptoCurrencies');


    const topPosts1 = await subreddit1.getTop({ limit: 100});
    const topPosts2 = await subreddit2.getTop({ limit: 100});
    const topPosts3 = await subreddit3.getTop({ limit: 100});
    const topPosts4 = await subreddit4.getTop({ limit: 100});
    const topPosts5 = await subreddit5.getTop({ limit: 100});


}








const getTweets = async () => {
    /*const { data } = await client.get('statuses/user_timeline', { screen_name: 'elonmusk' });
    console.log(data);*/
    const { data } = await client.get('users/44196397/tweets?max_results=100', );
    console.log(data);
}



getTweets().then();



