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
            return Promise.reject(new Error('get User Tweets Error'));
        }
}
const getRedditPost = async (email_address)=>{
    let collection = null;
    let posts = [];
    try{
        collection = await db.collection(`reddit_data`).get().then((snapshot) =>{
            for (const doc of snapshot.docs) {
                posts.push(doc.data().posts);
            }
        });
        return {status: `Ok`, posts: posts};
    }
    catch(err){
        return Promise.reject(new Error('Error with the database'));
    }
}
const getUserCrypto = async (email_address)=>{
    const email = email_address;
    let cryptoSymbols = [];
    try{
        await db.collection(`Users`).get().then((snapshot) =>{
            for (const doc of snapshot.docs) {
                if(doc.id === email){
                    cryptoSymbols.push(doc.data().crypto_name);
                    break;
                }
            }
        });
        return {status: `Ok`, messageN: cryptoSymbols};
    }
    catch(err){
        return Promise.reject(new Error('Error with the database'));
    }
}
const fetchUserSocialMedia =async(email_address)=>{
    let socialMediaName = [];
    const email = email_address;
    try{
        await db.collection(`Users`).get().then((snapshot) =>{
            for (const doc of snapshot.docs) {
                if(doc.id === email){
                    socialMediaName.push(doc.data().social_media_sites);
                    break;
                }
            }
        });
        return {status: `Ok`, SocialMediaName: socialMediaName};
    }
    catch(err){
        return Promise.reject(new Error('Error with the database'));
    }
}
const followCrypto = async (email_address,symbol,crypt_name )=>{

    const email = email_address;
    let crypto = [];
    let crypto_name = [];
    let data = {};
    let found = false;
    let docRef = null;
    try{
        docRef = await db.collection(`Users`).doc(email)
    }
    catch (err) {
        return {status: `Internal Server Error`, error: `The document could not be retrieved: ${err}`};
    }

    try{
        await db.collection(`Users`).get().then((snapshot) =>{
            for (const doc of snapshot.docs) {
                if(doc.id === email){
                    found = true;
                    if(doc.data().crypto)
                        crypto = doc.data().crypto;
                    else
                        crypto = [];
                    if(doc.data().crypto_name)
                        crypto_name = doc.data().crypto_name;
                    else
                        crypto_name = [];
                    break;
                }
            }
        });
        if(found === false){ return {status: `Not authorized`, error: `The user does not exist`};}

        if(!crypto_name.includes(crypt_name)){
            crypto.push(symbol);
            crypto_name.push(crypt_name);
        }
        else {
            return {status: `Accepted`, message: `The cryptocurrency already exists`};
        }
        data = {[`crypto`]: crypto,[`crypto_name`]: crypto_name}
        try{
            await docRef.set(data, {merge:true});
        }
        catch (err){
            return 'The crypto could not be added to the database';
        }
        return {status: `Ok`, message: `The crypto been successfully added`};
    }
    catch(err){
        return Promise.reject(new Error('Error with the database'));
    }
}
const saveToDB = async (arr, socialmedia , crypto)=> {
    let mini=Math.min.apply(Math, arr)
    let maxi = Math.max.apply(Math, arr)
    const age = arr => arr.reduce((acc,v) => acc + v)
    let average = age(arr)
    await db.collection(socialmedia).doc(crypto).set({
        Analysis_score: arr ,Min: mini,Max: maxi,Average: average
    }, {merge: true})
    return {Analysis_score: arr ,Min: mini,Max: maxi,Average: average};
}
module.exports = {getUserTweets, saveToDB,getRedditPost,getUserCrypto,fetchUserSocialMedia,followCrypto}