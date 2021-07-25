import React, { useState, useEffect } from "react";
import axios from "axios";



export default function Reddits({}){

    let [reddits,setReddits] = useState([]);
    const [searchReddit, setSearchReddit] = useState("");

    useEffect(async () => {
    let  cryptoReq = {
        email: localStorage.getItem("emailSession")


    }

    axios.post('http://localhost:8080/reddit/getRedditPost/',cryptoReq)
        .then(response => {
            let posts_ = [];
            for(let j = 0; j<response.data.posts.length; j++)
            {
                for(let x = 0; x<response.data.posts[j].length; x++)
                {
                    posts_.push({posts : response.data.posts[j][x] })
                }

            }
            console.log(posts_)
            setReddits(posts_);
        })
        .catch(err => {console.error(err);})
    setTimeout(()=>{
    },10000)

    },[]);

    //sets search to whats typed in the search input field
    const searchPost = (event) => {setSearchReddit(event.target.value)}

    //filter list based on the search input
    //second try delete .posts in searchReddit.posts

    const searchedReddit = reddits.filter((reddit)=>{
        return reddit.posts.toLowerCase().includes(searchReddit.toLowerCase())
    })





    return(
        <>
            <div>
                <form>
                    <input type="search" className="form-control rounded" placeholder="Search..."
                           onChange={searchPost}
                    />
                </form>
            </div>
            <div style={{marginTop:"3%"}} >

                    <div className="container card-wrapper" >




                        <div className="row">
                            <div className="card">

                                <ul className="list-group list-group-flush">
                                    {
                                        searchedReddit.map((post) =>{

                                            return(
                                                <li className="list-group-item">{post.posts}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

        </>
    )
}