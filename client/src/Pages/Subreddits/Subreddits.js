import "bootstrap/dist/css/bootstrap.css";
import { Star, } from "@material-ui/icons";
import React, { useState, useEffect } from 'react';
import axios from "axios";

const platformsList = [
    {name:"CryptoCurrencies",id:"CryptoCurrencies"},
    {name:"CryptoCurrencyTrading",id:"CryptoCurrencyTrading"},
    {name:"Crypto_Currency_News",id:"Crypto_Currency_News"},
    {name:"Cryptomarkets",id:"Cryptomarkets"},
    {name:"SatoshiStreetBets",id:"SatoshiStreetBets"}
];

function Subreddits()
{

    let [platforms, setPlatforms] = useState([]);
    const [searchPlatform, setSearchPlatform] = useState("");

    useEffect(async () => {

        let selectedPlatforms = ["CryptoCurrencyTrading"]
        let  userReq = { email: localStorage.getItem("emailSession") }

        /*
        Request to get subreddits followed by the user
        */
        axios.post('https://cryptosis-server.herokuapp.com/user/getUserSubreddits/',userReq)
            .then(async(response) =>{
                /*
                   Set default platform if data is not set else
                   push platform to a list
                 */

                //test
                if(response.data != null)
                {
                    selectedPlatforms = []
                    await response.data.map((site)=>{
                        selectedPlatforms.push(site)
                    })
                }
                //sonarcloud

                    platformsList.forEach((_platform)=>{
                    selectedPlatforms.forEach(element => {
                        if(element === _platform.name){
                            _platform.selected = true;
                        }
                    })
                })
                //sonarcloud
                setPlatforms(platformsList)
                //test

            })
            .catch(err => {console.error(err)})
    },[]);


    /*
    sets search to whats typed in the search input field
    */
    const searchSocialMedia = (event) => {setSearchPlatform(event.target.value)}

    /*
    filter list based on the search input
    */

    const searchedPlatforms = platforms.filter((platform)=>{
        return platform.name.toLowerCase().includes(searchPlatform.toLowerCase())
    })

    const select = (name,type) => {
        if(type === "platforms")
        {
            platforms =  [...platforms.map((platform)=>{
                if(name === platform.id){
                    platform.selected = !platform.selected;

                    /*
                        if selected add to favourite list else remove it
                    */

                    //add condition to unfollow endpoint
                    let  cryptoToAdd = {
                        email: localStorage.getItem("emailSession"),
                        social_media_sites: platform.name
                    }
                    axios.post('https://cryptosis-server.herokuapp.com/user/followSubreddit/',cryptoToAdd)
                        .then()
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
                                                {/*<SocialIcon network={myPlatform.id} style={{height:"40px",width:"40px"}}/>*/}
                                                <h1 className="crypto-name">{myPlatform.name}</h1>
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
export default Subreddits;