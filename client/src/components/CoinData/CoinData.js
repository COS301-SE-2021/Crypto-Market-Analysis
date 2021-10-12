import React, {useEffect, useRef, useState} from 'react'
import {historyOptions} from "../../chartConfigs/chartConfigs";
import Chartjs from 'chart.js'
import {ButtonGroup} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const CoinData = ({ data }) => {
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

    Chartjs.defaults.global.events = ['click'];

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
                            backgroundColor: "transparent",
                            borderColor: "black",
                            pointRadius: 1,
                            borderWidth: 0.8,
                            pointHoverRadius: 16,
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
        <div style={{fontFamily: 'Nunito'}}>

            <div width={500}>

                <canvas ref={chartRefs} id="myChart" height={500} width={500}/>

            </div>

            <div className="chart-button mt-1" style={{fontFamily: 'Nunito'}}>
                <ButtonGroup variant={"contained"} size={"large"} color={"default"} >
                    <Button onClick={() => setTimeFormat("24h")} style={{
                        textAlign: "center",
                        color:"black",
                        outline: "5px",
                        width: "150%",
                    }}>24h</Button>
                    <Button onClick={() => setTimeFormat("7d")} style={{
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
export default CoinData;