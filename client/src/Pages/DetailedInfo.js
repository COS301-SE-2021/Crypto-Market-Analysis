import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import Overview from '../components/Overview/Overview'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Markup } from 'react-render-markup'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

export default function DetailedInfo() {

    let [coin, setCoin] = useState([]);

    useEffect(async () => {
        console.log("USEFFECT")
        axios.get('https://api.coingecko.com/api/v3/coins/bitcoin')
        .then(async(response) => {
            setCoin(response.data)
        })
        .catch(err => {console.error(err);})
    })
const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };
let v = "Miners today are mining Bitcoin using ASIC chip dedicated to only mining Bitcoin, and the hash rate has shot up to peta hashes.\r\n\r\nBeing the first successful online cryptography currency, Bitcoin has inspired other alternative currencies such as <a href=\"https://www.coingecko.com/en/coins/litecoin\">Litecoin</a>, <a href=\"https://www.coingecko.com/en/coins/peercoin\">Peercoin</a>, <a href=\"https://www.coingecko.com/en/coins/primecoin\">Primecoin</a>, and so on.\r\n\r\nThe cryptocurrency then took off with the innovation of the turing-complete smart contract by <a href=\"https://www.coingecko.com/en/coins/ethereum\">Ethereum</a> which led to the development of other amazing projects such as <a href=\"https://www.coingecko.com/en/coins/eos\">EOS</a>, <a href=\"https://www.coingecko.com/en/coins/tron\">Tron</a>, and even crypto-collectibles such as <a href=\"https://www.coingecko.com/buzz/ethereum-still-king-dapps-cryptokitties-need-1-billion-on-eos\">CryptoKitties</a>."
  return(
      <>
        <Tabs defaultActiveKey="home" transition={false}>
            <Tab eventKey="Overview" title="Overview">
                <Overview coin={coin}/>
            </Tab>
            <Tab eventKey="Tweets" title="Tweets">
                ye2
            </Tab>
            <Tab eventKey="Reddit" title="Reddit" disabled>
                ye3
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
    {/* <div id="tweets" className="container mt-16">
            
            <div style={{borderTop:"1px solid grey",borderBottom:"1px solid grey"}}><h4 className="display-4">Tweets</h4></div>
            
    <Carousel 
        swipeable={true}
        draggable={true}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass=""
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass=""
    >
         
          <div style={{margin:"10px",height:"190px"}}><CardTweets/></div>
          <div style={{margin:"10px",height:"190px"}}><CardTweets/></div>
          <div style={{margin:"10px",height:"190px"}}><CardTweets/></div>
          <div style={{margin:"10px",height:"190px"}}><CardTweets/></div>
    </Carousel>
    </div> */}
    </>
  )
  

}