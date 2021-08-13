import React, {useEffect, useRef, useState} from 'react'
import Chartjs from 'chart.js'
import {Line} from 'react-chartjs-2'
import {historyOptions} from "../../chartConfigs/chartConfigs";
import axios from "axios";
import coinGecko from "../apis/CoinGecko";


const SentimentChart = () => {
    const chartRef = useRef();
    //const {sentiment} = data;
    let [averages, setAverages] = useState({});
    const [timeFormat, setTimeFormat] = useState("2m");
    let chartInstance;
    let [details,setDetails] = useState({})
    let [Coin, SetCoin] = useState({});
    let [loading, setLoading] = useState(true);


    /*const determineTimeFormat = () => {
        switch (timeFormat){

            case "24h":
                return sentiment;
            default:
                return "";
        }
    }*/



    useEffect(async () => {

        try {
            const fetchDatas = async () => {

                const [detail] = await Promise.all([
                    coinGecko.get("/coins/markets/", {
                        params: {
                            vs_currency: "zar",
                            days: "365",
                            interval: "weekly"
                        },
                    }),
                ]);

                detail.data.forEach(data => {
                    setDetails({
                        detail: data,
                    })
                })

                let requestObj = {
                    email: localStorage.getItem("emailSession"),
                    crypto_name: "Bitcoin",
                }

                axios.post('http://localhost:8080/sentiment/getAverages', requestObj)
                    .then(async (response) => {

                        let averagesList = [];

                        let cA = response.data;
                        //for (const avg of cA)
                        averagesList.push({AVG: cA});

                        setAverages(cA);
                        // console.log(cA.data[0]);
                    }).catch(err => {
                    console.error(err);
                })
            }

            await fetchDatas()
            console.log(averages.data.length)
        }catch (e){
            console.log(e);
        }

        //console.log(averages.length);
    },[]);

    let l = [600000, 1200000, 2400000];
    for(let i =0; i < averages.data.length; i++)
    {
        if (chartRef && chartRef.current) {
            // const labels = new Date.now();
            chartInstance = new Chartjs(chartRef.current, {
                type: 'line',

                data: {
                    labels: l,
                    datasets: [
                        {
                            label: details.name + " sentiment" ,
                            data: [ averages.data[i] ],
                            backgroundColor: "rgba(255, 255, 255,0)",
                            borderColor: "rgba(0,0,0,0.9)",
                            pointRadius: 0,
                            hoverOffset: 4,
                        },

                    ],

                },
                options: {
                    ...historyOptions,
                },
            });
        }
    }

    return (
        <div>

            {/*<div>
            <Line data={chartInstance}>

                
                
            </Line>
        </div>*/}


            <div>

                <canvas ref={chartRef} id="myChart" height={500} width={500}>

                </canvas>

            </div>

            <div className="chart-button mt-1">
                <button onClick={() => setTimeFormat("5h")} className="btn btn-outline-secondary btn-sm">2m</button>
            </div>

        </div>



    )
}
export default SentimentChart;