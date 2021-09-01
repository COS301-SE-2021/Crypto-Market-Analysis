import React, { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.css'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import Overview from '../../components/Overview/Overview'
import Tweets from '../../components/Tweets/Tweets'
import FourChan from '../../components/4chan/fourChan'
import Sidebar from "../../components/Sidebar/Sidebar.js";
import Reddit from "../../components/Reddit/Reddit.js";
import News from "../../components/News/News";
import axios from "axios";

export default function DetailedInfo(props) {
    const coin_name = props.location.state.coin_name;
    const coin_symbol = props.location.state.coin_symbol;
    let[socials, setSocials] = useState([]);
    useEffect(async () => {
        let  userReq = {
            email: localStorage.getItem("emailSession")
        }
        axios.post('http://localhost:8080/user/fetchUserSocialMedia/',userReq)
            .then(response => {
                console.log(response)
                let socialName = [];
                for(const platform of response.data)
                    socialName.push({socMediaName: platform});

                    setSocials(socialName)
            })
            .catch(err => {console.error(err);})
    },[])
    return(
        <>
        <Sidebar />
            <div className="md:ml-64" >
                <div className="container" >
                    <Tabs defaultActiveKey="Overview" transition={false}>
                        <Tab eventKey="Overview" title="Overview">
                            <Overview coin_name={coin_name}/>
                        </Tab>
                        {socials.includes("Twitter")?
                            <Tab eventKey="Twitter" title="Twitter">
                                <Tweets coin_name={coin_name} />
                            </Tab> : <Tab eventKey="Twitter" title="Twitter" disabled="true"/>
                        }
                        {socials.includes("Reddit")?
                            <Tab eventKey="Reddit" title="Reddit">
                                <Reddit coin_name={coin_name} />
                            </Tab> : <Tab eventKey="Reddit" title="Reddit" disabled="true"/>
                        }
                        {socials.includes("4chan")?
                            <Tab eventKey="4chan" title="4chan">
                                <FourChan />
                            </Tab> : <Tab eventKey="4chan" title="4chan" disabled="true"/>
                        }
                        <Tab eventKey="News" title="News">
                            <News coin_name={coin_name} coin_symbol = {coin_symbol}/>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </>
      )
}