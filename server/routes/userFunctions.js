const Database = require('../database/Database');
const User_Hash_Table = require(`../Hash_Tables/User_Hash_Table`);
const user_object = new User_Hash_Table().getInstance();
const firestore_db = new Database().getInstance();

const get4chanPost = async ()=>{
    let fourChanPosts = [];

    try{
        const docs = await firestore_db.fetch(`4chan_info`).then((snapshot) => {return snapshot.docs;});
        for(const doc of docs)
            fourChanPosts.push(doc.data().posts);

        return {status: `Ok`, posts_array: fourChanPosts};
    }
    catch(err){
        return Promise.reject(new Error(err));
    }
}
const getNotification=async(email)=>{
    const fields = await firestore_db.fetchNotification(email).then(data=>{
        return data;
    });
    return fields;
}
const setNotification=async(email,object)=>{
    await firestore_db.storeNotification(email, object);
}
const setPush=async(email,object)=>{
    await firestore_db.setPushNotification(email,object);
}
const getPush=async(email)=>{
    let mydata={};
   await firestore_db.fetchPushNotification(email).then(data=>{
      try{ mydata=data.data().subs;
      }
      catch{
          mydata={}
      }

    });
    return mydata;
}
/** Gets all the reddit posts from the database.
 * @return  {object} Containing an array of posts if it was successful or a rejected Promise.
* */

//
// const getRedditPost = async (email)=>{
//     // const citiesRef = db.collection('cities');
//     // const coastalCities = await citiesRef.where('regions', 'array-contains-any',
//     //     ['west_coast', 'east_coast']).get();
//     let posts = [];
//     try{
//         const docs = await firestore_db.fetch(`reddit_info`).then(snapshot => {return snapshot.docs});
//         for(const doc of docs)
//             posts.push(doc("CryptoCurrencies").data().posts);
//         return {status: `Ok`, posts: posts};
//     }
//     catch(err){
//         return Promise.reject(new Error(err));
//     }
// }

/*
const citiesRef = db.collection('cities');
const coastalCities = await citiesRef.where('regions', 'array-contains-any',
    ['west_coast', 'east_coast']).get();
 */
const getRedditPost = async (email)=>{
    let subs = await getUserSubreddits(email);
    let posts = [];

    let docs = [];
    for(let i=0; i<subs.length; i++)
    {

        docs.push(await firestore_db.fetch(`reddit_info`,subs[i],'posts'));
    }
    console.log(docs);
    posts = docs;
    return {status: `Ok`, posts: posts};
}


const coinRedditPost = async (coin)=>{
    // try {
        return await redditScrapper.getCoinRedditPost(coin);
    // }catch (e) {
    //     return Promise.reject(new Error(err))
    // }

}


const getUserNetwork = async (email_address)=>{
    try{
        return await user_object.getUserNetwork(email_address);
    }
    catch (error){
        return Promise.reject(error);
    }
}

//getCoinPredictions
const getCoinPredictions = async (email)=>{
       //  let coins =  await getUserNetwork(email);
       //  console.log(coins);
       //  let posts = [];
       //  let docs = [];
       //  for(let i=0; i<coins.length; i++)
       //  {
       //     // console.log(coins[i]);
       //      let open = await firestore_db.fetch(`CryptoPricePrediction`,coins[i],'open')
       //      let close = await firestore_db.fetch(`CryptoPricePrediction`,coins[i],'close')
       //      let high = await firestore_db.fetch(`CryptoPricePrediction`,coins[i],'high')
       //      let low = await firestore_db.fetch(`CryptoPricePrediction`,coins[i],'low')
       //      let obj = {
       //          open: open,
       //          close: close,
       //          high: high,
       //          low: low
       //      };
       //      docs.push(obj);
       //     // console.log(obj);
       //  }
       // // console.log(docs);
       //  posts = docs;
       //  console.log(posts);
       //  return {status: `Ok`, posts: posts};
    let fourChanPosts = [];

    try{
        const docs = await firestore_db.fetch(`CryptoPricePrediction`).then((snapshot) => {return snapshot.docs;});
        for(const doc of docs)
            fourChanPosts.push(doc.data());

        return {status: `Ok`, posts_array: fourChanPosts};
    }
    catch(err){
        return Promise.reject(new Error(err));
    }
}

const getUserCrypto = async (email_address)=>{

    try{
        const docs = await firestore_db.fetch(`reddit_info`).then(snapshot => {return snapshot.docs});
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
        return await user_object.getCryptoName(email_address);
    }
    catch (error){
        return Promise.reject(error);
    }
}

const fetchUserSocialMedia = async(email_address)=>{
    try{
        return await user_object.getSocialMediaSites(email_address);
    }
    catch (error){
        return Promise.reject(error);
    }
}

const followCrypto = async (email_address,symbol,crypto_name )=>{
    try{
        return await user_object.insertCrypto(email_address, symbol, crypto_name);
    }
    catch (error){
        return Promise.reject(error)
    }
}

const unfollowCrypto = async (email_address, symbol) => {
    try{
        await user_object.removeCrypto(email_address, symbol);
    }
    catch (error){
        return Promise.reject(error);
    }
}

const followSocialMedia = async (email_address,social_media )=> {
    try{
        return await user_object.insertSocialMediaSite(email_address, social_media);
    }
    catch (error){
        return Promise.reject(error);
    }
}

const unfollowSocialMedia = async (email_address, social_media) => {
    try{
        return await user_object.removeSocialMediaSite(email_address, social_media);
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


module.exports = {getPush,setPush,setNotification,getNotification,getCoinPredictions,getUserNetwork,coinRedditPost, getUserSubreddits,unfollowSubreddit, followSubreddit, fetchUserSubreddits, saveToDB,getRedditPost,getUserCrypto,fetchUserSocialMedia,followCrypto, unfollowCrypto, followSocialMedia, unfollowSocialMedia, get4chanPost}

