import React from 'react'
import {Button} from 'react-bootstrap'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { Link } from "react-router-dom";
//import { IconName } from "@react-icons/all-files/fa/FaUserEdits"
//import styled from 'styled-components';

export default function Profile()
{
    let  cryptoReq = {
        email: localStorage.getItem("emailSession")

        // email: "bhekindhlovu7@gmail.com",

    }

    //let Button = styled.button `background-color: black; color: white;`;

    return(
        <>
        <div>

        </div>
        <div>
            <div style={{
                display:"flex",
                justifyContent:"space-around",
                margin:"18px 0px",
                borderBottom: "1px solid grey"
            }}>
                <div >
                    <img style={{width: "160px", height: "160px", borderRadius: "80px" }}
                    src="https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg"
                    />

                    <Link
                        className={
                            "text-xs lowercase py-3 font-bold block " +
                            (window.location.href.indexOf("/updateProfile") !== -1
                                ? "text-lightBlue-500 hover:text-lightBlue-600"
                                : "text-blueGray-700 hover:text-blueGray-500")
                        }
                        to="/updateProfile"

                        style={{position:"centre"}}
                    >

                        <i
                            className={
                                "fas fa-User-Edit-alt mr-2 text-sm " +
                                (window.location.href.indexOf("/updateProfile") !== -1
                                    ? "opacity-75"
                                    : "text-blueGray-300")
                            }
                        ></i>{" "}
                            Edit Profile
                    </Link>
                </div>
                <div>
                    <div style={{display:"flex",justifyContent:"space-between", width: "108%"}}>
                        <h4>{cryptoReq.email}</h4>

                    </div>

                    <div style={{display:"flex",justifyContent:"space-between", width: "108%"}}>
                        <h6>Follows 2 cryptos</h6>
                        <h6>Follows 3 social media sites</h6>
                    </div>

                </div>
            </div>
        </div>

            <Tabs defaultActiveKey="Cryptos" transition={false}>
                <Tab eventKey="Cryptos" title="Cryptos Followed"disabled>

                </Tab>
                <Tab eventKey="Tweets" title="Tweets Followed" disabled>

                </Tab>
                <Tab eventKey="Reddit" title="Reddits Followed" disabled>

                </Tab>
            </Tabs>

        </>
    );
}
