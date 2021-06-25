import "bootstrap/dist/css/bootstrap.css";
import "./QuickView.css"
import { Star, } from "@material-ui/icons";
import { SocialIcon } from 'react-social-icons';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Sidebar from '../Sidebar/Sidebar';

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
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=zar&order=market_cap_desc&per_page=50&page=1&sparkline=false')
            .then(response => {
                //set lists
                setCryptos(response.data)
                setPlatforms(platformsList)
               

            })
            .catch(err => {console.error(err);})
    },[]);


    //sets search to whats typed in the search input field
    const searchCoin = (event) => {setSearchCrypto(event.target.value)}
    const searchSocialMedia = (event) => {setSearchPlatform(event.target.value)}

    //filter list based on the search input
    const searchedCryptos = cryptos.filter((crypto)=>{
        return crypto.name.toLowerCase().includes(searchCrypto.toLowerCase())
    })
    const searchedPlatforms = platforms.filter((platform)=>{
        return platform.name.toLowerCase().includes(searchPlatform.toLowerCase())
    })

    const select = (name,type) => {
        if(type == "cryptos"){
            cryptos =  [...cryptos.map((crypto)=>{
                if(name == crypto.symbol){
                    crypto.selected = !crypto.selected;

                    // fetch('http://127.0.0.1:8080/user/folloCrypto',{
                    //     method:'POST',
                    //     body: JSON.stringify({
                    //         email: 'alekarzeeshan92@gmail.com',
                    //     cryptoName: 'btc',}),
                    //     headers: {
                    //         'Content-type': 'application/json charset = UTF-8'
                    //     },
                    // }).then((response) => response.json())
                    //     .catch((response) => console.log('json'))
                    //if selected add to favourite list else remove it
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
                }
                return {
                    ...crypto
                }
            })]
            setCryptos(cryptos)
        }
        else if(type == "platforms"){
            platforms =  [...platforms.map((platform)=>{
                if(name == platform.id){
                    platform.selected = !platform.selected;

                    //if selected add to favourite list else remove it
                    // if(crypto.selected) {
                    //     let  cryptoToAdd = {
                    //         email: "bhekindhlovu7@gmail.com",
                    //         crypto_name: crypt.Name.toLowerCase()
                    let  cryptoToAdd = {
                        email: localStorage.getItem("emailSession"),
                        social_media_sites: platform.name
                    }
                    axios.post('http://localhost:8080/user/followSocialMedia/',cryptoToAdd)
                        .then(response => console.log(response))
                        .catch(err => {console.error(err);})
                    //     axios.post('http://localhost:8080/user/followCrypto/',cryptoToAdd)
                    //         .then(response => console.log(response))
                    //         .catch(err => {console.error(err);})
                    // }
                }
                return {
                    ...platform
                }
            })]
            setPlatforms(platforms)
        }
       

    }

    return(
        <>
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
                                             {/*<Star className="select-star" color="action"/>*/}
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
        </>
    );
}
export default QuickView;