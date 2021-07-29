import React from 'react';
import Card from 'react-bootstrap/Card'
export default class SentimentSpeedometer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }
    render() {
        return (<div>
                <Card className="text-center">
                    <Card.Header>Bitcoin notification</Card.Header>
                    <Card.Body>
                        <Card.Title>Sentiment Analysis</Card.Title>
                        <Card.Text>
                            Bitcoin Sentiment did not change
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted">26 July 2021</Card.Footer>
                </Card>
                <div/>
               </div>);
    }
}