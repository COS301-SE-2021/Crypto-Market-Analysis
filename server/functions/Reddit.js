const snoowrap = require('snoowrap');
const Database = require('../database/Database');
const User_Hash_Table = require(`../functions/User_Hash_Table`);
const user_object = new User_Hash_Table().getInstance();
const firestore_db = new Database().getInstance();
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


    coinRedditPost = async (coin)=>{
        return await this.getCoinRedditPost(coin);
    }


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
            }).catch((error) => {
                console.error(error);
            });
    }

    getCoinRedditPost= async (coin) => {
        let notfound = {
            text: "Subreddit Not Found... Displaying data from r/CryptoCurrencies",
            link: "https://external-preview.redd.it/gDidjvUkV806tx6OToVm2_UbSB8_s2-ES7yuh99BUGs.jpg?auto=webp&s=7b3e2d041d6843e13228a9bda2aa3eb5eaed7d9e",
            score: "0",
            author: "System Message"
        }
        let Data = [];
        if (coin.split(" ").length > 1) {
            // at least 2 strings
            coin = "CryptoCurrencies";
            Data.push(notfound)
        }
        const subreddit1 = await r.getSubreddit(coin);
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
        if(Data.length===0)
        {
            Data.push(notfound);
        }
        return Data;
    }
}

module.exports = Reddit;
