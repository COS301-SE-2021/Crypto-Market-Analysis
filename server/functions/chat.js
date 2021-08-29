const Database = require('../database/Database');
const firestore_db = new Database().getInstance();


const getAllChats = async (room, owner)=>{
    let allposts = [];
    try{
        const docs = await firestore_db.fetch(room).then((snapshot) => {return snapshot.docs;});
        for(const doc of docs)
            allposts.push(doc.data());

        return {status: `Ok`, posts_array: allposts};
    }
    catch(err){
        return Promise.reject(new Error(err));
    }
}

const postMessage = async (owner,title,body,time,like,dislike,sentiment,room)=> {
    try{

        let post = {
            room: room,
            owner: owner,
            title: title,
            body: body,
            time: time,
            like: like,
            dislike: dislike,
            sentiment: sentiment
        };
        await firestore_db.savePost(post);

        return {status: `Ok`};

    }
    catch(err){
        return {status:`Internal Server Error`, error: err}
    }
}

const postReact = async (email, react)=>{
    if(react == "like")
    {

    }
    else if(react == "dislike")
    {

    }
    return {status: 'successful'};
}

module.exports = { postMessage, getAllChats, postReact}

