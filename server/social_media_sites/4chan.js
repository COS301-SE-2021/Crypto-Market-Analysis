const Nightmare = require('nightmare');
const cheerio = require('cheerio');
const fs = require('fs');
const board = "biz";

const url = (board) => {
    return  'http://boards.4chan.org/' + board + '/catalog';
}