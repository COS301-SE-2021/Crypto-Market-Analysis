import React, {useEffect, useRef, useState} from 'react'
import {historyOptions} from "../../chartConfigs/chartConfigs";
import Chartjs from 'chart.js'

const CoinData = ({data}) => {
    const chartRefs = useRef();
    const {day, week, year, fourteenDays, month, threeMonths, detail} = data;
    const [timeFormat, setTimeFormat] = useState("");
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


        if(chartRefs && chartRefs.current && detail)
        {
            chartInstance = new Chartjs(chartRefs.current, {
                type: 'line',
                data: {
                    datasets: [
                        {
                            label: detail.name + " market cap",
                            data: determineTimeFormat(),
                            backgroundColor: "rgba(255, 255, 255,0)",
                            borderColor: "rgba(0,0,0,0.9)",
                            pointRadius: 1,
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

            <div width={500}>

                <canvas ref={chartRefs} id="myChart" height={500} width={500}/>

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
export default CoinData;