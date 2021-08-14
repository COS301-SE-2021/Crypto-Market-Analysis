import 'bootstrap/dist/css/bootstrap.css'
import React from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import Overview from '../../components/Overview/Overview'
import Tweets from '../../components/Tweets/Tweets'
import FourChan from '../../components/4chan/fourChan'
import Sidebar from "../../components/Sidebar/Sidebar.js";
import Reddit from "../../components/Reddit/Reddit.js";
import News from "../../components/News/News";

export default function DetailedInfo(props) {
    const coin_name = props.location.state.coin_name
    return(
        <>
        <Sidebar />
            <div className="md:ml-64" >
                <div className="container" >
                    <Tabs defaultActiveKey="Overview" transition={false}>
                        <Tab eventKey="Overview" title="Overview">
                            <Overview coin_name={coin_name}/>
                        </Tab>
                        <Tab eventKey="Twitter" title="Twitter">
                            <Tweets coin_name={coin_name} />
                        </Tab>
                        <Tab eventKey="Reddit" title="Reddit">

                             <Reddit coin_name={coin_name} />

                        </Tab>
                        <Tab eventKey="4chan" title="4chan">
                            <FourChan />
                        </Tab>
                        <Tab eventKey="News" title="News">
                            <News coin_name={coin_name}/>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </>
      )
}
