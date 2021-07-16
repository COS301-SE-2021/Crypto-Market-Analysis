const database = require("./FirestoreDB")
const db = database.db;

const get4chanPost = async ()=>{
    let fourChanPosts = [];
    try{
        await db.collection(`4chan_data`).get().then((snapshot) =>{
            for (const doc of snapshot.docs) {
                fourChanPosts.push(doc.data().posts);
            }
        });
        return {status: `Ok`, posts_array: fourChanPosts};
    }
    catch(err){
        return Promise.reject(new Error(err));
    }
}
/** This function gets all the tweets stored in the database.
 * @return  {object} Containing an array of screen names and tweets array if it was successful or a rejected Promise.
 * */
/*const getUserTweets = async ()=>{
    let screen_names = [];
    let tweets = [];
    try{
        await db.collection(`twitter_data`).get().then((snapshot) =>{
            for (const doc of snapshot.docs) {
                screen_names.push(doc.data().screen_name);
                tweets.push(doc.data().tweets);
            }
        });
        return {status: `Ok`, screen_names: screen_names, tweets_array: tweets}
    }
    catch(err){
        return Promise.reject(new Error(err));
    }
}*/

/** Gets all the reddit posts from the database.
 * @return  {object} Containing an array of posts if it was successful or a rejected Promise.
* */
const getRedditPost = async ()=>{
    let posts = [];
    try{
        await db.collection(`reddit_data`).get().then((snapshot) =>{
            for (const doc of snapshot.docs) {
                posts.push(doc.data().posts);
            }
        });
        return {status: `Ok`, posts: posts};
    }
    catch(err){
        return Promise.reject(new Error(err));
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
const followSocialMedia = async (email_address,social_media )=> {
    const email = email_address;
    let social_media_sites = [];
    let data = {};
    let found = false;
    let docRef = null;
    try{
        docRef = db.collection(`Users`).doc(email)
    }
    catch (err) {
        return {status: `Internal Server Error`, error: `The document could not be retrieved: ${err}`};
    }

    try{
        await db.collection(`Users`).get().then((snapshot) =>{
            for (const doc of snapshot.docs) {
                if(doc.id === email){
                    found = true;
                    if(doc.data().social_media_sites)
                        social_media_sites = doc.data().social_media_sites;
                    else
                        social_media_sites = [];
                    break;
                }
            }
        });

        if(found === false)
            return {status: `Not authorized`, error: `The user does not exist`};

        if(!social_media_sites.includes(social_media))
            social_media_sites.push(social_media);
        else{
            return {status: `Accepted`, message: `The site already exists`};
        }
        data = {[`social_media_sites`]: social_media_sites}
        try{
            await docRef.set(data, {merge:true});
        }
        catch (err){
            console.log(`enters test 2`);
            return {status: `Internal Server Error`, error: `The site could not be added to the database: ${err}`};
        }
        return {status: `Ok`, message: `The social media site has been successfully added`};
    }
    catch(err){
        return {status:`Internal server error`, error: err};
    }
}

const saveToDB = async (arr, socialmedia , crypto)=> {
    let mini=Math.min.apply(Math, arr)
    let maxi = Math.max.apply(Math, arr)
    const age = arr => arr.reduce((acc,v) => acc + v)
    let average = age(arr)
    firestore_db.saveData(socialmedia,crypto,{Analysis_score: arr ,Min: mini,Max: maxi,Average: average})
    return {Analysis_score: arr ,Min: mini,Max: maxi,Average: average};
}
module.exports = {saveToDB,getRedditPost,getUserCrypto,fetchUserSocialMedia,followCrypto,followSocialMedia, get4chanPost}