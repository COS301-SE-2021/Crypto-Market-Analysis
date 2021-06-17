import React from 'react';
import axios from 'axios'
import ReactSpeedometer from "react-d3-speedometer"
import {db} from "../../../firebase"
export default class SentimentSpeedometer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mini: "",
            maxi: "",
            average: "",
            errorMessage:""
        }
    }
    async componentDidMount() {
        const article = { };
        const response = await axios.post('http://localhost:8080/user/analyse', article);
        this.setState({ mini: response.mini,maxi:response.maxi,average:response.average });
    }

    render() {
        return (
            <div>
                <h1>This is the data: {this.state.average} {this.state.mini}</h1>
                <ReactSpeedometer
                    maxValue={this.state.maxi}
                    minValue={this.state.mini}
                    value={this.state.average}
                    needleColor="red"
                    startColor="green"
                    segments={10}
                    endColor="blue"
                />
            </div>
        );
    }
}