import React, { useState, useEffect } from "react"
import axios from "axios"
import Carousel from 'react-grid-carousel'

import CardStats from "../../../components/Cards/CardStats"
import "./Header.css";



const coins = ["Bitcoin","Ethereum","Theta","Binance Coin","Cardano","XRP","USD Coin","Dogecoin","Polkadot","Binance USD"]

export default function HeaderStats() {
  let [cryptos, setCryptos] = useState([]);
  
  useEffect(async () => {
    let selectedCryptos = []
    let  reqeustObj = { email: localStorage.getItem("emailSession") }

    if(reqeustObj != null){ /* If user logged in, get crypto coins followed by that user */

      /*
      The post request get cryptocurrencies and social media platforms the user follows
      */
      axios.post('http://localhost:8080/user/getUserCryptos/', reqeustObj)
      .then(async(response) => {
      
        await response.data.messageN[0].map((coin)=>{
          selectedCryptos.push(coin)
        })
        getCoins(selectedCryptos)
      })
      .catch(err => {console.error(err);})
    }
    else{ /* else if user is not logged in, use default(Top 10) crypto coins */
      getCoins(coins)
    }
  },[])

  /*
    The post request get cryptocurrencies from coingecko API
  */
  function getCoins(coinsList){
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=zar&order=market_cap_desc&per_page=50&page=1&sparkline=false')
        .then(async(response) => {
            
            let userCryptoList = []

            await response.data.map((coin)=>{

              coinsList.forEach(element => {
                if(element === coin.name){
                  userCryptoList.push(coin)
                }
              });
            })
            setCryptos(userCryptoList)
        })
        .catch(err => {console.error(err);})
  }
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
                                      statCoinImage={coin.image}
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
