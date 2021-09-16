import React, {useEffect, useRef, useState} from 'react'
import Chartjs from 'chart.js'
import axios from "axios";
import {ButtonGroup} from "@material-ui/core";
import Button from "@material-ui/core/Button"

const SentimentChart = ({data}) => {
    const chartRef = useRef();
    const [timeFormat, setTimeFormat] = useState("2m");
    const {detail} = data;
    Chartjs.defaults.global.events = ['click'];

    useEffect(async () => {
        try {
            const fetchAverageData = async () => {

                let requestObj = {
                    email: localStorage.getItem("emailSession"),
                    crypto_name: detail.name,
                }

                axios.post('http://localhost:8000/sentiment/getAverages', requestObj)
                    .then(async (response) => {

                        let averagesList = [];

                        averagesList.push({AVG:
                                response.data
                            });

                        let l = [60000000, 120000000, 240000000, 480000000, 760000000];
                        //for(let i =0; i < averagesList[0].AVG.data.length; i++)
                        //{

                                if (chartRef && chartRef.current) {

                                    let chartInstance = new Chartjs(chartRef.current, {
                                        type: 'line',
                                        data: {
                                            labels: l,
                                            datasets: [
                                                {
                                                    label: detail.name + " sentiment",
                                                    data: [averagesList[0].AVG.data[0], averagesList[0].AVG.data[1], averagesList[0].AVG.data[2], averagesList[0].AVG.data[3],averagesList[0].AVG.data[4]],
                                                    backgroundColor: "rgba(255, 255, 255,0)",
                                                    borderColor: "black",
                                                    pointRadius: 1,
                                                    hoverOffset: 4,
                                                    borderWidth: 0.8,
                                                    pointHoverRadius: 16,
                                                },

                                            ],

                                        },
                                        options: {
                                            lineHeightAnnotation: {
                                                always: true,
                                                hover: true,
                                                lineWeight: 1
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
                                                        gridLines:{
                                                            drawOnChartArea:false
                                                        },
                                                    },
                                                ],
                                                yAxes: [{
                                                    beginAtZero: false,
                                                    gridLines:{
                                                        drawOnChartArea:false
                                                    },
                                                }]
                                            }
                                        },
                                    });
                                }
                        //}

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
                <ButtonGroup variant={"contained"} size={"large"} color={"default"} style={{ borderRadius: "5px"}}>
                    <Button style={{
                        textAlign: "center",
                        color:"black",
                        outline: "5px",
                        width: "150%"}} onClick={() => setTimeFormat("1h")}>24h</Button>
                </ButtonGroup>
            </div>

        </div>



    )
}
export default SentimentChart;