import React, { useState, useEffect } from 'react'
import axios from 'axios'



export default function Reddit({coin_name}){
    let [reddits,setReddits] = useState([]);
    useEffect( () => {

        let  cryptoReq = {
            email: localStorage.getItem("emailSession"),
            coin: coin_name
        }

        axios.post('http://localhost:8080/user/coinRedditPost/',cryptoReq)
            .then(response => {
                console.log("test begin with coin prop");
                console.log(response.data[0]);
                console.log("test begin with coin prop");
                let posts_ = [];
                for(let j = 0; j<response.data.length; j++)
                {
                    posts_.push({posts : response.data[j] })
                }
                setReddits(posts_);
            })
            .catch(err => {console.error(err);})
        setTimeout(()=>{
        },10000)

    },[]);




    return(
        <>
            {
                reddits.map((post) =>{

                        return(
                            <div className="card mb-3" >
                                <img className="card-img-top" src={post.posts.link} alt="Post doesnt contain image" style={{width: '436px', height: '532px'}}></img>
                                <div className="card-body">
                                    <h5 className="card-title">Post Reddit Score: {post.posts.score}</h5>
                                    <p className="card-text">{post.posts.text}</p>
                                    <p className="card-text">
                                        <small className="text-muted">posted by: {post.posts.author}</small>
                                    </p>
                                </div>
                            </div>
                        )


                })
            }
        </>
    )
}
Reddit.defaultProps = {
    coin_name: "Bitcoin"
}
