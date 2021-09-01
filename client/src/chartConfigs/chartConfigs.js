export const historyOptions ={

    lineHeightAnnotation: {
        always: true,
        hover: false,
        lineWeight: 1.5,
    },

    interaction: {
        mode: 'y',
        intersection: true,
    },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
        xAxes: [
            {
               stacked: true,
                type: "time",
                distribution: "linear",
                gridLines:{
                    drawOnChartArea:false
                },
            }
        ],
        yAxes: [{
            ticks: {
                callback: function (value, index, values)
                {
                    return 'R' + value.toLocaleString();
                }
            },
            gridLines:{
                drawOnChartArea:false
            },
        }]
    }
}