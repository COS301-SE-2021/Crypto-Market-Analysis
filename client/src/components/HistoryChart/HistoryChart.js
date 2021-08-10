import React, {useEffect, useRef, useState} from 'react'
import Chartjs from 'chart.js'
//import chart from 'canvas.js'
import {historyOptions} from "../../chartConfigs/chartConfigs";
import CanvasJSReact from '../../canvasjs.react';
let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

const HistoryChart = ({data}) => {
    const chartRef = useRef();
    const {day} = data;
    const {week} = data;
    const {year} = data;
    const {fourteenDays} = data;
    const {month} = data;
    const {threeMonths} = data;
    const {detail} = data;
    const [timeFormat, setTimeFormat] = useState("24h");
    let chartInstance;
    let options;

    const determineTimeFormat = () => {
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
                return "";
        }
    }

    useEffect(() => {

        if(chartRef && chartRef.current && detail)
        {
            chartInstance = new Chartjs(chartRef.current, {
                type: 'line',
                data: {
                    datasets: [
                        {
                            label: detail.name + " price" ,
                            data: determineTimeFormat(),
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

         /*options = {
            animationEnabled: true,
            title:{
                text: "Monthly Sales - 2017"
            },
            axisX: {
                valueFormatString: "MMM"
            },
            axisY: {
                title: "Sales (in USD)",
                prefix: "$",
            },
             labels:['Jan','Feb','Mar'],
            data: [{
                yValueFormatString: "$#,###",
                xValueFormatString: "MMMM",
                type: "spline",
                dataPoints: [
                    {data:[1,2,3]}


                ]
            }]
        }*/

    })

    return (
        <div>



            <div>

                <CanvasJSChart options={options} id="myChart" height={500} width={500}>

                </CanvasJSChart>

            </div>

            <div className="chart-button mt-1">
                <button onClick={() => setTimeFormat("24h")} className="btn btn-outline-secondary btn-sm">24h</button>
                <button onClick={() => setTimeFormat("7d")} className="btn btn-outline-secondary btn-sm mx-1">7d</button>
                <button onClick={() => setTimeFormat("14d")} className="btn btn-outline-secondary btn-sm mx-1">14d</button>
                <button onClick={() => setTimeFormat("30d")} className="btn btn-outline-secondary btn-sm mx-1">30d</button>
                <button onClick={() => setTimeFormat("90d")} className="btn btn-outline-secondary btn-sm mx-1">90d</button>
                <button onClick={() => setTimeFormat("1y")} className="btn btn-outline-secondary btn-sm">1y</button>
            </div>


        </div>

    )
}
export default HistoryChart;