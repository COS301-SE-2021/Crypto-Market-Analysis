import "bootstrap/dist/css/bootstrap.css";
import './Tag.css';
import React, {useState, useEffect, useRef} from 'react';
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Form, Button, Card, Container, Modal } from "react-bootstrap"
import {Link, useHistory, useLocation} from "react-router-dom"
import Carousel from "react-grid-carousel"


function Tag() {
    const [show,setShow] = useState(false)
    let [posts,setposts] = useState([]);
    let [likedPosts,setLikedPosts] = useState([]);
    let [dislikedPosts,setDislikedPosts] = useState([]);
    let [refresh,setRefresh] = useState(false);

    const history = useHistory()
    const title = useRef();
    const body = useRef();
    const replybody = useRef();
    const time = new Date().toLocaleString();

    let data = useLocation();
    const tag = data.state.postId.tag;

    const user = localStorage.getItem("emailSession");

    // let sentiment;



    //have to make it synchronous and await sentiment axios post
    async function handleSubmit(e) {
        e.preventDefault()

        let sentimenttext = title.current.value + " " + body.current.value;





        let request = {
            sentiment: sentimenttext,
            owner: localStorage.getItem("emailSession"),
            room: "Altcoins",
            title: title.current.value,
            body: body.current.value,
            time: time
        };

        axios.post('http://localhost:8080/chat/postMessage/', request)
            .then(() => {
                setShow(false)
                setRefresh(!refresh)
            })
            .catch(err => {
                console.error(err);
            })
        setTimeout(() => {
        }, 10000)

    }



    useEffect( () => {
        let liked = []
        let disliked = []
        let  Req = {
            email: localStorage.getItem("emailSession"),
            tag: tag
        }

        let  ReqObj = {
            email: localStorage.getItem("emailSession")
        }
        axios.post('http://localhost:8080/chat/chat/getUserLikedPosts/',ReqObj)
            .then(response => {
                liked = response.data.likedposts_array
                setLikedPosts(response.data.likedposts_array)

            })
        axios.post('http://localhost:8080/chat/getUserDislikedPosts/',ReqObj)
            .then(response => {
                disliked = response.data.dislikedposts_array
                setDislikedPosts(response.data.dislikedposts_array)
            })

        axios.post('http://localhost:8080/chat/returnTagPost',Req)
            .then(response => {
                let posts_ = [];
                for(let j = 0; j<response.data.posts_array.length; j++)
                {
                    posts_.push(response.data.posts_array[j])
                }

                posts_.forEach(element => {
                    liked.forEach(likedPost=>{
                        if(likedPost === element.postId){

                            element.liked = true;
                        }
                    })

                    disliked.forEach(dislikedPost=>{
                        if(dislikedPost === element.postId){

                            element.disliked = true;
                        }
                    })

                })
                setposts(posts_);
            })
            .catch(err => {console.error(err);})
        setTimeout(()=>{
        },10000)

    },[refresh]);

    function reactPost (react,postId){
        // e.preventDefault();
        let reqObj = {};
        if (react === "like")
        {
            reqObj = {
                owner : localStorage.getItem("emailSession"),
                react : "like",
                postId : postId,
                room : "Altcoins"
            }
        }
        else if (react === "dislike")
        {
            reqObj = {
                owner : localStorage.getItem("emailSession"),
                react : "dislike",
                postId : postId,
                room : "Altcoins"
            }
        }
        axios.post('http://localhost:8080/chat/postReact/',reqObj)
            .then(() => {
                setRefresh(!refresh)
            })
            .catch(err => {console.error(err);})
        setTimeout(()=>{
        },10000)

    }
    function removePost(postid){
        let reqObj = {
            email: user,
            postId : postid
        }
        axios.post('http://localhost:8080/chat/deletePost/',reqObj)
            .then(() => {
                setRefresh(!refresh)
            })
            .catch(err => {console.error(err);})
        setTimeout(()=>{
        },10000)
    }

    return(

        <React.Fragment>


            <Modal show={show} >
                <Modal.Header>
                    <span className="uppercase font-bold">New Post</span>
                    <i className="fas fa-times cursor-pointer text-blueGray-700" onClick={()=>{setShow(false)}}></i>
                </Modal.Header>
                <Modal.Body >
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="title">
                            <div style={{width:"70%",margin:"auto"}}>
                                <Form.Label className="label">Post title</Form.Label>
                            </div>
                            <Form.Control
                                ref={title}
                                required
                                style={{width:"70%",margin:"auto"}}
                            />
                        </Form.Group>
                        <Form.Group id="body">
                            <div style={{width:"70%",margin:"auto"}}>
                                <Form.Label className="label">Post content</Form.Label>
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
                                Post
                            </Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
            <Sidebar />
            <div className="md:ml-64">
                <Container fluid>
                    <Card.Header style={{backgroundColor:"rgba(0,0,0,0)"}}>
                        <div className="forum-title">
                            <div className="display-flex">
                                <i onClick={()=>{history.goBack()}} className="back-icon fa fa-chevron-circle-left fa-1x mr-2" aria-hidden="true"></i>
                                <span className="display-inline-block mr-0 whitespace-nowrap text-xl font-bold px-0">Results for Tag: {tag}</span>
                            </div>
                            
                        </div>
                    </Card.Header>
                    <div className="mx-auto text-center">
                        <i className="fas fa-plus-circle fa-5x mx-auto mt-3 cursor-pointer" style={{color:"#03989e"}} onClick={()=>{setShow(true)}}></i>
                    </div>
                </Container>


                <Carousel cols={3} rows={2} gap={8} >
                    {
                        posts.map((post,index) =>{

                            return(
                                <Carousel.Item key={index}>
                                    {/* <div className="container"> */}

                                    {/* <div className="row"> */}
                                    {/* <div className="col-md-4"> */}
                                    <div className="media g-mb-30 media-comment w-full lg:w-12/12 xl:w-12/12">

                                        <div className="media-body u-shadow-v18 g-bg-secondary g-pa-30 pt-0">
                                            {post.owner === user ? <button type="button" onClick={()=>{removePost(post.postId)}} className="ml-2 close" >
                                                <span aria-hidden="true">&times;</span>
                                            </button> : <React.Fragment></React.Fragment> }

                                            <div className="g-mb-15">
                                                <h5 className="h5 g-color-gray-dark-v1 mb-0 whitespace-nowrap">{post.title}</h5>
                                                <span className="g-color-gray-dark-v4 g-font-size-12">{post.time}</span>
                                            </div>
                                            <hr/>

                                            <p>{post.body.length > 25 ? post.body.substring(0,24) + "..." : post.body }</p>
                                            <hr/>

                                            <div className="mb-3">
                                                            <div className="row">
                                                            {   post.tags &&
                                                                post.tags.map(tag=>{
                                                                    return(
                                                                        <div className="col-4 px-2 mb-2">
                                                                            <div className="text-center tag-container">
                                                                                <Link
                                                                                    to={{
                                                                                        pathname: "/Tag",
                                                                                        state: { postId: {tag}}
                                                                                    }}
                                                                                   
                                                                                    className="inline-block text-md font-bold" 
                                                                                    style={{color:"#fafafa"}}
                                                                                > {tag}</Link>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                            </div>
                                                        </div>

                                            <ul className="list-inline d-sm-flex my-0">
                                                <li className="list-inline-item g-mr-20 mr-3">

                                                    {post.liked ? <i className="fa fa-thumbs-up g-pos-rel g-top-1 g-mr-3 mr-1" style={{color:"#03989e"}} onClick={function(event){reactPost("like",post.postId)}}></i>:
                                                        <i className="fa fa-thumbs-up g-pos-rel g-top-1 g-mr-3 mr-1" onClick={function(event){reactPost("like",post.postId)}}></i>
                                                    }
                                                    {post.like}

                                                </li>
                                                <li className="list-inline-item g-mr-20">

                                                    {post.disliked ? <i className="fa fa-thumbs-down g-pos-rel g-top-1 g-mr-3 mr-1 mt-1" style={{color:"#03989e"}} onClick={function(){reactPost("dislike",post.postId)}}></i>:
                                                        <i className="fa fa-thumbs-down g-pos-rel g-top-1 g-mr-3 mr-1 mt-1" onClick={function(){reactPost("dislike",post.postId)}}></i>
                                                    }

                                                    {post.dislike}

                                                </li>


                                                <li className="ml-5">
                                                    <p className="text-blueGray-600 inline-block text-sm uppercase font-bold">{post.sentiment}</p>
                                                </li>

                                                <li className="list-inline-item ml-auto">
                                                    <Link
                                                        to={{
                                                            pathname: "/Comments",
                                                            state: { postId:post.postId}
                                                        }}
                                                        // style={{color:"black"}}
                                                        className="text-blueGray-600 inline-block text-md font-bold"
                                                    > <i className="fa fa-chevron-right fa-lg" aria-hidden="true"></i></Link>
                                                </li>

                                                {/*//tags field name: tags */}

                                                
                                               
                                                {/*map the tags in this link tag above*/}


                                            </ul>
                                        </div>
                                    </div>

                                    {/* </div> */}
                                    {/* </div> */}
                                    {/* </div> */}
                                </Carousel.Item>
                            )

                        })
                    }
                </Carousel>
            </div>
        </React.Fragment>
    );

}

export default Tag;
