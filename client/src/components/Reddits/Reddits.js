import React, { useState, useEffect } from "react";
import axios from "axios";



export default function Reddits(){

    let [reddits,setReddits] = useState([]);
    const [searchReddit, setSearchReddit] = useState("");
    useEffect( () => {
   
    let  cryptoReq = {
        email: localStorage.getItem("emailSession")
    }

    axios.post('https://cryptosis-server.herokuapp.com/reddit/getRedditPost/',cryptoReq)
        .then(response => {
            let posts_ = [];
            for(let j = 0; j<response.data.posts.length; j++)
            {
                for(let x = 0; x<response.data.posts[j].length; x++)
                {
                    posts_.push({posts : response.data.posts[j][x] })
                }

            }
            setReddits(posts_);
        })
        .catch(err => {console.error(err);})
    setTimeout(()=>{
    },10000)

    },[]);

    //sets search to whats typed in the search input field
    const searchPost = (event) => {setSearchReddit(event.target.value)}

    return(
        <React.Fragment>

                {
                    reddits.map((post) =>{

                        return(
                            <div className="card mb-3">
                                <img className="card-img-top" src={post.posts.link} alt="Post doesnt contain image"/>
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

                

                {/*    </div>*/}
                {/*</div>*/}

        </React.Fragment>
    )
        }
