import './Predictions.scss';
import "bootstrap/dist/css/bootstrap.css";
import { Star, } from "@material-ui/icons";
import React, { useState, useEffect } from 'react';
import axios from "axios";
const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

function Predictions() {
   let [predictions,setPredictions] = useState([]);
let PredictionsCoins = [];

    useEffect(async () => {
        let userReq = { email: localStorage.getItem("emailSession") }
        let allcoins = await CoinGeckoClient.coins.all();
        axios.post('http://localhost:8080/user/getCoinPredictions/',userReq)
            .then(async(response) =>{
              for(let y=0;y<allcoins.data.length;y++)
              {
                  for(let x=0;x<response.data.posts_array.length;x++)
                  {
                      if(response.data.posts_array[x].coin.toLowerCase()===allcoins.data[y].symbol.toLowerCase())
                      {
                          let val = response.data.posts_array[x].coin.toLowerCase();
                           let symbol = allcoins.data[y].symbol;
                          let picture = allcoins.data[y].image.small;
                          let name = allcoins.data[y].name;
                          await axios.get('https://min-api.cryptocompare.com/data/price?fsym=' + val + '&tsyms=USD&api_key=7d4a73a2b7a6fd2e5d57acd8c019cb82178961644e25b7caad3239d04e79da4b')
                              .then(async(price) =>{
                                  let obj = {
                                      picture: picture,
                                      name: name,
                                      symbol: symbol,
                                      price: price.data,
                                      open: response.data.posts_array[x].open,
                                      close: response.data.posts_array[x].close,
                                      low: response.data.posts_array[x].low,
                                      high: response.data.posts_array[x].high,
                                  }
                                  PredictionsCoins.push(obj);
                              })
                              .catch(err => {console.error(err)})

                      }
                  }
              }
              console.log(PredictionsCoins);
              setPredictions(PredictionsCoins);
            })
            .catch(err => {console.error(err)})
    },[]);

    // return (
    //     <>
    //
    //                         {
    //                             predictions.map((data) =>{
    //                                 return(
    //                                     <div>
    //                                         <p>{data.picture}</p>
    //                                         <p>{data.name}</p>
    //                                         <p>{data.symbol}</p>
    //                                         <p>{data.price}</p>
    //                                         <p>{data.open}</p>
    //                                         <p>{data.close}</p>
    //                                         <p>{data.low}</p>
    //                                         <p>{data.high}</p>
    //                                     </div>
    //
    //
    //                                 )
    //                             })
    //                         }
    //
    //     </>
    // );
    return predictions.map((i) =>{
        return (
            <h1>
                {i.open}
                {/*{i.picture}*/}
                {/*{i.symbol}*/}
                {/*{i.price}*/}
                {/*{i.open}*/}
                {/*{i.close}*/}
                {/*{i.high}*/}
                {/*{i.low}*/}
            </h1>

        )
    });

}

export default Predictions;