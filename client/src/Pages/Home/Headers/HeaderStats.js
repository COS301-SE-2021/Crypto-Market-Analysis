import React, { useState, useRef, useEffect } from "react"
import axios from "axios"
import Carousel from "react-grid-carousel"
import { Link, useHistory } from "react-router-dom"
import ClipLoader from "react-spinners/ClipLoader"
import ModalComp from "../../../components/Modal/Modal"
import CardStats from "../../../components/Cards/CardStats"
import "./Header.css";





export default function HeaderStats(props) {
  const unblockHandle = useRef()
  const history = useHistory()
  const [show, setShow] = useState(false)
  let [loading, setLoading] = useState(true);
  let [cryptos, setCryptos] = useState([])
  let  requestObj = { email: localStorage.getItem("emailSession") }
  let coin_ = "" //coin name to pass to detailedInfo
  let symbol_ = ""
  
  useEffect(async () => {
   
    let selectedCryptos = []
    let  requestObj = { email: localStorage.getItem("emailSession") }
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
      .catch(err => {
        console.error(err)
        setLoading(false)
        showServerAlert()
        
      })
    }
    else{ /* else if user is not logged in, use default(Top 10) crypto coins */
      axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=zar&order=market_cap_desc&per_page=10&page=1&sparkline=false')
          .then(async response => {
            let crypto_names = [];

            for(const crypto of response.data)
              crypto_names.push(crypto.name);

            getCoins(crypto_names)
            
          })
          .catch(err => {
            console.error(err)
            setLoading(false)
            showServerAlert()
            
          })
    }

  },[props.ob,props.logged])

  /*
    The post request get cryptocurrencies from coingecko API
  */
  function getCoins(coinsList){
 
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=zar&order=market_cap_desc&per_page=250&page=1&sparkline=false')
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
            setLoading(false)
            removeServerAlert()
        })
        .catch(err => {
          console.error(err)
          setLoading(false)
          showServerAlert()
          
        })
  }
  const showServerAlert = ()=>{

    if(!document.getElementById("server-alert")){
      let alert = document.createElement("div")
      alert.setAttribute("class","alert alert-info")
      alert.setAttribute("id","server-alert")
      alert.style .cssText = "width:50%;margin:auto;text-align:center"
      alert.innerHTML = "Something went wrong, please try again later. If the problem persists change your connection and try again!"
      if(document.getElementById("cards-col")){
        document.getElementById("cards-col").append(alert)
      }
      
    }
  }
  const removeServerAlert = ()=>{
    if(document.getElementById("server-alert")){
      document.getElementById("server-alert").remove()
    }
  }
  const changeLocation = (coinname, coinsymbol)=>{
      
    unblockHandle.current = history.block(() => {
      if(requestObj.email){
        coin_ =  coinname;
        symbol_ = coinsymbol;
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

  const onCancel =()=>{
    setShow(false);
    
  }

  const OnContinue =()=>{

    if (unblockHandle) {
      unblockHandle.current()
    }
    if(requestObj.email != null){
      history.push({pathname:"/home/DetailedInfo", state:{coin_name:coin_, coin_symbol:symbol_}})
    }
    else{
      history.push('/login')
    }
    
  }

  return (
    <React.Fragment>
            <ModalComp show={show} cancel={onCancel} continue={OnContinue} />
            
            <div className="container" style={{width:'90%',margin:'auto'}}>
              <div className="row">
                <div id="cards-col" className="col-12">
                {loading ? <div className="mx-auto mt-8 text-center"><ClipLoader  loading={loading} size={150} /></div>:<React.Fragment></React.Fragment>}
                {cryptos && cryptos.length > 0 ? <Carousel cols={3} rows={2} gap={8} >
                   {cryptos.map((coin) => {
                      return (
                        <Carousel.Item key={coin.id}>
                          <div className="w-full lg:w-12/12 xl:w-12/12 px-4 mt-5">
                              <Link to={{pathname:"/home/DetailedInfo", state:{coin_name:coin.name, coin_symbol:coin.symbol, coin_id:coin.id}}} onClick={()=>{changeLocation(coin.name, coin.symbol)}}>
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
                </Carousel>:<React.Fragment></React.Fragment>
                }
                </div>
              </div>
            </div>
    </React.Fragment>
  );
}
