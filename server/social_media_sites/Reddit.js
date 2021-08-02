const snoowrap = require('snoowrap');
const Database = require('../database/Database');
const userAgent = 'codex';
const clientId = '9hYB1ExwwjFAPw';
const clientSecret = 'jvq3MgpkmN0WUXqnjAct2DXTU-h-ow';
const username = 'JuGGz87';
const pass = 'Ndhlovu4Lyf';
const empty = [];
const r = new snoowrap({
    userAgent: userAgent,
    clientId: clientId,
    clientSecret: clientSecret,
    username: username,
    password: pass
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
    scrapeSubreddit2 = async (Subreddit) => {
        const subreddit1 = await r.getSubreddit(Subreddit);
        let Data = [];
        const topPosts1 = await subreddit1.getTop({limit: 100});
        topPosts1.forEach((post) => {
            Data.push(post.title);
        });
        this.#firestore_db.save('Reddit',Subreddit,'post',empty);
        this.#firestore_db.save('Reddit',Subreddit,'post',Data);
    }


        completeScrape= async (Subreddit) => {
        const subreddit1 = await r.getSubreddit(Subreddit);
        let Data = [];
        const topPosts1 = await subreddit1.getTop({limit: 100});
        topPosts1.forEach((post) => {
            Data.push(
                {
                    text: post.title,
                    link: post.url,
                    score: post.score,
                    author: post.author.name
                  }

            );
        });
        // console.log(Data)
        this.#firestore_db.save('reddit_info',Subreddit,'posts',empty);
        this.#firestore_db.save('reddit_info',Subreddit,'posts',Data);
        // this.#firestore_db.save('reddit_data',Subreddit,'posts',Data);
    }

    //get subreddits all users are following then scrap that specific array
    allSubreddits= async () => {
        let val;
        let test;
        let arr = [];
        val= this.#firestore_db.fetch(`Users`)
            .then(snapshot => {
                const docs = snapshot.docs;
                for(const doc of docs){
                    if(doc.data().subreddits)
                    {
                        arr.push(doc.data().subreddits)
                    }
                }
                const flat = arr.flat();
                let unique = flat.filter((item, i, ar) => ar.indexOf(item) === i);
                console.log(unique);
            }).catch((error) => {
                console.error(error);
            });
    }
}

let reddits = new Reddit();
// reddits.completeScrape("CryptoCurrencies").then();
// reddits.completeScrape("SatoshiStreetBets").then();
// reddits.completeScrape("Crypto_Currency_News").then();
// reddits.completeScrape("CryptoCurrencyTrading").then();
// reddits.completeScrape("Cryptomarkets").then();
// reddits.scrapeSubreddit2("Bitcoin").then();
// reddits.scrapeSubreddit2("Ethereum").then();

reddits.allSubreddits().then();


module.exports = Reddit;
