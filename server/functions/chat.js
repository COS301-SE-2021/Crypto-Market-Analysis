const Database = require('../database/Database');
const firestore_db = new Database().getInstance();


const returnPost = async (email, postId)=>{
    let replies = await firestore_db.fetch("Altcoins", postId,`replies`);
    let temp = [];
    for(let i of replies)
        i && temp.push(i); // copy each non-empty value to the 'temp' array
    replies = temp;
    return {status: `Ok`, posts_array: replies};
}

const getPost = async (email, postId)=>{
    let getPost = await firestore_db.fetch("Altcoins", postId)
    return {status: `Ok`, posts_array: getPost.data()};
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
        let existing = await firestore_db.fetch("Users", owner,`likedposts`)
        if(Array.isArray(existing)) {
            if(existing.includes(postId))
            {
                existing = existing.filter(item => item !== postId)
                let number = await firestore_db.fetch(room, postId,"like")
                await firestore_db.save(room, postId,"like", --number);
                return {status: 'already liked this post'};
            }
            existing.push(postId)
            await firestore_db.save("Users", owner,"likedposts", existing);
        }else{
            let arr = [];
            arr.push(existing)
            arr.push(postId)
            await firestore_db.save("Users", owner,"likedposts",arr);
        }

        let num = await firestore_db.fetch(room, postId,"like")
        await firestore_db.save(room, postId,"like", ++num);
    }
    else if(react === "dislike")
    {
        let existing = await firestore_db.fetch("Users", owner,`dislikedposts`)
        if(Array.isArray(existing)) {
            if(existing.includes(postId))
            {
                existing = existing.filter(item => item !== postId)
                let number = await firestore_db.fetch(room, postId,"dislike")
                await firestore_db.save(room, postId,"dislike", --number);
                return {status: 'already disliked this post'};
            }
            existing.push(postId)
            await firestore_db.save("Users", owner,"dislikedposts", existing);
        }else{
            let arr = [];
            arr.push(existing)
            arr.push(postId)
            await firestore_db.save("Users", owner,"dislikedposts",arr);
        }

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

const getUserLikedPosts = async (email)=>{
    let likereplies = await firestore_db.fetch("Users", email,`likedposts`);
    let temp = [];
    if(Array.isArray(likereplies))
    {
        for(let i of likereplies)
            i && temp.push(i); // copy each non-empty value to the 'temp' array
        likereplies = temp;
        return {status: `Ok`, likedposts_array: likereplies};
    }else{
        return {status: `Ok` , message: "user doesnt like any posts"}
    }
}

const getUserDislikedPosts = async (email)=>{

    let dislikereplies = await firestore_db.fetch("Users", email,`dislikedposts`);
    if(Array.isArray(dislikereplies))
    {
        let temp2 = [];
        for(let i of dislikereplies)
            i && temp2.push(i); // copy each non-empty value to the 'temp' array
        dislikereplies = temp2;
        return {status: `Ok`, dislikedposts_array: dislikereplies};
    }else{
        return {status: `Ok` , message: "user doesnt dislike any posts"}
    }

}

const deletePost = async (postId, email)=>{
    try{
        await firestore_db.removePost(postId)
    }
    catch(err){
        return {status: `Ok` , message: "post deletion fail"}
        return Promise.reject(new Error(err));
    }
    return {status: `Ok` , message: "post deleted successfully deleted"}
}

module.exports = { deletePost, postMessage, getAllChats, postReact, totalPosts, postReply,returnPost, getPost, getUserDislikedPosts,  getUserLikedPosts}

