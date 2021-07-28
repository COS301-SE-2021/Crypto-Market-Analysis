import React, { useState, useRef, useEffect } from "react"
import axios from "axios"
import Carousel from "react-grid-carousel"
import { Link, useHistory } from "react-router-dom"

import ModalComp from "../../../components/Modal/Modal"
import CardStats from "../../../components/Cards/CardStats"
import DetailedInfo from "../../DetailedInfo/DetailedInfo"
import "./Header.css";



const coins = ["btc","eth","usdt","bnb","ada","xrp","usdc","doge","dot","busd"]

export default function HeaderStats(props) {
  const unblockHandle = useRef()
  const history = useHistory()
  const [show, setShow] = useState(false)
  let [cryptos, setCryptos] = useState([])
  let  requestObj = { email: localStorage.getItem("emailSession") }
  let coin = "" //coin name to pass to detailedInfo
  
  useEffect(async () => {
   
    let selectedCryptos = []
   
    console.log(requestObj.email)
    if(requestObj.email != null){ /* If user logged in, get crypto coins followed by that user */

      /*
      The post request get cryptocurrencies and social media platforms the user follows
      */
      axios.post('http://localhost:8080/user/getUserCryptos/', requestObj)
      .then(async(response) => {
        await response.data.map((coin)=>{
          selectedCryptos.push(coin)
        })
        getCoins(selectedCryptos)
      })
      .catch(err => {console.error(err);})
    }
    else{ /* else if user is not logged in, use default(Top 10) crypto coins */
      // console.log("CALLED")
      getCoins(coins)
    }
  },[props.ob])

  /*
    The post request get cryptocurrencies from coingecko API
  */
  function getCoins(coinsList){
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=zar&order=market_cap_desc&per_page=50&page=1&sparkline=false')
        .then(async(response) => {
            
            let userCryptoList = []

            await response.data.map((coin)=>{
              // console.log(coinsList)
              coinsList.forEach(element => {
                if(element === coin.name){
                  userCryptoList.push(coin)
                }
              });
            })
            // console.log(userCryptoList)
            setCryptos(userCryptoList)
        })
        .catch(err => {console.error(err);})
  }

  const changeLocation = (coinname)=>{
      
    unblockHandle.current = history.block(() => {
      if(requestObj.email){
        coin =  coinname
        OnContinue();
        return true;
      }
      else{
        handleShowModal();
        return false;
      }
      
    });
  }
  const handleShowModal =()=>{
    setShow(true);
  }

  const onCancel =(e)=>{
    setShow(false);
    
  }

  const OnContinue =()=>{

    if (unblockHandle) {
      unblockHandle.current()
    }
    if(requestObj.email != null){
      history.push({pathname:"/home/DetailedInfo", state:{coin_name:coin}})
    }
    else{
      history.push('/login')
    }
    
  }

  return (
    <>
            <ModalComp show={show} cancel={onCancel} continue={OnContinue} />
            <div className="container" style={{width:'90%',margin:'auto'}}>
              <div className="row">
                <div className="col-12">
                <Carousel cols={3} rows={2} gap={8} >
                {
                   cryptos.map((coin) => {
                      return (
                        <Carousel.Item key={coin.id}>
                          <div className="w-full lg:w-12/12 xl:w-12/12 px-4 mt-5">
                              <Link to={{pathname:"/home/DetailedInfo", state:{coin_name:coin.name}}} onClick={changeLocation(coin.name)}>
                                  <CardStats
                                      statSubtitle={coin.name}
                                      statTitle={coin.current_price}
                                      statArrow={coin.price_change_percentage_24h > 0 ? "up" : "down"}
                                      statPercent={coin.price_change_percentage_24h.toFixed(2)}
                                      statPercentColor={coin.price_change_percentage_24h > 0 ? "text-emerald-500" : "text-red-500"}
                                      statDescripiron="In 24 hours"
                                      statCoinImage={coin.image}
                                  />
                              </Link>
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
