import React, { useState, useEffect } from "react";
import axios from "axios";



export default function Reddits({}){

    let [reddits,setReddits] = useState([]);
    useEffect(async () => {
    let  cryptoReq = {
        email: localStorage.getItem("emailSession")


    }

    axios.post('http://localhost:8080/user/getRedditPost/',cryptoReq)
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
    return(
        <>
            <div style={{marginTop:"3%"}} >

                    <div className="container card-wrapper" >
                        {/*<div className="crypto-search">*/}
                        {/*    <form>*/}
                        {/*        <input type="search" className=" w-full form-control rounded" placeholder="Search..."*/}
                        {/*                />*/}
                        {/*    </form>*/}
                        {/*</div>*/}



                        <div className="row">
                            <div className="card">

                                <ul className="list-group list-group-flush">
                                    {
                                        reddits.map((reddit) =>{
                                            return(
                                                <li className="list-group-item">{reddit.posts}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            {/*{item}*/}
                        </div>



                        {/*<div className="row">*/}
                        {/*    {*/}
                        {/*        reddits.map((reddit) =>{*/}

                        {/*            return(*/}
                        {/*                <li className="list-group-item">{reddit.posts}</li>*/}
                        {/*            )*/}

                        {/*        })*/}
                        {/*    }*/}

                        {/*</div>*/}

                    </div>
                </div>

        </>
    )
}