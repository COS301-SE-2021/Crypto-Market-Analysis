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
        console.log(this.props.crypto);
        let  objectRequest = {
            socialmedia: this.props.social,
            crypto: this.props.crypto
        }
        axios.post('http://localhost:8080/user/fetchAnalysis/',objectRequest)
            .then(response => {
                let arr = response.data.Analysis_score;
                arr = arr.map(function(each_element){
                    return Number(each_element.toFixed(2));
                });
                this.setState({
                    options: {
                        ...this.state.options,
                        xaxis: {
                            ...this.state.options.xaxis,
                            categories: response.data.xaxis
                        }
                    },
                    series: [{
                        ...this.state.series,
                        name: 'series-1',
                        data: arr

                    }]
                })
            })
            .catch(err => {console.error(err);})
    }
    render() {
        return (
            <Chart options={this.state.options} series={this.state.series} type="bar" width={500} height={320} />
        )
    }
}