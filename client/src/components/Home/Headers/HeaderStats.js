import React, { useState, useEffect } from "react";
import "./Header.css";
import axios from "axios";
import ReactSpeedometer from "react-d3-speedometer";
import SentimentSpeedometer from "../GraphReport/AnalysisGraph"
// components

import CardStats from "../Cards/CardStats" ;
import CardTweets from "../Cards/CardTweets/CardTweets" ;

const coins = ["btc","eth","ltc","xrp","bnb","ada"]
const tweets = [{id:"Elon Musk", tweet:"RT @rajpanjabi: As a physician, I’ve seen too many colleagues make the ultimate sacrifice on the frontlines. Over 115,000 health and care w…"},
                {id:"Bill Gates", tweet:"RT @builtwithbtc: We're Built With Bitcoin 👋A foundation creating equitable opportunity by providing clean water, quality education, sust…"},
                {id:"Bill Gates", tweet:"Polio tools and infrastructure are also critical to combatting other public health emergencies, like COVID-19. It i… https://t.co/n05Msom8ov"},
                {id:"Bill Gates", tweet:"Polio tools and infrastructure are also critical to combatting other public health emergencies, like COVID-19. It i… https://t.co/n05Msom8ov"},
                {id:"Bill Gates", tweet:"Polio tools and infrastructure are also critical to combatting other public health emergencies, like COVID-19. It i… https://t.co/n05Msom8ov"},
                {id:"Bill Gates", tweet:"Polio tools and infrastructure are also critical to combatting other public health emergencies, like COVID-19. It i… https://t.co/n05Msom8ov"},
                {id:"Bill Gates", tweet:"Polio tools and infrastructure are also critical to combatting other public health emergencies, like COVID-19. It i… https://t.co/n05Msom8ov"},
                {id:"Bill Gates", tweet:"Polio tools and infrastructure are also critical to combatting other public health emergencies, like COVID-19. It i… https://t.co/n05Msom8ov"},
                {id:"Bill Gates", tweet:"Polio tools and infrastructure are also critical to combatting other public health emergencies, like COVID-19. It i… https://t.co/n05Msom8ov"}
              ]

axios.post('http://localhost:8080/user/followSocialMedia/',cryptoToAdd)
    .then(response => console.log(response))
    .catch(err => {console.error(err);})

export default function HeaderStats() {
  let [cryptos, setCryptos] = useState([]);
  const [searchCrypto, setSearchCrypto] = useState("");

  useEffect(async () => {
    let  cryptoReq = {
        email: localStorage.getItem("emailSession")
       // email: "bhekindhlovu7@gmail.com",
    }
    axios.post('http://localhost:8080/user/getUserCryptos/',cryptoReq)
        .then(response => console.log(response))
        .catch(err => {console.error(err);})

        
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=zar&order=market_cap_desc&per_page=50&page=1&sparkline=false')
        .then(async(response) => {
            //set lists
            let tempList = []
            await response.data.map((coin)=>{
              coins.forEach(element => {
                if(element === coin.symbol){tempList.push(coin)}
              });
            })
            setCryptos(tempList)
            console.log(tempList)
        })
        .catch(err => {console.error(err);})
},[]);
  return (
    <>
      {/* Header */}
      <div className=" pb-32 pt-8 ">
        
        <div className=" px-4 md:px-10 h-full" style={{width:"80%"}} >
          <div  >
            {/* Card stats */}
           
            <div className="container card-wrapper" >
            {/*<div className="crypto-search">*/}
            {/*    <form>*/}
            {/*        <input type="search" className=" w-full form-control rounded" placeholder="Search..."*/}
            {/*                />*/}
            {/*    </form>*/}
            {/*</div>*/}
              <div className="row">
                {
                   cryptos.map((coin) =>{
                    return(
                      <div key={coin.id} className="w-full lg:w-6/12 xl:w-3/12 px-4 mt-5">
                        <CardStats
                          statSubtitle={coin.name}
                          statTitle={coin.current_price}
                          statArrow={coin.price_change_percentage_24h > 0 ? "up" : "down"}
                          statPercent={coin.price_change_percentage_24h.toFixed(2)}
                          statPercentColor={coin.price_change_percentage_24h > 0 ? "text-emerald-500" : "text-red-500"}
                          statDescripiron="In 24 hours"
                          statIconName={coin.symbol}
                          statIconColor="bg-white-500"
                        />
                    </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        {/* Tweets cards */}

        <div style={{marginTop:"3%"}} >
            
            <div className="container card-wrapper" >
            {/*<div className="crypto-search">*/}
            {/*    <form>*/}
            {/*        <input type="search" className=" w-full form-control rounded" placeholder="Search..."*/}
            {/*                />*/}
            {/*    </form>*/}
            {/*</div>*/}
              <div className="row">
                {
                   tweets.map((tweet) =>{
                    return(
                      <div key={tweet.id} className="w-full lg:w-6/12 xl:w-4/12 px-4 mt-5">
                        <CardTweets tweetOwner={tweet.id} tweetContent={tweet.tweet} />
                    </div>
                    )
                  })
                }

              </div>

            </div>
          </div>
            <div style={{marginTop:"3%"}} >

                <div className="container card-wrapper" >
                    {/*<div className="crypto-search">*/}
                    {/*    <form>*/}
                    {/*        <input type="search" className=" w-full form-control rounded" placeholder="Search..."*/}
                    {/*                />*/}
                    {/*    </form>*/}
                    {/*</div>*/}
                    <div className="row">
                        <SentimentSpeedometer/>
                        <SentimentSpeedometer/>
                        <SentimentSpeedometer/>
                        <SentimentSpeedometer/>
                        <SentimentSpeedometer/>
                    </div>

                </div>
            </div>
        </div>
      </div>
    </>
  );
}
