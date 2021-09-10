const Database = require('../database/Database');
const firestore_db = new Database().getInstance();


const returnPost = async (email, postId)=>{
    let replies = await firestore_db.fetch("Altcoins", postId,`replies`)
    let temp = [];
    for(let i of replies)
        i && temp.push(i); // copy each non-empty value to the 'temp' array
    replies = temp;
    return {status: `Ok`, posts_array: replies};
}

const getPost = async (email, postId)=>{
    let getPost = await firestore_db.fetch("Altcoins", postId)
    return {status: `Ok`, posts_array: getPost};
}

const getAllChats = async (room, owner)=>{
    let allposts = [];
    try{
        const docs = await firestore_db.fetch(owner).then((snapshot) => {return snapshot.docs;});
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

const totalPosts = async (owner, room)=>{
    let num = 0;
    try{
        const docs = await firestore_db.fetch(room).then((snapshot) => {return snapshot.docs;});
        for(const doc of docs)
            num++;

        return {status: `Ok`, numberPosts: num};
    }
    catch(err){
        return Promise.reject(new Error(err));
    }
    return {status: 'successful'};
}

const postReply = async (postId,owner,room,time,body)=>{
    let Object = {
        owner: owner,
        room: room,
        time: time,
        body: body
    }

    let existing = await firestore_db.fetch(room, postId,`replies`)
    if(Array.isArray(existing)) {
       existing.push(Object)
        await firestore_db.save(room, postId,"replies",existing);
    }else{
        let arr = [];
        arr.push(existing)
        arr.push(Object)
        await firestore_db.save(room, postId,"replies",arr);
    }
    return {status: 'successful'};

}

module.exports = { postMessage, getAllChats, postReact, totalPosts, postReply,returnPost, getPost}

