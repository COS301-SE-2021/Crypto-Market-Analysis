export const historyOptions ={
    lineHeightAnnotation: {
        always: true,
        hover: false,
        lineWeight: 1.5
    },

    animation:{
        duration: 2000
    },
    interaction: {
        mode: 'y',
        intersection: true,
    },
    maintainAspectRatio: true,
    responsive: true,
    scales: {
        xAxes: [
            {
               stacked: true,
                type: "time",
                distribution: "linear",

            }
        ],
        yAxes: [{
            ticks: {
                callback: function (value, index, values)
                {
                    return 'R' + value.toLocaleString();
                }
            }
        }]
    }
}