import React, {useEffect, useState} from 'react'
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import {Avatar, Tabs, AppBar, Tab} from "@material-ui/core"
import EditIcon from "@material-ui/icons/Edit"
import axios from "axios";
import { Markup } from 'react-render-markup'
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Profile.css"
import ScriptTag from 'react-script-tag'

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

const Profile = props =>
{

    let[socs,setSoc] =useState([]);

    const [selectedTab, setSelectedTab] = React.useState(0);
    const [userToSearch, setUserToSearch] = useState({})

    const handleChange = (event, newValue) =>
    {
        setSelectedTab(newValue);
    }

    let[crypts, setCrypt] = useState([]);
    let  userReq = {
        email: localStorage.getItem("emailSession")
    }
    useEffect(async () => {
        


        await loadScript()
        axios.post('http://localhost:8080/user/getUserCryptos/',userReq)
            .then( response => {
                let soc = [];
                
               
                for(let j = 0; j<response.data.length; j++)
                {
                    soc.push({socName: response.data[j]})
                }
                console.log(soc);
                setSoc(soc);
            })
            .catch(err => {console.error(err);})

        axios.post('http://localhost:8080/user/fetchUserSocialMedia/',userReq)
            .then(response => {
                let socialName = []
                console.log(response)
                for(let j = 0; j < response.data.length; j++)
                {
                    for(let x = 0; x < response.data[j].length; x++)
                    {

                        socialName.push({socMediaName : response.data[j][x]})

                    }

                }
                console.log(socialName);
                setCrypt(socialName);
            })
            .catch(err => {console.error(err);})

    },[])
    const loadScript = ()=> {
        console.log("searchContainer")
        var tag = document.createElement('script');
        tag.async = false;
        tag.src = "https://platform.twitter.com/widgets.js";
        let profileContainer = document.getElementById('profileContainer')
        console.log(profileContainer)
        profileContainer.replaceChild(tag,profileContainer.firstElementChild)
    }

    const followUser = ()=>{
        console.log("FOLLOW")
        let user = {email: localStorage.getItem("emailSession"), screen_name: userToSearch }
        axios.post('http://localhost:8080/twitter/follow/',user)
        .then(response=>{
            console.log(response)
        })
        .catch(err => {console.error(err)})

    }

    const searchInput = (event) =>{ setUserToSearch(event.target.value) }

    const searchUsername = async () =>{
        
        
        let user = { screen_name: userToSearch }
        axios.post('http://localhost:8080/twitter/validateScreenName/',user)
        .then(response=>{
            console.log(response)
            let searchBtn = document.getElementById('searchButtons')
            let followBtn = document.createElement('span')
            followBtn.innerHTML = response.data.data
           
            followBtn.onclick = followUser
            

            console.log(followBtn)
            searchBtn.replaceChild(followBtn, searchBtn.lastElementChild)
            followBtn.firstChild.setAttribute('href','#')
        })
        .catch(err => {console.error(err)})
    }

    
    return(

        <>
        
            <Sidebar />
            <div className="md:ml-64">
                <div id="profileContainer" className="container" >
                <span></span>
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

                        <div style={{display:"flex",justifyContent:"space-between", width: "108%",  position: "relative", bottom: "-30px", right: "-100px"}}>
                            <Link
                                className={
                                    "text-xs lowercase py-3 font-bold block " +
                                    (window.location.href.indexOf("/updateProfile") !== -1
                                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                                        : "text-blueGray-700 hover:text-blueGray-500")
                                }
                                to="/updateProfile"

                                style={{position:"centre", display:"flex", font:"verdana"}}
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
                        </div>


                    </div>
                </div>
            </div>

                <AppBar position={"static"}>
                    <Tabs value={selectedTab} onChange={handleChange}>
                        <Tab label="Cryptos Followed"/>
                        <Tab label="Platforms Followed"/>
                        <Tab label="Preferences" />
                    </Tabs>
                </AppBar>

                    {
                            selectedTab === 0 &&
                            <ul className="list-group list-group-flush">
                                {
                                    socs.map((Soc,index) =>{
                                        return(
                                            <div key={index}>
                                                <li className="list-group-item">{Soc.socName}</li>
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
                                crypts.map((Soc,index) =>{
                                    return(
                                        <div key={index}>
                                            <li className="list-group-item">{Soc.socMediaName}</li>
                                        </div>
                                    )
                                })
                            }
                            </ul>
                        </ul>
                    }
                    {
                        selectedTab === 2 &&
                        <div id="searchContainer" className="container">
                           
                            <div className="row searchFilter" >
                                <div className="col-sm-12" >
                                    <div className="input-group" >
                                        <input id="table_filter" type="text" className="form-control" aria-label="Text input with segmented button dropdown" onChange={searchInput}/>
                                        <div id="searchButtons" className="input-group-btn" >
                                            <button type="button" className="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" ><span className="label-icon" >Platform</span> <span className="caret" >&nbsp;</span></button>
                                            <div className="dropdown-menu dropdown-menu-right" >
                                                <ul className="category_filters" >
                                                    <li >
                                                        <input className="cat_type category-input" data-label="Twitter" id="twitter" value="" name="radios" type="radio" /><label htmlFor="twitter" >Twitter</label>
                                                    </li>
                                                    <li >
                                                        <input type="radio" name="radios" id="reddit" value="Reddi" /><label className="category-label" htmlFor="reddit" >Reddit</label>
                                                    </li>
                                                    <li >
                                                        <input type="radio" name="radios" id="4chan" value="4chan" /><label className="category-label" htmlFor="4chan" >4chan</label>
                                                    </li>
                                                </ul>
                                            </div>
                                            <button id="searchBtn" type="button" className="btn btn-secondary btn-search" onClick={searchUsername} ><span className="glyphicon glyphicon-search" >&nbsp;</span> <span className="label-icon" >Search</span></button>
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                </div>
            </div>

        </>
    );
}
export default Profile;
