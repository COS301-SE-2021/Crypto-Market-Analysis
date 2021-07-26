const http = require('http');
const app = require('./app');
const dotenv = require('dotenv');
const cron = require('node-cron');
const analysis = require('./analysisFunction');
dotenv.config();
const port = 8000;
console.log(`Listening on port ${port}`);
http.createServer(app);
cron.schedule('*/1 * * * *', async () => {
    console.log('Analysing every minute');
     await analysis.sentimentAnalysis('Bitcoin','Twitter').then(data=>{
         console.log('outputting data');
         console.log(data);
    }).catch(err=>{   console.log('Error in Sentiment Analysis');})
    console.log('Analysing done!');
});
app.listen(port);

