const Database = require('../database/Database');
const firestore_db = new Database().getInstance();
const Analyse_Average = async(SocialMedia,cryptocurrency)=>{
   await firestore_db.getUsers(SocialMedia).onSnapshot((documents) => {
        documents.forEach((doc) => {
            if(typeof doc.id !== "undefined" && doc.id===cryptocurrency )
            {
                const difference = doc.data().Average- doc.data().Old_Average ;
                console.log(doc.data().Old_Average)
                console.log(difference)
                if(difference < 0)
                {
                    return 'negative';
                }
               else if(difference > 0)
                {
                    return 'positive';
                }
               else
                {
                    return 'nothing';
                }

            }

        })
    })
}
Analyse_Average('Twitter','Bitcoin').then(data=>{
    console.log('my data is here')
    console.log(data);
})
module.exports ={Analyse_Average };