import "bootstrap/dist/css/bootstrap.css";
import { Markup } from 'react-render-markup'
import DetailedInfo from '../../Pages/DetailedInfo/DetailedInfo'
import React,{ useState, useEffect } from 'react'
import axios from "axios"

export default function Overview({coin_name}){
    let [coin, setCoin] = useState({});

    useEffect(async () => {
        axios.get('https://api.coingecko.com/api/v3/coins/'+coin_name.toLowerCase())
        .then(async(response) => {
            setCoin(response.data)
        })
        .catch(err => {console.error(err);})
    })


    return(
        <>
         {coin.id ? <><div className="container mt-16 mb-12">
            <div className="row">
                <div className="col-4">
                    <img alt={"image"} src={coin.image.large}/>
                </div>
                <div className="col-8">
                    <p className="text-sm">  <Markup markup={coin.description.en} /></p>
                </div>
            </div>
        </div>

         <div className="container mb-3" style={{margin:"auto"}}>
            <div className="row">
                <div className="col-12">
                    <div className="d-inline"><span className="badge badge-primary rounded-circle p-4"><i className="fas fa-hashtag fa-3x"></i><h1 className="d-inline ml-2">{coin.market_cap_rank}</h1></span></div>
                    <div className="d-inline float-right mt-4 uppercase font-bold p-2 px-0" ><a style={{color:"black",textDecoration:"none"}} href={coin.links.homepage}> <i className="fas fa-link"></i> Visit {coin.name} </a></div>
                </div>
            </div>
        </div>
        <div className="container" style={{margin:"auto"}}>
             <div className="row" style={{textAlign:"center"}}>

                <div className="col-4">
                <div className="uppercase font-bold p-2 px-0" style={{color:"#58667e"}}>Current price</div> 
                    <h2 className="font-bold">R {coin.market_data.current_price.zar.toLocaleString()}</h2>
                    <hr/>
                </div>
                <div className="col-4">
                    <div className="uppercase font-bold p-2 px-0" style={{color:"#58667e"}}>Market cap</div> 
                    <h2 className="font-bold">R {coin.market_data.market_cap.zar.toLocaleString()}</h2>
                    <hr/>
                </div>
                <div className="col-4">
                    <div className="uppercase font-bold p-2 px-0" style={{color:"#58667e"}}>Total volume</div> 
                    <h2 className="font-bold">R {coin.market_data.total_volume.zar.toLocaleString()}</h2>
                    <hr/>
                </div>
            </div>
            
        </div>
       
  
        <div className="container mt-16">
            <div className="row"> 
                <div className="col-8">
                </div>
                <div className="col-4">
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>Price change in 1 hour</td>
                                <td >{coin.market_data.price_change_percentage_1h_in_currency.zar > 0 ? <span className="badge badge-success ml-2">{coin.market_data.price_change_percentage_1h_in_currency.zar.toFixed(2)}%</span> : <span className="badge badge-danger ml-2">{coin.market_data.price_change_percentage_1h_in_currency.zar.toFixed(2)}%</span>} </td>
                            </tr>
                            <tr>
                                <td>Price change in 24 hours</td>
                                <td>{coin.market_data.price_change_percentage_24h_in_currency.zar > 0 ? <span className="badge badge-success ml-2">{coin.market_data.price_change_percentage_24h_in_currency.zar.toFixed(2)}%</span> : <span className="badge badge-danger ml-2">{coin.market_data.price_change_percentage_24h_in_currency.zar.toFixed(2)}%</span>}</td>
                            </tr>
                            <tr>
                                <td>Price change in 7 days</td>
                                <td>{coin.market_data.price_change_percentage_7d_in_currency.zar > 0 ? <span className="badge badge-success ml-2">{coin.market_data.price_change_percentage_7d_in_currency.zar.toFixed(2)}%</span> : <span className="badge badge-danger ml-2">{coin.market_data.price_change_percentage_7d_in_currency.zar.toFixed(2)}%</span>}</td>
                            </tr>
                            <tr>
                                <td>Price change in 14 days</td>
                                <td>{coin.market_data.price_change_percentage_14d_in_currency.zar > 0 ? <span className="badge badge-success ml-2">{coin.market_data.price_change_percentage_14d_in_currency.zar.toFixed(2)}%</span> : <span className="badge badge-danger ml-2">{coin.market_data.price_change_percentage_14d_in_currency.zar.toFixed(2)}%</span>}</td>
                            </tr>
                            <tr>
                                <td>Price change in 30 days</td>
                                <td>{coin.market_data.price_change_percentage_30d_in_currency.zar > 0 ? <span className="badge badge-success ml-2">{coin.market_data.price_change_percentage_30d_in_currency.zar.toFixed(2)}%</span> : <span className="badge badge-danger ml-2">{coin.market_data.price_change_percentage_30d_in_currency.zar.toFixed(2)}%</span>}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div className="container">
        <div className=" text-sm p-2 px-0" ><span className="uppercase font-bold">Last updated at : </span> {new Date(coin.market_data.last_updated).toString()}</div>
        </div></>:<></>}
        </>
    )
}
Overview.defaultProps = {
    coin_name: "bitcoin"
}
