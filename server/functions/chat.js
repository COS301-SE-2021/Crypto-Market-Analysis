const Database = require('../database/Database');
const firestore_db = new Database().getInstance();


const getAllChats = async (room, owner)=>{
    let allposts = [];
    try{
        const docs = await firestore_db.fetch(owner).then((snapshot) => {return snapshot.docs;});
        console.log(docs)
        for(const doc of docs)
            allposts.push(doc.data());

        return {status: `Ok`, posts_array: allposts};
    }
    catch(err){
        return Promise.reject(new Error(err));
    }
}

const postMessage = async (postId,owner,title,body,time,like,dislike,sentiment,room)=> {
    try{

        await firestore_db.save(room, postId,`postId` , postId);
        await firestore_db.save(room, postId, `owner`, owner);
        await firestore_db.save(room, postId, `title`, title);
        await firestore_db.save(room, postId, `body`, body);
        await firestore_db.save(room, postId, `time`, time);
        await firestore_db.save(room, postId, `like`, like);
        await firestore_db.save(room, postId, `dislike`, dislike);
        await firestore_db.save(room, postId, `sentiment`, sentiment);
        await firestore_db.save(room, postId, `room`, room);

        return {status: `Ok`};

    }
    catch(err){
        return {status:`Internal Server Error`, error: err}
    }
}

const postReact = async (owner, react, postId,room)=>{
    if(react === "like")
    {
        let num = await firestore_db.fetch(room, postId,"like")
        await firestore_db.save(room, postId,"like", ++num);
    }
    else if(react === "dislike")
    {
        let num = await firestore_db.fetch(room, postId,"dislike")
        await firestore_db.save(room, postId,"dislike", ++num);
    }
    return {status: 'successful'};
}

module.exports = { postMessage, getAllChats, postReact}

