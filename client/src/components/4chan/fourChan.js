import React, { useState, useEffect } from "react";
import axios from "axios";



export default function FourChan(){

    let [fourChans,setfourChans] = useState([]);
    useEffect( () => {
        let  cryptoReq = {
            email: localStorage.getItem("emailSession")


        }

        axios.post('http://localhost:8080/chan/get4chanPost/',cryptoReq)
            .then(response => {
                let posts_4chan = [];
                for(let j = 0; j<response.data.posts_array.length; j++)
                {
                    for(let x = 0; x<response.data.posts_array[j].length; x++)
                    {
                        posts_4chan.push({four : response.data.posts_array[j][x] })
                    }

                }
                setfourChans(posts_4chan);
            })
            .catch(err => {console.error(err);})
        setTimeout(()=>{
        },10000)

    },[]);
    return(
        <>
            {/*<div style={{marginTop:"3%"}} >*/}

            {/*    <div className="container card-wrapper" >*/}
                    {/*<div className="crypto-search">*/}
                    {/*    <form>*/}
                    {/*        <input type="search" className=" w-full form-control rounded" placeholder="Search..."*/}
                    {/*                />*/}
                    {/*    </form>*/}
                    {/*</div>*/}



                    {/*<div className="row">*/}
                    {/*    <div className="card">*/}

                            {/*<ul className="list-group list-group-flush">*/}
                            {/*<ul>*/}
                            {/*    {*/}
                            {/*        fourChans.map((fourChan) =>{*/}
                            {/*            return(*/}
                            {/*                // <li className="list-group-item">{fourChan.four}</li>*/}
                            {/*            <div className="card">*/}
                            {/*                <div className="card-header">*/}
                            {/*                    4Chan*/}
                            {/*                </div>*/}
                            {/*                <div className="card-body">*/}
                            {/*                    <blockquote className="blockquote mb-0">*/}
                            {/*                        <p>{fourChan.four}</p>*/}
                            {/*                        <footer className="blockquote-footer">Someone famous in <cite*/}
                            {/*                            title="Source Title">Source Title</cite></footer>*/}
                            {/*                    </blockquote>*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*            )*/}
                            {/*        })*/}
                            {/*    }*/}

            {
                fourChans.map((fourChan) =>{

                    return(
                        <div className="card mb-3">
                            {/*<img className="card-img-top" src={fourChan.four.opimg}></img>*/}
                            <div className="card-body">
                                <p className="card-text">{fourChan.four.op}</p>
                                <p className="card-text">
                                    <small className="text-muted">posted on the /biz board</small>
                                </p>
                            </div>
                        </div>
                    )
                })
            }



                            {/*</ul>*/}
                        {/*</div>*/}
                        {/*{item}*/}
                    {/*</div>*/}



                    {/*<div className="row">*/}
                    {/*    {*/}
                    {/*        reddits.map((reddit) =>{*/}

                    {/*            return(*/}
                    {/*                <li className="list-group-item">{reddit.posts}</li>*/}
                    {/*            )*/}

                    {/*        })*/}
                    {/*    }*/}

                    {/*</div>*/}

            {/*    </div>*/}
            {/*</div>*/}

        </>
    )
}
