import React from 'react';
import axios from 'axios'
import ReactSpeedometer from "react-d3-speedometer"
// import {db} from "../../../firebase"
export default class SentimentSpeedometer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }
    render() {
        return (
            <div>
                <ReactSpeedometer
                    value={this.props.average}
                    currentValueText={this.props.social+" "+this.props.cyp}
                    maxValue={this.props.max}
                    minValue={this.props.min}
                    customSegmentLabels={[
                        {
                            text: "Very Bad",
                            position: "INSIDE",
                            color: "#555",
                        },
                        {
                            text: "Bad",
                            position: "INSIDE",
                            color: "#555",
                        },
                        {
                            text: "Ok",
                            position: "INSIDE",
                            color: "#555",
                            fontSize: "19px",
                        },
                        {
                            text: "Good",
                            position: "INSIDE",
                            color: "#555",
                        },
                        {
                            text: "Very Good",
                            position: "INSIDE",
                            color: "#555",
                        },
                    ]}
                />
            </div>
        );
    }
}