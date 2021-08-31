import "bootstrap/dist/css/bootstrap.css";
import './Posts.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";


function Posts() {

    let [posts,setposts] = useState([]);
    //must get room from prop but its default for now
    useEffect( () => {
        let  Req = {
            owner: "bhekindhlovu7@gmail.com",
            room: "Altcoins"
        }

        axios.post('http://localhost:8080/chat/getAllChats/',Req)
            .then(response => {
               console.log(response);
            })
            .catch(err => {console.error(err);})
        setTimeout(()=>{
        },10000)

    },[]);

    return(

        <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="media g-mb-30 media-comment">
                                    <div className="media-body u-shadow-v18 g-bg-secondary g-pa-30">
                                        <div className="g-mb-15">
                                            <h5 className="h5 g-color-gray-dark-v1 mb-0">John Doe</h5>
                                            <span className="g-color-gray-dark-v4 g-font-size-12">5 days ago</span>
                                        </div>

                                        <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
                                            sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra
                                            turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia
                                            congue
                                            felis in faucibus ras purus odio, vestibulum in vulputate at, tempus viverra
                                            turpis.</p>

                                        <ul className="list-inline d-sm-flex my-0">
                                            <li className="list-inline-item g-mr-20">
                                                <a className="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover"
                                                   href="#!">
                                                    <i className="fa fa-thumbs-up g-pos-rel g-top-1 g-mr-3"></i>
                                                    178
                                                </a>
                                            </li>
                                            <li className="list-inline-item g-mr-20">
                                                <a className="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover"
                                                   href="#!">
                                                    <i className="fa fa-thumbs-down g-pos-rel g-top-1 g-mr-3"></i>
                                                    34
                                                </a>
                                            </li>
                                            <li className="list-inline-item ml-auto">
                                                <a className="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover"
                                                   href="#!">
                                                    <i className="fa fa-reply g-pos-rel g-top-1 g-mr-3"></i>
                                                    Reply
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>

        </>
    )

}

export default Posts;
