import React, { useState, useEffect } from "react";
import "./Header.css";
import axios from "axios";

// components

import CardStats from "../Cards/CardStats" ;
import { width } from "tailwindcss/defaultTheme";
import { ContactMailTwoTone } from "@material-ui/icons";

const coins = ["btc","eth","ltc","xrp","bnb","ada"]

export default function HeaderStats() {
  let [cryptos, setCryptos] = useState([]);
  const [searchCrypto, setSearchCrypto] = useState("");

  useEffect(async () => {
    let  cryptoReq = {
        // email: localStorage.getItem("emailSession")
        email: "bhekindhlovu7@gmail.com",
    }
    axios.post('http://localhost:8080/user/getUserCryptos/',cryptoReq)
        .then(response => console.log(response))
        .catch(err => {console.error(err);})

        
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
            console.log(tempList)
        })
        .catch(err => {console.error(err);})
},[]);
  return (
    <>
      {/* Header */}
      <div className="bg-lightBlue-600 pb-32 pt-8 ">
        
        <div className=" px-4 md:px-10" style={{height:"450px",width:"80%"}} >
          <div  >
            {/* Card stats */}
            <div className="crypto-search">
                <form>
                    <input type="search" className=" w-full form-control rounded" placeholder="Search..."
                            />
                </form>
            </div>
            <div className="container card-wrapper" >
              <div className="row">
                {
                   cryptos.map((coin) =>{
                    return(
                      <div key={coin.id} className="w-full lg:w-6/12 xl:w-3/12 px-4">
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
        {/* remove the code below */}

          <div style={{marginTop:"8%"}} >
            {/* Card stats */}
            <div className="crypto-search">
                <form>
                    <input type="search" className=" w-full form-control rounded" placeholder="Search..."
                            />
                </form>
            </div>
            <div className="flex" >
            
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle=""
                  statTitle=""
                  statArrow=""
                  statPercent=""
                  statPercentColor="text-emerald-500"
                  statDescripiron=""
                  statIconName=""
                  statIconColor="bg-white-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle=""
                  statTitle=""
                  statArrow=""
                  statPercent=""
                  statPercentColor="text-red-500"
                  statDescripiron=""
                  statIconName=""
                  statIconColor="bg-white-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle=""
                  statTitle=""
                  statArrow=""
                  statPercent=""
                  statPercentColor="text-orange-500"
                  statDescripiron=""
                  statIconName=""
                  statIconColor="bg-white-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle=""
                  statTitle=""
                  statArrow=""
                  statPercent=""
                  statPercentColor="text-emerald-500"
                  statDescripiron=""
                  statIconName=""
                  statIconColor="bg-white-500"
                />
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}
