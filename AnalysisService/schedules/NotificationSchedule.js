require("dotenv").config();
const analysis = require('../analysisFunction');
const notification = require("../notification/notification");
const notificationType =require('../notification/notificationType')
const average = require('../notification/AverageSentiment')
const Notification_schedule=async()=>{
    let i=1;
    const cryptos =await analysis.get_Doc_id('Twitter');
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
    if(i === cryptos.length)
    {
        process.exit(0);
    }
    i++;


}
Notification_schedule().then(data=>{
    process.exit(0)
    console.log(data)
});