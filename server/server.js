require("dotenv").config();
const http = require('http');
const app = require('./app');
const cron = require('node-cron');
const Reddit = require('./functions/Reddit');
const Twitter = require(`./functions/Twitter`);
const NeuralNetwork = require('./crypto_forecast/forecast');
const chan = require("./functions/chan");
const twitter = new Twitter().getInstance();
const sentiment_functions = require(`./functions/sentiment_functions`);
const port = process.env.PORT || 8080;
http.createServer(app).listen(port, () => {
    console.log(`Express app listening on port ${port}`);
});
