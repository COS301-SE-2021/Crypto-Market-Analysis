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

/** Gets all the reddit posts from the database.
 * @return  {object} Containing an array of posts if it was successful or a rejected Promise.
* */

const getRedditPost = async ()=>{
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
//test code
const getUserSubreddits = async (email_address)=>{
    try{
        return await user_object.getUserSubreddits(email_address);
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

const fetchUserSubreddits = async(email_address)=>{
    try{
        await user_object.getSubreddit(email_address);
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

const unfollowSubreddit = async (email_address, subreddit) => {
    try{
        await user_object.removeSubreddit(email_address, subreddit);
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

const followSubreddit = async (email_address,social_media )=> {
    console.log("in userfunctions");
    try{
        return await user_object.insertSubreddits(email_address, social_media);
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

module.exports = {getUserSubreddits,unfollowSubreddit, followSubreddit, fetchUserSubreddits, saveToDB,getRedditPost,getUserCrypto,fetchUserSocialMedia,followCrypto, unfollowCrypto, followSocialMedia, get4chanPost}
