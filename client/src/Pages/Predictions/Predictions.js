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

    return(
        <>
            <div className="container-fluid" >
                <div className="row">
                    <div className="col-md-12">
                        <table className="table crypto-table">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Symbol</th>
                                <th scope="col">Price</th>
                                <th scope="col">Prediction</th>
                            </tr>
                            </thead>
                            <tbody>

            {
                predictions.map((i) =>{

                    return(
                                <tr>
                                    <td>#</td>
                                    <td><span class="text-warning">{i.name}</span></td>
                                    <td>{i.symbol}</td>
                                    <td class="text-warning">{i.price}</td>
                                    <td class="text-warning">{i.open}</td>
                                </tr>
                            )
                })
            }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )


}

export default Predictions;