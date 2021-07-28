import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Star, } from "@material-ui/icons";

import "../Settings/Settings.css"
import "./AllCrypto.css"

const coins = ["btc","eth","usdt","bnb","ada","xrp","usdc","doge","dot","busd"]
export default function AllCryptos()
{
    // cryptos = cryptos
    let [cryptos, setCryptos] = useState([]);
    const [searchCrypto, setSearchCrypto] = useState("");

   

    useEffect(async () => {
        let selectedCryptos = []
       
        let  userReq = {
            email: localStorage.getItem("emailSession"),
        }
        if(userReq.email != null){
            /*
            Request to get cryptocurrencies followed by the user
            */
            axios.post('http://localhost:8080/user/getUserCryptos/',userReq)
            .then(async(response) =>{
                /*
                Set default cryptos if data is not set else
                push cryptos to a list                  
                */
                await response.data.map((coin)=>{
                    selectedCryptos.push(coin)
                })  
                
            })
            .catch(err => {console.error(err);})
        }
        else{
            
            selectedCryptos = coins
        }
        getCoins(selectedCryptos)

      
    },[]);

    /*
              Get a list of coins from Coingecko. For each crypto, check if it matches crypto a user 
              follows and mark it as selected                  
            */
              function getCoins(coinsList){
              axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=zar&order=market_cap_desc&per_page=250&page=1&sparkline=false')
              .then(async (response_data) => {
                  
                  await response_data.data.map((coin)=>{
                      
                    coinsList.forEach(element => {
                          if(element === coin.name){
                              coin.selected = true;
                          }
                      })
                  })
                  setCryptos(response_data.data)
              
              })
              .catch(err => {console.error(err);})
            }

    const select = (name,type) => {
        console.log(cryptos)
        if(type == "cryptos"){
            cryptos =  [...cryptos.map((crypto)=>{
                if(name == crypto.symbol){
                    crypto.selected = !crypto.selected;

                    /*
                        if selected add to favourite list else remove it
                    */
                    if(crypto.selected) {
                        let  cryptoToAdd = {
                          email: localStorage.getItem("emailSession"),
                            symbol: crypto.symbol,
                            crypto_name: crypto.name,
                        }
                        axios.post('http://localhost:8080/user/followCrypto/',cryptoToAdd)
                            .then(response => console.log(response))
                            .catch(err => {console.error(err);})
                    }
                    else{
                        let  cryptoToRemove = {
                            email: localStorage.getItem("emailSession"),
                              symbol: crypto.symbol,
                          }
                          axios.post('http://localhost:8080/user/unfollowCrypto/',cryptoToRemove)
                              .then(response => console.log(response))
                              .catch(err => {console.error(err);})
                    }
                }
                return {
                    ...crypto
                }
            })]
            setCryptos(cryptos)
        }
    }

    //sets search to whats typed in the search input field
    const searchCoin = (event) => {setSearchCrypto(event.target.value)}
   

    //filter list based on the search input
    const searchedCryptos = cryptos.filter((crypto)=>{
        return crypto.name.toLowerCase().includes(searchCrypto.toLowerCase())
    })
    
    return(
        <>       
        {/* <Sidebar /> */}
         <div className="container">
            <div className="row"> 
                <div className=" overflow-auto block crypto-wrapper" style={{height:"600px",margin:"auto"}}>
                    <div className="crypto-search">
                        <form>
                            <input type="search" className="form-control rounded" placeholder="Search..."
                                   onChange={searchCoin}/>
                        </form>
                    </div>
                    {
                        searchedCryptos.map((myCrypto) =>{
                            
                            return(
                                <div className='coin-container'>


                                        <div className='coin-row'>

                                                <div className='coin'>
                                                    {/* <a id="link" href= {"/home/DetailedInfo"}> */}
                                                    {myCrypto.selected?<Star className="select-star" color="primary" onClick={()=>{select(myCrypto.symbol,"cryptos")}}/>:<Star className="select-star" color="action" onClick={()=>{select(myCrypto.symbol, "cryptos")}}/>}
                                                    <img src={myCrypto.image} alt='crypto' />
                                                    <h1>{myCrypto.name}</h1>
                                                    {/* </a> */}
                                                    <p className='coin-symbol'>{myCrypto.symbol}</p>
                                                </div>


                                            <div className='coin-data'>
                                                <p className='coin-price'>R{myCrypto.current_price}</p>
                                                <p className='coin-volume'>R{myCrypto.total_volume.toLocaleString()}</p>

                                                {myCrypto.price_change_percentage_24h < 0 ? (
                                                    <p className='coin-percent red'>{myCrypto.price_change_percentage_24h.toFixed(2)}%</p>
                                                ) : (
                                                    <p className='coin-percent green'>{myCrypto.price_change_percentage_24h.toFixed(2)}%</p>
                                                )}

                                                <p className='coin-marketcap'>
                                                    Mkt Cap: R{myCrypto.market_cap.toLocaleString()}
                                                </p>
                                            </div>
                                        </div>



                              </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
        </>
    );
}