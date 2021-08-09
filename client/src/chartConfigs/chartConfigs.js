export const historyOptions ={
    lineHeightAnnotation: {
        always: true,
        hover: false,
        lineWeight: 1.5
    },

    animation:{
        duration: 2000
    },
    type:"spline",
    maintainAspectRatio: false,
    responsive: true,
    scales: {
        xAxes: [
            {
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