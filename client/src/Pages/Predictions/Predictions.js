import './Predictions.scss';
import "bootstrap/dist/css/bootstrap.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Star, } from "@material-ui/icons";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader"
const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

function Predictions() {
    let num =0;
    let [predictions,setPredictions] = useState([]);
    let PredictionsCoins = [];
    let [loading, setLoading] = useState(true);
    useEffect(async () => {
        console.log("use effect")
        let userReq = { email: localStorage.getItem("emailSession") }
        let allcoins = await CoinGeckoClient.coins.all();
        axios.post('http://localhost:8080/user/getCoinPredictions/',userReq)
            .then(async(response) =>{
                console.log("getCoinPredictions")
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
                                    console.log("price")
                                    let obj = {
                                        picture: picture,
                                        name: name,
                                        symbol: symbol,
                                        price: price.data.USD,
                                        open: response.data.posts_array[x].open,
                                        close: response.data.posts_array[x].close,
                                        low: response.data.posts_array[x].low,
                                        high: response.data.posts_array[x].high,
                                    }
                                    PredictionsCoins.push(obj);
                                },reject=>{console.log(reject)})
                                .catch(err => {console.error(err)})

                        }
                    }
                }

                var resArr = [];
                PredictionsCoins.forEach(function(item){
                    var i = resArr.findIndex(x => x.name == item.name);
                    if(i <= -1){
                        resArr.push({name: item.name, symbol: item.symbol, price: item.price, open: item.open, close: item.close, low: item.low});
                    }
                });
                console.log("test");
                console.log(resArr);
                console.log("test");
                setPredictions(resArr);
                setLoading(false)
            })
            .catch(err => {console.error(err)})
    },[]);

    return(
        <>

            <div className="container-fluid" >

                <div className="row">
                    <div className="col-md-12">

                        {loading ? <div className="mx-auto mt-8 text-center"><ClipLoader loading={loading} size={150} /></div>:

                            <table className="table crypto-table">
                                {/*<h1>Predictions for the next hour based on historical prices</h1>*/}
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Symbol</th>
                                    <th scope="col">Current Price</th>
                                    <th scope="col">Next Hour Price Forecast</th>
                                    {/*<th scope="col">Percentage Change</th>*/}
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    predictions.map((i) =>{
                                        // console.dir(i);
                                        return(
                                            // <p>{i.name}
                                            //     <p>{i.price}</p>
                                            // </p>
                                            <tr>
                                                <td>{++num}</td>
                                                <td><span class="text-body">{i.name}</span></td>
                                                <td>{i.symbol.toUpperCase()}</td>
                                                <td class="text-body">{i.price.toFixed(3)}</td>
                                                <td class="text-body">{i.open.toFixed(3)}</td>
                                                {/*<td class="text-body">{i.open / i.price * 100}</td>*/}
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                        }

                    </div>
                </div>
            </div>
        </>
    )


}

export default Predictions;
