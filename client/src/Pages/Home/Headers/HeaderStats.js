import React, { useState, useEffect } from "react"
import axios from "axios"
import Carousel from 'react-grid-carousel'
import db from "../../../firebase"
import { Link } from "react-router-dom";

import CardStats from "../../../components/Cards/CardStats"
import SentimentSpeedometer from "../../../components/GraphReport/AnalysisGraph"
import "./Header.css";



const coins = ["btc","eth","ltc","xrp","bnb","ada","doge","usdc","dot","sol","link","matic","etc"]

export default function HeaderStats() {



  let [cryptos, setCryptos] = useState([]);
  const [item, setItem] = useState([]);
    let h;
    {
        cryptos.map((coin) => {

        })
    }
    const [searchCrypto, setSearchCrypto] = useState("");
    let[userCryptos, setUserCrypto] = useState([]);
    useEffect(async () => {

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
        }).catch((error) => { })


        let  reqeustObj = {
          email: localStorage.getItem("emailSession")
        
        }

        /*
        The post request get cryptocurrencies and social media platforms the user follows
        */
        axios.post('http://localhost:8080/user/getUserCryptos/', reqeustObj)
        .then(async(response) => {
            let coins = []
            console.log(response.data)
            await response.data.message.map((coin)=>{
              coins.push(coin)
            })
            setUserCrypto(coins);
            
        })
        .catch(err => {console.error(err);})

        /*
        The post request get cryptocurrencies from coingecko API
        */
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=zar&order=market_cap_desc&per_page=50&page=1&sparkline=false')
        .then(async(response) => {
            //set lists
            let userCryptoList = []
            let allCryptoList = []

            await response.data.map((coin)=>{
              coins.forEach(element => {
                if(element === coin.symbol){
                  userCryptoList.push(coin)
                }
                allCryptoList.push(coin)
              });
            })
            setCryptos(userCryptoList)
        })
        .catch(err => {console.error(err);})

      },[]);
  return (
    <>
    

            <div className="container" style={{width:'90%',margin:'auto'}}>
              <div className="row">
                <div className="col-12">
                <Carousel cols={3} rows={2} gap={8} loop >
                {
                   cryptos.map((coin) => {


                      return (
                        <Carousel.Item>
                          <div key={coin.id} className="w-full lg:w-12/12 xl:w-12/12 px-4 mt-5">

                              <a id="link" href= {"https://www.coingecko.com/en/coins/"+ coin.name.toLowerCase()}>
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
                              </a>

                          </div> 
                        </Carousel.Item>
                      )
                  })
                }
                </Carousel>
                </div>
              </div>
            </div>
    </>
  );
}
