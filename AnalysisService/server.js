const http = require('http');
const app = require('./app');
const dotenv = require('dotenv');
const cron = require('node-cron');
const analysis = require('./analysisFunction');
const notification = require('./notification/notification');
const notificationType =require('./notification/notificationType')
const average = require('./notification/AverageSentiment')
dotenv.config();
const port = 8000;
console.log(`Listening on port ${port}`);
http.createServer(app);
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
app.listen(port);

