import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "bootstrap/dist/css/bootstrap.css";
import CardStats from "../components/Home/Cards/CardStats" ;
import CardTweets from "../components/Home/Cards/CardTweets/CardTweets" ;
import SentimentSpeedometer from "../components/Home/GraphReport/AnalysisGraph"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Markup } from 'react-render-markup';

export default function DetailedInfo() {

    let [coin, setCoin] = useState([]);

    useEffect(async () => {
        console.log("USEFFECT")
        axios.get('https://api.coingecko.com/api/v3/coins/bitcoin')
        .then(async(response) => {
            setCoin(response.data)
        })
        .catch(err => {console.error(err);})
    },[])
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
      {console.log(coin)}
        <div className="container">
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
        </div>
        <div className="container mt-16 mb-12">
            <div className="row">
                <div className="col-4">
                    <img src={coin.image.large}/>
                </div>
                <div className="col-8">
                    <p className="text-sm">  <Markup markup={coin.description.en} /></p>
                </div>
            </div>
        </div>

        <div className="container mb-3" style={{margin:"auto"}}>
            <div className="row">
                <div className="col-12">
                    <div className="d-inline"><span className="badge badge-primary rounded-circle p-4"><i class="fas fa-hashtag fa-3x"></i><h1 className="d-inline ml-2">{coin.market_cap_rank}</h1></span></div>
                    <div className="d-inline float-right mt-4 uppercase font-bold p-2 px-0" ><a style={{color:"black",textDecoration:"none"}} href={coin.links.homepage}> <i class="fas fa-link"></i> Visit {coin.name} </a></div>
                </div>
            </div>
        </div>
        <div className="container" style={{margin:"auto"}}>
             <div className="row" style={{textAlign:"center"}}>

                <div className="col-4">
                <div className="uppercase font-bold p-2 px-0" style={{color:"#58667e"}}>Current price</div> 
                    <h2 className="font-bold">R {coin.market_data.current_price.zar.toLocaleString()}</h2>
                    <hr/>
                </div>
                <div className="col-4">
                    <div className="uppercase font-bold p-2 px-0" style={{color:"#58667e"}}>Market cap</div> 
                    <h2 className="font-bold">R {coin.market_data.market_cap.zar.toLocaleString()}</h2>
                    <hr/>
                </div>
                <div className="col-4">
                    <div className="uppercase font-bold p-2 px-0" style={{color:"#58667e"}}>Total volume</div> 
                    <h2 className="font-bold">R {coin.market_data.total_volume.zar.toLocaleString()}</h2>
                    <hr/>
                </div>
            </div>
            
        </div>
       
  
        <div className="container mt-16">
            <div className="row"> 
                <div className="col-8">
                </div>
                <div className="col-4">
                    <table class="table">
                        <tbody>
                            <tr>
                                <td>Price change in 1 hour</td>
                                <td >{coin.market_data.price_change_percentage_1h_in_currency.zar > 0 ? <span className="badge badge-success ml-2">{coin.market_data.price_change_percentage_1h_in_currency.zar}</span> : <span className="badge badge-danger ml-2">{coin.market_data.price_change_percentage_1h_in_currency.zar}</span>} </td>
                            </tr>
                            <tr>
                                <td>Price change in 24 hours</td>
                                <td>{coin.market_data.price_change_percentage_24h_in_currency.zar > 0 ? <span className="badge badge-success ml-2">{coin.market_data.price_change_percentage_24h_in_currency.zar}</span> : <span className="badge badge-danger ml-2">{coin.market_data.price_change_percentage_24h_in_currency.zar}</span>}</td>
                            </tr>
                            <tr>
                                <td>Price change in 7 days</td>
                                <td>{coin.market_data.price_change_percentage_7d_in_currency.zar > 0 ? <span className="badge badge-success ml-2">{coin.market_data.price_change_percentage_7d_in_currency.zar}</span> : <span className="badge badge-danger ml-2">{coin.market_data.price_change_percentage_7d_in_currency.zar}</span>}</td>
                            </tr>
                            <tr>
                                <td>Price change in 14 days</td>
                                <td>{coin.market_data.price_change_percentage_14d_in_currency.zar > 0 ? <span className="badge badge-success ml-2">{coin.market_data.price_change_percentage_14d_in_currency.zar}</span> : <span className="badge badge-danger ml-2">{coin.market_data.price_change_percentage_14d_in_currency.zar}</span>}</td>
                            </tr>
                            <tr>
                                <td>Price change in 30 days</td>
                                <td>{coin.market_data.price_change_percentage_30d_in_currency.zar > 0 ? <span className="badge badge-success ml-2">{coin.market_data.price_change_percentage_30d_in_currency.zar}</span> : <span className="badge badge-danger ml-2">{coin.market_data.price_change_percentage_30d_in_currency.zar}</span>}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div className="container">
        <div className=" text-sm p-2 px-0" ><span className="uppercase font-bold">Last updated at : </span> {coin.market_data.last_updated}</div>
        </div>
    <div id="tweets" className="container mt-16">
            
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
    </div>
    </>
  )
  

}