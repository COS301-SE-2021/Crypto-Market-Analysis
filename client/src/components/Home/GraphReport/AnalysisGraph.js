const React = require('react');
const Component = React.Component;
const CanvasJSReact = require('./canvasjs.react');
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
function AnalysisGraph() {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        fetch("/analyse")
            .then((res) => res.json())
            .then((data) => setData(data.message));
    }, []);


    return (
            <div>
                <CanvasJSChart options = {options}
                    /* onRef={ref => this.chart = ref} */
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );

}
module.exports = AnalysisGraph;