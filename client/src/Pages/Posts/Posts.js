import "bootstrap/dist/css/bootstrap.css";
import './Posts.css';
import React, {useState, useEffect, useRef} from 'react';
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Form, Button, Card, Container, Modal } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import Carousel from "react-grid-carousel"


function Posts() {
    const [show,setShow] = useState(false)
    let [posts,setposts] = useState([]);

    const history = useHistory()
    const title = useRef();
    const body = useRef();
    const replybody = useRef();
    const time = new Date().toLocaleString();



    let sentiment;



    //have to make it synchronous and await sentiment axios post
    function handleSubmit(e) {
        e.preventDefault()
        console.log("Submit post")

        let sentimenttext = title.current.value + " " + body.current.value;
        let sentreq = {
            article: sentimenttext
        }

        axios.post('https://analysis-services-api.herokuapp.com/ArticleAnalytics',sentreq)
            .then(response => {
                sentiment = response.data;
            })
            .catch(err => {console.error(err);})
        setTimeout(()=>{
        },10000)

        // console.log("+++++sentiment+++++++");
        // console.log(sentiment);
        // console.log("+++++sentiment+++++++");
        sentiment = "positive";

        let request = {
            sentiment: sentiment,
            owner: "bhekindhlovu7@gmail.com",
            room: "Altcoins",
            title: title.current.value,
            body: body.current.value,
            time: time
        };

        axios.post('http://localhost:8080/chat/postMessage/',request)
            .then(response => {
                console.log(response);
                // history.push("/");
                window.location.reload();
            })
            .catch(err => {console.error(err);})
        setTimeout(()=>{
        },10000)

    }

    //must get room from prop but its default for now
    //must get email from session
    useEffect( () => {
        let  Req = {
            owner: "bhekindhlovu7@gmail.com",
            room: "Altcoins"
        }

        axios.post('http://localhost:8080/chat/getAllChats/',Req)
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

    },[]);

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
        // axios.post('http://localhost:8080/chat/postReact/',reqObj)
        //     .then(response => {
        //         console.log(response);
        //     })
        //     .catch(err => {console.error(err);})
        setTimeout(()=>{
        },10000)

    }

    return(

        <>
        <Modal show={show} >
            <Modal.Header>
                <span className="uppercase font-bold ">New Post</span>
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
                            <Link to="/Posts" style={{color:"white"}}>Post</Link>
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
                        <h3 className="mr-0 whitespace-nowrap text-lg font-bold px-0">General subjects forum</h3>
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
                                                    <div className="media-body u-shadow-v18 g-bg-secondary g-pa-30">
                                                        <div className="g-mb-15">
                                                            <h5 className="h5 g-color-gray-dark-v1 mb-0 whitespace-nowrap">{post.title}</h5>
                                                            <span className="g-color-gray-dark-v4 g-font-size-12">{post.time}</span>
                                                        </div>
                                                        <hr/>

                                                        <p>{post.body.length > 35 ? post.body.substring(0,34) + "..." : post.body }</p>
                                                        <hr/>

                                                        <ul className="list-inline d-sm-flex my-0">
                                                            <li className="list-inline-item g-mr-20 mr-3">
                                                                {/* <a className="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover"
                                                                href="#!" > */}
                                                                    <i className="fa fa-thumbs-up g-pos-rel g-top-1 g-mr-3 mr-1" onClick={function(event){reactPost("like",post.postId)}}></i>
                                                                  
                                                                    {post.like}
                                                                {/* </a> */}
                                                            </li>
                                                            <li className="list-inline-item g-mr-20">
                                                                <a className="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover"
                                                                href="#!" onClick={function(){reactPost("dislike",post.postId)}}>
                                                                    <i className="fa fa-thumbs-down g-pos-rel g-top-1 g-mr-3 mr-1 mt-1"></i>
                                                                   
                                                                    {post.dislike}
                                                                </a>
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
                                                            {/*<p>{post.sentiment}</p>*/}

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
        </>
    )

}

export default Posts;
