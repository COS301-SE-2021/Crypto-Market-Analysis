import React, {useEffect, useRef, useState} from 'react'
import Chartjs from 'chart.js'
import axios from "axios";

const SentimentChart = ({data}) => {
    const chartRef = useRef();
    const [timeFormat, setTimeFormat] = useState("2m");
    const {detail} = data;
    let chartInstance;

    useEffect(async () => {
        try {
            const fetchAverageData = async () => {

                let requestObj = {
                    email: localStorage.getItem("emailSession"),
                    crypto_name: detail.name,
                }

                axios.post('http://localhost:8080/sentiment/getAverages', requestObj)
                    .then(async (response) => {

                        let averagesList = [];

                        averagesList.push({AVG:
                                response.data
                            });

                        let l = [6000000, 12000000, 24000000];
                        for(let i =0; i < averagesList[0].AVG.data.length; i++)
                        {

                                if (chartRef && chartRef.current) {

                                    chartInstance = new Chartjs(chartRef.current, {
                                        type: 'line',
                                        data: {
                                            labels: l,
                                            datasets: [
                                                {
                                                    label: detail.name + " sentiment",
                                                    data: [averagesList[0].AVG.data[0], averagesList[0].AVG.data[1], averagesList[0].AVG.data[2]],
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
                                                hover: true,
                                                lineWeight: 1.5
                                            },

                                            animation: {
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
                        }

                    }).catch(err => {
                    console.error(err);
                })
            }
            await fetchAverageData()

        }catch (e){
            console.log(e);
        }
    },[]);


    return (
        <div>

            <div>

                <canvas ref={chartRef} id="myChart" height={500} width={500}>

                </canvas>

            </div>

            <div className="chart-button mt-1">
                <button onClick={() => setTimeFormat("5h")} className="btn btn-outline-secondary btn-sm">10m</button>
            </div>

        </div>



    )
}
export default SentimentChart;