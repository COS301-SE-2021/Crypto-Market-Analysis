import React, {useEffect, useState} from 'react'
//import {Button} from 'react-bootstrap'
//import Tabs from 'react-bootstrap/Tabs'
//import Tab from 'react-bootstrap/Tab'
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
//import { IconName } from "@react-icons/all-files/fa/FaUserEdits"
import styled from 'styled-components';
import {Avatar, Tabs, AppBar, Tab} from "@material-ui/core"
import EditIcon from "@material-ui/icons/Edit"
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";


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

    const handleChange = (event, newValue) =>
    {
        setSelectedTab(newValue);
    }

    let[crypts, setCrypt] = useState([]);
    let  cryptoReq = {
        email: localStorage.getItem("emailSession")
    }
    useEffect(async () => {




        axios.post('http://localhost:8080/user/getUserCryptos/',cryptoReq)
            .then( response => {
                let soc = [];
                let socialName = []
                // console.log(response.data)
                for(let j = 0; j<response.data.messageN.length; j++)
                {
                    for(let x = 0; x<response.data.messageN[j].length; x++)
                    {

                        soc.push({socName: response.data.messageN[j][x]})

                    }

                }
                console.log(soc);
                setSoc(soc);
            })
            .catch(err => {console.error(err);})

        axios.post('http://localhost:8080/user/fetchUserSocialMedia/',cryptoReq)
            .then(response => {
                let socialName = []
                for(let j = 0; j < response.data.SocialMediaName.length; j++)
                {
                    for(let x = 0; x < response.data.SocialMediaName[j].length; x++)
                    {

                        socialName.push({socMediaName : response.data.SocialMediaName[j][x]})

                    }

                }
                console.log(socialName);
                setCrypt(socialName);
            })
            .catch(err => {console.error(err);})

    },[]);
    return(

        <>
            <Sidebar />
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


                        {/*} <img style={{width: "160px", height: "160px", borderRadius: "80px" }} className="aV" src={profileImg} id={"input"}/>

                    <div className={"label"}>
                        <label htmlFor={"input"} className={"image-upload"}>
                            Upload Image
                        </label>
                    </div>
                    <input type={"file"} name={"image-upload"} id={"input"} accept={"image/*"} onChange={imageHandler}/>*/}

                    </div>

                    <div>
                        <div style={{display:"flex",justifyContent:"space-between", width: "108%"}}>
                            <h4>{cryptoReq.email}</h4>
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
                                ></i>{" "}

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
                        <Tab label="Cryptos Followed" >

                        </Tab>

                        <Tab label={"Platforms Followed"}>

                        </Tab>
                    </Tabs>
                </AppBar>

                    {
                            selectedTab === 0 &&
                            <ul className="list-group list-group-flush">
                                {
                                    socs.map((Soc) =>{
                                        return(
                                            <div>
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
                                crypts.map((Soc) =>{
                                    return(
                                        <div>
                                            <li className="list-group-item">{Soc.socMediaName}</li>
                                        </div>
                                    )
                                })
                            }
                            </ul>
                        </ul>
                    }

                </div>
            </div>

        </>
    );
}
export default Profile;
