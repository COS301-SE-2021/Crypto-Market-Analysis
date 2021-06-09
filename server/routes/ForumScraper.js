const request = require('request');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

//const url = "https://cryptointalk.com/forums/bitcoin-trading.11/"

//scrapes cryptoInTalk forum for influcential people talking about crypto
(async () => {

    const browser = await puppeteer.launch();
    const url ="https://cryptointalk.com/forums/news-updates.3/";
    const url1 ="https://cryptointalk.com/threads/bill-gates-takes-a-%E2%80%98neutral%E2%80%99-view-on-bitcoin.51734/";

    const page1 = await browser.newPage();
    const page = await browser.newPage();
    await page.goto(url);
    await page1.goto(url1);

    //HFblogNews scrape
    const HFblogNewspageUrl = "https://cryptointalk.com/threads/hotforex-market-analysis-and-news.9508/";
    const HFblogNewspage = await browser.newPage();
    await HFblogNewspage.goto(HFblogNewspageUrl);

    const HfBlogTitle = await page.evaluate(() =>
        Array.from(document.querySelectorAll("div.structItem-cell--main div.structItem-title")).map(p => p.innerText.trim()));

    const HfBlogUsername = await page.evaluate(() =>
        Array.from(document.querySelectorAll("ul.structItem-parts a.username")).map(p => p.innerText.trim()));

    const HfBlogArticle = await HFblogNewspage.evaluate(() =>
        Array.from(document.querySelectorAll("article.js-selectToQuote div.bbWrapper")).map(p => p.innerText.trim()));

    let HfBlogVal2 = Buffer.from('Hotforex - Market Analysis and News.');

    // FXOpenTrader scrape
    const FXOpenTraderpageUrl = "https://cryptointalk.com/threads/daily-market-analysis-by-fxopen.49932/";
    const FXOpenTraderpage = await browser.newPage();
    await FXOpenTraderpage.goto(FXOpenTraderpageUrl);

    const FXOpenTraderTitle = await page.evaluate(() =>
        Array.from(document.querySelectorAll("div.structItem-cell--main div.structItem-title")).map(p => p.innerText.trim()));

    const FXOpenTraderUsername = await page.evaluate(() =>
        Array.from(document.querySelectorAll("ul.structItem-parts a.username")).map(p => p.innerText.trim()));

    const FXOpenTraderArticle = await FXOpenTraderpage.evaluate(() =>
        Array.from(document.querySelectorAll("article.js-selectToQuote div.bbWrapper")).map(p => p.innerText.trim()));

    let FXOpenTraderVal = Buffer.from('Daily Market Analysis By FXOpen');

    //iterate and get specific post with the most views and replies
    let HFblogNews_Username, HFblogNews_Title,HfBlogNews_Article;
    let FXOpenTrader_Title, FXOpenTrader_Article,FXOpenTrader_Username;

    for(let i =0; i < HfBlogTitle.length; i++) {
        let HfBlogVal = Buffer.from(HfBlogTitle[i]);

        let FXOpenTraderVal2 = Buffer.from(FXOpenTraderTitle[i]);
        if(HfBlogVal.equals(HfBlogVal2)) {
            HFblogNews_Username = HfBlogUsername[i];
            HFblogNews_Title = HfBlogTitle[i];
            HfBlogNews_Article = HfBlogArticle[i].trim();

        }

        if(FXOpenTraderVal2.equals(FXOpenTraderVal)) {
            FXOpenTrader_Title = FXOpenTraderTitle[i];
            FXOpenTrader_Article = FXOpenTraderArticle[i];
            FXOpenTrader_Username = FXOpenTraderUsername[i];
        }
    }


    console.log({HFblogNews_Username,HFblogNews_Title,HfBlogNews_Article});

    console.log({FXOpenTrader_Username,FXOpenTrader_Title, FXOpenTrader_Article});

    browser.close();

})();


