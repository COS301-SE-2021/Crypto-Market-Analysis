import 'bootstrap/dist/css/bootstrap.css'
import React, { useState, useEffect } from 'react'
import axios from "axios"
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import Overview from '../../components/Overview/Overview'
import Tweets from '../../components/Tweets/Tweets'
import Reddits from '../../components/Reddits/Reddits'
import FourChan from '../../components/4chan/fourChan'

export default function DetailedInfo() {

    let [coin, setCoin] = useState({});
    // let [tweets, setTweets] = useState([]);

    useEffect(async () => {
        console.log("USEFFECT")
        axios.get('https://api.coingecko.com/api/v3/coins/bitcoin')
            .then(async(response) => {
                setCoin(response.data)
            })
            .catch(err => {console.error(err);})

        // axios.post('http://localhost:8080/twitter/getAllTweets',{})
        // .then(response =>{
        //     console.log(response)
        // })
    },[])

    return(
        <>
        <Tabs defaultActiveKey="Tweets" transition={false}>
            <Tab eventKey="Overview" title="Overview">
                {coin && <Overview coin={coin}/>}
            </Tab>
            <Tab eventKey="Tweets" title="Tweets">
                <Tweets />
            </Tab>
            <Tab eventKey="Reddit" title="Reddit">
                <Reddits />
            </Tab>
            <Tab eventKey="4chan" title="4chan">
                <FourChan />
            </Tab>
        </Tabs>
    {/* <div className="container">
            <hr />
            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <a className="nav-link"  href="#">Overview</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#tweets">Tweets</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Reddit</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                </li>
            </ul>
            <hr />
        </div> */}
</>
)


}