import React, {useEffect, useRef, useState} from 'react'
import Chartjs from 'chart.js'
import {historyOptions} from "../../chartConfigs/chartConfigs";

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
    let chartInstance = useRef();

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
                    return "";
            }
        }catch(err){
            console.log(err)
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
                            pointRadius: 1,
                            hoverOffset: 4,
                        },

                    ],

                },
                options: {
                    ...historyOptions,
                },
            });
        }
        else {
            alert("No graph data to return");
        }
    })

    return (
        <div>



            <div>

                <canvas ref={chartRef} id="myChart" height={500} width={500}>

                </canvas>

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