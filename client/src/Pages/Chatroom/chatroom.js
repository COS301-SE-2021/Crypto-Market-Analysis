import "bootstrap/dist/css/bootstrap.css";
import './chat.css';
import React, {useState, useEffect, useRef} from 'react';
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import Posts from "../Posts/Posts";
//import {Link} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom"

function Chatroom() {

    let [numposts,setnumposts] = useState([]);
    const board = "Altcoins";
    const unblockHandle = useRef()
   //    const history = useHistory();

    // let [predictions,setPredictions] = useState([]);
    //
    let request = {
        owner: localStorage.getItem("emailSession"),
        room: board
    }

    useEffect(async () => {
        axios.post('http://localhost:8080/chat/totalPosts/',request)
            .then(async(response) =>{
                let numberPosts = 0;
                console.log(response.data.numberPosts);
                numberPosts = response.data.numberPosts;
                setnumposts(numberPosts);
            })
            .catch(err => {console.error(err)})
    },[]);

   // const Editnavigate = function (e, board) {
   //     this.props.history.push( {pathname: "/Posts",
   //          state: { value:board }});
   //  }

    // const Editnavigate = (e, board) => {
    //     history.push( {pathname: "/Posts",
    //         state: { value:board }});
    // }
    return(

        <>
        <Sidebar />
            <div className="md:ml-64">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="wrapper wrapper-content animated fadeInRight">

                                <div className="ibox-content m-b-sm border-bottom" style={{backgroundColor:"rgba(0,0,0,0)"}}>
                                    <div className="flex p-xs">  
                                        <i className="fa fa-globe text-navy mid-icon"></i>
                                        <div>
                                        <h2 className="mr-0 ml-3 inline-block whitespace-nowrap uppercase font-bold">Welcome to the Cryptosis forum</h2>
                                        <p className="p-xs mr-0 ml-3 whitespace-nowrap uppercase font-bold">Feel free to choose a Cryptocurrency topic you're interested in.</p>
       
                                        </div>
                                             
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
                                                <a href="/Posts/" >General
                                                    Discussion</a>




                                                <div className="forum-sub-title">This forum is for private, staff member
                                                    only discussions, usually pertaining to the community itself.
                                                </div>
                                            </div>

                                            <div className="col-md-1 forum-info">
                            <span className="views-number">
                                {/*572*/}
                                {numposts}
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
            </div>
        </>
    )

}

export default Chatroom;
