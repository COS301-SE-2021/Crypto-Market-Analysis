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
let port = process.env.PORT || 3443
// const sslServer = https.createServer(
//     {
//         key: fs.readFileSync(path.join(__dirname, 'SSL', 'key.pem')),
//         cert: fs.readFileSync(path.join(__dirname, 'SSL', 'cert.pem')),
//     },
//     app
// )
// sslServer.listen(port, () => console.log('Secure server running on port '+port))
 http.createServer(app);

 app.listen(port, () => console.log('Secure server running on port '+port));
cron.schedule('*/59 * * * *', async () => {

    console.log('analysing every hour')
    const cryptos =await analysis.get_Doc_id('Twitter');
    for(let crypto of cryptos)
    {
        let data = await  analysis.sentimentAnalysis(crypto,'Twitter').then(data=>{
              return data;
              }).catch(err=>{return err})
        let changeEveryHour = await analysis.saveAverageChange('Twitter',crypto).then(change=>{
            return change;
        }).catch(err=>{return err});

    }
    for(let crypto of cryptos)
    {
        let data = await average.Analyse_Average('Twitter',crypto ).then(async(dt)=>{
            let msgType = new notificationType(dt,crypto );
                            const nothing= crypto  + ' average sentiment did not change!';
                            let results = msgType.Results();
                            if(results !==nothing ){
                                await notification.followers(crypto,results);
                            }
        }).catch(err=>{return err})

    }
    console.log('Messaging done!')


});
