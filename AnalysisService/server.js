const express = require('express')
const https = require('https')
const path = require('path')
const bodyParser = require("body-parser");
const fs = require('fs')
require("dotenv").config();
const http = require('http');
const cron = require('node-cron');
const analysis = require('./analysisFunction');
const notification = require('./notification/notification');
const notificationType =require('./notification/notificationType')
const Database = require('./database/Database');
const firestore_db = new Database().getInstance();
const average = require('./notification/AverageSentiment')
const app = require('./app');

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
http.createServer(app);

app.listen(8000);
cron.schedule('*/1 * * * *',  async() => {
    console.log('analysing every hour')
    const cryptos =await analysis.get_Doc_id('Twitter');
    for(let crypto of cryptos)
    {
        let data = await  analysis.sentimentAnalysis(crypto,'Twitter').then(data=>{
              }).catch(err=>{return err})

    }
    for(let crypto of cryptos)
    {
        let data = await average.Analyse_Average('Twitter',crypto ).then(async(dt)=>{
            let msgType = new notificationType(dt,crypto );
                            const nothing= crypto  + ' average sentiment did not change!';
                            let results = msgType.Results();
                            if(results ===nothing ){
                                await notification.followers(crypto,results);
                            }
        }).catch(err=>{return err})

    }
    console.log('Messaging done!')


});
