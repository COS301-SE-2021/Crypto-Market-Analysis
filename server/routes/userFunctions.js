const database = require("./FirestoreDB")
const db = database.db;
/** This function gets the cryptos a user is following
 * @param {object} request A request object with the email.
 * @return  {object} A status code stating if the request was successful.
 * */
const getUserTweets = async (emailadrs)=>{
    let collection = null;
    let screen_names = [];
    let tweets = [];
    const email = emailadrs;
    try{
        collection = await db.collection(`twitter_data`).get().then((snapshot) =>{
                for (const doc of snapshot.docs) {
                    screen_names.push(doc.data().screen_name);
                    tweets.push(doc.data().tweets);
                }
            });
            return {status: `Ok`, screen_names: screen_names, tweets_array: tweets}
            //return response.status(200).json({status: `Ok`, screen_names: screen_names, tweets_array: tweets});
       }
        catch(err){

        }
}
module.exports = {getUserTweets}