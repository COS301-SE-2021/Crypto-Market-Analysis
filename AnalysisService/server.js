const express = require('express')
const https = require('https')
const path = require('path')
const bodyParser = require("body-parser");
const fs = require('fs')
const dotenv = require('dotenv');
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
cron.schedule('*/1 * * * *', async () => {
    console.log('analysing every minutes')
   firestore_db.getUsers('Twitter').onSnapshot(async (documents) => {
        await documents.forEach((doc) => {
            if (typeof doc.id !== "undefined") {
                analysis.sentimentAnalysis(doc.id,'Twitter').then(data=>{

                }).catch(err=>{console.log(err)})
            }
          })
        })
  /*  firestore_db.getUsers('Reddit').onSnapshot(async (documents) => {
        await documents.forEach((doc) => {
            if (typeof doc.id !== "undefined") {
                analysis.sentimentAnalysis(doc.id,'Reddit').then(data=>{
                }).catch(err=>{console.log(err)})
            }
        })
    })*/
    firestore_db.getUsers('Twitter').onSnapshot(async (documents) => {
        await documents.forEach((doc) => {
            if (typeof doc.id !== "undefined") {
                average.Analyse_Average('Twitter',doc.id ).then(dt=>{
                    let msgType = new notificationType(dt,doc.id );
                    const nothing= doc.id  + ' average sentiment did not change!';
                    let results = msgType.Results();
                    if(results !==nothing ){
                        notification.followers(doc.id,results);
                    }
                }).catch(err=>{   console.log(err);})
            }
        })
    })


});
