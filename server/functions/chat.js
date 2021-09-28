const Database = require('../database/Database');
const firestore_db = new Database().getInstance();
const sentiment = require('wink-sentiment');
const keyword_extractor = require("keyword-extractor");

function keywords(sentence) {
    res = keyword_extractor.extract(sentence,{
        language:"english",
        remove_digits: true,
        return_changed_case:true,
        remove_duplicates: false
    });
   console.log(res)
    return res;
    // return keyword_extractor.extract(sentence,{
    //     language:"english",
    //     remove_digits: true,
    //     return_changed_case:true,
    //     remove_duplicates: false
    // });

}

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

const postMessage = async (postId,owner,title,body,time,like,dislike,sentiments,room)=> {
    let tags = keywords(body);
    let response = sentiment(sentiments);
    let sent
    if(response.score<0)
    {
        sent = "negative";
    }
    else if(response.score>0)
    {
        sent = "positive";
    }else{
        sent = "neutral";
    }

    try{

        await firestore_db.save(room, postId,`postId` , postId);
        await firestore_db.save(room, postId, `owner`, owner);
        await firestore_db.save(room, postId, `title`, title);
        await firestore_db.save(room, postId, `body`, body);
        await firestore_db.save(room, postId, `time`, time);
        await firestore_db.save(room, postId, `like`, like);
        await firestore_db.save(room, postId, `dislike`, dislike);
        await firestore_db.save(room, postId, `sentiment`, sent);
        await firestore_db.save(room, postId, `room`, room);
        await firestore_db.save(room, postId, `tags`, tags);
        console.log("the tags"+tags)
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
                //if a user is already liked a post we will update the liked array and unlike operation
                existing = existing.filter(item => item !== postId)
                await firestore_db.save("Users", owner,`likedposts`,existing)
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
                await firestore_db.save("Users", owner,`dislikedposts`,existing)
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
    let emptarray = [];
    let likereplies = await firestore_db.fetch("Users", email,`likedposts`);
    let temp = [];
    if(Array.isArray(likereplies))
    {
        for(let i of likereplies)
            i && temp.push(i); // copy each non-empty value to the 'temp' array
        likereplies = temp;
        return {status: `Ok`, likedposts_array: likereplies};
    }else{
        return {status: `Ok` , likedposts_array: emptarray}
    }
}

const getUserDislikedPosts = async (email)=>{
    let emptarray = [];
    let dislikereplies = await firestore_db.fetch("Users", email,`dislikedposts`);
    if(Array.isArray(dislikereplies))
    {
        let temp2 = [];
        for(let i of dislikereplies)
            i && temp2.push(i); // copy each non-empty value to the 'temp' array
        dislikereplies = temp2;
        return {status: `Ok`, dislikedposts_array: dislikereplies};
    }else{
        return {status: `Ok` , dislikedposts_array: emptarray}
    }

}

const deletePost = async (postId, email)=>{
    try{
        await firestore_db.removePost(postId)
    }
    catch(err){
        return Promise.reject(new Error(err));
    }
    return {status: `Ok` , message: "post deleted successfully deleted"}
}

function flatten(ary) {
    let ret = [];
    for(let i = 0; i < ary.length; i++) {
        if(Array.isArray(ary[i])) {
            ret = ret.concat(flatten(ary[i]));
        } else {
            ret.push(ary[i]);
        }
    }
    return ret;
}

const getAllTags = async (email)=>{
    let tags = [];
    try{
        const docs = await firestore_db.fetch("Altcoins").then((snapshot) => {return snapshot.docs;});
        for(const doc of docs)
        {
            tags.push(doc.data().tags)
        }

        tags = flatten(tags);

        return {status: `Ok`, alltags: tags};
    }
    catch(err){
        return Promise.reject(new Error(err));
    }
}

const returnTagPost = async (email, tag)=>{
    let alltagposts = [];
    try{
        const docs = await firestore_db.fetch("Altcoins").then((snapshot) => {return snapshot.docs;});
        for(const doc of docs)
        {
            if (typeof doc.data().tags !== 'undefined')
            {
                if (doc.data().tags.includes(tag))
                {
                    alltagposts.push(doc.data());
                }
            }

        }
        alltagposts = flatten(alltagposts);

        console.log(alltagposts);
        return {status: `Ok`, alltagposts: alltagposts};
    }
    catch(err){
        return Promise.reject(new Error(err));
    }
}

module.exports = { getAllTags,returnTagPost,deletePost, postMessage, getAllChats, postReact, totalPosts, postReply,returnPost, getPost, getUserDislikedPosts,  getUserLikedPosts}

