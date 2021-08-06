const express = require('express')
const https = require('https')
const path = require('path')
const fs = require('fs')
const dotenv = require('dotenv');
const cron = require('node-cron');
const analysis = require('./analysisFunction');
const notification = require('./notification/notification');
const notificationType =require('./notification/notificationType')
const Push_notification=require('./notification/push_notification')
const average = require('./notification/AverageSentiment')
const app = express()

app.use('/', (req, res, next) => {
    res.send('SSL server started')

})

const sslServer = https.createServer(
    {
        key: fs.readFileSync(path.join(__dirname, 'SSL', 'key.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'SSL', 'cert.pem')),
    },
    app
)

sslServer.listen(3443, () => console.log('Secure server running on port 3443'))
let push = new Push_notification();

cron.schedule('*/1 * * * *', async () => {
   console.log('Analysing every minute');
    await analysis.sentimentAnalysis('Bitcoin','Twitter').then(data=>{
        console.log('outputting data');
        console.log(data);
        average.Analyse_Average('Twitter','Bitcoin').then(dt=>{
            console.log('showing data results');
            console.log(dt);
            let msgType = new notificationType(dt,'Bitcoin');
            let results = msgType.Results();
            notification.followers('Bitcoin',results);
        });

    }).catch(err=>{   console.log('Error in Sentiment Analysis');})
    console.log('Analysing done!');
});