const Nightmare = require('nightmare');
const cheerio = require('cheerio');
const fs = require('fs');
const board = "biz";

const url = (board) => {
    return  'http://boards.4chan.org/' + board + '/catalog';
}

const crawlCatalogue = async() => {
    console.log("Starting crawl process for /" + board + "/");
    const nightmare = new Nightmare({ show: false });
    try {
        let threadArray = [];
        let threads = await nightmare.goto(url(board))
            .wait('#threads .thread')
            .evaluate(() => {
                let elements = Array.from(document.getElementsByClassName('thread'));
                return elements.map(elem => {
                    return {
                        content: elem.innerHTML
                    }
                });
            })