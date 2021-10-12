import "bootstrap/dist/css/bootstrap.css";
import { Markup } from 'react-render-markup'
import React,{ useState, useEffect } from 'react'
import axios from "axios"
import HistoryChart from "../HistoryChart/HistoryChart"
import CoinData from "../CoinData/CoinData"
import coinGecko from "../apis/CoinGecko"
import {AppBar, Tab, Tabs} from "@material-ui/core";
import ClipLoader from "react-spinners/ClipLoader"
import SentimentChart from "../SentimentChart/SentimentChart"

export default function Overview({coin_name,coin_id}) {
    let [coin, setCoin] = useState({});
    let [coinData, setCoinData] = useState({});
    let [marketData, setMarketData] = useState({});
    let [sentimentData, setSentimentData] = useState({});
    let [time, setTime] = useState(Date.now());
    let [loading, setLoading] = useState(true);
    let [graphLoader, setGraphLoader] = useState(true);
    const [selectedTab, setSelectedTab] = React.useState(0);
    let [isLoading, setIsLoading] = useState(false);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    }

    const formatData = (data) => {
        return data.map(el => {
            return {
                t: el[0],
                y: el[1].toFixed(2)
            }

        })
    }

    useEffect(async () => {


        /*use time to rerender the component every 30 seconds(Update price every 30 sec)*/
        setTimeout(function () {
            setTime(Date.now())
        }, 30000)

        coin_name = coin_name.toLowerCase();
        axios.get('https://api.coingecko.com/api/v3/coins/' + coin_id)
            .then(async (response) => {
                setCoin(response.data)
                setLoading(false)
            })
            .catch(err => {
                console.error(err);
            })


        const fetchData = async () => {
            setIsLoading(true);
            const [day, week, fourteenDays, month, threeMonths,year, detail] = await Promise.all([
                coinGecko.get("/coins/" + coin_name + "/market_chart/", {
                    params: {
                        vs_currency: "zar",
                        days: "1",
                        interval: "weekly"
                    },
                }),
                coinGecko.get("/coins/" + coin_name + "/market_chart/", {
                    params: {
                        vs_currency: "zar",
                        days: "7",
                        interval: "monthly"
                    },
                }),
                coinGecko.get("/coins/" + coin_name + "/market_chart/", {
                    params: {
                        vs_currency: "zar",
                        days: "14",
                        interval: "weekly"
                    },
                }),
                coinGecko.get("/coins/" + coin_name + "/market_chart/", {
                    params: {
                        vs_currency: "zar",
                        days: "30",
                        interval: "weekly"
                    },
                }),
                coinGecko.get("/coins/" + coin_name + "/market_chart/", {
                    params: {
                        vs_currency: "zar",
                        days: "90",
                        interval: "weekly"
                    },
                }),
                coinGecko.get("/coins/" + coin_name + "/market_chart/", {
                    params: {
                        vs_currency: "zar",
                        days: "365",
                        interval: "monthly"
                    },
                }),
                coinGecko.get("/coins/markets/", {
                    params: {
                        vs_currency: "zar",
                        days: "365",
                        interval: "weekly"
                    },
                }),
            ]);


            detail.data.forEach(data => {
                if (coin_name.toLowerCase() === data.id) {
                    setCoinData({
                        day: formatData(day.data.prices),
                        week: formatData(week.data.prices),
                        year: formatData(year.data.prices),
                        fourteenDays: formatData(fourteenDays.data.prices),
                        month: formatData(month.data.prices),
                        threeMonths: formatData(threeMonths.data.prices),
                        detail: data,
                    });
                    setGraphLoader(false)
                }
            })

            detail.data.forEach(data => {
                if (coin_name.toLowerCase() === data.id) {
                    setMarketData({
                        day: formatData(day.data.market_caps),
                        week: formatData(week.data.market_caps),
                        year: formatData(year.data.market_caps),
                        fourteenDays: formatData(fourteenDays.data.market_caps),
                        month: formatData(month.data.market_caps),
                        threeMonths: formatData(threeMonths.data.market_caps),
                        detail: data,
                    })
                }
            })

            detail.data.forEach(data => {
                if (coin_name.toLowerCase() === data.id) {
                    setSentimentData({
                        detail: data,
                    })
                }
            })
            setIsLoading(false);
        }
        if(isLoading)
        {
            return <div>Loading....</div>;
        }
        await fetchData();

    }, [])



    return (
        <React.Fragment>
            {loading ?
                <div className="mx-auto mt-16 text-center" style={{fontFamily: 'Nunito'}}><ClipLoader loading={loading} size={150}/></div> : <React.Fragment></React.Fragment>}
            {coin.id ? <React.Fragment>
                <div className="container mt-16 mb-12" style={{fontFamily: 'Nunito'}}>
                    <div className="row">
                        <div className="col-12">
                            <img alt={"image"} src={coin.image.large} style={{margin: "auto"}}/>
                        </div>
                        <div className="col-12 mt-5">
                            <p className="text-md"><Markup markup={coin.description.en}/></p>
                        </div>
                    </div>
                </div>

                <div className="container mb-3" style={{margin: "auto", fontFamily: 'Nunito'}}>
                    <div className="row">
                        <div className="col-12">
                            <div className="d-inline"><span className="badge badge-primary rounded-circle p-4"><i
                                className="fas fa-hashtag fa-3x"/>
                                <h1 className="d-inline ml-2">{coin.market_cap_rank}</h1></span></div>
                            <div className="d-inline float-right mt-4 uppercase font-bold p-2 px-0"><a
                                style={{color: "black", textDecoration: "none"}} href={coin.links.homepage[0]}>
                                <i className="fas fa-link"/> Visit {coin.name} </a></div>
                        </div>
                    </div>
                </div>
                <div className="container" style={{margin: "auto" ,fontFamily: 'Nunito'}}>
                    <div className="row" style={{textAlign: "center"}}>

                        <div className="col-4">
                            <div className="uppercase font-bold p-2 px-0" style={{color: "#58667e"}}>Current price</div>
                            <h2 className="font-bold">R {coin.market_data.current_price.zar.toLocaleString()}</h2>
                            <hr/>
                        </div>
                        <div className="col-4">
                            <div className="uppercase font-bold p-2 px-0" style={{color: "#58667e"}}>Market cap</div>
                            <h2 className="font-bold">R {coin.market_data.market_cap.zar.toLocaleString()}</h2>
                            <hr/>
                        </div>
                        <div className="col-4">
                            <div className="uppercase font-bold p-2 px-0" style={{color: "#58667e"}}>Total volume</div>
                            <h2 className="font-bold">R {coin.market_data.total_volume.zar.toLocaleString()}</h2>
                            <hr/>
                        </div>
                    </div>

                </div>


                <div className="container mt-16" style={{fontFamily: 'Nunito'}}>
                    <div className="row">
                        <div className="col-8">
                            <div>
                                <h2>
                                    {coin.name} ({coin.symbol}) Chart
                                </h2>
                            </div>
                            <AppBar position={"static"} color={'transparent'} style={{ borderRadius: "5px"}}>
                                <Tabs centered={true} indicatorColor={'primary'} value={selectedTab} onChange={handleChange}>
                                    <Tab style={{color:"black"}} label="Price">


                                    </Tab>

                                    <Tab style={{color:"black"}} label={"Market Cap"}>

                                    </Tab>

                                    <Tab style={{color:"black"}} label="Sentimental Analysis">

                                    </Tab>
                                </Tabs>
                            </AppBar>
                            {graphLoader ? <div className="mx-auto mt-16 text-center"><ClipLoader loading={graphLoader}
                                                                                                  size={150}/>
                            </div> : <React.Fragment>
                                {

                                    selectedTab === 0 &&
                                    <HistoryChart data={coinData}/>


                                }
                                {
                                    selectedTab === 1 &&
                                    <CoinData data={marketData}/>

                                }

                                {
                                    selectedTab === 2 &&
                                    <SentimentChart data={sentimentData}/>
                                }
                            </React.Fragment>}
                        </div>

                        <div className="col-4 my-5">
                            <table className="table">
                                <tbody>
                                <tr>
                                    <td>Price change in 1 hour</td>
                                    <td>{coin.market_data.price_change_percentage_1h_in_currency.zar > 0 ? <span
                                            className="badge badge-success ml-2">{coin.market_data.price_change_percentage_1h_in_currency.zar.toFixed(2)}%</span> :
                                        <span
                                            className="badge badge-danger ml-2">{coin.market_data.price_change_percentage_1h_in_currency.zar.toFixed(2)}%</span>} </td>
                                </tr>
                                <tr>
                                    <td>Price change in 24 hours</td>
                                    <td>{coin.market_data.price_change_percentage_24h_in_currency.zar > 0 ? <span
                                            className="badge badge-success ml-2">{coin.market_data.price_change_percentage_24h_in_currency.zar.toFixed(2)}%</span> :
                                        <span
                                            className="badge badge-danger ml-2">{coin.market_data.price_change_percentage_24h_in_currency.zar.toFixed(2)}%</span>}</td>
                                </tr>
                                <tr>
                                    <td>Price change in 7 days</td>
                                    <td>{coin.market_data.price_change_percentage_7d_in_currency.zar > 0 ? <span
                                            className="badge badge-success ml-2">{coin.market_data.price_change_percentage_7d_in_currency.zar.toFixed(2)}%</span> :
                                        <span
                                            className="badge badge-danger ml-2">{coin.market_data.price_change_percentage_7d_in_currency.zar.toFixed(2)}%</span>}</td>
                                </tr>
                                <tr>
                                    <td>Price change in 14 days</td>
                                    <td>{coin.market_data.price_change_percentage_14d_in_currency.zar > 0 ? <span
                                            className="badge badge-success ml-2">{coin.market_data.price_change_percentage_14d_in_currency.zar.toFixed(2)}%</span> :
                                        <span
                                            className="badge badge-danger ml-2">{coin.market_data.price_change_percentage_14d_in_currency.zar.toFixed(2)}%</span>}</td>
                                </tr>
                                <tr>
                                    <td>Price change in 30 days</td>
                                    <td>{coin.market_data.price_change_percentage_30d_in_currency.zar > 0 ? <span
                                            className="badge badge-success ml-2">{coin.market_data.price_change_percentage_30d_in_currency.zar.toFixed(2)}%</span> :
                                        <span
                                            className="badge badge-danger ml-2">{coin.market_data.price_change_percentage_30d_in_currency.zar.toFixed(2)}%</span>}</td>
                                </tr>
                                <tr>
                                    <td>Price change in 1 year</td>
                                    <td>{coin.market_data.price_change_percentage_1y_in_currency.zar > 0 ? <span
                                            className="badge badge-success ml-2">{coin.market_data.price_change_percentage_30d_in_currency.zar.toFixed(2)}%</span> :
                                        <span
                                            className="badge badge-danger ml-2">{coin.market_data.price_change_percentage_30d_in_currency.zar.toFixed(2)}%</span>}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="container" style={{fontFamily: 'Nunito'}}>
                    <div className=" text-sm p-2 px-0">
                        <span
                            className="uppercase font-bold">Last updated at : </span> {new Date(coin.market_data.last_updated).toString()}
                    </div>
                </div>
            </React.Fragment> : <React.Fragment></React.Fragment>}
        </React.Fragment>
    )
}
Overview.defaultProps = {
    coin_name: "bitcoin"
}
