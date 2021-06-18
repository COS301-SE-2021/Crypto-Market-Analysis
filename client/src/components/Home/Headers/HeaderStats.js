import React, { useState, useEffect } from "react";
import "./Header.css";
import axios from "axios";
import ReactSpeedometer from "react-d3-speedometer";
import db from "../../../firebase"
import SentimentSpeedometer from "../GraphReport/AnalysisGraph"
// components

import CardStats from "../Cards/CardStats" ;
import CardTweets from "../Cards/CardTweets/CardTweets" ;



const coins = ["btc","eth","ltc","xrp","bnb","ada"]
// let tweets = [{id:"Elon Musk", tweet:"RT @rajpanjabi: As a physician, I’ve seen too many colleagues make the ultimate sacrifice on the frontlines. Over 115,000 health and care w…"},
//                 {id:"Bill Gates", tweet:"RT @builtwithbtc: We're Built With Bitcoin 👋A foundation creating equitable opportunity by providing clean water, quality education, sust…"},
//                 {id:"Bill Gates", tweet:"Polio tools and infrastructure are also critical to combatting other public health emergencies, like COVID-19. It i… https://t.co/n05Msom8ov"},
//                 {id:"Bill Gates", tweet:"Polio tools and infrastructure are also critical to combatting other public health emergencies, like COVID-19. It i… https://t.co/n05Msom8ov"},
//                 {id:"Bill Gates", tweet:"Polio tools and infrastructure are also critical to combatting other public health emergencies, like COVID-19. It i… https://t.co/n05Msom8ov"},
//                 {id:"Bill Gates", tweet:"Polio tools and infrastructure are also critical to combatting other public health emergencies, like COVID-19. It i… https://t.co/n05Msom8ov"},
//                 {id:"Bill Gates", tweet:"Polio tools and infrastructure are also critical to combatting other public health emergencies, like COVID-19. It i… https://t.co/n05Msom8ov"},
//                 {id:"Bill Gates", tweet:"Polio tools and infrastructure are also critical to combatting other public health emergencies, like COVID-19. It i… https://t.co/n05Msom8ov"},
//                 {id:"Bill Gates", tweet:"Polio tools and infrastructure are also critical to combatting other public health emergencies, like COVID-19. It i… https://t.co/n05Msom8ov"}
//               ]

// axios.post('http://localhost:8080/user/followSocialMedia/',cryptoToAdd)
//     .then(response => console.log(response))
//     .catch(err => {console.error(err);})

export default function HeaderStats() {
  let [cryptos, setCryptos] = useState([]);
  const [searchCrypto, setSearchCrypto] = useState("");
    let [tweets, setTweets] = useState([]);
  useEffect(async () => {

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

axios.post('http://localhost:8080/user/followSocialMedia/')//,cryptoToAdd)
    .then(response => console.log(response))
    .catch(err => {console.error(err);})

export default function HeaderStats() {
  let [cryptos, setCryptos] = useState([]);
  let [item, setItem] = useState([]);
   // let item= []

    db.firestore().collection('Users').doc(localStorage.getItem("emailSession")).get().then((data)=>{
        for(const social of data.data().social_media_sites)
        {
            for(const crypt of data.data().crypto_name) {
                db.firestore().collection(social).doc(crypt).get().then((analysis) => {
                    const avg= Math.round(analysis.data().Average)
                    const mini= Math.round((analysis.data().Min))
                    const maxi = Math.round(analysis.data().Max)
                    console.log(social)
                   /* item.push(<SentimentSpeedometer min={mini} max={maxi}
                                                   average={avg}
                                                    social={social}/>)*/
                    const arr=[];
                    arr.push(<SentimentSpeedometer min={mini} max={maxi} average={avg} social={social} />)
                    setItem(arr);
                })
            }
        }
    }).catch((error) => { })

    useEffect(async () => {
    let  cryptoReq = {
        email: localStorage.getItem("emailSession")

       // email: "bhekindhlovu7@gmail.com",

    }
    axios.post('http://localhost:8080/user/getUserCryptos/',cryptoReq)
        .then()
        .catch(err => {console.error(err);})


      let req = {email: localStorage.getItem("emailSession")}
      axios.post('http://localhost:8080/user/getUserTweets/',req)
          .then(response => {
             let tweets_ = []
           //   console.log(response.data);

                  for(var j = 0; j<response.data.tweets_array.length; j++)
                  {
                      for(var x = 0; x<response.data.tweets_array[j].length; x++)
                      {
                          tweets_.push({id: response.data.screen_names[j], tweet: response.data.tweets_array[j][x]})
                      }

                  }
                  console.log(tweets_);
              setTweets(tweets_);

          })
          .catch(err => {console.error(err);})

let posts = [];
      axios.post('http://localhost:8080/user/getUserSubreddit/',req)
          .then(response => {
              for(var x = 0; x<50; x++)
              {
                  //console.log(response.data.posts[1].posts[x]);
                  posts.push(response.data.posts[1].posts[x]);

              }

          })
          .catch(err => {console.error(err);})
      setTimeout(()=>{
      },10000)
      console.log(posts)





        
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
           // console.log(tempList)
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
                        {/*<SentimentSpeedometer/>*/}
                        {/*<SentimentSpeedometer/>*/}
                        {/*<SentimentSpeedometer/>*/}
                        {/*<SentimentSpeedometer/>*/}
                        <SentimentSpeedometer/>
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
                        <div className="card">
                            <div className="card-header">
                                Bitcoin
                            </div>
                            <ul className="list-group list-group-flush">
                                {
                                    tweets.map((tweet) =>{
                                        return(
                                        <li className="list-group-item">{tweet.tweet}</li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        {item}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}
