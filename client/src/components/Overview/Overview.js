import "bootstrap/dist/css/bootstrap.css";
import { Markup } from 'react-render-markup'
import DetailedInfo from '../../Pages/DetailedInfo/DetailedInfo'
import React,{ useState, useEffect } from 'react'
import axios from "axios"
import HistoryChart from "../HistoryChart/HistoryChart"
import CoinData from "../CoinData/CoinData"
import coinGecko from "../apis/CoinGecko"
import {AppBar, Tab, Tabs} from "@material-ui/core";

export default function Overview({coin_name}){
    let [coin, setCoin] = useState({});
    let [coinData, setCoinData] = useState({});
    let [marketData, setMarketData] = useState({});

    const [selectedTab, setSelectedTab] = React.useState(0);

    const handleChange = (event, newValue) =>
    {
        setSelectedTab(newValue);
    }

    const formatData = (data) => {
        return data.map(el => {
            return{
                t: el[0],
                y: el[1]
            }

        })
    }


    useEffect(async () => {
        axios.get('https://api.coingecko.com/api/v3/coins/'+coin_name.toLowerCase())
            .then(async(response) => {
                setCoin(response.data)
            })
            .catch(err => {console.error(err);})

        const fetchData = async () => {
            const [week] = await Promise.all([coinGecko.get("/coins/" + coin_name + "/market_chart/", {
                params: {
                    vs_currency: "zar",
                    days: "7",
                    interval: "monthly"
                },
            })]);

            const [day] = await Promise.all([coinGecko.get("/coins/" + coin_name + "/market_chart/", {
                params: {
                    vs_currency: "zar",
                    days: "1",
                    interval: "weekly"
                },
            })]);

            const [fourteenDays] = await Promise.all([coinGecko.get("/coins/" + coin_name + "/market_chart/", {
                params: {
                    vs_currency: "zar",
                    days: "14",
                    interval: "weekly"
                },
            })]);

            const [month] = await Promise.all([coinGecko.get("/coins/" + coin_name + "/market_chart/", {
                params: {
                    vs_currency: "zar",
                    days: "30",
                    interval: "weekly"
                },
            })]);

            const [threeMonths] = await Promise.all([coinGecko.get("/coins/" + coin_name + "/market_chart/", {
                params: {
                    vs_currency: "zar",
                    days: "90",
                    interval: "weekly"
                },
            })]);

            const [year] = await Promise.all([coinGecko.get("/coins/" + coin_name + "/market_chart/", {
                params: {
                    vs_currency: "zar",
                    days: "365",
                    interval: "monthly"
                },
            })]);

            const [detail] = await Promise.all([
                coinGecko.get("/coins/markets/", {
                    params: {
                        vs_currency: "zar",
                        days: "365",
                        interval: "weekly"
                    },
                }),
            ]);

            console.log(week.data.prices);
            for (let i = 0; i < detail.data.length; i++) {
                if (coin_name.toLowerCase() === detail.data[i].id) {
                    setCoinData({
                        day: formatData(day.data.prices),
                        week: formatData(week.data.prices),
                        year: formatData(year.data.prices),
                        fourteenDays: formatData(fourteenDays.data.prices),
                        month: formatData(month.data.prices),
                        threeMonths: formatData(threeMonths.data.prices),
                        detail: detail.data[i],
                    });
                }
                console.log(detail.data[i])
            }

            for (let i =0; i < detail.data.length; i++)
            {
                if(coin_name.toLowerCase() === detail.data[i].id)
                {
                    setMarketData({
                        day: formatData(day.data.market_caps),
                        week: formatData(week.data.market_caps),
                        year: formatData(year.data.market_caps),
                        fourteenDays: formatData(fourteenDays.data.market_caps),
                        month: formatData(month.data.market_caps),
                        threeMonths: formatData(threeMonths.data.market_caps),
                        detail: detail.data[i],
                    })
                }
            }
        }
        await fetchData();

    },[])


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
                            <div>
                                <h2>
                                    {coin.name} ({coin.symbol}) Chart
                                </h2>
                            </div>
                            <AppBar position={"static"}>
                                <Tabs value={selectedTab} onChange={handleChange}>
                                    <Tab label="Price" >

                                    </Tab>

                                    <Tab label={"Market Cap"}>

                                    </Tab>
                                </Tabs>
                            </AppBar>
                            {
                                selectedTab === 0 &&
                                <HistoryChart data={coinData}/>

                            }
                            {
                                selectedTab === 1 &&
                                <CoinData data={marketData}/>

                            }
                        </div>

                        <div className="col-4 my-5" >
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
                                <tr>
                                    <td>Price change in 1 year</td>
                                    <td>{coin.market_data.price_change_percentage_1y_in_currency.zar > 0 ? <span className="badge badge-success ml-2">{coin.market_data.price_change_percentage_30d_in_currency.zar.toFixed(2)}%</span> : <span className="badge badge-danger ml-2">{coin.market_data.price_change_percentage_30d_in_currency.zar.toFixed(2)}%</span>}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className=" text-sm p-2 px-0" >
                        <span className="uppercase font-bold">Last updated at : </span> {new Date(coin.market_data.last_updated).toString()}
                    </div>
                </div></>:<></>}
        </>
    )
}

Overview.defaultProps = {
    coin_name: "bitcoin"
}
