const Database = require('../database/Database');
const User_Hash_Table = require(`../Hash_Tables/User_Hash_Table`);
const user_object = new User_Hash_Table().getInstance();
const firestore_db = new Database().getInstance();
const reddit =require('../social_media_sites/Reddit');
const redditScrapper = new reddit();

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

const getUserCrypto = async (email_address)=>{
    try{
        return await user_object.getCryptoName(email_address);
    }
    catch (error){
        return Promise.reject(error);
    }
}

const getCoinPredictions = async (email)=>{
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
        return await user_object.removeCrypto(email_address, symbol);
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

module.exports = { getCoinPredictions,getUserNetwork, fetchUserSocialMedia, getPush,setPush,setNotification,saveToDB,getNotification, getUserCrypto,followCrypto, unfollowCrypto, followSocialMedia, unfollowSocialMedia}

