import "bootstrap/dist/css/bootstrap.css";
import './chat.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";


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

                                    <div className="forum-item active">
                                        <div className="row">
                                            <div className="col-md-9">
                                                <div className="forum-icon">
                                                    <i className="fa fa-shield"></i>
                                                </div>
                                                <a href="forum_post.html" className="forum-item-title">General
                                                    Discussion</a>
                                                <div className="forum-sub-title">Talk about sports, entertainment,
                                                    music, movies, your favorite color, talk about enything.
                                                </div>
                                            </div>
                                            <div className="col-md-1 forum-info">
                            <span className="views-number">
                                1216
                            </span>
                                                <div>
                                                    <small>Views</small>
                                                </div>
                                            </div>
                                            <div className="col-md-1 forum-info">
                            <span className="views-number">
                                368
                            </span>
                                                <div>
                                                    <small>Topics</small>
                                                </div>
                                            </div>
                                            <div className="col-md-1 forum-info">
                            <span className="views-number">
                                140
                            </span>
                                                <div>
                                                    <small>Posts</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="forum-item">
                                        <div className="row">
                                            <div className="col-md-9">
                                                <div className="forum-icon">
                                                    <i className="fa fa-bolt"></i>
                                                </div>
                                                <a href="forum_post.html" className="forum-item-title">Introductions</a>
                                                <div className="forum-sub-title">New to the community? Please stop by,
                                                    say hi and tell us a bit about yourself.
                                                </div>
                                            </div>
                                            <div className="col-md-1 forum-info">
                            <span className="views-number">
                                890
                            </span>
                                                <div>
                                                    <small>Views</small>
                                                </div>
                                            </div>
                                            <div className="col-md-1 forum-info">
                            <span className="views-number">
                                120
                            </span>
                                                <div>
                                                    <small>Topics</small>
                                                </div>
                                            </div>
                                            <div className="col-md-1 forum-info">
                            <span className="views-number">
                                154
                            </span>
                                                <div>
                                                    <small>Posts</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="forum-item active">
                                        <div className="row">
                                            <div className="col-md-9">
                                                <div className="forum-icon">
                                                    <i className="fa fa-calendar"></i>
                                                </div>
                                                <a href="forum_post.html" className="forum-item-title">Announcements</a>
                                                <div className="forum-sub-title">This forum features announcements from
                                                    the community staff. If there is a new post in this forum, please
                                                    check it out.
                                                </div>
                                            </div>
                                            <div className="col-md-1 forum-info">
                            <span className="views-number">
                                680
                            </span>
                                                <div>
                                                    <small>Views</small>
                                                </div>
                                            </div>
                                            <div className="col-md-1 forum-info">
                            <span className="views-number">
                                124
                            </span>
                                                <div>
                                                    <small>Topics</small>
                                                </div>
                                            </div>
                                            <div className="col-md-1 forum-info">
                            <span className="views-number">
                                61
                            </span>
                                                <div>
                                                    <small>Posts</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="forum-item">
                                        <div className="row">
                                            <div className="col-md-9">
                                                <div className="forum-icon">
                                                    <i className="fa fa-star"></i>
                                                </div>
                                                <a href="forum_post.html" className="forum-item-title">Staff
                                                    Discussion</a>
                                                <div className="forum-sub-title">This forum is for private, staff member
                                                    only discussions, usually pertaining to the community itself.
                                                </div>
                                            </div>
                                            <div className="col-md-1 forum-info">
                            <span className="views-number">
                                1450
                            </span>
                                                <div>
                                                    <small>Views</small>
                                                </div>
                                            </div>
                                            <div className="col-md-1 forum-info">
                            <span className="views-number">
                                652
                            </span>
                                                <div>
                                                    <small>Topics</small>
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
