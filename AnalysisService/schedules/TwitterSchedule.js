require("dotenv").config();
const analysis = require('../analysisFunction');
const twitter_schedule=async()=>{
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
    process.exit(0)

}
twitter_schedule().then(data=>console.log(data));