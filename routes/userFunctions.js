const Database = require('../database/Database');
const User_Hash_Table = require(`../functions/User_Hash_Table`);
const user_object = new User_Hash_Table().getInstance();
const firestore_db = new Database().getInstance();
const reddit =require('../functions/Reddit');
const redditScrapper = new reddit();

const register = async email => {
    return await user_object.insertUser(email);
}

const deleteUserAccount = async (email) => {
    return await user_object.delete(email).then(async () => {
        return await firestore_db.deleteUser(email);
    }).catch(error => {
        return Promise.reject(error)
    })
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

const getAnalysis=async(Social_Media,Cryptocurrency)=>{
    let metadata={};
    return new Promise(function (resolve, reject) {
        firestore_db.fetchAnalysisScore(Social_Media).onSnapshot(async (documents) => {
            documents.forEach((doc) => {

                if (doc.id === Cryptocurrency) {
                    resolve(doc.data());

                }

            })
        })
    })
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

const getCoinPredictions = async (email)=>{
    // let fourChanPosts = [];
    // let cryptos = []
    // try {
    //     cryptos = await firestore_db.fetch("Users",email,"crypto");
    // }
    // catch (error){
    //     return Promise.reject(error);
    // }
    //
    // let docs = []
    // for(let i=0; i<cryptos.length; i++)
    // {
    //     docs.push(await firestore_db.fetch(`CryptoPricePrediction`,cryptos[i]));
    // }
    // for(docs of docs)
    //     fourChanPosts.push(docs.data());
    //
    // return {status: `Ok`, posts_array: fourChanPosts};

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

const fetchUserSocialMedia = async(email_address)=>{
    try{
        return await user_object.getSocialMediaSites(email_address);
    }
    catch (error){
        return Promise.reject(error);
    }
}

const followCrypto = async (email_address,symbol,crypto_name, coin_id)=>{
    try{
        return await user_object.insertCrypto(email_address, symbol, crypto_name, coin_id);
    }
    catch (error){
        return Promise.reject(error)
    }
}

const unfollowCrypto = async (email_address, symbol, coin_id) => {
    try{
        return await user_object.removeCrypto(email_address, symbol, coin_id);
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

const getCoinIDs = async email_address => {
    try{
        return await user_object.getCoinIds(email_address);
    }
    catch (error) {
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

module.exports = {getCoinPredictions, deleteUserAccount,getAnalysis,getPush,setPush,setNotification,saveToDB,getNotification,getRedditPost,getUserCrypto,fetchUserSocialMedia,followCrypto, unfollowCrypto, followSocialMedia, unfollowSocialMedia, register, getCoinIDs}


