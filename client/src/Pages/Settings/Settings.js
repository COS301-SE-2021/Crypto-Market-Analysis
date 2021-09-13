import "bootstrap/dist/css/bootstrap.css";
import { Star, } from "@material-ui/icons";
import { SocialIcon } from 'react-social-icons';
import React, { useState, useEffect } from 'react';
import axios from "axios";

import Sidebar from '../../components/Sidebar/Sidebar'
import "./Settings.css"

const platformsList = [{name:"Twitter",id:"twitter"},
    {name:"Reddit",id:"reddit"},
    {name:"Medium",id:"medium"},
    {name:"Discord",id:"discord"}
];

function QuickView()
{
    
    let [cryptos, setCryptos] = useState([]);
    const [searchCrypto, setSearchCrypto] = useState("");

    let [platforms, setPlatforms] = useState([]);
    const [searchPlatform, setSearchPlatform] = useState("");

    useEffect(async () => {
        let selectedCryptos = ["Bitcoin","Ethereum","Theta","Binance Coin"]
        let selectedPlatforms = ["Twitter"]
        let  userReq = { email: localStorage.getItem("emailSession") }

        /*
        Request to get cryptocurrencies followed by the user
        */
          axios.post('/user/getUserCryptos/',userReq)
              .then(async(response) =>{
                /*
                    Set default cryptos if data is not set else
                    push cryptos to a list                  
                  */
                  if(response.data.messageN != null)
                  {
                      selectedCryptos = []
                      await response.data.messageN[0].map((coin)=>{
                          selectedCryptos.push(coin)
                      })
                  }

                  /*
                    Get a list of coins from Coingecko. For each crypto, check if it matches crypto a user 
                    follows and mark it as selected                  
                  */
                    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=zar&order=market_cap_desc&per_page=10&page=1&sparkline=false')
                    .then(async (response_data) => {
                        
                        await response_data.data.map((coin)=>{
                            
                            selectedCryptos.forEach(element => {
                                if(element === coin.name){
                                    coin.selected = true;
                                }
                            })
                            return coin
                        })
                        setCryptos(response_data.data)
                    
                    })
                    .catch(err => {console.error(err);})
                            
                 })
              .catch(err => {console.error(err);})

            
        /*
        Request to get social media platforms followed by the user
        */
            axios.post('/user/fetchUserSocialMedia/',userReq)
              .then(async(response) =>{
                 /*
                    Set default platform if data is not set else
                    push platform to a list                  
                  */
                    if(response.data.SocialMediaName != null)
                    {
                        selectedPlatforms = []
                        await response.data.SocialMediaName[0].map((site)=>{
                            selectedPlatforms.push(site)
                            console.log(selectedPlatforms)
                        })
                    }
            
                    platformsList.map((_platform)=>{
                    selectedPlatforms.forEach(element => {
                        if(element === _platform.name){
                            _platform.selected = true;
                        }
                    })
                })
                setPlatforms(platformsList)
                
            })
            .catch(err => {console.error(err)})       
    },[]);


    /*
    sets search to whats typed in the search input field
    */
    const searchCoin = (event) => {setSearchCrypto(event.target.value)}
    const searchSocialMedia = (event) => {setSearchPlatform(event.target.value)}

    /*
    filter list based on the search input
    */
    const searchedCryptos = cryptos.filter((crypto)=>{
        return crypto.name.toLowerCase().includes(searchCrypto.toLowerCase())
    })
    const searchedPlatforms = platforms.filter((platform)=>{
        return platform.name.toLowerCase().includes(searchPlatform.toLowerCase())
    })

    const select = (name,type) => {
        console.log(cryptos)
        if(type == "cryptos"){
            cryptos =  [...cryptos.map((crypto)=>{
                if(name === crypto.symbol){
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
                        axios.post('/user/followCrypto/',cryptoToAdd)
                            .then(response => console.log(response))
                            .catch(err => {console.error(err);})
                    }
                    else{
                        let  cryptoToRemove = {
                            email: localStorage.getItem("emailSession"),
                              symbol: crypto.symbol,
                              crypto_name: crypto.name,
                          }
                          axios.post('/user/followCrypto/',cryptoToRemove)
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
        else if(type === "platforms"){
            platforms =  [...platforms.map((platform)=>{
                if(name === platform.id){
                    platform.selected = !platform.selected;

                    /*
                        if selected add to favourite list else remove it
                    */
                    let  cryptoToAdd = {
                        email: localStorage.getItem("emailSession"),
                        social_media_sites: platform.name
                    }
                    axios.post('/user/followSocialMedia/',cryptoToAdd)
                        .then(response => console.log(response))
                        .catch(err => {console.error(err);})
                }
                return {
                    ...platform
                }
            })]
            setPlatforms(platforms)
        }
       

    }

    return(
        <React.Fragment>
        <Sidebar/>
        <div className="container-fluid">
            <div className="row mt-10">
                <div className="col-4 offset-3 platform-container overflow-auto ">
                        <div className="crypto-search">
                            <form>
                                <input type="search" className="form-control rounded" placeholder="Search..."
                                       onChange={searchSocialMedia}/>
                            </form>
                        </div>

                        {
                            
                            searchedPlatforms.map((myPlatform) =>{
                                return(
                                <div key={myPlatform.id} className="cryptos-view">
                                    <div className="crypt-row">
                                        <div className="crypto">
                                            {myPlatform.selected?<Star className="select-star" color="primary" onClick={()=>{select(myPlatform.id,"platforms")}}/>:<Star className="select-star" color="action" onClick={()=>{select(myPlatform.id, "platforms")}}/>}
                                            <SocialIcon network={myPlatform.id} style={{height:"40px",width:"40px"}}/>
                                            <h1 className="crypto-name">{myPlatform.name}</h1>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="col-4 crypto-container overflow-auto block">
                    <div className="crypto-search">
                        <form>
                            <input type="search" className="form-control rounded" placeholder="Search..."
                                   onChange={searchCoin}/>
                        </form>
                    </div>
                    {
                        searchedCryptos.map((myCrypto) =>{
                            return(
                                <div key={myCrypto.id} className="cryptos-view">
                                    <div className="crypt-row">
                                        <div className="crypto">
                                            {myCrypto.selected?<Star className="select-star" color="primary" onClick={()=>{select(myCrypto.symbol,"cryptos")}}/>:<Star className="select-star" color="action" onClick={()=>{select(myCrypto.symbol, "cryptos")}}/>}
                                            <img src={myCrypto.image} style={{height:"40px",width:"40px"}} alt="cryptocurrency icon image"/>
                                            <h1 className="crypto-name">{myCrypto.name}</h1>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
        </React.Fragment>
    );
}
export default QuickView;