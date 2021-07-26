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
                console.log(posts_4chan)
                setfourChans(posts_4chan);
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
                                    fourChans.map((fourChan) =>{
                                        return(
                                            <li className="list-group-item">{fourChan.four}</li>
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