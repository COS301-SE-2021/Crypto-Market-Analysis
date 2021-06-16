const snoowrap = require('snoowrap');
const Database = require('../database/Database');
const userAgent = 'codex';
const clientId = '9hYB1ExwwjFAPw';
const clientSecret = 'jvq3MgpkmN0WUXqnjAct2DXTU-h-ow';
const username = 'JuGGz87';
const password = 'Ndhlovu4Lyf';
const empty = [];
const r = new snoowrap({
    userAgent: userAgent,
    clientId: clientId,
    clientSecret: clientSecret,
    username: username,
    password: password
});

class Reddit {
    #firestore_db = new Database().getInstance();
    scrapeSubreddit = async (Subreddit) => {
        const subreddit1 = await r.getSubreddit(Subreddit);
        let Data = [];
        const topPosts1 = await subreddit1.getTop({limit: 100});
        topPosts1.forEach((post) => {
            Data.push(post.title);
        });
        this.#firestore_db.save('reddit_data',Subreddit,'posts',empty);
        this.#firestore_db.save('reddit_data',Subreddit,'posts',Data);
    }
}
let reddits = new Reddit();
reddits.scrapeSubreddit("CryptoCurrencies").then();
reddits.scrapeSubreddit("SatoshiStreetBets").then();
reddits.scrapeSubreddit("Crypto_Currency_News").then();
reddits.scrapeSubreddit("CryptoCurrencyTrading").then();
reddits.scrapeSubreddit("Cryptomarkets").then();

