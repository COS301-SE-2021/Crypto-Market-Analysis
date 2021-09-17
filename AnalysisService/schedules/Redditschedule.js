require("dotenv").config();
const analysis = require('../analysisFunction');
let i=1;
const reddit_schedule=async ()=>{
    const array_of_crypto =await analysis.get_Doc_id('Reddit');
    for(let crypto of array_of_crypto) {
        let data = await analysis.sentimentAnalysis(crypto, 'Reddit').then((data) => {
        }).catch(err => {
            return err
        })
        if(i === array_of_crypto.length)
        {
            process.exit(0);
        }
        i++;
    }
}
reddit_schedule().then(data=>
    process.exit(0)
);
