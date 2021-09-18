import {Link, useLocation} from "react-router-dom";
import Posts from "../Posts/Posts";
import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import {Button, Card, Form, Modal} from "react-bootstrap";
import Sidebar from "../../components/Sidebar/Sidebar";

function Comments() {
    const [show,setShow] = useState(false)
    let [posts,setposts] = useState([]);
    let [post,setpost] = useState([]);
    let data = useLocation();
    let postId = data.state.postId;
    let email = localStorage.getItem("emailSession");
    const body = useRef();

    let obj ={
        postId: postId,
        email: email
    }


    useEffect( () => {
        axios.post('http://localhost:8080/chat/returnPost/',obj)
            .then(response => {
                let posts_ = [];
                for(let j = 0; j<response.data.posts_array.length; j++)
                {
                    posts_.push(response.data.posts_array[j])
                }
                console.log(posts_)

                setposts(posts_);
            })
            .catch(err => {console.error(err);})
        setTimeout(()=>{
        },10000)

        axios.post('http://localhost:8080/chat/getPost/',obj)
            .then(response => {
                console.log("response.data")
                console.log(response.data.posts_array)
                console.log("response.data")
                setpost(response.data.posts_array)
            })
            .catch(err => {console.error(err);})
        setTimeout(()=>{
        },10000)
    },[]);


    function handleSubmit(e) {
        e.preventDefault()

        let time = new Date().toLocaleString();


        let request = {
            postId:postId,
            owner:email,
            room:"Altcoins",
            body:body.current.value,
            time: time
        };

        axios.post('http://localhost:8080/chat/postReply/',request)
            .then(response => {
                console.log(response);
                // history.push("/");
                window.location.reload();
            })
            .catch(err => {console.error(err);})
        setTimeout(()=>{
        },10000)

    }


    return(

        <React.Fragment>
        <Sidebar />
            <div className="md:ml-64">
            
                <Link to="/Posts" style={{color:"black"}}> <i class="fa fa-chevron-circle-left fa-2x ml-5" aria-hidden="true"></i></Link>
            
            <div className="container" style={{height:"500px"}}>

                <div className="row">
                    <div className="col-md-8">
                        <div className="media g-mb-30 media-comment">
                            <div className="media-body u-shadow-v18 g-bg-secondary g-pa-30">
                                <div className="g-mb-15">
                                    <h5 className="h5 g-color-gray-dark-v1 mb-0">{post.title}</h5>
                                    <span className="g-color-gray-dark-v4 g-font-size-12">{post.time}</span>
                                </div>
                                <hr/>
                                <p>{post.body}</p>
                                <hr/>
                                <ul className="list-inline d-sm-flex my-0">
                                    <li className="list-inline-item g-mr-20">
                                        <a className="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover"
                                           href="#!" >

                                            <i className="fa fa-thumbs-up g-pos-rel g-top-1 g-mr-3"></i>
                                            {post.like}
                                        </a>
                                    </li>
                                    <li className="list-inline-item g-mr-20">
                                        <a className="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover"
                                           href="#!" >
                                            <i className="fa fa-thumbs-down g-pos-rel g-top-1 g-mr-3"></i>
                                            {post.dislike}
                                        </a>
                                    </li>

                                    {/*<p>{post.sentiment}</p>*/}

                                </ul>
                                <button type="button" onClick={()=>{setShow(true)}} className="ml-2 close" >
                                    <span className="mr-0 whitespace-nowrap text-lg uppercase font-bold px-0" aria-hidden="true">Reply</span>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
                <Modal show={show} >
            <Modal.Header>
                <span className="uppercase font-bold ">Reply</span>
                <i className="fas fa-times cursor-pointer text-blueGray-700" onClick={()=>{setShow(false)}}></i>
            </Modal.Header>
            <Modal.Body >
                    <Form onSubmit={handleSubmit}>

                        <Form.Group id="body">
                            <div style={{width:"70%",margin:"auto"}}>
                                <Form.Label>Reply</Form.Label>
                            </div>
                            <Form.Control
                                as="textarea" 
                                rows={3}
                                ref={body}
                                required
                                style={{width:"70%",margin:"auto"}}
                            />
                        </Form.Group>

                        <Form.Group className="text-center">
                            <Button style={{width:"70%",margin:"auto"}} type="submit">
                                <Link to="/Comments" style={{color:"white"}}>Post reply</Link>
                            </Button>
                        </Form.Group>
                       
                    </Form>
            </Modal.Body>
        </Modal>
            {/* <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Create Form</h2>
                    <Form onSubmit={handleSubmit}>

                        <Form.Group id="body">
                            <Form.Label>body</Form.Label>
                            <Form.Control
                                ref={body}
                                required
                            />
                        </Form.Group>


                        <Button className="w-100" type="submit">
                            <Link to="/Comments">Post Reply</Link>
                        </Button>
                    </Form>
                </Card.Body>
            </Card> */}
          

            {
                posts.map((post) =>{

                    return(

                        <div className="container">

                            <div className="row">
                                <div className="col-md-0 ml-5 p-2" style={{width:"5%",borderLeft:"1px solid #03989e"}}>
                                    <div className="media g-mb-30 media-comment" style={{backgroundColor:"#03989e",width:"10%",height:"80%",marginTop:"70%", float:"right"}}>
                                        
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="media g-mb-30 media-comment">
                                        <div className="media-body u-shadow-v18 g-bg-secondary g-pa-30">
                                            <div className="g-mb-15">
                                                <h5 className="h5 g-color-gray-dark-v1 mb-0">{post.owner}</h5>
                                                <span className="g-color-gray-dark-v4 g-font-size-12">{post.time}</span>
                                            </div>
                                            <hr/>
                                            <p>{post.body}</p>
                                            <hr/>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    )

                })
            }
            </div>
            </div>

            </React.Fragment>
    )
}
export default Comments;
