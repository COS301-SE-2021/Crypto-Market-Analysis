import "bootstrap/dist/css/bootstrap.css";
import './Posts.css';
import React, {useState, useEffect, useRef} from 'react';
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"


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
        axios.post('http://localhost:8080/chat/postReact/',reqObj)
            .then(response => {
                console.log(response);
                // window.location.reload();
            })
            .catch(err => {console.error(err);})
        setTimeout(()=>{
        },10000)

    }

    return(

        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Create Form</h2>
                    <Form onSubmit={handleSubmit}>

                        <Form.Group id="title">
                            <Form.Label>title</Form.Label>
                            <Form.Control
                                ref={title}
                                required
                            />
                        </Form.Group>

                        <Form.Group id="body">
                            <Form.Label>body</Form.Label>
                            <Form.Control
                                ref={body}
                                required
                            />
                        </Form.Group>


                        <Button className="w-100" type="submit">
                            <Link to="/Posts">Post</Link>
                        </Button>
                    </Form>
                </Card.Body>
            </Card>

            {
                posts.map((post) =>{

                    return(

                <div className="container">

                    <div className="row">
                        <div className="col-md-8">
                            <div className="media g-mb-30 media-comment">
                                    <div className="media-body u-shadow-v18 g-bg-secondary g-pa-30">
                                        <div className="g-mb-15">
                                            <h5 className="h5 g-color-gray-dark-v1 mb-0">{post.title}</h5>
                                            <span className="g-color-gray-dark-v4 g-font-size-12">{post.time}</span>
                                        </div>

                                        <p>{post.body}</p>

                                        <ul className="list-inline d-sm-flex my-0">
                                            <li className="list-inline-item g-mr-20">
                                                <a className="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover"
                                                   href="#!" onClick={function(){reactPost("like",post.postId)}}>

                                                    <i className="fa fa-thumbs-up g-pos-rel g-top-1 g-mr-3"></i>
                                                    {post.like}
                                                </a>
                                            </li>
                                            <li className="list-inline-item g-mr-20">
                                                <a className="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover"
                                                   href="#!" onClick={function(){reactPost("dislike",post.postId)}}>
                                                    <i className="fa fa-thumbs-down g-pos-rel g-top-1 g-mr-3"></i>
                                                    {post.dislike}
                                                </a>
                                            </li>
                                            <li className="list-inline-item ml-auto">
                                                <Link
                                                    to={{
                                                        pathname: "/Comments",
                                                        state: { postId:post.postId}
                                                    }}
                                                >Reply</Link>
                                            </li>
                                            {/*<p>{post.sentiment}</p>*/}

                                        </ul>
                                    </div>
                            </div>

                        </div>
                    </div>
                </div>

                )

                })
            }

        </>
    )

}

export default Posts;
