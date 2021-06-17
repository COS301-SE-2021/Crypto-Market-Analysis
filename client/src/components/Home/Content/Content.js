import "bootstrap/dist/css/bootstrap.css";
import { Icon } from "coinmarketcap-cryptocurrency-icons";
import GraphReport from "../GraphReport/GraphReport";
import SentimentSpeedometer from "../GraphReport/AnalysisGraph"
import "./Content.css";
function Content()
{
    return(
        <div id="content-view" className="col-8">
            <div id="cards-row" className="row" >
                <div className="col-m-6 col-xl-4" >
                    <div className="card">
                        <div>
                            <span><Icon i="btc" size={35}/></span>
                            <h5 className="d-inline-block mb-3 ml-3">Bitcoin
                                <span>(24h)</span>
                            </h5>
                        </div>
                        <h4> ZAR 515 128<span className="badge badge-success ml-2"> +1.6% </span> </h4>
                    </div>
                </div>

                <div className="col-m-6 col-xl-4" >
                    <div className="card">
                        <div>
                            <span><Icon i="eth" size={35}/></span>
                            <h5 className="d-inline-block mb-3 ml-3">Etherium
                                <span>(24h)</span>
                            </h5>
                        </div>
                        <h4> ZAR 37 286<span className="badge badge-danger ml-2"> +2.02% </span> </h4>
                    </div>
                </div>

                <div className="col-m-6 col-xl-4" >
                    <div className="card">
                        <div>
                            <span><Icon i="ltc" size={35}/></span>
                            <h5 className="d-inline-block mb-3 ml-3">Litecoin
                                <span>(24h)</span>
                            </h5>
                        </div>
                        <h4> ZAR 2 487<span className="badge badge-danger ml-2"> +4.29% </span> </h4>
                    </div>
                </div>
                <div className="col-12" style={{height: "400px"}}>
                    <div className="card" style={{height: "370px",margin:"20px auto auto",}}>
                        <GraphReport/>
                        <SentimentSpeedometer/>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Content