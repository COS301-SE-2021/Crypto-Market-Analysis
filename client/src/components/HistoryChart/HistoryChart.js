import React, {useEffect, useRef, useState} from 'react'
import Chartjs from 'chart.js'
import {historyOptions} from "../../chartConfigs/chartConfigs";

const HistoryChart = ({data}) => {
    const chartRef = useRef();
    const {day, week, year, fourteenDays, month, threeMonths, detail} = data;
    const [timeFormat, setTimeFormat] = useState("24h");
    let chartInstance;

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
                return day;
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
                        backgroundColor: "rgba(174,305,194,0.5)",
                        borderColor: "rgba(174,305,194,0.4)",
                        pointRadius: 0,
                    },

                    ],
                },
                options: {
                    ...historyOptions,
                },
            });
        }
    })

    return (
        <div>



            <div>

                <canvas ref={chartRef} id="myChart" height={250} width={250}></canvas>

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