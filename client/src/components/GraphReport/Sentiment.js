import Chart from 'react-apexcharts'
import React from "react";
import axios from "axios";

export default class ChartGraph extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    id: 'apexchart-example'
                },
                xaxis: {
                    categories: [1, 2, 3, 4, 5, 6, 7, 8, 9]
                }
            },
            series: [{
                name: 'series-1',
                data: [-3, 4, 3, -5, 4, -6, 7, -9, 1]
            }]
        }
    }
    componentDidMount() {
        let  objectRequest = {
            socialmedia: 'Twitter',
            crypto: 'Bitcoin'
        }
        axios.post('http://localhost:8080/user/fetchAnalysis/',objectRequest)
            .then(response => {
               console.log(response.data);
            })
            .catch(err => {console.error(err);})
    }
    render() {
        return (
            <Chart options={this.state.options} series={this.state.series} type="bar" width={500} height={320} />
        )
    }
}