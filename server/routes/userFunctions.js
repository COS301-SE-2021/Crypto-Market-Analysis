const Database = require('../database/Database');
const User_Hash_Table = require(`../Hash_Tables/User_Hash_Table`);
const user_object = new User_Hash_Table().getInstance();
const firestore_db = new Database().getInstance();

const get4chanPost = async ()=>{
    let fourChanPosts = [];

    try{
        const docs = await firestore_db.fetch(`4chan_data`).then((snapshot) => {return snapshot.docs;});
        for(const doc of docs)
            fourChanPosts.push(doc.data().posts);

        return {status: `Ok`, posts_array: fourChanPosts};
    }
    catch(err){
        return Promise.reject(new Error(err));
    }
}
/** This function gets all the tweets stored in the database.
 * @return  {object} Containing an array of screen names and tweets array if it was successful or a rejected Promise.
 * */
const getUserTweets = async ()=>{
    let screen_names = [];
    let tweets = [];
    try{
        const docs = await firestore_db.fetch(`twitter_data`).then(snapshot => {return snapshot.docs});
        for(const doc of docs){
            screen_names.push(doc.data().screen_name);
            tweets.push(doc.data().tweets);
        }
        return {status: `Ok`, screen_names: screen_names, tweets_array: tweets}
    }
    catch(err){
        return Promise.reject(new Error(err));
    }
}

/** Gets all the reddit posts from the database.
 * @return  {object} Containing an array of posts if it was successful or a rejected Promise.
* */
const getRedditPost = async ()=>{
    let posts = [];
    try{
        const docs = await firestore_db.fetch(`reddit_data`).then(snapshot => {return snapshot.docs});
        for(const doc of docs)
            posts.push(doc.data().posts);
        return {status: `Ok`, posts: posts};
    }
    catch(err){
        return Promise.reject(new Error(err));
    }
}
const getUserCrypto = async (email_address)=>{
    try{
        await user_object.getCryptoName(email_address);
    }
    catch (error){
        return Promise.reject(error);
    }
}

const fetchUserSocialMedia = async(email_address)=>{
    let socialMediaName = [];
    const email = email_address;
    try{
        const docs = await firestore_db.fetch(`Users`).then(snapshot => {return snapshot.docs});
        for(const doc of docs){
            if(doc.id === email){
                socialMediaName.push(doc.data().social_media_sites);
                break;
            }
        }
        return {status: `Ok`, SocialMediaName: socialMediaName};
    }
    catch(err){
        return Promise.reject(new Error(err));
    }
}

const followCrypto = async (email_address,symbol,crypt_name )=>{

    const email = email_address;
    let crypto = [];
    let crypto_name = [];
    let found = false;

    try{
        const docs =  await firestore_db.fetch(`Users`).then(snapshot => {return snapshot.docs});
        for(const doc of docs){
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

        if(found === false){ return {status: `Not authorized`, error: `The user does not exist`};}

        if(!crypto_name.includes(crypt_name)){
            crypto.push(symbol);
            crypto_name.push(crypt_name);
        }
        else {
            return {status: `Accepted`, message: `The cryptocurrency already exists`};
        }

        try{
            await firestore_db.save(`Users`, email, `crypto`, crypto);
            await firestore_db.save(`Users`, email, `crypto_name`, crypto_name);
            await user_object.insertCrypto(email, crypto, crypto_name);
        }
        catch (err){
            return {status: `Internal Server Error`, error:err};
        }

        return {status: `Ok`, message: `The crypto been successfully added`};
    }
    catch(err){
        return Promise.reject(new Error(err));
    }
}
const followSocialMedia = async (email_address,social_media )=> {
    try{
        await user_object.insertSocialMediaSite(email_address, social_media);
    }
    catch (error){
        return Promise.reject(error);
    }
}


const saveToDB = async (arr, socialmedia , crypto)=> {
    let mini=Math.min.apply(Math, arr)
    let maxi = Math.max.apply(Math, arr)
    const age = arr => arr.reduce((acc,v) => acc + v)
    let average = age(arr)
    try{
        await firestore_db.save(socialmedia, crypto, `Analysis_score`, arr);
        await firestore_db.save(socialmedia, crypto, `Min`, mini);
        await firestore_db.save(socialmedia, crypto, `Max`, maxi);
        await firestore_db.save(socialmedia, crypto, `Average`, average);

    }
    catch(err){
        return {status:`Internal Server Error`, error: err}
    }

    return {Analysis_score: arr ,Min: mini,Max: maxi,Average: average};
}


module.exports = {saveToDB,getRedditPost,getUserCrypto,fetchUserSocialMedia,followCrypto,followSocialMedia, get4chanPost}
