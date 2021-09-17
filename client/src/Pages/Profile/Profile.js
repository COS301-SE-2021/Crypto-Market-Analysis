import React, {useEffect, useState, useRef} from 'react'
import { Link, useHistory } from "react-router-dom";
import { Form  } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Avatar, Tabs, AppBar, Tab} from "@material-ui/core"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import ModalComp from "../../components/Modal/Modal"
import "./Profile.css";
import SweetAlert from 'react-bootstrap-sweetalert'
import swal from 'sweetalert';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Star, } from "@material-ui/icons";
import { SocialIcon } from 'react-social-icons';
import ClipLoader from "react-spinners/ClipLoader"

const platformsList = [{name:"Twitter",id:"twitter"},
    {name:"Reddit",id:"reddit"},
    {name:"4chan",id:"4chan"}
];

const Profile = props =>
{
    const history = useHistory()
    let[socs,setSoc] =useState([]);
    let [platforms, setPlatforms] = useState(platformsList)
    const [selectedTab, setSelectedTab] = React.useState(0)
    const [showSweetAlert, setShowSweetAlert] = useState(false)
    const [alertTitle,setAlertTitle] = useState("")
    const [show, setShow] = useState(false)
    const modalText = "Are you sure you want to delete your account?"
    const [accDelete, setAccDelete] = useState(false)
    let [loading, setLoading] = useState(false);
    let [refresher,setRefresher]= useState(false)
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

        axios.post('http://localhost:8080/reddit/getUserSubreddits/',userReq)
            .then(response => {
                let subName = [];
                for(const subred of response.data)
                    subName.push({subredditName: subred});
                setSubs(subName);
            })
            .catch(err => {console.error(err);})



    },[platforms])

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

    const followUser = () => {

        let user = {email: localStorage.getItem("emailSession"), screen_name: searchRef.current.value }
        axios.post('http://localhost:8080/twitter/follow/',user)
            .then(response=>{
                console.log(response)
                swal("User added to your watchlist", {
                    icon: "success",
                    buttons: false,
                    timer: 3000,
                  });
                document.getElementById('followBtn').innerHTML = "<span></span>"
                
            })
            .catch(err => {console.error(err)})
    }
    const unFollowUser = () =>{

        let user = {email: localStorage.getItem("emailSession"), screen_name: searchRef.current.value }

        axios.post('http://localhost:8080/twitter/unfollow/',user)
            .then(response=>{
                console.log(response)
                swal("User removed from your watchlist", {
                    icon: "success",
                    buttons: false,
                    timer: 3000,
                  });
                document.getElementById('followBtn').innerHTML = "<span></span>"
                
            })
            .catch(err => {
                console.error(err)
            });
    }
    const searchUsername = async (event) => {
        document.getElementById('followBtn').innerHTML = "<span></span>"

        setLoading(true)
        event.preventDefault()

        let user = { screen_name: searchRef.current.value, email: localStorage.getItem("emailSession")}

        axios.post('http://localhost:8080/twitter/validateScreenName/',user)
            .then((response)=>{
                if(response.data.data){
                    handleFollowButton(user.screen_name,false)
                }
                else{
                    handleFollowButton(null,false)
                }
            },(reject) => {
                console.log(reject.response)
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
                            swal("Social media added", {
                                icon: "success",
                                buttons: false,
                                timer: 3000,
                              }).then(()=>{
                                setRefresher(!refresher)
                              })
                        })
                        .catch(err => {console.error(err);})
                }
                else{

                    axios.post('http://localhost:8080/user/unfollowSocialMedia/',platformObj)
                        .then(response =>{
                            console.log(response)
                            swal("Social media removed", {
                                icon: "success",
                                buttons: false,
                                timer: 3000,
                              }).then(()=>{
                                setRefresher(!refresher)
                              })
                        })
                        .catch(err => {
                            console.error(err);
                        });
                }
            }
            return {
                ...platform
            }
        })]
        setPlatforms(platforms)
    }

    const deleteAccount = (email) =>{

        email = {email: localStorage.getItem("emailSession")}
        if (email !=='undefined') {
            axios.post('http://localhost:8080/user/deleteUserAccount/', email)
                .then(response => {
                    console.log(response)

                })
                .catch(err => {
                    console.error(err);
                })
        }
        else {
            console.log("Email is not defined");
        }
        setShow(true)
    }

    const onCancel =(e)=>{
        setShow(false);
    }
    const OnContinue =()=>{
        setAccDelete(true)
        setAlertTitle("Account deleted")
        setShowSweetAlert(true)
        history.push("/login")
    }

    return(

        <React.Fragment>
            <ModalComp show={show} text={modalText} cancel={onCancel} continue={OnContinue} />
            <SweetAlert show={showSweetAlert} success title={alertTitle} onConfirm={()=>{
                setShowSweetAlert(false)
                if(accDelete)
                {
                    history.push("/login")
                    // localStorage.clear()
                }


            }}/>
            <Sidebar />
            <script sync src="https://platform.twitter.com/widgets.js%22%3E"></script>
            <div className="md:ml-64">
                <div className="container" >

                    <Container>
                        <div className="row pb-5 pt-3" style={{
                            display:"flex",
                            justifyContent:"space-around",
                            margin:"18px 1px",
                            borderBottom: "1px solid grey",
                            backgroundColor:"#cbd5e1",
                            borderRadius: "8px"
                        }}>
                            <div>

                                <Avatar variant={'rounded'} style={{width: "160px", height: "160px", borderRadius: "80px"}} className="aV" src='https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg'
                                />

                            </div>

                            <div>
                                <div style={{display:"flex",justifyContent:"space-between", width: "108%"}}>
                                    <h4>{userReq.email}</h4>
                                </div>


                                <div style={{display:"flex",justifyContent:"space-between", width: "108%"}}>
                                    <h6>Follows {socs.length} cryptocurrencies</h6>
                                    <h6>Follows {crypts.length} social media platforms</h6>
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

                                        <Button variant={'contained'} style={{
                                            textAlign: "center",
                                            backgroundColor: "#58667e",
                                            color:"#FFFFF0",
                                            padding: "5px 15px",
                                            borderRadius: "5px",
                                            outline: "5px",
                                            width: "100%"
                                        }} startIcon={<EditIcon fontSize={'large'} />}>

                                            Update Profile Details
                                        </Button>

                                    </Link>
                                    <div className="flex text-xs py-3 ml-3">
                                        <Button variant={'contained'} style={{
                                            textAlign: "center",
                                            backgroundColor: "#58667e",
                                            color:"#FFFFF0",
                                            padding: "5px 15px",
                                            borderRadius: "5px",
                                            outline: "5px",
                                            width: "150%",
                                        }} onClick={() => {deleteAccount(userReq)}} startIcon={<DeleteIcon />}>

                                            Delete Account
                                        </Button>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </Container>

                    <AppBar position={"static"} color={'transparent'} style={{ borderRadius: "5px"}}>
                        <Tabs centered={true} indicatorColor={'primary'} value={selectedTab} onChange={handleChange}>
                            <Tab style={{color:"black"}} label="Cryptocurrencies Followed" />
                            <Tab style={{color:"black"}} label="Social Media Platforms Followed"/>
                            <Tab style={{color:"black"}} label="Follow users"/>
                            <Tab style={{color:"black"}} label="Add social media platforms"/>
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

                                        <div >
                                            <li className="list-group-item" key={index} style={{backgroundColor:"#cbd5e1"}}>{Soc.socName}</li>
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
                                                <li className="list-group-item" key={index} style={{backgroundColor:"#cbd5e1"}}>{Soc.socMediaName}</li>
                                            </div>
                                        )
                                    })
                                }
                            </ul>
                        </ul>
                    }
                    {
                        selectedTab === 2 &&
                        <div id="searchContainer" className="container"  style={{backgroundColor:"transparent", borderRadius:"8px"}}>
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
                                        {loading ? <div className="ml-2 mt-2 text-center"><ClipLoader  loading={loading} size={15} /></div>:<React.Fragment></React.Fragment>}
                                        <div id="followBtn">
                                            <span/>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    }
                    {    selectedTab === 3 &&
                    <div className="container-fluid" >
                        <div className="md:block text-center text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">Select social media platforms you want to follow</div>
                        <div className="row mt-6" >
                            <div className="col-5 m-auto platform-container overflow-auto " style={{backgroundColor:"#cbd5e1"}}>
                                {

                                    platforms.map((myPlatform) =>{
                                        return(
                                            <div key={myPlatform.id} className="cryptos-view" >
                                                <div className="crypt-row">
                                                    <div className="crypto" >
                                                        {myPlatform.selected?<Star className="select-star" style={{ color: "#03989e" }} onClick={()=>{select(myPlatform.id)}}/>: myPlatform.selected?<Star className="select-star" color="action" onClick={()=>{select(myPlatform.id)}}/>:<Star className="select-star" color="action" onClick={()=>{select(myPlatform.id)}}/>}
                                                        {myPlatform.id != null ?<SocialIcon network={myPlatform.id} style={{height:"40px",width:"40px"}}/>:
                                                            <img src={"./4chanLogo.png"} alt="4chan" style={{height:"40px",width:"40px"}} />}
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
        </React.Fragment>
    );
}
export default Profile;