const analysis = require("../analysisFunction");
const change=async ()=>{
    console.log('i am in ')
    const array_of_crypto = await analysis.get_Doc_id('Reddit');
    for (let crypto of array_of_crypto) {
        console.log('i am in here')
        let changeEveryHour = await analysis.saveAverageChange('Reddit', crypto).then(change => {
        }).catch(err => {
            return err
        });
    }
}