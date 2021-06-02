import React from 'react';
import {Line} from 'react-chartjs-2';

const state = {
    labels: ['January', 'February', 'March',
        'April', 'May'],
    datasets: [
        {
            label: 'Cryptocurrency flactuation',
            fill: true,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [65, 59, 80, 81, 56]
        }
    ]
}

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Line style={{maxHeight:"350px"}}
                    data={state}
                    options={{
                        title:{
                            display:true,
                            text:'Crypto movement',
                            fontSize:15
                        },
                        legend:{
                            display:true,
                            position:'right'
                        }
                    }}
                />
            </div>
        );
    }
}