import React, {useEffect, useState, useRef} from 'react'
import { Link, useHistory } from "react-router-dom";
import { Form  } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import {Avatar, Tabs, AppBar, Tab} from "@material-ui/core"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import ModalComp from "../../components/Modal/Modal"
import "./Profile.css";
import Subreddits from "../Subreddits/Subreddits";
import Reddits from "../../components/Reddits/Reddits";
import SweetAlert from 'react-bootstrap-sweetalert'
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Star, } from "@material-ui/icons";
import { SocialIcon } from 'react-social-icons';
import ClipLoader from "react-spinners/ClipLoader"

const Button = styled.button`
display: block;
text-align: center;
background-color: #d3d3d3;
color:black;
padding: 5px 15px;
border-radius: 5px;
outline: 5px;
width: 150%;
`

const platformsList = [{name:"Twitter",id:"twitter"},
    {name:"Reddit",id:"reddit"},
    {name:"Medium",id:"medium"},
    {name:"Discord",id:"discord"}
];

const Profile = props =>
{

    const history = useHistory() 
    let[socs,setSoc] =useState([]);
    let [platforms, setPlatforms] = useState(platformsList)
    const [selectedTab, setSelectedTab] = React.useState(0)
    const [userToSearch, setUserToSearch] = useState({})
    const [showSweetAlert, setShowSweetAlert] = useState(false)
    const [alertTitle,setAlertTitle] = useState("")
    const [show, setShow] = useState(false)
    const modalText = "Are you sure you want to delete your account?"
    const [accDelete, setAccDelete] = useState(false)
    let [loading, setLoading] = useState(false);
    
    const searchRef = useRef()

    const handleChange = (event, newValue) =>
    {
        setSelectedTab(newValue);
    }

    let[crypts, setCrypt] = useState([]);
    let[subs, setSubs] = useState([]);
    let  userReq = {
        email: localStorage.getItem("emailSession")
    }
    useEffect(async () => {

        axios.post('http://localhost:8080/user/getUserCryptos/',userReq)
            .then( response => {
                let soc = [];
                for(const crypto of response.data)
                    soc.push({socName: crypto});
                setSoc(soc);
            })
            .catch(err => {console.error(err);})

        axios.post('http://localhost:8080/user/fetchUserSocialMedia/',userReq)
            .then(response => {
                console.log(response)
                let socialName = [];
                for(const platform of response.data)
                    socialName.push({socMediaName: platform});

                platformsList.forEach((_platform)=>{
                    socialName.forEach(element => {
                        if(element.socMediaName === _platform.name){
                            _platform.selected = true;
                        }
                    })
                })
                setCrypt(socialName);
            })
            .catch(err => {console.error(err);})

        axios.post('http://localhost:8080/user/getUserSubreddits/',userReq)
            .then(response => {
                let subName = [];
                for(const subred of response.data)
                    subName.push({subredditName: subred});
                setSubs(subName);
            })
            .catch(err => {console.error(err);})

    },[])

    const cleanSpace = () =>{
        let target =  document.getElementById('followBtn')
        console.log(target.children.length)
        if(target.children.length >= 2){ target.removeChild(target.childNodes[0]) }
    }

    const handleFollowButton = (user,follows)=>{

       
        let target =  document.getElementById('followBtn')
        let iconEL = document.createElement("i")
        iconEL.setAttribute("class","fab fa-twitter mr-2")
        iconEL.setAttribute("aria-hidden","true")
        iconEL.style["font-size"] = "1.2em"
        let newElement;
        setLoading(false)
        if(user === null)
        {
            newElement = document.createElement("div")
            newElement.setAttribute("class","md:block text-blueGray-600 mr-0 ml-2 inline-block whitespace-nowrap text-sm uppercase font-bold px-0")
            newElement.append("USER DOES NOT EXIST")
        }
        else{
            newElement = document.createElement("button")
            newElement.appendChild(iconEL)
            newElement.setAttribute("class"," btn btn-outline-info ml-2")
            if(follows){
                newElement.append("Unfollow @" + user)
                newElement.onclick =  unFollowUser
            }
            else{
                newElement.append("Follow @" + user)
                newElement.onclick =  followUser
            }
        }
        target.append(newElement)
        cleanSpace()
        
    }

    const followUser = ()=>{
        let user = {email: localStorage.getItem("emailSession"), screen_name: searchRef.current.value }
        
        axios.post('http://localhost:8080/twitter/follow/',user)
        .then(response=>{
            console.log(response)
            setAlertTitle("User added to our watch list")
            setShowSweetAlert(true)
            document.getElementById('followBtn').innerHTML = "<span></span>"
        })
        .catch(err => {console.error(err)})
        

    }
    const unFollowUser = ()=>{
        let user = {email: localStorage.getItem("emailSession"), screen_name: searchRef.current.value }
       
        axios.post('http://localhost:8080/twitter/unfollow/',user)
        .then(response=>{
            console.log(response)
            setAlertTitle("User removed from our watch list")
            setShowSweetAlert(true)
            document.getElementById('followBtn').innerHTML = "<span></span>"
        })
        .catch(err => {console.error(err)})
        

    }
    const searchUsername = async (event) =>{
        document.getElementById('followBtn').innerHTML = "<span></span>"
      
        setLoading(true)
        event.preventDefault()
        console.log(searchRef.current.value)
       
       
        let user = { screen_name: searchRef.current.value, email: localStorage.getItem("emailSession")}
        axios.post('http://localhost:8080/twitter/validateScreenName/',user)
        .then((response)=>{
            
            if(response.data.data){
                handleFollowButton(user.screen_name,false)
            }
            else{
                handleFollowButton(null,false)
            }
        },(reject)=>{
            console.log(reject)
            if(reject.response.data.error.message.includes("You are already following the selected screen name"))
            {
                handleFollowButton(user.screen_name,true)
            }
        })
        .catch(err => {
            console.error(err)
        })
    }

    const select = (name) => {
           
        platforms =  [...platforms.map((platform)=>{
            if(name === platform.id){
                platform.selected = !platform.selected;

                let  platformObj = {
                    email: localStorage.getItem("emailSession"),
                    social_media_sites: platform.name
                }
                /*
                    if selected add to favourite list else remove it
                */
                if(platform.selected) {

                  
                    axios.post('http://localhost:8080/user/followSocialMedia/',platformObj)
                        .then(response =>{
                            console.log(response)
                            setAlertTitle("Social media added")
                            setShowSweetAlert(true)
                        })
                        .catch(err => {console.error(err);})
                }
                else{

                    
                    axios.post('http://localhost:8080/user/unfollowSocialMedia/',platformObj)
                        .then(response =>{
                            console.log(response)
                            setAlertTitle("Social media removed")
                            setShowSweetAlert(true)
                        })
                        .catch(err => {console.error(err);})
                }
            }
            return {
                ...platform
            }
        })]
        setPlatforms(platforms)
            
    }

    const deleteAccount = () =>{
        //use userReq object and call a delete endpoint
        setShow(true)
    }

    const onCancel =(e)=>{
        setShow(false);    
    }
    const OnContinue =()=>{
        setAccDelete(true)
        setAlertTitle("Account deleted")
        setShowSweetAlert(true)
        
    }

    return(

        <>
            <ModalComp show={show} text={modalText} cancel={onCancel} continue={OnContinue} />
            <SweetAlert show={showSweetAlert} success title={alertTitle} onConfirm={()=>{
                 setShowSweetAlert(false)
                if(accDelete)
                {
                    history.push("/")
                // localStorage.clear()
                }
                

            }}></SweetAlert>
            <Sidebar />
            <script sync src="https://platform.twitter.com/widgets.js%22%3E"></script>
            <div className="md:ml-64">
                <div className="container" >

                    <div>
                        <div style={{
                            display:"flex",
                            justifyContent:"space-around",
                            margin:"18px 0px",
                            borderBottom: "1px solid grey"
                        }}>
                            <div>

                                <Avatar style={{width: "160px", height: "160px", borderRadius: "80px" }} className="aV" src='https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg'
                                />

                            </div>

                            <div>
                                <div style={{display:"flex",justifyContent:"space-between", width: "108%"}}>
                                    <h4>{userReq.email}</h4>
                                </div>


                                <div style={{display:"flex",justifyContent:"space-between", width: "108%"}}>
                                    <h6>Follows {socs.length} cryptos</h6>
                                    <h6>Follows {crypts.length} social media sites</h6>
                                </div>

                                <div style={{display:"flex", bottom: "-30px"}}>
                                    <Link
                                        className={
                                            "text-xs lowercase py-3 font-bold" +
                                            (window.location.href.indexOf("/updateProfile") !== -1
                                                ? "text-lightBlue-500 hover:text-lightBlue-600"
                                                : "text-blueGray-700 hover:text-blueGray-500")
                                        }
                                        to="/updateProfile"

                                        style={{display:"flex", font:"verdana"}}
                                    >

                                        <i
                                            className={
                                                "fas fa-User-Edit mr-2 text-sm " +
                                                (window.location.href.indexOf("/updateProfile") !== -1
                                                    ? "opacity-75"
                                                    : "text-blueGray-300")
                                            }
                                        />{" "}

                                        <Button>
                                            <EditIcon />
                                            Update Profile Details
                                        </Button>
                                        
                                    </Link>
                                    <div className="flex text-xs py-3 ml-3">
                                        <Button onClick={deleteAccount}>
                                            <DeleteIcon />
                                            Delete Account
                                        </Button>
                                    </div>
                                    
                                </div>


                            </div>
                        </div>
                    </div>

                    <AppBar position={"static"}>
                        <Tabs value={selectedTab} onChange={handleChange}>
                            <Tab label="Cryptos Followed" />
                            <Tab label="Platforms Followed"/>
                            <Tab label="Follow users"/>
                            <Tab label="Add social platforms"/>
                            {/*<Tab label="Subreddits"/>*/}
                            {/*<Tab label="Subreddits Followed"/>*/}
                        </Tabs>
                    </AppBar>

                    {
                        selectedTab === 0 &&
                        <ul className="list-group list-group-flush">
                            {
                                socs.map((Soc, index) =>{
                                    return(
                                        <div>
                                            <li className="list-group-item" key={index}>{Soc.socName}</li>
                                        </div>
                                    )
                                })
                            }
                        </ul>

                    }

                    {
                        selectedTab === 1 &&
                        <ul className="list-group list-group-flush">
                            <ul className="list-group list-group-flush">
                                {
                                    crypts.map((Soc, index) =>{
                                        return(
                                            <div>
                                                <li className="list-group-item" key={index}>{Soc.socMediaName}</li>
                                            </div>
                                        )
                                    })
                                }
                            </ul>
                        </ul>
                    }
                    {
                        selectedTab === 2 &&
                        <div id="searchContainer" className="container" >
                           <script sync src="https://platform.twitter.com/widgets.js%22%3E"></script>
                            <div className="row searchFilter" >
                               
                                <div className="col-sm-12" >
                                    <div className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold pt-4 pb-4 px-0">Search for a twitter user you want us to check out for you</div>
                                    <div className="input-group" >
                                        <div className="input-group-btn" >
                                        <Form onSubmit={searchUsername}>
                                            <Form.Group >
                                                <Form.Control type="text" ref={searchRef} required />
                                            </Form.Group>
                                            <Form.Group >
                                                <Form.Control id="searchBtn" type="submit" className="btn btn-secondary btn-search" value="Search" />
                                                
                                            </Form.Group>
                                        </Form>
                                        
                                        </div>
                                        {loading ? <div className="ml-2 mt-2 text-center"><ClipLoader  loading={loading} size={15} /></div>:<></>}
                                        <div id="followBtn">
                                        <span></span>
                                    </div>
                                    </div>
       
                                </div>
                                
                            </div>
                        </div>
                    }
                    {    selectedTab === 3 &&
                        <div className="container-fluid">
                            <div className="md:block text-center text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">Select social media platforms you want to follow</div>
                            <div className="row mt-6">
                                <div className="col-5 m-auto platform-container overflow-auto ">
                                        {
                                            
                                            platforms.map((myPlatform) =>{
                                                return(
                                                <div key={myPlatform.id} className="cryptos-view">
                                                    <div className="crypt-row">
                                                        <div className="crypto">
                                                            {myPlatform.selected?<Star className="select-star" color="primary" onClick={()=>{select(myPlatform.id)}}/>:<Star className="select-star" color="action" onClick={()=>{select(myPlatform.id, "platforms")}}/>}
                                                            <SocialIcon network={myPlatform.id} style={{height:"40px",width:"40px"}}/>
                                                            <h1 className="crypto-name" style={{marginLeft:"2em"}}>{myPlatform.name}</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    }
                    {/*{*/}
                    {/*    selectedTab === 4 &&*/}
                    {/*    <Subreddits />*/}
                    {/*}*/}
                    {/*{*/}
                    {/*    selectedTab === 5 &&*/}
                    {/*    <ul className="list-group list-group-flush">*/}
                    {/*        {*/}
                    {/*            subs.map((Sub, index) =>{*/}
                    {/*                return(*/}
                    {/*                    <div>*/}
                    {/*                        <li className="list-group-item" key={index}>{Sub.subredditName}</li>*/}
                    {/*                    </div>*/}
                    {/*                )*/}
                    {/*            })*/}
                    {/*        }*/}
                    {/*    </ul>*/}
                    {/*}*/}
                </div>
            </div>
        </>
    );
}
export default Profile;