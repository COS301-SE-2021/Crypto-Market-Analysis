import React, {useEffect, useState} from 'react'
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
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
                for(const crypto of response.data)
                    soc.push({socName: crypto});
                setSoc(soc);
            })
            .catch(err => {console.error(err);})

        axios.post('http://localhost:8080/user/fetchUserSocialMedia/',cryptoReq)
            .then(response => {
                let socialName = [];
                for(const platform of response.data)
                    socialName.push({socMediaName: platform});
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

                </div>
            </div>

        </>
    );
}
export default Profile;
