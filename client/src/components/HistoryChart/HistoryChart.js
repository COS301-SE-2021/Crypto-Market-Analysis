import React, {useEffect, useRef, useState} from 'react'
import Chartjs from 'chart.js';
import Button from "@material-ui/core/Button"
import {ButtonGroup} from "@material-ui/core";

const HistoryChart = ({data}) => {
    const chartRef = useRef();
    const {day} = data;
    const {week} = data;
    const {fourteenDays} = data;
    const {month} = data;
    const {threeMonths} = data;
    const {year} = data;
    const {detail} = data;
    const [timeFormat, setTimeFormat] = useState("24h");
    let options;

    const determineTimeFormat = () => {
        try{
            switch (timeFormat){
                case "24h":
                    return day;
                case "7d":
                    return week;
                case "14d":
                    return fourteenDays;
                case "30d":
                    return month;
                case "90d":
                    return threeMonths;
                case "1y":
                    return year;
                default:
                    return day;
            }
        }catch(err){
            console.log(err)
        }

    }

    Chartjs.defaults.global.events = ['click'];

    useEffect(() => {

        if(chartRef && chartRef.current && detail)
        {

             const chartInstance = new Chartjs(chartRef.current, {
                type: 'line',
                data: {
                    datasets: [
                        {
                            label: detail.name + " price" ,
                            data: determineTimeFormat(),
                            backgroundColor: "rgba(255, 255, 255,0)",
                            borderColor: "black",
                            pointRadius: 1,
                            borderJoinStyle:'miter',
                            pointBorderWidth: 0.5,
                            lineThickness: 5,
                            lineTension: 1,
                            borderWidth: 0.8,
                            hoverOffset: 0,
                            pointHoverRadius: 16,
                        },

                    ],

                },
                options: {
                    plugins: {
                      tooltip: {
                          events: ['click']
                      }
                    },
                    hover: {
                        mode: "index",
                        intersect: false,

                    },
                    tooltip: {
                        mode: "index",
                        intersect: false,

                    },
                    lineHeightAnnotation: {
                        always: false,
                        hover: true,
                    },
                    showLines: true,
                    interaction: {
                        mode: 'y',
                        intersection: true,
                    },
                    maintainAspectRatio: true,
                    responsive: true,
                    scales: {
                        xAxes: [
                            {
                                stacked: true,
                                type: "time",
                                distribution: "linear",
                                gridLines:{
                                    drawOnChartArea:false
                                }
                            }
                        ],
                        yAxes: [{
                            ticks: {
                                callback: function (value, index, values)
                                {
                                    return 'R' + value.toLocaleString();
                                }
                            },
                            gridLines:{
                                drawOnChartArea:false
                            },

                        }]
                    }
                },
            });
        }
        else {
            alert("No graph data to return");
        }

    }, [determineTimeFormat()])

    return (
        <div style={{fontFamily: 'Nunito'}}>



            <div>

                <canvas ref={chartRef} id="myChart" height={500} width={500}>

                </canvas>

            </div>

            <div className="chart-button mt-1">
                <ButtonGroup variant={"contained"} color={"default"} size={"large"} style={{ borderRadius: "5px"}}>
                    <Button onClick={() => setTimeFormat("24h")} style={{
                        textAlign: "center",
                        color:"black",
                        outline: "5px",
                        width: "150%",
                    }}>24h</Button>
                    <Button onClick={() => setTimeFormat("7d")}  style={{
                        textAlign: "center",
                        color:"black",
                        outline: "5px",
                        width: "150%",
                    }}>7d</Button>
                    <Button onClick={() => setTimeFormat("14d")} style={{
                        textAlign: "center",
                        color:"black",
                        outline: "5px",
                        width: "150%",
                    }}>14d</Button>
                    <Button onClick={() => setTimeFormat("30d")} style={{
                        textAlign: "center",
                        color:"black",
                        outline: "5px",
                        width: "150%",
                    }}>30d</Button>
                    <Button onClick={() => setTimeFormat("90d")} style={{
                        textAlign: "center",
                        color:"black",
                        outline: "5px",
                        width: "150%",
                    }}>90d</Button>
                    <Button onClick={() => setTimeFormat("1y")} style={{
                        textAlign: "center",
                        color:"black",
                        outline: "5px",
                        width: "150%",
                    }}>1y</Button>
                </ButtonGroup>
                  </div>

        </div>

    )
}
export default HistoryChart;