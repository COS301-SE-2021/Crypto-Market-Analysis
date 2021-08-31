import "bootstrap/dist/css/bootstrap.css";
import './chat.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import Posts from "../Posts/Posts";


function Chatroom() {

    // let [predictions,setPredictions] = useState([]);
    //
    // useEffect(async () => {
    //     axios.post('http://localhost:8080/chat/getCoinPredictions/',userReq)
    //         .then(async(response) =>{
    //         })
    //         .catch(err => {console.error(err)})
    // },[]);

    return(

        <>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="wrapper wrapper-content animated fadeInRight">

                                <div className="ibox-content m-b-sm border-bottom">
                                    <div className="p-xs">
                                        <div className="pull-left m-r-md">
                                            <i className="fa fa-globe text-navy mid-icon"></i>
                                        </div>
                                        <h2>Welcome to the Cryptosis forum</h2>
                                        <span>Feel free to choose a Cryptocurrency topic you're interested in.</span>
                                    </div>
                                </div>

                                <div className="ibox-content forum-container">

                                    <div className="forum-title">
                                        <h3>General subjects</h3>
                                    </div>



                                    <div className="forum-item">
                                        <div className="row">
                                            <div className="col-md-9">
                                                <div className="forum-icon">
                                                    <i className="fa fa-star"></i>
                                                </div>
                                                <a href="/Posts" className="forum-item-title">Staff
                                                    Discussion</a>
                                                <div className="forum-sub-title">This forum is for private, staff member
                                                    only discussions, usually pertaining to the community itself.
                                                </div>
                                            </div>

                                            <div className="col-md-1 forum-info">
                            <span className="views-number">
                                572
                            </span>
                                                <div>
                                                    <small>Posts</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

        </>
    )

}

export default Chatroom;
