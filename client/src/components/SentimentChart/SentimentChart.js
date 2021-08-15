import React, {useEffect, useRef, useState} from 'react'
import Chartjs from 'chart.js'
import {Line} from 'react-chartjs-2'
import {historyOptions} from "../../chartConfigs/chartConfigs";
import axios from "axios";
import coinGecko from "../apis/CoinGecko";


const SentimentChart = ({data}) => {
    const chartRef = useRef();
    //const {sentiment} = data;
    let [averages, setAverages] = useState({});
    const [timeFormat, setTimeFormat] = useState("2m");

    useEffect(async () => {
        const {detail} = data;
        let chartInstance;
        try {
            const fetchDatas = async () => {

                const [coinDetail] = await Promise.all([
                    coinGecko.get("/coins/markets/", {
                        params: {
                            vs_currency: "zar",
                        },
                    }),
                ]);
                console.log(detail);
                console.log(detail.name)

                let requestObj = {
                    email: localStorage.getItem("emailSession"),
                    crypto_name: detail.name,
                }

                axios.post('http://localhost:8080/sentiment/getAverages', requestObj)
                    .then(async (response) => {

                        let averagesList = [];

                        let cA = response.data;
                        //for (const avg of cA)
                        averagesList.push({AVG: cA});

                        setAverages(cA);

                        console.log(averages.data[0])
                        let l = [600000, 1200000, 2400000];
                        //for(let i =0; i < averages.data.length; i++)
                        //{
                        if (chartRef && chartRef.current) {

                            chartInstance = new Chartjs(chartRef.current, {
                                type: 'line',

                                data: {
                                    labels: l,
                                    datasets: [
                                        {
                                            label: detail.name + " sentiment" ,
                                            data: [ averages.data[0], averages.data[1], averages.data[2]],
                                            backgroundColor: "rgba(255, 255, 255,0)",
                                            borderColor: "rgba(0,0,0,0.9)",
                                            pointRadius: 0,
                                            hoverOffset: 4,
                                        },

                                    ],

                                },
                                options: {
                                    lineHeightAnnotation: {
                                        always: true,
                                        hover: false,
                                        lineWeight: 1.5
                                    },

                                    animation:{
                                        duration: 2000
                                    },

                                    maintainAspectRatio: false,
                                    responsive: true,
                                    scales: {
                                        xAxes: [
                                            {
                                                type: "time",
                                                distribution: "linear",

                                            }
                                        ],
                                        yAxes: [{
                                            beginAtZero: true,
                                        }]
                                    }
                                },
                            });
                        }
                        //}
                        // console.log(cA.data[0]);
                    }).catch(err => {
                    console.error(err);
                })
            }

            await fetchDatas()

        }catch (e){
            console.log(e);
        }

        //console.log(averages.length);
    },[]);



    return (
        <div>

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