import React, { useState, useEffect } from "react";
import "./Header.css";
import axios from "axios";
import ReactSpeedometer from "react-d3-speedometer";
import db from "../../../firebase"
import SentimentSpeedometer from "../GraphReport/AnalysisGraph"
//import Item from "/.Item"
import {Carousel} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.css";

// components
import Card from '../Card/Card'

import CardStats from "../Cards/CardStats" ;
import CardTweets from "../Cards/CardTweets/CardTweets" ;
import QuickView from "../QuickView/QuickView";

const breakPoints = [
{width:1, itemsToShow: 1},
{width:550, itemsToShow: 2},
{width:768, itemsToShow: 3},
{width:1200, itemsToShow: 4},
];

const coins = ["btc","eth","ltc","xrp","bnb","ada"]

export default function HeaderStats() {
  let [cryptos, setCryptos] = useState([]);
  const [item, setItem] = useState([]);
   // let item= []

  //  let [cryptos, setCryptos] = useState([]);
    const [searchCrypto, setSearchCrypto] = useState("");
    let [tweets, setTweets] = useState([]);

    let [reddits,setReddits] = useState([]);

    let[socs,setSoc] =useState([]);

    let[crypts, setCrypt] = useState([]);
    useEffect(async () => {
    let  cryptoReq = {
        email: localStorage.getItem("emailSession")

       // email: "bhekindhlovu7@gmail.com",

    }

        await db.firestore().collection('Users').doc(localStorage.getItem("emailSession")).get().then((data)=>{
            let arr=[];
            let i=0;
            for(const social of data.data().social_media_sites)
            {
                for(const crypt of data.data().crypto_name) {
                    db.firestore().collection(social).doc(crypt).get().then((analysis) => {
                        const avg= Math.round(analysis.data().Average)
                        const mini= Math.round((analysis.data().Min))
                        const maxi = Math.round(analysis.data().Max)
                        arr.push(<SentimentSpeedometer min={mini} max={maxi} average={avg} social={social} cyp={crypt} />)
                        console.log(data.data().crypto_name.length);
                        if(i===data.data().crypto_name.length)
                        {
                            setItem(arr);
                        }
                      i=i+1;

                    }).catch((error) => { })
                }
            }
           // arr.push({item});
        }).catch((error) => { })

        let soc = [];
        axios.post('http://localhost:8080/user/getUserCryptos/',cryptoReq)
        .then(response => {

            for(let j = 0; j < response.data.messageN.length; j++)
            {
                for(let x = 0; x < response.data.messageN[j].length; x++)
                {

                    soc.push({socName : response.data.messageN[j][x]})
                    console.log(soc[x]);

                }

            }
            setCrypt(soc);

        })
        .catch(err => {console.error(err);})

        axios.post('http://localhost:8080/user/fetchUserSocialMedia/',cryptoReq)
            .then(response => {
                let socialName = []
                for(let j = 0; j < response.data.SocialMediaName.length; j++)
                {
                    for(let x = 0; x < response.data.SocialMediaName[j].length; x++)
                    {

                        socialName.push({socMediaName : response.data.SocialMediaName[j][x]})

                    }

                }
                console.log(socialName);
                setSoc(socialName);
            })
            .catch(err => {console.error(err);})


      let req = {email: localStorage.getItem("emailSession")}
      axios.post('http://localhost:8080/user/getUserTweets/',req)
          .then(response => {
             let tweets_ = []
              console.log("showing off the tweets");
              console.log(response.data);

                  for(let j = 0; j<response.data.tweets_array.length; j++)
                  {
                      for(let x = 0; x<response.data.tweets_array[j].length; x++)
                      {

                          tweets_.push({id: response.data.screen_names[j], tweet: response.data.tweets_array[j][x]})

                      }

                  }
                  console.log(tweets_);
              setTweets(tweets_);

          })
          .catch(err => {console.error(err);})

//let posts = [];
      axios.post('http://localhost:8080/user/getRedditPost/',req)
          .then(response => {
                let posts_ = [];
              for(let j = 0; j<response.data.posts.length; j++)
              {
                  for(let x = 0; x<response.data.posts[j].length; x++)
                  {
                      posts_.push({posts : response.data.posts[j][x] })
                  }

              }
              console.log(posts_)
              setReddits(posts_);
          })
          .catch(err => {console.error(err);})
      setTimeout(()=>{
      },10000)






        
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=zar&order=market_cap_desc&per_page=50&page=1&sparkline=false')
        .then(async(response) => {
            //set lists
            let tempList = []
            await response.data.map((coin)=>{
              coins.forEach(element => {
                if(element === coin.symbol){
                    tempList.push(coin)
                }
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
                   cryptos.map((coin) => {
                       {
                         crypts.map((Socss) =>
                           {
                           if ( Socss.socName === coin.name) {
                               return (

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
                           }
                          })
                       }
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
                        {/*<QuickView/>*/}
                       {item}
                        {/*<SentimentSpeedometer min={-5} max={5} average={2} social={"Reddit"} />*/}
                        {/*<SentimentSpeedometer/>*/}
                    </div>

                </div>
            </div>
            {/*<div style={{marginTop:"3%"}} >*/}

                {/*<div className="container card-wrapper" >*/}
                    {/*<div className="crypto-search">*/}
                    {/*    <form>*/}
                    {/*        <input type="search" className=" w-full form-control rounded" placeholder="Search..."*/}
                    {/*                />*/}
                    {/*    </form>*/}
                    {/*</div>*/}

                            {/*<div className="card-header">*/}
                            {/*    Bitcoin*/}
                            {/* </div>*/}
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
                                                Reddit Posts
                                            </div>
                                            <ul className="list-group list-group-flush">
                                                {
                                                    reddits.map((reddit) =>{
                                                        return(
                                                            <li className="list-group-item">{reddit.posts}</li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                        {/*{item}*/}
                                    </div>



                                    {/*<div className="row">*/}
                                    {/*    {*/}
                                    {/*        reddits.map((reddit) =>{*/}

                                    {/*            return(*/}
                                    {/*                <li className="list-group-item">{reddit.posts}</li>*/}
                                    {/*            )*/}

                                    {/*        })*/}
                                    {/*    }*/}

                                    {/*</div>*/}

                                </div>
                            </div>

                             <div style={{marginTop:"3%"}} >
                                <div className="container card-wrapper" >
                                    <div className="row">
                                        <div className="card">
                                            <div className="card-header">
                                                These are the Cryptos you are following:
                                            </div>

                                                <ul className="list-group list-group-flush">
                                                    {
                                                        crypts.map((Soc) => {
                                                            return (
                                                                <div>{Soc.socName}</div>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                        </div>
                                        {/*{item}*/}
                                    </div>
                            </div>

                {/*</div>*/}
            </div>
        </div>
      </div>
    </>
  );
}
