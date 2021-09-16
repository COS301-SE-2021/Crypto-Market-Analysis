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
    const coin_id = props.location.state.coin_id;
    let[socials, setSocials] = useState([]);
    useEffect(async () => {
        let  userReq = {
            email: localStorage.getItem("emailSession")
        }
        axios.post('/user/fetchUserSocialMedia/',userReq)
            .then(response => {
                console.log(response.data)
                setSocials(response.data)
                
            })
            .catch(err => {console.error(err);})
    },[])
    return(
        <React.Fragment>
        <Sidebar />
            <div className="md:ml-64" >
                <div className="container" >
                    <Tabs defaultActiveKey="Overview" transition={false}>
                        <Tab eventKey="Overview" title="Overview">
                            <Overview coin_name={coin_name} coin_id={coin_id}/>
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
        </React.Fragment>
      )
}